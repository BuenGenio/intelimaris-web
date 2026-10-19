# Fleet management — DEV-1087

Fleet management joins the existing markets through `/fleet-management`, the
`fleet-management` audience guide and capability page. `/demo/fleet` is the public
operations demonstration. Header, mobile menu, footer, homepage, role chooser,
owner guide, contact handoff, demo index, breadcrumbs and generated sitemap all
lead to the new market without replacing the other audience journeys.

The same console appears on the fleet landing page, demo, homepage, account app-screen gallery and relevant
guides. It uses six fictional vessels across company, rental, freight, logistics
and safety operations. The user can select vessels on the satellite map or
register, search jobs/destinations, filter operations or attention, zoom, pause and
reset. The reported track and illustrative onward route are visually distinct.
Speed, course and report age belong to the selected vessel. Playback runs at 12×;
the stale vessel never advances, its last speed stays explicitly historical and
its report ages. Reduced-motion preferences start playback paused.

This is a browser-local simulation, not AIS or a live operations feed. It reuses
the existing Fort Lauderdale playbook basemap. No new imagery, remote feed,
tracking provider or dependency was added. The public experience makes no rental
booking, cargo dispatch or emergency dispatch claim. `APP_URL` remains the single
source for the connected app host; “Open your fleet” leads to its `/fleet` route.
The app’s 15-second snapshot refresh does not imply that every vessel reports at
that cadence. Per-vessel source timestamps and authorized workspace access remain
the basis for live visibility.

Verification: focused model and component tests cover physical replay progress,
frozen stale fixes, arrival, combined filters, map/register selection, empty
recovery, pause and reset. Existing route, audience/contact, shared navigation and
SEO tests cover the new entry points. `npm run build` type-checks, pre-renders and
audits the static site. Desktop and 390px phone browser checks exercise selection,
filters and the stale-report detail; the phone layout has no horizontal overflow.

Deployment follows the existing GitHub Pages workflow on `main`, using the custom
domain in `public/CNAME`. Local success is not evidence of public deployment.
