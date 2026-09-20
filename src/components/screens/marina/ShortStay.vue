<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Short stay</h1>
        <p class="scr-sub">Transient nights sold against the rate card: requests, confirmations and what has already cleared. Walk-ins are recorded here.</p>
      </div>
      <div class="scr-row"><button class="scr-btn scr-btn--primary">Walk-in</button><button class="scr-btn">Arrivals today</button><button class="scr-btn scr-btn--ghost">Dashboard</button></div>
    </div>

    <div v-for="g in groups" :key="g.title" class="scr-card ss-group">
      <h2 class="scr-card-title">{{ g.title }}</h2>
      <p class="scr-sub scr-small">{{ g.description }}</p>
      <div class="scr-divider"></div>
      <p v-if="g.competing" class="scr-small scr-muted" style="margin-bottom: 4px">{{ g.competing }}</p>
      <div v-for="r in g.rows" :key="r.name" class="scr-row scr-row--between ss-row">
        <div style="min-width: 0">
          <span class="scr-item-title">{{ r.name }} <span class="scr-pill" :data-tone="r.tone">{{ r.pill }}</span> <span class="scr-muted scr-num" style="font-weight: 400">{{ r.quote }}</span></span>
          <span class="scr-item-sub">{{ r.line }}</span>
        </div>
        <div class="scr-row">
          <button v-for="b in r.actions" :key="b" class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': b === 'Confirm' || b === 'Arrived', 'scr-btn--ghost': b === 'Cancel' || b === 'Release' }">{{ b }}</button>
        </div>
      </div>
    </div>
    <p class="scr-micro scr-muted">Window 2026-10-07 → 2026-12-13. Vessels alongside are listed whatever their dates say.</p>
  </div>
</template>

<script setup lang="ts">
const groups = [
  {
    title: 'Waiting on you', description: 'Nobody gets a berth until someone here says yes, or no.', competing: '2 requests ask for the same nights; whichever you confirm takes them.',
    rows: [
      { name: 'Wanderer · Sam Miller', pill: 'Requested', tone: 'warn', quote: '$294.00', line: '14–17 Oct · 3 nights · 42 ft Sabre · draft 4.6 ft · via WaterWayz', actions: ['Confirm', 'Decline'] },
      { name: 'Kestrel', pill: 'Requested', tone: 'warn', quote: '$168.00', line: '14–16 Oct · 2 nights · 31 ft · no berth can be held yet · via WaterWayz', actions: ['Confirm', 'Decline'] },
      { name: 'Meridian', pill: 'Requested', tone: 'warn', quote: '$1,140.00', line: '22–26 Oct · 4 nights · 62 ft · via marina site', actions: ['Confirm', 'Decline'] },
    ],
  },
  {
    title: 'Confirmed', description: 'Booked. Assign a berth before she arrives; arrive and depart her at the dock.', competing: '',
    rows: [
      { name: 'Blue Heron', pill: 'Confirmed', tone: 'info', quote: '$92.00', line: '14–15 Oct · 1 night · B-7 · enter 180° bow-in · port-to · 6.9 ft MLLW · via VHF', actions: ['Arrived', 'Move berth', 'Release', 'Cancel'] },
      { name: 'Sea Change', pill: 'Confirmed', tone: 'info', quote: '$780.00', line: '14–20 Oct · 6 nights · no berth assigned yet · via marina site', actions: ['Arrived', 'Assign a berth', 'Cancel'] },
      { name: 'Halcyon', pill: 'Alongside', tone: 'safe', quote: '$372.00', line: '11–14 Oct · 3 nights · A-3 · enter 090° bow-in · port-to · 8.2 ft MLLW · via WaterWayz', actions: ['Departed', 'Move berth'] },
      { name: 'Andiamo', pill: 'Confirmed', tone: 'info', quote: '$1,960.00', line: '21–28 Oct · 7 nights · C-2 · enter 240° stern-in · starboard-to · 7.5 ft MLLW · via WaterWayz', actions: ['Move berth', 'Release', 'Cancel'] },
    ],
  },
  {
    title: 'Done', description: 'Completed, declined, cancelled or expired. On record.', competing: '',
    rows: [
      { name: 'Osprey', pill: 'Completed', tone: 'offline', quote: '$184.00', line: '8–10 Oct · 2 nights · B-4 · via VHF', actions: [] },
      { name: 'Northern Light', pill: 'Declined', tone: 'danger', quote: '$2,300.00', line: '9–14 Oct · 5 nights · 84 ft · no berth in this marina takes this vessel', actions: [] },
      { name: 'Dulcinea', pill: 'Cancelled', tone: 'offline', quote: '$276.00', line: '10–13 Oct · 3 nights · cancelled by the guest 8 Oct', actions: [] },
    ],
  },
]
</script>

<style scoped>
.ss-group { margin-bottom: 12px; }
.ss-row { padding: 9px 0; }
.ss-row + .ss-row { border-top: 1px solid var(--ink-100); }
</style>
