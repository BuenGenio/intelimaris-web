import type { ScreenGroup } from './types'

/* The operator console (apps/admin): cross-tenant, navy, desktop only.
   Doors are console-nav.ts's top-level sections, ids matching the route segments. */
export const ADMIN: ScreenGroup = {
  id: 'admin', label: 'Operator console: people and places', kind: 'platform', app: 'Operator console', frame: 'desktop', slug: 'console',
  doors: [
    { id: 'overview', label: 'Overview' }, { id: 'accounts', label: 'Accounts' }, { id: 'workspaces', label: 'Workspaces' }, { id: 'users', label: 'People' }, { id: 'billing', label: 'Billing' },
    { id: 'notifications', label: 'Notifications' }, { id: 'audit', label: 'Audit' }, { id: 'pipeline', label: 'Pipeline' },
    { id: 'cells', label: 'Cells' }, { id: 'bridges', label: 'Bridges' }, { id: 'hazards', label: 'Hazards' }, { id: 'events', label: 'Events' }, { id: 'gateways', label: 'Gateways' },
    { id: 'vessels', label: 'Vessels' }, { id: 'catalog', label: 'Model catalog' }, { id: 'fleet', label: 'Fleet operations' }, { id: 'sensors', label: 'Sensor fleet' }, { id: 'lorawan', label: 'LoRaWAN' }, { id: 'models', label: 'Models' }, { id: 'emergencies', label: 'Emergencies' }, { id: 'departures', label: 'Departures' },
    { id: 'marinas', label: 'Marinas' },
    { id: 'dockpass', label: 'DockPass hosts' },
    { id: 'places', label: 'Places' }, { id: 'claims', label: 'Claims' }, { id: 'fuel-reports', label: 'Fuel reports' },
    { id: 'maintenance', label: 'Maintenance' },
  ],
  screens: [
    { id: 'admin-overview', label: 'Overview', path: '/', door: 'overview', summary: 'Is the platform healthy, and what needs you: service reachability and one tile per source.', load: () => import('@/components/screens/admin/Overview.vue') },
    { id: 'admin-accounts', label: 'Accounts', path: '/accounts', door: 'accounts', summary: 'Every account on the platform, with its workspaces, members, subscription and cadence.', load: () => import('@/components/screens/admin/Accounts.vue') },
    { id: 'admin-account-detail', label: 'Account detail', path: '/accounts/acc-1041', door: 'accounts', summary: 'One account read only: features and sliders held against the subscription, its workspaces and its members.', load: () => import('@/components/screens/admin/AccountDetail.vue') },
    { id: 'admin-users', label: 'People', path: '/users', door: 'users', summary: 'Everyone the platform knows, with the workspaces each person belongs to and the roles they hold.', load: () => import('@/components/screens/admin/Users.vue') },
    { id: 'admin-workspaces', label: 'Workspaces', path: '/workspaces', door: 'workspaces', summary: 'The tenancy directory: every workspace, its kind, its members and when it was created.', load: () => import('@/components/screens/admin/Workspaces.vue') },
    { id: 'admin-workspace-detail', label: 'Workspace detail', path: '/workspaces/ws-wanderer', door: 'workspaces', summary: 'One workspace open in the drawer: the account it bills through and the roster an operator can change or remove.', load: () => import('@/components/screens/admin/WorkspaceDetail.vue') },
    { id: 'admin-marinas', label: 'Marinas', path: '/marinas', door: 'marinas', summary: 'The whole marina directory, filtered by country, region, kind, claim and corrections.', load: () => import('@/components/screens/admin/Marinas.vue') },
    { id: 'admin-marina-detail', label: 'Marina detail', path: '/marinas/bahia-mar', door: 'marinas', summary: 'One marina record: its pin on the water, the facts, the claim, gateway coverage, incidents and upcoming events.', load: () => import('@/components/screens/admin/MarinaDetail.vue') },
    { id: 'admin-marina-map', label: 'Berth map editor', path: '/marinas/bahia-mar/map', door: 'marinas', summary: 'The operator draws docks, berths, facilities and hazards over the basin and nudges what is selected.', load: () => import('@/components/screens/admin/MarinaMap.vue') },
    { id: 'admin-marina-occupancy', label: 'Occupancy board', path: '/marinas/bahia-mar/occupancy', door: 'marinas', summary: 'What every berth is tonight, read from DockPass and painted over the drawn basin.', load: () => import('@/components/screens/admin/MarinaOccupancy.vue') },
    { id: 'admin-marina-stays', label: 'Berth board', path: '/marinas/bahia-mar/stays', door: 'marinas', summary: 'The dockmaster queue: who is arriving, who still has nowhere to tie up, and every stay in the window.', load: () => import('@/components/screens/admin/MarinaStays.vue') },
    { id: 'admin-vessels', label: 'Vessels', path: '/vessels', door: 'vessels', summary: 'The vessel registry with live AIS age, claims and per-field corrections such as draft.', load: () => import('@/components/screens/admin/Vessels.vue') },
    { id: 'admin-sensors', label: 'Sensor fleet', path: '/sensors', door: 'sensors', summary: 'Provision a unit, mint its claim code, and move each unit through its status lifecycle.', load: () => import('@/components/screens/admin/SensorFleet.vue') },
    { id: 'admin-gateways', label: 'Gateways', path: '/gateways', door: 'gateways', summary: 'Where the LoRaWAN coverage is: gateways placed on the map, their status, site and last uplink.', load: () => import('@/components/screens/admin/Gateways.vue') },
    { id: 'admin-lorawan', label: 'LoRaWAN', path: '/lorawan', door: 'lorawan', summary: 'The TTN bridge: connection settings, the device registry mapped to unit serials, and the downlink queue.', load: () => import('@/components/screens/admin/Lorawan.vue') },
    { id: 'admin-models', label: 'Models', path: '/models', door: 'models', summary: 'The prediction models by id and version, when each last ran, how it scored and what it consumes.', load: () => import('@/components/screens/admin/Models.vue') },
    { id: 'admin-catalog', label: 'Model catalog', path: '/catalog', door: 'catalog', summary: 'The vessel model catalog: seed rows become curated ones when an operator vouches for the figures.', load: () => import('@/components/screens/admin/Catalog.vue') },
    { id: 'admin-places', label: 'Places', path: '/places', door: 'places', summary: 'Waterfront businesses on the map, with per-field corrections through the curated lane.', load: () => import('@/components/screens/admin/Places.vue') },
  ],
}
