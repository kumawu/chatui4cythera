import i18n from '../i18n';

// 获取助手名称数组的函数
export const getAssistantNames = () => {
  const { t } = i18n;
  return [
    t('sidebar.assistantNames.energyAnalyst'),
    t('sidebar.assistantNames.envSpecialist'),
    t('sidebar.assistantNames.healthManager'),
    t('sidebar.assistantNames.coordinator')
  ];
};

// 获取助手描述数组的函数
export const getAssistantDescriptions = () => {
  const { t } = i18n;
  return [
    t('sidebar.descriptions.energyAnalyst'),
    t('sidebar.descriptions.envSpecialist'),
    t('sidebar.descriptions.healthManager'),
    t('sidebar.descriptions.coordinator')
  ];
};

// 获取助手状态数组的函数
export const getAssistantStatuses = () => {
  const { t } = i18n;
  return [
    t('sidebar.statuses.energyAnalyst'),
    t('sidebar.statuses.envSpecialist'),
    t('sidebar.statuses.healthManager'),
    t('sidebar.statuses.coordinator')
  ];
};
