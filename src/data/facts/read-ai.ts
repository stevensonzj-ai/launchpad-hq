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
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "5 meeting transcripts/month; 30 measured meetings/month; 1-hour max meeting length" },
      { name: "Pro", price: "$15", period: "user/month", limits: "Billed annually; $19.75/user/month billed monthly. Unlimited transcripts, 100 upload min/month, 4-hour meetings" },
      { name: "Enterprise", price: "$22.50", period: "user/month", limits: "Billed annually; $29.75/user/month billed monthly. 200 upload min/month" },
      { name: "Enterprise+", price: "$29.75", period: "user/month", limits: "Billed annually, requires 5+ licenses; $39.75/user/month billed monthly. 300 upload min/month, 8-hour meetings, HIPAA, SAML/SCIM" },
    ],
    note: "USD, as of 2026-10-26. Annual billing is listed as 25% off the monthly rate. read.ai/pricing redirects to read.ai/plans-pricing. The RA confirmed every price and the free plan's 5 transcripts a month on 2026-10-26; upload minutes and meeting lengths are as gathered from the same page.",
    sourceUrl: "https://www.read.ai/plans-pricing",
    checkedAt: "2026-10-26",
    gatheredBy: "claude-recheck",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "RA verified the plan prices on read.ai/plans-pricing, and that read.ai/transcription (now /meeting-reports) offers full meeting transcription.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "Corrected: the pricing page's \"Requires 5+ licenses\" label sits on Enterprise+, not Enterprise.",
    },
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Re-checked official plans: Free, Pro $15/user/month (annual), Enterprise $22.50, Enterprise+ $29.75.",
    },
  ],
} satisfies ToolFacts;
