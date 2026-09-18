import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Window } from 'happy-dom'

const root = resolve('dist')
const manifest = JSON.parse(await readFile(resolve(root, 'prerender-manifest.json'), 'utf8'))
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8')
const window = new Window({ url: 'https://intelimaris.com', settings: { disableJavaScriptEvaluation: true, disableJavaScriptFileLoading: true, disableCSSFileLoading: true } })
const socialImages = new Map()
const titles = new Set(), descriptions = new Set(), urls = new Set(), checkedAssets = new Set()
const publishedPaths = new Set(manifest.map(page => page.path))
const aliases = new Set(['/inteliwaterwayz', '/capabilities/marina-pms'])
let linkCount = 0
for (const page of manifest) {
  const html = await readFile(page.file, 'utf8')
  const doc = new window.DOMParser().parseFromString(html, 'text/html')
  const meta = selector => doc.querySelector(selector)?.getAttribute('content')
  assert.equal(doc.querySelectorAll('title').length, 1, `${page.path}: one title`)
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, `${page.path}: one canonical`)
  assert.equal(doc.querySelector('link[rel="canonical"]').href, page.canonical)
  assert.ok(doc.querySelector('#app main')?.textContent.trim().length > (page.indexable ? 200 : 100), `${page.path}: real body content without JavaScript`)
  assert.equal(doc.querySelectorAll('main h1').length, 1, `${page.path}: one main heading`)
  assert.equal(doc.querySelectorAll('#app').length, 1, `${page.path}: unique app container`)
  assert.ok(meta('meta[name="description"]')?.length >= 50, `${page.path}: useful description`)
  assert.ok(meta('meta[name="description"]').length <= 165, `${page.path}: bounded description`)
  assert.equal(meta('meta[property="og:url"]'), page.canonical)
  assert.equal(meta('meta[property="og:title"]'), doc.title)
  assert.equal(meta('meta[name="twitter:title"]'), doc.title)
  assert.equal(meta('meta[name="twitter:card"]'), 'summary_large_image')
  assert.ok(meta('meta[property="og:image:alt"]'))
  assert.ok(meta('meta[name="twitter:image:alt"]'))
  const socialPath = new URL(meta('meta[property="og:image"]')).pathname
  const dimensions = { width: Number(meta('meta[property="og:image:width"]')), height: Number(meta('meta[property="og:image:height"]')) }
  assert.ok(dimensions.width > 0 && dimensions.height > 0, `${page.path}: image dimensions declared`)
  assert.equal(meta('meta[name="twitter:image"]'), meta('meta[property="og:image"]'), `${page.path}: consistent social image`)
  socialImages.set(socialPath, dimensions)
  const schema = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)
  assert.equal(schema['@context'], 'https://schema.org')
  assert.ok(schema['@graph'].some(item => item['@type'] === 'Organization'))
  assert.ok(schema['@graph'].some(item => item['@type'] === 'WebSite'))
  if (page.path.startsWith('/products/im')) assert.ok(schema['@graph'].some(item => item['@type'] === 'Product'))
  assert.equal(doc.querySelectorAll('link[hreflang]').length, 0, 'No language alternates without translated URLs')
  if (page.indexable) {
    assert.ok(!meta('meta[name="robots"]').includes('noindex'))
    assert.ok(!titles.has(doc.title), `Duplicate title: ${doc.title}`)
    assert.ok(!descriptions.has(meta('meta[name="description"]')), `Duplicate description: ${page.path}`)
    assert.ok(!urls.has(page.canonical), `Duplicate canonical: ${page.path}`)
    titles.add(doc.title); descriptions.add(meta('meta[name="description"]')); urls.add(page.canonical)
    assert.ok(sitemap.includes(`<loc>${page.canonical}</loc>`), `${page.path}: sitemap entry`)
  } else {
    assert.ok(meta('meta[name="robots"]').includes('noindex'))
    assert.ok(!sitemap.includes(`<loc>${page.canonical}</loc>`))
  }
  for (const a of doc.querySelectorAll('a[href]')) {
    const url = new URL(a.getAttribute('href'), page.canonical)
    if (url.origin !== 'https://intelimaris.com' || /\.[a-z0-9]+$/i.test(url.pathname)) continue
    const path = url.pathname.replace(/\/+$/, '') || '/'
    assert.ok(publishedPaths.has(path) || aliases.has(path), `${page.path}: broken internal link ${url.pathname}`)
    linkCount++
  }
  const assets = [...doc.querySelectorAll('img[src],script[src],link[rel="stylesheet"],link[rel="preload"],link[rel="icon"],link[rel="apple-touch-icon"]')].map(node => node.getAttribute('src') || node.getAttribute('href'))
  assets.push(meta('meta[property="og:image"]'), meta('meta[name="twitter:image"]'))
  for (const asset of assets) {
    if (!asset || asset.startsWith('data:')) continue
    const url = new URL(asset, page.canonical)
    if (url.origin !== 'https://intelimaris.com' || checkedAssets.has(url.pathname)) continue
    await access(resolve(root, '.' + decodeURIComponent(url.pathname)))
    checkedAssets.add(url.pathname)
  }
}
assert.equal((sitemap.match(/<loc>/g) || []).length, urls.size, 'Exact sitemap coverage')
for (const alias of aliases) {
  const html = await readFile(resolve(root, `.${alias}/index.html`), 'utf8')
  assert.ok(html.includes('http-equiv="refresh"') && html.includes('noindex, follow'), `Alias redirect: ${alias}`)
}
for (const [asset, dimensions] of socialImages) {
  const png = await readFile(resolve(root, '.' + asset))
  assert.equal(png.readUInt32BE(16), dimensions.width, `${asset}: social card width`)
  assert.equal(png.readUInt32BE(20), dimensions.height, `${asset}: social card height`)
}
assert.match(await readFile(resolve(root, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/intelimaris\.com\/sitemap\.xml/)
await window.happyDOM.close()
console.log(`SEO verified: ${urls.size} indexable pages; unique titles, descriptions, canonicals, social tags and structured data; ${linkCount} internal links; ${checkedAssets.size} local assets; redirects and noindex pages.`)
