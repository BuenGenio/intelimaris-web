<template>
  <svg
    viewBox="0 0 600 600"
    xmlns="http://www.w3.org/2000/svg"
    class="bridge-compass"
    role="img"
    aria-label="Bearing compass showing heading 042 degrees with target at bearing 118"
  >
    <defs>
      <radialGradient id="bc-paper" cx="50%" cy="42%" r="70%">
        <stop offset="0%" stop-color="#fbf6ec" />
        <stop offset="55%" stop-color="#f3ead9" />
        <stop offset="100%" stop-color="#e3d5b8" />
      </radialGradient>
      <radialGradient id="bc-brass" cx="50%" cy="32%" r="62%">
        <stop offset="0%" stop-color="#f0d79a" />
        <stop offset="55%" stop-color="#c69a55" />
        <stop offset="100%" stop-color="#7c5a26" />
      </radialGradient>
      <linearGradient id="bc-needle" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e88f3d" />
        <stop offset="100%" stop-color="#a8521a" />
      </linearGradient>
      <filter id="bc-engrave" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="0.4" />
      </filter>
    </defs>

    <!-- outer bezel -->
    <circle cx="300" cy="300" r="280" fill="url(#bc-brass)" />
    <circle cx="300" cy="300" r="264" fill="#0e2c36" />
    <circle cx="300" cy="300" r="256" fill="url(#bc-paper)" />

    <!-- degree ticks -->
    <g stroke="#0e2c36" stroke-linecap="round">
      <g v-for="n in 72" :key="'tick-' + n">
        <line
          :transform="`rotate(${(n - 1) * 5} 300 300)`"
          x1="300"
          y1="52"
          x2="300"
          :y2="(n - 1) % 2 === 0 ? 68 : 62"
          :stroke-width="(n - 1) % 6 === 0 ? 2.4 : 1"
          :opacity="(n - 1) % 6 === 0 ? 0.95 : 0.45"
        />
      </g>
    </g>

    <!-- degree labels -->
    <g
      font-family="'JetBrains Mono', ui-monospace, monospace"
      font-size="13"
      font-weight="600"
      fill="#1b3a46"
      text-anchor="middle"
      letter-spacing="1.5"
    >
      <text x="300" y="92">000</text>
      <text x="300" y="520">180</text>
      <text x="92" y="306">270</text>
      <text x="508" y="306">090</text>
      <text x="452" y="112" transform="rotate(45 452 112)">045</text>
      <text x="452" y="500" transform="rotate(-45 452 500)">135</text>
      <text x="148" y="500" transform="rotate(45 148 500)">225</text>
      <text x="148" y="112" transform="rotate(-45 148 112)">315</text>
    </g>

    <!-- inner rose ring -->
    <circle cx="300" cy="300" r="210" fill="none" stroke="#0e2c36" stroke-width="1" opacity="0.5" />
    <circle cx="300" cy="300" r="172" fill="none" stroke="#0e2c36" stroke-width="0.8" opacity="0.3" stroke-dasharray="2 6" />

    <!-- 16-point rose -->
    <g transform="translate(300 300)">
      <g v-for="n in 16" :key="'rose-' + n" :transform="`rotate(${(n - 1) * 22.5})`">
        <polygon
          :points="n % 4 === 1 ? '0,-200 8,-30 0,0 -8,-30' : (n % 2 === 1 ? '0,-160 4,-30 0,0 -4,-30' : '0,-120 2,-30 0,0 -2,-30')"
          :fill="n % 4 === 1 ? '#0e2c36' : (n % 2 === 1 ? '#124c5e' : '#2a6576')"
          :opacity="n % 4 === 1 ? 0.92 : (n % 2 === 1 ? 0.55 : 0.28)"
        />
      </g>
    </g>

    <!-- cardinal letters -->
    <g
      font-family="'Outfit', 'Inter', sans-serif"
      font-size="22"
      font-weight="700"
      fill="#0e2c36"
      text-anchor="middle"
      letter-spacing="2"
    >
      <text x="300" y="142">N</text>
      <text x="300" y="472" fill="#7b5a1f">S</text>
      <text x="468" y="308">E</text>
      <text x="132" y="308">W</text>
    </g>

    <!-- needle (points to ~042°) -->
    <g transform="translate(300 300) rotate(42)">
      <polygon points="0,-200 10,0 0,18 -10,0" fill="url(#bc-needle)" />
      <polygon points="0,200 8,0 0,-18 -8,0" fill="#0e2c36" opacity="0.85" />
      <circle cx="0" cy="0" r="16" fill="#0e2c36" />
      <circle cx="0" cy="0" r="9" fill="#e88f3d" />
      <circle cx="0" cy="0" r="3" fill="#fbf6ec" />
    </g>

    <!-- target pip at bearing 118° -->
    <g transform="translate(300 300) rotate(118)">
      <g transform="translate(0 -218)">
        <circle cx="0" cy="0" r="14" fill="none" stroke="#e88f3d" stroke-width="1.5" stroke-dasharray="3 3" />
        <circle cx="0" cy="0" r="5" fill="#e88f3d" />
      </g>
    </g>

    <!-- readout card top-left -->
    <g transform="translate(24 24)">
      <rect x="0" y="0" width="156" height="62" rx="10" fill="#0e2c36" />
      <text x="14" y="22" font-family="'Outfit', sans-serif" font-size="9" font-weight="600" fill="#f4b582" letter-spacing="2.2">HEADING</text>
      <text x="14" y="50" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="700" fill="#fbf6ec" letter-spacing="1">042°</text>
      <circle cx="136" cy="42" r="5" fill="#e88f3d">
        <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </g>

    <!-- readout card bottom-right -->
    <g transform="translate(420 514)">
      <rect x="0" y="0" width="156" height="62" rx="10" fill="#fbf6ec" stroke="#0e2c36" stroke-width="1.5" />
      <text x="14" y="22" font-family="'Outfit', sans-serif" font-size="9" font-weight="600" fill="#6b4a1a" letter-spacing="2.2">TO WAYPOINT</text>
      <text x="14" y="50" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" fill="#0e2c36" letter-spacing="0.5">BRG 118° · 4.7 NM</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bridge-compass {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 28px 60px rgba(11, 38, 47, 0.22));
}
</style>
