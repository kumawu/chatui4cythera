import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en-US/translation.json';
import enCommon from './locales/en-US/common.json';
import zhTranslation from './locales/zh-CN/translation.json';
import zhCommon from './locales/zh-CN/common.json';

const resources = {
  'en-US': {
    translation: enTranslation,
    common: enCommon,
  },
  'zh-CN': {
    translation: zhTranslation,
    common: zhCommon,
  },
};

// 获取当前语言，优先使用localStorage中保存的语言，否则默认使用中文
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLngCfg') || 'en-US';
  }
  return 'en-US';
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // 添加语言检测器
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLngCfg',
      caches: ['localStorage'],
    },
  });

export default i18n;
