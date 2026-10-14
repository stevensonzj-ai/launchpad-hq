import type { ToolFacts } from "./types";

export default {
  slug: "napkin-ai",
  lifecycle: "active",
  company: {
    value: "Napkin AI",
    note: "Footer: © 2026 Napkin AI.",
    sourceUrl: "https://www.napkin.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free Forever, $0, 500 AI credits per week, with Napkin branding.",
    },
    note: "Browser-verified 2026-10-14: Free is 500 credits a week.",
    sourceUrl: "https://www.napkin.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free Forever",
        price: "$0",
        period: "",
        limits: "500 AI credits per week, with Napkin branding",
      },
      {
        name: "Plus",
        price: "$12",
        period: "per person per month, billed monthly",
        limits: "$9 billed yearly; 10,000 credits/mo",
      },
      {
        name: "Pro",
        price: "$30",
        period: "per person per month, billed monthly",
        limits: "$22 billed yearly; 30,000 credits/mo",
      },
    ],
    note: "Browser-verified 2026-10-14: per person per month, Plus $12 monthly / $9 yearly; Pro $30 / $22.",
    sourceUrl: "https://www.napkin.ai/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web"],
    sourceUrl: "https://www.napkin.ai/pricing/",
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
      summary:
        "Free Forever $0 (500 credits/week). Plus $12/$9 and Pro $30/$22 per person per month (browser-verified billing).",
    },
  ],
} satisfies ToolFacts;
