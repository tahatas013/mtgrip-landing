/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import tr from '../locales/tr.json';
import en from '../locales/en.json';
import de from '../locales/de.json';

const translations = { tr, en, de };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('mtgrip_lang');
    return saved && translations[saved] ? saved : 'tr';
  });

  useEffect(() => {
    localStorage.setItem('mtgrip_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (keys) => {
    return keys.split('.').reduce((obj, key) => {
      return obj && obj[key] ? obj[key] : keys;
    }, translations[lang]);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
