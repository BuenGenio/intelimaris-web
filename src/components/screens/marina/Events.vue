<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Events</h1>
        <p class="scr-sub">What you are hosting or closing, posted where every vessel nearby reads it.</p>
      </div>
      <button class="scr-btn scr-btn--primary">Post an event</button>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Upcoming</h2><p class="scr-sub scr-small">Running now and coming up, soonest first. An event runs at most 31 days.</p></div>
        <button class="scr-btn scr-btn--ghost scr-btn--sm">Show past</button>
      </div>
      <div class="scr-divider"></div>
      <div v-for="e in events" :key="e.name" class="scr-row scr-row--wrap ev-row">
        <div style="min-width: 0; flex: 1">
          <span class="scr-item-title">{{ e.name }} <span class="scr-small scr-muted" style="font-weight: 400">{{ e.kind }}</span></span>
          <span class="scr-item-sub">{{ e.window }}</span>
          <span v-if="e.description" class="scr-micro scr-muted" style="display: block; margin-top: 2px">{{ e.description }}</span>
        </div>
        <span v-if="e.timing" class="scr-pill" :data-tone="e.timing === 'Running' ? 'accent' : undefined">{{ e.timing }}</span>
        <span v-if="e.nav" class="scr-pill" data-tone="warn">Affects navigation</span>
        <span v-if="e.source" class="scr-pill scr-pill--bare">{{ e.source }}</span>
        <span v-if="!e.source" class="scr-row"><button class="scr-btn scr-btn--ghost scr-btn--sm">Edit</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Delete</button></span>
      </div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Post an event</h2>
      <p class="scr-sub scr-small">Omit the position and the event sits at the marina; give one and it must be within 2 km. The service checks.</p>
      <div class="scr-grid-2" style="margin-top: 10px">
        <label class="scr-field"><span class="scr-label">Name</span><input class="scr-input" placeholder="Fuel dock closed for maintenance" readonly /></label>
        <label class="scr-field"><span class="scr-label">Kind</span><select class="scr-select"><option>Closure</option><option>Regatta</option><option>Fireworks</option><option>Works</option></select></label>
        <label class="scr-field"><span class="scr-label">Starts</span><input class="scr-input" value="2026-10-15T06:00" readonly /></label>
        <label class="scr-field"><span class="scr-label">Ends</span><input class="scr-input" value="2026-10-15T12:00" readonly /></label>
        <label class="scr-field"><span class="scr-label">Latitude</span><input class="scr-input" placeholder="Blank = at the marina" readonly /></label>
        <label class="scr-field"><span class="scr-label">Longitude</span><input class="scr-input" placeholder="Blank = at the marina" readonly /></label>
      </div>
      <label class="scr-field" style="margin-top: 10px"><span class="scr-label">Description</span><textarea class="scr-textarea" readonly></textarea></label>
      <div class="scr-row" style="margin-top: 10px"><button class="scr-btn scr-btn--primary">Post event</button><button class="scr-btn scr-btn--ghost">Cancel</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const events = [
  { name: 'Dock walk with the Coast Guard auxiliary', kind: 'Event', window: 'Running · Wed 14 Oct, 09:00–12:00', description: 'Free vessel safety checks on Docks A and B.', timing: 'Running', nav: false, source: '' },
  { name: 'Fuel dock closed for maintenance', kind: 'Closure', window: 'Thu 15 Oct, 06:00–12:00', description: 'Hose reel replacement. Pump-out stays open.', timing: 'In 1 day', nav: false, source: '' },
  { name: 'Dock C power outage, planned', kind: 'Works', window: 'Sat 17 Oct, 05:00–07:00', description: 'Breaker panel C-13/C-14 replaced. Bring the generator if you need it.', timing: 'In 3 days', nav: false, source: '' },
  { name: 'FLIBS courtesy shuttle', kind: 'Event', window: 'Wed 21 Oct – Sun 25 Oct', description: 'Water taxi from the face dock every 20 minutes, 09:00–20:00.', timing: 'In 7 days', nav: false, source: '' },
  { name: 'Show-week no-wake zone, ICW mile 1064–1066', kind: 'Notice', window: 'Wed 21 Oct – Sun 25 Oct', description: '', timing: 'In 7 days', nav: true, source: 'USCG LNM' },
  { name: 'Fireworks off the beach', kind: 'Fireworks', window: 'Sat 31 Oct, 20:30–21:00', description: 'Safety zone 500 yd; the inlet stays open.', timing: 'In 17 days', nav: true, source: '' },
]
</script>

<style scoped>
.ev-row { padding: 9px 0; }
.ev-row + .ev-row { border-top: 1px solid var(--ink-100); }
</style>
