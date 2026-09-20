<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Coconuts</h1>
        <p class="scr-sub">Your on-water business, found by vessels nearby.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">Business</span><span class="scr-pill scr-pill--bare">Owner</span></div>
    </div>

    <div class="scr-card" style="display: flex; gap: 16px; align-items: center">
      <span class="scr-item-icon" data-tone="safe" style="width: 56px; height: 56px; border-radius: 50%"><ScrIcon name="check" /></span>
      <div style="flex: 1; min-width: 0">
        <h2 class="scr-h2">Coconuts · Approved</h2>
        <p class="scr-small scr-muted" style="margin-top: 3px">A person reviewed your evidence and stood behind it. Your corrections outrank the crowd-sourced data.</p>
      </div>
      <button class="scr-btn">Claim status</button>
    </div>

    <div class="scr-split scr-section">
      <div class="scr-card">
        <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">On the chart</h2><p class="scr-small scr-muted">What a vessel sees when it taps your pin.</p></div><button class="scr-btn scr-btn--ghost scr-btn--sm">Full listing</button></div>
        <dl style="margin-top: 8px">
          <div class="scr-kv"><dt>Category</dt><dd>Restaurant · dock and dine</dd></div>
          <div class="scr-kv"><dt>Hours</dt><dd>Mo-Su 11:00-22:00</dd></div>
          <div class="scr-kv"><dt>Phone</dt><dd>+1 954 555 0188</dd></div>
          <div class="scr-kv"><dt>Reachable</dt><dd>On the water · landing 12 m from the table</dd></div>
          <div class="scr-kv"><dt>Visible</dt><dd><span class="scr-pill" data-tone="safe">On the chart</span></dd></div>
        </dl>
      </div>
      <ScrMap :height="232" :pins="[{ x: 214, y: 128, tone: 'safe' }]" :self="{ x: 150, y: 190, heading: 40 }">
        <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip"><ScrIcon name="store" />Coconuts · Isle of Venice</span>
        <span class="scr-map-overlay scr-map-overlay--br scr-map-chip">Wanderer · 6 min out</span>
      </ScrMap>
    </div>

    <div class="scr-card scr-section">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">Dock and dine — holds</h2><p class="scr-small scr-muted">Vessels on their way who asked for a courtesy berth. A hold is for the next while, not a booking.</p></div><button class="scr-btn scr-btn--ghost scr-btn--sm">Berths</button></div>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="h in holds" :key="h.berth" class="scr-row scr-row--wrap" style="padding: 8px 0; border-top: 1px solid var(--ink-100)">
          <span class="scr-strong scr-num">{{ h.berth }}</span><span>{{ h.vessel }}</span><span class="scr-pill" data-tone="warn">{{ h.until }}</span><span class="scr-small scr-muted">{{ h.left }} min left</span>
          <span class="scr-spacer"></span><button class="scr-btn scr-btn--ghost scr-btn--sm">Release — berth needed</button>
        </li>
      </ul>
    </div>

    <div class="scr-kpis scr-section">
      <div class="scr-stat"><span class="scr-stat-label">Holds today</span><span class="scr-stat-value">7</span><span class="scr-stat-delta">2 live now</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Courtesy berths</span><span class="scr-stat-value">4</span><span class="scr-stat-delta">2 free</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Reports live</span><span class="scr-stat-value">5</span><span class="scr-stat-delta" data-tone="safe">newest 2 h ago</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Listing last confirmed</span><span class="scr-stat-value">3<small>d ago</small></span><span class="scr-stat-delta">hours and phone</span></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const holds = [
  { berth: 'D&D 1', vessel: 'Wanderer', until: 'until 7:45 PM', left: 34 },
  { berth: 'D&D 3', vessel: 'Sea Change', until: 'until 8:10 PM', left: 59 },
]
</script>
