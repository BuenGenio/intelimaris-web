<template>
  <figure class="editorial-shot">
    <button type="button" class="editorial-shot-button" :aria-label="`Open full size: ${caption}`" @click="open = true">
      <ShotImage :id="id" :priority="priority" />
    </button>
    <figcaption>{{ caption }} <span>Product view · Click to enlarge</span></figcaption>
    <ShotLightbox v-model="open" :id="id" :caption="caption" />
  </figure>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { ShotId } from '@/data/shots'
import ShotImage from '@/components/v2/ShotImage.vue'
import ShotLightbox from '@/components/v2/ShotLightbox.vue'
defineProps<{ id: ShotId; caption: string; priority?: boolean }>()
const open = ref(false)
</script>
<style scoped>
.editorial-shot-button { display:block; border:0; padding:0; width:100%; background:var(--surface-sunken); cursor:zoom-in; }
</style>
