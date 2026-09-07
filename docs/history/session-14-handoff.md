> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-14-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 14 Handoff — Tutorials Planning

**Session type:** Strategy/planning in Claude.ai. **No code executed, no PRs, no migrations, no Neon operations.**
**Repo/DB state:** Unchanged from end of Session 13 (main at `e3b55d76`, six-branch Fable sequence complete). Nothing in this session touched the codebase or database — Claude Code's context is *not* stale from today.

---

## What this session did

Planned the **Tier 1 tutorials** workstream end to end and validated the page format against the catalog's hardest cases. Output is two planning artifacts (below) plus a locked schema decision. Ready to move from planning into execution (recon → migration → pilot build) next session.

## Artifacts produced (upload both to Project knowledge)

1. **`tutorial-template-spec.md`** — the Tier 1 template spec. Seven-section skeleton + "How it works" on-ramp, section-5 archetype menu mapped to all 20 categories, security-keyed-to-`privacyLevel`, define-on-first-use + glossary, link-out rule, hedged pricing, accuracy/sourcing standard, flex rules, the schema decision (§9), and the production model (§10). **This is the source of truth for tutorial production.**
2. **`tutorial-reference-pages.md`** — the three validated pilot pages (ChatGPT / Zapier / Ollama), one per archetype, as gold-standard worked examples. Note in its header: structure/voice/security-divergence were reviewed; the How-it-works lines, inline glosses, and pay-beat were layered in afterward to match spec §7 and are open to edit.

## Key decisions locked

- **Format validated across all three archetypes** (Prompts / Recipes / Pick-and-set-up). Seven-section shape holds catalog-wide; section-5 content type varies by archetype (menu in spec §6).
- **Beginner-lens additions are mandatory** (spec §7): a "How it works" one-liner per page, define-on-first-use glosses for 2–3 load-bearing terms + a linked glossary, and a direct "will you need to pay?" beat with a hedged price band.
- **Local/setup-heavy tools get a dedicated "Getting set up safely" section** — official-source-only is the safety anchor; link out to vendor install docs rather than reproduce them.
- **Schema decision (one migration, three columns):**
  - `lastReviewedAt` (DateTime, required) — freshness signal + re-check trigger.
  - `changelogUrl` (String?, optional) — link to platform "what's new".
  - `accessTier` (enum `FREE`/`PREMIUM`) — paywall/indexing axis. **Renamed from `tutorialTier`** to avoid conflation with content Tiers 1/2/3; the free/paid line is drawn by depth, not tier number. Enum (not boolean) for headroom.
  - **Excluded:** a sources field (kept in review process, not the DB); an archetype field (derivable from category).
  - Where the free/paid line actually falls is a deferrable *business* call — `accessTier` stores whatever line is drawn; today's decision commits nothing on monetization.

## Strategic framing carried (don't lose this)

- **Google scaled-content-abuse risk (March 2026 core update)** is the constraint shaping the whole format — many thin templated pages can flag the *whole domain*, including catalog SEO already earned. Every spec rule exists to keep each page genuinely useful/non-thin. Corollary: this is real per-platform content work, **not a weekend batch**.
- **Accuracy principle:** write to durable *mechanism*, not volatile specifics (exact model names, message caps); source every volatile fact; `lastReviewedAt` governs shelf life.
- **Bottleneck is review capacity, not generation** — reaffirmed. OpenClaw was considered and rejected for this work (two independent reasons: our own "aspirational, not reliable" note, and external evidence that such automation stacks optimize publishing over ranking).
- **Fable-vs-hand-build is decided *after* the pilot**, sized to review capacity (spec §10).

---

## Next actions (in order)

### 1. FIRST — Claude Code read-only recon of the tutorial schema
Run this before designing any migration. Read-only; no edits.

> **Read-only recon — do not edit anything.** I'm planning a small migration to the tutorial-related model(s) and need to confirm the current state first.
> 1. Show me the full Prisma schema for the tutorial model(s) and how they relate to the platform model (foreign keys, etc.).
> 2. Tell me whether any of these fields (or close equivalents under different names) already exist on the tutorial model: a "last reviewed" date, a changelog/URL link, and any free-vs-paid / premium / access-level / tier field.
> 3. Show the enum-naming and field-naming conventions used elsewhere in `schema.prisma` (casing, how existing enums are declared) so new fields match house style.
> 4. Note anything that would complicate adding three columns (`lastReviewedAt` DateTime, `changelogUrl` String optional, `accessTier` enum FREE/PREMIUM) — existing tutorial rows that would need backfill, existing migrations pending, etc.
> Report findings only. No schema edits, no migration, no `prisma migrate`.

Paste the output back here; we'll review it, reconcile against spec §9, then draft the actual migration prompt (operator-gated, Neon branch first).

### 2. Then — pilot build
After the migration lands: hand-build the remaining pilot pages (the 3 reference pages double as the first 3). Confirm pilot platform list — weighted to popular/easy for data, deliberately crossing archetypes. Pilot pages stay in docs / non-indexed until the bar is confirmed.

### 3. Deferred decisions (phone-friendly)
- Glossary build-form (static page vs. content collection vs. table) — start simple.
- Free/paid rendering (how a FREE vs. PREMIUM page differs) — ties to `accessTier`.
- Where the free/paid line falls (business call).
- Fable-vs-hand-build (post-pilot).

---

## Standing items from prior handoffs (not touched today — see Session 13 for detail)
Held vertical commit (`9edda0fa`) cherry-pick + Legal/Beginner eval + verticals keyword-vs-category matching; `/for-you` QuizCta "5 quick questions" copy fix; Clerk Production-instance migration (pre-paywall prereq); P0 bugs (Jasper dedup Neon dry-run, platform-detail duplicated content); For You news feed + AI News tab (future, `/ultraplan` candidate); paywall enforcement (gated on monetization-ready bar). The doc-disagreement on Resend verification is resolved: root `launchpadhq.io` *is* verified; moderation email confirmed delivering in production this session — update the reference docs to retire the stale "scoped to send. only" note.
