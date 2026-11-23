-- Catalog price re-verification 2026-11-23 (Launchpad HQ)
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. No new rows. No new slugs. No snapshot or branch statements.
-- The workflow self-snapshots. Do not run this from an agent against production.
-- Sources re-read 2026-11-23. Statements below are only for stored text that
-- still holds the old wording. Checked-at bumps with the same price are not here.
-- Each WHERE matches one stored wording and does not match the replacement,
-- so a second run updates 0 rows.
-- Squarespace and Gemini and Ideogram and Sakana guards use the in-repo
-- snapshot or the 2026-11-20 Research Analyst replacement text.
-- Tencent, LongCat, and GPT Image guards use the 2026-11-05 xwatch row text
-- or update text. If production text differs, that statement updates 0 rows.

-- Squarespace: the 2026-11-20 replacement still says the sale ends Nov 23, 2026.
UPDATE platforms SET
  "currentPricing" = $rv$No free plan: 14-day trial, no card. Plan AI credits: Basic 10 one-time, Core 20/mo, Plus 40/mo, Advanced 120/mo. USD list prices: Basic $19/mo billed annually or $25 monthly, Core $29 or $39, Plus $49 or $65, Advanced $99 or $139. The pricing page no longer shows an all-plans percentage sale. The coupons page lists GIMME10 for 10% off a first annual website purchase and states no calendar end date, so that code is not a list price (as of 2026-11-23)$rv$,
  "updatedAt" = now()
WHERE slug = $rv$squarespace-ai$rv$
  AND "currentPricing" = $rv$No free plan: 14-day trial, no card. Plan AI credits: Basic 10 one-time, Core 20/mo, Plus 40/mo, Advanced 120/mo. A 30% off sale ends Nov 23, 2026. Annual dollar amounts on that view are not recorded as list prices (as of 2026-11-20)$rv$;

-- Squarespace: fact-file phrase, if it was copied into currentPricing.
-- The LIKE needle omits the percent sign so it is not a wildcard.
UPDATE platforms SET
  "currentPricing" = replace("currentPricing",
    $rv$30% off all plans and ends Nov 23$rv$,
    $rv$the pricing page no longer shows that all-plans percentage sale (the offer ended 2026-11-23)$rv$),
  "updatedAt" = now()
WHERE slug = $rv$squarespace-ai$rv$
  AND "currentPricing" LIKE $rv$%off all plans and ends Nov 23%$rv$;

-- Gemini currentPricing is still the 2026-10-25 personal-plan string in the snapshot.
-- The replacement is the 2026-11-20 plans fact: Workspace from $14 and Enterprise from $30.
UPDATE platforms SET
  "currentPricing" = $rv$Free $0; Google AI Plus $4.99/mo (2x higher usage limits than Free; 400 GB storage); Google AI Pro $19.99/mo (4x higher usage limits than Free; 5 TB storage); Google AI Ultra 5x $99.99/mo; Google AI Ultra 20x $199.99/mo; Gemini with Google Workspace from $14 per seat a month (up to 300 seats); Gemini Enterprise from $30 per seat a month (as of 2026-11-20)$rv$,
  "updatedAt" = now()
WHERE slug = $rv$gemini$rv$
  AND "currentPricing" = $rv$Free $0; Google AI Plus $4.99/mo (2x Free usage); Google AI Pro $19.99/mo (4x Free usage); Google AI Ultra from $99.99/mo (5x Pro) or $199.99/mo (20x Pro) (official, as of 2026-10-25)$rv$;

-- Ideogram freeTierFeatures in the snapshot still names Microsoft sign-in.
UPDATE platforms SET
  "freeTierFeatures" = $rv$30 credits a week for accounts that signed up with Google or Apple. Microsoft and email-and-password accounts get no free credits, unless a Google or Apple sign-in with the same verified email is linked later. Credits reset every Saturday at 00:00 UTC. Everything generated on the free plan is public (as of 2026-11-23)$rv$,
  "updatedAt" = now()
WHERE slug = $rv$ideogram$rv$
  AND "freeTierFeatures" = $rv$30 credits a week for accounts that sign in with Google, Apple or Microsoft; everything made on the free plan is public (official, as of 2026-10-26)$rv$;

-- Sakana currentPricing in the snapshot does not state the Dec 1 rate change.
UPDATE platforms SET
  "currentPricing" = $rv$Fugu subscriptions $20 / $100 / $200 a month; not available in the EU/EEA. Namazu rates re-read 2026-11-23, per 1M tokens: input $0.95, output $4.00, cached input $0.15 until 2026-12-01 10:00 JST, then input $1.90, output $6.00, cached input $0.30. Web search $7.00 per 1,000 calls. Code execution $0.12 per hour.$rv$,
  "updatedAt" = now()
WHERE slug = $rv$sakana-ai$rv$
  AND "currentPricing" = $rv$Fugu subscriptions $20 / $100 / $200 a month; Fugu and Namazu APIs priced per 1M tokens; not available in the EU/EEA (as of 2026-10-29)$rv$;

-- GPT Image currentPricing from catalog-xwatch-20261105.sql says Batch is not supported.
-- The model pages still say that. The API pricing page lists Batch rates.
UPDATE platforms SET
  "currentPricing" = $rv$API models gpt-image-2.6-flare and gpt-image-2.6-sunburst, per 1M tokens: $5 text input, $1.25 cached text, $8 image input, $2 cached image, $30 image output. The model pages say the Batch endpoint is not supported. The API pricing page lists Batch rates for both (image input $4, image output $15, cached image input $1, text input $2.50, cached text input $0.625) and does not say the endpoint is unsupported (as of 2026-11-23)$rv$,
  "updatedAt" = now()
WHERE slug = $rv$gpt-image-1-5-dall-e-successor$rv$
  AND "currentPricing" = $rv$ChatGPT plans include image creation; API models gpt-image-2.6-flare and gpt-image-2.6-sunburst bill per token at $5 text in / $1.25 cached text in / $8 image in / $2 cached image in / $30 image out per 1M tokens (same rates for Flare and Sunburst; Batch not supported) (as of 2026-11-05)$rv$;

-- Tencent Hy4 currentPricing from the 2026-11-05 insert. TokenHub list is now yuan,
-- with an explicit Beijing end time. The English launch post still gives the USD approximation.
UPDATE platforms SET
  "currentPricing" = $rv$TokenHub list, per 1M tokens: 6 yuan input, 18 yuan output, 0.3 yuan cache hit. 50% of list through 2026-12-31 23:59:59 Beijing time, then the list price. Tencent's English launch post also says about US$0.90 input, US$2.70 output, and US$0.045 cached input per 1M tokens (as of 2026-11-23)$rv$,
  "updatedAt" = now()
WHERE slug = $rv$tencent-hy4$rv$
  AND "currentPricing" = $rv$TokenHub list about $0.90/$2.70 per 1M input/output ($0.045 cached input); 50% off through 2026-12-31. OpenRouter Tencent Cloud discounted rates $0.417/$1.251 ($0.021 cached) per 1M as of 2026-11-05; 1,048,576 context$rv$;

UPDATE platforms SET
  "freeTierFeatures" = $rv$No free API tier on the TokenHub price page. The launch post's WorkBuddy and CodeBuddy free window was 2026-11-04 through 2026-11-15 and has ended. TokenHub bills Hy4 at 50% of list through 2026-12-31 23:59:59 Beijing time (as of 2026-11-23)$rv$,
  "updatedAt" = now()
WHERE slug = $rv$tencent-hy4$rv$
  AND "freeTierFeatures" = $rv$Promo windows: WorkBuddy and CodeBuddy free 2026-11-04 to 2026-11-15; TokenHub 50% off through 2026-12-31 (as of 2026-11-05)$rv$;

UPDATE platforms SET
  description = replace(description,
    $rv$API pricing on Tencent Cloud TokenHub is about $0.90 input / $2.70 output / $0.045 cached input per 1M tokens; TokenHub lists 50% off those rates through 2026-12-31. On OpenRouter (tencent/hy4) the discounted Tencent Cloud rates shown were $0.417/$1.251 (cached $0.021) per 1M tokens with a 1,048,576-token context (as of 2026-11-05).$rv$,
    $rv$API pricing on Tencent Cloud TokenHub, read 2026-11-23, is a list price of 6 yuan input, 18 yuan output, and 0.3 yuan cache-hit per 1M tokens. Calls are 50% of that list price through 2026-12-31 23:59:59 Beijing time, then the list price. Tencent's English launch post still says approximately US$0.90 input, US$2.70 output, and US$0.045 cached input per 1M tokens.$rv$),
  "updatedAt" = now()
WHERE slug = $rv$tencent-hy4$rv$
  AND description LIKE $rv$%about $0.90 input / $2.70 output / $0.045 cached input%$rv$;

UPDATE platforms SET
  description = replace(description,
    $rv$WorkBuddy and CodeBuddy were free from 2026-11-04 through 2026-11-15.$rv$,
    $rv$Tencent's launch post said WorkBuddy and CodeBuddy would be free from 2026-11-04 through 2026-11-15. That window has ended, and the post does not state a later free period for Hy4.$rv$),
  "updatedAt" = now()
WHERE slug = $rv$tencent-hy4$rv$
  AND description LIKE $rv$%were free from 2026-11-04 through 2026-11-15%$rv$;

-- LongCat rates are unchanged. The page still states no end date.
UPDATE platforms SET
  "currentPricing" = $rv$LongCat API Platform pay-as-you-go, labeled limited-time on the pricing page, which states no end date and no post-discount price (as of 2026-11-23): $0.30 input / $0.006 cached input / $1.20 output per 1M tokens (2 yuan / 0.04 yuan / 8 yuan).$rv$,
  "updatedAt" = now()
WHERE slug = $rv$longcat-2-5$rv$
  AND "currentPricing" = $rv$LongCat API Platform PAYG (limited-time discount, as of 2026-11-05): $0.30 input / $0.006 cached / $1.20 output per 1M tokens (¥2 / ¥0.04 / ¥8). Also on Vercel AI Gateway as meituan/longcat-2.5 at the same USD rates; 1,048,576 context$rv$;

UPDATE platforms SET
  description = replace(description,
    $rv$Pay-as-you-go on the LongCat API Platform (limited-time discounted prices as of 2026-11-05): $0.30 input / $0.006 cached input / $1.20 output per 1M tokens (¥2 / ¥0.04 / ¥8).$rv$,
    $rv$Pay-as-you-go on the LongCat API Platform (limited-time prices as of 2026-11-23; the pricing page states no end date and no post-discount price): $0.30 input / $0.006 cached input / $1.20 output per 1M tokens (2 yuan / 0.04 yuan / 8 yuan).$rv$),
  "updatedAt" = now()
WHERE slug = $rv$longcat-2-5$rv$
  AND description LIKE $rv$%limited-time discounted prices as of 2026-11-05%$rv$;

UPDATE platforms SET
  "freeTierFeatures" = $rv$The LongCat 2.5 pricing page states no free API tier. The LongCat Chat homepage does not say whether 2.5 is free (checked 2026-11-23).$rv$,
  "updatedAt" = now()
WHERE slug = $rv$longcat-2-5$rv$
  AND "freeTierFeatures" = $rv$LongCat Chat has historically offered free chat for some models; confirm current free chat for 2.5 on longcat.chat (unverified whether 2.5 itself is free in chat as of 2026-11-05)$rv$;
