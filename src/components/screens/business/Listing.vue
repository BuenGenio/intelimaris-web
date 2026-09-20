<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Listing</h1>
        <p class="scr-sub">What vessels nearby see when they tap your pin — every field with who last stood behind it.</p>
      </div>
      <span class="scr-pill" data-tone="safe">Approved</span>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">On the chart</h2>
          <p class="scr-small scr-muted">Identity is the data source's; corrections ride the operator lane.</p>
          <dl class="lst-dl">
            <div v-for="f in chart" :key="f.label" class="scr-kv"><dt>{{ f.label }}</dt><dd><span>{{ f.value }}</span><span class="scr-micro scr-muted">{{ f.note }}</span></dd></div>
          </dl>
        </div>
        <div class="scr-card">
          <h2 class="scr-card-title">Details</h2>
          <p class="scr-small scr-muted">Each field says who last stood behind it.</p>
          <dl class="lst-dl">
            <div v-for="f in details" :key="f.label" class="scr-kv"><dt>{{ f.label }}</dt><dd><span>{{ f.value }}</span><span class="scr-micro scr-muted">{{ f.note }}</span></dd></div>
          </dl>
        </div>
        <div class="scr-card">
          <h2 class="scr-card-title">Restaurant extras</h2>
          <p class="scr-small scr-muted">The form shape is the taxonomy's; a perishable value carries its age.</p>
          <dl class="lst-dl">
            <div class="scr-kv"><dt>Dockage while dining</dt><dd><span>Yes</span></dd></div>
            <div class="scr-kv"><dt>Courtesy berths</dt><dd><span>4</span></dd></div>
            <div class="scr-kv"><dt>Max LOA</dt><dd><span>60 ft</span></dd></div>
            <div class="scr-kv"><dt>Depth at dock</dt><dd><span class="scr-row" style="justify-content: flex-end">6.0 ft <span class="scr-pill" data-tone="warn">ageing · confirmed 31 h ago</span></span></dd></div>
            <div class="scr-kv"><dt>Reservations</dt><dd><span class="scr-row" style="justify-content: flex-end">By phone <span class="scr-pill scr-pill--bare">Pro</span></span></dd></div>
          </dl>
        </div>
        <div class="scr-row"><button class="scr-btn">Edit listing</button><button class="scr-btn scr-btn--ghost">Claim status</button></div>
      </div>

      <div class="scr-stack">
        <div class="scr-card scr-card--flush">
          <div class="scr-thumb scr-thumb--wide" style="border-radius: 0"></div>
          <div style="padding: 12px 14px">
            <p class="scr-ov">As a vessel sees it</p>
            <p class="scr-strong" style="font-size: 15px; margin-top: 4px">Coconuts</p>
            <p class="scr-small scr-muted">Restaurant · dock and dine · Open until 10 PM</p>
            <div class="scr-chips" style="margin-top: 8px"><span class="scr-pill" data-tone="safe">Courtesy berth free · 2 h ago</span><span class="scr-pill" data-tone="info">6.5 ft reported · 3 d ago</span></div>
            <div class="scr-media" style="margin-top: 10px"><span class="scr-thumb"></span><span class="scr-thumb"></span><span class="scr-thumb"></span></div>
          </div>
        </div>
        <div class="scr-alert"><ScrIcon name="pin" /><span><strong>Position is identity</strong>Fixed by the data source; ask an operator if it is wrong.</span></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const chart = [
  { label: 'Name', value: 'Coconuts', note: 'you corrected this · 14 Sep' },
  { label: 'Category', value: 'Restaurant · dock and dine', note: 'curated' },
  { label: 'Position', value: '26.11842, -80.10937', note: 'Identity — fixed by the data source; ask an operator if it is wrong' },
  { label: 'Reachable', value: 'On the water · landing 12 m', note: '9 m to navigable water' },
]
const details = [
  { label: 'Phone', value: '+1 954 555 0188', note: 'you corrected this · 3 d ago' },
  { label: 'Website', value: 'coconutsfortlauderdale.example', note: 'from the data source' },
  { label: 'Hours', value: 'Mo-Su 11:00-22:00', note: 'you corrected this · 3 d ago' },
  { label: 'Address', value: '429 Seabreeze Blvd, Fort Lauderdale, FL, 33316, US', note: 'you set this' },
  { label: 'Description', value: 'Waterfront tables on the Intracoastal. Tie up on the dock while you eat; no overnight.', note: '' },
  { label: 'Photos', value: '3', note: '' },
]
</script>
<style scoped>
.lst-dl { margin-top: 8px; }
.lst-dl dd { display: grid; justify-items: end; gap: 1px; max-width: 60%; }
</style>
