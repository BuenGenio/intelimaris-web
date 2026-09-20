<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Claims</h1>
        <p class="scr-sub">Marina claims, business claims and “add a marina” requests in one queue — the same decision with different evidence. Pending oldest-first: the longest wait is the one that matters.</p>
      </div>
    </div>

    <div class="scr-toolbar">
      <span class="scr-chip">Status · Pending only <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Kind · Any <span aria-hidden="true">⌄</span></span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">3 shown</span>
    </div>

    <div class="scr-alert cl-minted">
      <ScrIcon name="check" />
      <span>Approved — <strong class="cl-inline">Pier Sixty-Six Marina</strong> is now in the directory as <span class="scr-num">pier-sixty-six</span>. <a href="#">Open the marina</a></span>
    </div>

    <div class="scr-stack">
      <article v-for="c in claims" :key="c.id" class="scr-card">
        <div class="scr-row">
          <ScrIcon :name="c.icon" class="scr-accent" />
          <h2 class="scr-h3"><span v-if="c.kind === 'registration'" class="scr-muted">Add a marina:</span> {{ c.subject }}</h2>
          <span class="scr-spacer"></span>
          <span class="scr-pill" data-tone="warn">pending</span>
        </div>
        <p class="scr-small scr-muted cl-meta">{{ c.meta }}</p>

        <dl v-if="c.contact" class="scr-dl cl-gap"><dt>Contact</dt><dd class="cl-left">{{ c.contact }}</dd><dt>Note</dt><dd class="cl-left">{{ c.note }}</dd></dl>

        <dl class="scr-stack scr-stack--tight cl-gap">
          <div v-for="e in c.evidence" :key="e.k" class="cl-evidence">
            <ScrIcon name="receipt" class="scr-accent" />
            <div><dt class="scr-ov">{{ e.k }}</dt><dd>{{ e.v }}</dd></div>
          </div>
        </dl>

        <template v-if="c.kind === 'registration'">
          <button type="button" class="scr-btn scr-btn--sm cl-gap"><ScrIcon name="pin" /> Hide the directory around this pin</button>
          <ScrMap variant="satellite" :height="120" :pins="[{ x: 200, y: 120, tone: 'info' }, { x: 260, y: 90, tone: 'safe' }]" class="cl-gap">
            <span class="scr-map-overlay scr-map-overlay--b scr-map-chip">26.12310, -80.10877 — the proposed pin. Labelled points are the one directory marina within 2 km, with who holds each.</span>
          </ScrMap>
          <h3 class="scr-h3 cl-gap">Nearby in the directory</h3>
          <ul class="scr-list cl-tight">
            <li class="scr-item scr-item--plain">
              <span><span class="scr-item-title">Bahia Mar Yachting Center</span><span class="scr-item-sub scr-num">bahia-mar · 640 m</span></span>
              <span class="scr-item-end"><span class="scr-pill" data-tone="safe">Claimed</span><button type="button" class="scr-btn scr-btn--sm">Reject: claim bahia-mar instead</button></span>
            </li>
          </ul>
        </template>

        <div class="scr-field cl-form">
          <span class="scr-ov">Reason — required to reject</span>
          <div class="scr-textarea cl-textarea scr-muted">What the owner will read, and refile against</div>
          <div class="scr-row">
            <button type="button" class="scr-btn scr-btn--primary scr-btn--sm"><ScrIcon name="check" />{{ c.approve }}</button>
            <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Reject</button>
          </div>
          <span class="scr-hint">{{ c.footnote }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const claims = [
  {
    id: 'c1', kind: 'marina', icon: 'anchor', subject: 'Bahia Mar Yachting Center',
    meta: 'Marina claim · workspace 3b8e51f0… · filed 10/2/2026, 9:14 AM', contact: null, note: null,
    evidence: [{ k: 'role', v: 'Dockmaster' }, { k: 'phone', v: '+1 954 555 0188' }, { k: 'website', v: 'bahiamaryachtingcenter.com' }, { k: 'note', v: 'Office email domain matches; will answer VHF 71 at the fuel dock.' }],
    approve: 'Approve — mark Verified', footnote: 'The workspace stays usable while pending — never blocked on approval. Transfer is release-then-claim, never a silent reassignment.',
  },
  {
    id: 'c2', kind: 'business', icon: 'store', subject: 'Coconuts',
    meta: 'Business claim · workspace 9c14ad77… · filed 10/6/2026, 2:41 PM', contact: null, note: null,
    evidence: [{ k: 'role', v: 'Owner' }, { k: 'email', v: 'sam@example.com' }, { k: 'note', v: 'Dock and dine, 6 slips on the Intracoastal side, patrons only.' }],
    approve: 'Approve — mark Verified', footnote: 'The workspace stays usable while pending — never blocked on approval. Transfer is release-then-claim, never a silent reassignment.',
  },
  {
    id: 'c3', kind: 'registration', icon: 'pin', subject: 'Venice Isles Marina',
    meta: 'marina · pin 26.12310, -80.10877 · workspace a4f0c2e1… · filed 10/9/2026, 8:03 AM',
    contact: 'Sam Miller · sam@example.com · +1 305 555 0123', note: 'Twelve slips behind the Isle of Venice, not listed anywhere.',
    evidence: [{ k: 'lease', v: 'County submerged-land lease 2024-118' }],
    approve: 'Approve — create the marina', footnote: 'Approval mints the marina at the pin and the workspace\'s claim on it in one step. If the directory already has this place, reject and name the slug to claim — the button on each nearby row writes that note.',
  },
]
</script>

<style scoped>
.cl-minted { background: var(--ink-0); border-color: var(--ink-200); color: var(--ink-900); }
.cl-inline { display: inline; }
.cl-meta { margin-top: 3px; }
.cl-gap { margin-top: 12px; }
.cl-left { text-align: left; }
.cl-evidence { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 8px; align-items: start; }
.cl-tight { margin-top: 6px; }
.cl-form { margin-top: 14px; }
.cl-textarea { min-height: 52px; }
</style>
