import type { ToolFacts } from "./types";

/**
 * Unriddle: renamed Anara (Anara blog, 2025-03-23). unriddle.ai redirects to anara.com.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "unriddle",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Unriddle announced on March 23, 2025 that it changed its name to Anara.",
      formerName: "Unriddle",
      whatToDo: "Nothing to do. unriddle.ai redirects to anara.com, and our getting-started guide still uses the Unriddle name in places.",
    },
    sourceUrl: "https://anara.com/blog/the-beginning-of-a-new-story",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Anara",
    sourceUrl: "https://anara.com/blog/the-beginning-of-a-new-story",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://anara.com/",
    sourceUrl: "https://anara.com/blog/the-beginning-of-a-new-story",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "Limited AI usage and uploads, refreshing daily" },
      { name: "Plus", price: "$10", period: "month", limits: "$8/month billed yearly" },
      { name: "Pro", price: "$20", period: "month", limits: "$16/month billed yearly" },
      { name: "Max 5x", price: "$100", period: "month", limits: "$80/month billed yearly" },
      { name: "Max 20x", price: "$200", period: "month", limits: "$160/month billed yearly" },
    ],
    note: "USD. Unriddle is now Anara. As of 2026-10-30.",
    sourceUrl: "https://anara.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://anara.com/pricing and price facts added with source and date." },
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "Unriddle renamed Anara; official link now anara.com.",
    },
  ],
} satisfies ToolFacts;
