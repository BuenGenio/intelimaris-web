<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Technicians</h1>
        <p class="scr-sub">Your people, and which vessel each is assigned to.</p>
      </div>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">On which vessel</h2>
      <p class="scr-small scr-muted">Assign a person to a vessel you serve; they reach it as a technician — monitoring, the vessel, its upkeep and a service channel, not the crew.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="e in engagements" :key="e.vessel" class="scr-row tec-row">
          <span style="flex: 1; min-width: 0">
            <span class="scr-strong">{{ e.vessel }}</span>
            <span v-if="e.techs.length === 0" class="scr-small scr-muted" style="display: block">Nobody assigned yet.</span>
            <span v-else class="scr-chips" style="margin-top: 4px"><span v-for="t in e.techs" :key="t" class="scr-pill" data-tone="accent">{{ t }} <a href="#" class="scr-micro" style="font-weight: 400; text-decoration: underline">withdraw</a></span></span>
          </span>
          <span class="scr-row" style="align-items: flex-end">
            <label class="scr-field" style="min-width: 170px"><span class="scr-label">Assign</span><select class="scr-select"><option>{{ e.free.length ? 'Choose a person' : 'Everyone is assigned' }}</option><option v-for="p in e.free" :key="p">{{ p }}</option></select></label>
            <button class="scr-btn scr-btn--sm" :disabled="e.free.length === 0">Assign</button>
          </span>
        </li>
      </ul>
    </div>

    <div class="scr-card scr-section">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">People</h2><p class="scr-small scr-muted">5 in this workspace</p></div><span class="scr-pill scr-pill--bare">Maintenance</span></div>
      <table class="scr-table" style="margin-top: 10px">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Standing</th><th></th></tr></thead>
        <tbody>
          <tr v-for="p in people" :key="p.email"><td class="scr-strong">{{ p.name }}</td><td class="scr-muted">{{ p.email }}</td><td><select class="scr-select scr-btn--sm" style="min-height: 30px; padding: 3px 8px; width: auto"><option>{{ p.role }}</option></select></td><td><span class="scr-pill" :data-tone="p.tone">{{ p.standing }}</span></td><td style="text-align: right"><button class="scr-btn scr-btn--ghost scr-btn--sm">Remove</button></td></tr>
        </tbody>
      </table>
      <p class="scr-small scr-muted" style="margin-top: 8px">Implied roles come with the account. Change them on the account's people page.</p>
    </div>

    <div class="scr-grid-2 scr-section">
      <div class="scr-card">
        <h2 class="scr-card-title">Invite by email</h2>
        <div class="scr-row" style="align-items: flex-end">
          <label class="scr-field" style="flex: 1"><span class="scr-label">Invite by email</span><input class="scr-input" placeholder="name@example.com" /></label>
          <label class="scr-field"><span class="scr-label">Role</span><select class="scr-select"><option>Technician</option><option>Admin</option><option>Viewer</option></select></label>
          <button class="scr-btn scr-btn--primary">Invite</button>
        </div>
        <p class="scr-small scr-muted" style="margin-top: 10px">Open invites · Account invites carrying a role here. No mailer yet — copy the invite link.</p>
        <p class="scr-small" style="margin-top: 4px"><span class="scr-strong">priya.nair@example.com</span> <span class="scr-muted">· Technician · sent 2 Oct</span> <a href="#">Revoke</a></p>
      </div>
      <div class="scr-card">
        <h2 class="scr-card-title">Invite code</h2>
        <p class="scr-small scr-muted">Anyone with this code can join as a member. Rotate it if it gets around.</p>
        <div class="scr-row" style="margin-top: 10px"><span class="scr-strong scr-num" style="font-size: 18px; letter-spacing: 0.08em">LMS-7Q2X</span><span class="scr-spacer"></span><button class="scr-btn scr-btn--ghost scr-btn--sm">Rotate code</button></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const engagements = [
  { vessel: 'Wanderer', techs: ['Luis Ortega'], free: ['Dana Whitfield', 'Marcus Bell'] },
  { vessel: 'Sea Change', techs: ['Dana Whitfield', 'Luis Ortega'], free: ['Marcus Bell'] },
  { vessel: 'Tern', techs: [], free: ['Luis Ortega', 'Dana Whitfield', 'Marcus Bell'] },
  { vessel: 'Blue Hour', techs: ['Marcus Bell'], free: ['Luis Ortega', 'Dana Whitfield'] },
]
const people = [
  { name: 'Sam Miller', email: 'sam@example.com', role: 'Owner', standing: 'On duty', tone: 'safe' },
  { name: 'Luis Ortega', email: 'luis.ortega@example.com', role: 'Technician', standing: 'On duty', tone: 'safe' },
  { name: 'Dana Whitfield', email: 'dana.w@example.com', role: 'Technician', standing: 'On duty', tone: 'safe' },
  { name: 'Marcus Bell', email: 'marcus.bell@example.com', role: 'Admin', standing: 'Implied', tone: 'accent' },
  { name: 'Priya Nair', email: 'priya.nair@example.com', role: 'Technician', standing: 'Invited', tone: 'warn' },
]
</script>
<style scoped>
.tec-row { align-items: center; padding: 8px 0; border-top: 1px solid var(--ink-100); flex-wrap: wrap; }
.tec-row:first-child { border-top: 0; padding-top: 0; }
</style>
