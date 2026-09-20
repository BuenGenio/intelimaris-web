<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Dock walks</h1>
        <p class="scr-sub">What was actually observed on the pontoon, against what the system believed.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill" data-tone="high">3 differ</span>
        <button type="button" class="scr-btn scr-btn--primary">Start a walk</button>
      </div>
    </div>

    <div class="scr-split">
      <div>
        <div class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title">C dock · walked 13:05 by Luis Ortega</p><span class="scr-small scr-muted scr-num">18 berths · 11 min</span></div>
          <p class="scr-sub scr-small" style="margin-bottom: 8px">Each berth: what the board said, what the walker saw. A difference is a question for the office, not an edit.</p>
          <table class="scr-table">
            <thead><tr><th>Berth</th><th>Board said</th><th>Walker saw</th><th></th></tr></thead>
            <tbody>
              <tr v-for="b in berths" :key="b.berth" :class="{ 'is-selected': b.differs }">
                <td class="scr-strong scr-num">{{ b.berth }}</td>
                <td class="scr-muted">{{ b.board }}</td>
                <td>{{ b.seen }}</td>
                <td><span v-if="b.differs" class="scr-pill" data-tone="high">Differs</span><span v-else class="scr-pill" data-tone="safe">Matches</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="scr-stack">
        <div class="scr-card scr-card--accent">
          <p class="scr-card-title">Differences to settle</p>
          <ul class="scr-timeline">
            <li v-for="d in diffs" :key="d.berth" class="scr-tl"><span class="scr-dot" data-tone="warn"></span><div><span class="scr-strong scr-num">{{ d.berth }}</span> <span class="scr-small">{{ d.what }}</span></div><button type="button" class="scr-btn scr-btn--sm">Settle</button></li>
          </ul>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Recent walks</p>
          <ul>
            <li v-for="w in walks" :key="w.when" class="scr-kv"><span>{{ w.dock }} · {{ w.who }}</span><span class="scr-num">{{ w.when }} · <span :class="w.diffs ? 'scr-accent' : 'scr-muted'">{{ w.diffs }} differ</span></span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const berths = [
  { berth: 'C-10', board: 'Free', seen: 'Free', differs: false },
  { berth: 'C-11', board: 'Occupied · Osprey', seen: 'Osprey', differs: false },
  { berth: 'C-12', board: 'Free', seen: 'Unknown 30 ft centre console', differs: true },
  { berth: 'C-13', board: 'Occupied · Marlin II', seen: 'Marlin II', differs: false },
  { berth: 'C-14', board: 'Reserved · Wanderer from 14:30', seen: 'Empty, pedestal off', differs: false },
  { berth: 'C-15', board: 'Occupied · Tern', seen: 'Empty', differs: true },
  { berth: 'C-16', board: 'Closed · piling repair', seen: 'Piling repaired, no cones', differs: true },
  { berth: 'C-17', board: 'Occupied · Halcyon', seen: 'Halcyon', differs: false },
]
const diffs = [
  { berth: 'C-12', what: 'A vessel the board does not know — walk-in or wrong berth' },
  { berth: 'C-15', what: 'Tern gone; board still charging the night' },
  { berth: 'C-16', what: 'Closure can be lifted; nobody told the board' },
]
const walks = [
  { dock: 'C dock', who: 'Luis Ortega', when: 'Today 13:05', diffs: 3 },
  { dock: 'D dock', who: 'Luis Ortega', when: 'Today 12:40', diffs: 0 },
  { dock: 'A and B docks', who: 'Rosa Delgado', when: 'Today 07:15', diffs: 1 },
  { dock: 'Fuel dock', who: 'Sam Miller', when: 'Yesterday 17:50', diffs: 0 },
]
</script>
