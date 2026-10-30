import type { ToolFacts } from "./types";

/**
 * Murf AI: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * The row had no company or website. Murf's terms name Murf Inc.; the
 * site is murf.ai. Free: 10 minutes of voice generation, no downloads,
 * no card. Creator from $19 and Business from $66 a month billed
 * annually (not "$29/mo"). murf.ai/pricing renders only in a browser,
 * so monthly-billing prices are not recorded. One Murf page
 * (text-to-speech FAQ) says the free plan includes commercial rights
 * while the homepage FAQ says it does not, so commercial use on Free is
 * left out.
 */
export default {
  slug: "murf-ai",
  lifecycle: "active",
  officialUrl: {
    value: "https://murf.ai",
    sourceUrl: "https://murf.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Murf Inc.",
    note: "Terms of Service: \"You are entering into this User Agreement with Murf Inc.\" The site footer says \"© 2026 Murf AI\".",
    sourceUrl: "https://murf.ai/legal/terms-of-service",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free, no card: 10 minutes of voice generation; voiceovers can only be downloaded on paid plans.",
    },
    sourceUrl: "https://murf.ai/text-to-speech",
    sourceKind: "product-page",
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
        limits: "10 minutes of voice generation; no downloads",
      },
      {
        name: "Creator",
        price: "$19",
        period: "month",
        limits: "Starting price, billed annually",
      },
      {
        name: "Business",
        price: "$66",
        period: "month",
        limits: "Starting price, billed annually",
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        limits: "",
      },
    ],
    note: "USD, as of 2026-10-29, from the text-to-speech page FAQ (murf.ai/pricing renders only in a browser). Monthly-billing prices not recorded.",
    sourceUrl: "https://murf.ai/text-to-speech",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  apiPricing: {
    value: "Murf API: free trial of 100,000 characters; pay as you go $0.03 per 1,000 characters ($2 minimum); custom plans through sales.",
    sourceUrl: "https://help.murf.ai/murf-api-plans-and-limits",
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
      summary: "First fact file: company Murf Inc. and site murf.ai added; free 10 min; Creator from $19/mo and Business from $66/mo billed annually (was \"$29/mo\").",
    },
  ],
} satisfies ToolFacts;
