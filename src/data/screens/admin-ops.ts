import type { ScreenGroup } from './types'

/**
 * The operator console, second half: the queues and ledgers an operator
 * works rather than the directories they browse. Doors are the console's
 * own rail (apps/admin/src/console-nav.ts), one door per top-level route
 * segment, so the two admin groups light the same shell.
 */
export const ADMIN_OPS: ScreenGroup = {
  id: 'admin-ops', label: 'Operator console: operations', kind: 'platform', app: 'Operator console', frame: 'desktop', slug: 'console',
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
    { id: 'admin-ops-hazards', label: 'Hazards', path: '/hazards', door: 'hazards', summary: 'The hazard moderation queue: every community report with its clear provenance, and one action to put a wrong clear back on the map.', load: () => import('@/components/screens/admin-ops/Hazards.vue') },
    { id: 'admin-ops-emergencies', label: 'Emergencies', path: '/emergencies', door: 'emergencies', summary: 'Every raised call with bearing and distance from the booth, and the alert range that decides which vessels are told.', load: () => import('@/components/screens/admin-ops/Emergencies.vue') },
    { id: 'admin-ops-events', label: 'Events', path: '/events', door: 'events', summary: 'Closures, races and parades from upstream feeds, corrected field by field, with the affects-navigation flag in plain sight.', load: () => import('@/components/screens/admin-ops/Events.vue') },
    { id: 'admin-ops-dockpass', label: 'DockPass hosts', path: '/dockpass', door: 'dockpass', summary: 'Listings and the bookings queue across every workspace, read-only: what exists, and what is waiting on a host.', load: () => import('@/components/screens/admin-ops/DockPass.vue') },
    { id: 'admin-ops-claims', label: 'Claims', path: '/claims', door: 'claims', summary: 'Marina claims, business claims and add-a-marina requests in one queue, with the evidence beside the decision.', load: () => import('@/components/screens/admin-ops/Claims.vue') },
    { id: 'admin-ops-departures', label: 'Departures', path: '/departures', door: 'departures', summary: 'The booth departures board: when each demo run leaves, who is booked, who has checked in and how many seats are free.', load: () => import('@/components/screens/admin-ops/Departures.vue') },
    { id: 'admin-ops-fleet', label: 'Fleet operations', path: '/fleet', door: 'fleet', summary: 'Every vessel workspace with its sensor units, how long since it last reported, and what the models claim about it.', load: () => import('@/components/screens/admin-ops/FleetOps.vue') },
    { id: 'admin-ops-fuel-reports', label: 'Fuel reports', path: '/fuel-reports', door: 'fuel-reports', summary: 'Community fuel-price reports at one place, a count and an age per grade, with the operator clear beside each row.', load: () => import('@/components/screens/admin-ops/FuelReports.vue') },
    { id: 'admin-ops-maintenance', label: 'Maintenance', path: '/maintenance', door: 'maintenance', summary: 'Engagements, work orders and the company directory across every vessel and yard, read-only.', load: () => import('@/components/screens/admin-ops/Maintenance.vue') },
    { id: 'admin-ops-billing', label: 'Billing', path: '/billing', door: 'billing', summary: 'Every account and its one subscription, with the DockPass payouts ledger drawn beside it as shape only.', load: () => import('@/components/screens/admin-ops/Billing.vue') },
    { id: 'admin-ops-bridges', label: 'Bridges', path: '/bridges', door: 'bridges', summary: 'Every bridge with its closed clearance, the unknown-clearance backlog counted, and a drawer to correct one field at a time.', load: () => import('@/components/screens/admin-ops/Bridges.vue') },
    { id: 'admin-ops-cells', label: 'Cells', path: '/cells', door: 'cells', summary: 'The H3 grid over the chart, shaded by how much the platform holds per cell, with one cell opened and replayed in time.', load: () => import('@/components/screens/admin-ops/Cells.vue') },
    { id: 'admin-ops-notifications', label: 'Notifications', path: '/notifications', door: 'notifications', summary: 'Every message the platform sent, one row per channel, and whether it arrived.', load: () => import('@/components/screens/admin-ops/Notifications.vue') },
    { id: 'admin-ops-pipeline', label: 'Pipeline', path: '/pipeline', door: 'pipeline', summary: 'The populator per layer and region: cadence, next due, last run and what it retrieved.', load: () => import('@/components/screens/admin-ops/Pipeline.vue') },
    { id: 'admin-ops-audit', label: 'Audit trail', path: '/audit', door: 'audit', summary: 'Every write the platform made, newest first: who, what, when, and the sentence the service wrote at the time.', load: () => import('@/components/screens/admin-ops/Audit.vue') },
    { id: 'admin-ops-private-map', label: 'Private dock map', path: '/private/ws-isle-of-venice/map', door: 'workspaces', summary: 'The berth editor for a private dock: draw the dock line and its berths, nudge a selection, and save the moves.', load: () => import('@/components/screens/admin-ops/PrivateMap.vue') },
  ],
}
