import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/* The INTELI-mark-MARIS lockup is the default, with the round mark (nicknamed
   PanAm) as the tab icon. ?logo=panam shows the round mark alone and
   ?logo=intelimaris the older wordmark, for the rest of the visit; ?logo=default
   returns to the lockup. All of them are InteliMaris, and are labelled so. */
export const LOGOS = {
  lockup: { light: 'assets/logo-lockup-light.svg', dark: 'assets/logo-lockup-dark.svg', width: 131, height: 24, favicon: 'assets/favicon-panam.svg' },
  panam: { light: 'assets/logo-panam-light.svg', dark: 'assets/logo-panam-dark.svg', width: 40, height: 40, favicon: 'assets/favicon-panam.svg' },
} as const
export type LogoId = keyof typeof LOGOS
const DEFAULT_LOGO: LogoId = 'lockup'
const WORDMARK = 'intelimaris'
const WORDMARK_FAVICON = 'favicon.svg'

const KEY = 'intelimaris-logo'
const isLogo = (value: unknown): value is LogoId => typeof value === 'string' && value in LOGOS
/* null stands for the wordmark. */
const resolve = (value: unknown): LogoId | null => value === WORDMARK ? null : isLogo(value) ? value : DEFAULT_LOGO
function readPreference(): LogoId | null {
  try { return resolve(sessionStorage.getItem(KEY)) } catch { return DEFAULT_LOGO }
}
const chosen = ref<LogoId | null>(DEFAULT_LOGO)
let loaded = false

/* The tab icon follows the mark. index.html carries the default's icons; any other
   icon points every icon link, PNG fallbacks included, at its SVG so no browser
   keeps showing the default. */
const pageIcons = new Map<HTMLLinkElement, { href: string; type: string }>()
function applyFavicon(id: LogoId | null) {
  if (typeof document === 'undefined') return
  const icon = id ? LOGOS[id].favicon : WORDMARK_FAVICON
  const svg = icon === LOGOS[DEFAULT_LOGO].favicon ? null : icon
  document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach(link => {
    if (!pageIcons.has(link)) pageIcons.set(link, { href: link.getAttribute('href') ?? '', type: link.type })
    const page = pageIcons.get(link)!
    link.href = svg ? `${import.meta.env.BASE_URL}${svg}` : page.href
    link.type = svg ? 'image/svg+xml' : page.type
  })
}
watch(chosen, applyFavicon)

export function useLogo() {
  const route = useRoute()
  if (!loaded && typeof window !== 'undefined') { chosen.value = readPreference(); applyFavicon(chosen.value); loaded = true }
  watch(() => route.query.logo, value => {
    if (value === undefined) return
    chosen.value = resolve(value)
    try {
      if (chosen.value === DEFAULT_LOGO) sessionStorage.removeItem(KEY)
      else sessionStorage.setItem(KEY, chosen.value ?? WORDMARK)
    } catch { /* Blocked storage only means the choice lasts one page. */ }
  }, { immediate: true })
  const logo = computed(() => {
    if (!chosen.value) return null
    const { light, dark, width, height } = LOGOS[chosen.value]
    const base = import.meta.env.BASE_URL
    return { name: 'InteliMaris', light: `${base}${light}`, dark: `${base}${dark}`, width, height }
  })
  return { logo }
}
