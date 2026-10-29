import type { ToolFacts } from "./types";

/**
 * Reducto: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Pricing read twice on reducto.ai/pricing. The page states the
 * starting balance two ways ("$150 in free usage" and "15,000 free
 * credits"); both are quoted and the link between them is not stated.
 */
export default {
  slug: "reducto",
  lifecycle: "active",
  company: {
    value: "Reducto, Inc.",
    sourceUrl: "https://reducto.ai/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "The self-serve Standard plan starts with $150 in free usage, then pay as you go. It is a one-time balance, not a monthly allowance.",
    },
    note: "\"$150 in free usage\"; \"After your free $150, standard rates apply\"; FAQ: \"Standard accounts include 15,000 free credits\". Whether the balance expires is not stated.",
    sourceUrl: "https://reducto.ai/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Standard",
        price: "Pay as you go",
        period: "",
        limits: "Parse $10, Extract $20, Split $20 per 1,000 pages after the free $150; up to 5 Studio seats",
      },
      {
        name: "Growth",
        price: "Custom",
        period: "",
        limits: "Unlimited Studio seats; zero data retention and HIPAA (BAA) agreements",
      },
      { name: "Enterprise", price: "Custom", period: "", limits: "VPC and on-premises deployment; SSO/SAML" },
    ],
    note: "USD, as of 2026-10-29.",
    sourceUrl: "https://reducto.ai/pricing",
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
      summary:
        "First fact file: Standard is pay as you go with $150 free usage (Parse $10 / 1,000 pages); Growth and Enterprise custom. Replaces 200 free pages/mo and Starter / Pro tiers.",
    },
  ],
} satisfies ToolFacts;
