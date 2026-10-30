import type { ToolFacts } from "./types";

/**
 * Salesforce Einstein: first fact file, stale-facts batch 2 (catalog audit
 * 18), 2026-10-29. Read twice on salesforce.com. The salesforce.com/einstein
 * address now shows Salesforce's "AIforce" AI page (Einstein is no longer
 * named there); Agentforce is the agent product. The row's "Einstein 1 from
 * $500/mo" edition is not on the pricing pages ($500 is the price of 100,000
 * Flex Credits). One reader saw /einstein redirect to
 * /artificial-intelligence/, the other could not tell, so the row's website
 * is left alone. Cost tier stays ENTERPRISE (judgment call,
 * REVIEW-SUMMARY.md).
 */
/*
 * Catalog audit 22 (2026-10-30): slug moved from salesforce-einstein to salesforce-agentforce and the listing
 * renamed Salesforce Agentforce (301 in src/lib/catalog-redirects.ts; DB row renamed by
 * scripts/update-catalog-audit-22.ts). https://www.salesforce.com/agentforce/ checked 2026-10-30.
 */
export default {
  slug: "salesforce-agentforce",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Salesforce now sells its AI assistant and agents as Agentforce (formerly Einstein Copilot); its Einstein page now redirects to Salesforce's AI page.",
      formerName: "Salesforce Einstein",
      whatToDo: "Nothing changes for existing users. Old Salesforce Einstein pages here redirect to this one.",
    },
    sourceUrl: "https://www.salesforce.com/agentforce/",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  displayName: {
    value: "Salesforce Agentforce",
    sourceUrl: "https://www.salesforce.com/agentforce/",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  officialUrl: {
    value: "https://www.salesforce.com/agentforce/",
    sourceUrl: "https://www.salesforce.com/agentforce/",
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  company: {
    value: "Salesforce",
    note: "The page is now titled \"AIforce: Salesforce AI, Wherever You Already Work | Salesforce\".",
    sourceUrl: "https://www.salesforce.com/einstein/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Salesforce Foundations is listed at $0 (\"Get started with Agentforce for free\"), with Agentforce Builder and Prompt Builder. What it requires and its usage limits are not stated.",
    },
    sourceUrl: "https://www.salesforce.com/agentforce/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Sales Cloud Starter Suite",
        price: "$25",
        period: "user/month",
        limits: "Billed monthly or annually",
      },
      {
        name: "Sales Cloud Pro Suite",
        price: "$100",
        period: "user/month",
        limits: "Billed annually",
      },
      {
        name: "Sales Cloud Core",
        price: "$195",
        period: "user/month",
        limits: "Billed annually; built-in AI and Agentforce skills (\"AI can be added to Core and above\")",
      },
      {
        name: "Sales Cloud Advanced",
        price: "$395",
        period: "user/month",
        limits: "Billed annually; more AI",
      },
      {
        name: "Sales Cloud Max",
        price: "$550",
        period: "user/month",
        limits: "Billed annually; full AI suite with Agentforce and 2.75M Flex Credits per org a year",
      },
    ],
    note: "USD, as of 2026-10-29. Salesforce says the prices are for information only and subject to change. A $0 Free Suite also appears in the comparison table, with no details.",
    sourceUrl: "https://www.salesforce.com/sales/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Agentforce: add-ons $125 per user/month ($150 for Industries); Agentforce User License $5 per user/month plus Flex Credits; Flex Credits $500 per 100,000 (pay per action); customer-facing conversations $2 each.",
    sourceUrl: "https://www.salesforce.com/agentforce/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "The salesforce.com/einstein page is now branded AIforce and no longer names Einstein; Agentforce is Salesforce's AI agent product.",
    ],
    sourceUrl: "https://www.salesforce.com/einstein/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://www.salesforce.com/artificial-intelligence/trusted-ai/",
    },
    note: "\"prompts and generated responses are never stored or used to train the underlying third-party large language models\".",
    sourceUrl: "https://www.salesforce.com/artificial-intelligence/trusted-ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "displayName",
      summary: "Renamed Salesforce Einstein -> Salesforce Agentforce; slug salesforce-einstein -> salesforce-agentforce; official link https://www.salesforce.com/agentforce/.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: Sales Cloud Starter $25 to Max $550 per user/month, Agentforce add-ons $125, Flex Credits $500 per 100,000. Replaces \"Einstein 1 from $500/mo\".",
    },
  ],
} satisfies ToolFacts;
