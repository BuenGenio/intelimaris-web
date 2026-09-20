<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Places</h1>
        <p class="scr-sub">Waterfront businesses on the map. Corrections write through the places service's curated lane — operator &gt; curated &gt; populated at read.</p>
      </div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" placeholder="Business name…" aria-label="Search places by business name" style="max-width: 300px" />
      <button type="button" class="scr-chip is-on">Category: Restaurant <span aria-hidden="true">⌄</span></button>
    </div>

    <div class="scr-split" style="grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr)">
      <table class="scr-table" aria-label="Waterfront businesses">
        <thead><tr><th>Place</th><th>Category</th><th>Position</th><th>Claim</th></tr></thead>
        <tbody>
          <tr v-for="p in places" :key="p.slug" :class="{ 'is-selected': p.slug === 'coconuts' }">
            <td><span :class="p.name ? 'scr-strong' : 'scr-muted'" :style="p.name ? '' : 'font-style: italic'">{{ p.name ?? 'Unnamed' }}</span> <span class="scr-micro scr-muted scr-num" style="font-family: monospace">{{ p.slug }}</span></td>
            <td><span class="scr-row scr-small scr-muted" style="gap: 6px"><i class="adm-pin" :style="{ borderColor: p.colour, color: p.colour }"><ScrIcon name="store" style="width: 10px; height: 10px" /></i>{{ p.category }} <span class="scr-micro scr-num" style="font-family: monospace">{{ p.key }}</span></span></td>
            <td class="scr-micro scr-muted scr-num" style="font-family: monospace; white-space: nowrap">{{ p.pos }}</td>
            <td><span v-if="p.claimed" class="scr-pill" data-tone="safe">claimed</span><span v-else class="scr-muted">—</span></td>
          </tr>
        </tbody>
      </table>

      <aside class="scr-card scr-card--flush">
        <div class="scr-row scr-row--between" style="padding: 12px 14px; border-bottom: 1px solid var(--ink-200)">
          <div><h2 class="scr-h3">Coconuts</h2><p class="scr-micro scr-muted scr-num" style="font-family: monospace">coconuts</p></div>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Close</button>
        </div>
        <div style="padding: 12px 14px">
          <p class="scr-micro scr-muted"><span class="scr-num" style="font-family: monospace">restaurant</span> · base row from <span class="scr-num" style="font-family: monospace">osm</span></p>
          <p class="scr-micro" style="margin: 8px 0 12px">Listing: <span class="scr-pill" data-tone="safe">claimed</span></p>
          <div class="scr-stack">
            <div v-for="f in fields" :key="f.label" class="scr-field">
              <span class="scr-row" style="gap: 6px"><span class="scr-ov">{{ f.label }}</span><span v-if="f.source" class="scr-pill" :data-tone="f.source === 'operator' ? 'info' : 'accent'">{{ f.source }}</span></span>
              <div class="scr-row" style="gap: 6px">
                <input class="scr-input" :value="f.value" placeholder="unknown" style="min-height: 32px; padding: 4px 9px" />
                <button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Save</button>
                <button v-if="f.source" type="button" class="scr-btn scr-btn--sm" title="Remove the correction — the field falls back to the populated value. Different from saving an empty value, which records an explicit unknown.">Revert</button>
              </div>
              <p v-if="f.source === 'operator'" class="scr-hint">This value is the claiming workspace's own. Saving writes the curated lane, which the operator lane outranks — the correction stores but will not show until the operator value is gone.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const places: { name: string | null; slug: string; category: string; key: string; colour: string; pos: string; claimed: boolean }[] = [
  { name: 'Coconuts', slug: 'coconuts', category: 'Restaurant', key: 'restaurant', colour: '#b8860b', pos: '26.1173, -80.1096', claimed: true },
  { name: 'Southport Raw Bar', slug: 'southport-raw-bar', category: 'Restaurant', key: 'restaurant', colour: '#b8860b', pos: '26.1009, -80.1264', claimed: false },
  { name: 'Shooters Waterfront', slug: 'shooters-waterfront', category: 'Restaurant', key: 'restaurant', colour: '#b8860b', pos: '26.1666, -80.1082', claimed: true },
  { name: 'Boatyard', slug: 'boatyard-fort-lauderdale', category: 'Restaurant', key: 'restaurant', colour: '#b8860b', pos: '26.1188, -80.1187', claimed: false },
  { name: null, slug: 'osm-n-7719330481', category: 'Restaurant', key: 'restaurant', colour: '#b8860b', pos: '26.0868, -80.1370', claimed: false },
  { name: '15th Street Fisheries', slug: '15th-street-fisheries', category: 'Restaurant', key: 'restaurant', colour: '#b8860b', pos: '26.1047, -80.1213', claimed: false },
]
const fields: { label: string; value: string; source: string | null }[] = [
  { label: 'Name', value: 'Coconuts', source: null },
  { label: 'Phone', value: '+1 954 555 0142', source: 'operator' },
  { label: 'Website', value: 'coconutsfortlauderdale.com', source: null },
  { label: 'Hours', value: 'Daily 11:30–22:00 · dock and dine, 4 courtesy slips', source: 'curated' },
]
</script>

<style scoped>
.adm-pin { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; border: 2px solid; background: var(--ink-0); flex-shrink: 0; }
</style>
