# Writing standard — tutorial pages

Binding rules for anyone, human or agent, writing or revising a tutorial page. These exist
because the 2026-09-07 batch shipped 20 pages that were accurate, well-sourced and honestly
voiced, and **19 of 20 failed the audience test anyway** — by being roughly twice as long as
the format allows and by skipping the glosses a first-time reader depends on.

Read alongside `docs/history/tutorial-template-spec.md` (the section skeleton) and
`gloss-bank.md` (shared definitions). Where this file and the spec disagree on a number,
this file is newer and wins. Where either disagrees with `src/data/tutorials/types.ts`,
the code wins.

---

## 1. Length follows substance — no hard ceiling

**There is no word limit, and no page should ever lose a fact to hit a number.** A platform
with a complicated free tier, a licensing split and a setup process earns more words than a
chatbot you sign into. Ollama, one of the three validated reference pages, runs 1,401 words
and is right to.

The rule is **no fluff**, not *fewer words*. Apply these four tests to every sentence:

1. **Does cutting it lose a fact?** If yes, keep it, however long the page gets.
2. **Is it true of AI tools generally rather than this platform?** Then it is filler wearing
   the costume of advice. Cut it, or replace it with the platform-specific version.
3. **Does it restate something another field already said?** Say it once, in the field where
   the reader needs it.
4. **Is it teaching a skill this page is not about?** A tutorial page orients a beginner to
   *this tool*. It does not teach the terminal, git, environment variables, colour theory or
   film grammar. Name the prerequisite and link out.

Test 4 is the one that matters most, and it is what a word count was standing in for. The
2,373-word Groq page was not wrong because of its length — it was wrong because its back
half taught `.env`, `.gitignore`, `curl` and API parameters to someone who may never have
used an AI tool. Cutting that is not compression; it is removing content that was never this
page's job.

### The counter is a flag, not a gate

`node scripts/tutorial-pipeline/wordcount.mjs <file>` is the only trustworthy count — three
hand-counts of the same batch disagreed by up to 40%, one reporting a 1,196-word page as 676.

Use it as a **prompt to look**, not as a limit to enforce:

| Count | What it means |
|---|---|
| under ~600 | Probably thin. Check nothing was skipped. |
| 800-1,000 | The range most pages land in. Nothing to do. |
| over ~1,200 | **Go read it.** Usually one of the four tests above is being failed. Sometimes the platform genuinely warrants it — Udio's rights position alone is ~280 irreducible words. |

When a page is long and every sentence passes the four tests, **it stays long and you say so**:
report `WORD_COUNT: n — long because <the specific content that earns it>`. That sentence is
the whole mechanism. It makes length a judgement someone can check, rather than either a
silent overrun or a fact quietly deleted to satisfy a number.

**Never cut a gloss for length.** Glosses are the last thing to go — cutting them to shorten
a page defeats the reason the page exists.

## 2. Glosses are a checked output, not an instruction

Before writing prose, list every term on your page that someone who has never used an AI
tool would not already know. Then:

- **Gloss the 2-3 the page genuinely depends on**, inline, at first use, using
  `gloss-bank.md` wording.
- **Cut or replace every other term on that list** with ordinary English.

Report the full list as `TERMS_CONSIDERED`, each marked GLOSSED / REPLACED / CUT. **A term
you used but did not list is a defect in the page.**

Then run one last check: read only the **first 150 words** as if you had never used an AI
tool. If any sentence there contains a term that is neither in the gloss bank nor glossed on
the spot, rewrite it. Report `FIRST_150_CLEAN: yes/no`.

## 3. `whyHere` must pass the swap test

The `whyHere` line in each `starterAction` is the strongest anti-thin-content device on the
page — it is what makes a Midjourney kit different from a DALL-E kit with the name swapped.

**Test:** replace the platform's name with its closest competitor. If the sentence is still
*true*, it has failed. Name the competitor you tested against.

A line that merely asserts importance has not passed. It must cite a **mechanism**: a
documented behaviour, a named setting, a price, a file, a constraint.

**Banned openers**, all of which appeared more than once in the last batch:
"This is the thing X does that a chat window can't", "This is the reason X exists",
"its most underused feature", "the cheapest way to", "the single biggest",
"the most useful thing a beginner can learn", and any variant of
"tells you more than any review / tutorial / explainer" — which reached five pages.

## 4. `avoid` must pass the vendor test

Every item in `triad.avoid` should be something **the vendor's own marketing page would not
print**. That is what makes the triad worth reading.

Reject generic AI caveats: hallucination, medical/legal/financial decisions, unverified
arithmetic, confidential data on a free tier. Those go in `pitfalls` if anywhere.

**At most one item per page may be a category-wide caution.** The rest come from this
platform's terms, docs, pricing, refusals, or a documented failure. If you can only find
two real ones, write two — a short honest triad beats a padded one.

## 5. `howItWorks` is the on-ramp, capped at 60 words

One paragraph. No line breaks. Describe only the **physical motion** of using the tool:
where you are, what you do, what comes back, how you iterate.

No feature names, no mode names, no pricing, no export formats, no list of platforms it runs
on. Those belong in `whatItIs`, `beforeYouStart` and `starterActions`. At most one gloss
here; the others go where the term is first *used*.

The three reference pages run 34, 43 and 34 words. The last batch produced a 209-word
feature tour in this field, which defeats the section's entire purpose.

## 6. Vary `beforeYouStart` deliberately

The last batch produced **exactly five items on all 20 pages**, thirteen of them running the
same labelled beats in the same order, with the literal phrase "Will you realistically need
to pay?" appearing in 13 files. The reference pages run 3-4 items and use no labels at all.

Write **3-5 items in whatever order this platform's actual entry barrier dictates.** Bold a
lead-in only where one item genuinely outweighs the others. Answer the will-I-need-to-pay
question inside a normal sentence — never as a label.

A tool with a real free tier and a tool that costs money on day one should not produce the
same skeleton.

## 7. Never eject the reader

Two forbidden moves:

- **Telling the reader the tool is not for them before "Before you start."** If a tool
  genuinely needs technical background, say so there as a hardware or skill fact, with a
  named alternative from this site. The Ollama page has the right shape: *"The real question
  isn't whether you're technical; it's whether your computer is powerful enough."* Never
  *"if that meant nothing to you, this isn't your starting point"* — which shipped on the
  FLUX page and dismisses precisely the reader the spec is written for.
- **Talking down.** "Aimed over your head", "ignore it as a beginner". State what a thing is
  for and let the reader decide.

## 8. Developer-facing platforms

Groq, Claude Code, FLUX, Open WebUI, n8n and their kind cannot pass a first-ever-AI-user
test, and straining to make them do it is where the jargon and the ejection sentences came
from.

**This section previously set a 700-word ceiling. It is withdrawn.** A batch of 20
developer platforms met it zero times, lowest 827 — the same failure as the flat 700-900 rule
in § 1 that it replaced. These platforms carry billing models, identity changes and privacy
positions that cannot be told once each inside 700 words, so the number produced silent
overruns rather than shorter pages. **§ 1 governs: there is no ceiling, and no page loses a
fact to hit a number.**

What actually applies here is § 1's fourth test, harder than elsewhere. The page's job is to
let a non-technical reader understand **what the tool is and whether it is for them**, then
hand off cleanly. It is not to teach the terminal, package managers, environment variables,
API parameters or version control. When a page starts explaining those, that content is not
long — it is misplaced, and it comes out.

Keep the 2-3 gloss ceiling. A developer page needing six glosses is written at the wrong
altitude; cut the jargon rather than defining it.

If the honest answer is "you need some background for this," that belongs in
`beforeYouStart` as a fact, followed by a link to a gentler tool in the same category.

## 8b. Say each fact once, in the field that owns it

Diagnosed on the 2026-09-08 batch: seven pages carried the same fact in three or four fields
at once — one platform's warning appeared four times on a single page. A deletion-only pass
removed 1,072 words without losing a single fact.

**This is why pages come out long. It is restatement, not padding, and it is a generator
defect rather than a writing one:** an agent handed a list of fields fills every field a fact
could plausibly occupy.

The rule: **each fact appears once, in the field whose job it is.** A credit limit belongs in
`beforeYouStart`, not also in a pitfall and a triad item. A privacy caveat belongs in
`security`, not also in `avoid`. If a fact seems to belong in two fields, it belongs in the
earlier one, and the later field either references it in a clause or says nothing.

Before finishing a page, list any fact stated in more than one field and delete every
instance but the best-placed one. Report the count as `DEDUP: n restatements removed`.

## 9. Run a reuse check across the batch

Before submitting a batch, list every sentence frame used in more than one page's
`whyHere`, `security` opener, or `triad`. **Rewrite all but one instance.**

"The risk isn't what you type, it's what you connect" already exists on the Zapier and n8n
pages. A third automation page needs its own framing, and "a tool like this" is never an
acceptable subject — it is the literal admission that the sentence was written for no
platform in particular.
