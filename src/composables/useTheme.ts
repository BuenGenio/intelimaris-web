import { ref } from 'vue'

export type Theme = 'dark' | 'light'

/* The site is white by rule; the navy is the app's surface, kept as an
   explicit choice rather than inherited from the OS. */
const theme = ref<Theme>('light')

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.body.setAttribute('data-theme', newTheme)
    localStorage.setItem('intelimaris-theme', newTheme)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('intelimaris-theme') as Theme | null
    setTheme(savedTheme ?? 'light')
  }

  return {
    theme,
    setTheme,
    initTheme
  }
}
