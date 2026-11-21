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
      summary: "The Free grammar row has only a check mark and no monthly number. Writing tools (Paraphrase, Trim, Translate, AI Review, and more) are 5 uses a day. Chat with papers is 5 files a month. Ask questions and cite text is 5 uses a day.",
    },
    note: "Read 2026-11-20. The stored 200 grammar edits a month is not on the page. 20,000 edits a month is Prime; Unlimited is Pro.",
    sourceUrl: "https://paperpal.com/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "See the free tier" },
      { name: "Prime", price: "$25", period: "month", limits: "Billed monthly. Billed annually $7.20/mo (continue to pay $86.40). Save 71%." },
      { name: "Pro", price: "$59", period: "month", limits: "Billed monthly. Billed annually $17.40/mo (continue to pay $208.80). Save 71%." },
    ],
    note: "Read 2026-11-20. \"$\" with no currency code. The stored annual $8.40 ($100.80/yr) and $20.30 ($243.60/yr) are not on the page.",
    sourceUrl: "https://paperpal.com/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
