import en from './locales/en.json'
import es from './locales/es.json'

export const defaultLocale = localStorage.getItem("Lang") || 'es'

export const languages = {
  en: en,
  es: es,
}