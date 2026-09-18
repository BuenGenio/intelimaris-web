<template>
  <div class="shot-image" :style="{ aspectRatio: `${shot.width} / ${shot.height}` }">
    <img class="shot-image-lqip" :src="lqip" alt="" aria-hidden="true" :class="{ hidden: loaded }" />
    <picture>
      <source type="image/avif" :srcset="avifSet" :sizes="sizes" />
      <source type="image/webp" :srcset="webpSet" :sizes="sizes" />
      <img
        ref="imgEl"
        :src="fallback"
        :alt="shot.alt"
        :width="shot.width"
        :height="shot.height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
        @load="loaded = true"
      />
    </picture>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SHOTS, shotSrcSet, shotFallback, shotLqip, type ShotId } from '@/data/shots'

const props = withDefaults(
  defineProps<{
    id: ShotId
    sizes?: string
    priority?: boolean
  }>(),
  { sizes: '(min-width: 1200px) 1100px, 94vw', priority: false },
)

const shot = SHOTS[props.id]
const avifSet = shotSrcSet(props.id, 'avif')
const webpSet = shotSrcSet(props.id, 'webp')
const fallback = shotFallback(props.id)
const lqip = shotLqip(props.id)
const loaded = ref(false)
const imgEl = ref<HTMLImageElement | null>(null)

/* On a pre-rendered page the image can be complete before this listener is
   attached, so the placeholder would otherwise never clear. */
onMounted(() => {
  const img = imgEl.value
  if (img?.complete && img.naturalWidth > 0) loaded.value = true
})
</script>

<style scoped>
.shot-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--surface-sunken);
}

.shot-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shot-image-lqip {
  position: absolute;
  inset: 0;
  filter: blur(18px);
  transform: scale(1.08);
  transition: opacity 420ms var(--ease-out);
}

.shot-image-lqip.hidden {
  opacity: 0;
}
</style>
