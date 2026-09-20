<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Bahia Mar</h1>
        <p class="scr-micro scr-muted scr-num">bahia-mar</p>
        <div class="scr-chips" style="margin-top: 8px; align-items: center">
          <span class="scr-pill">marina</span><span class="scr-pill" data-tone="offline">Imported</span><span class="scr-pill" data-tone="safe">Claim: approved</span><span class="scr-pill" data-tone="accent">Corrected</span>
          <a class="scr-small scr-strong scr-accent">Open the claiming workspace</a>
        </div>
      </div>
    </div>

    <div class="scr-tabs scr-tabs--line" style="margin-bottom: 14px">
      <button v-for="t in tabs" :key="t" type="button" class="scr-tab" :class="{ 'is-on': t === 'Overview' }">{{ t }}</button>
    </div>

    <div class="scr-chips" style="margin-bottom: 12px">
      <button type="button" class="scr-btn scr-btn--sm scr-btn--primary"><ScrIcon name="map" /> Open berth map</button>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="list" /> Occupancy board</button>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="anchor" /> Berth board</button>
    </div>

    <div class="scr-card scr-card--flush">
      <ScrMap variant="satellite" :height="200" :pins="[{ x: 205, y: 118, tone: 'safe' }, { x: 150, y: 70, tone: 'info' }]">
        <div class="scr-map-overlay scr-map-overlay--bl"><span class="scr-tabs" style="background: rgba(255,255,255,0.92)"><span class="scr-tab is-on">Satellite</span><span class="scr-tab">Survey</span></span></div>
      </ScrMap>
      <p class="scr-micro scr-muted" style="padding: 7px 12px; border-top: 1px solid var(--ink-200)">26.11418, -80.10604 — the teal pin is the record's own point. A teal outline is the mapped basin; grey lines are piers and breakwaters, ink dots are facilities (fuel, water, shore power, pump-out); navy rings are installed LoRaWAN gateways. Survey: our own orthomosaic, flown 2 Oct 2026, 3 cm per pixel.</p>
    </div>

    <div class="scr-card scr-section" style="margin-top: 12px">
      <h2 class="scr-h3" style="margin-bottom: 6px">The record</h2>
      <dl class="scr-grid-2" style="gap: 4px 20px">
        <div v-for="f in facts" :key="f.label" class="scr-kv" style="border-top: 0; padding: 3px 0"><dt>{{ f.label }}</dt><dd class="scr-small" :class="{ 'scr-muted': !f.value }" style="text-align: right">{{ f.value ?? '—' }}</dd></div>
      </dl>
    </div>

    <div class="scr-grid-3" style="margin-top: 12px">
      <div class="scr-card"><h2 class="scr-h3">Claim</h2><p class="scr-small" style="margin-top: 4px">Claimed — the marina runs its own berth map, rates and bookings.</p><a class="scr-small scr-strong scr-accent" style="display: inline-block; margin-top: 6px">Workspace ws-bahia…</a></div>
      <div class="scr-card"><h2 class="scr-h3">Coverage</h2><ul style="margin-top: 4px"><li class="scr-small"><span class="scr-strong">Bahia Mar fuel dock roof</span> <span class="scr-micro scr-muted">Heard 4 min ago</span></li><li class="scr-small"><span class="scr-strong">Bahia Mar C-dock mast</span> <span class="scr-micro scr-muted">Heard 11 min ago</span></li></ul><a class="scr-small scr-strong scr-accent" style="display: inline-block; margin-top: 6px">All gateways</a></div>
      <div class="scr-card"><h2 class="scr-h3">Open incidents</h2><p class="scr-small" style="margin-top: 4px">1 open incident — a fuel sheen off B-dock, reported 11 Oct.</p><a class="scr-small scr-strong scr-accent" style="display: inline-block; margin-top: 6px">The incident log</a></div>
    </div>

    <div class="scr-section">
      <div class="scr-row scr-row--between" style="margin-bottom: 8px"><h2 class="scr-h3">Upcoming events</h2><span class="scr-micro scr-muted">What the marina has posted — read-only.</span></div>
      <div class="scr-list">
        <div v-for="e in events" :key="e.title" class="scr-item scr-item--plain">
          <span><span class="scr-item-title">{{ e.title }}</span><span class="scr-item-sub">{{ e.when }}</span></span>
          <span class="scr-item-end"><span class="scr-pill">{{ e.kind }}</span><span v-if="e.nav" class="scr-pill" data-tone="warn">Affects navigation</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const tabs = ['Overview', 'Bookings', 'Staff', 'Settings', 'Rates', 'Layout', 'Notes', 'Chat', 'Audit']
const facts: { label: string; value: string | null }[] = [
  { label: 'Address', value: '801 Seabreeze Blvd, Fort Lauderdale, FL 33316' },
  { label: 'Phone', value: '+1 954 555 0180' },
  { label: 'Website', value: 'bahiamaryachtingcenter.com' },
  { label: 'Hours', value: 'Dock office 07:00–19:00' },
  { label: 'Layout', value: '4 piers, 1 breakwater · 250 berths drawn' },
  { label: 'Amenities', value: 'fuel, water, shore power, pump-out, showers, laundry' },
  { label: 'Aliases', value: 'bahia-mar-yachting-center, bahia-mar-resort-marina' },
  { label: 'Last fetched', value: '9 Oct 2026' },
  { label: 'Courtesy berths', value: '2 (T-head, 2 h, restaurant patrons)' },
  { label: 'VHF', value: '16 / 71' },
]
const events = [
  { title: 'Fort Lauderdale International Boat Show', when: '28 Oct – 1 Nov 2026 · whole basin', kind: 'show', nav: true },
  { title: 'Fuel dock closed for pump service', when: '19 Oct 2026, 06:00–12:00', kind: 'closure', nav: false },
  { title: 'Dock and dine night at Coconuts', when: '24 Oct 2026, 17:00–22:00', kind: 'social', nav: false },
]
</script>
