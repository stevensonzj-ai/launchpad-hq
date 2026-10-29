import type { ToolFacts } from "./types";

/**
 * Mailchimp AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans read twice on mailchimp.com/pricing/marketing/. The
 * prices are shown "for 12 months"; the price after that did not render
 * and is on the Browser-check list.
 */
export default {
  slug: "mailchimp-ai",
  lifecycle: "active",
  company: {
    value: "Intuit Mailchimp",
    sourceUrl: "https://mailchimp.com/pricing/marketing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free plan: up to 250 contacts and 500 emails a month (250 a day). Generative AI features are not included.",
    },
    note: "Plan table: \"Limit of 250 contacts\", \"Max of 500/mo or 250/day\", \"Generative AI Features: Not included\".",
    sourceUrl: "https://mailchimp.com/pricing/marketing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "",
        limits: "250 contacts; 500 emails a month, 250 a day; no generative AI",
      },
      {
        name: "Essentials",
        price: "$13",
        period: "month",
        limits: "Shown \"for 12 months\"; generative AI not included",
      },
      {
        name: "Standard",
        price: "$20",
        period: "month",
        limits: "Shown \"for 12 months\"; generative AI at no extra cost; up to 6,000 emails a month",
      },
      {
        name: "Premium",
        price: "$350",
        period: "month",
        limits: "Shown \"for 12 months\"; generative AI at no extra cost; up to 150,000 emails a month",
      },
    ],
    note: "USD, as of 2026-10-29, at the page's default contact count. Paid prices are shown \"/mo for 12 months\" (businesses with 10,000+ contacts save 15% for the first 12 months); the price after 12 months did not render. Essentials and Standard have 14-day trials.",
    sourceUrl: "https://mailchimp.com/pricing/marketing/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { trainsOnData: true, policyUrl: "https://www.intuit.com/privacy/statement/" },
    note: "Intuit's privacy statement says it may use personal information \"by training our artificial intelligence models and other machine learning models\", including \"certain content our customers send or display through the Platform\". Read once.",
    sourceUrl: "https://www.intuit.com/privacy/statement/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: Free is 250 contacts and 500 emails/mo with no generative AI (the catalog said 500 contacts, 1,000 emails and basic AI); AI starts at Standard.",
    },
  ],
} satisfies ToolFacts;
