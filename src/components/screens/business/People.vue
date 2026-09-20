<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Workspace settings</h1>
        <p class="scr-sub">Coconuts · Business</p>
      </div>
      <span class="scr-pill scr-pill--bare">Editor</span>
    </div>

    <div class="scr-tabs scr-tabs--line" style="margin-bottom: 14px"><span class="scr-tab">General</span><span class="scr-tab is-on">People</span><span class="scr-tab">Advanced</span></div>

    <div class="scr-card">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">People</h2><p class="scr-small scr-muted">4 in this workspace</p></div><span class="scr-pill" data-tone="accent">Business</span></div>
      <table class="scr-table" style="margin-top: 10px">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Standing</th><th></th></tr></thead>
        <tbody>
          <tr v-for="p in people" :key="p.email">
            <td><span class="scr-row"><span class="scr-avatar">{{ p.initials }}</span><span class="scr-strong">{{ p.name }}</span></span></td>
            <td class="scr-muted">{{ p.email }}</td>
            <td><select class="scr-select" style="min-height: 30px; padding: 3px 8px; width: auto"><option>{{ p.role }}</option></select></td>
            <td><span class="scr-pill" :data-tone="p.tone">{{ p.standing }}</span></td>
            <td style="text-align: right"><button v-if="p.role !== 'Owner'" class="scr-btn scr-btn--ghost scr-btn--sm">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <p class="scr-small scr-muted" style="margin-top: 8px">Implied roles come with the account. Change them on the account's people page.</p>
    </div>

    <div class="scr-grid-2 scr-section">
      <div class="scr-card">
        <h2 class="scr-card-title">Invite by email</h2>
        <div class="scr-stack" style="margin-top: 8px">
          <label class="scr-field"><span class="scr-label">Invite by email</span><input class="scr-input" placeholder="name@example.com" /></label>
          <div class="scr-row" style="align-items: flex-end"><label class="scr-field" style="flex: 1"><span class="scr-label">Role</span><select class="scr-select"><option>Editor</option><option>Admin</option><option>Viewer</option></select></label><button class="scr-btn scr-btn--primary">Invite</button></div>
        </div>
        <div class="scr-divider"></div>
        <p class="scr-ov">Open invites</p>
        <p class="scr-small scr-muted" style="margin-top: 4px">Account invites carrying a role here. No mailer yet — copy the invite link.</p>
        <p class="scr-small" style="margin-top: 6px"><span class="scr-strong">chris.park@example.com</span> <span class="scr-muted">· Viewer · sent 4 Oct</span> <a href="#">Copy link</a> · <a href="#">Revoke</a></p>
      </div>
      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">Invite code</h2>
          <p class="scr-small scr-muted">Anyone with this code can join as a member. Rotate it if it gets around.</p>
          <div class="scr-row" style="margin-top: 10px"><span class="scr-strong scr-num" style="font-size: 18px; letter-spacing: 0.08em">CCNT-4H8P</span><span class="scr-spacer"></span><button class="scr-btn scr-btn--ghost scr-btn--sm">Rotate code</button></div>
        </div>
        <div class="scr-card">
          <h2 class="scr-card-title">What each role can do</h2>
          <p class="scr-small scr-muted">Roles are bundles of permissions; the service is the gate.</p>
          <dl class="scr-dl" style="margin-top: 8px">
            <dt>Owner</dt><dd>everything, transfer, delete</dd>
            <dt>Admin</dt><dd>listing, prices, people</dd>
            <dt>Editor</dt><dd>listing, prices, holds</dd>
            <dt>Viewer</dt><dd>read only</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const people = [
  { name: 'Sam Miller', initials: 'SM', email: 'sam@example.com', role: 'Owner', standing: 'On duty', tone: 'safe' },
  { name: 'Ana Reyes', initials: 'AR', email: 'ana.reyes@example.com', role: 'Admin', standing: 'Implied', tone: 'accent' },
  { name: 'Jordan Lee', initials: 'JL', email: 'jordan.lee@example.com', role: 'Editor', standing: 'On duty', tone: 'safe' },
  { name: 'Chris Park', initials: 'CP', email: 'chris.park@example.com', role: 'Viewer', standing: 'Invited', tone: 'warn' },
]
</script>
