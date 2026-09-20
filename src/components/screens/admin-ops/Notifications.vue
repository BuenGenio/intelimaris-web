<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Notifications</h1>
        <p class="scr-sub">Every message the platform sent — invites, join requests, claims, stays — one row per channel, and whether it arrived. The place support looks when someone says they never got it.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm">Drain now</button>
    </div>
    <p class="no-drained"><strong>Drained.</strong> Sent 3, failed 1, skipped 0.</p>

    <div class="scr-toolbar scr-row--wrap">
      <span class="scr-input scr-input--search no-search scr-muted">Recipient — a user id or an address, exact…</span>
      <span class="scr-chip">Kind · Every kind <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Channel · Every channel <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Delivery · Every state <span aria-hidden="true">⌄</span></span>
      <span class="scr-input no-ws scr-muted scr-num">Workspace id</span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">6 deliveries so far — 1 failed</span>
    </div>

    <div class="scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>When</th><th>Kind</th><th>Channel</th><th>Message</th><th>Recipient</th><th>Workspace</th><th>Delivery</th></tr></thead>
        <tbody>
          <tr v-for="n in rows" :key="n.id">
            <td><span class="no-col"><span class="scr-small scr-muted scr-num">{{ n.at }}</span><span v-if="n.sent" class="scr-micro scr-muted scr-num">sent {{ n.sent }}</span></span></td>
            <td><span class="no-col"><strong>{{ n.kindLabel }}</strong><span class="scr-micro scr-muted scr-num">{{ n.kind }}</span></span></td>
            <td>{{ n.channel }}</td>
            <td><p>{{ n.subject }}</p><p class="scr-micro scr-muted no-body">{{ n.body }}</p></td>
            <td><span class="no-col"><span class="scr-small scr-num">{{ n.recipient }}</span><span v-if="n.address" class="scr-micro scr-muted scr-num">{{ n.address }}</span></span></td>
            <td><a v-if="n.workspace" href="#" class="scr-small scr-num">{{ n.workspace }}…</a><span v-else class="scr-small scr-muted">—</span></td>
            <td><span class="no-col"><span class="scr-pill no-self" :data-tone="n.tone">{{ n.status }}</span><span v-if="n.detail" class="scr-micro scr-muted scr-num no-detail">{{ n.detail }}</span></span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="scr-row scr-row--between scr-section"><span></span><button type="button" class="scr-btn scr-btn--sm">Older</button></div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { id: 'n1', at: 'Oct 14, 2026, 2:16 PM', sent: '2:16 PM', kindLabel: 'Stay requested', kind: 'stay.requested', channel: 'Email', subject: 'Wanderer has asked for Oct 16–19', body: 'Sam Miller asked to stay 3 nights at Isle of Venice dock · east face. Answer within 24 hours to keep the request.', recipient: 'usr_7f3a9c21', address: 'host@isleofvenice.example', workspace: 'a4f0c2e1', status: 'Sent', tone: 'safe', detail: 'ses-01J9Z8Q4KX' },
  { id: 'n2', at: 'Oct 14, 2026, 2:16 PM', sent: '', kindLabel: 'Stay requested', kind: 'stay.requested', channel: 'Push', subject: 'Wanderer has asked for Oct 16–19', body: 'Sam Miller asked to stay 3 nights at Isle of Venice dock · east face.', recipient: 'usr_7f3a9c21', address: 'device 2 tokens', workspace: 'a4f0c2e1', status: 'Failed', tone: 'danger', detail: 'APNs: BadDeviceToken' },
  { id: 'n3', at: 'Oct 14, 2026, 11:04 AM', sent: '11:04 AM', kindLabel: 'Invite sent', kind: 'invite.sent', channel: 'Email', subject: 'Sam Miller invited you to Wanderer', body: 'Join the crew of Wanderer, a 42 ft Sabre out of Fort Lauderdale. The invite expires in 7 days.', recipient: 'crew@example.com', address: '', workspace: '3b8e51f0', status: 'Sent', tone: 'safe', detail: 'ses-01J9Z2M8VN' },
  { id: 'n4', at: 'Oct 13, 2026, 5:40 PM', sent: '5:41 PM', kindLabel: 'Claim approved', kind: 'claim.approved', channel: 'Email', subject: 'Coconuts is now verified', body: 'Your claim on Coconuts was approved. The listing now shows as verified in the app.', recipient: 'usr_c0c0a115', address: 'sam@example.com', workspace: '9c14ad77', status: 'Sent', tone: 'safe', detail: 'ses-01J9XW1R6P' },
  { id: 'n5', at: 'Oct 13, 2026, 9:02 AM', sent: '', kindLabel: 'Join request filed', kind: 'join_request.filed', channel: 'Push', subject: 'Someone wants to join Bahia Mar', body: 'A dockhand account asked to join the Bahia Mar workspace. Approve or decline from Members.', recipient: 'usr_b4h1am4r', address: 'device 1 token', workspace: '5d2e8c90', status: 'Skipped', tone: 'offline', detail: 'push off for this workspace' },
  { id: 'n6', at: 'Oct 12, 2026, 8:30 PM', sent: '', kindLabel: 'Stay confirmed', kind: 'stay.confirmed', channel: 'Email', subject: 'C-14 is held for Sea Change', body: 'Bahia Mar confirmed your stay for Oct 14–15. Approach depth 8 ft MLLW; call VHF 71 on arrival.', recipient: 'usr_5ea0chan', address: 'skipper@seachange.example', workspace: '', status: 'Queued', tone: 'info', detail: '2 attempts — SMTP 421 try again later' },
]
</script>

<style scoped>
.no-drained { margin: -6px 0 12px; }
.no-search { flex: 1 1 260px; display: flex; align-items: center; min-width: 0; }
.no-ws { width: 150px; min-height: 36px; font-size: 12px; }
.no-col { display: grid; gap: 2px; }
.no-body { margin-top: 2px; max-width: 260px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.no-self { justify-self: start; }
.no-detail { max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
