import type { ToolFacts } from "./types";

export default {
  slug: "wispr-flow",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "2,000 words/week on desktop, 1,000/week on mobile.",
    },
    note: "Browser-verified 2026-10-14 for the mobile 1,000/week limit (fetch truncated “1,000/w…”). Dollar prices omitted: fetch and browser toggles conflict.",
    sourceUrl: "https://wisprflow.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: [
      "Flow Dictation: Mac, Windows, iOS, and Android",
      "Notetaker: Mac and Windows",
    ],
    note: "Mobile Notetaker is on the roadmap. Direct store URLs unpublished (onelink only: wisprflow.onelink.me). wisprflow.ai/download redirects to /get-started.",
    sourceUrl: "https://wisprflow.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "freeTier",
      summary:
        "Recorded free word limits only. Omitted all prices (fetch vs browser conflict) and company (footer year is a template placeholder; legal entity unpublished).",
    },
  ],
} satisfies ToolFacts;
