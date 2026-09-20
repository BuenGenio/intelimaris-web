<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Workspaces</h1>
        <p class="scr-sub">Every workspace on the platform, with the account it lives in and its members.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button>
    </div>

    <div class="scr-split" style="grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr)">
      <div>
        <div class="scr-toolbar"><input class="scr-input scr-input--search" placeholder="Name or slug…" aria-label="Search workspaces by name or slug" /></div>
        <table class="scr-table" aria-label="Every workspace on the platform">
          <thead><tr><th>Workspace</th><th>Type</th><th class="scr-num">Members</th></tr></thead>
          <tbody>
            <tr v-for="w in rows" :key="w.slug" :class="{ 'is-selected': w.slug === 'wanderer' }">
              <td><span class="scr-strong">{{ w.name }}</span><div class="scr-micro scr-muted scr-num">{{ w.slug }}</div></td>
              <td><span class="scr-pill scr-pill--bare" :style="{ background: w.bg, color: w.fg }">{{ w.type }}</span></td>
              <td class="scr-num">{{ w.members }}</td>
            </tr>
          </tbody>
        </table>
        <p class="scr-micro scr-muted" style="margin-top: 8px">Showing 1–6 of 1,208</p>
      </div>

      <aside class="scr-card scr-card--flush">
        <div class="scr-row scr-row--between" style="padding: 12px 14px; border-bottom: 1px solid var(--ink-200)">
          <div><h2 class="scr-h3">Wanderer</h2><p class="scr-micro scr-muted scr-num">wanderer</p></div>
          <span class="scr-row" style="gap: 6px"><button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Close</button></span>
        </div>
        <div class="scr-stack" style="padding: 12px 14px">
          <div class="scr-row scr-row--wrap scr-small scr-muted" style="gap: 8px"><span class="scr-pill scr-pill--bare" style="background: #dce6f4; color: #2b4c82">Vessel</span><span>·</span><span>2 members</span><span>·</span><span>created 3 Mar 2026</span></div>

          <div class="scr-card">
            <h3 class="scr-h3" style="margin-bottom: 6px">Account</h3>
            <p class="scr-small scr-muted">Bills through, and is peopled by, account <a class="scr-num scr-strong scr-accent">acc-1041</a>. The subscription, the roster and the invites are there.</p>
          </div>

          <div class="scr-card">
            <h3 class="scr-h3" style="margin-bottom: 8px">Members</h3>
            <table class="scr-table" style="border: 0; border-radius: 0">
              <thead><tr><th>Member</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                <tr>
                  <td><span class="scr-strong">Sam Miller</span><div class="scr-micro scr-muted scr-num">u_7f3a2c91</div></td>
                  <td>Owner<div class="scr-micro scr-muted">via the account — Owner</div></td>
                  <td><a class="scr-small scr-accent scr-strong">Change on the account</a></td>
                </tr>
                <tr>
                  <td><span class="scr-strong">Jordan Miller</span><div class="scr-micro scr-muted scr-num">u_91be04d7</div></td>
                  <td><select class="scr-select" style="min-height: 32px; padding: 4px 8px" aria-label="Role for u_91be04d7"><option>Member</option><option>Admin</option><option>Viewer</option></select><div class="scr-micro scr-muted" style="margin-top: 3px">Member: sees the vessel, its readings and its crew; cannot change settings.</div></td>
                  <td><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Remove</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="scr-micro scr-muted">The join code is deliberately absent from this lane: it is a live credential for a route that needs no token, so the operator view never carries it — and this console cannot add a member, only change or remove one. Invites belong to the account.</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const rows = [
  { name: 'Wanderer', slug: 'wanderer', members: 2, type: 'Vessel', bg: '#dce6f4', fg: '#2b4c82' },
  { name: 'Bahia Mar', slug: 'bahia-mar', members: 14, type: 'Marina', bg: '#dff3f4', fg: '#0f6b72' },
  { name: 'Isle of Venice dock', slug: 'isle-of-venice-dock', members: 2, type: 'Private marina', bg: '#e3f3f0', fg: '#1f6e5e' },
  { name: 'Coconuts', slug: 'coconuts', members: 2, type: 'Business', bg: '#f7edd3', fg: '#7a5a08' },
  { name: 'Lauderdale Marine Service', slug: 'lauderdale-marine-service', members: 9, type: 'Maintenance', bg: '#f8e3dc', fg: '#8a341e' },
  { name: 'Sea Fever', slug: 'sea-fever', members: 4, type: 'Vessel', bg: '#dce6f4', fg: '#2b4c82' },
]
</script>
