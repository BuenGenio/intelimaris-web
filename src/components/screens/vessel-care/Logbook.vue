<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Logbook</h1>
        <p class="scr-sub">What this vessel has done, and how many hours are on the engines.</p>
      </div>
      <div class="scr-row"><span class="scr-pill scr-pill--bare">Sample</span><span class="scr-pill scr-pill--bare">Scaffold</span></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Engine hours</span><span class="scr-stat-value">1,284<small>h</small></span><span class="scr-stat-delta">from PWTS-04 · 4 min ago</span></div>
      <div class="scr-stat"><span class="scr-stat-label">This season</span><span class="scr-stat-value">312<small>NM</small></span><span class="scr-stat-delta">stored metres, shown NM</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Nights aboard</span><span class="scr-stat-value">9<small>nights</small></span><span class="scr-stat-delta">since 1 Oct</span></div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Timeline</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">Newest first. The tag says which source: Logged · Passage · Sensor.</p>
      <div v-for="e in entries" :key="e.title" class="log-row">
        <span class="scr-micro scr-muted scr-num">{{ e.when }}</span>
        <span class="scr-pill" :data-tone="e.source === 'Sensor' ? 'accent' : e.source === 'Passage' ? 'info' : ''">{{ e.source }}</span>
        <div style="min-width: 0"><span class="scr-item-title">{{ e.title }}</span><span class="scr-item-sub">{{ e.line }}</span></div>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 10px">A conflict is stated, not resolved: “You logged 1,290 h; the unit reports 1,284 h. Both are kept.”</p>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Add entry</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">Date, title, note, optional engine hours. Offline, it writes locally and says it is queued.</p>
      <div class="scr-stack scr-stack--tight">
        <label class="scr-field"><span class="scr-label">Title</span><input class="scr-input" placeholder="Topped up the coolant" /></label>
        <div class="scr-grid-2">
          <label class="scr-field"><span class="scr-label">Date</span><input class="scr-input" value="14 Oct 2026" readonly /></label>
          <label class="scr-field"><span class="scr-label">Engine hours</span><input class="scr-input scr-num" placeholder="—" /></label>
        </div>
      </div>
    </div>

    <div class="scr-bar"><button class="scr-btn scr-btn--primary scr-btn--block">Add entry</button></div>
  </div>
</template>

<script setup lang="ts">
const entries = [
  { when: '13 Oct', title: 'Bahia Mar → Isle of Venice dock', source: 'Passage', line: '3.1 NM · 0 h 41 m · logged from the passage' },
  { when: '12 Oct', title: 'Engine hours 1,284 h', source: 'Sensor', line: 'from PWTS-04 · counter' },
  { when: '11 Oct', title: 'Changed the raw water impeller', source: 'Logged', line: 'Old one had two vanes gone.' },
  { when: '9 Oct', title: 'Haulover Inlet → Bahia Mar', source: 'Passage', line: '12.4 NM · 1 h 32 m · logged from the passage' },
  { when: '4 Oct', title: 'Fuel: 38 gal at Bahia Mar', source: 'Logged', line: '$182.40 · 4.80/gal' },
  { when: '2 Oct', title: 'PWTS-01 claimed', source: 'Sensor', line: 'first reading 14:31' },
]
</script>

<style scoped>
.log-row { display: grid; grid-template-columns: 44px auto minmax(0, 1fr); gap: 10px; align-items: start; padding: 9px 0; border-top: 1px solid var(--ink-100); }
.log-row .scr-micro { padding-top: 3px; }
</style>
