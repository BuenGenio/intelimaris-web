import { afterEach, describe, expect, it } from 'vitest'
import { createSSRApp, defineComponent, nextTick, type App } from 'vue'
import { renderToString } from 'vue/server-renderer'
import ShotLightbox from './ShotLightbox.vue'

let app: App | undefined
afterEach(() => { app?.unmount(); document.body.innerHTML = '' })

describe('pre-rendered image lightbox', () => {
  it('hydrates a closed lightbox without consuming the page container', async () => {
    const shell = defineComponent({ components: { ShotLightbox }, template: '<main><h1>Marina guide</h1><ShotLightbox :model-value="false" id="pms-berth-layout" /></main>' })
    const html = await renderToString(createSSRApp(shell))
    document.body.innerHTML = `<div id="app">${html}</div><div id="lightbox-root"></div>`
    const container = document.getElementById('app')!
    app = createSSRApp(shell)
    app.mount(container)
    await nextTick()
    expect(container.isConnected).toBe(true)
    expect(container.querySelector('h1')?.textContent).toBe('Marina guide')
    expect(document.getElementById('lightbox-root')?.children.length).toBe(0)
  })
})
