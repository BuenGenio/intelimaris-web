import type { RouteLocationNormalizedLoaded, RouteLocationResolved } from 'vue-router'
import { AUDIENCES } from '@/data/audiences'
import { CAPABILITIES } from '@/data/capabilities'
import { SOLUTIONS } from '@/data/solutions'
import { CATEGORY_ORDER, findProduct, productCatalog, type ProductCategory } from '@/data/productCatalog'
import { getBreadcrumbs } from '@/composables/useBreadcrumbs'
import { translations } from '@/i18n/translations'

export const SITE_URL = 'https://intelimaris.com'
const HOME_DESCRIPTION = 'Plan the passage, monitor your vessel and prepare the arrival. Explore WaterWayz navigation, connected marine hardware and InteliMarina operations.'
const pages: Record<string, [string, string]> = {
  home: ['Connected boating, navigation & marina technology', HOME_DESCRIPTION],
  products: ['Marine hardware & connected vessel systems', 'Explore InteliMARIS sensors, controls and connected systems. Compare hardware specifications for PWTS, InteliBilge and InteliBMS installations.'],
  'product-categories': ['Browse marine hardware by category', 'Find marine safety, water, environmental, electrical, motion and control hardware. Explore specifications and compatible InteliMARIS systems.'],
  capabilities: ['Navigation, vessel monitoring & marina operations', 'Explore the InteliMARIS platform: navigation, route planning, hazard awareness, vessel monitoring, dockage and marina management.'],
  waterwayz: ['WaterWayz | Your connected boating experience', 'Plan passages, explore navigation and vessel readings, and coordinate your next arrival. Discover WaterWayz, the connected boating experience by InteliMARIS.'],
  software: ['Connected maritime software & integrations', 'See how WaterWayz, marina tools and connected vessel data work together. Explore the InteliMARIS software platform and integration approach.'],
  about: ['Our story | Technology for life on the water', 'Meet the team behind InteliMARIS and WaterWayz. Discover our approach to connected boating, vessel awareness and marina operations.'],
  contact: ['Talk to the InteliMARIS team', 'Discuss navigation, connected vessel hardware or marina operations with InteliMARIS. Tell us about your vessel, marina or integration needs.'],
  demo: ['Marine survey & geospatial technology demos', 'Explore the InteliMARIS marine survey demonstration, with LiDAR point-cloud technology and clearly identified sample marina information.'],
  'demo-marina': ['Marina survey demo | Bahia Mar sample listing', 'Explore a LiDAR technology demonstration using Halifax Harbor survey data alongside a Bahia Mar sample marina listing. See the dataset and its limitations.'],
  'home-alt': ['Alternative homepage preview', 'An alternative InteliMARIS homepage design preview.'],
  playbook: ['Interaction playbook', 'Seven interactive journeys under review before they join the site.'],
  'not-found': ['Page not found', 'Find your way back to InteliMARIS: explore the platform, choose your role or browse marine hardware.'],
}
export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  safety: 'Smoke and carbon monoxide detection for onboard awareness. Compare alarm, installation and connectivity specifications.',
  water: 'Leak detection, water-level sensing and bilge monitoring. Explore sensors and installation-specific pump supervision.',
  environment: 'Temperature and humidity sensing for engine rooms, cabins and storage. Compare environmental hardware specifications.',
  electrical: 'AC and DC monitoring, battery shunts and shore-power awareness. Compare electrical hardware specifications.',
  motion: 'Vibration and runtime sensing for vessel awareness. Explore supported motion and equipment monitoring hardware.',
  control: 'Remote I/O and switching hardware. Review electrical limits, connectivity and installation-specific controls.',
  system: 'Connected vessel systems combining sensors, monitoring and controls. Explore supplied components and installation requirements.',
}
export const REDIRECTS: Record<string, string> = { '/inteliwaterwayz': '/waterwayz', '/capabilities/marina-pms': '/marinas' }
export const INDEXABLE_PATHS = [
  '/', '/products', '/products/categories', '/capabilities', '/waterwayz', '/software', '/about', '/contact', '/marinas', '/demo', '/demo/marina/bahia-mar',
  ...AUDIENCES.map(a => `/for/${a.id}`),
  ...CAPABILITIES.filter(c => c.id !== 'marina-pms').map(c => `/capabilities/${c.id}`),
  ...SOLUTIONS.map(s => `/${s.id}`),
  ...CATEGORY_ORDER.map(category => `/products/category/${category}`),
  ...productCatalog.map(product => `/products/${product.id}`),
]

/** Directory URLs match the static host's redirect behavior; preferences never create duplicates. */
export function canonicalUrl(path: string) {
  const pathname = path.split(/[?#]/)[0]!.replace(/\/+$/, '') || '/'
  const canonical = REDIRECTS[pathname] || pathname
  return `${SITE_URL}${canonical === '/' ? '/' : `${canonical}/`}`
}
function excerpt(value: string, length = 165) {
  const clean = value.replace(/\s+/g, ' ').trim()
  if (clean.length <= length) return clean
  return `${clean.slice(0, length - 1).replace(/\s+\S*$/, '').replace(/[.,;:]$/, '')}…`
}
export function getSeo(route: RouteLocationNormalizedLoaded | RouteLocationResolved) {
  const name = String(route.name)
  const product = name === 'product-detail' ? findProduct(String(route.params.id)) : undefined
  const category = name === 'product-category' && CATEGORY_ORDER.includes(route.params.category as ProductCategory) ? route.params.category as ProductCategory : undefined
  const missing = name === 'not-found' || (name === 'product-detail' && !product) || (name === 'product-category' && !category)
  const defaults = pages[name] || ['Marine technology', HOME_DESCRIPTION]
  let title = String(route.meta.title || defaults[0])
  let description = String(route.meta.description || defaults[1])
  if (product) { title = `${product.model} | ${product.name}`; description = product.overview }
  if (category) { title = `${translations.en[`products.category.${category}`]} marine hardware`; description = CATEGORY_DESCRIPTIONS[category] }
  if (missing) { title = 'Page not found'; description = pages['not-found']![1] }
  const path = product ? `/products/${product.id}` : route.path
  const canonical = canonicalUrl(path)
  const imageKey = name.startsWith('product') ? 'hardware' : route.meta.audience ? 'audiences' : name === 'marinas' ? 'marinas' : name === 'waterwayz' ? 'waterwayz' : name.startsWith('demo') ? 'geospatial' : name === 'about' || name === 'contact' ? 'company' : name === 'home' ? 'home' : 'platform'
  const image = `${SITE_URL}/assets/social/${name === 'home' ? 'home-lidar' : imageKey}.png`
  const imageWidth = name === 'home' ? 1730 : 1200
  const imageHeight = name === 'home' ? 1035 : 630
  const imageAlt = name === 'home' ? 'InteliMARIS marina LiDAR view showing berths, vessels and waterfront structures in a coloured 3D point cloud.' : `InteliMARIS — ${ { home: 'Your day on the water. Connected.', hardware: 'Connected marine hardware.', audiences: 'Find your view on the water.', marinas: 'From approach to alongside.', waterwayz: 'Your whole boating experience.', geospatial: 'A closer look at the waterfront.', company: 'Technology for life on the water.', platform: 'One connected marine platform.' }[imageKey] }`
  const indexable = !missing && name !== 'home-alt' && name !== 'playbook'
  return { title: `${title} | InteliMARIS`, description: excerpt(description), canonical, image, imageAlt, imageWidth, imageHeight, indexable, product }
}
export function structuredData(route: RouteLocationNormalizedLoaded | RouteLocationResolved) {
  const seo = getSeo(route)
  const orgId = `${SITE_URL}/#organization`
  const websiteId = `${SITE_URL}/#website`
  const graph: Record<string, unknown>[] = [
    { '@type': 'Organization', '@id': orgId, name: 'InteliMARIS', legalName: 'InteliMarine LLC', url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/wordmark.png`, width: 705, height: 182 }, email: 'info@intelimarine.com' },
    { '@type': 'WebSite', '@id': websiteId, name: 'InteliMARIS', alternateName: 'InteliMARIS by InteliMarine', url: `${SITE_URL}/`, inLanguage: 'en', publisher: { '@id': orgId } },
  ]
  const page: Record<string, unknown> = { '@type': route.name === 'about' ? 'AboutPage' : route.name === 'contact' ? 'ContactPage' : route.name === 'products' || route.name === 'product-categories' || route.name === 'product-category' ? 'CollectionPage' : 'WebPage', '@id': `${seo.canonical}#webpage`, url: seo.canonical, name: seo.title, description: seo.description, inLanguage: 'en', isPartOf: { '@id': websiteId }, publisher: { '@id': orgId }, primaryImageOfPage: { '@type': 'ImageObject', url: seo.image, width: seo.imageWidth, height: seo.imageHeight } }
  const breadcrumbs = getBreadcrumbs(route)
  if (breadcrumbs.length) {
    page.breadcrumb = { '@id': `${seo.canonical}#breadcrumb` }
    graph.push({ '@type': 'BreadcrumbList', '@id': `${seo.canonical}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, ...breadcrumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 2, name: crumb.label, item: i === breadcrumbs.length - 1 ? seo.canonical : canonicalUrl(typeof crumb.to === 'string' ? crumb.to : '/') }))] })
  }
  if (seo.product) {
    const product = seo.product
    const id = `${seo.canonical}#product`
    page.mainEntity = { '@id': id }
    graph.push({ '@type': 'Product', '@id': id, name: `${product.model} ${product.name}`, model: product.model, description: product.overview, url: seo.canonical, brand: { '@type': 'Brand', name: 'InteliMARIS' }, ...(product.image ? { image: `${SITE_URL}/${product.image}` } : {}), category: translations.en[`products.category.${product.category}`], additionalProperty: product.specs.filter(row => row.specification !== 'TBC').map(row => ({ '@type': 'PropertyValue', name: row.parameter, value: row.specification })) })
  }
  if (route.name === 'products' || route.name === 'product-category') {
    const entries = route.name === 'product-category' ? productCatalog.filter(p => p.category === route.params.category) : productCatalog
    page.mainEntity = { '@type': 'ItemList', itemListElement: entries.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: `${p.model} ${p.name}`, url: canonicalUrl(`/products/${p.id}`) })) }
  }
  graph.push(page)
  return { '@context': 'https://schema.org', '@graph': graph }
}
export function escapeHtml(value: string) { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') }
export function renderHead(route: RouteLocationNormalizedLoaded | RouteLocationResolved) {
  const seo = getSeo(route)
  const meta = (key: string, value: string, property = false) => `<meta data-seo ${property ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`
  return [
    `<title data-seo>${escapeHtml(seo.title)}</title>`,
    meta('description', seo.description), meta('robots', seo.indexable ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow'),
    `<link data-seo rel="canonical" href="${escapeHtml(seo.canonical)}">`,
    ...Object.entries({ 'og:type': 'website', 'og:site_name': 'InteliMARIS', 'og:locale': 'en_US', 'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.canonical, 'og:image': seo.image, 'og:image:secure_url': seo.image, 'og:image:type': 'image/png', 'og:image:width': String(seo.imageWidth), 'og:image:height': String(seo.imageHeight), 'og:image:alt': seo.imageAlt }).map(([key, value]) => meta(key, value, true)),
    ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image, 'twitter:image:alt': seo.imageAlt }).map(([key, value]) => meta(key, value)),
    `<script data-seo type="application/ld+json">${JSON.stringify(structuredData(route)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}
export function applySeo(route: RouteLocationNormalizedLoaded | RouteLocationResolved) {
  document.head.querySelectorAll('[data-seo]').forEach(node => node.remove())
  document.head.insertAdjacentHTML('beforeend', renderHead(route))
}
