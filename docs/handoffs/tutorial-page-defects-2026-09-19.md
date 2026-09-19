# Tutorial page defects — consolidated work order

**Compiled 2026-09-19** from every nightly run report (2026-09-08 → 2026-09-19) plus a fresh
mechanical audit of all 164 shipped pages run the same day. Written to be handed to Claude Code
as a work order.

State at compile time: **164 pages, all on `main` at `fe55bec7`**, typecheck clean, production
READY. Corpus word counts: median **1,559**, max **2,148**, min **744**.

---

## 0. How to use this document

Findings are in three tiers, and **the tier matters more than the finding**:

- **Tier 1 — confirmed, mechanical, safe to fix.** Verified programmatically on 2026-09-19.
  Exact page lists given. Fix these directly.
- **Tier 2 — verify, then fix.** Real candidates, but each needs a human or model judgement
  because the detection rule produces some false positives. **Named false positives are listed
  so you don't "fix" correct content.**
- **Tier 3 — standards decisions.** Do **not** act on these. They need Zach to decide a
  standard first; changing pages without that decision produces churn.

Then read **§ 6 (do not touch)** before editing anything. Several pages contain deliberate
silences, deliberate hedges, and deliberately unusual values that three separate nightly runs
declined to "fix." Filling them in would be a regression, and it would be invisible to typecheck.

Two structural facts to know before opening a file:

1. **Tutorials render at `/platform/<slug>`, not `/tutorials/<slug>`.** There is no `[slug]`
   route under `src/app/(app)/tutorials/`; tutorial data is consumed via
   `getStaticTutorialForPlatform(platformSlug)` and rendered as a Tutorials tab on the platform
   detail page. Verified on production 2026-09-19: `/platform/descript`, `/platform/v0`,
   `/platform/jasper` all 200.
2. **`/tutorials` returns 404 in production** even though `page.tsx` exists (it is a
   "coming soon" placeholder). Confirmed again 2026-09-19. Pre-existing, low severity, but it
   means the nightly runbook's stated preview URL points at a page that lists nothing.

---

## 1. The four failure classes — and which of them reading can actually catch

This is the most important framing in the document. It comes from the 2026-09-15 merge addendum
and every run since has confirmed it.

| # | Failure class | Catchable by reading the page? |
|---|---|---|
| 1 | `prompt` vs `whatItDoes` misassignment; field-shape and length defects | **Yes** |
| 2 | **Plan-tier gating claims** — page names a tier the vendor's own comparison table excludes the feature from | **No — requires re-checking the vendor** |
| 3 | **Product liveness** — renames, acquisitions, discontinuations, closed signups | **No** |
| 4 | **Availability gates** — language, region, product-version limits | **No** |

**A clarity-and-accuracy read-through will surface class 1 and nothing else.** Classes 2–4 need
each page's volatile claims checked back against vendor primary pages. The cheapest starting
point for that is the research briefs at `tmp/tutorial-pipeline/briefs/<platformSlug>.md`, which
carry `SOURCES` lines with URLs and dates — but **note most are now past the 7-day freshness
bound**, so treat a brief as a map of what to re-check, not as current truth.

Tiers 1 and 2 below are almost entirely class 1. **That is a limitation of this document, not a
statement that classes 2–4 are clean.** The single highest-value thing a full pass can add is
class 2: the 2026-09-09 batch shipped a page naming a paid tier that the vendor's own comparison
table lists the feature as excluded from, and nothing downstream would ever catch it.

---

## 2. TIER 1 — confirmed defects, safe to fix

### 2.1 Cards carrying BOTH `prompt` and `whatItDoes` — silent content loss (6 cards, 2 pages)

**The renderer suppresses `whatItDoes` entirely whenever `prompt` is present.** Both fields are
optional in `types.ts`, so this compiles clean and ships a page that silently drops written
content. Highest-severity item in this document.

- **`v0` — all 5 of 5 cards.** Every `whatItDoes` is real, useful, reader-facing content that
  currently renders nowhere. Example, card 1: *"Builds a small single-page site and puts it at a
  live address you can send to someone."*
- **`duolingo-max` — card 1.** Worse than v0's, because the suppressed text is a **gloss**:
  *"Say or type this as your opening \*\*prompt\*\* — the message you give the AI."*
  `writing-standard.md` § 1 says never cut a gloss, and this one is already effectively cut.

**Fix:** keep `prompt` (these products do have a chat box — the `prompt` is correct), and fold the
suppressed `whatItDoes` content into `whyHere`, or drop it where it merely narrates the adjacent
prompt. The 2026-09-17 run handled four such cards exactly that way and it is the established
pattern. For `duolingo-max` the gloss must survive somewhere on the page.

Verify after fixing: **zero cards corpus-wide should carry both fields.**

### 2.2 Cards carrying NEITHER `prompt` nor `whatItDoes` — no action body (51 cards, 26 pages)

All three validated exemplars (`zapier`, `chatgpt`, `ollama`) give **every** card exactly one of
the two. **Count corrected 2026-09-19:** this heading originally read 57, which was an arithmetic error in compiling this document; the enumerated list below is authoritative and sums to **51**. These 26 pages ship cards with `title` + `whyHere` + sometimes `tweak` and **no
instruction telling the reader what to actually do.** The card explains why something matters and
never says how.

```
adobe-acrobat-ai-assistant [2,3]   google-vertex-ai [1,2,3]   open-webui [1,2]
anthropic-api [1,3,4]              grammarly [2,3,4]          pika [1]
assemblyai [2]                     gumloop [2]                pinecone [1,3]
claude-code [3]                    hugging-face [2,3,4]       slack-ai [1,3,4]
deepgram [1,2,3]                   jan [2]                    tl-dv [1,2,3]
descript [1,3,4]                   leonardo-ai [2,4]          together-ai [3]
elicit [3,4]                       lm-studio [1,3]            udio [2]
fireworks-ai [2,3]                 make-integromat [2,4]
gemini-cli [1]                     n8n [2,3]
google-antigravity [4]
```

Numbers are 1-indexed positions in `starterActions`. Skewed toward the pre-September pages, which
predate the current standard.

**Fix:** add a `whatItDoes` (or `prompt`, where the product genuinely has a paste surface — see
§ 3.1 for how to decide). Do not pad: the title often already contains the action, in which case
`whatItDoes` should state the mechanics the title compresses.

### 2.3 `howItWorks` over the 60-word cap (27 pages)

`writing-standard.md` § 5: one paragraph, no line breaks, **capped at 60 words**, describing only
the *physical motion* of using the tool — no feature names, mode names, pricing, export formats or
platform lists. The exemplars run **34, 38 and 43** words. Corpus average is 57.

```
github-copilot 108   adobe-acrobat-ai-assistant 82   lm-studio 77    gemini 76
copy-ai 95           claude 81                       make-integromat 77   grammarly 74
cursor 91            elevenlabs 81                   notebooklm 77   suno 74
lovable 91           runway 81                       elicit 77       descript 72
canva-ai-magic-studio 90   notion-ai 80              hugging-face 77  adobe-firefly 67
otter-ai 86          openai-api 80                   anthropic-api 76  lindy-ai 63
                     heygen 78                       perplexity-ai 78  bolt-new 61
```

**Fix:** cut to ≤60 by removing what § 5 says does not belong there (feature/mode names, pricing,
format lists), not by compressing the motion description. Anything cut that is a *fact* moves to
`whatItIs`, `beforeYouStart` or `starterActions` — § 8b, one field owns each fact.

### 2.4 Dead `changelogUrl` links (2 pages, verified from two independent networks)

111 of 164 pages carry a `changelogUrl`. All 109 unique URLs were tested 2026-09-19 from the
desktop VM and again from a separate cloud network. Two are genuinely dead:

- **`descript`** → `https://www.descript.com/release-notes` — **404 on both networks.**
- **`clarifai`** → `https://docs.clarifai.com/product-updates/changelog/` — **`docs.clarifai.com`
  has no DNS record on either resolver.** (The 2026-09-08 run already flagged Clarifai's changelog
  as "stalled"; it is now gone entirely.)

**Fix:** find the current changelog URL, or **omit `changelogUrl` entirely** — the field is
optional and the nightly standard is to omit rather than ship a guess.

**Do not treat the following as dead.** They returned 403 to automated requests but are
bot-blocking, not broken (Canopy and Midjourney both returned 200 from the second network):
`help.consensus.app`, `helpx.adobe.com` (acrobat + firefly), `www.canva.com/newsroom`,
`www.getcanopy.com`, `www.make.com/en/help/release-notes`, `www.midjourney.com/updates`,
`www.perplexity.ai/changelog`, `www.zillow.com/news`, `x.ai/news`.

### 2.5 Archetype/content mismatch (1 page)

- **`harvey-ai`** — archetype `prompts`, but **zero cards carry a `prompt`**. The renderer prints
  the heading *"Starter prompts to try"* over five cards containing no prompts. The zero-prompt
  decision was deliberate and correct (the 2026-09-13 run reasoned that Harvey is unreachable by
  any individual reader, so a copyable prompt block would mislead). **The archetype is what's
  wrong, not the cards.** Renderer headings: `prompts` → "Starter prompts to try", `recipes` →
  "Starter automations to try", `pick-and-setup` → "First things to try". `pick-and-setup` fits.

### 2.6 Clean — confirmed, no action needed

Checked corpus-wide on 2026-09-19 and found zero violations. Listed so a pass doesn't re-derive them:

- Markdown (`**` or backticks) inside a `prompt` field: **0**.
- `whereToNext.categorySlug` values outside the live 20-category list: **0**. (This was a real
  near-miss — the 2026-09-12 run caught nine invented slugs at transcription. `categorySlug` is a
  plain `string` in `types.ts`, so a wrong value typechecks clean and 404s at runtime. Worth the
  ~15-line validator that run recommended, since nothing downstream catches it.)
- Tutorial `platformSlug` values absent from the live Neon catalog (orphan pages): **0**, checked
  against a live read of all 170 rows. **Including `jasper`** — see § 3.4.
- `beforeYouStart` outside the 3–5 range (§ 6): **0**.
- The banned literal phrase *"Will you realistically need to pay?"* (§ 6): **0**.

---

## 3. TIER 2 — verify, then fix

### 3.1 `triad.avoid` items that are generic AI caveats (~14 of 20 candidates real)

§ 4: every `triad.avoid` item should be something **the vendor's own marketing page would not
print**. Generic caveats — hallucination, medical/legal/financial decisions, unverified
arithmetic, confidential data on a free tier — are explicitly rejected and belong in `pitfalls`.
**At most one item per page may be a category-wide caution.**

Confirmed violations (quoted):

- **`claude` — 2 of 3 items, so it breaks the one-per-page limit outright.**
  *"Legal, medical, or financial decisions taken on its word alone"* and *"Confidential material
  on a personal plan with training left on"*.
- **`microsoft-copilot` — 2 of 4, also over the limit.** *"Anything where being confidently wrong
  is expensive — medical, legal, financial, tax"* and the confidential-material item.
- **`chatgpt`** — *"Anything where being wrong has real consequences — legal, medical, financial"*.
- **`gemini`** — *"Confidential, regulated, or client material on a personal account"*.
- **`suno`** — *"Uploading confidential or client-owned material as input"*.

Other flagged pages to check individually: `assemblyai`, `chatpdf`, `copy-ai`, `gumloop`,
`healthee`, `leonardo-ai`, `naver-hyperclova-x-cue`, `otter-ai`, `spellbook`, `squarespace-ai`,
`tl-dv`, `together-ai`, `topaz-labs` (1 item each).

**Confirmed false positives — do not change these:**
- **`harvey-ai`** — matched on the words "legal advice", but the item quotes Harvey's own Platform
  Agreement against Harvey's own marketing (*"a research tool" whose output "is not legal advice"*).
  This is exactly what § 4 asks for. Leave it.
- **`dragon-medical-one`** — matched on "medical" in the product name. The item distinguishes
  Dragon Medical One from Dragon Copilot. Platform-specific. Leave it.

**Fix:** move the generic item to `pitfalls` (or delete if `pitfalls` already says it — § 8b) and
replace it in `avoid` with something from this platform's terms, docs, pricing, refusals or a
documented failure. § 4 explicitly permits a short triad: *"If you can only find two real ones,
write two — a short honest triad beats a padded one."*

### 3.2 `whyHere` lines failing § 3 (2 confirmed of 6 flagged)

§ 3: `whyHere` must cite a **mechanism** — a documented behaviour, named setting, price, file or
constraint — and must pass the **swap test** (replace the platform name with its closest
competitor; if the sentence is still true, it has failed). § 3 also bans specific openers.

**Confirmed:**
- **`claude` card 2** — *"Assistants agree too readily. Forcing the opposing case is the cheapest
  way to get past that."* Cites no mechanism, uses the banned "cheapest way to", and **fails the
  swap test outright** — it is true of every assistant.
- **`descript` card 2** — *"The single biggest time saving the tool offers…"* Opens with the banned
  "the single biggest", and *"the tool"* is the § 9 tell that the sentence was written for no
  platform in particular.

**Weak hits — judgement call, lean toward leaving them.** Each contains a banned phrase
mid-sentence but does cite a real mechanism, which is what the rule is actually protecting:
`jasper` card 2 (brand voice applied silently, names ChatGPT as the competitor tested),
`pabbly-connect` card 2 (15-day run-history expiry).

**False positives — leave alone.** Matched a loose "is the reason" pattern; both are strong,
mechanism-citing lines: `glasp` card 5 (incremental export behaviour), `gpt4all` card 3 (quotes
the licence-list vs repo-headline contradiction).

### 3.3 Corpus length — 104 of 164 pages over the flag

`wordcount.mjs` distribution across all 164:

| Band | Pages |
|---|---|
| under 600 (thin) | 0 |
| 600–1,100 (the standard's normal range) | **60** |
| 1,101–1,500 | 19 |
| 1,501–1,800 | 56 |
| 1,801–2,100 | 27 |
| over 2,100 | 2 |

**The corpus is two populations.** The 60 pages in the normal band are almost entirely
pre-2026-09-08, written before the generator defect took hold. The 104 above the flag are almost
entirely the nightly batches. Every batch from 09-08 onward shipped 100% of its pages over the
flag, and each run diagnosed it as the § 8b generator defect and ran a deletion-only pass.

**What the fresh audit adds — and it corrects the prior diagnosis.** Three runs blamed *field-count
inflation* ("every optional field filled to capacity"). **The data does not support that.** Corpus
median field counts are 4 cards / 4 pitfalls / 9 triad items / 3 security blocks, which is inside
the exemplars' own range (3–6 / 4–5 / 8–11 / 2–4). The excess is **prose length per field, spread
almost uniformly at ~1.5×**:

| Field | Exemplar avg words | Corpus avg | Ratio |
|---|---|---|---|
| `whatItIs` | 94 | 129 | 1.4× |
| `howItWorks` | 38 | 57 | 1.5× |
| `whyHere` (per card) | 26 | 41 | 1.6× |
| action body (`prompt`/`whatItDoes`) | 22 | 26 | 1.2× |
| `tweak` | 22 | 18 | 0.8× |
| `beforeYouStart` (per item) | 52 | 58 | 1.1× |
| `pitfalls` (per item) | 25 | 37 | 1.5× |
| `triad` (per item) | 13 | 21 | 1.6× |
| `security` (per block) | 56 | 82 | 1.5× |

So the lever is **sentence-level tightening inside `security`, `triad`, `pitfalls` and `whyHere`**
— the four worst ratios and the largest absolute excess — not deleting items. `tweak` is already
*below* exemplar length and should be left alone.

**Do not run another deletion pass on the strength of this table alone.** Four separate nightly
runs independently reported hitting a floor where the next cut takes a fact, and the residual on
the worst pages is quoted binding vendor text (roughly a third of the `jasper` page is ToS
language). See § 4.1 — this needs a standards decision first.

The 29 pages over 1,800, longest first, if you want the highest-leverage targets:
`spellbook` 2148, `scholarcy` 2104, `gong` 2080, `outreach` 2074, `research-rabbit` 1997,
`mailchimp-ai` 1978, `beatoven-ai` 1971, `mubert` 1966, `llama-cpp` 1964, `vllm` 1956,
`clio-manage` 1950, `ludo-ai` 1950, `scispace` 1941, `canopy-tax` 1925, `speak-language-ai` 1923,
`luminance` 1920, `localai` 1911, `paperpal` 1897, `shopify-magic-sidekick` 1887, `gpt4all` 1884,
`squarespace-ai` 1875, `wonder-dynamics-wonder-studio` 1864, `harvey-ai` 1851,
`wondershare-pdfelement-ai` 1851, `ai21-labs-jamba` 1850, `ramp-intelligence` 1832, `mem` 1831,
`jasper` 1817, `lindy-ai` 1804.

`scholarcy` is the one the 2026-09-15 run singled out for a second read: a drag-a-PDF-get-a-card
tool at 2,104 words.

### 3.4 `jasper` vs `jasper-ai` — a live trap, currently harmless

Carried forward unresolved by three runs:

- `scripts/dedupe-jasper-platforms.ts` exists on branch `feature/jasper-dedup`, has **never been
  run**, and **prefers `jasper-ai`**.
- `workflows.ts:500` references `jasper-ai`.
- The platform export and the live Neon catalog use `jasper`.
- The shipped page is `jasper-getting-started.ts` with `platformSlug: "jasper"`.

**Verified 2026-09-19: `jasper` exists in the live catalog and `/platform/jasper` returns 200, so
nothing is broken today.** But **if that dedup script is ever run as written, the tutorial attaches
to a deleted row.** Either delete the script, or change it to prefer `jasper`, or retarget the page
— but do not leave a committed script that would orphan a shipped page.

---

## 4. TIER 3 — standards decisions for Zach. Do not change pages for these.

### 4.1 Is ~1,700 the honest normal, or should pages reach 1,100–1,500?

Every run since 09-08 has escalated this and none could resolve it unattended. The position each
one reached independently:

- Restatement is real but **small** — 60–175 words per page.
- After removing every duplicated fact, generic sentence and padded triad item, the residual is
  vendor facts, dated quotes and hedges at ~1,600–1,950 per page.
- The 09-17 run's framing is the sharpest: *"If pages like these should reach 1,100–1,500, the
  lever is a quoting policy — ellipsis inside long contract quotes, or one documented contradiction
  per page instead of three — not another pass."*

**The gap is not between the recent batches and the site; it is between the site and its own three
validated reference pages.** Corpus median 1,559 vs references at 830 / 952 / 1,401. The flag fires
on 104 of 164 pages, which means **the flag has stopped carrying information.**

Decide, then write the answer into `writing-standard.md` § 1. Options: accept ~1,600 as normal for
gated platforms and raise the flag; adopt a quoting policy and re-cut; or narrow research scope
upstream so fewer facts arrive per platform.

### 4.2 `beatoven-ai` — a shipped page for a product with no working way in

**Three runs have now declined to resolve this unattended, and it is now live on production.**

`www.beatoven.ai` returns 200 but `sync.beatoven.ai` — the app host, the entire self-serve surface
— does not resolve; `/pricing` and `/blog` are 404 and gone from `sitemap.xml`; the homepage has no
sign-up control. The 2026-09-15 run refused to write the page on exactly these grounds. The
2026-09-17 run wrote it anyway, honestly (it opens with "there is no working way in" and routes the
reader to alternatives), and left it because removing a page unattended was the larger, less
reversible action.

**Meanwhile `play-ht` is being excluded from the catalog for the identical condition.** One of the
two treatments is wrong. This is not a page-editing task — it is a rule: *does a product with no
working way in get an honest redirect page, or an exclusion?* Decide it once and apply it to both.

### 4.3 The category → archetype mapping is a known generator defect

The mapping in `docs/history/tutorial-template-spec.md` § 6 assigns from category, but **category
tells you the product's domain, not whether it has a chat box, and those are independent.** Hit in
at least four batches: 09-11 inherited `prompts` on all 20 rows when 7 had no prompt surface; 09-13
corrected four; 09-15 corrected five and called it "the third batch to hit this."

Every batch since has caught it per-page, which works but is a tax on every run. **Fix the mapping
or drop the auto-assignment** rather than continuing to correct it downstream.

(Also note `docs/history/tutorial-template-spec.md` § 6 **misspells the archetype** — the union in
`types.ts` is `pick-and-setup`. `types.ts` is authoritative; never trust the spec over it.)

### 4.4 The 40-page backlog cap

With review now happening downstream of the merge, the cap halts runs and needs a manual clear
(it did on 09-10 and 09-14). Either raise it or keep it as a genuine pre-merge gate — as-is it is a
speed bump rather than a control. Currently moot: the queue is exhausted.

---

## 5. Class 2–4 leads worth re-checking (not catchable by reading)

Specific claims prior runs flagged as needing a vendor re-check. This list is **not exhaustive** —
it is what happened to get written down.

- **Plan-tier gating (class 2)** — the recurring, highest-value defect. Check the vendor's own
  **plan-comparison table**, not its feature pages; a feature page saying a tool exists is not
  evidence it is included in the tier the page names. Known disagreements already stated on-page as
  contradictions: `scispace` (plan table vs feature page), `clio-manage` (gating differs by region,
  three plan-name sets), `opus-clip` (Starter vs Pro, two reads disagreed), `microsoft-designer`
  (two Microsoft pages contradict on whether a free tier exists), `ai21-labs-jamba` (two different
  free-trial lengths), `scholarcy` (free allowance stated three ways on the vendor's own site).
- **Availability gates (class 4)** — `sakana-ai` Japan-only with IP blocking reserved;
  `quizlet-q-chat` page covers a US-only, 14+ feature; `casetext-cocounsel` successor is US-only;
  `speak-language-ai` is mobile-only with OS floors.
- **Liveness (class 3)** — the catalog-corrections files in `docs/handoffs/` carry the full record
  per batch. Products confirmed renamed or dead while their pages shipped include
  `text-generation-webui-oobabooga` (now TextGen), `kira-systems` (now Kira by Litera),
  `casetext-cocounsel` (Casetext retired), `kakao-brain-karlo` (discontinued),
  `naver-hyperclova-x-cue` (Cue: shut down 2026-04-09), `wonder-dynamics-wonder-studio` (now
  Autodesk Flow Studio), `aleph-alpha-luminous` (Luminous retired),
  `gpt-image-1-5-dall-e-successor` (names a deprecated model), `llama-cpp` (official site now
  llama.app), `clio-manage` (feature now Manage AI), `mem` (URL should be `get.mem.ai`; do not
  confuse with the unrelated `mem0.ai`).
- **Dated citations** — every terms/policy citation should state the version in force *today*. A
  version with a future effective date does not govern the reader now.

---

## 6. Do NOT "fix" these

Deliberate choices that look like defects. Changing any of them is a regression that typecheck
cannot catch.

1. **`pick-and-setup` pages carrying `prompt` cards are correct.** 20 pages do this. The rule is
   about whether the *product* has a paste surface, not about the archetype. **The `ollama`
   exemplar itself carries 3 `prompt` cards.** Ollama, LM Studio, jan, gpt4all, localai, llama-cpp,
   text-generation-webui, cursor, github-copilot, windsurf, claude-code, groq, openai-api, cohere,
   fireworks-ai all have real chat boxes or playgrounds. Do not strip these.
   - One worth a look: **`canopy-tax` carries 2 `prompt` cards** and the 09-11 research recorded no
     chat box. **`topaz-labs`' single prompt card is correct** — it is the "Image description" field
     in Gigapixel Redefine, and the 09-11 run verified it is 1 of 5 cards.
2. **`activepieces` makes no claim about training on your data.** Its terms and privacy pages were
   unreachable ("This document is not available right now"). **That silence is deliberate and
   load-bearing. Do not let an edit fill it.**
3. **`glasp`'s `privacyLevel` is `LOW` and that is correct** — the 09-15 run says explicitly: do not
   "fix" it.
4. **Hedges are load-bearing.** § 8d exists because the 09-08 batch asserted twelve claims flatly
   that the briefs had listed as uncertain. Every hedge on a page reflects a vendor contradiction or
   an unverifiable fact. **Never harden a hedge into a flat assertion.** Pages carrying hedges that
   must survive: `google-lyria-3` (commercial-use rights unverifiable), `research-rabbit` (privacy
   policy is an unreadable JS embed), `semantic-scholar` ("Ask This Paper" unverifiable, index size
   stated three ways), `julius-ai` (8GB vs 32GB sandbox; perpetual sublicensable licence beside a
   no-training claim), `aiva` (EULA undated, never maps plan to licence), `mubert`, `soundraw`,
   `consensus`, `scite`, `scispace`, `scholarcy`, `trinka-ai`, `litmaps`, `meshy`, `scenario`,
   `healthee`, `ludo-ai`, `ramp-intelligence` (terms unreadable), `spellbook` (refund policy vs help
   centre), `gpt4all` (dormant, not abandoned), `inworld-ai`, `restb-ai`, `naver-hyperclova-x-cue`.
5. **A stated vendor self-contradiction is the correct output, not an error.** § 8c: a binding
   document outranks a friendly one, and the page states the disagreement rather than silently
   picking a side. Do not "clean up" these into one answer.
6. **The `pabbly-connect` false premise is already fixed on the page — don't reintroduce it.**
   "Internal steps are not counted as tasks" is **not** a Pabbly differentiator; Zapier's own
   pricing help page says its triggers, Filter, Paths, Formatter, Delay, Looping, Digest and Storage
   consume no tasks either. The 09-17 run caught this before any `whyHere` was built on it. Fix it
   wherever the premise is stored so a later run doesn't reintroduce it.
7. **`relay-app` is not in `src/data`** — it is a Neon row. An `exclusions.json` entry stops a
   tutorial being written but will **not** remove the row from the site.
8. **Catalog corrections are never applied from a tutorial pass.** Row-level fixes (costTier,
   websiteUrl, display name, category) live in `docs/handoffs/catalog-corrections-*.md` and are
   applied by hand in the Neon SQL Editor. **No pipeline job writes to Neon, ever.**

---

## 7. Re-runnable audit

The audit behind Tier 1 is scripted and left on disk (all under `tmp/`, gitignored):

| Script | What it does |
|---|---|
| `tmp/tutorial-pipeline/scratch/audit.mjs` | Parses all 164 pages into structured JSON (TS stripped, evaluated in a `vm` context). 164/164 parse clean. |
| `tmp/tutorial-pipeline/scratch/analyze.mjs` | The Tier 1 / Tier 2 checks; prints every list in this document. |
| `tmp/tutorial-pipeline/scratch/fieldlen.mjs` | The per-field words table in § 3.3. |
| `tmp/tutorial-pipeline/scratch/live-refs.mjs` | Read-only Neon pull of live category and platform slugs. |
| `tmp/tutorial-pipeline/scratch/export-read.mjs` | Read-only pure-JS replacement for `scripts/export-platforms.ts`. |

**Two of these are worth promoting into `scripts/tutorial-pipeline/` as real checks**, because
nothing in the pipeline currently catches what they catch: the both-fields/neither-field card audit
and the `whereToNext.categorySlug` validator.

**Environment note that will bite you:** `scripts/export-platforms.ts` **cannot run in the nightly
Linux shell** — `npx tsx` fails with `TransformError` because `node_modules` holds Windows-native
esbuild binaries installed from Cursor. `npm run typecheck` survives because `tsc` is pure JS.
**Any pipeline script that depends on tsx or esbuild will fail the same way.** Either reinstall
`node_modules` on Linux or write pipeline scripts as plain `.mjs`.

---

## 8. Provenance

Compiled from: nightly run reports `tmp/tutorial-pipeline/runs/2026-09-08.md` through
`2026-09-19.md`; `docs/handoffs/catalog-corrections-2026-09-11.md` through `-2026-09-19.md`;
`scripts/tutorial-pipeline/writing-standard.md`; `src/data/tutorials/types.ts`; and a fresh
mechanical audit of all 164 pages plus a read-only query of the live Neon catalog, all run
2026-09-19.

Every Tier 1 finding was verified programmatically on 2026-09-19 against the pages as they exist on
`main` at `fe55bec7`. Tier 2 findings were verified by reading the offending strings, and the false
positives named in each section were ruled out the same way.

---

# ADDENDUM — 2026-09-19, after the Tier 1 fix pass

Tier 1 was implemented in five commits on `tutorials/batch-2026-09` (`60243e26`, `193279fb`,
`6f45e15a`, `8100f2a5`, `9549bbb2`), typecheck clean before each. **Re-audited corpus-wide after
all five: § 2.1 both-fields = 0, § 2.2 neither-field = 0, § 2.5 prompts-with-no-prompts = 0,
§ 2.3 `howItWorks` over cap = 0** (corpus range now 33–60 words, median 54). The § 6 do-not-touch
items and all Tier 2 / Tier 3 items are confirmed unchanged.

Two corrections to this document, and two new findings.

## Corrections

1. **§ 2.2's count was 57; the real figure is 51.** Arithmetic error in compiling this document.
   The enumerated per-page list was correct all along. Fixed in place above.
2. **`descript`'s changelog is `https://feedback.descript.com/changelog`** (200, latest entry
   2026-09-17). `www.descript.com/changelog` also resolves, via a 301 to `descript.canny.io` —
   the `feedback.` host is the canonical one and is what shipped.

## NEW — `clarifai` is not merely a dead changelog link. The product is gone.

The Tier 1 pass omitted `clarifai`'s `changelogUrl` because `docs.clarifai.com` would not resolve,
and flagged the vendor's main site as a liveness lead. **That lead is stronger than it looked.**
Verified from two independent networks and two public resolvers (8.8.8.8 and 1.1.1.1), agreeing
exactly:

| Host | Result |
|---|---|
| `clarifai.com` | resolves to `192.64.119.122`; HTTPS dead; HTTP 302 → www with `Server: namecheap-nginx` |
| `www.clarifai.com` | resolves to `207.237.146.217` (reverse DNS `static.rcn.com` — an ISP, not a cloud host); HTTPS dead |
| **`api.clarifai.com`** | **NO DNS RECORD** |
| `docs.clarifai.com` | NO DNS RECORD |
| `status.clarifai.com` | NO DNS RECORD |
| `clarifai.com` NS | **`dns1.registrar-servers.com`, `dns2.registrar-servers.com`** — Namecheap registrar parking |
| `clarifai.com` MX | still `smtp.google.com` (Google Workspace) |

**Clarifai's product *is* an API platform. `api.clarifai.com` having no DNS record means there is
nothing for a reader to use.** The apex is on registrar parking nameservers serving
`namecheap-nginx`, which a company operating an inference platform does not do.

Context: **Nebius acquired the Clarifai team and licensed its inference technology, announced
2026-05-12.** The licence explicitly excluded "Clarifai's legacy computer vision models." No
public shutdown notice, wind-down date or migration plan was ever published.

**This is the `play-ht` pattern exactly** — acqui-hire, no shutdown notice, product surface quietly
switched off, marketing domain lingering. So the standards decision in § 4.2 now governs **three**
pages, not two: `beatoven-ai`, `play-ht` and `clarifai`.

**Process point this exposes, which matters more than the page.** The 2026-09-08 run already had
the Nebius signal and wrote "the sourced Nebius / stalled-changelog position" into the page. Nothing
re-checked it in the four months since, and the page has been live throughout. This is class 3 with
a measured cost, and it is the argument for a periodic liveness sweep — the one check no nightly run
ever performed.

## NEW — `heygen` carries an unresolved internal contradiction (class 2)

The pre-fix `howItWorks` said a custom avatar is "a separate, paid setup step." `beforeYouStart`
says the free plan includes one custom avatar. **Both cannot be true.**

The Tier 1 pass cut the `howItWorks` claim — correct regardless, since § 5 excludes pricing from
that field — and deliberately did not relocate it, because the surviving `beforeYouStart` already
addresses the point. **So the page is now internally consistent but may be consistently wrong.**
Which claim is right is a vendor check against HeyGen's current plan-comparison table. Do not
resolve it by reasoning; check the table.

## Corpus-wide liveness sweep — run 2026-09-19, and its limits

Every tutorial page's primary catalog `website` was resolved and fetched (163 of 164 have one;
**`murf-ai` has no `website` value in its Neon row** — a catalog correction). Result:

- **139 → HTTP 200, 1 → 202.**
- **21 → 403**, every one of them bot-blocking, not breakage (`claude.ai`, `chat.openai.com`,
  `canva.com`, `midjourney.com`, `perplexity.ai`, `zillow.com` and similar). Not defects.
- **2 → genuine failures: `clarifai` (above) and `kakao-brain-karlo`** (`kakaobrain.com` has no DNS
  record — already flagged by the 2026-09-13 run as discontinued).

So clarifai is not the tip of an iceberg; the corpus is otherwise clean on primary domains.

**But this sweep is necessary and not sufficient, and the reason is important.** A product's usable
surface is often a subdomain while the marketing domain stays healthy. Demonstrated on `beatoven-ai`
the same day: `beatoven.ai` **200**, `www.beatoven.ai` **200**, `sync.beatoven.ai` — the actual app
— **NO DNS RECORD**. A marketing-domain sweep gives that page a clean bill of health. Any liveness
check worth running must test **the host a reader actually signs in to**, which means recording that
host per page rather than relying on the catalog's `website`.
