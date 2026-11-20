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
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
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
      "MiniMax H3-Image (released 2026-11-11) is an open-weight image model. The launch post says it can generate a 4K (4096 by 4096) image in under 10 seconds, supports up to 16 reference images, and is available through the MiniMax API Platform, MiniMax Code, and Hailuo AI. Noted on this row, not a new row. On the API pricing page, read 2026-11-20, MiniMax-H3-Image standard rates are $2.30 per 1M input text tokens, $1.50 per 1M input image tokens, and $3.80 per 1M output image tokens. Highspeed is $2.30, $3.00, and $7.60 on those same three rates. That page also shows a limited-time 50% off the total request cost when the delivered image has at least 16,600,000 pixels, and it does not state an end date. The launch post's launch-week discount is not the wording on the pricing page. https://www.minimax.io/blog/minimax-h3-image https://platform.minimax.io/docs/pricing/overview",
    ],
    note: "M3.1 Flash license lines were checked 2026-10-26. H3-Image rates were read on the API pricing page on 2026-11-20. The launch-week sentence from the 2026-11-11 post was removed. The pricing page's 4K discount has no stated end date.",
    sourceUrl: MINIMAX_M31F_LICENSE_URL,
    checkedAt: "2026-11-20",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-12",
      field: "features",
      summary:
        "X-watch 2026-11-20: launch-week discount copy removed. Standard H3-Image rates are $2.30 / $1.50 / $3.80 per 1M tokens (input text, input image, output image). A limited-time 50% off remains on the pricing page for images of at least 16,600,000 pixels, with no end date stated.",
    },
    {
      date: "2026-10-26",
      field: "apiPricing",
      summary: "New listing: MiniMax M3.1 Flash API prices and its open-weights license terms.",
    },
  ],
} satisfies ToolFacts;
