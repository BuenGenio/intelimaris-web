<template>
  <section v-if="journey" :id="`try-${journey.id}`" class="editorial-section journey-section">
    <div class="editorial-shell">
      <div class="section-intro">
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

const props = defineProps<{ id?: string }>()
const journey = computed(() => findJourney(props.id))
const mounted = ref(false)
onMounted(() => { mounted.value = true })
</script>

<style scoped>
.journey-stage {
  margin-top: var(--space-6);
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
