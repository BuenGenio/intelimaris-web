<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Incident log</h1>
        <p class="scr-sub">A vessel hit a piling on D dock at 14:20 and it needs writing down before anyone forgets.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill">{{ openOnly ? '3 open' : '5 on record' }}</span>
        <button type="button" class="scr-btn scr-btn--primary" @click="filing = !filing">File an incident</button>
        <button type="button" class="scr-btn scr-btn--ghost">Berth map</button>
      </div>
    </div>

    <div v-if="filing" class="scr-card" style="margin-bottom: 14px">
      <div class="scr-row scr-row--between"><p class="scr-card-title">File an incident</p><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm" @click="filing = false">Cancel</button></div>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">One form. When, where, what kind, how bad, and what happened.</p>
      <div class="scr-grid-2">
        <div class="scr-field"><span class="scr-label">Kind</span><select class="scr-select"><option>Collision</option><option>Spill</option><option>Injury</option><option>Theft</option><option>Fire</option></select></div>
        <div class="scr-field"><span class="scr-label">Severity</span><select class="scr-select"><option>Minor</option><option>Moderate</option><option>Major</option></select></div>
        <div class="scr-field"><span class="scr-label">When</span><input class="scr-input scr-num" value="2026-10-04 14:20" /></div>
        <div class="scr-field"><span class="scr-label">Berth</span><select class="scr-select"><option>Not at a berth</option><option>C-14</option><option selected>D-07</option><option>Fuel dock</option></select></div>
        <div class="scr-field"><span class="scr-label">Vessel</span><input class="scr-input" placeholder="As named, if one was involved" /></div>
        <div class="scr-field"><span class="scr-label">Summary</span><input class="scr-input" placeholder="Vessel contacted the piling on approach" /></div>
      </div>
      <div class="scr-field" style="margin-top: 10px"><span class="scr-label">What happened</span><textarea class="scr-textarea" placeholder="No injuries; gelcoat damage to the starboard quarter. Owner informed."></textarea></div>
      <div class="scr-row" style="margin-top: 12px"><button type="button" class="scr-btn scr-btn--primary">File incident</button><span class="scr-micro scr-muted">A one-line summary is needed.</span></div>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between">
        <p class="scr-card-title">Log</p>
        <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm" @click="openOnly = !openOnly">{{ openOnly ? 'Show resolved too' : 'Open only' }}</button>
      </div>
      <p class="scr-sub scr-small" style="margin-bottom: 6px">Newest first: when, where, who filed it, what happened, open or resolved. A resolved incident stays on the record.</p>
      <ul>
        <li v-for="i in shown" :key="i.summary" class="inc-row">
          <div class="scr-row scr-row--wrap">
            <span class="scr-pill" :data-tone="i.tone">{{ i.severity }}</span>
            <span class="scr-pill">{{ i.kind }}</span>
            <span class="scr-strong">{{ i.summary }}</span>
            <span class="scr-pill" :data-tone="i.open ? 'warn' : 'safe'">{{ i.open ? 'Open' : 'Resolved' }}</span>
            <span v-if="i.open" class="scr-row" style="margin-left: auto; gap: 4px">
              <button type="button" class="scr-btn scr-btn--sm">Resolve</button>
              <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Delete</button>
            </span>
          </div>
          <p class="scr-small scr-muted">{{ i.when }}<template v-if="i.berth"> · berth {{ i.berth }}</template><template v-if="i.vessel"> · {{ i.vessel }}</template> · filed by {{ i.by }}</p>
          <p v-if="i.detail">{{ i.detail }}</p>
          <p v-if="i.resolution" class="scr-small scr-muted"><span class="scr-strong">Resolved</span> {{ i.resolvedAt }}: {{ i.resolution }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const filing = ref(false)
const openOnly = ref(true)
const rows = [
  { severity: 'Moderate', tone: 'warn', kind: 'Collision', summary: 'Vessel contacted the piling on approach', open: true, when: '4 Oct 2026, 14:20', berth: 'D-07', vessel: 'Sea Change', by: 'Rosa Delgado', detail: 'No injuries; gelcoat damage to the starboard quarter. Owner informed and photos on file.', resolution: '', resolvedAt: '' },
  { severity: 'Minor', tone: 'low', kind: 'Spill', summary: 'Sheen at the fuel dock during a fill', open: true, when: '4 Oct 2026, 09:05', berth: 'Fuel dock', vessel: 'Wanderer', by: 'Luis Ortega', detail: 'Absorbent pads deployed within two minutes; under a litre. Coast Guard not notified below threshold.', resolution: '', resolvedAt: '' },
  { severity: 'Major', tone: 'danger', kind: 'Injury', summary: 'Contractor slipped on B dock finger', open: true, when: '3 Oct 2026, 16:40', berth: 'B-03', vessel: '', by: 'Rosa Delgado', detail: 'Ankle sprain; first aid given, transport declined. Anti-slip strip missing on the second finger.', resolution: '', resolvedAt: '' },
  { severity: 'Minor', tone: 'low', kind: 'Theft', summary: 'Dinghy outboard missing overnight', open: false, when: '1 Oct 2026, 07:10', berth: 'C-14', vessel: 'Wanderer', by: 'Sam Miller', detail: 'Reported by the owner at the office. Camera on C dock reviewed.', resolution: 'Police report filed (FLPD 26-0410); owner claiming on insurance; gate code rotated.', resolvedAt: '1 Oct 2026, 15:30' },
  { severity: 'Moderate', tone: 'warn', kind: 'Power', summary: 'Pedestal C-12 tripped twice in the night', open: false, when: '29 Sep 2026, 02:15', berth: 'C-12', vessel: '', by: 'Night desk', detail: '', resolution: 'Shore-power cord on the guest vessel replaced; pedestal breaker tested clean.', resolvedAt: '29 Sep 2026, 11:00' },
]
const shown = computed(() => (openOnly.value ? rows.filter((r) => r.open) : rows))
</script>

<style scoped>
.inc-row { display: grid; gap: 5px; padding: 10px 0; border-top: 1px solid var(--ink-100); }
.inc-row:first-child { border-top: 0; }
</style>
