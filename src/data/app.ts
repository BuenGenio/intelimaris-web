/**
 * Where the site hands people to the WaterWayz app. The site collects a role
 * and a phone number; the app sends the text message, confirms the number and
 * takes the name and email, so nothing personal is stored here.
 *
 * APP_URL is the one value to change when the app's public host is confirmed.
 */
export const APP_URL = 'https://app.waterwayz.dev'

export const loginLink = () => `${APP_URL}/welcome`

export interface SignUpHandoff {
  role?: string
  /** E.164, e.g. +13055550123 */
  phone?: string
}

export function signUpLink(handoff: SignUpHandoff = {}): string {
  const url = new URL('/sign-up', APP_URL)
  if (handoff.role) url.searchParams.set('role', handoff.role)
  if (handoff.phone) url.searchParams.set('phone', handoff.phone)
  url.searchParams.set('from', 'intelimaris.com')
  return url.toString()
}

/* Country calling codes the boat shows we attend draw from; the app accepts any. */
export const DIAL_CODES = [
  { code: '+1', label: 'US / CA', flag: '🇺🇸' },
  { code: '+44', label: 'UK', flag: '🇬🇧' },
  { code: '+34', label: 'ES', flag: '🇪🇸' },
  { code: '+33', label: 'FR', flag: '🇫🇷' },
  { code: '+39', label: 'IT', flag: '🇮🇹' },
  { code: '+30', label: 'GR', flag: '🇬🇷' },
  { code: '+380', label: 'UA', flag: '🇺🇦' },
  { code: '+61', label: 'AU', flag: '🇦🇺' },
] as const

/** Keeps digits only and joins them to a dial code as E.164; null when too short. */
export function toE164(dial: string, local: string): string | null {
  const digits = local.replace(/\D/g, '').replace(/^0+/, '')
  if (digits.length < 6 || digits.length > 12) return null
  return `${dial}${digits}`
}

/** "(305) 555-0123" for +1, grouped for everything else — display only. */
export function formatLocal(dial: string, local: string): string {
  const d = local.replace(/\D/g, '')
  if (dial === '+1' && d.length >= 4) {
    const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 10)
    return c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a
  }
  return d.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
}
