<template>
  <!-- The journeys drive canvases, timers and live feeds, so they mount on
       the client only; whatever surrounds the stage still pre-renders. -->
  <div class="journey-stage">
    <Suspense v-if="mounted && journey">
      <component :is="journey.component" :key="journey.id" />
      <template #fallback>
        <p class="journey-loading">Loading…</p>
      </template>
    </Suspense>
    <p v-else class="journey-loading">Loading…</p>
  </div>
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
.journey-loading {
  padding: var(--space-12) 0;
  font-family: var(--font-text);
  color: var(--text-muted);
}
</style>
