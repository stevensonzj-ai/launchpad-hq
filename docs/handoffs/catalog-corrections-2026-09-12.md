# Catalog corrections — 2026-09-12

Source: nightly tutorial batch, `tutorials/batch-2026-09` queue positions 89–108 (20 pages shipped).
**Never applied to the database.** This file is a record for manual review; the pipeline performs no Neon writes.

## Read `catalog-corrections-2026-09-11.md` first

The research for this batch ran on 2026-09-11 (the run that halted at the egress guard). Its
corrections file is complete, covers all 20 rows, and is **committed alongside this one**. Every
row-level finding — dead products, renames, entity changes, wrong tier fields, category drift,
vendor self-contradictions — lives there and is not repeated here.

This file records only what the **transcription stage** found on 2026-09-12, which is a different
class of problem: defects in the pipeline's own metadata rather than in the catalog rows.

---

## A. The briefs invent `categorySlug` values — systemic, fix upstream

Nine of the twenty briefs proposed a `whereToNext.categorySlug` that **does not exist**. Transcription
caught and corrected every one against the live list, but nothing downstream would have: `categorySlug`
is a plain `string` in `types.ts`, so a wrong value **typechecks clean and 404s at runtime**.

| Brief proposed | Corrected to |
|---|---|
| `education-learning` | `education-learning-ai` |
| `voice-speech-ai` | `voice-speech` |
| `finance-real-estate` | `finance-real-estate-ai` |
| `healthcare` | `healthcare-ai` |
| `video-generation-editing` | `video-creation-editing` |
| `sales-marketing-seo` | `sales-marketing-seo-ai` |
| `gaming` | `gaming-creative-ai` |
| `<<VERIFY>>` (placeholder, 2 briefs) | filled from the live list |

The 2026-09-11 handoff § 6 predicted exactly this and asked the next run to check. It was right to.

**Two fixes worth making, in order of value:**

1. **Hand the canonical list to the research agents** in the Step 4 prompt. It is 20 strings and it
   removes the failure at source. The canonical list, derived from `tmp/platforms-export-2026-09-07.json`:
   `ai-apis-developer-services`, `ai-coding-development`, `ai-plugins-business-software`,
   `document-pdf-processing`, `education-learning-ai`, `finance-real-estate-ai`, `gaming-creative-ai`,
   `healthcare-ai`, `image-generation-editing`, `international-regional-ai`, `legal-ai`,
   `local-open-source-ai`, `meetings-notes`, `music-generation`, `research-academic-tools`,
   `sales-marketing-seo-ai`, `text-conversational-ai`, `video-creation-editing`, `voice-speech`,
   `workflow-automation`.
2. **Add a validator to `queue-status.mjs`** (or a new check) that reads every tutorial's
   `whereToNext[].categorySlug` and fails on anything off that list. This is a ~15-line check that
   closes a hole typecheck structurally cannot see. Recommended.

## B. Archetype: the category mapping was wrong on 9 of 20 rows

The catalog's category → archetype mapping assigned `prompts` to all twenty rows. The archetype drives
a reader-facing heading (`prompts` → "Starter prompts to try", `pick-and-setup` → "First things to try"),
so a page with no prompt cards labelled `prompts` renders a prompt heading over cards containing no
prompts.

Applied rule: **count the cards carrying `prompt:`; a strict majority makes the page `prompts`,
otherwise `pick-and-setup`.** This follows the 2026-09-09 precedent, where docsumo, nanonets and
reducto were set to `pick-and-setup` against the same mapping.

**Corrected to `pick-and-setup` (9):** `speak-language-ai` (1 of 5 cards), `canopy-tax` (2 of 5),
`restb-ai` (0 of 4), `zillow-ai-zestimate` (0 of 4), `topaz-labs` (1 of 5),
`wonder-dynamics-wonder-studio` (0 of 5), `dragon-medical-one` (0 of 5), `pathai` (0 of 4),
`viz-ai` (0 of 5).

**Five of these pages have no prompt surface at all** — they would have shipped "Starter prompts to try"
above five cards containing no prompt. This is the third consecutive batch to hit this, and the
2026-09-11 handoff § 7 already flagged it. **The mapping itself should be fixed**; catching it per-batch
has now cost three runs. Category tells you the product's domain; it does not tell you whether the
product has a chat box, and those are independent facts.

## C. Rows whose tier field is contradicted by the shipped page

Restating only the ones where the page now says something the catalog row probably does not
(full detail in the 09-11 file § C):

- `topaz-labs` — page ships `accessTier: PREMIUM`. The `SUSPECT_COST_TIER` flag on this row is
  **resolved**: subscription-only, no perpetual licence, no trial. The row should not say Free.
- `speak-language-ai`, `ludo-ai`, `alphasense`, `restb-ai` — pages state plainly that there is no free
  tier. Rows marked Free/Freemium are wrong.
- `ramp-intelligence` — $0 plan exists but is gated on a US entity, an EIN, a $25k linked balance and
  an approval decision. "Free" without that qualification misleads.
- `pathai`, `viz-ai`, `canopy-tax`, `healthee`, `dragon-medical-one` — no public pricing at all.

## D. `exclusions.json` candidates — carried forward for Zach, unchanged

No exclusion was added. The pipeline never writes that file, and every one of these is an owner's call.
Pages were written for all twenty under the obtainability rule (write if a reader can get it by any real
path; skip only if there is no path at all), and each page states its barrier plainly.

**Strong — no reader can obtain these by any path:**

- `viz-ai` — March 2026 EULA restricts use to a medical specialist under an existing agreement with a
  hospital or health system. No pricing page (`viz.ai/pricing` 404s), no trial, no self-serve path.
- `pathai` — enterprise medical-device software, sales-contact only. The only free route is an academic
  programme that ships a *dataset*, not the product.

A useful reframing from the transcription pass: `viz-ai`, `pathai` and `dragon-medical-one` are one
**category-level** question — *should institution-only clinical AI be in a beginner discovery catalog
at all?* — rather than three row-level ones. Answering it once is cheaper than re-litigating each row,
and the answer generalises to the rest of the healthcare slice still in the queue.

**Defensible — the named product is dead even though the vendor still ships something:**

- `quizlet-q-chat` — if exclusions are maintained by product identity, the named product is discontinued.
  The page as written covers the vendor's current free chat ("Ask Quizlet") instead.

**Owner's call — real but heavily gated paths exist. Recommendation on each is KEEP:**

`dragon-medical-one` (employer-provisioned; recommend keep with the barrier stated up front — exclude only
if the bar is "a reader can get this themselves today"), `alphasense` (three real paths: employer seat,
business-school library account, trial request form), `canopy-tax` (sales-led, US-firm-only),
`ramp-intelligence` (the $25k gate is a hard barrier for an individual, but the objection is about
audience fit, not obtainability), `healthee` (two real reader paths — check your benefits portal; the
employee form that routes to HR), `restb-ai` (MLS-mediated access covers ~800k US agents, and Restb Lens
is self-serve).

**Explicitly NOT candidates despite appearances:** `inworld-ai` (the free TTS Playground path is real)
and `wonder-dynamics-wonder-studio` (real free tier under Autodesk).
