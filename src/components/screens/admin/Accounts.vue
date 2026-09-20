<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Accounts</h1>
        <p class="scr-sub">Every account on the platform — the customer that pays, holds the people, and contains its workspaces. Read only: the subscription belongs to each account's owner and billing roles.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" placeholder="Account name or slug…" aria-label="Search accounts by name or slug" style="max-width: 320px" />
      <button type="button" class="scr-chip">Billing: Any <span aria-hidden="true">⌄</span></button>
    </div>

    <table class="scr-table" aria-label="Every account on the platform">
      <thead><tr><th>Account</th><th class="scr-num">Workspaces</th><th class="scr-num">Members</th><th>Subscription</th><th>Cadence</th><th>Created</th></tr></thead>
      <tbody>
        <tr v-for="a in accounts" :key="a.slug" :class="{ 'is-selected': a.slug === 'miller-family' }">
          <td><a class="scr-strong">{{ a.name }}</a><div class="scr-small scr-muted">{{ a.slug }}</div></td>
          <td class="scr-num">{{ a.workspaces }}</td>
          <td class="scr-num">{{ a.members }}</td>
          <td><span class="scr-pill" :data-tone="a.tone">{{ a.subscription }}</span></td>
          <td>{{ a.cadence }}</td>
          <td class="scr-small scr-muted scr-num" style="text-align: left">{{ a.created }}</td>
        </tr>
      </tbody>
    </table>
    <p class="scr-micro scr-muted" style="margin-top: 8px">{{ accounts.length }} accounts.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const accounts = [
  { name: 'Miller family', slug: 'miller-family', workspaces: 2, members: 3, subscription: 'Active', tone: 'safe', cadence: 'Annual', created: '3 Mar 2026' },
  { name: 'Bahia Mar Yachting Center', slug: 'bahia-mar', workspaces: 1, members: 14, subscription: 'Active', tone: 'safe', cadence: 'Annual', created: '18 Jan 2026' },
  { name: 'Coconuts Fort Lauderdale', slug: 'coconuts', workspaces: 1, members: 2, subscription: 'Active', tone: 'safe', cadence: 'Monthly', created: '22 Apr 2026' },
  { name: 'Lauderdale Marine Service', slug: 'lauderdale-marine-service', workspaces: 1, members: 9, subscription: 'Active', tone: 'safe', cadence: 'Monthly', created: '7 May 2026' },
  { name: 'Isle of Venice dock', slug: 'isle-of-venice-dock', workspaces: 1, members: 1, subscription: 'No subscription', tone: 'warn', cadence: '—', created: '29 Sep 2026' },
  { name: 'Las Olas Charters', slug: 'las-olas-charters', workspaces: 3, members: 6, subscription: 'Cancelled', tone: 'offline', cadence: 'Monthly', created: '11 Feb 2026' },
  { name: 'Pier Sixty-Six Marina', slug: 'pier-66', workspaces: 1, members: 21, subscription: 'Active', tone: 'safe', cadence: 'Annual', created: '9 Dec 2025' },
]
</script>
