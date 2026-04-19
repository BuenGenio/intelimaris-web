<template>
  <svg
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
    class="sonar-scope"
    role="img"
    aria-label="Sonar scope with rotating sweep and detected targets"
  >
    <defs>
      <radialGradient id="ss-screen" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#0b2e2a" />
        <stop offset="70%" stop-color="#071c1c" />
        <stop offset="100%" stop-color="#050f10" />
      </radialGradient>
      <radialGradient id="ss-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(232,143,61,0.08)" />
        <stop offset="100%" stop-color="rgba(232,143,61,0)" />
      </radialGradient>
      <linearGradient id="ss-sweep" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%" stop-color="#e88f3d" stop-opacity="0" />
        <stop offset="70%" stop-color="#e88f3d" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#f4b582" stop-opacity="0.85" />
      </linearGradient>
    </defs>

    <!-- bezel -->
    <circle cx="300" cy="300" r="288" fill="#102027" />
    <circle cx="300" cy="300" r="272" fill="url(#ss-screen)" />
    <circle cx="300" cy="300" r="272" fill="url(#ss-glow)" />

    <!-- range rings -->
    <g fill="none" stroke="#68c9b3" stroke-width="0.8" opacity="0.32">
      <circle cx="300" cy="300" r="56" />
      <circle cx="300" cy="300" r="110" />
      <circle cx="300" cy="300" r="164" />
      <circle cx="300" cy="300" r="218" />
      <circle cx="300" cy="300" r="268" />
    </g>

    <!-- cross hair -->
    <g stroke="#68c9b3" stroke-width="0.6" opacity="0.22">
      <line x1="32" y1="300" x2="568" y2="300" />
      <line x1="300" y1="32" x2="300" y2="568" />
      <line x1="110" y1="110" x2="490" y2="490" />
      <line x1="490" y1="110" x2="110" y2="490" />
    </g>

    <!-- azimuth ticks -->
    <g stroke="#9ce0d0" stroke-linecap="round">
      <g v-for="n in 36" :key="'az-' + n" :transform="`rotate(${(n - 1) * 10} 300 300)`">
        <line x1="300" y1="36" x2="300" :y2="(n - 1) % 3 === 0 ? 54 : 46" :stroke-width="(n - 1) % 9 === 0 ? 2 : 0.8" :opacity="(n - 1) % 9 === 0 ? 0.9 : 0.4" />
      </g>
    </g>

    <!-- cardinal labels -->
    <g font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#9ce0d0" text-anchor="middle" letter-spacing="2">
      <text x="300" y="78" opacity="0.9">N · 000</text>
      <text x="300" y="534">S · 180</text>
      <text x="70" y="306" text-anchor="middle">W · 270</text>
      <text x="530" y="306" text-anchor="middle">E · 090</text>
    </g>

    <!-- sweep -->
    <g transform="translate(300 300)">
      <g>
        <path d="M0 0 L260 -15 A 268 268 0 0 1 260 15 Z" fill="url(#ss-sweep)" />
        <line x1="0" y1="0" x2="268" y2="0" stroke="#f4b582" stroke-width="1.5" opacity="0.85" />
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
      </g>
    </g>

    <!-- target blips -->
    <g>
      <g transform="translate(380 218)">
        <circle r="5" fill="#e88f3d" opacity="0.9" />
        <circle r="11" fill="none" stroke="#e88f3d" stroke-width="1" opacity="0.35" />
      </g>
      <g transform="translate(190 350)">
        <circle r="4" fill="#9ce0d0" opacity="0.9" />
        <circle r="9" fill="none" stroke="#9ce0d0" stroke-width="0.8" opacity="0.3" />
      </g>
      <g transform="translate(430 390)">
        <circle r="3.5" fill="#9ce0d0" opacity="0.8" />
      </g>
      <g transform="translate(250 170)">
        <circle r="3" fill="#9ce0d0" opacity="0.6" />
      </g>
    </g>

    <!-- center -->
    <g transform="translate(300 300)">
      <circle r="10" fill="#0b1f20" stroke="#9ce0d0" stroke-width="1" opacity="0.6" />
      <circle r="3" fill="#f4b582" />
    </g>

    <!-- corner readouts -->
    <g font-family="'JetBrains Mono', monospace" fill="#9ce0d0" letter-spacing="1.5">
      <g transform="translate(38 46)">
        <text font-size="9" opacity="0.6">RANGE</text>
        <text y="20" font-size="18" font-weight="700">2.4 NM</text>
      </g>
      <g transform="translate(490 46)">
        <text font-size="9" opacity="0.6" text-anchor="start">GAIN</text>
        <text y="20" font-size="18" font-weight="700">72</text>
      </g>
      <g transform="translate(38 536)">
        <text font-size="9" opacity="0.6">CONTACTS</text>
        <text y="20" font-size="18" font-weight="700" fill="#f4b582">04</text>
      </g>
      <g transform="translate(490 536)">
        <text font-size="9" opacity="0.6">MODE</text>
        <text y="20" font-size="18" font-weight="700">AUTO</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sonar-scope {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 30px 70px rgba(7, 28, 28, 0.4));
}
</style>
