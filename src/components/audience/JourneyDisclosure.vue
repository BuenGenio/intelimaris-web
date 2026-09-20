<template>
  <p class="journey-disclosure"><strong>{{ journey.dataLabel }}</strong> {{ journey.dataNote }}</p>
</template>

<script setup lang="ts">
import type { Journey } from '@/data/playbook/journeys'
defineProps<{ journey: Journey }>()
</script>

<style scoped>
.journey-disclosure { margin: var(--space-4) 0; max-width: 90ch; font-size: var(--type-body-sm); line-height: 1.6; color: var(--text-secondary); }
.journey-disclosure strong { color: var(--text-primary); margin-right: .35em; }
</style>
