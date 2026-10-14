import type { ToolFacts } from "./types";

export default {
  slug: "deepl",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "50,000 characters/month, 1 file translation/month (up to 5 MB), 1 glossary. Plan limits are listed per user/month.",
    },
    sourceUrl: "https://www.deepl.com/en/pro",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Individual",
        price: "€7.49",
        period: "month, EUR, billed annually",
        limits: "300k characters, 3 files; VAT included",
      },
      {
        name: "Team",
        price: "€24.99",
        period: "user/month, EUR, billed annually",
        limits: "1M characters, 20 files; VAT included",
      },
      {
        name: "Business",
        price: "€49.99",
        period: "user/month, EUR, billed annually",
        limits: "Unlimited characters (fair use), 100 files; VAT included",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    note: "Translator prices are EUR, billed annually. No USD conversion. Pro tiers include No data training. USD Translator prices unpublished.",
    sourceUrl: "https://www.deepl.com/en/pro",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apiPricing: {
    value:
      "USD. Developer free: 1M characters, one-time. Growth: $26/mo billed annually plus usage ($27.50 per 1M extra characters). Enterprise: custom.",
    sourceUrl: "https://www.deepl.com/en/pro-api",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Chrome extension", "Firefox extension", "Edge extension"],
    note: "FAQ lists browser extensions for Chrome, Firefox and Edge. Desktop and mobile apps unpublished.",
    sourceUrl: "https://www.deepl.com/en/pro",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded EUR Translator annual list prices and USD API prices. No USD conversion of Translator plans.",
    },
  ],
} satisfies ToolFacts;
