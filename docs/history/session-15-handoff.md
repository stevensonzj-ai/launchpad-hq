> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-15-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 15 Handoff — Tutorials Execution (Pilot Page #1 Live)

**Session type:** Execution in Claude.ai + Claude Code. Recon → schema decision reversal → type design → renderer build → content → visual redesign → merge. **Shipped to production.**

**Repo/DB state:** `main` advanced by one squash-merge (PR for `tutorials/structured-type`). Production live and verified at `launchpadhq.io/platform/chatgpt`. **No DB migration ran** — see the architecture decision below for why. Neon untouched.

---

## The headline

Pilot tutorial page #1 (ChatGPT) is **live, reference-grade, and the full production system is proven end to end** — file-based architecture, structured type contract, shared semantic renderer, and the content/accuracy bar. Every future tutorial page inherits this system. This session was less "wrote one page" and more "built and validated the machine that makes all ~170 pages."

---

## The architecture decision (the most important outcome — reverses Session 14's premise)

Session 14's schema decision assumed tutorials were DB-backed and planned a 3-column migration (`lastReviewedAt` / `changelogUrl` / `accessTier`). **Recon overturned that premise.** Findings:

- A DB `Tutorial` model exists (`prisma/schema.prisma`, `steps Json` shape) **but is dormant and unwired** — `prisma.tutorial` appears nowhere in `src/`.
- Live tutorials render from **static TypeScript files** (`src/data/tutorials/*.ts`) with a *different* shape (prose `sections[]`), via `getStaticTutorialForPlatform(slug)`.
- Both the DB model and the original static file were **OpenClaw exploratory scaffolding** — neither was a deliberate decision to honor (confirmed with Zach; consistent with the standing "OpenClaw = input, not ground truth" principle).

**Decision: file-based, DB model left dormant.** Reasoning: (1) the spec's prose-section shape matches the static type, not the DB's `steps Json`; (2) file-based gives the existing diff→preview→PR review workflow for free (a tutorial is a reviewable code diff, not a Neon SQL edit); (3) the three metadata fields become trivial TS fields — every migration gotcha evaporates; (4) better for SEO (fully static); (5) the only real DB advantage (`UserProgress`) doesn't apply to a read-top-to-bottom prose page. Hybrid (metadata-in-DB, body-in-file) was rejected — it reintroduces the two-source-of-truth sync seam we avoid on principle.

**Consequence:** the Session-14 schema migration is **cancelled, not deferred.** No `accessTier` enum, no Prisma change. `accessTier` is a TS union `'FREE' | 'PREMIUM'`; the field decisions survive, the substrate changed.

**Dormant DB `Tutorial` + `UserProgress` models:** documented dead scaffolding. Leave in place, revisit only if Tier 2/3 deeper tutorials ever become genuinely interactive/progress-tracked. Don't enrich a table nothing renders. (Removal would be its own destructive-migration task with the Neon-branch ritual — not bundled into pilot work. Note: recon only grepped `prisma.tutorial`; `userProgress` wiring was not separately confirmed.)

---

## The system that now exists (what every future page inherits)

### The type (`src/data/tutorials/types.ts`)
Structured skeleton replacing the loose `sections[]`. Key fields: `slug`, `platformSlug`, `title`, `tagline`, `archetype` (`'prompts' | 'recipes' | 'pick-and-setup'`), `lastReviewedAt`, `changelogUrl?`, `accessTier` (`'FREE' | 'PREMIUM'`), `howItWorks`, `whatItIs[]`, `beforeYouStart[]`, `gettingSetUpSafely?` (conditional, for local/install tools), `security`, `triad` (`bestAt/okayAt/avoid`), `starterActions[]` (each `title`, `whyHere`, `tweak?`, and a copyable `prompt?` / fallback `whatItDoes?`), `pitfalls[]`, `whereToNext[]`.

Two structured sub-types added this session:
- **`SecurityBlock[]`** = `{kind:'text', text}` | `{kind:'list', label, items[]}`. Ordered block list so security renders as labeled lists (not a prose wall) **while honoring spec §E's "posture varies completely by platform"** — a rigid shape would break Zapier (master-key) / Ollama (inverted) postures.
- **`WhereNext[]`** = `{label, categorySlug?, href?}`. Renderer resolves `categorySlug` → `/discover?category=${slug}`, else `href`, else plain text. `href?` reserved for the spec §I "tier-up to paid deep tutorial" link when that exists.

The type is a **compile-time contract** — a page can't ship missing a mandatory section, and conditional/flex sections are optional fields/arrays.

### The renderer (`src/components/tutorials/platform-tutorials.tsx`)
`"use client"` semantic-HTML renderer, the shared visual system for all pages:
- Hero with `TUTORIAL · {accessTier}` eyebrow (where `accessTier` becomes visible) + "Last reviewed" line.
- Per-section **lucide-react** icons, hardcoded per field (NOT string-matched — the old emoji string-matcher was deleted).
- **Security:** accent left-border + Shield + tint caution panel; renders `SecurityBlock[]` (text→paragraph, list→`<h4>` label + `<ul>`).
- **Triad:** three meaning-tinted columns (green/neutral/red) with Check/Minus/AlertTriangle.
- **starterActions:** monospace prompt block + `navigator.clipboard` copy button (icon→check, 1.2s); falls back to `whatItDoes` plain text when `prompt` absent (so recipe/setup archetypes still render).
- **whereToNext:** `next/link` pills with hover accent (real category links).
- Heading outline: title `<h2>` → sections `<h3>` → sub-items `<h4>`. Two font weights only (400/500). No gradients/shadows; animation limited to hover + copy confirmation. "Coming soon" empty state preserved.

Aesthetic principle that held: "less boring" came from **differentiation by section role + hierarchy + rhythm**, not effects. Restraint is the rule — effects read as try-hard, worse than boring. This was flagged against spec §12 (polish-over-substance risk) and justified because it's the *shared renderer* (one pass benefits all 170 pages) and the copy-button adds capability, not decoration. **The §12 line was drawn: this was the pass. Further aesthetic iteration would be the trap.**

### The content bar (ChatGPT page = the gold standard)
Reference-grade per spec: beginner on-ramp with inline glosses (`prompt`, `model`), security calibrated to ChatGPT's actual train-your-data posture (not boilerplate), honest triad, hedged pricing, real operational pitfalls. New pages match this depth and voice.

---

## Standing rule locked this session: web-research every page's volatile facts at authoring time

**The lesson, proven concretely:** the ChatGPT reference page — "validated" weeks earlier — already named a **retired model** (GPT-4o mini; the family moved to GPT-5.x) and was **missing two now-core capabilities** (native image generation; Codex). The model layer churned in *weeks*. The page survived only because the free-tier downgrade was written to *mechanism*, not by model name.

**The rule (a spec §4 amendment — current spec says "source every volatile fact," which understates it):**
> Every page gets a **live web-research pass** at authoring time covering: model lineup, current capabilities, free-tier shape, pricing bands, recent feature additions, **and deprecations**. Write to durable mechanism with researched facts as the hedge — never from model memory.

Two process requirements that make it reliable, not vibes:
1. **Capability-drift check** — not just "are old facts still true" but "**what's new that the page doesn't mention.**" Stale facts have a wrong value to catch; missing capabilities are invisible unless you look. Image-gen and Codex weren't wrong — they were *absent*. The research pass needs an explicit "what can this platform do now that we didn't cover" step.
2. **`lastReviewedAt` honesty** — the date means "volatile facts web-verified on this day," not "page written." No research pass → no fresh date. Keeps the field meaningful as the re-check trigger.

**This sharpens the Fable-vs-hand-build decision:** a batch generator is only viable if the per-platform research pass can be specified tightly enough to trust at volume. Given how far ChatGPT's facts moved, that bar is high — more evidence that **review capacity, not generation, is the constraint.**

---

## Process notes worth keeping

- **Dropped GitHub→Vercel webhook is a real intermittent.** One push this session created no deployment (commit clean on GitHub, no build attached). Fix: empty re-trigger commit (`git commit --allow-empty`) — faithful (builds origin), low-risk, vanishes in squash. **"Merge succeeded" ≠ "production built."** The merge ritual now permanently includes: after merge, query Vercel API to confirm the **production** deployment matches `main` HEAD and reached READY. This earned its place in the ritual.
- **Recon-before-edit paid off twice** — caught the dormant-DB-model premise reversal, and caught the loose-type blast radius (3 files, zero external consumers) before the redesign.
- **CC's self-correction-with-disclosure worked** — proactively dropped title weight `bold→semibold` to honor the two-weight constraint and flagged it; renamed an `h2` style constant to `SECTION_HEADING` when the tag changed. Good autonomous judgment.

---

## Next actions (in order)

### 1. Pilot scope (#4–#10) — the immediate decision
Zapier + Ollama reference pages already exist (recipes + local archetypes) → they're #2/#3, content-ready, just need the build + research pass against the new type. The open question is **#4–#10**, and the goal is **crossing archetypes to stress the template**, not rewriting chat LLMs.

**Recommended weighting (react to this next session):** an image generator (Prompts, but tests image-output/visual angle), a coding tool, a meetings/notes tool (Recipes), an API/developer service (Pick-and-set-up), and 1–2 verticals — deliberately spanning the §6 archetype menu so the format gets pressure-tested where it's weakest. Weight within that toward popular/easy-to-source platforms for clean data.

### 2. Build Zapier + Ollama pages (#2/#3)
Map the existing reference-page content into the new structured type (same exercise as the ChatGPT swap), each with a fresh web-research pass. These validate the type against the *other two archetypes* (recipes, local/setup-heavy — exercises `gettingSetUpSafely` and the inverted security posture for the first time).

### 3. Deferred build decisions (unchanged, phone-friendly)
- Glossary build-form (static page vs. collection vs. table) — start simple; spec §7.
- Where the FREE/PREMIUM line falls (business call; `accessTier` stores whatever's drawn).
- Fable-vs-hand-build — post-pilot, sized to review capacity (now further informed by the research-pass burden).

### 4. Spec doc maintenance
- Amend `tutorial-template-spec.md` §4 with the web-research/capability-drift rule above.
- Amend §9 to record the architecture reversal (file-based; migration cancelled; `accessTier` as TS union not Prisma enum).
- Note the dormant DB model as documented tech debt (CLAUDE.md).

---

## Standing items from prior handoffs (not touched this session)
Held vertical commit (`9edda0fa`) cherry-pick + Legal/Beginner eval + verticals keyword-vs-category matching; `/for-you` QuizCta "5 quick questions" copy fix; Clerk Production-instance migration (pre-paywall prereq); P0 bugs (Jasper dedup Neon dry-run, platform-detail duplicated content); For You news feed + AI News tab (future, `/ultraplan` candidate); paywall enforcement (gated on monetization-ready bar). Resend root-domain verification confirmed correct (retire the stale Session-9 "send subdomain only" note).
