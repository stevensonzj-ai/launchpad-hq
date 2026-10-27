import type { ToolFacts } from "./types";

export default {
  slug: "doximity-gpt",
  lifecycle: "active",
  displayName: {
    value: "Doximity Ask",
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  company: {
    value: "Doximity, Inc.",
    note: "Footer: © 2026 Doximity, Inc.",
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free for verified US clinicians",
    },
    sourceUrl: "https://www.doximity.com/",
    sourceKind: "product-page",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Mobile app", "Desktop app"],
    note: "Named in site navigation. Store URLs were not in the HTML.",
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "displayName",
      summary:
        "RA: displayName is Doximity Ask only. Dropped formerly Doximity GPT (not on the page). Slug stays doximity-gpt.",
    },
  ],
} satisfies ToolFacts;
