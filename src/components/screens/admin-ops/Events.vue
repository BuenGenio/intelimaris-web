<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Events</h1>
        <p class="scr-sub">Closures, races and parades, corrected. An event flagged as affecting navigation changes what the engine will route through — the flag is the field worth checking.</p>
      </div>
    </div>

    <div class="scr-toolbar">
      <span class="scr-input scr-input--search ev-search scr-muted">Name, slug or series…</span>
      <span class="scr-chip">Kind · Any <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Source · Any <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Corrections · Either <span aria-hidden="true">⌄</span></span>
    </div>
    <p class="scr-small scr-muted ev-summary">2 of 6 on this page corrected. 3 affect navigation.</p>

    <div class="scr-split ev-split">
      <table class="scr-table">
        <thead><tr><th>Event</th><th>Kind</th><th>Window</th><th>Navigation</th><th>Source</th><th>Corrections</th></tr></thead>
        <tbody>
          <tr v-for="e in events" :key="e.slug" :class="{ 'is-selected': e.slug === open }" @click="open = e.slug">
            <td><strong>{{ e.name }}</strong> <span class="scr-micro scr-muted scr-num">{{ e.slug }}</span></td>
            <td><span class="scr-pill" :data-tone="e.tone">{{ e.kind }}</span></td>
            <td class="scr-small scr-num" :class="e.inverted ? 'ev-inverted' : 'scr-muted'">{{ e.window }}<template v-if="e.inverted"> — inverted</template></td>
            <td><span v-if="e.nav" class="scr-pill" data-tone="danger">Affects navigation</span><span v-else class="scr-small scr-muted">No effect</span></td>
            <td class="scr-small scr-muted">{{ e.source }}</td>
            <td><span v-if="e.corrected" class="scr-pill" data-tone="accent">Corrected: {{ e.corrected }}</span><span v-else class="scr-muted">—</span></td>
          </tr>
        </tbody>
      </table>

      <aside class="scr-card ev-drawer">
        <div class="scr-row scr-row--between">
          <div><h2 class="scr-h3">{{ opened.name }}</h2><p class="scr-micro scr-muted scr-num">{{ opened.slug }}</p></div>
          <button type="button" class="scr-btn scr-btn--icon scr-btn--sm" aria-label="Close"><ScrIcon name="x" /></button>
        </div>
        <div v-if="opened.inverted" class="scr-alert ev-gap" data-tone="warn">This window ends before it starts. The service refuses to create one, so this arrived populated that way — correcting either end will be checked against the other.</div>
        <div class="scr-stack ev-gap">
          <div v-for="f in fields" :key="f.label" class="scr-field">
            <span class="scr-ov">{{ f.label }}<span v-if="f.unit" class="ev-unit"> ({{ f.unit }})</span></span>
            <div class="scr-row"><span class="scr-input ev-value" :class="{ 'scr-muted': !f.value(opened) }">{{ f.value(opened) || 'empty = explicitly unknown' }}</span><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Correct</button><button v-if="opened.corrected && opened.corrected.includes(f.label)" type="button" class="scr-btn scr-btn--sm">Revert</button></div>
            <span v-if="opened.corrected && opened.corrected.includes(f.label)" class="scr-hint">Corrected (curated) · 10/12/2026, 9:40 AM</span>
            <span v-if="f.label === 'Description'" class="scr-hint ev-warn">The browse envelope carries no current description, so this box opens empty. Saving it empty is an EXPLICIT unknown and will clear whatever is stored.</span>
          </div>
        </div>
      </aside>
    </div>

    <div class="scr-row scr-row--between scr-section">
      <span class="scr-small scr-muted">Showing 1–6 of 58</span>
      <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

type Ev = { slug: string; name: string; kind: string; tone: string; window: string; starts: string; ends: string; inverted: boolean; nav: boolean; source: string; corrected: string | null }
const events: Ev[] = [
  { slug: 'flibs-2026', name: 'Fort Lauderdale International Boat Show', kind: 'Closure', tone: 'danger', window: '2026-10-28 → 2026-11-01', starts: '2026-10-28T12:00Z', ends: '2026-11-01T23:00Z', inverted: false, nav: true, source: 'lnm · LNM 43/26', corrected: 'Ends at' },
  { slug: 'new-river-dredging', name: 'New River dredging, Tarpon Bend', kind: 'Restriction', tone: 'danger', window: '2026-10-05 → 2026-10-24', starts: '2026-10-05T11:00Z', ends: '2026-10-24T22:00Z', inverted: false, nav: true, source: 'lnm · LNM 40/26', corrected: null },
  { slug: 'columbus-day-regatta', name: 'Columbus Day Regatta', kind: 'Regatta', tone: 'warn', window: '2026-10-10 → 2026-10-11', starts: '2026-10-10T13:00Z', ends: '2026-10-11T21:00Z', inverted: false, nav: true, source: 'curated', corrected: 'Affects navigation' },
  { slug: 'lauderdale-lights-parade', name: 'Winterfest boat parade route test', kind: 'Parade', tone: 'warn', window: '2026-10-17 → 2026-10-16', starts: '2026-10-17T22:00Z', ends: '2026-10-16T23:00Z', inverted: true, nav: false, source: 'seed', corrected: null },
  { slug: 'las-olas-fireworks', name: 'Las Olas fireworks', kind: 'Fireworks', tone: 'warn', window: '2026-10-31', starts: '2026-10-31T23:30Z', ends: '2026-10-31T23:50Z', inverted: false, nav: false, source: 'curated', corrected: null },
  { slug: 'harbor-market', name: 'Harbor Shops weekend market', kind: 'Other', tone: 'offline', window: '2026-10-03 → 2026-10-04', starts: '2026-10-03T13:00Z', ends: '2026-10-04T20:00Z', inverted: false, nav: false, source: 'seed', corrected: null },
]
const open = ref('flibs-2026')
const opened = computed(() => events.find((e) => e.slug === open.value) ?? events[0]!)
const fields: { label: string; unit: string | null; value: (e: Ev) => string }[] = [
  { label: 'Name', unit: null, value: (e) => e.name },
  { label: 'Starts at', unit: 'UTC', value: (e) => e.starts },
  { label: 'Ends at', unit: 'UTC', value: (e) => e.ends },
  { label: 'Description', unit: null, value: () => '' },
  { label: 'Affects navigation', unit: null, value: (e) => (e.nav ? 'true' : 'false') },
]
</script>

<style scoped>
.ev-search { flex: 1; display: flex; align-items: center; min-width: 0; }
.ev-summary { margin-bottom: 10px; }
.ev-split { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); }
.ev-split tbody tr { cursor: pointer; }
.ev-inverted { font-weight: 600; color: var(--danger); }
.ev-gap { margin-top: 12px; }
.ev-unit { text-transform: none; letter-spacing: 0; }
.ev-value { flex: 1; min-height: 32px; padding: 5px 9px; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ev-warn { color: #9a5a0b; }
</style>
