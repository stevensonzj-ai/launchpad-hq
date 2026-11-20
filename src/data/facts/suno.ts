import type { ToolFacts } from "./types";

const SUNO_PRICING_URL = "https://suno.com/pricing";

/** Suno, checked by the RA on suno.com/pricing on 2026-10-26 (stress fact check §8 spot checks: VERIFIED). */
export default {
  slug: "suno",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 50 credits a day, non-commercial use only.",
    },
    sourceUrl: SUNO_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "50 credits a day; non-commercial use" },
      { name: "Pro", price: "$10", period: "month", limits: "$8/month billed yearly; 2,500 credits a month; 20 downloads" },
      { name: "Premier", price: "$30", period: "month", limits: "$24/month billed yearly; 10,000 credits a month; 60 downloads" },
    ],
    note: "USD, as of 2026-10-26.",
    sourceUrl: SUNO_PRICING_URL,
    checkedAt: "2026-11-20",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "Suno Bridge (beta), announced 2026-11-13, is a standalone Mac app for Ableton Live 12, included with Premier subscriptions. Both apps have to be open. The post says Bridge uploads the Ableton session to Suno so it can match tempo, key, and groove. The post does not say that Bridge spends credits.",
    ],
    note: "Suno's Bridge post, checked 2026-11-16. Plan prices above were not re-read.",
    sourceUrl: "https://suno.com/blog/introducing-bridge",
    sourceKind: "announcement",
    checkedAt: "2026-11-16",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-16",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-16",
      field: "features",
      summary:
        "X-watch: Suno Bridge is a beta Mac app for Ableton Live 12, included with Premier. The post does not say it spends credits.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: Free 50 credits a day; Pro $10 ($8 yearly) and Premier $30 ($24 yearly) with credits and download caps.",
    },
  ],
} satisfies ToolFacts;
