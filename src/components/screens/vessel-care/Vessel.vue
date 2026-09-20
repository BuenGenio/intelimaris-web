<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Wanderer</h1>
        <p class="scr-sub">State what the vessel is, once, so every other screen stops asking.</p>
      </div>
      <div class="scr-row"><span class="scr-pill scr-pill--bare">Sloop</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Plan a passage</button></div>
    </div>

    <div class="scr-media" style="margin-bottom: 14px"><span class="scr-thumb"></span><span class="scr-thumb"></span><span class="scr-thumb ves-add"><ScrIcon name="camera" /></span></div>

    <div class="scr-card">
      <h2 class="scr-card-title">Identity</h2>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">The operator record. Rig and route hull type are separate facts.</p>
      <div class="scr-stack scr-stack--tight">
        <label class="scr-field"><span class="scr-label">Vessel name</span><input class="scr-input" value="Wanderer" readonly /></label>
        <label class="scr-field"><span class="scr-label">Make and model</span><input class="scr-input" value="Sabre 426" readonly /></label>
        <label class="scr-field"><span class="scr-label">Rig</span><select class="scr-select"><option>Sloop</option></select></label>
        <label class="scr-field"><span class="scr-label">Home port</span><input class="scr-input" value="Fort Lauderdale, FL" readonly /></label>
        <label class="scr-field"><span class="scr-label">Notes</span><textarea class="scr-textarea" readonly>Bow thruster. Prop walk to port in astern.</textarea></label>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Operator figures</h2><p class="scr-sub scr-small">In your units (ft, ft, kn); stored in metres and knots. Blank clears your figure.</p></div>
        <button class="scr-btn scr-btn--primary scr-btn--sm">Save</button>
      </div>
      <div class="scr-divider"></div>
      <div class="scr-stack scr-stack--tight">
        <label v-for="f in figures" :key="f.label" class="scr-field ves-figure">
          <span class="scr-label">{{ f.label }}</span>
          <span class="ves-unit"><input class="scr-input scr-num" :value="f.value" :placeholder="f.value ? '' : 'Not stated'" readonly /><small>{{ f.unit }}</small></span>
        </label>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 10px">Air draft is optional. Unknown clearance and depth inputs stay unknown; review the passage notes before using a route.</p>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Resolved envelope</h2>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">The vessel service combines your figures with its other sources. Every fact carries where it came from.</p>
      <div class="scr-row" style="margin-bottom: 10px">
        <span class="ves-ring scr-num">6/7</span>
        <p class="scr-small scr-muted">6 of 7 stated — draft and air draft are what the engine asks for most.</p>
      </div>
      <dl>
        <div v-for="e in envelope" :key="e.label" class="scr-kv"><dt>{{ e.label }}</dt><dd><strong>{{ e.value }}</strong> <span class="scr-muted scr-micro">{{ e.from }}</span></dd></div>
      </dl>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between"><h2 class="scr-card-title">MMSI claim</h2><span class="scr-pill" data-tone="safe">Linked</span></div>
      <p class="scr-sub scr-small">Link her to the record transmitting as this MMSI. From then on live data attaches and your figures override it. First claim holds.</p>
      <p class="scr-strong scr-num" style="margin: 10px 0 8px">MMSI 367 123 456</p>
      <button class="scr-btn scr-btn--sm">Release link…</button>
      <p class="scr-micro scr-muted" style="margin-top: 10px">Where someone else holds it: “Already registered. You can ask to come aboard — the owner decides.” Nothing more is ever shown.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const figures = [
  { label: 'Length overall', value: '42.0', unit: 'ft' },
  { label: 'Waterline length', value: '36.5', unit: 'ft' },
  { label: 'Beam', value: '13.4', unit: 'ft' },
  { label: 'Draft', value: '4.6', unit: 'ft' },
  { label: 'Air draft', value: '21.0', unit: 'ft' },
  { label: 'Cruising speed', value: '7.5', unit: 'kn' },
]
const envelope = [
  { label: 'Length overall', value: '42.0 ft', from: 'operator' },
  { label: 'Waterline length', value: '36.5 ft', from: 'operator' },
  { label: 'Beam', value: '13.4 ft', from: 'operator' },
  { label: 'Draft', value: '4.6 ft', from: 'operator' },
  { label: 'Air draft', value: '21.0 ft', from: 'operator' },
  { label: 'Displacement', value: '—', from: 'not stated' },
  { label: 'Cruise speed', value: '7.5 kn', from: 'operator' },
]
</script>

<style scoped>
.ves-add { display: grid; place-items: center; background: var(--ink-100); color: var(--ink-500); border: 1px dashed var(--ink-300); }
.ves-figure { grid-template-columns: minmax(0, 1fr) 120px; align-items: center; }
.ves-unit { position: relative; display: block; }
.ves-unit small { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: var(--ink-500); font-size: 11px; }
.ves-unit .scr-input { text-align: right; padding-right: 30px; }
.ves-ring { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; border: 5px solid var(--safe); border-left-color: var(--ink-200); font-weight: 700; font-size: 12px; }
</style>
