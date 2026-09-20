<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Workspace settings</h1>
        <p class="scr-sub">Wanderer · Vessel</p>
      </div>
      <span class="scr-pill scr-pill--bare">Owner</span>
    </div>
    <div class="scr-tabs scr-tabs--line" style="margin-bottom: 14px"><span class="scr-tab">General</span><span class="scr-tab is-on">People</span><span class="scr-tab">Advanced</span></div>

    <div class="scr-card">
      <h2 class="scr-card-title">Invite code</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">Anyone with this code can join as a member. Rotate it if it gets out.</p>
      <div class="scr-row"><span class="stp-code scr-num">WNDR-7K4Q</span><button class="scr-btn scr-btn--sm">Copy</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Rotate code</button></div>
    </div>

    <div class="scr-section scr-card scr-card--flush">
      <div class="scr-row scr-row--between" style="padding: 14px 14px 0"><div><h2 class="scr-card-title">People</h2><p class="scr-sub scr-small">5 in this workspace</p></div><span class="scr-pill scr-pill--bare">Vessel</span></div>
      <div class="scr-divider" style="margin: 10px 0 0"></div>
      <div class="scr-list" style="border: 0; border-radius: 0">
        <div v-for="m in people" :key="m.name" class="scr-item">
          <span class="scr-avatar">{{ m.initials }}</span>
          <div><span class="scr-item-title">{{ m.name }}</span><span class="scr-item-sub">{{ m.email }}</span></div>
          <div class="scr-item-end">
            <select v-if="m.grant" class="scr-select" style="min-height: 30px; padding: 3px 8px; font-size: 12px; width: auto"><option>{{ m.role }}</option><option>Admin</option><option>Crew</option><option>Viewer</option></select>
            <span v-else class="scr-pill" data-tone="accent">{{ m.role }} · Implied</span>
            <button v-if="m.grant" class="scr-btn scr-btn--ghost scr-btn--sm scr-btn--icon" aria-label="Remove"><ScrIcon name="x" /></button>
          </div>
        </div>
      </div>
      <div style="padding: 12px 14px 14px; border-top: 1px solid var(--ink-100)">
        <p class="scr-label" style="margin-bottom: 6px">Invite someone</p>
        <div class="scr-row"><input class="scr-input" placeholder="name@example.com" style="flex: 1" /><select class="scr-select" style="width: 96px"><option>Crew</option></select></div>
        <button class="scr-btn scr-btn--primary scr-btn--block" style="margin-top: 8px">Send invite</button>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">What each role can do</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 6px">Roles are bundles of permissions</p>
      <div v-for="r in roles" :key="r.label" class="scr-kv" style="display: block"><strong>{{ r.label }}</strong> <span class="scr-muted">{{ r.text }}</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const people = [
  { name: 'Sam Miller', initials: 'SM', email: 'sam@example.com', role: 'Owner', grant: false },
  { name: 'Ana Miller', initials: 'AM', email: 'ana@example.com', role: 'Admin', grant: true },
  { name: 'Luis Ferreira', initials: 'LF', email: 'luis@example.com', role: 'Crew', grant: true },
  { name: 'Tom Wheeler', initials: 'TW', email: 'tom.wheeler@example.com · invited', role: 'Crew', grant: true },
  { name: 'Lauderdale Marine Service', initials: 'LM', email: 'engaged yard', role: 'Technician', grant: false },
]
const roles = [
  { label: 'Owner', text: 'The account’s owner — full control of every workspace in it. Comes with the account, never granted here.' },
  { label: 'Admin', text: 'Manages members, settings and content. Cannot delete the workspace or touch the account’s subscription.' },
  { label: 'Crew', text: 'Works in the workspace.' },
  { label: 'Viewer', text: 'Read-only. Sees the workspace but changes nothing.' },
]
</script>

<style scoped>
.stp-code { padding: 6px 12px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); background: var(--ink-50); font-size: 16px; font-weight: 700; letter-spacing: 0.12em; }
</style>
