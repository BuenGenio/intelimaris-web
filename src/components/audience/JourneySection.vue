<template>
  <section v-if="journey" :id="`try-${journey.id}`" class="journey-section" :class="hero ? 'journey-section--hero' : 'editorial-section'">
    <div :class="hero ? 'journey-hero-shell' : 'editorial-shell'">
      <div v-if="hero" class="journey-hero-intro">
        <div><p class="editorial-eyebrow">Try it here</p><h2>{{ title || journey.title }}</h2></div>
        <div class="journey-hero-action"><p v-for="paragraph in (intro || journey.action).split('\n\n')" :key="paragraph">{{ paragraph }}</p></div>
      </div>
      <div v-else class="section-intro">
        <div>
          <p class="editorial-eyebrow">Try it here</p>
          <h2>{{ title || journey.title }}</h2>
        </div>
        <p>{{ intro || journey.action }}</p>
      </div>
      <JourneyDisclosure :journey="journey" />
      <JourneyStage :id="journey.id" :initial-screen="initialScreen" class="journey-section-stage" />
      <p class="journey-proves">{{ journey.proves }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JourneyStage from '@/components/audience/JourneyStage.vue'
import JourneyDisclosure from '@/components/audience/JourneyDisclosure.vue'
import { findJourney } from '@/data/playbook/journeys'

const props = defineProps<{ id?: string; hero?: boolean; title?: string; intro?: string; initialScreen?: string }>()
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
@media (max-width: 800px) {
  .journey-hero-intro h2 { font-size: clamp(1.6rem, 6vw, 2.25rem) !important; white-space: normal !important; text-wrap: balance !important; }
}
</style>
