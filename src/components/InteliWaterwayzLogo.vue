<template>
  <span
    class="iw-logo"
    :style="{ '--iw-h': `${height}px` }"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <img v-if="variant !== 'auto'" :src="ART[variant]" alt="" decoding="async" />
    <template v-else>
      <img class="iw-light" :src="ART.blue" alt="" decoding="async" />
      <img class="iw-dark" :src="ART['blue-inteli-white']" alt="" decoding="async" />
    </template>
  </span>
</template>

<script setup lang="ts">
/* The supplied InteliWaterwayz® lockup, as the Experience shows it. The files
   are byte copies of the approved 578 × 139 masters and are never recoloured
   or redrawn; the wrapper only crops the masters' built-in clear space so the
   visible lockup, not the canvas, is `height` tall. `auto` follows the site
   theme: the RGB Blue artwork by day, the blue-Inteli/white-Waterwayz
   combination on dark. Pin a variant for a surface that stays dark by day. */
export type InteliWaterwayzLogoVariant = 'blue' | 'blue-inteli-white' | 'reverse'

withDefaults(
  defineProps<{
    variant?: InteliWaterwayzLogoVariant | 'auto'
    /** Height of the visible lockup in px. */
    height?: number
    /** Set when the logo stands alone; inside a link that already names it, leave it off. */
    label?: string
  }>(),
  { variant: 'auto', height: 32, label: '' },
)

const base = import.meta.env.BASE_URL
const ART: Record<InteliWaterwayzLogoVariant, string> = {
  blue: `${base}assets/inteliwaterwayz-blue.png`,
  'blue-inteli-white': `${base}assets/inteliwaterwayz-blue-inteli-white.svg`,
  reverse: `${base}assets/inteliwaterwayz-reverse.png`,
}
</script>

<style scoped>
/* The artwork sits at x 101–523, y 47–104 of the 578 × 139 canvas; two
   pixels of air are kept on every side. */
.iw-logo {
  --iw-x: 99;
  --iw-y: 45;
  --iw-w: 426;
  --iw-ht: 61;
  position: relative;
  display: inline-block;
  width: calc(var(--iw-h) * var(--iw-w) / var(--iw-ht));
  max-width: 100%;
  aspect-ratio: var(--iw-w) / var(--iw-ht);
  overflow: hidden;
  vertical-align: middle;
  line-height: 0;
}

.iw-logo img {
  position: absolute;
  left: calc(-100% * var(--iw-x) / var(--iw-w));
  top: calc(-100% * var(--iw-y) / var(--iw-ht));
  width: calc(100% * 578 / var(--iw-w));
  height: calc(100% * 139 / var(--iw-ht));
  max-width: none;
  display: block;
}

.iw-dark { display: none; }
[data-theme='dark'] .iw-light { display: none; }
[data-theme='dark'] .iw-dark { display: block; }
</style>
