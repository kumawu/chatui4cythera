interface SyncProps {
  isDone: boolean;
  thinkTime: number;
  children: React.ReactNode;
}

const Sync: React.FC<SyncProps> = ({ isDone, thinkTime, children }) => {
  return (
    <div className="sync-container">
      {children}
    </div>
  );
};
'use client';
import { marked } from 'marked';
import { useEffect } from 'react';

// 配置marked支持表格等复杂markdown元素
marked.setOptions({
  gfm: true, // 启用GitHub风格的Markdown，包含表格支持
  breaks: true, // 将单行换行转换为<br>
  pedantic: false // 不严格遵循原始Markdown
});
import React, { useState, useRef, useCallback } from 'react';
import Chat, { Think, Bubble, useMessages } from '@chatui/core';
import { useThinkContext, type ThinkData } from '../ThinkContext';
import '@chatui/core/dist/index.css';
import './chat-styles.css';

interface Message {
  type: string;
  content?: {
    text?: string;
    [key: string]: any;
  };
  position?: 'left' | 'right' | 'center' | 'pop';
  loading?: boolean; // 添加 loading 属性
}

interface QuickReply {
  name: string;
  isNew?: boolean;
  isHighlight?: boolean;
}

// 根据不同角色定义快速回复选项
const ROLE_QUICK_REPLIES: Record<string, QuickReply[]> = {
  '数字能效分析师': [
    {name: '💡照明系统是不是开得太久了？有节省空间吗？🤔'},
    {name: '💨这几天挺热🌡️，我想知道空调用电是不是超了？🤔'}
  ],
  '数字环境专员': [
    { name: '📡冷库环境最近波动大，是不是外面太热？'},
    { name: '🚨有没有严重告警要立即处理？'}
  ],
  '数字设备健康主管': [
    {name: '🔍调出最近3天空调用电趋势，我看看变化。'},
    {name: '🛠有没有哪台空调的能耗曲线特别奇怪？'}
  ],
  '数字综合运营协调员': [
    {name: '🔎 今天整体状况如何？'},
    {name: '📈 最近总能耗趋势怎么样？'},
  ]
};

// 默认快速回复选项
const DEFAULT_QUICK_REPLIES: QuickReply[] = [];

interface ChatComponentProps {
  currentRole?: string;
}

export default function ChatComponent({ currentRole = '数字能效分析师' }: ChatComponentProps) {
  const { messages, appendMsg, updateMsg } = useMessages([]);
  const { setThinkData } = useThinkContext();
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false); // 添加流式响应状态
  const chatRef = useRef<any>(null);
  const thinkContentRef = useRef<string | null>(null);

  useEffect(() => {
    console.log('thinkContentRef 更新检测:', thinkContentRef.current);
    if (thinkContentRef.current) {
      try {
        // 尝试直接解析 JSON
        let parsedData;
        try {
          parsedData = JSON.parse(thinkContentRef.current);
          console.log('直接解析成功:', parsedData);
          
          // 如果已经是结构化数据，直接使用
          if (parsedData.cards || parsedData.charts) {
            console.log('使用预先解析的数据更新 ThinkData');
            setThinkData({
              content: thinkContentRef.current,
              parsedContent: {
                layout: parsedData.layout,
                cards: parsedData.cards,
                charts: parsedData.charts?.map((chart: any) => ({
                  ...chart,
                  data: typeof chart.data === 'string' ? chart.data : JSON.stringify(chart.data)
                }))
              },
              metadata: {
                type: 'dashboard',
                timestamp: new Date().toISOString()
              }
            });
            return;
          }
        } catch (e) {
          console.log('直接解析失败，尝试使用 DSL 解析器');
        }
      } catch (error) {
        console.error('Think内容更新错误:', error);
      }
    }
  }, [messages, setThinkData]);

  async function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setIsTyping(true); // 设置正在输入状态
      setIsStreaming(true); // 设置流式响应状态为 true
      try {
        // 初始化一个空的回复消息，空消息会自动显示为 loading 状态
        const messageId = Date.now().toString();
        appendMsg({
          _id: messageId,
          type: 'markdown', // 使用 markdown 类型
          content: { text: '' }, // 空消息内容会显示为 loading 状态
          position: 'left',
        });
        const currentMessageId = messageId;
        
        // 根据当前角色选择对应的 chatBot API
        let chatBot = '/api/chat-bot1'; // 默认值
        
        // 根据 currentRole 来选择不同的 API 端点
        switch (currentRole) {
          case '数字能效分析师':
            chatBot = '/api/chat-bot1';
            break;
          case '数字环境专员':
            chatBot = '/api/chat-bot2';
            break;
          case '数字设备健康主管':
            chatBot = '/api/chat-bot3';
            break;
          case '数字综合运营协调员':
            chatBot = '/api/chat-bot4';
            break;
          default:
            chatBot = '/api/chat-bot4';
            break;
        }
        
        console.log(`当前角色: ${currentRole}, 使用 API: ${chatBot}`);
        
        const chatResponse = await fetch(chatBot, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: val, role: currentRole })
        });
        
        if (!chatResponse.ok) {
          throw new Error('Chat API 请求失败');
        }
        
        // 处理流式响应
        const reader = chatResponse.body?.getReader();
        if (!reader) {
          throw new Error('无法获取响应流');
        }
        
        let accumulatedContent = '';
        let noDataContent = '';
        let conversationId: string | null = null;
        let finishFlag = false;
        
        // 读取流数据
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // 将数据转换为文本
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              try {
                const parsedData = JSON.parse(data);
                
                // 保存会话 ID
                if (parsedData.metadata?.conversation_id && !conversationId) {
                  conversationId = parsedData.metadata.conversation_id;
                }
                accumulatedContent += parsedData.content;
                
                if(currentMessageId && !finishFlag){
                  // 如果收到了<tools_data_result>就停止更新message
                  if (accumulatedContent.includes('<tools_data_result>')) {
                    finishFlag = true;
                    noDataContent = accumulatedContent.replace('<tools_data_result>', '');
                    
                    updateMsg(currentMessageId, {
                      type: 'markdown',
                      content: { text: noDataContent },
                      position: 'left',
                    });
                  }else {
                    // 每次更新都保持使用 markdown 类型
                    updateMsg(currentMessageId, {
                      type: 'markdown',
                      content: { text: accumulatedContent },
                      position: 'left',
                    });
                  }
                }
                
                // 如果收到结束事件，则保存完整回复
                if (parsedData.metadata?.event_type === 'message_end') {
                  
                  
                  // 将消息内容存入 Think 上下文
                  console.log('完整响应:', accumulatedContent);
                  
                  // 调用 data-format 接口获取格式化数据
                  fetch('/api/data-format', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      message: accumulatedContent,
                      role: 'user'
                    })
                  })
                  .then(response => response.json())
                  .then(data => {
                    // 从 data-format 接口响应中获取内容并设置到 
                    // 流式响应完成，获取数据完成，设置状态为 false
                    setIsStreaming(false);
                    setIsTyping(false); // 同时关闭打字指示器

                    setThinkData({
                      content: noDataContent,
                      parsedContent: {
                        layout: 'grid(2, 2)',
                        cards: data.cards,
                        charts: data.charts?.map((chart: any) => ({
                          ...chart,
                          data: typeof chart.data === 'string' ? chart.data : JSON.stringify(chart.data)
                        }))
                      },
                      metadata: {
                        type: 'dashboard',
                        timestamp: new Date().toISOString()
                      }
                    });
                  })
                  .catch(error => {
                    console.error('调用 data-format 接口出错:', error);
                  });
                  
                  break;
                }
              } catch (e) {
                console.error('解析流数据错误:', e, data);
              }
            }
          }
        }
      } catch (error) {
        console.error('发送消息时出错:', error);
        appendMsg({
          type: 'text',
          content: { text: '处理请求时出错' },
          position: 'left',
        });
        // 发生错误时，重置所有状态
        setIsStreaming(false);
        }
      setIsTyping(false); // 关闭打字指示器
    }
  }

  function handleQuickReplyClick(item: QuickReply) {
    handleSend('text', item.name);
  }

  const renderMessageContent = useCallback((msg: Message) => {
    const { type, content } = msg;
    console.log('msg', msg);
    
    // 如果消息内容为空且正在流式响应中，显示自定义的 loading 指示器
    if (type === 'markdown' && (!content?.text || content.text === '') && isStreaming && msg.position === 'left') {
      console.log('显示 loading 指示器', msg);
      return (
        <Bubble>
          <div className="flex items-center space-x-2 p-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
            <span className="text-sm text-indigo-300">正在生成响应...</span>
          </div>
        </Bubble>
      );
    }
    
    if (type === 'text' && content?.text) {
      return <Bubble content={content.text} />;
    }
    
    if (type === 'markdown' && content) {
      const text = typeof content === 'string' ? content : content?.text || '';
      const html = marked.parse(text);
      
      return (
        <div className="markdown-content p-6 bg-white/5 rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: html }} />

          {isStreaming && msg.position === 'left' && (
            <div className="flex items-center space-x-2 mt-3 border-t border-white/10 pt-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
              <span className="text-sm text-indigo-300">正在生成...</span>
            </div>
          )}
        </div>
      );
    }
    
    // 处理 think 类型消息
    if (type === 'think' && content) {
      console.log('Think 消息接收到:', content);
      
      try {
        // 将 think 内容保存到 ref 中，这样 useEffect 可以检测到并更新 ThinkContext
        if (content.parsedContent) {
          // thinkContentRef.current = JSON.stringify(content.parsedContent);
          console.log('设置 thinkContentRef:', thinkContentRef.current);
        }
      } catch (error) {
        console.error('处理 Think 消息失败:', error);
      }
      
      return (
        <Bubble>
          <Think isDone thinkTime={3}>
            <div className="p-4">
              <pre>{JSON.stringify(content, null, 2)}</pre>
            </div>
          </Think>
        </Bubble>
      );
    }
    
    // 处理旧的 dsl 类型消息（兼容性）
    if (type === 'dsl' && content) {
      console.log('DSL 消息接收到:', content);
      
      try {
        if("component_name" in content && content["component_name"] === "dashboard" ){
          console.log('dashboard', content);
          updateTremorDashboard(content["content"]);
          
          // 将 DSL 内容保存到 ref 中
          thinkContentRef.current = JSON.stringify(content["content"]);
          console.log('设置 thinkContentRef (DSL):', thinkContentRef.current);
        }
      } catch (error) {
        console.error('解析DSL失败:', error);
      }
      
      return (
        <Bubble>
          <Think isDone thinkTime={3}>
            <div className="p-4">
              <pre>{thinkContentRef.current}</pre>
            </div>
          </Think>
        </Bubble>
      );
    }
    
    return null;
  }, [isStreaming]); // 添加 isStreaming 作为依赖项，确保状态变化时函数重新创建

  interface DashboardConfig {
    layout?: string;
    cards?: Array<{
      type: string;
      metrics: Array<{
        title: string;
        value: string | number;
        trend?: string;
      }>;
    }>;
    charts?: Array<{
      type: string;
      data: Array<Record<string, any>>;
      title: string;
      xAxis?: string;
      yAxis?: string;
    }>;
  }

  function updateTremorDashboard(config: DashboardConfig) {
    // 这里实现更新Tremor大屏的逻辑
    console.log('更新Tremor大屏配置:', config);
    
    // 示例：更新卡片数据
    if (config.cards) {
      config.cards.forEach(card => {
        console.log('更新卡片:', card);
        // 实际更新逻辑需要根据具体UI框架实现
      });
    }
    
    // 示例：更新图表数据
    if (config.charts) {
      config.charts.forEach(chart => {
        console.log('更新图表:', chart.type, chart.data);
        // 实际更新逻辑需要根据具体UI框架实现
      });
    }
  }

  // 根据当前角色获取对应的快速回复选项
  const getQuickRepliesByRole = () => {
    return ROLE_QUICK_REPLIES[currentRole] || DEFAULT_QUICK_REPLIES;
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {isTyping && !isStreaming && (
        <div className="px-4 py-2 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="flex space-x-1 mr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
            <span>对方正在输入...</span>
          </div>
        </div>
      )}
      <Chat
        navbar={{ title: '' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={isStreaming ? () => {} : handleSend} // 流式响应过程中禁用发送功能
        locale="zh-CN"
        placeholder={isStreaming ? "正在生成响应..." : "请输入..."}
        ref={chatRef}
        toolbar={[]}
        quickReplies={isStreaming ? [] : getQuickRepliesByRole()} // 流式响应过程中隐藏快捷回复
        onQuickReplyClick={isStreaming ? () => {} : handleQuickReplyClick} // 流式响应过程中禁用快捷回复功能
      />
    </div>
  );
}