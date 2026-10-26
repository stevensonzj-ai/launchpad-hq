import type { ToolFacts } from "./types";

const KIMI_API_PRICING_URL = "https://platform.kimi.ai/docs/pricing/chat";
const KIMI_PLANS_URL = "https://www.kimi.ai/resources/kimi-k3-1-pro-pricing";
const KIMI_K3_1_BLOG_URL = "https://www.kimi.ai/blog/kimi-k3-1-pro";

export default {
  slug: "kimi",
  lifecycle: "active",
  company: {
    value: "Moonshot AI",
    note: 'Browser-verified 2026-10-14: footer "© 2026 Moonshot AI".',
    sourceUrl: "https://www.kimi.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Free plan: limited use of K3.1 Pro on the web and in Kimi Work, basic agent credits, 1 agent task at a time, 2 scheduled tasks, 2 projects with 500MB storage. No K3.1 Pro Highspeed or Kimi Code.",
    },
    note: "Membership table on Kimi's K3.1 Pro pricing page. Exact message counts are not published.",
    sourceUrl: KIMI_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Limited K3.1 Pro use; basic agent credits" },
      { name: "Plus", price: "$15", period: "month, billed annually", limits: "Monthly-billing price not shown" },
      { name: "Pro", price: "$31", period: "month, billed annually", limits: "Monthly-billing price not shown" },
      { name: "Max", price: "$79", period: "month, billed annually", limits: "Monthly-billing price not shown" },
      { name: "Ultra", price: "$159", period: "month, billed annually", limits: "Monthly-billing price not shown" },
    ],
    note: 'Kimi membership (kimi.ai). The page lists these as "Annual billing: effective monthly" prices; it does not show monthly-billing prices or the yearly totals.',
    sourceUrl: KIMI_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apiPricing: {
    value:
      "Pay-as-you-go, USD per 1M tokens, input / output. kimi-k3.1-pro: $2 / $10, cached input $0.20. kimi-k3.1-pro-highspeed: $4 / $20, cached input $0.20. kimi-k3: $3 / $15, cached input $0.30. kimi-k2.7-code: $0.95 / $4, cached input $0.19. kimi-k2.7-code-highspeed: $1.90 / $8, cached input $0.38. kimi-k2.6: $0.95 / $4, cached input $0.16. K3 series context 1,048,576 tokens; K2 series 262,144 tokens. K2 series: closed to newly registered users from 2026-10-31 (existing users not affected); Kimi plans to retire all K2 models by the end of December 2026 (stated plan, as of 2026-10-26).",
    note: "Re-checked 2026-10-26 on platform.kimi.ai/docs/pricing/chat (tables are in the page source). K3 series cache writes are billed separately by TTL (5 minutes / 1 hour). platform.moonshot.ai redirects here. No subscription.",
    sourceUrl: KIMI_API_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  models: {
    value: [
      "Kimi K3.1 Pro (in-house)",
      "Kimi K3.1 Pro Highspeed (in-house)",
      "Kimi K3 (in-house)",
      "Kimi K2.7 Code (in-house; K2 series, retiring by end of December 2026)",
      "Kimi K2.7 Code highspeed (in-house; K2 series, retiring by end of December 2026)",
      "Kimi K2.6 (in-house; K2 series, retiring by end of December 2026)",
    ],
    note: "Models on the Kimi API pricing page, 2026-10-26.",
    sourceUrl: KIMI_API_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "K3.1 Pro and K3.1 Pro Highspeed are available on Kimi.ai and the Kimi API (as of 2026-10-26). Kimi says Highspeed runs 2-3x faster than K3.1 Pro.",
      "K3.1 Pro has a 1-million-token context window.",
      "Kimi says the full K3.1 Pro model weights will be released by 2026-11-04 (stated plan, as of 2026-10-26).",
      "Kimi Enterprise: K3.1 Pro is off by default at launch; administrators can enable it.",
    ],
    sourceUrl: KIMI_K3_1_BLOG_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary:
        "Added Kimi membership plans (Free, Plus, Pro, Max, Ultra; annual-billing monthly prices) and the Free plan's limits from Kimi's K3.1 Pro pricing page.",
    },
    {
      date: "2026-10-26",
      field: "apiPricing",
      summary:
        "Added K3.1 Pro and K3.1 Pro Highspeed API prices and the K2 retirement plan (new sign-ups lose K2 from 2026-10-31; all K2 models retired by end of December 2026); re-checked the other API prices.",
    },
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added K3.1 Pro launch notes: 1M-token context; full weights due by 2026-11-04 per Kimi.",
    },
    {
      date: "2026-10-14",
      field: "apiPricing",
      summary:
        "API pay-as-you-go token prices from platform.kimi.ai (browser-verified). Company Moonshot AI. Consumer plans unpublished.",
    },
  ],
} satisfies ToolFacts;
