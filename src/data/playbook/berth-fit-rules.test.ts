import { describe, expect, it } from 'vitest'
import { BERTHS, SAMPLE_VESSELS } from './berth-fit-berths'
import { approachBrief, fitCheck } from './berth-fit-rules'

const berth = (id: string) => {
  const b = BERTHS.find((x) => x.id === id)
  if (!b) throw new Error(`no berth ${id}`)
  return b
}

describe('berth fit', () => {
  it('carries the eight Bahia Mar berths with the product\'s length limits', () => {
    const limits = Object.fromEntries(BERTHS.map((b) => [b.id, b.maxLoaM]))
    expect(limits).toEqual({
      'A-01': 18, 'A-02': 24, 'A-03': 30, 'A-04': 15, 'B-01': 25, 'B-02': 22, 'C-01': null, 'D-01': 20,
    })
    for (const b of BERTHS) expect(b.week).toHaveLength(7)
  })

  it('says how far a vessel is too long, in metres', () => {
    const r = fitCheck({ loa: 65.6, beam: 15, draft: 4, airDraft: 20 }, berth('A-01'))
    expect(r.fits).toBe(false)
    expect(r.reasons.map((x) => x.dim)).toEqual(['loa'])
    expect(r.reasons[0]!.text).toMatch(/^Too short by 2\.0 m/)
  })

  it('compares draft with the depth at the berth', () => {
    // 7.5 ft = 2.29 m against 2.1 m at B-02
    const r = fitCheck({ loa: 50, beam: 14, draft: 7.5, airDraft: 60 }, berth('B-02'))
    expect(r.reasons.map((x) => x.dim)).toEqual(['draft'])
    expect(r.reasons[0]!.text).toBe('2.1 m at the berth, your draft is 2.3 m')
  })

  it('treats a stated "no limit" as no length or beam check', () => {
    const r = fitCheck({ loa: 130, beam: 40, draft: 8, airDraft: 100 }, berth('C-01'))
    expect(r.fits).toBe(true)
    expect(r.loaSpareM).toBeNull()
    expect(r.beamSpareM).toBeNull()
  })

  it('keeps the wide catamaran out of the narrow slips', () => {
    const cat = SAMPLE_VESSELS.find((v) => v.id === 'catamaran')!
    const fitting = BERTHS.filter((b) => fitCheck(cat, b).fits).map((b) => b.id)
    expect(fitting).toEqual(['A-03', 'C-01', 'D-01'])
    expect(fitCheck(cat, berth('B-01')).reasons[0]!.dim).toBe('beam')
  })

  it('writes the approach brief the way the day board does', () => {
    expect(approachBrief(berth('B-01'))).toBe('B-01 · enter 330° stern-in · starboard-to · 2.4 m MLLW')
  })
})
