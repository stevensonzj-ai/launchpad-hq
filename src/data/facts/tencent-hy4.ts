import type { ToolFacts } from "./types";

const PRESS_URL = "https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/";
const OPENROUTER_URL = "https://openrouter.ai/tencent/hy4";

/**
 * Tencent Hy4 (new catalog row, X-watch 2026-11-05).
 * Gathered 2026-11-05 from Tencent's launch post and the OpenRouter model page.
 *
 * Pricing is the `apiPricing` block below and nowhere else. Hy4 is an API
 * model, so there is no consumer plan table. Tencent says weights and system
 * cards are coming; as of 2026-11-05 that is a stated plan, not a release.
 */
export default {
  slug: "tencent-hy4",
  lifecycle: "active",
  officialUrl: {
    value: OPENROUTER_URL,
    note: "OpenRouter model page used as the durable product URL; Tencent's launch post is " + PRESS_URL,
    sourceUrl: OPENROUTER_URL,
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  company: {
    value: "Tencent",
    sourceUrl: PRESS_URL,
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
        "No free API tier is stated. WorkBuddy and CodeBuddy, Tencent's apps that use Hy4, are free from 2026-11-04 through 2026-11-15; the API itself is paid per token.",
    },
    note: "Tencent's launch post, as of 2026-11-05. The free window is a limited-time promotion and ends 2026-11-15.",
    sourceUrl: PRESS_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  apiPricing: {
    value:
      "Per 1M tokens, Tencent Cloud TokenHub list: about $0.90 input, $2.70 output, $0.045 cached input; TokenHub shows 50% off through 2026-12-31. OpenRouter (tencent/hy4) showed the discounted Tencent Cloud rates of $0.417 input, $1.251 output, $0.021 cached input.",
    note: "As of 2026-11-05. Promotional pricing ends 2026-12-31 on TokenHub. Rates change; confirm on the provider page before buying.",
    sourceUrl: OPENROUTER_URL,
    sourceKind: "product-page",
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  platforms: {
    value: ["API (Tencent Cloud TokenHub)", "API (OpenRouter, tencent/hy4)", "WorkBuddy", "CodeBuddy"],
    note: "Tencent's launch post and the OpenRouter listing, as of 2026-11-05.",
    sourceUrl: PRESS_URL,
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  features: {
    value: [
      "Multimodal model with vision input and computer-use ability.",
      "About 1M-token context (1,048,576 tokens on OpenRouter).",
      "WorkBuddy and CodeBuddy are free from 2026-11-04 through 2026-11-15.",
      "Tencent says model weights and system cards are coming. As of 2026-11-05 this is not confirmed released.",
    ],
    note: "Tencent's launch post and OpenRouter, as of 2026-11-05. The weights and system-card release is a stated plan only.",
    sourceUrl: PRESS_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-05",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-11-05",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-05",
      field: "apiPricing",
      summary:
        "First fact file (new catalog row, X-watch 2026-11-05). TokenHub list about $0.90 / $2.70 per 1M with 50% off through 2026-12-31; weights and system cards announced, not confirmed released.",
    },
  ],
} satisfies ToolFacts;
