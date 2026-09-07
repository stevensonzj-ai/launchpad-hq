> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-11-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Handoff Summary: LaunchpadHQ — Session 11 → Session 12

**Who I am:** Zach Stevenson. Solo dev, building LaunchpadHQ — a curated AI platform discovery site for beginners. Live at launchpadhq.io.

**Read these alongside this handoff (they remain the relevant context):**
- `session-10-handoff.md` — the planning + Fable sprint + git/deploy recap. Its merge order and watch-items still govern; this session executed the first decision-gate from its Session 11 plan and added a fix, but did **not** start the merges.
- `Claude-Fable-5-Session-Handoff.md` — the per-task breakdown of the six Fable branches and the canonical merge order. Still the source of truth for the merge state, **with one amendment** noted below (the difficulty-filter branch now carries an extra commit).
- Reference docs `business-strategy-reference.md` + `product-roadmap-reference.md` — still accurate on strategy/gating/monetization. The roadmap doc's "judge keyword quality once Intermediate-level vertical results can be seen cleanly" open item is now **resolved with a finding** (see Part 3); worth a ground-truth touch-up next session.

---

## What this session was

A focused **decision + small-build** session. The single goal from the Session 11 plan was step 3: evaluate Fable's difficulty-filter fix and decide whether to accept or adjust. We did that — and the evaluation surfaced that Fable's fix was half-aimed, so we **added a goal-relevance floor** to complete it. We deliberately **stopped before the merge sequence** (don't merge tired; the merges are their own careful workstream).

**Net result:** the difficulty-filter branch is now validated and signed off, with the floor built, committed, and backed up to origin. A keyword-quality finding for the verticals is documented for Phase 2. Nothing merged to main, no database touched, repo clean.

---

## Part 1 — The difficulty-filter decision (the core of the session)

**Decision: ACCEPT Fable's penalty + badge; ADD a goal-relevance floor to replace the threshold approach.**

What Fable built on `feature/quiz-difficulty-filter-fix` (commit `7e600a55`):
1. A soft difficulty penalty (×0.65) on above-level tools — kept, works correctly.
2. An amber "Advanced" badge on above-level tools — kept, works correctly.
3. A 15% minimum-score threshold for an empty state — **this was aimed at the wrong failure mode** (see below) and was replaced.

### Why the threshold was wrong, and what the 23% filler actually was

Tested **Legal + Beginner** on a combined preview (difficulty fix + vertical goals). Result before the floor: Spellbook (a real legal tool) at 29% as #1, then **eleven non-legal tools all tied at a flat 23%** (music generators, image tools, Korean search, PDF tools).

A read-only code recon decomposed the 23%: it's **`8 (beginner) + 10 (free) + 5 (has free tier) = 23`** — entirely goal-independent rewards. The scorer blends "relevant to your goal" (keyword hits, +10 each) with "generically nice for a beginner" (beginner/free/free-tier) into one number, then filtered only on **whether the top result cleared 15%**. So one good match (Spellbook, 29%) let all eleven irrelevant 23-point tools ride along. The threshold guarded the zero-match case; the actual failure was **one-good-match-plus-filler**, which nothing addressed.

### The fix we added — goal-relevance floor (Option B)

On `feature/quiz-difficulty-filter-fix`, commit **`b2a60ffc`** ("feat(quiz): gate recommendations on goal relevance"):
- Track a separate **`goalScore`** accumulator that sums only the +10/keyword-hit points.
- After sorting, **filter to `goalScore > 0`** (at least one goal-keyword hit) before the `slice(0, 12)`.
- **Removed** the now-redundant `MIN_MATCH_SCORE` / `hasStrongMatch` top-only gate (it was incoherent once we filter per-result, and would fail lint unused).
- Difficulty penalty (×0.65) and the Advanced badge are **untouched**.
- Return shape preserved; the For You page derives its three states from `recommendations.length`.
- `for-you/page.tsx`: added an `isShortList` prop (`recs.length <= 2`) that renders a minimal note — "That's all we found a strong match for — try Discover for more." — styled to match the existing zero-recs state. No new component.

**Threshold chosen: one keyword hit** (`goalScore > 0`). Deliberately the minimal "this tool's text references the goal domain" gate. The stricter ≥2-hits option was considered and deferred — tighten later only if single-hit noise appears.

**Deliberately NOT added:** a low-score display floor for the rare relevant-but-heavily-penalized tool that could render a low single-digit "% match." Left as-is to judge on a real example if it appears; not worth coding for a hypothetical.

---

## Part 2 — Verification (on a throwaway combined preview)

Because Legal isn't selectable on the difficulty-fix branch alone (the vertical goals live on the held commit `9edda0fa`), we built a **throwaway** branch `tmp/difficulty-plus-verticals` = difficulty-fix + floor + cherry-picked verticals, purely for preview testing. (This is also where the known `quiz-client.tsx` GOALS-array conflict first showed up — trivial, resolved by keeping the incoming 14 goals; it will recur at the real scoring-safe merge.)

**Two tests, both as hoped:**

1. **Legal + Beginner (after the floor):** the eleven flat-23% non-legal junk tools (music/image/search) are **gone** — the floor dropped everything with `goalScore === 0`. List collapsed from 12 to 6, topped by Spellbook (real legal tool) with the Advanced badge. The floor works.

2. **Writing & content + Beginner (regression — the gate on the floor itself):** returns a **full, healthy grid** (Writesonic/Jasper/Copy.ai at 63%), no short-list note, no over-pruning. Confirms the floor doesn't thin out goals that genuinely have many matches. **This is what made the floor safe to merge.**

The intended per-goal behavior is exactly what we see: abundant horizontal goals stay full; thin verticals collapse to their genuine matches plus an honest note.

---

## Part 3 — The verticals' keyword-quality finding (NEW — for Phase 2, not now)

The Legal+Beginner test still showed some non-legal tools that *passed* the floor (Tabnine, Adobe Acrobat, ChatPDF) — they hit a legal-bucket keyword legitimately. A read-only recon of the bucket definitions (in `recommendations-core.ts:4-100`, added by `9edda0fa`) explains it and gives us the Phase 2 decision:

**The leak is broad words, not a substring accident:**
- **`compliance`** (GENERIC) → caught Tabnine (its enterprise pitch is "SOC 2 / compliance").
- **`contract`** and **`legal`** (semi-generic) → caught PDF tools that advertise "analyze contracts / legal documents."

**Worse latent traps in the other vertical buckets (no word-boundary check — pure substring):**
- **`irs`** (finance) → fires inside "**first**, thirst, hairstyle, Irish." Catastrophic; "first" is everywhere.
- **`stroke`** (healthcare) → fires inside "key**stroke**" and design "brush stroke."
- **`property`** (finance) → "object property / CSS properties" (dev/design tools).
- **`pipeline`** (sales_marketing) → "CI/CD pipeline / data pipeline" (dev/data tools).
- Cross-bucket bleed: `marketing` in both content_creation and sales_marketing; `crm`/`sales` in both business and sales_marketing; `data` in both research and data_analysis.

**The cleaner long-term option — category matching:** the verticals map **1:1** to existing category slugs:

| Goal | Category slug | Name |
|---|---|---|
| legal | `legal-ai` | Legal AI |
| healthcare | `healthcare-ai` | Healthcare AI |
| finance | `finance-real-estate-ai` | Finance & Real Estate AI |
| sales_marketing | `sales-marketing-seo-ai` | Sales, Marketing & SEO AI |

Scoring **doesn't use category today** (only for `byCategory` display grouping), so a category gate is a clean architectural add, not a rework. A `category.slug === "legal-ai"` gate keeps Spellbook and drops all three false positives (Tabnine is `ai-coding-development`; Acrobat/ChatPDF are `document-pdf-processing`). Tradeoff: category = high precision / lower recall (would exclude a genuinely useful general PDF tool a legal beginner might want); keyword = broad / noisy. **Recon's recommended shape, which I agree with: hybrid — category = strong signal, keyword = weak supplement.**

**This is all parked work on the vertical commit `9edda0fa` (Phase 2). It does NOT block the difficulty-filter merge.** The roadmap doc's open question ("keyword quality good enough, or category-aware needed?") is now answered: keywords are fine for horizontal goals, but verticals want category-aware matching (or at minimum a keyword scrub removing `irs`, `stroke`, `compliance`, `property`, `pipeline`).

**Side note (discussed, settled):** enriching platform descriptions does NOT help matching here — it worsens the over-match problem (more text = more incidental substring hits) and amounts to keyword-stuffing. Description enrichment is valuable for accuracy/SEO/tutorials (the Phase 2 catalog research / Fable batch), but it's a different problem from quiz matching. For matching, structured metadata (category/tags) scales; free-text substring degrades as buckets grow.

---

## Git state at end of Session 11

- **Branch:** `main` untouched, synced with origin. Nothing merged this session.
- **`feature/quiz-difficulty-filter-fix`** now at **`b2a60ffc`** on origin (was `7e600a55`). It now carries: difficulty penalty + Advanced badge (Fable's `7e600a55`) **plus** the goal-relevance floor (`b2a60ffc`). Backed up on origin (verified via `git ls-remote`). This is the version that merges in the normal order.
- **`tmp/difficulty-plus-verticals`** — throwaway eval branch (HEAD `b61a6b8e` = floor + cherry-picked verticals). **Served its purpose. DELETE IT** next session before anything else: `git push origin --delete tmp/difficulty-plus-verticals` + `git branch -D tmp/difficulty-plus-verticals`. Do not mistake it for real work.
- **Held vertical commit `9edda0fa`** — unchanged, still on `origin/feature/quiz-scoring-fixes` and local backup ref. Untouched by this session.
- No database commands ran. No new dependencies. `.env.local` untouched.

---

## Amendment to the Fable handoff's merge plan

The Fable handoff lists `feature/quiz-difficulty-filter-fix` as a single-commit (`7e600a55`) branch to review/sign-off. **It now has a second commit (`b2a60ffc`, the goal-relevance floor).** The "owner sign-off, not just review" the Fable handoff called for on this branch is **done** — penalty + badge accepted, threshold approach replaced with the floor, both validated on preview. Everything else in the Fable handoff (merge order, the other five branches, watch-items) stands unchanged.

---

## Starting Session 12 — order of operations

The difficulty decision is settled; next session is the **merge sequence** (the bulk of the remaining Fable work).

1. **Get current + cleanup.** Fresh PowerShell: `git checkout main`, `git pull origin main`, `git fetch origin --prune`. Then **delete the throwaway branch** `tmp/difficulty-plus-verticals` (local + remote).
2. **Update the two reference docs to ground truth** (the deferred step 2 from Session 11): anon-flow merged/live; difficulty-filter **now includes the goal-relevance floor, signed off**; verticals have a documented keyword/category finding (Part 3); moderation/Discover/Jasper still built-and-pending.
3. **Run the merge sequence** (each: diff review → Vercel preview verify → merge to main), per the Fable handoff order, with its watch-items:
   - `feature/config-fixes` (lowest risk; gives `npm run typecheck`).
   - `feature/quiz-scoring-safe` — **expect the `quiz-client.tsx` GOALS-array conflict** vs the now-merged anon-flow code. Keep both sides (orthogonal). This is the one human-judgment moment.
   - `feature/quiz-difficulty-filter-fix` — **now `b2a60ffc` (penalty + badge + floor)**. Touches `recommendations-core.ts`, `platform-card.tsx`, `for-you/page.tsx`. Its `recommendations-core.ts` changes auto-merged cleanly with the verticals during testing, a good sign for ordering.
   - `feature/discover-filters` — independent; note `?difficulty=advanced` includes EXPERT (verify on preview, likely correct for a beginner site).
   - `feature/moderation-email` — **set `MODERATION_SECRET` in Vercel + local FIRST**. Run the full round-trip on preview (submit → email → approve → "already reviewed" replay → tamper → invalid). Confirm sender `notifications@launchpadhq.io` matches the Resend-verified domain (Session 9 scoped Resend to `send.launchpadhq.io`). GET-mutation-link concern is a follow-up (POST interstitial before driving public submissions), not a merge blocker at zero volume.
   - `feature/jasper-dedup` — merging only lands the script; **Neon branch + `--dry-run` first**, never skip it, before any live run.
4. **After scoring-safe + difficulty-filter merge:** cherry-pick the held `9edda0fa` onto a **fresh** branch off updated main → preview → re-check Legal+Beginner. **Then make the verticals' keyword/category call** (Part 3): minimum is a keyword scrub (`irs`, `stroke`, `compliance`, `property`, `pipeline`); cleaner is category-aware matching for the four verticals (hybrid recommended). Retire the superseded `feature/quiz-scoring-fixes` once confirmed redundant.
5. **Non-blocking follow-ups:** GET→POST moderation interstitial; `/for-you` QuizCta copy "5 quick questions" → "4" (after scoring-safe removes Q5); 15 pre-existing npm vulns (xlsx); the deferred low-% display floor (only if it surfaces).

After the merges, the substance roadmap resumes: **Tutorials first**, then **News** (its own design session, near launch).

---

## Working style — reinforced this session

- **Push freely, merge deliberately.** The floor commit was pushed to its branch as backup (`b2a60ffc` on origin) the moment it existed — never let consequential work live only on local disk or only inside a throwaway branch.
- **Verify the actual artifact, not a retyped summary.** Claude Code paste-erred the GOALS array (dropped a line), self-corrected, but we confirmed against the raw file on disk before approving. The 20-second check is the discipline.
- **State-check before destructive steps.** Claude Code caught that the floor was written-but-uncommitted before a branch recreate that would have silently built without it. Recon-before-action applies to git state too.
- **Match the preview to branch AND commit.** Grabbing the most-recent Vercel deploy served the wrong branch once (difficulty-fix instead of the combined tmp). Match both the branch name and the commit hash before testing.
- **Don't merge tired; the merges are their own session.** The difficulty decision was the hard part. Banking before six branches of diff-review work is the right call, per the Session 10 lesson.
- All execution via Claude Code; this chat is planning/review/decisions. Middleware lives at `src/proxy.ts`, never `middleware.ts`. No DB commands in autonomous/Claude Code work — operator runs migrations/scripts manually, Neon branch first.
