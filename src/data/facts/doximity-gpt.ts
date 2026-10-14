import type { ToolFacts } from "./types";

export default {
  slug: "doximity-gpt",
  lifecycle: "active",
  displayName: {
    value: "Doximity Ask (formerly Doximity GPT)",
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  company: {
    value: "Doximity, Inc.",
    note: "Footer: © 2026 Doximity, Inc.",
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free for verified US clinicians",
    },
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Mobile app", "Desktop app"],
    note: "Named in site navigation. Store URLs were not in the HTML.",
    sourceUrl: "https://www.doximity.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "displayName",
      summary: "Homepage promotes Doximity Ask; slug stays doximity-gpt. Store links unpublished.",
    },
  ],
} satisfies ToolFacts;
