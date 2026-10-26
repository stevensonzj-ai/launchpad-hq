import type { ToolFacts } from "./types";

export default {
  slug: "writesonic-chatsonic",
  lifecycle: "active",
  company: {
    value: "Writesonic, Inc.",
    note: "Copyright © 2026 Writesonic, Inc.",
    sourceUrl: "https://writesonic.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. The pricing page offers a free trial with no credit card needed.",
    },
    sourceUrl: "https://writesonic.com/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Starter", price: "$79", period: "month", limits: "Billed annually; 1 user, 1 project" },
      { name: "Basic", price: "$199", period: "month", limits: "Billed annually; 2 users, 1 project" },
      { name: "Growth", price: "$399", period: "month", limits: "Billed annually; 3 users, 2 projects" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Custom users, projects and access control" },
    ],
    note: "USD, billed annually. Chatsonic is not on the pricing page.",
    sourceUrl: "https://writesonic.com/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-25",
      field: "plans",
      summary: "Plans now from writesonic.com/pricing (Starter $79, Basic $199, Growth $399 per month billed annually; Enterprise custom). Stale Chatsonic plans removed; no free plan, free trial only.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: Chatsonic Free and Individual $16/mo billed annually. No models row from /chat (stale). Writesonic SEO/AI-visibility from $79/mo billed annually noted.",
    },
  ],
} satisfies ToolFacts;
