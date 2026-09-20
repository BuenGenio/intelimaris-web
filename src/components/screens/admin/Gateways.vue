<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Gateways</h1>
        <p class="scr-sub">Where the LoRaWAN coverage is. Click the map to place a gateway; drag one to move it; retire hardware that comes down rather than deleting it.</p>
      </div>
      <span class="scr-row"><a class="scr-small scr-strong scr-accent">The TTN bridge</a><button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button></span>
    </div>

    <ScrMap variant="chart" :height="260" :pins="pins">
      <div class="scr-map-overlay scr-map-overlay--tl"><span class="scr-map-chip"><span class="scr-dot" data-tone="info"></span>Installed · <span class="scr-dot" data-tone="warn"></span>Offline · <span class="scr-dot"></span>Planned</span></div>
      <div class="scr-map-overlay scr-map-overlay--br"><span class="scr-map-chip">Fort Lauderdale · New River to Port Everglades</span></div>
    </ScrMap>

    <div class="scr-row" style="margin: 12px 0 10px">
      <button type="button" class="scr-chip">Status: Every status <span aria-hidden="true">⌄</span></button>
      <span class="scr-micro scr-muted" style="margin-left: auto">7 gateways: 4 installed · 1 offline · 1 planned · 1 retired</span>
    </div>

    <table class="scr-table" aria-label="Gateways">
      <thead><tr><th>Name</th><th>Status</th><th>Last heard</th><th>Site</th><th>Position</th></tr></thead>
      <tbody>
        <tr v-for="g in gateways" :key="g.eui">
          <td><span class="scr-strong">{{ g.name }}</span><div class="scr-micro scr-muted scr-num" style="font-family: monospace">{{ g.eui }}</div></td>
          <td><span class="scr-pill" :data-tone="g.tone">{{ g.status }}</span></td>
          <td class="scr-small scr-muted" style="white-space: nowrap">{{ g.heard }}</td>
          <td class="scr-small">{{ g.site }}</td>
          <td class="scr-micro scr-muted scr-num" style="font-family: monospace; white-space: nowrap">{{ g.pos }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const pins: { x: number; y: number; tone: 'info' | 'warn' | 'safe' | 'high' | 'danger' }[] = [
  { x: 205, y: 120, tone: 'info' }, { x: 230, y: 150, tone: 'info' }, { x: 170, y: 80, tone: 'info' }, { x: 260, y: 60, tone: 'warn' }, { x: 190, y: 190, tone: 'info' }, { x: 300, y: 170, tone: 'info' },
]
const gateways = [
  { name: 'Bahia Mar fuel dock roof', eui: 'A84041FFFE1C2B01', status: 'Installed', tone: 'safe', heard: 'Heard 4 min ago', site: 'Marina · Bahia Mar', pos: '26.11418, -80.10604 · 9 m up' },
  { name: 'Bahia Mar C-dock mast', eui: 'A84041FFFE1C2B02', status: 'Installed', tone: 'safe', heard: 'Heard 11 min ago', site: 'Marina · Bahia Mar', pos: '26.11391, -80.10662 · 6 m up' },
  { name: 'Lauderdale Marine Service shed', eui: 'A84041FFFE1C2B09', status: 'Installed', tone: 'safe', heard: 'Heard just now', site: 'Workspace · lauderdale-marine-service', pos: '26.09622, -80.15537 · 12 m up' },
  { name: 'Pier Sixty-Six tower', eui: 'A84041FFFE1C2A77', status: 'Installed', tone: 'safe', heard: 'Heard 2 min ago', site: 'Marina · Pier Sixty-Six Marina', pos: '26.10121, -80.11985 · 48 m up' },
  { name: 'Las Olas bridge tender', eui: 'A84041FFFE1C2A31', status: 'Offline', tone: 'warn', heard: 'Heard 3 d ago', site: 'Marina · Las Olas Marina', pos: '26.11826, -80.11207 · 7 m up' },
  { name: 'Isle of Venice dock (planned)', eui: 'A84041FFFE1C2C10', status: 'Planned', tone: 'offline', heard: 'Not heard yet', site: 'Workspace · isle-of-venice-dock', pos: '26.11855, -80.12160' },
  { name: 'Old Bahia Mar office', eui: 'A84041FFFE1C1F04', status: 'Retired', tone: 'danger', heard: 'Heard 212 d ago', site: 'Marina · Bahia Mar', pos: '26.11440, -80.10590 · 5 m up' },
]
</script>
