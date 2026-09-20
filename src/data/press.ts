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

export interface PressRelease {
  id: string
  date: string
  /** the dateline, e.g. "FORT LAUDERDALE, Fla." */
  place: string
  title: string
  standfirst: string
  summary: string
  intro: string[]
  sections: PressBlock[]
  quote: { text: string; name: string; role: string }
  cta?: { lead: string; text: string; href: string; label: string }
  availability?: string
  boilerplate: { heading: string; text: string }[]
  contact: { name: string; email: string; phone: string }
  /** where the show, event or embargo notes belong */
  notes?: string[]
}

export const PRESS: PressRelease[] = [
  {
    id: 'flibs-2026',
    date: '2026-10-01',
    place: 'FORT LAUDERDALE, Fla.',
    title: 'InteliMARIS brings WaterWayz to FLIBS 2026: one app for the passage, the vessel and the berth',
    standfirst: 'Fort Lauderdale International Boat Show · October 28 – November 1 · [booth number]',
    summary:
      'InteliMARIS will show WaterWayz, its boating app, at the 2026 Fort Lauderdale International Boat Show, alongside the vessel sensors and the marina console that share one platform with it.',
    intro: [
      'InteliMARIS™ will show WaterWayz™, its boating app, at the 2026 Fort Lauderdale International Boat Show, October 28 through November 1, at [booth number].',
      'WaterWayz plans a passage for the vessel it is on — its real length, draft and air draft, not a form — and refuses to draw a route it does not believe. It shows charted depth through the water, live vessel traffic, hazards other boaters have reported, and 27,000 marinas with their approach depth. A berth can be requested from the same screen.',
    ],
    sections: [
      {
        lead: 'The vessel.',
        text: 'InteliMARIS sensors report power, batteries, water, temperature and bilge activity over a long-range radio link, so nothing depends on Wi-Fi at the dock. Every reading carries its age — "4.2 ft · sounded 3 d ago" — because a stale number is worse than no number. Owners see the same readings aboard or away.',
      },
      {
        lead: 'The marina.',
        text: 'On the shore side, marina staff draw their own berth map over satellite imagery, run arrivals and departures from a phone on the pontoon, and hold residents, short stays and staff duty in one place. Every berth carries its approach brief — entry heading, tie side, depth and datum — and a guest is only ever shown berths they fit.',
      },
      {
        lead: 'Emergency Assistance.',
        text: 'Last year, during a medical emergency aboard a vessel in a large Florida marina, 911 had the marina’s address and responders still struggled to find the right boat. InteliMARIS will show the Emergency Assistance concept it is developing in response: a way for a boater to pass on vessel identity, precise position and marina access details when they call for help. WaterWayz does not dispatch emergency services, and it does not replace 911, VHF Channel 16, the U.S. Coast Guard or any other emergency service.',
      },
      {
        lead: 'Mapping the marina.',
        text: 'With Pilot Byte, InteliMARIS is working on high-resolution aerial imagery, photogrammetry and LiDAR surveys of marinas and waterways. A survey demonstration is on the stand; automated surveys and live occupancy remain in development.',
      },
    ],
    quote: {
      text: 'Last year a crew in a big Florida marina waited while responders looked for the right boat. Boaters already have more information than they can use. Our job is to bring the pieces that matter to the moment they matter — the depth ahead, the berth that fits, the one thing a responder needs to know — and to say plainly when we don’t know.',
      name: 'Ron Bishop',
      role: 'CEO, InteliMARIS',
    },
    cta: {
      lead: 'Try it before the show.',
      text: 'The WaterWayz passage planner, the berth-fit tool and an orbitable LiDAR survey are live on this site.',
      href: '/capabilities/route-planning',
      label: 'Plan a route for your own draft',
    },
    availability:
      'WaterWayz is [available on iOS and Android / in pilot with marinas in Florida]; the marina console is [in use at X marinas / entering pilots in early 2027]. Emergency Assistance is a concept under development and has no release date.',
    boilerplate: [
      {
        heading: 'About InteliMARIS',
        text: 'InteliMARIS builds the sensors, the app and the marina console that watch a vessel, a passage and a basin, and say what changed before it matters. It is based in Fort Lauderdale, Florida.',
      },
      {
        heading: 'About Pilot Byte',
        text: '[One sentence from Pilot Byte.]',
      },
    ],
    contact: { name: '[Name]', email: 'info@intelimarine.com', phone: '[Phone]' },
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
