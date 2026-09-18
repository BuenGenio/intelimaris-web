import { describe, expect, it } from 'vitest'
import { PLACES } from './waterRouter'
import { BRIDGE, SAMPLE_PASSAGE, SAMPLE_VESSELS, formatEta, planPassage, smoothTrack } from './passage-planner-vessels'

const byId = (id: string) => SAMPLE_VESSELS.find((v) => v.id === id)!

describe('passage planner', () => {
  it('draws the sample passage for the trawler and passes one bridge', () => {
    const p = planPassage(SAMPLE_PASSAGE.from, SAMPLE_PASSAGE.to, byId('trawler'))
    expect(p.ok).toBe(true)
    expect(p.lengthNm).toBeGreaterThan(1)
    expect(p.crossings).toHaveLength(1)
    expect(Math.hypot(p.crossings[0]!.u - BRIDGE.u, p.crossings[0]!.v - BRIDGE.v)).toBeLessThan(0.02)
  })

  it('refuses the sailboat because of the bridge, and the reason says what to do', () => {
    const p = planPassage(SAMPLE_PASSAGE.from, SAMPLE_PASSAGE.to, byId('sail'))
    expect(p.ok).toBe(false)
    expect(p.reason).toMatch(/air draft/)
    expect(p.reason).toMatch(/Lower the mast/)
    expect(p.hint).toBeUndefined()
  })

  it('refuses a start at sea rather than draw a line over the beach', () => {
    const p = planPassage({ u: 0.85, v: 0.35 }, PLACES.bahiaMar, byId('console'))
    expect(p.ok).toBe(false)
    expect(p.reason).toMatch(/beach/)
    expect(p.hint).toMatch(/Start inside/)
  })

  it('adds a next step when the router reason has none', () => {
    const p = planPassage(SAMPLE_PASSAGE.from, SAMPLE_PASSAGE.to, { lengthFt: 40, draftFt: 8, airDraftFt: 9 })
    expect(p.ok).toBe(false)
    expect(p.hint).toBeTruthy()
  })

  it('formats the ETA at the planning speed', () => {
    expect(formatEta(2.1)).toBe('15 min')
    expect(formatEta(9.1)).toBe('1 h 05 min')
  })

  it('keeps the ends of a smoothed track', () => {
    const pts = [{ u: 0, v: 0 }, { u: 0.5, v: 0 }, { u: 0.5, v: 0.5 }]
    const s = smoothTrack(pts)
    expect(s[0]).toEqual(pts[0])
    expect(s[s.length - 1]).toEqual(pts[2])
    expect(s.length).toBeGreaterThan(pts.length)
  })
})
