import { ref } from 'vue'

export type Theme = 'dark' | 'light'
export type Appearance = Theme | 'auto'
const theme = ref<Theme>('light')
const appearance = ref<Appearance>('auto')
let media: MediaQueryList | undefined

function applyTheme() {
  theme.value = appearance.value === 'auto' ? (media?.matches ? 'dark' : 'light') : appearance.value
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme.value
  document.body.dataset.theme = theme.value
  document.documentElement.style.colorScheme = theme.value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.value === 'dark' ? '#131b25' : '#ffffff')
}

export function useTheme() {
  const setTheme = (value: Appearance) => {
    appearance.value = value
    applyTheme()
    try { localStorage.setItem('intelimaris-theme', value) } catch { /* Storage is optional. */ }
  }
  const initTheme = () => {
    media?.removeEventListener('change', applyTheme)
    media = window.matchMedia('(prefers-color-scheme: dark)')
    let saved: string | null = null
    try { saved = localStorage.getItem('intelimaris-theme') } catch { /* Storage is optional. */ }
    appearance.value = saved === 'dark' || saved === 'light' ? saved : 'auto'
    applyTheme()
    media.addEventListener('change', applyTheme)
    return () => media?.removeEventListener('change', applyTheme)
  }
  return { theme, appearance, setTheme, initTheme }
}
