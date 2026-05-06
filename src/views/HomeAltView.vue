<!--
  Design philosophy for this page: North Atlantic Signal Room.
  Use asymmetric editorial layout, chart-room labels, calm marine tones,
  premium operational panels, and restrained alert amber accents.
  Every section should feel like marine intelligence infrastructure,
  not a generic startup landing page.
-->
<template>
  <div class="home-alt-root min-h-screen bg-background text-foreground">
    <header class="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div class="container flex items-center justify-between gap-6 py-4">
        <a href="#top" class="flex items-center">
          <img :src="logoSrc" alt="InteliMaris" class="h-12 w-auto" />
        </a>

        <nav class="hidden items-center gap-8 text-[0.82rem] font-medium tracking-[0.16em] text-muted-foreground uppercase lg:flex">
          <a href="#layers" class="transition-colors hover:text-foreground">{{ t('homeAlt.nav.layers') }}</a>
          <a href="#marina" class="transition-colors hover:text-foreground">{{ t('homeAlt.nav.marinas') }}</a>
          <a href="#capabilities" class="transition-colors hover:text-foreground">{{ t('homeAlt.nav.capabilities') }}</a>
          <a href="#stakeholders" class="transition-colors hover:text-foreground">{{ t('homeAlt.nav.stakeholders') }}</a>
          <RouterLink to="/products" class="transition-colors hover:text-foreground">{{ t('homeAlt.nav.products') }}</RouterLink>
          <a href="#contact" class="transition-colors hover:text-foreground">{{ t('homeAlt.nav.contact') }}</a>
        </nav>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-colors hover:border-[var(--brand-deep)] hover:text-foreground sm:flex"
            :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4" aria-hidden="true">
              <circle cx="12" cy="12" r="5" stroke-width="2" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div class="relative" data-lang-picker>
            <button
              type="button"
              class="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-colors hover:border-[var(--brand-deep)]"
              :aria-expanded="isLangOpen"
              aria-haspopup="true"
              aria-label="Select language"
              @click="toggleLang"
            >
              <img :src="languageData[currentLanguage].flag" :alt="languageData[currentLanguage].code" class="h-4 w-4 rounded-full object-cover" />
              <span class="text-xs tracking-[0.16em] uppercase">{{ languageData[currentLanguage].code }}</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" class="opacity-60">
                <path d="M3 5L6 8L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div
              v-if="isLangOpen"
              class="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
            >
              <button
                v-for="lang in languages"
                :key="lang"
                type="button"
                class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-muted"
                :class="{ 'bg-muted font-semibold text-foreground': currentLanguage === lang }"
                @click="selectLanguage(lang)"
              >
                <img :src="languageData[lang].flag" :alt="languageData[lang].code" class="h-4 w-4 rounded-full object-cover" />
                <span>{{ languageData[lang].name }}</span>
              </button>
            </div>
          </div>

          <a
            href="#contact"
            class="hidden items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-[0_16px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            {{ t('homeAlt.nav.requestDemo') }}
            <Icon name="arrow-right" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>

    <main id="top">
      <section class="hero-shell relative overflow-hidden border-b border-border">
        <div class="hero-chart absolute inset-0 opacity-70" />
        <div class="absolute inset-0" :style="{ background: 'var(--hero-overlay)' }" />

        <div class="container relative py-16 sm:py-20 lg:py-24">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:items-start">
            <div class="max-w-3xl">
              <div class="mb-8 flex flex-wrap items-center gap-3">
                <span class="signal-pill">{{ t('homeAlt.hero.pill1') }}</span>
                <span class="signal-pill signal-pill-muted">{{ t('homeAlt.hero.pill2') }}</span>
              </div>

              <p class="section-kicker">{{ t('homeAlt.hero.kicker') }}</p>
              <h1 class="max-w-4xl font-display text-[clamp(3.2rem,8vw,6.4rem)] leading-[0.92] tracking-[-0.05em] text-foreground">
                {{ t('homeAlt.hero.titleLine1') }} <br /> {{ t('homeAlt.hero.titleLine2') }}
              </h1>
              <p class="mt-7 max-w-2xl text-lg leading-8 text-foreground/80 sm:text-xl">
                {{ t('homeAlt.hero.copy') }}
              </p>

              <div class="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  class="inline-flex items-center gap-2 rounded-full bg-[var(--brand-deep)] px-7 py-4 text-sm font-semibold tracking-[0.14em] uppercase text-[var(--primary-foreground)] shadow-[0_24px_60px_rgba(15,70,85,0.22)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {{ t('homeAlt.hero.ctaPrimary') }}
                  <Icon name="arrow-right" class="h-4 w-4" />
                </a>
                <a
                  href="#layers"
                  class="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold tracking-[0.14em] uppercase text-foreground transition-colors hover:bg-card/70"
                >
                  {{ t('homeAlt.hero.ctaSecondary') }}
                </a>
              </div>

              <div class="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                <div
                  v-for="item in proofItems.slice(0, 3)"
                  :key="item.label"
                  class="rounded-[1.65rem] border border-border/60 bg-card/75 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm"
                >
                  <div class="font-display text-4xl tracking-[-0.04em] text-[var(--brand-deep)]">{{ item.metric }}</div>
                  <p class="mt-2 text-sm leading-6 text-muted-foreground">{{ item.label }}</p>
                </div>
              </div>
            </div>

            <div class="lg:pt-6">
              <div class="relative overflow-hidden rounded-[2rem] border border-border/60 bg-slate-950 shadow-[0_40px_90px_rgba(0,0,0,0.3)]">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663573693411/MK2bu4wr22Z3DBC6uiA6SB/intelimaris-hero-command-room-4LuxJfwVKAx7nUaakpXQgU.webp"
                  alt="InteliMaris command-style marine intelligence visual"
                  class="h-[580px] w-full object-cover object-center"
                />
                <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,22,29,0.18),rgba(6,22,29,0.62))]" />

                <div class="absolute inset-x-5 top-5 rounded-[1.5rem] border border-white/10 bg-[rgba(7,20,25,0.46)] px-4 py-3 text-[0.72rem] font-medium tracking-[0.22em] text-slate-200 uppercase backdrop-blur-md sm:inset-x-6 sm:px-5">
                  {{ t('homeAlt.hero.liveState') }}
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
              <p class="section-kicker">{{ t('homeAlt.layers.kicker') }}</p>
              <h2 class="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-foreground">
                {{ t('homeAlt.layers.title') }}
              </h2>
              <p class="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
                {{ t('homeAlt.layers.copy') }}
              </p>
            </div>

            <div class="space-y-5">
              <article
                v-for="card in layerCards"
                :key="card.title"
                class="group grid gap-6 rounded-[2rem] border border-border bg-card px-6 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] sm:px-7 lg:grid-cols-[120px_minmax(0,1fr)_260px] lg:items-start"
              >
                <div
                  class="flex h-24 w-24 items-end rounded-[1.5rem] border border-border px-5 py-4 font-display text-4xl tracking-[-0.05em] text-[var(--brand-deep)]"
                  :style="{ background: 'var(--layer-index-bg)' }"
                >
                  {{ card.index }}
                </div>
                <div>
                  <h3 class="font-display text-3xl tracking-[-0.04em] text-foreground">{{ card.title }}</h3>
                  <p class="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{{ card.copy }}</p>
                </div>
                <ul class="space-y-3 rounded-[1.5rem] border border-dashed border-border bg-muted p-5 text-sm leading-6 text-foreground/85">
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
              <p class="section-kicker text-white/70">{{ t('homeAlt.marina.kicker') }}</p>
              <h2 class="mt-5 font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.94] tracking-[-0.05em]">
                {{ t('homeAlt.marina.title') }}
              </h2>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                {{ t('homeAlt.marina.copy') }}
              </p>
            </div>

            <div class="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <p class="text-[0.72rem] font-semibold tracking-[0.22em] text-white/70 uppercase">{{ t('homeAlt.marina.escalationLabel') }}</p>
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
        <div class="absolute inset-0" :style="{ background: 'var(--capabilities-overlay)' }" />

        <div class="container relative">
          <div class="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
            <div>
              <p class="section-kicker">{{ t('homeAlt.capabilities.kicker') }}</p>
              <h2 class="mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.05em] text-foreground">
                {{ t('homeAlt.capabilities.title') }}
              </h2>
              <div class="mt-10 space-y-4">
                <div
                  v-for="row in capabilityRows"
                  :key="row.label"
                  class="grid gap-4 rounded-[1.75rem] border border-border bg-card/85 px-5 py-5 shadow-[0_16px_45px_rgba(0,0,0,0.06)] sm:grid-cols-[220px_minmax(0,1fr)] sm:px-6"
                >
                  <p class="text-sm font-semibold tracking-[0.16em] text-[var(--brand-deep)] uppercase">{{ row.label }}</p>
                  <p class="text-base leading-7 text-muted-foreground">{{ row.text }}</p>
                </div>
              </div>
            </div>

            <aside class="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(12,43,55,0.98),rgba(8,28,36,0.96))] p-7 text-white shadow-[0_36px_90px_rgba(0,0,0,0.24)]">
              <p class="text-[0.72rem] font-semibold tracking-[0.22em] text-white/60 uppercase">{{ t('homeAlt.capabilities.commandLensLabel') }}</p>
              <h3 class="mt-4 font-display text-4xl leading-none tracking-[-0.05em]">{{ t('homeAlt.capabilities.commandLensTitle') }}</h3>
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
            <div class="relative overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_90px_rgba(0,0,0,0.16)]">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663573693411/MK2bu4wr22Z3DBC6uiA6SB/intelimaris-stakeholder-operations-9TfThuMgfbTtHc7qucoKcb.webp"
                alt="Marine stakeholders using shared operational intelligence"
                class="h-full min-h-[520px] w-full object-cover"
              />
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,32,41,0.08),rgba(11,32,41,0.42))]" />
            </div>

            <div>
              <p class="section-kicker">{{ t('homeAlt.stakeholders.kicker') }}</p>
              <h2 class="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.05em] text-foreground">
                {{ t('homeAlt.stakeholders.title') }}
              </h2>
              <p class="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                {{ t('homeAlt.stakeholders.copy') }}
              </p>

              <div class="mt-8 grid gap-4 sm:grid-cols-2">
                <article
                  v-for="card in stakeholderCards"
                  :key="card.title"
                  class="rounded-[1.6rem] border border-border bg-card p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
                >
                  <p class="text-[0.75rem] font-semibold tracking-[0.2em] text-[var(--brand-deep)] uppercase">{{ card.title }}</p>
                  <p class="mt-3 text-base leading-7 text-foreground/85">{{ card.summary }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-y border-border py-16" :style="{ background: 'var(--proof-bar-bg)' }">
        <div class="container">
          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="item in proofItems"
              :key="item.label"
              class="rounded-[1.75rem] border border-border/60 bg-card/85 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
            >
              <div class="font-display text-5xl tracking-[-0.05em] text-foreground">{{ item.metric }}</div>
              <p class="mt-3 text-sm leading-6 text-muted-foreground">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="py-20 lg:py-28">
        <div class="container">
          <div class="grid gap-8 rounded-[2.2rem] border border-border bg-[linear-gradient(135deg,#082833,#0d3642_55%,#13424c)] p-7 text-white shadow-[0_36px_100px_rgba(0,0,0,0.24)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:p-12">
            <div>
              <p class="section-kicker text-white/65">{{ t('homeAlt.contact.kicker') }}</p>
              <h2 class="mt-5 max-w-2xl font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.05em]">
                {{ t('homeAlt.contact.title') }}
              </h2>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                {{ t('homeAlt.contact.copy') }}
              </p>
              <div class="mt-8 flex flex-wrap gap-3 text-sm text-white/75">
                <span class="signal-pill-dark">{{ t('homeAlt.contact.pill1') }}</span>
                <span class="signal-pill-dark">{{ t('homeAlt.contact.pill2') }}</span>
              </div>
            </div>

            <div class="rounded-[1.9rem] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
              <div class="space-y-4 text-sm leading-7 text-white/82">
                <div class="flex items-start gap-3">
                  <Icon name="cpu" class="mt-1 h-5 w-5 text-[var(--alert-soft)]" />
                  <p>{{ t('homeAlt.contact.bullet1') }}</p>
                </div>
                <div class="flex items-start gap-3">
                  <Icon name="siren" class="mt-1 h-5 w-5 text-[var(--alert-soft)]" />
                  <p>{{ t('homeAlt.contact.bullet2') }}</p>
                </div>
                <div class="flex items-start gap-3">
                  <Icon name="waypoints" class="mt-1 h-5 w-5 text-[var(--alert-soft)]" />
                  <p>{{ t('homeAlt.contact.bullet3') }}</p>
                </div>
              </div>

              <div class="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm leading-7 text-white/88">
                <p>
                  {{ t('homeAlt.contact.websiteLabel') }}: <a class="text-white underline decoration-white/30 underline-offset-4" href="https://intelimaris.com">intelimaris.com</a>
                </p>
                <p>
                  {{ t('homeAlt.contact.emailLabel') }}: <MailLink class="text-white underline decoration-white/30 underline-offset-4" />
                </p>
              </div>

              <div class="mt-8">
                <MailLink
                  subject="InteliMaris Consultation Request"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-[0.14em] uppercase text-slate-950 transition-colors hover:bg-white/95"
                >
                  <template #default>
                    {{ t('homeAlt.contact.startConversation') }}
                    <Icon name="arrow-right" class="h-4 w-4" />
                  </template>
                </MailLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref, type FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'
import homeAltCss from '@/assets/home-alt.css?inline'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'
import type { Language } from '@/i18n/translations'
import MailLink from '@/components/MailLink.vue'

const logoSrc = `${import.meta.env.BASE_URL}assets/logo.svg`

const languages: Language[] = ['en', 'es', 'el', 'uk']

const { theme, setTheme } = useTheme()
const { currentLanguage, setLanguage, languageData, t } = useI18n()

const isLangOpen = ref(false)

const toggleTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const toggleLang = () => {
  isLangOpen.value = !isLangOpen.value
}

const selectLanguage = (lang: Language) => {
  setLanguage(lang)
  isLangOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('[data-lang-picker]')) {
    isLangOpen.value = false
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isLangOpen.value = false
}

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
  --hero-overlay: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9), transparent 34%), linear-gradient(180deg, rgba(242,248,250,0.45), rgba(242,248,250,0.82));
  --capabilities-overlay: linear-gradient(180deg, rgba(244,249,251,0.92), rgba(244,249,251,0.98));
  --proof-bar-bg: linear-gradient(180deg, rgba(237,246,248,0.85), rgba(244,249,251,0.98));
  --layer-index-bg: linear-gradient(180deg, #edf7f8, #d7ebee);
}
body[data-theme="dark"] {
  --brand-deep: #5fb7cb;
  --brand-ink: #e8eef2;
  --alert: #f4a866;
  --alert-soft: #f4b582;
  --background: #0a1820;
  --foreground: #e8eef2;
  --border: rgba(200, 220, 230, 0.1);
  --input: rgba(200, 220, 230, 0.1);
  --ring: rgba(95, 183, 203, 0.4);
  --card: #122734;
  --card-foreground: #e8eef2;
  --popover: #122734;
  --popover-foreground: #e8eef2;
  --primary: #5fb7cb;
  --primary-foreground: #0a1820;
  --secondary: rgba(200, 220, 230, 0.08);
  --secondary-foreground: #e8eef2;
  --muted: rgba(200, 220, 230, 0.06);
  --muted-foreground: #94a3b8;
  --accent: rgba(200, 220, 230, 0.08);
  --accent-foreground: #e8eef2;
  --destructive: #f87171;
  --hero-overlay: radial-gradient(circle at 20% 20%, rgba(95,183,203,0.12), transparent 34%), linear-gradient(180deg, rgba(10,24,32,0.6), rgba(10,24,32,0.92));
  --capabilities-overlay: linear-gradient(180deg, rgba(10,24,32,0.85), rgba(10,24,32,0.96));
  --proof-bar-bg: linear-gradient(180deg, rgba(15,33,44,0.9), rgba(10,24,32,0.96));
  --layer-index-bg: linear-gradient(180deg, rgba(95,183,203,0.18), rgba(95,183,203,0.06));
}
body[data-theme="dark"] .hero-shell {
  background:
    radial-gradient(circle at 12% 12%, rgba(95,183,203,0.18), transparent 24%),
    linear-gradient(rgba(10,24,32,0.85), rgba(10,24,32,0.96));
}
body[data-theme="dark"] .hero-chart {
  background-image:
    linear-gradient(rgba(95,183,203,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(95,183,203,0.06) 1px, transparent 1px),
    radial-gradient(circle at 80% 15%, rgba(232,143,61,0.12), transparent 16%);
}
body[data-theme="dark"] .signal-pill {
  color: #c4d4dd;
  background: rgba(18,39,52,0.78);
  border-color: rgba(95,183,203,0.2);
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}
body[data-theme="dark"] .signal-pill-muted:before {
  background: #5a7a87;
  box-shadow: 0 0 0 6px rgba(90,122,135,0.24);
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

onMounted(() => {
  injectCss(homeAltCss)
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})
onBeforeUnmount(() => {
  removeCss()
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})

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

const layerCards = computed(() => [
  {
    index: '01',
    title: t('homeAlt.layers.card1.title'),
    copy: t('homeAlt.layers.card1.copy'),
    details: [t('homeAlt.layers.card1.detail1'), t('homeAlt.layers.card1.detail2'), t('homeAlt.layers.card1.detail3')],
  },
  {
    index: '02',
    title: t('homeAlt.layers.card2.title'),
    copy: t('homeAlt.layers.card2.copy'),
    details: [t('homeAlt.layers.card2.detail1'), t('homeAlt.layers.card2.detail2'), t('homeAlt.layers.card2.detail3')],
  },
  {
    index: '03',
    title: t('homeAlt.layers.card3.title'),
    copy: t('homeAlt.layers.card3.copy'),
    details: [t('homeAlt.layers.card3.detail1'), t('homeAlt.layers.card3.detail2'), t('homeAlt.layers.card3.detail3')],
  },
])

const capabilityRows = computed(() => [
  { label: t('homeAlt.capabilities.row1.label'), text: t('homeAlt.capabilities.row1.text') },
  { label: t('homeAlt.capabilities.row2.label'), text: t('homeAlt.capabilities.row2.text') },
  { label: t('homeAlt.capabilities.row3.label'), text: t('homeAlt.capabilities.row3.text') },
  { label: t('homeAlt.capabilities.row4.label'), text: t('homeAlt.capabilities.row4.text') },
])

const stakeholderCards = computed(() => [
  { title: t('homeAlt.stakeholders.owners.title'), summary: t('homeAlt.stakeholders.owners.summary') },
  { title: t('homeAlt.stakeholders.marinas.title'), summary: t('homeAlt.stakeholders.marinas.summary') },
  { title: t('homeAlt.stakeholders.fleets.title'), summary: t('homeAlt.stakeholders.fleets.summary') },
  { title: t('homeAlt.stakeholders.insurers.title'), summary: t('homeAlt.stakeholders.insurers.summary') },
])

const proofItems = computed(() => [
  { metric: '24/7', label: t('homeAlt.proof.label1') },
  { metric: '3', label: t('homeAlt.proof.label2') },
  { metric: '<60s', label: t('homeAlt.proof.label3') },
  { metric: '1', label: t('homeAlt.proof.label4') },
])

const heroTelemetry = computed(() => [
  { name: t('homeAlt.telemetry.battery'), value: '13.2V', status: t('homeAlt.telemetry.batteryStatus') },
  { name: t('homeAlt.telemetry.bilge'), value: t('homeAlt.telemetry.bilgeValue'), status: t('homeAlt.telemetry.bilgeStatus') },
  { name: t('homeAlt.telemetry.thermal'), value: t('homeAlt.telemetry.thermalValue'), status: t('homeAlt.telemetry.thermalStatus') },
  { name: t('homeAlt.telemetry.escalation'), value: t('homeAlt.telemetry.escalationValue'), status: t('homeAlt.telemetry.escalationStatus') },
])

const escalationSteps = computed(() => [
  t('homeAlt.marina.step1'),
  t('homeAlt.marina.step2'),
  t('homeAlt.marina.step3'),
  t('homeAlt.marina.step4'),
])

const commandLensItems = computed<Array<{ icon: IconName; text: string }>>(() => [
  { icon: 'radar', text: t('homeAlt.capabilities.lens1') },
  { icon: 'bell-ring', text: t('homeAlt.capabilities.lens2') },
  { icon: 'shield-check', text: t('homeAlt.capabilities.lens3') },
  { icon: 'gauge', text: t('homeAlt.capabilities.lens4') },
  { icon: 'waypoints', text: t('homeAlt.capabilities.lens5') },
  { icon: 'binary', text: t('homeAlt.capabilities.lens6') },
])
</script>
