# Audience-first marketing site

English-first rewrite, 18 September 2026. See `content-reconciliation.md` for the
subsequent comparison with the supplied Final Architecture v2.0 review. Source of product facts: the local
InteliMaris platform repository at `/home/buengenio/Projects/workspace`.
“Implemented” here describes reviewed product code, not a verification of a
particular production deployment, data provider or hardware installation.

## Audiences and product access

Marketing preferences never grant account or workspace permissions. The browser
stores only a public audience slug. Deep links take precedence over that stored
preference. Visitors can switch audience, clear the preference or browse every
capability without selecting a role. Direct `/for/...` pages are public guides.

| Public guide | Product basis |
| --- | --- |
| Captain / navigator | Vessel workspace, owner/admin and operational access |
| Passenger / guest | Invited read-only workspace access; no separate passenger role or public tracking-link product |
| Crew member | Vessel member, labeled Crew |
| Vessel / fleet owner | Account containing separate vessel workspaces; consolidated fleet screen is sample data |
| Marina owner / operator | Marina owner/admin |
| Dockmaster / marina team | Dockmaster, front desk, accounts, auditor, staff/member and viewer |
| Maintenance / technician | Maintenance company; vessel technician via active engagement and assignment |
| Private dock owner | `private_marina` workspace |
| Waterfront business | `business` workspace; member is labeled Editor |

Sources: `packages/shared/src/workspace.ts`, `accounts.ts`, `permissions.ts`,
`doors.ts`, and `apps/web/src/screens/Fleet.tsx`. The canonical five workspace
kinds are vessel, marina, private_marina, business and maintenance. A captain,
passenger or fleet is not invented as a sixth workspace type. Insurers and
investors remain general contact options, not fabricated product workspaces.

## Capability evidence and important qualifications

- **Navigation / passage planning:** `apps/web/src/screens/TravelMap.tsx`,
  `screens/map/MapSearchPanel.tsx`, `PassagePlanner.tsx`, `RideAlong.tsx`.
  Choose/swap both ends, vessel dimensions, service-computed constraints,
  refusals and route-clock playback. Unknown values are not safe values.
- **Hazards:** `apps/web/src/screens/workspace/map/Hazards.tsx` explicitly says
  read is connected while submit, confirm and clear remain pending (DEV-140).
  The guide separates available reading from reporting under development.
- **Marina / PMS:** `apps/web/src/screens/workspace/marina/pms-map.ts` is the
  availability inventory. Dashboard, arrivals, layout, staff, chat, events and
  incidents have implementations. Resident agreements, rates and customer
  workflows have partial areas. Calendar/board, finance, correspondence,
  reports and several operations/settings destinations remain incomplete.
  Existing route names alone are not evidence of an implemented workflow.
- **Dockage:** `screens/workspace/dockpass/{DockpassSearch,NewBooking,
  BookingDetail,ListingDetail}.tsx`, marina arrivals/stays and private-dock
  workspace surfaces. A request is not a confirmation; a directory listing is
  not proof of availability. No blanket payment or instant-book guarantee.
- **Maintenance:** `screens/workspace/maintenance/{Dashboard,Work,
  Technicians,Company}.tsx`, `screens/workspace/vessel/Maintenance.tsx` and
  shared engagements. A service company assigns its own technicians; access
  is to the service view, not the private crew view. Marina site maintenance
  and integrated accounting are separate, unfinished PMS workflows.
- **Monitoring:** vessel monitoring/sensor screens and shared permission doors.
  LoRaWAN still needs compatible hardware, gateway/uplink and coverage. Fleet.tsx
  imports fixtures and displays SampleBadge; no claim of a live fleet overview.
- **Business:** `screens/workspace/business/{Listing,ListingEditor,FuelPrices}.tsx`.
  Claim approval precedes editing. Business courtesy berths do not imply access
  to commercial-marina resident management.

## Website structure

- `src/data/audiences.ts`: the nine audience guides, copy, feature order and
  contact intent. Keep customer-facing prose here.
- `src/data/capabilities.ts`: eight capability guides, available workflows,
  limitations and related links. `/marinas` remains the canonical PMS URL.
- `src/data/solutions.ts`: six connected-system and developing-capability guides,
  including the existing InteliBilge route.
- `src/composables/useAudience.ts`: validated, optional local preference; public
  URL context. Storage exceptions do not break the flow.
- `HomeView`: chooser, immediate preview and reordered capability content.
- `AudienceView`: role-specific guide, workflow, access explanation and contact.
- `CapabilityView`: capability workflow, actual screenshots and availability.
- Updated WaterWAYZ, software, about, contact, navigation and footer. Existing
  hardware, catalog, product and technology-demo routes remain reachable.
- Old `/inteliwaterwayz` redirect is preserved. Legacy home contact/WaterWAYZ/
  capabilities anchors redirect. Unknown routes have a recovery page.
- Contact form prefills role and topic, remains editable and uses the existing
  endpoint/mailto transport. Selecting a role sends no contact request.
- New pages are in English by request. Existing translations remain; other
  locales see an English-guide notice. New content uses `lang="en"`.
- Shared breadcrumbs on all inner pages provide Home and section links, with
  the current page marked for assistive technology.
- Per-route titles/descriptions/canonical URLs and sitemap entries are included.
  The subsequent SEO update pre-renders the complete English page inventory at build time;
  see `docs/seo-and-navigation.md` for the production pipeline and checks.

## Validation

`npm run type-check`, `npm run build-only`, `npm test`.

Flow tests cover every choice, history/deep-link precedence, invalid input,
blocked storage, editable contact context without submission, guide image
updates and truthful hazard availability. Router tests cover all public guide
and capability links and unknown-route recovery. Desktop and phone browser
checks cover role selection, guide navigation, context, menu, theme and layout.
