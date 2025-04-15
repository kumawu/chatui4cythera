import { createContext, useContext, ReactNode, useState } from 'react';

export type ThinkData = {
  // 定义Think数据的类型
  content: string;
  parsedContent?: {
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
      data: string;
      title: string;
      xAxis?: string;
      yAxis?: string;
    }>;
  };
  metadata?: Record<string, any>;
};

type ThinkContextType = {
  thinkData: ThinkData | null;
  setThinkData: (data: ThinkData | ((prev: ThinkData | null) => ThinkData)) => void;
};

const ThinkContext = createContext<ThinkContextType | null>(null);

export function ThinkProvider({ children }: { children: ReactNode }) {
  const [thinkData, setThinkData] = useState<ThinkData | null>(null);

  return (
    <ThinkContext.Provider value={{ thinkData, setThinkData }}>
      {children}
    </ThinkContext.Provider>
  );
}

export function useThinkContext() {
  const context = useContext(ThinkContext);
  if (!context) {
    throw new Error('useThinkContext must be used within a ThinkProvider');
  }
  return context;
}