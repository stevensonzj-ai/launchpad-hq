import type { ToolFacts } from "./types";

/** Read AI: plans re-checked on the official pricing page, 2026-10-25. */
export default {
  slug: "read-ai",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free, no card: 5 meeting transcripts and 30 measured meetings per month, meetings up to 1 hour, no audio or video uploads.",
    },
    sourceUrl: "https://www.read.ai/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "5 meeting transcripts/month; 30 measured meetings/month; 1-hour max meeting length" },
      { name: "Pro", price: "$15", period: "user/month", limits: "Billed annually; $19.75/user/month billed monthly. Unlimited transcripts, 100 upload min/month, 4-hour meetings" },
      { name: "Enterprise", price: "$22.50", period: "user/month", limits: "Billed annually, 5+ licenses; $29.75/user/month billed monthly. 200 upload min/month" },
      { name: "Enterprise+", price: "$29.75", period: "user/month", limits: "Billed annually; $39.75/user/month billed monthly. 300 upload min/month, 8-hour meetings, HIPAA, SAML/SCIM" },
    ],
    note: "USD. Annual billing is listed as 25% off the monthly rate.",
    sourceUrl: "https://www.read.ai/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Re-checked official plans: Free, Pro $15/user/month (annual), Enterprise $22.50, Enterprise+ $29.75.",
    },
  ],
} satisfies ToolFacts;
