import { ref, computed } from 'vue'
import { translations, type Language } from '@/i18n/translations'

const currentLanguage = ref<Language>('en')

export function useI18n() {
  const t = (key: string): string => {
    return translations[currentLanguage.value]?.[key] || translations.en[key] || key
  }

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('intelimaris-lang', lang)
  }

  const initLanguage = () => {
    const savedLang = localStorage.getItem('intelimaris-lang') as Language | null
    const browserLang = navigator.language.split('-')[0] as Language
    const supportedLangs: Language[] = ['en', 'es', 'el']
    
    let lang: Language = 'en'
    if (savedLang && supportedLangs.includes(savedLang)) {
      lang = savedLang
    } else if (supportedLangs.includes(browserLang)) {
      lang = browserLang
    }
    
    setLanguage(lang)
  }

  const languageData = computed(() => ({
    en: { flag: '/assets/flag-us.svg', code: 'EN', name: 'English' },
    es: { flag: '/assets/flag-es.svg', code: 'ES', name: 'Español' },
    el: { flag: '/assets/flag-gr.svg', code: 'EL', name: 'Ελληνικά' }
  }))

  return {
    currentLanguage,
    t,
    setLanguage,
    initLanguage,
    languageData
  }
}
