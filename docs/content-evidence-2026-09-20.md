# Content evidence — 20 September 2026

Product paths below are relative to the `InteliMaris/workspace` repository, reviewed at commit `88677bb9e5cc633d6d48e41cded144f02f2ef995`. Website paths are relative to `BuenGenio/intelimaris-web`. Source was favored over older completion summaries when they disagreed. This is a content evidence register, not a deployment certification.

## Product evidence

| Subject | Source locations | Editorial consequence |
| --- | --- | --- |
| Workspace model, roles and permission scope | `packages/shared/src/workspace.ts`, `permissions.ts`; `docs/workspaces/{vessel,marina,private-marina,business,maintenance,accounts}.md` | Nine website audiences map onto five workspace kinds. Readers need clear invitations/access context, not internal permission names. |
| Passage and map | `apps/web/src/screens/workspace/map/`; `services/bins/route/`; `packages/shared/src/` routing and map modules | Vessel-aware inputs, route results and supported layers exist. Data coverage, inputs and freshness remain material. |
| Sensors and history | `apps/web/src/screens/workspace/Monitoring.tsx`; vessel sensor screens; `services/bins/sensors/` | Show readings and age together. Hardware, gateway and uplink determine remote visibility. A prediction view does not validate every model. |
| Fleet | `apps/web/src/screens/Fleet.tsx` | Consolidated fleet view imports fixtures and displays a sample badge. Multiple vessel workspaces are the code-backed account story. |
| Marina workflows | `apps/web/src/screens/workspace/marina/pms-map.ts`, corresponding marina screens | Berths, stays, arrivals/departures, customers, rate cards, resident absences, duty roster/chat/incidents exist; finance, full boards and reporting have gaps. |
| Service engagements | `services/bins/workspace/src/engagements.rs`; `packages/shared/src/workspace-remote.ts` | Either party proposes, the other accepts; company assigns technicians; ending an engagement withdraws grants. |
| Maintenance | `apps/web/src/screens/workspace/maintenance/{Dashboard,Work,Technicians,Company}.tsx`; `screens/workspace/vessel/Maintenance.tsx`; `packages/shared/src/maintenance.ts`; `services/bins/maintenance/` | Date and engine-hour reminders, service records, work orders and company worklist support a substantive service-company guide. |
| Dock Pass and private docks | `apps/web/src/screens/workspace/dockpass/{DockpassSearch,NewBooking,BookingDetail,ListingDetail}.tsx`; private-marina screens; `packages/shared/src/dockpass.ts` | Request, confirmation and stay differ. Listing edit/pause/retire controls are pending; no payment/payout promise. |
| Business listing and reports | `apps/web/src/screens/workspace/business/{Listing,ListingEditor,FuelPrices}.tsx`; `packages/shared/src/dock-and-dine.ts` | Approved ownership precedes editing. Fuel reports have age; factual reports differ from reviews. Courtesy berth holds are timed/unpaid and separate from overnight bookings. |
| Hazards | `apps/web/src/screens/workspace/map/Hazards.tsx` | Viewing is implemented; report/confirm/clear web actions remain pending. Website rerouting demo is a local simulation. |
| Emergency | `apps/web/src/screens/workspace/map/Emergency.tsx`; `packages/shared/src/emergency.ts` | Device position, freshness, copy and vessel-name context exist; no distress broadcast or responder dispatch. |
| Recorded survey imagery | `pipeline/surveys/README.md`; `packages/shared/src/surveys.ts`; `apps/web/src/screens/map/SurveyGroundTabs.tsx` | Prepared surveys can be shown as imagery on supported maps. Coverage requires a served survey bundle. Imagery is not live occupancy or measured underwater depth. |
| Broader inventory | Root README and project manifests; `docs/interface-inventory.md`, `docs/workspace-completeness-review.md`, feature/signoff inventories; web, mobile, admin, shared packages, Rust services and regional pipelines | Used to locate customer workflows and spot implementation gaps. Operational tools and planned interfaces are not treated as customer release claims. |

## Website and demonstration evidence

| Experience | Website source | Data and behavior |
| --- | --- | --- |
| Passage planner | `src/components/playbook/PassagePlanner.vue`; `src/data/playbook/waterRouter.ts` | Local simplified water model, sample vessel inputs and illustrative constraints. |
| Aging reading | `src/components/playbook/AgingReading.vue`; aging-reading model | Sample values, accelerated time, sensor/link controls, illustrative prediction. |
| Berth fit | `src/components/playbook/BerthFit.vue`; berth-fit rules | Sample vessel limits, dates, occupancy and approach records. |
| Draw your water | `src/components/playbook/DrawYourWater.vue`; draw-your-water model | Local layout editing and sample day-board state changes. |
| Hazard rerouting | `src/components/playbook/HazardReroute.vue`; hazard-reroute plan | Local sample reports, confirm/clear states and rerouting. No submitted public reports. |
| Orbit the scan | `src/components/playbook/OrbitTheScan.vue`; orbit-the-scan scene | Recorded Halifax Harbor point cloud with separate illustrative Bahia Mar berth overlay. |
| Conditions | `src/components/playbook/WaterRightNow.vue`; `src/data/playbook/water-right-now.ts` | Six marina presets, NOAA predictions, NWS observations and calculated sun times. Feed availability varies. |
| Helm view | `src/components/playbook/HelmView.vue`; helm-view scene | Animated sample passage, camera changes, layers and marina card. |
| Screen explorer | `src/components/playbook/AppScreens.vue`; `src/data/screens/` | 188 redrawn screens with sample data, including unfinished and internal screens. |
| Full survey viewer | `src/views/DemoMarinaView.vue`; `src/components/demo/LasViewer.vue` | Real recorded scan displayed in height/intensity/derived-structure modes; source/location notes on the page. |
| Four-stage voyage | `src/components/v2/VoyageSection.vue`; `src/data/voyage.ts`; `src/data/voyage-bahia-mar.json` | Stored passage dataset. Source comments identify router capture; this review does not independently validate historical track or measurements. Public copy calls it a recorded sample replay. |

The existing brand story, hardware catalog and September 18 content audits were also reviewed to preserve useful positioning and product distinctions. The website's own sign-up handoff was retained; the product repository's incomplete phone-login scaffold was not taken as proof that the separate website handoff is unavailable.
