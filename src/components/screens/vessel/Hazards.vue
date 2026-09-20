<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Hazards</h1><p class="scr-sub scr-small">Nearest first, within 2.0 km of your vessel — then everything within 10 km.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row hz-actions">
      <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Back to the map</button>
      <span class="scr-spacer"></span>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--sm" @click="reporting = !reporting"><ScrIcon name="plus" />Hazard</button>
    </div>

    <div v-if="reporting" class="scr-card scr-card--accent hz-report">
      <div class="scr-row scr-row--between"><p class="scr-card-title">Report a hazard</p><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm" @click="reporting = false">Close</button></div>
      <p class="scr-micro scr-muted">Put what you just saw on the map, now. It goes up immediately as Reported, marked unverified, and expires unless someone confirms it.</p>
      <div class="scr-chips hz-kinds"><span v-for="k in KINDS" :key="k" class="scr-chip" :class="{ 'is-on': k === 'Debris' }">{{ k }}</span></div>
      <label class="scr-field hz-note"><span class="scr-ov">Note (optional)</span><span class="scr-textarea scr-muted">Submerged log near the green marker</span></label>
      <p class="scr-micro scr-muted">Placed at your position; drag it on the map to a projected point. Never hand-placed by pixel. Offline, it queues and says so.</p>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block hz-submit">Report it here</button>
    </div>

    <section class="scr-section">
      <p class="scr-ov">Reports in range</p>
      <p class="scr-small scr-muted hz-desc">Severity is a word before it is a colour. Status is the service's own — reported, confirmed, expiring.</p>
      <div class="scr-list">
        <div v-for="h in ROWS" :key="h.kind + h.dist" class="scr-item hz-row">
          <span class="scr-item-icon" :data-tone="h.tone"><ScrIcon name="alert" /></span>
          <span>
            <span class="scr-item-title">{{ h.kind }} <span v-if="h.near" class="scr-accent scr-small">Near you</span></span>
            <span class="scr-item-sub">{{ h.note }}</span>
            <span class="scr-item-sub scr-micro">{{ h.who }} · reported {{ h.age }} · {{ h.conf }} confirmation{{ h.conf === 1 ? '' : 's' }}</span>
            <span class="scr-row scr-row--wrap hz-verbs"><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Show on map</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Still there</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">It's gone</button></span>
          </span>
          <span class="hz-end"><span class="scr-num scr-small">{{ h.dist }} · {{ h.brg }}°</span><span class="scr-pill" :data-tone="h.status[1]">{{ h.status[0] }}</span></span>
        </div>
      </div>
    </section>
    <p class="scr-micro scr-muted hz-foot">Not for navigation. A community report is an unverified claim; a charted danger is a different one, and the map draws them differently.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const KINDS = ['Debris', 'Shoal', 'Wreck', 'Cable', 'Wildlife', 'Other']
const ROWS = [
  { kind: 'Debris', note: 'Submerged log near the green marker', who: 'Community', age: '1 h ago', conf: 2, dist: '0.3 NM', brg: '042', status: ['Confirmed', 'info'], tone: 'warn', near: true },
  { kind: 'Shoal', note: 'Shoaling east of the channel, 3 ft at low water', who: 'Community', age: '3 d ago', conf: 5, dist: '0.9 NM', brg: '118', status: ['Confirmed', 'info'], tone: 'danger', near: true },
  { kind: 'Wildlife', note: 'Manatees at the seawall — idle speed', who: 'Community', age: '20 min ago', conf: 0, dist: '1.4 NM', brg: '201', status: ['Reported', ''], tone: '', near: true },
  { kind: 'Wreck', note: 'Sunken tender, mast showing at low water', who: 'USCG LNM', age: '6 d ago', conf: 3, dist: '3.8 NM', brg: '167', status: ['Expiring', 'warn'], tone: 'danger', near: false },
]
const reporting = ref(false)
</script>

<style scoped>
.hz-actions { margin: -6px 0 10px; }
.hz-report { margin-bottom: 12px; }
.hz-kinds { margin: 10px 0; }
.hz-note { margin-bottom: 8px; }
.hz-note .scr-textarea { min-height: 52px; }
.hz-submit { margin-top: 10px; }
.hz-desc { margin-bottom: 8px; }
.hz-row { align-items: flex-start; }
.hz-verbs { gap: 0; margin-top: 4px; margin-left: -8px; }
.hz-verbs .scr-btn { min-height: 26px; padding-inline: 8px; font-size: 11.5px; }
.hz-end { display: grid; justify-items: end; gap: 4px; color: var(--ink-500); }
.hz-foot { margin-top: 12px; }
</style>
