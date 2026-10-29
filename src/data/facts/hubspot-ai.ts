import type { ToolFacts } from "./types";

/**
 * HubSpot AI (Breeze): first fact file, stale-facts batch 1 (catalog audit
 * 17), 2026-10-29. Free CRM limits read twice. Plan prices are not recorded:
 * the Starter page shows $7 and $20 per seat beside a monthly/annual toggle
 * without saying which is which, and the monthly HubSpot credit amounts
 * differ between the pricing page and HubSpot's credits supplement.
 */
export default {
  slug: "hubspot-ai",
  lifecycle: "active",
  company: {
    value: "HubSpot",
    note: "ChatSpot is retired: chatspot.ai redirects to the Breeze AI Assistant page.",
    sourceUrl: "https://www.hubspot.com/products/artificial-intelligence/breeze-ai-assistant",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free CRM for up to two users and 1,000 contacts, with no expiry; Breeze Assistant is included.",
    },
    note: "\"With up to two users, 1,000 contacts, and no limits on customer data\"; \"Breeze Assistant is included in the free CRM.\"",
    sourceUrl: "https://www.hubspot.com/products/crm",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {  },
    note: "Breeze page: \"Third-party AI providers are contractually prohibited from training their models on your data.\" Whether HubSpot trains its own models was not checked (see trust.hubspot.com/ai).",
    sourceUrl: "https://www.hubspot.com/products/artificial-intelligence/breeze-ai-assistant",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: free CRM is up to two users (the catalog said five), Breeze Assistant included, ChatSpot retired. Plan prices and credit amounts left for a browser check.",
    },
  ],
} satisfies ToolFacts;
