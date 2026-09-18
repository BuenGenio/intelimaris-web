<template>
  <section class="chapter page-hero" :data-chapter="tone">
    <div class="container-wide page-hero-inner">
      <div class="page-hero-copy">
        <div v-if="$slots.mark" class="page-hero-mark"><slot name="mark" /></div>
        <span v-else class="t-overline">{{ overline }}</span>
        <h1 class="t-display">{{ title }}</h1>
        <p class="t-lede">{{ lede }}</p>
        <div v-if="$slots.actions" class="page-hero-actions">
          <slot name="actions" />
        </div>
      </div>
      <div v-if="shot" class="page-hero-shot">
        <ShotFrame :id="shot" :caption="shotCaption" sizes="(min-width: 1180px) 640px, 92vw" priority bleed />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ShotFrame from './ShotFrame.vue'
import type { ShotId } from '@/data/shots'

withDefaults(
  defineProps<{
    overline: string
    title: string
    lede: string
    shot?: ShotId
    shotCaption?: string
    tone?: 'slate' | 'light' | 'dark'
  }>(),
  { shotCaption: '', tone: 'slate' },
)
</script>

<style scoped>
.page-hero {
  padding-top: clamp(8rem, 6rem + 8vw, 12rem);
}

.page-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 1rem + 4vw, 4.5rem);
  align-items: center;
}

.page-hero-mark {
  margin-bottom: var(--space-2);
}

.page-hero-copy .t-display {
  margin-top: var(--space-4);
  max-width: 15ch;
}

.page-hero-copy .t-lede {
  margin-top: var(--space-6);
  max-width: 46ch;
}

.page-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

@media (max-width: 1080px) {
  .page-hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
