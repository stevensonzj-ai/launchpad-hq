# 2026-11-19 — Claude — quiz scorer word match (START-HERE 4.40, 4.41)

Branch `fix/quiz-scorer-word-match`, from `origin/main` at 4fbeec4c. Draft PR (number in the PR itself).

## Decided (Zach)
- Goal keywords match as words: a keyword of 3 characters or fewer must be a whole word; a longer one must start a word. Case-insensitive.
- Each chosen goal adds 10 once, not 10 per keyword.
- `ides` added to the coding keywords (otherwise jetbrains-ai lost coding). `data` stays in research.
- Equal-score tie-break for non-default tools: primary category first, then Discover Popular position, then name.
- Primary categories, per goal: content_creation = text-conversational-ai + research-academic-tools; coding = ai-coding-development; research = research-academic-tools; image_generation = image-generation-editing; video = video-creation-editing; audio = voice-speech + music-generation; business = meetings-notes + ai-plugins-business-software + sales-marketing-seo-ai; automation = workflow-automation; education = education-learning-ai; data_analysis = research-academic-tools. With runtime=local, local-open-source-ai also counts.
- `rankScoredPlatforms` left as is (no production caller; sponsor test pins it).
- Cards no longer show the "Matches goal", "Beginner-friendly" or "Free tier" chips; the API still returns them.

## Changed
- `src/lib/recommendations-score.ts`: `keywordMatches`, goal counts once, `ides`.
- `src/data/quiz-defaults.ts`: `PRIMARY_GOAL_CATEGORIES`.
- `src/lib/quiz-ranking.ts`: `primaryCategories`, `compareTied`, header comment.
- `src/components/platforms/platform-card.tsx`: `visibleMatchReasons` chip filter.
- `src/lib/public-data/content.ts`: the quiz.json tie note only.
- Tests: `recommendations-score.test.ts`, `quiz-ranking.test.ts` (coding + video / local golden re-baselined: wonder-dynamics-wonder-studio out, kling-ai in at 12th), `platform-card.test.ts` (two chip tests now use mobile/offline chips).
- `START-HERE.md`: 4.40 fixed in part, 4.41 fixed, file-map row for `src/app/(app)/quiz/results/`.

## Modelling
Done read-only against production's `/data/v1/catalog.json` (222 tools) with throwaway scripts, not committed. Default picks unchanged for every goal, experience level and budget. Coding / beginner / free / local is now only ollama, lm-studio, jan (ComfyUI gone).

## Still open
- Structured-signal ordering (outbound clicks) is still not built (4.40 is only fixed in part).
- In coding, chatgpt and claude still sit above aider, cline and cursor: those score lower because of the difficulty penalty, not a tie.
- No local `npm run build` (4.39); the Vercel preview build is the gate.

## For the catalog lane
- grammarly sits in research-academic-tools, so it ranks 4th for beginner research.
- reducto and upstage-solar (developer document APIs) are rated BEGINNER.
- wonder-dynamics-wonder-studio is marked renamed and ranks 4th for video (FREE, +10).
- There is no data-analysis category, and julius-ai, the one data tool, is rated INTERMEDIATE, so it scores low for beginners.
- Dead keywords matching nothing in the catalog: `automate`, `productivity`, `dashboard`.
