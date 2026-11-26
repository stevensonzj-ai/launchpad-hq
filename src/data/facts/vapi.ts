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
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "No Success Package",
        price: "$0",
        period: "",
        limits: "$5 free credits; 2 organizations; 1 phone number; 4 concurrent calls; 14-day retention; Vapi hosting $0.05/min prepaid; model costs passed through at cost",
      },
      {
        name: "Core",
        price: "$29",
        period: "month",
        limits: "2 organizations; 5 phone numbers; 10 concurrent calls; 30-day retention; zero data retention included; email support with a 2-business-day response",
      },
      {
        name: "Pro",
        price: "10% of Vapi hosting fee",
        period: "",
        limits: "$999/mo minimum; 10 organizations; 10 phone numbers; 30 concurrent calls; 180-day retention; role-based access and zero data retention; 99% uptime",
      },
      {
        name: "Premier",
        price: "Contact sales",
        period: "",
        limits: "",
      },
    ],
    note: "Models are passed through at cost. Add-ons on https://vapi.ai/pricing, re-read 2026-11-26: Standard Data Processing Agreement and Business Associate Agreement $2,000 / month; additional concurrency $10 / line / month; additional organizations $20 / organization / month.",
    sourceUrl: "https://vapi.ai/pricing",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
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
      date: "2026-11-26",
      field: "plans",
      summary: "Pricing page re-read. Core and Pro limits filled in. Add-ons are on the page: Standard Data Processing Agreement and Business Associate Agreement $2,000 / month, additional concurrency $10 / line / month, additional organizations $20 / organization / month.",
    },
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
