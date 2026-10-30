import type { ToolFacts } from "./types";

/**
 * Clio Manage: first fact file, catalog audit 21, 2026-10-29. From the
 * Research Analyst's browser check of the batch-4 rows (logged out, US, USD;
 * "RA browser check 2026-10-29"). The batch-4 readers got 403 on every
 * clio.com page, so nothing was readable until then.
 *
 * Pricing page: Starter "STARTING AT $49/USER"; the FAQ says "Clio's plans
 * start at $49 USD per user per month." Core, Signature and Elite show "Get
 * pricing"; Enterprise "Book a demo". No monthly or annual toggle is shown, so
 * the billing basis is not stated. No free tier; "7-DAY FREE TRIAL, NO CREDIT
 * CARD". AI: "Is AI included in my plan? Yes, on Core and above. AI comes as
 * part of the plan rather than as a separate add-on." Clio Work is an
 * add-on ("Research, analyze, and draft with legal AI"; price: Get pricing).
 * Vincent is "Book a demo". The page does not name "Clio Duo". Training: "Is
 * my firm's data used to train AI? No. Your firm's data stays in Clio and is
 * never used for AI training or any other external purpose." Enterprise:
 * "Zero-retention agreements with LLM providers; your data is never used to
 * train models." Cost tier PAID is audit 11's.
 */
export default {
  slug: "clio-manage",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free tier; a 7-day free trial with no credit card required.",
    },
    sourceUrl: "https://www.clio.com/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Starter",
        price: "$49",
        period: "user/month",
        limits: "Starting price; AI is included from Core up",
      },
      {
        name: "Core",
        price: "Get pricing",
        period: "",
        limits: "AI included as part of the plan",
      },
      {
        name: "Signature",
        price: "Get pricing",
        period: "",
        limits: "AI included as part of the plan",
      },
      {
        name: "Elite",
        price: "Get pricing",
        period: "",
        limits: "AI included as part of the plan",
      },
      {
        name: "Enterprise",
        price: "Book a demo",
        period: "",
        limits: "Zero-retention agreements with LLM providers",
      },
      {
        name: "Clio Work (add-on)",
        price: "Get pricing",
        period: "",
        limits: "Research, analyze and draft with legal AI; sold as an add-on",
      },
    ],
    note: "USD, logged-out US browser check, 2026-10-29. Only Starter shows a price; the page has no monthly or annual toggle, so the billing basis is not stated. Vincent is book-a-demo. Prices and plan names differ by region.",
    sourceUrl: "https://www.clio.com/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://www.clio.com/pricing/",
    },
    note: "FAQ: \"Is my firm's data used to train AI? No. Your firm's data stays in Clio and is never used for AI training or any other external purpose.\" Enterprise: \"Zero-retention agreements with LLM providers; your data is never used to train models.\" Clio's terms (cited in the guide) separately let Clio de-identify and aggregate AI content to improve the services, so the pricing-page FAQ is not the whole picture.",
    sourceUrl: "https://www.clio.com/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file (browser check): Starter $49 per user a month; Core and up get pricing; 7-day trial, no free tier; AI included from Core up; Clio Work is an add-on; firm data is never used for AI training.",
    },
  ],
} satisfies ToolFacts;
