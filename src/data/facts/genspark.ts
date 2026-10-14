import type { ToolFacts } from "./types";

export default {
  slug: "genspark",
  lifecycle: "active",
  company: {
    value: "Genspark Inc.",
    note: 'Browser-verified 2026-10-14: "© 2026 Genspark Inc." Pricing page requires sign-in, so prices and free tier are omitted.',
    sourceUrl: "https://www.genspark.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/id6739554054",
      android: "https://play.google.com/store/apps/details?id=ai.mainfunc.genspark",
    },
    note: "Browser-verified 2026-10-14. iOS id6739554054; Play ai.mainfunc.genspark.",
    sourceUrl: "https://www.genspark.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: [
      "GPT Image 2 (third-party)",
      "Claude Sonnet 5 (third-party)",
      "Grok 4.5 (third-party)",
      "Seedance 2.5 (third-party)",
    ],
    note: "Browser-verified 2026-10-14. Footer model list is third-party names. Ellipsis in the source not expanded.",
    sourceUrl: "https://www.genspark.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "company",
      summary:
        "Browser-verified company, store IDs, and named third-party models. No prices (pricing page requires sign-in).",
    },
  ],
} satisfies ToolFacts;
