// src/i18n.js
import { createI18n } from 'vue-i18n'
import enMessages from './locales/en.json'
import esMessages from './locales/es.json'

// Cargar idioma guardado, pero si no existe, forzar inglés
const savedLocale = localStorage.getItem('preferred-language')
const initialLocale = savedLocale || 'en'



const i18n = createI18n({
    locale: initialLocale,
    fallbackLocale: 'en',
    messages: {
        en: enMessages,
        es: esMessages
    },
    legacy: false
})

export default i18n