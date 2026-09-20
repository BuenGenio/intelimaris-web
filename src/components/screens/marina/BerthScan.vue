<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">LiDAR layout</h1>
        <p class="scr-sub">Pontoons and fingers picked out of a point cloud, proposed as berths for you to correct.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><span class="scr-pill scr-pill--bare">Coming</span><button class="scr-btn scr-btn--ghost">Berth map</button></div>
    </div>

    <div class="scr-alert" data-tone="warn">
      <ScrIcon name="alert" />
      <div><strong>Not built</strong>There is no scan lane yet. When there is: a scan runs against the public LiDAR coverage for the basin, proposes polygons with a confidence per pontoon, and lands them on the berth map as a draft you accept or discard, never as the map itself.</div>
    </div>

    <div class="scr-split scr-section">
      <div class="scr-card">
        <h2 class="scr-card-title">Coverage</h2>
        <p class="scr-sub scr-small">Whether a public point cloud covers this basin, and from when.</p>
        <div class="scr-divider"></div>
        <ScrMap variant="satellite" :height="200" :pins="[{ x: 200, y: 120, tone: 'info' }]">
          <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip">USGS 3DEP · FL Broward 2018 · 8 pts/m²</span>
        </ScrMap>
        <dl class="scr-dl" style="margin-top: 10px">
          <dt>Tile</dt><dd class="scr-num">FL_Broward_2018 · 17R-NQ-4231</dd>
          <dt>Flown</dt><dd>Jan 2018 · 8 y ago</dd>
          <dt>Density</dt><dd class="scr-num">8.1 pts/m²</dd>
          <dt>Pontoons found</dt><dd class="scr-num">6 of 6 drawn</dd>
        </dl>
      </div>
      <div class="scr-card">
        <h2 class="scr-card-title">Request a scan</h2>
        <p class="scr-sub scr-small">Queued as a job; the result arrives on the berth map as a draft layer.</p>
        <div class="scr-divider"></div>
        <div class="scr-stack scr-stack--tight">
          <div v-for="p in proposals" :key="p.name" class="scr-row">
            <span class="scr-strong">{{ p.name }}</span><span class="scr-small scr-muted">{{ p.line }}</span><span class="scr-spacer"></span>
            <span class="scr-progress" style="width: 70px"><i :style="{ width: p.conf }"></i></span><span class="scr-micro scr-num scr-muted">{{ p.conf }}</span>
          </div>
        </div>
        <div class="scr-row" style="margin-top: 14px">
          <button class="scr-btn scr-btn--primary" disabled title="No scan job exists yet.">Request a scan</button>
          <span class="scr-micro scr-muted">Requesting a scan is a berths.manage act.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const proposals = [
  { name: 'Dock A', line: '28 fingers · 40 ft', conf: '94%' },
  { name: 'Dock B', line: '32 fingers · 40 ft', conf: '91%' },
  { name: 'Dock C', line: '36 fingers · 45–50 ft', conf: '88%' },
  { name: 'Dock D', line: '40 fingers · 50–60 ft', conf: '86%' },
  { name: 'Face dock', line: '1 quay · 1,120 ft', conf: '97%' },
]
</script>
