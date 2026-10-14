import type { ToolFacts } from "./types";

export default {
  slug: "jasper",
  lifecycle: "active",
  company: {
    value: "Jasper AI, INC.",
    note: 'Footer: "© 2026 Jasper AI, INC."',
    sourceUrl: "https://www.jasper.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pro",
        price: "$59/month billed yearly or $69/month billed monthly",
        period: "",
        limits: "",
      },
      {
        name: "Business",
        price: "custom pricing",
        period: "",
        limits: "",
      },
    ],
    note: 'USD per seat per month. "Start Free 7-Day Trial" is a trial, not a free plan, so no free tier is recorded.',
    sourceUrl: "https://www.jasper.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Pro $59/month billed yearly or $69/month billed monthly. Business custom. No free plan (7-day trial).",
    },
  ],
} satisfies ToolFacts;
