<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Crew</h1>
        <p class="scr-sub">Everyone in Wanderer, and what they can do.</p>
      </div>
      <button class="scr-btn scr-btn--sm"><ScrIcon name="message" /> Channels</button>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Invite code</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">Anyone with this code can join as a member. Rotate it if it gets out.</p>
      <div class="scr-row"><span class="crw-code scr-num">WNDR-7K4Q</span><button class="scr-btn scr-btn--sm">Copy</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Rotate code</button></div>
    </div>

    <div class="scr-section">
      <div class="scr-row scr-row--between" style="margin-bottom: 8px">
        <div><h2 class="scr-h3">People</h2><p class="scr-sub scr-small">5 in this workspace</p></div>
        <span class="scr-pill scr-pill--bare">Vessel</span>
      </div>
      <div class="scr-list">
        <div v-for="m in people" :key="m.name" class="scr-item">
          <span class="scr-avatar">{{ m.initials }}</span>
          <div><span class="scr-item-title">{{ m.name }} <span v-if="m.invited" class="scr-pill" data-tone="warn">Invited</span><span v-if="m.implied" class="scr-pill" data-tone="accent">Implied</span></span><span class="scr-item-sub">{{ m.email }}</span></div>
          <div class="scr-item-end"><span class="scr-pill" :data-tone="m.tone">{{ m.role }}</span></div>
        </div>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 6px">Implied roles come with the account. <a href="#">Change them on the account</a>.</p>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Invite someone</h2>
      <div class="scr-stack scr-stack--tight" style="margin-top: 8px">
        <label class="scr-field"><span class="scr-label">Email</span><input class="scr-input" placeholder="name@example.com" /></label>
        <label class="scr-field"><span class="scr-label">Role</span><select class="scr-select"><option>Crew</option><option>Viewer</option><option>Admin</option></select></label>
        <button class="scr-btn scr-btn--primary">Send invite</button>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Join requests</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 6px">People who found this vessel and asked to come aboard. Approving seats them as a member.</p>
      <div class="scr-kv" style="align-items: center">
        <span><strong>Maya Ortiz</strong><span class="scr-item-sub">Asked 12 Oct — “Delivery crew for the Keys run”</span></span>
        <span class="scr-row"><button class="scr-btn scr-btn--primary scr-btn--sm">Approve</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Decline</button></span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Open invites</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 6px">Account invites carrying a role here. No mailer yet — copy the invite link and send it yourself. It expires in 14 days.</p>
      <div class="scr-kv" style="align-items: center"><span>tom.wheeler@example.com <span class="scr-pill" data-tone="warn">pending</span></span><span class="scr-row"><button class="scr-btn scr-btn--sm">Copy link</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Revoke</button></span></div>
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
  { name: 'Sam Miller', initials: 'SM', email: 'sam@example.com', role: 'Owner', tone: 'accent', implied: true, invited: false },
  { name: 'Ana Miller', initials: 'AM', email: 'ana@example.com', role: 'Admin', tone: 'info', implied: false, invited: false },
  { name: 'Luis Ferreira', initials: 'LF', email: 'luis@example.com', role: 'Crew', tone: 'safe', implied: false, invited: false },
  { name: 'Tom Wheeler', initials: 'TW', email: 'tom.wheeler@example.com', role: 'Crew', tone: 'safe', implied: false, invited: true },
  { name: 'Lauderdale Marine Service', initials: 'LM', email: 'Technician · engaged yard', role: 'Technician', tone: 'warn', implied: false, invited: false },
]
const roles = [
  { label: 'Owner', text: 'The account’s owner — full control of every workspace in it, including deleting this one. Comes with the account, never granted here.' },
  { label: 'Admin', text: 'Manages members, settings and content. Cannot delete the workspace or touch the account’s subscription.' },
  { label: 'Crew', text: 'Works in the workspace. The display name changes per workspace type.' },
  { label: 'Technician', text: 'Sees monitoring, the maintenance door and a service channel — not the crew.' },
  { label: 'Viewer', text: 'Read-only. Sees the workspace but changes nothing.' },
]
</script>

<style scoped>
.crw-code { padding: 6px 12px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); background: var(--ink-50); font-size: 16px; font-weight: 700; letter-spacing: 0.12em; }
</style>
