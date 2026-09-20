<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Float plan</h1><p class="scr-sub">Tell someone ashore where you are going and when to worry.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row fp-actions"><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Plan the passage</button></div>

    <section class="scr-section fp-first">
      <p class="scr-ov">The passage</p>
      <p class="scr-small scr-muted fp-desc">Filled from the plan on the map.</p>
      <div class="scr-grid-2">
        <div v-for="s in PASSAGE" :key="s[0]" class="scr-stat"><span class="scr-stat-label">{{ s[0] }}</span><span class="scr-stat-value fp-val">{{ s[1] }}</span></div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Vessel</p>
      <p class="scr-small scr-muted fp-desc">Read from the vessel profile — name, MMSI, hull, colour, length.</p>
      <div class="scr-card">
        <div class="scr-row"><span class="scr-item-icon" data-tone="accent"><ScrIcon name="vessel" /></span><div><p class="scr-strong">Wanderer</p><p class="scr-small scr-muted">42 ft Sabre · sail · white hull · MMSI 367 123 456</p></div></div>
        <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm fp-link">Vessel profile</button>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">People aboard</p>
      <p class="scr-small scr-muted fp-desc">From the crew list, editable per trip.</p>
      <div class="scr-chips"><span v-for="p in CREW" :key="p" class="scr-chip is-on">{{ p }}</span><span class="scr-chip"><ScrIcon name="plus" />Add</span></div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Tell</p>
      <p class="scr-small scr-muted fp-desc">Who ashore, and how. That person calls — the platform never calls anyone.</p>
      <div class="scr-stack scr-stack--tight">
        <label class="scr-field"><span class="scr-label">Name and number</span><span class="scr-input">Tom Wheeler · +1 954 555 0134</span></label>
        <label class="scr-field"><span class="scr-label">Check in every</span>
          <div class="scr-tabs"><button v-for="e in EVERY" :key="e" type="button" class="scr-tab" :class="{ 'is-on': e === every }" @click="every = e">{{ e }}</button></div>
        </label>
        <p class="scr-micro scr-muted">If you have not checked in by the ETA plus one interval, the person named is told to call the Coast Guard on channel 16.</p>
      </div>
    </section>

    <div class="scr-bar"><button type="button" class="scr-btn scr-btn--primary scr-btn--block" disabled title="No delivery lane exists yet — a float plan that silently failed is worse than none.">Share float plan</button></div>
    <p class="scr-micro scr-muted fp-foot">Not for navigation. WaterWayz is an aid, not a certified chart.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const PASSAGE = [['From', 'Bahia Mar'], ['To', 'Miami Beach Marina'], ['Departing', '12 Oct 14:00'], ['ETA', '14:41']]
const CREW = ['Sam Miller', 'Jordan Miller', 'Alex Reyes']
const EVERY = ['2 h', '4 h', '6 h', 'On arrival']
const every = ref('4 h')
</script>

<style scoped>
.fp-actions { margin: -6px 0 4px; }
.fp-first { margin-top: 8px; }
.fp-desc { margin-bottom: 8px; }
.fp-val { font-size: 15px; }
.fp-link { margin-top: 8px; margin-left: -8px; }
.fp-foot { margin-top: 8px; }
</style>
