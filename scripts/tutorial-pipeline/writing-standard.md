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

## 1. Length: a banded ceiling, measured

Measure with `node scripts/tutorial-pipeline/wordcount.mjs <file>`. **That counter is the
only authority** — three separate hand-counts of the same batch disagreed by up to 40%, and
one reported a 1,196-word page as 676.

| Page kind | Target | Hard ceiling |
|---|---|---|
| Cloud tool, no install, no heavy licensing | **830-900** | 950 |
| Carries `gettingSetUpSafely`, or irreducible rights/licensing content | **900-1,000** | 1,100 |
| Anything | — | **over 1,200 is a rewrite** |

**Why the band, and not the spec's flat 700-900.** `tutorial-template-spec.md` § 3 sets
700-900 words. **Its own canonical exemplar breaks it:** the Ollama reference page is 1,401
words. That is not sloppiness — Ollama is the local/setup-heavy archetype, and a page
carrying a dedicated setup section plus hardware guidance cannot say what it needs to in
900. ChatGPT is 952 and Zapier 830, both cloud tools with nothing to install. The spec's
number was written from the cloud cases and never revised.

So the flat rule was unachievable for a third of the catalog, and an unachievable rule gets
quietly ignored — which is how the 2026-09-07 batch shipped at a median of ~1,450 words with
one page at 2,373. **A band people can hit beats a number everyone breaks.**

**Facts outrank the ceiling, and the overrun must be declared.** If cutting to the ceiling
would delete a sourced price, hedge, rights claim or licensing term, keep the fact and go
over — then say so: report `WORD_COUNT: n (over ceiling — kept: <the specific content>)`.
A silent overrun is a defect. A declared one is a judgement the reviewer can check.

Do **not** pad a page to reach a target. Gumloop earns fewer words than Ollama because it
has less to say, and that is correct.

**When you are over, cut in this order:**

1. The third and fourth clause of every triad bullet. A triad item is a phrase, not a sentence.
2. `whatItDoes` wherever `whyHere` already says it.
3. Any pitfall that is generic AI advice rather than a trap specific to this platform.
4. The fifth `starterAction` and the fifth `pitfall`. Counts flex 3-5; five is not the default.

**Never cut a gloss to make room.** Glosses are the last thing to go — cutting them to fit
a word budget defeats the reason the budget exists.

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

For these, **the budget tightens rather than loosens**: 700 words, and the same 2-3 gloss
ceiling. The page's job is to let a non-technical reader understand *what the tool is and
whether it is for them*, then hand off cleanly — not to teach them the terminal.

If the honest answer is "you need some background for this," that belongs in
`beforeYouStart` as a fact, followed by a link to a gentler tool in the same category.

## 9. Run a reuse check across the batch

Before submitting a batch, list every sentence frame used in more than one page's
`whyHere`, `security` opener, or `triad`. **Rewrite all but one instance.**

"The risk isn't what you type, it's what you connect" already exists on the Zapier and n8n
pages. A third automation page needs its own framing, and "a tool like this" is never an
acceptable subject — it is the literal admission that the sentence was written for no
platform in particular.
