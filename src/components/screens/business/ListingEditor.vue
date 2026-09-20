<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Listing</h1>
        <p class="scr-sub">Editing what vessels nearby see — every field says who last stood behind it.</p>
      </div>
      <span class="scr-pill" data-tone="safe">Approved</span>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">On the chart</h2>
          <p class="scr-small scr-muted">Corrections outrank the crowd-sourced record. Blank a field you corrected and the next source answers again.</p>
          <div class="scr-grid-2" style="margin-top: 12px">
            <label class="scr-field"><span class="scr-label">Name</span><input class="scr-input" value="Coconuts" readonly /><span class="scr-hint">you corrected this · 14 Sep</span></label>
            <label class="scr-field"><span class="scr-label">Category</span><select class="scr-select"><option>Restaurant · dock and dine</option><option>Fuel dock</option><option>Marina store</option></select><span class="scr-hint">curated · only categories a business workspace claims</span></label>
            <label class="scr-field"><span class="scr-label">Phone</span><input class="scr-input" value="+1 954 555 0188" readonly /><span class="scr-hint">you corrected this · 3 d ago</span></label>
            <label class="scr-field"><span class="scr-label">Website</span><input class="scr-input" value="coconutsfortlauderdale.example" readonly /><span class="scr-hint">from the data source</span></label>
            <label class="scr-field" style="grid-column: 1 / -1"><span class="scr-label">Hours</span><input class="scr-input" value="Mo-Su 11:00-22:00" placeholder="Mo-Su 07:00-19:00" readonly /><span class="scr-hint">you corrected this · 3 d ago</span></label>
          </div>
        </div>

        <div class="scr-card">
          <h2 class="scr-card-title">Details</h2>
          <p class="scr-small scr-muted">Yours alone — nothing imported stands beneath these.</p>
          <div class="scr-stack" style="margin-top: 12px">
            <label class="scr-field"><span class="scr-label">Description</span><textarea class="scr-textarea" placeholder="What a vessel should know before it ties up." readonly>Waterfront tables on the Intracoastal. Tie up on the dock while you eat; no overnight.</textarea></label>
            <div class="scr-grid-3">
              <label v-for="a in address" :key="a.label" class="scr-field" :style="a.wide ? 'grid-column: 1 / -1' : ''"><span class="scr-label">{{ a.label }}</span><input class="scr-input" :value="a.value" readonly /></label>
            </div>
          </div>
        </div>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">Restaurant extras</h2>
          <p class="scr-small scr-muted">The form is the taxonomy's. Measurements are in your units and stored canonical.</p>
          <div class="scr-stack" style="margin-top: 12px">
            <div class="scr-row"><button class="scr-switch" :class="{ 'is-on': dockage }" @click="dockage = !dockage" aria-label="Dockage while dining"></button><span class="scr-label">Dockage while dining</span></div>
            <label class="scr-field"><span class="scr-label">Courtesy berths</span><input class="scr-input" value="4" readonly /></label>
            <label class="scr-field"><span class="scr-label">Max LOA</span><div class="scr-row"><input class="scr-input" value="60" readonly /><span class="scr-muted">ft</span></div></label>
            <div class="scr-field">
              <span class="scr-label">Depth at dock</span>
              <div class="scr-row"><input class="scr-input" value="6.0" readonly /><span class="scr-muted">ft</span></div>
              <div class="scr-row scr-row--wrap"><span class="scr-pill" data-tone="warn">ageing · confirmed 31 h ago</span><span v-if="confirmed" class="scr-small" style="color: var(--safe)">Will be confirmed current on save.</span><button v-else class="scr-btn scr-btn--ghost scr-btn--sm" @click="confirmed = true">Still current</button></div>
            </div>
            <div class="scr-field">
              <span class="scr-label scr-row"><ScrIcon name="lock" />Reservations</span>
              <input class="scr-input" value="By phone" disabled />
              <span class="scr-hint">A Pro field — the account's subscription decides. <a href="#">Open the subscription</a></span>
            </div>
          </div>
        </div>

        <div class="scr-row scr-row--wrap"><button class="scr-btn scr-btn--primary">Save changes</button><button class="scr-btn scr-btn--ghost">Cancel</button><span class="scr-small scr-muted">3 fields changed</span></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const dockage = ref(true)
const confirmed = ref(false)
const address = [
  { label: 'Address line 1', value: '429 Seabreeze Blvd', wide: true },
  { label: 'Address line 2', value: '', wide: true },
  { label: 'City', value: 'Fort Lauderdale', wide: false },
  { label: 'Region', value: 'FL', wide: false },
  { label: 'Postcode', value: '33316', wide: false },
  { label: 'Country', value: 'US', wide: false },
]
</script>
