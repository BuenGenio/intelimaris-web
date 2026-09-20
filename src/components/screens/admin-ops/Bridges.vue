<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Bridges</h1>
        <p class="scr-sub">Clearances, corrected. A bridge with no closed clearance is one the engine cannot route a vessel under — it refuses the passage, or promises something nobody measured.</p>
      </div>
    </div>

    <div class="scr-toolbar">
      <span class="scr-input scr-input--search br-search scr-muted">Name or slug — a Coast Guard notice names the bridge</span>
      <span class="scr-chip">Kind · Any <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Corridor · Any corridor <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Clearance · Any <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Corrections · Either <span aria-hidden="true">⌄</span></span>
    </div>

    <div class="scr-alert br-push" data-tone="warn"><ScrIcon name="chart" /><span>2 of 6 still have no clearance</span></div>

    <div class="scr-split br-split">
      <table class="scr-table">
        <thead><tr><th>Bridge</th><th>Corridor</th><th>Kind</th><th>Closed clearance</th><th>Source</th></tr></thead>
        <tbody>
          <tr v-for="b in bridges" :key="b.slug" :class="{ 'is-selected': b.slug === open }" @click="open = b.slug">
            <td><span :class="b.name ? 'scr-strong' : 'br-unnamed'">{{ b.name || b.slug }}</span> <span class="scr-micro scr-muted scr-num">{{ b.slug }}</span></td>
            <td class="scr-small scr-muted"><span class="scr-num">{{ b.corridor }}</span> <span class="scr-num">{{ b.chainage }} m</span></td>
            <td class="scr-muted">{{ b.kind }}<span v-if="b.schedule" class="scr-micro"> CFR-117</span></td>
            <td :class="b.clearance ? 'scr-num' : 'br-unknown'">{{ b.clearance || 'Unknown' }}</td>
            <td><span class="scr-pill" :data-tone="b.sourceTone">{{ b.source }}</span></td>
          </tr>
        </tbody>
      </table>

      <aside class="scr-card">
        <div class="scr-row scr-row--between">
          <div><h2 class="scr-h3">{{ opened.name || opened.slug }}</h2><p class="scr-micro scr-muted scr-num">{{ opened.slug }} · {{ opened.corridor }}</p></div>
          <button type="button" class="scr-btn scr-btn--icon scr-btn--sm" aria-label="Close"><ScrIcon name="x" /></button>
        </div>
        <p class="br-gap" :class="opened.clearance ? '' : 'br-unknown'">Closed clearance: {{ opened.clearance || 'Unknown' }}<template v-if="!opened.clearance"> — the engine cannot route a vessel under this bridge</template></p>
        <div class="scr-stack br-gap">
          <div v-for="f in fields" :key="f.label" class="scr-field">
            <span class="scr-ov">{{ f.label }}<span v-if="f.unit" class="br-unit"> ({{ f.unit }})</span></span>
            <div class="scr-row"><span class="scr-input br-value" :class="{ 'scr-muted': !f.value(opened) }">{{ f.value(opened) || 'empty = explicitly unknown' }}</span><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Correct</button><button v-if="f.corrected(opened)" type="button" class="scr-btn scr-btn--sm">Revert</button></div>
            <span v-if="f.corrected(opened)" class="scr-hint">Corrected (curated) · 10/8/2026, 3:22 PM</span>
          </div>
        </div>
      </aside>
    </div>

    <div class="scr-row scr-row--between scr-section">
      <span class="scr-small scr-muted">Showing 1–6 of 41</span>
      <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

type Bridge = { slug: string; name: string; corridor: string; chainage: string; kind: string; schedule: boolean; clearance: string; delay: string; source: string; sourceTone: string; corrected: boolean }
const bridges: Bridge[] = [
  { slug: 'las-olas-blvd', name: 'Las Olas Boulevard Bridge', corridor: 'icw-fll', chainage: '3120', kind: 'bascule', schedule: true, clearance: '9.4 MHW', delay: '20', source: 'curated', sourceTone: 'accent', corrected: true },
  { slug: 'se-17th-st', name: 'SE 17th Street Causeway', corridor: 'icw-fll', chainage: '1240', kind: 'bascule', schedule: true, clearance: '16.8 MHW', delay: '15', source: 'enc', sourceTone: 'safe', corrected: false },
  { slug: 'sunrise-blvd', name: 'Sunrise Boulevard Bridge', corridor: 'icw-fll', chainage: '6480', kind: 'bascule', schedule: true, clearance: '', delay: '', source: 'unknown', sourceTone: 'warn', corrected: false },
  { slug: 'new-river-andrews', name: 'Andrews Avenue Bridge', corridor: 'new-river', chainage: '2210', kind: 'bascule', schedule: true, clearance: '6.4 MHW', delay: '10', source: 'enc', sourceTone: 'safe', corrected: false },
  { slug: 'fec-new-river', name: 'FEC railroad bridge', corridor: 'new-river', chainage: '2960', kind: 'lift', schedule: true, clearance: '1.2 MHW', delay: '30', source: 'curated', sourceTone: 'accent', corrected: true },
  { slug: 'br-osm-2231', name: '', corridor: 'middle-river', chainage: '870', kind: 'fixed', schedule: false, clearance: '', delay: '', source: 'osm', sourceTone: 'offline', corrected: false },
]
const open = ref('sunrise-blvd')
const opened = computed(() => bridges.find((b) => b.slug === open.value) ?? bridges[0]!)
const fields: { label: string; unit: string | null; value: (b: Bridge) => string; corrected: (b: Bridge) => boolean }[] = [
  { label: 'Closed clearance', unit: 'meters', value: (b) => b.clearance.split(' ')[0] ?? '', corrected: (b) => b.corrected },
  { label: 'Lock / opening delay', unit: 'minutes', value: (b) => b.delay, corrected: () => false },
  { label: 'Name', unit: null, value: (b) => b.name, corrected: () => false },
]
</script>

<style scoped>
.br-search { flex: 1; display: flex; align-items: center; min-width: 0; }
.br-push { margin-bottom: 12px; }
.br-split { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); }
.br-split tbody tr { cursor: pointer; }
.br-unnamed { font-style: italic; color: var(--ink-400); }
.br-unknown { font-weight: 600; color: #9a5a0b; }
.br-gap { margin-top: 12px; }
.br-unit { text-transform: none; letter-spacing: 0; }
.br-value { flex: 1; min-height: 32px; padding: 5px 9px; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
