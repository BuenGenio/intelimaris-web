<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Maintenance</h1>
        <p class="scr-sub">Which company serves which vessel, what is open across them, and who is in the directory. Read-only — the vessel and the company end an engagement from their own doors, and a work order is theirs to move.</p>
      </div>
      <div class="scr-tabs mt-tabs">
        <button v-for="t in tabs" :key="t.key" type="button" class="scr-tab" :class="{ 'is-on': tab === t.key }" @click="tab = t.key">{{ t.label }}</button>
      </div>
    </div>

    <template v-if="tab === 'engagements'">
      <div class="scr-toolbar">
        <span class="scr-chip">Status · Every engagement <span aria-hidden="true">⌄</span></span>
        <span class="scr-spacer"></span>
        <span class="scr-small scr-muted">2 active on this page · 3 technicians assigned · 1 awaiting an answer.</span>
      </div>
      <table class="scr-table">
        <thead><tr><th>Vessel</th><th>Company</th><th>Status</th><th class="scr-num">Technicians</th><th>Requested</th><th>Outcome</th></tr></thead>
        <tbody>
          <tr v-for="e in engagements" :key="e.id">
            <td><strong>{{ e.vessel }}</strong></td>
            <td>{{ e.company }}</td>
            <td><span class="scr-pill" :data-tone="e.tone">{{ e.status }}</span></td>
            <td class="scr-num scr-muted">{{ e.technicians }}</td>
            <td class="scr-small scr-muted scr-num">{{ e.requested }}</td>
            <td class="scr-small scr-muted">{{ e.outcome }}<span v-if="e.reason" class="mt-reason">“{{ e.reason }}”</span></td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-else-if="tab === 'work-orders'">
      <div class="scr-toolbar">
        <span class="scr-chip">Status · Every work order <span aria-hidden="true">⌄</span></span>
        <span class="scr-spacer"></span>
        <span class="scr-small scr-muted">3 of 5 on this page still open, 1 urgent.</span>
      </div>
      <table class="scr-table">
        <thead><tr><th>Work</th><th>Vessel</th><th>Status</th><th>Priority</th><th>Company · technician</th><th>Scheduled</th><th>Raised</th></tr></thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td><span class="mt-col"><strong>{{ o.title }}</strong><span class="scr-small scr-muted">{{ o.system }}</span></span></td>
            <td>{{ o.vessel }}</td>
            <td><span class="scr-pill" :data-tone="o.tone">{{ o.status }}</span></td>
            <td class="scr-small scr-muted">{{ o.priority }}</td>
            <td class="scr-small scr-muted">{{ o.who }}</td>
            <td class="scr-small scr-muted scr-num">{{ o.scheduled }}</td>
            <td class="scr-small scr-muted scr-num">{{ o.raised }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-else>
      <div class="scr-toolbar">
        <span class="scr-input scr-input--search mt-search scr-muted">Company name or specialty…</span>
        <span class="scr-spacer"></span>
        <span class="scr-small scr-muted">4 companies — 3 listed, 2 serving a vessel now, 1 not yet listed.</span>
      </div>
      <table class="scr-table">
        <thead><tr><th>Company</th><th>Directory</th><th>Specialties</th><th>Service area</th><th class="scr-num">Serving</th><th>Contact</th><th>Updated</th></tr></thead>
        <tbody>
          <tr v-for="c in companies" :key="c.id">
            <td><strong>{{ c.name }}</strong></td>
            <td><span class="scr-pill" :data-tone="c.listed ? 'safe' : 'offline'">{{ c.listed ? 'Listed' : 'Not listed' }}</span></td>
            <td class="scr-small scr-muted">{{ c.specialties }}</td>
            <td class="scr-small scr-muted">{{ c.area }}</td>
            <td class="scr-num scr-muted">{{ c.serving }}</td>
            <td class="scr-small scr-muted">{{ c.contact }}</td>
            <td class="scr-small scr-muted scr-num">{{ c.updated }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <div class="scr-row scr-row--between scr-section">
      <span class="scr-small scr-muted">Showing 1–{{ tab === 'directory' ? 4 : 5 }} of {{ tab === 'directory' ? 4 : 31 }}</span>
      <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm" :disabled="tab === 'directory'">Next</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Tab = 'engagements' | 'work-orders' | 'directory'
const tabs: { key: Tab; label: string }[] = [{ key: 'engagements', label: 'Engagements' }, { key: 'work-orders', label: 'Work orders' }, { key: 'directory', label: 'Directory' }]
const tab = ref<Tab>('engagements')
const engagements = [
  { id: 'e1', vessel: 'Wanderer', company: 'Lauderdale Marine Service', status: 'Active', tone: 'safe', technicians: '2', requested: '2026-10-02 by the vessel', outcome: 'Since 2026-10-03', reason: '' },
  { id: 'e2', vessel: 'Sea Change', company: 'Lauderdale Marine Service', status: 'Active', tone: 'safe', technicians: '1', requested: '2026-09-28 by the company', outcome: 'Since 2026-09-29', reason: '' },
  { id: 'e3', vessel: 'Blue Heron', company: 'Intracoastal Rigging', status: 'Requested', tone: 'warn', technicians: '—', requested: '2026-10-13 by the vessel', outcome: 'Awaiting the other side', reason: '' },
  { id: 'e4', vessel: 'Osprey', company: 'Lauderdale Marine Service', status: 'Ended', tone: 'offline', technicians: '—', requested: '2026-08-11 by the vessel', outcome: '2026-10-01', reason: 'Haul-out finished; vessel moved north' },
  { id: 'e5', vessel: 'Kestrel', company: 'Port Everglades Diesel', status: 'Declined', tone: 'danger', technicians: '—', requested: '2026-10-06 by the vessel', outcome: '2026-10-07', reason: 'Outside our service area' },
]
const orders = [
  { id: 'w1', title: 'Replace raw-water impeller', system: 'Engine', vessel: 'Wanderer', status: 'In progress', tone: 'accent', priority: 'High', who: 'Lauderdale Marine Service · J. Ortiz', scheduled: '2026-10-15', raised: '2026-10-09 · Sensor alert' },
  { id: 'w2', title: 'Bilge pump float switch', system: 'Bilge', vessel: 'Wanderer', status: 'Open', tone: 'danger', priority: 'Urgent', who: 'Lauderdale Marine Service', scheduled: '—', raised: '2026-10-14 · Sensor alert' },
  { id: 'w3', title: 'Bottom paint and zincs', system: 'Hull', vessel: 'Sea Change', status: 'Scheduled', tone: 'offline', priority: 'Normal', who: 'Lauderdale Marine Service · M. Reyes', scheduled: '2026-10-22', raised: '2026-10-01 · Schedule' },
  { id: 'w4', title: 'Standing rigging inspection', system: 'Rig', vessel: 'Blue Heron', status: 'Done', tone: 'safe', priority: 'Normal', who: "The vessel's own", scheduled: '2026-10-05', raised: '2026-09-30 · Manual' },
  { id: 'w5', title: 'House bank load test', system: 'Electrical', vessel: 'Osprey', status: 'Cancelled', tone: 'offline', priority: 'Low', who: "The vessel's own", scheduled: '—', raised: '2026-09-18 · Manual' },
]
const companies = [
  { id: 'c1', name: 'Lauderdale Marine Service', listed: true, specialties: 'Diesel, electrical, haul-out', area: 'Fort Lauderdale to Pompano', serving: 2, contact: 'service@lms.example', updated: '2026-10-11' },
  { id: 'c2', name: 'Intracoastal Rigging', listed: true, specialties: 'Rigging, sails', area: 'Broward County', serving: 0, contact: '+1 954 555 0142', updated: '2026-10-08' },
  { id: 'c3', name: 'Port Everglades Diesel', listed: true, specialties: 'Diesel', area: 'Port Everglades', serving: 1, contact: 'pediesel.example', updated: '2026-09-30' },
  { id: 'c4', name: 'Keys Canvas and Marine', listed: false, specialties: '—', area: '—', serving: 0, contact: '—', updated: '2026-10-13' },
]
</script>

<style scoped>
.mt-tabs { flex: 0 0 auto; }
.mt-search { flex: 1; display: flex; align-items: center; min-width: 0; }
.mt-col { display: grid; gap: 2px; }
.mt-reason { display: block; color: var(--ink-400); }
</style>
