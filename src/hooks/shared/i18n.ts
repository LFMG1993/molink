import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from '../../locales/store/store.es.json';
import en from '../../locales/store/store.en.json';
import landingEs from '../../locales/landing/landing.es.json';
import landingEn from '../../locales/landing/landing.en.json';

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
            order: ['localStorage', 'cookie', 'querystring', 'navigator', 'htmlTag'],
            caches: ['localStorage', 'cookie']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;