import type { ToolFacts } from "./types";

const PRESS_URL = "https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/";
const TOKENHUB_URL = "https://cloud.tencent.com/document/product/1823/130055";
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
      available: false,
      summary:
        "No free API tier is on the TokenHub price page. Tencent's launch post said WorkBuddy and CodeBuddy would be free from 2026-11-04 through 2026-11-15. That window has ended, and the post does not state a later free period for Hy4.",
    },
    note: "Launch post and the TokenHub price page, read 2026-11-23. TokenHub: " + TOKENHUB_URL,
    sourceUrl: PRESS_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-23",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-23",
    status: "verified",
  },
  apiPricing: {
    value:
      "Tencent Cloud TokenHub list, per 1M tokens: ¥6 input, ¥18 output, ¥0.3 cache hit. Calls are 50% of that list price through 2026-12-31 23:59:59 Beijing time, then the list price. Tencent's English launch post also says approximately US$0.90 input, US$2.70 output, and US$0.045 cached input per 1M tokens.",
    note: "TokenHub price page and the English launch post, re-read 2026-11-26. The yuan figures are the TokenHub list. The US dollar figures are the launch post's approximation, not a second TokenHub rate card. OpenRouter rates were not re-read.",
    sourceUrl: TOKENHUB_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-11-26",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
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
      "Tencent's launch post said WorkBuddy and CodeBuddy would be free from 2026-11-04 through 2026-11-15. That window has ended. The post does not state a later free period for Hy4.",
      "Tencent says model weights and system cards are coming. As of 2026-11-05 this is not confirmed released.",
    ],
    note: "The free-window sentence was re-read on the launch post on 2026-11-23. The weights and system-card sentence was not re-read, and it still says as of 2026-11-05.",
    sourceUrl: PRESS_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-23",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-23",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "apiPricing",
      summary:
        "TokenHub price page and the English launch post re-read. List still ¥6 / ¥18 / ¥0.3 per 1M. Calls still 50% of list through 2026-12-31 23:59:59 Beijing time. The launch post still says about US$0.90 / US$2.70 / US$0.045.",
    },
    {
      date: "2026-11-23",
      field: "apiPricing",
      summary:
        "TokenHub list re-read as ¥6 / ¥18 / ¥0.3 per 1M, 50% of list through 2026-12-31 23:59:59 Beijing time. The English launch post still says about US$0.90 / US$2.70 / US$0.045. The WorkBuddy and CodeBuddy free window ended 2026-11-15.",
    },
    {
      date: "2026-11-05",
      field: "apiPricing",
      summary:
        "First fact file (new catalog row, X-watch 2026-11-05). TokenHub list about $0.90 / $2.70 per 1M with 50% off through 2026-12-31; weights and system cards announced, not confirmed released.",
    },
  ],
} satisfies ToolFacts;
