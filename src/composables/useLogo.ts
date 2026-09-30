import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/* The round mark (nicknamed PanAm) is the default. It is still InteliMaris, so it is
   labelled InteliMaris. ?logo=intelimaris brings back the wordmark for
   the rest of the visit; ?logo=panam or ?logo=default returns to the round mark. */
export const PARTNER_LOGOS = {
  panam: { name: 'InteliMaris', light: 'assets/logo-panam-light.svg', dark: 'assets/logo-panam-dark.svg', favicon: 'assets/favicon-panam.svg' },
} as const
export type PartnerLogoId = keyof typeof PARTNER_LOGOS
const DEFAULT_LOGO: PartnerLogoId = 'panam'
const OWN = 'intelimaris'
const OWN_FAVICON = 'favicon.svg'

const KEY = 'intelimaris-logo'
const isPartner = (value: unknown): value is PartnerLogoId => typeof value === 'string' && value in PARTNER_LOGOS
/* null stands for the InteliMaris wordmark. */
const resolve = (value: unknown): PartnerLogoId | null => value === OWN ? null : isPartner(value) ? value : DEFAULT_LOGO
function readPreference(): PartnerLogoId | null {
  try { return resolve(sessionStorage.getItem(KEY)) } catch { return DEFAULT_LOGO }
}
const chosen = ref<PartnerLogoId | null>(DEFAULT_LOGO)
let loaded = false

/* The tab icon follows the mark. index.html carries the default's icons; any other
   choice points every icon link, PNG fallbacks included, at its SVG so no browser
   keeps showing the default. */
const pageIcons = new Map<HTMLLinkElement, { href: string; type: string }>()
function applyFavicon(id: PartnerLogoId | null) {
  if (typeof document === 'undefined') return
  const icon = id ? PARTNER_LOGOS[id].favicon : OWN_FAVICON
  const svg = id === DEFAULT_LOGO ? null : icon
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
      else sessionStorage.setItem(KEY, chosen.value ?? OWN)
    } catch { /* Blocked storage only means the choice lasts one page. */ }
  }, { immediate: true })
  const logo = computed(() => {
    if (!chosen.value) return null
    const { name, light, dark } = PARTNER_LOGOS[chosen.value]
    const base = import.meta.env.BASE_URL
    return { name, light: `${base}${light}`, dark: `${base}${dark}` }
  })
  return { logo }
}
