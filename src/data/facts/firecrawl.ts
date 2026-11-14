import type { ToolFacts } from "./types";

export default {
  slug: "firecrawl",
  lifecycle: "active",
  company: {
    value: "Firecrawl",
    note: "Footer: © 2026 Firecrawl (no legal suffix).",
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: 1,000 credits per month at $0, no credit card.",
    },
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Hobby",
        price: "$16/mo",
        period: "billed annually",
        limits: "5,000 credits/mo; also $19/month billed monthly",
      },
      {
        name: "Standard",
        price: "$83/mo",
        period: "billed annually",
        limits: "100,000 credits/mo; also $99/month billed monthly",
      },
      {
        name: "Growth",
        price: "$333/mo",
        period: "billed annually",
        limits: "500,000 credits/mo; also $399/month billed monthly",
      },
      {
        name: "Scale",
        price: "$599/mo",
        period: "billed annually",
        limits: "1,000,000 credits/mo; also $749/month billed monthly",
      },
    ],
    note: "USD. The price field is the annual per-month rate. Monthly billing is $19, $99, $399, and $749. Enterprise is custom.",
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  platforms: {
    value: ["API"],
    sourceUrl: "https://www.firecrawl.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-14",
      field: "plans",
      summary: "Free plan is 1,000 credits a month. Monthly prices are on the page: Hobby $19, Standard $99, Growth $399, Scale $749. Annual rates are unchanged.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Hobby through Scale, billed annually. Free plan recorded without unpublished credit amount.",
    },
  ],
} satisfies ToolFacts;
