<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Marinas</h1>
        <p class="scr-sub">The whole directory. Corrections write through the marina service's curated lane — operator &gt; curated &gt; osm at read.</p>
      </div>
    </div>

    <div class="scr-toolbar scr-row--wrap">
      <input class="scr-input scr-input--search" placeholder="Name, slug or alias…" aria-label="Search marinas by name, slug or alias" style="max-width: 260px" />
      <button type="button" class="scr-chip is-on">Country: United States <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip is-on">Region: Florida <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Kind <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Claim <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Named <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Corrections <span aria-hidden="true">⌄</span></button>
    </div>

    <div class="scr-table-wrap">
      <table class="scr-table" aria-label="Marina directory">
        <thead><tr><th>Marina</th><th>Source</th><th>Country</th><th>Region</th><th>Kind</th><th>Layout</th><th>Corrections</th><th>Claim</th></tr></thead>
        <tbody>
          <tr v-for="m in marinas" :key="m.slug" :class="{ 'is-selected': m.slug === 'bahia-mar' }">
            <td><a :class="m.name ? 'scr-strong' : 'scr-muted'" :style="m.name ? 'color: var(--ink-900)' : 'font-style: italic'">{{ m.name ?? 'Unnamed' }}</a><div class="scr-micro scr-muted scr-num">{{ m.slug }}<span v-if="m.aliases"> · +{{ m.aliases }} aliases</span></div></td>
            <td><span class="scr-pill" :data-tone="m.sourceTone">{{ m.source }}</span></td>
            <td class="scr-small scr-muted" style="white-space: nowrap">🇺🇸 United States</td>
            <td class="scr-small scr-muted">Florida</td>
            <td class="scr-small scr-muted">{{ m.kind }}</td>
            <td class="scr-micro scr-muted" style="white-space: nowrap">{{ m.layout }}</td>
            <td><span v-if="m.fixes.length" class="scr-chips"><span v-for="f in m.fixes" :key="f" class="scr-pill scr-pill--bare scr-num" data-tone="accent" style="font-family: monospace; font-size: 10px">{{ f }}</span></span><span v-else class="scr-muted">—</span></td>
            <td><span v-if="m.claim" class="scr-pill" :data-tone="m.claim === 'approved' ? 'safe' : 'warn'">{{ m.claim }}</span><span v-else class="scr-muted">—</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="scr-row scr-row--between" style="margin-top: 8px">
      <span class="scr-micro scr-muted">Showing 1–8 of 412 · the directory holds 6,771 under no filter at all</span>
      <span class="scr-row" style="gap: 6px"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></span>
    </div>
  </div>
</template>

<script setup lang="ts">
const marinas: { name: string | null; slug: string; aliases?: number; source: string; sourceTone: string; kind: string; layout: string; fixes: string[]; claim?: string }[] = [
  { name: 'Bahia Mar', slug: 'bahia-mar', aliases: 2, source: 'Imported', sourceTone: 'offline', kind: 'Marina', layout: 'Basin mapped · 6 amenities', fixes: ['vhf', 'approach_depth'], claim: 'approved' },
  { name: 'Pier Sixty-Six Marina', slug: 'pier-66', source: 'Imported', sourceTone: 'offline', kind: 'Marina', layout: 'Basin mapped · 4 amenities', fixes: ['phone'], claim: 'approved' },
  { name: 'Las Olas Marina', slug: 'las-olas-marina', aliases: 1, source: 'Imported', sourceTone: 'offline', kind: 'Marina', layout: 'Point only · 2 amenities', fixes: [], claim: 'pending' },
  { name: 'Hall of Fame Marina', slug: 'hall-of-fame-marina', source: 'Imported', sourceTone: 'offline', kind: 'Marina', layout: 'Point only', fixes: [] },
  { name: 'Cooley’s Landing', slug: 'cooleys-landing', source: 'Registered', sourceTone: 'info', kind: 'Marina', layout: 'Point only · 3 amenities', fixes: ['hours'] },
  { name: null, slug: 'osm-n-4419021873', source: 'Imported', sourceTone: 'offline', kind: 'Harbour', layout: 'Point only', fixes: [] },
  { name: 'Hillsboro Inlet Marina', slug: 'hillsboro-inlet-marina', source: 'Seed', sourceTone: 'warn', kind: 'Marina', layout: 'Point only · 1 amenity', fixes: [] },
  { name: 'Sunrise Harbor', slug: 'sunrise-harbor', source: 'Imported', sourceTone: 'offline', kind: 'Marina', layout: 'Basin mapped · 5 amenities', fixes: ['name'], claim: 'approved' },
]
</script>
