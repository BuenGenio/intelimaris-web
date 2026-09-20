<template>
  <div class="scr">
    <ol class="scr-chips scr-chips--scroll onb-rail" aria-label="Onboarding progress">
      <li class="scr-chip"><ScrIcon name="check" /> The ground rules</li>
      <li class="scr-chip"><ScrIcon name="check" /> Home port</li>
      <li class="scr-chip is-on">3 · Your crew card</li>
      <li class="scr-chip">4 · Get started</li>
    </ol>
    <p class="scr-ov onb-taps">One tap to your chart</p>

    <div class="scr-row onb-title">
      <span class="onb-ring" :style="{ background: `conic-gradient(var(--wave) 0 ${score}%, var(--ink-200) ${score}% 100%)` }"><b class="scr-num">{{ score }}%</b><i>complete</i></span>
      <div>
        <h1 class="scr-h2">Your crew card</h1>
        <p class="scr-sub scr-small">A name, a photo, and how you sail. It builds itself as you tap.</p>
        <div class="scr-chips" style="margin-top: 6px"><span class="scr-pill" data-tone="info">Add a photo</span><span v-if="!level" class="scr-pill" data-tone="info">Add your experience</span></div>
      </div>
    </div>
    <div v-if="level" class="scr-alert" data-tone="safe" style="margin-bottom: 12px"><ScrIcon name="check" /><div><strong>Your card is on the crew list.</strong><span class="scr-small">Marinas you book with can now see who is aboard.</span></div></div>

    <div class="scr-card scr-stack">
      <div class="scr-row scr-card" style="background: var(--ink-50)">
        <span class="onb-avatar"><span class="scr-avatar scr-avatar--lg">SM</span><i><ScrIcon name="camera" /></i></span>
        <div>
          <p class="scr-strong">Sam Miller</p>
          <p class="scr-small scr-muted">{{ level ? `${LEVELS.find((l) => l.id === level)?.title} · Fort Lauderdale` : 'This is your crew-list card.' }}</p>
          <p class="scr-micro scr-muted">Tap the circle to add a photo — worth 15 points.</p>
        </div>
      </div>

      <label class="scr-field">
        <span class="scr-label">Display name</span>
        <input class="scr-input" value="Sam Miller" readonly />
        <span class="scr-hint">What crew, marinas and other members see. Not your account's legal name.</span>
      </label>

      <div class="scr-field">
        <span class="scr-label">How you sail</span>
        <div class="scr-stack scr-stack--tight">
          <button v-for="l in LEVELS" :key="l.id" type="button" class="scr-item scr-card onb-level" :class="{ 'is-on': level === l.id }" @click="level = l.id">
            <span class="scr-item-icon" :data-tone="level === l.id ? 'accent' : undefined"><ScrIcon :name="l.icon" /></span>
            <span><span class="scr-item-title">{{ l.title }}</span><span class="scr-item-sub">{{ l.line }}</span></span>
            <span class="scr-item-end"><ScrIcon v-if="level === l.id" name="check" /></span>
          </button>
        </div>
        <span class="scr-hint">{{ level ? `So the app reads: ${LEVELS.find((l) => l.id === level)?.safety}` : 'It changes the safety copy you get, nothing else. Nobody is ranked by it.' }}</span>
      </div>

      <label class="scr-field">
        <span class="scr-label">Headline</span>
        <input class="scr-input" :placeholder="level ? `${LEVELS.find((l) => l.id === level)?.title} · Fort Lauderdale` : 'Delivery skipper · South Florida'" />
        <span class="scr-hint">{{ level ? `We will write "${LEVELS.find((l) => l.id === level)?.title} · Fort Lauderdale" unless you put something else here.` : 'One line, under your name.' }}</span>
      </label>
    </div>

    <div class="scr-bar">
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Continue</button>
      <button type="button" class="scr-btn scr-btn--ghost">Skip this</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const LEVELS = [
  { id: 'first_season', title: 'First season', line: 'Learning the water, close to home.', icon: 'alert', safety: 'We call out shallow water and no-wake zones early, and say why each time.' },
  { id: 'coastal', title: 'Coastal cruising', line: 'Day trips and short hops along the coast.', icon: 'wave', safety: 'Shoals, bridges and tide gates come up ahead of time. The rest stays quiet.' },
  { id: 'offshore', title: 'Offshore passages', line: 'Nights at sea, weather windows, landfalls.', icon: 'compass', safety: 'Weather windows and passage timing first. Inshore warnings stay brief.' },
  { id: 'professional', title: 'Professional', line: 'Deliveries, charters, or a ticket that says so.', icon: 'anchor', safety: 'Warnings are terse and chart-style. Nothing is explained twice.' },
]
const level = ref('')
const score = computed(() => (level.value ? 60 : 40))
</script>

<style scoped>
.onb-rail { margin-bottom: 8px; }
.onb-rail .scr-chip { min-height: 26px; font-size: 11px; padding-inline: 10px; }
.onb-taps { margin-bottom: 12px; }
.onb-title { align-items: flex-start; margin-bottom: 14px; }
.onb-ring { display: grid; place-content: center; text-align: center; width: 64px; height: 64px; flex-shrink: 0; border-radius: 50%; position: relative; }
.onb-ring::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: var(--ink-50); }
.onb-ring b, .onb-ring i { position: relative; line-height: 1.1; }
.onb-ring b { font-size: 14px; }
.onb-ring i { font-style: normal; font-size: 9px; color: var(--ink-500); }
.onb-avatar { position: relative; flex-shrink: 0; }
.onb-avatar i { position: absolute; right: -2px; bottom: -2px; display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: var(--wave); color: #fff; border: 2px solid var(--ink-0); }
.onb-avatar i svg { width: 12px; height: 12px; }
.onb-level { padding: 9px 12px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); cursor: pointer; }
.onb-level.is-on { border-color: var(--wave); background: var(--wave-50); }
</style>
