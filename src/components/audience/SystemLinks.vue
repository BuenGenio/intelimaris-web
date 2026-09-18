<template>
  <div class="system-links">
    <RouterLink v-for="solution in solutions" :key="solution.id" :to="solutionLink(solution.id)">
      <span class="editorial-eyebrow">{{ solution.status }}</span>
      <h3>{{ solution.label }} <span aria-hidden="true">↗</span></h3>
      <p>{{ solution.headline }}</p>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { SOLUTIONS, solutionLink } from '@/data/solutions'
const props = defineProps<{ ids?: string[] }>()
const solutions = computed(() => props.ids ? SOLUTIONS.filter(s => props.ids?.includes(s.id)) : SOLUTIONS)
</script>
