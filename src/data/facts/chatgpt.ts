import type { ToolFacts } from "./types";

export default {
  slug: "chatgpt",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Unlimited text chats with GPT-6 (abuse guardrails apply)",
    },
    sourceUrl: "https://chatgpt.com/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "" },
      { name: "Go", price: "$8", period: "month", limits: "May include ads" },
      { name: "Plus", price: "$20", period: "month", limits: "" },
      { name: "Pro 100", price: "$100", period: "month", limits: "Billed monthly only" },
      { name: "Pro 200", price: "$200", period: "month", limits: "Billed monthly only" },
      { name: "Pro 500", price: "$500", period: "month", limits: "Billed monthly only; only Pro tier with Ultrafast" },
      {
        name: "Business",
        price: "$20",
        period: "user/month",
        limits: "Billed annually, 2+ users; $25 per user/month billed monthly",
      },
      { name: "Enterprise / Edu", price: "Contact sales", period: "", limits: "" },
    ],
    note: "USD, as of 2026-10-24. Pro tier details from OpenAI's Pro help article: https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers. The Go ads line is from https://chatgpt.com/pricing.",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
    checkedAt: "2026-11-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  models: {
    value: ["GPT-6.1 Sol", "GPT-6 Astra", "GPT-6 Sol", "GPT-6 Luna"],
    label: "GPT-6 family",
    sourceUrl: "https://chatgpt.com/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "ChatGPT Wallet, announced 2026-11-13, lets a dot complete a purchase after the user reviews it and approves it with a security check. The payment network then provides a payment token instead of the card details. It is rolling out to ChatGPT Pro subscribers aged 18 and older in the US with eligible US-issued cards.",
    ],
    note: "OpenAI's launch post, checked 2026-11-16. Plan prices above were not re-read.",
    sourceUrl: "https://openai.com/index/introducing-chatgpt-wallet/",
    sourceKind: "announcement",
    checkedAt: "2026-11-16",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-16",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-16",
      field: "features",
      summary:
        "X-watch: ChatGPT Wallet is rolling out to US Pro subscribers aged 18 and older with an eligible US-issued card. A dot pays only after the user approves, using a payment token.",
    },
    {
      date: "2026-10-24",
      field: "plans",
      summary: "Added official plan prices (Go $8, Pro $100/$200/$500, Business). Free tier now says GPT-6, since OpenAI's pages disagree on which GPT-6 variant Free uses.",
    },
    {
      date: "2026-10-13",
      field: "freeTier",
      summary: "Free tier is GPT-6 Luna, from the official pricing model table.",
    },
  ],
} satisfies ToolFacts;
