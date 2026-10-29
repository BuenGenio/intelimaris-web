/**
 * Press releases. Dates are ISO; the newest is listed first. Anything in
 * [brackets] is a placeholder the release must not ship with, and the page
 * shows it as such rather than hiding it.
 */

export interface PressBlock {
  /** a run of paragraphs; the first may open with a bold lead */
  lead?: string
  text: string
}

export interface PressImage {
  /** path under the site base, e.g. "assets/press/x.webp" */
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export interface PressRelease {
  id: string
  date: string
  /** the dateline, e.g. "FORT LAUDERDALE, Fla." */
  place: string
  title: string
  standfirst: string
  summary: string
  /** shown beside the headline, as on the printed release */
  hero?: PressImage
  intro: string[]
  sections: PressBlock[]
  /** captioned photographs that follow the sections */
  figures?: PressImage[]
  quote: { text: string; name: string; role: string }
  /** the sign-off line, e.g. "Your whole boating experience. Intelligently connected." */
  tagline?: string
  cta?: { lead: string; text: string; href: string; label: string }
  availability?: string
  boilerplate: { heading: string; text: string }[]
  contact: { name: string; email: string; phone: string }
  /** the trademark line; a default is used when absent */
  marks?: string
  /** where the show, event or embargo notes belong */
  notes?: string[]
}

export const PRESS: PressRelease[] = [
  {
    id: 'flibs-2026',
    date: '2026-10-28',
    place: 'FORT LAUDERDALE, FL.',
    title: 'InteliMARIS unveils new InteliWaterwayz Demo App: experience the future of connected boating',
    standfirst:
      'InteliMARIS will showcase its expanding connected maritime ecosystem at the 2026 Fort Lauderdale International Boat Show, October 28 – November 1.',
    summary:
      'InteliMARIS showcases the future of connected boating at the 2026 Fort Lauderdale International Boat Show with the launch of the InteliWaterwayz Demo App, an interactive simulation of its all-in-one boating platform, launching in 2027.',
    hero: {
      src: 'assets/press/flibs-2026-app.webp',
      alt: 'A phone showing the InteliWaterwayz welcome screen: “Welcome to the future of safer boating” over an aerial view of a motor yacht under way.',
      width: 607,
      height: 1170,
    },
    intro: [
      'InteliMARIS® showcases the future of connected boating with the launch of its Demo App, InteliWaterwayz®. Incorporating innovative new technology using advanced drone, sensor and mapping technology, the future of boating is more connected and secure than ever before.',
      'InteliWaterwayz® is an all-in-one boating platform designed to bring navigation, vessel monitoring, marina discovery, booking, docking guidance and boating communities together in one connected experience. With InteliWaterwayz®, it’s smooth sailing all the wayz.',
      'The Demo App is an interactive simulation tool that allows boaters to explore the maritime ecosystem on their own smartphone in real time.',
    ],
    sections: [
      {
        lead: 'The InteliWaterwayz® Demo App.',
        text: 'The new InteliWaterwayz® Demo App simulates your boating experience and provides an overview of some of its many features and benefits. Users can seamlessly navigate through the App’s screens and can experience virtual boating through several simulated features.',
      },
      {
        lead: 'Connected vessel systems.',
        text: 'Through connected sensors and intelligent monitoring technology, the system is designed to help boat owners stay informed about important onboard conditions, including electrical systems, batteries, water, temperature, bilge activity and other vessel parameters, whether aboard or away.',
      },
      {
        text: 'Using advanced drone technology, bathymetric surveying, LiDAR and geospatial intelligence, we aim to transform how marinas are mapped, monitored and managed.',
      },
      {
        lead: 'Bathymetric surveying, LiDAR and advanced geospatial mapping.',
        text: 'Specialized bathymetric survey drones will collect underwater depth measurements, providing valuable information about marina basins, channels, approaches and surrounding waterways. High-resolution aerial imagery, photogrammetry and LiDAR technology will provide detailed digital representations of marina environments, capturing docks, slips, access routes, infrastructure and surrounding terrain. Combining these technologies has the potential to provide marina operators with a more comprehensive understanding of their facilities, both above and below the waterline.',
      },
      {
        lead: 'DockPass™.',
        text: 'Boaters can book a slip using the DockPass™ feature on the App, which assimilates all the required information to help boaters discover and find marinas or docks, identify and book suitable slips (accounting for vessel size) and make reservations. The App will then guide the boat into the correct slip for a safer arrival. Reservations are marina dependent.',
      },
    ],
    figures: [
      {
        src: 'assets/press/flibs-2026-map.webp',
        alt: 'A phone showing the InteliWaterwayz map over Fort Lauderdale, with marina pins, a closed bascule bridge notice, an SOS button and a Report button.',
        caption: 'App simulation of waterway guidance and marina discovery.',
        width: 731,
        height: 1424,
      },
      {
        src: 'assets/press/flibs-2026-drone.webp',
        alt: 'A drone hovering over a motor yacht at a marina dock, scanning the stern with a thermal camera.',
        caption: 'Thermal-imaging drones will scan for abnormal heat patterns while a vessel is docked in a marina.',
        width: 712,
        height: 712,
      },
    ],
    quote: {
      text: 'Boaters have access to more information than ever, but much of it remains disconnected. Our vision is to bring the important pieces together so boaters can better understand their vessel, their surroundings and what matters at that moment. By connecting onboard technology with marina intelligence, advanced mapping and the boating experience, we’re building something that goes far beyond traditional navigation.',
      name: 'Ron Bishop',
      role: 'CEO, InteliMarine LLC',
    },
    tagline: 'Your whole boating experience. Intelligently connected.',
    cta: {
      lead: 'On this site.',
      text: 'The InteliWaterwayz app, the vessel sensors and the marina console are described in detail here.',
      href: '/waterwayz',
      label: 'Explore InteliWaterwayz',
    },
    boilerplate: [
      {
        heading: 'About InteliMARIS',
        text: 'InteliMARIS® heads up a group of specialist maritime and technology businesses who create in-depth, comprehensive tools to support navigation and connectivity of their maritime ecosystem. This collaboration unveils the new innovative all-in-one boating App, InteliWaterwayz®. Launching in 2027.',
      },
    ],
    contact: { name: 'Samantha Skolnik', email: 'info@intelimaris.com', phone: '386 383 4847' },
    marks: 'InteliMARIS®, InteliWaterwayz® and DockPass™ are marks of InteliMarine LLC.',
  },
]

export const findRelease = (id: string | undefined): PressRelease | undefined =>
  id ? PRESS.find((r) => r.id === id) : undefined

export const pressLink = (id: string) => `/press/${id}`

/** True while the release still carries a [placeholder]. */
export const hasPlaceholders = (r: PressRelease): boolean =>
  /\[[^\]]+\]/.test(
    [r.standfirst, ...r.intro, r.availability ?? '', ...r.boilerplate.map((b) => b.text), r.contact.name, r.contact.phone].join('\n'),
  )

export function formatPressDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}
