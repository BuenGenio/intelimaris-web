<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Bahia Mar</h1>
        <p class="scr-sub">Dates, a note to the host, one action. The quote is the service's number and lands on the stay.</p>
      </div>
      <button class="scr-btn scr-btn--ghost scr-btn--sm">Back to search</button>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">The marina</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">Booked against its price list — the band that fits your length prices the stay.</p>
      <dl>
        <div class="scr-kv"><dt>Marina</dt><dd>Bahia Mar · Fort Lauderdale</dd></div>
        <div class="scr-kv" style="display: block"><dt style="margin-bottom: 6px">Rate bands</dt>
          <dd style="text-align: left; font-weight: 400">
            <div v-for="b in bands" :key="b.name" class="nbk-band" :class="{ 'is-fit': b.fit }">
              <span class="scr-strong">{{ b.name }}</span><span class="scr-num scr-muted">{{ b.rate }}</span><span class="scr-micro scr-muted">{{ b.range }}</span><span v-if="b.instant" class="scr-pill" data-tone="safe">Instant</span><span v-if="b.fit" class="scr-pill" data-tone="accent">Fits 42 ft</span>
            </div>
          </dd>
        </div>
      </dl>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">The stay</h2>
      <div class="scr-stack scr-stack--tight" style="margin-top: 8px">
        <div class="scr-grid-2">
          <label class="scr-field"><span class="scr-label">Check in</span><input class="scr-input" value="16 Oct 2026" readonly /></label>
          <label class="scr-field"><span class="scr-label">Check out</span><input class="scr-input" value="18 Oct 2026" readonly /><span class="scr-hint">2 nights</span></label>
        </div>
        <label class="scr-field"><span class="scr-label">Length overall</span><input class="scr-input scr-num" value="42.0 ft" readonly /><span class="scr-hint">The vessel record's LOA prices the band; this box is for the listing lane.</span></label>
        <label class="scr-field"><span class="scr-label">A note to the host</span><textarea class="scr-textarea" placeholder="Arriving around 16:00; 4.6 ft draft."></textarea></label>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 10px">Rounded half-up on the total, not per night — the server's number, never computed here.</p>
    </div>

    <div class="scr-bar"><button class="scr-btn scr-btn--primary scr-btn--block">Book this marina</button></div>
  </div>
</template>

<script setup lang="ts">
const bands = [
  { name: 'Up to 35 ft', rate: '$3.10 / ft / night', range: '0 – 35 ft', instant: true, fit: false },
  { name: '35 – 50 ft', rate: '$3.02 / ft / night', range: '35 – 50 ft', instant: true, fit: true },
  { name: '50 – 80 ft', rate: '$3.40 / ft / night · min 2 nights', range: '50 – 80 ft', instant: false, fit: false },
  { name: '80 ft and up', rate: '$4.25 / ft / night · min 3 nights', range: '80 ft and up', instant: false, fit: false },
]
</script>

<style scoped>
.nbk-band { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; padding: 6px 8px; border-radius: var(--scr-r-sm); }
.nbk-band.is-fit { background: var(--wave-50); }
</style>
