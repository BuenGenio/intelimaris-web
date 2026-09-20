<template>
  <div class="scr">
    <div class="scr-head" style="margin-bottom: 10px">
      <div>
        <h1 class="scr-h1">Berths</h1>
        <p class="scr-sub">Bahia Mar · 171 berths on 6 structures · owners and admins draw here</p>
      </div>
      <div class="scr-row scr-row--wrap" style="justify-content: flex-end">
        <button v-for="t in tools" :key="t" class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': t === tool }" @click="tool = t">{{ t }}</button>
        <button class="scr-btn scr-btn--ghost scr-btn--sm" disabled title="Suggested layouts come from the open-data job in the pipeline; an in-app trigger has no lane yet.">Suggest layout</button>
        <button class="scr-btn scr-btn--ghost scr-btn--sm">LiDAR layout</button>
      </div>
    </div>

    <div class="scr-split">
      <div class="scr-card scr-card--flush">
        <ScrMap variant="basin" :height="380" :pins="[{ x: 150, y: 215, tone: 'danger' }]">
          <div class="scr-map-overlay scr-map-overlay--tl scr-map-chip lay-draft">
            <span>Draw berth · Click the map to add corners.</span>
            <span class="scr-muted">4 corners · Ready.</span>
            <button class="scr-btn scr-btn--ghost scr-btn--sm">Undo corner</button>
            <button class="scr-btn scr-btn--sm">Cancel</button>
            <button class="scr-btn scr-btn--primary scr-btn--sm">Finish</button>
          </div>
          <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip">Shoal · 3 ft MLLW · dredge pending</span>
        </ScrMap>
      </div>
      <div class="scr-stack scr-stack--tight">
        <div class="scr-card">
          <h3 class="scr-card-title">Structures</h3>
          <p class="scr-small scr-muted">6 drawn</p>
          <div v-for="s in structures" :key="s.name" class="scr-row lay-row">
            <span class="scr-strong">{{ s.name }}</span><span class="scr-small scr-muted">{{ s.kind }}</span><span class="scr-spacer"></span><span class="scr-micro scr-muted">{{ s.berths }} berths</span>
          </div>
        </div>
        <div class="scr-card">
          <h3 class="scr-card-title">Berths</h3>
          <p class="scr-small scr-muted">171 drawn · showing Dock C</p>
          <div v-for="b in berths" :key="b.label" class="scr-row lay-row">
            <span class="scr-num scr-strong">{{ b.label }}</span><span class="scr-small scr-muted">{{ b.line }}</span><span class="scr-spacer"></span><span class="scr-pill" :data-tone="b.tone">{{ b.state }}</span>
          </div>
        </div>
        <div class="scr-card">
          <h3 class="scr-card-title">Facilities</h3>
          <p class="scr-small scr-muted">4 placed · Fuel dock, Pump-out, Office, Showers</p>
        </div>
        <div class="scr-card">
          <h3 class="scr-card-title">Hazards</h3>
          <p class="scr-small scr-muted">1 stated. An empty list is a statement about the drawing, not the water.</p>
          <div class="scr-row lay-row"><span class="scr-pill" data-tone="danger">Shoal</span><span class="scr-small">Off Dock C head · 3 ft MLLW · sounded 3 d ago</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const tools = ['Draw dock line', 'Draw field / yard', 'Draw berth', 'Drop mooring ball', 'Place facility', 'Mark hazard', 'Hazard area']
const tool = ref('Draw berth')
const structures = [
  { name: 'A', kind: 'Floating dock · floating', berths: 28 },
  { name: 'B', kind: 'Floating dock · floating', berths: 32 },
  { name: 'C', kind: 'Fixed pier · fixed', berths: 36 },
  { name: 'D', kind: 'Fixed pier · fixed', berths: 40 },
  { name: 'Face dock', kind: 'Quay · fixed', berths: 31 },
  { name: 'Mooring field', kind: 'Mooring field', berths: 4 },
]
const berths = [
  { label: 'C-12', line: 'C · 45 ft LOA · enter 240° stern-in', state: 'Resident', tone: undefined },
  { label: 'C-13', line: 'C · 45 ft LOA · enter 240° stern-in', state: 'Free', tone: 'accent' },
  { label: 'C-14', line: 'C · 45 ft LOA · enter 240° stern-in', state: 'Assigned', tone: 'warn' },
  { label: 'C-15', line: 'C · 50 ft LOA · enter 240° stern-in', state: 'Closed', tone: 'offline' },
  { label: 'C-16', line: 'C · 50 ft LOA · courtesy', state: 'Courtesy', tone: 'safe' },
]
</script>

<style scoped>
.lay-draft { gap: 8px; border-radius: 10px; padding: 6px 8px 6px 12px; }
.lay-row { padding: 5px 0; font-size: 12.5px; }
.lay-row + .lay-row { border-top: 1px solid var(--ink-100); }
</style>
