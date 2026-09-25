import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/* ?logo=panam swaps the InteliMaris mark for a partner's for the rest of the
   visit; ?logo=default puts ours back. */
export const PARTNER_LOGOS = {
  panam: { name: 'PanAm', light: 'assets/logo-panam-light.svg', dark: 'assets/logo-panam-dark.svg', favicon: 'assets/favicon-panam.svg' },
} as const
export type PartnerLogoId = keyof typeof PARTNER_LOGOS

const KEY = 'intelimaris-logo'
const isPartner = (value: unknown): value is PartnerLogoId => typeof value === 'string' && value in PARTNER_LOGOS
function readPreference(): PartnerLogoId | null {
  try { const saved = sessionStorage.getItem(KEY); return isPartner(saved) ? saved : null } catch { return null }
}
const chosen = ref<PartnerLogoId | null>(null)
let loaded = false

/* The tab icon follows the mark. Every icon link, PNG fallbacks included, points
   at the partner's SVG so no browser keeps showing ours. */
const ownIcons = new Map<HTMLLinkElement, { href: string; type: string }>()
function applyFavicon(id: PartnerLogoId | null) {
  if (typeof document === 'undefined') return
  document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach(link => {
    if (!ownIcons.has(link)) ownIcons.set(link, { href: link.getAttribute('href') ?? '', type: link.type })
    const own = ownIcons.get(link)!
    link.href = id ? `${import.meta.env.BASE_URL}${PARTNER_LOGOS[id].favicon}` : own.href
    link.type = id ? 'image/svg+xml' : own.type
  })
}
watch(chosen, applyFavicon)

export function useLogo() {
  const route = useRoute()
  if (!loaded && typeof window !== 'undefined') { chosen.value = readPreference(); applyFavicon(chosen.value); loaded = true }
  watch(() => route.query.logo, value => {
    if (value === undefined) return
    chosen.value = isPartner(value) ? value : null
    try {
      if (chosen.value) sessionStorage.setItem(KEY, chosen.value)
      else sessionStorage.removeItem(KEY)
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
