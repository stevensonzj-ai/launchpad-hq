import type { ToolFacts } from "./types";

/**
 * Speak: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * No permanent free plan: a 7-day free trial, then a paid subscription.
 * The row moves from FREEMIUM to PAID. The US web offer shows Premium
 * at $99.99 a year and Premium Plus at $234.99 a year, both promotional;
 * no monthly price is shown and Speak says prices vary by region. Speak
 * now teaches several languages, not only English. The privacy notice
 * uses audio and personal data to train its AI, with no opt-out stated,
 * so privacyLevel moves from HIGH to LOW.
 */
export default {
  slug: "speak-language-ai",
  lifecycle: "active",
  company: {
    value: "Speakeasy Labs, Inc.",
    sourceUrl: "https://www.speak.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan: a 7-day free trial, then a paid subscription.",
    },
    note: "\"Speak offers a 7-day free trial so you can explore the app before your subscription begins.\"",
    sourceUrl: "https://www.speak.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Premium",
        price: "$99.99",
        period: "year",
        limits: "Promotional US web price (struck through from $249.98)",
      },
      {
        name: "Premium Plus",
        price: "$234.99",
        period: "year",
        limits: "Limited-time promotion (struck through from $587.48)",
      },
    ],
    note: "USD, US offer page, as of 2026-10-29. \"Pricing varies by plan, region, and any current promotions, so the most accurate pricing is always within the app.\" No monthly price shown.",
    sourceUrl: "https://www.speak.com/us/getstarted",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://www.speak.com/privacy",
    },
    note: "Privacy notice (last updated 06/05/2026): audio is used to \"develop, create, improve, optimize, maintain, and otherwise enhance its automatic speech recognition\"; uses include \"training and refining automated tools leveraging AI\". No AI-training opt-out is stated beyond turning off microphone access and the EU/UK right to object.",
    sourceUrl: "https://www.speak.com/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "For English speakers Speak teaches Spanish, French, Korean, Japanese, Italian and Mandarin Chinese, as well as English for other speakers.",
    ],
    sourceUrl: "https://www.speak.com/",
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
      summary: "First fact file: 7-day trial, no free plan (FREEMIUM -> PAID); Premium $99.99/yr promo; trains on audio (privacy HIGH -> LOW).",
    },
  ],
} satisfies ToolFacts;
