> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `tutorial-template-spec.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# LaunchpadHQ — Tutorial Template Spec (Tier 1)

**Created:** Session 14 planning discussion (strategy/planning; no code executed).
**Status:** Format validated across three archetypes (ChatGPT, Zapier, Ollama). Ready to drive production once the schema decision lands.
**Pairs with:** `business-strategy-reference.md`, `product-roadmap-reference.md`, and the three validated reference pages (ChatGPT / Zapier / Ollama — keep them alongside this doc as the canonical worked examples).

---

## 1. Purpose & scope

This spec defines the **Tier 1 prompt-starter-kit / quick-start tutorial** format for LaunchpadHQ — one page per platform, across all ~170 platforms, **free and server-rendered for SEO**.

It is written for Tier 1 but **designed to extend** to the deeper paid tiers (Tier 2 written quick-starts, Tier 3 evergreen concepts) without a rework — the section skeleton and the schema below anticipate the free/paid split.

**The strategic constraint this format exists to satisfy:** Google's March 2026 core update made *scaled content abuse* (many thin, templated, low-value pages) its top enforcement target — a flag hits the whole domain, including the catalog SEO already earned. Every rule in this spec exists to make each page **genuinely, demonstrably useful to a beginner** so the section is defensible. The corollary: this is **real per-platform content work, not a weekend batch** — see §10.

---

## 2. Audience (read this before writing anything)

Two beginner segments, and the page must serve both:

1. **First time using *this* platform** (knows AI generally).
2. **First time using AI *at all*** (this may be their first-ever AI experience).

**Design consequence:** assume nothing. The page must orient the absolute novice *before* it gets useful — which is why "How it works" and define-on-first-use (below) are mandatory, not optional. The test for every sentence: *would someone whose first-ever AI experience this is understand it?* If a term, process, or assumption would stop a novice, it gets fixed.

---

## 3. Voice & length

- **Voice:** warm but direct; talks to the beginner as a peer, never down to them. Honest over promotional — this page tells them things the vendor's marketing won't.
- **Length:** ~700–900 words. Long enough to be substantive (and non-thin), short enough not to overwhelm.
- **No hype.** "Useful, not magic" energy. Name what the tool is *bad* at as plainly as what it's good at.

---

## 4. The accuracy & sourcing standard (non-negotiable)

The #1 failure mode for this format is **confidently wrong platform facts** (free-tier limits, model names, prices, features, setup steps). It's the same hallucination risk the roadmap flags for the news feed.

- **Source every volatile fact** — do not write limits, prices, model names, or setup specifics from model memory. They change monthly and even current sources disagree (we saw this live on all three pilot pages).
- **Prefer durable mechanism over precise volatile specifics.** Write "the free tier has limits that reset on a rolling window; hit them and you're quietly downgraded to a smaller model" — not "exactly 10 messages per 5 hours on GPT-5.3." The mechanism stays true; the number is stale in weeks.
- **Where a specific is genuinely needed** (a rough price band, a RAM floor), hedge it ("currently," "around," "about") and rely on `lastReviewedAt` to govern its shelf life.
- This standard is *why* `lastReviewedAt` must exist before production (§9).

---

## 5. Page structure (the seven-section skeleton + on-ramp)

Order top to bottom. Sections marked **[flex]** change weight by platform; **[conditional]** appear only for certain archetypes.

### Title + one-line tagline
What it is, in a phrase a beginner gets instantly. *(e.g., "Connect the apps you already use and let them talk to each other — no code.")*

### A. How it works *(NEW — the absolute-beginner on-ramp)*
One or two plain sentences on the basic *motion* of using the tool, before any "what it's good at." This is where the first-time-to-AI user gets oriented instead of intimidated. *(e.g., for a chatbot: "You type a message, it types back in plain language, and you can keep the conversation going — including asking it to redo or improve its answer.")*

### B. What it is
2–4 sentences. What the tool is, who it's for, and **why a beginner would pick it over the alternatives**. The "why this one" framing is inherently per-platform and starts the differentiation.

### C. Before you start **[flex]**
Orientation facts: cost to start, what you need to sign up / what it runs on, the free-tier shape (described as *mechanism*, per §4), and the beginner's real decision: **"will you realistically need to pay?"** — answered directly ("free is plenty for X; you'd only pay if Y"). Include a **ballpark price band** if paid tiers exist (hedged, e.g. "paid plans start around $20/month") and a concrete **first step** ("go to [official site], sign up free, you're in"). This section *expands* when the barrier to entry is itself the story (see Ollama: hardware, technical comfort).

### D. Getting set up safely **[conditional — local / install-heavy tools]**
For tools the user downloads and runs on their own machine, setup is promoted out of "Before you start" into its own section. Job #1: **name the one official download source and tell them not to trust random search results** (installing software = whole-machine blast radius). Then: check hardware *before* installing, know where large files (models) accumulate, and confirm-it-worked checkpoint. **Link out to the vendor's official install steps** rather than reproducing them (§7). For cloud tools this section does not exist; its lightweight equivalent lives as the "first step" line in C.

### E. Privacy & security **[keyed to `privacyLevel`]**
The page-level expression of the curation signal already in the DB. Posture varies completely by platform — there is no boilerplate here, which is exactly why it's strong anti-thin-content. Three validated postures:
- **Cloud, trains-your-data (e.g. ChatGPT):** "treat it as not private; here's what never to paste; here's the opt-out toggle."
- **Connects-your-accounts (e.g. Zapier):** "this is a master key to your other apps; lock down *this* account, limit connections."
- **Local / private-by-default (e.g. Ollama):** the warning *inverts* — "this is the private option; the only way to lose that is to misconfigure it / install from an untrusted source."

Keep it honest and calibrated to the platform's actual `privacyLevel` (LOW = measured note; HIGH = sharp, specific warning). Don't manufacture alarm for a safe tool; don't go soft on a concerning one.

### F. Best at / Okay at / Avoid (the triad)
The strongest single differentiator on the page — no marketing page writes it, and it's inherently per-platform. Three honest buckets: what it's genuinely good at, what it's only okay at, what to avoid using it for *(for now)*. May assess **fit** (is this right for *you* / your hardware), not only raw capability.

### G. Starter [actions] — the flexible slot **[archetype-dependent — see §6]**
The "show its legs" section. Content type depends on the platform archetype (prompts / recipes / what-to-pick-&-setup). 3–5 items **[flex count]**, each with: the item, what it does, and **why it works on *this* platform specifically** + what to tweak. The "why here" line is the core differentiator — it's what makes a Midjourney kit ≠ a DALL·E kit with the name swapped.

### H. Beginner pitfalls to avoid
3–5 **[flex count]** platform-specific traps a novice actually hits. Always include the free-tier/limit gotcha where relevant. These are observed, real mistakes — not generic AI caveats.

### I. Where to go next
Cross-links into the catalog (related categories, the tier-up path) and a hook toward the eventual paid deep tutorial. Reinforces internal linking (SEO) and keeps the user in the funnel.

---

## 6. The Starter-[actions] archetype menu (Section G)

Section G's *content type* is platform-dependent. Three archetypes, mapped to the 20 catalog categories:

| Archetype | Section G becomes | Catalog categories |
|---|---|---|
| **Prompts** | "Starter prompts to try" | Text & Conversational, Image, Video, Music, Voice & Speech, Research, AI Coding, Sales/Marketing/SEO, Education, Legal, Healthcare, Finance & Real Estate, International, Gaming |
| **Recipes / workflows** | "Starter automations to try" (When→then) | Workflow & Automation, AI Plugins for Business Software, Meetings & Notes |
| **Pick-and-set-up** | "First [models/configs] to try" + getting-started | Local & Open-Source AI, AI APIs & Developer Services |

**Hybrid / "things to try" sub-variant:** upload-or-task-based tools (Document & PDF Processing, parts of Research, some verticals) use a prompt-like "things to try" framing — example tasks ("upload a contract and ask it to…") rather than pure creative prompts. Treat as a flavor of the Prompts archetype.

**Note:** the archetype is *derivable from the platform's category* — it likely does **not** need its own DB field. Confirm during schema recon (§9).

---

## 7. Cross-cutting rules

### Define-on-first-use (+ glossary) — *decided: inline glosses + linked glossary*
The first time a **load-bearing term** appears on a page, gloss it inline in a few plain words. A novice's whole mental model depends on 2–3 of these per page, and they're invisible to a fluent reader. Per-archetype starter lists of terms that qualify:
- **Prompts/chat:** *model* (the AI "brain"; there are smarter-slower vs. faster-simpler ones), *prompt* (the message you type).
- **Automation:** *trigger* (the "when"), *action* (the "then") — and clarify that "two-step = one trigger + one action," since "two steps but one action" confuses beginners.
- **Local:** *parameters* (rough proxy for model size/smartness — more is smarter but heavier), *RAM* (your computer's short-term memory — and how to check it), *command line* (a text window where you type instructions instead of clicking), *open-source*, *pull* (download a model).

**Approach:** inline-gloss the 2–3 most load-bearing terms per page (keeps each page self-contained + SEO-strong); **link the long tail into a small shared beginner glossary** so pages don't each become a dictionary. Glossary build-form (static page vs. content collection vs. table) is an open build decision (§11) — start simple.

### Link-out, don't reproduce
For any **volatile, OS-specific, or step-by-step mechanic** — install flows above all — **own the durable judgment/safety framing and link to the vendor's official docs for the literal steps.** The vendor maintains their own steps better than we can, reproducing them is stale + duplicative (thin-content risk), and a wrong setup guide is worse than none. We add the wisdom; they supply the mechanics.

### Pricing — *decided: include a hedged ballpark band*
Cost is load-bearing for a budget-conscious beginner (literally the target user). Give a rough band ("paid plans start around $X/month") rather than precise SKU pricing, hedged per §4 and governed by `lastReviewedAt`. Answer the real question ("will *I* need to pay?") in §C, not just the limits.

### Security keyed to `privacyLevel`
See §E. The page and the catalog tell *one* consistent story; the security section is where the DB's `privacyLevel` signal becomes prose.

### Flex rules (summary)
- **Before you start** expands when entry barrier is the story.
- **Getting set up** promotes to its own section for local/install-heavy tools only.
- **Triad** may assess fit (user/hardware), not just capability.
- **Section G** content type = archetype (§6); **count flexes 3–5.**
- **Pitfalls count flexes 3–5.**

---

## 8. Validated reference pages

Three pages were drafted and stress-tested against this format — they are the **canonical worked examples**, one per archetype. Keep them stored alongside this spec:
- **ChatGPT** — Prompts archetype; cloud/trains-your-data security posture.
- **Zapier** — Recipes archetype; connects-your-accounts security posture.
- **Ollama** — Pick-and-set-up archetype; private-by-default (inverted) security posture; dedicated "Getting set up safely" section.

If writing a new page, find the closest archetype here and match its shape and depth.

---

## 9. Schema fields this template implies — DECIDED (Session 14)

**The migration adds three new fields to the tutorial table; one proposed field is deliberately excluded.** Before building: Claude Code does **read-only recon on the actual tutorial schema first** (some fields may already exist or follow existing naming conventions). The migration itself is a **human-gated operator step** — Neon branch first, tested, never silent.

**In — add these three:**
- **`lastReviewedAt` (DateTime)** — *required.* "Last checked on" stamp. Three sections per page (Before-you-start, Privacy/security, Setup) carry shelf-life facts; this is both the E-E-A-T freshness signal Google rewards *and* the internal re-check trigger. Local/setup-heavy pages need re-review most often.
- **`changelogUrl` (String?, optional)** — link to the platform's official "what's new" page, to speed re-review. Cheap now, painful to backfill later.
- **`accessTier` (enum: `FREE` / `PREMIUM`)** — the access/paywall axis. **Renamed from the earlier `tutorialTier` on purpose:** the free/paid line is drawn by **depth/access**, not by content-tier number (roadmap: light pages — starter kits *and* evergreen concepts — are free + indexed; deep platform guides are paid). Naming it for *access* avoids conflation with content Tiers 1/2/3. **Enum, not boolean,** for one-migration headroom (room to add e.g. a members-free level later without another migration). Drives both the paywall and what gets indexed.

**Out — excluded by decision:**
- **Sourcing trail (`sources` / `sourcedAt`)** — kept in the **content/review process, not the database.** It's a working note for the reviewer, not a fact the site stores or displays. Keeps the table clean.
- **Archetype field** — not needed; derivable from the platform's category (§6). Confirm during recon.

**One open product question (deferrable, NOT a schema blocker):** exactly where the free/paid line falls — which depths are free vs. premium — is a business/content call. `accessTier` stores *whatever* line gets drawn; the line itself can be decided later, per-page, without touching the schema. Today's decision commits nothing on monetization.

**Net migration: three columns, one change.** Decision locked; read-only recon + the gated operator migration is the execution step.

---

## 10. Production model (the honest part)

The format validation proved every section needs **genuine per-platform substance + a sourcing pass**. That's the win (defensible vs. Google) and the burden (not a 170-in-a-weekend job).

- **Pilot first:** hand-build **5–10 pages across different archetypes** (not all chat LLMs) before committing the full set — pressure-test the template and the non-thin bar against reality. *(In progress: ChatGPT/Zapier/Ollama drafted; these double as the §8 reference pages.)*
- **Pilot pages are for judgment, drafted in docs — not indexed.** Don't put thin-risk validation pages live while the bar is still being set.
- **Cadence, not a flood:** stage the rollout (batched by category). A sudden 170-page velocity spike is itself a scaled-content detection signal.
- **Fable vs. hand-build:** decide *after* the pilot. If the template + per-page sourcing can be specified tightly enough that a batch of outputs is reviewable in bulk, Tier 1 becomes a Fable brief (per the playbook — pre-decide every judgment call, intent over literal payloads, branch-per-task, owner is the reviewer). If per-page judgment stays high, it's a slower hand-build. **Your review capacity is the real constraint — size the batch to it.**

---

## 11. Open items / decisions still to make

- **Schema decision** (§9) — the immediate next gate. Confirm the full field set, then operator migration (Neon branch first).
- **Glossary build-form** (§7) — static page vs. content collection vs. table. Start simple; it's also indexable SEO surface + internal-linking.
- **Free/paid rendering** — how a FREE Tier 1 page and a PAID deep tutorial differ visually and in access (ties to `tutorialTier`).
- **Pilot scope confirmation** — which 5–10 platforms (weighted to popular/easy for data, but crossing archetypes).
- **Fable-vs-hand-build** — decided post-pilot.
- **Tiers 2 & 3** — deferred pending Tier 1 quality review (per roadmap).

---

## 12. The discipline to protect

The monetization-ready bar is **news + tutorials + personalization**; tutorials is "BUILD FIRST." The standing risk (per the strategy doc) is the pull toward *polish* over *substance*. This spec is substance. Build toward the bar; resist letting a contained, satisfying side-task (e.g. the Discover filter redesign) crowd out the page-by-page content work that actually moves the needle.
