<template>
  <div class="scr">
    <a class="scr-small scr-muted scr-row" style="gap: 4px; margin-bottom: 6px"><ScrIcon name="back" /> Bahia Mar</a>
    <div class="scr-row scr-row--wrap" style="gap: 10px; margin-bottom: 14px">
      <h1 class="scr-h3">Occupancy board</h1>
      <span class="scr-pill">Read only</span>
      <p class="scr-small scr-muted">What every berth is tonight — closed, resident, courtesy, assigned or free — from DockPass.</p>
      <span class="scr-row" style="margin-left: auto; gap: 6px">
        <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button>
        <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="map" /> Berth map editor</button>
      </span>
      <span class="scr-micro scr-muted scr-num" style="font-family: monospace">as of 12 Oct 2026 09:40</span>
    </div>

    <div class="scr-kpis" style="grid-template-columns: repeat(4, minmax(0, 1fr))">
      <div class="scr-stat scr-card--accent"><span class="scr-stat-label">Occupancy</span><span class="scr-stat-value">78<small>%</small></span><span class="scr-stat-delta">194 of 248 sellable berths held tonight</span></div>
      <div v-for="s in states" :key="s.label" class="scr-stat">
        <span class="scr-stat-label scr-row" style="gap: 6px"><i class="adm-swatch" :style="s.swatch"></i>{{ s.label }}</span>
        <span class="scr-stat-value">{{ s.count }}</span>
        <span class="scr-stat-delta">{{ s.meaning }}</span>
      </div>
    </div>
    <p class="scr-small scr-muted" style="margin: 10px 0 2px">Tonight 194 of 250 drawn berths are spoken for: 121 resident, 58 assigned, 9 held, 6 courtesy. Two are closed for dredging and none is unknown.</p>
    <p class="scr-micro scr-muted" style="margin-bottom: 12px">Occupancy counts sellable berths only — resident and closed berths are out of the denominator.</p>

    <div class="scr-split" style="grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr)">
      <ScrMap variant="basin" :height="380">
        <div class="scr-map-overlay scr-map-overlay--bl" style="background: rgba(255,255,255,0.94); border-radius: 10px; padding: 8px 10px">
          <p class="scr-ov">Tonight</p>
          <ul style="margin-top: 4px; display: grid; gap: 3px"><li v-for="s in states" :key="s.label" class="scr-micro scr-row" style="gap: 6px"><i class="adm-swatch" :style="s.swatch"></i>{{ s.label }}</li></ul>
        </div>
      </ScrMap>

      <div>
        <h2 class="scr-h3" style="margin-bottom: 6px">Berths</h2>
        <div class="scr-list">
          <button v-for="b in berths" :key="b.label" type="button" class="scr-item scr-item--plain" :style="b.label === 'C-14' ? 'background: var(--wave-50)' : ''" style="padding: 8px 12px">
            <span class="scr-row" style="gap: 8px"><i class="adm-swatch" :style="swatchFor(b.state)"></i><span class="scr-strong scr-num" style="font-family: monospace">{{ b.label }}</span><span class="scr-micro scr-muted">{{ b.line }}</span></span>
            <span class="scr-pill" :data-tone="toneFor(b.state)">{{ b.state }}</span>
          </button>
        </div>

        <div class="scr-card" style="margin-top: 12px">
          <div class="scr-row"><h3 class="scr-h3 scr-num" style="font-family: monospace">C-14</h3><span class="scr-pill" data-tone="info">Assigned</span><a class="scr-small scr-muted" style="margin-left: auto">Close</a></div>
          <p class="scr-small" style="margin-top: 4px">Wanderer (Sam Miller), 3 nights from 12 Oct — next arrival 15 Oct.</p>
          <dl class="scr-dl" style="margin-top: 8px">
            <dt>Access</dt><dd>guest</dd><dt>Structure</dt><dd>C dock</dd><dt>Max LOA</dt><dd>14.6 m</dd><dt>Max beam</dt><dd>5.0 m</dd><dt>Max draft</dt><dd>2.4 m</dd><dt>Depth alongside</dt><dd>2.7 m MLLW, sounded 3 d ago</dd><dt>Shore power</dt><dd>50 A</dd><dt>Water</dt><dd>yes</dd><dt>Listing</dt><dd>On DockPass</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const SWATCH: Record<string, string> = {
  Assigned: 'background: rgba(66,116,187,0.5); border-color: #4274bb', Free: 'background: rgba(46,155,78,0.35); border-color: #2e9b4e',
  Held: 'background: rgba(227,139,28,0.55); border-color: #e38b1c', Courtesy: 'background: rgba(58,158,143,0.4); border-color: #3a9e8f',
  Resident: 'background: rgba(44,61,104,0.4); border-color: #2c3d68', Closed: 'background: rgba(200,50,43,0.4); border-color: #c8322b',
  Unknown: 'background: transparent; border-style: dashed; border-color: #8e99af',
}
const TONE: Record<string, string> = { Assigned: 'info', Free: 'safe', Held: 'warn', Courtesy: 'low', Resident: 'offline', Closed: 'danger', Unknown: 'offline' }
const swatchFor = (s: string) => SWATCH[s] ?? ''
const toneFor = (s: string) => TONE[s] ?? 'offline'
const states = [
  { label: 'Assigned', count: 58, meaning: 'A DockPass stay holds this berth tonight.' },
  { label: 'Free', count: 54, meaning: 'Nothing is claimed about this berth tonight.' },
  { label: 'Held', count: 9, meaning: 'A courtesy berth a vessel on its way has asked for — a time-boxed hold, not a booking.' },
  { label: 'Courtesy', count: 6, meaning: 'First come, on the marina’s terms. Not free, and never sold.' },
  { label: 'Resident', count: 121, meaning: 'A tenancy covers today — somebody’s home, not a guest berth.' },
  { label: 'Closed', count: 2, meaning: 'Closed by the marina — dredging, repair, an event.' },
  { label: 'Unknown', count: 0, meaning: 'DockPass said nothing about this berth.' },
].map((s) => ({ ...s, swatch: SWATCH[s.label] }))
const berths = [
  { label: 'C-12', state: 'Resident', line: 'Halcyon · annual tenancy to 31 Dec 2026' },
  { label: 'C-14', state: 'Assigned', line: 'Wanderer · 3 nights from 12 Oct' },
  { label: 'C-16', state: 'Free', line: 'nothing claimed tonight' },
  { label: 'C-18', state: 'Held', line: 'Sea Fever · hold until 14:30' },
  { label: 'T-1', state: 'Courtesy', line: 'restaurant patrons · 2 h' },
  { label: 'B-04', state: 'Closed', line: 'dredging · 10–17 Oct' },
]
</script>

<style scoped>
.adm-swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; border: 1.5px solid; flex-shrink: 0; }
</style>
