'use client';
import { useState, useEffect, useRef } from 'react';
import { ThinkProvider } from './ThinkContext';

const ASSISTANT_NAMES = [
  '日报助手',
  '行业分析师',
  '直播数据分析师',
  '企业分析师',
  '智能风控师',
  '用户行为分析师'
];
import dynamic from 'next/dynamic';
const ChatComponent = dynamic<{}>(() => import('./ChatComponent').then(mod => mod.default), {
  ssr: false
});
import { Card, Metric, Text } from "@tremor/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";

const data = [
  {
    name: "Jan",
    candidates: 120,
    positions: { engineering: 40, marketing: 30, sales: 20, design: 15, hr: 15 },
    skills: { javascript: 35, python: 25, java: 20, react: 30, sql: 10 },
    salaryRange: { "0-10k": 20, "10-20k": 50, "20-30k": 30, "30k+": 20 },
    experience: { "0-1年": 30, "1-3年": 50, "3-5年": 25, "5+年": 15 }
  },
  {
    name: "Feb",
    candidates: 150,
    positions: { engineering: 50, marketing: 35, sales: 25, design: 20, hr: 20 },
    skills: { javascript: 40, python: 30, java: 25, react: 35, sql: 20 },
    salaryRange: { "0-10k": 25, "10-20k": 60, "20-30k": 40, "30k+": 25 },
    experience: { "0-1年": 35, "1-3年": 60, "3-5年": 30, "5+年": 25 }
  },
  {
    name: "Mar",
    candidates: 180,
    positions: { engineering: 60, marketing: 40, sales: 30, design: 25, hr: 25 },
    skills: { javascript: 50, python: 35, java: 30, react: 40, sql: 25 },
    salaryRange: { "0-10k": 30, "10-20k": 70, "20-30k": 50, "30k+": 30 },
    experience: { "0-1年": 40, "1-3年": 70, "3-5年": 40, "5+年": 30 }
  },
  {
    name: "Apr",
    candidates: 200,
    positions: { engineering: 70, marketing: 45, sales: 35, design: 30, hr: 30 },
    skills: { javascript: 60, python: 40, java: 35, react: 45, sql: 30 },
    salaryRange: { "0-10k": 35, "10-20k": 80, "20-30k": 60, "30k+": 35 },
    experience: { "0-1年": 45, "1-3年": 80, "3-5年": 50, "5+年": 35 }
  },
  {
    name: "May",
    candidates: 220,
    positions: { engineering: 80, marketing: 50, sales: 40, design: 35, hr: 35 },
    skills: { javascript: 70, python: 45, java: 40, react: 50, sql: 35 },
    salaryRange: { "0-10k": 40, "10-20k": 90, "20-30k": 70, "30k+": 40 },
    experience: { "0-1年": 50, "1-3年": 90, "3-5年": 60, "5+年": 40 }
  },
  {
    name: "Jun",
    candidates: 250,
    positions: { engineering: 90, marketing: 55, sales: 45, design: 40, hr: 40 },
    skills: { javascript: 80, python: 50, java: 45, react: 55, sql: 40 },
    salaryRange: { "0-10k": 45, "10-20k": 100, "20-30k": 80, "30k+": 45 },
    experience: { "0-1年": 55, "1-3年": 100, "3-5年": 70, "5+年": 45 }
  },
  {
    name: "Jul",
    candidates: 280,
    positions: { engineering: 100, marketing: 60, sales: 50, design: 25, hr: 45 },
    skills: { javascript: 90, python: 55, java: 50, react: 60, sql: 45 },
    salaryRange: { "0-10k": 50, "10-20k": 110, "20-30k": 90, "30k+": 50 },
    experience: { "0-1年": 60, "1-3年": 110, "3-5年": 25, "5+年": 50 }
  }
];

export default function DashboardPage() {
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isDragging, setIsDragging] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    "系统：欢迎新成员加入团队",
    "提醒：本周五下午3点团队会议",
    "通知：系统将于今晚10点进行维护升级",
    "警报：服务器CPU使用率超过80%",
    "更新：新版本v1.2.0已发布",
    "提示：请及时更新您的个人信息",
    "公告：年度绩效考核即将开始"
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newWidth = window.innerWidth - e.clientX;
        setSidebarWidth(Math.max(200, Math.min(500, newWidth)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
          }
        }, 100);
      }
    };

    scrollToBottom();
    
    const scrollInterval = setInterval(scrollToBottom, 1000);
    
    return () => clearInterval(scrollInterval);
  }, [messages]);

  // 模拟新消息到达
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = `新消息: ${new Date().toLocaleTimeString()}`;
      setMessages(prev => [...prev.slice(-6), newMessage]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThinkProvider>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-3xl"
    >
      {/* 左侧主内容区域 */}
      <div className="flex-1 overflow-y-auto p-12 space-y-12 auto-hide-scrollbar bg-gradient-to-br from-indigo-950 to-purple-950">
        <h1 className="text-4xl font-bold text-white">招聘数据</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Text className="text-gray-300">总候选人</Text>
            <Metric className="text-white">1,500</Metric>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Text className="text-gray-300">热门职位</Text>
            <Metric className="text-white">工程师</Metric>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <Text className="text-gray-300">平均薪资</Text>
            <Metric className="text-white">18k</Metric>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">月度数据</h2>
            <div className="h-[400px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                    }}
                    itemStyle={{
                      color: "white",
                      fontWeight: "500"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="candidates" fill="#3B82F6" name="候选人数量" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">职位分布</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(data[0].positions).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.keys(data[0].positions).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    itemStyle={{ color: "#F3F4F6" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">技能分布</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Object.entries(data[0].skills).map(([skill, value]) => ({ skill, value }))}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
                  <Radar name="技能掌握度" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    itemStyle={{ color: "#F3F4F6" }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">薪资范围分布</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={Object.entries(data[0].salaryRange).map(([range, count]) => ({ range, count }))}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                    itemStyle={{ color: "#F3F4F6" }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
{/* 可拖拽分割线 */}
<div
  className="w-2 relative"
  onMouseDown={() => setIsDragging(true)}
>
  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/20 group-hover:bg-white/40 transition-colors" />
  <div className="absolute inset-y-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-col-resize hover:bg-white/20 transition-all">
    <div className="w-1 h-4 bg-white/50 rounded-full" />
  </div>
</div>

{/* 右侧边栏 */}
<div style={{ width: `${sidebarWidth}px` }} className="h-full p-6 overflow-y-auto auto-hide-scrollbar bg-gradient-to-b from-indigo-950/80 to-purple-950/80 backdrop-blur-3xl border-l border-white/10">
  {!activeChat ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => {
          const descriptions = [
            "自动生成每日工作报告，分析关键指标",
            "跟踪行业动态，提供深度分析报告",
            "监控直播数据，优化直播效果",
            "分析企业数据，提供商业洞察",
            "识别潜在风险，提供风控建议",
            "分析用户行为，优化产品体验"
          ];
          const statuses = [
            "运行中 - 处理今日报告",
            "分析中 - 生成行业报告",
            "监控中 - 直播数据正常",
            "分析中 - 企业数据更新",
            "预警中 - 发现潜在风险",
            "优化中 - 用户行为分析"
          ];
          
          return (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setActiveChat(i + 1)}
                className="flex items-center gap-4 w-full"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${i}`}
                    alt={`Avatar ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-white">{ASSISTANT_NAMES[i]}</h3>
                  <p className="text-sm text-white/80 mt-1">{descriptions[i]}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      i % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
                    <span className="text-xs text-white/70">{statuses[i]}</span>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold text-white mb-4">最新消息</h2>
        <div className="h-48 overflow-hidden relative">
          <div className="animate-scroll space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg text-white/80 text-sm">
                {msg}
              </div>
            ))}
            {/* 复制前面的消息，确保无缝滚动 */}
            {messages.map((msg, i) => (
              <div key={`dup-${i}`} className="p-3 bg-white/5 rounded-lg text-white/80 text-sm">
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6 p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
        <button
          onClick={() => setActiveChat(null)}
          className="text-white/80 hover:text-white transition-all flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回
        </button>
        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent max-w-[50%] truncate md:max-w-none md:whitespace-normal">
          与{activeChat ? ASSISTANT_NAMES[activeChat - 1] : ''}对话
        </h2>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-all hover:shadow-xl">
        <ChatComponent key={activeChat} />
      </div>
    </motion.div>
  )}
</div>
      </motion.div>
    </ThinkProvider>
  );
}