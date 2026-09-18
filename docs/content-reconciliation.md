# Website content reconciliation — 18 September 2026

Reference: **InteliMARIS Website Review & Recommended Improvements / Final
Architecture v2.0**, supplied as `91826 InteliMARIS_Website_Review_Final_Architecture_v2.0.pdf`
(8 pages). This document is editorial input, not an independent confirmation of
production availability, certification, trademark registration or a release date.

## The combined direction

**Your day on the water. Connected.**

Plan the passage. Keep an eye on the vessel. Prepare the arrival. InteliMARIS
brings it together through WaterWayz. Choose your role to start with the work
that matters to you.

The homepage keeps the user's audience-first requirement. A concise promise
precedes the nine-role chooser; role selection changes the preview, relevant
capabilities and contact intent. A large real WaterWayz view follows it. The
homepage then introduces connected systems and explains the ecosystem without
turning into a hardware specification sheet.

## What was retained, added and reconciled

| Area | Combined website direction |
| --- | --- |
| Audience journeys | Keep all nine code-backed guides, public deep links, optional remembered preference and contextual contact. Choosing an audience never grants product permissions. |
| Consumer promise | Use the PDF's connected-boating idea, direct benefits and specific CTAs. Keep detailed workflows on their dedicated pages. |
| Brand architecture | InteliMARIS is the public marine brand of InteliMarine LLC; WaterWayz is the boater-facing experience. PWTS, InteliBilge and InteliBMS are connected-system families. |
| Radio and software | MX MariWavz is specifically the radio network. The technology Stack is software/data infrastructure; developing AI belongs there. Gateway, uplink and compatibility still matter. |
| WaterWayz | More prominent on the homepage and in navigation. Navigation, passage planning, monitoring, discovery and arrival workflows connect through the product guides. |
| InteliMarina + Dock Pass | Pair the consumer arrival story with real marina/PMS workflows. Existing dashboard, layout, arrivals and staff functionality is retained; finance, planning boards and other gaps stay explicit. No universal live inventory, instant booking or payment promise. |
| Emergency Assistance | Dedicated capability page. The implementation supports device coordinates, age, copy control, vessel name and communication references. Rich vessel information packs, landside access routes and responder integrations are proposed rather than presented as operational. No dispatch claim. |
| PWTS / InteliBMS | Add dedicated system overviews linking to the existing hardware catalog and monitoring workflow. Treat battery estimates, model predictions and measurements distinctly. |
| InteliBilge | Replace cloud-AI pump-control and guaranteed flood-prevention language with local hardware/firmware configuration plus connected awareness. Detailed catalog pages remain reachable. |
| Developing intelligence | Explain Monitor → Analyze → Detect → Assess → Inform. The current monitoring view supports prediction provenance; broad anomaly detection, maintenance intelligence and contextual recommendations still require validation. |
| Drone / geospatial | Add a dedicated Pilot Byte collaboration overview with a link to the real survey demo. Preserve the fact that the demo uses Halifax Harbor LiDAR alongside Bahia Mar sample listing information. WaterWayz layers, occupancy surveys, access routing and deployable-drone workflows are developing concepts. |
| InteliVision | Add a small, clearly labeled Coming soon / Concept guide. No autonomous docking, availability or delivery-date promise. |
| Product credibility | Keep actual product screenshots, real team biographies and survey provenance. Do not invent signed pilots, testimonials, certifications, patents, range validation or safety guarantees. |
| Trademarks | Normalize WaterWayz and MX MariWavz naming; retain the repository's existing ™ convention. Do not change InteliMARIS to ® solely on the basis of the PDF. |
| Breadcrumbs and discovery | Shared accessible breadcrumbs remain on inner pages. New pages have route metadata, sitemap entries and relevant cross-links. |

## Source checks beyond the first audience audit

- `apps/web/src/screens/workspace/map/Emergency.tsx` and
  `packages/shared/src/emergency.ts`: actual emergency information tools;
  nearby-vessel broadcast is explicitly not built.
- `apps/web/src/screens/workspace/Monitoring.tsx`: real channel readings,
  history, freshness and a predictions view carrying model/version/time.
  This is not proof that all proposed analytical models have been deployed.
- `apps/web/src/screens/workspace/marina/pms-map.ts`: retain granular current
  and developing PMS status instead of labeling the entire marina product as
  either complete or unavailable.
- Existing website survey demo and its provenance text: real survey data,
  location mismatch disclosed, no live-feed claim.
- Existing hardware catalog: preserve product identifiers and detailed catalog
  access; remove unsupported AI safety, fuel-accuracy and bundled-subscription
  promises. Installation specifications still need confirmation from the team.

## Scope and remaining evidence needs

This is an English-first content and navigation rewrite. Existing translations
remain, with an English notice on the new guides. No product backend, emergency
integration, drone operation or public deployment was implemented by this work.

The subsequent SEO update now pre-renders the English page inventory into static
HTML, including per-page social metadata and structured data. The build verifies
body content, internal links, image assets, canonical URLs and exact sitemap
coverage. See `docs/seo-and-navigation.md`. This is not a field Core Web Vitals
measurement or a guarantee of search-engine indexing.

## Validation

TypeScript and production build; route coverage for all audience, capability and
system pages; existing audience-flow and hardware tests; an additional contact
handoff check for product-family topics. Browser checks cover the revised home,
product-family pages, release-state labels, breadcrumbs and responsive layouts.
