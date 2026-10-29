/**
 * Catalog audit #18 — stale facts, batch 2, 2026-10-29. UPDATE-only, keyed
 * by slug. Patch data and pure diff logic for scripts/update-catalog-audit-18.ts
 * (the DB runner lives there). Same shape and rules as audit 17 (batch 1).
 *
 * Batch 2 is rows 29–51 of the stale group, the rows with no sourced fact
 * file (selection and order:
 * docs/planning/2026-10-autonomous-business/stale-facts-batches.md). Each was
 * read on the vendor's own pages on 2026-10-29 by two independent readers;
 * the sourced facts are in src/data/facts/<slug>.ts. A row is patched here
 * only for facts both readers saw. Facts a page did not show (blocked, or
 * rendered only in a browser) are left as the row has them and listed in
 * REVIEW-SUMMARY.md under "Browser-check list".
 *
 *   - fields: text set to exactly this value, written only where it differs;
 *   - guarded: company, website, costTier and apiAvailable change only while
 *     the row still holds the expected old value, so a hand edit is never
 *     overwritten.
 *
 * It also re-patches 16 batch-1 rows (audit 17) from the Research
 * Analyst's browser check of batch 1 the same day (AUDIT_18_BATCH1_RECHECK).
 * Audit 17 writes the same text on every field both audits set, and its
 * relevance-ai tier goes straight to ENTERPRISE, so the two converge in
 * either order. Gumloop's privacyLevel is the one new guarded field.
 *
 * Audit 10 touches none of these slugs. Audit 11 patches one of them
 * (squarespace-ai) on costTier only; this audit never writes that field for
 * it (audit-18.test.ts checks both), so a re-run of audits 10 or 11 cannot
 * revert this one. Text never says "official" (audit 10's wording pass
 * rewrites text that does). No affiliate or sponsor links.
 *
 * Never deletes or creates rows; never changes slug, name or categoryId.
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-18.test.ts).
 */

export const CHECKED_AT = "2026-10-29";
const AS_OF = `(as of ${CHECKED_AT})`;

export type Audit18TextField = "primaryUse" | "currentPricing" | "freeTierFeatures" | "usageLimits";

export type Audit18Guarded = {
  company?: { from: string[]; to: string };
  website?: { from: string[]; to: string };
  costTier?: { from: string; to: string };
  apiAvailable?: { from: boolean; to: boolean };
  privacyLevel?: { from: string; to: string };
};

export type Audit18Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit18TextField, string>>;
  guarded?: Audit18Guarded;
};

/** Batch 2, in tracker order (rows 29–51). Every slug has a fact file; rows with nothing to patch have no entry below. */
export const AUDIT_18_BATCH = [
  "salesforce-einstein",
  "scenario",
  "semantic-scholar",
  "shopify-magic-sidekick",
  "slack-ai",
  "squarespace-ai",
  "tray-ai",
  "trinka-ai",
  "upstage-solar",
  "vllm",
  "wix-ai",
  "wordpress-ai-jetpack-ai",
  "workato",
  "aider",
  "gemini-cli",
  "ollama",
  "openai-codex-cli",
  "leonardo-ai",
  "microsoft-designer",
  "microsoft-power-automate",
  "dragon-medical-one",
  "healthee",
  "viz-ai",
];

/**
 * Batch-1 rows (audit 17) re-checked in a browser by the Research Analyst on
 * 2026-10-29 (18 items). Every one got a fact-file update; the ones whose
 * row text, website, cost tier or privacy level changes have a patch below.
 */
export const AUDIT_18_BATCH1_RECHECK = [
  "connected-papers",
  "paperpal",
  "pabbly-connect",
  "litmaps",
  "gpt-image-1-5-dall-e-successor",
  "figma-ai",
  "meshy",
  "ludo-ai",
  "mailchimp-ai",
  "hubspot-ai",
  "groq",
  "gumloop",
  "fireworks-ai",
  "replicate",
  "relevance-ai",
  "reducto",
  "sakana-ai",
  "consensus",
];

export const AUDIT_18_PATCHES: Audit18Patch[] = [
  {
    slug: "salesforce-einstein",
    finding: "Row listed \"Einstein 1 from $500/mo\" and \"Enterprise+ for full Einstein\"; editions are now Starter to Max ($25-$550 per user/month), AI from Core up, Agentforce add-ons $125",
    sources: ["https://www.salesforce.com/sales/pricing/", "https://www.salesforce.com/agentforce/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Sales Cloud per user/month: Starter $25, Pro $100, Core $195, Advanced $395, Max $550 (above Starter billed annually); Agentforce add-ons $125 per user/month; Flex Credits $500 per 100,000 ${AS_OF}`,
      freeTierFeatures: `Salesforce Foundations is listed at $0 with Agentforce Builder and Prompt Builder; what it requires and its usage limits are not stated ${AS_OF}`,
      usageLimits: `AI can be added to Core and above; Max includes the full AI suite and 2.75M Flex Credits per org a year; agent actions are billed in Flex Credits ${AS_OF}`,
    },
  },
  {
    slug: "scenario",
    finding: "Row listed Pro $29/mo and 100 free images a month; plans are now credit-based (Starter $15, Pro $45, Max $75) and the free tier is 50 credits",
    sources: ["https://www.scenario.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free tier; Starter $15/mo, Pro $45/mo, Max $75/mo (up to 25 users); Enterprise custom; yearly billing saves 33% ${AS_OF}`,
      freeTierFeatures: `Free: 50 credits, no card (the page says both "50 free daily credits" and "a free tier with 50 credits"); outputs for personal and evaluation use only ${AS_OF}`,
      usageLimits: `Credits a month: Starter 1,500, Pro 5,000, Max 10,000; Enterprise consumption-based ${AS_OF}`,
    },
  },
  {
    slug: "semantic-scholar",
    finding: "Row had the API limits backwards: unauthenticated calls share a 1,000 requests-per-second pool; an API key starts at 1 request per second",
    sources: ["https://www.semanticscholar.org/product/api"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits: `API: unauthenticated requests share a pool of 1,000 per second across all users; an API key starts at 1 request per second on all endpoints ${AS_OF}`,
    },
    guarded: {
      website: { from: ["https://semanticscholar.org"], to: "https://www.semanticscholar.org" },
    },
  },
  {
    slug: "shopify-magic-sidekick",
    finding: "Row was FREEMIUM with \"Unlimited AI features\"; Shopify has no free store plan (3-day trial), Sidekick is included with paid plans, and AI usage varies by plan",
    sources: ["https://www.shopify.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Sidekick is included with Shopify plans: Basic $39/mo ($29 billed yearly), Grow $105 ($79), Advanced $399 ($299), Plus from $2,300/mo ${AS_OF}`,
      freeTierFeatures: `No free store plan: a 3-day free trial, then $1/month for 3 months; Sidekick is included on paid plans ${AS_OF}`,
      usageLimits: `AI usage varies by plan (the pricing page lists "millions of tokens"); not unlimited ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "slack-ai",
    finding: "Row listed a $10/user/mo AI add-on, no free AI and Business+ at $12.50; AI is now bundled into every plan, Free includes Basic AI, and Business+ is $18 ($15 annually)",
    sources: ["https://slack.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `AI included in Slack plans: Free (Basic AI); Pro $8.75/user/mo ($7.25 paid annually); Business+ $18/user/mo ($15 paid annually) with Advanced AI; Enterprise+ quoted; no separate AI add-on ${AS_OF}`,
      freeTierFeatures: `Free plan includes Basic AI: conversation and file summaries, AI search, daily recaps and workflow generation; Slackbot is a limited trial ${AS_OF}`,
      usageLimits: `Numeric AI limits are not published; fuller Slackbot use comes with Business+, and higher Slackbot limits are sold as Flex Credits through sales ${AS_OF}`,
    },
  },
  {
    slug: "squarespace-ai",
    finding: "Row said plans from $16/mo and unlimited AI writing; Basic is now $19/mo billed annually ($25 monthly) and image and visibility tools use per-plan AI credits. Audit 11 owns the cost tier, so text only",
    sources: ["https://www.squarespace.com/pricing", "https://support.squarespace.com/hc/en-us/articles/46668956855053-Use-AI-credits-for-Squarespace-AI-tools"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `AI tools included with plans: Basic $19, Core $29, Plus $49, Advanced $99 a month billed annually ($25 / $39 / $65 / $139 paid monthly) ${AS_OF}`,
      freeTierFeatures: `14-day free trial with no card; trial sites get 10 AI credits. Paid plans from $19/mo ${AS_OF}`,
      usageLimits: `AI credits: Basic 10 one-time; Core 20, Plus 40, Advanced 120 a month; Image Studio and AI Visibility use credits, Text AI and the Clarkson chat do not; extra credit packs sold ${AS_OF}`,
    },
  },
  {
    slug: "tray-ai",
    finding: "Row was ENTERPRISE with custom pricing and a trial on request; Tray now starts at $50 a month and has a self-serve 30-day trial",
    sources: ["https://tray.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Starts at $50/month; Pro, Team and Enterprise are sized to usage (Tasks and Helix Compute Units), with optional annual commitments ${AS_OF}`,
      freeTierFeatures: `No free plan: a 30-day free trial with 1 million Tasks, no card and no sales call ${AS_OF}`,
      usageLimits: `Usage-based in Tasks and Helix Compute Units; no per-user or per-connection fees; Pro up to 3 workspaces, Team 20, Enterprise unlimited ${AS_OF}`,
    },
    guarded: { costTier: { from: "ENTERPRISE", to: "PAID" } },
  },
  {
    slug: "trinka-ai",
    finding: "Free plan confirmed with AI writing and credit caps the row did not mention; Premium and Premium Plus prices render only in a browser (left as is)",
    sources: ["https://www.trinka.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `Basic (free, never expires, no card): 5,000 words a month, 5 AI writing requests and 4 credits a month ${AS_OF}`,
      usageLimits: `Basic: 5,000 words, 5 AI writing requests and 4 credits a month; Premium: full writing access; Confidential Data plan ($41.67/mo billed annually, teams): no data storage and no AI training ${AS_OF}`,
    },
  },
  {
    slug: "upstage-solar",
    finding: "Row said only \"API pay-per-use\" with free API credits; prices are per token and per page, prepaid plans exist, and the confirmed free use is 10 runs per Studio agent",
    sources: ["https://www.upstage.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Pay as you go: Solar Pro 4 $0.30 / $1.20 and Solar Mini 4 $0.10 / $0.40 per 1M input / output tokens; Document Parse $0.01-$0.03 a page; prepaid plans from $100/mo with bonus credits; prices exclude 10% VAT ${AS_OF}`,
      freeTierFeatures: `Every Upstage Studio agent includes 10 free runs, no credit card ${AS_OF}`,
      usageLimits: `Usage-based per token and per page; prepaid Explore ($100+/mo), Build ($500+) and Scale ($5,000+) add 10-20% bonus credits ${AS_OF}`,
    },
    guarded: {
      website: { from: ["https://upstage.ai"], to: "https://www.upstage.ai" },
    },
  },
  {
    slug: "vllm",
    finding: "Row named \"Open Source (UC Berkeley)\"; vLLM is a community project that started at UC Berkeley and is maintained by many institutions and companies",
    sources: ["https://github.com/vllm-project/vllm"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: {
      company: { from: ["Open Source (UC Berkeley)"], to: "vLLM project (open source; started at UC Berkeley)" },
    },
  },
  {
    slug: "wordpress-ai-jetpack-ai",
    finding: "Row said the AI Assistant needs a paid plan; the free Jetpack plan includes 20 AI requests, and the Jetpack AI plan is $4.95/mo for the first year",
    sources: ["https://jetpack.com/pricing/", "https://jetpack.com/ai/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free plan includes 20 AI requests; Jetpack AI $4.95/mo for the first year, then $9.95 (billed yearly); Complete $24.95/mo first year, then $49.95 ${AS_OF}`,
      freeTierFeatures: `The free Jetpack plan includes Jetpack AI, up to 20 requests ${AS_OF}`,
      usageLimits: `Free, Security and Growth: 20 AI requests; Jetpack AI and Complete: high request capacity under fair use, plus agent access over MCP ${AS_OF}`,
    },
  },
  {
    slug: "workato",
    finding: "Row said pricing is based on recipes and connectors; editions (Standard, Business MCP, Enterprise MCP, Workato ONE) are quoted, with usage tracked by capability",
    sources: ["https://www.workato.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Quote only; editions Standard, Business MCP, Enterprise MCP and Workato ONE ${AS_OF}`,
      freeTierFeatures: `No free plan; a free trial sign-up is offered, length not stated ${AS_OF}`,
      usageLimits: `Edition fee plus usage tracked by capability (workflows, API management, event streams); editions differ in Workbots, on-prem agents and concurrency ${AS_OF}`,
    },
  },
  {
    slug: "gemini-cli",
    finding: "Row was FREE with a 1,000 requests/day free quota; free individual access moved to Antigravity CLI on 2026-06-18 and Gemini CLI now needs a paid API key, Vertex AI or a Code Assist licence",
    sources: ["https://github.com/google-gemini/gemini-cli", "https://www.geminicli.com/docs/resources/tos-privacy"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Code is open source (Apache 2.0), but use needs a paid Gemini API key, Vertex AI, or a Gemini Code Assist Standard / Enterprise licence ${AS_OF}`,
      freeTierFeatures: `No free tier: free individual access moved to Antigravity CLI on 2026-06-18 ${AS_OF}`,
      usageLimits: `Limits follow your paid Gemini API, Vertex AI or Code Assist plan; the old free quota no longer applies ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "PAID" } },
  },
  {
    slug: "ollama",
    finding: "Row was FREE with \"all features included\"; the local app is still free, but Ollama now sells cloud plans and bills cloud models per token",
    sources: ["https://ollama.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Local use free. Cloud: pay per token on the $0 plan, or Pro $20/mo ($200/yr), Max $100/mo, Team $500/mo (early access), Enterprise custom, each with monthly usage credits ${AS_OF}`,
      freeTierFeatures: `Free, open-source (MIT) app: running models on your own hardware is unlimited; cloud models are paid per token ${AS_OF}`,
      usageLimits: `Local: limited only by your hardware. Cloud: $0 plan 3 concurrent requests; Pro $60 and Max $300 of usage credits a month (Max 10 concurrent) ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "openai-codex-cli",
    finding: "Row was FREE and said it uses your own API key with unlimited use; sign-in with a ChatGPT plan is the main route, with plan usage limits, and API-key use is billed at API rates",
    sources: ["https://github.com/openai/codex", "https://learn.chatgpt.com/docs/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Open source (Apache 2.0). Use comes with ChatGPT plans (Free, Go $8, Plus $20, Pro from $100, Business $20/user/mo billed annually) or an API key billed at API rates ${AS_OF}`,
      freeTierFeatures: `Sign in with ChatGPT; Codex is included in ChatGPT plans from Free up, with usage limits by plan; which plans include the CLI is not confirmed ${AS_OF}`,
      usageLimits: `With ChatGPT sign-in, limits follow the plan (5-hour windows on Plus; Pro has no five-hour limit); API-key use follows API pricing ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "leonardo-ai",
    finding: "Row listed Pro $28 and Professional $56; the plans are now Essential, Premium, Ultimate and Teams. Prices read only once (pricing page behind a bot check), so the text names the plans without prices",
    sources: ["https://leonardo.ai/pricing", "https://intercom.help/leonardo-ai/en/articles/9044700-tokens-frequently-asked-questions"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free (150 tokens a day); paid plans Essential, Premium and Ultimate, plus Teams; prices not confirmed ${AS_OF}`,
      freeTierFeatures: `150 fast tokens a day, reset daily; unused tokens do not carry over ${AS_OF}`,
      usageLimits: `Free: 150 tokens a day. Premium adds unlimited relaxed image generation on select models; Ultimate adds relaxed video; monthly token amounts not confirmed ${AS_OF}`,
    },
  },
  {
    slug: "microsoft-designer",
    finding: "Row was FREE with 15 boosts a day; AI use is now metered by monthly Microsoft 365 AI credits, with more usage on Microsoft 365 plans",
    sources: ["https://support.microsoft.com/en-us/office/understanding-ai-credits-68530f1a-4459-4d02-9818-8233c1f673b8"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free with a Microsoft account; more AI usage with Microsoft 365 Personal, Family, Premium or Pro ${AS_OF}`,
      freeTierFeatures: `Free with a Microsoft account; AI generation uses a monthly AI credit allowance (the free amount was not confirmed) ${AS_OF}`,
      usageLimits: `AI use counts against monthly AI credits shared across Microsoft 365 apps; Personal and Family get standard image-generation usage, Premium and Pro extensive ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "microsoft-power-automate",
    finding: "Row was broadly right; adds the paid-yearly terms, the Process plans and the free licence's limits, and moves the website to the current product page",
    sources: ["https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing", "https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free licence for work or school accounts; Premium $15/user/mo, Process $150/bot/mo, Hosted Process $215/bot/mo, all paid yearly; limited rights included in Microsoft 365 ${AS_OF}`,
      freeTierFeatures: `Free licence (work or school account): cloud flows without sharing, attended desktop flows, standard connectors only; a premium trial is offered ${AS_OF}`,
      usageLimits: `Free and Microsoft 365: standard connectors only; Premium: premium and custom connectors, 40,000 actions a day, 5,000 AI Builder credits a month ${AS_OF}`,
    },
    guarded: {
      website: {
        from: ["https://powerautomate.microsoft.com"],
        to: "https://www.microsoft.com/en-us/power-platform/products/power-automate",
      },
    },
  },
  {
    slug: "dragon-medical-one",
    finding: "Row website was nuance.com and claimed unlimited dictation; the product page is now on microsoft.com, no limits are published, and Microsoft offers a migration to Dragon Copilot",
    sources: ["https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Enterprise licences through Microsoft; no public prices. Microsoft offers a migration path to Dragon Copilot ${AS_OF}`,
      freeTierFeatures: `No free tier or trial listed; licences are sold through Microsoft ${AS_OF}`,
      usageLimits: `Not published ${AS_OF}`,
    },
    guarded: {
      website: {
        from: ["https://nuance.com"],
        to: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
      },
    },
  },
  {
    slug: "healthee",
    finding: "Row website was healthee.co (now redirects to healthee.com) and claimed unlimited employee queries, which no page states",
    sources: ["https://healthee.com/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No public pricing; quoted for employers and benefits partners ${AS_OF}`,
      freeTierFeatures: `No free or individual plan; provided by employers ${AS_OF}`,
      usageLimits: `Not published; set by the employer contract ${AS_OF}`,
    },
    guarded: {
      website: { from: ["https://healthee.co"], to: "https://healthee.com" },
    },
  },
  {
    slug: "viz-ai",
    finding: "Row was right on pricing; website moves to www.viz.ai",
    sources: ["https://www.viz.ai"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: {
      website: { from: ["https://viz.ai"], to: "https://www.viz.ai" },
    },
  },

  // ---- Batch-1 rows (audit 17), re-checked in a browser by the Research Analyst on 2026-10-29. ----
  // Only items the check marked verified change prices; NOT STATED items and pages that conflict
  // with themselves become "not stated" / "not confirmed". Where audit 17 writes the same field,
  // it now writes this same text (audit-18.test.ts checks), so re-running either cannot revert the other.
  {
    slug: "connected-papers",
    finding: "Row listed Academic $3/mo; browser check: Academic $6/mo billed annually ($10 quarterly), Business $20/mo ($30 quarterly), Free 5 graphs a month",
    sources: ["https://www.connectedpapers.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free (5 graphs a month); Academic $6/mo billed annually or $10/mo billed quarterly; Business $20/mo billed annually or $30/mo billed quarterly; no monthly billing ${AS_OF}`,
      freeTierFeatures: `Free: 5 graphs a month ${AS_OF}`,
      usageLimits: `Free: 5 graphs a month; Academic and Business: unlimited graphs ${AS_OF}`,
    },
  },
  {
    slug: "paperpal",
    finding: "Row said \"Pro plans\" and listed a Premium plan; browser check: Prime $25/mo and Pro $59/mo billed monthly (annual prices on a limited-time offer), and the free plan's limits",
    sources: ["https://paperpal.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Prime $25/mo and Pro $59/mo billed monthly; annual billing currently on a limited-time discount ${AS_OF}`,
      freeTierFeatures: `Free: 200 grammar edits a month; 5 a day of paraphrase, trim, translate, AI Review and similar; 5 a day of Research Q&A; chat with 5 files a month; 300 MB library ${AS_OF}`,
      usageLimits: `Free: 200 grammar edits a month and 5 a day of the AI tools; Prime and Pro limits not confirmed ${AS_OF}`,
    },
  },
  {
    slug: "pabbly-connect",
    finding: "Row said \"From $25/mo\"; the browser check read lower USD prices but was partial, so the row names the plans without prices, and the free plan's monthly reset is not stated",
    sources: ["https://www.pabbly.com/connect/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free plan; Standard (10,000 tasks a month) and Unlimited, billed monthly to 3-yearly; one-time lifetime plans; USD prices not confirmed ${AS_OF}`,
      freeTierFeatures: `Free plan, no card: 100 tasks (a monthly reset is not stated), 2 workflows of up to 2 steps ${AS_OF}`,
    },
  },
  {
    slug: "litmaps",
    finding: "Free has 2 Litmaps (the row said 1 seed map); Pro Education $12.50/mo ($10 billed yearly), Commercial $50/mo ($40 yearly); Team has no listed price",
    sources: ["https://www.litmaps.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Pro Education $12.50/mo or $10/mo billed yearly (academic email required); Pro Commercial $50/mo or $40/mo billed yearly; Team quoted ${AS_OF}`,
      freeTierFeatures: `Free: 2 Litmaps of up to 100 articles each, up to 20 search inputs, monthly alerts ${AS_OF}`,
      usageLimits: `Free: 2 Litmaps, 100 articles per map, up to 20 search inputs, monthly alerts; Pro: unlimited maps and articles, advanced search; collaboration is on the Team plan ${AS_OF}`,
    },
  },
  {
    slug: "gpt-image-1-5-dall-e-successor",
    finding: "Row said 3 images a day on ChatGPT Free and linked chat.openai.com; OpenAI states no numeric image limits, and the product is at chatgpt.com",
    sources: ["https://chatgpt.com/pricing/", "https://help.openai.com/en/articles/9275245"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `ChatGPT Free includes limited image creation; OpenAI publishes no numeric image limit ${AS_OF}`,
      usageLimits: `ChatGPT: OpenAI publishes no numeric image limits for any plan; API: GPT Image 1.5 is deprecated, and GPT Image 2.5 is billed per token ($5 text in, $8 image in, $30 image out per 1M) ${AS_OF}`,
    },
    guarded: {
      website: { from: ["https://chat.openai.com"], to: "https://chatgpt.com" },
    },
  },
  {
    slug: "figma-ai",
    finding: "Adds the monthly price: only Professional can be billed monthly ($20 Full seat); Organization and Enterprise are billed annually only",
    sources: ["https://www.figma.com/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Included with Figma plans. Starter free; Full seat: Professional $16/mo billed annually or $20 monthly; Organization $55/mo and Enterprise $90/mo, billed annually only; each with monthly AI credits ${AS_OF}`,
    },
  },
  {
    slug: "meshy",
    finding: "Monthly prices confirmed; the yearly view conflicts with itself ($16 after a new-user discount vs \"$20 per month billed yearly\"), so the annual discount is dropped",
    sources: ["https://www.meshy.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free (100 credits/mo); billed monthly: Pro $20, Premium $40, Ultra $100, Studio $70 + $10/seat; Enterprise custom; yearly prices not confirmed (the pricing page conflicts with itself) ${AS_OF}`,
    },
  },
  {
    slug: "ludo-ai",
    finding: "No free plan on the pricing page (PAID stands) and no mention of 30 sign-up credits there, so they are dropped; monthly prices added (Indie $20, Pro $50, Studio $350)",
    sources: ["https://ludo.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No free plan. Billed monthly: Indie $20, Pro $50, Studio $350; billed yearly: Indie $15/mo, Pro $35/mo, Studio $300/mo; Enterprise custom ${AS_OF}`,
      freeTierFeatures: `No free plan: the pricing page lists only paid plans; sign-up credits are not stated there ${AS_OF}`,
      usageLimits: `Credits: Indie 250 a month (3,000 a year billed yearly), Pro 1,000 (12,000), Studio 10,000 (120,000); API, MCP and CLI use credits (API from Pro); unused credits roll over ${AS_OF}`,
    },
  },
  {
    slug: "mailchimp-ai",
    finding: "Essentials $13 and Standard $20 are regular prices after a 14-day free trial, not 12-month prices; only Premium has an intro price ($297.50 for 12 months, then $350)",
    sources: ["https://mailchimp.com/pricing/marketing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free $0; Essentials from $13/mo and Standard from $20/mo after a 14-day free trial; Premium $297.50/mo for 12 months, then $350; prices rise with contacts; generative AI from Standard ${AS_OF}`,
    },
  },
  {
    slug: "hubspot-ai",
    finding: "Row said only \"Included with HubSpot plans\"; Marketing Hub Starter is $7/seat/mo paid annually or $10 monthly (new customers), Professional $800/mo, Enterprise $3,600/mo, with 500 / 3,000 / 5,000 HubSpot credits",
    sources: ["https://www.hubspot.com/pricing/marketing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free CRM; Marketing Hub Starter $7/seat/mo paid annually or $10 monthly (new-customer offer; list $20), Professional $800/mo, Enterprise $3,600/mo ${AS_OF}`,
      usageLimits: `AI agents use HubSpot credits. Included: Marketing Hub Starter 500, Professional 3,000, Enterprise 5,000; more credits can be bought ${AS_OF}`,
    },
  },
  {
    slug: "groq",
    finding: "Adds the free tier's published limits (30 requests a minute, 1,000 a day, 8,000 tokens a minute, 200,000 a day on the GPT OSS and Qwen models)",
    sources: ["https://console.groq.com/docs/rate-limits"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits: `Free: per-model limits; GPT OSS 120B, GPT OSS 20B and Qwen3.8-27B each 30 requests a minute, 1,000 a day, 8,000 tokens a minute, 200,000 a day; Developer (pay as you go): higher limits ${AS_OF}`,
    },
  },
  {
    slug: "gumloop",
    finding: "privacyLevel was HIGH; Gumloop's privacy policy section 21 lets it train its models on self-serve content (Pro, Pro trials and free accounts), so LOW",
    sources: ["https://www.gumloop.com/privacy-policy"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { privacyLevel: { from: "HIGH", to: "LOW" } },
  },
  {
    slug: "replicate",
    finding: "Row promised free credits for some models; the billing docs say select models can be run free for a while, with no amount stated",
    sources: ["https://replicate.com/docs/topics/billing", "https://replicate.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `Select models can be run free for a while before billing setup is required; the amount is not stated ${AS_OF}`,
      usageLimits: `Pay as you go: most models billed per second of hardware, some per token or per output; free use on select models, amount not stated; no minimum spend stated ${AS_OF}`,
    },
  },
  {
    slug: "relevance-ai",
    finding: "The public pricing page shows only Enterprise (talk to sales, custom Actions and Vendor Credits); Pro and Team are not shown, so the row is Enterprise only with custom pricing",
    sources: ["https://relevanceai.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Enterprise only: custom pricing through sales; the public pricing page shows no Pro or Team plan ${AS_OF}`,
      freeTierFeatures: `No free plan: the Free plan is retired, and the public pricing page lists only Enterprise ${AS_OF}`,
      usageLimits: `Enterprise: custom Actions and custom Vendor Credits; amounts not stated ${AS_OF}`,
    },
    guarded: { costTier: { from: "PAID", to: "ENTERPRISE" } },
  },
  {
    slug: "reducto",
    finding: "Adds who gets the free $150 (first-time users from a domain that has not used it) and that its expiry is not stated",
    sources: ["https://reducto.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `$150 in free usage on the self-serve Standard plan for first-time users from a new domain; a one-time balance, not a monthly allowance; expiry not stated ${AS_OF}`,
    },
  },
  {
    slug: "sakana-ai",
    finding: "Sakana Chat's logged-out page states no pricing (the row said it was not checked)",
    sources: ["https://chat.sakana.ai/"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `The Fugu and Namazu pages list paid plans and per-token prices, with no free tier stated; Sakana Chat's logged-out page states no pricing ${AS_OF}`,
    },
  },
];

export type Audit18Row = Record<Audit18TextField, string | null> & {
  company: string | null;
  website: string | null;
  costTier: string;
  apiAvailable?: boolean;
  privacyLevel?: string | null;
};

/** Prisma `data` for one row: text fields that differ; guarded fields only from their expected old value. */
export function audit18PatchData(row: Audit18Row, patch: Audit18Patch): Record<string, string | boolean> {
  const data: Record<string, string | boolean> = {};
  for (const [field, value] of Object.entries(patch.fields) as [Audit18TextField, string][]) {
    if (row[field] !== value) data[field] = value;
  }
  const g = patch.guarded ?? {};
  if (g.company && row.company !== null && g.company.from.includes(row.company)) data.company = g.company.to;
  if (g.website && row.website !== null && g.website.from.includes(row.website)) data.website = g.website.to;
  if (g.costTier && row.costTier === g.costTier.from) data.costTier = g.costTier.to;
  if (g.apiAvailable && row.apiAvailable === g.apiAvailable.from) data.apiAvailable = g.apiAvailable.to;
  if (g.privacyLevel && row.privacyLevel === g.privacyLevel.from) data.privacyLevel = g.privacyLevel.to;
  return data;
}

/** Guarded fields left alone because the row holds neither the old nor the new value (a hand edit). */
export function audit18GuardSkips(row: Audit18Row, patch: Audit18Patch): string[] {
  const g = patch.guarded ?? {};
  const skips: string[] = [];
  if (g.company && row.company !== g.company.to && !(row.company !== null && g.company.from.includes(row.company))) skips.push("company");
  if (g.website && row.website !== g.website.to && !(row.website !== null && g.website.from.includes(row.website))) skips.push("website");
  if (g.costTier && row.costTier !== g.costTier.to && row.costTier !== g.costTier.from) skips.push("costTier");
  if (g.apiAvailable && row.apiAvailable !== g.apiAvailable.to && row.apiAvailable !== g.apiAvailable.from) skips.push("apiAvailable");
  if (g.privacyLevel && row.privacyLevel !== g.privacyLevel.to && row.privacyLevel !== g.privacyLevel.from) skips.push("privacyLevel");
  return skips;
}

export function audit18Slugs(): string[] {
  return AUDIT_18_PATCHES.map((p) => p.slug);
}

export { AS_OF };
