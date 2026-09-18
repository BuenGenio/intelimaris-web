import { ref } from 'vue'

export type Theme = 'dark' | 'light'

/* The site is white by rule; the navy is the app's surface, kept as an
   explicit choice rather than inherited from the OS. */
const theme = ref<Theme>('light')

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.body.setAttribute('data-theme', newTheme)
    try { localStorage.setItem('intelimaris-theme', newTheme) } catch { /* Storage is optional. */ }
  }

  const initTheme = () => {
    let savedTheme: string | null = null
    try { savedTheme = localStorage.getItem('intelimaris-theme') } catch { /* Storage is optional. */ }
    setTheme(savedTheme === 'dark' ? 'dark' : 'light')
  }

  return {
    theme,
    setTheme,
    initTheme
  }
}
