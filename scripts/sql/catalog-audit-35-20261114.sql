-- Catalog audit 35 (2026-11-14): price text that the vendor pages changed.
-- Guarded SQL only. Platforms table. Idempotent. Update statements only.
-- No user tables. Do not run this from an agent. Zach runs it, if at all.
-- Each WHERE is false once the new text is stored, so a second run changes 0 rows.
-- Fact files are the pages' source for plan rows. These statements update the
-- database sentences that still say the old price or that a price was unverified.

UPDATE platforms SET
  "currentPricing" = $a35$Local: free. Comfy Cloud: Standard $20/month ($192/year), Creator $35/month ($336/year), Pro $100/month ($960/year). Comfy API: RTX PRO 6000 (96GB) $3.49/hr, RTX PRO 6000 MIG (48GB) $1.75/hr, H100 $6.23/hr, H200 $7.71/hr, B200 $11.23/hr; storage $0.20/GB/mo (as of 2026-11-14)$a35$,
  "updatedAt" = now()
WHERE slug = $a35$comfyui$a35$
  AND "currentPricing" = $a35$Local: free; Comfy Cloud: metered GPU time (rate unverified as of 2026-10-13)$a35$;

UPDATE platforms SET
  description = replace(description,
    $a35$the dollar rate is unverified as of 2026-10-13$a35$,
    $a35$API GPU rates on comfy.org/pricing as of 2026-11-14 are RTX PRO 6000 (96GB) $3.49/hr, MIG (48GB) $1.75/hr, H100 $6.23/hr, H200 $7.71/hr, and B200 $11.23/hr$a35$),
  "updatedAt" = now()
WHERE slug = $a35$comfyui$a35$
  AND description LIKE $a35$%the dollar rate is unverified as of 2026-10-13%$a35$;

UPDATE platforms SET
  "freeTierFeatures" = $a35$₹100 of free credits on signup. Credits do not expire, and there is no monthly commitment (as of 2026-11-14)$a35$,
  "updatedAt" = now()
WHERE slug = $a35$sarvam-ai$a35$
  AND "freeTierFeatures" = $a35$Free starter credits; amount unverified as of 2026-10-13$a35$;

UPDATE platforms SET
  "currentPricing" = $a35$Pay as you go, then Pro, Growth, and Business. Bulbul V4 Flash TTS ₹2.00 / ₹1.85 / ₹1.70 / ₹1.60 per 1,000 characters. Speech-to-text ₹0.49 / ₹0.45 / ₹0.41 / ₹0.38 per minute. Signup includes ₹100 of free credits (as of 2026-11-14)$a35$,
  "updatedAt" = now()
WHERE slug = $a35$sarvam-ai$a35$
  AND "currentPricing" = $a35$Pay-as-you-go (e.g. Bulbul V4 Flash TTS ₹2.00 per 1k chars, ₹1.70 higher tiers); voice agents from ₹3/min; starter credits amount unverified$a35$;

UPDATE platforms SET
  description = replace(description,
    $a35$Example: Bulbul V4 Flash TTS ₹2.00 per 1k characters, dropping to ₹1.70 on higher volume tiers. Voice agents are listed “as low as ₹3/min”. Starter credit amount is unverified.$a35$,
    $a35$Bulbul V4 Flash TTS is ₹2.00 / ₹1.85 / ₹1.70 / ₹1.60 per 1,000 characters (pay as you go / Pro / Growth / Business). Signup includes ₹100 of free credits. Voice agents are listed as low as ₹3/min (as of 2026-11-14).$a35$),
  "updatedAt" = now()
WHERE slug = $a35$sarvam-ai$a35$
  AND description LIKE $a35$%Starter credit amount is unverified.%$a35$;

UPDATE platforms SET
  "currentPricing" = $a35$Free: 1 caption template, no AI credits. Max $24.99/month (500 credits). Frontier $69.99/month (1,400 credits). iOS prices (as of 2026-11-14)$a35$,
  "freeTierFeatures" = $a35$1 caption template and no AI credits (as of 2026-11-14)$a35$,
  "updatedAt" = now()
WHERE slug = $a35$captions$a35$
  AND "currentPricing" = $a35$Free to sign up; paid from $24.99/mo (official homepage, as of 2026-10-14); higher tiers unverified$a35$
  AND "freeTierFeatures" = $a35$Some features without a subscription (official FAQ, as of 2026-10-14); exact free limits unverified$a35$;

UPDATE platforms SET
  description = replace(description,
    $a35$Higher-tier dollar amounts were not listed on the fetched homepage — unverified.$a35$,
    $a35$The pricing page lists Max at $24.99/month (500 credits) and Frontier at $69.99/month (1,400 credits). Those are iOS prices (as of 2026-11-14).$a35$),
  "updatedAt" = now()
WHERE slug = $a35$captions$a35$
  AND description LIKE $a35$%Higher-tier dollar amounts were not listed on the fetched homepage — unverified.%$a35$;

UPDATE platforms SET
  "currentPricing" = $a35$$5 free credits, then pay as you go ($0.05/min Vapi hosting, prepaid). Core $29/month. Pro is 10% of the Vapi hosting fee with a $999/mo minimum (as of 2026-11-14)$a35$,
  "updatedAt" = now()
WHERE slug = $a35$vapi$a35$
  AND "currentPricing" = $a35$$5 free credits then pay-as-you-go ($0.05/min Vapi hosting listed); Pro from $999/mo minimum; Core package list price unverified as of 2026-10-14$a35$;

UPDATE platforms SET
  description = replace(description,
    $a35$A Core success-package dollar amount did not render as $29 on this fetch — unverified.$a35$,
    $a35$Core is $29/month (as of 2026-11-14).$a35$),
  "updatedAt" = now()
WHERE slug = $a35$vapi$a35$
  AND description LIKE $a35$%A Core success-package dollar amount did not render as $29 on this fetch — unverified.%$a35$;

UPDATE platforms SET
  "currentPricing" = $a35$Free 1,000 credits/mo. Hobby $19/mo or $16/mo billed annually (5,000 credits). Standard $99/mo or $83/mo annually (100,000). Growth $399/mo or $333/mo annually (500,000). Scale $749/mo or $599/mo annually (1,000,000) (as of 2026-11-14)$a35$,
  "updatedAt" = now()
WHERE slug = $a35$firecrawl$a35$
  AND "currentPricing" = $a35$Free 1,000 credits/mo; Hobby $16/mo annual; Standard $83/mo annual; Growth $333/mo annual$a35$;

UPDATE platforms SET
  description = replace(description,
    $a35$Official pricing (firecrawl.dev/pricing, as of 2026-10-13): Free 1,000 credits/mo, no card; Hobby $16/mo annual (5,000 credits); Standard $83/mo annual (100k); Growth $333/mo annual (500k).$a35$,
    $a35$Pricing page (firecrawl.dev/pricing, as of 2026-11-14): Free 1,000 credits/mo, no card; Hobby $19/mo or $16/mo annually (5,000 credits); Standard $99/mo or $83/mo annually (100k); Growth $399/mo or $333/mo annually (500k); Scale $749/mo or $599/mo annually (1,000,000).$a35$),
  "updatedAt" = now()
WHERE slug = $a35$firecrawl$a35$
  AND description LIKE $a35$%Hobby $16/mo annual (5,000 credits); Standard $83/mo annual (100k); Growth $333/mo annual (500k).%$a35$
  AND description NOT LIKE $a35$%Scale $749/mo%$a35$;
