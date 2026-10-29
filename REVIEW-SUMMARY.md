# Guide PR D: renames, Clarifai hide, vendor rewrites, audit 15

Branch `guide-pr-d-1029`, based on `origin/main` 4c0ba27. Source: the Oct 29 guide audit (`GUIDE-AUDIT.md`, `audit-results.json`, `REVIEW-SUMMARY.md` in the audit worktree). Every fact below comes from the vendor's own pages, fetched on 2026-10-29. X posts were not used. No database command was run, no dev server was started, and no `.env*` file was read or touched.

> **Deploy and run audit 15 together.** Like audit 6 (Le Chat → Vibe), the four renames move DB rows to new slugs. Between the deploy and the audit run, the old slugs are hidden and 301 to new slugs that have no row yet, so those four platform pages and guides return 404. Run audit 15 on a Neon branch first, then on production straight after the deploy.

## Files changed (40)

- **Renamed guides (git mv + edits):**
  - `src/data/tutorials/gemini-enterprise-agent-platform-getting-started.ts` (was `google-vertex-ai-…`)
  - `nano-banana-getting-started.ts` (was `google-imagen-3-…`)
  - `textgen-getting-started.ts` (was `text-generation-webui-oobabooga-…`)
  - `gemini-notebook-getting-started.ts` (was `notebooklm-…`)
  - `retired/clarifai-getting-started.ts` (moved out of the registry, text kept)
- **Rewritten guides:** `chatgpt`, `tray-ai`, `llama-cpp`, `cursor`, `adobe-firefly`, `hedra`, `freepik-ai`, `wonder-dynamics-wonder-studio` (`…-getting-started.ts`).
- **Registry:** `src/data/tutorials/index.ts`.
- **Facts:**
  - New: `gemini-enterprise-agent-platform.ts`, `nano-banana.ts`, `textgen.ts`, `clarifai.ts`.
  - `gemini-notebook.ts` (moved from `notebooklm.ts`).
  - Edited: `freepik-ai.ts`, `hedra.ts`, `wonder-dynamics-wonder-studio.ts`, `registry.ts`.
- **Redirects and visibility:** `src/lib/catalog-redirects.ts` (`PLATFORM_REDIRECTS` +4, `RETIRED_GUIDE_SLUGS` + clarifai).
- **MCP and search data:**
  - `src/lib/mcp/names.ts`: aliases imagen, googleimagen, notebooklm, vertexai, googlevertexai, textgenerationwebui, oobabooga.
  - `src/data/task-tags.ts`, `src/lib/platform-logo-assets.json` (new keys use the existing logo files).
  - `src/data/workflows/workflows.ts` (research workflow: NotebookLM → Gemini Notebook).
  - `src/lib/mcp/stress-replay.ts`.
- **Audit 15:** `src/data/catalog-audits/audit-15.ts`, `audit-15.test.ts`, `scripts/update-catalog-audit-15.ts`, and `package.json` (adds `db:update-catalog-audit-15` and adds the test to `npm test`).
- **Test snapshot:**
  - `src/lib/mcp/catalog-snapshot.json` has audit 15 applied.
  - `scripts/mcp-snapshot/build-catalog-snapshot.ts` gets step 7 (audit 15), and its audit-3 replay now follows redirects.
  - New one-off script `scripts/mcp-snapshot/apply-audit-15-to-snapshot.ts`.
  - `src/lib/mcp/golden-top5.json` was regenerated.
  - Updated tests: `catalog-snapshot.test.ts`, `catalog-visibility.test.ts`.
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

**Expected dry run**, computed against the pre-change test snapshot (the real DB may differ slightly):

- `rename ×4`
- `gemini-enterprise-agent-platform: name, website`, `nano-banana: name, website`, `textgen: name, website`
- 14 `refs …` lines
- `audit15: 4 slug renames, 3 rows / 6 field changes, 14 rows / 16 name references (dry-run)`

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
| hedra | See judgment call 1. The guide now explains that the pricing page's pay-per-output rates are for the developer API. New `apiPricing` fact. Plans note scoped to Studio. | hedra.com/pricing, hedra.com/docs |

Renamed guides: each title is now "X (formerly Y)", with the old-name passages rewritten.

- **Gemini Notebook:** every NotebookLM mention swept except the "formerly" lines. Free limits are now Google's: 100 notebooks, 50 sources, compute-based limits that refresh every 5 hours up to a weekly cap. AI Plus gives 2× and AI Pro 4×.
- **Nano Banana:** the guide quotes "Imagen models are shut down" and is written to mechanism, not version numbers.

`lastReviewedAt` is 2026-10-29 on every touched guide.

## Tests

- `npx tsc --noEmit`: pass.
- `npm run lint`: pass (0 errors, the same 2 pre-existing warnings).
- `npm test`: pass, 1018 tests, 0 fail. The baseline before this branch was 1002. `audit-15.test.ts` adds 17, and one per-guide generated test (clarifai) went away with the retired guide.
- `npm run audit:tutorials`: pass, 197 pages clean. Clarifai is now outside the registry, so 198 − 1.

## Unverified items

- **Hedra:** Studio tier names (Basic/Pro/Ultra/Teams) and whether a free plan exists. The Studio pricing tab renders only in a browser, so the guide no longer names tiers or claims a free plan. The facts `plans` still list them, as of 10-14.
- **Flow Studio:** free-tier numbers and plan names. The Autodesk page returns 403, so these are unchanged from 09-12.
- **Firefly:** whether indemnity explicitly excludes beta features and partner models. The helpx partner-model pages return 403. The guide says only what Adobe's approach page says.
- **Cursor:** Privacy Mode default by plan, and free-plan limits beyond "limited agent/chat requests".
- **Nano Banana:** Google's pages disagree on the current default (help page says "Nano Banana 2", overview page says "Nano Banana 2.1"). The guide avoids version numbers.
- **Not re-read:** passages these edits didn't touch, for example the Vertex data-governance quotes, ChatGPT's training default, Gemini Notebook's "no training on uploads", the Tray MSA date, and llama.cpp's licence lines. Their dates were bumped anyway (judgment call 8).
- **Audit 15 against the real DB:** the expected output was computed on the test snapshot, not the database.

## Judgment calls

1. **Hedra was not rewritten as "no tiers."** The pricing page's "No subscription, no seats, no minimum" sits under its **API** tab. The same page's metadata says "Hedra Studio plans from $20/month", its FAQ describes monthly subscription credits, and Hedra's docs say the API wallet "is separate from Studio subscription credits". The audit's reading contradicts the vendor page for Studio, so the guide explains the split instead.
2. **Clarifai is hidden, `lifecycle: "active"`.** No shutdown was announced, so the notice reads "Clarifai: status update" and states only what we observed. The guide is moved to `src/data/tutorials/retired/` rather than deleted (Karlo's was deleted). No DB part is needed for the hide.
3. **Slugs:** `gemini-enterprise-agent-platform`, `nano-banana`, `textgen`, `gemini-notebook`. Short, versionless, matching the vendor names.
4. **Vertex naming:** Google's docs say "Gemini Enterprise Agent Platform" and the product page says "Gemini platform". That isn't a contradiction, so the rename went ahead, and the guide mentions both.
5. **Test snapshot:** a full rebuild needs an export that isn't committed, so audit 15 was applied in place by a script that mirrors builder step 7. The golden top-5 was regenerated. The shifts are the slug swaps plus slug-alphabetical tie-breaks: A14 and G60 now rank gemini-notebook first, and in G50 gpt-image wins the fifth-place tie over nano-banana.
6. **Logo manifest:** `public/images/platforms/catalog-logos.json` is left alone, following the Le Chat precedent. Only the app's logo map gained the new keys.
7. **Parenthetical refs** such as "NotebookLM (free)" never linked anything, but audit 15 renames them anyway so no stale names are left.
8. **Dates:** `lastReviewedAt` is bumped on every touched guide, as instructed, even where untouched passages weren't re-read (see Unverified items).
9. **Tray's published price:** the FAQ's "Starts at $50 a month" (Helix Builder Edition) is described without a number. The price guard forbids typed prices, and Tray has no facts file to carry a token.

## Not touched

Tabnine, Scite, Lindy, Canva, Activepieces. Audit 10 was not re-run.
