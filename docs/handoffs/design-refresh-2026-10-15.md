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
- A final `next start` process was also started. The in-app browser failed to reconnect after the dev-server shutdown, so production-mode browser verification is not claimed. Final HTTP page/asset checks are reported in the chat/tool record. Owner Vercel-preview verification is still required before merge.
- Local dependency installation is Next 16.2.2 while current main declares 16.2.11. No install was performed per repository instructions. The Vercel preview should verify the lockfile-selected environment.

## Assets

Local decorative art and exact built-in-generation prompts: `public/images/launchpad/README.md`. Three optimized JPEG assets, about 216KB total. The static proxy matcher does not exempt WebP, so JPEG avoids changing auth routing. Research/automation visuals use lightweight CSS and existing Lucide icons.

Official logo sources are recorded in `public/images/platforms/README.md`. Coverage is incomplete by design; additional logos can be added without altering the component contract. No generated vendor logo substitutes are used.

## Requires owner verification

- Review a Vercel preview with its current catalog and queued editorial work reconciled.
- Review signed-in save/account behavior; this session checked signed-out controls and left auth/moderation code unchanged.
- Check keyboard focus, long platform names, and the longest free-plan disclosures with production data.
- Decide final approval to merge. Nothing should be merged or published automatically.

## Self-assessment and corrected guidance

The implementation is a responsive translation of approved concepts, not a pixel-identical image. Decorative asset compositions differ slightly, and existing real content is retained instead of mockup sample copy. `START-HERE.md` now records the existing test suite and the owner's expanded palette approval in its correction ledger. Its older current-state claims remain historical. Catalog facts were reused, not newly researched; this is not a content freshness audit. No new environment variables are needed.
