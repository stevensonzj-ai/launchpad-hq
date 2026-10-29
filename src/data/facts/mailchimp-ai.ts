import type { ToolFacts } from "./types";

/**
 * Mailchimp AI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Plans read twice on mailchimp.com/pricing/marketing/. The Research
 * Analyst's browser check the same day (0-500 contacts) settled the
 * after-12-months price: Essentials and Standard have 14-day free trials
 * and then start at $13 and $20; only Premium shows an intro price
 * ($297.50 a month for 12 months, then $350).
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
        limits: "\"Free for 14 days. Then, starts at $13/month\"; generative AI not included",
      },
      {
        name: "Standard",
        price: "$20",
        period: "month",
        limits: "\"Free for 14 days. Then, starts at $20/month\"; generative AI at no extra cost; up to 6,000 emails a month",
      },
      {
        name: "Premium",
        price: "$350",
        period: "month",
        limits: "$297.50 a month for the first 12 months, then $350; generative AI at no extra cost; up to 150,000 emails a month",
      },
    ],
    note: "USD, as of 2026-10-29, at 0-500 contacts; prices rise with contact count. Browser check: \"See Free Trial Terms. Overages apply if contact or email send limit is exceeded.\" Annual plans are available only for Standard and Premium at 10,000+ contacts, through sales.",
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
    {
      date: "2026-10-29",
      field: "plans",
      summary:
        "Browser check: Essentials $13 and Standard $20 are the regular prices after a 14-day trial; Premium is $297.50 for 12 months, then $350.",
    },
  ],
} satisfies ToolFacts;
