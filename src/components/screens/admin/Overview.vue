<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Overview</h1>
        <p class="scr-sub">Is the platform healthy, and what needs you? These tiles re-read every 60 seconds while this tab is visible; the TTN probe is a live MQTT connect and only runs when you press it.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh now</button>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between" style="margin-bottom: 10px">
        <h2 class="scr-h3 scr-row"><ScrIcon name="activity" /> Service reachability</h2>
      </div>
      <ul class="scr-chips">
        <li v-for="s in services" :key="s.name" class="scr-chip" style="cursor: default">
          <span class="scr-num" style="font-family: monospace; font-size: 11.5px">{{ s.name }}</span>
          <span class="scr-pill" :data-tone="s.tone">{{ s.state }}</span>
          <span v-if="s.detail" class="scr-micro scr-muted">{{ s.detail }}</span>
        </li>
      </ul>
      <p class="scr-micro scr-muted" style="margin-top: 10px">GET /v0/&lt;service&gt;/health per service — reachability as this console sees it through its own route, not a platform-wide monitor.</p>
    </div>

    <div class="scr-grid-3 scr-section" style="margin-top: 14px">
      <div class="scr-card">
        <div class="scr-row scr-row--between adm-tile-head"><h2 class="scr-h3 scr-row"><ScrIcon name="check" /> Claims pending</h2><a class="scr-small scr-strong scr-accent">Open ↗</a></div>
        <div class="scr-stat scr-card--accent"><span class="scr-stat-label">Awaiting review</span><span class="scr-stat-value">7<small>pending</small></span><span class="scr-stat-delta">business 4 · marina 2 · registration 1</span></div>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between adm-tile-head"><h2 class="scr-h3 scr-row"><ScrIcon name="radio" /> Sensor fleet</h2><a class="scr-small scr-strong scr-accent">Open ↗</a></div>
        <div class="scr-stat"><span class="scr-stat-label">Provisioned fleet</span><span class="scr-stat-value">312<small>units</small></span></div>
        <div class="scr-chips" style="margin-top: 8px"><span class="scr-pill" data-tone="safe">active 241</span><span class="scr-pill">provisioned 58</span><span class="scr-pill" data-tone="warn">disabled 9</span><span class="scr-pill" data-tone="danger">retired 4</span></div>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between adm-tile-head"><h2 class="scr-h3 scr-row"><ScrIcon name="radio" /> TTN link</h2><a class="scr-small scr-strong scr-accent">Open ↗</a></div>
        <div class="scr-row"><span class="scr-pill" data-tone="safe">console-managed</span><span class="scr-small scr-muted">API key set</span></div>
        <div class="scr-row" style="margin-top: 10px"><button type="button" class="scr-btn scr-btn--sm">Probe connection</button><span class="scr-micro scr-muted">live MQTT connect — on demand only</span></div>
        <span class="scr-pill" data-tone="safe" style="margin-top: 8px">connected (console)</span>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between adm-tile-head"><h2 class="scr-h3 scr-row"><ScrIcon name="anchor" /> Marina directory</h2><a class="scr-small scr-strong scr-accent">Open ↗</a></div>
        <div class="scr-stat"><span class="scr-stat-label">Directory size</span><span class="scr-stat-value">6,771<small>marinas</small></span><span class="scr-stat-delta">exact count from the admin list's paging metadata</span></div>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between adm-tile-head"><h2 class="scr-h3 scr-row"><ScrIcon name="compass" /> AIS live feed</h2></div>
        <div class="scr-row"><span class="scr-pill" data-tone="safe">live</span><span class="scr-small scr-muted">Receiving from the Fort Lauderdale station</span></div>
        <div class="scr-stat" style="margin-top: 8px"><span class="scr-stat-label">Contacts (20 min window)</span><span class="scr-stat-value">184<small>vessels</small></span><span class="scr-stat-delta" data-tone="safe">last frame 12 Oct 2026, 09:40:52</span></div>
        <p class="scr-micro scr-muted" style="margin-top: 6px">vessel service · /v0/vessel/live/status</p>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between adm-tile-head"><h2 class="scr-h3 scr-row"><ScrIcon name="store" /> Workspaces</h2><a class="scr-small scr-strong scr-accent">Open ↗</a></div>
        <div class="scr-stat"><span class="scr-stat-label">Tenancies</span><span class="scr-stat-value">1,208<small>workspaces</small></span><span class="scr-stat-delta">exact count from the admin list's paging metadata</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const services = [
  { name: 'vessel', state: 'up', tone: 'safe' }, { name: 'route', state: 'up', tone: 'safe' }, { name: 'marina', state: 'up', tone: 'safe' },
  { name: 'places', state: 'up', tone: 'safe' }, { name: 'events', state: 'up', tone: 'safe' }, { name: 'social', state: 'slow', tone: 'warn', detail: '1.9 s' },
  { name: 'dockpass', state: 'up', tone: 'safe' }, { name: 'sensors', state: 'up', tone: 'safe' }, { name: 'workspace', state: 'up', tone: 'safe' },
  { name: 'ttn', state: 'up', tone: 'safe' }, { name: 'maintenance', state: 'down', tone: 'danger', detail: 'no reply' }, { name: 'pipeline', state: 'up', tone: 'safe' },
]
</script>

<style scoped>
.adm-tile-head { margin-bottom: 10px; }
.adm-tile-head a { white-space: nowrap; }
</style>
