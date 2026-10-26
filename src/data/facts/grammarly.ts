import type { ToolFacts } from "./types";

const GRAMMARLY_PLANS_URL = "https://www.grammarly.com/plans";
const GRAMMARLY_PRO_URL = "https://www.grammarly.com/pro";

export default {
  slug: "grammarly",
  lifecycle: "active",
  company: {
    value: "Superhuman Platform",
    note: "Copyright line on grammarly.com/plans reads \"2026 © Superhuman Platform\" (as of 2026-10-26).",
    sourceUrl: GRAMMARLY_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Write without spelling and grammar mistakes, see your writing tone, and generate text with 100 AI prompts a month.",
    },
    sourceUrl: GRAMMARLY_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "100 AI prompts a month" },
      {
        name: "Pro",
        price: "$12",
        period: "member/month",
        limits: "Billed annually; $30 when billed monthly. 2,000 AI prompts a month; team accounts up to 149 people",
      },
      {
        name: "Enterprise",
        price: "Contact Sales",
        period: "",
        limits: "Available through Superhuman Go; unlimited AI prompts per member a month",
      },
    ],
    note: "USD, as of 2026-10-26. Pro price and billing from grammarly.com/pro (grammarly.com/premium redirects there).",
    sourceUrl: GRAMMARLY_PRO_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  platforms: {
    value: [
      "Windows",
      "Mac",
      "Chrome",
      "Safari",
      "Firefox",
      "Edge",
      "Microsoft Office",
      "Google Docs",
      "iPhone",
      "iPad",
      "Android",
    ],
    note: "From the \"Get Grammarly\" links on grammarly.com/plans (as of 2026-10-26).",
    sourceUrl: GRAMMARLY_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "Grammarly's FAQ says Pro includes all of Premium's advanced writing features, such as tone suggestions and full-sentence rewrites, plus team features that were previously only in the Business plan (as of 2026-10-26).",
      "Switching from Premium to Pro cancels the Premium subscription with a refund prorated to the remainder of it, per the same FAQ.",
    ],
    sourceUrl: GRAMMARLY_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "New fact file: Free, Pro ($12/member/month billed annually, $30 monthly) and Enterprise from Grammarly's own plans pages. Premium and Business are no longer listed.",
    },
  ],
} satisfies ToolFacts;
