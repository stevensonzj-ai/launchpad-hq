import type { ToolFacts } from "./types";

/**
 * Amazon Q Developer: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on aws.amazon.com and docs.aws.amazon.com.
 * Both readers agree: the product page says AWS will discontinue support for
 * the Amazon Q Developer IDE plugins on April 30, 2027 and points to Kiro. The
 * pricing page lists a perpetual Free tier (50 agentic chat interactions a
 * month; 1,000 lines of code a month for Java upgrades) and Pro at $19 per user
 * a month (4,000 lines of code per user a month, pooled, $0.003 per extra line;
 * admin dashboard and IP indemnity). The Free tier may be used for service
 * improvement including model training, with an opt-out; Pro content is not.
 * The guide reports that new signups, and Pro, closed on May 15, 2026; neither
 * reader saw that, so it is on the Browser-check list.
 */
export default {
  slug: "amazon-q-developer",
  lifecycle: "active",
  status: {
    value: {
      headline: "AWS will discontinue support for the Amazon Q Developer IDE plugins on April 30, 2027.",
      details: [
        "The product page tells users to explore Kiro for the latest models and features."
      ],
      whatToDo: "Move editor work to Kiro (kiro.dev) before April 30, 2027.",
      alternatives: [
        {
          slug: "kiro",
          name: "Kiro"
        }
      ],
      additionalSources: [
        "https://aws.amazon.com/q/developer/faqs/"
      ]
    },
    note: "Product page: \"On April 30, 2027, AWS will discontinue support for Amazon Q Developer IDE plugins.\"",
    sourceUrl: "https://aws.amazon.com/q/developer/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  freeTier: {
    value: {
      available: true,
      summary: "Perpetual Free tier: 50 agentic chat interactions a month and 1,000 lines of code a month for Java upgrades; no admin dashboard or IP indemnity."
    },
    sourceUrl: "https://aws.amazon.com/q/developer/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "50 agentic chat interactions a month; 1,000 lines of code a month for Java upgrades"
      },
      {
        name: "Pro",
        price: "$19",
        period: "user/month",
        limits: "Higher agentic and transformation limits; 4,000 lines of code per user a month, pooled at the account level, $0.003 per extra line; admin dashboard; IP indemnity"
      }
    ],
    note: "USD, as of 2026-10-29. Billed monthly and prorated in the first month; a mid-month cancellation still pays the full month.",
    sourceUrl: "https://aws.amazon.com/q/developer/pricing/",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      trainsOnData: true,
      policyUrl: "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/service-improvement.html"
    },
    note: "\"We may use certain content from Amazon Q Developer Free tier for service improvement\", which may include model training; Pro content is not used. Opt-out: IDE settings, or an AWS Organizations AI services opt-out policy for the console and other surfaces. Data location is not stated.",
    sourceUrl: "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/service-improvement.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "status",
      summary: "First fact file: IDE plugin support ends April 30, 2027 (Kiro); Free tier 50 agentic interactions a month; Pro $19 per user a month."
    }
  ],
} satisfies ToolFacts;
