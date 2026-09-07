> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `product-roadmap-reference (1).md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# LaunchpadHQ — Product & Feature Roadmap (Reference Doc)

**Created:** June 9, 2026, during the Session 10 planning discussion.
**Updated:** June 9, 2026 (later same session) with recon findings + execution results. Sections marked **[UPDATED]** reflect ground truth that replaced earlier assumptions.
**Purpose:** Capture the feature inventory, build state, access decisions, and execution sequence. Living reference, not a session execution recap. Pairs with `business-strategy-reference.md`.

---

## Current build/branch state (read this first) [UPDATED]

Two feature branches exist, both **verified on preview, neither merged to main**. The live site (launchpadhq.io) reflects **neither** yet.

| Branch | Contents | State |
|---|---|---|
| `feature/quiz-anon-flow-fix` | Public `/quiz/results` route, anon scoring, post-auth save handoff, stale guest-copy fix | **Verified end-to-end on preview. Ready to merge. NOT merged.** Merge this FIRST. |
| `feature/quiz-scoring-fixes` | Remove dead Q5, expose 3 orphaned goal buckets, enterprise-budget fix, vertical keyword buckets, 2-col grid | **Parked.** 3 commits are safe; the vertical commit has an unresolved problem (see difficulty-filter decision below). Merge SECOND, after the difficulty-filter call. |

**Branch coordination:** both branches edit `quiz-client.tsx`, so whichever merges second hits a small mechanical conflict in `finish()` + the header. Claude Code offered to handle that rebase. Order is fixed: anon-flow first (clean off main), scoring second.

**Status line for Claude Code when work resumes:** "Anon-flow branch verified on preview — code-method signup, stash survives, lands on populated For You, signed-in regression passed. Not merged yet."

---

## Feature inventory & roles [UPDATED with recon ground truth]

A read-only Claude Code recon this session confirmed several things that were previously only *believed*. Updates folded in below.

| Feature | Role | Build state |
|---|---|---|
| Catalog (170+ platforms) + platform pages | Free funnel (indexed) | Done |
| Difficulty / free filter on Discover | Free funnel | **To build** — beginner/advanced/expert + free filter at top |
| Quiz | Free-account hook (acquisition) | Works; anon flow **was broken, now fixed** (branch awaiting merge); scoring fixes on a 2nd branch |
| Favoriting → For You | Paid personalization | Works well; feeds For You correctly |
| For You **news feed** | Paid (retention engine) | **Greenfield — zero work done** |
| Prompt library | Free funnel (viewing), free account to post | **CONFIRMED by recon: already implements read-freely / sign-in-to-post.** Public GET, 401 on POST. |
| Discussions / community | Bonus, not a pillar | **CONFIRMED by recon: same model already built.** Public read, auth-gated post. |
| Tutorials | Free funnel (light tiers) + Paid (deep guides) | **Greenfield — build from the ground up** |
| Moderation/review workflow | Operator tooling | Reading Neon rows in Prisma Studio only — no notifications, no rate limiting. Not scalable. |

**Key recon finding:** the access model we *decided* on this session (read freely, sign in free to post) is **already what the prompt library and discussions implement.** This was imagined work that doesn't exist — opening them up is largely already done. The remaining gap is operational (moderation notifications + rate limiting), not the access model itself.

---

## Per-feature decisions

### Quiz — the work done this session [UPDATED]

The recon mapped the scoring engine and exposed two independent problems. They were split into two branches deliberately.

**Branch 1 — anon flow (DONE, verified, awaiting merge):**
- The bug (confirmed live): a signed-out user took the quiz → answers went to `sessionStorage` → redirect to auth-gated `/for-you` bounced them to sign-in → home → answers lost. **100% of anonymous quiz-takers leaked at the conversion moment** — the single narrowest point in the funnel.
- The fix: a public `/quiz/results` route renders recommendations immediately for signed-out users (value first), with a "create a free account to save these" CTA. On sign-in, answers survive the auth round-trip and persist to `UserPreferences.quizAnswers`, landing the user on a populated For You.
- **Load-bearing risk that was tested and cleared:** the fix depends on `sessionStorage` surviving the Clerk auth round-trip. Risk was the email-verification hop (magic link → new tab → fresh sessionStorage → answers lost). **Verified on preview: the Clerk instance uses 6-digit in-page code entry, NOT magic links, so the user stays in the same tab and the stash survives.** No localStorage pivot needed. If Clerk verification is ever changed to magic-link, this assumption breaks — fallback would be localStorage + 24h expiry (not 1h — a real user may verify email hours later).
- Verified end-to-end: anon → results → signup-with-code → saved → populated For You, no retake. Signed-in regression also passed (signed-in quiz still goes straight to For You, bypasses `/quiz/results`).

**Branch 2 — scoring fixes (3 safe, 1 problematic):**
- **Safe:** remove the inert free-text Q5 (confirmed never read by the scorer); expose `automation`, `education`, `data_analysis` goal buckets (defined in keywords but unreachable from the picker); fix the enterprise-budget filter (was excluding FREE/FREEMIUM — wrong for a beginner site); 2-col goal grid (picker grew to 14 options).
- **Problematic — the vertical buckets:** see difficulty-filter decision below.

### The difficulty-filter decision (OWED — blocks the scoring-branch merge) [NEW]

Testing the vertical buckets on preview surfaced the real problem. Legal + **Beginner** returned 12 tools, **none of them legal**, all tied at a flat 23% match. Diagnosis: the scorer **hard-filters on `difficultyLevel`** before scoring. Legal/healthcare/finance tools are INTERMEDIATE/ADVANCED, so a Beginner selection excludes all of them, and the engine then **pads the list with baseline-scored filler** (any beginner tool, flat score). Result: the goal selection had *no effect* — a beginner picking "Legal" gets a random-looking list.

This is worse than the empty result we predicted: 12 confident-but-irrelevant picks under "Based on your quiz" makes the engine look broken. And it's a *new* path — production can't currently select Legal, so merging the vertical commit as-is would introduce a "pick Legal, get music generators" experience that doesn't exist today.

**Decision still to make** (two levers, probably both):
1. Soften the difficulty filter from a hard exclude to a ranked signal (show advanced tools with an "advanced" caveat instead of dropping them).
2. Add a minimum-score threshold so a no-real-match query shows an honest empty state instead of filler.

Until this is decided, **hold the vertical commit.** The other three scoring commits are safe to ship independently if we want to split them.

### Verticals in the quiz — reframed [UPDATED]

Earlier leaning was to *retire* vertical coverage (keep the quiz horizontal, serve verticals via Discover filters). Zach overrode: build it cheaply and evaluate empirically. Done the proportionate way — curated keyword buckets (verified against actual DB use-case text), NOT a category-aware scoring rebuild. The difficulty-filter problem above is the first evaluation finding. Open question still live: is keyword-on-use-case-text matching good enough for verticals, or is a category-aware branch eventually needed? The flat-23%-filler issue is a filter problem, not yet a keyword-quality verdict — judge keyword quality once Intermediate-level vertical results can be seen cleanly.

### Difficulty filter (Discover) — a free-tier improvement, not a paid feature
Beginner/advanced/expert + free filtering on Discover. Makes the *free* catalog better, helps beginners self-select. Build as a free funnel improvement. (Note: related to but distinct from the quiz's internal difficulty filter above.)

### Prompt library & discussions — access model already built [UPDATED]
Recon confirmed both already do read-freely / sign-in-to-post. What's actually missing:
- **No moderation notifications** anywhere — all submission types land as PENDING rows visible only via Prisma Studio. Doesn't scale past zero.
- **No rate limiting** on any submission/vote endpoint (TODO in code).
- **Hard dependency:** before *driving* public contribution, build the Task 6 moderation email flow (prereqs already in place from Session 9) and add rate limiting. Account-required posting already protects against anonymous bot spam, so this isn't urgent at zero users — but it lands before marketing contribution.
- **Community is the weakest paid pillar — don't lean on it.** Cold-start: can't seed a community behind a wall with no users. Let it exist; don't market it as a reason to pay at launch.
- Minor: discussion `solution` field renders but can't be set (half-built); dead `/api/recommendations` route was repurposed for the anon-flow fix; `LoggedOutLanding` is dead code (noted in CLAUDE.md tech debt for a future cleanup pass).

### Moderation — the "Neon" gap
Neon = the Postgres DB. Seeing posts via the Neon SQL Editor / Prisma Studio is reading raw rows — not a moderation system. Fix = Task 6 moderation email flow (post lands → email with HMAC-signed approve/reject magic links → tap → done). **AI auto-moderation** (auto-approve clean, auto-reject spam, escalate the middle) is a good fit *later*, when manual review becomes noise — not at ~0 posts/day.

### News feed — the keystone, human-in-the-loop, build near launch
- Load-bearing retention pillar; the entire reason to keep paying month over month.
- **Full automation is off the table — a brand requirement.** Unsupervised AI publishing AI-platform news *will* hallucinate fake updates/prices, poisoning the credibility the open catalog earns. Correct shape: AI gathers and drafts → human reviews/approves → human publishes.
- Real moving parts (sourcing, mapping to favorited platforms, dedup, freshness, QC) → **deserves its own dedicated design session** before code.
- **Build near launch**, not now: only valuable fresh, only matters once there are subscribers to retain.

### Tutorials — BUILD FIRST
- Greenfield, highest-priority substance build. Evergreen SEO that compounds — the earlier indexed, the longer it ranks; exactly what beginners google. Low-risk, fragment-friendly.
- **Double duty:** light tiers (prompt starter kits, evergreen concepts) live free + indexed as funnel; deep platform-specific guides sit in the paid tier.
- Planned tiers: Tier 1 prompt starter kits (all platforms), Tier 2 written quick-starts (~20–25 platforms, 300–400 words, fixed template), Tier 3 evergreen concepts.
- Open prior decision: template-lock vs. `lastReviewedAt` / `changelogUrl` schema migration first — still unresolved.

### Tutorials vs. News — sequencing
Tutorials benefit from being built **early** (evergreen, compounding, serves current visitors); news benefits from being built **late** (only valuable fresh, retains subscribers who don't exist yet). Tutorials first.

---

## Execution sequence [UPDATED]

1. ~~Quiz quick fix~~ → **done on two branches, pending merge** (anon-flow ready; scoring pending difficulty-filter call).
2. **Next concrete steps:** (a) merge `feature/quiz-anon-flow-fix`; (b) make the difficulty-filter decision; (c) rebase + merge `feature/quiz-scoring-fixes`.
3. **Moderation email flow (Task 6) + rate limiting** — operational prereqs before driving public contribution. Prereqs in place.
4. **Tutorials** — the main substance build.
5. **News** — own design session, near launch.

Contained wins usable as background Claude Code tasks while doing non-keyboard work: difficulty filter (Discover), moderation email flow.

---

## Tooling note [NEW]
Claude Fable 5 (launched June 9, 2026; Mythos-class, built for long-running async batch work) is the tool to reach for on large, well-scoped, low-judgment batch jobs — e.g. the deferred Phase 2 catalog research across ~170 platforms, or big mechanical migrations. For the surgical, human-in-the-loop, diff-review-and-preview work that's been the norm here, Opus stays the default. Capability was never the bottleneck — review time and calendar-bound steps are.

---

## Open verification items — RESOLVED this session [UPDATED]
- ~~Verify prompt library and discussion pages work end-to-end~~ → **confirmed working, recon done.**
- ~~Check current auth/gating state of quiz/library/discussion routes~~ → **done:** `/quiz`, `/platform/*` (incl. prompts + discussions) are public for viewing; posting is auth-gated; `/for-you` is auth-gated.

---

## Working-pattern reminder
All execution goes through Claude Code; this conversation is for planning, prompt drafting, review, decisions. Read-only recon before editing; diff review before risky writes; Vercel preview verification before merge to main; middleware lives at `src/proxy.ts` (never `middleware.ts`).
