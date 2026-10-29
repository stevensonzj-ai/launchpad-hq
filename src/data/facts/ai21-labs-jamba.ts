import type { ToolFacts } from "./types";

/**
 * AI21 Labs (Jamba): first fact file, stale-facts batch 1 (catalog audit
 * 17), 2026-10-29. Pricing and privacy read twice on ai21.com. The hosted
 * API has a 7-day credit trial, then pay as you go; the Jamba open-weight
 * files are free to download and run yourself, which is the free tier
 * recorded here.
 */
export default {
  slug: "ai21-labs-jamba",
  lifecycle: "active",
  company: {
    value: "AI21 Labs",
    note: "Privacy policy: \"Our principal place of business is in Tel Aviv, Israel.\"",
    sourceUrl: "https://www.ai21.com/privacy-policy/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Jamba open-weight models are free to download and run yourself. The hosted API has no free plan: new accounts get a free trial of $10 in credits for 7 days, no card, then pay as you go.",
    },
    note: "Pricing page: \"Free Trial: $10 credits for 7 days.\" \"No credit card needed\". Open weights: Jamba docs (Jamba Open Model License; newer Jamba2 files under Apache 2.0 per the guide).",
    sourceUrl: "https://www.ai21.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pay As You Go",
        price: "Usage-based",
        period: "",
        limits: "Foundation model APIs and SDK; unlimited seats",
      },
      {
        name: "Custom",
        price: "Custom",
        period: "",
        limits: "Volume discounts; premium API rate limits; private cloud hosting; priority support",
      },
    ],
    note: "USD, as of 2026-10-29. No numeric rate limits are published.",
    sourceUrl: "https://www.ai21.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Per 1M tokens: Jamba Mini $0.2 input / $0.4 output; Jamba Large $2 input / $8 output.",
    sourceUrl: "https://www.ai21.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: false, policyUrl: "https://www.ai21.com/privacy-policy/" },
    note: "Policy last updated August 2, 2026: \"we do not use your inputs or outputs to train AI21's foundational or generally available AI models\", with exceptions for written agreements and service delivery.",
    sourceUrl: "https://www.ai21.com/privacy-policy/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: hosted API is a 7-day $10 credit trial, then pay as you go (Jamba Mini $0.2/$0.4, Large $2/$8 per 1M tokens); open weights stay free. Replaces \"Free tier; Jamba Mini free tier\".",
    },
  ],
} satisfies ToolFacts;
