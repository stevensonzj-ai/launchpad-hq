import type { ToolFacts } from "./types";

export default {
  slug: "fathom",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free forever plan.",
    },
    sourceUrl: "https://www.fathom.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Team",
        price: "",
        period: "",
        limits: "2-user minimum",
      },
      {
        name: "Business",
        price: "",
        period: "",
        limits: "2-user minimum",
      },
      {
        name: "Enterprise",
        price: "Talk to sales",
        period: "",
        limits: "",
      },
    ],
    note: "Paid list prices omitted: browser-verified 2026-10-14, the Monthly / Annually (save 25%+) toggle mapping is unclear. Team and Business have a 2-user minimum. Company unpublished (footer is only © All Rights Reserved 2026).",
    sourceUrl: "https://www.fathom.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Zoom", "Google Meet", "Teams"],
    note: "Meeting platforms named on the pricing page. Desktop and mobile apps unpublished. No app store links on the page (browser-verified 2026-10-14).",
    sourceUrl: "https://www.fathom.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Free forever. Team and Business 2-user minimum. Paid prices omitted (toggle mapping unclear). Company omitted.",
    },
  ],
} satisfies ToolFacts;
