// frontend/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locale/en.json';
import translationVI from './locale/vi.json';
import translationCN from './locale/cn.json';

const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  },
  cn: {
    translation: translationCN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
