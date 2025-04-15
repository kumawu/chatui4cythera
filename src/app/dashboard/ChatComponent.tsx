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
import { useThinkContext, type ThinkData } from './ThinkContext';
import '@chatui/core/dist/index.css';
import './chat-styles.css';

interface Message {
  type: string;
  content?: {
    text?: string;
    [key: string]: any;
  };
  position?: 'left' | 'right' | 'center' | 'pop';
}

interface QuickReply {
  name: string;
  isNew?: boolean;
  isHighlight?: boolean;
}

const QUICK_REPLIES: QuickReply[] = [
  {
    name: '你好！',
    isNew: true
  },
  {
    name: '我需要技术支持',
    isHighlight: true
  },
  {
    name: '我想了解产品信息'
  }
];

async function sendMessage(message: string) {
  try {
    const response = await fetch('/api/daily-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    if (!response.ok) {
      throw new Error('请求失败');
    }
    return await response.json();
  } catch (error) {
    console.error('发送消息时出错:', error);
    return {
      type: 'text',
      content: '无法处理您的请求',
      position: 'left'
    };
  }
}

export default function ChatComponent() {
  const { messages, appendMsg } = useMessages([]);
  const { setThinkData } = useThinkContext();
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<any>(null);
  const thinkContentRef = useRef<string | null>(null);

  useEffect(() => {
    if (thinkContentRef.current) {
      const parsedContent = parseDashboardDSL(thinkContentRef.current);
      console.groupCollapsed('Think内容更新');
      console.log('原始内容:', thinkContentRef.current);
      console.log('解析后的配置:', parsedContent);
      console.groupEnd();
      
      setThinkData({
        content: thinkContentRef.current,
        parsedContent: parsedContent ? {
          layout: parsedContent.layout,
          cards: parsedContent.cards,
          charts: parsedContent.charts?.map(chart => ({
            ...chart,
            data: JSON.stringify(chart.data)
          }))
        } : undefined,
        metadata: {
          type: 'dashboard',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [messages, setThinkData]);

  async function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setIsTyping(true);
      try {
        const response = await sendMessage(val);
        // 检查response是否为数组
        if (Array.isArray(response)) {
          // 如果是数组，依次添加每个消息
          response.forEach(msg => {
            appendMsg({
              type: msg.type,
              content: typeof msg.content === 'string' ? { text: msg.content } : msg.content,
              position: msg.position,
            });
          });
        } else {
          // 如果不是数组，按原来的方式处理
          appendMsg({
            type: response.type,
            content: { text: response.content },
            position: response.position,
          });
        }
      } catch (error) {
        appendMsg({
          type: 'text',
          content: { text: '处理请求时出错' },
          position: 'left',
        });
      }
      setIsTyping(false);
    }
  }

  function handleQuickReplyClick(item: QuickReply) {
    handleSend('text', item.name);
  }

  const renderMessageContent = useCallback((msg: Message) => {
    const { type, content } = msg;
    console.log('msg', msg);
    if (type === 'text' && content?.text) {
      return <Bubble content={content.text} />;
    }
    
    if (type === 'markdown' && content) {
      const text = typeof content === 'string' ? content : content?.text || '';
      const html = marked.parse(text);
      
      return (
        <div className="markdown-content p-4 bg-white/5 rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      );
    }
    
    if (type === 'dsl' && content) {

      
      try {
          console.log(content);
          if("component_name" in content && content["component_name"] === "dashboard" ){
            console.log('dashboard', content);
            updateTremorDashboard(content["content"]);
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
  }, []); // 空依赖数组，表示这个函数只会创建一次

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

  // 辅助函数：解析Dashboard DSL配置
  function parseDashboardDSL(dslContent: string): DashboardConfig | null {
    // 提取dashboard配置块
    const dashboardRegex = /dashboard\s*{([\s\S]*?)}/;
    const dashboardMatch = dslContent.match(dashboardRegex);
    
    if (!dashboardMatch) {
      return null;
    }
    
    const configContent = dashboardMatch[1];
    
    try {
      const result: DashboardConfig = {};
      
      // 提取layout
      const layoutMatch = configContent.match(/layout:\s*([^\s;]+)/);
      if (layoutMatch) {
        result.layout = layoutMatch[1];
      }
      
      // 提取cards
      const cardRegex = /card\s*{([\s\S]*?)}/g;
      let cardMatch;
      result.cards = [];
      
      while ((cardMatch = cardRegex.exec(configContent)) !== null) {
        const cardContent = cardMatch[1];
        const typeMatch = cardContent.match(/type:\s*"([^"]+)"/);
        const metricsMatch = cardContent.match(/metrics:\s*\[([\s\S]*?)\]/);
        
        if (typeMatch && metricsMatch) {
          const metrics = metricsMatch[1]
            .split('},')
            .map(metricStr => {
              const titleMatch = metricStr.match(/title:\s*"([^"]+)"/);
              const valueMatch = metricStr.match(/value:\s*([^,}]+)/);
              const trendMatch = metricStr.match(/trend:\s*"([^"]+)"/);
              
              const metric: {
                title: string;
                value: string | number;
                trend?: string;
              } = {
                title: titleMatch ? titleMatch[1] : '',
                value: valueMatch ? valueMatch[1].replace(/"/g, '') : ''
              };
              
              if (trendMatch) {
                metric.trend = trendMatch[1];
              }
              
              // 尝试将value转换为数字
              if (!isNaN(Number(metric.value))) {
                metric.value = Number(metric.value);
              }
              
              return metric;
            });
          
          result.cards.push({
            type: typeMatch[1],
            metrics
          });
        }
      }
      
      // 提取charts
      const chartRegex = /chart\s*{([\s\S]*?)}/g;
      let chartMatch;
      result.charts = [];
      
      while ((chartMatch = chartRegex.exec(configContent)) !== null) {
        const chartContent = chartMatch[1];
        const typeMatch = chartContent.match(/type:\s*"([^"]+)"/);
        const titleMatch = chartContent.match(/title:\s*"([^"]+)"/);
        const xAxisMatch = chartContent.match(/xAxis:\s*"([^"]+)"/);
        const yAxisMatch = chartContent.match(/yAxis:\s*"([^"]+)"/);
        
        const chart: {
          type: string;
          data: Array<Record<string, any>>;
          title: string;
          xAxis?: string;
          yAxis?: string;
        } = {
          type: typeMatch ? typeMatch[1] : '',
          data: [],
          title: titleMatch ? titleMatch[1] : ''
        };
        
        if (xAxisMatch) {
          chart.xAxis = xAxisMatch[1];
        }
        if (yAxisMatch) {
          chart.yAxis = yAxisMatch[1];
        }
        
        // 根据图表类型生成示例数据
        let data: Array<Record<string, any>> = [];
        if (chart.type === 'bar') {
          data = [
            { name: "1月", value: 120 },
            { name: "2月", value: 150 },
            { name: "3月", value: 180 },
            { name: "4月", value: 200 },
            { name: "5月", value: 220 },
            { name: "6月", value: 250 },
            { name: "7月", value: 280 }
          ];
        } else if (chart.type === 'line') {
          data = [
            { range: "0-10k", count: 50 },
            { range: "10-20k", count: 110 },
            { range: "20-30k", count: 90 },
            { range: "30k+", count: 50 }
          ];
        } else if (chart.type === 'pie' || chart.type === 'radar') {
          data = [
            { name: "工程师", value: 100 },
            { name: "市场", value: 60 },
            { name: "销售", value: 50 },
            { name: "设计", value: 25 },
            { name: "HR", value: 45 }
          ];
        }
        
        result.charts.push({
          ...chart,
          data
        });
      }
      
      return result;
    } catch (error) {
      console.error('DSL解析错误:', error);
      return null;
    }
  }

  // 辅助函数：从DSL内容中提取特定属性值
  function extractValue(content: string, key: string): string | null {
    const regex = new RegExp(`${key}\\s*:\\s*["']?([^,"'\\n\\r}]*)["']?`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  // 辅助函数：提取指标数组
  function extractMetrics(content: string): Array<{title: string | null; value: string | null; trend: string | null}> {
    if (!content.includes('metrics')) {
      return [];
    }
    
    const metricsStart = content.indexOf('metrics');
    const metricsEnd = content.indexOf(']', metricsStart);
    if (metricsStart === -1 || metricsEnd === -1) {
      return [];
    }
    
    const metricsContent = content.substring(metricsStart, metricsEnd + 1);
    const metricObjects = metricsContent.match(/{([^}]*)}/g) || [];
    
    return metricObjects.map(metricStr => {
      return {
        title: extractValue(metricStr, 'title'),
        value: extractValue(metricStr, 'value'),
        trend: extractValue(metricStr, 'trend')
      };
    });
  }

  return (
    <div className="h-full flex flex-col bg-transparent">
      <Chat
        navbar={{ title: '' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        locale="zh-CN"
        placeholder="请输入..."
        ref={chatRef}
        toolbar={[]}
        quickReplies={QUICK_REPLIES}
        onQuickReplyClick={handleQuickReplyClick}
      />
    </div>
  );
}