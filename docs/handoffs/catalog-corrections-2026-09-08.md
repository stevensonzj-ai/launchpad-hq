# Catalog corrections — nightly batch 2026-09-08

Found while researching the 20 platforms in `tutorials/batch-2026-09` on 2026-09-08.
**Nothing here has been applied to the database.** Applying these is a separate,
human-gated Neon pass. Full sourcing for every line is in the research briefs at
`tmp/tutorial-pipeline/briefs/<slug>.md` (gitignored — owner's machine only).

This batch was 11 AI API/developer-services rows and 9 AI-coding rows. **Every one of the
20 came back flagged.** The rot rate is higher than the 2026-09-07 batch, which is
consistent with this slice of the catalog being older and more volatile, not with the
research being noisier.

---

## Identity changes — the row names or points at the wrong thing

| slug | finding | recommended action |
|---|---|---|
| `google-antigravity` | **The row conflates two unrelated products.** `website` points at Google IDX, which Google folded into Firebase Studio; IDX signup has been closed since 2026-06-22 with sunset 2027-03-22. Antigravity is a separate, live, free desktop app at `https://antigravity.google`. | Repoint `website` to `https://antigravity.google`. The page was written about Antigravity, the live product. |
| `azure-openai-service` | Renamed and absorbed — now sold as "Azure OpenAI in Foundry Models" under **Microsoft Foundry** (was Azure AI Foundry, was Azure AI Studio). | Update display name; keep the slug. Page written under the current name, per the `windsurf` precedent. |
| `google-vertex-ai` | Renamed to **Gemini Enterprise Agent Platform** (Google blog, 2026-04-22). Google's own pages still contradict each other on the name. | Update display name; keep the slug. |
| `tabnine` | **Acquired by Tricentis 2026-07-30.** Now enterprise-only: no free tier, no trial, no self-serve purchase. The legacy VS Code extension states it "does not onboard new users." | See "obtainability" below. `costTier` -> `ENTERPRISE`. |
| `amazon-q-developer` | AWS **blocked all new signups** for the coding tools on 2026-05-15; IDE/CLI end of support 2027-04-30; **Kiro is the named successor**. Product, pricing, getting-started and FAQ pages all still advertise open free signups. | See "obtainability" below. Decide: retire the row, or repoint to Kiro (which is now in the catalog with a page). |
| `gemini-cli` | Stopped serving free personal Google accounts and AI Pro/Ultra on 2026-06-18; replaced for individuals by Antigravity CLI. Google's own quota and sign-in pages still contradict the change. | `website` -> `https://geminicli.com/`; `costTier` FREE -> `PAID`. |
| `clarifai` | Alive and signup works, but **Nebius hired the founder and core engineering team on 2026-05-12** and licensed the inference technology. No dated platform release since 12.4 on 2026-05-07. Legacy computer-vision models and government work explicitly excluded from the deal. | No field change required, but flag for re-review sooner than the default. |
| `replicate` | **Acquired by Cloudflare** (announced Dec 2025), no stated continuity plan. Alive and shipping. | No field change; note the acquisition. |
| `scale-ai` | Alive but materially changed: Meta minority stake June 2025, founder Alexandr Wang to Meta, ~14% layoffs, OpenAI/Google reported stepping back as customers, Francis deSouza CEO from Aug 2026. | No field change; see "obtainability". |

## `costTier` corrections

| slug | catalog says | should be | why |
|---|---|---|---|
| `azure-openai-service` | FREEMIUM | **PAID** | No free tier. Only an expiring 30-day Azure trial credit; models are excluded from the 12-month free services list. |
| `together-ai` | FREEMIUM | **PAID** | Free tier killed July 2025. A $5 minimum credit purchase with a card is required before any request works. |
| `gemini-cli` | FREE | **PAID** | Free personal-account access ended 2026-06-18. |
| `tabnine` | FREEMIUM | **ENTERPRISE** | No free tier, no trial, no self-serve purchase after the Tricentis acquisition. |
| `clarifai` | FREE | **FREEMIUM** | Free tier is ~1,000 operations/month above a $1 / $30 / $300 / enterprise ladder. |
| `kiro` | FREE | **FREEMIUM** | Perpetual 50-credit/month free tier, paid $20–$200/mo. GA since 2025-11-17. |
| `openai-codex-cli` | FREE | **FREEMIUM** | Bundled with paid ChatGPT plans; OpenAI's own pages disagree about free-plan access (see uncertainties). |
| `google-antigravity` | FREE | **FREEMIUM** | Recommended by the research agent over FREE. |
| `amazon-q-developer` | FREEMIUM | **FREE** | Only the free console/docs assistant remains obtainable; Pro is shut to newcomers. |
| `aider` | FREE | **FREEMIUM** (judgement) | Apache-2.0 software with no paid tier, but it cannot be used without a paid third-party API key. Defensible either way — flagged, not asserted. |

### Cost tiers that are arguable rather than wrong

- `amazon-bedrock` (FREEMIUM) — Bedrock has no free tier of its own, only a time-boxed AWS account credit on a plan that expires at six months.
- `fireworks-ai` (FREEMIUM) — no ongoing free allowance, only a one-off ~$1 credit, after which the docs say the account is suspended until a card is added. FREEMIUM or PAID both defensible.
- `replicate` (FREEMIUM) — "free" is a one-off limited run count on a curated collection, not a recurring tier.
- `google-vertex-ai` (FREEMIUM) — all free access is time-boxed.

**Pattern worth naming:** across this batch, `FREEMIUM` is repeatedly recording *"there is a way to
start without paying"* when the truth is *"there is an expiring credit."* Those are different things
to a budget-conscious beginner, and the catalog currently cannot tell them apart. If one schema
change comes out of this batch, distinguishing a recurring free allowance from a one-off trial
credit is the one with the most reader value.

## `privacyLevel` items

- `assemblyai` — free accounts **cannot opt out** of the model-training program (vendor docs), which contradicts the vendor's own marketing security page and sits oddly with `privacyLevel=HIGH`.
- `deepgram` — the ToS (§3.2/3.3) reads opt-out-by-default with a perpetual training licence, while the Model Improvement Partnership doc reads opt-in. Unresolved.
- `amazon-q-developer` — research agent recommends MEDIUM rather than HIGH.
- `google-antigravity` — Google's terms permit human review of interactions; recommends a privacyLevel review. Also **unavailable to under-18 users**, which nothing in the catalog records.

## Obtainability — three rows where a beginner cannot buy the product

These are not metadata errors. They are rows whose "Getting Started" page is arguably a
category error, and they need an editorial decision rather than a field edit.

1. **`tabnine`** — no self-serve signup at all post-acquisition. The page was written for a reader whose employer already has it. **Strongest candidate for `exclusions.json`.**
2. **`amazon-q-developer`** — coding tools closed to new signups. The page was written around the AWS console/docs assistant, which AWS says is unaffected and which a new AWS account can still use. Decide: retire, or keep as the console assistant page, or repoint to Kiro.
3. **`scale-ai`** — sales-led, no published prices, every "Get started" is a demo form. The page is reframed around Scale's free public leaderboards at labs.scale.com and states plainly that the product cannot be bought by clicking. Defensible as written, but `exclusions.json` is also defensible.

## Unresolved by research — carried forward verbatim, not guessed

- **`assemblyai`** — three vendor pages disagree on transcript retention: never stored / ~30 days / indefinitely.
- **`deepgram`** — ToS vs Model Improvement Partnership doc contradict each other on training consent. Could not verify whether the Playground accepts your own audio without signing in (JS-only page, two docs URLs 404), nor whether Saga routes audio through the service that trains by default.
- **`openai-codex-cli`** — OpenAI's help centre and pricing page say Codex is included on the Free plan; the CLI docs page says Plus or above. The page states both.
- **`bolt-new`** — vendor pages disagree on the annual discount (28% on /pricing vs 10% in billing docs) and the billing docs still name retired "Pro 50/100" tiers. **No annual figure was written into the page.**
- **`kiro`** — the privacy doc and the FAQ contradict each other on which paying users are exempt from content collection.
- **`fireworks-ai`** — the keyless-playground assumption behind starter actions 1–2 could not be verified behind login.
- **`pinecone`** — the whole non-developer framing rests on Pinecone Assistant being usable end-to-end in the browser console. Docs confirm the console is a supported surface but never show an upload-and-chat walkthrough. **Verify at app.pinecone.io before this page merges.**
- **`replicate`** — sign-in appears to be GitHub-only; needs a browser check.
- **`together-ai`** — Together Chat's current price and limits could not be verified from any vendor page.
- **`scale-ai`** — could not verify the advertised self-serve dashboard signup; robots.txt and the egress proxy both blocked dashboard.scale.com.
- **`amazon-bedrock`** — Bedrock Agents was closed to new customers on 2026-07-30 (Agents Classic → AgentCore); an older tutorial will lead a reader there.
- **`aider`** — last tagged GitHub release Aug 2025, last PyPI package Feb 2026, last commit 2026-05-22 with none since; the project's own homepage still recommends early-2025 models. Recommend a 90-day re-review rather than the batch default.

## Carried over, still open from 2026-09-07

- Verify Udio's download and ownership position while logged in, before that page merges.
- The `x.ai` legal-entity question remains deliberately out of shipped copy.
