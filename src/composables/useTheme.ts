import { ref, onMounted } from 'vue'

export type Theme = 'dark' | 'light'

const theme = ref<Theme>('dark')

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    document.body.setAttribute('data-theme', newTheme)
    localStorage.setItem('intelimaris-theme', newTheme)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('intelimaris-theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    
    setTheme(initialTheme)
  }

  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('intelimaris-theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    })
  })

  return {
    theme,
    setTheme,
    initTheme
  }
}
