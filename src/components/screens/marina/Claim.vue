<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Claim your marina</h1>
        <p class="scr-sub">This is my marina. Prove it and let me run it. A person reviews every claim; you will keep working while they do.</p>
      </div>
      <button class="scr-btn scr-btn--ghost">Claim status</button>
    </div>

    <div class="scr-stack">
      <div class="scr-card">
        <h2 class="scr-card-title">Step 1 — find it</h2>
        <p class="scr-sub scr-small">The directory holds every marina the populator found. Not in it? Drop a pin and ask us to add it; a person reviews that too.</p>
        <div class="scr-tabs" style="margin-top: 10px; max-width: 520px">
          <button v-for="m in modes" :key="m" class="scr-tab" :class="{ 'is-on': m === 'Search' }">{{ m }}</button>
        </div>
        <label class="scr-field" style="margin-top: 10px; max-width: 420px"><span class="scr-label">Marina name or alias</span><input class="scr-input scr-input--search" value="Bahia Mar" readonly /><span class="scr-hint">Two characters and the directory is asked.</span></label>
        <div class="scr-list" style="margin-top: 10px">
          <div v-for="r in rows" :key="r.slug" class="scr-item scr-item--plain" :style="r.picked ? 'background: var(--wave-50)' : ''">
            <div class="scr-row scr-row--wrap"><span class="scr-strong">{{ r.name }}</span><span class="scr-micro scr-muted scr-num">{{ r.slug }}</span><span class="scr-small scr-muted">{{ r.kind }}</span><span v-if="r.note" class="scr-small scr-muted">{{ r.note }}</span></div>
            <span v-if="r.picked" class="scr-pill" data-tone="accent">Picked</span>
          </div>
        </div>
        <div class="scr-card scr-card--accent" style="margin-top: 10px; padding: 9px 12px"><span class="scr-strong">Bahia Mar Yachting Center</span> <span class="scr-muted">— a claim will be filed</span><button class="scr-btn scr-btn--ghost scr-btn--sm" style="float: right">Clear</button></div>
      </div>

      <div class="scr-card">
        <h2 class="scr-card-title">Step 2 — file it</h2>
        <p class="scr-sub scr-small">Filing on Bahia Mar Yachting Center. Optional on the wire, but a claim with no evidence is one a reviewer can only guess at.</p>
        <div class="scr-grid-2" style="margin-top: 10px">
          <label class="scr-field"><span class="scr-label">Your name</span><input class="scr-input" value="Sam Miller" readonly /><span class="scr-hint">A reviewer reads this.</span></label>
          <label class="scr-field"><span class="scr-label">Your role at the marina</span><input class="scr-input" value="Dockmaster" readonly /></label>
          <label class="scr-field"><span class="scr-label">Phone</span><input class="scr-input" value="+1 305 555 0123" readonly /><span class="scr-hint">The reviewer calls it.</span></label>
          <label class="scr-field"><span class="scr-label">Email on the marina's domain</span><input class="scr-input" value="sam@bahiamar.example" readonly /><span class="scr-hint">The strongest single signal.</span></label>
        </div>
        <label class="scr-field" style="margin-top: 10px"><span class="scr-label">Anything else</span><input class="scr-input" value="Office line 954 555 0140 rings the dock office; ask for Sam." readonly /></label>
        <div class="scr-row" style="margin-top: 12px"><button class="scr-btn scr-btn--primary">File claim</button></div>
        <p class="scr-micro scr-muted" style="margin-top: 8px">Refusals render in the service's own words: another workspace already claiming this marina opens the contest path; a workspace already holding a marina, or a request still under review, is refused a second.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modes = ['Search', 'Near me', 'On the map', 'Not listed — drop a pin']
const rows = [
  { name: 'Bahia Mar Yachting Center', slug: 'bahia-mar', kind: 'Marina', note: '', picked: true },
  { name: 'Bahia Mar Fuel Dock', slug: 'bahia-mar-fuel', kind: 'Fuel dock', note: 'A facility — nobody claims it', picked: false },
  { name: 'Bahia Cabana Marina', slug: 'bahia-cabana', kind: 'Marina', note: 'Claimed — you can still ask to contest', picked: false },
]
</script>
