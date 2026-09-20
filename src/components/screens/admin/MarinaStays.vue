<template>
  <div class="scr">
    <a class="scr-small scr-muted scr-strong scr-row" style="gap: 4px; margin-bottom: 8px"><ScrIcon name="back" /> Back to the marina</a>
    <div class="scr-head" style="margin-bottom: 12px">
      <div>
        <h1 class="scr-h1">Berth board</h1>
        <p class="scr-sub">Who is arriving, and who still has nowhere to tie up. Assigning here holds the berth immediately — the dockpass service allows one vessel per berth and refuses the rest.</p>
        <p class="scr-micro scr-muted scr-num" style="font-family: monospace; margin-top: 4px">bahia-mar</p>
      </div>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between"><h2 class="scr-ov">Today</h2><span class="scr-tabs" style="padding: 2px"><button v-for="d in [7, 14, 30]" :key="d" type="button" class="scr-tab" :class="{ 'is-on': d === 7 }" style="min-height: 26px">{{ d }} days</button></span></div>
      <div class="scr-kpis" style="margin-top: 10px; grid-template-columns: repeat(5, minmax(0, 1fr))">
        <div class="scr-stat"><span class="scr-stat-label">Arriving</span><span class="scr-stat-value">6<small>vessels</small></span></div>
        <div class="scr-stat"><span class="scr-stat-label">Departing</span><span class="scr-stat-value">4<small>vessels</small></span></div>
        <div class="scr-stat"><span class="scr-stat-label">Alongside</span><span class="scr-stat-value">61<small>vessels</small></span></div>
        <div class="scr-stat"><span class="scr-stat-label">Unassigned</span><span class="scr-stat-value" style="color: var(--warn)">2<small>to place</small></span></div>
        <div class="scr-stat"><span class="scr-stat-label">Occupancy</span><span class="scr-stat-value">78<small>%</small></span><span class="scr-stat-delta">194 of 250 drawn berths held tonight</span></div>
      </div>
      <p class="scr-micro scr-muted scr-num" style="margin-top: 10px">Window 2026-10-12 → 2026-10-19; arriving, departing and alongside are the service's buckets for 2026-10-12.</p>
    </div>

    <div class="scr-section">
      <div class="scr-row" style="gap: 8px; margin-bottom: 8px; align-items: baseline"><h2 class="scr-h2">Needs a berth</h2><span class="scr-small scr-muted">2 stays are waiting for a berth.</span></div>
      <div class="scr-stack scr-stack--tight">
        <div v-for="s in queue" :key="s.name" class="scr-card" style="border-left: 4px solid var(--warn)">
          <div class="scr-row scr-row--wrap" style="gap: 8px"><h3 class="scr-h3">{{ s.name }}</h3><span class="scr-pill" data-tone="warn">Needs a berth</span><span class="scr-pill">{{ s.source }}</span><span class="scr-small scr-strong" style="margin-left: auto; color: var(--warn)">{{ s.arrives }}</span></div>
          <p class="scr-micro scr-muted scr-num" style="font-family: monospace; margin-top: 3px">{{ s.line }}</p>
          <p class="scr-small scr-muted" style="margin-top: 3px">{{ s.movement }}</p>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--primary" style="margin-top: 10px"><ScrIcon name="anchor" /> Assign a berth</button>
        </div>
      </div>
    </div>

    <div class="scr-section">
      <div class="scr-row" style="gap: 8px; margin-bottom: 8px; align-items: baseline"><h2 class="scr-h2">Every stay in the window</h2><span class="scr-small scr-muted scr-num">7 stays, by arrival</span></div>
      <div class="scr-stack scr-stack--tight">
        <div v-for="r in roster" :key="r.name" class="scr-card scr-row scr-row--wrap" :style="rowStyle(r)" style="padding: 10px 14px; gap: 8px">
          <span class="scr-strong">{{ r.name }}</span>
          <span class="scr-pill" :data-tone="r.tone">{{ r.state }}</span>
          <span class="scr-micro scr-muted scr-num" style="font-family: monospace">{{ r.line }}</span>
          <span class="scr-spacer"></span>
          <span v-if="r.berth" class="scr-strong scr-num" style="font-family: monospace">{{ r.berth }}</span>
          <span v-else-if="r.reason" class="scr-micro scr-muted">{{ r.reason }}</span>
          <button v-else type="button" class="scr-btn scr-btn--sm">Assign a berth</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const queue = [
  { name: 'Sea Fever (Alex Chen)', source: 'DockPass', arrives: 'Arrives today', line: '2 nights · 12–14 Oct · confirmed · C-dock guest slip', movement: 'Underway from Miami, ETA 15:40 · 38 ft, draft 5.1 ft' },
  { name: 'Blue Heron (Priya Nair)', source: 'Rate card', arrives: 'Arrives tomorrow', line: '5 nights · 13–18 Oct · confirmed · rate card', movement: 'Filed departure from Palm Beach, 13 Oct 08:00 · 46 ft, draft 4.9 ft' },
]
type Row = { name: string; state: string; tone: string; line: string; berth?: string; reason?: string }
const roster: Row[] = [
  { name: 'Wanderer (Sam Miller)', state: 'Berthed', tone: 'safe', line: '3 nights · 12–15 Oct · checked in', berth: 'C-14' },
  { name: 'Sea Fever (Alex Chen)', state: 'Needs a berth', tone: 'warn', line: '2 nights · 12–14 Oct · confirmed' },
  { name: 'Halcyon (Nina Rossi)', state: 'Berthed', tone: 'safe', line: '1 night · 12–13 Oct · confirmed', berth: 'C-16' },
  { name: 'Blue Heron (Priya Nair)', state: 'Needs a berth', tone: 'warn', line: '5 nights · 13–18 Oct · confirmed' },
  { name: 'Osprey (Dev Patel)', state: 'Berthed', tone: 'safe', line: '4 nights · 14–18 Oct · confirmed', berth: 'A-07' },
  { name: 'Marlin III (Luis Ferreira)', state: 'Cannot be berthed', tone: 'offline', line: '2 nights · 16–18 Oct · pending', reason: 'Stay is not confirmed — the guest has not paid.' },
  { name: 'Tern (Maria Ortega)', state: 'Berthed', tone: 'safe', line: '3 nights · 17–20 Oct · confirmed', berth: 'B-11' },
]
const rowStyle = (r: Row) => r.reason ? 'border-style: dashed; background: var(--ink-50)' : r.berth ? '' : 'border-left: 4px solid var(--warn)'
</script>
