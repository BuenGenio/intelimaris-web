import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './useTheme'

let dispose: (() => void) | undefined
let dark = false
let onChange: (() => void) | undefined
beforeEach(() => {
  localStorage.clear()
  dark = false
  onChange = undefined
  vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
    get matches() { return dark },
    addEventListener: (_: string, callback: () => void) => { onChange = callback },
    removeEventListener: () => { onChange = undefined },
  }) as unknown as MediaQueryList)
})
afterEach(() => { dispose?.(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('appearance preferences', () => {
  it('follows the device in auto mode, but keeps an explicit choice when the device changes', () => {
    const { initTheme, appearance, theme, setTheme } = useTheme()
    dispose = initTheme()
    expect(appearance.value).toBe('auto')
    expect(theme.value).toBe('light')
    dark = true; onChange?.()
    expect(theme.value).toBe('dark')
    expect(document.body.dataset.theme).toBe('dark')
    setTheme('light')
    dark = false; onChange?.(); dark = true; onChange?.()
    expect(theme.value).toBe('light')
    expect(localStorage.getItem('intelimaris-theme')).toBe('light')
    setTheme('auto')
    expect(theme.value).toBe('dark')
    expect(localStorage.getItem('intelimaris-theme')).toBe('auto')
  })
  it('restores a saved choice and supports browsers with blocked storage', () => {
    const { initTheme, appearance, theme } = useTheme()
    localStorage.setItem('intelimaris-theme', 'dark')
    dispose = initTheme()
    expect(appearance.value).toBe('dark')
    expect(theme.value).toBe('dark')
    dispose()
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('Storage blocked') } })
    dispose = initTheme()
    expect(appearance.value).toBe('auto')
    expect(theme.value).toBe('light')
  })
})
