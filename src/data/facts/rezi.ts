import type { ToolFacts } from "./types";

const REZI_PRICING_URL = "https://www.rezi.ai/pricing";

/** New catalog row. Facts gathered 2026-10-26 from rezi.ai only. */
export default {
  slug: "rezi",
  lifecycle: "active",
  company: {
    value: "Rezi",
    note: "The footer and legal page (rezi.ai/legal) name the company only as \"Rezi\"; no legal entity is stated.",
    sourceUrl: "https://www.rezi.ai/legal",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "1 resume, 1 AI interview, 3 PDF downloads, limited keyword targeting and content analysis, unlimited cover and resignation letters. No card required.",
    },
    sourceUrl: REZI_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "1 resume, 3 PDF downloads" },
      { name: "Pro", price: "$29", period: "month", limits: "Unlimited resumes, AI and downloads; 1 expert resume review per month" },
      { name: "Lifetime", price: "$149", period: "one-time", limits: "Pro features; no free monthly expert review" },
      { name: "Enterprise", price: "$99", period: "month", limits: "Per 200 users; for universities, agencies and career sites; SSO, webhooks, team roles" },
    ],
    note: "USD, as of 2026-10-26. Paid plans (Pro and Lifetime) carry a 30-day money-back guarantee per the pricing FAQ.",
    sourceUrl: REZI_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "Chrome extension", "iOS"],
    note: "Chrome extension per rezi.ai/rezi-chrome-extension; the homepage says \"Also available on App Store\".",
    sourceUrl: "https://www.rezi.ai/rezi-chrome-extension",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/app/id6792986409",
    },
    note: "App Store link as linked from the rezi.ai homepage.",
    sourceUrl: "https://www.rezi.ai/",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  features: {
    value: [
      "Rezi Score rates a resume on 23 metrics for ATS and hiring readiness.",
      "AI Keyword Targeting tailors a resume to a job description's keywords.",
      "AI resume writer, editor and summary writer.",
      "AI cover letter and resignation letter writers.",
      "AI Interview practice.",
      "Exports to PDF, Microsoft Word (DOCX) and Google Drive.",
    ],
    sourceUrl: REZI_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "New listing: Rezi Free, Pro, Lifetime and Enterprise prices from the official pricing page.",
    },
  ],
} satisfies ToolFacts;
