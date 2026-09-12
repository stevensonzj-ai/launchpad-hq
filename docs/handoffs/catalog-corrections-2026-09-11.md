# Catalog corrections — 2026-09-11

Source: nightly tutorial batch research run, 20 platforms (`tutorials/batch-2026-09` queue positions 89-108).
**Never applied to the database.** This file is a record for manual review; the pipeline performs no Neon writes.

Full detail for each item is in `tmp/tutorial-pipeline/briefs/<platformSlug>.md` § 3 CATALOG CORRECTIONS.
This run did not ship pages — see `tmp/tutorial-pipeline/runs/2026-09-11.md` for why — so every
correction below is unapplied and every page is unwritten.

This is an unusually dirty batch: **18 of 20 rows came back flagged.** Four rows name a product that
no longer exists under that name.

---

## A. Rows naming a dead, renamed or superseded product

These four are the highest-priority fixes: the row's name is currently wrong, not merely imprecise.

| Row | Finding | Recommended row change |
|---|---|---|
| `quizlet-q-chat` | Q-Chat is **discontinued** — help article 404s in all locales, absent from every current vendor surface, last archive capture 2025-05-24. The vendor still ships a free AI chat under a different name ("Ask Quizlet", US-only, 14+). | Rename to **Quizlet (Ask Quizlet)** or `quizlet`; repoint URL to `https://quizlet.com`. The Q-Chat blog post and help article both mislead on click-through. |
| `google-imagen-3` | **Imagen 3 shut down 2025-11-10**; Imagen 4 shut down 2026-08-17. The current model in the Gemini app is **Nano Banana 2** (`gemini-3.1-flash-image`). A page teaching "Imagen 3" teaches a model no reader will get. | Rename the row to the current Google image surface. Page was written around the Gemini app, not Vertex AI. |
| `wonder-dynamics-wonder-studio` | **Renamed and re-owned**: Wonder Studio is now **Autodesk Flow Studio**; all new signups have gone through Autodesk since 2025-08-12, while `wonderdynamics.com` stays live with no migration notice. | Update name, URL and vendor to Autodesk. **Not** an exclusions candidate — a real free tier survives (~300 credits, 720p, watermarked, one actor). |
| `bloomberg-gpt-terminal-ai` | **Identity error.** BloombergGPT is an unobtainable 2023 research model, absent from every current Bloomberg AI page. The real product is **Terminal AI (ASKB)**, currently in beta. | Rename row to `bloomberg-terminal-ai`. Keep the page — obtainable via employer licence, campus lab, or Bloomberg sales. |

## B. Ownership and entity changes

| Row | Finding |
|---|---|
| `dragon-medical-one` | Nuance is **Microsoft-owned**; `nuance.com` product URLs 302 to `microsoft.com`. Product is **not** renamed — Dragon Copilot is a separate successor. If the catalog carries `nuance-dax` / `dax-copilot` rows, *those* are the ones folded into Dragon Copilot — separate audit needed. |
| `restb-ai` | A **Clear Capital** company since 2026-05-12; brand retained. Any copy describing it as an independent startup is stale. Name casing should be `Restb.ai`. |
| `pathai` | **PathAI Diagnostics (the lab arm) was sold to Quest Diagnostics**, completed 2024-06-11. If the row describes lab/diagnostic testing services, it is out of date. |
| `alphasense` | Sentieo, Tegus and Canalyst are now AlphaSense brands — if the catalog carries rows for any, they are retired brands and exclusions candidates in their own right. Vendor domain is hyphenated: `alpha-sense.com`. |
| `ludo-ai` | Operating entity is **Jet Play, Inc.** (per ToS 2026-08-26). |
| `healthee` | Legal entity **Insurights, Inc. dba Healthee**. URL `healthee.co` 302s to `healthee.com` — repoint. |
| `speak-language-ai` | Display name must be **Speak** (Speakeasy Labs, `speak.com`). "Speak AI" is a *different* App Store app by Meta Innovation Limited, and an unrelated transcription company trades at `speakai.co`. Real collision risk. |
| `canopy-tax` | Name → **Canopy**; URL `canopytax.com` → **`getcanopy.com`**. |

## C. Tier / pricing fields that are materially wrong

A row marked "Free" that a reader cannot obtain for free is the error class most likely to cost a reader money.

- **`topaz-labs` — `SUSPECT_COST_TIER` RESOLVED → PREMIUM.** Subscription-only per product since the CEO's 2025-09-17 announcement. **No perpetual licences, no free tier, no trial.** ~$149-$399/yr per product, plus credits for cloud video. The row also **conflates 8+ separate products** sold at separate prices.
- **`speak-language-ai` — no free tier.** 7-day trial, card required, then paid; mobile-only.
- **`ludo-ai` — no free tier.** No free column in the vendor's own plan table; the 30-credit allowance is a *free trial*. "Freemium" overstates it.
- **`alphasense` — not Free/Freemium.** No published price, no self-serve signup. The "Get Started for Free" CTA is a trial-request funnel.
- **`restb-ai` — not free.** Core product is quote-only. The only free thing is a requested 2-week trial of a *different* product (Restb Lens).
- **`ramp-intelligence` — "Free" is misleading.** $0 base plan, but requires a US-registered entity, an EIN, $25k in a linked US business bank account, and an approval decision.
- **`opus-clip` — free tier is real but qualified.** Output is watermarked, expires in 3 days, and is licensed **non-commercial only** (ToS eff. 2025-11-17).
- **`meshy` — "Free" needs qualifying** to free-to-generate / paid-to-export. See § E: the vendor contradicts itself on whether free accounts can download at all.
- **`pathai`, `viz-ai`, `canopy-tax`, `healthee`** — any field implying a free tier, trial or price should read "contact sales / no public pricing".

## D. Category / description drift

- **`inworld-ai`** — the no-code character/NPC Studio is **gone** (`studio.inworld.ai` 302s to the developer Portal; legacy Studio docs redirect to a login). Current public product is voice: realtime TTS, voice cloning, voice design. Row is almost certainly filed under Gaming & Creative AI and should move to **Voice & Speech**. A free self-serve path survives via the TTS Playground, so **not** an exclusions candidate.
- **`ludo-ai`** — "game-ideation and market-research" framing is stale. The vendor's `/features` now lists seven asset-generation modules and **no market research**. Centre of gravity has moved to asset/concept generation.
- **`restb-ai`** — does not generate or edit images, it *reads* them. Finance & Real Estate, not a generic Image category.
- **`zillow-ai-zestimate`** — "Zillow AI Zestimate" is **not a real Zillow product name**. The Zestimate is a figure rendered on listing pages, not a product a reader operates.
- **`ramp-intelligence`** — not a standalone product; it is Ramp's name for the AI layer inside Ramp. Consider displaying as "Ramp Intelligence (part of Ramp)" so beginners don't hunt for a separate signup.
- **`pathai`** — if the site's Healthcare category is positioned as *consumer* health tools, this row is miscategorised in a way that actively misleads.

## E. Vendor self-contradictions — carried to the pages unresolved, per writing-standard § 8c

These were **not** silently resolved. Each page states the disagreement. They are listed here because
each is a live risk to a reader, and because a vendor may fix its own pages at any time.

- **`meshy`** — three Meshy-owned pages disagree on whether free accounts can download models at all (10/month Meshy 6 Lite vs. "cannot download"). Terms § 3.2 (eff. 2026-03-07) says free output is Meshy-owned and licensed CC BY 4.0; the docs pricing table says "User owns output" for both free and paid. **Terms govern.**
- **`scenario`** — contradicts itself *twice*: free-tier commercial rights (pricing FAQ "personal and evaluation use only" vs. help centre "cleared for commercial use" vs. terms v2.1.1 silent) and training-on-your-data (marketing "never used to train" vs. privacy policy permitting it for all non-enterprise accounts).
- **`healthee`** — security page says "we do not transfer back any information" to your employer; the FAQ says HR "can see… what questions they're asking". Material for a health-benefits product.
- **`ludo-ai`** — FAQ and binding ToS disagree on output ownership.
- **`opus-clip`** — two reads of the icon-based pricing comparison table disagreed on whether multimodal/prompt clipping starts at Starter or Pro. Hedged on the page, not resolved.

## F. Possible duplicate / sibling rows to check

- **`restb-lens`** — distinct self-serve, published-price product (~$99/mo, advertised 2-week no-card trial) from the same company; the only part of Restb.ai an individual can buy. Worth its own row, but check for the dual-row trap that put `canva-magic-studio` in exclusions.
- **`agent-opus`** — a distinct product from OpusClip's vendor. Both may legitimately stand; a single row conflating them is a data error.
- **`bamsec`** — AlphaSense-owned, self-serve, has a free tier and a published $69/mo Pro price. A far better beginner page than AlphaSense itself. Worth adding if absent.
- **Do not add `superanalyst`** — announced 2026-06-03, early access to select enterprise customers only.

---

## Note on verification limits

The research environment could not see the site's catalog data — the staged snapshot carried only
`scripts/tutorial-pipeline/`, `src/data/tutorials/` and `docs/history/`. Several agents therefore
wrote *directed checks* against the live row rather than confirmed diffs. Items in § A and § B are
facts about the world and stand on their vendor sources regardless; items in § C and § D that begin
"if the row says…" need an eyeball against the live catalog before action.
