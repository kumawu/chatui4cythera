'use client';
import { ThinkProvider } from './ThinkContext';
import { DashboardContent } from './components/DashboardContent';

// 主页面组件
export default function DashboardPage() {
  return (
    <ThinkProvider>
      <DashboardContent />
    </ThinkProvider>
  );
}