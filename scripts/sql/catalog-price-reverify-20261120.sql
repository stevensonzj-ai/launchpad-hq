-- Catalog price re-verification 2026-11-20 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. No inserts. No new slugs. No snapshot or branch statements.
-- The workflow self-snapshots. Do not run this from an agent against production.
-- Sources re-read 2026-11-20. Statements below are only for stored text that changed.
-- Checked-at bumps with the same price are fact files only and are not in this file.

UPDATE platforms SET
  "currentPricing" = $pr$Free 100 units/day. Basic $9/mo or $5/mo billed yearly (5,000 units). Pro $42/mo or $21/mo billed yearly (20,000 units). Max $140/mo or $42/mo billed yearly (60,000 units). Business $200/mo or $96/mo billed yearly (80,000 units). The lower figure is the yearly price per month (as of 2026-11-20)$pr$,
  "updatedAt" = now()
WHERE slug = $pr$krea$pr$
  AND "currentPricing" = $pr$Free 100 units/day; paid ~$9/$5, $35/$21, $105/$63, $200/$160 per month (list/discounted; billing basis unverified)$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$paid list/discounted monthly prices shown as $9/$5, $35/$21, $105/$63, $200/$160. The billing basis behind the two numbers is unverified.$pr$,
    $pr$paid prices, re-read 2026-11-20: Basic $9/mo or $5/mo billed yearly (5,000 units); Pro $42/mo or $21/mo billed yearly (20,000 units); Max $140/mo or $42/mo billed yearly (60,000 units); Business $200/mo or $96/mo billed yearly (80,000 units). The lower figure is the yearly price per month.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$krea$pr$
  AND description LIKE $pr$%$35/$21, $105/$63, $200/$160%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$API pricing starts at an introductory $2 per 1M input tokens and $10 per 1M output tokens, then $4 and $20 after the introductory period, which has no stated end date (as of 2026-10-29).$pr$,
    $pr$The API price is $4 per 1M input tokens and $20 per 1M output tokens regular, with an introductory $2 and $10 through 2026-11-30. The blog says that later price applies to the Carbon model intended for public access only (re-read 2026-11-20).$pr$),
  "updatedAt" = now()
WHERE slug = $pr$gemini$pr$
  AND description LIKE $pr$%which has no stated end date%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$at an introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 and $20.$pr$,
    $pr$at $4 per 1M input tokens and $20 per 1M output tokens regular, with an introductory $2 and $10 through 2026-11-30.$pr$),
  "updatedAt" = now()
WHERE slug = $pr$gemini$pr$
  AND description LIKE $pr$%introductory $2 per 1M input tokens and $10 per 1M output tokens through 2026-11-30, then $4 and $20.%$pr$;

UPDATE platforms SET description = CASE
  WHEN COALESCE(description, $pr$$pr$) = $pr$$pr$ THEN $pr$Note (2026-11-20): Qwen4-Max (qwen4-max) is the production model and is available and recommended. Per 1M tokens, Singapore is $1.50 input and $4.50 output, cache read $0.075. Beijing and Global (Frankfurt, Hong Kong, Tokyo, and US Virginia) are $1.413 input and $4.24 output, cache read $0.071. Free quota is Singapore only: the free-quota page says each model typically has 1,000,000 tokens for 90 days from account activation or from the model release date. Qwen4-Max-Preview is Token Plan only. It ran from 10:00 on 2026-11-11 and ends at 24:00 on 2026-11-25 (UTC+8), then the preview page says it is retired. Pay-as-you-go is not supported for the preview.$pr$
  ELSE description || $pr$ Note (2026-11-20): Qwen4-Max (qwen4-max) is the production model and is available and recommended. Per 1M tokens, Singapore is $1.50 input and $4.50 output, cache read $0.075. Beijing and Global (Frankfurt, Hong Kong, Tokyo, and US Virginia) are $1.413 input and $4.24 output, cache read $0.071. Free quota is Singapore only: the free-quota page says each model typically has 1,000,000 tokens for 90 days from account activation or from the model release date. Qwen4-Max-Preview is Token Plan only. It ran from 10:00 on 2026-11-11 and ends at 24:00 on 2026-11-25 (UTC+8), then the preview page says it is retired. Pay-as-you-go is not supported for the preview.$pr$
END, "updatedAt" = now()
WHERE slug = $pr$qwen$pr$
  AND COALESCE(description, $pr$$pr$) NOT LIKE $pr$%ends at 24:00 on 2026-11-25 (UTC+8)%$pr$;

UPDATE platforms SET
  description = replace(description,
    $pr$valid for 90 days from the later of Model Studio activation, model release, or application approval$pr$,
    $pr$typically 1,000,000 tokens for 90 days from account activation or from the model release date, Singapore only$pr$),
  "updatedAt" = now()
WHERE slug = $pr$qwen$pr$
  AND description LIKE $pr$%later of Model Studio activation, model release, or application approval%$pr$;

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
