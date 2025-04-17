import i18n from '../i18n';
import { getAssistantNames } from './assistants';

// 快速回复选项类型
export interface QuickReply {
  name: string;
  isNew?: boolean;
  isHighlight?: boolean;
}

// 获取快速回复选项的函数
export const getQuickRepliesByRole = (role: string): QuickReply[] => {
  const { t } = i18n;
  
  // 获取助手名称数组
  const assistantNames = getAssistantNames();
  
  // 根据角色名称返回对应的快速回复选项
  const quickRepliesMap: Record<string, QuickReply[]> = {
    // 数字能效分析师
    [assistantNames[0]]: [
      { name: t('quickReplies.energyAnalyst.lighting', '💡照明系统是不是开得太久了？有节省空间吗？🤔') },
      { name: t('quickReplies.energyAnalyst.ac', '💨这几天挺热🌡️，我想知道空调用电是不是超了？🤔') }
    ],
    // 数字环境专员
    [assistantNames[1]]: [
      { name: t('quickReplies.envSpecialist.coldStorage', '📡冷库环境最近波动大，是不是外面太热？') },
      { name: t('quickReplies.envSpecialist.alerts', '🚨有没有严重告警要立即处理？') }
    ],
    // 数字设备健康主管
    [assistantNames[2]]: [
      { name: t('quickReplies.healthManager.trend', '🔍调出最近3天空调用电趋势，我看看变化。') },
      { name: t('quickReplies.healthManager.abnormal', '🛠有没有哪台空调的能耗曲线特别奇怪？') }
    ],
    // 数字综合运营协调员
    [assistantNames[3]]: [
      { name: t('quickReplies.coordinator.status', '🔎 今天整体状况如何？') },
      { name: t('quickReplies.coordinator.trend', '📈 最近总能耗趋势怎么样？') }
    ]
  };
  
  return quickRepliesMap[role] || [];
};
