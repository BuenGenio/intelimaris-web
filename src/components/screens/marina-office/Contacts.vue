<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Contacts</h1>
        <p class="scr-sub">Owner, skipper, payer and emergency contact as distinct people — read from a vessel, not from a customer.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--ghost">PMS map</button></div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" style="max-width: 320px" placeholder="Vessel name or MMSI" aria-label="Search vessels" />
      <span class="scr-chip is-on">In the basin now</span>
      <span class="scr-chip">Arriving this week</span>
      <span class="scr-chip">Residents</span>
    </div>

    <div class="scr-split">
      <table class="scr-table">
        <thead><tr><th>Vessel</th><th>Berth</th><th>Owner</th><th>Skipper</th><th>Payer</th><th>Emergency</th></tr></thead>
        <tbody>
          <tr v-for="v in vessels" :key="v.name" :class="{ 'is-selected': v.name === 'Wanderer' }">
            <td><span class="scr-strong">{{ v.name }}</span><span class="scr-item-sub">{{ v.spec }}</span></td>
            <td class="scr-num">{{ v.berth }}</td>
            <td>{{ v.owner }}</td>
            <td :class="{ 'scr-muted': v.skipper === 'Same as owner' }">{{ v.skipper }}</td>
            <td :class="{ 'scr-muted': v.payer === 'Same as owner' }">{{ v.payer }}</td>
            <td><span v-if="v.emergency" >{{ v.emergency }}</span><span v-else class="scr-pill" data-tone="warn">Missing</span></td>
          </tr>
        </tbody>
      </table>

      <div class="scr-card">
        <p class="scr-card-title">Wanderer · C-14</p>
        <p class="scr-sub scr-small" style="margin-bottom: 8px">42 ft Sabre · draft 4.6 ft · air draft 21 ft · home port Fort Lauderdale</p>
        <div v-for="p in sheet" :key="p.role" class="scr-item" style="padding: 9px 0">
          <span class="scr-avatar">{{ p.initials }}</span>
          <span><span class="scr-item-title">{{ p.name }}</span><span class="scr-item-sub">{{ p.detail }}</span></span>
          <span class="scr-pill" :data-tone="p.role === 'Emergency contact' ? 'high' : 'accent'">{{ p.role }}</span>
        </div>
        <div class="scr-alert" data-tone="warn" style="margin-top: 10px">
          <ScrIcon name="alert" />
          <span><strong>Owner is also the payer</strong>Charges on this stay go to Sam Miller. Change the payer on the customer record, not here.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const vessels = [
  { name: 'Wanderer', spec: '42 ft Sabre', berth: 'C-14', owner: 'Sam Miller', skipper: 'Same as owner', payer: 'Same as owner', emergency: 'Jo Miller' },
  { name: 'Salt & Light', spec: '38 ft Beneteau', berth: 'C-11', owner: 'Ana Ruiz Charters LLC', skipper: 'Luis Vega', payer: 'Ana Ruiz Charters LLC', emergency: 'Ana Ruiz' },
  { name: 'Halcyon', spec: '52 ft Viking', berth: 'A-03', owner: 'Blue Water Yacht Management', skipper: 'Devon Clarke', payer: 'Priya Natarajan', emergency: '' },
  { name: 'Osprey', spec: '34 ft Catalina', berth: 'B-07', owner: 'Tom Okafor', skipper: 'Same as owner', payer: 'Same as owner', emergency: '' },
  { name: 'Tidewater', spec: '46 ft Grand Banks', berth: 'D-02', owner: 'Priya Natarajan', skipper: 'Same as owner', payer: 'Same as owner', emergency: 'Ravi Natarajan' },
]
const sheet = [
  { initials: 'SM', name: 'Sam Miller', detail: 'sam@example.com · +1 305 555 0123', role: 'Owner' },
  { initials: 'SM', name: 'Sam Miller', detail: 'Held since 2024-05-01', role: 'Skipper' },
  { initials: 'SM', name: 'Sam Miller', detail: 'Invoices and receipts go here', role: 'Payer' },
  { initials: 'JM', name: 'Jo Miller', detail: '+1 305 555 0199 · spouse', role: 'Emergency contact' },
]
</script>
