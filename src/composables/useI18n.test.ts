import { describe, it, expect, beforeEach } from 'vitest'
import { useI18n } from './useI18n'

describe('useI18n', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns a translation function', () => {
    const { t } = useI18n()
    expect(typeof t).toBe('function')
  })

  it('translates known keys in English by default', () => {
    const { t } = useI18n()
    const result = t('nav.products')
    expect(result).toBe('Products')
  })

  it('falls back to the key if no translation exists', () => {
    const { t } = useI18n()
    const result = t('nonexistent.key')
    expect(result).toBe('nonexistent.key')
  })

  it('switches language', () => {
    const { t, setLanguage } = useI18n()
    setLanguage('es')
    const result = t('nav.products')
    expect(result).toBe('Productos')
  })

  it('persists language choice to localStorage', () => {
    const { setLanguage } = useI18n()
    setLanguage('el')
    expect(localStorage.getItem('intelimaris-lang')).toBe('el')
  })

  it('provides language data for all supported languages', () => {
    const { languageData } = useI18n()
    expect(languageData.value).toHaveProperty('en')
    expect(languageData.value).toHaveProperty('es')
    expect(languageData.value).toHaveProperty('el')
  })
})
