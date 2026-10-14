import type { ToolFacts } from "./types";

export default {
  slug: "retell-ai",
  lifecycle: "active",
  company: {
    value: "Retell AI",
    note: "Footer: © 2026 Retell AI.",
    sourceUrl: "https://www.retellai.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$10 in free credits; 20 free concurrent calls",
    },
    sourceUrl: "https://www.retellai.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Pay as you go",
        price: "$0.07–$0.31/min",
        period: "",
        limits: "AI voice agents; AI chat agents $0.002+/msg",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    sourceUrl: "https://www.retellai.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web platform", "API/webhooks"],
    note: "No apps listed.",
    sourceUrl: "https://www.retellai.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: [
      "GPT 5.x/4.1 (third-party)",
      "Claude 4.5/4.6 (third-party)",
      "Gemini 3.x/2.5 (third-party)",
    ],
    note: "Cost calculator offers these third-party LLMs. Whether Retell Platform Voices are in-house is unpublished.",
    sourceUrl: "https://www.retellai.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded pay-as-you-go voice/chat rates. Third-party LLMs labeled as such.",
    },
  ],
} satisfies ToolFacts;
