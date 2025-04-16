import { useState, useEffect, useRef } from 'react';
import { useThinkContext } from '../ThinkContext';
import { motion } from "framer-motion";
import { CardGrid } from './CardGrid';
import { ChartGrid } from './EChartComponent';
import { Sidebar } from './Sidebar';
import { DeviceGrid } from './DeviceGrid';

// 类型定义
export interface CardData {
  title: string;
  value: string | number;
  trend?: string;
}

export interface ChartData {
  type: string;
  data: any[];
  title: string;
  xAxis?: string;
  yAxis?: string;
}

export interface DeviceData {
  apiVersion: string;
  statusCode: number;
  totalCount: number;
  devices: Device[];
}

export interface Device {
  id: string;
  name: string;
  description: string;
  adminState: string;
  operatingState: string;
  labels: string[];
  serviceName: string;
  profileName: string;
  created: number;
  modified: number;
  autoEvents?: AutoEvent[];
  protocols: Record<string, any>;
  properties: Record<string, any>;
}

export interface AutoEvent {
  interval: string;
  onChange: boolean;
  sourceName: string;
}

// 助手名称常量
export const ASSISTANT_NAMES = ["数据分析助手", "能源管理助手", "设备监控助手"];


// 仪表板内容组件
export const DashboardContent = () => {
  const { thinkData } = useThinkContext();
  
  // 仪表板状态
  const [cardData, setCardData] = useState<CardData[]>([
    {
      "title": "总用电量",
      "value": "1880 kWh",
      "trend": "较正常值异常增高42%"
    },
    {
        "title": "最大异常日期",
        "value": "2025-04-11"
    },
    {
        "title": "每月预计节约电量",
        "value": "120 kWh"
    }
  ]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [dashboardTitle, setDashboardTitle] = useState("数据概览");
  
  // 设备数据状态
  const [deviceData, setDeviceData] = useState<DeviceData>({
    apiVersion: "v3",
    statusCode: 200,
    totalCount: 0,
    devices: []
  });
  
  // 从 API 获取设备数据
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices?offset=0&limit=10');
        if (!response.ok) {
          throw new Error(`设备 API 请求失败: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('从 API 获取的设备数据:', data);
        
        setDeviceData(data);
      } catch (error) {
        console.error('获取设备数据出错:', error);
      }
    };
    
    fetchDevices();
  }, []);
  
  // 侧边栏状态
  const [sidebarWidth] = useState(320);
  const [isChatActive, setIsChatActive] = useState(false); // 添加聊天模式状态
  const [messages, setMessages] = useState<string[]>([
    "数字能效分析师：能源消耗数据分析报告已生成，本月节能率提升12%",
    "数字环境专员：冷库温度波动超出预设范围，建议检查制冷系统",
    "数字安防监控员：监控到3号区域有未授权人员活动，已自动记录",
    "数字设备健康主管：2号生产线设备预测性维护提醒，建议下周检修",
    "数字综合运营协调员：已整合各部门数据，月度运营报告可在系统查看",
    "数字能效分析师：发现能耗异常峰值，可能存在设备效率问题",
    "数字环境专员：环境监测系统显示空气质量指数良好，符合生产标准"
  ]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  
  // 当 activeChat 改变时，更新聊天模式状态
  useEffect(() => {
    setIsChatActive(activeChat !== null);
  }, [activeChat]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 处理发送消息
  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, `用户: ${message}`]);
    // 这里可以添加实际的消息发送逻辑
  };
  
  // 切换聊天模式
  const toggleChatMode = (isActive: boolean) => {
    setIsChatActive(isActive);
  };

  // 消息滚动到底部
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 监听 thinkData 变化，更新仪表板
  useEffect(() => {
    if (!thinkData?.parsedContent) return;
    
    console.log("ThinkData 更新:", thinkData);
    
    // 更新卡片数据
    if (thinkData.parsedContent.cards && thinkData.parsedContent.cards.length > 0) {
      const newCardData = thinkData.parsedContent.cards.flatMap(card => 
        card.metrics.map(metric => ({
          title: metric.title,
          value: metric.value,
          trend: metric.trend
        }))
      );
      
      if (newCardData.length > 0) {
        setCardData(newCardData);
      }
    }
    
    // 更新图表数据
    if (thinkData.parsedContent.charts && thinkData.parsedContent.charts.length > 0) {
      try {
        // 从 thinkData 中提取图表数据
        const chartDataFromThink = thinkData.parsedContent.charts.map((chart: any) => ({
          type: chart.type,
          data: typeof chart.data === 'string' ? JSON.parse(chart.data) : chart.data,
          title: chart.title,
          xAxis: chart.xAxis || '',
          yAxis: chart.yAxis || ''
        }));
        
        console.log('解析后的图表数据:', chartDataFromThink);
        
        // 直接保存图表数据，用于动态渲染
        setChartData(chartDataFromThink);
        
      } catch (error) {
        console.error("解析图表数据错误:", error);
      }
    }
    
    // 更新标题
    if (thinkData.metadata?.title) {
      setDashboardTitle(thinkData.metadata.title);
    }
    
    // 添加新消息
    if (thinkData.content) {
      // 根据当前活跃的聊天助手添加消息
      const assistantName = activeChat !== null && activeChat >= 0 && activeChat < ASSISTANT_NAMES.length
        ? ASSISTANT_NAMES[activeChat - 1] // 修正索引计算，因为 activeChat 从 1 开始
        : ASSISTANT_NAMES[0];
        
      const newMessage = `${assistantName}：${thinkData.content.substring(0, 50)}${thinkData.content.length > 50 ? '...' : ''}`;
      setMessages(prev => [...prev.slice(-6), newMessage]);
    }
  }, [thinkData, activeChat]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-3xl"
    >
      {/* 左侧主内容区域 */}
      <div className="flex-1 overflow-y-auto p-12 space-y-12 auto-hide-scrollbar bg-gradient-to-br from-indigo-950 to-purple-950">
        <h1 className="text-4xl font-bold text-white">{dashboardTitle}</h1>
        
        {/* 卡片网格 */}
        <div className="mb-8">
          <CardGrid cardData={cardData} />
        </div>
        
        {/* 图表网格 */}
        <div className="mb-8">
          <ChartGrid chartData={chartData}/>
        </div>
        
        {/* 设备网格 */}
        <div className="mb-8">
          <DeviceGrid deviceData={deviceData} />
        </div>
      </div>
      
      {/* 可拖拽分割线 */}
      <div
        className="w-2 relative cursor-col-resize"
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/20 hover:bg-white/40 transition-colors" />
        <div className="absolute inset-y-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all">
          <div className="w-1 h-4 bg-white/50 rounded-full" />
        </div>
      </div>
      
      {/* 右侧边栏 - 在聊天模式下加宽 */}
      <div className={`${isChatActive ? 'w-[640px]' : 'w-[320px]'} h-full transition-all duration-300 ease-in-out`}>
        <Sidebar 
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          messages={messages}
          sidebarWidth={isChatActive ? 640 : sidebarWidth} // 根据聊天模式动态调整宽度
        />
      </div>
    </motion.div>
  );
};
