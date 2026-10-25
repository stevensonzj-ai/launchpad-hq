import type { ToolFacts } from "./types";

/**
 * Mistral Vibe, formerly Le Chat. Rename confirmed on mistral.ai on
 * 2026-10-25 ("Le Chat is now Vibe"). The catalog slug moves from
 * mistral-ai-le-chat (301 in src/lib/catalog-redirects.ts; DB row renamed
 * by scripts/update-catalog-audit-6.ts).
 */
export default {
  slug: "mistral-vibe",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Mistral renamed its Le Chat assistant to Vibe. Mistral says all conversations, settings and plans carry over.",
      formerName: "Le Chat",
      whatToDo: "Nothing to do. Existing accounts keep working under the new name.",
    },
    sourceUrl: "https://mistral.ai/products/le-chat",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  displayName: {
    value: "Mistral Vibe",
    sourceUrl: "https://mistral.ai/products/le-chat",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free plan with limited messages, web searches and coding sessions.",
    },
    sourceUrl: "https://mistral.ai/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Limited messages and web searches" },
      { name: "Pro", price: "$14.99", period: "month", limits: "Excluding taxes; verified students $5.99/month for up to 12 months" },
      { name: "Team", price: "$24.99", period: "user/month", limits: "Excluding taxes" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Contact sales" },
    ],
    note: "USD as shown on mistral.ai/pricing (EUR also selectable).",
    sourceUrl: "https://mistral.ai/pricing",
    checkedAt: "2026-10-25",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-25",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-25",
      field: "displayName",
      summary: "Le Chat renamed Vibe (official product page). Slug moved from mistral-ai-le-chat to mistral-vibe.",
    },
  ],
} satisfies ToolFacts;
