import type { ToolFacts } from "./types";

export default {
  slug: "vapi",
  lifecycle: "active",
  company: {
    value: "Vapi",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$5 free credits, 1 included phone number, 4 concurrent calls, 14-day data retention",
    },
    sourceUrl: "https://vapi.ai/pricing",
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
        period: "month",
        limits: "$5 free credits; 1 included phone number; 4 concurrent calls; 14-day data retention",
      },
      {
        name: "Usage",
        price: "Pay per minute",
        period: "",
        limits: "Provider costs passed through with no markup",
      },
      {
        name: "Core",
        price: "$29",
        period: "month",
        limits: "",
      },
      {
        name: "Pro",
        price: "$999",
        period: "month",
        limits: "Minimum; 10% of hosting fee",
      },
      {
        name: "Premier",
        price: "Contact sales",
        period: "",
        limits: "",
      },
    ],
    note: "Add-ons: HIPAA $2,000/mo; extra concurrency $10/line/mo.",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web dashboard", "API"],
    note: "Developer voice-agent platform.",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["Deepgram", "OpenAI", "ElevenLabs"],
    note: "Third-party models; no in-house model.",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded Free credits, usage, Core, Pro, Premier, and listed add-ons.",
    },
  ],
} satisfies ToolFacts;
