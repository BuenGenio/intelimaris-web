<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Walk-in</h1>
        <p class="scr-sub">Someone is on the VHF asking if you have room tonight. Will it fit, and what does it cost?</p>
      </div>
      <button class="scr-btn scr-btn--ghost">Berth map</button>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">The vessel</h2>
          <p class="scr-sub scr-small">Stated figures in ft; sent to the engine in metres. Blank is unknown, never zero.</p>
          <div class="scr-grid-3" style="margin-top: 10px">
            <label class="scr-field"><span class="scr-label">Length overall</span><input class="scr-input" value="42 ft" readonly /></label>
            <label class="scr-field"><span class="scr-label">Beam</span><input class="scr-input" value="13.5 ft" readonly /></label>
            <label class="scr-field"><span class="scr-label">Draft</span><input class="scr-input" value="4.6 ft" readonly /></label>
          </div>
          <div class="scr-row" style="margin-top: 10px"><button class="scr-btn scr-btn--primary">Will it fit</button><span class="scr-micro scr-muted">Wanderer · Sabre 42 · Sam Miller on channel 71</span></div>
        </div>

        <div class="scr-alert" data-tone="safe">
          <ScrIcon name="check" />
          <div><strong>fits</strong>This marina takes a 42 ft vessel with 4.6 ft draft: 27 berths fit today, 3 on Dock C near the fuel dock. Approach 8 ft MLLW.</div>
        </div>

        <div v-for="g in groups" :key="g.title" class="scr-card">
          <h2 class="scr-card-title">{{ g.title }}</h2>
          <p class="scr-sub scr-small">{{ g.rows.length }} berth{{ g.rows.length === 1 ? '' : 's' }}</p>
          <div class="scr-divider"></div>
          <div v-for="b in g.rows" :key="b.label" class="scr-row wi-row">
            <span class="scr-num scr-strong">{{ b.label }}</span>
            <span class="scr-pill" :data-tone="g.tone">{{ g.title }}</span>
            <span class="scr-small scr-muted" style="flex: 1; min-width: 0">{{ b.summary }}</span>
            <button v-if="g.title !== 'Too small'" class="scr-btn scr-btn--ghost scr-btn--sm">Walk her in</button>
          </div>
        </div>
        <p class="scr-micro scr-muted">Fit is a check of stated figures against stated limits. The dock decides.</p>
      </div>

      <div class="scr-card">
        <h2 class="scr-card-title">What does it cost</h2>
        <p class="scr-sub scr-small">The marina's own price list, by length. The band she falls in prices the stay.</p>
        <div class="scr-divider"></div>
        <div v-for="r in rates" :key="r.name" class="scr-row wi-row">
          <span class="scr-strong">{{ r.name }}</span>
          <span class="scr-num">{{ r.rate }}</span>
          <span class="scr-small scr-muted">{{ r.range }}</span>
          <span class="scr-spacer"></span>
          <span v-if="r.hers" class="scr-pill" data-tone="safe">Her band</span>
        </div>
        <div class="scr-divider"></div>
        <dl class="scr-dl">
          <dt>Tonight</dt><dd class="scr-num">$98.00</dd>
          <dt>Three nights</dt><dd class="scr-num">$294.00</dd>
          <dt>Power, 50 A</dt><dd class="scr-num">$18.00 / night</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const groups = [
  { title: 'Takes this vessel', tone: 'safe', rows: [
    { label: 'C-13', summary: '45 ft LOA · 15 ft beam · 6.5 ft max draft · 50 A · free tonight' },
    { label: 'C-14', summary: '45 ft LOA · 15 ft beam · 6.5 ft max draft · 50 A · free tonight' },
    { label: 'B-9', summary: '44 ft LOA · 14 ft beam · 6 ft max draft · 30 A · free tonight' },
  ] },
  { title: 'Too small', tone: 'danger', rows: [
    { label: 'A-4', summary: '36 ft LOA: she is 42 ft' },
    { label: 'B-1', summary: '40 ft LOA: she is 42 ft' },
  ] },
  { title: 'Not enough stated', tone: undefined, rows: [
    { label: 'Face 6', summary: 'No max draft stated; the berth cannot say' },
  ] },
]
const rates = [
  { name: 'Up to 35 ft', rate: '$2.10 / ft', range: '0 – 35 ft', hers: false },
  { name: '35 to 45 ft', rate: '$2.35 / ft', range: '35 – 45 ft', hers: true },
  { name: '45 to 60 ft', rate: '$2.75 / ft', range: '45 – 60 ft', hers: false },
  { name: '60 ft and up', rate: '$3.40 / ft', range: '60 ft and up', hers: false },
]
</script>

<style scoped>
.wi-row { padding: 7px 0; }
.wi-row + .wi-row { border-top: 1px solid var(--ink-100); }
</style>
