# Guide PR D: renames, Clarifai shutdown, Tabnine retired, vendor rewrites, audit 15

Branch `guide-pr-d-1029`, based on `origin/main` 4c0ba27. Source: the Oct 29 guide audit (`GUIDE-AUDIT.md`, `audit-results.json`, `REVIEW-SUMMARY.md` in the audit worktree). Every fact below comes from the vendor's own pages, fetched on 2026-10-29. The follow-up items (Tabnine, Clarifai, Activepieces, Scite, Canva, Lindy) were RA-verified and then re-read on the cited official pages the same day; the pages that could not be re-read are listed under Unverified items. X posts were not used. No database command was run, no dev server was started, and no `.env*` file was read or touched.

> **Deploy and run audit 15 together.** Like audit 6 (Le Chat → Vibe), the four renames move DB rows to new slugs. Between the deploy and the audit run, the old slugs are hidden and 301 to new slugs that have no row yet, so those four platform pages and guides return 404. Run audit 15 on a Neon branch first, then on production straight after the deploy.

## Files changed

- **Renamed guides (git mv + edits):**
  - `src/data/tutorials/gemini-enterprise-agent-platform-getting-started.ts` (was `google-vertex-ai-…`)
  - `nano-banana-getting-started.ts` (was `google-imagen-3-…`)
  - `textgen-getting-started.ts` (was `text-generation-webui-oobabooga-…`)
  - `gemini-notebook-getting-started.ts` (was `notebooklm-…`)
  - `retired/clarifai-getting-started.ts` (moved out of the registry, text kept)
  - `retired/tabnine-getting-started.ts` (moved out of the registry, text kept)
- **Rewritten guides:** `chatgpt`, `tray-ai`, `llama-cpp`, `cursor`, `adobe-firefly`, `hedra`, `freepik-ai`, `wonder-dynamics-wonder-studio`, `scite`, `canva-ai`, `activepieces` (`…-getting-started.ts`).
- **Registry:** `src/data/tutorials/index.ts`.
- **Facts:**
  - New: `gemini-enterprise-agent-platform.ts`, `nano-banana.ts`, `textgen.ts`, `clarifai.ts`, `scite.ts`.
  - `gemini-notebook.ts` (moved from `notebooklm.ts`).
  - Edited: `freepik-ai.ts`, `hedra.ts`, `wonder-dynamics-wonder-studio.ts`, `tabnine.ts`, `canva-ai-magic-studio.ts`, `lindy-ai.ts`, `registry.ts`.
- **Redirects and visibility:** `src/lib/catalog-redirects.ts` (`PLATFORM_REDIRECTS` +4, `RETIRED_GUIDE_SLUGS` + clarifai, tabnine).
- **MCP and search data:**
  - `src/lib/mcp/names.ts`: aliases imagen, googleimagen, notebooklm, vertexai, googlevertexai, textgenerationwebui, oobabooga.
  - `src/data/task-tags.ts`, `src/lib/platform-logo-assets.json` (new keys use the existing logo files).
  - `src/data/workflows/workflows.ts` (research workflow: NotebookLM → Gemini Notebook).
  - `src/lib/mcp/stress-replay.ts`.
- **Audit 15:** `src/data/catalog-audits/audit-15.ts`, `audit-15.test.ts`, `scripts/update-catalog-audit-15.ts`, and `package.json` (adds `db:update-catalog-audit-15` and adds the test to `npm test`).
- **Test snapshot:**
  - `src/lib/mcp/catalog-snapshot.json` has audit 15 applied (renames, row patches, Tabnine ref removals).
  - `scripts/mcp-snapshot/build-catalog-snapshot.ts` gets step 7 (audit 15), and its audit-3 replay now follows redirects.
  - New one-off script `scripts/mcp-snapshot/apply-audit-15-to-snapshot.ts`.
  - `src/lib/mcp/golden-top5.json` was regenerated.
  - Updated tests: `catalog-snapshot.test.ts`, `catalog-visibility.test.ts`. Three older tests pinned Canva's facts to 2026-10-26 and now accept a later re-check: `audit-10.test.ts`, `audit-11.test.ts`, `search-1026-facts.test.ts`. They still pin Pro's $144 yearly price.
- **Helper fix:** `src/data/catalog-audits/audit-3-refs.ts`. `audit3NameRenames()` now looks up `notebooklm`'s displayName through `PLATFORM_REDIRECTS`; without that it would throw after the fact file moved.

## Redirect table (all 301)

| Old URL | New URL |
|---|---|
| `/platform/google-vertex-ai` | `/platform/gemini-enterprise-agent-platform` |
| `/platform/google-vertex-ai/guide` | `/platform/gemini-enterprise-agent-platform/guide` |
| `/platform/google-vertex-ai/prompts` | `/platform/gemini-enterprise-agent-platform/prompts` |
| `/platform/google-vertex-ai/discussions` | `/platform/gemini-enterprise-agent-platform/discussions` |
| `/platform/google-imagen-3` | `/platform/nano-banana` |
| `/platform/google-imagen-3/guide` | `/platform/nano-banana/guide` |
| `/platform/google-imagen-3/prompts` | `/platform/nano-banana/prompts` |
| `/platform/google-imagen-3/discussions` | `/platform/nano-banana/discussions` |
| `/platform/text-generation-webui-oobabooga` | `/platform/textgen` |
| `/platform/text-generation-webui-oobabooga/guide` | `/platform/textgen/guide` |
| `/platform/text-generation-webui-oobabooga/prompts` | `/platform/textgen/prompts` |
| `/platform/text-generation-webui-oobabooga/discussions` | `/platform/textgen/discussions` |
| `/platform/notebooklm` | `/platform/gemini-notebook` |
| `/platform/notebooklm/guide` | `/platform/gemini-notebook/guide` |
| `/platform/notebooklm/prompts` | `/platform/gemini-notebook/prompts` |
| `/platform/notebooklm/discussions` | `/platform/gemini-notebook/discussions` |
| `/platform/clarifai/guide` | `/platform/clarifai` (the page stays reachable, noindexed) |
| `/platform/tabnine/guide` | `/platform/tabnine` (the page stays listed and indexed, as a "what happened" note) |

How the redirects are served:

- **next.config.ts:** the page rows come from `catalogRedirects()` as `/platform/<old>` and `/platform/<old>/:path*`, so any deeper path follows.
- **Data feed:** `/data/v1/tools/<old>.json` and `/data/v1/guides/<old>.json` 301 to the new file through the existing `PLATFORM_REDIRECTS` handling.
- **Markdown:** platform and guide pages 301 the same way.
- **MCP:** resolves old slugs to the new ones.
- **`/api/platforms/<old>`:** 404s, because old slugs are hidden. The API has never redirected.
- **Compare and alternatives:** no compare or alternatives page uses these slugs.
- **Sitemap, `/tutorials`, `llms.txt`, `llms-full.txt`:** all generated, so they pick up the new slugs once audit 15 has run.

## What audit 15 changes (not run)

`npx tsx scripts/update-catalog-audit-15.ts`. It is a dry run by default, writes only with `--apply` after a 5-second countdown, and needs both `--confirm-production` and `CONFIRM_PROD_HOST` for production. Its prod-guard section is byte-identical to audits 11 and 14, which a test checks. It is idempotent and never creates or deletes rows. Run it after audit 14.

1. **Slug renames:** google-vertex-ai → gemini-enterprise-agent-platform, google-imagen-3 → nano-banana, text-generation-webui-oobabooga → textgen, notebooklm → gemini-notebook. If both slugs exist, it refuses and exits.
2. **Guarded name/website.** Each field is written only while it holds the expected old value; a hand edit is logged as "differs" and left alone.
   - Gemini Enterprise Agent Platform: website `https://cloud.google.com/products/gemini-enterprise-agent-platform`.
   - Nano Banana: website `https://gemini.google/overview/image-generation/`.
   - TextGen: website `https://github.com/oobabooga/textgen`.
   - Gemini Notebook: nothing to write; audit 3 already set its name and website.
3. **Name references:** exact old names in the four ref columns are rewritten (Google Vertex AI, Google Imagen 3, Text Generation WebUI (oobabooga), NotebookLM), plus their suffixed variants such as "NotebookLM (free)".
4. **Clarifai:** nothing. Its slug, name, text and visibility stay; the hide lives in code. The only change on its row is the "Google Vertex AI" entry in its alternatives, renamed like every other row's.
5. **Row patches** (step 4). Text fields are written only where they differ, and costTier only while the row still has the expected old value.
   - **tabnine:** pricing claims removed. `currentPricing` becomes "No standalone plans or prices…", `freeTierFeatures` becomes "None: Tabnine is no longer sold as a standalone product", and `usageLimits` is cleared. `description` and `primaryUse` now say it is part of Tricentis.
   - **scite:** no free plan. Basic $12/mo and Pro $40/mo billed yearly, with 250 and 2,500 MCP credits a month (API access on Pro). Enterprise custom. A 7-day trial whose MCP credits "are not stated". costTier FREEMIUM → PAID.
   - **lindy-ai:** $50 of free credits for 7 days. Team from $49.99/mo per active user for 5,000 credits, tiers up to 1,750,000 credits for $9,999.50, top-ups $10 per 1,000. Enterprise custom. Monthly billing only. Replaces "$29.99 / 3,000 credits" and the retired Starter/Pro limits.
   - **activepieces:** Free is "1,000 credits a month, refreshing daily", per the pricing table.
   - **Canva is not patched.** Its row already matches the page (audits 10 and 11), and patching it again would make a re-run of those audits revert it. Only its fact file changed.
6. **"Tabnine" removed** (step 5) from `amazon-q-developer.directAlternatives`, `github-copilot.directAlternatives` and `github-copilot.budgetAlternativeTo`.

**Expected dry run**, computed against the pre-change test snapshot (the real DB may differ slightly):

- `rename ×4`
- `gemini-enterprise-agent-platform: name, website`, `nano-banana: name, website`, `textgen: name, website`
- 14 `refs …` lines
- `patch tabnine: primaryUse, description, currentPricing, freeTierFeatures, usageLimits`, `patch scite: currentPricing, freeTierFeatures, usageLimits, costTier`, `patch lindy-ai: currentPricing, freeTierFeatures, usageLimits`, `patch activepieces: currentPricing, freeTierFeatures, usageLimits`
- `unref amazon-q-developer: directAlternatives`, `unref github-copilot: directAlternatives, budgetAlternativeTo`
- `audit15: 4 slug renames, 3 rows / 6 field changes, 14 rows / 16 name references, 4 rows / 15 patched fields, 3 Tabnine refs removed (dry-run)`

A re-run after `--apply` reports 0.

```
npx tsx scripts/update-catalog-audit-15.ts            # Neon branch, dry run
npx tsx scripts/update-catalog-audit-15.ts --apply
$env:CONFIRM_PROD_HOST='ep-odd-mud-ajdk8f99'
npx tsx scripts/update-catalog-audit-15.ts --confirm-production
npx tsx scripts/update-catalog-audit-15.ts --confirm-production --apply
Remove-Item Env:CONFIRM_PROD_HOST
npm run cache:revalidate
```

## Vendor rewrites (official sources, 2026-10-29)

| Guide | Change | Source |
|---|---|---|
| chatgpt | Free has "Unlimited text chats" subject to abuse guardrails. Uploads, images, voice, data analysis and deep research have separate limits. Ads may appear on Free in some countries. Removed the "rolling cap / quiet downgrade" and "couple of images a day" claims. | chatgpt.com/pricing, help.openai.com free-tier FAQ (direct fetch) |
| tray-ai | Trial is 30 days and self-serve (work email; "No card, no call, no qualification form"). Plans are quote-only ("Sized to your needs", "Get a clear quote"). Usage-based in Tasks. Add-ons can be bought on Team; Enterprise includes HIPAA/SSO/regional hosting. 7-day log retention. Changed 10 passages: tagline, whatItIs, two beforeYouStart bullets, okayAt, two avoid entries, three pitfalls. | tray.ai/request-trial, tray.ai/pricing |
| llama-cpp | Official Llama desktop app ("tiny menu bar app" on Mac, "system tray app" on Windows, by the llama.cpp team and Hugging Face). Server default is `127.0.0.1:9931`, not 8080. Memory brackets re-quoted. The "no telemetry, no limits" quote replaced with the site's current "Free · Open source · Works offline". | llama.app, llama.app/docs/* |
| cursor | Acquisition closed: "Cursor has officially been acquired by SpaceX" (blog, 14 Aug 2026). Free/Plus/Premium/Super/Ultra share a weekly pool across Cursor and Grok. Plus is Grok models only. Third-party models cost API list price from Premium. Sold through X Subscription Corp. Privacy Mode wording now matches the FAQ. | cursor.com/pricing, /blog/joining-spacex, /docs, /terms-of-service |
| adobe-firefly | Indemnity is "for enterprise customers for content generated with Adobe Firefly". The licensed-training claim is scoped to Adobe's own models. Partner models are named (Nano Banana, GPT Image, FLUX, Runway, Luma, ElevenLabs). Free plan is "free daily generations". Removed the "paid plans indemnified" and free-tier watermark/commercial claims. | adobe.com/ai/overview/firefly/gen-ai-approach.html, adobe.com/products/firefly.html |
| wonder studio (Flow Studio) | New paragraph on the Canvas, 3D Editor, Fusion export and third-party models (Kling, MiniMax, Seedance, Veo, ElevenLabs, Claude/Gemini/GPT). New `features` fact. | help.wonderdynamics.com/release-notes |
| freepik-ai | Facts plan "Pro" → "Pro Starter" (prices unchanged at $110 / $82.50 annual). Guide token `{{price:freepik-ai:Pro}}`, which would have stopped resolving, is now `{{price:freepik-ai:Pro Starter}}`. | magnific.com/pricing |
| tabnine (retired) | Tricentis announced on July 30, 2026 that it acquired Tabnine and is building Tabnine's Enterprise Context Engine into "the Tricentis Agentic Quality Engineering Platform". tabnine.com, /pricing and the blog post all 301 to tricentis.com, and no standalone plans or prices are published. Existing customers keep support. The guide is unpublished and 301s to the platform page. The platform page is now a sourced "what happened" note (play-ht/sora-2 pattern) with no pricing table, and alternatives are GitHub Copilot, Cursor and Amazon Q Developer. See judgment call 10. | tricentis.com/news/tricentis-acquires-tabnine (direct fetch); tabnine.com/blog/a-new-chapter-for-tabnine (RA; it redirects, see Unverified items) |
| clarifai (hidden) | Shutdown confirmed. The notice says Clarifai shut down its platform and that its core team (led by Matthew Zeiler) joined Nebius. Nebius announced on May 12, 2026 that it licenses Clarifai's inference and compute orchestration technology and acquires its patent portfolio. It did not announce buying Clarifai itself, and the license excludes the legacy computer vision models. The July 13, 2026 final deprecation is attributed to our research. Lifecycle is now "discontinued". Still hidden, still no DB change. | nebius.com/newsroom (direct fetch) |
| scite | No free plan: removed the free "Connect" plan and its credits. Basic and Pro are billed yearly, each with a 7-day trial that auto-enrolls you. MCP credits are described as a paid-plan allowance (Pro's is far larger), and the guide says "The pricing page does not say how many MCP credits, if any, come with the trial." API access is on Pro. New fact file: `plans` and `freeTier: available false`. | scite.ai/pricing |
| canva-ai | Free has a small monthly AI allowance (facts: "up to 20 AI uses"). Pro is for one person (10x). Business covers individuals and teams (20x), and there is no Teams plan for new sign-ups. All AI tools share one allowance. AI Pass is a monthly add-on for Pro and Business (40x Pro, 20x Business), and only Business lists AI top-ups. Prices exclude tax. Pro yearly is settled at **$144** (embedded plan data: 14400 / 1800 cents), not $180. Removed "don't top up a la carte" and the stale "Adobe Firefly's paid indemnity" comparison. | canva.com/pricing (US), canva.com/help/ai-pass |
| lindy-ai (facts only) | Team from $49.99/mo per active user for 5,000 credits, tiers up to 1,750,000 credits for $9,999.50, top-ups $10 per 1,000 credits, Enterprise custom, monthly billing only. The stale $29.99 in the page metadata is ignored (noted in a code comment only). The guide already described the shape without numbers, so it is unchanged. | lindy.ai/pricing |
| activepieces | Free credits are now described as the pricing table states them: "1,000 a month" with a "Daily" reset. Fixed the guide's own contradiction ("a small team of users" vs "the free plan is one person"); the table says Free allows "Up to 5" users. See judgment call 11. | activepieces.com/pricing |
| hedra | See judgment call 1. The guide now explains that the pricing page's pay-per-output rates are for the developer API. New `apiPricing` fact. Plans note scoped to Studio. | hedra.com/pricing, hedra.com/docs |

Renamed guides: each title is now "X (formerly Y)", with the old-name passages rewritten.

- **Gemini Notebook:** every NotebookLM mention swept except the "formerly" lines. Free limits are now Google's: 100 notebooks, 50 sources, compute-based limits that refresh every 5 hours up to a weekly cap. AI Plus gives 2× and AI Pro 4×.
- **Nano Banana:** the guide quotes "Imagen models are shut down" and is written to mechanism, not version numbers.

`lastReviewedAt` is 2026-10-29 on every touched guide.

## Tests

- `npx tsc --noEmit`: pass.
- `npm run lint`: pass (0 errors, the same 2 pre-existing warnings).
- `npm test`: pass, 1026 tests, 0 fail. The baseline before this branch was 1002. `audit-15.test.ts` covers the renames, row patches, the Tabnine retirement and the Clarifai notice. The per-guide generated tests for clarifai and tabnine went away with the retired guides.
- `npm run audit:tutorials`: pass, 196 pages clean. Clarifai and Tabnine are now outside the registry, so 198 − 2.
- Golden top-5 regenerated. A15 now ranks scite first, since it has verified facts. G22 and G23 drop tabnine (discontinued, so no longer recommended) and gain bolt-new and replit-agent.

## Unverified items

- **Hedra:** Studio tier names (Basic/Pro/Ultra/Teams) and whether a free plan exists. The Studio pricing tab renders only in a browser, so the guide no longer names tiers or claims a free plan. The facts `plans` still list them, as of 10-14.
- **Flow Studio:** free-tier numbers and plan names. The Autodesk page returns 403, so these are unchanged from 09-12.
- **Firefly:** whether indemnity explicitly excludes beta features and partner models. The helpx partner-model pages return 403. The guide says only what Adobe's approach page says.
- **Cursor:** Privacy Mode default by plan, and free-plan limits beyond "limited agent/chat requests".
- **Nano Banana:** Google's pages disagree on the current default (help page says "Nano Banana 2", overview page says "Nano Banana 2.1"). The guide avoids version numbers.
- **Not re-read:** passages these edits didn't touch, for example the Vertex data-governance quotes, ChatGPT's training default, Gemini Notebook's "no training on uploads", the Tray MSA date, and llama.cpp's licence lines. Their dates were bumped anyway (judgment call 8).
- **Audit 15 against the real DB:** the expected output was computed on the test snapshot, not the database.
- **Tabnine blog post:** "existing customers keep support" is RA-verified, and trade reports repeat it. But `tabnine.com/blog/a-new-chapter-for-tabnine/` now 301s to tricentis.com/learn, and the Internet Archive was offline, so it could not be re-read here. It is listed as an additional source on the notice. The Tricentis release itself does not mention existing customers.
- **Clarifai's July 13, 2026 final-deprecation date:** RA-verified, but all of Clarifai's hosts are down, so it could not be re-read. Some secondary sources say July 17. The notice attributes the date to "our research", not to Clarifai.
- **Not re-read on the follow-up guides:** Scite's coverage numbers, partner list, privacy and terms passages, and "Pro adds bigger collections, patent, clinical trial and grant data". Canva's training-default and Canva Shield passages. Both guides' `lastReviewedAt` was bumped to 2026-10-29 anyway (as in judgment call 8). Canva's "Teams/Enterprise content is never used for training" is left as written and may need re-wording for Business.

## Judgment calls

1. **Hedra was not rewritten as "no tiers."** The pricing page's "No subscription, no seats, no minimum" sits under its **API** tab. The same page's metadata says "Hedra Studio plans from $20/month", its FAQ describes monthly subscription credits, and Hedra's docs say the API wallet "is separate from Studio subscription credits". The audit's reading contradicts the vendor page for Studio, so the guide explains the split instead.
2. **Clarifai is hidden, now `lifecycle: "discontinued"`.** The first pass kept it "active" because no shutdown notice could be found. The follow-up confirmed the shutdown (RA, plus Nebius's release), so the notice now reads "What happened to Clarifai?" and keeps the hide reversible. The guide is moved to `src/data/tutorials/retired/` rather than deleted (Karlo's was deleted). No DB part is needed for the hide.
3. **Slugs:** `gemini-enterprise-agent-platform`, `nano-banana`, `textgen`, `gemini-notebook`. Short, versionless, matching the vendor names.
4. **Vertex naming:** Google's docs say "Gemini Enterprise Agent Platform" and the product page says "Gemini platform". That isn't a contradiction, so the rename went ahead, and the guide mentions both.
5. **Test snapshot:** a full rebuild needs an export that isn't committed, so audit 15 was applied in place by a script that mirrors builder step 7. The golden top-5 was regenerated. The shifts are the slug swaps plus slug-alphabetical tie-breaks: A14 and G60 now rank gemini-notebook first, and in G50 gpt-image wins the fifth-place tie over nano-banana.
6. **Logo manifest:** `public/images/platforms/catalog-logos.json` is left alone, following the Le Chat precedent. Only the app's logo map gained the new keys.
7. **Parenthetical refs** such as "NotebookLM (free)" never linked anything, but audit 15 renames them anyway so no stale names are left.
8. **Dates:** `lastReviewedAt` is bumped on every touched guide, as instructed, even where untouched passages weren't re-read (see Unverified items).
9. **Tray's published price:** the FAQ's "Starts at $50 a month" (Helix Builder Edition) is described without a number. The price guard forbids typed prices, and Tray has no facts file to carry a token.
10. **Tabnine is `lifecycle: "discontinued"`, not "acquired".** The play-ht/sora-2 "what happened" pattern is keyed on "discontinued". That gives the "What happened to Tabnine?" heading, hides the pricing table and getting-started link, shows a "Discontinued" card badge, and keeps Tabnine out of recommendations. Standalone Tabnine can't be bought, so this matches what a new reader can do. The notice still says existing customers are supported. The page stays listed and indexed (unlike Clarifai), so people searching for Tabnine land on the explanation. To soften this later, set the lifecycle back to "acquired"; audit 15 has already removed the row's prices.
11. **Activepieces: the vendor page is inconsistent.** The comparison table says Free is "1,000 a month" with a "Daily" reset, and "Waits for tomorrow" when you go over. One FAQ answer says "a fresh 1,000 credits every month… wait until the next month"; another says runs wait "until credits refresh the next day". Catalog text and the guide follow the table, as instructed, and the guide tells readers the FAQ disagrees.
12. **Scite gets a fact file**, not only a row patch, so the guide header, cards and MCP show verified prices with a source. The guide still types no prices or credit numbers (price guard).
13. **Canva's free summary says "up to 20 AI uses", without "Standard or Premium".** The label check reads "Premium" as a plan name that isn't in `plans` and flags it. The plan row's limits keep the vendor's "Standard or Premium" wording.
14. **Clarifai refs in scale-ai's alternatives** ("Clarifai (ML platform)", "Clarifai (free tier)") are left alone, so the hide stays code-only and reversible. A later audit can drop them if the shutdown is treated as final.

## Not touched

Audit 10 was not re-run. The Lindy guide text (already matched the page in shape) and Canva's DB row (already correct) were left as they were.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
