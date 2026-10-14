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
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Chatsonic Free, $0.",
    },
    note: "Browser-verified 2026-10-14 on writesonic.com/chat. Writesonic.com/pricing also says “Start free. No credit card needed” (limits unpublished).",
    sourceUrl: "https://writesonic.com/chat",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Chatsonic Free",
        price: "$0",
        period: "",
        limits: "",
      },
      {
        name: "Chatsonic Individual",
        price: "$16/mo",
        period: "billed annually",
        limits: "",
      },
    ],
    note: "Browser-verified 2026-10-14 on writesonic.com/chat: Free $0; Individual $16/mo billed annually. Monthly-billed Chatsonic prices unpublished. Writesonic is now an SEO/AI-visibility tool with plans from $79/mo billed annually (writesonic.com/pricing: Starter $79, 1 user; Basic $199, 2 users; Growth $399; monthly-billed prices unpublished). Chatsonic is not mentioned on the pricing page.",
    sourceUrl: "https://writesonic.com/chat",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Chatsonic Free and Individual $16/mo billed annually (browser-verified). Writesonic SEO/AI-visibility plans from $79/mo billed annually noted separately.",
    },
  ],
} satisfies ToolFacts;
