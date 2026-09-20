<template>
  <div class="scr pdd">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Isle of Venice dock</h1>
        <p class="scr-sub">List your private dock and host visiting vessels.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="accent">Private marina</span>
        <span class="scr-pill">Owner</span>
      </div>
    </div>
    <div class="scr-row" style="margin: -6px 0 12px"><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Storm prep</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Payouts</button></div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Listings</span><span class="scr-stat-value">2</span><span class="scr-stat-delta">1 live</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Waiting</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="warn">requests to answer</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Upcoming</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="safe">confirmed stays</span></div>
      <div class="scr-stat"><span class="scr-stat-label">On duty</span><span class="scr-stat-value">1</span><span class="scr-stat-delta" data-tone="safe">clocked on now</span></div>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title">Requests waiting</p><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">All requests</button></div>
          <p class="scr-sub scr-small" style="margin-bottom: 4px">Hosts answer, guests wait — keep it quick.</p>
          <ul>
            <li v-for="r in requests" :key="r.vessel" class="pdd-row">
              <div style="min-width: 0"><span class="scr-item-title">{{ r.vessel }}</span><span class="scr-item-sub">{{ r.listing }} · {{ r.dates }} · {{ r.price }}</span><span v-if="r.note" class="scr-item-sub">“{{ r.note }}”</span></div>
              <span class="scr-row" style="margin-left: auto; gap: 6px"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Confirm</button><button type="button" class="scr-btn scr-btn--sm">Decline</button></span>
            </li>
          </ul>
        </div>

        <div class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title">The basin now</p><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Layout</button></div>
          <p class="scr-sub scr-small" style="margin-bottom: 8px">As of 4 Oct 2026, 13:40. Every drawn berth answers with what it IS today — only free is free.</p>
          <ScrMap :height="170" :pins="[{ x: 150, y: 120, tone: 'safe' }, { x: 205, y: 120 }, { x: 260, y: 120 }]">
            <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip">Isle of Venice · 3 berths on one dock</span>
            <span class="scr-map-overlay scr-map-overlay--br scr-map-chip">Fixed bridge 17 ft on approach</span>
          </ScrMap>
          <div class="scr-row scr-row--wrap" style="margin-top: 8px"><span class="scr-pill" data-tone="safe">Free · 1</span><span class="scr-pill" data-tone="info">Occupied · 1</span><span class="scr-pill" data-tone="warn">Reserved · 1</span><span class="scr-micro scr-muted" style="margin-left: auto">No gateway at this dock</span></div>
        </div>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Availability windows</p>
          <p class="scr-sub scr-small" style="margin-bottom: 4px">When each berth is offered. Outside a window the listing does not show.</p>
          <ul>
            <li v-for="w in windows" :key="w.berth" class="scr-kv"><span><span class="scr-strong scr-num">{{ w.berth }}</span> · {{ w.size }}</span><span class="scr-num" :class="w.open ? '' : 'scr-muted'">{{ w.window }}</span></li>
          </ul>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Hosts</p>
          <ul>
            <li class="pdd-row"><span class="scr-avatar">SM</span><div><span class="scr-item-title">Sam Miller</span><span class="scr-item-sub">Owner · on duty since 08:00</span></div><span class="scr-pill" data-tone="safe" style="margin-left: auto">On duty</span></li>
            <li class="pdd-row"><span class="scr-avatar">JK</span><div><span class="scr-item-title">Jo Keller</span><span class="scr-item-sub">Co-host · answers requests when Sam is away</span></div><span class="scr-pill" style="margin-left: auto">Admin</span></li>
          </ul>
        </div>
        <div class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title">Open incidents</p><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Incident log</button></div>
          <p class="scr-sub scr-small">Severest first. An unresolved incident is a thing someone must close.</p>
          <p class="scr-small scr-muted" style="margin-top: 6px">Nothing open.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const requests = [
  { vessel: 'Osprey', listing: 'East berth · to 45 ft', dates: '9–11 Oct · 2 nights', price: '$190.00', note: 'Arriving around 16:00, draft 4 ft' },
  { vessel: 'Vessel on the platform', listing: 'West berth · to 35 ft', dates: '17–18 Oct · 1 night', price: '$85.00', note: '' },
]
const windows = [
  { berth: 'East', size: 'to 45 ft · 6 ft', window: '1 Oct – 30 Nov', open: true },
  { berth: 'Middle', size: 'to 40 ft · 5.5 ft', window: 'Wanderer · home berth', open: false },
  { berth: 'West', size: 'to 35 ft · 5 ft', window: 'Weekends, Oct – Dec', open: true },
]
</script>

<style scoped>
.pdd { --scr-accent: #1f6e5e; }
.pdd-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--ink-100); }
.pdd-row:first-child { border-top: 0; }
</style>
