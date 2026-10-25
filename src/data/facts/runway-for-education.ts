import type { ToolFacts } from "./types";

/**
 * Runway for Education: the old runwayml.com/education link returns 404.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 *
 * 2026-10-25: the catalog row called the programme free. The official
 * educators page offers a discount on paid plans, not free access; these
 * facts override the row's description, free tier and pricing text.
 */
const EDUCATORS_URL = "https://runway.com/educators";

export default {
  slug: "runway-for-education",
  lifecycle: "active",
  officialUrl: {
    value: EDUCATORS_URL,
    sourceUrl: EDUCATORS_URL,
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  verdict: {
    value:
      "Runway's education programme is a discount, not a free plan: verified students and educators get 25% off any paid Runway plan, and schools buying 3 or more classroom licenses get up to 25% off.",
    sourceUrl: EDUCATORS_URL,
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free education plan. Students and educators get 25% off a paid Runway plan instead.",
    },
    sourceUrl: EDUCATORS_URL,
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Students & educators",
        price: "25% off",
        period: "",
        limits: "Any paid Runway plan; eligibility verified through SheerID",
      },
      {
        name: "Classroom licensing",
        price: "Up to 25% off",
        period: "",
        limits: "Classes of 3 or more licenses; a school-issued email for each account",
      },
    ],
    sourceUrl: EDUCATORS_URL,
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "officialUrl",
      summary: "Official link fixed to runway.com/educators (old education URL 404s).",
    },
    {
      date: "2026-10-25",
      field: "freeTier",
      summary: "Corrected: the education programme is 25% off paid plans, not free.",
    },
  ],
} satisfies ToolFacts;
