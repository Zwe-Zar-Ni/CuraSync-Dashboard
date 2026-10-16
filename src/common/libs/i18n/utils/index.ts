import type { LanguageOption } from '../types';

const LANG_KEY = 'language';

export const getLanguage = () => {
  const language = localStorage.getItem(LANG_KEY);
  return language || 'en';
};

export const setLanguage = (language: LanguageOption) => {
  localStorage.setItem(LANG_KEY, language);
};
