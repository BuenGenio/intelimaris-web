<!--
  Design philosophy for this page: North Atlantic Signal Room.
  Use asymmetric editorial layout, chart-room labels, calm marine tones,
  premium operational panels, and restrained alert amber accents.
  Every section should feel like marine intelligence infrastructure,
  not a generic startup landing page.
-->
<template>
  <div class="home-alt-root min-h-screen bg-background text-foreground">
    <header class="sticky top-0 z-50 border-b border-white/40 bg-[rgba(244,249,251,0.82)] backdrop-blur-xl">
      <div class="container flex items-center justify-between gap-6 py-4">
        <a href="#top" class="flex items-center">
          <img :src="logoSrc" alt="InteliMaris" class="h-12 w-auto" />
        </a>

        <nav class="hidden items-center gap-8 text-[0.82rem] font-medium tracking-[0.16em] text-slate-600 uppercase lg:flex">
          <a href="#layers" class="transition-colors hover:text-slate-950">Three layers</a>
          <a href="#marina" class="transition-colors hover:text-slate-950">Marinas</a>
          <a href="#capabilities" class="transition-colors hover:text-slate-950">Capabilities</a>
          <a href="#stakeholders" class="transition-colors hover:text-slate-950">Stakeholders</a>
          <a href="#contact" class="transition-colors hover:text-slate-950">Contact</a>
        </nav>

        <a
          href="#contact"
          class="inline-flex items-center gap-2 rounded-full border border-[rgba(18,76,94,0.15)] bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_16px_30px_rgba(14,40,52,0.08)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          Request demo
          <Icon name="arrow-right" class="h-4 w-4" />
        </a>
      </div>
    </header>

    <main id="top">
      <section class="hero-shell relative overflow-hidden border-b border-[rgba(17,64,78,0.08)]">
        <div class="hero-chart absolute inset-0 opacity-70" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_34%),linear-gradient(180deg,rgba(242,248,250,0.45),rgba(242,248,250,0.82))]" />

        <div class="container relative py-16 sm:py-20 lg:py-24">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:items-start">
            <div class="max-w-3xl">
              <div class="mb-8 flex flex-wrap items-center gap-3">
                <span class="signal-pill">Marine intelligence ecosystem</span>
                <span class="signal-pill signal-pill-muted">Owners + marinas + fleets + insurers</span>
              </div>

              <p class="section-kicker">The intelligence layer for the world's waters</p>
              <h1 class="max-w-4xl font-display text-[clamp(3.2rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.05em] text-slate-950">
                Less brochure. <br /> More command center.
              </h1>
              <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                InteliMaris connects vessel sensors, marina gateways, and cloud intelligence into one operational picture,
                so serious events are detected, classified, and escalated before they become disasters.
              </p>

              <div class="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  class="inline-flex items-center gap-2 rounded-full bg-[var(--brand-deep)] px-7 py-4 text-sm font-semibold tracking-[0.14em] uppercase text-white shadow-[0_24px_60px_rgba(15,70,85,0.22)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Speak with the team
                  <Icon name="arrow-right" class="h-4 w-4" />
                </a>
                <a
                  href="#layers"
                  class="inline-flex items-center gap-2 rounded-full border border-[rgba(17,64,78,0.16)] px-6 py-3 text-sm font-semibold tracking-[0.14em] uppercase text-slate-900 transition-colors hover:bg-white/70"
                >
                  See the three layers
                </a>
              </div>

              <div class="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                <div
                  v-for="item in proofItems.slice(0, 3)"
                  :key="item.label"
                  class="rounded-[1.65rem] border border-white/70 bg-white/72 p-5 shadow-[0_18px_50px_rgba(24,52,62,0.08)] backdrop-blur-sm"
                >
                  <div class="font-display text-4xl tracking-[-0.04em] text-[var(--brand-deep)]">{{ item.metric }}</div>
                  <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.label }}</p>
                </div>
              </div>
            </div>

            <div class="lg:pt-6">
              <div class="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 shadow-[0_40px_90px_rgba(16,42,55,0.24)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663573693411/MK2bu4wr22Z3DBC6uiA6SB/intelimaris-hero-command-room-4LuxJfwVKAx7nUaakpXQgU.webp"
                  alt="InteliMaris command-style marine intelligence visual"
                  class="h-[580px] w-full object-cover object-center"
                />
                <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,22,29,0.18),rgba(6,22,29,0.62))]" />

                <div class="absolute inset-x-5 top-5 rounded-[1.5rem] border border-white/10 bg-[rgba(7,20,25,0.46)] px-4 py-3 text-[0.72rem] font-medium tracking-[0.22em] text-slate-200 uppercase backdrop-blur-md sm:inset-x-6 sm:px-5">
                  Live system state · vessel to dock escalation path
                </div>

                <div class="absolute inset-x-5 bottom-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:inset-x-6 lg:bottom-6">
                  <div
                    v-for="(item, index) in heroTelemetry"
                    :key="item.name"
                    :class="[
                      'rounded-[1.4rem] border p-4 backdrop-blur-md',
                      index === 3
                        ? 'border-[rgba(232,143,61,0.32)] bg-[rgba(71,38,19,0.55)]'
                        : 'border-white/10 bg-[rgba(8,24,31,0.58)]',
                    ]"
                  >
                    <p class="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-300 uppercase">{{ item.name }}</p>
                    <div class="mt-2 flex items-end justify-between gap-3">
                      <span class="font-display text-3xl tracking-[-0.04em] text-white">{{ item.value }}</span>
                      <span class="text-xs text-slate-300">{{ item.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layers" class="relative py-20 lg:py-28">
        <div class="container">
          <div class="grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div>
              <p class="section-kicker">Three names. One safety net.</p>
              <h2 class="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-slate-950">
                From deck hardware to marina response.
              </h2>
              <p class="mt-6 max-w-sm text-base leading-7 text-slate-600">
                The system becomes more credible when the architecture is visible. Instead of generic feature blocks, the
                story is told as an operational chain with clear responsibilities at each layer.
              </p>
            </div>

            <div class="space-y-5">
              <article
                v-for="card in layerCards"
                :key="card.title"
                class="group grid gap-6 rounded-[2rem] border border-[rgba(16,58,74,0.1)] bg-white px-6 py-6 shadow-[0_24px_60px_rgba(16,42,55,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(16,42,55,0.1)] sm:px-7 lg:grid-cols-[120px_minmax(0,1fr)_260px] lg:items-start"
              >
                <div class="flex h-24 w-24 items-end rounded-[1.5rem] border border-[rgba(16,58,74,0.12)] bg-[linear-gradient(180deg,#edf7f8,#d7ebee)] px-5 py-4 font-display text-4xl tracking-[-0.05em] text-[var(--brand-deep)]">
                  {{ card.index }}
                </div>
                <div>
                  <h3 class="font-display text-3xl tracking-[-0.04em] text-slate-950">{{ card.title }}</h3>
                  <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">{{ card.copy }}</p>
                </div>
                <ul class="space-y-3 rounded-[1.5rem] border border-dashed border-[rgba(16,58,74,0.16)] bg-[rgba(238,247,248,0.7)] p-5 text-sm leading-6 text-slate-700">
                  <li v-for="detail in card.details" :key="detail" class="flex items-start gap-3">
                    <span class="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--alert)]" />
                    <span>{{ detail }}</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="marina" class="relative overflow-hidden py-20 text-white lg:py-28">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663573693411/MK2bu4wr22Z3DBC6uiA6SB/intelimaris-network-marina-NAjdmHm4Peoyib4QfbnaDe.webp"
          alt="Aerial marina network visualization showing vessel-to-shore connectivity"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,28,0.93),rgba(6,21,28,0.7)_48%,rgba(7,23,30,0.83))]" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_25%)]" />

        <div class="container relative">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)] lg:items-end">
            <div class="max-w-3xl">
              <p class="section-kicker text-white/70">InteliMarina</p>
              <h2 class="mt-5 font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.94] tracking-[-0.05em]">
                When the owner is away, the marina is still in the loop.
              </h2>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                Fires, sinkings, toxic fumes, and thermal-runaway events rarely wait for the owner to be aboard. The shore-side
                layer turns isolated onboard telemetry into real-time marina awareness with the context staff need to act.
              </p>
            </div>

            <div class="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <p class="text-[0.72rem] font-semibold tracking-[0.22em] text-white/70 uppercase">Escalation path</p>
              <div class="mt-5 space-y-4">
                <div v-for="(step, index) in escalationSteps" :key="step" class="flex gap-4 rounded-[1.25rem] border border-white/10 bg-black/12 p-4">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(232,143,61,0.16)] font-semibold text-[var(--alert)]">
                    {{ index + 1 }}
                  </div>
                  <p class="text-sm leading-6 text-white/80">{{ step }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" class="relative overflow-hidden py-20 lg:py-28">
        <div class="absolute inset-0 opacity-60">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663573693411/MK2bu4wr22Z3DBC6uiA6SB/intelimaris-chart-texture-HLZb7w5PsxeMWu2VLUCy8h.webp"
            alt="Abstract nautical chart texture"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,249,251,0.92),rgba(244,249,251,0.98))]" />

        <div class="container relative">
          <div class="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
            <div>
              <p class="section-kicker">Protection that thinks like a crewmate</p>
              <h2 class="mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.05em] text-slate-950">
                A stronger brand narrative starts by showing how decisions are made.
              </h2>
              <div class="mt-10 space-y-4">
                <div
                  v-for="row in capabilityRows"
                  :key="row.label"
                  class="grid gap-4 rounded-[1.75rem] border border-[rgba(16,58,74,0.1)] bg-white/86 px-5 py-5 shadow-[0_16px_45px_rgba(16,42,55,0.06)] sm:grid-cols-[220px_minmax(0,1fr)] sm:px-6"
                >
                  <p class="text-sm font-semibold tracking-[0.16em] text-[var(--brand-deep)] uppercase">{{ row.label }}</p>
                  <p class="text-base leading-7 text-slate-600">{{ row.text }}</p>
                </div>
              </div>
            </div>

            <aside class="rounded-[2rem] border border-[rgba(16,58,74,0.12)] bg-[linear-gradient(180deg,rgba(12,43,55,0.98),rgba(8,28,36,0.96))] p-7 text-white shadow-[0_36px_90px_rgba(12,36,46,0.24)]">
              <p class="text-[0.72rem] font-semibold tracking-[0.22em] text-white/60 uppercase">Command lens</p>
              <h3 class="mt-4 font-display text-4xl leading-none tracking-[-0.05em]">What the site should now communicate</h3>
              <div class="mt-8 space-y-4">
                <div
                  v-for="item in commandLensItems"
                  :key="item.text"
                  class="flex items-start gap-4 rounded-[1.25rem] border border-white/8 bg-white/6 p-4"
                >
                  <div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Icon :name="item.icon" class="h-5 w-5 text-[var(--alert-soft)]" />
                  </div>
                  <p class="text-sm leading-6 text-white/78">{{ item.text }}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="stakeholders" class="py-20 lg:py-28">
        <div class="container">
          <div class="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-center">
            <div class="relative overflow-hidden rounded-[2rem] border border-[rgba(16,58,74,0.12)] shadow-[0_30px_90px_rgba(16,42,55,0.16)]">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663573693411/MK2bu4wr22Z3DBC6uiA6SB/intelimaris-stakeholder-operations-9TfThuMgfbTtHc7qucoKcb.webp"
                alt="Marine stakeholders using shared operational intelligence"
                class="h-full min-h-[520px] w-full object-cover"
              />
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,32,41,0.08),rgba(11,32,41,0.42))]" />
            </div>

            <div>
              <p class="section-kicker">Built for multiple maritime stakeholders</p>
              <h2 class="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-slate-950">
                Four audiences. One telemetry truth.
              </h2>
              <p class="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                The existing site says many smart things. The redesign makes those relationships visible, so each audience can
                instantly understand where it fits inside the ecosystem and why the platform has enterprise gravity.
              </p>

              <div class="mt-8 grid gap-4 sm:grid-cols-2">
                <article
                  v-for="card in stakeholderCards"
                  :key="card.title"
                  class="rounded-[1.6rem] border border-[rgba(16,58,74,0.1)] bg-white p-5 shadow-[0_18px_50px_rgba(16,42,55,0.05)]"
                >
                  <p class="text-[0.75rem] font-semibold tracking-[0.2em] text-[var(--brand-deep)] uppercase">{{ card.title }}</p>
                  <p class="mt-3 text-base leading-7 text-slate-700">{{ card.summary }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-y border-[rgba(16,58,74,0.08)] bg-[linear-gradient(180deg,rgba(237,246,248,0.85),rgba(244,249,251,0.98))] py-16">
        <div class="container">
          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="item in proofItems"
              :key="item.label"
              class="rounded-[1.75rem] border border-white/80 bg-white/88 p-6 shadow-[0_18px_60px_rgba(16,42,55,0.06)]"
            >
              <div class="font-display text-5xl tracking-[-0.05em] text-slate-950">{{ item.metric }}</div>
              <p class="mt-3 text-sm leading-6 text-slate-600">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="py-20 lg:py-28">
        <div class="container">
          <div class="grid gap-8 rounded-[2.2rem] border border-[rgba(16,58,74,0.12)] bg-[linear-gradient(135deg,#082833,#0d3642_55%,#13424c)] p-7 text-white shadow-[0_36px_100px_rgba(12,36,46,0.18)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:p-12">
            <div>
              <p class="section-kicker text-white/65">Commercial contact</p>
              <h2 class="mt-5 max-w-2xl font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.05em]">
                Ready to protect a vessel, a basin, or an entire fleet?
              </h2>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                For owners, the conversation starts with onboard fit and risk priorities. For marinas and fleets, it starts with
                coverage strategy, escalation design, and operational visibility.
              </p>
              <div class="mt-8 flex flex-wrap gap-3 text-sm text-white/75">
                <span class="signal-pill-dark">Commercial follow-up in 1 business day</span>
                <span class="signal-pill-dark">Single vessel to marina-scale deployments</span>
              </div>
            </div>

            <div class="rounded-[1.9rem] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
              <div class="space-y-4 text-sm leading-7 text-white/82">
                <div class="flex items-start gap-3">
                  <Icon name="cpu" class="mt-1 h-5 w-5 text-[var(--alert-soft)]" />
                  <p>Demo path, hardware fit, and rollout guidance for the right operating environment.</p>
                </div>
                <div class="flex items-start gap-3">
                  <Icon name="siren" class="mt-1 h-5 w-5 text-[var(--alert-soft)]" />
                  <p>Catastrophic-event workflows aligned to owner, marina, and fleet escalation responsibilities.</p>
                </div>
                <div class="flex items-start gap-3">
                  <Icon name="waypoints" class="mt-1 h-5 w-5 text-[var(--alert-soft)]" />
                  <p>Architecture decisions framed around signal reliability, shared awareness, and rapid response.</p>
                </div>
              </div>

              <div class="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm leading-7 text-white/88">
                <p>
                  Website: <a class="text-white underline decoration-white/30 underline-offset-4" href="https://intelimaris.com">intelimaris.com</a>
                </p>
                <p>
                  Email: <a class="text-white underline decoration-white/30 underline-offset-4" href="mailto:info@intelimarine.com">info@intelimarine.com</a>
                </p>
              </div>

              <div class="mt-8">
                <a
                  href="mailto:info@intelimarine.com?subject=InteliMaris%20Consultation%20Request"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-[0.14em] uppercase text-slate-950 transition-colors hover:bg-white/95"
                >
                  Start the conversation
                  <Icon name="arrow-right" class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, type FunctionalComponent } from 'vue'
import homeAltCss from '@/assets/home-alt.css?inline'

const logoSrc = `${import.meta.env.BASE_URL}assets/logo.svg`

const themeVars = `
:root {
  --brand-deep: #124c5e;
  --brand-ink: #0f172a;
  --alert: #e88f3d;
  --alert-soft: #f4b582;
  --background: #f4f9fb;
  --foreground: #0f172a;
  --border: rgba(16, 58, 74, 0.12);
  --input: rgba(16, 58, 74, 0.12);
  --ring: rgba(18, 76, 94, 0.35);
  --radius: 1.25rem;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;
  --primary: #124c5e;
  --primary-foreground: #ffffff;
  --secondary: rgba(16, 58, 74, 0.08);
  --secondary-foreground: #0f172a;
  --muted: rgba(16, 58, 74, 0.05);
  --muted-foreground: #475569;
  --accent: rgba(16, 58, 74, 0.08);
  --accent-foreground: #0f172a;
  --destructive: #dc2626;
  --sidebar: #ffffff;
  --sidebar-foreground: #0f172a;
  --sidebar-border: rgba(16, 58, 74, 0.12);
  --sidebar-ring: rgba(18, 76, 94, 0.35);
}
`

const STYLE_ID = 'home-alt-css'

function injectCss(css: string) {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = themeVars + css
}

function removeCss() {
  document.getElementById(STYLE_ID)?.remove()
}

onMounted(() => injectCss(homeAltCss))
onBeforeUnmount(() => removeCss())

if (import.meta.hot) {
  import.meta.hot.accept('@/assets/home-alt.css?inline', (mod) => {
    const next = (mod as { default?: string } | undefined)?.default
    if (next) injectCss(next)
  })
}

type IconName =
  | 'arrow-right'
  | 'bell-ring'
  | 'binary'
  | 'cpu'
  | 'gauge'
  | 'radar'
  | 'shield-check'
  | 'siren'
  | 'waves'
  | 'waypoints'

const iconPaths: Record<IconName, string> = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'bell-ring':
    '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/>',
  binary:
    '<rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/>',
  cpu:
    '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  radar:
    '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 17.24 17.04"/><path d="M9 9h.01"/><path d="M14.85 11.15A2 2 0 1 1 11.15 12.85"/>',
  'shield-check':
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  siren:
    '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/>',
  waves:
    '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  waypoints:
    '<circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/>',
}

const Icon: FunctionalComponent<{ name: IconName; class?: string }> = (props) =>
  h('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    class: props.class,
    innerHTML: iconPaths[props.name],
  })

const layerCards = [
  {
    index: '01',
    title: 'InteliMaris sensors',
    copy:
      'Marine-grade onboard devices for smoke, CO, water ingress, battery health, vibration, climate, and critical utilities.',
    details: ['IM101–IM901 family', 'Provisioned in minutes', 'Built for harsh spaces'],
  },
  {
    index: '02',
    title: 'Gateway coverage',
    copy:
      'Onboard and dock-side gateways create redundant paths so telemetry keeps moving even when conditions change.',
    details: ['Dock and berth coverage', 'Multi-path forwarding', 'Long-range resilience'],
  },
  {
    index: '03',
    title: 'AI command layer',
    copy:
      'The cloud layer correlates signals, learns vessel baselines, ranks severity, and routes the right response to the right stakeholder.',
    details: ['Alert orchestration', 'Learned baselines', 'Automation-ready workflows'],
  },
]

const capabilityRows = [
  {
    label: 'Critical event triage',
    text:
      'Distinguish nuisance noise from real danger using vessel-specific patterns across power, bilge, thermal, and environmental data.',
  },
  {
    label: 'Marina escalation',
    text:
      'Notify control-center staff the moment a fire, sinking, toxic-gas, or thermal-runaway scenario becomes credible.',
  },
  {
    label: 'Automated protection',
    text:
      'Trigger battery isolation, pump routines, and rule-based notifications with audit-friendly operational context.',
  },
  {
    label: 'Shared truth',
    text:
      'Owners, fleets, marinas, and insurers work from the same telemetry stream rather than fragmented reports and delayed phone calls.',
  },
]

const stakeholderCards = [
  { title: 'Owners', summary: "Know your vessel's real condition without guessing from disconnected alarms." },
  { title: 'Marinas', summary: 'Turn hidden berth-side incidents into fast, documented response actions.' },
  { title: 'Fleets', summary: 'Standardize oversight across multiple vessels with one operational language.' },
  { title: 'Insurers', summary: 'Assess risk and validate incidents with time-stamped evidence instead of assumptions.' },
]

const proofItems = [
  { metric: '24/7', label: 'visibility across vessel and marina layers' },
  { metric: '3', label: 'interconnected layers from deck to dock' },
  { metric: '<60s', label: 'to route a severe event to the right audience' },
  { metric: '1', label: 'shared operational picture across all stakeholders' },
]

const heroTelemetry = [
  { name: 'Battery', value: '13.2V', status: 'Healthy' },
  { name: 'Bilge', value: 'Dry', status: 'Normal' },
  { name: 'Thermal', value: 'Stable', status: 'Nominal' },
  { name: 'Escalation', value: 'Ready', status: 'Dock office linked' },
]

const escalationSteps = [
  'Smoke, CO, water ingress, or battery anomaly is detected onboard.',
  'Nearby gateway coverage preserves transmission and forwards context.',
  'AI ranks severity and confirms whether the pattern is operationally credible.',
  'Owner and dock office receive aligned, time-sensitive instructions.',
]

const commandLensItems: Array<{ icon: IconName; text: string }> = [
  { icon: 'radar', text: 'This is infrastructure, not a gadget.' },
  { icon: 'bell-ring', text: 'Alerts are ranked, not merely forwarded.' },
  { icon: 'shield-check', text: 'Marina safety is a shared operating model.' },
  { icon: 'gauge', text: 'Telemetry becomes action with context.' },
  { icon: 'waypoints', text: 'Deck, dock, and cloud belong to one system.' },
  { icon: 'binary', text: 'Operational credibility matters more than visual flash.' },
]
</script>
