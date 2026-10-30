import type { ToolFacts } from "./types";

/**
 * Paperpal: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page fills in prices in the browser, so the
 * batch-1 readers recorded no plan facts. The Research Analyst's browser
 * check the same day (paperpal.com/pricing, USD) read the free plan's
 * limits and the Prime / Pro prices; those are recorded as verified and
 * applied to the row by catalog audit 18. The annual prices shown were a
 * limited-time promotion, so only the monthly prices go in the row. The
 * 2-year and 3-year one-time plans are left out: the page does not say
 * which plan they belong to.
 */
export default {
  slug: "paperpal",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 200 grammar edits a month; 5 a day of the writing tools; chat with 5 files a month.",
    },
    note: "Catalog audit 27 re-read, 2026-10-30: \"200 edits / mo Grammar\", \"5 / day\" writing tools, \"5 files / mo Chat with papers\".",
    sourceUrl: "https://paperpal.com/pricing",
    checkedAt: "2026-10-30",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "200 grammar edits a month; 5 a day of the writing tools; chat with 5 files a month" },
      { name: "Prime", price: "$25", period: "month", limits: "Billed monthly; billed annually $8.40/mo ($100.80/yr)" },
      { name: "Pro", price: "$59", period: "month", limits: "Billed monthly; billed annually $20.30/mo ($243.60/yr)" },
    ],
    note: "USD, catalog audit 27 re-read 2026-10-30: Prime $25/mo and Pro $59/mo billed monthly; billed annually Prime $8.40/mo ($100.80/yr) and Pro $20.30/mo ($243.60/yr).",
    sourceUrl: "https://paperpal.com/pricing",
    checkedAt: "2026-10-30",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: false },
    note: "paperpal.com/llms-full.txt: \"never storing or using your work to train its AI models\" (read once; the privacy-policy URL tried returned 404).",
    sourceUrl: "https://paperpal.com/llms-full.txt",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "plans",
      summary:
        "Catalog audit 27 re-read: annual prices added (Prime $8.40/mo, Pro $20.30/mo billed annually); free plan trimmed to the confirmed limits.",
    },
    {
      date: "2026-10-29",
      field: "privacy",
      summary:
        "First fact file: privacy note only (unverified); free-plan limits and Prime / Pro prices need a browser check.",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: Free 200 grammar edits a month and 5 a day of the AI tools; Prime $25/mo and Pro $59/mo billed monthly; annual prices are a limited-time promotion.",
    },
  ],
} satisfies ToolFacts;
