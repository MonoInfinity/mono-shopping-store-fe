import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next.use(LanguageDetector)
        .use(initReactI18next)
        .init({
                fallbackLng: 'en',
                supportedLngs: ['en', 'vi'],
                debug: false,

                detection: {},

                saveMissing: false,
                interpolation: {
                        escapeValue: false,
                },
        });

export default i18next;
