import type { ToolFacts } from "./types";

/**
 * Semrush: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Semrush has been an Adobe company since Adobe completed the deal on
 * 2026-04-28. The plans are now SEO, Starter, Pro+, Advanced and
 * Enterprise (Pro, Guru and Business are gone), with published prices
 * and a permanent free account, so the row moves from ENTERPRISE to
 * FREEMIUM. The readers differed on Advanced's AI-prompt allowance (200
 * vs unlimited), so it is left out.
 */
export default {
  slug: "semrush-ai",
  lifecycle: "active",
  company: {
    value: "Semrush (an Adobe company)",
    note: "Newsroom, 2026-04-28: \"Adobe Completes Semrush Acquisition\"; boilerplate \"Semrush, an Adobe company\".",
    sourceUrl: "https://www.semrush.com/news/455953-adobe-completes-semrush-acquisition-strengthening-cx-enterprise-with-enhanced-brand-visibility-capabilities",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free account, no card: 1 demo project and 10 reports a day across the main tools. Paid plans also have a 7-day free trial.",
    },
    sourceUrl: "https://www.semrush.com/prices/",
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
        period: "month",
        limits: "1 demo project; 10 reports a day",
      },
      {
        name: "SEO",
        price: "$139",
        period: "month",
        limits: "$117.33/mo billed annually; 5 websites; 500 keywords tracked daily",
      },
      {
        name: "Starter (SEO + AI Search)",
        price: "$199",
        period: "month",
        limits: "$165.17/mo billed annually; 5 websites; 500 keywords; 50 AI prompts tracked daily",
      },
      {
        name: "Pro+ (SEO + AI Search)",
        price: "$299",
        period: "month",
        limits: "$248.17/mo billed annually; 15 websites; 1,500 keywords; 100 AI prompts tracked daily",
      },
      {
        name: "Advanced",
        price: "Custom",
        period: "",
        limits: "40+ websites; 5,000+ keywords",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    note: "USD, as of 2026-10-29. Annual billing saves up to 17%. Monthly prices are the monthly-billing figures.",
    sourceUrl: "https://www.semrush.com/prices/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: Adobe-owned; SEO $139, Starter $199, Pro+ $299 a month; free account. Replaces Pro/Guru/Business. ENTERPRISE -> FREEMIUM.",
    },
  ],
} satisfies ToolFacts;
