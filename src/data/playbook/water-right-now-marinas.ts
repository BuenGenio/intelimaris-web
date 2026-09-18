/**
 * Six real Florida marinas for the "Your water, right now" journey, each with
 * the nearest NOAA CO-OPS tide station that reports observed water level and
 * a fallback NWS observation station used only if the points lookup fails.
 *
 * Station ids were checked against the CO-OPS metadata and data APIs on
 * 2026-09-18. Miami Beach's own subordinate station (8723170) has no observed
 * water level, so Virginia Key is the nearest observing station there.
 */
export interface Marina {
  id: string
  /** The marina's name as boaters say it. */
  name: string
  /** City or place, sentence case. */
  place: string
  lat: number
  lon: number
  /** IANA zone the marina keeps time in. */
  tz: string
  tide: {
    /** NOAA CO-OPS station id. */
    id: string
    name: string
    lat: number
    lon: number
  }
  /** NWS observation station to try if api.weather.gov/points cannot be read. */
  nwsHint: string
}

export const MARINAS: Marina[] = [
  {
    id: 'bahia-mar',
    name: 'Bahia Mar',
    place: 'Fort Lauderdale',
    lat: 26.113,
    lon: -80.107,
    tz: 'America/New_York',
    tide: { id: '8722956', name: 'South Port Everglades', lat: 26.0817, lon: -80.1167 },
    nwsHint: 'KFLL',
  },
  {
    id: 'las-olas',
    name: 'Las Olas Marina',
    place: 'Fort Lauderdale',
    lat: 26.12,
    lon: -80.11,
    tz: 'America/New_York',
    tide: { id: '8722956', name: 'South Port Everglades', lat: 26.0817, lon: -80.1167 },
    nwsHint: 'KFLL',
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach Marina',
    place: 'Miami Beach',
    lat: 25.7716,
    lon: -80.1395,
    tz: 'America/New_York',
    tide: { id: '8723214', name: 'Virginia Key', lat: 25.7314, lon: -80.1618 },
    nwsHint: 'KMIA',
  },
  {
    id: 'key-west-bight',
    name: 'Key West Bight',
    place: 'Key West',
    lat: 24.562,
    lon: -81.8045,
    tz: 'America/New_York',
    tide: { id: '8724580', name: 'Key West', lat: 24.5557, lon: -81.8079 },
    nwsHint: 'KEYW',
  },
  {
    id: 'st-petersburg',
    name: 'St. Petersburg Municipal Marina',
    place: 'St. Petersburg',
    lat: 27.77,
    lon: -82.63,
    tz: 'America/New_York',
    tide: { id: '8726520', name: 'St. Petersburg', lat: 27.7606, lon: -82.6269 },
    nwsHint: 'KSPG',
  },
  {
    id: 'mayport',
    name: 'Mayport',
    place: 'Jacksonville',
    lat: 30.3935,
    lon: -81.432,
    tz: 'America/New_York',
    tide: { id: '8720218', name: 'Mayport (Bar Pilots Dock)', lat: 30.3982, lon: -81.4279 },
    nwsHint: 'KNRB',
  },
]
