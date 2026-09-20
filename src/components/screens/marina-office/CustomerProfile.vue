<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Sam Miller</h1>
        <p class="scr-sub">Seen here before: 4 stays over 14 nights, the latest departure 12 Oct 2026. Holds 1 vessel.</p>
      </div>
      <div class="scr-row">
        <button type="button" class="scr-btn scr-btn--primary">Edit</button>
        <button type="button" class="scr-btn scr-btn--ghost"><ScrIcon name="back" /> Directory</button>
      </div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Matched stays</span><span class="scr-stat-value scr-accent">4</span><span class="scr-stat-delta">4 stays · 14 nights in the last 24 months.</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Nights</span><span class="scr-stat-value">14</span><span class="scr-stat-delta">As the stay lane counted them.</span></div>
      <div class="scr-stat"><span class="scr-stat-label">First seen</span><span class="scr-stat-value" style="font-size: 16px">14 Mar 2026</span><span class="scr-stat-delta">Earliest arrival in the window.</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Last seen</span><span class="scr-stat-value" style="font-size: 16px">12 Oct 2026</span><span class="scr-stat-delta" data-tone="safe">Latest departure in the window.</span></div>
    </div>
    <p class="scr-micro scr-muted" style="margin-top: 6px">1 further booking was cancelled, declined or expired. It is listed below and counted in none of the above — a booking that was called off is not a visit.</p>

    <div class="scr-split scr-section">
      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Stays and tenancies here</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Matched through the vessels this customer holds — a booking taken under another spelling will not appear.</p>
          <div v-for="s in stays" :key="s.dates" class="scr-kv" style="justify-content: flex-start">
            <span class="scr-strong" style="color: var(--ink-900)">Wanderer</span>
            <span class="scr-pill" :data-tone="s.tone">{{ s.status }}</span>
            <span class="scr-num scr-muted">{{ s.dates }}</span>
            <span class="scr-micro scr-muted">{{ s.berth }}</span>
          </div>
          <p class="scr-micro scr-muted" style="margin-top: 8px">Stays shown cover the last 24 months — the stay board refuses a longer window.</p>
        </div>

        <div class="scr-card">
          <p class="scr-card-title">Vessels</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Owner, skipper, payer, emergency contact — each one over the period it was held. A change of owner is a new holding, never an edit of the old one.</p>
          <div class="scr-kv" style="justify-content: flex-start">
            <span class="scr-strong" style="color: var(--wave-700)">Wanderer</span>
            <span class="scr-pill" data-tone="accent">Owner</span>
            <span class="scr-num scr-muted">since 2024-05-01</span>
            <span class="scr-micro scr-muted">42 ft Sabre · MMSI 367 123 456</span>
          </div>
          <div class="scr-kv" style="justify-content: flex-start">
            <span class="scr-strong" style="color: var(--wave-700)">Wanderer</span>
            <span class="scr-pill" data-tone="accent">Payer</span>
            <span class="scr-num scr-muted">since 2024-05-01</span>
          </div>
          <p class="scr-ov" style="margin-top: 10px; margin-bottom: 4px">Previously</p>
          <div class="scr-kv" style="justify-content: flex-start">
            <span class="scr-strong" style="color: var(--wave-700)">Sea Change</span>
            <span class="scr-pill">Skipper</span>
            <span class="scr-num scr-muted">2022-06-10 → 2024-04-20</span>
          </div>
        </div>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Contact</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">What this customer gave us. A blank here means nobody has written it down yet.</p>
          <dl>
            <div class="scr-kv"><dt>Email</dt><dd>sam@example.com</dd></div>
            <div class="scr-kv"><dt>Phone</dt><dd class="scr-num">+1 305 555 0123</dd></div>
            <div class="scr-kv"><dt>Address</dt><dd style="text-align: right">1400 SE 17th St<br />Fort Lauderdale, FL 33316, US</dd></div>
            <div class="scr-kv"><dt>Preferred contact</dt><dd>Text message</dd></div>
            <div class="scr-kv"><dt>Language</dt><dd>en</dd></div>
            <div class="scr-kv"><dt>Marketing</dt><dd>Opted in · 2026-03-14</dd></div>
            <div class="scr-kv"><dt>Note</dt><dd>Prefers C dock, port-side tie</dd></div>
          </dl>
        </div>

        <div class="scr-card">
          <p class="scr-card-title">Record</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Where this record came from, and who in your account can read it.</p>
          <dl>
            <div class="scr-kv"><dt>Sharing</dt><dd>Shared across the account</dd></div>
            <div class="scr-kv"><dt>Status</dt><dd>Active</dd></div>
            <div class="scr-kv"><dt>Platform account</dt><dd><span class="scr-pill" data-tone="safe">Linked</span></dd></div>
            <div class="scr-kv"><dt>Imported from</dt><dd class="scr-muted">Not recorded</dd></div>
            <div class="scr-kv"><dt>Their reference</dt><dd class="scr-muted">Not recorded</dd></div>
            <div class="scr-kv"><dt>Added</dt><dd class="scr-num">2026-10-03</dd></div>
            <div class="scr-kv"><dt>Last changed</dt><dd class="scr-num">2026-10-12</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const stays = [
  { status: 'Confirmed', tone: 'info', dates: '16 Oct → 19 Oct 2026 · 3 nights', berth: 'C-14' },
  { status: 'Departed', tone: 'safe', dates: '9 Oct → 12 Oct 2026 · 3 nights', berth: 'C-14' },
  { status: 'Departed', tone: 'safe', dates: '2 Jul → 7 Jul 2026 · 5 nights', berth: 'B-07' },
  { status: 'Cancelled', tone: 'offline', dates: '20 May → 22 May 2026 · 2 nights', berth: 'No berth assigned' },
  { status: 'Departed', tone: 'safe', dates: '14 Mar → 17 Mar 2026 · 3 nights', berth: 'C-12' },
]
</script>
