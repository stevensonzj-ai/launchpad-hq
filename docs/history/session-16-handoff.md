> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-16-handoff (1).md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 16 Handoff — Tutorials: Ollama + Inline Formatting

> **Session type:** Execution (Claude.ai planning/review + Claude Code execution in Cursor).
> **Date:** 2026-06-24
> **Repo/DB state at close:** main at **`85720686`**, production verified live against that HEAD on launchpadhq.io. DB untouched — no migrations, no Neon operations this session. The dormant `Tutorial`/`UserProgress` models remain intentionally unwired; all tutorial work shipped through `src/data/tutorials/*` static TS.

---

## What shipped to production this session

Two merges, both ritual-verified (merged HEAD = production deployment sha = READY, webhook fired, no drop):

1. **Ollama starter guide** (PR #22, merged at `d0063ce3`) — pilot page #3, the pick-and-setup archetype. First page to exercise the inverted security posture, the `SetupGuidance`/`gettingSetUpSafely` section, and the `whatItDoes` (no-copy-button) starter-action fallback. Live at `/platform/ollama`.
2. **Inline formatting in the shared renderer** (PR #23, merged at `85720686`) — `richText()` tokenizer: `**bold**` (semibold + primary white) and `` `code` `` (subtle chip), code-first precedence, unmatched-as-literal, XSS-safe (React nodes, no `dangerouslySetInnerHTML`). Wrapped 12 INCLUDE points; the copyable prompt block, URLs, enum/date, and headings deliberately excluded. ChatGPT + Ollama backfilled with glossary-term bolds and command chips. Live on both pages.

**Headline outcome:** the pilot answered its question. The type + shared renderer now generalize across **all three archetypes** (Prompts / Recipes-validated-on-paper / Pick-and-setup) with **no structural cracks** — only the one expressiveness gap (inline emphasis), now closed as a shared primitive. The machine scales.

---

## Decisions locked this session

### Template conventions (apply to ALL future tutorial pages)
- **Filename:** `{slug}-getting-started.ts` (e.g. `ollama-getting-started.ts`).
- **Title:** `"Getting Started with {Platform}"`.
- **whereToNext labels:** bare category names, no "Browse " prefix (the arrow icon implies it).

### Inline-formatting renderer (now the standing capability)
- Bold = `<strong className="font-semibold text-white">` — **two-weight rule holds** (normal + semibold only; never `font-bold`). White (primary-text token) chosen over orange to avoid false link-affordance.
- Code = `<code>` chip reusing existing palette (`border-gray-700` + `bg-gray-800/60` + `text-gray-300`) — no new color value. Visually verified subtle-on-surface.
- **Authoring rule going forward:** mark glossary terms with `**` **at first-use/gloss point ONLY**, never every occurrence (the every-occurrence failure mode is visual noise). Code-wrap literal commands. **Never** put markers in a `prompt` field — that block renders + copies raw; a backtick/asterisk there is a literal character the user pastes.

---

## Queued — next builds, in order

### 1. Zapier page (#2) — CONTENT LOCKED, ready to build
Recipes archetype, connects-your-accounts (master-key) security. Build on the now-merged renderer (inherits inline emphasis). Capability-drift research pass already done (2026-06-24); core free-tier facts **confirmed accurate** — no fact corrections needed. Locked content changes vs. the reference page:

- **AI beat (the one real drift) — "What it is" gets a new closing clause:**
  > "…It's also leaned into AI lately: a built-in **Copilot** can draft an automation from a plain-English description of what you want, and Zapier now offers AI chatbots and 'agents' (free versions included) — though you don't need any of that for your first automation."
  Rationale: the page had zero AI in it, which is a problem *because this is an AI catalog* — a beginner couldn't tell why Zapier is here. Written to mechanism, hedged per §4.
- **Starter section lead-in** adds a Copilot shortcut, demoed on one of the page's own examples: "…you can describe any of these to Zapier's Copilot in plain English ('when someone submits my Google Form, add a row to my sheet') and it'll draft the Zap for you to review."
- **App count:** "hundreds more" → "thousands more" (now 9,000+).
- **Zapier MCP:** deliberately **omitted** (on-theme but too advanced for a beginner page — conscious cut).
- **Security, free-tier (100 tasks, two-step limit, 15-min polling, held-not-lost), pricing band ("low tens of dollars"), Make/n8n comparison:** all confirmed current, no change. (Note: the old "Starter" tier is gone — Free→Professional is now the only path — but the page never named Starter, so nothing breaks.)

### 2. Ollama "things to try" enhancement — APPROVED, archetype-level
Closes the "now what?" cliff: Ollama ends on *which model to pick* and hands the beginner nothing concrete to type (vs. ChatGPT's 5 copyable prompts). This is an **archetype-level change** — pick-and-setup gains a *usage* beat alongside *selection*, with precedent for the API/dev pages. Clean spec hook: §6's "things to try" hybrid sub-variant. Two tracks:
- **Headline track (the 8GB / small-general-model majority):** privacy-forward tasks that shine on a small local model — private thinking-partner, rewrite/summarize text you'd rather not send to the cloud, offline Q&A, learning-by-tinkering. Quick wins on the hardware they actually have.
- **Coding track (honestly gated):** "if you've got 16GB+ and a code model, here's something fun to build" — genuinely satisfying for the coding-motivated downloader (a real, sizable slice), but **scoped to small self-contained outputs** (single HTML page, short script, debug-a-snippet), NOT agentic multi-file "vibe coding" (frontier-cloud territory; a local 7B can't, and overpromising recreates the "local AI is bad" bounce at the 16GB tier).
- Sequenced after Zapier or interleaved — operator's call. Needs the merged renderer's copyable-prompt block (now available). Calibrate specific examples to what local code models actually do at build time (standing capability-research pass).

### 3. Pilot scope #4–#10 — now de-risked, decision still open
The pilot validated the template across archetypes, so selecting the next batch is unblocked. Session 15's candidate spread: an image generator, a coding tool, a meetings/notes tool, an API/dev service, and 1–2 verticals. Decide after Zapier (or alongside).

---

## Deferred / tracked (not lost, not urgent)

- **CLAUDE.md audit** — stale; downloadable triage already produced (`claude-md-audit-deferred.md`). **Trigger: before any non-hand-baked tutorial production** (self-contained prompts mask the staleness; batch work won't). Tier 1 (tutorials section is actively false / DB-implied; `.env.local` now UTF-8 not UTF-16; design-weakness #4 solved) rewritable without recon. Tier 2 (Stripe-vs-Clerk-Billing, typecheck script, P0 bug status, missing stack: Cloudflare/Resend/Sentry/Analytics/GSC, Clerk Dev→Prod) needs read-only recon. Tier 3 (lean down duplicated strategy to pointers; keep the moderation action-route policy). Also closes the Session 15 spec-maintenance debt. Sequencing: recon Tier 2 → one paste for Tier 1 + confirmed Tier 2 → Tier 3 last.
- **Two minor renderer notes** (fold into a future renderer pass, NOT standalone work): (a) the double "set up" header — "Getting set up safely" + "First things to try & getting set up" — an archetype-aware label for the starterActions slot would fix it, better decided once Zapier shows the second archetype's natural label; (b) Ollama's redundant official-docs parenthetical + "Official docs ↗" link pointing at the same place (content tidy).
- **Hover-tooltip glossary** (Zach's idea) — parked as a *candidate mechanism* for the **deferred glossary-build decision** (spec §7 long-tail glossary, §11 build-form open). Evaluate hover-vs-linked-glossary-page when that decision is made. **Gating constraint: mobile has no `:hover`** — any version needs a tap-to-reveal answer, which is most of the work. Need only bites once pages carry un-glossed long-tail terms (they don't yet). Note: this serves the *understanding* goal, which the inline gloss already handles; it's not an emphasis lever.
- **Bold emphasis escalation** — if white-semibold ever reads as too faint, orange is a one-token swap (on-spec: "highlights" is a stated job of the accent), accepting mild link-affordance overlap. Currently judged sufficient.
- **Branch cleanup** — backup-ref / merged-branch hygiene sweep offered by CC; deferred (housekeeping, better batched than done piecemeal at session end). Branches retained via `--delete-branch=false`: `tutorials/ollama-page`, `tutorials/inline-formatting`.

---

## Carry-forward from prior handoffs (unchanged, still owed)
Jasper dedup Neon dry-run (script merged; execution = separate operator step) · held vertical commit `9edda0fa` cherry-pick for Legal+Beginner eval · Clerk Production-instance migration (pre-paywall prereq) · LLC formation → business banking → production Stripe → paywall enable · For You news feed + Tier 2/3 deep tutorials (post-paywall).

---

## Designated first action next session
**Build the Zapier page (#2).** Content is locked above; draft the Claude Code build prompt mapping the reference content + the locked AI beat into the structured type, on the merged renderer (`85720686` base), with a fresh `lastReviewedAt` and the template conventions applied. Recon-first per usual (confirm live type field names, the `recipes`/connects-your-accounts security shape, and the two whereToNext categorySlugs: Workflow & Automation, Meetings & Notes).
