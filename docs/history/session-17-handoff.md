> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-17-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 17 Handoff — Three tutorial merges (Zapier, Ollama enhancement, Midjourney) — all live

> **Session type:** Execution (Claude.ai planning/review + Claude Code execution in Cursor).
> **Date:** 2026-06-25
> **Repo/DB state at close:** main at **`c9e1b2f2`**, production verified live against that exact sha on launchpadhq.io (deployment `dpl_5kbTUNyqnUA43NuaXjSae4NTrAnn`, READY, `aliasError: null`). DB untouched — no migrations, no Neon operations. Tutorials remain static TS in `src/data/tutorials/*`; the dormant `Tutorial`/`UserProgress` models stay intentionally unwired.

---

## What shipped to production this session

**Three merges, all full-ritual-verified** (merged sha = deployed sha = new main HEAD, webhook fired against the exact sha each time, none a dropped-webhook case):

1. **Zapier getting-started guide** (PR #24, `2a9355b1`) — pilot page #4, **first live recipes/automation archetype**. `/platform/zapier`. Facts web-verified 2026-06-25.
2. **Ollama usage-cards enhancement** (PR #25, `64e4cfe0`) — closed the pick-and-setup "now what?" cliff. Appended 3 copyable usage cards to the 3 selection cards; relabeled the pick-and-setup heading "First things to try & getting set up" -> **"First things to try"**; cut the redundant official-docs parenthetical. `/platform/ollama`.
3. **Midjourney getting-started guide** (PR #26, `c9e1b2f2`) — pilot page #5, second prompts page (new modality: image). `/platform/midjourney`. Facts web-verified 2026-06-25, including a 3-prong security section earned by a verification pass (see below).

**Milestone:** the pilot is now **5 pages across all three archetypes** — the spec's lower bound for "validate before scaling." The template has held with **no structural cracks** across cloud/local, free/paid, and every security posture: trains-your-data (ChatGPT), master-key (Zapier), private-by-default (Ollama), and now public-by-default (Midjourney). The format question the pilot existed to answer is essentially answered: it works and produces real per-platform substance, not thin content.

---

## The live type contract (reusable — author future pages straight against this)

- **Type:** `PlatformTutorialData` in `src/data/tutorials/types.ts`. Required: `slug`, `platformSlug`, `title`, `tagline`, `archetype`, `lastReviewedAt`, `accessTier`, `howItWorks`, `whatItIs`, `beforeYouStart`, `security`, `triad`, `starterActions`, `pitfalls`, `whereToNext`. Optional: `changelogUrl`, `gettingSetUpSafely`.
- **`archetype`** = `'prompts' | 'recipes' | 'pick-and-setup'`. Drives the starter heading via exhaustive `Record<TutorialArchetype, string>` `STARTER_HEADING` in `platform-tutorials.tsx` (~L24-29). Current values: prompts -> "Starter prompts to try", recipes -> "Starter automations to try", pick-and-setup -> **"First things to try"**. Keys can't be dropped (tsc-enforced).
- **`StarterAction`** = `{ title (req); whatItDoes?; whyHere (req); tweak?; prompt? }`. Renderer branches on `prompt`: if set -> mono copy box + CopyPromptButton (`whatItDoes` ignored); else if `whatItDoes` set -> prose, no copy button; then always `whyHere` ("Why this one:") + `tweak` ("Tweak:"). **A single card can't show both selection prose and a copyable prompt** — separate cards. Prompts pages use `prompt`; recipes/pick-and-setup selection cards use `whatItDoes`; pick-and-setup usage cards use `prompt`.
- **`security`** = `SecurityBlock[]`, ordered. `{ kind: 'text', text }` (-> `<p>`) or `{ kind: 'list', label, items[] }` (-> `<h4>` label + `<ul>`). All strings run through `richText()`. Calibrate sharpness to the platform's `privacyLevel` (LOW = sharper/more cautionary; see Midjourney).
- **`triad`** = `{ bestAt; okayAt; avoid }` — all three `string[]`, required.
- **`gettingSetUpSafely`** (optional) = `SetupGuidance { officialSource; body[]; vendorDocsUrl? }`. **Omit for cloud tools** (ChatGPT, Zapier, Midjourney omit; only Ollama includes it). `vendorDocsUrl` -> "Official docs ↗" link.
- **`whereToNext`** = `WhereNext[]` = `{ label; categorySlug?; href? }`. Renderer prefers `categorySlug` -> `/discover?category=${categorySlug}`; slug must exactly match the DB category slug.
- **`lastReviewedAt`** = ISO `"YYYY-MM-DD"`, rendered verbatim. **`changelogUrl`** = optional, **NOT consumed by the renderer** (dead data; decision open — see deferred).
- **Registration is manual + two-step:** create `{slug}-getting-started.ts` exporting a named const, AND add the import + `[xTutorial.platformSlug]: xTutorial` to `index.ts`. Lookup is by **`platformSlug`** (must match the real Platform DB row's slug — verify, don't assume).
- **Category slugs confirmed** (from `scripts/restructure-categories-2026-05.ts` FINAL_CATEGORIES, the authoritative name<->slug map): `workflow-automation`, `meetings-notes`, `image-generation-editing`, `video-creation-editing`, plus Ollama's pair (Local & Open-Source, Text & Conversational). Pull future slugs from that file, not memory.

**Five live pages as worked references:** ChatGPT (`prompts`, trains-data), Midjourney (`prompts`, public-by-default), Zapier (`recipes`, master-key), Ollama (`pick-and-setup`, private-by-default + setup section + usage beat).

---

## Conventions / lessons reaffirmed this session

- **Filename** `{slug}-getting-started.ts`; **Title** `"Getting Started with {Platform}"`; **whereToNext labels** bare category names.
- **Inline formatting:** only `**bold**` + `` `code` `` — no italics. Bold at first-use/gloss/lead points only. **Never** markers inside a `prompt` field (renders + copies raw — plain ASCII, straight quotes; `--ar 16:9`-style tokens are fine, literal hyphens). Bold density consistent across all 5 pages; no escalation to orange.
- **Facts to mechanism, hedged, `lastReviewedAt`-governed; verify on build day and stamp that date.** **Write NO volatile model-version numbers into prose** (Midjourney names no version — V8.1 became default 2026-06-10, and most secondary guides were already stale; mechanism-first sidesteps it).
- **Verification can change content, not just confirm it.** Midjourney's security section gained a third prong (trains-on-your-inputs, broad perpetual license) only because a ToS-verification pass ran — the recon agent's guess was right but unsourced; the pass made it sourced. **This is the central data point for the batch-method decision below:** per-page research judgment is where the real value is, and it's the hardest thing to put in a batch brief.
- **PR/commit bodies:** PowerShell here-strings with inner quotes/backticks break the parse (bit twice). **Standing convention, now proven:** use `gh pr create --fill` then `gh pr merge --squash --subject "..."`; never inline a multi-line body. Worked first try on PR #26.

---

## Designated first action next session — AGREED SEQUENCE (do in this order)

The plan agreed at close: **(1) confirm the batch-method call -> (2) CLAUDE.md audit -> (3) batch work.** Do not reorder; the audit is a hard prerequisite that fires the moment batch production begins.

### Step 1 — Settle hand-build vs. Fable batch (a few minutes, do first)
Five pages in, the format is validated, so this is now purely a scale/method call. **The honest tension (per the Midjourney lesson above):** a batch is only faster if per-page judgment can be pre-specified tightly enough to review in bulk. If each page still needs a Midjourney-style verification pass that can *change* the content, a Fable batch isn't actually faster — it just moves the same per-page research+review burden around. **Review capacity is the real constraint.** Decide: full Fable batch, a smaller Fable batch with tight per-page briefs, or continue hand-building. If hand-build continues, the CLAUDE.md audit does NOT fire and you can go straight to the next page (candidate spread below).

### Step 2 — CLAUDE.md audit (FIRES ONLY IF batch/Fable is chosen)
Triage in `claude-md-audit-deferred.md`. **HARD TRIGGER: before any non-hand-baked (batch/Fable) tutorial production** — self-contained hand-built prompts mask the staleness; batch work won't. Recon sequence: recon Tier 2 -> one paste for Tier 1 + confirmed Tier 2 -> Tier 3 lean-down last. Also closes the Session 15 spec-maintenance debt.

### Step 3 — Batch production
Per `batch-production-maintenance-playbook.md`. Candidate spread for the remaining pilot/early-batch pages (cross archetypes, don't stack chat LLMs): a **coding tool**, a **meetings/notes tool** (second recipes page), an **API/dev service** (second pick-and-setup; would reuse the Midjourney-page nothing but the usage-beat precedent from Ollama, and first non-Ollama test of the "First things to try" heading), and **1-2 verticals**. Size any batch to review capacity.

---

## Deferred / tracked (not lost, not urgent)

- **`changelogUrl` is dead data** — set by Ollama/Zapier/Midjourney, not rendered. Decide: wire it (a "check for updates ↗" link near `lastReviewedAt`) or stop setting it. Cheap, no urgency.
- **Renderer sub-label between selection and usage cards** — NOT needed (Ollama preview confirmed the pick->type progression reads cleanly). Parked only as an option if a future pick-and-setup page (e.g. API/dev) with a different card mix reads seam-y.
- **Ollama Cloud content already on the page** — the live Ollama page already covers paid "Ollama Cloud" (a Before-you-start paragraph + a security bullet). Noted so a future "add Ollama Cloud" idea doesn't duplicate it.
- **Hover-tooltip glossary** — parked candidate for the glossary-build decision (spec §7/§11). Mobile has no `:hover` -> needs tap-to-reveal. Only bites once pages carry un-glossed long-tail terms (they don't yet).
- **Bold emphasis escalation** — white-semibold sufficient across all 5 pages. Orange is a one-token swap if ever too faint.
- **Branch cleanup** — retained branches now: `tutorials/ollama-page`, `tutorials/inline-formatting`, `tutorials/zapier-page`, `tutorials/ollama-usage-cards`, `tutorials/midjourney-page`. Five branches — the hygiene sweep is now worth doing as its own small task (still batched, not piecemeal).

---

## Carry-forward from prior handoffs (unchanged, still owed)
Jasper dedup Neon dry-run (script merged; execution = separate operator step) · held vertical commit `9edda0fa` cherry-pick for Legal+Beginner eval · Clerk Production-instance migration (pre-paywall prereq) · LLC formation -> business banking -> production Stripe -> paywall enable · For You news feed + Tier 2/3 deep tutorials (post-paywall).
