import type { ToolFacts } from "./types";

/**
 * Connected Papers: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page is a JavaScript app that loads prices from
 * its payment provider at page load, so neither batch-1 reader could
 * confirm the plans. The Research Analyst's browser check the same day
 * (connectedpapers.com/pricing, USD) read the free tier and both paid plans;
 * those are recorded as verified and applied to the row by catalog audit 18.
 */
export default {
  slug: "connected-papers",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.connectedpapers.com",
    note: "connectedpapers.com serves the www host.",
    sourceUrl: "https://www.connectedpapers.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free: 5 graphs a month.",
    },
    note: "Browser check, 2026-10-29: \"5 graphs per month\", \"USD0\".",
    sourceUrl: "https://www.connectedpapers.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "5 graphs a month" },
      {
        name: "Academic",
        price: "$6",
        period: "month",
        limits: "Billed $72 annually, or $10/mo billed $30 quarterly; unlimited graphs",
      },
      {
        name: "Business",
        price: "$20",
        period: "month",
        limits: "Billed $240 annually, or $30/mo billed $90 quarterly; unlimited graphs",
      },
    ],
    note: "USD, as of 2026-10-29, browser-verified. No month-to-month billing: paid plans are billed annually or quarterly.",
    sourceUrl: "https://www.connectedpapers.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary:
        "First fact file: site address only; free-tier limit and Academic / Business prices need a browser check.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: Free 5 graphs a month; Academic $6/mo billed annually ($10 quarterly), Business $20/mo ($30 quarterly), both unlimited graphs. Replaces \"Academic $3/mo\".",
    },
  ],
} satisfies ToolFacts;
