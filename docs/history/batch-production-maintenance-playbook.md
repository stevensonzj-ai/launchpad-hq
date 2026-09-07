> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `batch-production-maintenance-playbook (1).md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Batch Production & Maintenance Playbook — Tutorial Pages

> **Created:** 2026-06-24 (Session 16)
> **Status:** Design agreed in principle. NOT yet executed — two hard prerequisites gate first use (see end). Stands alongside `tutorial-template-spec.md` (the per-page format) and the Fable playbook (async batch jobs).
> **Purpose:** How to produce tutorial pages in batches and keep them accurate over time, without it becoming an unsustainable solo maintenance burden. The reference future sessions and CC work from — don't reconstruct this from chat.

---

## The core problem this solves

Producing ~170 pages (plus future additions) one at a time is too slow, and by the time the long tail is done the early pages are stale — re-research from scratch. Worse, naive "deep page for everything" maintenance never converges:

> **Re-review load ≈ N ÷ S** (pages ÷ months of shelf life).
> 170 deep pages at ~6-month shelf life = **~28 pages/month of re-review alone**, before producing anything new. Not a solo, fragmented-time number.

The system below makes N÷S tractable by reducing N (fewer deep pages), increasing S (volatility tiers + light pages that barely decay), and making both production and maintenance batched + human-gated rather than one-at-a-time or naively automated.

---

## Decision 0 — Depth is demand-gated; accuracy is not tiered

The single most important rule, because it dictates the maintenance math AND protects the product:

- **Depth varies. Accuracy does not.** Every platform's *first* version gets the same full live capability-research pass — current models, pricing, free-tier shape, deprecations, what's new. Light pages are **shallower, never less-researched**. A wrong fact on a light page is as damaging as on a deep one.
- **Deep structured pages** (full 7-section template) for platforms that earn it by **search demand**. Estimated ~30–50 platforms, NOT 170. **Ranking signal is phase-dependent — see the GSC caveat below.**
- **Light Tier-1 pages** (what it is / who it's for / a few starter prompts / free-tier limits / one pitfall) for the long tail. Fewer volatile claims → slower natural decay → mostly fall out of the re-review burden.
- The light/deep line is **surface area**, then **re-review cadence** — not fact quality.

Re-run the math with this split (~40 deep + ~130 light, light ≈ near-zero decay) and steady-state re-review drops to something a batched monthly session can hold. The scope reframe is what makes the whole system feasible — it is not a compromise on quality.

### GSC demand data is a LATER-phase signal, not the seed (important)

The site serves a **site-wide `noindex`** (confirmed 2026-06-24 via GSC: 34 pages "Excluded by 'noindex' tag", 0 indexed). This is the intentional friends-and-family guard and is correct to leave on until near launch (avoids Google forming a thin-content impression of the domain while the catalog is incomplete — the March 2026 scaled-content risk the whole format exists to dodge). **Consequence for batching:** GSC Performance shows **zero query/demand data and will keep showing zero until `noindex` is lifted and pages ramp into the index** (weeks-to-months after that, given a young low-authority domain). So:

- **First batches CANNOT be ordered by GSC demand** — that data structurally does not exist yet. Do not wait on it; it won't arrive on the production timeline.
- **Seed the initial deep-page selection from other signals:** general AI-tool search popularity / mindshare, known high-traffic platforms, and the catalog's **own** on-site behavior (Vercel Analytics already shows e.g. `/discover` and `/platform/chatgpt` as most-visited). Editorial judgment on "which platforms beginners most need" carries the early ordering.
- **GSC demand becomes a refinement signal LATER** — once `noindex` is lifted (a pre-launch decision; consider per-page rollout, substantive pages first) and pages are indexed and ranking, real query data refines which platforms deserve deep treatment and feeds the maintenance volatility tiers. It improves the ordering; it never gates the start.

---

## Part 1 — Production pipeline

Four phases. Research and review are per-page and do NOT compress; batching only speeds the middle (build). Design accordingly — the wins come from batching the *research phase* into one pass and the *review* into one session, not from compressing either.

### Phase 1 — Batch selection
- Pick a batch (target size **15**), ranked by demand. **Pre-launch (now): rank by seed signals** — AI-tool mindshare/popularity, on-site Vercel Analytics behavior, editorial "what beginners most need." **GSC search demand is NOT available yet** (site is `noindex` — see the GSC caveat in Decision 0) and becomes the refinement signal only after launch + indexing.
- A batch may mix archetypes; that's fine once the line is proven (see Prerequisite 2).

### Phase 2 — Research → rigid content brief (Claude.ai, one pass)
- I (Claude) research all 15 in one pass — the same capability-drift pass proven on ChatGPT / Ollama / Zapier (each of which surfaced something material: image-gen + model retirement, the entire Ollama Cloud tier, Zapier's AI layer). **Research is load-bearing, not a rubber stamp.** 3-for-3 the research *changed* the page.
- Output is a **rigid, pre-mapped content brief** — NOT prose. One section per platform, **every field of the tutorial type filled in as final content**, with sources + research-date stamped per platform.
- **This is the make-or-break detail:** I hand CC *locked content already mapped to the type*, so CC's job is mechanical transcription into TS files — it decides nothing. Prose research that CC must interpret at 15× is exactly where batch drift lives (the Fable lesson: document briefs with rigid structure, not chat-paste interpretation).

### Phase 3 — Build (Claude Code, batched)
- CC transcribes the brief into `{slug}-getting-started.ts` files on a batch branch, registers each, runs typecheck + build gates.
- Mechanical step. Cheap and parallelizable *because* the content is locked upstream.
- Recon-first as always (confirm live type fields, categorySlugs, platformSlugs).

### Phase 4 — Review (Zach, one session) → chunked merge
- Review all 15 in **one sitting** (the batching win — one session, not 15) against the same preview-screenshot checklist used in the pilot.
- **Merge in ~5-page sub-chunks**, not all 15 at once, so one problem page doesn't hold the batch hostage. Keeps "merge deliberately" intact at scale.
- Each chunk gets the full Vercel deployment-verification ritual (merged HEAD = production sha = READY).

**Apply the locked template conventions** to every page: `{slug}-getting-started.ts`, "Getting Started with {Platform}", bare whereToNext labels, inline `**bold**` at gloss-point-only + `` `code` `` for commands, never markers in a prompt field.

---

## Part 2 — Maintenance system

**Do not build until ~20+ deep pages exist.** Premature before then. The principle: **automation prepares a decision; Zach makes it.** Automation only at the bottom layer.

### Layer 1 — Signal detection (automated, weekly Vercel Cron)
Per platform, detect that a page *might* be stale — NOT whether it matters:
- `changelogUrl` activity (the field was built for this), pricing-page diffs, model-lineup changes.
- `lastReviewedAt` age (time-based half of the queue needs no detection — just query "Tier-A pages not reviewed in 30 days").
- Output: a ranked **"needs a look" queue.**
- Shares plumbing with the For-You news searches (both = weekly web scan for platform changes) but is a **distinct output** (news = user-facing freshness; maintenance = content accuracy). Same plumbing, different consumers.

### Layer 2 — Suggestion layer (the human-in-the-loop core)
- A re-research pass runs on **flagged platforms only**, producing a **review brief**: per change — *what changed, the specific line on the page it affects, a suggested edit.*
- This is the right division of labor, not a lesser automation: Zach **adjudicates pre-digested proposals** (approve / tweak / skip) rather than researching or editing.
- **Trust is the make-or-break property.** A brief that cries wolf (flags trivial changes) or misses real ones collapses the system — Zach over-reviews or stops trusting it. The brief must be high-signal, honestly flag its own uncertainty ("not sure, look at this"), and **never present a confident-but-wrong suggested edit.** This layer is the component we'll most have to *earn trust in* through iteration — assume it needs tuning.

### Layer 3 — Re-build + re-review (Claude Code + Zach)
- Same as production, smaller, on the approved set only.

### Volatility tiers (the load-spreader)
- **Tier A** — LLMs, major high-churn / high-traffic platforms: review ~monthly. Worth it; most-searched pages.
- **Tier B** — stable mid-tier: ~quarterly.
- **Tier C** — niche/stable + all light long-tail pages: on-signal-only.
- Tiering is what keeps N÷S inside capacity.

### Why fully hands-off is deferred (deliberately, not just for now)
- Hands-off maintenance on an *accuracy-is-the-product* site is a real engineering project with a real failure mode (silent wrong facts) — not a config toggle.
- Strategic bonus to running the manual version first: the corpus of **approved-vs-rejected** decisions becomes the signal needed to safely automate further later. **The manual phase builds the training data for the automated phase.** Don't skip it even when tempted.
- Revisit full automation as a **post-launch project**, once the site is stable and rolling.

---

## Schema implications (decide when building the maintenance system — NOT now)

Small adds, human-gated migrations per the usual Neon-branch-first ritual. None needed until the maintenance phase:
- **Volatility-tier field** per platform (drives cadence).
- **Content-tier field** (light vs. deep) — only if not cleanly derivable from which sections are populated.
- Already in place from Session 14, built for exactly this system: **`lastReviewedAt`** (freshness + re-check trigger) and **`changelogUrl`** (speeds re-review / feeds detection).

---

## Hard prerequisites — both gate first batch use

1. **CLAUDE.md must be fixed first** (see `claude-md-audit-deferred.md`). Hand-baked self-contained prompts are currently *masking* the stale file. Batch production STOPS the hand-baking — so the stale tutorials section (still says DB-backed / coming-soon / P3) goes live into CC's context the day you scale. **Non-negotiable prerequisite, not housekeeping.**
2. **Prove the line at 5 before running 15.** Build one ~5-page batch **across archetypes** to find assembly-line friction (brief schema mapping, CC batch drift, systematic review issues) at 5× cost, not 15×. Pilot-before-batch, one level up.

---

## Suggested sequencing

1. Finish the current pilot spread — **Zapier (#2)**, then a couple of **#4–#10** across archetypes.
2. **Fix CLAUDE.md** (prerequisite 1).
3. **5-page cross-archetype proving batch** (prerequisite 2).
4. First real **15-page batch**, ordered by **seed signals** (mindshare / on-site analytics / editorial — NOT GSC, which is still `noindex`-dark).
5. Stand up the **maintenance Cron + suggestion layer** once ~20+ deep pages are live.
6. (Post-launch) revisit further automation, using the accumulated approve/reject corpus.

---

## Open calibrations (tune in practice, not decidable up front)
- Exact deep-vs-light demand threshold (GSC-driven; needs real query data).
- Volatility-tier cadences (A/B/C months) — adjust to actual drift observed.
- The suggestion layer's signal quality — the thing most likely to need iteration before it's trustworthy.
