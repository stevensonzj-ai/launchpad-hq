import type { ToolFacts } from "./types";

export default {
  slug: "vapi",
  lifecycle: "active",
  company: {
    value: "Vapi",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "$5 free credits, 1 included phone number, 4 concurrent calls, 14-day data retention. Vapi hosting on the no-success-package path is $0.05/min prepaid.",
    },
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "No Success Package",
        price: "$0",
        period: "",
        limits: "$5 free credits; 1 phone number; 4 concurrent calls; 14-day retention; Vapi hosting $0.05/min prepaid; model costs passed through",
      },
      {
        name: "Core",
        price: "$29",
        period: "month",
        limits: "",
      },
      {
        name: "Pro",
        price: "10% of Vapi hosting fee",
        period: "",
        limits: "$999/mo minimum",
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
    checkedAt: "2026-11-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-14",
    status: "verified",
  },
  platforms: {
    value: ["Web dashboard", "API"],
    note: "Developer voice-agent platform.",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-14",
      field: "plans",
      summary: "No Success Package includes prepaid Vapi hosting at $0.05/min. Core is $29/month.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Pro is $999/mo minimum; 10% of Vapi hosting fee. Dropped provider names from models.",
    },
  ],
} satisfies ToolFacts;
