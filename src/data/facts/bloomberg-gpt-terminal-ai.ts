import type { ToolFacts } from "./types";

/**
 * Bloomberg GPT / Terminal AI: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Every www.bloomberg.com page returned 403 to both readers. One reader
 * read professional.bloomberg.com, which shows the AI features under the
 * name "Bloomberg AI" (ASKB, AI summaries) and no Terminal price; the
 * other could not read any Bloomberg page. Those facts stayed unverified.
 *
 * Research Analyst browser check, 2026-10-29 (logged out, US, USD; catalog
 * audit 20): bloomberg.com/subscriptions shows the consumer plans ($399 a
 * year, $180 for the first year; or $39.99 a month, $1.99 for the first
 * month) and names no AI feature. ASKB by Bloomberg is the Terminal's AI,
 * and the Terminal is sold through Order or Request a Demo with no price.
 * The "AI document summaries" wording was not found on the professional
 * page, so it is no longer listed here.
 */
export default {
  slug: "bloomberg-gpt-terminal-ai",
  lifecycle: "active",
  company: {
    value: "Bloomberg Finance L.P.",
    note: "Footer: \"2026 Bloomberg Finance L.P.\" (one reader).",
    sourceUrl: "https://professional.bloomberg.com/products/bloomberg-terminal/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Bloomberg.com annual (news subscription; no AI feature named)",
        price: "$399",
        period: "year",
        limits: "List price. Auto-renews for $399 annually after 1 year. No AI feature is named.",
      },
      {
        name: "Bloomberg.com monthly (news subscription; no AI feature named)",
        price: "$39.99",
        period: "month",
        limits: "List price. Auto-renews for $39.99/month.",
      },
      {
        name: "Annual + Businessweek Print",
        price: "$429",
        period: "year",
        limits: "Auto-renews for $429 annually.",
      },
      {
        name: "Tech Newsletter Bundle",
        price: "$11.99",
        period: "month",
        limits: "",
      },
      {
        name: "Student",
        price: "$9.99",
        period: "month",
        limits: "",
      },
    ],
    note: "Read 2026-11-20. \"$\" with no currency code. First-year and first-month offers are on the page and have no stated end date, so they are not the list price. The stored $180 first-year price is not on the page.",
    sourceUrl: "https://www.bloomberg.com/subscriptions",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  features: {
    value: [
      "ASKB by Bloomberg is the AI on the Bloomberg Terminal: \"ASKB by Bloomberg AI harnesses the power of agentic AI to transform how you discover insights on the Bloomberg Terminal.\"",
      "The Terminal is sales-only: no price is published, and the page offers Order or Request a Demo.",
    ],
    note: "Browser check 2026-10-29. The \"AI document summaries\" wording an earlier reader saw was not found on this page.",
    sourceUrl: "https://www.bloomberg.com/professional/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: Bloomberg's pages blocked automated reads; AI features (Bloomberg AI, ASKB) seen by one reader only.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Browser check: consumer plans $399 a year ($180 first year) or $39.99 a month, no AI feature named; ASKB is the Terminal's AI and the Terminal is sales-only.",
    },
  ],
} satisfies ToolFacts;
