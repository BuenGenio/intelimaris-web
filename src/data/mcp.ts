/**
 * The MCP page: what an AI assistant connected to InteliMaris can do, shown the
 * way a person sees it (a conversation) and the way the API does it (tool
 * calls over the platform's public REST operations).
 *
 * Tool names follow the registry's style (`find_businesses`, `vessel_readiness`).
 * Results are trimmed examples; every field name comes from the public REST
 * contract the tool wraps. '…' marks something left out.
 */

export type McpAccess = 'public' | 'signed-in'

export interface McpCall {
  tool: string
  args: Record<string, unknown>
  /** The public REST operation the tool reads. */
  rest: string
  result: unknown
}

export interface McpCardRow {
  primary: string
  secondary?: string
  tag?: string
  tone?: 'good' | 'warn' | 'neutral'
}

export interface McpUseCase {
  id: string
  eyebrow: string
  title: string
  summary: string
  access: McpAccess
  /** The one thing the answer never pretends. */
  honest: string
  ask: string
  answer: string[]
  card: { title: string; rows: McpCardRow[] }
  calls: McpCall[]
}

export const MCP_EXAMPLE_VESSEL = 'Wanderer, a 42 ft Sabre out of Fort Lauderdale'

const PLAN_ID = '01929f3c-7c4e-7a1b-9d2e-5b8f0c3a6d14'

export const MCP_USE_CASES: McpUseCase[] = [
  {
    id: 'passage',
    eyebrow: 'Passage',
    title: 'Plan a passage and its conditions',
    summary: 'A route for this vessel’s draft and air draft, with the waits for tide and bridges, and the wind, waves, tide and current along the way, in route time rather than at the dock.',
    access: 'public',
    honest: 'Defaulted inputs and stretches it could not evaluate are listed in the notes, never hidden.',
    ask: 'Plan Wanderer from Sunrise Bay to Bahia Mar tomorrow morning, and tell me what the water will be doing.',
    answer: [
      'Leave at 08:40 and you are alongside at Bahia Mar around 09:22: 2.6 nm, with one 9-minute wait for the Las Olas bridge.',
      'Along the way, wind 8–11 kn from the east and waves under 0.3 m inside. The passage clears your 0.6 m under-keel margin with 97% confidence.',
    ],
    card: {
      title: 'Sunrise Bay → Bahia Mar',
      rows: [
        { primary: 'Depart 08:40 · arrive 09:22', secondary: '2.6 nm · 42 min' },
        { primary: 'Wait 9 min', secondary: 'Las Olas bridge', tag: 'Bridge', tone: 'neutral' },
        { primary: '97%', secondary: 'clears your 0.6 m margin', tag: 'Depth', tone: 'good' },
        { primary: 'Wind 8–11 kn E · waves < 0.3 m', secondary: 'peak along the route' },
      ],
    },
    calls: [
      {
        tool: 'plan_passage',
        args: { vessel: 'Wanderer', from_marina: 'sunrise-bay', to_marina: 'bahia-mar', departure: '2026-10-06T08:30:00-04:00', margin_m: 0.6 },
        rest: 'POST /v0/route/plan',
        result: {
          plan_id: PLAN_ID,
          passage: {
            departs_at: '2026-10-06T08:40:00-04:00',
            arrives_at: '2026-10-06T09:22:00-04:00',
            distance_m: 4815,
            duration_min: 42,
            clear_prob_at_margin: 0.97,
            waiting_dominates: false,
            waits: [{ cause: 'bridge', near: 'Las Olas bridge', minutes: 9 }],
            notes: ['Cruise speed defaulted from hull type'],
          },
        },
      },
      {
        tool: 'passage_conditions',
        args: { plan_id: PLAN_ID },
        rest: 'GET /v0/route/plans/{plan_id}/conditions',
        result: {
          plan_id: PLAN_ID,
          samples: [
            { at: '2026-10-06T08:52:00-04:00', chainage_m: 1600, wind_kn: 11, wave_m: 0.3, tide_m: 0.42, current_kn: 0.8 },
            '…',
          ],
        },
      },
    ],
  },
  {
    id: 'marinas',
    eyebrow: 'Marinas',
    title: 'Find marinas, and “will she fit?”',
    summary: 'Marinas near a place or a position, then a verdict for the marina and for every berth it has drawn, against the vessel’s length, beam and draft.',
    access: 'public',
    honest: 'Three answers, not two: where a limit was never stated, the answer is “unknown”, never a guess.',
    ask: 'Which marinas near Port Everglades can take Wanderer? She’s 42 ft with a 14 ft beam and draws 4.6 ft.',
    answer: [
      'Bahia Mar fits: its stated limits take her, and 14 of its drawn berths fit. Three are too narrow, and six are unknown because no width was stated for them.',
      'Las Olas Marina is unknown: no approach depth is stated, so I can’t say she clears it.',
    ],
    card: {
      title: 'Wanderer · 42 ft · 14 ft beam · 4.6 ft draft',
      rows: [
        { primary: 'Bahia Mar', secondary: '14 berths fit · 3 too narrow · 6 unknown', tag: 'Fits', tone: 'good' },
        { primary: 'Las Olas Marina', secondary: 'approach depth not stated', tag: 'Unknown', tone: 'neutral' },
      ],
    },
    calls: [
      {
        tool: 'find_marinas',
        args: { near: 'Port Everglades', radius_nm: 2 },
        rest: 'GET /v0/marina/nearby',
        result: [{ slug: 'bahia-mar', name: 'Bahia Mar', distance_m: 1480, approach_depth_m: 4.2 }, '…'],
      },
      {
        tool: 'marina_fit',
        args: { marina: 'bahia-mar', loa_m: 12.8, beam_m: 4.3, draft_m: 1.4 },
        rest: 'GET /v0/marina/marinas/{slug}/fit',
        result: {
          marina_slug: 'bahia-mar',
          marina: { verdict: 'fits', summary: 'Length, beam and approach depth are within the stated limits' },
          tally: { fits: 14, will_not_fit: 3, unknown: 6 },
          disclaimer: 'Fit is about dimensions only, not whether a berth is free',
        },
      },
    ],
  },
  {
    id: 'berths',
    eyebrow: 'Stays',
    title: 'Berth search and availability',
    summary: 'Private-dock berths and marinas in one list, by distance, checked against your dates and priced for this vessel’s length.',
    access: 'public',
    honest: 'A marina has no calendar to pre-check, so it says “request”: the dockmaster allocates.',
    ask: 'Find Wanderer a berth near Bahia Mar for three nights from 12 October.',
    answer: [
      'Two private docks have all three nights open: one on the New River at $120 a night that you can book straight away, and one in Rio Vista at $95 a night on request.',
      'Bahia Mar itself starts at $182 a night for 42 ft. It takes requests, and the dockmaster allocates the berth.',
    ],
    card: {
      title: '12–15 Oct · 3 nights · 42 ft',
      rows: [
        { primary: 'New River private dock', secondary: '$120/night · open all 3 nights', tag: 'Instant book', tone: 'good' },
        { primary: 'Rio Vista private dock', secondary: '$95/night · open all 3 nights', tag: 'Request', tone: 'neutral' },
        { primary: 'Bahia Mar', secondary: 'from $182/night for 42 ft', tag: 'Request', tone: 'neutral' },
      ],
    },
    calls: [
      {
        tool: 'find_berths',
        args: { near: 'bahia-mar', check_in: '2026-10-12', check_out: '2026-10-15', loa_m: 12.8 },
        rest: 'GET /v0/dockpass/search',
        result: [
          { kind: 'listing', name: 'New River private dock', cta: 'instant_book', available_for_stay: true, from_cents_per_night: 12000, distance_m: 1900 },
          { kind: 'marina', name: 'Bahia Mar', marina_slug: 'bahia-mar', cta: 'request', available_for_stay: null, from_cents_per_night: 18200, distance_m: 0 },
          '…',
        ],
      },
    ],
  },
  {
    id: 'hazards',
    eyebrow: 'Hazards',
    title: 'Hazards near a point or along a route',
    summary: 'Active reports from other skippers around a position, or along every leg of a planned passage, with how often they have been confirmed and when they expire.',
    access: 'public',
    honest: 'Reports are labelled as reports from other skippers, never mixed with charted features. Expired or cleared reports never appear.',
    ask: 'Anything reported on the water between Sunrise Bay and Bahia Mar this morning?',
    answer: [
      'Two reports along your route. A submerged log near the green marker south of the Las Olas bridge, confirmed twice, most recently 40 minutes ago. And shoaling reported in the Sunrise Bay channel an hour ago, not yet confirmed.',
      'Both come from other skippers, not from the chart.',
    ],
    card: {
      title: 'Along Sunrise Bay → Bahia Mar',
      rows: [
        { primary: 'Debris', secondary: 'Submerged log near green marker · 410 m off your track', tag: 'Confirmed ×2', tone: 'warn' },
        { primary: 'Shoaling', secondary: 'Sunrise Bay channel · on your track', tag: 'Reported', tone: 'neutral' },
      ],
    },
    calls: [
      {
        tool: 'hazards_near',
        args: { plan_id: PLAN_ID },
        rest: 'GET /v0/places/hazards (around each leg)',
        result: [
          { category: 'debris', status: 'confirmed', confirmations: 2, provenance: 'user_reported', note: 'Submerged log near green marker', last_confirmed_at: '2026-10-06T07:50:00-04:00', expires_at: '2026-10-06T19:10:00-04:00' },
          { category: 'shallow', status: 'reported', confirmations: 0, provenance: 'user_reported', note: null },
        ],
      },
    ],
  },
  {
    id: 'events',
    eyebrow: 'Events',
    title: 'Events on the water',
    summary: 'Closures, restrictions, regattas, fireworks and races near a position or a marina, from Local Notices to Mariners and from the marinas themselves.',
    access: 'public',
    honest: 'Every event says where it came from, and whether it constrains navigation.',
    ask: 'Is anything on this weekend that could affect a passage near Fort Lauderdale?',
    answer: [
      'Two things. A fireworks safety zone off the beach on Saturday, 21:00 to 21:45, from the Local Notice to Mariners. It restricts navigation.',
      'And Bahia Mar’s sunset regatta on Sunday at 17:00, posted by the marina. It doesn’t close the channel.',
    ],
    card: {
      title: 'This weekend near Fort Lauderdale',
      rows: [
        { primary: 'Fireworks safety zone', secondary: 'Sat 21:00–21:45 · Local Notice to Mariners', tag: 'Affects navigation', tone: 'warn' },
        { primary: 'Sunset regatta', secondary: 'Sun 17:00 · posted by Bahia Mar', tag: 'No closure', tone: 'neutral' },
      ],
    },
    calls: [
      {
        tool: 'events_near',
        args: { near: 'Fort Lauderdale', horizon_days: 7 },
        rest: 'GET /v0/events/nearby',
        result: [
          { name: 'Fireworks safety zone', kind: 'fireworks', status: 'upcoming', starts_at: '2026-10-10T21:00:00-04:00', ends_at: '2026-10-10T21:45:00-04:00', affects_navigation: true, source: 'lnm' },
          { name: 'Sunset regatta', kind: 'regatta', status: 'upcoming', starts_at: '2026-10-11T17:00:00-04:00', affects_navigation: false, source: 'operator', marina_slug: 'bahia-mar' },
        ],
      },
    ],
  },
  {
    id: 'float-plan',
    eyebrow: 'Float plans',
    title: 'Float plan status',
    summary: 'Whether your shore contact has the plan, who is aboard, and when the next check-in is due, for vessels your account belongs to.',
    access: 'signed-in',
    honest: '“Sent” means the mail provider accepted it, never that it was read.',
    ask: 'Did my float plan to Bimini reach Mark, and when is my next check-in?',
    answer: [
      'Yes. It was accepted for delivery to Mark at 07:58. The plan is active with four aboard, and your next check-in is due at 12:00.',
      'If you haven’t checked in by then, Mark is told the plan is overdue.',
    ],
    card: {
      title: 'Wanderer → Bimini',
      rows: [
        { primary: 'Active', secondary: '4 aboard · departed 08:00', tag: 'Active', tone: 'good' },
        { primary: 'Mark', secondary: 'accepted for delivery at 07:58', tag: 'Sent', tone: 'neutral' },
        { primary: 'Next check-in 12:00', secondary: 'every 4 hours until arrival', tag: 'Due', tone: 'neutral' },
      ],
    },
    calls: [
      {
        tool: 'float_plan_status',
        args: { vessel: 'Wanderer' },
        rest: 'GET /v0/vessel/w/{workspace_id}/float-plans',
        result: {
          destination_name: 'Bimini',
          status: 'active',
          people_aboard: 4,
          contact_name: 'Mark',
          delivery_status: 'sent',
          sent_at: '2026-10-06T07:58:00-04:00',
          check_in_minutes: 240,
          next_check_in_at: '2026-10-06T12:00:00-04:00',
          overdue_notified_at: null,
        },
      },
    ],
  },
  {
    id: 'traffic',
    eyebrow: 'Traffic',
    title: 'Live vessel traffic',
    summary: 'The live AIS picture asked as a question: which vessels, of what class, at what speed and bound where, in an area you name.',
    access: 'public',
    honest: 'The feed’s own status comes with every answer: a dead feed is “no feed”, never “no ships”.',
    ask: 'What large vessels are moving in Port Everglades right now?',
    answer: [
      'Three are underway: a tanker inbound at 6 kn, a passenger vessel leaving at 4 kn bound for Nassau, and a cargo vessel outbound at 9 kn.',
      'The AIS feed is live, last heard 3 seconds ago.',
    ],
    card: {
      title: 'Port Everglades · underway',
      rows: [
        { primary: 'Tanker', secondary: 'inbound · 6.1 kn' },
        { primary: 'Passenger', secondary: 'outbound · 4.0 kn · Nassau' },
        { primary: 'Cargo', secondary: 'outbound · 8.9 kn' },
        { primary: 'AIS feed', secondary: 'last message 3 s ago', tag: 'Live', tone: 'good' },
      ],
    },
    calls: [
      {
        tool: 'vessel_traffic',
        args: { area: 'Port Everglades', underway: true, min_sog_kn: 0.5 },
        rest: 'GET /v0/vessel/live/query',
        result: {
          matched: 3,
          status: { state: 'live', vessel_count: 214, last_message_at: '2026-10-06T10:14:57Z' },
          vessels: {
            type: 'FeatureCollection',
            features: [
              { type: 'Feature', properties: { class: 'tanker', sog_kn: 6.1, destination: 'PORT EVERGLADES' }, geometry: { type: 'Point', coordinates: [-80.112, 26.088] } },
              '…',
            ],
          },
        },
      },
    ],
  },
]

/** Already in the registry today, used by the assistant inside InteliWaterwayz. */
export const MCP_REGISTRY_TOOLS = [
  { tool: 'find_businesses', title: 'Businesses near you', summary: 'Fuel docks, restaurants, chandleries, yards, provisioning, towing, pump-outs and ramps near the vessel, nearest first.' },
  { tool: 'get_business', title: 'One business in detail', summary: 'Phone, website, opening hours as posted, and owner-supplied facts such as fuel prices with their age.' },
  { tool: 'vessel_readiness', title: 'Vessel readiness', summary: 'What the platform knows about a vessel’s setup and what is missing: twelve checks and a score out of those that apply.' },
]
