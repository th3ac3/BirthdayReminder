import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import format from './format';
import en from './en';

const resources = {
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
    format,
  },
});

export default i18n;
