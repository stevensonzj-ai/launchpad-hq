import type { ToolFacts } from "./types";

/**
 * Replicate: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Pay-as-you-go pricing and the Cloudflare announcement read
 * twice. Neither reader found free credits on the pricing page; the
 * catalog's "free predictions" line is left for a browser check rather
 * than recorded either way.
 */
export default {
  slug: "replicate",
  lifecycle: "active",
  company: {
    value: "Replicate (joining Cloudflare)",
    note: "Replicate blog, November 17, 2025: \"Big news: We're joining Cloudflare.\" \"The API isn't changing.\" Whether the deal has closed was not confirmed.",
    sourceUrl: "https://replicate.com/blog/replicate-cloudflare",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Pay as you go. Most models are billed by the time they take to run, per second of hardware (for example gpu-h100 $0.001525/sec); some are billed per token or per output image.",
    note: "\"Most models are billed by the time they take to run.\" No minimum spend is stated.",
    sourceUrl: "https://replicate.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "apiPricing",
      summary:
        "First fact file: pay as you go, billed per second, per token or per output; Cloudflare acquisition announced 2025-11-17.",
    },
  ],
} satisfies ToolFacts;
