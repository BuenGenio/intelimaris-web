<template>
  <!-- A full-bleed photograph with the page's headline over its darker side.
       The copy is a slot styled by .photo-hero-* in audience.css. -->
  <section class="photo-hero" :style="{ '--photo-position': position, '--photo-position-narrow': narrowPosition ?? position }">
    <img
      class="photo-hero-img"
      :src="src"
      :srcset="srcset"
      :sizes="srcset ? '100vw' : undefined"
      :width="width"
      :height="height"
      alt=""
      fetchpriority="high"
    />
    <div class="editorial-shell photo-hero-copy"><slot /></div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ src: string; srcset?: string; width: number; height: number; position?: string; narrowPosition?: string }>(), { position: '50% 50%' })
</script>
