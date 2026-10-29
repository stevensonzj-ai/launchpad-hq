import type { ToolFacts } from "./types";

/**
 * Replicate: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Pay-as-you-go pricing and the Cloudflare announcement read
 * twice. Neither reader found free credits on the pricing page. The
 * Research Analyst's browser check the same day (marked PARTIAL) found the
 * billing docs' "Free limits" line: select models can be run free for a
 * while before billing is required; the amount is not stated. Recorded as
 * unverified; audit 18 drops the row's "free credits" wording.
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
  freeTier: {
    value: {
      available: true,
      summary: "Select models can be run free for a while; after that you are asked to set up billing. The amount is not stated.",
    },
    note: "Billing docs, \"Free limits\": \"You can run select models on Replicate for free, but after a bit you'll be asked to set up billing.\" The pricing page does not mention free credits (it has a \"Try for free\" button). Browser check marked partial.",
    sourceUrl: "https://replicate.com/docs/topics/billing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
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
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "Browser check (partial): free runs on select models, amount not stated; recorded unverified.",
    },
  ],
} satisfies ToolFacts;
