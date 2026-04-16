/** InteliBilge™ marketing page content (English source). */

export const intelibilgeHero = {
  title: 'InteliBilge™ System – Intelligent Flood Prevention',
  overview:
    'InteliBilge is a closed-loop, AI-driven flood prevention system that combines a solid-state water level sensor, a marine-grade self-priming bilge pump, and the InteliMarine AI Stack. Unlike traditional float switches that fail due to fouling, oil, or sludge, InteliBilge uses no moving parts in the sensing element. It continuously monitors rising water, automatically activates the pump, analyzes ingress rates, and escalates alerts when a hull breach is suspected – giving you 24/7 protection whether you are onboard or ashore.',
}

export const intelibilgeHowComponents: { component: string; function: string }[] = [
  {
    component: 'IM601 Solid-State Water Level Sensor',
    function:
      'Detects water at user-set thresholds (normal, pump-on, high water). No moving parts.',
  },
  {
    component: 'InteliMarine AI Stack',
    function:
      'Learns normal bilge behavior, distinguishes spills from breaches, calculates ingress rate, and controls pump logic.',
  },
  {
    component: 'InteliMaris Self-Priming Bilge Pump',
    function:
      'High-efficiency diaphragm pump; automatically activated by AI when water reaches pump-on level.',
  },
  {
    component: 'InteliMaris Siren & Strobe (optional)',
    function: 'Wireless local alarm for high-water or pump-failure conditions.',
  },
]

export const intelibilgeSteps: { lead: string; sub?: string[] }[] = [
  {
    lead: 'Water rises to pump-on level → AI starts pump immediately.',
  },
  {
    lead:
      'AI monitors pump runtime and duty cycle → calculates water ingress rate (gallons per minute).',
  },
  {
    lead:
      'If water continues to rise despite pump running → AI declares potential hull breach → escalates to high-water alarm.',
  },
  {
    lead: 'High-water alarm triggers:',
    sub: [
      'Instant notifications via InteliMaris App, SMS, email',
      'Wireless activation of siren & strobe (optional)',
      'Alert sent to marina control center (if InteliMarina installed)',
    ],
  },
  {
    lead:
      'After water recedes below pump-off level, AI stops pump and logs event for historical analysis.',
  },
]

export const intelibilgeFeatureSections: {
  title: string
  bullets: string[]
}[] = [
  {
    title: 'Solid-State Sensing – No Moving Parts',
    bullets: [
      'Eliminates common float-switch failures (sticking, corrosion, fouling from oil/sludge).',
      'Multi-level detection: normal, pump-on, high water.',
    ],
  },
  {
    title: 'AI-Driven Pump Control & Analytics',
    bullets: [
      'Programmable splash protection – configurable start/stop delays prevent false triggers from wave slosh.',
      'Ingress rate calculation – AI measures how quickly water rises to distinguish a spill from a hull breach.',
      'Predictive alerts – abnormal pump cycling or excessive runtime triggers maintenance warnings.',
    ],
  },
  {
    title: 'Reliable Communication & Power',
    bullets: [
      'InteliMarine Long Range Network – low-power, long-range wireless from deep within the hull.',
      'Bluetooth – local configuration and real-time water level viewing via InteliMaris App.',
      'IM601 power – replaceable 5-year lithium battery (no charging, no USB-C). Low-battery alert sent automatically.',
    ],
  },
  {
    title: 'Complete Alert Escalation',
    bullets: [
      'Vessel owner – app push, SMS, email.',
      'Marina control center – real-time alerts (with InteliMarina gateways).',
      'Local alarms – wireless siren/strobe for audible/visual warning on board.',
    ],
  },
  {
    title: 'Historical Data & Maintenance Logs',
    bullets: [
      'All pump activations, runtime, ingress rate estimates, and alarm events are stored on the InteliMarine AI Stack.',
      'Graphs and trends accessible in the app for troubleshooting and insurance documentation.',
    ],
  },
]

export const intelibilgeSpecs: { category: string; specification: string }[] = [
  { category: 'System Name', specification: 'InteliBilge™' },
  { category: 'Sensor Model', specification: 'IM601 Solid-State Water Level Sensor' },
  { category: 'Pump Model', specification: 'InteliMaris Marine-Grade Self-Priming Diaphragm Pump' },
  { category: 'Sensing Method', specification: 'Solid-state (no moving parts)' },
  { category: 'Detection Points', specification: 'Multi-threshold (pump-on, high water, configurable)' },
  { category: 'Pump Activation', specification: 'AI-controlled, automatic based on water level' },
  {
    category: 'Ingress Rate Calculation',
    specification: 'AI analyzes pump duty cycle and water rise time',
  },
  { category: 'Local Alarms', specification: 'Optional InteliMaris Siren & Strobe (wireless)' },
  { category: 'Remote Alerts', specification: 'InteliMaris App, SMS, email' },
  {
    category: 'Marina Integration',
    specification: 'Alerts to InteliMarina control center (if installed)',
  },
  { category: 'IM601 Battery', specification: 'Replaceable 5-year lithium battery' },
  { category: 'IM601 Battery Life', specification: '~5 years typical (depends on reporting interval)' },
  { category: 'Low-Battery Alert', specification: 'Automatic at ≤10% remaining' },
  { category: 'Connectivity', specification: 'InteliMarine Long Range Network, Bluetooth' },
  { category: 'Pump Power', specification: '12V or 24V DC (specify at order)' },
  { category: 'Pump Flow Rate', specification: 'TBC (e.g., 500 GPH, 1000 GPH options)' },
  { category: 'Pump Max Head', specification: 'TBC' },
  { category: 'Sensor Enclosure', specification: 'Bilge-grade sealed (IP rating TBC)' },
  { category: 'Operating Temperature', specification: '-20°C to +60°C (TBC)' },
]

export const intelibilgeIncluded: string[] = [
  'IM601 Solid-State Water Level Sensor with pre-installed 5-year lithium battery, mounting hardware',
  'InteliMaris Self-Priming Bilge Pump with hose barbs and mounting bracket',
  'Wireless gateway (InteliMarine Long Range Network gateway – one per vessel)',
  'InteliMaris App (free download, iOS/Android)',
  'InteliMarine AI Stack subscription (first year included)',
]

export const intelibilgeApplications: string[] = [
  'Sailboats, motor yachts, expedition vessels, commercial craft',
  'Engine rooms, machinery spaces, deep bilges',
  'Vessels with unattended moorings or remote monitoring needs',
  'Marinas using InteliMarina for centralized alerting',
]

export const intelibilgeOrdering: { code: string; description: string }[] = [
  {
    code: 'IB-BASIC',
    description: 'InteliBilge system: IM601 sensor + pump + gateway (no siren/strobe)',
  },
  {
    code: 'IB-PRO',
    description: 'InteliBilge system: IM601 sensor + pump + gateway + siren & strobe',
  },
  {
    code: 'IB-UPGRADE',
    description: 'Additional IM601 sensor for auxiliary bilge (e.g., forward bilge)',
  },
]

export const intelibilgeContact = {
  company: 'InteliMaris LLC',
  websiteUrl: 'https://www.intelimaris.com',
  websiteDisplay: 'www.intelimaris.com',
  email: 'info@intelimarine.com',
  footnote:
    'Specifications subject to change without notice. Professional installation recommended. InteliMarine AI Stack subscription required after first year. All trademarks property of their respective owners.',
}
