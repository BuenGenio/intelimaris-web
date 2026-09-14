<template>
  <main class="dm-page">
    <section class="page-hero">
      <div class="container">
        <nav class="page-breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">›</span>
          <RouterLink :to="{ name: 'demo' }">{{ t('demo.label') }}</RouterLink>
          <span aria-hidden="true">›</span>
          <span class="page-breadcrumb-current">{{ marina.name }}</span>
        </nav>
        <div class="dm-title-row">
          <div>
            <div class="section-label">{{ t('demo.marina.label') }}</div>
            <h1>{{ marina.name }}</h1>
            <p class="dm-address">{{ marina.address }} · {{ marina.waterway }}</p>
          </div>
          <span class="dm-badge">{{ t('demo.marina.sample') }}</span>
        </div>
      </div>
    </section>

    <!-- Aspect tabs + viewer -->
    <section class="dm-viewer">
      <div class="container-wide">
        <div class="dm-aspects" role="tablist" :aria-label="t('demo.marina.aspects')">
          <button
            v-for="a in aspects"
            :key="a.key"
            type="button"
            role="tab"
            :aria-selected="active === a.key"
            :class="{ on: active === a.key }"
            @click="select(a)"
          >
            {{ t('demo.marina.aspect.' + a.key) }}
          </button>
        </div>
        <p class="dm-aspect-note">{{ t('demo.marina.aspectNote.' + active) }}</p>
        <LasViewer ref="viewer" :meta-url="metaUrl" />
      </div>
    </section>

    <!-- Facts -->
    <section class="dm-facts">
      <div class="container">
        <div class="dm-grid">
          <div>
            <div class="section-label">{{ t('demo.marina.facts') }}</div>
            <h2>{{ t('demo.marina.factsTitle') }}</h2>
            <dl class="dm-dl">
              <div v-for="f in facts" :key="f.k"><dt>{{ t('demo.fact.' + f.k) }}</dt><dd>{{ f.v }}</dd></div>
            </dl>
          </div>
          <div>
            <div class="section-label">{{ t('demo.marina.amenities') }}</div>
            <h2>{{ t('demo.marina.amenitiesTitle') }}</h2>
            <ul class="dm-amenities">
              <li v-for="a in marina.amenities" :key="a">{{ a }}</li>
            </ul>
            <div class="dm-contact">
              <span class="section-label">{{ t('demo.marina.contact') }}</span>
              <a :href="'tel:' + marina.phone.replace(/[^0-9+]/g, '')">{{ marina.phone }}</a>
              <a :href="'mailto:' + marina.email">{{ marina.email }}</a>
              <a :href="marina.website" target="_blank" rel="noopener noreferrer">{{ marina.website.replace('https://', '') }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Model provenance -->
    <section class="dm-model">
      <div class="container">
        <div class="dm-model-panel">
          <div>
            <div class="section-label accent">{{ t('demo.marina.model') }}</div>
            <h2>{{ t('demo.marina.modelTitle') }}</h2>
            <p>{{ t('demo.marina.modelNote') }}</p>
          </div>
          <dl class="dm-dl dm-dl--compact">
            <div><dt>{{ t('demo.model.source') }}</dt><dd>HFAX_PC.las · LAS 1.4 · point format 7</dd></div>
            <div><dt>{{ t('demo.model.location') }}</dt><dd>Halifax Harbor, Daytona Beach FL · 29.2058° N, 81.0137° W</dd></div>
            <div><dt>{{ t('demo.model.crs') }}</dt><dd>WGS 84 / UTM 17N · ellipsoid heights</dd></div>
            <div><dt>{{ t('demo.model.points') }}</dt><dd>220,406,829 → 1,176,926 ({{ t('demo.model.voxel') }} 0.8 m)</dd></div>
            <div><dt>{{ t('demo.model.extent') }}</dt><dd>784 × 958 m</dd></div>
            <div><dt>{{ t('demo.model.classes') }}</dt><dd>{{ t('demo.model.classesNote') }}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import LasViewer from '@/components/demo/LasViewer.vue'

const { t } = useI18n()
const metaUrl = `${import.meta.env.BASE_URL}assets/demo/hfax.json`
const viewer = ref<InstanceType<typeof LasViewer> | null>(null)

/* Public listing facts for Bahia Mar Yachting Center (bahiamaryachtingcenter.com, Sept 2026). Sample data for the demo. */
const marina = {
  name: 'Bahia Mar Yachting Center',
  address: '801 Seabreeze Blvd, Fort Lauderdale, FL 33316',
  waterway: 'Intracoastal Waterway',
  phone: '954-627-6309',
  email: 'bahiamar@suntex.com',
  website: 'https://bahiamaryachtingcenter.com',
  amenities: [
    'High-speed gasoline and diesel fueling',
    'In-slip pump-out',
    'High-speed Wi-Fi throughout the marina',
    '24/7 security',
    'Air-conditioned restrooms and laundry',
    'Full-service marine maintenance and support',
    'Dive center',
    'Pool, fitness center and concierge',
    'On-site dining and retail',
    'Home of the Fort Lauderdale International Boat Show',
  ],
}
const facts = [
  { k: 'slips', v: '250+ wet slips' },
  { k: 'loa', v: 'Up to 300 ft' },
  { k: 'dockage', v: '5,000+ ft floating · 3,000 ft parallel dock' },
  { k: 'depth', v: '16 ft approach and dockside · 13 ft max draft' },
  { k: 'power', v: '30 / 50 / 100–200 A · single and three-phase' },
  { k: 'fuel', v: 'Gasoline and diesel, high-speed pumps' },
]

type Aspect = { key: string; mode: 'rgb' | 'height' | 'intensity' | 'band' | 'returns'; bands: boolean[]; hag: [number, number]; view: 'oblique' | 'top' | 'dock' | 'reset'; size?: number }
const aspects: Aspect[] = [
  { key: 'overview',   mode: 'rgb',    bands: [true, true, true, true, true],   hag: [0, 25], view: 'oblique' },
  { key: 'docks',      mode: 'band',   bands: [false, true, false, false, false], hag: [0, 25], view: 'top', size: 3 },
  { key: 'structures', mode: 'band',   bands: [false, false, true, false, true], hag: [0, 25], view: 'oblique', size: 3 },
  { key: 'vegetation', mode: 'returns', bands: [false, true, true, true, true], hag: [0.3, 25], view: 'oblique' },
  { key: 'height',     mode: 'height', bands: [true, true, true, true, true],   hag: [0, 25], view: 'top' },
  { key: 'intensity',  mode: 'intensity', bands: [true, true, true, true, true], hag: [0, 25], view: 'top' },
]
const active = ref('overview')
function select(a: Aspect) {
  active.value = a.key
  viewer.value?.applyAspect({ mode: a.mode, bands: a.bands, hag: a.hag, view: a.view, size: a.size ?? 2.5 })
}
</script>

<style scoped>
.dm-page { padding-top: 5rem; min-height: 60vh; }
.page-hero { padding: 3rem 0 2rem; border-bottom: 1px solid var(--border-subtle); }
.page-breadcrumb { display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
.page-breadcrumb a { color: var(--brand-marine-blue); text-decoration: none; }
[data-theme="dark"] .page-breadcrumb a { color: #6FA0CC; }
.page-breadcrumb a:hover { text-decoration: underline; }
.page-breadcrumb-current { color: var(--text-primary); font-weight: 600; }
.dm-title-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
.dm-title-row h1 { margin: 0.5rem 0 0.5rem; }
.dm-address { color: var(--text-secondary); }
.dm-badge { padding: 0.4rem 0.8rem; border-radius: 999px; border: 1px solid var(--brand-warning-amber); color: var(--brand-warning-amber); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }

.dm-viewer { padding: 2rem 0 1rem; }
.dm-aspects { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; }
.dm-aspects button { padding: 0.5rem 0.9rem; border-radius: 999px; border: 1px solid var(--border-medium); background: var(--surface-soft); color: var(--text-primary); font: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
.dm-aspects button.on { background: var(--brand-marine-blue); border-color: var(--brand-marine-blue); color: #fff; }
.dm-aspects button:hover { border-color: var(--brand-marine-blue); }
.dm-aspect-note { margin: 0 0 1rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; max-width: 70ch; }

.dm-facts { padding: 3rem 0; border-top: 1px solid var(--border-subtle); }
.dm-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; }
.dm-grid h2 { margin-bottom: 1.25rem; font-size: clamp(1.3rem, 2vw, 1.7rem); }
.dm-dl { display: grid; gap: 0.6rem; margin: 0; }
.dm-dl > div { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: 1rem; padding: 0.8rem 1rem; border-radius: 0.9rem; border: 1px solid var(--border-subtle); background: var(--surface-soft); }
.dm-dl dt { color: var(--text-secondary); font-size: 0.85rem; }
.dm-dl dd { margin: 0; font-weight: 600; }
.dm-dl--compact > div { grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr); padding: 0.6rem 0.9rem; }
.dm-dl--compact dd { font-weight: 500; font-size: 0.9rem; }
.dm-amenities { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
.dm-amenities li { padding-left: 1.2rem; position: relative; color: var(--text-secondary); line-height: 1.5; }
.dm-amenities li::before { content: '✓'; position: absolute; left: 0; color: var(--brand-safe-green); font-weight: 700; }
.dm-contact { display: grid; gap: 0.4rem; margin-top: 1.5rem; }
.dm-contact a { color: var(--text-primary); text-decoration: none; font-weight: 600; }
.dm-contact a:hover { color: var(--brand-marine-blue); }
[data-theme="dark"] .dm-contact a:hover { color: #6FA0CC; }

.dm-model { padding: 0 0 5rem; }
.dm-model-panel { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 2rem; padding: 1.6rem; border-radius: 1.25rem; border: 1px solid var(--border-medium); background: var(--glass-bg); }
.dm-model-panel h2 { margin-bottom: 0.75rem; font-size: clamp(1.2rem, 2vw, 1.5rem); }
.dm-model-panel p { color: var(--text-secondary); line-height: 1.7; }

@media (max-width: 860px) { .dm-grid, .dm-model-panel { grid-template-columns: 1fr; } }
</style>
