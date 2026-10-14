import type { ToolFacts } from "./types";

export default {
  slug: "brisk-teaching",
  lifecycle: "active",
  company: {
    value: "BRISK",
    note: "Footer shows BRISK. The footer year is not used as a date.",
    sourceUrl: "https://www.briskteaching.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$0 for teachers (Chrome & Edge extension).",
    },
    note: "Browser-verified 2026-10-14 on briskteaching.com/plans. Homepage title also says Free AI Tools for Teachers; free-tier numeric limits unpublished. Chrome Web Store URL unpublished.",
    sourceUrl: "https://www.briskteaching.com/plans",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "For teachers; Chrome & Edge extension",
      },
      {
        name: "Premium",
        price: "custom pricing",
        period: "",
        limits: "",
      },
      {
        name: "Intelligence",
        price: "custom pricing",
        period: "",
        limits: "",
      },
    ],
    note: "Browser-verified 2026-10-14 on briskteaching.com/plans (/pricing returned 404).",
    sourceUrl: "https://www.briskteaching.com/plans",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Chrome extension", "Edge extension"],
    note: "Homepage: without leaving your browser, works on any page, in any file. Chrome Web Store URL unpublished.",
    sourceUrl: "https://www.briskteaching.com/plans",
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
        "Browser-verified: Free $0 for teachers; Premium and Intelligence custom pricing. Company BRISK from footer; footer year not used as a date.",
    },
  ],
} satisfies ToolFacts;
