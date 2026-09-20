<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll ace-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'On the water' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack">
      <h2 class="scr-h3">Experience</h2>
      <label class="scr-field"><span class="scr-label">How you would describe yourself</span><select class="scr-select"><option>First season</option><option selected>Coastal cruising</option><option>Offshore passages</option><option>Professional</option></select></label>
      <label class="scr-field"><span class="scr-label">Sailing since</span><input class="scr-input scr-num" value="2011" placeholder="2011" readonly /><span class="scr-hint">A year — so it stays right every January.</span></label>
      <label class="scr-field"><span class="scr-label">Languages you speak</span><input class="scr-input" value="en-US, es" placeholder="en-US, fr, es" readonly /><span class="scr-hint">Language tags, comma separated.</span></label>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Certificates</h2><p class="scr-small scr-muted">Self-declared. Nothing here is checked, and nothing here unlocks a feature.</p></div>
      <div class="scr-chips">
        <button v-for="c in CERTS" :key="c" type="button" class="scr-chip" :class="{ 'is-on': chosen.includes(c) }" @click="toggle(c)"><ScrIcon v-if="chosen.includes(c)" name="check" />{{ c }}</button>
      </div>
      <p class="scr-micro scr-muted">Up to 6. <span class="scr-num">{{ chosen.length }}</span> chosen.</p>
    </div>

    <div class="scr-bar"><button type="button" class="scr-btn scr-btn--primary scr-btn--block">Save changes</button></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const CERTS = ['ICC', 'RYA Day Skipper', 'RYA Yachtmaster Coastal', 'RYA Yachtmaster Offshore', 'USCG OUPV (six-pack)', 'USCG Master', 'ASA Bareboat Chartering', 'STCW Basic Safety Training', 'VHF radio operator', 'First aid']
const chosen = ref(['RYA Day Skipper', 'VHF radio operator', 'First aid'])
function toggle(c: string) {
  if (chosen.value.includes(c)) chosen.value = chosen.value.filter((x) => x !== c)
  else if (chosen.value.length < 6) chosen.value = [...chosen.value, c]
}
</script>

<style scoped>
.ace-tabs { margin: 12px 0; }
</style>
