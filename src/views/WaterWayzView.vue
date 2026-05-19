<template>
  <main class="ww-page">
    <div class="ww-bg" aria-hidden="true" />
    <div class="ww-bg-waves" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          v-for="(d, i) in bgWaves"
          :key="i"
          :d="d"
          fill="none"
          stroke="#0b62c8"
          stroke-width="1"
          opacity="0.24"
        />
      </svg>
    </div>

    <div class="ww-shell">
      <!-- Hero -->
      <section class="ww-hero">
        <div class="ww-hero-copy">
          <div class="ww-brand fade-in">
            <img :src="logoSrc" alt="WaterWayz" width="240" height="50" />
          </div>

          <div class="ww-badge fade-in" :style="{ transitionDelay: '0.04s' }">
            <svg
              class="ww-ic ww-ic-sm"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              v-html="icons.compass"
            />
            <span>Community-powered navigation for the water</span>
          </div>

          <h1 class="ww-hero-title fade-in" :style="{ transitionDelay: '0.08s' }">
            The smarter way to navigate every waterway.
          </h1>

          <p class="ww-hero-lead fade-in" :style="{ transitionDelay: '0.16s' }">
            WaterWayz is a real-time marine navigation app that helps boaters route around
            hazards, shallow water, no-wake zones, dock congestion, bridges, weather, and local
            reports. Built as part of the InteliMarine ecosystem, it turns connected vessels and
            marinas into a living map of the water.
          </p>

          <div class="ww-cta-row fade-in" :style="{ transitionDelay: '0.24s' }">
            <button type="button" class="ww-btn ww-btn-primary">Request Early Access</button>
            <button type="button" class="ww-btn ww-btn-ghost">View Demo Route</button>
          </div>

          <div class="ww-stats fade-in" :style="{ transitionDelay: '0.32s' }">
            <div v-for="s in stats" :key="s.top" class="ww-stat">
              <p class="ww-stat-top">{{ s.top }}</p>
              <p class="ww-stat-bottom">{{ s.bottom }}</p>
            </div>
          </div>
        </div>

        <!-- Phone mockup -->
        <div class="ww-phone fade-in">
          <div class="ww-phone-glow" aria-hidden="true" />
          <div class="ww-phone-frame">
            <div class="ww-phone-screen">
              <div class="ww-phone-statusbar">
                <span>9:41</span>
                <span class="ww-phone-lte">LTE</span>
              </div>
              <div class="ww-phone-routehead">
                <div>
                  <p class="ww-phone-eyebrow">WaterWayz</p>
                  <h3 class="ww-phone-route">Route to Marina Bay</h3>
                </div>
                <div class="ww-phone-navbtn">
                  <svg
                    class="ww-ic ww-ic-md"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="icons.navigation"
                  />
                </div>
              </div>

              <div class="ww-phone-map">
                <svg viewBox="0 0 360 390" class="ww-phone-mapsvg">
                  <defs>
                    <linearGradient id="ww-water" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stop-color="#062348" />
                      <stop offset="0.55" stop-color="#031225" />
                      <stop offset="1" stop-color="#020815" />
                    </linearGradient>
                    <filter id="ww-glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <rect width="360" height="390" fill="url(#ww-water)" />
                  <path
                    v-for="(d, i) in phoneWaves"
                    :key="i"
                    :d="d"
                    fill="none"
                    stroke="#0c4d8c"
                    stroke-width="1"
                    opacity="0.35"
                  />
                  <path
                    d="M 65 315 C 110 270, 105 218, 168 190 C 219 166, 225 110, 292 73"
                    fill="none"
                    stroke="#1d4ed8"
                    stroke-width="18"
                    opacity="0.2"
                  />
                  <path
                    d="M 65 315 C 110 270, 105 218, 168 190 C 219 166, 225 110, 292 73"
                    fill="none"
                    stroke="#1188ff"
                    stroke-width="6"
                    stroke-linecap="round"
                    filter="url(#ww-glow)"
                  />
                  <circle cx="65" cy="315" r="11" fill="#16a34a" stroke="white" stroke-width="3" />
                  <circle cx="292" cy="73" r="11" fill="#ef4444" stroke="white" stroke-width="3" />
                  <circle cx="178" cy="185" r="8" fill="#fbbf24" stroke="white" stroke-width="2" />
                  <circle cx="238" cy="130" r="8" fill="#f97316" stroke="white" stroke-width="2" />
                  <path d="M 20 65 L 82 38 L 118 88 L 55 126 Z" fill="#0f172a" opacity="0.8" stroke="#1e40af" />
                  <path d="M 245 315 L 325 277 L 356 330 L 291 374 Z" fill="#0f172a" opacity="0.8" stroke="#1e40af" />
                  <text x="42" y="85" fill="#93c5fd" font-size="11">Marina</text>
                  <text x="250" y="336" fill="#93c5fd" font-size="11">No Wake</text>
                </svg>

                <div class="ww-phone-eta">
                  <div>
                    <p class="ww-phone-eta-label">ETA</p>
                    <p class="ww-phone-eta-value">24 min</p>
                  </div>
                  <div>
                    <p class="ww-phone-eta-label">Distance</p>
                    <p class="ww-phone-eta-value">7.8 NM</p>
                  </div>
                  <div>
                    <p class="ww-phone-eta-label">Hazards</p>
                    <p class="ww-phone-eta-value ww-amber">2</p>
                  </div>
                </div>

                <div class="ww-phone-alerts">
                  <div
                    v-for="(alert, index) in alerts.slice(0, 2)"
                    :key="alert"
                    class="ww-phone-alert"
                  >
                    <div class="ww-phone-alert-icon" :class="index === 0 ? 'ww-tone-amber' : 'ww-tone-blue'">
                      <svg
                        class="ww-ic ww-ic-sm"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        v-html="index === 0 ? icons.waves : icons.wind"
                      />
                    </div>
                    <p>{{ alert }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="ww-section">
        <div class="ww-section-head">
          <div>
            <p class="ww-eyebrow">Navigation intelligence</p>
            <h2 class="ww-section-title">
              Built for captains, crews, marinas, and weekend boaters.
            </h2>
          </div>
          <p class="ww-section-note">
            A clean, friendly interface with the intelligence of the InteliMarine stack behind it.
          </p>
        </div>

        <div class="ww-feature-grid">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="ww-card ww-feature fade-in"
            :style="{ transitionDelay: index * 0.08 + 's' }"
          >
            <div class="ww-feature-icon">
              <svg
                class="ww-ic"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="icons[feature.icon]"
              />
            </div>
            <h3 class="ww-feature-title">{{ feature.title }}</h3>
            <p class="ww-feature-text">{{ feature.text }}</p>
          </div>
        </div>
      </section>

      <!-- Live alerts + route preview -->
      <section id="alerts" class="ww-section ww-alerts">
        <div class="ww-card ww-alerts-card fade-in">
          <div class="ww-alerts-glow" aria-hidden="true" />
          <div class="ww-alerts-inner">
            <p class="ww-eyebrow">Live waterway reports</p>
            <h2 class="ww-alerts-title">Know what is ahead before it becomes a problem.</h2>
            <p class="ww-alerts-desc">
              Reports can come from boaters, marinas, commercial operators, weather sources, and
              connected InteliMarine systems.
            </p>
            <div class="ww-alert-list">
              <div v-for="(alert, index) in alerts" :key="alert" class="ww-alert-row">
                <div class="ww-alert-icon">
                  <svg
                    class="ww-ic ww-ic-md"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="index % 2 === 0 ? icons['map-pinned'] : icons.bell"
                  />
                </div>
                <p>{{ alert }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="ww-card ww-route fade-in">
          <div class="ww-route-head">
            <div class="ww-route-head-icon">
              <svg
                class="ww-ic ww-ic-lg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="icons.sailboat"
              />
            </div>
            <div>
              <p class="ww-eyebrow">Route preview</p>
              <h3 class="ww-route-title">Miami River to Biscayne Bay</h3>
            </div>
          </div>

          <div class="ww-route-stats">
            <div v-for="stat in routeStats" :key="stat.label" class="ww-route-stat">
              <p class="ww-route-stat-label">{{ stat.label }}</p>
              <p class="ww-route-stat-value">{{ stat.value }}</p>
            </div>
          </div>

          <div class="ww-route-list">
            <div class="ww-route-step ww-route-step--start">
              <div class="ww-route-step-left">
                <span class="ww-dot ww-dot-green" />
                <span>Start: Home Marina</span>
              </div>
              <span class="ww-route-step-dist ww-route-step-dist--accent">0.0 NM</span>
            </div>
            <div v-for="step in routeSteps" :key="step.name" class="ww-route-step">
              <div class="ww-route-step-left">
                <span class="ww-dot" :class="dotClass(step.tone)" />
                <span>{{ step.name }}</span>
              </div>
              <span class="ww-route-step-dist">{{ step.dist }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Ecosystem -->
      <section id="ecosystem" class="ww-section">
        <div class="ww-eco fade-in">
          <div class="ww-eco-grid">
            <div class="ww-eco-copy">
              <p class="ww-eyebrow">InteliMarine ecosystem</p>
              <h2 class="ww-section-title">
                More than a map. A connected marine intelligence layer.
              </h2>
              <p class="ww-eco-desc">
                WaterWayz becomes more powerful when connected to InteliMARIS sensors, InteliBilge
                events, marina networks, and the InteliMarine AI Stack.
              </p>
            </div>
            <div class="ww-eco-cards">
              <div v-for="item in ecosystem" :key="item.label" class="ww-eco-card">
                <div class="ww-eco-card-icon">
                  <svg
                    class="ww-ic ww-ic-md"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="icons[item.icon]"
                  />
                </div>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Closing CTA -->
      <section class="ww-final fade-in">
        <div class="ww-final-icon">
          <svg
            class="ww-ic ww-ic-xl"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="icons.smartphone"
          />
        </div>
        <h2 class="ww-final-title">Ready to make every route smarter?</h2>
        <p class="ww-final-lead">
          Launch WaterWayz as the friendly marine navigation companion for modern boaters,
          marinas, and connected InteliMarine vessels.
        </p>
        <div class="ww-cta-row ww-cta-center">
          <button type="button" class="ww-btn ww-btn-primary">Join the WaterWayz Beta</button>
          <button type="button" class="ww-btn ww-btn-ghost">Partner with WaterWayz</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFadeIn } from '@/composables/useFadeIn'

useFadeIn('.ww-page')

const logoSrc = `${import.meta.env.BASE_URL}assets/waterwayz-logo.png`

type IconName =
  | 'route'
  | 'bell'
  | 'radio-tower'
  | 'shield-check'
  | 'compass'
  | 'navigation'
  | 'waves'
  | 'wind'
  | 'map-pinned'
  | 'sailboat'
  | 'zap'
  | 'anchor'
  | 'smartphone'

/* Inline SVG icon paths (Lucide), replacing the lucide-react dependency. */
const icons: Record<IconName, string> = {
  route:
    '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  bell:
    '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8a6 6 0 0 0-12 0c0 4.499-1.411 5.956-2.738 7.326"/>',
  'radio-tower':
    '<path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"/><path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"/><circle cx="12" cy="9" r="2"/><path d="M16.2 4.8c2 2 2.26 5.11 .8 7.47"/><path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"/><path d="M9.5 18h5"/><path d="m8 22 4-11 4 11"/>',
  'shield-check':
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  compass:
    '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  waves:
    '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  wind:
    '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 1.79 4.25H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
  'map-pinned':
    '<path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/>',
  sailboat:
    '<path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="M21 14 10 2 3 14h18Z"/><path d="M10 2v16"/>',
  zap:
    '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  anchor:
    '<path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>',
  smartphone:
    '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
}

const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'route',
    title: 'Smart Marine Routing',
    text: 'Plan safer routes around shoals, no-wake zones, bridges, fuel stops, marina entrances, weather, and live local reports.',
  },
  {
    icon: 'bell',
    title: 'Real-Time Boater Alerts',
    text: 'Get instant warnings for hazards, debris, shallow water, closed channels, speed zones, rough conditions, and dock congestion.',
  },
  {
    icon: 'radio-tower',
    title: 'Community-Powered Updates',
    text: 'Captains, marinas, and connected InteliMarine devices contribute live intelligence to improve every trip.',
  },
  {
    icon: 'shield-check',
    title: 'Vessel-Aware Navigation',
    text: 'Routes can account for draft, beam, bridge clearance, fuel range, preferred speed, home marina, and restricted zones.',
  },
]

const alerts = [
  'Floating debris reported ahead',
  'No-wake zone begins in 0.4 NM',
  'Bridge opening delay: 18 min',
  'Shallow water near starboard marker',
]

const ecosystem: { label: string; icon: IconName }[] = [
  { label: 'InteliMarine AI Stack', icon: 'zap' },
  { label: 'InteliMARIS Sensors', icon: 'shield-check' },
  { label: 'InteliBilge Alerts', icon: 'waves' },
  { label: 'Marina Intelligence', icon: 'anchor' },
]

const stats = [
  { top: 'Live', bottom: 'Hazards' },
  { top: 'Smart', bottom: 'Routing' },
  { top: 'Marina', bottom: 'Reports' },
  { top: 'AI', bottom: 'Insights' },
]

const routeStats = [
  { label: 'ETA', value: '42 min' },
  { label: 'Distance', value: '11.4 NM' },
  { label: 'Fuel', value: 'Optimized' },
]

const routeSteps: { name: string; dist: string; tone: 'blue' | 'amber' | 'green' }[] = [
  { name: 'Idle speed zone', dist: '0.8 NM', tone: 'blue' },
  { name: 'Reported debris', dist: '4.1 NM', tone: 'amber' },
  { name: 'Bridge clearance check', dist: '6.9 NM', tone: 'blue' },
  { name: 'Destination', dist: '11.4 NM', tone: 'green' },
]

const dotClass = (tone: 'blue' | 'amber' | 'green') =>
  tone === 'amber' ? 'ww-dot-amber' : tone === 'green' ? 'ww-dot-green' : 'ww-dot-blue'

const phoneWaves = Array.from(
  { length: 13 },
  (_, i) =>
    `M -30 ${40 + i * 28} C 70 ${15 + i * 32}, 128 ${70 + i * 16}, 230 ${38 + i * 30} S 390 ${50 + i * 27}, 420 ${25 + i * 22}`,
)

const bgWaves = Array.from(
  { length: 18 },
  (_, i) =>
    `M-100 ${120 + i * 48} C 260 ${55 + i * 54}, 420 ${190 + i * 22}, 780 ${125 + i * 45} S 1220 ${170 + i * 33}, 1540 ${110 + i * 50}`,
)
</script>

<style scoped>
.ww-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding-top: 5rem;
  background: #020817;
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

/* Background layers */
.ww-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at top left, rgba(13, 102, 255, 0.2), transparent 35%),
    radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.2), transparent 30%),
    linear-gradient(180deg, #020817 0%, #061326 46%, #020817 100%);
}

.ww-bg-waves {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  pointer-events: none;
}

.ww-bg-waves svg {
  width: 100%;
  height: 100%;
}

.ww-shell {
  position: relative;
  z-index: 1;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Shared icon sizing */
.ww-ic {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
}

.ww-ic-sm {
  width: 1rem;
  height: 1rem;
}

.ww-ic-md {
  width: 1.25rem;
  height: 1.25rem;
}

.ww-ic-lg {
  width: 1.75rem;
  height: 1.75rem;
}

.ww-ic-xl {
  width: 2rem;
  height: 2rem;
}

/* Cards */
.ww-card {
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 25px 50px -12px rgba(23, 37, 84, 0.45);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 1.5rem;
}

/* Buttons */
.ww-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 1.1rem 2.1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.ww-btn:active {
  transform: translateY(1px);
}

.ww-btn-primary {
  background: #2563eb;
  box-shadow: 0 18px 38px -12px rgba(37, 99, 235, 0.55);
}

.ww-btn-primary:hover {
  background: #3b82f6;
}

.ww-btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.ww-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

.ww-eyebrow {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: #93c5fd;
}

/* Hero */
.ww-hero {
  display: grid;
  gap: 3.5rem;
  align-items: center;
  padding: 2.5rem 0 5rem;
}

.ww-brand {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.75rem;
  padding: 0.55rem 0.95rem;
  border-radius: 0.9rem;
  background: #ffffff;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.4) inset,
    0 18px 38px -16px rgba(13, 102, 255, 0.55);
}

.ww-brand img {
  display: block;
  height: 40px;
  width: auto;
}

.ww-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(147, 197, 253, 0.2);
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.875rem;
  color: #dbeafe;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.ww-hero-title {
  max-width: 48rem;
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: #fff;
}

.ww-hero-lead {
  margin: 1.5rem 0 0;
  max-width: 42rem;
  font-size: 1.125rem;
  line-height: 1.78;
  color: rgba(255, 255, 255, 0.72);
}

.ww-cta-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
}

.ww-cta-center {
  justify-content: center;
}

.ww-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 2.5rem;
  max-width: 42rem;
}

.ww-stat {
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.ww-stat-top {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #93c5fd;
}

.ww-stat-bottom {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Phone mockup */
.ww-phone {
  position: relative;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

.ww-phone-glow {
  position: absolute;
  inset: -1.5rem;
  border-radius: 3rem;
  background: rgba(59, 130, 246, 0.2);
  filter: blur(48px);
}

.ww-phone-frame {
  position: relative;
  border-radius: 2.6rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #020617;
  padding: 0.75rem;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);
}

.ww-phone-screen {
  overflow: hidden;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #061225;
}

.ww-phone-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.ww-phone-lte {
  letter-spacing: 0.2em;
}

.ww-phone-routehead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem 1rem;
}

.ww-phone-eyebrow {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #93c5fd;
}

.ww-phone-route {
  margin: 0.15rem 0 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.ww-phone-navbtn {
  display: flex;
  border-radius: 9999px;
  background: #3b82f6;
  padding: 0.5rem;
  box-shadow: 0 10px 22px -6px rgba(59, 130, 246, 0.6);
}

.ww-phone-map {
  position: relative;
  height: 390px;
  overflow: hidden;
  background: #041225;
}

.ww-phone-mapsvg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.ww-phone-eta {
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: 1px solid rgba(147, 197, 253, 0.2);
  background: rgba(2, 6, 23, 0.75);
  padding: 0.75rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.ww-phone-eta p {
  margin: 0;
}

.ww-phone-eta-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.ww-phone-eta-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.ww-phone-eta-value.ww-amber {
  color: #fcd34d;
}

.ww-phone-alerts {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ww-phone-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(2, 6, 23, 0.8);
  padding: 0.75rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.ww-phone-alert p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

.ww-phone-alert-icon {
  display: flex;
  border-radius: 9999px;
  padding: 0.5rem;
}

.ww-tone-amber {
  background: rgba(251, 191, 36, 0.2);
  color: #fcd34d;
}

.ww-tone-blue {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

/* Sections */
.ww-section {
  padding: 3.75rem 0;
}

.ww-section-head {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.ww-section-title {
  margin: 0.75rem 0 0;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
}

.ww-section-note {
  max-width: 36rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
}

/* Features */
.ww-feature-grid {
  display: grid;
  gap: 1.25rem;
}

.ww-feature {
  height: 100%;
}

.ww-feature-icon {
  display: inline-flex;
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  background: rgba(59, 130, 246, 0.15);
  padding: 0.75rem;
  color: #93c5fd;
}

.ww-feature-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.ww-feature-text {
  margin: 0.75rem 0 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
}

/* Live alerts + route preview */
.ww-alerts {
  display: grid;
  gap: 1.5rem;
}

.ww-alerts-card {
  position: relative;
  overflow: hidden;
}

.ww-alerts-glow {
  position: absolute;
  right: -3rem;
  top: -3rem;
  height: 12rem;
  width: 12rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.2);
  filter: blur(48px);
}

.ww-alerts-inner {
  position: relative;
}

.ww-alerts-title {
  margin: 1rem 0 0;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
}

.ww-alerts-desc {
  margin: 1rem 0 0;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
}

.ww-alert-list {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ww-alert-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(2, 6, 23, 0.5);
  padding: 1rem;
}

.ww-alert-row p {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
}

.ww-alert-icon {
  display: flex;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.15);
  padding: 0.5rem;
  color: #93c5fd;
}

/* Route preview */
.ww-route-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ww-route-head-icon {
  display: flex;
  border-radius: 1rem;
  background: rgba(59, 130, 246, 0.15);
  padding: 0.75rem;
  color: #93c5fd;
}

.ww-route-title {
  margin: 0.2rem 0 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}

.ww-route-stats {
  margin-top: 1.5rem;
  display: grid;
  gap: 1rem;
}

.ww-route-stat {
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem;
}

.ww-route-stat-label {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.ww-route-stat-value {
  margin: 0.25rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.ww-route-list {
  margin-top: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #061225;
  padding: 1.25rem;
}

.ww-route-step {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ww-route-step:last-child {
  border-bottom: 0;
}

.ww-route-step--start {
  padding-top: 0;
}

.ww-route-step-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.75);
}

.ww-dot {
  flex-shrink: 0;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 9999px;
}

.ww-dot-blue {
  background: #60a5fa;
}

.ww-dot-amber {
  background: #fcd34d;
}

.ww-dot-green {
  background: #34d399;
}

.ww-route-step-dist {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
}

.ww-route-step-dist--accent {
  color: #93c5fd;
}

/* Ecosystem */
.ww-eco {
  border-radius: 2rem;
  border: 1px solid rgba(147, 197, 253, 0.2);
  background: rgba(37, 99, 235, 0.1);
  box-shadow: 0 25px 50px -12px rgba(23, 37, 84, 0.45);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 2rem;
}

.ww-eco-grid {
  display: grid;
  gap: 2rem;
}

.ww-eco-desc {
  margin: 1.25rem 0 0;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
}

.ww-eco-cards {
  display: grid;
  gap: 1rem;
}

.ww-eco-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(2, 6, 23, 0.4);
  padding: 1.25rem;
}

.ww-eco-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 1rem;
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

.ww-eco-card span {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

/* Closing CTA */
.ww-final {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2.5rem 0 6rem;
  text-align: center;
}

.ww-final-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  height: 4rem;
  width: 4rem;
  border-radius: 1.5rem;
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  box-shadow: 0 18px 40px -16px rgba(59, 130, 246, 0.6);
}

.ww-final-title {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #fff;
}

.ww-final-lead {
  margin: 1.25rem auto 0;
  max-width: 42rem;
  font-size: 1.125rem;
  line-height: 1.78;
  color: rgba(255, 255, 255, 0.65);
}

.ww-final .ww-cta-row {
  margin-top: 2rem;
}

/* Responsive */
@media (min-width: 640px) {
  .ww-cta-row {
    flex-direction: row;
  }

  .ww-stats {
    grid-template-columns: repeat(4, 1fr);
  }

  .ww-eco-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .ww-hero-title {
    font-size: 4.25rem;
  }

  .ww-section-head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .ww-section-title {
    font-size: 3rem;
  }

  .ww-alerts-title {
    font-size: 2.25rem;
  }

  .ww-feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .ww-route-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .ww-eco {
    padding: 2.5rem;
  }

  .ww-final-title {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .ww-shell {
    padding: 0 2rem;
  }

  .ww-hero {
    grid-template-columns: 1.08fr 0.92fr;
    padding: 2.5rem 0 7rem;
  }

  .ww-feature-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .ww-alerts {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .ww-eco-grid {
    grid-template-columns: 0.8fr 1.2fr;
    align-items: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ww-phone-frame,
  .ww-btn {
    transition: none;
  }
}
</style>
