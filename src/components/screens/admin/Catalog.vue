<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Model catalog</h1>
        <p class="scr-sub">The seed is approximate by design — a Seed badge means nobody has vouched for the figures yet. Saving a form marks the row Curated, and re-imports never overwrite a curated row.</p>
      </div>
    </div>

    <div class="scr-toolbar scr-row--wrap">
      <input class="scr-input scr-input--search" placeholder="Manufacturer or model…" aria-label="Search the catalog by manufacturer or model name" style="max-width: 240px" />
      <button type="button" class="scr-chip is-on">Manufacturer: Sabre <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Provenance <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Rig <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Hull <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Availability <span aria-hidden="true">⌄</span></button>
    </div>
    <div class="scr-row" style="margin-bottom: 10px"><button type="button" class="scr-btn scr-btn--sm">Add model</button><button type="button" class="scr-btn scr-btn--sm">Add manufacturer</button></div>

    <div class="scr-split" style="grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr)">
      <div>
        <table class="scr-table" aria-label="The vessel model catalog">
          <thead><tr><th>Model</th><th>Figures</th><th>Provenance</th></tr></thead>
          <tbody>
            <tr v-for="m in models" :key="m.name" :class="{ 'is-selected': m.name === 'Sabre 42' }">
              <td><span class="scr-muted">{{ m.mfr }}</span> <span class="scr-strong">{{ m.name }}</span></td>
              <td class="scr-micro scr-muted">{{ m.figures }}</td>
              <td style="white-space: nowrap"><span class="scr-pill" :data-tone="m.curated ? 'accent' : undefined">{{ m.curated ? 'Curated' : 'Seed' }}</span> <span v-if="m.disabled" class="scr-pill" data-tone="danger">Disabled</span></td>
            </tr>
          </tbody>
        </table>
        <div class="scr-row scr-row--between" style="margin-top: 8px">
          <span class="scr-micro scr-muted">Showing 1–7 of 23</span>
          <span class="scr-row" style="gap: 6px"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></span>
        </div>
      </div>

      <aside class="scr-card scr-card--flush">
        <div class="scr-row scr-row--between" style="padding: 12px 14px; border-bottom: 1px solid var(--ink-200)">
          <div><h2 class="scr-h3">Sabre 42</h2><p class="scr-micro scr-muted">Sabre Yachts · Curated by ops@waterwayz on 9 Oct 2026</p></div>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--icon" aria-label="Close"><ScrIcon name="x" /></button>
        </div>
        <div class="scr-stack scr-stack--tight" style="padding: 12px 14px">
          <div class="adm-row"><span class="scr-ov">Name</span><input class="scr-input" value="Sabre 42" aria-label="Model name" /></div>
          <div class="adm-row"><span class="scr-ov">Rig / hull</span><span class="scr-row" style="gap: 6px"><select class="scr-select" aria-label="Rig"><option>sloop</option></select><select class="scr-select" aria-label="Hull configuration"><option>monohull</option></select></span></div>
          <div class="adm-row"><span class="scr-ov">Years</span><span class="scr-row" style="gap: 6px"><input class="scr-input" value="1987" placeholder="from" style="width: 80px" /><input class="scr-input" value="1993" placeholder="to" style="width: 80px" /></span></div>
          <div v-for="f in figures" :key="f.label" class="adm-row"><span class="scr-ov">{{ f.label }} <span style="text-transform: none">({{ f.unit }})</span></span><input class="scr-input" :value="f.value" placeholder="unknown" /></div>
          <div class="adm-row"><span class="scr-ov">Notes</span><textarea class="scr-textarea" aria-label="Notes — designer, variants, keel options">Roger Hewson design; shoal keel option draws 1.40 m.</textarea></div>
          <div class="scr-row" style="gap: 6px; margin-top: 4px"><button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Save as curated</button><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Disable</button></div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const models = [
  { mfr: 'Sabre', name: 'Sabre 42', figures: 'sloop · monohull · 1987–1993 · LOA 12.8 m · draft 1.9 m', curated: true, disabled: false },
  { mfr: 'Sabre', name: 'Sabre 38 MkII', figures: 'sloop · monohull · 1988–1994 · LOA 11.6 m · draft 1.8 m', curated: true, disabled: false },
  { mfr: 'Sabre', name: 'Sabre 386', figures: 'sloop · monohull · 2004–2011 · LOA 11.8 m · draft 2.0 m', curated: false, disabled: false },
  { mfr: 'Sabre', name: 'Sabre 402', figures: 'sloop · monohull · 1996–2002 · LOA 12.2 m', curated: false, disabled: false },
  { mfr: 'Sabre', name: 'Sabre 426', figures: 'sloop · monohull · 2002–2010 · LOA 13.0 m · draft 2.1 m', curated: false, disabled: false },
  { mfr: 'Sabre', name: 'Sabre 42 Salon Express', figures: 'power · monohull · 2007– · LOA 13.6 m · draft 1.0 m', curated: true, disabled: false },
  { mfr: 'Sabre', name: 'Sabre 34 MkI', figures: 'sloop · monohull · 1970–1978', curated: false, disabled: true },
]
const figures = [
  { label: 'Length overall', unit: 'm', value: '12.8' }, { label: 'Waterline length', unit: 'm', value: '10.4' },
  { label: 'Beam', unit: 'm', value: '4.1' }, { label: 'Draft', unit: 'm', value: '1.9' },
]
</script>

<style scoped>
.adm-row { display: grid; grid-template-columns: 110px minmax(0, 1fr); align-items: center; gap: 8px; }
.adm-row .scr-input, .adm-row .scr-select { min-height: 32px; padding: 4px 9px; }
</style>
