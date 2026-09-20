import { describe, expect, it } from 'vitest'
import { ALL_SCREENS, SCREEN_GROUPS, findScreen, groupOf } from './index'

describe('screen registry', () => {
  it('gives every screen a unique id, a path and a summary', () => {
    const ids = new Set<string>()
    for (const s of ALL_SCREENS) {
      expect(ids.has(s.id), `duplicate ${s.id}`).toBe(false)
      ids.add(s.id)
      expect(s.path.startsWith('/')).toBe(true)
      expect(s.summary.length).toBeGreaterThan(10)
      expect(s.label.length).toBeGreaterThan(1)
    }
  })
  it('lights a door that the group has', () => {
    for (const g of SCREEN_GROUPS) {
      expect(g.doors.length).toBeGreaterThan(0)
      for (const s of g.screens) if (s.door) expect(g.doors.map((d) => d.id), `${s.id} → ${s.door}`).toContain(s.door)
    }
  })
  it('loads every screen component', async () => {
    for (const s of ALL_SCREENS) {
      const mod = await s.load()
      expect(mod.default, s.id).toBeTruthy()
    }
  }, 60_000)
  it('finds screens and their groups', () => {
    const first = ALL_SCREENS[0]
    if (!first) return
    expect(findScreen(first.id)).toBe(first)
    expect(groupOf(first.id)?.screens).toContain(first)
    expect(findScreen('nope')).toBeUndefined()
  })
})
