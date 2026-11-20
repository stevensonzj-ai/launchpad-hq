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
 *
 * Catalog audit 21 (Research Analyst browser check, 2026-10-29, logged out,
 * US/USD) read the plans page itself: "You don't need a plan to get free
 * daily generations across image, video, and audio, with access to popular
 * models ... Limits refresh every day" (no number stated, no monthly free
 * credits); paid monthly plans Standard $9.99 / 2,000 credits, Pro $19.99 /
 * 4,000, Pro Plus $49.99 / 10,000, Premium $199.99 / 50,000; credit add-ons
 * available. So Premium $199.99 is on the plans page, not only a teams price.
 */
export default {
  slug: "adobe-firefly",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "You don't need a plan to get free daily generations for images, video, and audio. The page also says free daily generations and limited free daily generations for images and video, and the comparison table gives Free limited credits. No numeric daily limit is stated."
    },
    sourceUrl: "https://www.adobe.com/products/firefly/plans.html",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
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
        limits: "2,000 credits, up to 400 images and 20 five-second videos"
      },
      {
        name: "Firefly Pro",
        price: "$19.99",
        period: "month",
        limits: "Regularly US$19.99/mo. 4,000 credits."
      },
      {
        name: "Firefly Pro Plus",
        price: "$49.99",
        period: "month",
        limits: "Regularly US$49.99/mo. 10,000 credits."
      },
      {
        name: "Firefly Premium",
        price: "$199.99",
        period: "month",
        limits: "50,000 generative credits plus unlimited Adobe Firefly Video Model access"
      }
    ],
    note: "US$, read 2026-11-20. Sale, not list: save up to 60% on select plans for the first 6 months, ends Dec 6. Pro is US$9.99/mo for the first 6 months; Pro Plus is US$19.99/mo for 6 months.",
    sourceUrl: "https://www.adobe.com/products/firefly/plans.html",
    sourceKind: "plans-page",
    checkedAt: "2026-11-20",
    gatheredBy: "research-analyst",
    verifiedBy: "ra-recheck",
    verifiedAt: "2026-11-20",
    status: "verified"
  },
  usageLimits: {
    value: {
      creditsExpire: "Credits reset each billing cycle and do not roll over.",
      other: [
        "Monthly generative credits: Standard 2,000, Pro 4,000, Pro Plus 10,000, Premium 50,000.",
        "Paid plans include unlimited standard image and vector generation; video, audio and partner models use credits."
      ]
    },
    note: "Both readers read the plans page and the FAQ; the browser check of 2026-10-29 read the same credit amounts.",
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
      field: "plans",
      summary: "Browser check (audit 21): USD prices Standard $9.99, Pro $19.99, Pro Plus $49.99, Premium $199.99 a month; free tier is daily generations with no stated count (no monthly free credits)."
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free daily generations (count not stated) replace \"25 credits/month\"; paid plans carry 2,000 to 50,000 monthly credits that do not roll over."
    }
  ],
} satisfies ToolFacts;
