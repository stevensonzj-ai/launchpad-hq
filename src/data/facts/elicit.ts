import type { ToolFacts } from "./types";

const ELICIT_PRICING_URL = "https://elicit.com/pricing";

/**
 * Elicit, checked by the RA on elicit.com/pricing on 2026-10-26 (stress fact
 * check §8 and follow-up 5). The server-rendered page holds only the yearly
 * prices; monthly prices sit behind a JavaScript toggle and were not
 * captured, so none are listed. Which plan family the page shows by default
 * is left unstated (the RA read it as Industry, medium confidence).
 */
export default {
  slug: "elicit",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "The Basic plan is free for academic and industry users.",
    },
    sourceUrl: ELICIT_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$0", period: "", limits: "Academic and industry" },
      { name: "Plus (academic)", price: "$11", period: "user/month", limits: "Billed annually ($132/year per user)" },
      { name: "Pro (academic)", price: "$39", period: "user/month", limits: "Billed annually ($468/year per user)" },
      { name: "Scale (academic)", price: "$89", period: "user/month", limits: "Billed annually ($1,068/year per user)" },
      { name: "Pro (industry)", price: "$49", period: "user/month", limits: "Billed annually ($588/year per user)" },
      { name: "Scale (industry)", price: "$229", period: "user/month", limits: "Billed annually ($2,748/year per user)" },
    ],
    note: "USD, as of 2026-10-26. Yearly billing only: the monthly-billing prices are not in the page's static HTML and are not listed here.",
    sourceUrl: ELICIT_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: yearly academic (Plus $11, Pro $39, Scale $89 per user a month) and industry (Pro $49, Scale $229) prices; Basic free.",
    },
  ],
} satisfies ToolFacts;
