import type { ToolFacts } from "./types";

export default {
  slug: "wispr-flow",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "2,000 words/week on desktop, 1,000/week on mobile.",
    },
    note: "Free word limits confirmed by fetch 2026-10-14. Dollar prices omitted: fetch and browser toggles conflict.",
    sourceUrl: "https://wisprflow.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
