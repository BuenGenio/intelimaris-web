<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Channels</h1>
        <p class="scr-sub">Direct against marketplace, and which one sold this night.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><span class="scr-chip"><ScrIcon name="calendar" /> October 2026</span></div>
    </div>

    <div class="scr-kpis">
      <div v-for="c in channels" :key="c.name" class="scr-stat">
        <span class="scr-stat-label">{{ c.name }}</span>
        <span class="scr-stat-value">{{ c.nights }} <small>nights</small></span>
        <span class="scr-stat-delta" :data-tone="c.tone">{{ c.revenue }} · {{ c.share }}</span>
      </div>
    </div>

    <div class="scr-split scr-section">
      <div>
        <p class="scr-h3">Channel rules</p>
        <table class="scr-table">
          <thead><tr><th>Channel</th><th>Sells</th><th>Commission</th><th>Instant book</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="r in rules" :key="r.channel">
              <td class="scr-strong">{{ r.channel }}<span class="scr-item-sub">{{ r.note }}</span></td>
              <td>{{ r.sells }}</td>
              <td class="scr-num">{{ r.commission }}</td>
              <td>{{ r.instant }}</td>
              <td><span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></td>
            </tr>
          </tbody>
        </table>
        <p class="scr-micro scr-muted" style="margin-top: 8px">The berth is one inventory. A night sold on one channel closes on every other the moment it is confirmed.</p>
      </div>

      <div class="scr-card">
        <p class="scr-card-title">Nights by channel · October</p>
        <div class="scr-bars">
          <div v-for="c in channels" :key="c.name"><span>{{ c.name }}</span><div class="scr-progress"><i :style="{ width: c.share }"></i></div><span class="scr-num">{{ c.share }}</span></div>
        </div>
        <div class="scr-divider"></div>
        <p class="scr-ov" style="margin-bottom: 6px">Recent nights</p>
        <div v-for="n in recent" :key="n.who + n.stay" class="scr-kv"><span>{{ n.who }}<span class="scr-item-sub">{{ n.stay }}</span></span><span class="scr-pill" :data-tone="n.tone">{{ n.channel }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const channels = [
  { name: 'Direct', nights: 412, revenue: '$61,900', share: '58%', tone: 'safe' },
  { name: 'DockPass', nights: 188, revenue: '$29,410', share: '26%', tone: 'safe' },
  { name: 'Walk-in', nights: 71, revenue: '$9,860', share: '10%', tone: '' },
  { name: 'Agents', nights: 42, revenue: '$8,120', share: '6%', tone: '' },
]
const rules = [
  { channel: 'Direct', note: 'Phone, VHF and the office', sells: 'Every band', commission: '0%', instant: 'Dockmaster decides', status: 'Open', tone: 'safe' },
  { channel: 'DockPass', note: 'WaterWayz marketplace', sells: 'Transient bands', commission: '8%', instant: 'Up to 50 ft', status: 'Open', tone: 'safe' },
  { channel: 'Walk-in', note: 'Fuel dock and the T-head', sells: 'Transient bands', commission: '0%', instant: 'Yes', status: 'Open', tone: 'safe' },
  { channel: 'Agents', note: 'Yacht management and brokers', sells: '50 ft and up', commission: '10%', instant: 'No', status: 'Open', tone: 'safe' },
  { channel: 'Boat show block', note: 'Show organiser allocation', sells: 'Boat show week', commission: '0%', instant: 'No', status: 'Closes 20 Oct', tone: 'warn' },
]
const recent = [
  { who: 'Sam Miller · Wanderer', stay: 'C-14 · 16–19 Oct', channel: 'DockPass', tone: 'info' },
  { who: 'Blue Water Yacht Management · Halcyon', stay: 'A-03 · 26 Oct – 2 Nov', channel: 'Agents', tone: 'accent' },
  { who: 'Tom Okafor · Osprey', stay: 'B-07 · 14–17 Oct', channel: 'Walk-in', tone: 'offline' },
  { who: 'Priya Natarajan · Tidewater', stay: 'D-02 · 10 Oct – 9 Nov', channel: 'Direct', tone: 'safe' },
]
</script>
