import type { ToolFacts } from "./types";

/**
 * Relevance AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans read twice on Relevance's pricing docs. The marketing
 * page relevanceai.com/pricing shows only Enterprise; that is on the
 * Browser-check list. The docs' feature table lists Vendor Credits as
 * 10,000 / 35,000 a month, which does not match the dollar amounts quoted
 * here; the dollar amounts are recorded.
 */
export default {
  slug: "relevance-ai",
  lifecycle: "active",
  company: {
    value: "Relevance AI",
    note: "Privacy policy names OnSearch Pty Ltd as the legal entity (read once).",
    sourceUrl: "https://relevanceai.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan: \"The Free plan is retired for new signups and existing accounts.\"",
    },
    sourceUrl: "https://relevanceai.com/docs/get-started/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pro",
        price: "$29",
        period: "month",
        limits: "Or $19/mo billed yearly; 2,500 Actions a month; $20 a month in Vendor Credits",
      },
      {
        name: "Team",
        price: "$349",
        period: "month",
        limits: "Or $234/mo billed yearly; 7,000 Actions a month; $70 a month in Vendor Credits",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "Custom Actions and Vendor Credits" },
    ],
    note: "USD, as of 2026-10-29, from the pricing docs. Billing is Actions (each tool run) plus Vendor Credits (model usage); a bring-your-own key skips Vendor Credits.",
    sourceUrl: "https://relevanceai.com/docs/get-started/pricing",
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
      summary:
        "First fact file: the Free plan is retired; Pro $29/mo ($19 yearly) and Team $349/mo ($234 yearly), billed in Actions plus Vendor Credits. Replaces the catalog's free 100 credits/day.",
    },
  ],
} satisfies ToolFacts;
