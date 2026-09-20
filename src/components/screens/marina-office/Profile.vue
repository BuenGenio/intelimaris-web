<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Marina profile</h1>
        <p class="scr-sub">What the directory says about you, where each fact came from, and your corrections on top.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="safe">Claim approved</span><button type="button" class="scr-btn scr-btn--ghost">Claim</button></div>
    </div>

    <div class="scr-card">
      <p class="scr-card-title">The record</p>
      <p class="scr-sub scr-small" style="margin-bottom: 4px">Provenance per fact: Imported is the directory's word, Curator is ours, You is yours — and yours outranks both.</p>
      <dl>
        <div v-for="f in fields" :key="f.label" class="scr-kv" style="align-items: center; gap: 12px">
          <dt class="scr-ov" style="width: 130px; flex-shrink: 0">{{ f.label }}</dt>
          <template v-if="editing === f.label">
            <dd style="flex: 1; display: flex; gap: 8px; align-items: end">
              <span class="scr-field" style="flex: 1"><span class="scr-label">{{ f.label }}</span><input class="scr-input" :value="f.value" /><span class="scr-hint">{{ f.note ? `${f.note}. ` : '' }}Blank = explicitly unknown, which beats a wrong import.</span></span>
              <button type="button" class="scr-btn scr-btn--sm scr-btn--primary" @click="editing = ''">Save</button>
              <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost" @click="editing = ''">Cancel</button>
            </dd>
          </template>
          <template v-else>
            <dd class="scr-strong" style="min-width: 0">{{ f.value }}</dd>
            <dd><span class="scr-pill" :data-tone="f.source === 'You' ? 'accent' : undefined">{{ f.source }}</span></dd>
            <dd v-if="f.note" class="scr-micro scr-muted">{{ f.note }}</dd>
            <dd class="scr-row" style="margin-left: auto; gap: 2px">
              <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost" @click="editing = f.label">Correct</button>
              <button v-if="f.source === 'You'" type="button" class="scr-btn scr-btn--sm scr-btn--ghost" title="Withdraw your correction; the field falls back to the curator's word or the import.">Withdraw</button>
            </dd>
          </template>
        </div>
      </dl>
      <p class="scr-micro scr-muted" style="margin-top: 10px">Position, kind, outline and country are what the directory IS, not what an operator says — the lane refuses them by name, so they are not offered here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const editing = ref('')
const fields = [
  { label: 'Name', value: 'Bahia Mar Marina', source: 'Imported', note: '' },
  { label: 'Phone', value: '+1 954 627 6309', source: 'You', note: '' },
  { label: 'Website', value: 'bahiamarmarina.example', source: 'Imported', note: '' },
  { label: 'Hours', value: '07:00–19:00 daily · dockmaster on call', source: 'You', note: '' },
  { label: 'VHF', value: '16 / 71', source: 'You', note: 'The channel you answer on' },
  { label: 'Berths', value: '250', source: 'Curator', note: 'The capacity tag' },
  { label: 'Approach depth', value: '2.4 m', source: 'You', note: 'Operator-stated, not a sounding' },
  { label: 'Depth datum', value: 'MLLW', source: 'You', note: 'MLLW, LAT, …' },
  { label: 'Max vessel length', value: '100 m', source: 'Curator', note: '' },
  { label: 'Max vessel beam', value: '—', source: 'Imported', note: '' },
  { label: 'Amenities', value: 'Fuel, pump-out, 50 A and 100 A power, wifi, laundry, showers, restaurant', source: 'You', note: 'Comma-separated' },
]
</script>
