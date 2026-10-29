/**
 * Catalog audit #17 — stale facts, batch 1, 2026-10-29. UPDATE-only, keyed
 * by slug. Patch data and pure diff logic for scripts/update-catalog-audit-17.ts
 * (the DB runner lives there).
 *
 * Batch 1 is the 28 oldest rows with no sourced fact file (selection and
 * order: docs/planning/2026-10-autonomous-business/stale-facts-batches.md).
 * Each was read on the vendor's own pages on 2026-10-29 and re-read by a
 * second reader; the sourced facts are in src/data/facts/<slug>.ts. A row is
 * patched here only for facts both readers saw. Facts a page did not show
 * (blocked, or rendered only in a browser) are left as the row has them and
 * listed in REVIEW-SUMMARY.md under "Browser-check list".
 *
 *   - fields: text set to exactly this value, written only where it differs;
 *   - guarded: company, website, costTier and apiAvailable change only while
 *     the row still holds the expected old value, so a hand edit is never
 *     overwritten.
 *
 * None of these slugs appears in audits 10 or 11 (audit-17.test.ts checks
 * it), so a re-run of those audits cannot revert this one. Text never says
 * "official" (audit 10's wording pass rewrites text that does). No affiliate
 * or sponsor links.
 *
 * Never deletes or creates rows; never changes slug, name or categoryId.
 * Kept free of Prisma and dotenv so it typechecks with the app and can be
 * unit-tested (audit-17.test.ts).
 */

export const CHECKED_AT = "2026-10-29";
const AS_OF = `(as of ${CHECKED_AT})`;

export type Audit17TextField = "primaryUse" | "currentPricing" | "freeTierFeatures" | "usageLimits";

export type Audit17Guarded = {
  company?: { from: string[]; to: string };
  website?: { from: string[]; to: string };
  costTier?: { from: string; to: string };
  apiAvailable?: { from: boolean; to: boolean };
};

export type Audit17Patch = {
  slug: string;
  finding: string;
  sources: string[];
  checkedAt: string;
  fields: Partial<Record<Audit17TextField, string>>;
  guarded?: Audit17Guarded;
};

/** Batch 1, in tracker order (oldest first). Every slug has a fact file; rows with nothing to patch have no entry below. */
export const AUDIT_17_BATCH = [
  "ai21-labs-jamba",
  "connected-papers",
  "consensus",
  "docsumo",
  "figma-ai",
  "fireworks-ai",
  "gpt-image-1-5-dall-e-successor",
  "gpt4all",
  "groq",
  "gumloop",
  "hubspot-ai",
  "hugging-face",
  "jan",
  "litmaps",
  "llama-cpp",
  "lm-studio",
  "localai",
  "ludo-ai",
  "mailchimp-ai",
  "meshy",
  "nanonets",
  "pabbly-connect",
  "paperpal",
  "reducto",
  "relevance-ai",
  "replicate",
  "research-rabbit",
  "sakana-ai",
];

export const AUDIT_17_PATCHES: Audit17Patch[] = [
  {
    slug: "ai21-labs-jamba",
    finding: "Row was FREE with a \"Jamba Mini free tier\"; the hosted API is a 7-day $10 credit trial, then pay as you go (open weights stay free to run)",
    sources: ["https://www.ai21.com/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Open weights free to run yourself. Hosted API: 7-day trial with $10 in credits, then pay as you go (Jamba Mini $0.2 / $0.4, Jamba Large $2 / $8 per 1M input / output tokens); Custom plan quoted ${AS_OF}`,
      freeTierFeatures: `Jamba open-weight models are free to download and run yourself; the hosted API has a 7-day trial with $10 in credits, no card ${AS_OF}`,
      usageLimits: `Hosted API: usage-based billing after the trial; numeric rate limits not published; Custom plan adds premium rate limits ${AS_OF}`,
    },
    guarded: {
      website: { from: ["https://ai21.com"], to: "https://www.ai21.com" },
      costTier: { from: "FREE", to: "FREEMIUM" },
    },
  },
  {
    slug: "consensus",
    finding: "Row listed Premium $8.99/mo and unlimited free use; Pro is $20/mo ($144/yr), Deep $65/mo, and Free caps Pro messages and Deep reviews",
    sources: ["https://intercom.help/consensus-d118a252369c/en/articles/10087865-subscription-plans"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; Pro $20/mo or $144/yr; Deep $65/mo or $540/yr; Teams and Enterprise custom ${AS_OF}`,
      freeTierFeatures: `Free: unlimited Papers searches; 10 Pro messages, 3 Deep reviews and 10 Study Snapshots a month; 30 API and MCP calls a month ${AS_OF}`,
      usageLimits: `Free: 10 Pro messages and 3 Deep reviews a month; Pro: unlimited Pro messages, 15 Deep reviews a month; Deep: 200 Deep reviews a month; Teams: 50 Deep reviews per user a month ${AS_OF}`,
    },
  },
  {
    slug: "docsumo",
    finding: "Row was FREE with 100 free pages a month and Growth / Business page tiers; there is a 14-day trial of up to 1,000 pages, then Business / Enterprise quotes",
    sources: ["https://www.docsumo.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No free plan. 14-day free trial (up to 1,000 pages), then Business or Enterprise, quoted on volume ${AS_OF}`,
      freeTierFeatures: `No free plan: a 14-day free trial covers up to 1,000 pages and 10 user licences ${AS_OF}`,
      usageLimits: `Trial: up to 1,000 pages over 14 days; Business and Enterprise: quoted on volume, credits reset monthly and do not roll over ${AS_OF}`,
    },
    guarded: {
      website: { from: ["https://docsumo.com"], to: "https://www.docsumo.com" },
      costTier: { from: "FREE", to: "PAID" },
    },
  },
  {
    slug: "figma-ai",
    finding: "Row said limited free AI and Professional unlimited; Starter has 150 AI credits a day (500 a month), and each paid Full seat has a monthly AI credit allowance",
    sources: ["https://www.figma.com/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Included with Figma plans. Starter free; Full seat billed annually $16/mo Professional, $55/mo Organization, $90/mo Enterprise, each with monthly AI credits ${AS_OF}`,
      freeTierFeatures: `Starter (free): 150 AI credits a day, up to 500 a month; one team, one folder, 3 files ${AS_OF}`,
      usageLimits: `AI credits a month per Full seat: Starter 500, Professional 3,000, Organization 3,500, Enterprise 4,250; Dev and Collab seats 500; extra credits can be bought ${AS_OF}`,
    },
  },
  {
    slug: "fireworks-ai",
    finding: "Row promised a generous free tier and a $1 sign-up credit; billing is prepaid and usage-based, and accounts without credits are limited to 10 requests a minute",
    sources: ["https://fireworks.ai/pricing", "https://docs.fireworks.ai/guides/quotas_usage/rate-limits"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No free plan: prepaid, usage-based billing per token (serverless) or per GPU hour (on-demand) ${AS_OF}`,
      freeTierFeatures: `No free plan: billing is prepaid. Without a payment method and credits, an account is limited to 10 requests a minute ${AS_OF}`,
      usageLimits: `10 requests a minute without a payment method or credits; up to 6,000 a minute with them; higher spend tiers raise limits ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "gpt-image-1-5-dall-e-successor",
    finding: "Row said the API bills per image; GPT Image 1.5 is deprecated in OpenAI's API docs, and its successor GPT Image 2.5 bills per token. ChatGPT limits not confirmed (left as is)",
    sources: ["https://developers.openai.com/api/docs/models/gpt-image-1.5", "https://developers.openai.com/api/docs/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      usageLimits: `ChatGPT: free and paid image limits not re-checked (OpenAI's pricing page did not load); API: GPT Image 1.5 is deprecated, and GPT Image 2.5 is billed per token ($5 text in, $8 image in, $30 image out per 1M) ${AS_OF}`,
    },
  },
  {
    slug: "gpt4all",
    finding: "gpt4all.io now redirects to nomic.ai/gpt4all; newest release February 2025",
    sources: ["https://www.nomic.ai/gpt4all", "https://github.com/nomic-ai/gpt4all"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { website: { from: ["https://gpt4all.io"], to: "https://www.nomic.ai/gpt4all" } },
  },
  {
    slug: "jan",
    finding: "Row's company was \"Open Source (Apache 2.0)\"; jan.ai names Menlo Research as the maker",
    sources: ["https://jan.ai/"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { company: { from: ["Open Source (Apache 2.0)"], to: "Menlo Research" } },
  },
  {
    slug: "llama-cpp",
    finding: "Repository moved to ggml-org/llama.cpp; ggml.ai says it was acquired by Hugging Face in 2026",
    sources: ["https://github.com/ggml-org/llama.cpp", "https://ggml.ai/"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: {
      company: { from: ["Open Source (Georgi Gerganov)"], to: "ggml.ai (Hugging Face)" },
      website: { from: ["https://github.com/ggerganov/llama.cpp"], to: "https://github.com/ggml-org/llama.cpp" },
    },
  },
  {
    slug: "lm-studio",
    finding: "Row was FREE with all features included and a separate business licence; the local app is free including for work, and paid plans Bionic+ ($20/mo) and Pro ($100/mo) add cloud features",
    sources: ["https://lmstudio.ai/pricing", "https://lmstudio.ai/app-terms"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free local app; Bionic+ $20/mo and Pro $100/mo add cloud features (hosted open models, web search) ${AS_OF}`,
      freeTierFeatures: `Free, including for work: local models (llama.cpp and MLX), the Bionic agent, offline voice transcription, LM Link for up to 5 devices, limited web search ${AS_OF}`,
      usageLimits: `Local use: limited only by your hardware. Cloud features: an allowance per plan (Pro has 5x Bionic+), with cloud credits beyond it ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "litmaps",
    finding: "Row put team features on Pro; collaboration is the separate Team plan, and Pro's $10/mo is the education rate billed yearly",
    sources: ["https://www.litmaps.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free tier; Pro from $10/mo (education rate, billed yearly; academic email required); Team and Enterprise quoted ${AS_OF}`,
      usageLimits: `Free: 100 articles per map, up to 20 search inputs, monthly alerts; Pro: unlimited maps and articles, advanced search; collaboration is on the Team plan ${AS_OF}`,
    },
  },
  {
    slug: "groq",
    finding: "Row called the $0 tier \"Developer\" and was FREE-only; Developer is the paid pay-as-you-go tier, beside a Free tier",
    sources: ["https://console.groq.com/docs/billing-faqs", "https://console.groq.com/docs/rate-limits"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free tier; Developer tier pay as you go, priced per 1M tokens by model ${AS_OF}`,
      freeTierFeatures: `Free tier with per-model rate limits on requests and tokens; the paid Developer tier is pay as you go and needs a payment method ${AS_OF}`,
      usageLimits: `Free: per-model limits on requests and tokens per minute and per day; Developer (pay as you go): higher limits ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "gumloop",
    finding: "Row listed a free plan with 2,000 credits and Solo $25 / Team $100; there is no free plan, only a 14-day Pro trial, and Pro is $37/mo",
    sources: ["https://www.gumloop.com/pricing", "https://docs.gumloop.com/core-concepts/credits"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No free plan. Pro $37/mo (20,000 credits a month including bonus credits; 14-day trial, card required); Enterprise custom ${AS_OF}`,
      freeTierFeatures: `No free plan: Pro starts with a 14-day free trial, which needs a card and converts to paid unless cancelled ${AS_OF}`,
      usageLimits: `Pro: 20,000 credits a month, no rollover; agents stop at the limit unless pay as you go is turned on; Enterprise: custom credits with rollover ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "PAID" } },
  },
  {
    slug: "hubspot-ai",
    finding: "Row said the free CRM is free for up to 5 users and named ChatSpot; the free CRM is up to two users and ChatSpot is now Breeze Assistant",
    sources: ["https://www.hubspot.com/products/crm", "https://www.hubspot.com/products/artificial-intelligence/breeze-ai-assistant"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `Free CRM for up to two users and 1,000 contacts, with no expiry; Breeze Assistant is included ${AS_OF}`,
      usageLimits: `AI agents use HubSpot credits; paid tiers include a monthly credit allowance and more credits can be bought. Plan prices and credit amounts: see hubspot.com/pricing ${AS_OF}`,
    },
  },
  {
    slug: "hugging-face",
    finding: "Row listed Enterprise as custom and a rate-limited free Inference API; Team is $20 and Enterprise $50 per user a month, and free accounts get no monthly inference credits",
    sources: ["https://huggingface.co/pricing", "https://huggingface.co/docs/inference-providers/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; PRO $9/mo; Team $20/user/mo; Enterprise $50/user/mo; compute (Spaces hardware, Inference Endpoints) billed by usage ${AS_OF}`,
      freeTierFeatures: `Free: public models and datasets, CPU Basic and ZeroGPU Spaces, community features; no monthly inference credits ${AS_OF}`,
      usageLimits: `Free: no monthly Inference Providers credits (buy credits to use them); PRO: $2 of inference credits a month and 8x ZeroGPU quota; Team and Enterprise: $2 of credits per seat ${AS_OF}`,
    },
  },
  {
    slug: "ludo-ai",
    finding: "Row listed a free tier with daily ideas, Pro $16/mo and a Teams plan; the pricing page has no free plan (30 sign-up credits), Indie $15, Pro $35 and Studio $300 a month billed yearly",
    sources: ["https://ludo.ai/pricing", "https://ludo.ai/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No free plan; 30 free credits at sign-up. Billed yearly: Indie $15/mo, Pro $35/mo, Studio $300/mo; Enterprise custom ${AS_OF}`,
      freeTierFeatures: `No free plan: sign-up gives 30 free credits, no card ${AS_OF}`,
      usageLimits: `Credits a year: Indie 3,000, Pro 12,000, Studio 120,000; API, MCP and CLI use credits (API from Pro); unused credits roll over while subscribed ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREEMIUM", to: "PAID" } },
  },
  {
    slug: "mailchimp-ai",
    finding: "Row said the free plan has basic AI, 500 contacts and 1,000 emails, and Essentials adds AI; Free is 250 contacts and 500 emails a month, and generative AI starts at Standard",
    sources: ["https://mailchimp.com/pricing/marketing/"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free $0; Essentials $13/mo; Standard $20/mo; Premium $350/mo (paid prices shown for the first 12 months); generative AI from Standard ${AS_OF}`,
      freeTierFeatures: `Free: 250 contacts, 500 emails a month (250 a day); generative AI features not included ${AS_OF}`,
      usageLimits: `Free: 250 contacts, 500 emails/mo; Essentials: no generative AI; Standard: generative AI, up to 6,000 emails/mo; Premium: up to 150,000 emails/mo ${AS_OF}`,
    },
  },
  {
    slug: "meshy",
    finding: "Row listed 5 free credits a day, Pro 200 credits, a Max plan and an unlimited plan; Free is 100 credits a month, Pro 1,000, and the tiers are Premium, Ultra and Studio",
    sources: ["https://www.meshy.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free (100 credits/mo); Pro $20/mo; Premium $40/mo; Ultra $100/mo; Studio $70/mo + $10/seat; Enterprise custom; 20% off annual plans ${AS_OF}`,
      freeTierFeatures: `Free, no card: 100 credits a month, up to 10 assets, CC BY 4.0 outputs, no API ${AS_OF}`,
      usageLimits: `Credits a month: Free 100, Pro 1,000, Premium 3,000, Ultra 8,000, Studio 5,500 shared; credits reset monthly and do not accumulate ${AS_OF}`,
    },
  },
  {
    slug: "nanonets",
    finding: "Row listed 500 free pages a month and Pro $499/mo; pricing is now $50 in free credits, Starter $100/mo for 100 credits, and per-run rates",
    sources: ["https://nanonets.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `$50 in free credits (no card), then Starter $100/mo for 100 credits; Growth and Enterprise quoted; billed per block run ($0.02 / $0.10 / $0.30) ${AS_OF}`,
      freeTierFeatures: `$50 in free credits, no card; credits never expire ${AS_OF}`,
      usageLimits: `Billed per block run: simple $0.02, standard AI $0.10, complex AI $0.30; credits never expire; Growth: volume discounts ${AS_OF}`,
    },
  },
  {
    slug: "pabbly-connect",
    finding: "Row called the 100 tasks a free trial and named Starter / Rookie / Pro / Advanced tiers; it is a free plan, and the plans are Free, Standard (10,000 tasks), Unlimited and lifetime plans. USD prices not confirmed (left as is)",
    sources: ["https://www.pabbly.com/connect/pricing/"],
    checkedAt: CHECKED_AT,
    fields: {
      freeTierFeatures: `Free plan, no card: 100 tasks, 2 workflows of up to 2 steps ${AS_OF}`,
      usageLimits: `Free: 100 tasks; Standard: 10,000 tasks a month; Unlimited: unlimited tasks; lifetime (one-time) plans with 3,000, 10,000 or 20,000 tasks a month ${AS_OF}`,
    },
  },
  {
    slug: "reducto",
    finding: "Row was FREE with 200 free pages a month and Starter / Pro tiers; Standard is pay as you go after $150 in free usage, and Growth / Enterprise are custom",
    sources: ["https://reducto.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Standard: pay as you go after $150 in free usage (Parse $10, Extract $20, Split $20 per 1,000 pages); Growth and Enterprise custom ${AS_OF}`,
      freeTierFeatures: `$150 in free usage on the self-serve Standard plan, a one-time balance rather than a monthly allowance ${AS_OF}`,
      usageLimits: `Standard: list rates per 1,000 pages after the free $150, up to 5 Studio seats; Growth: unlimited seats, zero data retention and HIPAA BAA; Enterprise: VPC or on-premises ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
  {
    slug: "relevance-ai",
    finding: "Row was FREE with 100 credits a day; the Free plan is retired, Pro is $29/mo ($19 yearly) and Team $349/mo ($234 yearly)",
    sources: ["https://relevanceai.com/docs/get-started/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `No free plan. Pro $29/mo ($19/mo billed yearly); Team $349/mo ($234/mo billed yearly); Enterprise custom ${AS_OF}`,
      freeTierFeatures: `No free plan: the Free plan is retired for new and existing accounts ${AS_OF}`,
      usageLimits: `Pro: 2,500 Actions and $20 of Vendor Credits a month; Team: 7,000 Actions and $70 of Vendor Credits a month; Enterprise: custom ${AS_OF}`,
    },
    guarded: { costTier: { from: "FREE", to: "PAID" } },
  },
  {
    slug: "replicate",
    finding: "Row said pricing is per second of compute only; most models bill by run time, and some per token or per output",
    sources: ["https://replicate.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Pay as you go: most models are billed by run time, per second of hardware; some are billed per token or per output ${AS_OF}`,
    },
  },
  {
    slug: "research-rabbit",
    finding: "Row said completely free with no limits; Free caps seed articles at 50 and a paid RR+ plan exists. Owned by Litmap Limited",
    sources: ["https://www.researchrabbit.ai/pricing"],
    checkedAt: CHECKED_AT,
    fields: {
      currentPricing: `Free; RR+ $12.50/mo or $10/mo billed yearly; Institution custom ${AS_OF}`,
      freeTierFeatures: `Free forever: unlimited searches, library and collections, sharing, up to 50 seed articles ${AS_OF}`,
      usageLimits: `Free: up to 50 seed articles; RR+: up to 300 seed articles, multiple projects, Signals alerts ${AS_OF}`,
    },
    guarded: {
      company: { from: ["Research Rabbit"], to: "Litmap Limited" },
      costTier: { from: "FREE", to: "FREEMIUM" },
    },
  },
  {
    slug: "sakana-ai",
    finding: "Row said no consumer product and an API in development; Fugu subscriptions and the Fugu and Namazu APIs are live with published prices",
    sources: ["https://sakana.ai/fugu/", "https://sakana.ai/namazu/"],
    checkedAt: CHECKED_AT,
    fields: {
      primaryUse: "Japanese AI lab: Fugu multi-model API and subscriptions, Namazu Japanese LLM API",
      currentPricing: `Fugu subscriptions $20 / $100 / $200 a month; Fugu and Namazu APIs priced per 1M tokens; not available in the EU/EEA ${AS_OF}`,
      freeTierFeatures: `The Fugu and Namazu pages list paid plans and per-token prices, with no free tier stated; Sakana Chat's pricing was not checked ${AS_OF}`,
      usageLimits: `Fugu Pro: 10x Standard usage; Fugu Max: 20x; APIs billed per 1M tokens ${AS_OF}`,
    },
    guarded: { apiAvailable: { from: false, to: true } },
  },
  {
    slug: "paperpal",
    finding: "Row was FREE while its own text lists paid Pro plans; Prime and Pro are paid plans beside a free plan. Prices and plan limits not confirmed (left as is)",
    sources: ["https://paperpal.com/pricing"],
    checkedAt: CHECKED_AT,
    fields: {},
    guarded: { costTier: { from: "FREE", to: "FREEMIUM" } },
  },
];

export type Audit17Row = Record<Audit17TextField, string | null> & {
  company: string | null;
  website: string | null;
  costTier: string;
  apiAvailable?: boolean;
};

/** Prisma `data` for one row: text fields that differ; guarded fields only from their expected old value. */
export function audit17PatchData(row: Audit17Row, patch: Audit17Patch): Record<string, string | boolean> {
  const data: Record<string, string | boolean> = {};
  for (const [field, value] of Object.entries(patch.fields) as [Audit17TextField, string][]) {
    if (row[field] !== value) data[field] = value;
  }
  const g = patch.guarded ?? {};
  if (g.company && row.company !== null && g.company.from.includes(row.company)) data.company = g.company.to;
  if (g.website && row.website !== null && g.website.from.includes(row.website)) data.website = g.website.to;
  if (g.costTier && row.costTier === g.costTier.from) data.costTier = g.costTier.to;
  if (g.apiAvailable && row.apiAvailable === g.apiAvailable.from) data.apiAvailable = g.apiAvailable.to;
  return data;
}

/** Guarded fields left alone because the row holds neither the old nor the new value (a hand edit). */
export function audit17GuardSkips(row: Audit17Row, patch: Audit17Patch): string[] {
  const g = patch.guarded ?? {};
  const skips: string[] = [];
  if (g.company && row.company !== g.company.to && !(row.company !== null && g.company.from.includes(row.company))) skips.push("company");
  if (g.website && row.website !== g.website.to && !(row.website !== null && g.website.from.includes(row.website))) skips.push("website");
  if (g.costTier && row.costTier !== g.costTier.to && row.costTier !== g.costTier.from) skips.push("costTier");
  if (g.apiAvailable && row.apiAvailable !== g.apiAvailable.to && row.apiAvailable !== g.apiAvailable.from) skips.push("apiAvailable");
  return skips;
}

export function audit17Slugs(): string[] {
  return AUDIT_17_PATCHES.map((p) => p.slug);
}

export { AS_OF };
