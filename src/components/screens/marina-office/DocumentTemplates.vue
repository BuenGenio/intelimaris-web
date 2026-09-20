<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Document templates</h1>
        <p class="scr-sub">The agreements and notices this marina sends.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">New template</button></div>
    </div>

    <div class="scr-split">
      <table class="scr-table">
        <thead><tr><th>Template</th><th>Kind</th><th>Sent as</th><th>Version</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="t in templates" :key="t.name" :class="{ 'is-selected': t.name === 'Annual slip agreement' }">
            <td class="scr-strong">{{ t.name }}<span class="scr-item-sub">{{ t.used }}</span></td>
            <td>{{ t.kind }}</td>
            <td>{{ t.as }}</td>
            <td class="scr-num scr-muted">v{{ t.version }} · {{ t.changed }}</td>
            <td><span class="scr-pill" :data-tone="t.tone">{{ t.status }}</span></td>
          </tr>
        </tbody>
      </table>

      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">Annual slip agreement · v7</p><span class="scr-pill" data-tone="safe">Published</span></div>
        <p class="scr-micro scr-muted">PDF for signature · 38 sent in 2026 · last changed 1 Sep by Owner</p>
        <div class="scr-divider"></div>
        <p class="scr-ov" style="margin-bottom: 6px">Merge fields</p>
        <div class="scr-chips" style="margin-bottom: 10px">
          <span v-for="f in merge" :key="f" class="scr-chip" style="min-height: 26px; padding: 2px 9px; font-size: 11px">{{ f }}</span>
        </div>
        <p class="scr-ov" style="margin-bottom: 6px">Preview · Sam Miller</p>
        <div class="scr-card" style="padding: 10px 12px; font-size: 12px; line-height: 1.5">
          <p><strong>Bahia Mar Marina</strong> agrees to let berth <strong>C-14</strong> to <strong>Sam Miller</strong> for the vessel <strong>Wanderer</strong> (42 ft Sabre, MMSI 367 123 456) from <strong>1 Nov 2026</strong> to <strong>31 Oct 2027</strong> at <strong>$1,470.00</strong> per month, payable on the first…</p>
        </div>
        <div class="scr-row" style="margin-top: 12px">
          <button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Edit a draft of v8</button>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Version history</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const templates = [
  { name: 'Annual slip agreement', used: '38 sent in 2026', kind: 'Agreement', as: 'PDF for signature', version: 7, changed: '1 Sep', status: 'Published', tone: 'safe' },
  { name: 'Transient berthing terms', used: 'Attached to every confirmation', kind: 'Terms', as: 'PDF', version: 4, changed: '2 Sep', status: 'Published', tone: 'safe' },
  { name: 'Booking confirmation', used: '412 sent in October', kind: 'Notice', as: 'Email + SMS', version: 12, changed: '3 Oct', status: 'Published', tone: 'safe' },
  { name: 'Arrival instructions', used: '388 sent in October', kind: 'Notice', as: 'Email', version: 9, changed: '3 Oct', status: 'Published', tone: 'safe' },
  { name: 'Renewal notice', used: '60 days before term end', kind: 'Notice', as: 'Email + PDF', version: 3, changed: '14 Jun', status: 'Published', tone: 'safe' },
  { name: 'Storm preparation notice', used: 'On a named storm watch', kind: 'Notice', as: 'SMS', version: 2, changed: '12 Oct', status: 'Draft', tone: 'warn' },
  { name: 'Invoice', used: 'Every issued invoice', kind: 'Financial', as: 'PDF', version: 5, changed: '1 Jul', status: 'Published', tone: 'safe' },
]
const merge = ['customer.name', 'vessel.name', 'vessel.loa', 'vessel.mmsi', 'berth.label', 'term.from', 'term.to', 'rate.monthly', 'marina.name', 'marina.vhf']
</script>
