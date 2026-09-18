import { describe, expect, it } from 'vitest'
import { BERTHS, approachBrief, loaLabel, soundedLabel } from './orbit-the-scan-berths'
import { easeOutCubic, formatBytes, frameOffset, nudgeOrbit, unpackDepth } from './orbit-the-scan-scene'

describe('orbit-the-scan berths', () => {
  it('writes the approach brief the way the day board does', () => {
    const a02 = BERTHS.find((b) => b.id === 'A-02')!
    expect(approachBrief(a02)).toBe('A-02 · enter 240° stern-in · starboard-to · 2.4 m MLLW')
  })

  it('keeps the product list: eight berths, C-01 without a limit, D-01 closed', () => {
    expect(BERTHS.map((b) => b.id)).toEqual(['A-01', 'A-02', 'A-03', 'A-04', 'B-01', 'B-02', 'C-01', 'D-01'])
    expect(loaLabel(BERTHS.find((b) => b.id === 'C-01')!)).toBe('no stated length limit')
    expect(loaLabel(BERTHS[0]!)).toBe('up to 18 m LOA')
    expect(BERTHS.find((b) => b.id === 'D-01')!.state).toBe('closed')
  })

  it('stamps a sounding with its age', () => {
    expect(soundedLabel(0)).toBe('sounded today')
    expect(soundedLabel(3)).toBe('sounded 3 d ago')
  })
})

describe('orbit-the-scan scene helpers', () => {
  it('eases out from 0 to 1 and clamps', () => {
    expect(easeOutCubic(0)).toBe(0)
    expect(easeOutCubic(1)).toBe(1)
    expect(easeOutCubic(2)).toBe(1)
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5)
  })

  it('formats bytes with a unit', () => {
    expect(formatBytes(1_940_000)).toBe('1.9 MB')
    expect(formatBytes(15_300_038)).toBe('15.3 MB')
    expect(formatBytes(12_400)).toBe('12 kB')
  })

  it('nudges the orbit without changing distance and never dips below the water', () => {
    const o = { x: 300, y: -400, z: 200 }
    const r = Math.hypot(o.x, o.y, o.z)
    const n = nudgeOrbit(o, 0.2, -3)
    expect(Math.hypot(n.x, n.y, n.z)).toBeCloseTo(r, 6)
    expect(n.z).toBeGreaterThan(0)
    const up = nudgeOrbit(o, 0, 3)
    expect(Math.hypot(up.x, up.y)).toBeGreaterThan(0)
  })

  it('frames at a distance while keeping the azimuth', () => {
    const o = { x: 100, y: 100, z: 50 }
    const f = frameOffset(o, 120, 0.6)
    expect(Math.hypot(f.x, f.y, f.z)).toBeCloseTo(120, 6)
    expect(Math.atan2(f.y, f.x)).toBeCloseTo(Math.atan2(o.y, o.x), 6)
  })

  it('unpacks two-byte depth to metres', () => {
    expect(unpackDepth(0, 0, 3000)).toBe(0)
    expect(unpackDepth(255, 255, 3000)).toBeCloseTo(3000, 6)
  })
})
