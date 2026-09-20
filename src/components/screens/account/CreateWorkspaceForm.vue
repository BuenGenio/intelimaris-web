<template>
  <div class="scr">
    <div class="scr-row scr-row--between" style="margin-bottom: 12px">
      <span class="scr-ov">WaterWayz</span>
      <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Cancel</button>
    </div>
    <ol class="scr-chips scr-chips--scroll cwf-steps" aria-label="Progress">
      <li class="scr-chip"><ScrIcon name="check" /> Account</li>
      <li class="scr-chip"><ScrIcon name="check" /> Type</li>
      <li class="scr-chip is-on">Details</li>
      <li class="scr-chip">Invite</li>
    </ol>

    <div class="scr-head">
      <div>
        <h1 class="scr-h2">Tell us about your vessel</h1>
        <p class="scr-sub scr-small">Only the name is required. The rest sharpens what we can tell you.</p>
        <p class="scr-micro scr-muted">In <span class="scr-strong">Sam Miller</span> · <a>change</a></p>
      </div>
    </div>

    <div class="scr-stack">
      <p class="scr-alert scr-small"><ScrIcon name="vessel" /><span>A vessel workspace holds exactly one vessel — the workspace is that vessel’s world. Add a second vessel by creating a second workspace.</span></p>

      <div class="scr-card scr-card--accent scr-row" style="--scr-accent: #4274bb">
        <ScrIcon name="check" class="scr-accent" />
        <p class="scr-small"><span class="scr-strong">Wanderer</span> <span class="scr-muted">— MMSI 367 123 456 will be claimed when your workspace is created.</span></p>
        <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Change</button>
      </div>

      <div class="scr-card scr-stack scr-stack--tight">
        <p class="scr-strong scr-small">Pick the make and model</p>
        <div class="scr-row scr-row--between"><span class="scr-small"><span class="scr-strong">Sabre 42</span> <span class="scr-muted">· model picked, figures copied below</span></span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Change</button></div>
        <label class="scr-field"><span class="scr-label">Model year</span><input class="scr-input" value="2016" readonly /></label>
      </div>

      <div class="scr-card scr-stack">
        <label v-for="f in FIELDS" :key="f.label" class="scr-field">
          <span class="scr-label">{{ f.label }}</span>
          <input class="scr-input" :value="f.value" :placeholder="f.placeholder" readonly />
          <span v-if="f.help" class="scr-hint">{{ f.help }}</span>
        </label>
      </div>
    </div>

    <div class="scr-bar">
      <button type="button" class="scr-btn">Back</button>
      <span class="scr-spacer"></span>
      <button type="button" class="scr-btn scr-btn--primary">Continue</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const FIELDS = [
  { label: 'Vessel name', value: 'Wanderer', placeholder: 'Wanderer' },
  { label: 'Make and model', value: 'Sabre 42', placeholder: 'Beneteau Oceanis 46.1' },
  { label: 'Length overall', value: '42 ft', help: 'Stored in meters; shown in your display units.' },
  { label: 'Beam', value: '13 ft 6 in' },
  { label: 'Draft', value: '4.6 ft', help: 'Used for safe-depth margins on every route.' },
  { label: 'Air draft', value: '21 ft', help: 'Height above the waterline — used for bridge clearances.' },
  { label: 'Displacement', value: '22,500 lb', help: 'Her weight — what a dry stack, a hardstand or a lift has to take.' },
  { label: 'Cruising speed', value: '7.5 kn', help: 'Used for passage ETAs.' },
  { label: 'Waterline length', value: '', placeholder: '36 ft', help: 'Optional — refines hull-speed estimates.' },
  { label: 'Home port', value: 'Fort Lauderdale, FL', placeholder: 'Fort Lauderdale, FL' },
]
</script>

<style scoped>
.cwf-steps { margin-bottom: 12px; }
.cwf-steps .scr-chip { min-height: 26px; font-size: 11px; padding-inline: 10px; }
</style>
