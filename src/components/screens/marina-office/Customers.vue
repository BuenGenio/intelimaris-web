<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Customers</h1>
        <p class="scr-sub">Everyone this marina deals with — the berth holder, the charter company, and the walk-in who gave a name at the fuel dock.</p>
      </div>
      <div class="scr-row">
        <button type="button" class="scr-btn scr-btn--primary" @click="adding = !adding">Add a customer</button>
        <button type="button" class="scr-btn scr-btn--ghost">Dashboard</button>
      </div>
    </div>

    <div v-if="adding" class="scr-card" style="margin-bottom: 14px">
      <p class="scr-card-title">New customer</p>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">A name is all this needs — no WaterWayz account, no email, nothing else you would have to ask for across a busy fuel dock.</p>
      <div class="scr-grid-2">
        <div class="scr-field"><span class="scr-label">Name</span><input class="scr-input" value="" placeholder="However it was given — a person or a company" /></div>
        <div class="scr-field"><span class="scr-label">Phone</span><input class="scr-input" value="" placeholder="If one was given" /></div>
        <div class="scr-field"><span class="scr-label">Email</span><input class="scr-input" value="" /></div>
        <div class="scr-field"><span class="scr-label">Note</span><textarea class="scr-textarea" placeholder="What the next person on the desk needs to know."></textarea></div>
      </div>
      <div class="scr-row" style="margin-top: 12px">
        <button type="button" class="scr-btn scr-btn--primary">Add the customer</button>
        <button type="button" class="scr-btn scr-btn--ghost" @click="adding = false">Cancel</button>
      </div>
    </div>

    <div class="scr-card">
      <p class="scr-card-title">{{ term ? 'Matches across the account' : 'This site’s customers' }}</p>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">{{ term ? 'Every match, including records held by other sites in your account — those show a name and nothing else.' : 'The customers this site knows, most recently added first. Search to reach the rest of the account.' }}</p>
      <div class="scr-toolbar">
        <input v-model="term" class="scr-input scr-input--search" style="max-width: 320px" placeholder="Name, vessel, phone or email" aria-label="Search this account's customers" />
        <span class="scr-chip">Kind: Any</span>
        <span class="scr-chip">50 at a time</span>
      </div>
      <table class="scr-table">
        <thead><tr><th>Name</th><th>Contact</th><th>Held by</th><th>Added</th></tr></thead>
        <tbody>
          <tr v-for="c in shown" :key="c.name" :class="{ 'is-selected': c.name === 'Sam Miller' }">
            <td><span class="scr-strong">{{ c.name }}</span> <span v-if="c.company" class="scr-pill scr-pill--bare" style="margin-left: 6px">Company</span></td>
            <td class="scr-muted">
              <template v-if="c.contact">{{ c.contact }}</template>
              <span v-else-if="c.listed" class="scr-row scr-micro scr-muted" style="gap: 4px"><ScrIcon name="lock" /> Not shown to you here</span>
              <span v-else class="scr-micro scr-muted">Not recorded — nobody has written any down</span>
            </td>
            <td><span class="scr-pill" :data-tone="c.listed ? 'warn' : 'safe'">{{ c.listed ? 'Another site' : 'This site' }}</span></td>
            <td class="scr-num scr-muted">{{ c.added }}</td>
          </tr>
        </tbody>
      </table>
      <p class="scr-micro scr-muted" style="margin-top: 8px">{{ shown.length }} customers {{ term ? 'match' : 'on record at this site' }}.</p>
    </div>

    <div class="scr-section scr-card">
      <p class="scr-card-title">These may be the same person</p>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">1 group to look at. Nothing has been merged — open them and decide.</p>
      <div class="scr-card" style="padding: 10px 12px">
        <div class="scr-row scr-row--wrap">
          <span class="scr-pill" data-tone="warn">Same phone</span><span class="scr-micro scr-muted scr-num">+1 305 555 0188</span>
          <span class="scr-pill" data-tone="warn">Same email</span><span class="scr-micro scr-muted">ana@ruizcharters.com</span>
        </div>
        <ul class="scr-stack--tight" style="margin-top: 8px; display: grid">
          <li class="scr-row"><a href="#" class="scr-strong">Ana Ruiz</a><span class="scr-micro scr-muted">added 2026-09-30</span></li>
          <li class="scr-row"><a href="#" class="scr-strong">Ana Ruiz Charters LLC</a><span class="scr-micro scr-muted">added 2026-10-02</span><span class="scr-micro scr-muted">held by another site</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const adding = ref(false)
const term = ref('')
const rows = [
  { name: 'Sam Miller', contact: 'sam@example.com · +1 305 555 0123', added: '2026-10-03', company: false, listed: false },
  { name: 'Ana Ruiz Charters LLC', contact: '', added: '2026-10-02', company: true, listed: true },
  { name: 'Ana Ruiz', contact: 'ana@ruizcharters.com · +1 305 555 0188', added: '2026-09-30', company: false, listed: false },
  { name: 'Coconuts', contact: 'dock@coconuts.example', added: '2026-09-28', company: true, listed: false },
  { name: 'Priya Natarajan', contact: '+1 954 555 0142', added: '2026-09-27', company: false, listed: false },
  { name: 'Tom Okafor', contact: '', added: '2026-09-25', company: false, listed: false },
  { name: 'Blue Water Yacht Management', contact: 'ops@bwym.example · +1 954 555 0170', added: '2026-09-21', company: true, listed: false },
]
const shown = computed(() => {
  const q = term.value.trim().toLowerCase()
  return q ? rows.filter((r) => `${r.name} ${r.contact}`.toLowerCase().includes(q)) : rows
})
</script>
