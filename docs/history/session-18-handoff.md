> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-18-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 18 Handoff — CLAUDE.md audit (Tier 1 + confirmed Tier 2 complete; Tier 3 deferred)

> **Session type:** Maintenance (Claude.ai planning/review + Claude Code execution in Cursor).
> **Date:** 2026-06-25
> **Repo/DB state at close:** main at **`397a2c6b`** (PR #28). No runtime change — CLAUDE.md only across both audit PRs. DB untouched, no migrations, no Neon operations. Tutorials remain static TS in `src/data/tutorials/*`; dormant `Tutorial`/`UserProgress` models still intentionally unwired.

---

## What shipped this session — the CLAUDE.md audit (Tiers 1 + confirmed 2)

Two docs-only PRs, both landed via the standard ritual (push → `gh pr create --fill` → `gh pr merge --squash`), no Vercel verification (docs-only, no runtime change):

1. **PR #27 (`f2ed7d19`)** — Tier 1 structural corrections + confirmed Tier 2:
   - Rewrote the stale `## Tutorial strategy` section → new `## Tutorials` (file-based architecture, the dormant-Prisma-model "do NOT wire through DB" warning, authoring rules: web-research-at-authoring-time, `lastReviewedAt` honesty, no volatile version numbers, security-varies-by-platform, build-on-shared-renderer).
   - `.env.local` encoding corrected UTF-16 LE → **UTF-8** (both mention sites).
   - Dropped solved design-weakness items (#4 tutorial template, #6 chip truncation).
   - Removed the stale "no typecheck script" gap note (it exists: `"typecheck": "tsc --noEmit"`).
   - Trimmed three fixed P0 bugs (platform count, "Free: Free:" prefix, chip-label truncation) from the bug list.
   - Added missing stack to "wired up": Clerk Dev-instance (pre-paywall migration owed), Cloudflare, Resend, Sentry (+ the `await Sentry.flush(2000)` gotcha), Vercel Analytics/Speed Insights, GSC, site-wide `noindex`.

2. **PR #28 (`397a2c6b`)** — Tier 1 close-out, the three deferred stale tutorial mentions:
   - Rewrote the `/tutorials` bullet to distinguish the **placeholder coming-soon index route** from the **live per-platform Tutorials tabs** at `/platform/{slug}` (rendered via `platform-tutorials.tsx`, mounted in `platform-detail-tabs.tsx`). Removed the welded-on "only chatgpt exists / P3 concern" stale tail.
   - Deleted P1 design-polish item #5 (tutorial structured template — shipped).
   - Rewrote P3 item #4 (retired "Tier 2 screencast" tier-scheme reference → future-enhancement framing pointing at `## Tutorials`).

**Verified clean via literal-string grep** (not visual review): `chatgpt-getting-started exists`, `A full tutorial library is a P3 concern`, `Tier 2 screencast`, `structured template` all → 0 matches. The single surviving `coming soon` is the intentionally-accurate `/tutorials` index placeholder (confirmed against `src/app/(app)/tutorials/page.tsx`, which renders an `<h1>Tutorials are coming soon`).

---

## Key facts established/corrected this session (carry forward)

- **Billing is raw Stripe, NOT Clerk Billing.** Recon-confirmed: raw Stripe SDK, three hand-rolled routes (`src/app/api/stripe/{checkout,portal,webhook}/route.ts`), `STRIPE_PRICE_ID` read directly, `src/lib/stripe.ts` shared client; zero Clerk Billing in the codebase. **Clerk is auth-only.** The "Stripe via Clerk Billing" assumption (in prior memory/notes) was wrong — correct it anywhere it persists. Implication: the Clerk Dev→Prod migration and Stripe wiring are independent paywall tracks, not one integration.
- **`/tutorials` index route is still a coming-soon placeholder by design.** Live guides are per-platform Tutorials *tabs* at `/platform/{slug}`, not a standalone `/tutorials/{slug}` route. (Earlier drafts mis-stated this; corrected.)
- **Jasper dedup remains UNRUN.** Confirmed across Sessions 13–17 handoffs: `scripts/dedupe-jasper-platforms.ts` is merged (`e3b55d76`) but never executed against the DB. The script is complete and reviewed; only the operator run is owed. **Footgun: defaults to LIVE, not dry-run — pass `--dry-run` explicitly, Neon branch first.**
- **Tutorial page count discrepancy to reconcile:** Session 17 handoff claims "5 pages" but names and greps to **four** files (chatgpt, midjourney, zapier, ollama). Verify whether a fifth exists or the count was wrong before the next handoff cites a number. (The CLAUDE.md rewrite names pages rather than counting, so it's correct either way.)

---

## Designated first actions next session — TWO open decisions, in order

The Session 17 plan was **(1) batch-method call → (2) CLAUDE.md audit → (3) batch work.** The audit's *blocking* portion (Tiers 1 + confirmed 2) is now done, so the hard prerequisite is satisfied. Remaining:

### Decision A — Settle hand-build vs. Fable batch (still open from Session 17, Step 1)
This was never actually decided — the audit was done first as overdue hygiene that bites any session, not just batch ones. The honest tension stands: **review capacity is the real constraint.** A Fable batch is only faster if per-page judgment can be pre-specified tightly enough to review in bulk; the Midjourney lesson (a verification pass *changed* content, didn't just confirm it) says per-page research judgment is the hardest thing to put in a batch brief. Decide: full Fable batch / smaller Fable batch with tight briefs / continue hand-building.

### Tier 3 lean-down (optional, deferred — gates nothing)
The audit's remaining tier: convert duplicated strategy prose in CLAUDE.md (pricing/paywall model, free-vs-paid split, operational approach, editorial principles, excluded-platforms plan, priority roadmap — header list in the Session 18 recon report) into **pointers** to `business-strategy-reference` / `product-roadmap-reference`. **Keep** the moderation action-route policy (rate/vote routes filter to APPROVED, report routes don't — concrete coding rule, not strategy). Open question flagged at close: the editorial `privacyLevel`/inclusion-disclosure material may be coding-relevant enough to **keep** rather than point away — needs a recon pass reading the actual prose before the keep-vs-pointer calls. **Start Tier 3 with that recon.** Lowest urgency; clean self-contained pickup.

### Then — batch/next-page production
Per `batch-production-maintenance-playbook.md`. Candidate spread (cross archetypes, don't stack chat LLMs): a coding tool, a meetings/notes tool (2nd recipes page), an API/dev service (2nd pick-and-setup), 1–2 verticals. Size to review capacity.

---

## Deferred / tracked (unchanged + new this session)

- **Branch cleanup now overdue** — retained branches: five `tutorials/*` (ollama-page, inline-formatting, zapier-page, ollama-usage-cards, midjourney-page) + two `docs/claude-md-audit*` (audit, audit-tier1-close). **Seven feature/docs branches.** Worth its own small batched sweep.
- **`changelogUrl` is dead data** (set by some tutorial pages, not rendered) — wire it or stop setting it. Cheap, no urgency.
- **Tier 3 lean-down** (above).

## Carry-forward from prior handoffs (unchanged, still owed)

Jasper dedup Neon dry-run (script merged; execution = operator step — see above) · held vertical commit `9edda0fa` cherry-pick for Legal+Beginner eval · Clerk Production-instance migration (pre-paywall prereq) · LLC formation → business banking → production Stripe → paywall enable · For You news feed + Tier 2/3 deep tutorials (post-paywall).
