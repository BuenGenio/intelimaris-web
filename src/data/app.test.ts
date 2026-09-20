import { describe, expect, it } from 'vitest'
import { APP_URL, formatLocal, signUpLink, toE164 } from './app'

describe('app hand-off', () => {
  it('builds a sign-up link that carries role and phone', () => {
    const url = new URL(signUpLink({ role: 'captains', phone: '+13055550123' }))
    expect(url.origin).toBe(APP_URL)
    expect(url.pathname).toBe('/sign-up')
    expect(url.searchParams.get('role')).toBe('captains')
    expect(url.searchParams.get('phone')).toBe('+13055550123')
    expect(url.searchParams.get('from')).toBe('intelimaris.com')
  })
  it('leaves out what it was not given', () => {
    const url = new URL(signUpLink())
    expect(url.searchParams.has('role')).toBe(false)
    expect(url.searchParams.has('phone')).toBe(false)
  })
  it('normalises phone numbers to E.164', () => {
    expect(toE164('+1', '(305) 555-0123')).toBe('+13055550123')
    expect(toE164('+44', '07700 900123')).toBe('+447700900123')
    expect(toE164('+1', '555')).toBeNull()
  })
  it('formats US numbers as they are typed', () => {
    expect(formatLocal('+1', '3055550123')).toBe('(305) 555-0123')
    expect(formatLocal('+1', '30555')).toBe('(305) 55')
    expect(formatLocal('+30', '2101234567')).toBe('210 123 456 7')
  })
})
