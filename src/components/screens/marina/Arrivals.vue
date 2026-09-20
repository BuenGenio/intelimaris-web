<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Arrivals</h1>
        <p class="scr-sub">What do I have to do this morning? The board is the product.</p>
      </div>
      <div class="scr-row">
        <label class="scr-field"><span class="scr-label">Day</span><input class="scr-input" type="date" value="2026-10-14" readonly /></label>
        <button class="scr-btn">Dashboard</button>
        <button class="scr-btn scr-btn--ghost">Short stay</button>
      </div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Arriving</span><span class="scr-stat-value scr-accent">6</span><span class="scr-stat-delta">today</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Departing</span><span class="scr-stat-value">4</span><span class="scr-stat-delta">incl. overstayers</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Alongside</span><span class="scr-stat-value">138</span><span class="scr-stat-delta" data-tone="safe">in the basin now</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Without a berth</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="warn">confirmed, nothing held</span></div>
    </div>

    <div v-for="c in columns" :key="c.title" class="scr-section scr-card">
      <h2 class="scr-card-title">{{ c.title }}</h2>
      <p class="scr-sub scr-small">{{ c.description }}</p>
      <div class="scr-divider"></div>
      <p v-if="c.rows.length === 0" class="scr-muted">{{ c.empty }}</p>
      <div v-for="r in c.rows" :key="r.name" class="scr-row scr-row--between arr-row">
        <div style="min-width: 0">
          <span class="scr-item-title">{{ r.name }} <span class="scr-pill" :data-tone="r.tone">{{ r.pill }}</span></span>
          <span class="scr-item-sub">{{ r.dates }} <span v-if="r.brief" class="scr-num scr-strong"> · {{ r.brief }}</span><span v-else class="scr-muted"> · {{ r.note }}</span> · {{ r.source }}</span>
        </div>
        <div class="scr-row">
          <button v-for="b in r.actions" :key="b.label" class="scr-btn scr-btn--sm" :class="b.kind === 'primary' ? 'scr-btn--primary' : b.kind === 'ghost' ? 'scr-btn--ghost' : ''">{{ b.label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Action = { label: string; kind?: 'primary' | 'ghost' }
type Row = { name: string; pill: string; tone?: string; dates: string; brief?: string; note?: string; source: string; actions: Action[] }
const columns: { title: string; description: string; empty: string; rows: Row[] }[] = [
  {
    title: 'Arriving', description: 'Check-in is this day and she is not alongside yet.', empty: 'No arrivals on this day.',
    rows: [
      { name: 'Wanderer · Sam Miller', pill: 'Confirmed', tone: 'info', dates: 'Today – 17 Oct · 3 nights', brief: 'C-14 · enter 240° stern-in · starboard-to · 7.5 ft MLLW', source: 'via WaterWayz', actions: [{ label: 'Arrived', kind: 'primary' }, { label: 'Move berth' }, { label: 'Release', kind: 'ghost' }] },
      { name: 'Blue Heron', pill: 'Confirmed', tone: 'info', dates: 'Today – 15 Oct · 1 night', brief: 'B-7 · enter 180° bow-in · port-to · 6.9 ft MLLW', source: 'via VHF', actions: [{ label: 'Arrived', kind: 'primary' }, { label: 'Move berth' }] },
      { name: 'Sea Change', pill: 'Confirmed', tone: 'info', dates: 'Today – 20 Oct · 6 nights', note: 'no berth assigned yet', source: 'via marina site', actions: [{ label: 'Arrived', kind: 'primary' }, { label: 'Assign a berth' }] },
      { name: 'Kestrel', pill: 'Requested', tone: 'warn', dates: 'Today – 16 Oct · 2 nights', note: 'no berth can be held yet', source: 'via WaterWayz', actions: [{ label: 'Confirm', kind: 'primary' }, { label: 'Decline' }] },
    ],
  },
  {
    title: 'Without a berth', description: 'Confirmed for this day, nothing held. The to-do list.', empty: 'Everyone confirmed for this day has a berth.',
    rows: [
      { name: 'Sea Change', pill: 'Confirmed', tone: 'info', dates: 'Today – 20 Oct · 6 nights', note: 'no berth assigned yet', source: 'via marina site', actions: [{ label: 'Assign a berth' }] },
      { name: 'Osprey', pill: 'Confirmed', tone: 'info', dates: 'Today – 15 Oct · 1 night', note: 'no berth assigned yet', source: 'via VHF', actions: [{ label: 'Assign a berth' }] },
    ],
  },
  {
    title: 'Alongside', description: 'Arrived, not departed, whatever the dates say.', empty: 'Nobody is alongside.',
    rows: [
      { name: 'Halcyon', pill: 'Alongside', tone: 'safe', dates: '11–14 Oct · 3 nights · arrived 11 Oct 15:20', brief: 'A-3 · enter 090° bow-in · port-to · 8.2 ft MLLW', source: 'via WaterWayz', actions: [{ label: 'Departed' }, { label: 'Move berth' }] },
      { name: 'Tidewater', pill: 'Alongside', tone: 'safe', dates: '9–12 Oct · overstaying 2 nights', brief: 'D-2 · enter 270° stern-in · starboard-to · 9.0 ft MLLW', source: 'via VHF', actions: [{ label: 'Departed' }] },
    ],
  },
  {
    title: 'Departing', description: 'Check-out is this day, or she is past it and still here.', empty: 'No departures on this day.',
    rows: [
      { name: 'Halcyon', pill: 'Alongside', tone: 'safe', dates: '11–14 Oct · out today', brief: 'A-3', source: 'via WaterWayz', actions: [{ label: 'Departed' }] },
      { name: 'Tidewater', pill: 'Alongside', tone: 'safe', dates: '9–12 Oct · 2 nights past check-out', brief: 'D-2', source: 'via VHF', actions: [{ label: 'Departed' }] },
    ],
  },
]
</script>

<style scoped>
.arr-row { padding: 9px 0; }
.arr-row + .arr-row { border-top: 1px solid var(--ink-100); }
</style>
