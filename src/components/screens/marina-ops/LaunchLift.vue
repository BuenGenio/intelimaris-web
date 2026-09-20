<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Launch and lift schedule</h1>
        <p class="scr-sub">Crane, forklift and staging berth as bookable capacity.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">Mon 5 Oct 2026</span>
        <button type="button" class="scr-btn scr-btn--primary">Book a lift</button>
      </div>
    </div>

    <div class="scr-card scr-card--flush" style="margin-bottom: 14px">
      <div class="ll-grid">
        <div class="ll-head"></div>
        <div v-for="h in hours" :key="h" class="ll-head scr-micro scr-muted scr-num">{{ h }}</div>
        <template v-for="r in resources" :key="r.name">
          <div class="ll-res"><span class="scr-strong">{{ r.name }}</span><span class="scr-item-sub">{{ r.sub }}</span></div>
          <div class="ll-lane">
            <span v-for="s in r.slots" :key="s.label" class="ll-slot" :data-tone="s.tone" :style="{ left: `${(s.start - 7) * 10}%`, width: `${s.len * 10}%` }">{{ s.label }}</span>
          </div>
        </template>
      </div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">Booked today</p>
        <table class="scr-table">
          <thead><tr><th>Time</th><th>Vessel</th><th>Move</th><th>Resource</th><th>State</th></tr></thead>
          <tbody>
            <tr v-for="b in bookings" :key="b.time + b.vessel">
              <td class="scr-num">{{ b.time }}</td><td class="scr-strong">{{ b.vessel }}</td><td class="scr-muted">{{ b.move }}</td><td>{{ b.res }}</td><td><span class="scr-pill" :data-tone="b.tone">{{ b.state }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scr-card scr-card--accent">
        <p class="scr-card-title">Capacity this week</p>
        <div class="scr-bars">
          <div><span>Crane 75 t</span><div class="scr-progress"><i style="width: 82%"></i></div><span class="scr-num">82%</span></div>
          <div><span>Forklift</span><div class="scr-progress"><i style="width: 55%"></i></div><span class="scr-num">55%</span></div>
          <div><span>Staging S-1</span><div class="scr-progress"><i style="width: 100%"></i></div><span class="scr-num">100%</span></div>
          <div><span>Staging S-2</span><div class="scr-progress"><i style="width: 40%"></i></div><span class="scr-num">40%</span></div>
        </div>
        <p class="scr-micro scr-muted" style="margin-top: 10px">Staging S-1 is full until Wednesday: Wanderer is due out of the water Thursday and needs it Wednesday night.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hours = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16']
const resources = [
  { name: 'Crane 75 t', sub: 'Lauderdale Marine Service', slots: [{ label: 'Halcyon · haul', start: 8, len: 2, tone: 'info' }, { label: 'Kestrel · launch', start: 11, len: 1.5, tone: 'info' }, { label: 'Held', start: 14, len: 2, tone: 'warn' }] },
  { name: 'Forklift', sub: 'To 12,000 lb', slots: [{ label: 'Dry stack 07–09', start: 7, len: 2, tone: 'safe' }, { label: 'Tern · splash', start: 13, len: 1, tone: 'info' }] },
  { name: 'Staging S-1', sub: '60 ft, 7 ft MLLW', slots: [{ label: 'Halcyon', start: 7, len: 3.5, tone: 'info' }, { label: 'Kestrel', start: 10.5, len: 3, tone: 'info' }, { label: 'Free', start: 13.5, len: 3.5, tone: undefined }] },
  { name: 'Staging S-2', sub: '45 ft, 6 ft MLLW', slots: [{ label: 'Free', start: 7, len: 6, tone: undefined }, { label: 'Tern', start: 13, len: 2, tone: 'info' }] },
]
const bookings = [
  { time: '08:00', vessel: 'Halcyon · 62 ft', move: 'Haul out for survey', res: 'Crane · S-1', state: 'Confirmed', tone: 'safe' },
  { time: '11:00', vessel: 'Kestrel · 55 ft', move: 'Launch after antifoul', res: 'Crane · S-1', state: 'Confirmed', tone: 'safe' },
  { time: '13:00', vessel: 'Tern · 28 ft', move: 'Splash from dry stack', res: 'Forklift · S-2', state: 'Requested', tone: 'warn' },
  { time: '14:00', vessel: 'Held for the yard', move: 'Emergency slot', res: 'Crane', state: 'Held', tone: 'offline' },
]
</script>

<style scoped>
.ll-grid { display: grid; grid-template-columns: 150px repeat(10, minmax(0, 1fr)); font-size: 12px; }
.ll-head { padding: 6px 4px; border-bottom: 1px solid var(--ink-200); background: var(--ink-50); }
.ll-res { padding: 8px 12px; border-top: 1px solid var(--ink-100); display: grid; }
.ll-lane { grid-column: 2 / -1; position: relative; height: 44px; border-top: 1px solid var(--ink-100); background: repeating-linear-gradient(90deg, transparent 0 calc(10% - 1px), var(--ink-100) calc(10% - 1px) 10%); }
.ll-slot { position: absolute; top: 8px; height: 28px; display: flex; align-items: center; padding: 0 8px; border-radius: 6px; font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; background: var(--ink-100); color: var(--ink-700); }
.ll-slot[data-tone='info'] { background: var(--wave-100); color: var(--wave-700); }
.ll-slot[data-tone='safe'] { background: #e6f5ea; color: #1f6d36; }
.ll-slot[data-tone='warn'] { background: #fdf1e2; color: #9a5a0b; }
</style>
