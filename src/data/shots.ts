export type ShotId =
  | 'waterwayz-route'
  | 'waterwayz-map'
  | 'waterwayz-marina-card'
  | 'waterwayz-discover'
  | 'waterwayz-sensors'
  | 'pms-berth-layout'
  | 'pms-dock-editor'
  | 'pms-dashboard'
  | 'pms-operations'
  | 'dock-host-dashboard'

export type ShotAvailability = 'live' | 'building' | 'planned' | 'concept'

export interface Shot {
  width: number
  height: number
  widths: number[]
  /** Describes the frame for screen readers; never decorative. */
  alt: string
  availability: ShotAvailability
}

const WIDTHS = [640, 960, 1280, 1600]

export const SHOTS: Record<ShotId, Shot> = {
  'waterwayz-route': {
    width: 1600,
    height: 729,
    widths: WIDTHS,
    alt: 'WaterWayz satellite chart over Bahia Mar with a planned route, safe depth, wind and tide, and a berth booking panel.',
    availability: 'live',
  },
  'waterwayz-map': {
    width: 1600,
    height: 729,
    widths: WIDTHS,
    alt: 'WaterWayz Above camera showing points of interest, the vessel underway at 8.4 knots and a bridge clearance callout.',
    availability: 'live',
  },
  'waterwayz-marina-card': {
    width: 1600,
    height: 729,
    widths: WIDTHS,
    alt: 'A WaterWayz marina card offering passage planning to and from Las Olas Marina.',
    availability: 'live',
  },
  'waterwayz-discover': {
    width: 1600,
    height: 729,
    widths: WIDTHS,
    alt: 'WaterWayz global satellite view with marina search results.',
    availability: 'live',
  },
  'waterwayz-sensors': {
    width: 1600,
    height: 1311,
    widths: WIDTHS,
    alt: 'InteliMARIS systems-aboard panel with live voltage, current, bilge level and temperature readings.',
    availability: 'live',
  },
  'pms-berth-layout': {
    width: 1600,
    height: 757,
    widths: WIDTHS,
    alt: 'The Marina PMS berth layout editor over satellite imagery of the Bahia Mar basin, with each berth listed by length and availability.',
    availability: 'live',
  },
  'pms-dock-editor': {
    width: 1600,
    height: 757,
    widths: WIDTHS,
    alt: 'The private dock editor with tools to draw dock lines, fields, berths and mooring balls.',
    availability: 'live',
  },
  'pms-dashboard': {
    width: 1600,
    height: 1386,
    widths: WIDTHS,
    alt: 'The Marina PMS Today dashboard showing who is on duty, requests waiting and basin occupancy.',
    availability: 'live',
  },
  'pms-operations': {
    width: 1600,
    height: 1929,
    widths: WIDTHS,
    alt: 'Marina PMS operations with the on-duty roster and the matrix of what each staff role can do.',
    availability: 'live',
  },
  'dock-host-dashboard': {
    width: 1600,
    height: 1228,
    widths: WIDTHS,
    alt: 'The private dock host dashboard with listings, waiting requests, upcoming stays and on-duty staff.',
    availability: 'live',
  },
}

const BASE = import.meta.env.BASE_URL

export function shotSrcSet(id: ShotId, format: 'avif' | 'webp'): string {
  return SHOTS[id].widths
    .map((w) => `${BASE}assets/shots/${id}-${w}.${format} ${w}w`)
    .join(', ')
}

export function shotFallback(id: ShotId): string {
  return `${BASE}assets/shots/${id}-1280.webp`
}

export function shotLqip(id: ShotId): string {
  return `${BASE}assets/shots/${id}-lqip.webp`
}

export function shotFull(id: ShotId): string {
  return `${BASE}assets/shots/${id}-1600.webp`
}
