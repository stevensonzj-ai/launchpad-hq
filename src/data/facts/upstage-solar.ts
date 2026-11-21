import type { ToolFacts } from "./types";

/**
 * Upstage (Solar): first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on upstage.ai. Pay-as-you-go API plus prepaid
 * commitment plans; Solar Pro 4 and Solar Mini 4 are on the price list. One
 * reader also saw "$10 in free credit" on sign-up in the console docs; the
 * other did not read that page, so it is not recorded (Browser-check list).
 * The two readers read the data-use terms differently, so privacy is
 * unverified.
 */
export default {
  slug: "upstage-solar",
  lifecycle: "active",
  company: {
    value: "Upstage Co., Ltd.",
    note: "Seoul, Republic of Korea.",
    sourceUrl: "https://www.upstage.ai/terms-of-service",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Every Upstage Studio agent includes 10 free runs, with no credit card.",
    },
    sourceUrl: "https://www.upstage.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pay as you go",
        price: "Usage-based",
        period: "",
        limits: "Per token (Solar models) and per page (document APIs)",
      },
      {
        name: "Explore",
        price: "$100+",
        period: "month",
        limits: "Prepaid; +10% bonus credits (yearly: $1,200+ with +30%, capped at $360)",
      },
      {
        name: "Build",
        price: "$500+",
        period: "month",
        limits: "Prepaid; +15% bonus credits (yearly: $6,000+ with +35%, capped at $2,100)",
      },
      {
        name: "Scale",
        price: "$5,000+",
        period: "month",
        limits: "Prepaid; +20% bonus credits (yearly: $60,000+ with +40%, capped at $24,000)",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    note: "\"$\", as of 2026-10-29. Prices exclude 10% VAT.",
    sourceUrl: "https://www.upstage.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  apiPricing: {
    value: "Solar Pro 4: 0.30 input / 0.06 cached input / 1.20 output per 1M tokens. Solar Mini 4: 0.10 input per 1M tokens. Document Parse: 0.03 (Enhanced). Solar Pro 3 and Solar Pro 2 are marked end of service on 2026-10-30 (KST) and are not current rates. Rates are shown without a currency symbol.",
    note: "Read 2026-11-20. Mini cached and output rates, and Parse Standard, were not uniquely confirmed and are not repeated.",
    sourceUrl: "https://www.upstage.ai/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "Solar Pro 4 and Solar Mini 4 are on the price list alongside Solar Pro 3 and Pro 2.",
    ],
    sourceUrl: "https://www.upstage.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      policyUrl: "https://www.upstage.ai/privacy-policy",
    },
    note: "One reader read the terms (Art. 22) as \"shall not use Member Input/Output Data ... for training\", except data from free services; the other read the privacy policy's API logging for \"AI service quality improvement\" with no explicit training statement.",
    sourceUrl: "https://www.upstage.ai/terms-of-service",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: per-token Solar prices, $0.01-$0.03 per page Document Parse, prepaid plans from $100/mo, 10 free agent runs.",
    },
  ],
} satisfies ToolFacts;
