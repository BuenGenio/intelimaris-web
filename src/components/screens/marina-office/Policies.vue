<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Policies</h1>
        <p class="scr-sub">Confirmation, cancellation and absence rules, stated once.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Save changes</button></div>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div v-for="p in policies" :key="p.title" class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">{{ p.title }}</p><span class="scr-micro scr-muted">Last changed {{ p.changed }}</span></div>
          <p class="scr-sub scr-small" style="margin-bottom: 8px">{{ p.sub }}</p>
          <div class="scr-grid-2">
            <div v-for="r in p.rules" :key="r.label" class="scr-field">
              <span class="scr-label">{{ r.label }}</span>
              <select v-if="r.options" class="scr-select"><option v-for="o in r.options" :key="o" :selected="o === r.value">{{ o }}</option></select>
              <input v-else class="scr-input" :value="r.value" />
              <span v-if="r.hint" class="scr-hint">{{ r.hint }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="scr-stack">
        <div class="scr-card scr-card--accent">
          <p class="scr-card-title">What the guest reads</p>
          <p class="scr-small" style="margin-bottom: 8px">Rendered from the rules on the left, in the confirmation and on DockPass.</p>
          <p class="scr-small">A booking is confirmed when the deposit of one night is paid. Cancel 72 hours or more before arrival for a full refund of the deposit; inside 72 hours the deposit is kept. A vessel not arrived by 18:00 on the day, with no word, is a no-show and the berth is released. Boat show week bookings are non-refundable.</p>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Exceptions in force</p>
          <div class="scr-kv"><span>Boat show week<span class="scr-item-sub">26 Oct – 2 Nov</span></span><span class="scr-pill" data-tone="warn">Non-refundable</span></div>
          <div class="scr-kv"><span>Named storm within 200 nm<span class="scr-item-sub">Automatic</span></span><span class="scr-pill" data-tone="info">Free cancellation</span></div>
          <div class="scr-kv"><span>Residents<span class="scr-item-sub">Agreement on file</span></span><span class="scr-pill" data-tone="safe">No deposit</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Rule = { label: string; value: string; options?: string[]; hint?: string }
const policies: { title: string; sub: string; changed: string; rules: Rule[] }[] = [
  { title: 'Confirmation', sub: 'When a request becomes a booking.', changed: '2 Sep 2026', rules: [
    { label: 'Deposit to confirm', value: 'One night', options: ['None', 'One night', '25% of the stay', '50% of the stay', 'Full stay'] },
    { label: 'Hold an unpaid request for', value: '24 hours', hint: 'Then the berth is offered again.' },
  ] },
  { title: 'Cancellation', sub: 'What the guest gets back, by how late they cancel.', changed: '2 Sep 2026', rules: [
    { label: 'Free cancellation until', value: '72 hours before arrival' },
    { label: 'Inside that window', value: 'Deposit kept', options: ['Deposit kept', 'First night kept', 'Full stay kept'] },
  ] },
  { title: 'Absence and no-show', sub: 'When a berth goes back into inventory.', changed: '14 Jun 2026', rules: [
    { label: 'No-show after', value: '18:00 on arrival day', hint: 'With no word from the vessel.' },
    { label: 'Resident absent over', value: '14 nights', hint: 'The berth may be let as transient; the resident is credited.' },
  ] },
]
</script>
