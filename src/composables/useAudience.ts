import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findAudience } from '@/data/audiences'
const KEY = 'intelimaris-audience'
function readPreference(): string | null {
  try { return findAudience(localStorage.getItem(KEY))?.id ?? null } catch { return null }
}
const preferred = ref<string | null>(readPreference())
export function saveAudience(value: unknown) {
  preferred.value = findAudience(value)?.id ?? null
  try {
    if (preferred.value) localStorage.setItem(KEY, preferred.value)
    else localStorage.removeItem(KEY)
  } catch { /* Blocked storage must not prevent browsing. */ }
}
export function useAudience() {
  const route = useRoute()
  const router = useRouter()
  const audience = computed(() => {
    if (route.query.choose === '1') return undefined
    return findAudience(route.meta.audience) ?? findAudience(route.query.audience) ?? findAudience(preferred.value)
  })
  const choose = (id: string) => {
    if (!findAudience(id)) return
    saveAudience(id)
    return router.push({ path: '/', query: { audience: id }, hash: '#choose' })
  }
  const reset = () => {
    saveAudience(null)
    return router.push({ path: '/', query: { choose: '1' }, hash: '#choose' })
  }
  return { audience, choose, reset }
}
/** Install once: a direct audience URL also remembers the choice. */
export function useAudienceRouteSync() {
  const route = useRoute()
  watch(() => [route.meta.audience, route.query.audience], ([page, query]) => {
    const value = findAudience(page) ?? findAudience(query)
    if (value) saveAudience(value.id)
  }, { immediate: true })
}
