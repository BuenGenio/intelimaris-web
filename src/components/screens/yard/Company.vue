<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Company</h1>
        <p class="scr-sub">What the directory shows a vessel owner looking for a yard.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="safe">Listed</span><span class="scr-pill scr-pill--bare">serving 4 vessels</span></div>
    </div>

    <div class="scr-tabs scr-tabs--line" style="margin-bottom: 14px"><span class="scr-tab">General</span><span class="scr-tab">People</span><span class="scr-tab is-on">Company</span><span class="scr-tab">Advanced</span></div>

    <div class="scr-card">
      <h2 class="scr-card-title">Lauderdale Marine Service</h2>
      <p class="scr-small scr-muted">Your join code is <span class="scr-strong scr-num">LMS-7Q2X</span> — a vessel owner who has it can engage you whether or not you are listed.</p>
      <div class="scr-stack" style="margin-top: 14px">
        <label class="scr-field"><span class="scr-label">Specialties</span><input class="scr-input" value="diesel, electrical, rigging, refit" readonly /><span class="scr-hint">Comma-separated, up to 8. The directory searches these.</span></label>
        <label class="scr-field"><span class="scr-label">Where you work</span><input class="scr-input" value="Fort Lauderdale to Palm Beach, and the Keys by arrangement" readonly /></label>
        <label class="scr-field"><span class="scr-label">About</span><textarea class="scr-textarea" readonly>Independent yard since 2004. Volvo Penta and Yanmar certified; ABYC electrical. Haul-out to 60 ft at the Isle of Venice dock.</textarea></label>
        <div class="scr-grid-3">
          <label class="scr-field"><span class="scr-label">Email</span><input class="scr-input" value="service@lauderdalemarine.example" readonly /></label>
          <label class="scr-field"><span class="scr-label">Phone</span><input class="scr-input" value="+1 954 555 0142" readonly /></label>
          <label class="scr-field"><span class="scr-label">Website</span><input class="scr-input" value="lauderdalemarine.example" readonly /></label>
        </div>
        <div class="scr-row scr-row--wrap">
          <button class="scr-switch" :class="{ 'is-on': listed }" @click="listed = !listed" aria-label="Listed in the directory"></button>
          <span class="scr-strong">Listed in the directory</span>
          <span class="scr-small scr-muted">Off, a vessel owner engages you by your join code only.</span>
        </div>
        <div class="scr-alert" data-tone="safe"><ScrIcon name="check" /><span><strong>Saved</strong>The directory shows this now.</span></div>
        <div><button class="scr-btn scr-btn--primary">Save</button></div>
      </div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">As the directory lists you</h2>
      <div class="scr-row" style="margin-top: 6px; align-items: flex-start">
        <span class="scr-item-icon" data-tone="accent"><ScrIcon name="wrench" /></span>
        <span style="flex: 1"><span class="scr-strong">Lauderdale Marine Service</span> <span class="scr-muted">serving 4 vessels</span><br /><span class="scr-small scr-muted">Diesel · Electrical · Rigging · Refit</span><br /><span class="scr-small scr-muted">Fort Lauderdale to Palm Beach, and the Keys by arrangement</span></span>
        <button class="scr-btn scr-btn--sm">Engage</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const listed = ref(true)
</script>
