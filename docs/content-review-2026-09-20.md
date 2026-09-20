# Role content and demo review — 20 September 2026

This update expands the existing site rather than replacing its audience structure. All nine role-switcher choices, public guide URLs and contextual contact links remain. Selecting a website role is a browsing preference, not an application permission.

The product review used `/home/buengenio/Projects/workspace` at `88677bb9e5cc633d6d48e41cded144f02f2ef995`. The website baseline was `7a2279b93baa3a4c332500ab98230db05801ab42`. Source, implementation inventories and the existing live demos were checked together. Repository implementation is evidence of a workflow, not proof of worldwide coverage or a particular customer's production configuration.

## What was worth keeping

- “Your day on the water, connected.” The existing promise works across people aboard and on shore.
- The crew, marina-owner, dock-team, maintenance, private-dock and waterfront-business headlines. They describe recognizable needs without requiring technical vocabulary.
- The existing role chooser, shared guide layout, capability pages, hardware catalog, team biographies, brand story and footer promise.
- The existing distinction between core marina work and unfinished finance/planning features, between a berth request and confirmation, and between emergency information and actual dispatch.
- All working demo engines. The changes explain their controls, purpose and data, and improve discovery.

## What changed

| Role | Expanded story | First demo |
| --- | --- | --- |
| Captain / navigator | Vessel dimensions, route constraints, unavailable information and arrival details | Passage planner |
| Passenger / guest | Destination discovery, local conditions and invitation-based access | Conditions near a marina |
| Crew member | Shared vessel information, reading freshness, upkeep and private crew conversations | Aging sensor reading |
| Vessel / fleet owner | Separate vessel records, people, monitoring and date/engine-hour upkeep; fleet overview remains sample data | Aging sensor reading |
| Marina owner / operator | Layout, stays, resident absences and permission to offer a berth, customers, rates and staff | Draw a dock and work the day board |
| Dockmaster / marina team | Shift preparation, vessel fit, assignment, approach and handover | Berth fit |
| Maintenance / technician | Accepted service relationships, technician assignments, access boundaries and cross-vessel work | Company worklist in the screen explorer |
| Private dock owner | Berth description, requests, confirmations, co-host access and arrival details | Dock layout |
| Waterfront business | Approved claims, listing information, fuel-price freshness, factual reports and courtesy dockage | Business listing in the screen explorer |

The demo directory at `/demo` now covers nine interactive journeys, the full point-cloud viewer and the four-stage passage replay. Each card links to a working embed. The directory is linked from the platform menu and footer. Role guides include a direct demo action and related experiences. Longer role and demo headings wrap at readable sizes on phones, instead of shrinking to body-text size. Maintenance and business presets are passed into the existing explorer and reset when the role changes.

## Claims corrected or clarified

- The homepage no longer labels hazard submission/rerouting as a live released community workflow.
- The animated helm passage is an example, not a live vessel feed. Its emergency controls do not send an alert.
- Passage-planner depths, bridge limits, berth occupancy and approach examples are explicitly illustrative.
- Sensor values and predictions are simulated; the prediction example is not evidence of a validated analytics service.
- The real Halifax Harbor scan and the separate Bahia Mar berth overlay are identified before the interaction.
- NOAA tide predictions, NWS observations and calculated sun times are distinguished. Nearby station conditions may differ from the berth.
- The screen explorer is a product preview including unfinished features, not a release inventory. Its operator console is internal administration.
- Individual vessel workspaces are distinguished from the sample consolidated fleet screen.
- Private-dock edit/pause/retire controls and payments/payouts are not presented as finished.
- Recorded survey imagery is now supported in the product where a prepared survey bundle is available. The previous blanket description of all map integrations as future concepts was stale. Automated occupancy analysis remains developing.
- Either side can propose a service engagement; the other accepts. The old maintenance capability text described only the owner starting it.

## Editorial and implementation notes

`src/data/audiences.ts` owns role copy, metadata, demo leads and screen presets. `src/data/playbook/journeys.ts` owns shared demo descriptions and data notes. `JourneyDisclosure.vue` presents those notes on guides, the homepage and the playbook. Existing navigation/canvas behavior remains in its original components.

English remains the language of these guides, with the site's existing language notice. Existing translations, hardware specifications and press releases were not comprehensively rewritten. No production feature, hardware installation, model validation or worldwide routing/booking availability is inferred from a marketing demo.

The earlier September 18 audits remain historical records; this document supersedes their survey-integration status and adds demo-specific review. See [the evidence register](content-evidence-2026-09-20.md) for source locations.

## Validation

- 129 tests pass across 19 files, including role selection, history, guide reuse and service/business demo preset changes.
- TypeScript checks pass.
- Production build pre-renders 53 indexable pages and verifies metadata, structured data, local assets and internal links.
- Browser review checks service-to-business role changes, demo presets, disclosures and the passage planner’s bridge-clearance refusal. Phone review at 390 pixels confirms readable role headings and a single-column workflow layout. All 28 demo anchor links across the directory and nine guides resolve to prerendered targets.
- Audience navigation tests stub the canvas stage so asynchronous demo imports cannot continue after test teardown. Demo model tests and browser checks remain separate.
