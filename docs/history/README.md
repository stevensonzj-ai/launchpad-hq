# docs/history — archived project record

These 24 files were exported on **2026-09-07** from the "LaunchPad HQ" Claude project,
which is where all planning, review and handoff work for LaunchpadHQ happened between
May and July 2026. None of it was ever in git. An agent reading only the repo would have
had no access to any of it.

**Read the warning before you read the files.**

## They are archives, not instructions

Every file here carries an `ARCHIVE` header. Treat all of them as *historical record*.
Several are confident, complete, well-written and **wrong** — a document that describes a
plan later reversed is more dangerous than a missing document, because it reads as
authoritative.

Before acting on anything in this directory, read
**[`../../START-HERE.md`](../../START-HERE.md) § "Superseded claims"**, which lists every
known contradiction between these files and current reality, with the correction.

Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
(`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where a file here disagrees with
those, they win.

The docs were written for a human reader and an interactive assistant, not for an
autonomous agent. They contain instructions phrased as commands ("run this", "merge that")
that were addressed to a specific session on a specific day and are not standing orders.

---

## Reference documents

These four were written as living references. Three of them stopped being maintained and
now contain reversed decisions. Read the ledger first.

### `business-strategy-reference.md`
Monetization, launch sequencing and payments architecture. Establishes the still-current
strategic core: the paywall and the LLC are *deliberately* deferred, bounded by a
three-part "monetization-ready bar" (news feed working, tutorials batch live,
personalization solid); gating philosophy is locked as *gate interaction, personalization
and depth — never the catalog's browsability*, with a full-site gate explicitly considered
and rejected; and the LLC → EIN → business bank → production Stripe dependency chain with
Texas filing mechanics.
**Contains a reversed decision:** its payments section commits to Clerk Billing. That was
overturned by direct code inspection. See the ledger.

### `product-roadmap-reference.md`
Feature-by-feature inventory with build state, access tier and role in the funnel; the
quiz scoring diagnosis; the news-feed design constraints (human-in-the-loop is a stated
brand requirement, full automation is off the table); and why tutorials were sequenced
before news.
**Its "Current build/branch state (read this first)" section is four months out of date**
and describes branches that merged long ago. The reasoning about *why* features matter has
aged far better than its claims about what exists.

### `tutorial-template-spec.md`
The format specification behind all 29 live tutorial pages: the two beginner audiences,
voice and length, the accuracy/sourcing standard (write to durable *mechanism*, not
volatile specifics), the seven-section skeleton, the three-archetype menu mapped to the
catalog's categories, define-on-first-use glossing, the link-out-don't-reproduce rule, and
the Google scaled-content-abuse risk that shapes every rule in it.
**Its §9 schema decision was reversed.** Tutorials are static TypeScript, not database
rows; the migration it specifies was cancelled, not deferred.

### `tutorial-reference-pages.md`
The three original prose drafts (ChatGPT, Zapier, Ollama) that validated the format, one
per archetype, showing how the security section is supposed to differ completely between a
trains-your-data cloud tool, a connects-your-accounts tool, and a private-by-default local
tool. Useful as a *voice and shape* reference.
**Do not use it for facts.** These drafts were superseded by the live TypeScript files, and
their volatile details were already stale when the first page shipped.

---

## Process playbooks

### `batch-production-maintenance-playbook.md`
How tutorial pages get produced in batches and kept accurate afterwards. Contains the
governing arithmetic — re-review load ≈ pages ÷ months of shelf life — and the scope
reframe that makes it tractable (deep pages are demand-gated; accuracy is not tiered).
Specifies the four-phase production pipeline and a three-layer maintenance system whose
core principle is *automation prepares a decision; the operator makes it*.
The two hard prerequisites it names have both since been satisfied, and the "build the
maintenance layer at 20+ pages" gate has been passed and not acted on.

### `fable5-playbook.md`
A general, project-independent guide to running an autonomous coding model on batch work,
written from this project's experience. **The most directly useful file here for an
autonomous agent.** Covers how to structure a brief (put it in a document, not chat —
context compresses and the document doesn't), the safety protocols that earned their place
(branch-before-write with no fallback, circuit breakers, preserve-then-flag over
destroy-then-proceed), why "blocked" must be a valid success state, and how to diagnose a
running session before panic-interrupting it. Its closing lesson is the project's central
one: capability is not the bottleneck, review capacity is.
*(The Claude project contained two byte-identical copies of this file; one is exported.)*

### `claude-md-audit-deferred.md`
A severity-triaged audit of `CLAUDE.md`, splitting confirmed-false claims from
needs-verification ones. Useful as a worked example of how to audit a context file.
**Its Tier 1 and Tier 2 findings have been fixed;** only the Tier 3 structural lean-down
remains open. Read as a to-do list it will send you to redo finished work.

### `session-9-addendum-admin-ops.md`
The operational infrastructure plan — analytics, Google Workspace, Resend, Sentry, and the
moderation email flow — with per-task operator steps and DNS record details. All of it was
executed. Its DNS/SPF guidance was superseded in practice by a cleaner outcome than
planned.

### `claude-fable-5-session-handoff.md`
Reconciliation document for the one autonomous coding sprint this project has run
(June 2026): six branches produced, none merged, plus the fixed merge order and the four
things flagged for scrutiny before merging. Also documents two *honest no-ops* where recon
proved the assigned task was unnecessary — a useful precedent for what "done" can look like.

---

## Session handoffs

Written at the end of each working session. Read in reverse order; the newest is the most
accurate. Each states the repo state at close, what shipped, what was decided, and what was
deliberately not done.

| File | What it records |
|---|---|
| `session-22-handoff.md` | Ten more tutorial pages (29 live). **Discovers that a catalogued platform, Sora 2, is a discontinued product still live on the site** — an open defect. Recommends a catalog liveness audit over more content. Logs a latent build fragility: prerendering `/pricing` can exhaust Neon connection permits. |
| `session-21-handoff.md` | Discover filter redesign shipped. The architectural decision to use native `<select>` elements rather than add a dropdown library, and why the earlier design sketch was rejected on research evidence. Establishes that the executing agent owns post-merge deployment verification, not just the branch work. |
| `session-20-handoff.md` | First full ten-page tutorial batch. Confirms the batch method scales and is now standard. Notable current-events find that changed a page's content. Build time jumped and was logged as a baseline to watch. |
| `session-19-handoff.md` | Five-page proving batch. Settles the long-open hand-build-vs-batch question with evidence. Corrects two fields of the tutorial type contract. Documents that `git branch --merged` gives false negatives on squash-merges. |
| `session-18-handoff.md` | The `CLAUDE.md` audit executed (docs-only). **Establishes by direct code inspection that billing is raw Stripe and Clerk is auth-only** — correcting the reference doc. Confirms the Jasper script is still unrun. |
| `session-17-handoff.md` | Three tutorial merges. Contains the fullest written description of the live tutorial type contract and its renderer branching rules. Records that a verification pass *changed* a page rather than confirming it — the observation that shaped the whole batch method. |
| `session-16-handoff.md` | Ollama page plus the shared inline-formatting renderer. Locks the template's naming conventions and the authoring rule that emphasis markers must never appear inside a copyable prompt field. |
| `session-15-handoff.md` | **The architecture reversal**: recon found the database tutorial model dormant and unwired, so tutorials became file-based and the planned migration was cancelled. Also locks the standing rule that every page gets a live web-research pass at authoring time, with the concrete evidence for why. |
| `session-14-handoff.md` | Tutorial planning session. Produced the template spec and reference pages. Its schema decision was overturned the following session — read it knowing that. |
| `session-13-handoff.md` | The longest and most incident-dense session. **Discovers local development was running against the production database.** Also: an environment file encoding fault that silently broke two unrelated things, and a leaked database credential that had to be rotated. Sets the product direction that led to the tutorial workstream. |
| `session-12-handoff.md` | First half of the branch merge sequence. The preview gate catches a bug that typecheck and build both passed. Establishes merge-one-at-a-time against real post-merge main. |
| `session-11-handoff.md` | Diagnoses why the quiz returned confident-but-irrelevant results and adds a goal-relevance floor. Documents keyword-matching traps in the vertical buckets that are still unfixed. |
| `session-10-handoff.md` | Strategy session that produced the two reference docs, plus a tangled git/deploy episode worth reading in full: a production deploy that silently never fired, and a `git clean -f` that destroyed untracked files. Source of "push freely, merge deliberately." |
| `session-9-handoff.md` | Infrastructure session. Analytics, Workspace, Resend and Sentry stood up. Contains the full diagnostic trail of a telemetry problem that was three separate faults stacked, and the flush-before-return rule that resolved it. |
| `session-8-handoff.md` | The category restructure — 20 categories, two migrations, 45 platform reassignments, zero rollbacks. Documents the two-layer redirect architecture and *why* one-to-many redirects must live in middleware rather than config. The current category taxonomy is defined here. |

---

## What is not here

- The spreadsheet `ai_platforms_enhanced_metadata.xlsx` was also in the Claude project; it
  already exists in the repo at `data/ai_platforms_enhanced_metadata.xlsx` and was not
  re-exported.
- Sessions 1–7 have no handoff documents in the Claude project. Their outcomes survive only
  in `CLAUDE.md`, in `docs/archive/`, and in git history.
- No credentials, connection strings, API keys or tokens are in any file here. See
  `START-HERE.md` § "Credentials" for what an operator has to supply.
- Three passages containing personal data (a personal email address, two family members'
  names, and a home city) were redacted from `session-9-handoff.md` and
  `business-strategy-reference.md` at export time. The surrounding reasoning is unchanged;
  only the identifying details were removed.
