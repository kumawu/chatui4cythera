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
import '../../../i18n';
import { useTranslation } from 'react-i18next';
import { getQuickRepliesByRole, type QuickReply } from '../../../config/quickReplies';
import { getAssistantNames } from '../../../config/assistants';

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

// 已在全局配置文件中定义 QuickReply 接口和快速回复选项

interface ChatComponentProps {
  currentRole?: string;
}

export default function ChatComponent({ currentRole = '' }: ChatComponentProps) {
  const { t, i18n } = useTranslation('translation');
  const { messages, appendMsg, updateMsg } = useMessages([]);
  const { setThinkData } = useThinkContext();
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false); // 添加流式响应状态
  const chatRef = useRef<any>(null);
  const thinkContentRef = useRef<string | null>(null);
  const dataFormatRequestedRef = useRef<boolean>(false); // 用于跟踪是否已经请求过 data-format

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
          console.log('直接解析失败');
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
        
        // 使用统一的聊天API路由
        const chatBot = '/api/chat';
        
        console.log(`当前角色: ${currentRole}, 使用统一API: ${chatBot}`);
        
        // 获取当前语言的助手名称数组
        const assistantNames = getAssistantNames();
        
        // 根据角色名称获取助手索引
        let assistantIndex = -1;
        for (let i = 0; i < assistantNames.length; i++) {
          if (currentRole === assistantNames[i]) {
            assistantIndex = i;
            break;
          }
        }
        
        console.log(`助手索引: ${assistantIndex}`);
        
        const chatResponse = await fetch(chatBot, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: val, 
            role: currentRole, 
            assistantIndex, 
            language: i18n.language 
          })
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
        let noToolDataContent = '';
        let conversationId: string | null = null;
        let finishFlag = false;
        
        // 重置 data-format 请求状态
        dataFormatRequestedRef.current = false;
        
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
                // 检查数据是否是有效的JSON格式
                if (!data || data.trim() === '') {
                  console.warn('收到空数据');
                  continue;
                }
                
                // 尝试解析JSON
                let parsedData;
                try {
                  parsedData = JSON.parse(data);
                } catch (jsonError) {
                  console.warn('JSON解析错误:', data, jsonError);
                  continue; // 跳过这个数据块
                }
                
                // 检查解析后的数据是否有效
                if (!parsedData || typeof parsedData !== 'object') {
                  console.warn('解析后的数据无效:', parsedData);
                  continue;
                }
                
                // 保存会话 ID
                if (parsedData.metadata?.conversation_id && !conversationId) {
                  conversationId = parsedData.metadata.conversation_id;
                }
                
                // 过滤掉 <tools_data_result>...</tools_data_result> 标签及其内容
                const filteredContent = parsedData.content ? parsedData.content.replace(/<tools_data_result>[\s\S]*?<\/tools_data_result>/g, '') : '';
                
                // 确保 parsedData.content 存在才添加到累积内容中
                if (parsedData.content) {
                  accumulatedContent += parsedData.content;
                  noToolDataContent += filteredContent;
                  
                  // 更新消息内容，确保内容不为空
                  updateMsg(currentMessageId, {
                    type: 'markdown',
                    content: { text: noToolDataContent || ' ' }, // 确保至少有一个空格，避免空内容问题
                    position: 'left',
                  });
                }

                if(parsedData.metadata?.event_type === 'message_end'){
                  // 流式响应完成，获取数据完成，设置状态为 false
                  setIsStreaming(false);
                  setIsTyping(false); // 同时关闭打字指示器
                }

                // 如果消息中包含完整的tools_data_result标签，则处理数据格式化
                // 添加锁机制，确保只触发一次 data-format 请求
                if (!dataFormatRequestedRef.current && 
                    accumulatedContent.includes('<tools_data_result>') && 
                    accumulatedContent.includes('</tools_data_result>')) {
                  
                  // 设置锁，防止重复请求
                  dataFormatRequestedRef.current = true;
                  
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
                      role: 'user',
                      language: i18n.language
                    })
                  })
                  .then(response => response.json())
                  .then(data => {
                    // 从 data-format 接口响应中获取内容并设置到 ThinkContext
                  
                  
                  // 检查返回的数据是否有效
                  if (!data || (!data.cards && !data.charts)) {
                    console.warn('从 data-format 接口返回的数据无效:', data);
                    return;
                  }

                  setThinkData({
                      content: noToolDataContent,
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
                    // 更新消息，添加错误提示
                    const errorMessage = noToolDataContent + '\n\n> **注意**: 数据处理过程中发生错误，部分内容可能无法正确显示。';
                    updateMsg(currentMessageId, {
                      type: 'markdown',
                      content: { text: errorMessage },
                      position: 'left',
                    });
                  });
                  
                  break;
                }
              } catch (e) {
                setIsStreaming(false);
                setIsTyping(false); // 同时关闭打字指示器
                console.error('解析流数据错误:', e, data);
              }
            }
          }
        }
      } catch (error) {
        console.error('发送消息时出错:', error);
        // 提供更详细的错误信息给用户
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        appendMsg({
          type: 'markdown',
          content: { text: `**处理请求时出错**\n\n可能的原因: ${errorMessage}\n\n请稍后重试或联系管理员。` },
          position: 'left',
        });
        // 发生错误时，重置所有状态
        setIsStreaming(false);
        // 重置 data-format 请求状态
        dataFormatRequestedRef.current = false;
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
          <div className="flex items-center space-x-3 p-3">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
            <span className="text-sm text-indigo-500">{t('chat.generating')}</span>
          </div>
        </Bubble>
      );
    }
    
    if (type === 'text' && content?.text) {
      return <Bubble content={content.text} />;
    }
    
    if (type === 'markdown' && content) {
      // 确保 content 是有效的，并提取文本内容
      const text = typeof content === 'string' ? content : content?.text || '';
      
      // 安全地解析 markdown，捕获可能的错误
      let html = '';
      try {
        // marked.parse 返回字符串，不是 Promise
        html = marked.parse(text) as string;
      } catch (error) {
        console.error('Markdown 解析错误:', error);
        html = `<p>内容解析错误: ${text}</p>`;
      }
      
      return (
        <div style={{ padding: '0.8rem' }} className="markdown-content bg-white/5 rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: html }} />

          {isStreaming && msg.position === 'left' && (
            <div className="flex items-center space-x-2 mt-3 border-t border-white/10 pt-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
              <span className="text-sm text-indigo-300">{t('chat.generating')}</span>
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

  // 使用全局配置文件中的函数获取快速回复选项

  return (
    <div className="h-full flex flex-col bg-transparent p-4">
      {isTyping && !isStreaming && (
        <div className="px-4 py-2 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="flex space-x-1 mr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
            <span>{t('chat.typing', '对方正在输入...')}</span>
          </div>
        </div>
      )}
      <Chat
        navbar={{ title: '' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={isStreaming ? () => {} : handleSend} // 流式响应过程中禁用发送功能
        locale="en"
        placeholder={isStreaming ? t('chat.placeholder') : t('chat.placeholder')}
        ref={chatRef}
        toolbar={[]}
        quickReplies={isStreaming ? [] : getQuickRepliesByRole(currentRole)} // 流式响应过程中隐藏快捷回复
        onQuickReplyClick={isStreaming ? () => {} : handleQuickReplyClick} // 流式响应过程中禁用快捷回复功能
      />
    </div>
  );
}