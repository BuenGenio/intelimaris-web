<template>
  <svg
    viewBox="0 0 1100 560"
    xmlns="http://www.w3.org/2000/svg"
    class="vessel-schematic"
    role="img"
    aria-label="Blueprint-style side view of a motor yacht with numbered sensor callouts"
  >
    <defs>
      <linearGradient id="vs-paper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fbf6ec" />
        <stop offset="100%" stop-color="#efe4cb" />
      </linearGradient>
      <pattern id="vs-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0 H0 V40" fill="none" stroke="#0e2c36" stroke-width="0.4" opacity="0.07" />
      </pattern>
      <pattern id="vs-grid-fine" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M8 0 H0 V8" fill="none" stroke="#0e2c36" stroke-width="0.25" opacity="0.04" />
      </pattern>
    </defs>

    <rect x="0" y="0" width="1100" height="560" fill="url(#vs-paper)" />
    <rect x="0" y="0" width="1100" height="560" fill="url(#vs-grid-fine)" />
    <rect x="0" y="0" width="1100" height="560" fill="url(#vs-grid)" />

    <!-- title strip -->
    <g font-family="'Outfit', sans-serif" fill="#0e2c36">
      <text x="40" y="46" font-size="10" font-weight="700" letter-spacing="3">GENERAL ARRANGEMENT · MOTOR YACHT · 18.5 M · PROFILE</text>
      <line x1="40" y1="58" x2="1060" y2="58" stroke="#0e2c36" stroke-width="0.6" opacity="0.4" />
    </g>

    <!-- waterline -->
    <line x1="60" y1="370" x2="1040" y2="370" stroke="#124c5e" stroke-width="0.8" stroke-dasharray="6 6" opacity="0.6" />
    <g font-family="'JetBrains Mono', monospace" font-size="9" fill="#124c5e" opacity="0.8">
      <text x="56" y="368" text-anchor="end">WL</text>
      <text x="1044" y="368">WL</text>
    </g>

    <!-- hull -->
    <g stroke="#0e2c36" stroke-width="1.6" fill="none" stroke-linejoin="round" stroke-linecap="round">
      <!-- hull outline -->
      <path d="M 180 370 C 200 410, 240 440, 340 450 L 860 450 C 940 448, 990 430, 1020 390 L 1020 370 Z" fill="#fbf6ec" />
      <!-- main deck -->
      <path d="M 200 370 L 200 310 L 1010 310 L 1020 370" />
      <!-- superstructure -->
      <path d="M 300 310 L 310 250 L 820 250 L 840 310" />
      <!-- flybridge -->
      <path d="M 430 250 L 440 200 L 720 200 L 740 250" />
      <!-- radar arch -->
      <path d="M 560 200 L 560 150 L 600 150 L 600 200" />
      <path d="M 542 150 L 618 150" stroke-width="1" />
      <circle cx="580" cy="142" r="6" fill="#0e2c36" />
      <!-- bow -->
      <path d="M 180 370 C 180 350, 186 332, 200 310" />
    </g>

    <!-- deck lines / portlights -->
    <g stroke="#0e2c36" stroke-width="0.8" opacity="0.55">
      <line x1="240" y1="420" x2="960" y2="420" />
      <line x1="220" y1="340" x2="1010" y2="340" />
    </g>
    <g fill="#124c5e" opacity="0.18">
      <rect x="250" y="395" width="30" height="12" rx="2" />
      <rect x="300" y="395" width="30" height="12" rx="2" />
      <rect x="350" y="395" width="30" height="12" rx="2" />
      <rect x="400" y="395" width="30" height="12" rx="2" />
      <rect x="790" y="395" width="30" height="12" rx="2" />
      <rect x="840" y="395" width="30" height="12" rx="2" />
      <rect x="890" y="395" width="30" height="12" rx="2" />
    </g>

    <!-- saloon windows -->
    <g fill="#124c5e" opacity="0.25">
      <rect x="330" y="268" width="90" height="28" rx="3" />
      <rect x="440" y="268" width="160" height="28" rx="3" />
      <rect x="620" y="268" width="90" height="28" rx="3" />
      <rect x="730" y="268" width="70" height="28" rx="3" />
    </g>

    <!-- flybridge glass -->
    <g fill="#124c5e" opacity="0.2">
      <rect x="460" y="218" width="250" height="24" rx="3" />
    </g>

    <!-- internal dashed compartments -->
    <g stroke="#0e2c36" stroke-width="0.7" stroke-dasharray="3 3" opacity="0.35" fill="none">
      <line x1="440" y1="370" x2="440" y2="430" />
      <line x1="640" y1="370" x2="640" y2="445" />
      <line x1="780" y1="370" x2="780" y2="450" />
    </g>

    <!-- hull numerals strip -->
    <g font-family="'JetBrains Mono', monospace" font-size="8" fill="#0e2c36" opacity="0.5" text-anchor="middle">
      <text x="200" y="472">FR 0</text>
      <text x="340" y="472">FR 5</text>
      <text x="500" y="472">FR 10</text>
      <text x="660" y="472">FR 15</text>
      <text x="820" y="472">FR 20</text>
      <text x="980" y="472">FR 25</text>
    </g>

    <!-- CALLOUTS -->
    <!-- 01 Smoke/CO · saloon -->
    <g>
      <circle cx="380" cy="282" r="5" fill="#e88f3d" />
      <line x1="380" y1="282" x2="230" y2="130" stroke="#0e2c36" stroke-width="0.8" />
      <g transform="translate(110 108)">
        <rect width="28" height="28" rx="14" fill="#0e2c36" />
        <text x="14" y="19" font-family="'Outfit',sans-serif" font-size="12" font-weight="700" fill="#fbf6ec" text-anchor="middle">01</text>
        <text x="44" y="12" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="#0e2c36" letter-spacing="2">SMOKE · CO</text>
        <text x="44" y="26" font-family="'JetBrains Mono',monospace" font-size="9" fill="#0e2c36" opacity="0.7">saloon · cabin deck</text>
      </g>
    </g>

    <!-- 02 Thermal · engine room -->
    <g>
      <circle cx="600" cy="410" r="5" fill="#e88f3d" />
      <line x1="600" y1="410" x2="600" y2="512" stroke="#0e2c36" stroke-width="0.8" />
      <g transform="translate(470 516)">
        <rect width="28" height="28" rx="14" fill="#0e2c36" />
        <text x="14" y="19" font-family="'Outfit',sans-serif" font-size="12" font-weight="700" fill="#fbf6ec" text-anchor="middle">02</text>
        <text x="44" y="12" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="#0e2c36" letter-spacing="2">THERMAL</text>
        <text x="44" y="26" font-family="'JetBrains Mono',monospace" font-size="9" fill="#0e2c36" opacity="0.7">engine room · IR + contact</text>
      </g>
    </g>

    <!-- 03 Bilge · water ingress -->
    <g>
      <circle cx="720" cy="440" r="5" fill="#e88f3d" />
      <line x1="720" y1="440" x2="880" y2="518" stroke="#0e2c36" stroke-width="0.8" />
      <g transform="translate(884 516)">
        <rect width="28" height="28" rx="14" fill="#0e2c36" />
        <text x="14" y="19" font-family="'Outfit',sans-serif" font-size="12" font-weight="700" fill="#fbf6ec" text-anchor="middle">03</text>
        <text x="44" y="12" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="#0e2c36" letter-spacing="2">BILGE · INGRESS</text>
        <text x="44" y="26" font-family="'JetBrains Mono',monospace" font-size="9" fill="#0e2c36" opacity="0.7">float + conductivity · dual</text>
      </g>
    </g>

    <!-- 04 Battery bank -->
    <g>
      <circle cx="830" cy="410" r="5" fill="#e88f3d" />
      <line x1="830" y1="410" x2="980" y2="130" stroke="#0e2c36" stroke-width="0.8" />
      <g transform="translate(920 108)">
        <rect width="28" height="28" rx="14" fill="#0e2c36" />
        <text x="14" y="19" font-family="'Outfit',sans-serif" font-size="12" font-weight="700" fill="#fbf6ec" text-anchor="middle">04</text>
        <text x="44" y="12" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="#0e2c36" letter-spacing="2">BATTERY · BMS</text>
        <text x="44" y="26" font-family="'JetBrains Mono',monospace" font-size="9" fill="#0e2c36" opacity="0.7">voltage · runaway watch</text>
      </g>
    </g>

    <!-- 05 Helm telemetry -->
    <g>
      <circle cx="580" cy="222" r="5" fill="#e88f3d" />
      <line x1="580" y1="222" x2="580" y2="80" stroke="#0e2c36" stroke-width="0.8" />
      <g transform="translate(452 50)">
        <rect width="28" height="28" rx="14" fill="#0e2c36" />
        <text x="14" y="19" font-family="'Outfit',sans-serif" font-size="12" font-weight="700" fill="#fbf6ec" text-anchor="middle">05</text>
        <text x="44" y="12" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="#0e2c36" letter-spacing="2">HELM · TELEMETRY</text>
        <text x="44" y="26" font-family="'JetBrains Mono',monospace" font-size="9" fill="#0e2c36" opacity="0.7">flybridge · nav + weather</text>
      </g>
    </g>

    <!-- 06 Shore power -->
    <g>
      <circle cx="300" cy="402" r="5" fill="#e88f3d" />
      <line x1="300" y1="402" x2="160" y2="518" stroke="#0e2c36" stroke-width="0.8" />
      <g transform="translate(60 516)">
        <rect width="28" height="28" rx="14" fill="#0e2c36" />
        <text x="14" y="19" font-family="'Outfit',sans-serif" font-size="12" font-weight="700" fill="#fbf6ec" text-anchor="middle">06</text>
        <text x="44" y="12" font-family="'Outfit',sans-serif" font-size="9" font-weight="700" fill="#0e2c36" letter-spacing="2">SHORE POWER</text>
        <text x="44" y="26" font-family="'JetBrains Mono',monospace" font-size="9" fill="#0e2c36" opacity="0.7">inlet · dockline telemetry</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
</script>

<style scoped>
.vessel-schematic {
  width: 100%;
  height: auto;
  display: block;
}
</style>
