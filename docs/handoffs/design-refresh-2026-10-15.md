# Personable design refresh — 2026-10-15

## State and authorization

- Owner approved the iterated homepage, Discover, and getting-started design, then explicitly requested implementation on a separate branch with no production change.
- Branch: `codex/personable-design-refresh`, based on freshly fetched `origin/main` at `920a722b`.
- Original checkout: `tutorials/batch-2026-09` at `7e443b9b`. No tracked edits at baseline. Pre-existing untracked `.claude/`, `Claude outputs/`, and `docs/planning/` were left alone.
- No database scripts, migrations, environment-file edits, dependencies, auth-policy changes, or production release. No new backup ref needed; original branch and main remain intact.

## Implemented

- Homepage: shared navigation, original headline widened across two desktop lines, rocket medallion, faint stars, broader buttons, generous separation before four aligned goal cards. Colorful creative cards and two illustrated workflow previews follow the approved direction. Counts use existing database helpers.
- Discover: visible search, colorful category shortcuts, native cost/skill/access/category filters, URL-preserving search/filter changes and removal pills, pending navigation protection, two-column desktop cards, and restrained charcoal/gold/orange matching banner. Existing sponsor placement and ordering logic remain intact.
- Shared cards: official local vendor logos where retrieved, existing HTTPS catalog logo URLs where available, neutral initials on missing/failed logos, `Good for…` category labels, real plan summaries with fact-file precedence, source/date links where available, optional paid-plan information. Match score and above-difficulty signals retained. Bookmark controls are siblings of the stretched title link, not nested links/buttons.
- Platform header: logo and company identity, responsive actions and tabs. `Tutorials` is labeled `Getting started`, retaining the existing `?tab=tutorials` URL and conditional visibility.
- Shared tutorial renderer: charcoal/cream/gold hero art, more readable type, quieter section dividers, larger copy controls, responsive prompt layout. All tutorial fields, archetypes, caveats, dates, and content remain intact.
- Global body now uses the already-loaded Geist font rather than overriding it with Arial.

## Protection of concurrent editorial work

The owner relayed another team's concerns about 49 rewritten pages and 41 queued. No `src/data/facts/`, `src/data/tutorials/`, model-data, or workflow-data file is modified. Verdict, Quick facts, Pricing, Technical details, Models, and source sections still render via the existing `PlatformToolOverview`. Save, Prompts, and Discussions are existing wired features, not features introduced by mockups. No auth or moderation behavior was changed.

Potential conflicts are limited to presentation files: `src/app/(app)/platform/[slug]/page.tsx`, `platform-card.tsx`, `platform-detail-tabs.tsx`, `platform-tutorials.tsx`, homepage, Discover, header, and shared CSS. Reconcile any queued template rewrites before merge, preserving the latest fact overlay and editorial content. Do not overwrite these files wholesale from either branch.

## Verification

- `npm run typecheck`: passed.
- `npm test`: 49 passed, including five new search/card regression tests. Tests needed normal shell permissions because restricted Windows account lookup failed before execution.
- `npm run audit:tutorials`: passed across 164 pages and 20 categories.
- `npm run build`: passed after final code/asset changes, with all 47 static pages generated.
- ESLint for all changed TypeScript/TSX files: passed. Repository-wide `npm run lint` remains red with 36 existing errors and three warnings in untouched scripts/components/db/scratch files.
- `git diff --check`: passed.
- Browser checks in `next dev`, signed out: homepage and Discover at 1440px and 390px; guide and overview at desktop and mobile; correct combined `q=claude`, writing category, and free-tier state; empty search/reset; mobile menu navigation; copy-prompt control visibly changed to `Prompt copied`; overview headings retained. No page-width overflow on checked mobile pages; no broken images. Four desktop goal cards measured with identical top (808px) and height (295px) in the checked viewport.
- Saved actual-browser screenshots in ignored `tmp/design-review/`: homepage desktop/mobile, Discover desktop/mobile/empty mobile, overview desktop, guide desktop/mobile.
- A final `next start` process was also started. The in-app browser failed to reconnect after the dev-server shutdown, and page HTTP requests ended in 500 responses through the local Clerk/proxy loop. Direct artwork/logo asset requests returned 200. Production-mode browser verification is not claimed; the local servers started by this session were stopped. Owner Vercel-preview verification is still required before merge.
- Local dependency installation is Next 16.2.2 while current main declares 16.2.11. No install was performed per repository instructions. The Vercel preview should verify the lockfile-selected environment.

## Assets

Local decorative art and exact built-in-generation prompts: `public/images/launchpad/README.md`. Three optimized JPEG assets, about 216KB total. The static proxy matcher does not exempt WebP, so JPEG avoids changing auth routing. Research/automation visuals use lightweight CSS and existing Lucide icons.

Official logo sources are recorded in `public/images/platforms/README.md`. Coverage is incomplete by design; additional logos can be added without altering the component contract. No generated vendor logo substitutes are used.

## Requires owner verification

Draft pull request: https://github.com/stevensonzj-ai/launchpad-hq/pull/59 . Vercel preview was still building at handoff. Initial implementation commit: `bb444d02`.

- Review a Vercel preview with its current catalog and queued editorial work reconciled.
- Review signed-in save/account behavior; this session checked signed-out controls and left auth/moderation code unchanged.
- Check keyboard focus, long platform names, and the longest free-plan disclosures with production data.
- Decide final approval to merge. Nothing should be merged or published automatically.

## Self-assessment and corrected guidance

The implementation is a responsive translation of approved concepts, not a pixel-identical image. Decorative asset compositions differ slightly, and existing real content is retained instead of mockup sample copy. `START-HERE.md` now records the existing test suite and the owner's expanded palette approval in its correction ledger. Its older current-state claims remain historical. Catalog facts were reused, not newly researched; this is not a content freshness audit. No new environment variables are needed.

## Owner-requested Discover refinements

- Restored all five category icons, colored backgrounds and borders for selected/hover states, and visible keyboard focus. URL filtering and pending-navigation protection remain intact.
- Expanded Discover at 100rem and above to three columns in a 108rem container. Browser measurements: 541px cards at 1920px, 534px cards at 1440px (two columns), and one 335px column at 390px. The wide breakpoint uses rem consistently with Tailwind's default breakpoints to preserve cascade ordering.
- Replaced the outline-only rocket with optimized decorative artwork: rocket, restrained clouds, and sparse stars. Hero copy remains unchanged. Homepage and its four goal cards/workflow strip are unchanged in this refinement.
- Added local official-site icons for most catalog entries, with exact source provenance in `public/images/platforms/catalog-logos.json`. Compact runtime index in `src/lib/platform-logo-assets.json`; existing manually selected logos take precedence. OpenAI uses its official organization mark, clearly labeled in the provenance. Generic GitHub hosting icons were discarded. Missing icons retain initials; no vendor marks were generated.
- Public production API returned 221 catalog entries; local app returned 170. Icons were collected through the public API and official websites, without database scripts or data writes. This discrepancy is recorded, not treated as an instruction to sync databases.
- The repeated Grok concerns were rechecked: real fact-file/legacy plan details still appear, the existing `PlatformToolOverview` remains intact, and no editorial fact/tutorial/model/workflow data is changed. Save/Prompts/Discussions predate this PR and are wired existing features, not newly invented UI.
- Verification: typecheck, 49 tests, changed-file ESLint, and audit of 164 tutorials passed. Browser verified category selection/reset, five icons, responsive column widths, and no horizontal overflow at 390/1440/1920. Server returned 200 for category and reset navigation. Actual screenshots: `tmp/design-review/discover-refined-wide.jpg`, `discover-refined-writing.jpg`, and `discover-refined-mobile.jpg`. No broken loaded images in the checked mobile state.
- The previous Vercel preview completed successfully before these refinements. Recheck the new deployment after pushing; nothing is merged or promoted to production.

Final refinement production build passed (47 static pages generated); git diff whitespace check passed.

## Homepage atmosphere and overview design round

Owner requested more visible homepage stars, an optional very faint nebula, more intentionally designed goal emblems, a restrained Discover-header refinement, and an overview closer to the warm illustrated concept.

- Homepage uses brighter sparse star points and low-opacity blue/violet/gold radial haze. These layers are static, decorative, and behind the existing content. Existing hero text, spacing, goal content, and workflow strip remain intact.
- Added `src/components/brand/goal-emblem.tsx`: four coordinated custom SVG mission badges (quill/inkwell, framed picture, orbital compass, and automation circuit). They reuse each goal's existing accent color, are hidden from assistive technology, and contain no external image requests.
- Discover adds a quiet ambient background, eyebrow accent line, and bottom divider. Existing rocket artwork, filters, and three-column wide layout remain.
- Platform overview now has an illustrated warm Verdict lead, four scannable Quick facts tiles, a conditional link to the existing tutorial, a desktop pricing/capabilities pairing, capability chips, and a responsive Technical details grid. The profile heading and Open action also have stronger hierarchy. Guide artwork uses responsive sizes appropriate for wide banners.
- Editorial content, fact citation logic, plan calculations, model sections, and source handling are preserved. No `src/data/`, Prisma, auth, proxy, or dependency changes. The new tutorial link renders only when a registered static tutorial exists. The decorative paper/pen illustration represents the editorial guide, not a claim about a tool's capabilities.
- Presentation components now additionally touched: Verdict, Quick facts, Pricing, Key capabilities, Get it, Technical details, and the overview composition. Any concurrent template work should reconcile these presentation changes while retaining the latest editorial/fact logic.
- Browser checks: homepage at 1440px/390px, four emblems present, no page overflow; Claude overview at 1440px/390px with all expected section headings, no broken loaded images; Anthropic API at 390px retains API pricing, What changed, and Models without page overflow; new guide link opens the existing Getting started tab. Discover header verified at 1440px. Screenshots are in ignored `tmp/design-review/`: `home-personable-desktop.jpg`, `home-personable-mobile.jpg`, `overview-personable-top.jpg`, `overview-personable-desktop.jpg`, `overview-personable-mobile.jpg`, and `discover-personable-header.jpg`.
- Initial local Claude route returned a stale 404 while the public catalog API still listed the record. Stopped the server, moved the resolved `.next/dev` cache aside, and restarted; the catalog link and subsequent direct profile navigations rendered normally. The saved cache is at ignored `.next/dev-cache-before-overview`. Initially keeping it under `tmp/design-review/` caused TypeScript to include a malformed generated route declaration in the build; moving the cache under `.next/` removed that stray build input. No app logic or database changes were needed.
- Validation: 49 regression tests passed (including overview field uniqueness), changed-file ESLint passed, tutorial audit passed for all 164 registered pages, and whitespace checks passed. Production build result recorded below.

Final production build passed, including TypeScript and all 47 static pages. Previous Vercel deployment was successful and PR #59 remained draft/mergeable before this round was pushed. Updated preview requires its own deployment review.
