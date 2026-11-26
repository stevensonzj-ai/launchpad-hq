import type { ToolFacts } from "./types";

const SITE_URL = "https://longcat.ai/";
const BLOG_URL = "https://longcat.ai/blog/longcat-2.5/";
const PRICING_URL = "https://longcat.ai/platform/docs/pricing/longcat-2.5";
const VERCEL_MODEL_URL = "https://vercel.com/ai-gateway/models/longcat-2.5";
const VERCEL_CHANGELOG_URL = "https://vercel.com/changelog/longcat-2-5-now-available-on-ai-gateway";

/**
 * LongCat 2.5 (new catalog row, X-watch 2026-11-05).
 * Gathered 2026-11-05 from LongCat's blog and pricing docs and Vercel's AI
 * Gateway model page and changelog.
 *
 * Pricing is the `apiPricing` block below and nowhere else. The listed rates
 * are a limited-time discount, not a permanent price. An OpenRouter listing
 * for 2.5 is absent or unverified (only older LongCat models may be there).
 */
export default {
  slug: "longcat-2-5",
  lifecycle: "active",
  officialUrl: {
    value: SITE_URL,
    sourceUrl: SITE_URL,
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  company: {
    value: "Meituan",
    sourceUrl: BLOG_URL,
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "The LongCat 2.5 pricing page states no free API tier. The LongCat Chat homepage does not say whether 2.5 is free.",
    },
    note: "Read 2026-11-23 at the pricing page and https://longcat.chat/. Older changelog lines say some earlier models can be used for free in LongCat Chat. Those lines are not about 2.5, so this fact stays unverified.",
    sourceUrl: PRICING_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-11-23",
    gatheredBy: "claude",
    status: "unverified",
  },
  apiPricing: {
    value:
      "Pay-as-you-go, per 1M tokens: $0.30 input, $0.006 cached input, $1.20 output (also ¥2 / ¥0.04 / ¥8). The pricing page labels these a limited-time discount and does not state an end date or a post-discount price.",
    note: "LongCat pricing page, re-read 2026-11-26. Vercel AI Gateway was not re-read, so the earlier gateway sentence is not repeated.",
    sourceUrl: PRICING_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-11-26",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  platforms: {
    value: ["API (LongCat API Platform)", "API (Vercel AI Gateway, meituan/longcat-2.5)"],
    note: "As of 2026-11-05. An OpenRouter listing for 2.5 is absent or unverified. Vercel: " + VERCEL_CHANGELOG_URL,
    sourceUrl: VERCEL_MODEL_URL,
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  features: {
    value: [
      "About 1.6T-parameter multimodal model.",
      "About 1M-token context (1,048,576 tokens), with a maximum output of 131,072 tokens per Vercel.",
      "Compatible with Claude Code, Codex and Hermes.",
    ],
    note: "LongCat blog and Vercel AI Gateway model page, as of 2026-11-05. Blog: " + BLOG_URL,
    sourceUrl: VERCEL_MODEL_URL,
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "apiPricing",
      summary:
        "Pricing page re-read. Rates unchanged at $0.30 / $0.006 / $1.20 and ¥2 / ¥0.04 / ¥8 per 1M, still labeled limited-time, still with no end date.",
    },
    {
      date: "2026-11-23",
      field: "apiPricing",
      summary:
        "Rates re-read and unchanged at $0.30 / $0.006 / $1.20 per 1M. The page still labels them limited-time and still states no end date and no post-discount price. Chat access to 2.5 stays unverified.",
    },
    {
      date: "2026-11-05",
      field: "apiPricing",
      summary:
        "First fact file (new catalog row, X-watch 2026-11-05). Limited-time discounted pay-as-you-go API rates of $0.30 / $0.006 / $1.20 per 1M; free chat access unverified.",
    },
  ],
} satisfies ToolFacts;
