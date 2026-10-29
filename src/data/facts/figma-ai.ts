import type { ToolFacts } from "./types";

/**
 * Figma AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans and AI credits read twice on figma.com/pricing, in its
 * annual-billing view. The Research Analyst's browser check the same day
 * (figma.com/pricing, "Prices in USD") read the monthly view: only
 * Professional can be billed monthly; Organization and Enterprise are
 * billed annually only.
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
        limits: "Billed annually, or $20 billed monthly; 3,000 AI credits a month; Dev seat $12 ($15 monthly), Collab seat $3 ($5 monthly), 500 credits each",
      },
      {
        name: "Organization (Full seat)",
        price: "$55",
        period: "month",
        limits: "Billed annually only; 3,500 AI credits a month; Dev $25, Collab $5",
      },
      {
        name: "Enterprise (Full seat)",
        price: "$90",
        period: "month",
        limits: "Billed annually only; 4,250 AI credits a month; Dev $35, Collab $5",
      },
    ],
    note: "USD per seat, as of 2026-10-29. One credit pool covers all Figma AI features; extra credits can be bought. Annual-billing prices read twice; the monthly view (Professional only) was browser-verified on 2026-10-29.",
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
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: Professional billed monthly is $20 Full / $15 Dev / $5 Collab; Organization and Enterprise are billed annually only.",
    },
  ],
} satisfies ToolFacts;
