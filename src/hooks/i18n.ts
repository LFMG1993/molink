import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from '../locales/es.json';
import en from '../locales/en.json';
import landingEs from '../locales/landing.es.json';
import landingEn from '../locales/landing.en.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                translation: {
                    ...es,
                    ...landingEs
                }
            },
            en: {
                translation: {
                    ...en,
                    ...landingEn
                }
            }
        },
        fallbackLng: 'es',
        detection: {
            order: ['navigator', 'htmlTag', 'querystring', 'cookie', 'localStorage'],
            caches: ['localStorage', 'cookie']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;