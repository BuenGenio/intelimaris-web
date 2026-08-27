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
            <img :src="logoSrc" alt="InteliMaris" width="364" height="50" />
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
            <a class="ww-btn ww-btn-primary" href="#">
              <svg
                class="ww-btn-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396"
                />
              </svg>
              Download App
            </a>
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
              <img
                class="ww-phone-shot"
                :src="appShotSrc"
                alt="WaterWayz app showing the IDS screen with live forward, stern, port and starboard camera awareness"
                width="720"
                height="1442"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="ww-section">
        <div class="ww-section-head">
          <div>
            <p class="ww-eyebrow">What the app does</p>
            <h2 class="ww-section-title">
              Eight things WaterWayz does on the water.
            </h2>
          </div>
          <p class="ww-section-note">
            Every one of them reads from the same platform data, and every value carries its
            source and its age.
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
            <h3 class="ww-feature-title ww-feature-pillar">{{ feature.title }}</h3>
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

const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`
const appShotSrc = `${import.meta.env.BASE_URL}assets/waterwayz-app.jpg`

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
  | 'users'
  | 'calendar-check'

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
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'calendar-check':
    '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
}

const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'route',
    title: 'Navigate',
    text: 'Plan a passage end to end and see what the water is doing along it: tide and depth under the keel, bridge clearances against your air draft, and the schedules those bridges open on. Change your departure and every step re-times, because the tide moves both numbers.',
  },
  {
    icon: 'radio-tower',
    title: 'Monitor',
    text: 'Live readings from the InteliMARIS unit on your vessel, every channel with its age on it, twenty-four hours of history behind it, and predictive insights where the platform has them.',
  },
  {
    icon: 'compass',
    title: 'Discover',
    text: 'Marinas, fuel, yards, provisioning and events near you or anywhere on the chart. Each listing shows where its facts came from, so you know what you are trusting.',
  },
  {
    icon: 'users',
    title: 'Connect',
    text: 'Crews, feed and messages built on shared workspaces. Invite by email or an eight-character join code, and everyone sees the same vessel, the same passage, the same alerts.',
  },
  {
    icon: 'map-pinned',
    title: 'Report',
    text: 'Report a hazard or a depth sounding in one tap. Reports go up as Reported, gain weight as others confirm them, and expire on their own if nobody sees them again.',
  },
  {
    icon: 'zap',
    title: 'Assist',
    text: 'Every alert arrives with a reason and a suggested action, never a bare number. Where the platform can help further it answers from live data: your vessel, your route, the reports around you.',
  },
  {
    icon: 'calendar-check',
    title: 'Book',
    text: 'Search transient berths by position and dates, see honest availability before you request, and book instantly where a host allows it. A confirmed stay cannot be double-booked.',
  },
  {
    icon: 'anchor',
    title: 'Dock',
    text: 'IDS, the Intelligent Docking System, reads the berth as you come in: forward, stern, port and starboard views with distances to pilings and dock edges, and one clear suggested action.',
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
  gap: 0.55rem;
  border-radius: 9999px;
  padding: 1.1rem 2.1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
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
  background: #ffffff;
}

.ww-phone-shot {
  display: block;
  width: 100%;
  height: auto;
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

.ww-feature-pillar {
  font-size: 1.05rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
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
