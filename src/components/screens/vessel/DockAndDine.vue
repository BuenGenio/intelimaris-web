<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Dock and dine</h1><p class="scr-sub scr-small">Find a waterfront restaurant, see whether its courtesy berth is free right now, and hold it while you come in.</p></div>
      <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Map</button>
    </div>

    <div v-if="held" class="scr-card scr-card--accent">
      <p class="scr-card-title">Your hold</p>
      <p class="scr-micro scr-muted">One at a time — a vessel is in one place.</p>
      <div class="scr-row dd-hold">
        <span class="scr-strong">Coconuts · C-2</span>
        <span class="scr-pill" data-tone="warn">until 19:30</span>
        <span class="scr-small scr-muted scr-num">42 min left</span>
        <span class="scr-spacer"></span>
        <button type="button" class="scr-btn scr-btn--sm" @click="held = false">Release it</button>
      </div>
    </div>

    <section class="scr-section">
      <p class="scr-ov">Which restaurant</p>
      <p class="scr-small scr-muted dd-desc">Search by name or list the waterfront restaurants around you. Only a claimed listing that advertises dockage takes a hold.</p>
      <label class="scr-field"><span class="scr-label">Restaurant</span><span class="scr-input scr-input--search">Coco</span><span class="scr-hint">Two characters and the directory is asked.</span></label>
      <div class="scr-row dd-near"><button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="pin" />Restaurants near me</button></div>
      <div class="scr-list">
        <button v-for="r in HITS" :key="r[0]" type="button" class="scr-item" :class="{ 'dd-picked': r[3] }">
          <span class="scr-item-icon" :data-tone="r[3] ? 'accent' : ''"><ScrIcon name="store" /></span>
          <span><span class="scr-item-title">{{ r[0] }}</span><span class="scr-item-sub scr-num">{{ r[1] }}</span></span>
          <span class="scr-item-end"><span v-if="r[2]" class="scr-pill" data-tone="safe">Claimed</span></span>
        </button>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Coconuts — courtesy berths</p>
      <p class="scr-small scr-muted dd-desc">Free means free right now. A hold is for the next while, not a booking; nothing is charged.</p>
      <div class="scr-list">
        <div v-for="b in BERTHS" :key="b.label" class="scr-item scr-item--plain">
          <span>
            <span class="scr-item-title scr-num">{{ b.label }} <span class="scr-pill" :data-tone="b.tone">{{ b.line }}</span></span>
            <span class="scr-item-sub">{{ b.fit }}</span>
          </span>
          <button v-if="b.state === 'free'" type="button" class="scr-btn scr-btn--primary scr-btn--sm" :disabled="held" :title="held ? 'You already hold C-2 — release it first.' : undefined" @click="held = true">Hold it</button>
          <button v-else-if="b.mine" type="button" class="scr-btn scr-btn--sm" @click="held = false">Release</button>
        </div>
      </div>
      <p class="scr-micro scr-muted dd-foot">Wanderer holds; the restaurant sees the vessel's name and until when. Either side may release early.</p>
    </section>

    <ScrMap variant="chart" :height="140" class="dd-map" :track="'M80 200 C 120 160, 200 140, 250 96'" :pins="[{ x: 250, y: 96, tone: 'safe' }]" :self="{ x: 80, y: 200, heading: 40 }">
      <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip scr-micro">Coconuts · 0.7 NM · 6 min at 7 kn · approach 6 ft MLLW</span>
    </ScrMap>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const held = ref(true)
const HITS: [string, string, boolean, boolean][] = [['Coconuts', '0.7 NM · waterfront · dock and dine', true, true], ['Coconuts Bay Grill', '2.3 NM · waterfront', false, false], ['Shooters Waterfront', '1.8 NM · waterfront · dock and dine', true, false]]
const BERTHS = computed(() => [
  { label: 'C-1', state: 'free', tone: 'safe', line: 'Free · 2 h · no charge · patrons only', fit: 'to 45 ft LOA · 6 ft at the berth', mine: false },
  { label: 'C-2', state: held.value ? 'held' : 'free', tone: held.value ? 'warn' : 'safe', line: held.value ? 'Held until 19:30 · yours' : 'Free · 2 h · no charge', fit: 'to 50 ft LOA · 7 ft at the berth', mine: held.value },
  { label: 'C-3', state: 'held', tone: 'warn', line: 'Held until 20:15', fit: 'to 38 ft LOA · 5 ft at the berth', mine: false },
  { label: 'T-head', state: 'closed', tone: 'offline', line: 'Closed', fit: 'to 60 ft LOA · event tonight', mine: false },
])
</script>

<style scoped>
.dd-hold { margin-top: 8px; flex-wrap: wrap; }
.dd-desc { margin-bottom: 8px; }
.dd-near { margin: 8px 0; }
.dd-picked { background: var(--wave-50); }
.dd-foot { margin-top: 8px; }
.dd-map { margin-top: 14px; }
</style>
