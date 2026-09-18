import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findAudience } from '@/data/audiences'
const KEY = 'intelimaris-audience'
function readPreference(): string | null {
  try { return findAudience(localStorage.getItem(KEY))?.id ?? null } catch { return null }
}
const preferred = ref<string | null>(null)
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
  const switchAudience = (id: string | null) => {
    if (id !== null && !findAudience(id)) return
    saveAudience(id)
    if (route.meta.audience) return router.push(id ? `/for/${id}` : '/?choose=1#choose')
    const query = { ...route.query }
    delete query.audience
    delete query.choose
    if (id) query.audience = id
    else query.choose = '1'
    return router.push({ path: route.path, query, hash: route.hash })
  }
  return { audience, choose, reset, switchAudience }
}
/** Install once: a direct audience URL also remembers the choice. */
export function useAudienceRouteSync() {
  const route = useRoute()
  let stop: (() => void) | undefined
  onBeforeUnmount(() => stop?.())
  onMounted(() => {
    preferred.value = readPreference()
    stop = watch(() => [route.meta.audience, route.query.audience], ([page, query]) => {
      const value = findAudience(page) ?? findAudience(query)
      if (value) saveAudience(value.id)
    }, { immediate: true })
  })
}
