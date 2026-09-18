import type { Language, Translations } from './translations'

/**
 * Copy for the v2 marketing pages.
 *
 * Honesty is a copy rule: nothing here describes a capability that is not
 * shipping, and anything partial carries its own availability badge.
 */
export const v2Translations: Record<Language, Translations> = {
  en: {
    'shot.zoomAria': 'Open full size',
    'shot.close': 'Close',
    'shot.panHint': 'Pinch or drag to read the full screen',
    'availability.live': 'Shipping now',
    'availability.building': 'In build',
    'availability.planned': 'Planned',
    'availability.concept': 'Design concept',
    'v2.disclaimer.charts':
      'WaterWayz is not a certified navigation system. Chart data supports situational awareness — always navigate with official charts.',

    'v2.hero.eyebrow': 'Navigation · Monitoring · Dockage · Marina ops',
    'v2.hero.title': 'Know the water ahead.',
    'v2.hero.lede':
      'WaterWayz plans passages your vessel can actually make. InteliMARIS watches her systems. Marinas run the basin. One platform, one sign-in.',
    'v2.hero.primary': 'Explore WaterWayz',
    'v2.hero.secondary': 'For marina operators',
    'v2.hero.shotCaption': 'Route, depth, wind, tide and a berth — on one screen.',
    'v2.hero.fact.marinas.label': 'Marinas charted',
    'v2.hero.fact.vessels.label': 'Vessel models',
    'v2.hero.fact.link.label': 'Sensor link',

    'v2.position.overline': 'The gap',
    'v2.position.title': 'Four jobs. One platform.',
    'v2.position.lede':
      'Chartplotters route. Marketplaces book. Sensor apps alarm. Marina software bills. Nobody does all four — so every handoff between them lands on you.',
    'v2.position.navigate.title': 'Navigate',
    'v2.position.navigate.body':
      'Routing that reads live conditions, hazards and regulatory zones — not a straight line over a chart.',
    'v2.position.monitor.title': 'Monitor',
    'v2.position.monitor.body':
      'Sensors over LoRaWAN, every reading stamped with its age, every prediction stamped with its model.',
    'v2.position.dock.title': 'Dock',
    'v2.position.dock.body':
      'Find and book a berth inside the same app that got you there — and only ever see berths you fit.',
    'v2.position.operate.title': 'Operate',
    'v2.position.operate.body':
      'The marina side of the same booking: berths, arrivals, residents and staff, run from the pontoon.',

    'v2.voyage.overline': 'One passage, end to end',
    'v2.voyage.title': 'Scroll the trip.',
    'v2.voyage.lede':
      'A real passage down the Intracoastal to Bahia Mar, replayed on the router’s own clock — the same data the app carries underway.',
    'v2.voyage.stage.plan.label': 'Plan',
    'v2.voyage.stage.plan.note':
      'The planner uses her real length, beam, draft and air draft. If it does not believe the line, it refuses and says why.',
    'v2.voyage.stage.underway.label': 'Underway',
    'v2.voyage.stage.underway.note':
      'Charted depth reads through the water. AIS traffic, hazards and no-wake zones update as you go.',
    'v2.voyage.stage.approach.label': 'Approach',
    'v2.voyage.stage.approach.note':
      'Bridge clearance against the tide at the moment you will actually arrive — not at the moment you asked.',
    'v2.voyage.stage.berth.label': 'Berthed',
    'v2.voyage.stage.berth.note':
      'The dockmaster assigns the berth and the approach brief comes with it: heading, mode, tie side, depth and datum.',
    'v2.voyage.prev': 'Previous stage',
    'v2.voyage.next': 'Next stage',
    'v2.voyage.progress': 'Passage progress',

    'v2.app.overline': 'WaterWayz',
    'v2.app.title': 'Passages your vessel can make.',
    'v2.app.lede':
      'Everything is a workspace — a vessel, a marina, a private dock — inside one account, on web, iOS and Android.',
    'v2.app.feature.vessel.title': 'Planned for her, not for a form',
    'v2.app.feature.vessel.body':
      'Length, beam, draft, air draft and sea limits come from the vessel workspace. Corridors, bridges, tides and weather gates are computed server-side.',
    'v2.app.feature.depth.title': 'Depth you can see through',
    'v2.app.feature.depth.body':
      'Charted depth renders through the water, with discrete “depth for my vessel” bands along the route.',
    'v2.app.feature.traffic.title': 'Live traffic and hazards',
    'v2.app.feature.traffic.body':
      'AIS filtered by class, speed or destination. Recent tracks fade with age. Hazards can be reported, confirmed and cleared.',
    'v2.app.feature.dockpass.title': 'DockPass',
    'v2.app.feature.dockpass.body':
      'Request and confirm marina and private-dock berths. A confirmed booking becomes a stay with a berth assigned.',
    'v2.app.feature.emergency.title': 'Emergency in two taps',
    'v2.app.feature.emergency.body':
      'Every vessel in range sees what, where and how far, and can mark themselves responding. It does not replace VHF 16 or DSC.',
    'v2.app.feature.cameras.title': 'Helm, Above, 3D',
    'v2.app.feature.cameras.body':
      'Three cameras over one map — standard, satellite, nautical and seamark layers, with an offline bundle you can carry.',
    'v2.app.cta': 'See WaterWayz',

    'v2.pms.overline': 'Marina PMS',
    'v2.pms.title': 'Run the basin from the pontoon.',
    'v2.pms.lede':
      'Claim your marina from a directory of 27,000, draw your own berth map over satellite, and work the day board from a phone on the dock.',
    'v2.pms.shot.layout': 'Draw dock lines, fields and berths straight over satellite imagery.',
    'v2.pms.shot.dashboard': 'The day board: who is on duty, who is waiting, and what the basin looks like right now.',
    'v2.pms.shot.dock': 'Private docks get the same tools — draw the water, list the berth.',
    'v2.pms.feature.free.title': 'Only free means free',
    'v2.pms.feature.free.body':
      'Every berth, every date, is exactly one of closed, resident, courtesy, assigned or free. Nothing else counts as available.',
    'v2.pms.feature.assign.title': 'Guests book the marina, not a berth',
    'v2.pms.feature.assign.body':
      'Quotes come off a rate card by LOA band and season. The dockmaster assigns the actual berth — often on the morning. A reassignment is a new row, never an edit.',
    'v2.pms.feature.brief.title': 'The approach brief travels with the berth',
    'v2.pms.feature.brief.body':
      'B-7 · enter 240° stern-in · starboard-to · 2.4 m MLLW. Arrive and depart in one tap; departure frees the berth in the same transaction.',
    'v2.pms.feature.residents.title': 'Residents, absences and consent',
    'v2.pms.feature.residents.body':
      'Tenancies carry dated absences with explicit resale consent and revenue share. Away is not permission. Agreements version by supersession.',
    'v2.pms.roadmap.title': 'What is shipping, and what is not',
    'v2.pms.roadmap.lede':
      'The console is built room by room. These are the rooms you can work in today — the rest are scaffolded and dated, not hidden.',
    'v2.pms.roadmap.dashboard': 'Today dashboard',
    'v2.pms.roadmap.bookings': 'Bookings — arrivals, short stay, residents',
    'v2.pms.roadmap.berths': 'Berth layout and occupancy',
    'v2.pms.roadmap.staff': 'Staff, duty roster and roles',
    'v2.pms.roadmap.settings': 'Settings — rates, layout, events, incidents',
    'v2.pms.roadmap.chat': 'Messages',
    'v2.pms.roadmap.finance': 'Finance — folios, invoices, reconciliation',
    'v2.pms.roadmap.crm': 'Customers and correspondence',
    'v2.pms.roadmap.reports': 'Reports and portfolio comparison',
    'v2.pms.roadmap.calendar': 'Occupancy calendar and reservation board',
    'v2.pms.cta': 'Claim your marina',

    'v2.sensors.overline': 'InteliMARIS sensors',
    'v2.sensors.title': 'Reliability you can see.',
    'v2.sensors.lede':
      'Sensors report over LoRaWAN, so nothing depends on Wi-Fi at the dock. Every tile carries the age of its reading, and every prediction carries the model that made it.',
    'v2.sensors.shotCaption': 'Systems aboard, with the age of every reading on the tile.',
    'v2.sensors.point.stale.title': 'A reading states its age',
    'v2.sensors.point.stale.body':
      'A stale number is worse than no number, so staleness is on the face of every tile rather than buried in a log.',
    'v2.sensors.point.lora.title': 'LoRaWAN, not boat Wi-Fi',
    'v2.sensors.point.lora.body':
      'Long range, low power, and no dependence on a hotspot that goes down when you leave the slip.',
    'v2.sensors.point.clocks.title': 'Maintenance on two clocks',
    'v2.sensors.point.clocks.body':
      'Engine hours and calendar dates, tracked together — because whichever comes first is the one that matters.',
    'v2.sensors.cta': 'See the hardware',

    'v2.trust.title': 'Built for boaters. Backed by InteliMarine.',
    'v2.trust.lede':
      'One API behind both products, Rust services, and identity shared across web, mobile and the operator console.',
    'v2.trust.stat.workspaces.value': '5',
    'v2.trust.stat.workspaces.label': 'Workspace types',
    'v2.trust.stat.locales.value': '4',
    'v2.trust.stat.locales.label': 'Languages',
    'v2.trust.stat.roles.value': '8',
    'v2.trust.stat.roles.label': 'Marina roles',
    'v2.trust.stat.marinas.value': '27,000+',
    'v2.trust.stat.marinas.label': 'Marinas in the directory',

    'v2.closing.title': 'Bring your water online.',
    'v2.closing.lede':
      'Plan a passage, watch your systems, or open your basin to bookings — tell us which and we will start there.',
    'v2.closing.primary': 'Talk to us',
    'v2.closing.secondary': 'Browse the hardware',
    'v2.waterwayz.cta': 'Talk to us about access',
    'v2.waterwayz.journeyOverline': 'From sign-up to slip',
    'v2.waterwayz.journeyTitle': 'Four steps to a berth.',
    'v2.waterwayz.journeyLede':
      'No configuration screens. You describe the boat once, and everything after that is planned for her.',
    'v2.waterwayz.journey.account.title': 'One account',
    'v2.waterwayz.journey.account.body':
      'Sign in once and carry it across web, iOS, Android and the operator console.',
    'v2.waterwayz.journey.vessel.title': 'Claim the vessel',
    'v2.waterwayz.journey.vessel.body':
      'Find her by name or MMSI, or pick from 140+ builders and 340+ models — the specs prefill.',
    'v2.waterwayz.journey.plan.title': 'Plan the passage',
    'v2.waterwayz.journey.plan.body':
      'Corridors, bridges, tides and weather gates are computed for her real dimensions, server-side.',
    'v2.waterwayz.journey.berth.title': 'Book the berth',
    'v2.waterwayz.journey.berth.body':
      'DockPass turns a confirmed request into a stay, with the approach brief attached.',
    'v2.waterwayz.workspaceOverline': 'Workspaces',
    'v2.waterwayz.workspaceTitle': 'One account, five kinds of water.',
    'v2.waterwayz.workspaceLede':
      'A workspace is whatever you are responsible for. Each carries its own accent, its own roles and its own rooms.',
    'v2.waterwayz.workspace.vessel': 'Vessel',
    'v2.waterwayz.workspace.marina': 'Marina',
    'v2.waterwayz.workspace.private': 'Private dock',
    'v2.waterwayz.workspace.business': 'Business',
    'v2.waterwayz.workspace.maintenance': 'Maintenance yard',
    'v2.waterwayz.roadmapOverline': 'Not yet built',
    'v2.waterwayz.roadmapTitle': 'What we have not shipped',
    'v2.waterwayz.roadmapLede':
      'These are on the roadmap and not in the app today. Better you hear it here than find out underway.',
    'v2.waterwayz.roadmap.hud': 'Underway HUD',
    'v2.waterwayz.roadmap.alarms': 'Alarm centre',
    'v2.waterwayz.roadmap.night': 'Night mode',
    'v2.waterwayz.roadmap.floatplan': 'Float plan',
    'v2.waterwayz.roadmap.gpx': 'GPX import and export',
    'v2.waterwayz.roadmap.billing': 'In-app payments',
    'v2.marinas.demoCta': 'See a sample marina',
    'v2.marinas.howOverline': 'Getting started',
    'v2.marinas.howTitle': 'Live in an afternoon.',
    'v2.marinas.step.claim.title': 'Claim the marina',
    'v2.marinas.step.claim.body':
      'Search the directory, tap the map, or drop a pin if it is not there yet. Approval is one transaction.',
    'v2.marinas.step.draw.title': 'Draw the water',
    'v2.marinas.step.draw.body':
      'Dock lines, mooring fields, racks and yards over satellite, then berths with limits, hardware and access.',
    'v2.marinas.step.rates.title': 'Set the rate card',
    'v2.marinas.step.rates.body':
      'LOA band by season, per-metre or flat, minimum nights, and instant-book where you want it.',
    'v2.marinas.step.run.title': 'Work the day board',
    'v2.marinas.step.run.body':
      'Arrivals, assignments and departures in one tap each, from a phone on the pontoon.',
    'v2.marinas.shot.operations': 'Roles are capability-gated: what you cannot do, you do not see.',
    'v2.marinas.shot.host': 'Private dock hosts get listings, requests and duty on one board.',
    'v2.marinas.hostOverline': 'Private docks',
    'v2.marinas.hostTitle': 'Two berths is a product too.',
    'v2.marinas.hostLede':
      'Hosts get the same five doors, with per-berth DockPass listings — because for a two-berth dock the listing is the product.',
    'v2.marinas.hostCta': 'List a private dock',
  },

  es: {
    'shot.zoomAria': 'Abrir a tamaño completo',
    'shot.close': 'Cerrar',
    'shot.panHint': 'Pellizca o arrastra para leer la pantalla completa',
    'availability.live': 'Disponible ya',
    'availability.building': 'En desarrollo',
    'availability.planned': 'Previsto',
    'availability.concept': 'Concepto de diseño',
    'v2.disclaimer.charts':
      'WaterWayz no es un sistema de navegación certificado. Los datos cartográficos sirven para la conciencia situacional: navega siempre con cartas oficiales.',

    'v2.hero.eyebrow': 'Navegación · Monitorización · Amarre · Operación de marinas',
    'v2.hero.title': 'Conoce el agua que tienes delante.',
    'v2.hero.lede':
      'WaterWayz planifica travesías que tu barco puede hacer de verdad. InteliMARIS vigila sus sistemas. Las marinas gestionan la dársena. Una plataforma, un único acceso.',
    'v2.hero.primary': 'Descubre WaterWayz',
    'v2.hero.secondary': 'Para marinas',
    'v2.hero.shotCaption': 'Ruta, sonda, viento, marea y amarre — en una sola pantalla.',
    'v2.hero.fact.marinas.label': 'Marinas cartografiadas',
    'v2.hero.fact.vessels.label': 'Modelos de barco',
    'v2.hero.fact.link.label': 'Enlace de sensores',

    'v2.position.overline': 'El hueco',
    'v2.position.title': 'Cuatro tareas. Una plataforma.',
    'v2.position.lede':
      'Los plotters trazan rutas. Los marketplaces reservan. Las apps de sensores alarman. El software de marinas factura. Nadie hace las cuatro cosas, así que cada traspaso entre ellas recae en ti.',
    'v2.position.navigate.title': 'Navegar',
    'v2.position.navigate.body':
      'Rutas que leen las condiciones en vivo, los peligros y las zonas reguladas — no una línea recta sobre una carta.',
    'v2.position.monitor.title': 'Monitorizar',
    'v2.position.monitor.body':
      'Sensores por LoRaWAN, cada lectura sellada con su antigüedad y cada predicción con el modelo que la generó.',
    'v2.position.dock.title': 'Atracar',
    'v2.position.dock.body':
      'Busca y reserva amarre en la misma app que te llevó hasta allí, y ve solo los amarres en los que cabes.',
    'v2.position.operate.title': 'Operar',
    'v2.position.operate.body':
      'El lado marina de esa misma reserva: amarres, llegadas, residentes y personal, gestionado desde el pantalán.',

    'v2.voyage.overline': 'Una travesía, de principio a fin',
    'v2.voyage.title': 'Desplázate por el viaje.',
    'v2.voyage.lede':
      'Una travesía real por el Intracoastal hasta Bahía Mar, reproducida con el reloj del propio enrutador: los mismos datos que la app lleva en navegación.',
    'v2.voyage.stage.plan.label': 'Planificar',
    'v2.voyage.stage.plan.note':
      'El planificador usa su eslora, manga, calado y altura reales. Si no se cree la línea, la rechaza y explica por qué.',
    'v2.voyage.stage.underway.label': 'En navegación',
    'v2.voyage.stage.underway.note':
      'La sonda cartografiada se ve a través del agua. El tráfico AIS, los peligros y las zonas sin estela se actualizan sobre la marcha.',
    'v2.voyage.stage.approach.label': 'Aproximación',
    'v2.voyage.stage.approach.note':
      'Gálibo del puente contra la marea en el momento en que vas a llegar de verdad, no en el momento en que preguntaste.',
    'v2.voyage.stage.berth.label': 'Atracado',
    'v2.voyage.stage.berth.note':
      'El capitán de puerto asigna el amarre y con él llega la ficha de aproximación: rumbo, modo, banda de amarre, sonda y datum.',
    'v2.voyage.prev': 'Etapa anterior',
    'v2.voyage.next': 'Etapa siguiente',
    'v2.voyage.progress': 'Progreso de la travesía',

    'v2.app.overline': 'WaterWayz',
    'v2.app.title': 'Travesías que tu barco puede hacer.',
    'v2.app.lede':
      'Todo es un espacio de trabajo — un barco, una marina, un pantalán privado — dentro de una sola cuenta, en web, iOS y Android.',
    'v2.app.feature.vessel.title': 'Planificado para ella, no para un formulario',
    'v2.app.feature.vessel.body':
      'Eslora, manga, calado, altura y límites de mar salen del espacio del barco. Corredores, puentes, mareas y ventanas meteorológicas se calculan en servidor.',
    'v2.app.feature.depth.title': 'Sonda que se ve a través del agua',
    'v2.app.feature.depth.body':
      'La sonda cartografiada se dibuja bajo el agua, con franjas de «sonda para mi barco» a lo largo de la ruta.',
    'v2.app.feature.traffic.title': 'Tráfico y peligros en vivo',
    'v2.app.feature.traffic.body':
      'AIS filtrado por clase, velocidad o destino. Las estelas recientes se desvanecen con el tiempo. Los peligros se reportan, confirman y retiran.',
    'v2.app.feature.dockpass.title': 'DockPass',
    'v2.app.feature.dockpass.body':
      'Solicita y confirma amarres en marinas y pantalanes privados. Una reserva confirmada se convierte en estancia con amarre asignado.',
    'v2.app.feature.emergency.title': 'Emergencia en dos toques',
    'v2.app.feature.emergency.body':
      'Cada barco en el radio ve qué, dónde y a qué distancia, y puede marcarse como respondiendo. No sustituye al VHF 16 ni al DSC.',
    'v2.app.feature.cameras.title': 'Timón, Cenital, 3D',
    'v2.app.feature.cameras.body':
      'Tres cámaras sobre un mismo mapa — capas estándar, satélite, náutica y de balizamiento, con un paquete offline que puedes llevarte.',
    'v2.app.cta': 'Ver WaterWayz',

    'v2.pms.overline': 'Marina PMS',
    'v2.pms.title': 'Gestiona la dársena desde el pantalán.',
    'v2.pms.lede':
      'Reclama tu marina de un directorio de 27.000, dibuja tu propio mapa de amarres sobre satélite y trabaja el parte del día desde el móvil en el muelle.',
    'v2.pms.shot.layout': 'Dibuja pantalanes, campos de boyas y amarres directamente sobre la imagen de satélite.',
    'v2.pms.shot.dashboard': 'El parte del día: quién está de turno, quién espera y cómo está la dársena ahora mismo.',
    'v2.pms.shot.dock': 'Los pantalanes privados usan las mismas herramientas: dibuja el agua, publica el amarre.',
    'v2.pms.feature.free.title': 'Libre solo significa libre',
    'v2.pms.feature.free.body':
      'Cada amarre, cada fecha, es exactamente uno de: cerrado, residente, cortesía, asignado o libre. Nada más cuenta como disponible.',
    'v2.pms.feature.assign.title': 'El cliente reserva la marina, no el amarre',
    'v2.pms.feature.assign.body':
      'Los presupuestos salen de un tarifario por franja de eslora y temporada. El capitán de puerto asigna el amarre real, a menudo esa misma mañana. Reasignar crea una fila nueva, nunca edita.',
    'v2.pms.feature.brief.title': 'La ficha de aproximación viaja con el amarre',
    'v2.pms.feature.brief.body':
      'B-7 · entrada 240° de popa · amarre a estribor · 2,4 m MLLW. Llegada y salida en un toque; la salida libera el amarre en la misma transacción.',
    'v2.pms.feature.residents.title': 'Residentes, ausencias y consentimiento',
    'v2.pms.feature.residents.body':
      'Los contratos registran ausencias con fechas, consentimiento explícito de realquiler y reparto de ingresos. Ausente no es permiso. Los acuerdos se versionan por sustitución.',
    'v2.pms.roadmap.title': 'Qué está disponible y qué no',
    'v2.pms.roadmap.lede':
      'La consola se construye sala por sala. Estas son las salas en las que ya puedes trabajar; el resto está andamiado y fechado, no escondido.',
    'v2.pms.roadmap.dashboard': 'Panel de hoy',
    'v2.pms.roadmap.bookings': 'Reservas — llegadas, estancia corta, residentes',
    'v2.pms.roadmap.berths': 'Plano de amarres y ocupación',
    'v2.pms.roadmap.staff': 'Personal, turnos y roles',
    'v2.pms.roadmap.settings': 'Ajustes — tarifas, plano, eventos, incidencias',
    'v2.pms.roadmap.chat': 'Mensajes',
    'v2.pms.roadmap.finance': 'Finanzas — cuentas, facturas, conciliación',
    'v2.pms.roadmap.crm': 'Clientes y correspondencia',
    'v2.pms.roadmap.reports': 'Informes y comparativa de cartera',
    'v2.pms.roadmap.calendar': 'Calendario de ocupación y tablero de reservas',
    'v2.pms.cta': 'Reclama tu marina',

    'v2.sensors.overline': 'Sensores InteliMARIS',
    'v2.sensors.title': 'Fiabilidad que se ve.',
    'v2.sensors.lede':
      'Los sensores reportan por LoRaWAN, así que nada depende del Wi-Fi del muelle. Cada tarjeta muestra la antigüedad de su lectura y cada predicción, el modelo que la hizo.',
    'v2.sensors.shotCaption': 'Sistemas a bordo, con la antigüedad de cada lectura en la tarjeta.',
    'v2.sensors.point.stale.title': 'Una lectura dice su edad',
    'v2.sensors.point.stale.body':
      'Un dato caducado es peor que ningún dato, así que la antigüedad va en la cara de cada tarjeta y no enterrada en un registro.',
    'v2.sensors.point.lora.title': 'LoRaWAN, no el Wi-Fi del barco',
    'v2.sensors.point.lora.body':
      'Largo alcance, bajo consumo y sin depender de un punto de acceso que cae en cuanto sales del amarre.',
    'v2.sensors.point.clocks.title': 'Mantenimiento con dos relojes',
    'v2.sensors.point.clocks.body':
      'Horas de motor y fechas de calendario, juntas — porque lo que importa es lo que llegue primero.',
    'v2.sensors.cta': 'Ver el hardware',

    'v2.trust.title': 'Hecho para navegantes. Respaldado por InteliMarine.',
    'v2.trust.lede':
      'Una sola API detrás de ambos productos, servicios en Rust e identidad compartida entre web, móvil y la consola del operador.',
    'v2.trust.stat.workspaces.value': '5',
    'v2.trust.stat.workspaces.label': 'Tipos de espacio',
    'v2.trust.stat.locales.value': '4',
    'v2.trust.stat.locales.label': 'Idiomas',
    'v2.trust.stat.roles.value': '8',
    'v2.trust.stat.roles.label': 'Roles de marina',
    'v2.trust.stat.marinas.value': '27.000+',
    'v2.trust.stat.marinas.label': 'Marinas en el directorio',

    'v2.closing.title': 'Pon tu agua en línea.',
    'v2.closing.lede':
      'Planifica una travesía, vigila tus sistemas o abre tu dársena a reservas — dinos por dónde y empezamos ahí.',
    'v2.closing.primary': 'Hablemos',
    'v2.closing.secondary': 'Ver el hardware',
    'v2.waterwayz.cta': 'Habla con nosotros',
    'v2.waterwayz.journeyOverline': 'Del registro al amarre',
    'v2.waterwayz.journeyTitle': 'Cuatro pasos hasta el amarre.',
    'v2.waterwayz.journeyLede':
      'Sin pantallas de configuración. Describes el barco una vez y todo lo demás se planifica para ella.',
    'v2.waterwayz.journey.account.title': 'Una cuenta',
    'v2.waterwayz.journey.account.body':
      'Inicia sesión una vez y llévala a web, iOS, Android y la consola del operador.',
    'v2.waterwayz.journey.vessel.title': 'Reclama el barco',
    'v2.waterwayz.journey.vessel.body':
      'Búscalo por nombre o MMSI, o elige entre 140+ astilleros y 340+ modelos: las especificaciones se rellenan solas.',
    'v2.waterwayz.journey.plan.title': 'Planifica la travesía',
    'v2.waterwayz.journey.plan.body':
      'Corredores, puentes, mareas y ventanas meteorológicas se calculan en servidor con sus dimensiones reales.',
    'v2.waterwayz.journey.berth.title': 'Reserva el amarre',
    'v2.waterwayz.journey.berth.body':
      'DockPass convierte una solicitud confirmada en estancia, con la ficha de aproximación incluida.',
    'v2.waterwayz.workspaceOverline': 'Espacios de trabajo',
    'v2.waterwayz.workspaceTitle': 'Una cuenta, cinco tipos de agua.',
    'v2.waterwayz.workspaceLede':
      'Un espacio es aquello de lo que eres responsable. Cada uno tiene su color, sus roles y sus salas.',
    'v2.waterwayz.workspace.vessel': 'Barco',
    'v2.waterwayz.workspace.marina': 'Marina',
    'v2.waterwayz.workspace.private': 'Pantalán privado',
    'v2.waterwayz.workspace.business': 'Negocio',
    'v2.waterwayz.workspace.maintenance': 'Taller',
    'v2.waterwayz.roadmapOverline': 'Aún no construido',
    'v2.waterwayz.roadmapTitle': 'Lo que todavía no hemos lanzado',
    'v2.waterwayz.roadmapLede':
      'Están en la hoja de ruta y hoy no están en la app. Mejor saberlo aquí que en plena navegación.',
    'v2.waterwayz.roadmap.hud': 'HUD de navegación',
    'v2.waterwayz.roadmap.alarms': 'Centro de alarmas',
    'v2.waterwayz.roadmap.night': 'Modo nocturno',
    'v2.waterwayz.roadmap.floatplan': 'Plan de navegación',
    'v2.waterwayz.roadmap.gpx': 'Importar y exportar GPX',
    'v2.waterwayz.roadmap.billing': 'Pagos en la app',
    'v2.marinas.demoCta': 'Ver una marina de ejemplo',
    'v2.marinas.howOverline': 'Primeros pasos',
    'v2.marinas.howTitle': 'En marcha en una tarde.',
    'v2.marinas.step.claim.title': 'Reclama la marina',
    'v2.marinas.step.claim.body':
      'Busca en el directorio, toca el mapa o suelta un pin si aún no existe. La aprobación es una sola transacción.',
    'v2.marinas.step.draw.title': 'Dibuja el agua',
    'v2.marinas.step.draw.body':
      'Pantalanes, campos de boyas, racks y varaderos sobre satélite; después amarres con límites, herrajes y acceso.',
    'v2.marinas.step.rates.title': 'Define el tarifario',
    'v2.marinas.step.rates.body':
      'Franja de eslora por temporada, por metro o tarifa plana, noches mínimas y reserva inmediata donde quieras.',
    'v2.marinas.step.run.title': 'Trabaja el parte del día',
    'v2.marinas.step.run.body':
      'Llegadas, asignaciones y salidas con un toque cada una, desde el móvil en el pantalán.',
    'v2.marinas.shot.operations': 'Los roles limitan capacidades: lo que no puedes hacer, no lo ves.',
    'v2.marinas.shot.host': 'Los pantalanes privados tienen anuncios, solicitudes y turnos en un solo tablero.',
    'v2.marinas.hostOverline': 'Pantalanes privados',
    'v2.marinas.hostTitle': 'Dos amarres también son un producto.',
    'v2.marinas.hostLede':
      'Los anfitriones tienen las mismas cinco puertas, con anuncios DockPass por amarre: en un pantalán de dos plazas, el anuncio es el producto.',
    'v2.marinas.hostCta': 'Publicar un pantalán privado',
  },

  el: {
    'shot.zoomAria': 'Άνοιγμα σε πλήρες μέγεθος',
    'shot.close': 'Κλείσιμο',
    'shot.panHint': 'Κάνε pinch ή σύρε για να διαβάσεις όλη την οθόνη',
    'availability.live': 'Διαθέσιμο τώρα',
    'availability.building': 'Υπό ανάπτυξη',
    'availability.planned': 'Σχεδιασμένο',
    'availability.concept': 'Σχεδιαστική ιδέα',
    'v2.disclaimer.charts':
      'Το WaterWayz δεν είναι πιστοποιημένο σύστημα ναυσιπλοΐας. Τα χαρτογραφικά δεδομένα υποστηρίζουν την εποπτεία — πλοηγείσαι πάντα με επίσημους χάρτες.',

    'v2.hero.eyebrow': 'Ναυσιπλοΐα · Παρακολούθηση · Ελλιμενισμός · Λειτουργία μαρίνας',
    'v2.hero.title': 'Γνώρισε το νερό μπροστά σου.',
    'v2.hero.lede':
      'Το WaterWayz σχεδιάζει πλόες που το σκάφος σου μπορεί όντως να κάνει. Το InteliMARIS παρακολουθεί τα συστήματά του. Οι μαρίνες διαχειρίζονται τον λιμενίσκο. Μία πλατφόρμα, μία σύνδεση.',
    'v2.hero.primary': 'Δες το WaterWayz',
    'v2.hero.secondary': 'Για μαρίνες',
    'v2.hero.shotCaption': 'Πορεία, βάθος, άνεμος, παλίρροια και θέση — σε μία οθόνη.',
    'v2.hero.fact.marinas.label': 'Χαρτογραφημένες μαρίνες',
    'v2.hero.fact.vessels.label': 'Μοντέλα σκαφών',
    'v2.hero.fact.link.label': 'Ζεύξη αισθητήρων',

    'v2.position.overline': 'Το κενό',
    'v2.position.title': 'Τέσσερις δουλειές. Μία πλατφόρμα.',
    'v2.position.lede':
      'Οι χαρτογράφοι χαράζουν πορεία. Οι πλατφόρμες κλείνουν θέσεις. Οι εφαρμογές αισθητήρων χτυπούν συναγερμό. Τα προγράμματα μαρίνας τιμολογούν. Κανείς δεν κάνει και τα τέσσερα — κι έτσι κάθε μετάβαση πέφτει σε σένα.',
    'v2.position.navigate.title': 'Πλοήγηση',
    'v2.position.navigate.body':
      'Δρομολόγηση που διαβάζει ζωντανές συνθήκες, κινδύνους και ζώνες περιορισμού — όχι μια ευθεία πάνω στον χάρτη.',
    'v2.position.monitor.title': 'Παρακολούθηση',
    'v2.position.monitor.body':
      'Αισθητήρες μέσω LoRaWAN, κάθε ένδειξη με σφραγίδα ηλικίας και κάθε πρόβλεψη με το μοντέλο που την έβγαλε.',
    'v2.position.dock.title': 'Ελλιμενισμός',
    'v2.position.dock.body':
      'Βρες και κράτησε θέση μέσα στην ίδια εφαρμογή που σε πήγε εκεί — και βλέπεις μόνο θέσεις όπου χωράς.',
    'v2.position.operate.title': 'Λειτουργία',
    'v2.position.operate.body':
      'Η πλευρά της μαρίνας για την ίδια κράτηση: θέσεις, αφίξεις, μόνιμοι και προσωπικό, από την προβλήτα.',

    'v2.voyage.overline': 'Ένας πλους, από άκρη σε άκρη',
    'v2.voyage.title': 'Κύλησε το ταξίδι.',
    'v2.voyage.lede':
      'Ένας πραγματικός πλους στο Intracoastal ως τη Bahia Mar, σε επανάληψη με το ρολόι του ίδιου του δρομολογητή — τα ίδια δεδομένα που κουβαλά η εφαρμογή εν πλω.',
    'v2.voyage.stage.plan.label': 'Σχεδιασμός',
    'v2.voyage.stage.plan.note':
      'Ο σχεδιαστής χρησιμοποιεί το πραγματικό μήκος, πλάτος, βύθισμα και ύψος. Αν δεν πιστεύει τη γραμμή, αρνείται και λέει γιατί.',
    'v2.voyage.stage.underway.label': 'Εν πλω',
    'v2.voyage.stage.underway.note':
      'Το χαρτογραφημένο βάθος φαίνεται μέσα από το νερό. Κίνηση AIS, κίνδυνοι και ζώνες χωρίς κυματισμό ενημερώνονται καθώς προχωράς.',
    'v2.voyage.stage.approach.label': 'Προσέγγιση',
    'v2.voyage.stage.approach.note':
      'Ελεύθερο ύψος γέφυρας σε σχέση με την παλίρροια τη στιγμή που όντως θα φτάσεις — όχι τη στιγμή που ρώτησες.',
    'v2.voyage.stage.berth.label': 'Δεμένοι',
    'v2.voyage.stage.berth.note':
      'Ο λιμενάρχης αναθέτει τη θέση και μαζί έρχεται το δελτίο προσέγγισης: πορεία, τρόπος, πλευρά πρόσδεσης, βάθος και datum.',
    'v2.voyage.prev': 'Προηγούμενο στάδιο',
    'v2.voyage.next': 'Επόμενο στάδιο',
    'v2.voyage.progress': 'Πρόοδος πλου',

    'v2.app.overline': 'WaterWayz',
    'v2.app.title': 'Πλόες που το σκάφος σου μπορεί να κάνει.',
    'v2.app.lede':
      'Τα πάντα είναι χώρος εργασίας — ένα σκάφος, μια μαρίνα, μια ιδιωτική προβλήτα — μέσα σε έναν λογαριασμό, σε web, iOS και Android.',
    'v2.app.feature.vessel.title': 'Σχεδιασμένο για εκείνη, όχι για μια φόρμα',
    'v2.app.feature.vessel.body':
      'Μήκος, πλάτος, βύθισμα, ύψος και όρια θάλασσας έρχονται από τον χώρο του σκάφους. Δίαυλοι, γέφυρες, παλίρροιες και καιρικά παράθυρα υπολογίζονται στον διακομιστή.',
    'v2.app.feature.depth.title': 'Βάθος που το βλέπεις μέσα από το νερό',
    'v2.app.feature.depth.body':
      'Το χαρτογραφημένο βάθος αποδίδεται κάτω από το νερό, με διακριτές ζώνες «βάθος για το σκάφος μου» κατά μήκος της πορείας.',
    'v2.app.feature.traffic.title': 'Ζωντανή κίνηση και κίνδυνοι',
    'v2.app.feature.traffic.body':
      'AIS με φίλτρα κατηγορίας, ταχύτητας ή προορισμού. Τα πρόσφατα ίχνη ξεθωριάζουν με τον χρόνο. Οι κίνδυνοι δηλώνονται, επιβεβαιώνονται και αίρονται.',
    'v2.app.feature.dockpass.title': 'DockPass',
    'v2.app.feature.dockpass.body':
      'Ζήτα και επιβεβαίωσε θέσεις σε μαρίνες και ιδιωτικές προβλήτες. Μια επιβεβαιωμένη κράτηση γίνεται παραμονή με ανατεθειμένη θέση.',
    'v2.app.feature.emergency.title': 'Έκτακτη ανάγκη σε δύο πατήματα',
    'v2.app.feature.emergency.body':
      'Κάθε σκάφος εντός εμβέλειας βλέπει τι, πού και πόσο μακριά, και μπορεί να δηλώσει ότι ανταποκρίνεται. Δεν αντικαθιστά VHF 16 ή DSC.',
    'v2.app.feature.cameras.title': 'Πηδάλιο, Από ψηλά, 3D',
    'v2.app.feature.cameras.body':
      'Τρεις κάμερες πάνω σε έναν χάρτη — στρώσεις στάνταρ, δορυφορική, ναυτική και σημαντήρων, με πακέτο εκτός σύνδεσης που το παίρνεις μαζί σου.',
    'v2.app.cta': 'Δες το WaterWayz',

    'v2.pms.overline': 'Marina PMS',
    'v2.pms.title': 'Διαχειρίσου τον λιμενίσκο από την προβλήτα.',
    'v2.pms.lede':
      'Διεκδίκησε τη μαρίνα σου από κατάλογο 27.000, σχεδίασε τον δικό σου χάρτη θέσεων πάνω σε δορυφορική εικόνα και δούλεψε το ημερήσιο δελτίο από το κινητό στην προβλήτα.',
    'v2.pms.shot.layout': 'Σχεδίασε προβλήτες, πεδία αγκυροβολίου και θέσεις απευθείας πάνω στη δορυφορική εικόνα.',
    'v2.pms.shot.dashboard': 'Το ημερήσιο δελτίο: ποιος είναι σε βάρδια, ποιος περιμένει και πώς είναι ο λιμενίσκος τώρα.',
    'v2.pms.shot.dock': 'Οι ιδιωτικές προβλήτες έχουν τα ίδια εργαλεία — σχεδίασε το νερό, καταχώρισε τη θέση.',
    'v2.pms.feature.free.title': 'Ελεύθερο σημαίνει μόνο ελεύθερο',
    'v2.pms.feature.free.body':
      'Κάθε θέση, κάθε ημερομηνία, είναι ακριβώς ένα από: κλειστή, μόνιμου, φιλοξενίας, ανατεθειμένη ή ελεύθερη. Τίποτε άλλο δεν μετράει ως διαθέσιμο.',
    'v2.pms.feature.assign.title': 'Ο επισκέπτης κλείνει τη μαρίνα, όχι τη θέση',
    'v2.pms.feature.assign.body':
      'Οι προσφορές βγαίνουν από τιμοκατάλογο ανά ζώνη μήκους και εποχή. Ο λιμενάρχης αναθέτει την πραγματική θέση, συχνά το ίδιο πρωί. Η επανάθεση είναι νέα εγγραφή, ποτέ διόρθωση.',
    'v2.pms.feature.brief.title': 'Το δελτίο προσέγγισης ταξιδεύει με τη θέση',
    'v2.pms.feature.brief.body':
      'B-7 · είσοδος 240° με την πρύμνη · πρόσδεση δεξιά · 2,4 m MLLW. Άφιξη και αναχώρηση με ένα πάτημα· η αναχώρηση ελευθερώνει τη θέση στην ίδια συναλλαγή.',
    'v2.pms.feature.residents.title': 'Μόνιμοι, απουσίες και συναίνεση',
    'v2.pms.feature.residents.body':
      'Οι μισθώσεις κρατούν απουσίες με ημερομηνίες, ρητή συναίνεση επαναδιάθεσης και μερίδιο εσόδων. Η απουσία δεν είναι άδεια. Οι συμφωνίες εκδίδονται σε νέες εκδόσεις.',
    'v2.pms.roadmap.title': 'Τι είναι διαθέσιμο και τι όχι',
    'v2.pms.roadmap.lede':
      'Η κονσόλα χτίζεται δωμάτιο-δωμάτιο. Αυτά είναι τα δωμάτια όπου δουλεύεις σήμερα — τα υπόλοιπα είναι σκαλωσιά με ημερομηνία, όχι κρυμμένα.',
    'v2.pms.roadmap.dashboard': 'Πίνακας ημέρας',
    'v2.pms.roadmap.bookings': 'Κρατήσεις — αφίξεις, σύντομη παραμονή, μόνιμοι',
    'v2.pms.roadmap.berths': 'Διάταξη θέσεων και πληρότητα',
    'v2.pms.roadmap.staff': 'Προσωπικό, βάρδιες και ρόλοι',
    'v2.pms.roadmap.settings': 'Ρυθμίσεις — τιμές, διάταξη, συμβάντα, περιστατικά',
    'v2.pms.roadmap.chat': 'Μηνύματα',
    'v2.pms.roadmap.finance': 'Οικονομικά — λογαριασμοί, τιμολόγια, συμφωνίες',
    'v2.pms.roadmap.crm': 'Πελάτες και αλληλογραφία',
    'v2.pms.roadmap.reports': 'Αναφορές και σύγκριση χαρτοφυλακίου',
    'v2.pms.roadmap.calendar': 'Ημερολόγιο πληρότητας και πίνακας κρατήσεων',
    'v2.pms.cta': 'Διεκδίκησε τη μαρίνα σου',

    'v2.sensors.overline': 'Αισθητήρες InteliMARIS',
    'v2.sensors.title': 'Αξιοπιστία που φαίνεται.',
    'v2.sensors.lede':
      'Οι αισθητήρες στέλνουν μέσω LoRaWAN, οπότε τίποτα δεν εξαρτάται από το Wi-Fi της προβλήτας. Κάθε πλακίδιο δείχνει την ηλικία της ένδειξης και κάθε πρόβλεψη το μοντέλο που την έβγαλε.',
    'v2.sensors.shotCaption': 'Συστήματα εν πλω, με την ηλικία κάθε ένδειξης πάνω στο πλακίδιο.',
    'v2.sensors.point.stale.title': 'Η ένδειξη δηλώνει την ηλικία της',
    'v2.sensors.point.stale.body':
      'Ένας παλιός αριθμός είναι χειρότερος από κανέναν, γι’ αυτό η παλαιότητα είναι στην όψη κάθε πλακιδίου και όχι θαμμένη σε αρχείο καταγραφής.',
    'v2.sensors.point.lora.title': 'LoRaWAN, όχι Wi-Fi σκάφους',
    'v2.sensors.point.lora.body':
      'Μεγάλη εμβέλεια, χαμηλή κατανάλωση και καμία εξάρτηση από hotspot που πέφτει μόλις φύγεις από τη θέση.',
    'v2.sensors.point.clocks.title': 'Συντήρηση με δύο ρολόγια',
    'v2.sensors.point.clocks.body':
      'Ώρες μηχανής και ημερομηνίες μαζί — γιατί σημασία έχει όποιο έρθει πρώτο.',
    'v2.sensors.cta': 'Δες τον εξοπλισμό',

    'v2.trust.title': 'Φτιαγμένο για ναυτικούς. Με την υποστήριξη της InteliMarine.',
    'v2.trust.lede':
      'Ένα API πίσω από δύο προϊόντα, υπηρεσίες σε Rust και κοινή ταυτότητα σε web, κινητό και κονσόλα διαχειριστή.',
    'v2.trust.stat.workspaces.value': '5',
    'v2.trust.stat.workspaces.label': 'Τύποι χώρων εργασίας',
    'v2.trust.stat.locales.value': '4',
    'v2.trust.stat.locales.label': 'Γλώσσες',
    'v2.trust.stat.roles.value': '8',
    'v2.trust.stat.roles.label': 'Ρόλοι μαρίνας',
    'v2.trust.stat.marinas.value': '27.000+',
    'v2.trust.stat.marinas.label': 'Μαρίνες στον κατάλογο',

    'v2.closing.title': 'Βάλε το νερό σου online.',
    'v2.closing.lede':
      'Σχεδίασε έναν πλου, πρόσεχε τα συστήματά σου ή άνοιξε τον λιμενίσκο σου σε κρατήσεις — πες μας από πού και ξεκινάμε εκεί.',
    'v2.closing.primary': 'Μίλησε μαζί μας',
    'v2.closing.secondary': 'Δες τον εξοπλισμό',
    'v2.waterwayz.cta': 'Μίλησε μαζί μας',
    'v2.waterwayz.journeyOverline': 'Από την εγγραφή στη θέση',
    'v2.waterwayz.journeyTitle': 'Τέσσερα βήματα ως τη θέση.',
    'v2.waterwayz.journeyLede':
      'Καμία οθόνη ρυθμίσεων. Περιγράφεις το σκάφος μία φορά και όλα μετά σχεδιάζονται γι’ αυτό.',
    'v2.waterwayz.journey.account.title': 'Ένας λογαριασμός',
    'v2.waterwayz.journey.account.body':
      'Συνδέεσαι μία φορά και τον κουβαλάς σε web, iOS, Android και στην κονσόλα διαχειριστή.',
    'v2.waterwayz.journey.vessel.title': 'Διεκδίκησε το σκάφος',
    'v2.waterwayz.journey.vessel.body':
      'Βρες το με όνομα ή MMSI, ή διάλεξε από 140+ ναυπηγεία και 340+ μοντέλα — τα χαρακτηριστικά συμπληρώνονται.',
    'v2.waterwayz.journey.plan.title': 'Σχεδίασε τον πλου',
    'v2.waterwayz.journey.plan.body':
      'Δίαυλοι, γέφυρες, παλίρροιες και καιρικά παράθυρα υπολογίζονται στον διακομιστή με τις πραγματικές διαστάσεις.',
    'v2.waterwayz.journey.berth.title': 'Κράτησε τη θέση',
    'v2.waterwayz.journey.berth.body':
      'Το DockPass μετατρέπει ένα επιβεβαιωμένο αίτημα σε παραμονή, με το δελτίο προσέγγισης μαζί.',
    'v2.waterwayz.workspaceOverline': 'Χώροι εργασίας',
    'v2.waterwayz.workspaceTitle': 'Ένας λογαριασμός, πέντε είδη νερού.',
    'v2.waterwayz.workspaceLede':
      'Χώρος εργασίας είναι ό,τι έχεις στην ευθύνη σου. Καθένας έχει το χρώμα του, τους ρόλους του και τα δωμάτιά του.',
    'v2.waterwayz.workspace.vessel': 'Σκάφος',
    'v2.waterwayz.workspace.marina': 'Μαρίνα',
    'v2.waterwayz.workspace.private': 'Ιδιωτική προβλήτα',
    'v2.waterwayz.workspace.business': 'Επιχείρηση',
    'v2.waterwayz.workspace.maintenance': 'Συνεργείο',
    'v2.waterwayz.roadmapOverline': 'Δεν έχει φτιαχτεί ακόμη',
    'v2.waterwayz.roadmapTitle': 'Τι δεν έχουμε βγάλει ακόμη',
    'v2.waterwayz.roadmapLede':
      'Είναι στον οδικό χάρτη και δεν υπάρχουν σήμερα στην εφαρμογή. Καλύτερα να το μάθεις εδώ παρά εν πλω.',
    'v2.waterwayz.roadmap.hud': 'HUD εν πλω',
    'v2.waterwayz.roadmap.alarms': 'Κέντρο συναγερμών',
    'v2.waterwayz.roadmap.night': 'Νυχτερινή λειτουργία',
    'v2.waterwayz.roadmap.floatplan': 'Σχέδιο πλου',
    'v2.waterwayz.roadmap.gpx': 'Εισαγωγή και εξαγωγή GPX',
    'v2.waterwayz.roadmap.billing': 'Πληρωμές εντός εφαρμογής',
    'v2.marinas.demoCta': 'Δες δείγμα μαρίνας',
    'v2.marinas.howOverline': 'Ξεκίνημα',
    'v2.marinas.howTitle': 'Σε λειτουργία μέσα σε ένα απόγευμα.',
    'v2.marinas.step.claim.title': 'Διεκδίκησε τη μαρίνα',
    'v2.marinas.step.claim.body':
      'Ψάξε στον κατάλογο, πάτα στον χάρτη ή ρίξε καρφίτσα αν δεν υπάρχει. Η έγκριση είναι μία συναλλαγή.',
    'v2.marinas.step.draw.title': 'Σχεδίασε το νερό',
    'v2.marinas.step.draw.body':
      'Προβλήτες, πεδία αγκυροβολίου, ράφια και χώροι πάνω σε δορυφορική εικόνα· μετά θέσεις με όρια, εξοπλισμό και πρόσβαση.',
    'v2.marinas.step.rates.title': 'Όρισε τον τιμοκατάλογο',
    'v2.marinas.step.rates.body':
      'Ζώνη μήκους ανά εποχή, ανά μέτρο ή σταθερά, ελάχιστες διανυκτερεύσεις, άμεση κράτηση όπου θέλεις.',
    'v2.marinas.step.run.title': 'Δούλεψε το ημερήσιο δελτίο',
    'v2.marinas.step.run.body':
      'Αφίξεις, αναθέσεις και αναχωρήσεις με ένα πάτημα, από το κινητό στην προβλήτα.',
    'v2.marinas.shot.operations': 'Οι ρόλοι περιορίζουν δυνατότητες: ό,τι δεν μπορείς να κάνεις, δεν το βλέπεις.',
    'v2.marinas.shot.host': 'Οι ιδιωτικές προβλήτες έχουν καταχωρίσεις, αιτήματα και βάρδιες σε έναν πίνακα.',
    'v2.marinas.hostOverline': 'Ιδιωτικές προβλήτες',
    'v2.marinas.hostTitle': 'Και οι δύο θέσεις είναι προϊόν.',
    'v2.marinas.hostLede':
      'Οι οικοδεσπότες έχουν τα ίδια πέντε δωμάτια, με καταχωρίσεις DockPass ανά θέση — σε μια προβλήτα δύο θέσεων, η καταχώριση είναι το προϊόν.',
    'v2.marinas.hostCta': 'Καταχώρισε ιδιωτική προβλήτα',
  },

  uk: {
    'shot.zoomAria': 'Відкрити в повному розмірі',
    'shot.close': 'Закрити',
    'shot.panHint': 'Зведіть пальці або потягніть, щоб прочитати весь екран',
    'availability.live': 'Уже працює',
    'availability.building': 'У розробці',
    'availability.planned': 'Заплановано',
    'availability.concept': 'Концепт дизайну',
    'v2.disclaimer.charts':
      'WaterWayz не є сертифікованою навігаційною системою. Картографічні дані підтримують ситуаційну обізнаність — завжди прокладайте курс за офіційними картами.',

    'v2.hero.eyebrow': 'Навігація · Моніторинг · Швартування · Робота марини',
    'v2.hero.title': 'Знай воду попереду.',
    'v2.hero.lede':
      'WaterWayz прокладає переходи, які ваше судно справді здатне пройти. InteliMARIS стежить за його системами. Марини керують акваторією. Одна платформа, один вхід.',
    'v2.hero.primary': 'Огляд WaterWayz',
    'v2.hero.secondary': 'Для марин',
    'v2.hero.shotCaption': 'Маршрут, глибина, вітер, приплив і місце — на одному екрані.',
    'v2.hero.fact.marinas.label': 'Марин на картах',
    'v2.hero.fact.vessels.label': 'Моделей суден',
    'v2.hero.fact.link.label': 'Зв’язок сенсорів',

    'v2.position.overline': 'Прогалина',
    'v2.position.title': 'Чотири задачі. Одна платформа.',
    'v2.position.lede':
      'Картплотери прокладають курс. Маркетплейси бронюють. Застосунки сенсорів сигналять. Софт для марин виставляє рахунки. Ніхто не робить усі чотири — тож кожна передача між ними лягає на вас.',
    'v2.position.navigate.title': 'Навігувати',
    'v2.position.navigate.body':
      'Маршрути, що враховують живі умови, небезпеки й регуляторні зони — а не пряма лінія на карті.',
    'v2.position.monitor.title': 'Моніторити',
    'v2.position.monitor.body':
      'Сенсори через LoRaWAN: кожне показання з позначкою давності, кожен прогноз — із моделлю, що його дала.',
    'v2.position.dock.title': 'Швартуватися',
    'v2.position.dock.body':
      'Шукайте й бронюйте місце в тому ж застосунку, що привів вас сюди — і бачте лише місця, куди ви вміщуєтесь.',
    'v2.position.operate.title': 'Керувати',
    'v2.position.operate.body':
      'Бік марини того самого бронювання: місця, прибуття, резиденти й персонал — просто з пірса.',

    'v2.voyage.overline': 'Один перехід, від початку до кінця',
    'v2.voyage.title': 'Прогорніть рейс.',
    'v2.voyage.lede':
      'Справжній перехід по Intracoastal до Bahia Mar, відтворений за годинником самого маршрутизатора — ті самі дані, що застосунок несе в переході.',
    'v2.voyage.stage.plan.label': 'Планування',
    'v2.voyage.stage.plan.note':
      'Планувальник бере справжні довжину, ширину, осадку та висоту. Якщо він не вірить лінії — він відмовляє і пояснює чому.',
    'v2.voyage.stage.underway.label': 'У переході',
    'v2.voyage.stage.underway.note':
      'Картографічна глибина видно крізь воду. Рух AIS, небезпеки та зони без хвилі оновлюються на ходу.',
    'v2.voyage.stage.approach.label': 'Підхід',
    'v2.voyage.stage.approach.note':
      'Підмостовий габарит з урахуванням припливу на момент, коли ви справді прийдете — а не коли спитали.',
    'v2.voyage.stage.berth.label': 'Пришвартовані',
    'v2.voyage.stage.berth.note':
      'Капітан порту призначає місце, і разом із ним приходить картка підходу: курс, спосіб, борт швартування, глибина й датум.',
    'v2.voyage.prev': 'Попередній етап',
    'v2.voyage.next': 'Наступний етап',
    'v2.voyage.progress': 'Хід переходу',

    'v2.app.overline': 'WaterWayz',
    'v2.app.title': 'Переходи, які ваше судно здатне пройти.',
    'v2.app.lede':
      'Усе є робочим простором — судно, марина, приватний пірс — в одному акаунті, у вебі, на iOS та Android.',
    'v2.app.feature.vessel.title': 'Плановано під неї, а не під форму',
    'v2.app.feature.vessel.body':
      'Довжина, ширина, осадка, висота й морські обмеження беруться з простору судна. Фарватери, мости, припливи й погодні вікна рахуються на сервері.',
    'v2.app.feature.depth.title': 'Глибина, яку видно крізь воду',
    'v2.app.feature.depth.body':
      'Картографічна глибина малюється під водою, з окремими смугами «глибина для мого судна» вздовж маршруту.',
    'v2.app.feature.traffic.title': 'Живий рух і небезпеки',
    'v2.app.feature.traffic.body':
      'AIS із фільтрами за класом, швидкістю чи призначенням. Свіжі треки згасають із часом. Небезпеки можна подати, підтвердити й зняти.',
    'v2.app.feature.dockpass.title': 'DockPass',
    'v2.app.feature.dockpass.body':
      'Запитуйте й підтверджуйте місця в маринах і на приватних пірсах. Підтверджене бронювання стає стоянкою з призначеним місцем.',
    'v2.app.feature.emergency.title': 'Тривога у два дотики',
    'v2.app.feature.emergency.body':
      'Кожне судно в радіусі бачить що, де і як далеко, і може позначити, що реагує. Це не заміна VHF 16 чи DSC.',
    'v2.app.feature.cameras.title': 'Штурвал, Згори, 3D',
    'v2.app.feature.cameras.body':
      'Три камери над однією картою — стандартний, супутниковий, морський шари й буї, з офлайн-пакетом, який можна взяти з собою.',
    'v2.app.cta': 'Переглянути WaterWayz',

    'v2.pms.overline': 'Marina PMS',
    'v2.pms.title': 'Керуйте акваторією з пірса.',
    'v2.pms.lede':
      'Заявіть права на свою марину з каталогу на 27 000, намалюйте власну карту місць поверх супутника й ведіть денну дошку з телефона на причалі.',
    'v2.pms.shot.layout': 'Малюйте пірси, поля буїв і місця просто поверх супутникового знімка.',
    'v2.pms.shot.dashboard': 'Денна дошка: хто на зміні, хто чекає і який вигляд має акваторія просто зараз.',
    'v2.pms.shot.dock': 'Приватні пірси мають ті самі інструменти — намалюйте воду, виставте місце.',
    'v2.pms.feature.free.title': 'Вільно означає лише вільно',
    'v2.pms.feature.free.body':
      'Кожне місце на кожну дату — рівно одне з: закрите, резидента, гостьове, призначене або вільне. Більше ніщо не рахується доступним.',
    'v2.pms.feature.assign.title': 'Гість бронює марину, а не місце',
    'v2.pms.feature.assign.body':
      'Ціна береться з тарифу за смугою довжини й сезоном. Капітан порту призначає конкретне місце, часто вранці. Перепризначення — це новий запис, а не правка.',
    'v2.pms.feature.brief.title': 'Картка підходу їде разом із місцем',
    'v2.pms.feature.brief.body':
      'B-7 · вхід 240° кормою · швартування правим бортом · 2,4 м MLLW. Прибуття й відхід одним дотиком; відхід звільняє місце тією ж транзакцією.',
    'v2.pms.feature.residents.title': 'Резиденти, відсутності та згода',
    'v2.pms.feature.residents.body':
      'Договори тримають датовані відсутності з явною згодою на перепродаж і часткою доходу. Відсутність — це не дозвіл. Угоди версіонуються заміщенням.',
    'v2.pms.roadmap.title': 'Що вже працює, а що ні',
    'v2.pms.roadmap.lede':
      'Консоль будується кімната за кімнатою. Ось кімнати, у яких можна працювати сьогодні — решта має риштування й дату, а не сховані.',
    'v2.pms.roadmap.dashboard': 'Панель дня',
    'v2.pms.roadmap.bookings': 'Бронювання — прибуття, коротка стоянка, резиденти',
    'v2.pms.roadmap.berths': 'Схема місць і зайнятість',
    'v2.pms.roadmap.staff': 'Персонал, графік змін і ролі',
    'v2.pms.roadmap.settings': 'Налаштування — тарифи, схема, події, інциденти',
    'v2.pms.roadmap.chat': 'Повідомлення',
    'v2.pms.roadmap.finance': 'Фінанси — рахунки, інвойси, звірка',
    'v2.pms.roadmap.crm': 'Клієнти й листування',
    'v2.pms.roadmap.reports': 'Звіти й порівняння портфеля',
    'v2.pms.roadmap.calendar': 'Календар зайнятості й дошка бронювань',
    'v2.pms.cta': 'Заявити марину',

    'v2.sensors.overline': 'Сенсори InteliMARIS',
    'v2.sensors.title': 'Надійність, яку видно.',
    'v2.sensors.lede':
      'Сенсори звітують через LoRaWAN, тож ніщо не залежить від Wi-Fi на причалі. Кожна плитка показує вік свого показання, а кожен прогноз — модель, що його дала.',
    'v2.sensors.shotCaption': 'Системи на борту, з віком кожного показання просто на плитці.',
    'v2.sensors.point.stale.title': 'Показання називає свій вік',
    'v2.sensors.point.stale.body':
      'Застаріле число гірше за жодне, тож давність стоїть на лиці кожної плитки, а не закопана в журнал.',
    'v2.sensors.point.lora.title': 'LoRaWAN, а не судновий Wi-Fi',
    'v2.sensors.point.lora.body':
      'Велика дальність, мале споживання і жодної залежності від точки доступу, що зникає, щойно ви відійшли від місця.',
    'v2.sensors.point.clocks.title': 'Обслуговування за двома годинниками',
    'v2.sensors.point.clocks.body':
      'Мотогодини й календарні дати разом — бо важить те, що настане першим.',
    'v2.sensors.cta': 'Переглянути обладнання',

    'v2.trust.title': 'Зроблено для моряків. За підтримки InteliMarine.',
    'v2.trust.lede':
      'Один API за обома продуктами, сервіси на Rust і спільна автентифікація у вебі, мобільному та консолі оператора.',
    'v2.trust.stat.workspaces.value': '5',
    'v2.trust.stat.workspaces.label': 'Типів робочих просторів',
    'v2.trust.stat.locales.value': '4',
    'v2.trust.stat.locales.label': 'Мови',
    'v2.trust.stat.roles.value': '8',
    'v2.trust.stat.roles.label': 'Ролей у марині',
    'v2.trust.stat.marinas.value': '27 000+',
    'v2.trust.stat.marinas.label': 'Марин у каталозі',

    'v2.closing.title': 'Виведіть свою воду онлайн.',
    'v2.closing.lede':
      'Прокладіть перехід, наглядайте за системами або відкрийте акваторію для бронювань — скажіть, із чого, і ми почнемо звідти.',
    'v2.closing.primary': 'Напишіть нам',
    'v2.closing.secondary': 'Переглянути обладнання',
    'v2.waterwayz.cta': 'Напишіть нам',
    'v2.waterwayz.journeyOverline': 'Від реєстрації до місця',
    'v2.waterwayz.journeyTitle': 'Чотири кроки до місця.',
    'v2.waterwayz.journeyLede':
      'Жодних екранів налаштувань. Ви один раз описуєте судно, і все далі планується під нього.',
    'v2.waterwayz.journey.account.title': 'Один акаунт',
    'v2.waterwayz.journey.account.body':
      'Увійдіть раз і носіть це у вебі, на iOS, Android і в консолі оператора.',
    'v2.waterwayz.journey.vessel.title': 'Заявіть судно',
    'v2.waterwayz.journey.vessel.body':
      'Знайдіть за назвою чи MMSI, або оберіть із 140+ верфей і 340+ моделей — характеристики підставляться.',
    'v2.waterwayz.journey.plan.title': 'Сплануйте перехід',
    'v2.waterwayz.journey.plan.body':
      'Фарватери, мости, припливи й погодні вікна рахуються на сервері за справжніми розмірами.',
    'v2.waterwayz.journey.berth.title': 'Забронюйте місце',
    'v2.waterwayz.journey.berth.body':
      'DockPass перетворює підтверджений запит на стоянку, разом із карткою підходу.',
    'v2.waterwayz.workspaceOverline': 'Робочі простори',
    'v2.waterwayz.workspaceTitle': 'Один акаунт, п’ять видів води.',
    'v2.waterwayz.workspaceLede':
      'Робочий простір — це те, за що ви відповідаєте. У кожного свій колір, свої ролі та свої кімнати.',
    'v2.waterwayz.workspace.vessel': 'Судно',
    'v2.waterwayz.workspace.marina': 'Марина',
    'v2.waterwayz.workspace.private': 'Приватний пірс',
    'v2.waterwayz.workspace.business': 'Бізнес',
    'v2.waterwayz.workspace.maintenance': 'Майстерня',
    'v2.waterwayz.roadmapOverline': 'Ще не збудовано',
    'v2.waterwayz.roadmapTitle': 'Чого ми ще не випустили',
    'v2.waterwayz.roadmapLede':
      'Це в дорожній карті й цього сьогодні немає в застосунку. Краще дізнатися тут, ніж у переході.',
    'v2.waterwayz.roadmap.hud': 'HUD у переході',
    'v2.waterwayz.roadmap.alarms': 'Центр тривог',
    'v2.waterwayz.roadmap.night': 'Нічний режим',
    'v2.waterwayz.roadmap.floatplan': 'План виходу',
    'v2.waterwayz.roadmap.gpx': 'Імпорт та експорт GPX',
    'v2.waterwayz.roadmap.billing': 'Платежі в застосунку',
    'v2.marinas.demoCta': 'Переглянути зразок марини',
    'v2.marinas.howOverline': 'Початок',
    'v2.marinas.howTitle': 'Запуск за один вечір.',
    'v2.marinas.step.claim.title': 'Заявіть марину',
    'v2.marinas.step.claim.body':
      'Знайдіть у каталозі, торкніться карти або поставте шпильку, якщо її ще немає. Схвалення — одна транзакція.',
    'v2.marinas.step.draw.title': 'Намалюйте воду',
    'v2.marinas.step.draw.body':
      'Пірси, поля буїв, стелажі та двори поверх супутника; далі місця з обмеженнями, обладнанням і доступом.',
    'v2.marinas.step.rates.title': 'Складіть тариф',
    'v2.marinas.step.rates.body':
      'Смуга довжини за сезоном, за метр або фіксовано, мінімум ночей, миттєве бронювання там, де треба.',
    'v2.marinas.step.run.title': 'Ведіть денну дошку',
    'v2.marinas.step.run.body':
      'Прибуття, призначення та відходи — по одному дотику, з телефона на пірсі.',
    'v2.marinas.shot.operations': 'Ролі обмежують можливості: чого не можна зробити, того не видно.',
    'v2.marinas.shot.host': 'Приватні пірси мають оголошення, запити та зміни на одній дошці.',
    'v2.marinas.hostOverline': 'Приватні пірси',
    'v2.marinas.hostTitle': 'Два місця — теж продукт.',
    'v2.marinas.hostLede':
      'Господарі отримують ті самі п’ять дверей із оголошеннями DockPass на кожне місце — для пірса на два місця оголошення і є продуктом.',
    'v2.marinas.hostCta': 'Опублікувати приватний пірс',
  },
}
