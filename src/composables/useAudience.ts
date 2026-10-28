import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findAudience } from '@/data/audiences'
const KEY = 'intelimaris-audience'
const DEFAULT_AUDIENCE = 'captains'
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
    const selected = findAudience(route.meta.audience) ?? findAudience(route.query.audience) ?? findAudience(preferred.value)
    if (selected) return selected
    // The homepage has a useful first role during pre-rendering as well as in the browser.
    if (route.path === '/' && route.query.audience === undefined) return findAudience(DEFAULT_AUDIENCE)
    return undefined
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
/** Install once: remember direct audience URLs and make the homepage selection shareable. */
export function useAudienceRouteSync() {
  const route = useRoute()
  const router = useRouter()
  let stop: (() => void) | undefined
  onBeforeUnmount(() => stop?.())
  onMounted(() => {
    preferred.value = readPreference()
    stop = watch(() => [route.path, route.meta.audience, route.query.audience, route.query.choose], ([path, page, query, browse]) => {
      const value = findAudience(page) ?? findAudience(query)
      if (value) saveAudience(value.id)
      if (path === '/' && query === undefined && browse !== '1') {
        const id = findAudience(preferred.value)?.id ?? DEFAULT_AUDIENCE
        void router.replace({ path: '/', query: { ...route.query, audience: id }, hash: route.hash })
      }
    }, { immediate: true })
  })
}
