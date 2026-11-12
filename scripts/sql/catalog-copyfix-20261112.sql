-- Catalog copy fix 2026-11-12 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables.
-- chatgpt: replace primaryUse and upgradeTriggers so neither field mentions Sora or GPT-4o.
-- The description column is left unchanged.
-- claude: set difficultyLevel to BEGINNER. No other column on that row.
-- Approved by Zach on 2026-11-12 at 1:22 PM CT.
-- Safe to rerun: each WHERE is false once the new value is stored, so a second run changes 0 rows.

UPDATE platforms SET
  "primaryUse" = $cf$Conversational AI assistant, writing and content generation, image creation$cf$,
  "updatedAt" = now()
WHERE slug = $cf$chatgpt$cf$
  AND (
    "primaryUse" = $cf$Conversational AI assistant, content generation, image/video via GPT Image 1.5 and Sora 2$cf$
    OR "primaryUse" ILIKE $cf$%sora%$cf$
    OR "primaryUse" ILIKE $cf$%gpt-4o%$cf$
  );

UPDATE platforms SET
  "upgradeTriggers" = $cf$Hitting free-plan message limits; needing advanced voice; deep research; custom GPTs; more image generation$cf$,
  "updatedAt" = now()
WHERE slug = $cf$chatgpt$cf$
  AND (
    "upgradeTriggers" = $cf$Hitting GPT-4o rate limits; needing Sora/advanced voice; deep research; custom GPTs; higher image gen$cf$
    OR "upgradeTriggers" ILIKE $cf$%sora%$cf$
    OR "upgradeTriggers" ILIKE $cf$%gpt-4o%$cf$
  );

UPDATE platforms SET
  "difficultyLevel" = $cf$BEGINNER$cf$::"Difficulty",
  "updatedAt" = now()
WHERE slug = $cf$claude$cf$
  AND "difficultyLevel" <> $cf$BEGINNER$cf$::"Difficulty";
