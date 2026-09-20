<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Vessels</h1>
        <p class="scr-sub">The registry, corrected. Draft feeds the safe-depth margin on every route planned for a hull — a draft that is wrong low is a passage promised over a bar the vessel will touch.</p>
      </div>
    </div>

    <div class="scr-toolbar scr-row--wrap">
      <input class="scr-input scr-input--search" placeholder="Name or MMSI…" aria-label="Search vessels by name or MMSI" style="max-width: 260px" />
      <button type="button" class="scr-chip">Named <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Corrections <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip is-on">Claim: Claimed only <span aria-hidden="true">⌄</span></button>
      <span class="scr-micro scr-muted" style="margin-left: auto">AIS feed live · 184 contacts in the last 20 min</span>
    </div>

    <div class="scr-split" style="grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr)">
      <div>
        <table class="scr-table" aria-label="The vessel registry">
          <thead><tr><th>Vessel</th><th>Identity</th><th>Live</th><th>Claim</th><th>Corrections</th><th>Updated</th></tr></thead>
          <tbody>
            <tr v-for="v in vessels" :key="v.id" :class="{ 'is-selected': v.id === 'wanderer' }">
              <td><span :class="v.name ? 'scr-strong' : 'scr-muted'" :style="v.name ? '' : 'font-style: italic'">{{ v.name ?? v.mmsi }}</span></td>
              <td class="scr-micro scr-muted scr-num" style="font-family: monospace; white-space: nowrap">{{ v.mmsi ?? '—' }}</td>
              <td><span v-if="v.live" class="scr-pill" data-tone="safe">{{ v.live }}</span><span v-else class="scr-muted">—</span></td>
              <td><span v-if="v.claimed" class="scr-pill" data-tone="safe">Claimed</span><span v-else class="scr-muted">—</span></td>
              <td><span v-if="v.fixes" class="scr-pill" data-tone="accent">{{ v.fixes }}</span><span v-else class="scr-muted">—</span></td>
              <td class="scr-micro scr-muted scr-num">{{ v.updated }}</td>
            </tr>
          </tbody>
        </table>
        <div class="scr-row scr-row--between" style="margin-top: 8px">
          <span class="scr-micro scr-muted">Showing 1–7 of 1,532</span>
          <span class="scr-row" style="gap: 6px"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></span>
        </div>
      </div>

      <aside class="scr-card scr-card--flush">
        <div class="scr-row scr-row--between" style="padding: 12px 14px; border-bottom: 1px solid var(--ink-200)">
          <div><h2 class="scr-h3">Wanderer</h2><p class="scr-micro scr-muted">MMSI 367 123 456 · claimed by wanderer · updated 4 min ago</p></div>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--icon" aria-label="Close"><ScrIcon name="x" /></button>
        </div>
        <div class="scr-stack" style="padding: 12px 14px">
          <div v-for="f in fields" :key="f.label" class="scr-field">
            <label class="scr-ov">{{ f.label }} <span v-if="f.unit" style="text-transform: none">({{ f.unit }})</span></label>
            <div class="scr-row" style="gap: 6px">
              <input class="scr-input" :value="f.value" placeholder="empty = explicitly unknown" style="min-height: 32px; padding: 4px 9px" />
              <button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Correct</button>
              <button v-if="f.applied" type="button" class="scr-btn scr-btn--sm">Revert</button>
            </div>
            <p v-if="f.applied" class="scr-hint">{{ f.applied }}</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const vessels: { id: string; name: string | null; mmsi: string | null; live: string | null; claimed: boolean; fixes: string | null; updated: string }[] = [
  { id: 'wanderer', name: 'Wanderer', mmsi: '367 123 456', live: 'Live · 4 min ago', claimed: true, fixes: 'draft_m', updated: '4 min ago' },
  { id: 'sea-fever', name: 'Sea Fever', mmsi: '367 884 210', live: 'Live · just heard', claimed: true, fixes: null, updated: '1 min ago' },
  { id: 'halcyon', name: 'Halcyon', mmsi: '368 021 775', live: null, claimed: true, fixes: 'loa_m, beam_m', updated: '2 d ago' },
  { id: 'blue-heron', name: 'Blue Heron', mmsi: null, live: null, claimed: true, fixes: null, updated: '6 Oct 2026' },
  { id: 'osprey', name: 'Osprey', mmsi: '367 550 903', live: 'Live · 12 min ago', claimed: false, fixes: null, updated: '12 min ago' },
  { id: 'mmsi-368-190-441', name: null, mmsi: '368 190 441', live: 'Live · 2 min ago', claimed: false, fixes: 'name', updated: '2 min ago' },
  { id: 'marlin-iii', name: 'Marlin III', mmsi: '367 702 188', live: null, claimed: true, fixes: null, updated: '28 Sep 2026' },
]
const fields = [
  { label: 'Name', unit: null, value: 'Wanderer', applied: null },
  { label: 'Length overall', unit: 'm', value: '12.8', applied: null },
  { label: 'Beam', unit: 'm', value: '4.1', applied: null },
  { label: 'Draft', unit: 'm', value: '1.40', applied: 'Corrected to 1.40 from 1.22 (AIS static) by ops@waterwayz on 9 Oct 2026' },
]
</script>
