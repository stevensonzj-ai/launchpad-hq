> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `claude-md-audit-deferred.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# CLAUDE.md Audit — Deferred Cleanup

> **Captured:** 2026-06-24 (Session 16)
> **Status:** Deferred to a dedicated cleanup session. Not urgent.
> **Trigger / deadline:** Fix **before any tutorial work that isn't hand-baked.** The deferral is safe only while tutorial prompts stay fully self-contained — the moment a tutorial session leans on ambient CLAUDE.md context (i.e. batch / semi-automated production), the stale tutorials section below becomes a live hazard, because those prompts won't bake everything in.

The audit (current CLAUDE.md `Last updated: 2026-04-24`) is triaged by severity, not file order — most of the file is fine. The confirmed-vs-verify split is the valuable part: Tier 1 can be rewritten without recon; Tier 2 must be verified against live code first.

---

## Tier 1 — Actively false, CC will act on it
*Confirmed, no recon needed.*

- **Tutorials section is wrong end to end.** Currently says placeholder / "coming soon" page, only `chatgpt-getting-started` exists as content, P3 concern, DB-implied. **Reality:** live and proven end-to-end; file-based static TS (`src/data/tutorials/*.ts`); `types.ts` is the compile-time contract; ChatGPT page is reference-grade in production; renderer redesigned; tutorials are an *active workstream*, not P3.
  **Risk:** a fresh session reading this could try to wire tutorials through the dormant Prisma `Tutorial` model — exactly the wrong path.
  **Replace with:** file-based architecture; point at `types.ts` + `chatgpt.ts` as the canonical source; note the dormant DB `Tutorial` model is intentionally unwired; `accessTier` is a TS union, **not** a Prisma enum; plus the authoring rules — web-research-at-authoring-time pass, `lastReviewedAt` honesty ("volatile facts web-verified on this day"), security posture varies completely by platform / no boilerplate, and build-on-shared-renderer / flag-don't-custom-build.

- **`.env.local` encoding inverted.** File says UTF-16 LE and to preserve that encoding; it was re-encoded to **UTF-8** after the incident. Keep the don't-touch-it rule (still load-bearing); fix the encoding fact.

- **Design weakness #4** ("Tutorial pages... needs a structured template") is a **solved** problem listed as open work. Remove it so CC doesn't redo finished work.

---

## Tier 2 — Stale or unverified
*Needs a read-only recon pass before rewriting — don't assert new facts blind.*

- **Stripe vs. Clerk Billing.** File describes raw Stripe routes. Believed to be Stripe *via Clerk Billing* now — confirm against the live integration.
- **`typecheck` script.** "Known gaps" says only `build` and `lint` exist, but the merge ritual (and the Ollama build prompt) invoke a typecheck. Confirm whether a `typecheck` script was added (note is stale) or the ritual runs `tsc --noEmit` directly.
- **P0 bug list status.** Platform count inconsistency, "Free: Free:" double-prefix, chip-label truncation are likely fixed. **Jasper dedup is known mid-flight** (script merged; execution is a pending operator step). Verify which are actually closed so the file doesn't send CC chasing fixed bugs.
- **Missing facts to add:**
  - Clerk Development → Production instance migration (flagged pre-paywall prerequisite) — not mentioned at all.
  - Stack omissions: Cloudflare, Resend, Sentry, Vercel Analytics + Speed Insights, Google Search Console — all in use, absent here. Sentry especially matters when CC touches error handling.

---

## Tier 3 — Not wrong, but doesn't belong here
*Structural lean-down. Lowest urgency — do last. This is the deeper "we're further along" fix.*

- Roughly half the file (priority roadmap, pricing/paywall model, free/paid split, editorial catalog principles, excluded-platforms plan) **duplicates** the `business-strategy-reference` and `product-roadmap-reference` project docs, and is precisely the content that rots ("paternity leave soon," "as of April 2026," tutorials-at-P3). CLAUDE.md should hold *durable cross-session ground truth CC auto-reads* and **point** at the reference docs for strategy, not restate it.
- **Exception — keep in CLAUDE.md:** the moderation action-route policy (rate/vote routes filter target lookups to `APPROVED`; report routes do **not** filter). That's a concrete coding rule CC needs, not strategy.

---

## Sequencing when picked up

1. **Recon first** — read-only CC pass on just the Tier 2 verify-items (Stripe/Clerk Billing wiring, typecheck script, P0 bug status).
2. **One paste** — rewrite Tier 1 sections + confirmed Tier 2 corrections. CLAUDE.md is prose Zach owns in Cursor; corrections paste directly, no CC implementation prompt needed (recon is the only CC step).
3. **Tier 3 lean-down last** — convert duplicated strategy to pointers.

Also closes the outstanding **Session 15 spec-maintenance debt** (`tutorial-template-spec.md` §4 web-research rule, §9 architecture reversal) — redirected to the file CC actually auto-reads rather than the spec doc it doesn't.
