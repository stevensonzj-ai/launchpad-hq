import type { ToolFacts } from "./types";

/**
 * OpenAI Codex CLI: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on the official GitHub repository and OpenAI's
 * Codex pricing docs (learn.chatgpt.com, where developers.openai.com/codex
 * now redirects). The CLI is open source; use comes with a ChatGPT plan
 * (sign-in is the main route) or an API key billed at API rates. The readers
 * disagreed on whether ChatGPT Free and Go include the CLI or only the
 * desktop app, so no freeTier fact is recorded (Browser-check list). The row
 * moves from FREE to FREEMIUM.
 *
 * The Research Analyst's check the same day settled it: the Codex CLI is
 * included on ChatGPT Free and Go; only Codex cloud (cloud tasks) is not.
 * The freeTier fact below is browser-verified (verifiedBy "ra"); catalog
 * audit 19 applies it to the row. The pricing page alone says only that
 * Codex is included on Free and Go, and the help article returned 403 to
 * the batch-3 reader.
 */
export default {
  slug: "openai-codex-cli",
  lifecycle: "active",
  company: {
    value: "OpenAI",
    sourceUrl: "https://github.com/openai/codex",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Sign in with a ChatGPT Free or Go account to use the Codex CLI, within plan usage limits. Codex cloud tasks are not included on Free and Go.",
    },
    note: "Browser check, 2026-10-29. The pricing page (learn.chatgpt.com/docs/pricing) says \"ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan\".",
    sourceUrl: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        limits: "Codex CLI included with usage limits; Codex cloud not included",
      },
      {
        name: "Go",
        price: "$8",
        period: "month",
        limits: "Codex CLI included; Codex cloud not included",
      },
      {
        name: "Plus",
        price: "$20",
        period: "month",
        limits: "Usage limits per 5-hour window; extra credits can be bought",
      },
      {
        name: "Pro",
        price: "From $100",
        period: "month",
        limits: "No five-hour limit",
      },
      {
        name: "Business",
        price: "$20",
        period: "user/month",
        limits: "Billed annually, 2+ users",
      },
      {
        name: "Enterprise & Edu",
        price: "Contact sales",
        period: "",
        limits: "",
      },
    ],
    note: "USD, as of 2026-10-29. API-key use is billed at OpenAI API rates.",
    sourceUrl: "https://learn.chatgpt.com/docs/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Sign in with ChatGPT is the main way to use the CLI; an API key also works but \"requires additional setup\".",
    ],
    sourceUrl: "https://github.com/openai/codex",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: use through ChatGPT plans (Plus $20, Pro from $100, Business $20/user) or an API key. Replaces \"uses your own OpenAI API key\" and \"Unlimited\".",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "Browser check: the CLI is included on ChatGPT Free and Go; only Codex cloud is not.",
    },
  ],
} satisfies ToolFacts;
