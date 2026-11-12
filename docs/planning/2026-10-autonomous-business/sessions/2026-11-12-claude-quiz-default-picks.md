# 2026-11-12 · Claude · Quiz default picks (Package 1, Prompt B)

## Decided
- Default picks per goal and experience level, using the lists approved in `2026-11-12-cowork-prompts-packages-1-2.md` (Prompt B) plus Zach's same-day corrections. Each has one sourced "why" sentence (checked 2026-11-12).
- Category guard as in the PR #169 table:
  - `ai-apis-developer-services` is allowed for coding at intermediate/advanced only.
  - Healthcare, legal, finance/real estate and career are never allowed.
  - International & Regional AI is excluded from writing and research (mix of enterprise/API products). Cost: DeepL and the regional assistants don't appear there.
- runtime=local:
  - A goal that has local picks shows only local-open-source-ai tools. Coding, writing, research, business, education and data analysis lead with Ollama, LM Studio, Jan; image generation leads with ComfyUI.
  - Video, audio and automation show the approved notice, then their normal cloud defaults.
- The "% match" badge is removed everywhere: the score is a raw sum, not a percentage.
- text-conversational-ai stays allowed for coding (Zach). The optional `runtime` field stays in `RecommendationInput`; `scorePlatform` and its weights are unchanged.

## Changed
- **PR #169 squash-merged** as `10713146f2c860bc6e49e9e477f70fd26b2f79c8`, 18 files. The branch's last commit was `25b3f799`. main had not moved since the branch point `da522898`, the PR had no conflicts, and the remote branch was deleted.
- Branch history: `cfc1e03b` defaults and guard → `0df7aaa6` list corrections → `39e711f7` local runtime for coding, local-only results, `/quiz/results` moved into the `(app)` group (URL unchanged), heading fix → `25b3f799` cloud defaults under the notice.
- Tests: the final run was 115 files, one at a time, 1,523 passed, 0 failed. CI `npm test` and the Vercel preview were green on every push.
- The local Windows `npm run build` crashed in "Collecting page data" (exit 3221226505) and was not retried; Vercel was the build gate.

## Production (2026-11-12)
- Deployment **`dpl_3pfMuhGqyP49twmerDaPZNzuWUUY`**: READY, target production, SHA `10713146f2c8…` (matches main). Aliased to www.launchpadhq.io and launchpadhq.io, `aliasError: null`.
- Smoke checks, read-only, all as expected:
  - `/quiz` 200, `/quiz/results` 200.
  - Writing / beginner / free / no runtime: chatgpt, claude, gemini, grammarly, grok. No hubspot-ai, doximity-gpt, invideo-ai or heygen in the top five.
  - Video / beginner / free / local: capcut, veed, heygen, wonder-dynamics-wonder-studio, runway, and the notice was returned.
  - Coding / beginner / free / local: ollama, lm-studio, jan, comfyui. Local-open-source-ai only, no notice.
  - `/data/v1/quiz.json` returned 200, and its note describes default picks and the category guard.
  - `/mcp` tools/list returned 200 with compare, find_free_alternatives, get_pricing_facts, search_tools.
- Two observations, not failures:
  - ComfyUI ranks fourth for coding/local because "ide" matches "v**ide**o" (follow-up 6).
  - ComfyUI ranks twelfth for video/local, under a notice that says the results are cloud tools (follow-up 8).

## Open / for Zach
- Review the docs-only housekeeping PR (START-HERE ledger 4.35–4.43 and this note). Not merged.
- Several sources were confirmed only from search snippets: Quizlet, QuillBot, Canva, Leonardo, Midjourney, Make, Julius.
- Next: Prompt C (Discover).

## Follow-ups (not in #169; recorded in START-HERE § 4 so agents find them)
1. Catalog recheck: invideo-ai (free plan), julius-ai (what the free plan covers), notion-ai and khan-academy-khanmigo (the free-tier flag is true only for a trial or for teachers). → 4.36
2. `catalog-snapshot.json` is behind production; e.g. opus-clip is gaming-creative-ai there and video-creation-editing live. → 4.37
3. 12 of the 19 API platforms are marked BEGINNER. → 4.38
4. The local Windows build crashes in "Collecting page data" (exit 3221226505). → 4.39
5. Below the default picks, the scorer still ranks by keyword count. → 4.40
6. Keyword matching is by substring ("ide" in "guide" and "video"). → 4.41
7. The unlayered `globals.css` body background rule turns pages white for light-mode visitors. → 4.42
8. New: with runtime=local, video/audio/automation can list a local tool under the "cloud tools" notice. Drop the local category for those goals or reword. → 4.43
