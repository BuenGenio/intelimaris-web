<!--
  HomeAltView — "Bridge Deck" alternative home.
  Editorial maritime aesthetic: chart-paper ivory, teal-navy ink, amber-only alerts.
  Asymmetric grids, instrument-panel cues, four bespoke SVG visuals.
  Page is standalone (its own header + footer) so the cohesive theme is not fought by the main nav.
-->
<template>
  <div class="bridge-root">
    <div class="bridge-paper" aria-hidden="true" />
    <div class="bridge-grid" aria-hidden="true" />

    <header class="bridge-header">
      <div class="bridge-container bridge-header-inner">
        <RouterLink to="/" class="bridge-brand" aria-label="Back to InteliMaris home">
          <span class="bridge-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
              <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
              <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
            </svg>
          </span>
          <span class="bridge-brand-text">
            <span class="bridge-brand-name">InteliMaris</span>
            <span class="bridge-brand-sub">Bridge deck · design showcase</span>
          </span>
        </RouterLink>

        <nav class="bridge-nav" aria-label="Bridge page sections">
          <a href="#bearings">Bearings</a>
          <a href="#depths">Depths</a>
          <a href="#layers">Three layers</a>
          <a href="#schematic">Onboard</a>
          <a href="#signal">Signal room</a>
        </nav>

        <div class="bridge-header-actions">
          <RouterLink to="/" class="bridge-return">← Classic site</RouterLink>
          <a href="#contact" class="bridge-cta">
            Request demo
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </header>

    <main id="top" class="bridge-main">

      <!-- HERO · BEARINGS -->
      <section id="bearings" class="bridge-section bridge-hero">
        <div class="bridge-container">
          <div class="bridge-hero-grid">
            <div class="bridge-hero-text">
              <div class="bridge-coord" aria-hidden="true">
                <span>37°02′N</span>
                <span class="bridge-coord-dot">●</span>
                <span>23°14′E</span>
                <span class="bridge-coord-dot">●</span>
                <span>LOG 04.19</span>
              </div>

              <p class="bridge-kicker">Bridge deck edition</p>
              <h1 class="bridge-display">
                Chart the<br/>
                <em>unseen</em>.
              </h1>
              <p class="bridge-lede">
                A marine intelligence platform built with the gravity of an instrument, not the chrome of an app.
                InteliMaris turns vessel sensors, dockside gateways and cloud reasoning into a single, calm picture —
                so the first person who learns of a fire, a sinking or a runaway battery is the one who can stop it.
              </p>

              <div class="bridge-cta-row">
                <a href="#contact" class="bridge-btn bridge-btn-primary">
                  Speak with the bridge
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <a href="#layers" class="bridge-btn bridge-btn-ghost">Trace the three layers</a>
              </div>

              <dl class="bridge-hero-stats">
                <div v-for="s in heroStats" :key="s.label">
                  <dt>{{ s.label }}</dt>
                  <dd>{{ s.value }}<span v-if="s.unit">{{ s.unit }}</span></dd>
                </div>
              </dl>
            </div>

            <aside class="bridge-hero-instrument">
              <div class="bridge-plate">
                <div class="bridge-plate-head">
                  <span class="bridge-plate-tag">Bearing rose · live</span>
                  <span class="bridge-plate-dot" />
                </div>
                <BridgeCompass />
                <div class="bridge-plate-foot">
                  <div>
                    <span>Last fix</span>
                    <strong>18:04:12 UTC</strong>
                  </div>
                  <div>
                    <span>Source</span>
                    <strong>IM gateway · 04</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- DEPTHS · BATHYMETRY -->
      <section id="depths" class="bridge-section bridge-depths">
        <div class="bridge-container">
          <div class="bridge-depths-grid">
            <div class="bridge-depths-visual">
              <div class="bridge-chart-frame">
                <div class="bridge-chart-head">
                  <span>Chart 04-18 · Aegean pilotage</span>
                  <span class="bridge-chart-scale">1 : 25 000</span>
                </div>
                <BathymetryChart />
                <div class="bridge-chart-foot">
                  <span>Depth in metres · reduced to lowest astronomical tide</span>
                </div>
              </div>
            </div>

            <div class="bridge-depths-text">
              <p class="bridge-kicker">II — Depth is context</p>
              <h2 class="bridge-h2">The reading matters less than the reason behind it.</h2>
              <p class="bridge-body">
                An alarm without context is noise. The system reads a vessel the way a pilot reads a basin — by
                contour and pattern, by what is normal for this hull, this berth, this season. The further the signal
                is from baseline, the louder the response.
              </p>

              <ul class="bridge-pillars">
                <li v-for="p in depthPillars" :key="p.title">
                  <span class="bridge-pillar-no">{{ p.index }}</span>
                  <div>
                    <strong>{{ p.title }}</strong>
                    <p>{{ p.body }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- LAYERS · SONAR -->
      <section id="layers" class="bridge-section bridge-layers">
        <div class="bridge-container">
          <div class="bridge-layers-head">
            <p class="bridge-kicker">III — Three layers, one picture</p>
            <h2 class="bridge-h2">
              From the sensor on the hull<br/>to the hand on the radio.
            </h2>
          </div>

          <div class="bridge-layers-grid">
            <aside class="bridge-layers-sticky">
              <div class="bridge-scope-frame">
                <div class="bridge-scope-head">
                  <span>Scope · live sweep</span>
                  <span class="bridge-scope-dot" />
                </div>
                <SonarScope />
                <div class="bridge-scope-legend">
                  <div><span class="bridge-legend-amber" />Severity ranked</div>
                  <div><span class="bridge-legend-teal" />Ambient contact</div>
                  <div><span class="bridge-legend-dim" />Baseline noise</div>
                </div>
              </div>
            </aside>

            <div class="bridge-layer-cards">
              <article v-for="card in layers" :key="card.index" class="bridge-layer-card">
                <header>
                  <span class="bridge-layer-no">{{ card.index }}</span>
                  <div>
                    <span class="bridge-layer-role">{{ card.role }}</span>
                    <h3>{{ card.title }}</h3>
                  </div>
                </header>
                <p>{{ card.body }}</p>
                <ul>
                  <li v-for="d in card.details" :key="d">
                    <span aria-hidden="true">·</span>{{ d }}
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- SCHEMATIC · VESSEL -->
      <section id="schematic" class="bridge-section bridge-schematic">
        <div class="bridge-container">
          <div class="bridge-schematic-head">
            <div>
              <p class="bridge-kicker">IV — Onboard</p>
              <h2 class="bridge-h2">Six watchkeepers. One calm hull.</h2>
            </div>
            <p class="bridge-schematic-lede">
              Every InteliMaris deployment begins as a general arrangement drawing: sensors are placed where risk
              actually lives, not where it is convenient to install. The result is a boat that monitors itself the way
              a good skipper would — quietly, continuously, and with judgement.
            </p>
          </div>

          <div class="bridge-schematic-frame">
            <div class="bridge-schematic-head-strip">
              <span>Drawing · IM-GA-018 · Rev C</span>
              <span>Profile · port side · waterline datum</span>
            </div>
            <VesselSchematic />
          </div>

          <ol class="bridge-schematic-notes">
            <li v-for="n in schematicNotes" :key="n.no">
              <span class="bridge-note-no">{{ n.no }}</span>
              <div>
                <strong>{{ n.title }}</strong>
                <p>{{ n.body }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- SIGNAL ROOM · INSTRUMENT PANEL -->
      <section id="signal" class="bridge-section bridge-signal">
        <div class="bridge-container">
          <div class="bridge-signal-head">
            <p class="bridge-kicker bridge-kicker-dark">V — Signal room</p>
            <h2 class="bridge-h2 bridge-h2-light">When the owner is ashore,<br/>the marina is still aboard.</h2>
            <p class="bridge-signal-lede">
              Fires, sinkings, toxic fumes and thermal-runaway events rarely wait for the owner to be on deck. The shore
              side of the platform turns isolated onboard telemetry into real-time marina awareness with enough context
              for staff to act — not just react.
            </p>
          </div>

          <div class="bridge-signal-grid">
            <div class="bridge-gauge-row">
              <article v-for="g in gauges" :key="g.label" class="bridge-gauge">
                <header>
                  <span>{{ g.label }}</span>
                  <span :class="['bridge-gauge-dot', `is-${g.tone}`]" />
                </header>
                <div class="bridge-gauge-value">
                  <span class="bridge-gauge-number">{{ g.value }}</span>
                  <span v-if="g.unit" class="bridge-gauge-unit">{{ g.unit }}</span>
                </div>
                <p>{{ g.caption }}</p>
              </article>
            </div>

            <aside class="bridge-escalation">
              <span class="bridge-escalation-tag">Escalation path</span>
              <ol>
                <li v-for="(step, i) in escalation" :key="i">
                  <span class="bridge-escalation-no">{{ String(i + 1).padStart(2, '0') }}</span>
                  <p>{{ step }}</p>
                </li>
              </ol>
            </aside>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="bridge-section bridge-contact">
        <div class="bridge-container">
          <div class="bridge-contact-card">
            <div class="bridge-contact-text">
              <p class="bridge-kicker bridge-kicker-dark">VI — Make contact</p>
              <h2 class="bridge-h2 bridge-h2-light">
                One vessel,<br/>one basin,<br/>or an entire fleet.
              </h2>
              <p class="bridge-contact-lede">
                For owners, the conversation starts with onboard fit and risk priorities. For marinas and fleets, it
                starts with coverage strategy, escalation design, and the day a silent berth refuses to stay silent.
              </p>
              <div class="bridge-contact-pills">
                <span>Reply within 1 business day</span>
                <span>Single vessel to marina-scale</span>
                <span>Engineering on the call</span>
              </div>
            </div>

            <aside class="bridge-contact-panel">
              <ul>
                <li v-for="c in contactPoints" :key="c">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>
                  <p>{{ c }}</p>
                </li>
              </ul>
              <div class="bridge-contact-meta">
                <p>Website · <a href="https://intelimaris.com">intelimaris.com</a></p>
                <p>Email · <a href="mailto:info@intelimarine.com">info@intelimarine.com</a></p>
              </div>
              <a class="bridge-btn bridge-btn-light bridge-btn-block" href="mailto:info@intelimarine.com?subject=InteliMaris%20Consultation%20Request">
                Start the conversation
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </aside>
          </div>
        </div>
      </section>

      <footer class="bridge-foot">
        <div class="bridge-container bridge-foot-inner">
          <span>© {{ year }} InteliMaris · Bridge deck edition</span>
          <span class="bridge-foot-meta">Chart revision 04.19 · typeset in Outfit & JetBrains Mono</span>
          <RouterLink to="/">Return to classic site →</RouterLink>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BridgeCompass from '@/components/home-alt/BridgeCompass.vue'
import BathymetryChart from '@/components/home-alt/BathymetryChart.vue'
import SonarScope from '@/components/home-alt/SonarScope.vue'
import VesselSchematic from '@/components/home-alt/VesselSchematic.vue'

const year = computed(() => new Date().getFullYear())

const heroStats = [
  { label: 'Layers in the system', value: '3', unit: '' },
  { label: 'Escalation latency', value: '<60', unit: 's' },
  { label: 'Continuous visibility', value: '24/7', unit: '' },
  { label: 'Shared operational picture', value: '1', unit: '' },
]

const depthPillars = [
  {
    index: '01',
    title: 'Baseline, not threshold',
    body: 'Each vessel teaches the system what its normal looks like, so a lazy bilge pump on a 40-year-old trawler is read differently to the same reading on a new cat.',
  },
  {
    index: '02',
    title: 'Correlation before alert',
    body: 'Smoke on its own is uncertain. Smoke plus thermal rise plus a voltage sag is a fire. The platform waits until the picture is credible, then acts without hesitation.',
  },
  {
    index: '03',
    title: 'Evidence that survives the event',
    body: 'Every signal is time-stamped, versioned and replayable, so owners, marinas and insurers work from one record instead of three opinions.',
  },
]

const layers = [
  {
    index: '01',
    role: 'Onboard layer',
    title: 'InteliMaris sensors',
    body: 'Marine-grade onboard devices for smoke, CO, water ingress, battery health, vibration, climate and the utilities no one remembers until they fail.',
    details: ['IM101 — IM901 family', 'Provisioned in minutes', 'Built for harsh spaces'],
  },
  {
    index: '02',
    role: 'Shore layer',
    title: 'Gateway coverage',
    body: 'Onboard and dock-side gateways create redundant paths so telemetry keeps moving even when the weather, the grid, or the LTE tower does not.',
    details: ['Dock and berth coverage', 'Multi-path forwarding', 'Long-range resilience'],
  },
  {
    index: '03',
    role: 'Cloud layer',
    title: 'AI command layer',
    body: 'The cloud correlates signals across the fleet, learns vessel baselines, ranks severity and routes the right response to the right stakeholder — owner, marina, insurer or fleet manager.',
    details: ['Alert orchestration', 'Learned baselines', 'Automation-ready workflows'],
  },
]

const schematicNotes = [
  { no: '01', title: 'Smoke & CO · saloon', body: 'Dual photoelectric + electrochemical heads, cross-checked against cabin occupancy and HVAC state to suppress nuisance alarms.' },
  { no: '02', title: 'Thermal watch · engine room', body: 'Infrared and contact probes monitor exhaust manifold, alternator and shaft seal temperatures against learned underway and at-rest profiles.' },
  { no: '03', title: 'Bilge · water ingress', body: 'Redundant float and conductivity sensing distinguishes routine bilge cycling from a through-hull failure or shaft seal breach.' },
  { no: '04', title: 'Battery · BMS link', body: 'Pack voltage, cell delta, temperature rise and charge topology are watched for thermal-runaway precursors on lithium houses and starts.' },
  { no: '05', title: 'Helm telemetry', body: 'Flybridge unit aggregates nav, AIS, weather and deck sensors so the system knows whether the vessel is underway, moored or unattended.' },
  { no: '06', title: 'Shore-power inlet', body: 'Dockline intelligence detects reverse-polarity, ground fault, and under-voltage conditions at the inlet before they reach the panel.' },
]

const gauges = [
  { label: 'House bank', value: '13.2', unit: 'V', tone: 'ok', caption: 'Steady · 0.04 V drift over 4h' },
  { label: 'Bilge', value: 'Dry', unit: '', tone: 'ok', caption: 'Last cycle 06:12 · within baseline' },
  { label: 'Thermal', value: '43', unit: '°C', tone: 'watch', caption: 'Engine room · +6°C vs at-rest mean' },
  { label: 'Escalation', value: 'Armed', unit: '', tone: 'ok', caption: 'Dock office · linked · ACK 22s' },
]

const escalation = [
  'Onboard sensor records an anomaly — smoke, water ingress, voltage sag, CO, or thermal rise.',
  'The nearest gateway forwards the signal along its strongest path and buffers what the others cannot carry.',
  'The cloud ranks severity against this vessel\u2019s baseline and the pattern library from the fleet.',
  'Owner, marina desk and insurer receive aligned, time-sensitive instructions — not raw readings.',
]

const contactPoints = [
  'Demo path, hardware fit and rollout guidance for your operating environment.',
  'Catastrophic-event workflows aligned to owner, marina and fleet responsibilities.',
  'Architecture decisions framed around signal reliability, shared awareness and response time.',
]
</script>

<style scoped>
/* -------------------------------------------------------------
   Bridge deck palette — kept local so the main site theme is not
   perturbed. Type scale leans on Outfit (display) + Inter (body)
   + JetBrains Mono (instrument readouts, chart labels).
------------------------------------------------------------- */
.bridge-root {
  --paper: #f8f1e1;
  --paper-deep: #efe4cb;
  --ink: #0e2c36;
  --ink-soft: #3a5965;
  --ink-mute: #6b7f88;
  --teal: #124c5e;
  --teal-deep: #0a3442;
  --amber: #e88f3d;
  --amber-soft: #f4b582;
  --amber-deep: #a8521a;
  --line: rgba(14, 44, 54, 0.14);
  --line-strong: rgba(14, 44, 54, 0.3);
  --shadow-sm: 0 10px 30px rgba(11, 38, 47, 0.08);
  --shadow-md: 0 22px 60px rgba(11, 38, 47, 0.14);
  --shadow-lg: 0 36px 90px rgba(11, 38, 47, 0.22);
  --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --display: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
  --body: 'Inter', system-ui, -apple-system, sans-serif;

  position: relative;
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
}

.bridge-paper {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(1200px 900px at 15% -10%, rgba(255, 255, 255, 0.8), transparent 55%),
    radial-gradient(900px 700px at 120% 30%, rgba(18, 76, 94, 0.08), transparent 60%),
    linear-gradient(180deg, #f8f1e1 0%, #f0e5cc 100%);
  pointer-events: none;
  z-index: 0;
}

.bridge-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(14, 44, 54, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 44, 54, 0.035) 1px, transparent 1px);
  background-size: 64px 64px;
  pointer-events: none;
  z-index: 0;
}

.bridge-main {
  position: relative;
  z-index: 1;
}

.bridge-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 3vw, 2.5rem);
}

/* -------- Header -------- */
.bridge-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(14px);
  background: rgba(248, 241, 225, 0.82);
  border-bottom: 1px solid var(--line);
}

.bridge-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 0;
}

.bridge-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: var(--ink);
}

.bridge-brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: #fff;
  color: var(--teal);
  box-shadow: var(--shadow-sm);
}
.bridge-brand-mark svg { width: 20px; height: 20px; }

.bridge-brand-text { display: flex; flex-direction: column; line-height: 1; }
.bridge-brand-name {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}
.bridge-brand-sub {
  margin-top: 4px;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.bridge-nav {
  display: none;
  gap: 1.6rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
.bridge-nav a {
  color: var(--ink-soft);
  text-decoration: none;
  padding: 0.25rem 0;
  border-bottom: 1px solid transparent;
  transition: color 160ms ease, border-color 160ms ease;
}
.bridge-nav a:hover { color: var(--ink); border-color: var(--amber); }

.bridge-header-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}
.bridge-return {
  display: none;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-mute);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
}
.bridge-return:hover { color: var(--ink); }

.bridge-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  background: var(--ink);
  color: #fbf6ec;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.bridge-cta:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }

@media (min-width: 900px) {
  .bridge-nav { display: inline-flex; }
  .bridge-return { display: inline-flex; }
}

/* -------- Shared section -------- */
.bridge-section { padding: clamp(4rem, 9vw, 8rem) 0; position: relative; }
.bridge-kicker {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--teal);
  margin: 0 0 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.bridge-kicker::before {
  content: '';
  width: 22px;
  height: 1px;
  background: currentColor;
  opacity: 0.5;
}
.bridge-kicker-dark { color: var(--amber-soft); }

.bridge-h2 {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  margin: 0 0 1.4rem;
  color: var(--ink);
}
.bridge-h2-light { color: #fbf6ec; }

.bridge-body { font-size: 1.05rem; line-height: 1.7; color: var(--ink-soft); max-width: 60ch; }

/* -------- Hero · bearings -------- */
.bridge-hero { padding-top: clamp(3rem, 6vw, 5rem); padding-bottom: clamp(4rem, 7vw, 6rem); }
.bridge-hero-grid {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: start;
  grid-template-columns: 1fr;
}
@media (min-width: 1024px) {
  .bridge-hero-grid { grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr); }
}

.bridge-coord {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: inline-flex;
  gap: 0.7rem;
  align-items: center;
  margin-bottom: 1.75rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(4px);
}
.bridge-coord-dot { color: var(--amber); font-size: 0.6rem; }

.bridge-display {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(3.4rem, 8.5vw, 7rem);
  line-height: 0.88;
  letter-spacing: -0.05em;
  margin: 0 0 1.8rem;
  color: var(--ink);
}
.bridge-display em {
  font-style: italic;
  font-weight: 500;
  color: var(--teal);
  position: relative;
}
.bridge-display em::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0.15em;
  height: 0.09em;
  background: var(--amber);
  opacity: 0.7;
}

.bridge-lede {
  font-size: clamp(1.1rem, 1.4vw, 1.28rem);
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 52ch;
  margin: 0 0 2.25rem;
}

.bridge-cta-row { display: flex; flex-wrap: wrap; gap: 0.9rem; margin-bottom: 2.5rem; }

.bridge-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.6rem;
  border-radius: 999px;
  font-family: var(--display);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, color 200ms ease;
  border: 1px solid transparent;
}
.bridge-btn-primary { background: var(--ink); color: #fbf6ec; box-shadow: 0 20px 50px rgba(14, 44, 54, 0.22); }
.bridge-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 24px 60px rgba(14, 44, 54, 0.3); }
.bridge-btn-ghost { background: transparent; color: var(--ink); border-color: var(--line-strong); }
.bridge-btn-ghost:hover { background: rgba(255, 255, 255, 0.55); }
.bridge-btn-light { background: #fbf6ec; color: var(--ink); }
.bridge-btn-light:hover { background: #fff; }
.bridge-btn-block { display: flex; width: 100%; justify-content: center; margin-top: 1.5rem; }

.bridge-hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin: 0;
}
@media (min-width: 700px) { .bridge-hero-stats { grid-template-columns: repeat(4, 1fr); } }
.bridge-hero-stats > div {
  padding: 1.1rem 1.2rem;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
}
.bridge-hero-stats dt {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-bottom: 0.5rem;
}
.bridge-hero-stats dd {
  margin: 0;
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.9rem;
  letter-spacing: -0.03em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.bridge-hero-stats dd span {
  font-size: 0.9rem;
  color: var(--ink-mute);
  margin-left: 0.15em;
  font-weight: 500;
}

/* instrument plate */
.bridge-plate {
  background: #fbf6ec;
  border: 1px solid var(--line-strong);
  border-radius: 26px;
  padding: 1.25rem 1.25rem 1rem;
  box-shadow: var(--shadow-md);
  position: relative;
}
.bridge-plate::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px dashed var(--line);
  border-radius: 20px;
  pointer-events: none;
}
.bridge-plate-head,
.bridge-plate-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-mute);
  padding: 0.25rem 0.4rem 0.9rem;
}
.bridge-plate-foot { padding: 1rem 0.4rem 0.25rem; gap: 1rem; border-top: 1px dashed var(--line); }
.bridge-plate-foot > div { display: flex; flex-direction: column; gap: 0.3rem; }
.bridge-plate-foot strong { color: var(--ink); font-weight: 600; font-size: 0.75rem; }
.bridge-plate-tag { display: inline-flex; align-items: center; gap: 0.5rem; }
.bridge-plate-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 0 4px rgba(232, 143, 61, 0.16); animation: bridge-pulse 2s ease-in-out infinite; }

@keyframes bridge-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

/* -------- Depths · bathymetry -------- */
.bridge-depths {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
}
.bridge-depths-grid {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: center;
}
@media (min-width: 1024px) {
  .bridge-depths-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); }
}

.bridge-chart-frame {
  background: #fbf6ec;
  border: 1px solid var(--line-strong);
  border-radius: 20px;
  padding: 0.9rem;
  box-shadow: var(--shadow-md);
  position: relative;
}
.bridge-chart-head,
.bridge-chart-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink-mute);
  padding: 0.6rem 0.75rem;
}
.bridge-chart-head { border-bottom: 1px dashed var(--line); }
.bridge-chart-foot { border-top: 1px dashed var(--line); }
.bridge-chart-scale { color: var(--ink); }

.bridge-pillars {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  gap: 1rem;
}
.bridge-pillars li {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 1.1rem;
  padding: 1.3rem 1.3rem;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.7);
}
.bridge-pillar-no {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--teal);
  letter-spacing: -0.02em;
}
.bridge-pillars strong {
  display: block;
  font-family: var(--display);
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.3rem;
}
.bridge-pillars p {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

/* -------- Layers · sonar + cards -------- */
.bridge-layers-head { max-width: 900px; margin: 0 0 3rem; }
.bridge-layers-grid {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
}
@media (min-width: 1024px) {
  .bridge-layers-grid { grid-template-columns: minmax(340px, 0.85fr) minmax(0, 1fr); align-items: start; }
  .bridge-layers-sticky { position: sticky; top: 110px; }
}

.bridge-scope-frame {
  background: #0b2428;
  border: 1px solid rgba(156, 224, 208, 0.18);
  border-radius: 28px;
  padding: 1.25rem;
  box-shadow: 0 36px 90px rgba(7, 28, 28, 0.35);
  color: #9ce0d0;
}
.bridge-scope-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  padding: 0.25rem 0.4rem 0.9rem;
  opacity: 0.85;
}
.bridge-scope-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 12px var(--amber); animation: bridge-pulse 1.6s ease-in-out infinite; }
.bridge-scope-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0.4rem 0.25rem;
  border-top: 1px dashed rgba(156, 224, 208, 0.2);
  margin-top: 0.75rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.bridge-scope-legend > div { display: inline-flex; align-items: center; gap: 0.5rem; }
.bridge-legend-amber, .bridge-legend-teal, .bridge-legend-dim {
  display: inline-block;
  width: 10px; height: 10px; border-radius: 50%;
}
.bridge-legend-amber { background: var(--amber); }
.bridge-legend-teal { background: #9ce0d0; }
.bridge-legend-dim { background: rgba(156, 224, 208, 0.35); }

.bridge-layer-cards { display: grid; gap: 1rem; }
.bridge-layer-card {
  background: #fbf6ec;
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  padding: clamp(1.5rem, 2.5vw, 2rem);
  box-shadow: var(--shadow-sm);
  transition: transform 220ms ease, box-shadow 220ms ease;
}
.bridge-layer-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.bridge-layer-card header {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 0.9rem;
}
.bridge-layer-no {
  font-family: var(--display);
  font-weight: 800;
  font-size: 2.4rem;
  color: var(--teal);
  letter-spacing: -0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.bridge-layer-role {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--amber-deep);
  margin-bottom: 0.4rem;
}
.bridge-layer-card h3 {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(1.4rem, 2vw, 1.75rem);
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--ink);
}
.bridge-layer-card p {
  color: var(--ink-soft);
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.65;
}
.bridge-layer-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal-deep);
}
.bridge-layer-card li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border: 1px dashed var(--line-strong);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
}
.bridge-layer-card li span { color: var(--amber); }

/* -------- Schematic -------- */
.bridge-schematic-head {
  display: grid;
  gap: 2rem;
  align-items: end;
  margin-bottom: 2.5rem;
}
@media (min-width: 900px) { .bridge-schematic-head { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); } }
.bridge-schematic-lede {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
  max-width: 56ch;
}

.bridge-schematic-frame {
  background: #fbf6ec;
  border: 1px solid var(--line-strong);
  border-radius: 22px;
  padding: 0.9rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2.5rem;
}
.bridge-schematic-head-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink-mute);
  padding: 0.5rem 0.8rem 1rem;
  border-bottom: 1px dashed var(--line);
}

.bridge-schematic-notes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}
@media (min-width: 700px) { .bridge-schematic-notes { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .bridge-schematic-notes { grid-template-columns: repeat(3, 1fr); } }

.bridge-schematic-notes li {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 1rem;
  padding: 1.2rem;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.7);
}
.bridge-note-no {
  font-family: var(--display);
  font-weight: 700;
  color: var(--teal);
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}
.bridge-schematic-notes strong {
  display: block;
  font-family: var(--display);
  font-weight: 700;
  color: var(--ink);
  font-size: 1rem;
  letter-spacing: -0.01em;
  margin-bottom: 0.3rem;
}
.bridge-schematic-notes p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

/* -------- Signal room -------- */
.bridge-signal {
  background: linear-gradient(180deg, #0a2730 0%, #0e3744 60%, #103f4e 100%);
  color: #fbf6ec;
  padding-top: clamp(5rem, 9vw, 8rem);
  padding-bottom: clamp(5rem, 9vw, 8rem);
  position: relative;
  overflow: hidden;
}
.bridge-signal::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(800px 400px at 20% 0%, rgba(156, 224, 208, 0.12), transparent 60%),
    radial-gradient(700px 500px at 90% 100%, rgba(232, 143, 61, 0.12), transparent 60%);
  pointer-events: none;
}
.bridge-signal > * { position: relative; }
.bridge-signal-head { max-width: 820px; margin: 0 0 3rem; }
.bridge-signal-lede { font-size: 1.1rem; line-height: 1.7; color: rgba(251, 246, 236, 0.78); margin: 1.2rem 0 0; }

.bridge-signal-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}
@media (min-width: 1024px) { .bridge-signal-grid { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: start; } }

.bridge-gauge-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 700px) { .bridge-gauge-row { grid-template-columns: repeat(4, 1fr); } }

.bridge-gauge {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(251, 246, 236, 0.12);
  border-radius: 20px;
  padding: 1.2rem;
  backdrop-filter: blur(10px);
}
.bridge-gauge header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(251, 246, 236, 0.6);
  margin-bottom: 1rem;
}
.bridge-gauge-dot { width: 8px; height: 8px; border-radius: 50%; background: #9ce0d0; }
.bridge-gauge-dot.is-ok { background: #9ce0d0; box-shadow: 0 0 8px rgba(156, 224, 208, 0.6); }
.bridge-gauge-dot.is-watch { background: var(--amber); box-shadow: 0 0 10px rgba(232, 143, 61, 0.6); }
.bridge-gauge-value { display: flex; align-items: baseline; gap: 0.3rem; margin-bottom: 0.75rem; }
.bridge-gauge-number {
  font-family: var(--display);
  font-weight: 700;
  font-size: 2.4rem;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: #fbf6ec;
}
.bridge-gauge-unit {
  font-family: var(--mono);
  font-size: 0.85rem;
  color: rgba(251, 246, 236, 0.6);
}
.bridge-gauge p {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: rgba(251, 246, 236, 0.55);
  line-height: 1.5;
}

.bridge-escalation {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(251, 246, 236, 0.12);
  border-radius: 22px;
  padding: 1.5rem;
}
.bridge-escalation-tag {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--amber-soft);
  margin-bottom: 1rem;
}
.bridge-escalation ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}
.bridge-escalation li {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(251, 246, 236, 0.08);
  border-radius: 14px;
}
.bridge-escalation-no {
  font-family: var(--mono);
  font-weight: 700;
  color: var(--amber-soft);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}
.bridge-escalation p { margin: 0; font-size: 0.94rem; line-height: 1.6; color: rgba(251, 246, 236, 0.82); }

/* -------- Contact -------- */
.bridge-contact-card {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
  background: linear-gradient(135deg, #082833 0%, #0d3642 55%, #13424c 100%);
  color: #fbf6ec;
  border-radius: 28px;
  padding: clamp(2rem, 4vw, 3.5rem);
  box-shadow: 0 40px 100px rgba(12, 36, 46, 0.22);
  border: 1px solid rgba(251, 246, 236, 0.1);
}
@media (min-width: 1024px) { .bridge-contact-card { grid-template-columns: minmax(0, 1fr) 380px; } }

.bridge-contact-lede { font-size: 1.08rem; line-height: 1.7; color: rgba(251, 246, 236, 0.78); margin: 1.2rem 0 1.5rem; max-width: 52ch; }

.bridge-contact-pills { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.bridge-contact-pills span {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(251, 246, 236, 0.78);
  padding: 0.5rem 0.9rem;
  border: 1px solid rgba(251, 246, 236, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
}

.bridge-contact-panel {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(251, 246, 236, 0.12);
  border-radius: 22px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}
.bridge-contact-panel ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem;
  display: grid;
  gap: 0.9rem;
}
.bridge-contact-panel li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 0.7rem;
  align-items: start;
  color: rgba(251, 246, 236, 0.88);
  font-size: 0.92rem;
  line-height: 1.6;
}
.bridge-contact-panel svg { color: var(--amber-soft); margin-top: 2px; }
.bridge-contact-panel p { margin: 0; }

.bridge-contact-meta {
  border-top: 1px dashed rgba(251, 246, 236, 0.14);
  padding-top: 1rem;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: rgba(251, 246, 236, 0.75);
  display: grid;
  gap: 0.4rem;
}
.bridge-contact-meta a { color: #fbf6ec; text-decoration: underline; text-underline-offset: 3px; }

/* -------- Footer -------- */
.bridge-foot {
  border-top: 1px solid var(--line);
  background: rgba(248, 241, 225, 0.85);
  padding: 2rem 0;
  margin-top: 2rem;
}
.bridge-foot-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.bridge-foot-inner a { color: var(--ink); text-decoration: none; }
.bridge-foot-inner a:hover { color: var(--amber-deep); }
.bridge-foot-meta { opacity: 0.75; }
</style>
