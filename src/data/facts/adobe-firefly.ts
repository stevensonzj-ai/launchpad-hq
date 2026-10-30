import type { ToolFacts } from "./types";

/**
 * Adobe Firefly: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on adobe.com. Both readers read the plans page
 * and agree: free daily generations across image, video and audio (the
 * daily count is not stated), no plan needed; paid plans carry 2,000 / 4,000 /
 * 10,000 / 50,000 generative credits a month (Standard, Pro, Pro Plus,
 * Premium), credits reset each billing cycle and do not roll over, and
 * standard image and vector generation is unlimited on paid plans. The row's
 * "25 generative credits/month free" is gone. USD prices are unverified: the
 * second reader's plans page rendered in Egyptian pounds. One reader read the
 * product page (Standard $9.99, Pro $19.99, Pro Plus $49.99 a month billed
 * monthly; teams Premium $199.99; the Pro-for-teams credits differ between
 * the two pages: 7,000 vs 4,000), and the "does not train on Creative Cloud
 * subscribers' personal content" statement. The row's old "Premium
 * $199.99/mo" is the teams price. Company, API pricing and the machine-learning
 * FAQ: not read by both.
 */
export default {
  slug: "adobe-firefly",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free daily generations across image, video and audio, with no plan needed; limits refresh every day and the daily count is not stated."
    },
    sourceUrl: "https://www.adobe.com/products/firefly/plans.html",
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
        limits: "Limited free daily generations; count not stated"
      },
      {
        name: "Firefly Standard",
        price: "$9.99",
        period: "month",
        limits: "2,000 generative credits a month"
      },
      {
        name: "Firefly Pro",
        price: "$19.99",
        period: "month",
        limits: "4,000 generative credits a month"
      },
      {
        name: "Firefly Pro Plus",
        price: "$49.99",
        period: "month",
        limits: "10,000 generative credits a month"
      },
      {
        name: "Firefly Premium",
        price: "Not captured",
        period: "month",
        limits: "50,000 generative credits a month"
      }
    ],
    note: "USD prices are from the product page (one reader), billed monthly. The plans page rendered in Egyptian pounds for the other reader, who confirmed the credit amounts. The Premium USD price was not captured. Free trials are linked for Standard, Pro and Pro Plus; trial length is not stated.",
    sourceUrl: "https://www.adobe.com/products/firefly.html",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified"
  },
  usageLimits: {
    value: {
      creditsExpire: "Credits reset each billing cycle and do not roll over.",
      other: [
        "Monthly generative credits: Standard 2,000, Pro 4,000, Pro Plus 10,000, Premium 50,000.",
        "Paid plans include unlimited standard image and vector generation; video, audio and partner models use credits."
      ]
    },
    note: "Both readers read the plans page and the FAQ.",
    sourceUrl: "https://www.adobe.com/products/firefly/plans.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  privacy: {
    value: {
      trainsOnData: false,
      policyUrl: "https://www.adobe.com/privacy/policy.html"
    },
    note: "One reader: \"Adobe does not train Adobe Firefly models or partner models on any Creative Cloud subscribers' personal content.\" Whether free, non-subscriber users are covered is not stated. The Gen AI user guidelines say inputs and outputs \"may be reviewed through both automated (such as machine learning) and manual methods\"; they say nothing on training. The other reader could not read the product page.",
    sourceUrl: "https://www.adobe.com/products/firefly.html",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free daily generations (count not stated) replace \"25 credits/month\"; paid plans carry 2,000 to 50,000 monthly credits that do not roll over."
    }
  ],
} satisfies ToolFacts;
