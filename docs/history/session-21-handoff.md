> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-21-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 21 Handoff — Discover filter redesign shipped (aesthetic-chore session); carry-forward item since S13 finally closed

> **Session type:** Execution (Claude.ai planning/review + Claude Code execution in Cursor). A deliberate one-session aesthetic chore, not tutorial work.
> **Date:** 2026-07-15
> **Repo/DB state at close:** main at **`b5caa2d0`** (PR #31, squash; +353 / −230, 3 files). Production verified live against that exact sha on launchpadhq.io (deployment `dpl_CmUVNpKiS8FBvvCuucAB1gnWn51c`, `target: production`, READY, `aliasError: null`, apex + www bound). **DB untouched — no schema, data, or Prisma work this session.** Tutorials remain static TS in `src/data/tutorials/*`; dormant DB models still unwired. Tutorial count unchanged at **19 live**.

---

## What shipped — the Discover filter redesign

The five stacked filter control rows on the Discover page (20-category chip wall + cost + skill + app/access + sort — ~6 rows above any tools) are replaced by a **single compact control bar of native `<select>` dropdowns**, plus a server-rendered removable-pill row and a filtered result count. This is the carry-forward "Discover filter redesign" that has sat on the deferred list since **Session 13** — now done and off the list.

**Final shape:**
- Four facet dropdowns in one row, **Category leading** (leftmost, wider — it's the primary browse axis), then Cost, Skill, App-availability. **Sort right-aligned** on the same row at desktop; flush-left on its own row at mobile.
- Native `<select>` per facet. On mobile these fire the **OS picker** (full-screen, dark, counts preserved) — a better mobile experience than any hand-built sheet.
- **Active-filter pills + "Clear all"** below the bar, server-rendered `<Link>`s (each pill's href is `buildDiscoverQuery` minus that one param). No pill for sort (it's a mode, not a filter).
- Header count went **reactive**: "Browse 170 vetted tools…" unfiltered → "Showing N tools" filtered, with a graceful honest empty state ("No platforms match your filters. Clear filters") at N=0.

**Files (3):**
- `src/lib/discover-filters.ts` — **new.** Extracted shared URL contract: `buildDiscoverQuery`, `normalizeSort`, `COST_TIERS`, `DIFFICULTIES`, `DIFFICULTY_FILTERS`. CC chose `src/lib/` over colocation so any future non-Discover consumer can import it.
- `src/app/(app)/discover/discover-filter-bar.tsx` — **new.** The `"use client"` bar. Imports the shared module; emits URLs via `router.push(url, { scroll: false })`. **This is the first client component + first filter React interaction the Discover page has ever had** — it was 100% server-rendered `<Link>` navigation before.
- `src/app/(app)/discover/page.tsx` — modified. Chip rows → `<DiscoverFilterBar>` + server-rendered pills + reactive count.

---

## THE architectural decision: native `<select>`, not a custom/Radix dropdown

The recon (Session-21 pre-build) surfaced the fact that reshaped the whole plan: **the filter UI was 100% server-rendered `<Link>`s with zero client JS, zero React state, and essentially no UI primitives on the shelf** (the entire `src/components/ui/` folder is one hand-rolled tooltip; no Radix, shadcn, Headless UI, cmdk — the stack is deliberately constrained). So the original Session-13 sketch ("Filters button → floating popover on desktop, slide-up sheet on mobile") would have meant **hand-building the first popover primitive** (state, outside-click, focus, collision, a11y) — the exact scope-creep shape this session was supposed to guard against.

**Decision path:** native-first, evaluate on the real preview, upgrade to Radix only if the preview fell short. It didn't. Native held on both widths.
- **The risk I hedged against — OS-light option list crashing into the dark theme — did not materialize.** Modern Chromium renders the native popup dark; adding explicit `color-scheme: dark` made that **deterministic** rather than incidental (see below).
- **The one cosmetic price of native:** the open list's selected-row highlight is **OS-accent blue, not brand orange**. Only visible on the open list's hovered row. Judged not worth a dependency. **If that ever nags, that's the day to reconsider Radix — and Radix is the correct upgrade (it's the shadcn foundation, seeds all future custom controls), NOT a hand-rolled popover.**

**Research backing (Baymard / NN-g / Algolia, searched this session):** horizontal filter bars are the right pattern for **few facets** (Baymard ceiling ~6–8 filter types; we have 4 + sort). The single-"Filters"-button idea was actively warned against — *don't hide critical filters behind icons/tabs on desktop*. So separate visible dropdowns (Zach's own instinct) beat the Session-13 sketch on the evidence, not just on taste. Active pills + Clear-all and a visible result count are documented table-stakes; both are now in.

---

## Guards preserved verbatim (the real engineering risk, and it held)

The whole reason for the extract-first step: a from-scratch filter rebuild is how PR #18's hardening gets silently dropped. It didn't. All confirmed **behaviorally at runtime**, not just asserted:
- **Enum whitelists** — `?cost=banana` → silently ignored, HTTP 200, no throw, no pill.
- **`cost=free-tier`** synthetic value → `{ in: ["FREE","FREEMIUM"] }`.
- **`difficulty=advanced`** → `{ in: ["ADVANCED","EXPERT"] }`; `EXPERT` stays whitelisted (hand-typeable) but is **not offered as an option** (deliberate, pre-existing — not a regression).
- **`normalizeSort`** collapses non-`alpha`/`recent` to `popular`; `buildDiscoverQuery` omits falsy params and never writes `sort=popular`.
The client bar only **emits** URLs; the server still does all parsing/guarding. `discover-filters.ts` is the single source of truth for the URL contract.

---

## Touch-ups applied post-first-pass (all in `discover-filter-bar.tsx`, commit `05d007b6`, pre-squash)

1. **`color-scheme: dark`** — was set NOWHERE (globals.css only swaps CSS vars via `prefers-color-scheme`, so native popups inherited OS theme). Added as Tailwind `[color-scheme:dark]` **on the five selects, not `:root`** — deliberately scoped so it doesn't repaint every native control site-wide. Correct restraint.
2. **"All devices" → "Any access"** — the app-availability facet is Has app / Mobile web (availability, not device type). Default label only; `app`/`web` param untouched.
3. **Mobile sort alignment** — `ml-auto` → `sm:ml-auto` so sort is flush-left on mobile, right-aligned desktop.
4. **Category truncation** — `truncate` on the shared trigger class (inert on short labels). Ellipsis renders on Chromium/Firefox; graceful clip fallback on any engine that ignores it (no per-browser special-casing). Zach confirmed "AI Coding & Development" shows full/clean on his preview.

---

## Workflow refinement established this session (carry into all future sessions)

**CC owns the merge AND the post-merge deployment verification — not just the pre-merge branch work.** Previously the `gh pr merge` + "merged ≠ live" deployment poll was described as a manual step between tools. From now: when preview review passes Zach's gate, the merge instruction goes to CC as a prompt, and **CC executes the squash and polls the deployment to READY / `aliasError: null` / matching-sha before reporting.** This chat owns the merge *decision*; CC owns the merge *execution + verification*. Merge-prompt template used this session is the pattern to reuse.

**Sub-lesson (idempotent git ops):** CC's `gh pr merge 31` returned "already merged" (the squash had landed on an earlier interrupted attempt). This is **not a failure** — because verification was done against true `main` HEAD independently, not against the assumption that this specific command did the merging. Pattern: an idempotent-looking git op reporting "already done" is fine as long as the resulting state is independently verified.

---

## Merge ritual (held, as always)

`gh pr merge 31 --squash --delete-branch=false --subject "Redesign Discover filters into compact dropdown bar (#31)"`. Verified by matching `githubCommitSha` (`b5caa2d0`) on a real `target: production` deploy at READY + `aliasError: null` + apex/www bound. Branch `feature/discover-filter-bar` **retained** (deliberate-retirement pattern; candidate for the next batched cleanup sweep). Squash sha ≠ branch commit `05d007b6`, as expected.

---

## Carry-forward (updated)

**Closed this session:**
- ~~**Discover filter redesign**~~ — DONE + live (since S13). Drop it.

**Still owed / unchanged:**
- **Tutorial pipeline is the primary workstream.** Next real batch: **10–15 pages, slate TBD** (method proven at 10). Candidate spread per S20: a 2nd automation/recipes tool, more verticals (research, design-adjacent, avatar/video, writing), and the uncovered API/dev siblings (Anthropic API, Hugging Face, Replicate). Research pass → rigid brief (no backticks around pitfall titles); get slate blessed before sinking research time.
- **Jasper dedup** Neon dry-run — script merged, unrun (deliberate hold; defaults to LIVE, pass `--dry-run`, Neon branch first).
- **Clerk** still on Development instance — pre-paywall prereq (Production-instance migration).
- **Paywall launch prereqs:** LLC (~30 days before enable) → business banking → production Stripe (raw SDK, Clerk auth-only) → paywall enable. Not yet enforced; site in friends-and-family/open mode.
- **CLAUDE.md Tier 3 lean-down** (optional, gates nothing) — recon pass on strategy prose → pointers. Fold in the filename-convention one-liner (slug ≠ platformSlug now on Otter, Canva AI, Perplexity — three divergences).
- **Maintenance cadence layer** — worth planning soon (19 pages; Tier-A pages like Cursor have real re-check dates — Cursor's Anysphere/SpaceX close is a Q3-2026 trigger). `changelogUrl` staleness detection was pre-provisioned for this. Build the Cron + suggestion layer once ~20+ deep pages exist.
- **For You news feed + deeper personalization** — gates the paywall flip; own design session near launch (human-in-the-loop, not automated publishing).
- **Catalog Overview-card metadata freshness** pass someday (separate workstream from tutorials).
- Build time was ~146s on the S20 batch deploy — watch if it trends toward a timeout; not chased.

**New minor note this session:**
- **Dropdown category counts are total-per-category, filter-independent** (unchanged, pre-existing). Making them reactive to other active filters is an N-query behavior change — deliberately out of scope, flagged if ever wanted.
- **First client component on Discover now exists** (`discover-filter-bar.tsx`) — the page is no longer purely server-rendered. Relevant if future Discover work assumes the old all-`<Link>` model.

---

## Designated first actions next session (in order)

1. **Back to tutorials — decide next batch size + slate** (10–15; sizing is a review-capacity call). Get the slate blessed before research.
2. **Research pass → rigid brief** for the chosen slate (same proven method; no backticks around pitfall titles).
3. Optional low-urgency: **Tier 3 CLAUDE.md lean-down** + fold in the filename-convention line.

This session was a deliberate, scoped aesthetic break between tutorial batches — executed as a single contained session with a hard scope boundary (control bar only; nothing below it touched), which is exactly the sanctioned way to spend a session on polish without it becoming the pattern. Back to substance (tutorials) next.
