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
      <JourneyStage :id="journey.id" class="journey-section-stage" />
      <p class="journey-proves">{{ journey.proves }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JourneyStage from '@/components/audience/JourneyStage.vue'
import { findJourney } from '@/data/playbook/journeys'

const props = defineProps<{ id?: string; hero?: boolean }>()
const journey = computed(() => findJourney(props.id))
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

.journey-section-stage {
  margin-top: var(--space-6);
}

.journey-section--hero .journey-section-stage {
  margin-top: var(--space-2);
}

.journey-proves {
  margin: var(--space-6) 0 0;
  max-width: 62ch;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--text-secondary);
}
</style>
