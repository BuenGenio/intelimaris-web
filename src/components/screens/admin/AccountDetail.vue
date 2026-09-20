<template>
  <div class="scr">
    <a class="scr-small scr-accent scr-strong">← Accounts</a>
    <div class="scr-row scr-row--wrap" style="margin-top: 6px">
      <h1 class="scr-h1">Miller family</h1>
      <span class="scr-pill" data-tone="safe">Active</span>
    </div>
    <p class="scr-sub scr-small">miller-family · 2 workspaces, 3 members · created by <span class="scr-num">u_7f3a…</span> on 3 Mar 2026</p>

    <div class="scr-card scr-section">
      <h2 class="scr-h3">Subscription</h2>
      <p class="scr-small scr-muted" style="margin-top: 4px">Annual, since 3 Mar 2026. Each slider row is what the account holds against what it is subscribed for; a row over its quantity means the gates are refusing additions of that kind until the account's billing role raises the slider.</p>
      <p class="scr-ov" style="margin-top: 12px">Features</p>
      <ul class="scr-grid-2" style="gap: 4px 20px; margin-top: 6px">
        <li v-for="f in features" :key="f.label" class="scr-row" style="gap: 6px">
          <ScrIcon :name="f.on ? 'check' : 'x'" :style="{ color: f.on ? 'var(--safe)' : 'var(--ink-300)' }" />
          <span :class="f.on ? 'scr-strong' : 'scr-muted'">{{ f.label }}</span>
        </li>
      </ul>
      <p class="scr-ov" style="margin-top: 12px">Sliders</p>
      <table class="scr-table" style="margin-top: 6px">
        <thead><tr><th>Slider</th><th>Held of quantity</th></tr></thead>
        <tbody>
          <tr v-for="s in sliders" :key="s.label"><td class="scr-strong">{{ s.label }}</td><td><span :style="s.over ? 'color: var(--danger); font-weight: 600' : ''">{{ s.summary }}</span><span v-if="s.over" class="scr-small" style="color: var(--danger); margin-left: 8px">over</span></td></tr>
        </tbody>
      </table>
      <p class="scr-small scr-muted" style="margin-top: 8px">Pricing is a function of these quantities and is not shown yet.</p>
    </div>

    <div class="scr-card scr-section" style="margin-top: 12px">
      <h2 class="scr-h3">Workspaces</h2>
      <div v-for="w in workspaces" :key="w.name" class="scr-kv" style="align-items: center">
        <span class="scr-row"><a class="scr-strong" style="color: var(--ink-900)">{{ w.name }}</a><span class="scr-pill scr-pill--bare" :style="{ background: w.bg, color: w.fg }">{{ w.kind }}</span></span>
        <span class="scr-small scr-muted">{{ w.grants }} · created {{ w.created }}</span>
      </div>
    </div>

    <div class="scr-card scr-section" style="margin-top: 12px">
      <h2 class="scr-h3">Members</h2>
      <p class="scr-small scr-muted" style="margin-top: 4px">Each person's account role, and what it comes to across the account's workspaces. Owners and admins reach every workspace implicitly; everyone else holds exactly the grants listed.</p>
      <div v-for="m in members" :key="m.email" style="padding: 8px 0; border-top: 1px solid var(--ink-100)">
        <div class="scr-row scr-row--wrap" style="gap: 8px"><span class="scr-strong">{{ m.name }}</span><span class="scr-pill">{{ m.role }}</span><span class="scr-small scr-muted">{{ m.email }}</span></div>
        <div class="scr-small scr-muted">{{ m.reach }} · joined {{ m.joined }}</div>
      </div>
    </div>

    <p class="scr-micro scr-muted" style="margin-top: 12px">Invite tokens are deliberately absent from this lane: they are live credentials for a route that needs no token, so the operator view never carries them — and this console cannot seat anyone, only see who is seated.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const features = [
  { label: 'Chat', on: true }, { label: 'Sensor monitoring', on: true }, { label: 'Marina bookings', on: false },
  { label: 'DockPass', on: true }, { label: 'AI assistant', on: false }, { label: 'Routing', on: true },
]
const sliders = [
  { label: 'Vessels', summary: '1 of 2 vessels', over: false },
  { label: 'Private marinas', summary: '1 of 1 private marina', over: false },
  { label: 'Berths', summary: '2 of 1 berths', over: true },
  { label: 'Vessel history', summary: '365 vessel history days', over: false },
]
const workspaces = [
  { name: 'Wanderer', kind: 'Vessel', bg: '#dce6f4', fg: '#2b4c82', grants: '2 grants', created: '3 Mar 2026' },
  { name: 'Isle of Venice dock', kind: 'Private marina', bg: '#e3f3f0', fg: '#1f6e5e', grants: '1 grant', created: '29 Sep 2026' },
]
const members = [
  { name: 'Sam Miller', role: 'Owner', email: 'sam@example.com', reach: 'Owner of every workspace', joined: '3 Mar 2026' },
  { name: 'Jordan Miller', role: 'Member', email: 'jordan@example.com', reach: 'Member — Wanderer (member), Isle of Venice dock (viewer)', joined: '14 Mar 2026' },
  { name: 'Alex Chen', role: 'Billing', email: 'alex.chen@example.com', reach: 'Billing — the subscription only, no workspace access', joined: '2 Oct 2026' },
]
</script>
