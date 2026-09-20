<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Bahia Mar</h1>
        <p class="scr-sub">Fri 16 Oct → Sun 18 Oct · 2 nights · in 2 days</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="safe">Confirmed</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Your stays</button></div>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">The stay</h2>
      <dl>
        <div class="scr-kv"><dt>Marina</dt><dd>Bahia Mar</dd></div>
        <div class="scr-kv"><dt>Berth</dt><dd>C-14<span class="scr-item-sub">Assigned by the dockmaster · fits 42 ft on 50 ft</span></dd></div>
        <div class="scr-kv"><dt>Status</dt><dd>Confirmed</dd></div>
        <div class="scr-kv"><dt>Quote</dt><dd>$254.00<span class="scr-item-sub">35 – 50 ft band · 42 ft × $3.02 × 2 nights</span></dd></div>
        <div class="scr-kv"><dt>Your note</dt><dd>Arriving around 16:00; 4.6 ft draft.</dd></div>
      </dl>
    </div>

    <ScrMap variant="basin" :height="150" style="margin-top: 12px" :pins="[{ x: 226, y: 66, tone: 'safe' }]">
      <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip">Dock C · C-14 · port tie, bow in</span>
    </ScrMap>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Arrival prep</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">Every field — until the host states it. Nothing here is drawn from a guess.</p>
      <dl>
        <div class="scr-kv"><dt>Berth</dt><dd class="scr-num">C-14 · enter 250° · port tie · bow in</dd></div>
        <div class="scr-kv"><dt>Terms</dt><dd>Courtesy dock, 2 nights max</dd></div>
        <div class="scr-kv"><dt>VHF</dt><dd class="scr-num">16, working 71 <span class="scr-micro scr-muted">stated by the marina</span></dd></div>
        <div class="scr-kv"><dt>Approach depth</dt><dd class="scr-num">8 ft MLLW <span class="scr-micro scr-muted">sounded 3 d ago</span></dd></div>
        <div class="scr-kv"><dt>Gate code</dt><dd>— <span class="scr-micro scr-muted">Not on the wire yet.</span></dd></div>
      </dl>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Berth history</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">Every hold this stay has had.</p>
      <div class="scr-kv"><span class="scr-strong scr-num">16 Oct → 18 Oct</span><span class="scr-muted scr-small">held · C-14</span></div>
      <div class="scr-kv"><span class="scr-strong scr-num">16 Oct → 18 Oct</span><span class="scr-muted scr-small">released · moved by dockmaster · C-18</span></div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Actions</h2>
      <div class="scr-row" style="margin-top: 8px"><button class="scr-btn">Cancel this stay</button><button class="scr-btn scr-btn--ghost"><ScrIcon name="phone" /> Call the marina</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
</script>
