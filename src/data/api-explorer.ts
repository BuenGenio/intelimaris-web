/**
 * The public API explorer: seven everyday questions, each with plain inputs,
 * the request the apps send, and the answer in the API's own shape.
 *
 * Requests are the real public operations (the curl works against API_BASE).
 * Answers are computed here, in the browser, from sample data — except the
 * marina directory, which is a snapshot of the live directory. Field names,
 * enums and the honesty rules (unknown, reported, no feed) are the API's.
 */
import { BERTHS, PLAN_H, PLAN_W, SAMPLE_VESSELS } from '@/data/playbook/berth-fit-berths'
import type { ShotId } from '@/data/shots'

export const API_BASE = 'https://api.waterwayz.dev'

export type Value = string | number | boolean
export type Values = Record<string, Value>

export interface Option { value: string; label: string }

interface InputBase { key: string; label: string; help?: string }
export type ApiInput =
  | InputBase & { type: 'select' | 'chips'; options: Option[] }
  | InputBase & { type: 'range'; min: number; max: number; step: number; format: (v: number) => string }
  | InputBase & { type: 'date' }
  | InputBase & { type: 'toggle' }

/** One request parameter, with what it means in plain words. */
export interface ApiParam { name: string; value: string; meaning: string }

export interface ApiRequest {
  method: 'GET' | 'POST'
  path: string
  query: ApiParam[]
  body?: Record<string, unknown>
  bodyParams?: ApiParam[]
}

export interface ApiQuery {
  id: string
  icon: string
  question: string
  plain: string
  operation: string
  /** 'directory' = a snapshot of the live directory; 'sample' = sample data. */
  data: 'directory' | 'sample'
  inputs: ApiInput[]
  presets?: { label: string; values: Values }[]
  defaults: (now: Date) => Values
  request: (v: Values, now: Date) => ApiRequest
  respond: (v: Values, now: Date) => unknown
  shot?: ShotId
}

/* ── Places and geometry ─────────────────────────────────────────────── */

export const PLACES: Record<string, { label: string; lat: number; lng: number }> = {
  'bahia-mar': { label: 'Bahia Mar', lat: 26.1132, lng: -80.1072 },
  'port-everglades': { label: 'Port Everglades', lat: 26.0935, lng: -80.115 },
  'las-olas': { label: 'Las Olas bridge', lat: 26.1189, lng: -80.1077 },
  sunrise: { label: 'Sunrise Marina', lat: 26.139, lng: -80.1096 },
  'new-river': { label: 'New River, downtown', lat: 26.119, lng: -80.144 },
}
const PLACE_OPTIONS: Option[] = Object.entries(PLACES).map(([value, p]) => ({ value, label: p.label }))
const place = (v: Values) => PLACES[String(v.near)] ?? PLACES['bahia-mar']!

const NM = 1852
const FT = 0.3048
const round = (n: number, d = 0) => Math.round(n * 10 ** d) / 10 ** d

export function distanceM(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const r = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * r * Math.asin(Math.sqrt(h))
}

/** Where a position falls on the 400 × 240 screen map, centred on `centre`. */
export function project(p: { lat: number; lng: number }, centre: { lat: number; lng: number }, radiusM: number) {
  const dx = (p.lng - centre.lng) * 111320 * Math.cos((centre.lat * Math.PI) / 180)
  const dy = (p.lat - centre.lat) * 110540
  const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
  return { x: round(clamp(200 + (dx / radiusM) * 150, 16, 384)), y: round(clamp(120 - (dy / radiusM) * 100, 14, 226)) }
}

/* ── Time ────────────────────────────────────────────────────────────── */

const MIN = 60_000
const HOUR = 60 * MIN
const DAY = 24 * HOUR
const iso = (t: number) => new Date(Math.round(t / MIN) * MIN).toISOString().replace('.000Z', 'Z')
const dateOnly = (t: number) => new Date(t).toISOString().slice(0, 10)
/** Midnight in Fort Lauderdale on the day of `now`, plus `days`, at `hour`:`minute` local (EDT/EST approximated as UTC−4). */
const localAt = (now: Date, days: number, hour: number, minute = 0) => {
  const day = new Date(now.getTime() - 4 * HOUR)
  return Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate() + days, hour + 4, minute)
}

/* ── Vessels ─────────────────────────────────────────────────────────── */

const VESSEL_PRESETS = [
  { label: 'Wanderer · 42 ft', values: { loa_ft: 42, beam_ft: 14, draft_ft: 4.6 } },
  ...SAMPLE_VESSELS.map(s => ({ label: s.name, values: { loa_ft: s.loa, beam_ft: s.beam, draft_ft: s.draft } })),
]
const feet = (v: number) => `${round(v, 1)} ft`
const ftM = (ft: number) => round(ft * FT, 1)

/* ── 1. Marinas near a place (live directory snapshot) ──────────────── */

export const DIRECTORY = [
  { slug: 'bahia-mar-resort-and-yachting-center-wfxpluj', name: 'Bahia Mar Resort and Yachting Center', lat: 26.11321945, lng: -80.1072276 },
  { slug: 'pier-66-marina-w1gg7u6', name: 'Pier 66 Marina', lat: 26.10183975, lng: -80.1171495 },
  { slug: 'lauderdale-marina-n1ykikj', name: 'Lauderdale Marina', lat: 26.103464, lng: -80.120126 },
  { slug: 'hilton-fort-lauderdale-marina-w4ijhjc', name: 'Hilton Fort Lauderdale Marina', lat: 26.10200765, lng: -80.1211721 },
  { slug: 'nsu-vessel-basin-w83fkp8', name: 'NSU Vessel Basin', lat: 26.0910176, lng: -80.1118729 },
  { slug: 'coast-guard-basin-w83fkzk', name: 'Coast Guard Basin', lat: 26.0893154, lng: -80.1129775 },
  { slug: 'sunrise-marina-wfxq2gf', name: 'Sunrise Marina', lat: 26.1389638, lng: -80.1096238 },
  { slug: 'coral-ridge-yacht-club-wfxq5dy', name: 'Coral Ridge Yacht Club', lat: 26.1407843, lng: -80.1085755 },
  { slug: 'seahaven-marina-wi991qh', name: 'Seahaven Marina', lat: 26.0585252, lng: -80.13627585 },
]

const marinasNear: ApiQuery = {
  id: 'marinas',
  icon: 'pin',
  question: 'Which marinas are near?',
  plain: 'Every marina in the directory within a radius of a place, nearest first.',
  operation: 'marina_nearby',
  data: 'directory',
  inputs: [
    { key: 'near', label: 'Near', type: 'select', options: PLACE_OPTIONS },
    { key: 'radius_nm', label: 'Within', type: 'range', min: 0.5, max: 5, step: 0.5, format: v => `${v} nm` },
  ],
  defaults: () => ({ near: 'port-everglades', radius_nm: 2 }),
  request: v => {
    const p = place(v)
    return {
      method: 'GET',
      path: '/v0/marina/nearby',
      query: [
        { name: 'lat', value: String(p.lat), meaning: `Latitude of ${p.label}` },
        { name: 'lng', value: String(p.lng), meaning: `Longitude of ${p.label}` },
        { name: 'radius_m', value: String(Math.round(Number(v.radius_nm) * NM)), meaning: `${v.radius_nm} nautical miles, in metres` },
      ],
    }
  },
  respond: v => {
    const p = place(v)
    return DIRECTORY
      .map(m => ({ ...m, kind: 'marina', distance_m: round(distanceM(p, m), 1), approach_depth_m: null, amenities: [], has_outline: true }))
      .filter(m => m.distance_m <= Number(v.radius_nm) * NM)
      .sort((a, b) => a.distance_m - b.distance_m)
  },
  shot: 'waterwayz-discover',
}

/* ── 2. Will she fit? (the Bahia Mar sample berth map) ──────────────── */

type Outcome = 'fits' | 'will_not_fit' | 'unknown'
interface Check { dimension: 'loa' | 'beam' | 'draft'; outcome: Outcome; limit_m: number | null; vessel_m: number; reason: string }

const MARINA_NAME = 'Bahia Mar Resort and Yachting Center'
const MARINA_SLUG = 'bahia-mar-resort-and-yachting-center-wfxpluj'
const MARINA_LIMITS = { loa: 76.2, beam: 9.1, depth: 3.0 }

function dimCheck(subject: string, dimension: 'loa' | 'beam', limit: number | null, vessel: number): Check {
  const word = dimension === 'loa' ? 'length' : 'beam'
  if (limit === null) return { dimension, outcome: 'unknown', limit_m: null, vessel_m: vessel, reason: `${subject} has not stated a ${word} limit` }
  const fits = vessel <= limit
  return { dimension, outcome: fits ? 'fits' : 'will_not_fit', limit_m: limit, vessel_m: vessel, reason: `${subject} takes ${limit.toFixed(1)} m of ${word}; this vessel is ${vessel.toFixed(1)} m` }
}
function depthCheck(subject: string, depth: number | null, draft: number, margin: number): Check {
  if (depth === null) return { dimension: 'draft', outcome: 'unknown', limit_m: null, vessel_m: draft, reason: `No depth is stated at ${subject}` }
  const need = draft + margin
  return { dimension: 'draft', outcome: need <= depth ? 'fits' : 'will_not_fit', limit_m: depth, vessel_m: draft, reason: `${subject} has ${depth.toFixed(1)} m at MLLW; this vessel needs ${need.toFixed(1)} m with its margin` }
}
function verdict(subject: string, checks: Check[]) {
  const v: Outcome = checks.some(c => c.outcome === 'will_not_fit') ? 'will_not_fit' : checks.some(c => c.outcome === 'unknown') ? 'unknown' : 'fits'
  const deciding = checks.filter(c => c.outcome === v)
  return { subject, verdict: v, summary: deciding.map(c => c.reason).join('; '), checks }
}

const willSheFit: ApiQuery = {
  id: 'fit',
  icon: 'vessel',
  question: 'Will my vessel fit?',
  plain: 'A verdict for the marina and for every berth it has drawn: fits, won’t fit, or unknown where a limit was never stated.',
  operation: 'marina_marina_fit',
  data: 'sample',
  inputs: [
    { key: 'loa_ft', label: 'Length overall', type: 'range', min: 20, max: 100, step: 1, format: feet },
    { key: 'beam_ft', label: 'Beam', type: 'range', min: 8, max: 30, step: 0.5, format: feet },
    { key: 'draft_ft', label: 'Draft', type: 'range', min: 2, max: 10, step: 0.1, format: feet },
    { key: 'margin_ft', label: 'Water under the keel', type: 'range', min: 0, max: 3, step: 0.5, format: feet, help: 'How much water you want left under the keel.' },
  ],
  presets: VESSEL_PRESETS,
  defaults: () => ({ loa_ft: 42, beam_ft: 14, draft_ft: 4.6, margin_ft: 1 }),
  request: v => ({
    method: 'GET',
    path: `/v0/marina/marinas/${MARINA_SLUG}/fit`,
    query: [
      { name: 'loa_m', value: String(ftM(Number(v.loa_ft))), meaning: `Length overall: ${v.loa_ft} ft, in metres` },
      { name: 'beam_m', value: String(ftM(Number(v.beam_ft))), meaning: `Beam: ${v.beam_ft} ft, in metres` },
      { name: 'draft_m', value: String(ftM(Number(v.draft_ft))), meaning: `Draft: ${v.draft_ft} ft, in metres` },
      { name: 'under_keel_margin_m', value: String(ftM(Number(v.margin_ft))), meaning: `Water to keep under the keel: ${v.margin_ft} ft` },
    ],
  }),
  respond: v => {
    const loa = ftM(Number(v.loa_ft)), beam = ftM(Number(v.beam_ft)), draft = ftM(Number(v.draft_ft)), margin = ftM(Number(v.margin_ft))
    const berths = BERTHS.map(b => ({
      id: b.id,
      label: `${b.id} · ${b.pier} · ${b.kind}`,
      status: b.week[0] === 'closed' ? 'closed' : 'open',
      fit: verdict(b.id, [dimCheck(b.id, 'loa', b.maxLoaM, loa), dimCheck(b.id, 'beam', b.maxBeamM, beam), depthCheck(b.id, b.depthM, draft, margin)]),
      plan: { x: round(((b.geom.x + b.geom.w / 2) / PLAN_W) * 400), y: round(((b.geom.y + b.geom.h / 2) / PLAN_H) * 240) },
    }))
    const tally = { fits: 0, will_not_fit: 0, unknown: 0 }
    for (const b of berths) tally[b.fit.verdict]++
    return {
      marina_slug: MARINA_SLUG,
      vessel: { loa_m: loa, beam_m: beam, draft_m: draft, under_keel_margin_m: margin },
      marina: verdict(MARINA_NAME, [dimCheck(MARINA_NAME, 'loa', MARINA_LIMITS.loa, loa), dimCheck(MARINA_NAME, 'beam', MARINA_LIMITS.beam, beam), depthCheck(`the ${MARINA_NAME} approach`, MARINA_LIMITS.depth, draft, margin)]),
      berths,
      tally,
      disclaimer: 'Fit is about dimensions only. Whether a berth is free is a separate question, and the dockmaster decides.',
    }
  },
  shot: 'waterwayz-marina-card',
}

/* ── 3. Where can I stay? ───────────────────────────────────────────── */

const STAYS = [
  { kind: 'listing', id: 'lst-las-olas-isles', name: 'Las Olas Isles private dock', lat: 26.1195, lng: -80.117, max_loa_m: 19.8, max_draft_m: 2.2, nightly: 15000, instant: true, booked: [] as number[], amenities: ['power_50a', 'water'] },
  { kind: 'listing', id: 'lst-new-river', name: 'New River private dock', lat: 26.1185, lng: -80.1395, max_loa_m: 16.8, max_draft_m: 2.0, nightly: 12000, instant: true, booked: [9, 10], amenities: ['power_30a', 'water'] },
  { kind: 'listing', id: 'lst-rio-vista', name: 'Rio Vista private dock', lat: 26.1105, lng: -80.134, max_loa_m: 13.7, max_draft_m: 1.8, nightly: 9500, instant: false, booked: [3, 4], amenities: ['water'] },
  { kind: 'listing', id: 'lst-harbor-beach', name: 'Harbor Beach private dock', lat: 26.1002, lng: -80.11, max_loa_m: 12.2, max_draft_m: 1.6, nightly: 8500, instant: false, booked: [], amenities: ['power_30a'] },
  { kind: 'marina', id: null, name: MARINA_NAME, lat: 26.1132, lng: -80.1072, max_loa_m: 76.2, max_draft_m: 3.0, perFoot: 425, booked: [], amenities: ['power_100a', 'fuel', 'pumpout'] },
]

const whereToStay: ApiQuery = {
  id: 'stay',
  icon: 'calendar',
  question: 'Where can I stay?',
  plain: 'Private-dock berths and marinas in one list, checked against your dates and priced for your length.',
  operation: 'dockpass_search',
  data: 'sample',
  inputs: [
    { key: 'near', label: 'Near', type: 'select', options: PLACE_OPTIONS },
    { key: 'check_in', label: 'Arriving', type: 'date' },
    { key: 'nights', label: 'Nights', type: 'range', min: 1, max: 7, step: 1, format: v => `${v} night${v === 1 ? '' : 's'}` },
    { key: 'loa_ft', label: 'Vessel length', type: 'range', min: 20, max: 100, step: 1, format: feet },
  ],
  defaults: now => ({ near: 'bahia-mar', check_in: dateOnly(localAt(now, 7, 12)), nights: 3, loa_ft: 42 }),
  request: v => {
    const p = place(v)
    const out = dateOnly(Date.parse(String(v.check_in)) + Number(v.nights) * DAY)
    return {
      method: 'GET',
      path: '/v0/dockpass/search',
      query: [
        { name: 'lat', value: String(p.lat), meaning: `Latitude of ${p.label}` },
        { name: 'lng', value: String(p.lng), meaning: `Longitude of ${p.label}` },
        { name: 'radius_m', value: '8000', meaning: 'Search within 8 km (about 4.3 nm)' },
        { name: 'check_in', value: String(v.check_in), meaning: 'First night of the stay' },
        { name: 'check_out', value: out, meaning: 'The morning you leave (not a night)' },
        { name: 'loa_m', value: String(ftM(Number(v.loa_ft))), meaning: `${v.loa_ft} ft, so per-foot rates are priced for you` },
      ],
    }
  },
  respond: (v, now) => {
    const p = place(v)
    const start = Math.round((Date.parse(String(v.check_in)) - Date.parse(dateOnly(now.getTime()))) / DAY)
    const nights = Number(v.nights)
    const loaFt = Number(v.loa_ft)
    return STAYS
      .map(s => {
        const free = !s.booked.some(d => d >= start && d < start + nights)
        const listing = s.kind === 'listing'
        const price = listing ? s.nightly! : Math.ceil(loaFt) * s.perFoot!
        return {
          kind: s.kind,
          id: s.id,
          marina_slug: listing ? null : MARINA_SLUG,
          name: s.name,
          lat: s.lat,
          lng: s.lng,
          distance_m: round(distanceM(p, s)),
          cta: listing ? (free ? (s.instant ? 'instant_book' : 'request') : 'unavailable') : 'request',
          available_for_stay: listing ? free : null,
          from_cents_per_night: price,
          nightly_rate_cents: listing ? s.nightly! : s.perFoot!,
          rate_basis: listing ? 'per_night' : 'per_foot_night',
          currency: 'USD',
          max_loa_m: s.max_loa_m,
          max_draft_m: s.max_draft_m,
          amenities: s.amenities,
        }
      })
      .filter(s => s.distance_m <= 8000)
      .sort((a, b) => a.distance_m - b.distance_m)
  },
  shot: 'waterwayz-route',
}

/* ── 4. Hazards near a place ─────────────────────────────────────────── */

const HAZARDS = [
  { id: 'hz-1', category: 'debris', note: 'Submerged log near the green marker', lat: 26.115, lng: -80.1079, ago: 150, lastConfirmed: 40, conf: 2, life: 12 },
  { id: 'hz-2', category: 'shallow', note: 'Shoaling at the channel edge, under 4 ft at low water', lat: 26.137, lng: -80.1066, ago: 60, lastConfirmed: null, conf: 0, life: 72 },
  { id: 'hz-3', category: 'disabled_vessel', note: 'Sailing vessel adrift, crew aboard, tow on the way', lat: 26.0962, lng: -80.1106, ago: 25, lastConfirmed: 10, conf: 1, life: 1 },
  { id: 'hz-4', category: 'wildlife', note: 'Manatees feeding along the seawall', lat: 26.1205, lng: -80.13, ago: 180, lastConfirmed: null, conf: 0, life: 24 },
  { id: 'hz-5', category: 'debris', note: 'Floating lumber in the turning basin', lat: 26.0921, lng: -80.1182, ago: 300, lastConfirmed: 90, conf: 3, life: 12 },
]
export const HAZARD_LABEL: Record<string, string> = { debris: 'Debris', shallow: 'Shoaling', disabled_vessel: 'Disabled vessel', wildlife: 'Manatees' }

const hazardsNear: ApiQuery = {
  id: 'hazards',
  icon: 'alert',
  question: 'What’s reported near me?',
  plain: 'Active reports from other skippers around a position, with how often they’ve been confirmed and when they expire.',
  operation: 'places_hazards_nearby',
  data: 'sample',
  inputs: [
    { key: 'near', label: 'Near', type: 'select', options: PLACE_OPTIONS },
    { key: 'radius_nm', label: 'Within', type: 'range', min: 0.5, max: 5, step: 0.5, format: v => `${v} nm` },
  ],
  defaults: () => ({ near: 'las-olas', radius_nm: 3 }),
  request: v => {
    const p = place(v)
    return {
      method: 'GET',
      path: '/v0/places/hazards',
      query: [
        { name: 'lat', value: String(p.lat), meaning: `Latitude of ${p.label}` },
        { name: 'lng', value: String(p.lng), meaning: `Longitude of ${p.label}` },
        { name: 'radius_m', value: String(Math.round(Number(v.radius_nm) * NM)), meaning: `${v.radius_nm} nautical miles, in metres` },
      ],
    }
  },
  respond: (v, now) => {
    const p = place(v)
    const t = now.getTime()
    return HAZARDS
      .map(h => {
        const expires = t - h.ago * MIN + h.life * HOUR
        return {
          id: h.id,
          category: h.category,
          status: expires - t < HOUR ? 'expiring' : h.conf > 0 ? 'confirmed' : 'reported',
          confirmations: h.conf,
          distance_m: round(distanceM(p, h)),
          lat: h.lat,
          lng: h.lng,
          note: h.note,
          provenance: 'user_reported',
          reported_at: iso(t - h.ago * MIN),
          last_confirmed_at: h.lastConfirmed === null ? null : iso(t - h.lastConfirmed * MIN),
          expires_at: iso(expires),
        }
      })
      .filter(h => h.distance_m <= Number(v.radius_nm) * NM)
      .sort((a, b) => a.distance_m - b.distance_m)
  },
}

/* ── 5. Events near a place ──────────────────────────────────────────── */

const EVENTS = [
  { slug: 'icw-dredging', name: 'Channel dredging south of the 17th Street bridge', kind: 'restriction', source: 'lnm', ref: 'LNM sample 39', start: [-3, 7, 0], end: [20, 17, 0], lat: 26.098, lng: -80.1175, nav: true, desc: 'One-way traffic past the dredge. Pass at slow speed and call the dredge on channel 13.' },
  { slug: 'las-olas-bridge-openings', name: 'Las Olas bridge: reduced openings', kind: 'restriction', source: 'lnm', ref: 'LNM sample 40', start: [2, 9, 0], end: [9, 15, 0], lat: 26.1189, lng: -80.1077, nav: true, desc: 'Opens on the hour only, 09:00–15:00, while the bridge is serviced.' },
  { slug: 'beach-fireworks', name: 'Fireworks safety zone off the beach', kind: 'fireworks', source: 'lnm', ref: 'LNM sample 41', start: [5, 21, 0], end: [5, 21, 45], lat: 26.118, lng: -80.102, nav: true, desc: 'No entry to the zone while the display runs.' },
  { slug: 'sunset-regatta', name: 'Sunset regatta', kind: 'regatta', source: 'operator', ref: null, start: [6, 17, 0], end: [6, 19, 0], lat: 26.1125, lng: -80.105, nav: false, desc: 'Spectators welcome along the T-head.', marina: MARINA_SLUG },
  { slug: 'offshore-race-start', name: 'Offshore race start', kind: 'race', source: 'curated', ref: null, start: [12, 10, 0], end: [12, 12, 0], lat: 26.0955, lng: -80.095, nav: true, desc: 'Start line off the inlet. Keep clear of the committee vessel.' },
  { slug: 'lighted-parade', name: 'Lighted parade along the Intracoastal', kind: 'parade', source: 'curated', ref: null, start: [40, 18, 30], end: [40, 21, 30], lat: 26.13, lng: -80.107, nav: true, desc: 'The Intracoastal closes to other traffic along the route while the parade passes.' },
]
export const EVENT_KIND: Record<string, string> = { closure: 'Closure', restriction: 'Restriction', regatta: 'Regatta', fireworks: 'Fireworks', parade: 'Parade', race: 'Race', other: 'Event' }
export const EVENT_SOURCE: Record<string, string> = { lnm: 'Local Notice to Mariners', operator: 'Posted by the marina', curated: 'InteliMaris', seed: 'InteliMaris' }

const eventsNear: ApiQuery = {
  id: 'events',
  icon: 'bell',
  question: 'What’s on nearby?',
  plain: 'Closures, restrictions, regattas, fireworks and races near a place, running now or coming up.',
  operation: 'events_nearby',
  data: 'sample',
  inputs: [
    { key: 'near', label: 'Near', type: 'select', options: PLACE_OPTIONS },
    { key: 'horizon_days', label: 'Looking ahead', type: 'range', min: 1, max: 60, step: 1, format: v => `${v} day${v === 1 ? '' : 's'}` },
  ],
  defaults: () => ({ near: 'bahia-mar', horizon_days: 14 }),
  request: v => {
    const p = place(v)
    return {
      method: 'GET',
      path: '/v0/events/nearby',
      query: [
        { name: 'lat', value: String(p.lat), meaning: `Latitude of ${p.label}` },
        { name: 'lng', value: String(p.lng), meaning: `Longitude of ${p.label}` },
        { name: 'radius_m', value: '10000', meaning: 'Within 10 km (about 5.4 nm)' },
        { name: 'horizon_days', value: String(v.horizon_days), meaning: `Events starting in the next ${v.horizon_days} days` },
      ],
    }
  },
  respond: (v, now) => {
    const p = place(v)
    const t = now.getTime()
    const horizon = t + Number(v.horizon_days) * DAY
    return EVENTS
      .map(e => {
        const starts = localAt(now, e.start[0]!, e.start[1]!, e.start[2])
        const ends = localAt(now, e.end[0]!, e.end[1]!, e.end[2])
        return {
          slug: e.slug,
          name: e.name,
          kind: e.kind,
          status: starts <= t ? 'active' : 'upcoming',
          starts_at: iso(starts),
          ends_at: iso(ends),
          lat: e.lat,
          lng: e.lng,
          distance_m: round(distanceM(p, e)),
          affects_navigation: e.nav,
          source: e.source,
          source_ref: e.ref,
          marina_slug: e.marina ?? null,
          description: e.desc,
          geometry_rings: null,
          series_slug: null,
        }
      })
      .filter(e => Date.parse(e.ends_at) > t && Date.parse(e.starts_at) <= horizon && e.distance_m <= 10000)
      .sort((a, b) => a.distance_m - b.distance_m)
  },
}

/* ── 6. Live traffic ─────────────────────────────────────────────────── */

const AREAS: Record<string, { label: string; bbox: [number, number, number, number] }> = {
  'port-everglades': { label: 'Port Everglades', bbox: [26.08, -80.13, 26.105, -80.1] },
  offshore: { label: 'Off the beach', bbox: [26.07, -80.105, 26.16, -80.07] },
  intracoastal: { label: 'Intracoastal, Las Olas to Sunrise', bbox: [26.105, -80.115, 26.145, -80.1] },
}
const CONTACTS = [
  { mmsi: '338000101', cls: 'tanker', sog: 6.1, cog: 270, dest: 'PORT EVERGLADES', lat: 26.0935, lng: -80.106 },
  { mmsi: '338000102', cls: 'passenger', sog: 4.0, cog: 95, dest: 'NASSAU', lat: 26.0925, lng: -80.112 },
  { mmsi: '338000103', cls: 'cargo', sog: 8.9, cog: 100, dest: 'FREEPORT', lat: 26.0945, lng: -80.1 },
  { mmsi: '338000104', cls: 'special', sog: 0.0, cog: 0, dest: 'PORT EVERGLADES', lat: 26.0905, lng: -80.1175 },
  { mmsi: '338000105', cls: 'cargo', sog: 0.1, cog: 0, dest: 'PORT EVERGLADES', lat: 26.0955, lng: -80.1205 },
  { mmsi: '338000106', cls: 'high_speed', sog: 24.5, cog: 30, dest: 'BIMINI', lat: 26.12, lng: -80.088 },
  { mmsi: '338000107', cls: 'passenger', sog: 11.2, cog: 180, dest: 'MIAMI', lat: 26.14, lng: -80.092 },
  { mmsi: '338000108', cls: 'unknown', sog: 7.5, cog: 10, dest: '', lat: 26.1, lng: -80.08 },
  { mmsi: '338000109', cls: 'passenger', sog: 5.0, cog: 0, dest: 'LAS OLAS', lat: 26.122, lng: -80.107 },
  { mmsi: '338000110', cls: 'special', sog: 3.5, cog: 180, dest: 'BAHIA MAR', lat: 26.132, lng: -80.106 },
  { mmsi: '338000111', cls: 'unknown', sog: 0.0, cog: 0, dest: '', lat: 26.113, lng: -80.106 },
]
export const CLASS_LABEL: Record<string, string> = { tanker: 'Tanker', cargo: 'Cargo', passenger: 'Passenger', high_speed: 'High speed', special: 'Tug or service', unknown: 'Unclassified' }

const liveTraffic: ApiQuery = {
  id: 'traffic',
  icon: 'radio',
  question: 'What’s moving out there?',
  plain: 'The live AIS picture, asked as a question: which vessels, of what class, how fast and bound where.',
  operation: 'vessel_live_query',
  data: 'sample',
  inputs: [
    { key: 'area', label: 'Area', type: 'select', options: Object.entries(AREAS).map(([value, a]) => ({ value, label: a.label })) },
    { key: 'class', label: 'Class', type: 'chips', options: [{ value: 'any', label: 'Any' }, ...['tanker', 'cargo', 'passenger', 'high_speed', 'special'].map(c => ({ value: c, label: CLASS_LABEL[c]! }))] },
    { key: 'underway', label: 'Only vessels underway', type: 'toggle' },
    { key: 'feed', label: 'Feed is live', type: 'toggle', help: 'Turn it off to see how a dead feed is shown. It isn’t a request parameter.' },
  ],
  defaults: () => ({ area: 'port-everglades', class: 'any', underway: true, feed: true }),
  request: v => {
    const a = AREAS[String(v.area)] ?? AREAS['port-everglades']!
    const query: ApiParam[] = [{ name: 'bbox', value: a.bbox.join(','), meaning: `The box around ${a.label}: south, west, north, east` }]
    if (v.class !== 'any') query.push({ name: 'class', value: String(v.class), meaning: `Only ${CLASS_LABEL[String(v.class)]!.toLowerCase()} vessels` })
    if (v.underway) query.push({ name: 'underway', value: 'true', meaning: 'Only vessels making 0.5 kn or more' })
    query.push({ name: 'limit', value: '50', meaning: 'At most 50 on the map; the count includes them all' })
    return { method: 'GET', path: '/v0/vessel/live/query', query }
  },
  respond: (v, now) => {
    const a = AREAS[String(v.area)] ?? AREAS['port-everglades']!
    const [s, w, n, e] = a.bbox
    const t = now.getTime()
    if (!v.feed) {
      return {
        status: { state: 'off', message: 'The live feed is not running. No contacts can be shown.', vessel_count: 0, last_message_at: iso(t - 47 * MIN) },
        matched: 0,
        vessels: { type: 'FeatureCollection', features: [] },
      }
    }
    const inArea = CONTACTS.filter(c => c.lat >= s && c.lat <= n && c.lng >= w && c.lng <= e)
    const matched = inArea.filter(c => (v.class === 'any' || c.cls === v.class) && (!v.underway || c.sog >= 0.5))
    return {
      status: { state: 'live', message: 'Live. Last message 3 seconds ago.', vessel_count: 214, last_message_at: iso(t - 3000) },
      matched: matched.length,
      vessels: {
        type: 'FeatureCollection',
        features: matched.map(c => ({
          type: 'Feature',
          properties: { mmsi: c.mmsi, class: c.cls, sog_kn: c.sog, cog_deg: c.cog, destination: c.dest || null },
          geometry: { type: 'Point', coordinates: [c.lng, c.lat] },
        })),
      },
    }
  },
  shot: 'waterwayz-map',
}

/* ── 7. Plan a passage ───────────────────────────────────────────────── */

const ROUTES: Record<string, { label: string; from: string; to: string; nm: number; shallowest: { name: string; depth: number; at: number }; bridges: { name: string; at: number; opens: number[] }[]; track: string }> = {
  'sunrise-bahia': {
    label: 'Sunrise Marina → Bahia Mar', from: 'sunrise-marina-wfxq2gf', to: MARINA_SLUG, nm: 2.6,
    shallowest: { name: 'Sunrise Bay channel', depth: 2.4, at: 0.3 },
    bridges: [{ name: 'Las Olas bridge', at: 1.9, opens: [15, 45] }],
    track: 'M200 20 C 205 70 190 110 205 150 S 200 210 196 226',
  },
  'bahia-pier66': {
    label: 'Bahia Mar → Pier 66 Marina', from: MARINA_SLUG, to: 'pier-66-marina-w1gg7u6', nm: 1.1,
    shallowest: { name: 'Pier 66 approach', depth: 2.8, at: 1.0 },
    bridges: [],
    track: 'M196 30 C 200 90 215 140 230 200',
  },
  'lauderdale-sunrise': {
    label: 'Lauderdale Marina → Sunrise Marina', from: 'lauderdale-marina-n1ykikj', to: 'sunrise-marina-wfxq2gf', nm: 3.4,
    shallowest: { name: 'Sunrise Bay channel', depth: 2.4, at: 3.1 },
    bridges: [{ name: '17th Street bridge', at: 0.4, opens: [0, 30] }, { name: 'Las Olas bridge', at: 1.6, opens: [15, 45] }],
    track: 'M240 226 C 230 180 205 150 200 110 S 205 50 200 14',
  },
  /* The same three, the other way. */
  'bahia-sunrise': {
    label: 'Bahia Mar → Sunrise Marina', from: MARINA_SLUG, to: 'sunrise-marina-wfxq2gf', nm: 2.6,
    shallowest: { name: 'Sunrise Bay channel', depth: 2.4, at: 2.3 },
    bridges: [{ name: 'Las Olas bridge', at: 0.7, opens: [15, 45] }],
    track: 'M196 226 C 200 210 220 190 205 150 C 190 110 205 70 200 20',
  },
  'pier66-bahia': {
    label: 'Pier 66 Marina → Bahia Mar', from: 'pier-66-marina-w1gg7u6', to: MARINA_SLUG, nm: 1.1,
    shallowest: { name: 'Pier 66 approach', depth: 2.8, at: 0.1 },
    bridges: [],
    track: 'M230 200 C 215 140 200 90 196 30',
  },
  'sunrise-lauderdale': {
    label: 'Sunrise Marina → Lauderdale Marina', from: 'sunrise-marina-wfxq2gf', to: 'lauderdale-marina-n1ykikj', nm: 3.4,
    shallowest: { name: 'Sunrise Bay channel', depth: 2.4, at: 0.3 },
    bridges: [{ name: 'Las Olas bridge', at: 1.8, opens: [15, 45] }, { name: '17th Street bridge', at: 3.0, opens: [0, 30] }],
    track: 'M200 14 C 205 50 195 70 200 110 C 205 150 230 180 240 226',
  },
}

/** A sample semi-diurnal tide, in metres above MLLW. */
const tideAt = (t: number) => 0.45 + 0.38 * Math.cos(((t / HOUR - 14.33) / 12.42) * 2 * Math.PI)

const planPassage: ApiQuery = {
  id: 'passage',
  icon: 'compass',
  question: 'Plan my passage',
  plain: 'A route for this vessel’s draft, with the waits for bridges and how sure it is to clear the shallowest water.',
  operation: 'route_plan',
  data: 'sample',
  inputs: [
    { key: 'route', label: 'Route', type: 'select', options: Object.entries(ROUTES).map(([value, r]) => ({ value, label: r.label })) },
    { key: 'depart_min', label: 'Leaving at', type: 'range', min: 360, max: 1080, step: 15, format: v => `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}` },
    { key: 'speed_kn', label: 'Cruise speed', type: 'range', min: 4, max: 20, step: 1, format: v => `${v} kn` },
    { key: 'draft_ft', label: 'Draft', type: 'range', min: 2, max: 10, step: 0.1, format: feet },
    { key: 'margin_ft', label: 'Water under the keel', type: 'range', min: 0.5, max: 3, step: 0.5, format: feet },
  ],
  defaults: () => ({ route: 'sunrise-bahia', depart_min: 510, speed_kn: 6, draft_ft: 4.6, margin_ft: 2 }),
  request: (v, now) => {
    const r = ROUTES[String(v.route)] ?? ROUTES['sunrise-bahia']!
    const body = { from_marina: r.from, to_marina: r.to, departure: iso(localAt(now, 1, 0, Number(v.depart_min))), draft_m: ftM(Number(v.draft_ft)), margin_m: ftM(Number(v.margin_ft)), hull_type: 'planing', cruise_speed_kn: Number(v.speed_kn) }
    return {
      method: 'POST',
      path: '/v0/route/plan',
      query: [],
      body,
      bodyParams: [
        { name: 'from_marina', value: r.from, meaning: 'Where you leave from' },
        { name: 'to_marina', value: r.to, meaning: 'Where you are going' },
        { name: 'departure', value: body.departure, meaning: `Tomorrow at ${fmtClock(Number(v.depart_min))}; the router may hold you for a bridge` },
        { name: 'draft_m', value: String(body.draft_m), meaning: `Draft: ${v.draft_ft} ft, in metres` },
        { name: 'margin_m', value: String(body.margin_m), meaning: `Water to keep under the keel: ${v.margin_ft} ft` },
        { name: 'cruise_speed_kn', value: String(v.speed_kn), meaning: 'Speed through the water' },
      ],
    }
  },
  respond: (v, now) => {
    const r = ROUTES[String(v.route)] ?? ROUTES['sunrise-bahia']!
    const speed = Number(v.speed_kn)
    const start = localAt(now, 1, 0, Number(v.depart_min))
    let clock = start
    let travelled = 0
    const waits: { cause: string; near: string; minutes: number; chainage_m: number; from: string; to: string }[] = []
    for (const b of r.bridges) {
      clock += ((b.at - travelled) / speed) * HOUR
      travelled = b.at
      const minute = new Date(clock - 4 * HOUR).getUTCMinutes()
      const next = [...b.opens, b.opens[0]! + 60].find(o => o >= minute)!
      const wait = next - minute
      if (wait > 0) waits.push({ cause: 'bridge', near: b.name, minutes: wait, chainage_m: Math.round(b.at * NM), from: iso(clock), to: iso(clock + wait * MIN) })
      clock += wait * MIN
    }
    clock += ((r.nm - travelled) / speed) * HOUR
    const atShallow = start + (r.shallowest.at / speed) * HOUR + waits.filter(w => w.chainage_m < r.shallowest.at * NM).reduce((s, w) => s + w.minutes * MIN, 0)
    const water = r.shallowest.depth + tideAt(atShallow)
    const spare = water - ftM(Number(v.draft_ft)) - ftM(Number(v.margin_ft))
    /* Never certain either way: the gauge stops at 1% and 99%. */
    const prob = round(Math.min(0.99, Math.max(0.01, 1 / (1 + Math.exp(-spare / 0.12)))), 2)
    const totalWait = waits.reduce((s, w) => s + w.minutes, 0)
    const duration = Math.round((clock - start) / MIN)
    return {
      plan_id: '0192a4f0-3c1e-7b2a-8d4f-5a3e9c1b7d20',
      passage: {
        departs_at: iso(start),
        arrives_at: iso(clock),
        distance_m: Math.round(r.nm * NM),
        duration_min: duration,
        clear_prob_at_margin: prob,
        waiting_dominates: totalWait > duration / 2,
        waits,
        pinch_points: [{ name: r.shallowest.name, chainage_m: Math.round(r.shallowest.at * NM), controlling: 'depth', clear_prob: prob, note: `${round(water, 1)} m of water expected when you pass (sample tide)` }],
        notes: [
          ...(r.bridges.length ? ['Bridge schedules: weekday openings applied; holiday clauses are not modelled'] : []),
          'Tide from a sample curve on this page; the live service uses the nearest station prediction',
        ],
      },
    }
  },
  shot: 'waterwayz-route',
}
export const fmtClock = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
export const ROUTE_TRACK = (id: string) => (ROUTES[id] ?? ROUTES['sunrise-bahia']!).track

export const API_QUERIES: ApiQuery[] = [willSheFit, whereToStay, planPassage, hazardsNear, eventsNear, liveTraffic, marinasNear]

/** The sample routes as from/to pairs, for the front page's passage bar. */
export const PASSAGE_ROUTES = Object.entries(ROUTES).map(([id, r]) => {
  const [from, to] = r.label.split(' → ')
  return { id, from: from!, to: to! }
})
export interface SamplePassage {
  passage: {
    departs_at: string
    arrives_at: string
    distance_m: number
    duration_min: number
    clear_prob_at_margin: number
    waits: { near: string; minutes: number; to: string }[]
    pinch_points: { name: string }[]
  }
}
/** The passage the explorer would plan, for the same inputs. */
export const samplePassage = (v: Values, now: Date) => planPassage.respond(v, now) as SamplePassage

/** The request as a URL and as a curl command anyone can paste into a terminal. */
export function requestUrl(req: ApiRequest): string {
  const qs = req.query.map(p => `${p.name}=${encodeURIComponent(p.value)}`).join('&')
  return `${API_BASE}${req.path}${qs ? `?${qs}` : ''}`
}
export function curlCommand(req: ApiRequest): string {
  if (req.method === 'GET') return `curl "${requestUrl(req)}"`
  return `curl -X POST "${requestUrl(req)}" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(req.body)}'`
}
