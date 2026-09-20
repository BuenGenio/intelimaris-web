import { ref } from 'vue'

/* One modal for the whole site. Any button can open it, with a role already
   chosen when the page knows one. */
const open = ref(false)
const presetRole = ref<string | undefined>(undefined)
let opener: HTMLElement | null = null

export function useOnboarding() {
  const start = (role?: string, from?: HTMLElement | null) => {
    presetRole.value = role
    opener = from ?? (typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null)
    open.value = true
  }
  const close = () => {
    open.value = false
    opener?.focus?.()
    opener = null
  }
  return { open, presetRole, start, close }
}
