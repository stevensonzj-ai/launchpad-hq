import type { ToolFacts } from "./types";

/**
 * WordPress AI (Jetpack AI): first fact file, stale-facts batch 2 (catalog
 * audit 18), 2026-10-29. Read twice on jetpack.com. The free Jetpack plan
 * now includes Jetpack AI, capped at 20 requests (whether the allowance
 * renews is not stated). Higher capacity comes with the Jetpack AI plan or
 * Complete. Prices are first-year promotional prices, billed yearly.
 */
export default {
  slug: "wordpress-ai-jetpack-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "The free Jetpack plan includes Jetpack AI, up to 20 requests.",
    },
    sourceUrl: "https://jetpack.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "Jetpack AI: 20 requests",
      },
      {
        name: "Jetpack AI",
        price: "$4.95",
        period: "month",
        limits: "First year, billed yearly; then $9.95/month; high request capacity under fair use",
      },
      {
        name: "Security",
        price: "$9.95",
        period: "month",
        limits: "First year, billed yearly; then $19.95/month; Jetpack AI: 20 requests",
      },
      {
        name: "Growth",
        price: "$9.95",
        period: "month",
        limits: "First year, billed yearly; then $19.95/month; Jetpack AI: 20 requests",
      },
      {
        name: "Complete",
        price: "$24.95",
        period: "month",
        limits: "First year, billed yearly; then $49.95/month; Jetpack AI with high request capacity",
      },
    ],
    note: "\"$\" with no currency code, as of 2026-10-29. The Jetpack AI plan price is from jetpack.com/ai/.",
    sourceUrl: "https://jetpack.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Jetpack AI is now pitched as running a WordPress site with Claude or ChatGPT; agent access over MCP comes with the Jetpack AI and Complete plans.",
    ],
    sourceUrl: "https://jetpack.com/ai/",
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
      summary: "First fact file: free plan includes 20 Jetpack AI requests; Jetpack AI $4.95/mo first year. Replaces \"AI Assistant requires Jetpack paid plan\".",
    },
  ],
} satisfies ToolFacts;
