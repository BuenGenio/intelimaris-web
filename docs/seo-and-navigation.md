# Navigation, catalog and SEO

The header, mobile menu and footer use `src/data/navigation.ts`. The platform menu
exposes Software & integrations, InteliMarina / PMS and the interactive LiDAR demo.
Both marina audience guides, their selected homepage previews and the PMS page
link directly to the demo. Its existing survey provenance remains explicit.

Breadcrumbs occupy the gray strip under the main menu. Their route-derived
hierarchy also supplies BreadcrumbList structured data. The role picker is a
separate navbar control; changing role keeps the current content and product
selection unless the visitor is explicitly viewing a role guide.

The hardware browser has a searchable, filterable sticky sidebar and one detailed
specification pane. Phones use an expandable product browser. Old `/products#id`
links still work; new links use crawlable `/products/id` pages. The catalog heading
is compact, and the redundant Catalog focus/quicklink blocks are removed.

The frosted navbar uses blur/saturation with a low-amplitude SVG displacement at
its edges. Text stays outside the filter. Browsers without these effects receive
an opaque background; reduced-transparency preferences disable both effects.
Appearance offers Light, Dark and Auto with sun, moon and device icons. Auto
follows OS changes; explicit choices and language preferences persist when storage
is available. Language options include the existing US, Spain, Greece and Ukraine
flag assets plus language names. New editorial content remains English first.

## Production SEO

`npm run build` type-checks and runs `scripts/build.mjs`, followed by the SEO audit.
The build performs Vite's client and server builds, then uses Vue's server renderer
to generate 52 English content pages, a noindex design preview and a real 404
recovery document. The temporary server bundle is removed after generation.
The static pages include route-specific CSS and readable content before JavaScript.
Canonical pages hydrate; preference/hash URLs mount the corresponding personalized
view. Image lightboxes use their own client-created teleport target, and SVG logo
IDs remain stable between server and client.

`src/seo/index.ts` is the shared source for browser and static metadata:

- Unique titles/descriptions for guides, families, categories and individual models.
- HTTPS apex-domain canonical directory URLs, matching `public/CNAME` and static
  hosting. Tracking parameters, role choices and fragments are excluded.
- Open Graph and X/Twitter large-image metadata, dimensions, MIME type and alt text.
  The homepage uses the supplied marina LiDAR screenshot (`home-lidar.png`),
  unchanged at 1730 × 1035. Other content families use the branded 1200 × 630 cards.
  Both Open Graph and structured data declare each image’s actual dimensions.
  The editable card SVGs and optional `scripts/generate-social.py` are committed;
  CI needs no Python, and the generator does not overwrite the supplied image.
- Organization, WebSite, WebPage/AboutPage/ContactPage/CollectionPage,
  BreadcrumbList, Product and catalog ItemList structured data where relevant.
  No invented prices, reviews, availability, certifications or social handles.
- A route-generated XML sitemap and robots.txt; no guessed modification dates.
- Static redirects for legacy WaterWayz and marina-PMS URLs. Unknown pages and
  the alternate design preview are noindex. The GitHub Pages workflow preserves
  generated pages and 404.html instead of replacing the latter with the homepage.
- Existing favicon sizes, an Apple touch icon and a browser-display web manifest.

There are no distinct translated URLs yet, so the former four-language hreflang
links pointing to the same page have been removed. Indexed content and metadata
are English. Public social-account links and verification tokens should only be
added when actual owned accounts/tokens are supplied. Search Console submission
and external social-preview cache refreshes require those respective services;
they are not represented as completed by this code change.

## Verification

`npm test` covers audience journeys, catalog selection/history/filtering, shared
navigation, marina-to-LiDAR access, theme persistence/system changes, metadata and
the lightbox hydration regression. `npm run test:seo` checks the existing `dist/`
build without rebuilding: real body content, one H1, unique titles/descriptions/
canonicals, social tags, parseable schema, sitemap parity, redirects/noindex,
internal destinations and local assets including social image dimensions.

Browser checks cover the production build, desktop/phone layouts, appearance,
flags, menus, breadcrumbs, product selection and direct guide loads. The 3D survey
viewer remains a larger separately loaded chunk. Field performance and actual
search rankings must be measured after deployment.

Implementation references: [Vue SSR and SSG](https://vuejs.org/guide/scaling-up/ssr.html),
[Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[Open Graph protocol](https://ogp.me/).
