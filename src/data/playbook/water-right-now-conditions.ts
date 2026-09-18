/**
 * Pure helpers and the two live feeds behind "Your water, right now".
 *
 * Feeds (public, no key, CORS-open):
 *  - NOAA CO-OPS tide predictions and observed water level.
 *  - NWS api.weather.gov points → observation stations → latest observation.
 * Sunrise and sunset are computed here from lat/lon with the NOAA solar
 * position algorithm — no call is made for them.
 *
 * Every fetch goes through a session cache with a five-minute TTL per URL, so
 * a station is asked at most once every five minutes no matter how often the
 * visitor flips between marinas.
 */
import type { Marina } from './water-right-now-marinas'

/* ------------------------------------------------------------------ types */

export interface TidePoint {
  /** epoch ms */
  t: number
  /** feet above MLLW */
  v: number
}

export interface TideExtreme extends TidePoint {
  type: 'H' | 'L'
}

export interface TideData {
  stationId: string
  stationName: string
  /** Latest observed water level, or null if the station returned none. */
  observed: TidePoint | null
  /** Six-minute predictions, roughly now − 4 h to now + 26 h. */
  curve: TidePoint[]
  /** Predicted highs and lows, roughly now − 12 h to now + 36 h. */
  extremes: TideExtreme[]
  fetchedAt: number
}

export interface WeatherData {
  stationId: string
  stationName: string
  observedAt: number
  tempC: number | null
  windKmh: number | null
  gustKmh: number | null
  windDirDeg: number | null
  text: string
  fetchedAt: number
}

export interface TideNow {
  predicted: number | null
  /** ft per hour, signed; positive when rising. */
  rate: number | null
  trend: 'rising' | 'falling' | 'slack' | 'unknown'
  next: TideExtreme | null
  prev: TideExtreme | null
}

/* ------------------------------------------------------------- constants */

export const CACHE_TTL_MS = 5 * 60 * 1000
export const FETCH_TIMEOUT_MS = 8000
export const NWS_USER_AGENT = '(intelimaris.com, info@intelimarine.com)'
const COOPS = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter'
const NWS = 'https://api.weather.gov'

/* ----------------------------------------------------------------- units */

export const kmhToKn = (kmh: number) => kmh / 1.852
export const cToF = (c: number) => (c * 9) / 5 + 32
export const kmToNmi = (km: number) => km / 1.852

/** Great-circle distance in kilometres. */
export function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const r = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(bLat - aLat)
  const dLon = toRad(bLon - aLon)
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function nearestMarina(marinas: Marina[], lat: number, lon: number): { marina: Marina; km: number } {
  let best = marinas[0]!
  let bestKm = Infinity
  for (const m of marinas) {
    const km = haversineKm(lat, lon, m.lat, m.lon)
    if (km < bestKm) {
      bestKm = km
      best = m
    }
  }
  return { marina: best, km: bestKm }
}

const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
export const compassPoint = (deg: number) => COMPASS[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16]!

/* ------------------------------------------------------------ formatting */

/** "just now", "6 min ago", "2 h ago", "3 d ago". */
export function ageLabel(ageMs: number): string {
  const s = Math.max(0, Math.round(ageMs / 1000))
  if (s < 45) return 'just now'
  const m = Math.round(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) {
    const rem = m - h * 60
    return rem ? `${h} h ${rem} min ago` : `${h} h ago`
  }
  return `${Math.round(h / 24)} d ago`
}

/** "in 43 min", "in 1 h 12 min", "in 2 d". */
export function untilLabel(ms: number): string {
  const m = Math.max(0, Math.round(ms / 60000))
  if (m < 1) return 'now'
  if (m < 60) return `in ${m} min`
  const h = Math.floor(m / 60)
  if (h < 48) {
    const rem = m - h * 60
    return rem ? `in ${h} h ${rem} min` : `in ${h} h`
  }
  return `in ${Math.round(h / 24)} d`
}

export function fmtTime(ms: number, tz: string): string {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz })
    .format(new Date(ms))
    .replace(' AM', ' am')
    .replace(' PM', ' pm')
}

export function fmtHour(ms: number, tz: string): string {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true, timeZone: tz })
    .format(new Date(ms))
    .replace(' AM', ' am')
    .replace(' PM', ' pm')
}

/** Day name in the station's zone, for hi/lo lists that cross midnight. */
export function fmtDay(ms: number, tz: string, now: number): string {
  const day = (t: number) => new Intl.DateTimeFormat('en-US', { timeZone: tz, day: 'numeric', month: 'short' }).format(new Date(t))
  return day(ms) === day(now) ? 'today' : day(ms) === day(now + 86400000) ? 'tomorrow' : day(ms)
}

/* ------------------------------------------------------------ solar times */

const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI

/**
 * Sunrise and sunset (epoch ms, UTC) for the UTC day containing `at`, from
 * the NOAA solar position algorithm (zenith 90.833°). Either is null where
 * the sun does not rise or set that day.
 */
export function sunTimes(at: number, lat: number, lon: number): { sunrise: number | null; sunset: number | null; noon: number } {
  const day0 = Math.floor(at / 86400000) * 86400000
  const jd = day0 / 86400000 + 2440587.5
  const T = (jd - 2451545) / 36525
  const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T)
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T)
  const C =
    Math.sin(rad(M)) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    Math.sin(rad(2 * M)) * (0.019993 - 0.000101 * T) +
    Math.sin(rad(3 * M)) * 0.000289
  const trueLong = L0 + C
  const omega = 125.04 - 1934.136 * T
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(rad(omega))
  const meanObliq = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60
  const obliq = meanObliq + 0.00256 * Math.cos(rad(omega))
  const decl = deg(Math.asin(Math.sin(rad(obliq)) * Math.sin(rad(appLong))))
  const y = Math.tan(rad(obliq / 2)) ** 2
  const eqTime =
    4 *
    deg(
      y * Math.sin(2 * rad(L0)) -
        2 * e * Math.sin(rad(M)) +
        4 * e * y * Math.sin(rad(M)) * Math.cos(2 * rad(L0)) -
        0.5 * y * y * Math.sin(4 * rad(L0)) -
        1.25 * e * e * Math.sin(2 * rad(M)),
    )
  const noonMin = 720 - 4 * lon - eqTime
  const noon = day0 + noonMin * 60000
  const cosHA = Math.cos(rad(90.833)) / (Math.cos(rad(lat)) * Math.cos(rad(decl))) - Math.tan(rad(lat)) * Math.tan(rad(decl))
  if (cosHA < -1 || cosHA > 1) return { sunrise: null, sunset: null, noon }
  const ha = deg(Math.acos(cosHA))
  return { sunrise: day0 + (noonMin - ha * 4) * 60000, sunset: day0 + (noonMin + ha * 4) * 60000, noon }
}

/** The next sunrise and next sunset after `now`, looking up to two days ahead. */
export function nextSunEvents(now: number, lat: number, lon: number): { sunrise: number | null; sunset: number | null } {
  let sunrise: number | null = null
  let sunset: number | null = null
  for (let d = -1; d <= 2 && (sunrise === null || sunset === null); d++) {
    const s = sunTimes(now + d * 86400000, lat, lon)
    if (sunrise === null && s.sunrise !== null && s.sunrise > now) sunrise = s.sunrise
    if (sunset === null && s.sunset !== null && s.sunset > now) sunset = s.sunset
  }
  return { sunrise, sunset }
}

/* ------------------------------------------------------------- tide maths */

/** Linear interpolation of the predicted level at `t`, or null outside the curve. */
export function levelAt(curve: TidePoint[], t: number): number | null {
  if (curve.length < 2) return null
  const first = curve[0]!
  const last = curve[curve.length - 1]!
  if (t < first.t || t > last.t) return null
  let lo = 0
  let hi = curve.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (curve[mid]!.t <= t) lo = mid
    else hi = mid
  }
  const a = curve[lo]!
  const b = curve[hi]!
  if (b.t === a.t) return a.v
  return a.v + ((b.v - a.v) * (t - a.t)) / (b.t - a.t)
}

export function tideNow(curve: TidePoint[], extremes: TideExtreme[], now: number): TideNow {
  const predicted = levelAt(curve, now)
  const before = levelAt(curve, now - 30 * 60000)
  const after = levelAt(curve, now + 30 * 60000)
  const rate = before !== null && after !== null ? after - before : null
  const trend: TideNow['trend'] = rate === null ? 'unknown' : Math.abs(rate) < 0.05 ? 'slack' : rate > 0 ? 'rising' : 'falling'
  const next = extremes.find((x) => x.t > now) ?? null
  const prev = [...extremes].reverse().find((x) => x.t <= now) ?? null
  return { predicted, rate, trend, next, prev }
}

/* --------------------------------------------------------------- parsing */

/** "2026-09-18 18:00" (GMT) → epoch ms. */
export function parseGmt(t: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec(t)
  if (!m) return NaN
  return Date.UTC(+m[1]!, +m[2]! - 1, +m[3]!, +m[4]!, +m[5]!)
}

/** epoch ms → "yyyymmdd HH:mm" in GMT, the form CO-OPS takes for begin_date. */
export function coopsStamp(ms: number): string {
  const d = new Date(ms)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`
}

interface CoopsPrediction {
  t: string
  v: string
  type?: string
}

export function parsePredictions(json: unknown): TidePoint[] {
  const rows = (json as { predictions?: CoopsPrediction[] } | null)?.predictions
  if (!Array.isArray(rows)) return []
  return rows
    .map((r) => ({ t: parseGmt(r.t), v: Number(r.v) }))
    .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v))
}

export function parseExtremes(json: unknown): TideExtreme[] {
  const rows = (json as { predictions?: CoopsPrediction[] } | null)?.predictions
  if (!Array.isArray(rows)) return []
  return rows
    .map((r) => ({ t: parseGmt(r.t), v: Number(r.v), type: (r.type === 'H' ? 'H' : 'L') as 'H' | 'L' }))
    .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v))
}

export function parseObserved(json: unknown): TidePoint | null {
  const rows = (json as { data?: CoopsPrediction[] } | null)?.data
  if (!Array.isArray(rows) || !rows.length) return null
  const last = rows[rows.length - 1]!
  const p = { t: parseGmt(last.t), v: Number(last.v) }
  return Number.isFinite(p.t) && Number.isFinite(p.v) ? p : null
}

interface NwsQuantity {
  value: number | null
}

interface NwsObservation {
  properties?: {
    timestamp?: string
    textDescription?: string
    temperature?: NwsQuantity
    windSpeed?: NwsQuantity
    windGust?: NwsQuantity
    windDirection?: NwsQuantity
  }
}

export function parseObservation(json: unknown, stationId: string, stationName: string, fetchedAt: number): WeatherData | null {
  const p = (json as NwsObservation | null)?.properties
  if (!p?.timestamp) return null
  const observedAt = Date.parse(p.timestamp)
  if (!Number.isFinite(observedAt)) return null
  const num = (q?: NwsQuantity) => (q && typeof q.value === 'number' && Number.isFinite(q.value) ? q.value : null)
  return {
    stationId,
    stationName,
    observedAt,
    tempC: num(p.temperature),
    windKmh: num(p.windSpeed),
    gustKmh: num(p.windGust),
    windDirDeg: num(p.windDirection),
    text: p.textDescription ?? '',
    fetchedAt,
  }
}

/* ----------------------------------------------------------------- fetch */

interface CacheEntry {
  at: number
  promise: Promise<unknown>
}

const cache = new Map<string, CacheEntry>()

/** Drop everything cached — only tests need this. */
export const resetCache = () => cache.clear()

async function fetchJsonOnce(url: string, headers: Record<string, string>, fetchImpl: typeof fetch): Promise<unknown> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetchImpl(url, { headers, signal: ctrl.signal })
    if (!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

/**
 * JSON with a per-URL session cache. A successful body is reused for five
 * minutes; a failure is reused for thirty seconds so a flapping station is
 * not hammered, then tried again.
 */
export function cachedJson(url: string, headers: Record<string, string> = {}, fetchImpl: typeof fetch = fetch): Promise<unknown> {
  const now = Date.now()
  const hit = cache.get(url)
  if (hit && now - hit.at < CACHE_TTL_MS) return hit.promise
  const promise = fetchJsonOnce(url, headers, fetchImpl).catch((err: unknown) => {
    cache.set(url, { at: Date.now() - CACHE_TTL_MS + 30000, promise })
    throw err
  })
  cache.set(url, { at: now, promise })
  return promise
}

const coopsUrl = (params: Record<string, string>) =>
  `${COOPS}?${new URLSearchParams({ datum: 'MLLW', time_zone: 'gmt', units: 'english', format: 'json', ...params })}`

export interface TideFetch {
  data: TideData | null
  /** Which parts answered. */
  ok: { curve: boolean; extremes: boolean; observed: boolean }
}

/**
 * Curve, highs/lows and the latest observed level for one station. Partial
 * results are returned: a station with predictions but no observation still
 * yields a curve.
 */
export async function loadTide(marina: Marina, now = Date.now(), fetchImpl: typeof fetch = fetch): Promise<TideFetch> {
  const station = marina.tide.id
  const [curveR, extR, obsR] = await Promise.allSettled([
    cachedJson(coopsUrl({ product: 'predictions', station, begin_date: coopsStamp(now - 4 * 3600000), range: '30' }), {}, fetchImpl),
    cachedJson(coopsUrl({ product: 'predictions', station, begin_date: coopsStamp(now - 12 * 3600000), range: '48', interval: 'hilo' }), {}, fetchImpl),
    cachedJson(coopsUrl({ product: 'water_level', station, date: 'latest' }), {}, fetchImpl),
  ])
  const curve = curveR.status === 'fulfilled' ? parsePredictions(curveR.value) : []
  const extremes = extR.status === 'fulfilled' ? parseExtremes(extR.value) : []
  const observed = obsR.status === 'fulfilled' ? parseObserved(obsR.value) : null
  const ok = { curve: curve.length > 1, extremes: extremes.length > 0, observed: observed !== null }
  if (!ok.curve && !ok.extremes && !ok.observed) return { data: null, ok }
  return {
    data: { stationId: station, stationName: marina.tide.name, observed, curve, extremes, fetchedAt: Date.now() },
    ok,
  }
}

interface NwsPoints {
  properties?: { observationStations?: string }
}

interface NwsStations {
  features?: { properties?: { stationIdentifier?: string; name?: string } }[]
}

/**
 * Latest NWS observation for the marina: points → stations → latest. If the
 * points lookup cannot be read, the marina's hint station is asked directly.
 */
export async function loadWeather(marina: Marina, fetchImpl: typeof fetch = fetch): Promise<WeatherData | null> {
  const headers = { Accept: 'application/geo+json', 'User-Agent': NWS_USER_AGENT }
  let stationId = marina.nwsHint
  let stationName = marina.nwsHint
  try {
    const points = (await cachedJson(`${NWS}/points/${marina.lat.toFixed(4)},${marina.lon.toFixed(4)}`, headers, fetchImpl)) as NwsPoints
    const listUrl = points.properties?.observationStations
    if (listUrl) {
      const list = (await cachedJson(listUrl, headers, fetchImpl)) as NwsStations
      const first = list.features?.find((f) => f.properties?.stationIdentifier)
      if (first?.properties?.stationIdentifier) {
        stationId = first.properties.stationIdentifier
        stationName = first.properties.name ?? stationId
      }
    }
  } catch {
    /* fall through to the hint station */
  }
  try {
    const obs = await cachedJson(`${NWS}/stations/${stationId}/observations/latest`, headers, fetchImpl)
    return parseObservation(obs, stationId, stationName, Date.now())
  } catch {
    return null
  }
}
