import { build } from 'vite'
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Keep the renderer under the project so its external dependencies resolve normally.
const serverDir = await mkdtemp(resolve('node_modules/.prerender-'))
try {
  await build({ build: { ssrManifest: true } })
  await build({ build: { ssr: 'src/entry-server.ts', outDir: serverDir, copyPublicDir: false, emptyOutDir: true }, plugins: [] })
  const { render, INDEXABLE_PATHS, REDIRECTS, SITE_URL, canonicalUrl, escapeHtml } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)
  const template = await readFile('dist/index.html', 'utf8')
  const manifest = JSON.parse(await readFile('dist/.vite/ssr-manifest.json', 'utf8'))
  const results = []
  for (const path of [...INDEXABLE_PATHS, '/home-alt', '/playbook', '/404']) {
    const page = await render(path)
    const styles = [...new Set(page.modules.flatMap(id => manifest[id] || []))].filter(file => file.endsWith('.css') && !template.includes(`href="${file}"`))
    const css = styles.map(file => `<link rel="stylesheet" href="${escapeHtml(file)}">`).join('\n')
    const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n${page.head}\n<!--seo:end-->${css}`)
      .replace('<div id="app"></div>', `<div id="app" data-prerender-path="${escapeHtml(path)}">${page.html}</div>`)
    const dest = path === '/404' ? 'dist/404.html' : join('dist', path, 'index.html')
    await mkdir(resolve(dest, '..'), { recursive: true })
    await writeFile(dest, html)
    results.push({ path, file: dest, title: page.seo.title, canonical: page.seo.canonical, indexable: page.seo.indexable })
  }
  // Static legacy aliases work before JavaScript and have a canonical target.
  for (const [alias, target] of Object.entries(REDIRECTS)) {
    const url = canonicalUrl(target)
    const dest = join('dist', alias, 'index.html')
    await mkdir(resolve(dest, '..'), { recursive: true })
    await writeFile(dest, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page moved | InteliMARIS</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0;url=${url}"></head><body><p>This page has moved to <a href="${url}">${escapeHtml(target)}</a>.</p></body></html>`)
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${INDEXABLE_PATHS.map(path => `  <url><loc>${escapeHtml(canonicalUrl(path))}</loc></url>`).join('\n')}\n</urlset>\n`)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /design/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
  await writeFile('dist/prerender-manifest.json', JSON.stringify(results, null, 2))
  console.log(`Pre-rendered ${INDEXABLE_PATHS.length} indexable pages, 3 preview/error pages and ${Object.keys(REDIRECTS).length} legacy redirects.`)
} finally {
  await rm(serverDir, { recursive: true, force: true })
}
