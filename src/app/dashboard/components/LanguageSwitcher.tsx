'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import i18n from '../../../i18n';

export const LanguageSwitcher = () => {
  const { i18n: i18nHook } = useTranslation();
  const [currentLang, setCurrentLang] = useState('zh');
  
  // 初始化当前语言状态
  useEffect(() => {
    setCurrentLang(i18nHook.language);
  }, [i18nHook.language]);

  // 切换语言函数
  const toggleLanguage = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    console.log('语言已切换为:', newLang);
    
    // 语言切换已由i18next-browser-languagedetector自动保存到localStorage
    // 不需要强制刷新页面
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md 
                 hover:bg-white/20 transition-colors text-white text-sm font-medium flex items-center"
    >
      {currentLang === 'zh' ? '中文' : 'English'}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 ml-1.5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
        />
      </svg>
    </button>
  );
};
