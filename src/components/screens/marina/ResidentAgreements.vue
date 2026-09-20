<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Agreements</h1>
        <p class="scr-sub">The signed contract behind a tenancy, versioned. Opened from a resident on the Residents board.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">Partial</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Residents</button></div>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--wrap">
        <span class="scr-num scr-strong">C-14</span>
        <span class="scr-pill scr-pill--bare">Resident</span>
        <div><span class="scr-item-title" style="color: #4274bb">Wanderer</span><span class="scr-item-sub">2026-11-01 → 2027-04-30 · Sam Miller · sam@example.com · 42 ft LOA</span></div>
        <span class="scr-spacer"></span>
        <button class="scr-btn scr-btn--ghost scr-btn--sm">Hide the agreement</button>
        <button class="scr-btn scr-btn--primary scr-btn--sm">Renew</button>
      </div>
      <div class="scr-divider"></div>

      <div class="scr-alert" data-tone="safe" style="margin-bottom: 10px">
        <ScrIcon name="check" />
        <div><strong>Renewed</strong><span class="scr-strong">BM-2025-0417</span> is still on the record below, superseded by <span class="scr-strong">BM-2026-0221</span> · rate up 4.2%.</div>
      </div>

      <ol class="scr-stack scr-stack--tight">
        <li v-for="a in chain" :key="a.ref" class="scr-card" style="padding: 10px 12px">
          <div class="scr-row scr-row--wrap">
            <span class="scr-num scr-strong">{{ a.ref }}</span>
            <span v-for="p in a.pills" :key="p.label" class="scr-pill" :data-tone="p.tone">{{ p.label }}</span>
            <span class="scr-small scr-muted">{{ a.term }}</span>
            <span class="scr-spacer"></span>
            <span class="scr-num scr-strong">{{ a.rate }}</span>
          </div>
          <p class="scr-small scr-muted" style="margin-top: 3px">{{ a.line }}</p>
          <p v-if="a.replaced" class="scr-micro scr-muted" style="margin-top: 3px">{{ a.replaced }}</p>
        </li>
      </ol>

      <div class="scr-card scr-section" style="padding: 12px">
        <h3 class="scr-h3">Renew this resident</h3>
        <p class="scr-small scr-muted">A renewal is a new agreement. The one they are on is kept and linked to this one; nothing is overwritten.</p>
        <p class="scr-micro scr-muted">They are on BM-2026-0221 at $1,260.00 / month, covering 2026-11-01 → 2027-04-30.</p>
        <div class="scr-grid-2" style="margin-top: 10px">
          <label class="scr-field"><span class="scr-label">Document reference</span><input class="scr-input" value="BM-2027-0058" readonly /><span class="scr-hint">The office's own filing reference.</span></label>
          <label class="scr-field"><span class="scr-label">Charged</span><select class="scr-select"><option>Monthly</option></select><span class="scr-hint">How often the rate is charged, not how long the agreement runs.</span></label>
          <label class="scr-field"><span class="scr-label">Rate (USD)</span><input class="scr-input" value="1,310.00" readonly /></label>
          <label class="scr-field"><span class="scr-label">Deposit (USD)</span><input class="scr-input" value="2,620.00" readonly /></label>
          <label class="scr-field"><span class="scr-label">Covers from</span><input class="scr-input" type="date" value="2027-05-01" readonly /></label>
          <label class="scr-field"><span class="scr-label">Covers up to</span><input class="scr-input" type="date" value="2027-10-31" readonly /></label>
          <label class="scr-field"><span class="scr-label">Billed to</span><input class="scr-input" value="Sam Miller · sam@example.com" readonly /></label>
          <label class="scr-field"><span class="scr-label">Signed by</span><input class="scr-input" placeholder="Leave blank to hold it as a draft" readonly /></label>
        </div>
        <div class="scr-row" style="margin-top: 10px"><button class="scr-btn scr-btn--primary">Renew</button><button class="scr-btn scr-btn--ghost">Cancel</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const chain = [
  { ref: 'BM-2025-0417', pills: [{ label: 'Superseded', tone: undefined }], term: '2025-11-01 → 2026-04-30', rate: '$1,209.00 / month', line: 'Deposit $2,418.00 · billed to Sam Miller (customer on file) · signed by Sam Miller', replaced: 'Replaced by BM-2026-0221 from 2026-11-01. This row keeps its own rate and signature.' },
  { ref: 'BM-2026-0221', pills: [{ label: 'In force', tone: 'accent' }], term: '2026-11-01 → 2027-04-30', rate: '$1,260.00 / month', line: 'Deposit $2,520.00 · billed to Sam Miller (customer on file) · signed by Sam Miller', replaced: '' },
  { ref: 'BM-2027-0058', pills: [{ label: 'Draft', tone: 'warn' }], term: '2027-05-01 → 2027-10-31', rate: '$1,310.00 / month', line: 'Deposit $2,620.00 · billed to Sam Miller · unsigned', replaced: '' },
]
</script>
