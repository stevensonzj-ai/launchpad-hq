import type { ToolFacts } from "./types";

/**
 * HubSpot AI (Breeze): first fact file, stale-facts batch 1 (catalog audit
 * 17), 2026-10-29. Free CRM limits read twice. The batch-1 readers could not
 * tell which Starter price was monthly and which annual. The Research
 * Analyst's browser check the same day (hubspot.com/pricing/marketing) read
 * the Marketing Hub plans and included HubSpot credits; those are recorded
 * below and applied to the row by catalog audit 18. Starter's lower price is
 * a new-customer offer.
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
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-20",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        limits: "Free for up to 2 users",
      },
      {
        name: "Marketing Hub Starter",
        price: "$20",
        period: "seat/month",
        limits: "Struck list price per seat. Limited-time new-customer prices are on the page and have no stated end date, so they are not the list price.",
      },
      {
        name: "Marketing Hub Professional",
        price: "$800",
        period: "month",
        limits: "Starts at $800/mo billed annually. Monthly is $890/mo. 3 Core Seats; additional seats $45/mo on annual or $50/mo on monthly. One-time onboarding fee $3,000.",
      },
      {
        name: "Marketing Hub Enterprise",
        price: "$3,600",
        period: "month",
        limits: "Starts at $3,600/mo. 5 Core Seats; additional seats $75/mo. Onboarding fee $7,000.",
      },
    ],
    note: "USD, read 2026-11-20. Stored HubSpot credit amounts were not on this read.",
    sourceUrl: "https://www.hubspot.com/pricing/marketing",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: Marketing Hub Starter $7/seat/mo paid annually ($10 monthly, new customers; list $20), Professional $800/mo, Enterprise $3,600/mo; HubSpot credits 500 / 3,000 / 5,000.",
    },
  ],
} satisfies ToolFacts;
