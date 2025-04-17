import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import enCommon from './locales/en/common.json';
import zhTranslation from './locales/zh/translation.json';
import zhCommon from './locales/zh/common.json';

const resources = {
  en: {
    translation: enTranslation,
    common: enCommon,
  },
  zh: {
    translation: zhTranslation,
    common: zhCommon,
  },
};

// 获取当前语言，优先使用localStorage中保存的语言，否则默认使用中文
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng') || 'zh';
  }
  return 'zh';
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // 添加语言检测器
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
