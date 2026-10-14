import type { ToolFacts } from "./types";

export default {
  slug: "openai-api",
  lifecycle: "active",
  models: {
    value: [
      "GPT-6 Astra (gpt-6-astra)",
      "GPT-6.1 Sol (gpt-6.1-sol)",
      "GPT-6 Luna (gpt-6-luna)",
    ],
    sourceUrl: "https://developers.openai.com/api/docs/models",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cto",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "models",
      summary:
        "Recorded GPT-6 Astra as the API flagship, GPT-6.1 Sol for balanced cost, and GPT-6 Luna for high-volume work.",
    },
  ],
} satisfies ToolFacts;
