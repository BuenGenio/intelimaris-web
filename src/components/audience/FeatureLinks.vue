<template>
  <div class="feature-links">
    <RouterLink v-for="(feature, index) in features" :key="feature.id" :to="capabilityLink(feature.id)" class="feature-link">
      <span class="editorial-index">{{ String(index + 1).padStart(2, '0') }}</span>
      <div>
        <span class="editorial-eyebrow">{{ feature.product }}</span>
        <h3>{{ feature.label }}</h3>
        <p>{{ feature.summary }}</p>
      </div>
      <span aria-hidden="true">↗</span>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { CAPABILITIES, findCapability, capabilityLink, type Capability } from '@/data/capabilities'
const props = defineProps<{ ids?: string[] }>()
const features = computed(() => props.ids ? props.ids.map(findCapability).filter((c): c is Capability => !!c) : CAPABILITIES)
</script>
