<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Templates</h1>
        <p class="scr-sub">Pre-arrival, renewal and payment reminder, written once.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">6 templates</span>
        <button type="button" class="scr-btn scr-btn--primary">New template</button>
      </div>
    </div>

    <div class="scr-split">
      <table class="scr-table">
        <thead><tr><th>Template</th><th>Sent when</th><th>Channel</th><th class="scr-num">Sent · 30 d</th><th>Edited</th></tr></thead>
        <tbody>
          <tr v-for="t in rows" :key="t.name" :class="{ 'is-selected': t.name === 'Pre-arrival' }">
            <td><span class="scr-strong">{{ t.name }}</span><span class="scr-item-sub">{{ t.sub }}</span></td>
            <td class="scr-muted">{{ t.when }}</td>
            <td><span class="scr-pill scr-pill--bare">{{ t.channel }}</span></td>
            <td class="scr-num">{{ t.sent }}</td>
            <td class="scr-muted scr-num">{{ t.edited }}</td>
          </tr>
        </tbody>
      </table>

      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title">Pre-arrival</p><span class="scr-pill" data-tone="safe">In use</span></div>
        <p class="scr-sub scr-small" style="margin-bottom: 10px">Sent the day before a confirmed stay. Fields in braces fill from the stay.</p>
        <div class="scr-field"><span class="scr-label">Subject</span><input class="scr-input" value="Your berth at Bahia Mar tomorrow" /></div>
        <div class="scr-field" style="margin-top: 8px">
          <span class="scr-label">Body</span>
          <textarea class="scr-textarea" style="min-height: 150px">Hello {first_name},

{vessel} is expected at Bahia Mar on {check_in} in berth {berth}. Approach depth is 8 ft MLLW; call VHF 71 in the channel and a dockhand will meet you.

Late arrival? The gate code is on your dockpass. Questions: reply to this message or call the office on +1 954 555 0140.</textarea>
        </div>
        <div class="scr-row scr-row--wrap" style="margin-top: 8px"><span class="scr-micro scr-muted">Fields:</span><span v-for="f in fields" :key="f" class="scr-pill scr-pill--bare scr-num">{{ f }}</span></div>
        <div class="scr-row" style="margin-top: 12px"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Save</button><button type="button" class="scr-btn scr-btn--sm">Preview with Wanderer</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Send a test to me</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { name: 'Pre-arrival', sub: 'Berth, approach, VHF and the gate', when: 'Day before check-in', channel: 'Text + email', sent: 84, edited: '28 Sep 2026' },
  { name: 'Renewal offer', sub: 'Term, uplift and the reply-by date', when: '90 days before a contract ends', channel: 'Email', sent: 11, edited: '12 Sep 2026' },
  { name: 'Payment reminder', sub: 'Amount, what it covers, how to pay', when: '7 days after due', channel: 'Email', sent: 23, edited: '1 Oct 2026' },
  { name: 'Second reminder', sub: 'Firmer, names the next step', when: '21 days after due', channel: 'Text + email', sent: 6, edited: '1 Oct 2026' },
  { name: 'Departure and folio', sub: 'Thanks, the folio, and a fuel note', when: 'Check-out morning', channel: 'Email', sent: 79, edited: '15 Aug 2026' },
  { name: 'Storm notice', sub: 'Lines, fenders, who to call', when: 'By hand, when a watch is issued', channel: 'Text', sent: 0, edited: '2 Jun 2026' },
]
const fields = ['{first_name}', '{vessel}', '{check_in}', '{berth}', '{loa}', '{balance}']
</script>
