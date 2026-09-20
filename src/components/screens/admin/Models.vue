<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1 scr-row">Models <span class="scr-pill" data-tone="warn">Scaffold</span></h1>
        <p class="scr-sub">The AI loop's models: id and version, when each last ran, how it scored, and which feature windows it consumes. Every prediction already names its model; this is the list of them.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm">Hide sample rows</button>
    </div>

    <div class="scr-alert" data-tone="warn" style="margin-bottom: 12px">
      <ScrIcon name="alert" />
      <div><strong>Scaffold — DEV-85</strong>Predictions carry model_id@version provenance today, but no lane lists the distinct models or their runs. Rows here are samples when shown; promote and retire wait on the registry.</div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" placeholder="model_id@version…" aria-label="Search models" style="max-width: 300px" />
      <button type="button" class="scr-chip">Status: Every model <span aria-hidden="true">⌄</span></button>
    </div>

    <table class="scr-table" aria-label="Model registry">
      <thead><tr><th>Model</th><th>Status</th><th>Last run</th><th>Eval</th><th>Consumes</th><th>Lifecycle</th></tr></thead>
      <tbody>
        <tr v-for="m in models" :key="m.ref">
          <td><span class="scr-row" style="gap: 8px"><span class="scr-strong scr-num" style="font-family: monospace; font-size: 11.5px">{{ m.ref }}</span><span class="scr-pill">Sample</span></span></td>
          <td><span class="scr-pill" :data-tone="m.tone">{{ m.status }}</span></td>
          <td class="scr-small scr-muted" style="white-space: nowrap">{{ m.lastRun }}</td>
          <td class="scr-small">{{ m.eval }}</td>
          <td class="scr-micro scr-muted scr-num" style="font-family: monospace">{{ m.consumes }}</td>
          <td><button type="button" class="scr-btn scr-btn--sm" disabled style="opacity: 0.5" title="Needs the registry — DEV-85.">{{ m.status === 'Active' ? 'Retire' : 'Promote' }}</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const models = [
  { ref: 'engine-health@1.4.0', status: 'Active', tone: 'safe', lastRun: '2 h ago', eval: 'AUROC 0.91', consumes: 'engine_1h' },
  { ref: 'bilge-ingress@0.3.1', status: 'Candidate', tone: 'info', lastRun: 'never', eval: '—', consumes: '—' },
  { ref: 'battery-endurance@2.0.2', status: 'Active', tone: 'safe', lastRun: '35 min ago', eval: 'MAE 0.42 h', consumes: 'battery_15m, shore_power_1h' },
  { ref: 'shore-power-fault@1.1.0', status: 'Active', tone: 'safe', lastRun: '6 h ago', eval: 'AUROC 0.87', consumes: 'shore_power_1h' },
  { ref: 'engine-health@1.3.2', status: 'Retired', tone: 'offline', lastRun: '14 d ago', eval: 'AUROC 0.88', consumes: 'engine_1h' },
]
</script>
