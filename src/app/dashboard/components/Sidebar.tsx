import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import '../../../i18n';
import { getAssistantNames, getAssistantDescriptions, getAssistantStatuses } from '../../../config/assistants';

const ChatComponent = dynamic<{ currentRole?: string }>(() => import('./ChatComponent').then(mod => mod.default), {
  ssr: false
});

interface SidebarProps {
  activeChat: number | null;
  setActiveChat: (chat: number | null) => void;
  messages: string[];
  sidebarWidth: number;
}

// 侧边栏组件
export const Sidebar = ({ activeChat, setActiveChat, messages, sidebarWidth }: SidebarProps) => {
  return (
    <div style={{ width: `${sidebarWidth}px` }} className="h-full p-6 overflow-y-auto auto-hide-scrollbar bg-gradient-to-b from-indigo-950/80 to-purple-950/80 backdrop-blur-3xl border-l border-white/10">
      {!activeChat ? (
        <AssistantList messages={messages} setActiveChat={setActiveChat} />
      ) : (
        <ChatView activeChat={activeChat} setActiveChat={setActiveChat} />
      )}
    </div>
  );
};

// 助手列表组件
interface AssistantListProps {
  messages: string[];
  setActiveChat: (chat: number | null) => void;
}

const AssistantList = ({ messages, setActiveChat }: AssistantListProps) => {
  const { t, i18n } = useTranslation('translation');
  // 使用全局配置中的助手名称
  const ASSISTANT_NAMES = getAssistantNames();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => {
          // 使用全局配置中的助手描述和状态
          const descriptions = getAssistantDescriptions();
          const statuses = getAssistantStatuses();
          
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
        <h2 className="text-xl font-bold text-white mb-4">{t('sidebar.latestMessages', '最新消息')}</h2>
        <div className="h-58 overflow-hidden relative">
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
  );
};

// 聊天视图组件
interface ChatViewProps {
  activeChat: number;
  setActiveChat: (chat: number | null) => void;
}

const ChatView = ({ activeChat, setActiveChat }: ChatViewProps) => {
  const { t } = useTranslation('translation');
  // 使用全局配置中的助手名称
  const ASSISTANT_NAMES = getAssistantNames();
  return (
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
          {t('sidebar.back', '返回')}
        </button>
        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent max-w-[50%] truncate md:max-w-none md:whitespace-normal ml-1">
          {t('sidebar.chatWith', { name: activeChat ? ASSISTANT_NAMES[activeChat - 1] : '' })}
        </h2>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition-all hover:shadow-xl">
        <ChatComponent key={activeChat} currentRole={ASSISTANT_NAMES[activeChat - 1]} />
      </div>
    </motion.div>
  );
};
