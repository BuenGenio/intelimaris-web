<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Emergency</h1><p class="scr-sub">Read this out on channel 16.</p></div>
      <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Back to the map</button>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between em-title">
        <div><p class="scr-card-title">Position, for the radio</p><p class="scr-micro scr-muted">Degrees and decimal minutes first — the form a VHF call uses. Positions come from this device.</p></div>
        <button type="button" class="scr-btn scr-btn--sm">Copy position</button>
      </div>
      <div class="scr-grid-2 em-pos">
        <div><span class="scr-stat-label">Latitude</span><span class="scr-stat-value em-mono">26° 06.84′ N</span></div>
        <div><span class="scr-stat-label">Longitude</span><span class="scr-stat-value em-mono">080° 06.29′ W</span></div>
      </div>
      <p class="em-mono scr-num">26.1140, -80.1048</p>
      <p class="scr-micro scr-muted em-mono">this device · GPS fix 4 s ago · ±6 m</p>
    </div>

    <div class="scr-card em-card">
      <p class="scr-card-title">The script</p>
      <p class="scr-micro scr-muted">MMSI from the vessel profile — say the name three times.</p>
      <p class="em-script">Mayday, mayday, mayday. This is Wanderer, Wanderer, Wanderer. MMSI 367 123 456. Position two six degrees zero six point eight four minutes north, zero eight zero degrees zero six point two nine minutes west. 3 people aboard.</p>
    </div>

    <div class="scr-card em-card">
      <p class="scr-card-title">Who to reach</p>
      <p class="scr-micro scr-muted">Distress, urgency and calling. The red DISTRESS button on a DSC radio sends your MMSI and position automatically. Hold it, then call on 16.</p>
      <div class="scr-grid-2 em-pos">
        <div><span class="scr-stat-label">VHF channel</span><span class="scr-stat-value">16<small>156.800 MHz</small></span></div>
        <div><span class="scr-stat-label">DSC</span><span class="scr-stat-value">Ch 70<small>red button</small></span></div>
      </div>
      <button type="button" class="scr-btn scr-btn--danger scr-btn--block scr-btn--pill em-call"><ScrIcon name="phone" />Call 911</button>
      <p class="scr-micro scr-muted">United States — 911 reaches the Coast Guard through the local dispatcher. VHF 16 reaches them and every vessel around you at once.</p>
    </div>

    <p class="scr-strong em-plain">This screen does not replace VHF 16, DSC or the emergency number. It tells you what to say into them.</p>

    <div class="scr-alert" data-tone="warn">
      <ScrIcon name="alert" />
      <div><strong>Scaffold · DEV-426</strong><span class="scr-small">The broadcast — every vessel in range seeing your bearing and distance — is a real-time service that is not built. Everything above works with no network.</span></div>
    </div>
    <button type="button" class="scr-btn scr-btn--block em-disabled" disabled><ScrIcon name="radio" />Alert nearby vessels — not built yet</button>
    <p class="scr-micro scr-muted em-foot">Not for navigation. Positions come from your device.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
</script>

<style scoped>
.em-title { align-items: flex-start; margin-bottom: 10px; }
.em-pos { gap: 8px; margin-bottom: 8px; }
.em-pos .scr-stat-value { font-size: 19px; }
.em-mono { font-family: var(--font-mono, ui-monospace, monospace); }
.em-card { margin-top: 10px; }
.em-script { margin-top: 8px; padding: 10px 12px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); background: var(--ink-50); font-size: 13.5px; line-height: 1.45; }
.em-call { margin: 6px 0 8px; min-height: 44px; font-size: 14px; }
.em-plain { margin: 12px 0; }
.em-disabled { margin-top: 10px; opacity: 0.55; }
.em-foot { margin-top: 10px; }
</style>
