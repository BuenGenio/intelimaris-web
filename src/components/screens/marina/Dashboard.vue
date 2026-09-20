<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Bahia Mar</h1>
        <p class="scr-sub">Run your marina: berths, arrivals and staff.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">Marina</span><span class="scr-pill scr-pill--bare">Dockmaster</span></div>
    </div>
    <div class="scr-chips" style="margin-bottom: 14px">
      <span v-for="l in links" :key="l" class="scr-chip">{{ l }}</span>
    </div>

    <div class="scr-kpis">
      <div v-for="t in tiles" :key="t.label" class="scr-stat">
        <span class="scr-stat-label">{{ t.label }}</span>
        <span class="scr-stat-value">{{ t.value }}</span>
        <span class="scr-stat-delta" :data-tone="t.tone">{{ t.context }}</span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Requests waiting</h2><p class="scr-sub scr-small">Nobody gets a berth until someone here says yes.</p></div>
        <div class="scr-row"><button class="scr-btn scr-btn--ghost scr-btn--sm">Today's board</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Short stay</button></div>
      </div>
      <div class="scr-divider"></div>
      <div v-for="r in waiting" :key="r.name" class="scr-row scr-row--between mdb-row">
        <div>
          <span class="scr-item-title">{{ r.name }} <span class="scr-pill" data-tone="warn">Requested</span></span>
          <span class="scr-item-sub">{{ r.line }}</span>
        </div>
        <div class="scr-row"><button class="scr-btn scr-btn--primary scr-btn--sm">Confirm</button><button class="scr-btn scr-btn--sm">Decline</button></div>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">The basin now</h2><p class="scr-sub scr-small">As of 09:41, 14 Oct 2026. Every drawn berth answers with what it IS today; only free is free.</p></div>
        <button class="scr-btn scr-btn--ghost scr-btn--sm">Layout</button>
      </div>
      <div class="scr-divider"></div>
      <ScrMap variant="basin" :height="250" :pins="[{ x: 330, y: 22, tone: 'safe' }, { x: 70, y: 22, tone: 'safe' }]">
        <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip">Dock C · C-14 held for Wanderer</span>
      </ScrMap>
      <div class="scr-row scr-row--wrap scr-small" style="margin-top: 10px">
        <span class="scr-pill" data-tone="accent">Free · 27</span>
        <span class="scr-pill" data-tone="warn">Assigned · 41</span>
        <span class="scr-pill">Resident · 96</span>
        <span class="scr-pill" data-tone="safe">Courtesy · 4</span>
        <span class="scr-pill" data-tone="offline">Closed · 3</span>
        <span class="scr-spacer"></span>
        <span class="scr-muted">2 gateways</span>
      </div>
      <ul class="scr-row scr-row--wrap scr-small scr-muted" style="margin-top: 6px">
        <li class="scr-row"><span class="scr-pill" data-tone="safe">Online</span><strong>Fuel dock roof</strong> · Heard 3 min ago</li>
        <li class="scr-row"><span class="scr-pill" data-tone="safe">Online</span><strong>Dock A head</strong> · Heard 8 min ago</li>
      </ul>
    </div>

    <div class="scr-grid-2 scr-section">
      <div class="scr-card">
        <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">Open incidents</h2><p class="scr-sub scr-small">Severest first. An unresolved incident is a thing someone must close.</p></div><button class="scr-btn scr-btn--ghost scr-btn--sm">Incident log</button></div>
        <div class="scr-divider"></div>
        <div v-for="i in incidents" :key="i.summary" class="scr-row scr-row--wrap mdb-row">
          <span class="scr-pill" :data-tone="i.tone">{{ i.severity }}</span>
          <span class="scr-strong">{{ i.summary }}</span>
          <span class="scr-muted scr-small">{{ i.when }}</span>
        </div>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">This week</h2><p class="scr-sub scr-small">Your own postings and the notices to mariners at your marina, in the next seven days.</p></div><button class="scr-btn scr-btn--ghost scr-btn--sm">Events</button></div>
        <div class="scr-divider"></div>
        <div v-for="e in events" :key="e.name" class="scr-row scr-row--wrap mdb-row">
          <span class="scr-strong">{{ e.name }}</span>
          <span class="scr-muted scr-small">{{ e.window }}</span>
          <span class="scr-pill" :data-tone="e.tone">{{ e.timing }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const links = ['PMS map', 'Walk-in', 'Storm prep', 'LiDAR layout', 'Fuel prices', 'Payouts', 'Claim']
const tiles = [
  { label: 'Alongside', value: '138', context: 'arrived, not departed', tone: undefined },
  { label: 'Arriving', value: '6', context: '4 departing', tone: undefined },
  { label: 'Unassigned', value: '2', context: 'confirmed, no berth held', tone: 'warn' },
  { label: 'On duty', value: '5', context: 'clocked on now', tone: 'safe' },
]
const waiting = [
  { name: 'Wanderer · Sam Miller', line: '14–17 Oct · 3 nights · 42 ft Sabre · draft 4.6 ft · via WaterWayz' },
  { name: 'Blue Heron', line: '15–16 Oct · 1 night · 38 ft · no berth can be held yet · via VHF' },
  { name: 'Halcyon', line: '18–25 Oct · 7 nights · 48 ft · via marina site' },
]
const incidents = [
  { severity: 'High', tone: 'high', summary: 'Pedestal C-9 tripping on 50 A', when: '14 Oct, 07:20 · berth C-9' },
  { severity: 'Medium', tone: 'warn', summary: 'Fender board loose on finger B-3', when: '13 Oct, 16:05 · berth B-3' },
  { severity: 'Low', tone: 'info', summary: 'Fuel dock hose reel sticking', when: '12 Oct, 11:40' },
]
const events = [
  { name: 'Fuel dock closed for maintenance', window: 'Thu 15 Oct, 06:00–12:00', timing: 'In 1 day', tone: 'warn' },
  { name: 'FLIBS courtesy shuttle', window: 'Wed 21 Oct – Sun 25 Oct', timing: 'In 7 days', tone: undefined },
  { name: 'Dock C power outage, planned', window: 'Sat 17 Oct, 05:00–07:00', timing: 'In 3 days', tone: 'warn' },
]
</script>

<style scoped>
.mdb-row { padding: 8px 0; }
.mdb-row + .mdb-row { border-top: 1px solid var(--ink-100); }
</style>
