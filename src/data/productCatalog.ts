export interface SpecRow {
  parameter: string
  specification: string
}

export interface OrderingRow {
  code: string
  description: string
}

export interface CatalogProduct {
  id: string
  model: string
  name: string
  overview: string
  features: string[]
  specs: SpecRow[]
  applications: string
  ordering: string
  category: 'safety' | 'water' | 'environment' | 'electrical' | 'motion' | 'control' | 'system'
  image?: string
}

export interface CatalogSystem extends Omit<CatalogProduct, 'category'> {
  category: 'system'
  howItWorks: string[]
  whatsIncluded?: string[]
  orderingRows?: OrderingRow[]
}

export type CatalogEntry = CatalogProduct | CatalogSystem

export const productCatalog: CatalogEntry[] = [
  {
    id: 'im101',
    model: 'IM101',
    name: 'Smoke & Carbon Monoxide Detector',
    category: 'safety',
    overview:
      'The IM101 combines photoelectric smoke sensing and electrochemical CO detection in a single marine-grade unit. When smoke or dangerous CO levels are detected, it triggers an 85+ dB onboard alarm and sends supported connected alerts through the InteliMARIS ecosystem.',
    features: [
      'Dual detection: smoke + carbon monoxide',
      '85+ dB audible alarm',
      'Remote alerts: app, SMS, email',
      'Contextual nuisance-alert analysis is in development',
      'Replaceable 5-year lithium battery',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM101' },
      { parameter: 'Detection', specification: 'Photoelectric smoke, electrochemical CO' },
      { parameter: 'Alarm Sound Level', specification: '≥85 dB at 1m' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Installation', specification: 'Ceiling or bulkhead mount' },
      { parameter: 'Operating Temp.', specification: '-10°C to +50°C' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Engine rooms, galleys, cabins, salon, enclosed spaces with fuel-burning appliances.',
    ordering:
      'Product Code: IM101 — Includes sensor, pre-installed battery, mounting screws, manual.',
  },
  {
    id: 'im201',
    model: 'IM201',
    name: 'Precision Moisture Leak Detector (3-Pin)',
    category: 'water',
    image: 'assets/products/im201-leak-pins.webp',
    overview:
      'Freestanding moisture sensor for flat surfaces. Three adjustable conductivity probes detect water instantly – when moisture bridges all three, an alert is sent. Catches small leaks before they rot interiors.',
    features: [
      '3 adjustable conductivity probes',
      'Freestanding – no mounting required',
      'IP65 waterproof',
      'Contextual leak-pattern analysis is in development',
      'Replaceable 5-year lithium battery',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM201' },
      { parameter: 'Detection Method', specification: 'Conductivity (3 probes)' },
      { parameter: 'Probe Height', specification: 'Adjustable' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium (CR123A)' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Enclosure Rating', specification: 'IP65' },
      { parameter: 'Installation', specification: 'Place on flat surface' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Under refrigerators, freezers, sinks, toilets, AC units, windows – any flat surface prone to leaks.',
    ordering:
      'Product Code: IM201 — Includes sensor, pre-installed battery, manual.',
  },
  {
    id: 'im202',
    model: 'IM202',
    name: 'Rope-Style Leak Sensor',
    category: 'water',
    overview:
      'Flexible rope with conductivity probe at the end for tight access locations. Secure rope above; probe hangs at desired detection point. Ideal where rigid sensors cannot fit.',
    features: [
      'Flexible rope for tight spaces',
      'Conductivity probe at rope end',
      'User-set detection depth',
      'Replaceable 5-year lithium battery',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM202' },
      { parameter: 'Detection Method', specification: 'Conductivity (probe on rope)' },
      { parameter: 'Rope Material', specification: 'Marine-grade synthetic' },
      { parameter: 'Rope Length', specification: '1m, 2m, 3m (custom available)' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Installation', specification: 'Rope secured above, probe hangs freely' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Deep bilges, narrow sumps, behind machinery, under fuel tanks, confined spaces.',
    ordering:
      'Product Code: IM202-XXX (length in meters) — Includes sensor, rope with probe, mounting clip, pre-installed battery, manual.',
  },
  {
    id: 'im301',
    model: 'IM301',
    name: 'Temperature & Humidity Sensor (IP64)',
    category: 'environment',
    image: 'assets/products/im301-temp-humidity-ip64.webp',
    overview:
      'High-accuracy temperature and humidity monitoring (±0.1°C / ±1.5% RH) in a rugged, IP64 splash-proof enclosure. Designed for engine rooms, galleys, heads, and other wet areas.',
    features: [
      'Accuracy: ±0.1°C, ±1.5% RH',
      'IP64 splash-proof',
      'Replaceable 5-year lithium battery',
      'Custom alerts per location',
      '30+ day cloud history with graphs',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM301' },
      { parameter: 'Temp. Range', specification: '-40°C to +85°C (TBC)' },
      { parameter: 'Humidity Range', specification: '0–100% RH (non-condensing)' },
      { parameter: 'Accuracy', specification: 'Temp: ±0.1°C, Humidity: ±1.5% RH' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Enclosure Rating', specification: 'IP64 (splash-proof)' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications: 'Engine rooms, bilges, galleys, heads, electronics bays, cargo holds.',
    ordering:
      'Product Code: IM301 — Includes sensor, pre-installed battery, mounting hardware, manual.',
  },
  {
    id: 'im302',
    model: 'IM302',
    name: 'Temperature & Humidity Sensor (Living Areas, Round)',
    category: 'environment',
    image: 'assets/products/im302-temp-humidity-round.webp',
    overview:
      'Same high accuracy (±0.1°C / ±1.5% RH) in a round, non-waterproof enclosure for dry living spaces (cabins, salons). Sleek design, replaceable 5-year lithium battery.',
    features: [
      'Accuracy: ±0.1°C, ±1.5% RH',
      'Round enclosure – not IP rated',
      'For dry indoor use only',
      'Replaceable 5-year lithium battery',
      'Custom alerts, 30+ day history',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM302' },
      { parameter: 'Temp. Range', specification: '-40°C to +85°C (TBC)' },
      { parameter: 'Humidity Range', specification: '0–100% RH (non-condensing)' },
      { parameter: 'Accuracy', specification: 'Temp: ±0.1°C, Humidity: ±1.5% RH' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Enclosure', specification: 'Round, not waterproof (dry areas only)' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications: 'Cabins, salons, wine lockers, dry storage – not for wet areas.',
    ordering:
      'Product Code: IM302 — Includes sensor, pre-installed battery, mounting hardware, manual.',
  },
  {
    id: 'im401',
    model: 'IM401',
    name: 'AC Shore Power Monitor',
    category: 'electrical',
    image: 'assets/products/im401-ac-monitor.webp',
    overview:
      'Plugs into a standard AC outlet and monitors 110V/220V shore power presence every 4 seconds. Provides power-loss information so the crew can check refrigeration, chargers and other shore-powered systems. Remote notification depends on the connected installation.',
    features: [
      'Monitors 110V/220V AC presence',
      'Update every 4 seconds',
      'Plugs directly into AC outlet',
      'Runs on shore power – preserves battery',
      'Replaceable 5-year lithium battery (up to 10 years effective life)',
      'IP64 splash protection',
      'Contextual power-outage analysis is in development',
      'Timestamped outage logs',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM401' },
      { parameter: 'Monitored Parameter', specification: 'AC voltage presence (110V/220V)' },
      { parameter: 'Update Frequency', specification: '4 seconds' },
      { parameter: 'Power Source', specification: 'Shore power (primary); replaceable 5-yr lithium backup' },
      { parameter: 'Effective Battery Life', specification: 'Up to 10 years (when plugged into AC)' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network' },
      { parameter: 'Enclosure Rating', specification: 'IP64' },
      { parameter: 'Connector', specification: 'Standard 2-pin AC plug' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Shore-power awareness for vessels with refrigeration, climate control, battery chargers and other connected systems.',
    ordering: 'Product Code: IM401 — Includes sensor with pre-installed battery, manual.',
  },
  {
    id: 'im501',
    model: 'IM501',
    name: 'DC Shunt & Battery Monitor',
    category: 'electrical',
    overview:
      'Battery-bank monitoring for voltage, current and supported battery-state channels. Available measurements and estimates depend on the installed monitor and configuration. Advanced health analysis is developing; autonomous isolation and thermal-runaway prevention are not validated features of this offer.',
    features: [
      'Monitors voltage, current, SOC, temperature',
      'Includes 500A InteliMaris Smart Shunt (scalable to 10,000A)',
      'Supports up to 4 shunts for multi-bank monitoring',
      'Midpoint voltage detection for series banks',
      'Programmable relay (load shed / generator start)',
      'Ultra-low self-consumption',
      'Advanced battery-health analysis in development',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM501' },
      { parameter: 'Included Shunt', specification: '500A (scalable to 10,000A)' },
      {
        parameter: 'Measured Parameters',
        specification: 'Voltage, Current, Power, Ah consumed, SOC (%), Time remaining',
      },
      {
        parameter: 'Additional Inputs',
        specification: '1x voltage (2nd bank/midpoint), 1x temperature/midpoint',
      },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network' },
      { parameter: 'Programmable Relay', specification: 'Yes' },
      { parameter: 'Self-Consumption', specification: 'Ultra-low (TBC)' },
      { parameter: 'Power Source', specification: 'From monitored battery bank' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'LiFePO₄, AGM, Gel, flooded banks; house banks, starter batteries, fleet management.',
    ordering:
      'Product Code: IM501 — Includes monitor head, 500A smart shunt, connection kit, network cable, mounting bezels, manual.',
  },
  {
    id: 'im601',
    model: 'IM601',
    name: 'Solid-State Water Level Sensor',
    category: 'water',
    image: 'assets/products/im601-water-level.webp',
    overview:
      'Solid-state water level sensor with no moving parts for harsh bilge environments. Detects rising water at multiple thresholds. Can be used with the InteliBilge system for automated pump control.',
    features: [
      'Solid-state sensing with no moving parts',
      'Multi-level detection (normal, pump-on, high water)',
      'Bilge-pattern analysis in development',
      'Programmable splash protection',
      'Replaceable 5-year lithium battery',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM601' },
      { parameter: 'Sensing Method', specification: 'Solid-state water level (no moving parts)' },
      { parameter: 'Detection Points', specification: 'Multi-threshold (pump-on, high-water, etc.)' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Pump Integration', specification: 'Local controller integration; confirm supplied configuration' },
      { parameter: 'Alarm Integration', specification: 'Wireless trigger for siren/strobe' },
      { parameter: 'Enclosure', specification: 'Bilge-grade sealed (IP rating TBC)' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Bilge compartments, engine room sumps, machinery spaces, sailboats, motor yachts.',
    ordering:
      'Product Code: IM601 — Includes sensor with pre-installed battery, mounting hardware, manual.',
  },
  {
    id: 'im701',
    model: 'IM701',
    name: 'Vibration Sensor',
    category: 'motion',
    overview:
      'A MEMS vibration sensor for engine and generator monitoring. Fuel estimation and mechanical-anomaly analysis are developing software concepts that require vessel-specific data and validation.',
    features: [
      'Detects generator/propulsion runtime and load',
      'Virtual fuel estimation: developing concept',
      'External sensing without an inline fuel-flow sensor',
      'Fuel and range estimates are not yet validated capabilities',
      'Mechanical-pattern analysis in development',
      'Replaceable 5-year lithium battery',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM701' },
      { parameter: 'Sensor Type', specification: 'MEMS accelerometer (±0.01g resolution)' },
      { parameter: 'Virtual Fuel Accuracy', specification: 'Not validated; no accuracy claim' },
      { parameter: 'Fuel Types', specification: 'Diesel, petrol/gasoline' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      {
        parameter: 'Integration',
        specification: 'Requires AC monitor (IM401), GPS, weather data',
      },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Generator fuel monitoring, propulsion fuel tracking, engine health, predictive maintenance.',
    ordering:
      'Product Code: IM701 — Includes sensor, pre-installed battery, mounting hardware, manual. (Ask about the status of developing fuel-estimation features.)',
  },
  {
    id: 'im801',
    model: 'IM801',
    name: 'DC Power Monitor',
    category: 'electrical',
    image: 'assets/products/im801-dc-monitor.webp',
    overview:
      'Monitors voltage and current on multiple DC branches (12V/24V): solar input, alternator output, battery charge current, individual loads. Alerts on unexpected discharge, charging failure, voltage drops.',
    features: [
      'Monitors multiple DC branches',
      'Detects parasitic drains and failing alternators',
      'Alerts on voltage drops and charging failures',
      'Works with IM501 for complete electrical health',
      'Replaceable 5-year lithium battery',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM801' },
      { parameter: 'Voltage Range', specification: '12V / 24V DC (TBC)' },
      { parameter: 'Current Measurement', specification: 'Per branch (TBC max)' },
      { parameter: 'Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Integration', specification: 'Pairs with IM501' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'House banks, starter batteries, solar systems, alternator monitoring, navigation/comm circuits.',
    ordering:
      'Product Code: IM801 — Includes sensor with pre-installed battery, current clamps (if applicable), manual.',
  },
  {
    id: 'im901',
    model: 'IM901',
    name: 'I/O Remote AC Switch',
    category: 'control',
    image: 'assets/products/im901-remote-io.webp',
    overview:
      'Solid-state switching hardware for appropriately designed AC circuits. Confirm the supplied controller, permitted loads and supported software controls for the installation. Autonomous safety actions are not offered as a validated capability.',
    features: [
      'Solid-state switching – no moving parts',
      'Remote control requires supported integration and connectivity',
      'Software-driven automation is subject to integration and validation',
      'Compact design fits in standard panels',
      'AC-powered – no battery required',
      'MX MariWavz™ radio network',
    ],
    specs: [
      { parameter: 'Model', specification: 'IM901' },
      { parameter: 'Switching Type', specification: 'Solid-state relay' },
      { parameter: 'Load Voltage', specification: '110V / 220V AC' },
      { parameter: 'Max Current', specification: 'TBC' },
      { parameter: 'Power Source', specification: 'AC line (no battery)' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network' },
      { parameter: 'Control', specification: 'Confirm supported local and remote controls' },
      { parameter: 'Dimensions', specification: 'TBC' },
      { parameter: 'Weight', specification: 'TBC' },
    ],
    applications:
      'Remote control of AC devices (lighting, pumps, electronics, HVAC), installation-specific load management. Confirm compatibility before use.',
    ordering: 'Product Code: IM901 — Includes switch module, mounting hardware, manual.',
  },
  {
    id: 'intelibilge',
    model: 'InteliBilge™',
    name: 'Water-ingress Monitoring & Pump Supervision',
    category: 'system',
    overview:
      'A system approach to water-level sensing and bilge-pump supervision. Local hardware and firmware provide the configured protection; WaterWayz™ adds supported connected readings and history. Pump behavior, alarms and installation scope must be confirmed for the vessel. Advanced ingress analysis is in development.',
    features: [
      'Solid-state sensing – no moving parts',
      'Multi-level detection (normal, pump-on, high water)',
      'Programmable splash protection',
      'Local pump-control configuration; developing ingress analysis',
      'Replaceable 5-year lithium battery (IM601)',
      'MX MariWavz™ radio network + Bluetooth',
    ],
    howItWorks: [
      'The installed local controller handles pump thresholds according to its configuration.',
      'Compatible sensors bring supported readings into the connected vessel view.',
      'High-water indication and local alarm behavior depend on the installed equipment.',
      'Remote notification channels and marina escalation must be confirmed for the deployment.',
      'Use available readings and service history to support inspection and maintenance.',
    ],
    specs: [
      { parameter: 'Sensor', specification: 'IM601 Solid-State Water Level Sensor' },
      { parameter: 'Pump', specification: 'InteliMaris Marine-Grade Self-Priming Diaphragm Pump' },
      { parameter: 'Sensing Method', specification: 'Solid-state (no moving parts)' },
      { parameter: 'Detection Points', specification: 'Multi-threshold (pump-on, high water)' },
      { parameter: 'Pump Activation', specification: 'Installed local controller; confirm configuration' },
      { parameter: 'Ingress Rate Calculation', specification: 'Developing analysis; not a validated measurement' },
      { parameter: 'Local Alarms', specification: 'Optional InteliMaris Siren & Strobe (wireless)' },
      { parameter: 'Remote Alerts', specification: 'Supported remote channels depend on deployment' },
      { parameter: 'Marina Integration', specification: 'Marina escalation in development' },
      { parameter: 'IM601 Battery', specification: 'Replaceable 5-year lithium' },
      { parameter: 'IM601 Battery Life', specification: '~5 years typical' },
      { parameter: 'Connectivity', specification: 'MX MariWavz™ radio network, Bluetooth' },
      { parameter: 'Pump Power', specification: '12V or 24V DC (specify at order)' },
      { parameter: 'Pump Flow Rate', specification: 'TBC (e.g., 500 GPH, 1000 GPH)' },
    ],
    whatsIncluded: [
      'IM601 sensor with pre-installed 5-year lithium battery, mounting hardware',
      'InteliMaris self-priming bilge pump with hose barbs, mounting bracket',
      'MX MariWavz™ radio network gateway (one per vessel)',
      'WaterWayz™ access: confirm deployment arrangements',
      'Confirm software access and service terms with the supplied system',
    ],
    applications:
      'Sailboats, motor yachts, expedition vessels, engine rooms, machinery spaces, unattended moorings.',
    ordering: 'Siren & strobe sold separately. See ordering codes below.',
    orderingRows: [
      { code: 'IB-BASIC', description: 'IM601 sensor + pump + gateway' },
      { code: 'IB-PRO', description: 'IM601 + pump + gateway + siren/strobe' },
      { code: 'IB-UPGRADE', description: 'Additional IM601 for auxiliary bilge' },
    ],
  },
]

export function isSystem(entry: CatalogEntry): entry is CatalogSystem {
  return entry.category === 'system'
}

export type ProductCategory = CatalogEntry['category']

export interface CategoryMeta {
  id: ProductCategory
  labelKey: string
  blurbKey: string
  image: string
}

export const CATEGORY_ORDER: ProductCategory[] = [
  'safety',
  'water',
  'environment',
  'electrical',
  'motion',
  'control',
  'system',
]

export const categoryMeta: Record<ProductCategory, CategoryMeta> = {
  safety: {
    id: 'safety',
    labelKey: 'products.category.safety',
    blurbKey: 'products.categoryBlurb.safety',
    image: 'assets/products/im301-temp-humidity-ip64.webp',
  },
  water: {
    id: 'water',
    labelKey: 'products.category.water',
    blurbKey: 'products.categoryBlurb.water',
    image: 'assets/products/im601-water-level.webp',
  },
  environment: {
    id: 'environment',
    labelKey: 'products.category.environment',
    blurbKey: 'products.categoryBlurb.environment',
    image: 'assets/products/im302-temp-humidity-round.webp',
  },
  electrical: {
    id: 'electrical',
    labelKey: 'products.category.electrical',
    blurbKey: 'products.categoryBlurb.electrical',
    image: 'assets/products/im401-ac-monitor.webp',
  },
  motion: {
    id: 'motion',
    labelKey: 'products.category.motion',
    blurbKey: 'products.categoryBlurb.motion',
    image: 'assets/products/im801-dc-monitor.webp',
  },
  control: {
    id: 'control',
    labelKey: 'products.category.control',
    blurbKey: 'products.categoryBlurb.control',
    image: 'assets/products/im901-remote-io.webp',
  },
  system: {
    id: 'system',
    labelKey: 'products.category.system',
    blurbKey: 'products.categoryBlurb.system',
    image: 'assets/products/im201-leak-pins.webp',
  },
}

export function getCategoryMeta(cat: ProductCategory): CategoryMeta {
  return categoryMeta[cat]
}

export function findProduct(id: string): CatalogEntry | undefined {
  const target = id.toLowerCase()
  return productCatalog.find((p) => p.id === target)
}

export function productsByCategory(cat: ProductCategory): CatalogEntry[] {
  return productCatalog.filter((p) => p.category === cat)
}
