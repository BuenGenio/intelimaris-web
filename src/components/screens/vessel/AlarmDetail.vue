<template>
  <div class="scr">
    <div class="scr-row ad-top"><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm"><ScrIcon name="back" />All alarms</button><span class="scr-spacer"></span><span class="scr-pill" data-tone="warn">Scaffold</span></div>

    <div class="ad-hero">
      <span class="ad-beacon"><ScrIcon name="battery" /></span>
      <h1 class="scr-h1">House battery low</h1>
      <p class="scr-h3 scr-muted">House bank · IM-DEMO-0001</p>
      <p class="ad-do">Start the engine or shut down the fridge and inverter. Below 11.5 V the bank starts losing life.</p>
      <p class="scr-micro scr-muted ad-mono">Battery voltage · 11.8 V · 4 min ago</p>
      <span class="scr-pill scr-pill--bare" data-tone="info">Sample</span>
    </div>

    <div class="scr-grid-3 ad-stats">
      <div class="scr-stat"><span class="scr-stat-label">Now</span><span class="scr-stat-value">11.8<small>V</small></span></div>
      <div class="scr-stat"><span class="scr-stat-label">Threshold</span><span class="scr-stat-value">12.0<small>V</small></span></div>
      <div class="scr-stat"><span class="scr-stat-label">Falling</span><span class="scr-stat-value">0.1<small>V/h</small></span></div>
    </div>
    <div class="scr-card ad-trend">
      <p class="scr-ov">Last 12 hours</p>
      <div class="scr-sparkline"><i v-for="(h, i) in TREND" :key="i" :style="{ height: h + '%' }"></i></div>
      <div class="scr-row scr-row--between scr-micro scr-muted"><span>02:00 · 12.7 V</span><span>14:00 · 11.8 V</span></div>
    </div>

    <div class="scr-alert" data-tone="warn">
      <ScrIcon name="alert" />
      <div>
        <strong>Acknowledging is recorded</strong>
        <span class="scr-small">Alarm low-battery · An acknowledged alarm that is still true does not disappear — it demotes to a strip: “Acknowledged 2 m ago by you — still detecting.”</span>
        <span class="scr-micro">Unit IM-DEMO-0001 · channel battery_voltage · sample</span>
      </div>
    </div>

    <div class="scr-bar"><button type="button" class="scr-btn scr-btn--primary scr-btn--block" disabled title="No alarm lane exists yet (DEV-257); there is nothing to acknowledge.">Acknowledge</button></div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const TREND = [92, 90, 88, 86, 84, 80, 76, 70, 62, 55, 48, 42]
</script>

<style scoped>
.ad-top { margin-bottom: 8px; }
.ad-hero { display: grid; justify-items: center; gap: 6px; padding: 14px 8px 18px; text-align: center; }
.ad-beacon { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; background: var(--warn); color: #fff; box-shadow: 0 0 0 7px rgba(227, 139, 28, 0.2), 0 0 0 14px rgba(227, 139, 28, 0.1), 0 0 0 21px rgba(227, 139, 28, 0.05); margin-bottom: 8px; }
.ad-do { max-width: 300px; font-size: 14px; }
.ad-mono { font-family: var(--font-mono, ui-monospace, monospace); }
.ad-stats { gap: 8px; }
.ad-stats .scr-stat { padding: 10px; }
.ad-stats .scr-stat-value { font-size: 18px; }
.ad-trend { margin: 10px 0 12px; }
.ad-trend .scr-sparkline { margin: 6px 0 4px; }
.ad-trend .scr-sparkline i { background: var(--warn); }
</style>
