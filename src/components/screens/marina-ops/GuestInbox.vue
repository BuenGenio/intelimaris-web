<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Guest inbox</h1>
        <p class="scr-sub">Threads tied to the stay or contract they concern.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill" data-tone="info">3 unanswered</span>
        <button type="button" class="scr-btn scr-btn--ghost">Templates</button>
      </div>
    </div>

    <div class="gi-layout">
      <div class="scr-card scr-card--flush">
        <div style="padding: 10px 12px 6px"><input class="scr-input scr-input--search" placeholder="Guest, vessel or berth" aria-label="Search threads" /></div>
        <ul class="scr-list" style="border: 0; border-radius: 0">
          <li v-for="t in threads" :key="t.who" class="scr-item" :class="{ 'gi-on': t.who === open }" @click="open = t.who">
            <span class="scr-avatar">{{ t.initials }}</span>
            <div style="min-width: 0"><span class="scr-item-title">{{ t.who }} <span class="scr-muted scr-small">· {{ t.vessel }}</span></span><span class="scr-item-sub">{{ t.about }} · {{ t.last }}</span></div>
            <span class="scr-item-end"><span v-if="t.unanswered" class="scr-dot" data-tone="info"></span><span class="scr-num">{{ t.at }}</span></span>
          </li>
        </ul>
      </div>

      <div class="scr-card">
        <div class="scr-row scr-row--between">
          <div><p class="scr-card-title">Sam Miller · Wanderer</p><p class="scr-sub scr-small">Stay C-14 · 4–7 Oct 2026 · +1 305 555 0123 · sam@example.com</p></div>
          <span class="scr-pill" data-tone="safe">Confirmed</span>
        </div>
        <div class="scr-divider"></div>
        <ul class="scr-stack" style="gap: 10px">
          <li v-for="m in conversation" :key="m.at" class="gi-msg" :class="{ 'gi-mine': m.mine }">
            <p>{{ m.body }}</p>
            <span class="scr-micro scr-muted scr-num">{{ m.by }} · {{ m.at }}<template v-if="m.via"> · {{ m.via }}</template></span>
          </li>
        </ul>
        <div class="scr-field" style="margin-top: 12px">
          <span class="scr-label">Reply</span>
          <textarea class="scr-textarea" placeholder="Reply lands on the same thread and on the stay's record."></textarea>
        </div>
        <div class="scr-row" style="margin-top: 8px"><button type="button" class="scr-btn scr-btn--primary">Send</button><button type="button" class="scr-btn">Use a template</button><span class="scr-micro scr-muted">Goes by text; email copy on.</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref('Sam Miller')
const threads = [
  { who: 'Sam Miller', initials: 'SM', vessel: 'Wanderer', about: 'Stay C-14', last: 'Is there a late-arrival gate code?', at: '13:20', unanswered: false },
  { who: 'Ana Ruiz', initials: 'AR', vessel: 'Blue Heron', about: 'Stay D-02', last: 'Running late, maybe 19:00', at: '12:55', unanswered: true },
  { who: 'Dana Whitfield', initials: 'DW', vessel: 'Halcyon', about: 'Contract 2026–27', last: 'Can we talk about the renewal figure?', at: 'Yesterday', unanswered: true },
  { who: 'Chris Park', initials: 'CP', vessel: 'Kestrel', about: 'Request', last: 'Draft is 6 ft, is that a problem?', at: 'Yesterday', unanswered: true },
  { who: 'Coconuts', initials: 'CO', vessel: 'Dock and dine', about: 'Courtesy berths', last: 'Holding 3 for the 19:00 seating, thanks', at: 'Fri', unanswered: false },
]
const conversation = [
  { body: 'Hi, we are running later than planned, ETA around 21:30. Is there a late-arrival gate code?', by: 'Sam Miller', at: 'Oct 4, 13:20', via: 'text', mine: false },
  { body: 'No problem. C-14 is yours, pedestal will be live by 14:00. Gate code for tonight: 4471. VHF 71 when you are in the channel and we will spot you in.', by: 'You', at: 'Oct 4, 13:22', via: 'text · delivered', mine: true },
  { body: 'Perfect, thanks. Draft is 4.6 ft in case that matters.', by: 'Sam Miller', at: 'Oct 4, 13:24', via: 'text', mine: false },
]
</script>

<style scoped>
.gi-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: 14px; align-items: start; }
.gi-on { background: var(--wave-50); }
.gi-msg { max-width: 85%; padding: 8px 12px; border-radius: 12px; background: var(--ink-100); display: grid; gap: 3px; }
.gi-mine { margin-left: auto; background: var(--wave-100); }
</style>
