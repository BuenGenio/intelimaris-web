<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Residents</h1>
        <p class="scr-sub">Who lives here, on which berth, for how long, and when they are away.</p>
      </div>
      <div class="scr-row"><button class="scr-btn scr-btn--primary">Add a resident</button><button class="scr-btn scr-btn--ghost">Dashboard</button></div>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Terms</h2>
      <p class="scr-sub scr-small">96 terms on record. A berth with a resident is never sold; the occupancy page reads it as theirs.</p>
      <div class="scr-divider"></div>
      <div v-for="t in rows" :key="t.berth" class="res-row">
        <div class="scr-row scr-row--wrap">
          <span class="scr-num scr-strong">{{ t.berth }}</span>
          <span class="scr-pill scr-pill--bare">{{ t.kind }}</span>
          <div style="min-width: 0">
            <span class="scr-item-title" style="color: #4274bb">{{ t.vessel }}</span>
            <span class="scr-item-sub">{{ t.term }} · {{ t.contact }} · {{ t.loa }}</span>
          </div>
          <span class="scr-spacer"></span>
          <div class="scr-row">
            <button class="scr-btn scr-btn--ghost scr-btn--sm">Edit</button>
            <button class="scr-btn scr-btn--ghost scr-btn--sm">Add absence</button>
            <button class="scr-btn scr-btn--ghost scr-btn--sm">Agreement</button>
            <button class="scr-btn scr-btn--ghost scr-btn--sm">End term</button>
          </div>
        </div>
        <div v-for="a in t.absences" :key="a.when" class="scr-row scr-row--wrap scr-small scr-muted" style="margin-top: 6px; padding-left: 4px">
          <span>Away {{ a.when }}<span v-if="a.note"> · {{ a.note }}</span></span>
          <span class="scr-pill" :data-tone="a.tone">{{ a.consent }}</span>
          <span class="scr-micro">{{ a.line }}</span>
          <a v-if="a.consent !== 'Resale agreed'" href="#" @click.prevent>they agreed</a>
          <a v-if="a.consent !== 'Declined'" href="#" @click.prevent>they said no</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { berth: 'A-12', kind: 'Resident', vessel: 'Serenity', term: '2026-01-01 → 2026-12-31', contact: 'K. Brandt · +1 954 555 0107', loa: '52 ft LOA', absences: [
    { when: '2026-10-20 → 2026-11-05', note: 'Bahamas', consent: 'Resale agreed', tone: 'safe', line: 'the berth may be let · 50% to the resident' },
  ] },
  { berth: 'B-2', kind: 'Resident', vessel: 'Galatea', term: '2026-04-01 → 2027-03-31', contact: 'M. Rossi', loa: '44 ft LOA', absences: [] },
  { berth: 'C-11', kind: 'Liveaboard', vessel: 'Windward', term: '2025-11-01 → open-ended', contact: 'T. Nakamura · +1 305 555 0166', loa: '38 ft LOA', absences: [
    { when: '2026-10-16 → 2026-10-19', note: '', consent: 'Not asked', tone: 'warn', line: 'the berth stays theirs until they say otherwise' },
  ] },
  { berth: 'C-14', kind: 'Resident', vessel: 'Wanderer', term: '2026-11-01 → 2027-04-30', contact: 'Sam Miller · sam@example.com', loa: '42 ft LOA', absences: [] },
  { berth: 'D-5', kind: 'Resident', vessel: 'Osprey II', term: '2026-06-01 → 2026-11-30', contact: 'L. Ferreira', loa: '60 ft LOA', absences: [
    { when: '2026-10-08 → 2026-10-30', note: 'yard period at Lauderdale Marine Service', consent: 'Declined', tone: undefined, line: 'the berth stays theirs' },
  ] },
  { berth: 'E-1', kind: 'Commercial', vessel: 'Reef Runner', term: '2026-01-01 → 2026-12-31', contact: 'Coconuts charters', loa: '34 ft LOA', absences: [] },
]
</script>

<style scoped>
.res-row { padding: 10px 0; }
.res-row + .res-row { border-top: 1px solid var(--ink-100); }
</style>
