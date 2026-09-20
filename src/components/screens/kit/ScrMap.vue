<template>
  <!-- A stylised chart: water, a shoreline, an optional track and pins.
       Purely decorative; screens label what it stands for. -->
  <div class="scr-map" :class="[`scr-map--${variant}`]" :style="{ height: typeof height === 'number' ? `${height}px` : height }" aria-hidden="true">
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="scr-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="currentColor" stroke-opacity=".08" /></pattern>
      </defs>
      <rect width="400" height="240" fill="url(#scr-grid)" />
      <path v-if="variant !== 'basin'" class="scr-map-land" d="M0 0h140c20 40-10 70 20 110s-30 70 0 130H0Z" />
      <path v-if="variant !== 'basin'" class="scr-map-land" d="M400 0v240h-90c-30-50 30-90 0-140s20-70 20-100Z" />
      <template v-if="variant === 'basin'">
        <rect class="scr-map-land" x="0" y="0" width="400" height="40" />
        <g class="scr-map-pontoon"><rect x="40" y="40" width="10" height="150" /><rect x="120" y="40" width="10" height="170" /><rect x="200" y="40" width="10" height="150" /><rect x="280" y="40" width="10" height="170" /></g>
        <g class="scr-map-berths"><rect v-for="(b, i) in 18" :key="i" :x="52 + (i % 6) * 40 + (i % 6 >= 2 ? 40 : 0) + (i % 6 >= 4 ? 40 : 0) - 8" :y="48 + Math.floor(i / 6) * 44" width="30" height="36" rx="3" :class="{ taken: i % 3 !== 0 }" /></g>
      </template>
      <path v-if="track" class="scr-map-track" :d="track" />
      <g v-for="(pin, i) in pins" :key="i" class="scr-map-pin" :transform="`translate(${pin.x} ${pin.y})`" :data-tone="pin.tone ?? 'info'">
        <circle r="7" /><circle r="2.5" class="scr-map-pin-core" />
      </g>
      <g v-if="self" class="scr-map-self" :transform="`translate(${self.x} ${self.y}) rotate(${self.heading ?? 0})`"><path d="M0-9 6 7 0 4-6 7Z" /></g>
    </svg>
    <slot />
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'chart' | 'satellite' | 'basin'
  height?: number | string
  track?: string
  pins?: { x: number; y: number; tone?: 'info' | 'safe' | 'warn' | 'high' | 'danger' }[]
  self?: { x: number; y: number; heading?: number }
}>(), { variant: 'chart', height: 220, pins: () => [] })
</script>
