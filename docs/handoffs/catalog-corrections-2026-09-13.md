# Catalog corrections — nightly tutorial batch 2026-09-13

Twenty rows researched. These are reviewer notes only — **nothing here has been applied to any
database, and this job never writes to Neon.** Slugs in the shipped .ts files are unchanged;
every correction below is a decision for Zach.

---

## ai21-labs-jamba

*(Reported only. Not applied to any database.)*
1. **Archetype is wrong.** The row says `prompts`; it should be `pick-and-setup`. There is no AI21
   prompt surface to write prompts for.
2. **Check the catalog's URL for this row.** If it points at `studio.ai21.com`, `www.ai21.com/jamba`,
   or an AI21 sign-up page, all three are now redirects — the first to AI21's marketing homepage, the
   second to a 2024 research paper. The durable destination is `https://huggingface.co/ai21labs`.
3. **Check the category.** If this row sits in a chat/text-assistant category on the strength of the
   `prompts` archetype, it belongs in Local & Open-Source AI (or AI APIs & Developer Services), which
   is where the reader's actual motion lands.
4. **Check any "free trial" or price field.** If the row records a free trial, note that the vendor
   states two different lengths on two live pages (7 days vs three months) and neither is reachable.
   Per-token prices, if stored, are quoted by AI21 for versions its own deprecation table has retired.
5. **`changelogUrl` candidate:** `https://docs.ai21.com/changelog` — usable, but flag it as stale
   (last entry 1 December 2025). `https://huggingface.co/ai21labs` is the better freshness signal.
6. **Privacy level.** If the row carries a privacyLevel, the local-run path justifies the low/private
   end, matching Ollama rather than a cloud chatbot.

## aleph-alpha-luminous

*(Research findings only. Nothing here has been applied to any database.)*
**1. SUSPECT_COST_TIER — resolved. The flag is correct; the tier is wrong.**
What a reader actually pays: **nothing is purchasable at any published price.** There is no
free tier, no trial, no credit-card path and no price list. `aleph-alpha.com/pricing` returns
404 and the site footer no longer carries a terms-of-service or licensing-terms page at all.
Every route to the product ends at "Contact sales" or a redirect to the contact form. The
only zero-cost thing on offer is the Pharia-1-LLM-7B download, which is a research artefact
under a non-commercial, non-administrative licence — not the product, and not usable at work.
Any catalog value in the freemium / free-trial / "free tier available" family is a leftover
from the Luminous era, when app.aleph-alpha.com ran an open self-serve playground with
per-token pricing. That era is over: the same URL now serves an academic-eligibility request
form. **Correct cost tier: enterprise / quote-only ("Contact sales", custom pricing).**
`accessTier` should be `PREMIUM`.
**2. Platform name and slug.** The row is "Aleph Alpha Luminous". Luminous is retired and
absent from every current vendor surface. Rename the display name to **"Aleph Alpha"** (or
"Aleph Alpha (PhariaAI)"). Keep the slug for URL stability if it is already indexed; if not,
`aleph-alpha` is the honest slug.
**3. Archetype.** Catalog hint says `prompts`; correct value is `pick-and-setup`. There is no
reader-reachable prompt field.
**4. `changelogUrl`** is available and worth populating:
`https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/index.html` — dated, versioned,
monthly, and the cheapest re-review trigger this platform offers.
**5. Category placement.** If this row currently sits in a consumer chat/text category, it is
mis-shelved. It belongs with AI APIs / developer services or enterprise platforms.
**6. `lastReviewedAt`** should be `2026-09-13`, and this row wants a short re-review interval —
the Cohere merger is pending and could change the name, the docs domain and the product line
in one step.
**7. exclusions.json candidacy.** See FLAG. My recommendation is to exclude: the page cannot
give a beginner anything to do, and the platform's only free artefact is licensed against the
use a reader would put it to.
---

## casetext-cocounsel

*(never applied to any database — for the owner to action)*
| Field | Current (implied by slug) | Correct as of 2026-09-13 |
|---|---|---|
| Platform name | Casetext CoCounsel | **CoCounsel Legal** (Thomson Reuters) |
| Slug | `casetext-cocounsel` | `cocounsel-legal` — with a redirect from the old slug if the row has earned any traffic |
| Vendor | Casetext, Inc. | Thomson Reuters |
| Primary URL | `https://casetext.com` (301s away) | `https://legal.thomsonreuters.com/en/products/cocounsel-legal` |
| Pricing field | anything with a number in it | "Contact sales — no public pricing" |
| Free tier | if the row says yes | no; and the legacy free Casetext search is gone (HTTP 410) |
| Region | if the row says global | United States only for the current product; Canada, UK, Australia expected later in 2026 |
Two further notes for the catalog owner:
- If the catalog also carries a separate `westlaw` or `westlaw-ai` row, it now overlaps heavily —
  Westlaw AI capability is a plan line item *inside* CoCounsel Legal.
- The `whereToNext` category slug `legal-ai-tools` is a guess. Confirm the real legal category slug
  against `src/data/categories` before transcription; `research-academic-tools` is copied from the
  shipped ChatGPT page and is safe.

## clio-manage

*(recorded only — not applied to any database)*
1. **The row should name the AI feature, not just the suite.** As it stands, `clio-manage` points at
   a practice-management platform whose AI is a distinct, separately gated, recently renamed
   capability. Suggested display name: **Clio Manage AI** (or "Clio Manage — Manage AI"), with
   **Clio Duo** carried as an alias/search synonym, since Clio's own URLs and most 2025 coverage
   still use it. Slug `clio-manage` can stay.
2. **Access tier.** If the row currently reads FREE on the strength of the 7-day trial, correct it
   to **PREMIUM**. There is no free plan, and the AI is excluded from the cheapest paid plan.
3. **Archetype.** Confirm `prompts` — correct, but for the hybrid task-based reason set out above,
   not because it is a chatbot. If the catalog derives archetype from category (Legal → prompts),
   no change is needed.
4. **Category placement.** Legal is right. It is not a Workflow & Automation platform despite the
   billing and scheduling automation; nothing here is a user-built when→then.
5. **`whereToNext` slug `legal`** is unverified — check before transcription.
6. **Related-platform links** should point at MyCase, PracticePanther and Smokeball rather than at
   general AI assistants; the honest comparison set for this row is practice-management suites.

## cohere

*(Never applied to any database. For the owner to action manually.)*
1. **Archetype.** Catalog hint says `prompts`; the correct archetype is **`pick-and-setup`**.
   The likely root cause is category placement — spec § 6 maps *AI APIs & Developer Services*
   and *Local & Open-Source AI* to `pick-and-setup`, and *Text & Conversational AI* to
   `prompts`. If Cohere is currently filed under Text & Conversational AI, that is the record
   to fix; the archetype follows from it.
2. **Category.** Cohere belongs in **AI APIs & Developer Services**. It has no consumer app;
   its homepage sells North, Compass and a model line-up to businesses.
3. **Access tier.** `FREE` is correct and should be checked — the free path is genuine but
   invisible from the homepage, so a catalog record built by looking at cohere.com alone
   would plausibly have marked this PREMIUM or enterprise-only.
4. **Any catalog copy referencing "Coral"** is stale — coral.cohere.com redirects to the
   dashboard login and Coral is not in Cohere's product list.
5. **`changelogUrl`** for the tutorial record: `https://docs.cohere.com/v2/changelog` — a real,
   dated, actively maintained release-notes page. Worth setting.
6. **Category slug** `ai-apis-developer-services` used in `whereToNext` is unverified against
   the live catalog; confirm or drop.

## gpt-image-1-5-dall-e-successor

*(reported only — never applied to any database)*
1. **Name is wrong and dated.** "GPT Image 1.5 (DALL·E successor)" names a model deprecated on 2026-06-02 and shutting down 2026-12-01. Rename the row to something version-free, e.g. **"ChatGPT Images (OpenAI image generation)"**. A version number in a catalog name for this vendor has a shelf life of roughly four months on the observed cadence — 1.5 in December, 2 in April, 2.5 in September.
2. **Slug should follow.** `gpt-image-1-5-dall-e-successor` bakes in both a dead model and a dead predecessor. If slugs are cheap to change, `chatgpt-images` is the durable form; if not, leave the slug and fix the display name.
3. **Check the row's URL.** Any URL pointing at an openai.com DALL·E page, or at a `gpt-image-1.5` model page, points at a retired or deprecated product. The correct destination for a beginner is **https://chatgpt.com**, not a developer model page.
4. **Cost tier.** If the row is marked paid or freemium-with-no-free-images, correct it: image generation is on the $0 Free plan on all tiers per OpenAI's own images help article.
5. **Category.** Image generation / editing is right. Do not file this under developer APIs — the reachable product for this audience is the ChatGPT surface.
6. **Unrelated but found while checking cross-links: Sora is gone.** Web and app discontinued 2026-04-26, API 2026-09-24, and openai.com/sora redirects to the discontinuation notice. Any Sora row or video-generation cross-link is an exclusions.json candidate in its own right.
7. **Possible duplicate.** `gpt-image-1-5-dall-e-successor` and `chatgpt` are the same vendor and, arguably, the same signup. They are still worth separate pages — the image surface has its own editor, its own plan gate, its own provenance story and its own licence question — but the ChatGPT page's two image lines and this page's `whatItIs` should not be written by different people without one of them reading the other.

## gpt4all

*(Recorded only. Never applied to any database.)*
1. **Maintenance status.** If the catalog entry for `gpt4all` carries any "actively
   maintained"/"actively developed" signal, it is now wrong. Suggested change: mark as
   maintained-but-dormant, or add a note field reading "last release Feb 2025; still
   downloadable and supported by the vendor's site." Recommend a shortened re-review interval
   for this entry (~90 days) — if the repo is archived or the download page removed, the
   recommendation changes materially.
2. **Vendor URL.** If the catalog stores `gpt4all.io` as the platform URL, update it to
   `https://www.nomic.ai/gpt4all`. The old domain now redirects; the redirect works today but
   is exactly the kind of thing that breaks when a company finishes a pivot.
3. **Vendor/company description.** Any catalog copy describing Nomic as an
   embeddings/open-source-AI company is out of date; Nomic now positions itself as an AEC AI
   platform.
4. **Pricing field.** If GPT4All's entry inherits any Nomic pricing ($20/mo), remove it —
   that price belongs to a different product and would mislead a reader on the single
   question this audience cares most about.
5. **Not an exclusions.json candidate.** It installs, it runs, it is free, it is genuinely
   private, and the honest caveat fits on the page. Keep it listed with the caveat rather than
   removing it. Flag for re-check rather than exclusion.
---

## harvey-ai

*Never applied to any database. For Zach's review only.*
1. **`accessTier` must be PREMIUM, and the catalog's free/paid flag is probably wrong if it says
   otherwise.** Harvey has no free tier and no consumer plan of any kind. If the catalog row
   carries a price band, it should be blanked or set to "contact sales" — anything numeric there
   is trade-press hearsay.
2. **Harvey is an exclusions.json candidate.** See FLAG. It fails the site's implied promise more
   completely than a merely expensive tool does: a reader cannot buy it at any price.
3. **Category slug verification needed.** Only `text-conversational-ai` is confirmed from shipped
   code. `legal` and `document-pdf-processing` are inferred from the template spec's 20-category
   list via the observed naming pattern and must be checked against the live catalog before this
   page is transcribed.
4. **Vendor name.** The catalog slug is `harvey-ai`; the product and the company both brand
   themselves simply **Harvey** (legal entity: Counsel AI Corporation). The page title should say
   "Harvey," not "Harvey AI." Consider whether the display name in the catalog should follow.
5. **`changelogUrl` is available:** `https://www.harvey.ai/blog` — Harvey posts a monthly product
   round-up titled "The Brief," which is a genuine changelog surface and unusually good for
   re-review. Worth populating.
6. **privacyLevel signal.** Harvey's contractual posture is materially stronger than a typical
   cloud AI tool (no training by Harvey *or* subprocessors, contractual not just policy-level,
   customer-selected data region, 30-day deletion). If the catalog row inherited a default
   "cloud = medium/high concern" rating, that under-rates it.

## kakao-brain-karlo

*Never applied to any database. Recorded for the reviewer.*
1. **URL is almost certainly dead.** If the row's URL is `kakaobrain.com`, `kakaobrain.com/karlo`,
   `karlo.ai` or `bdiscover.kakaobrain.com`, none of those resolve. The only working
   destination is `https://huggingface.co/spaces/kakaobrain/karlo`.
2. **Vendor name.** "Kakao Brain" as the operating company is out of date — the Karlo business
   transferred to Kakao Corp. on 2024-06-03 and the AI team was absorbed into Kakao. If the
   row is kept, the vendor should read Kakao (formerly Kakao Brain) and the row should carry
   a discontinued/legacy marker.
3. **Access tier.** Anything marking Karlo as having a paid or API tier is wrong; the paid
   surface ended 2024-09-30.
4. **Category placement.** If the row sits under an APIs/developer-services category it is
   misfiled — there is no API. It belongs under image generation, or under a
   legacy/historical grouping if one exists.
5. **`exclusions.json` candidate — flagged, not decided.** The product is discontinued and
   every vendor-owned domain is gone. Argument to keep: a free, no-signup, working prompt box
   exists today and the page above is honest about what it is. Argument to exclude: a
   discovery site for beginners pointing at a 2022 research demo on a third-party host may be
   sending readers somewhere that helps nobody choose a tool. Owner's call.

## kira-systems

| Field | Current (implied by slug) | Correct as of 2026-09-13 |
|---|---|---|
| Product name | Kira Systems | **Kira** — display as "Kira (by Litera)" to keep the searched-for name findable |
| Vendor / company | Kira Systems Inc. (Toronto) | **Litera** (227 W Monroe St #2100, Chicago IL) — acquisition announced 10 Aug 2021 |
| Primary URL | https://kirasystems.com | **https://www.litera.com/capabilities/review** — the old domain 301s here |
| Secondary URL | — | https://www.litera.com/products/kira also redirects to the same page; keep neither as canonical |
| Pricing | (any figure) | **No public price.** Sales-led, firm subscription. Remove any price band |
| Access | (likely "free trial" / "freemium") | **Enterprise / firm licence only. No individual signup, no trial, no store listing** |
| Slug | `kira-systems` | Recommend keeping the slug for SEO continuity (people search "Kira Systems") but changing every display string. Do **not** silently rename the row's URL without a redirect |
| Related product | — | Lito, Litera's legal AI agent, is bundled with Kira at no extra charge; if Lito is catalogued separately, cross-link the two |
| whereToNext slugs | — | `legal-ai-tools` and `document-pdf-processing` are **inferred, not verified**. Check against the live category table before transcription |
**exclusions.json candidacy:** yes, flag for review. Kira meets the "sales-led, enterprise-only,
no individual path" profile. My recommendation is to **keep the page and mark the row
enterprise-only** rather than exclude — the brand is heavily searched, the page's most valuable
content for a beginner is precisely "this is not something you can buy, here is who owns it now,
here is what to check before your firm's admin hands you a seat," and excluding it leaves that
search query answered only by affiliate listicles still describing a 2021 company. But that is a
catalogue-policy call, not mine.

## llama-cpp

*Recorded only. Never applied to any database.*
1. **Official URL.** If the catalog row for `llama-cpp` points at `github.com/ggerganov/llama.cpp`, both parts are now stale: the repo moved to `ggml-org/llama.cpp`, and since May 2026 the project has an official website. The canonical URL should be **https://llama.app**.
2. **Category placement.** "Local & Open-Source AI" is right. If it is *also* filed under "AI APIs & Developer Services", that is defensible (it does expose a local API) but it will pull in readers this page is not written for.
3. **`whereToNext` route.** The Ollama entry above uses `href: "/tutorials/ollama-getting-started"`. No route files were staged with this brief, so the transcriber must confirm the tutorial URL pattern before using it — if it doesn't match, drop to the two `categorySlug` entries, both of which are confirmed in use on existing pages.
4. **Not an exclusions.json candidate.** Obtainability is strong: free, MIT, actively maintained, prebuilt binaries for every mainstream platform, no account required at any point.
---

## localai

**Never applied to any database. Owner action only.**
1. **`accessTier` must be `FREE`.** If the catalog has LocalAI as freemium, paid, or
   "free tier available", that is wrong — there is no tier structure at all.
2. **No "Cloud" / hosted variant exists.** If the catalog row carries a pricing note
   modelled on Ollama's (free local + paid cloud), delete it.
3. **`privacyLevel` should be LOW (i.e. good), with a caveat.** Nothing leaves the machine.
   But if the catalog's privacy signal is a simple flag, note that LocalAI's default
   configuration is *less* locked down than Ollama's — it listens on all interfaces with no
   authentication — so a naive "local = safest" ranking would over-rate it relative to
   Ollama. Worth a reviewer's eye if the two sit adjacent in a category listing.
4. **Verify the category slug `ai-apis-developer-services`.** I inferred it from the spec's
   § 6 category name "AI APIs & Developer Services". Only `local-open-source-ai` is
   confirmed (it appears in `ollama-getting-started.ts`). **Do not ship the second
   `whereToNext` entry until the slug is checked against the catalog** — a dead category
   link is worse than two entries.
5. **Verify the tutorial route shape before using `href: "/tutorials/ollama-getting-started"`.**
   I could not confirm the route from the staged files; only the `slug` field
   (`ollama-getting-started`) is visible. If the route differs, fix the href — the
   `beforeYouStart` Windows item explicitly promises this link.
6. **Platform description.** If the catalog describes LocalAI as "a local chatbot" or
   groups it with Ollama/LM Studio as a chat app, that mis-sells it. It is a self-hosted
   server that impersonates paid cloud APIs and happens to ship a chat page. Suggested
   catalog one-liner: *"Self-hosted, OpenAI- and Anthropic-compatible AI server — run text,
   image, speech and transcription models on your own hardware."*
7. **`changelogUrl`.** Use `https://github.com/mudler/LocalAI/releases` — the project has no
   separate blog-style changelog and releases carry full notes.
8. **`lastReviewedAt`.** Set to the transcription date. Release cadence is roughly monthly
   or faster (four minor versions between June and August 2026), so this page has a shorter
   shelf life than most.
---

## luminance

Never applied to any database. Flagged only.
1. **`accessTier` must be PREMIUM with no free tier.** If the catalog row carries any free-tier flag
   or trial, it is wrong. There is no self-serve product.
2. **Any price or price band on the Luminance row should be removed, not corrected.** The vendor
   publishes none. Anything in the row came from a third-party aggregator and is hearsay under § 8c.
   The spec's "hedged ballpark band" rule (§ 7) cannot be satisfied honestly here; the page says
   plainly that no price is published instead of inventing a band.
3. **`archetype` = `prompts` is correct**, but the row should not imply chat is the default surface.
   Ask Lumi is an opt-in add-on selected within the product; the base products are upload-and-act.
4. **Vendor entity:** Luminance Technologies Ltd, Cambridge, UK. If the row lists a US HQ or an
   acquirer, correct it — LexisNexis is an alliance partner only, announced 24 April 2026.
5. **`privacyLevel`:** the honest signal is mixed, not simply "high". Single-tenant hosting and
   ISO 27001/SOC 2 pull one way; the contractual carve-out that query text may not be redactable when
   third-party models are enabled pulls the other. Whatever value the row holds, it should not be set
   from the certifications alone.
6. **`whereToNext` slugs:** `legal-ai-tools` and `document-pdf-processing` are guesses. Verify against
   the live category table before transcribing; `research-academic-tools` is confirmed from the
   ChatGPT exemplar.

## mem

*(recorded only — never applied to any database)*
1. **Archetype.** The row is hinted `recipes`. It should be **`prompts`**. The when→then
   surface (Custom Routines) is dashed out on Free and Plus and only appears at $29/month; the
   chat/voice prompt surface is what a free reader actually gets.
2. **Product name.** Display it as **Mem** (vendor's own current wording: "Mem – Your AI
   Thought Partner"). Not "Mem.ai" and not "Mem AI" — the vendor's own pages, app title and
   terms all use the bare word.
3. **URL.** Correct marketing/landing URL is **`https://get.mem.ai`** (the app itself lives at
   `https://mem.ai`, which serves a JavaScript app shell and a browser-upgrade notice to
   crawlers — a poor destination for a catalog link and a likely source of false "dead site"
   readings in automated checks). Changelog-equivalent URL: `https://get.mem.ai/blog`.
4. **Ruled out.** If the row currently points at **`mem0.ai`** or the `mem0ai/mem0` repo, it is
   the wrong product entirely — Mem0 is a different company selling a developer memory layer
   for AI agents. Worth an explicit check of the stored URL before this page ships.
5. **Vendor.** Mem Labs, Inc. Still independent and still shipping (iOS 2.6.32 updated
   2026-09-12); the "AI graveyard" listings that surface for this name in search results are
   not about this product's current status.
6. **Category.** Meetings & Notes fits; a secondary tag under Workflow & Automation is
   defensible given the Zapier integration and Connections, but the primary is notes.
7. **privacyLevel.** Suggest **MEDIUM**, not LOW: strong stated position (no training on notes,
   SOC 2 Type II) but content is decrypted for third-party AI processing by design and log
   retention runs to 400 days.

## microsoft-designer

- I could not inspect the catalog row itself (not staged locally), so these are checks to run rather than confirmed errors.
- **Canonical URL should be `https://designer.microsoft.com`.** If the row points at `microsoft.com/en-us/microsoft-365/microsoft-designer` that is the sales page, not the product; if it points at anything under `teams.microsoft.com` or a Teams app listing, that is the *retired* Designer-in-Teams integration and must be changed.
- **Name:** "Microsoft Designer" is current — no rename found. Do not let it be merged with, or relabelled as, Microsoft Copilot or Microsoft Create; they are separate entries.
- **Cost tier: FREE** is correct — free with a personal Microsoft account and a monthly credit allowance.
- **Category:** image generation / design fits. If the row is filed under a business or marketing category, that conflicts with the terms' personal-use-only restriction and should move.
- Not an exclusions.json candidate: the product is alive, public and free to reach.

## naver-hyperclova-x-cue

*(Recorded only. Not applied to any database.)*
1. **This row should not be one platform.** "HyperCLOVA X" and "Cue:" were never the same
   product: HyperCLOVA X is a model family that is alive and shipping, Cue: was a standalone
   AI search product that was discontinued on 2026-04-09. Bundling them means the row is
   simultaneously live and dead.
2. **`Cue:` is an exclusions.json candidate** — discontinued product, no successor URL, no
   path for a reader. So is **`CLOVA X`** if it exists as its own row anywhere in the catalog.
3. **Suggested slug/name for the surviving row:** `naver-hyperclova-x`, displayed as
   "Naver HyperCLOVA X". Any stored URL pointing at `clova-x.naver.com` or a `cue.` host
   should be replaced with `https://www.naver.com` (consumer surface) or
   `https://clova.ai/en` (product surface).
4. **Category check:** if this row currently sits in Text & Conversational AI on the strength
   of the dead chatbot, it is now better described as an International / regional search-and-AI
   row, with a secondary presence in Local & Open-Source AI on the strength of SEED. Archetype
   stays `prompts` either way.
5. **`accessTier` should be FREE**, not PREMIUM — if the row is currently PREMIUM it was
   probably keyed to CLOVA Studio, which is not the consumer surface.

## sakana-ai

*(Analysis only. Never applied to any database.)*
1. **Does this row belong in the catalog at all? Flag for Zach — exclusions.json candidate, with a recommendation to keep it.** The free consumer product says on its own help page that it works only from inside Japan, and LaunchpadHQ's audience is largely not in Japan. That is a stronger obtainability problem than a waitlist, because there is nothing to join. Against exclusion: there genuinely is a product, it is free, the restriction is a stated policy rather than a hard technical wall (both pages served us from outside Japan), Sakana is one of the most-covered AI companies in the world and a beginner will search the name, and a page that says "here is what it is, here is who can use it, here is where to go instead" is more useful than a missing page. **Recommend keeping with the Japan gate stated in the first screen.** If Zach's rule is "must be usable by a US reader today", this fails it and should be excluded — that is his call, not mine.
2. **The archetype hint was right but the premise behind it was wrong.** Whoever tagged this "prompts" appears to have been guessing from the category. Sakana is no longer a papers-only lab: it has shipped a free chatbot (March 2026), a translation product (July 2026) and two commercial products (Marlin June 2026, Fugu API June 2026). Any catalog description written before March 2026 describing Sakana as a research lab with no product is stale.
3. **Category placement.** If the row currently sits under research or an international/regional category, Text & Conversational AI is the better primary home for the consumer product; the developer product would sit under AI APIs & Developer Services if the row is ever split. I did not verify the exact slug for that category and have not used it in `whereToNext`.
4. **`privacyLevel` should be LOW-to-medium, not high.** In-Japan storage, an explicit no-overseas-transfer clause and a documented training opt-out are a better privacy posture than most free chatbots. The one qualifier is that training is on by default.
5. **A region field would earn its keep.** This is the second axis after price that decides obtainability, and there is currently nowhere to record "Japan only" or "not in EU/EEA". Three of Sakana's four products carry a region restriction. Worth raising as a schema question rather than a per-row fix.

## spellbook

1. **Primary domain has changed.** Any catalog record pointing at `spellbook.legal` should move to `https://spellbook.com`. The old domain 302-redirects today, but the help centre and app subdomains remain on `spellbook.legal`, so do not blanket-rewrite every stored URL.
2. **Vendor/company name.** The legal entity is Dialog Enterprises Inc., trading as Spellbook. Worth storing if the catalog has a company field.
3. **Access tier.** If the catalog currently marks Spellbook free or freemium, that is wrong: no free tier, 7-day trial only, quote-only pricing.
4. **Archetype derivation.** The spec derives archetype from category and maps Legal → Prompts. That holds here, but only because Spellbook happens to have real prompt boxes; other Word-add-in legal tools in the same category may be pure button surfaces. Worth flagging that the Legal→Prompts mapping should not be applied unexamined across the rest of the legal rows.
5. **Price band.** Do not store one. There is no public price anywhere on the vendor's site; any band in the catalog came from a third-party blog and should be removed rather than refreshed.

## text-generation-webui-oobabooga

*(Recorded only. Never applied to any database.)*
| Field | Current (assumed from slug) | Correct as of 2026-09-13 |
|---|---|---|
| **Project name** | text-generation-webui / oobabooga | **TextGen.** Recommended display: `TextGen (formerly text-generation-webui)`. "oobabooga" is the maintainer's handle, still current, still the repo owner — not stale. |
| **Slug** | `text-generation-webui-oobabooga` | **Leave it.** All inbound search demand still uses the old name; changing the slug throws that away for no reader benefit. The display name carries the correction. |
| **Repository / homepage** | likely `github.com/oobabooga/text-generation-webui` | `https://github.com/oobabooga/textgen` (old URL redirects, but store the canonical one) |
| **Short description** | probably "web UI for running LLMs locally" | Now materially wrong in shape: it ships as a **desktop app** — download, unzip, double-click, a window opens — with the browser interface as one way of running it, not the only one. Suggested: "Open-source desktop app for running AI models locally, with every engine and setting exposed." |
| **Licence** | — | AGPL-3.0 |
| **changelogUrl** | — | `https://github.com/oobabooga/textgen/releases` |
| **accessTier** | — | FREE (no paid tier, no cloud product, no account) |
| **Category** | Local & Open-Source AI | correct, no change |
| **lastReviewedAt** | — | `2026-09-13` |
**Not an exclusions.json candidate.** Active releases through May 2026, a large user base and
a clean free/open obtainability story. The only thing wrong with the row is the name.
---

## vllm

*(Research notes only. Never applied to any database.)*
**1. Does this row belong in a beginner catalog at all? — My honest answer: not as it currently
stands, and this is the finding I would most want a human to actually decide on.**
The case against keeping it:
- LaunchpadHQ's stated audience includes people for whom this may be their first-ever AI experience.
  vLLM's own entry requirements are a Linux machine, a datacentre-class graphics card, and a Python
  environment matched to a driver version. There is no configuration of this page that makes it
  actionable for that reader. The best the page can do — and what the copy above does — is let them
  work out in ninety seconds that it is not for them, and hand them to Ollama.
- Everything the beginner-relevant part of this page says is *"here is why you probably want the
  other tool."* That is honest, and it is thin as a value proposition for a whole page.
- Judged against the March 2026 scaled-content risk the template spec exists to manage, a page whose
  genuine conclusion for 95% of its readers is "go read the Ollama page" is a weak page to have in
  the index, however well written.
The case for keeping it:
- vLLM is not obscure or dying — it is a Linux Foundation / PyTorch Foundation-governed project
  releasing every fortnight, and it is the engine underneath products the reader has used. A
  discovery catalog that omits it has a hole in it.
- The page has one thing genuinely worth indexing: the **security fact** (an inference server with
  authentication off by default, whose own docs say the API-key flag does not cover every address).
  That is a real, documented, non-obvious risk, and almost nobody writing beginner content prints it.
- "What is this thing everyone mentions, and is it for me?" is a legitimate reader question, and
  answering it well is exactly the § 8 brief.
**My recommendation, in order of preference:**
1. **Keep the row, keep the page, and re-label its position in the catalog** so that vLLM is not
   displayed as a peer of Ollama and LM Studio in a "run AI locally" list. It belongs alongside
   serving and developer infrastructure, not alongside desktop apps. A reader who lands on it from
   a local-AI browse is being mis-set-up by the catalog before the page ever gets a chance.
2. If (1) is not achievable with the current category model, **exclusions.json is a defensible call**
   — but treat it as a catalog-fit decision, not a quality one. There is nothing wrong with vLLM.
3. Do *not* keep it in a beginner local-AI list unchanged. That is the option that misleads.
**2. `whereToNext` slug to verify.** `local-open-source-ai` is confirmed from
`ollama-getting-started.ts`. `ai-apis-developer-services` is my inference from the template spec's
§ 6 category name "AI APIs & Developer Services" and the naming convention of the confirmed slugs
— **it is not verified against the live category table**, because the staged repo subset contains
only `src/data/tutorials/`. Confirm before transcribing. Same for the `/tutorials/<slug>` href
pattern in entry 3.
**3. `privacyLevel`.** Whatever this row currently carries, the honest value is not a simple LOW.
Ollama's private-by-default LOW does not transfer: vLLM is private in the same way (nothing leaves
your hardware) and simultaneously ships a network service with no authentication on. If the field
has a single value, MEDIUM with the security section carrying the nuance is more truthful than LOW.
**4. Archetype confirmed correct.** `pick-and-setup` is right — the starter slot is genuinely
"first models/configs to try," and the page needs `gettingSetUpSafely`.
**5. `changelogUrl`.** Suggest `https://github.com/vllm-project/vllm/releases` — releases land
roughly fortnightly and the notes are substantive, which makes re-review cheap. There is a blog at
`vllm.ai/blog` (note: `blog.vllm.ai` 302-redirects there), but the releases page is the better
freshness signal for this page's volatile facts.
---

