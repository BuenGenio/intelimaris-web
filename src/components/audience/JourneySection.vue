<template>
  <section v-if="journey" :id="`try-${journey.id}`" class="journey-section" :class="hero ? 'journey-section--hero' : 'editorial-section'">
    <div :class="hero ? 'journey-hero-shell' : 'editorial-shell'">
      <div v-if="hero" class="journey-hero-intro">
        <p class="editorial-eyebrow">Try it here</p>
        <p class="journey-hero-action">{{ journey.action }}</p>
      </div>
      <div v-else class="section-intro">
        <div>
          <p class="editorial-eyebrow">Try it here</p>
          <h2>{{ journey.title }}</h2>
        </div>
        <p>{{ journey.action }}</p>
      </div>
      <!-- The journeys drive canvases, timers and live feeds, so they mount on
           the client only; the heading above still pre-renders. -->
      <div class="journey-stage">
        <Suspense v-if="mounted">
          <component :is="journey.component" :key="journey.id" />
          <template #fallback>
            <p class="journey-loading">Loading…</p>
          </template>
        </Suspense>
        <p v-else class="journey-loading">Loading…</p>
      </div>
      <p class="journey-proves">{{ journey.proves }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { findJourney } from '@/data/playbook/journeys'

const props = defineProps<{ id?: string; hero?: boolean }>()
const journey = computed(() => findJourney(props.id))
const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>

<style scoped>
.journey-section--hero {
  margin-top: var(--space-4);
}

.journey-hero-intro {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin-bottom: var(--space-2);
}

.journey-hero-action {
  margin: 0;
  max-width: 60ch;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--text-secondary);
}

.journey-stage {
  margin-top: var(--space-6);
}

.journey-section--hero .journey-stage {
  margin-top: var(--space-2);
}

.journey-loading {
  padding: var(--space-12) 0;
  font-family: var(--font-text);
  color: var(--text-muted);
}

.journey-proves {
  margin: var(--space-6) 0 0;
  max-width: 62ch;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--text-secondary);
}
</style>
