import type { ToolFacts } from "./types";

/**
 * Figma AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans and AI credits read twice on figma.com/pricing, in its
 * annual-billing view. Month-to-month prices were not readable; on the
 * Browser-check list.
 */
export default {
  slug: "figma-ai",
  lifecycle: "active",
  company: {
    value: "Figma",
    sourceUrl: "https://www.figma.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Starter is free: unlimited drafts, one team with one folder and 3 files, and 150 AI credits a day, up to 500 a month.",
    },
    sourceUrl: "https://www.figma.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Starter",
        price: "$0",
        period: "",
        limits: "150 AI credits a day, up to 500 a month; 3 files",
      },
      {
        name: "Professional (Full seat)",
        price: "$16",
        period: "month",
        limits: "Billed annually; 3,000 AI credits a month; Dev seat $12, Collab seat $3 (500 credits each)",
      },
      {
        name: "Organization (Full seat)",
        price: "$55",
        period: "month",
        limits: "Billed annually; 3,500 AI credits a month; Dev $25, Collab $5",
      },
      {
        name: "Enterprise (Full seat)",
        price: "$90",
        period: "month",
        limits: "Billed annually; 4,250 AI credits a month; Dev $35, Collab $5",
      },
    ],
    note: "USD per seat, as of 2026-10-29. One credit pool covers all Figma AI features; extra credits can be bought. The prices shown are the annual-billing view (the page's toggle reads \"Annual selected\"); month-to-month prices were not readable.",
    sourceUrl: "https://www.figma.com/pricing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: true },
    note: "Help centre: \"By default, content training is turned on for Starter teams\" and for Professional teams; it is off on Organization and Enterprise. Admins can switch it off.",
    sourceUrl: "https://help.figma.com/hc/en-us/articles/17725942479127",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "First fact file: Starter 150 AI credits/day (500/mo); Full seats $16 Professional, $55 Organization, $90 Enterprise with monthly AI credits.",
    },
  ],
} satisfies ToolFacts;
