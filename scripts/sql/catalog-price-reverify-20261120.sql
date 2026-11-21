-- Catalog price re-verification 2026-11-20 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. No inserts. No new slugs. No snapshot or branch statements.
-- The workflow self-snapshots. Do not run this from an agent against production.
-- Sources re-read 2026-11-20. Statements below are only for stored text that changed.
-- Checked-at bumps with the same price are fact files only and are not in this file.
-- Each WHERE matches one stored wording (production, or the older test-branch text)
-- and does not match the replacement, so a second run updates 0 rows.
-- Krea prices match the fact file: Basic $9/$5, Pro $42/$21, Max $140/$42,
-- Business $200/$96, monthly and yearly. The lower figure is the yearly price per month.

UPDATE platforms SET
  "currentPricing" = $pr$Free 100 units/day. Basic $9/mo or $5/mo billed yearly (5,000 units). Pro $42/mo or $21/mo billed yearly ($252/year, 20,000 units). Max $140/mo or $42/mo billed yearly ($504/year, 60,000 units). Business $200/mo or $96/mo billed yearly (80,000 units). The lower figure is the yearly price per month (as of 2026-11-20)$pr$,
  "updatedAt" = now()
WHERE slug = $pr$krea$pr$
  AND "currentPricing" = $pr$Free 100 units/day; Basic $9/mo (5,000 units), Pro $35/mo (20,000), Max $105/mo (60,000), Business $200/mo (80,000 units, up to 50 members); billed yearly: Basic $5.25/mo, Pro $21/mo, Max $63/mo, Business $160/mo; Enterprise custom (as of 2026-10-30)$pr$;

UPDATE platforms SET
  "currentPricing" = $pr$Free 100 units/day. Basic $9/mo or $5/mo billed yearly (5,000 units). Pro $42/mo or $21/mo billed yearly ($252/year, 20,000 units). Max $140/mo or $42/mo billed yearly ($504/year, 60,000 units). Business $200/mo or $96/mo billed yearly (80,000 units). The lower figure is the yearly price per month (as of 2026-11-20)$pr$,
  "updatedAt" = now()
WHERE slug = $pr$krea$pr$
  AND "currentPricing" = $pr$Free 100 units/day; paid ~$9/$5, $35/$21, $105/$63, $200/$160 per month (list/discounted; billing basis unverified)$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$Basic, Pro, Max and Business cost $9, $35, $105 and $200 a month, or $5.25, $21, $63 and $160 a month billed yearly (as of 2026-10-30).$pr$,
    $pr$Basic is $9 a month or $5 a month billed yearly (5,000 units), Pro is $42 a month or $21 a month billed yearly (20,000 units), Max is $140 a month or $42 a month billed yearly (60,000 units), and Business is $200 a month or $96 a month billed yearly (80,000 units). The lower figure is the yearly price per month (as of 2026-11-20).$pr$),
  "updatedAt" = now()
WHERE slug = $pr$krea$pr$
  AND description LIKE $pr$%$5.25, $21, $63 and $160 a month billed yearly (as of 2026-10-30).%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$paid list/discounted monthly prices shown as $9/$5, $35/$21, $105/$63, $200/$160. The billing basis behind the two numbers is unverified.$pr$,
    $pr$paid prices, re-read 2026-11-20: Basic $9/mo or $5/mo billed yearly (5,000 units); Pro $42/mo or $21/mo billed yearly ($252/year, 20,000 units); Max $140/mo or $42/mo billed yearly ($504/year, 60,000 units); Business $200/mo or $96/mo billed yearly (80,000 units). The lower figure is the yearly price per month.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$krea$pr$
  AND description LIKE $pr$%$35/$21, $105/$63, $200/$160%$pr$;

-- Production Gemini description still has the 2026-11-12 replace, which left
-- "then $4 and $20 after the introductory period, which runs through 2026-11-30,
-- then $4 per 1M...". The older test text still says the intro has no end date,
-- or it has the shorter "through 2026-11-30, then $4 and $20" sentence.
UPDATE platforms SET
  description = replace(description,
    $pr$API pricing starts at an introductory $2 per 1M input tokens and $10 per 1M output tokens, then $4 and $20 after the introductory period, which runs through 2026-11-30, then $4 per 1M input tokens and $20 per 1M output tokens.$pr$,
    $pr$API pricing is an introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 per 1M input tokens and $20 per 1M output tokens.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$gemini$pr$
  AND description LIKE $pr$%then $4 and $20 after the introductory period, which runs through 2026-11-30, then $4 per 1M input tokens and $20 per 1M output tokens.%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$API pricing starts at an introductory $2 per 1M input tokens and $10 per 1M output tokens, then $4 and $20 after the introductory period, which has no stated end date (as of 2026-10-29).$pr$,
    $pr$API pricing is an introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 per 1M input tokens and $20 per 1M output tokens.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$gemini$pr$
  AND description LIKE $pr$%which has no stated end date (as of 2026-10-29).%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$at an introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 and $20.$pr$,
    $pr$at an introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 per 1M input tokens and $20 per 1M output tokens.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$gemini$pr$
  AND description LIKE $pr$%introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 and $20.%$pr$;

-- Production already has the 2026-11-12 preview note and the 2026-11-16
-- production-rate note. Replace those sentences. Do not append another note.
UPDATE platforms SET
  description = replace(description,
    $pr$The preview runs from 10:00 on 2026-11-11 to 24:00 on 2026-11-25 (UTC+8), and the page says the model is retired after the preview ends.$pr$,
    $pr$The preview ran from 10:00 on 2026-11-11 and ends at 24:00 on 2026-11-25 (UTC+8), and the preview page says the model is retired after that window.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$qwen$pr$
  AND description LIKE $pr$%The preview runs from 10:00 on 2026-11-11 to 24:00 on 2026-11-25 (UTC+8), and the page says the model is retired after the preview ends.%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$Qwen4-Max-Preview stays Token Plan only until 24:00 on 2026-11-25 (UTC+8), when that page says the preview is retired.$pr$,
    $pr$Qwen4-Max-Preview is Token Plan only. It ran from 10:00 on 2026-11-11 and ends at 24:00 on 2026-11-25 (UTC+8), then the preview page says it is retired.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$qwen$pr$
  AND description LIKE $pr$%Qwen4-Max-Preview stays Token Plan only until 24:00 on 2026-11-25 (UTC+8), when that page says the preview is retired.%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$The Singapore free quota is 1 million tokens, valid for 90 days from the later of Model Studio activation, model release, or application approval.$pr$,
    $pr$The Singapore free quota is typically 1,000,000 tokens for 90 days from account activation or from the model release date.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$qwen$pr$
  AND description LIKE $pr$%valid for 90 days from the later of Model Studio activation, model release, or application approval%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$For launch week it offers 50% off the standard price for image generation at 4K and above. The post does not give a calendar end date or a dollar price.$pr$,
    $pr$The launch-week discount is no longer the pricing-page wording. MiniMax-H3-Image standard rates are $2.30 per 1M input text tokens, $1.50 per 1M input image tokens, and $3.80 per 1M output image tokens. Highspeed is $2.30, $3.00, and $7.60. The pricing page also shows a limited-time 50% off when the delivered image has at least 16,600,000 pixels, and it does not state an end date (re-read 2026-11-20).$pr$),
  "updatedAt" = now()
WHERE slug = $pr$minimax$pr$
  AND description LIKE $pr$%For launch week it offers 50% off the standard price%$pr$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $pr$$pr$) = $pr$$pr$ THEN $pr$Note (2026-11-20): MiniMax-H3-Image standard rates are $2.30 per 1M input text tokens, $1.50 per 1M input image tokens, and $3.80 per 1M output image tokens. Highspeed is $2.30, $3.00, and $7.60. The pricing page also shows a limited-time 50% off the total request cost when the delivered image has at least 16,600,000 pixels, and it does not state an end date. The 2026-11-11 launch post's launch-week discount is not the wording on the pricing page.$pr$
  ELSE description || $pr$ Note (2026-11-20): MiniMax-H3-Image standard rates are $2.30 per 1M input text tokens, $1.50 per 1M input image tokens, and $3.80 per 1M output image tokens. Highspeed is $2.30, $3.00, and $7.60. The pricing page also shows a limited-time 50% off the total request cost when the delivered image has at least 16,600,000 pixels, and it does not state an end date. The 2026-11-11 launch post's launch-week discount is not the wording on the pricing page.$pr$
END, "updatedAt" = now()
WHERE slug = $pr$minimax$pr$
  AND COALESCE(description, $pr$$pr$) NOT LIKE $pr$%MiniMax-H3-Image standard rates are $2.30%$pr$;

-- Windsurf Teams is $80/mo for up to 100 users. The $40 per-seat line is not on the pricing page.
-- currentPricing is the catalog snapshot string. The description sentence is the Plans line
-- written by catalog-xwatch-20261105.sql. Neither replacement contains the old Teams clause.
UPDATE platforms SET
  "currentPricing" = $pr$Free $0; Pro $20/mo; Max $200/mo; Teams $80/mo for up to 100 users; Enterprise custom (as of 2026-11-20)$pr$,
  "updatedAt" = now()
WHERE slug = $pr$windsurf$pr$
  AND "currentPricing" = $pr$Free $0; Pro $20/mo; Max $200/mo; Teams $80/mo team plan + $40/mo per full seat; Enterprise custom (as of 2026-10-30)$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$Plans: Free $0; Pro $20/mo; Max $200/mo; Teams $80/mo team plan + $40/mo per full seat; Enterprise custom (as of 2026-10-30).$pr$,
    $pr$Plans: Free $0; Pro $20/mo; Max $200/mo; Teams $80/mo for up to 100 users; Enterprise custom (as of 2026-11-20).$pr$),
  "updatedAt" = now()
WHERE slug = $pr$windsurf$pr$
  AND description LIKE $pr$%Plans: Free $0; Pro $20/mo; Max $200/mo; Teams $80/mo team plan + $40/mo per full seat; Enterprise custom (as of 2026-10-30).%$pr$;

-- Hugging Face Enterprise is $500/user/mo. Equality, not a substring match: "$500" contains "$50".
UPDATE platforms SET
  "currentPricing" = $pr$Free; PRO $9/mo; Team $20/user/mo; Enterprise $500/user/mo; compute (Spaces hardware, Inference Endpoints) billed by usage (as of 2026-11-20)$pr$,
  "updatedAt" = now()
WHERE slug = $pr$hugging-face$pr$
  AND "currentPricing" = $pr$Free; PRO $9/mo; Team $20/user/mo; Enterprise $50/user/mo; compute (Spaces hardware, Inference Endpoints) billed by usage (as of 2026-10-29)$pr$;
