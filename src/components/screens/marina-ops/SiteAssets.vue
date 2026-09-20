<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Site assets</h1>
        <p class="scr-sub">Pontoons, pedestals, pumps and safety equipment as maintainable things.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">212 assets</span>
        <button type="button" class="scr-btn scr-btn--primary">Add an asset</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Pedestals</span><span class="scr-stat-value">164</span><span class="scr-stat-delta" data-tone="warn">2 faulted</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Pontoons and fingers</span><span class="scr-stat-value">38</span><span class="scr-stat-delta" data-tone="danger">1 unsafe</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Pumps</span><span class="scr-stat-value">4</span><span class="scr-stat-delta">1 on the D cart</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Safety equipment</span><span class="scr-stat-value">6</span><span class="scr-stat-delta" data-tone="warn">2 inspections due</span></div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" style="max-width: 300px" placeholder="Asset, tag or location" aria-label="Search assets" />
      <div class="scr-chips"><span v-for="c in chips" :key="c" class="scr-chip" :class="{ 'is-on': chip === c }" @click="chip = c">{{ c }}</span></div>
    </div>

    <table class="scr-table">
      <thead><tr><th>Asset</th><th>Location</th><th>Condition</th><th>Last inspected</th><th>Next due</th><th>Open work</th></tr></thead>
      <tbody>
        <tr v-for="a in shown" :key="a.tag">
          <td><span class="scr-strong">{{ a.name }}</span><span class="scr-item-sub scr-num">{{ a.tag }} · {{ a.kind }}</span></td>
          <td class="scr-muted">{{ a.where }}</td>
          <td><span class="scr-pill" :data-tone="a.tone">{{ a.condition }}</span></td>
          <td class="scr-num scr-muted">{{ a.last }}</td>
          <td class="scr-num" :class="a.dueSoon ? 'scr-accent' : 'scr-muted'">{{ a.next }}</td>
          <td class="scr-muted">{{ a.work || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const chips = ['All', 'Pedestals', 'Pontoons', 'Pumps', 'Safety']
const chip = ref('All')
const rows = [
  { name: 'Pedestal C-14', tag: 'PED-C14', kind: 'Pedestals', where: 'C dock, finger 14', condition: 'Faulted', tone: 'danger', last: '3 Oct 2026', next: 'Today', dueSoon: true, work: 'WO-1042 · shore power' },
  { name: 'Pedestal C-12', tag: 'PED-C12', kind: 'Pedestals', where: 'C dock, finger 12', condition: 'Watch', tone: 'warn', last: '29 Sep 2026', next: '29 Oct 2026', dueSoon: false, work: '' },
  { name: 'B dock finger 3', tag: 'PON-B03', kind: 'Pontoons', where: 'B dock', condition: 'Unsafe', tone: 'danger', last: '4 Oct 2026', next: 'Today', dueSoon: true, work: 'WO-1044 · anti-slip strip' },
  { name: 'Pump-out cart D', tag: 'PMP-D1', kind: 'Pumps', where: 'D dock head', condition: 'Degraded', tone: 'warn', last: '2 Oct 2026', next: '9 Oct 2026', dueSoon: true, work: 'WO-1039 · coupling' },
  { name: 'Fuel dock spill kit', tag: 'SAF-FD1', kind: 'Safety', where: 'Fuel dock', condition: 'Good', tone: 'safe', last: '4 Oct 2026', next: '4 Nov 2026', dueSoon: false, work: '' },
  { name: 'Fire extinguisher A-head', tag: 'SAF-A1', kind: 'Safety', where: 'A dock T-head', condition: 'Inspection due', tone: 'warn', last: '3 Apr 2026', next: '3 Oct 2026', dueSoon: true, work: '' },
  { name: 'Life ring C-head', tag: 'SAF-C1', kind: 'Safety', where: 'C dock head', condition: 'Good', tone: 'safe', last: '15 Sep 2026', next: '15 Dec 2026', dueSoon: false, work: '' },
  { name: 'A dock main pontoon', tag: 'PON-A00', kind: 'Pontoons', where: 'A dock', condition: 'Good', tone: 'safe', last: '20 Aug 2026', next: '20 Feb 2027', dueSoon: false, work: '' },
]
const shown = computed(() => (chip.value === 'All' ? rows : rows.filter((r) => r.kind === chip.value)))
</script>
