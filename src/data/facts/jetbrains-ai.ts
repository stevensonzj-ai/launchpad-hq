import type { ToolFacts } from "./types";

export default {
  slug: "jetbrains-ai",
  lifecycle: "active",
  displayName: {
    value: "JetBrains AI",
    note: "jetbrains.com/ai now leads to JetBrains Air (one system for building software with agents).",
    sourceUrl: "https://www.jetbrains.com/air/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  company: {
    value: "JetBrains s.r.o.",
    note: "Copyright © 2000-2026 JetBrains s.r.o. jetbrains.com/ai now leads to JetBrains Air.",
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "AI Free: unlimited completion, 3 credits/mo",
    },
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "AI Free",
        price: "Free",
        period: "",
        limits: "Unlimited completion, 3 credits/mo",
      },
      {
        name: "AI Pro",
        price: "$100/user/yr",
        period: "",
        limits: "",
      },
      {
        name: "AI Ultimate",
        price: "$300/user/yr",
        period: "",
        limits: "",
      },
    ],
    note: "Yearly prices only. Monthly prices unpublished (only the yearly tab was viewed). No /12 monthly figures.",
    sourceUrl: "https://www.jetbrains.com/store/ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["JetBrains IDEs", "Web", "CLI", "Mobile"],
    note: "Listed on JetBrains Air. jetbrains.com/ai redirects there.",
    sourceUrl: "https://www.jetbrains.com/air/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: [
      "Junie",
      "Claude Agent (third-party)",
      "Codex GPT 5.4 (third-party)",
      "Gemini CLI / Gemini 3 Flash (third-party)",
    ],
    note: "Junie is JetBrains' own agent. In-house model names unpublished.",
    sourceUrl: "https://www.jetbrains.com/air/",
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
        "Recorded AI Free / AI Pro $100/user/yr / AI Ultimate $300/user/yr. Noted jetbrains.com/ai now leads to JetBrains Air.",
    },
  ],
} satisfies ToolFacts;
