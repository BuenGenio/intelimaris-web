<template>
  <svg
    viewBox="0 0 900 560"
    xmlns="http://www.w3.org/2000/svg"
    class="bathymetry-chart"
    role="img"
    aria-label="Bathymetric depth chart with soundings and a vessel waypoint"
  >
    <defs>
      <linearGradient id="bt-paper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fbf6ec" />
        <stop offset="100%" stop-color="#ebe0c7" />
      </linearGradient>
      <radialGradient id="bt-basin" cx="58%" cy="52%" r="46%">
        <stop offset="0%" stop-color="#d6e6ea" stop-opacity="0.85" />
        <stop offset="70%" stop-color="#f1e8d3" stop-opacity="0" />
      </radialGradient>
      <pattern id="bt-grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M60 0 H0 V60" fill="none" stroke="#0e2c36" stroke-width="0.5" opacity="0.08" />
      </pattern>
    </defs>

    <!-- paper -->
    <rect x="0" y="0" width="900" height="560" fill="url(#bt-paper)" />
    <rect x="0" y="0" width="900" height="560" fill="url(#bt-grid)" />

    <!-- frame -->
    <rect x="18" y="18" width="864" height="524" fill="none" stroke="#0e2c36" stroke-width="1.2" opacity="0.55" />
    <rect x="28" y="28" width="844" height="504" fill="none" stroke="#0e2c36" stroke-width="0.6" opacity="0.35" />

    <!-- latitude/longitude ticks -->
    <g stroke="#0e2c36" stroke-width="0.6" opacity="0.45" font-family="'JetBrains Mono', monospace" font-size="9" fill="#0e2c36">
      <g v-for="n in 9" :key="'lon-' + n">
        <line :x1="28 + n * 93.8" y1="28" :x2="28 + n * 93.8" y2="40" />
        <line :x1="28 + n * 93.8" y1="532" :x2="28 + n * 93.8" y2="520" />
        <text :x="28 + n * 93.8" y="14" text-anchor="middle">{{ 37 + n }}°02′</text>
      </g>
      <g v-for="n in 5" :key="'lat-' + n">
        <line x1="28" :y1="28 + n * 84" x2="40" :y2="28 + n * 84" />
        <line x1="872" :y1="28 + n * 84" x2="860" :y2="28 + n * 84" />
        <text x="10" :y="32 + n * 84" text-anchor="middle" transform="rotate(-90 10 32)">23°1{{ n }}′</text>
      </g>
    </g>

    <!-- water fill hint -->
    <ellipse cx="520" cy="290" rx="320" ry="220" fill="url(#bt-basin)" />

    <!-- depth contours - nested organic basin -->
    <g fill="none" stroke="#124c5e" stroke-linejoin="round" stroke-linecap="round">
      <path d="M120 410 C 180 320, 240 270, 340 250 S 560 200, 700 230 S 830 300, 820 400 S 660 510, 520 490 S 240 500, 120 410 Z" stroke-width="1.3" opacity="0.3" />
      <path d="M170 400 C 220 330, 280 285, 360 270 S 560 235, 680 260 S 790 320, 780 395 S 640 480, 520 470 S 270 475, 170 400 Z" stroke-width="1.1" opacity="0.42" />
      <path d="M220 390 C 260 340, 310 300, 380 290 S 560 265, 660 285 S 750 335, 740 390 S 620 450, 520 445 S 290 450, 220 390 Z" stroke-width="1.1" opacity="0.54" />
      <path d="M270 380 C 300 345, 340 315, 400 310 S 560 295, 640 310 S 710 345, 700 385 S 600 425, 520 420 S 310 425, 270 380 Z" stroke-width="1.1" opacity="0.66" />
      <path d="M320 370 C 340 350, 370 330, 420 328 S 560 320, 620 332 S 670 355, 660 380 S 580 405, 520 400 S 340 400, 320 370 Z" stroke-width="1.1" opacity="0.78" />
      <path d="M375 362 C 400 350, 450 345, 500 347 S 580 355, 600 370 S 560 385, 520 382 S 390 380, 375 362 Z" stroke-width="1.1" opacity="0.9" />
    </g>

    <!-- sounding numbers -->
    <g font-family="'JetBrains Mono', monospace" font-size="11" fill="#0e2c36" text-anchor="middle" opacity="0.82">
      <text x="160" y="360">8</text>
      <text x="250" y="320">14</text>
      <text x="360" y="280">22</text>
      <text x="470" y="265">28</text>
      <text x="580" y="260">31</text>
      <text x="690" y="295">26</text>
      <text x="780" y="360">18</text>
      <text x="720" y="440">14</text>
      <text x="560" y="475">9</text>
      <text x="400" y="465">11</text>
      <text x="280" y="440">10</text>
      <text x="520" y="372"><tspan font-weight="700" font-size="13">·38</tspan></text>
      <text x="440" y="330">33</text>
      <text x="610" y="340">29</text>
    </g>

    <!-- route line -->
    <path d="M 140 145 C 260 160, 360 220, 460 260 S 680 340, 790 470" fill="none" stroke="#e88f3d" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.9" />

    <!-- waypoints along route -->
    <g>
      <g transform="translate(140 145)">
        <circle r="8" fill="none" stroke="#e88f3d" stroke-width="1.6" />
        <circle r="2.5" fill="#e88f3d" />
      </g>
      <g transform="translate(460 260)">
        <circle r="10" fill="none" stroke="#0e2c36" stroke-width="1.4" />
        <circle r="16" fill="none" stroke="#0e2c36" stroke-width="0.8" opacity="0.4" />
        <circle r="3.5" fill="#0e2c36" />
        <line x1="-22" y1="0" x2="-12" y2="0" stroke="#0e2c36" stroke-width="1" />
        <line x1="12" y1="0" x2="22" y2="0" stroke="#0e2c36" stroke-width="1" />
        <line x1="0" y1="-22" x2="0" y2="-12" stroke="#0e2c36" stroke-width="1" />
        <line x1="0" y1="12" x2="0" y2="22" stroke="#0e2c36" stroke-width="1" />
      </g>
      <g transform="translate(790 470)">
        <rect x="-7" y="-7" width="14" height="14" fill="none" stroke="#124c5e" stroke-width="1.4" transform="rotate(45)" />
        <circle r="2.5" fill="#124c5e" />
      </g>
    </g>

    <!-- scale bar -->
    <g transform="translate(50 500)" font-family="'JetBrains Mono', monospace" font-size="9" fill="#0e2c36">
      <rect x="0" y="0" width="40" height="6" fill="#0e2c36" />
      <rect x="40" y="0" width="40" height="6" fill="#fbf6ec" stroke="#0e2c36" stroke-width="0.8" />
      <rect x="80" y="0" width="40" height="6" fill="#0e2c36" />
      <text x="0" y="22" letter-spacing="1.5">0</text>
      <text x="58" y="22" text-anchor="middle" letter-spacing="1.5">1 NM</text>
      <text x="120" y="22" text-anchor="end" letter-spacing="1.5">2</text>
    </g>

    <!-- legend card -->
    <g transform="translate(650 60)">
      <rect x="0" y="0" width="212" height="92" fill="#fbf6ec" stroke="#0e2c36" stroke-width="1" rx="6" />
      <text x="14" y="22" font-family="'Outfit', sans-serif" font-size="10" font-weight="700" fill="#0e2c36" letter-spacing="2.5">BATHYMETRY · M</text>
      <line x1="14" y1="30" x2="198" y2="30" stroke="#0e2c36" stroke-width="0.5" opacity="0.4" />
      <g font-family="'JetBrains Mono', monospace" font-size="10" fill="#0e2c36">
        <line x1="14" y1="46" x2="36" y2="46" stroke="#124c5e" stroke-width="1.4" opacity="0.35" /><text x="44" y="49">0 — 10</text>
        <line x1="106" y1="46" x2="128" y2="46" stroke="#124c5e" stroke-width="1.4" opacity="0.7" /><text x="136" y="49">10 — 25</text>
        <line x1="14" y1="68" x2="36" y2="68" stroke="#124c5e" stroke-width="1.4" /><text x="44" y="71">25 — 40</text>
        <line x1="106" y1="68" x2="118" y2="68" stroke="#e88f3d" stroke-width="1.6" stroke-dasharray="3 2" /><text x="126" y="71">course</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bathymetry-chart {
  width: 100%;
  height: auto;
  display: block;
}
</style>
