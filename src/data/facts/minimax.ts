import type { ToolFacts } from "./types";

const MINIMAX_M31F_BLOG_URL = "https://www.minimax.io/blog/minimax-m31f";
const MINIMAX_M31F_LICENSE_URL = "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash/blob/main/LICENSE";

/**
 * New catalog row (created by scripts/update-catalog-audit-8.ts). M3.1 Flash
 * weights are open weights under MiniMax's own community license: never call
 * them "open source".
 */
export default {
  slug: "minimax",
  lifecycle: "active",
  company: {
    value: "MiniMax",
    note: "The MiniMax API platform's privacy policy names Nanonoble Pte. Ltd. (Singapore) and its affiliates as the operator.",
    sourceUrl: "https://platform.minimax.io/protocol/privacy-policy",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apiPricing: {
    value:
      "MiniMax M3.1 Flash, USD per 1M tokens, flat: $0.15 input, $0.60 output, $0.015 cached input.",
    note: "M3.1 Flash only. Other MiniMax models and the M Plan are priced on platform.minimax.io.",
    sourceUrl: MINIMAX_M31F_BLOG_URL,
    sourceKind: "announcement",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  models: {
    value: ["MiniMax M3.1 Flash (in-house)"],
    note: "Released 2026-10-19 per MiniMax's announcement; available through the MiniMax API, M Plan and MiniMax Code.",
    sourceUrl: MINIMAX_M31F_BLOG_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "M3.1 Flash weights are downloadable from MiniMax's Hugging Face page (as of 2026-10-26) as open weights under the MiniMax Community License, a custom license, not an open-source one.",
      "Non-commercial use is permitted. Commercial use requires showing \"Built with MiniMax M3.1-Flash\", plus a one-time notice to MiniMax, or, for products with more than US$20 million in yearly revenue, MiniMax's prior written authorization.",
    ],
    sourceUrl: MINIMAX_M31F_LICENSE_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "apiPricing",
      summary: "New listing: MiniMax M3.1 Flash API prices and its open-weights license terms.",
    },
  ],
} satisfies ToolFacts;
