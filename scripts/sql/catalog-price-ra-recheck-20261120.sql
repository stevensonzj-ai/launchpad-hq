-- RA price re-check 2026-11-20. Guarded UPDATE only. Platforms table.
-- Idempotent: each WHERE matches the old sentence and stops matching after it runs.
-- No DDL, DELETE, or INSERT. Do not run this from an agent.
-- Every WHERE was taken from text seeded in this repo. Check it against production
-- before running. A sentence that prod has already changed will match 0 rows.

UPDATE platforms SET
  "currentPricing" = $ra$Free $0/month. Pro $17/month billed annually. Max $167/month billed annually. Enterprise Pro $34/month per seat billed annually. Enterprise Max $271/month per seat billed annually. Enterprise custom pricing (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$perplexity-ai$ra$
  AND "currentPricing" = $ra$Free $0; Pro $17/mo billed annually; Max $200/mo or $2,000/yr; Education Pro $10/mo; Enterprise Pro $40/seat/mo or $400/yr; Enterprise Max $325/seat/mo or $3,250/yr (official, as of 2026-10-26)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Quote only: Market Intelligence and Enterprise Suite, annual subscriptions (enterprise packages and per-seat options). No dollar prices (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$alphasense$ra$
  AND "currentPricing" = $ra$Quote only: Market Intelligence and Enterprise Intelligence packages, sold as annual subscriptions (per seat or enterprise-wide) (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$$0 for individuals (baseline agent quota refreshed weekly); Google AI Pro and Ultra are named on the pricing page and their prices are not stated there; organisations: Gemini Enterprise Standard/Plus from $30 per seat a month, or pay-as-you-go with a $0 seat fee (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$google-antigravity$ra$
  AND "currentPricing" = $ra$$0 for individuals (quota refreshed weekly); Google AI Pro $19.99/mo and Google AI Ultra from $99.99/mo raise the limits; organisations: Gemini Enterprise from $30 per seat a month, or pay-as-you-go (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$$0 for individuals (baseline agent quota refreshed weekly); Google AI Pro and Ultra are named on the pricing page and their prices are not stated there; organisations: Gemini Enterprise Standard/Plus from $30 per seat a month, or pay-as-you-go with a $0 seat fee (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$antigravity-cli$ra$
  AND "currentPricing" = $ra$$0 for individuals (quota refreshed weekly); Google AI Pro $19.99/mo and Google AI Ultra from $99.99/mo raise the limits; organisations: Gemini Enterprise from $30 per seat a month, or pay-as-you-go (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Free $0. Pro $12.50/mo billed yearly ($15 monthly). Student plan free (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$glasp$ra$
  AND "currentPricing" = $ra$Free; Pro $12.50/mo ($150 billed yearly); Unlimited $30/mo ($360 billed yearly) (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$The Gemini music help page requires 18+ and says limits apply. It does not state that music generation is free, or that Google Flow Music starts with daily credits. Gemini API per song: Lyria 3.5 $0.08, Lyria 3 Clip $0.04, Lyria 3 Pro $0.08; no free API tier (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$google-lyria-3$ra$
  AND "currentPricing" = $ra$Free to try in the Gemini app (limits apply) and Google Flow Music (daily credits); Gemini API per song: Lyria 3.5 $0.08, Lyria 3 Clip $0.04, Lyria 3 Pro $0.08; no free API tier (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Video generation comes with Google AI plans: AI Plus $4.99, AI Pro $19.99 and AI Ultra from $99.99 a month. The Gemini API does not list Veo. Its video model is Gemini Omni 1.2 Flash, paid tier only: input $1.50 and video output $12.00 per 1M tokens, about $0.07 per second of 720p (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$google-veo-3-1$ra$
  AND "currentPricing" = $ra$Video generation comes with Google AI plans: AI Plus $4.99, AI Pro $19.99 and AI Ultra from $99.99 a month; the Gemini API no longer lists Veo (its video model is Gemini Omni Flash, about $0.10 a second, paid tier only); Google Cloud pricing not confirmed (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$List prices per seat: Starter $20, Plus $60, Max $250. Lower billed-annually figures on the page have no stated end date and are not the list price (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$invideo-ai$ra$
  AND "currentPricing" = $ra$Starter $20/seat/mo ($10/seat/mo billed annually); Plus $30/seat/mo billed annually; Max $75/seat/mo billed annually (compare table, invideo.io/pricing, as of 2026-10-14). Monthly Plus/Max dollar amounts did not fully render — left unverified rather than guessed.$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Free $0 (the page states two different free Litmap limits). Paid $10 and $120/year (save 20%), with unlimited articles and Litmaps. Enterprise has no price (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$litmaps$ra$
  AND "currentPricing" = $ra$Free; Pro Education $12.50/mo or $10/mo billed yearly (academic email required); Pro Commercial $50/mo or $40/mo billed yearly; Team quoted (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Ambassador free (non-commercial, 25 tracks/mo, 5 MP3 downloads/mo). Pre-discount references: Creator $14/mo, Pro $39/mo, Ultra $89/mo. A first-year discount is on the page and has no stated end date, so it is not the list price (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$mubert$ra$
  AND "currentPricing" = $ra$Ambassador free (non-commercial); Creator $14/mo; Pro $39/mo (commercial use); Business $199/mo (client, agency and app use); billed annually: $11.69, $32.49 and $149.29 a month (as of 2026-10-30)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Pay as you go with a $200 free credit. Aura-2 text to speech $0.030 per 1,000 characters. Voice Agent Standard $0.075/min. Growth from $4,000/yr (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$deepgram$ra$
  AND "currentPricing" = $ra$Pay as you go with a $200 free credit (no card, no expiry): Nova-3 Monolingual $0.0077/min streaming, $0.0043/min pre-recorded; Aura-2 text to speech $0.030 per 1,000 characters; Voice Agent Standard $0.075/min. Growth from $4,000/yr pre-paid at lower rates; Enterprise custom (as of 2026-10-30)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Developer Platform API: $0.01 per credit, with 25 free credits to start (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$stability-ai$ra$
  AND "currentPricing" = $ra$Open models (Community License): free for individuals and organizations under US$1M annual revenue; Developer Platform API: US$0.01 per credit, pay as you go; Enterprise License (over US$1M annual revenue): custom (as of 2026-10-30)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Basic includes writing assistance of 5,000 words a month. Premium, Premium Plus, and Confidential Data are named. Dollar amounts did not render on the pricing page (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$trinka-ai$ra$
  AND "currentPricing" = $ra$Basic $0; Premium $48/yr or $20/mo; Premium Plus $125/yr; Confidential Data $300/yr (as of 2026-10-30)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Pay as you go, rates shown without a currency symbol: Solar Pro 4 0.30 input / 0.06 cached / 1.20 output per 1M tokens. Solar Mini 4 0.10 input per 1M tokens. Document Parse 0.03 (Enhanced). Solar Pro 3 and Solar Pro 2 ended service on 2026-10-30 (KST) (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$upstage-solar$ra$
  AND "currentPricing" = $ra$Pay as you go: Solar Pro 4 $0.30 / $1.20 and Solar Mini 4 $0.10 / $0.40 per 1M input / output tokens; Document Parse $0.01-$0.03 a page; prepaid plans from $100/mo with bonus credits; prices exclude 10% VAT (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Pro list $29.00/mo and Complete list $49.00/mo, billed yearly. First-year sale is 50% off ($14.50 and $24.50) through Dec 2, 2026, 11:59 PM UTC, then the regular price (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$wordpress-ai-jetpack-ai$ra$
  AND "currentPricing" = $ra$Free plan includes 20 AI requests; Jetpack AI $4.95/mo for the first year, then $9.95 (billed yearly); Complete $24.95/mo first year, then $49.95 (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Windows Individuals struck list prices: perpetual US$695 and US$159, yearly US$305 and US$129. Offer prices on the page have no stated end date and are not the list price. The stored US$129.99 perpetual price is not on the page (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$wondershare-pdfelement-ai$ra$
  AND "currentPricing" = $ra$Perpetual licence (Windows, one user) $129.99; Team and Education prices not confirmed (as of 2026-10-30)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$AI Assistant is listed under Acrobat Studio (US$24.99/mo annual billed monthly; US$299.88/yr prepaid; US$34.99/mo monthly). Standard is US$14.99/mo annual billed monthly. Pro is US$19.99/mo annual billed monthly. No Express plan is on the Individuals page (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$adobe-acrobat-ai-assistant$ra$
  AND "currentPricing" = $ra$AI Assistant is included in Acrobat Studio ($24.99/mo, annual plan billed monthly), not in Acrobat Standard ($14.99) or Pro ($19.99); Acrobat Express ($9.99/mo) is marketed as AI-powered document insights; no standalone AI Assistant price was seen (US, individuals) (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Bloomberg Terminal: no public price, sold through an order or demo request; ASKB, the Terminal's AI, is sales-only. Bloomberg.com list prices are $399 a year (auto-renews at $399) or $39.99 a month (auto-renews at $39.99). The page names no AI feature (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$bloomberg-gpt-terminal-ai$ra$
  AND "currentPricing" = $ra$Bloomberg Terminal: no public price, sold through an order or demo request; ASKB, the Terminal's AI, is sales-only. A separate Bloomberg.com consumer subscription is $399 a year ($180 for the first year) or $39.99 a month ($1.99 for the first month), and its page names no AI feature (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Free. Prime $25/mo and Pro $59/mo billed monthly. Billed annually: Prime $7.20/mo (continue to pay $86.40) and Pro $17.40/mo (continue to pay $208.80) (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$paperpal$ra$
  AND "currentPricing" = $ra$Free; Prime $25/mo and Pro $59/mo billed monthly; billed annually Prime $8.40/mo ($100.80/yr) and Pro $20.30/mo ($243.60/yr) (as of 2026-10-30)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Free $0 (100 tasks, unlimited workflows, 2-step workflows). Standard $19/mo (10,000 tasks; yearly $16, 2-yearly $15, 3-yearly $14). Unlimited $79/mo (yearly $69, 2-yearly $65, 3-yearly $59). Lifetime list prices shown as normally $684, $2,280, and $4,560 (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$pabbly-connect$ra$
  AND "currentPricing" = $ra$Free plan; Standard (10,000 tasks a month) and Unlimited, billed monthly to 3-yearly; one-time lifetime plans; USD prices not confirmed (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$No free plan: 14-day trial, no card. Plan AI credits: Basic 10 one-time, Core 20/mo, Plus 40/mo, Advanced 120/mo. A 30% off sale ends Nov 23, 2026. Annual dollar amounts on that view are not recorded as list prices (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$squarespace-ai$ra$
  AND "currentPricing" = $ra$AI tools included with plans: Basic $19, Core $29, Plus $49, Advanced $99 a month billed annually ($25 / $39 / $65 / $139 paid monthly) (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Free $0 (0 monthly credits, credit packs only); Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits/mo); Fancy $95-$880/mo ($76-$704 annual, 8,550+ credits); API: Pika H3 Flex text/image/keyframe $0.02/sec at 480p, $0.04 at 768p, $0.07 at 1080p, $0.08 at 2K, $0.16 at 4K (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$pika$ra$
  AND "currentPricing" = $ra$Free $0 (0 monthly credits, credit packs only); Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits/mo); Fancy $95-$880/mo ($76-$704 annual, 8,550+ credits); API: Pika H3 Flex (open weights) from $0.02/sec at 480p (launch price $0.01/sec for Pika API Club members through Nov 5, 2026) (as of 2026-11-02)$ra$;

UPDATE platforms SET
  "currentPricing" = $ra$Free CRM, up to 2 users. Marketing Hub Starter list price $20 per seat. Professional starts at $800/mo billed annually or $890/mo monthly. Enterprise starts at $3,600/mo (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$hubspot-ai$ra$
  AND "currentPricing" = $ra$Free CRM; Marketing Hub Starter $7/seat/mo paid annually or $10 monthly (new-customer offer; list $20), Professional $800/mo, Enterprise $3,600/mo (as of 2026-10-29)$ra$;

-- Free-tier column. Same guard: the WHERE is the text currently in prod.

UPDATE platforms SET
  "freeTierFeatures" = $ra$For Individuals, $0/month: experience Antigravity without a subscription plan, with a baseline agent quota refreshed weekly. Numeric quota amounts are not stated on this page. (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$google-antigravity$ra$
  AND "freeTierFeatures" = $ra$$0 for individuals with a personal Google account (18+, supported countries): a variety of agent models, unlimited Tab completions and Command requests, and a quota refreshed weekly. Numeric limits are not stated. (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "freeTierFeatures" = $ra$For Individuals, $0/month: experience Antigravity without a subscription plan, with a baseline agent quota refreshed weekly. Numeric quota amounts are not stated on this page. (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$antigravity-cli$ra$
  AND "freeTierFeatures" = $ra$$0 for individuals with a personal Google account (18+, supported countries): a variety of agent models, unlimited Tab completions and Command requests, and a quota refreshed weekly. Numeric limits are not stated. (as of 2026-10-29)$ra$;

UPDATE platforms SET
  "freeTierFeatures" = $ra$The Gemini music-generation help page requires users to be 18 or older and says limits apply (upgrade or wait). It does not state that music generation is free in the Gemini app, and it does not mention daily credits or Google Flow Music being free to start. (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$google-lyria-3$ra$
  AND "freeTierFeatures" = $ra$Gemini app (18+): music generation on the free plan, with limits Google does not publish; Google Flow Music: free to start, with daily credits; MusicFX now redirects to Flow Music (as of 2026-10-29)$ra$;

UPDATE platforms SET "costTier" = 'PAID', "updatedAt" = now()
WHERE slug = $ra$beatoven-ai$ra$ AND "costTier" = 'FREEMIUM';

UPDATE platforms SET "costTier" = 'PAID', "updatedAt" = now()
WHERE slug = $ra$google-lyria-3$ra$ AND "costTier" = 'FREEMIUM';

UPDATE platforms SET
  "currentPricing" = $ra$No free plan. List prices are the struck was-prices: Topaz Studio $499/yr, $49/mo billed annually, or $79/mo monthly; Studio Pro $799/yr or $79/mo billed annually; Photo $199, Gigapixel $149, Video $299, Topaz for Web - Image $199, Topaz for Web - Video $299, Topaz for Web Pro $599 per year; Photo Pro $599, Gigapixel Pro $499, Video Pro $699 per year. A Black Friday sale is running and the page states no end date. The Monthly view says Studio includes all 7 apps; the other views say all 5 apps. (as of 2026-11-20)$ra$,
  "updatedAt" = now()
WHERE slug = $ra$topaz-labs$ra$
  AND "currentPricing" = $ra$No free plan; subscriptions only, no perpetual licence listed: Photo $199/yr or $39/mo, Gigapixel $149/yr or $29/mo, Video $299/yr or $59/mo; Topaz Studio (all apps) $399/yr, $45/mo billed annually or $69/mo month to month; Pro versions and Enterprise cost more; list prices, sales are frequent (as of 2026-10-29)$ra$;
