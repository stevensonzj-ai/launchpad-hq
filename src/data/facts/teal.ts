import type { ToolFacts } from "./types";

const TEAL_PRICING_URL = "https://www.tealhq.com/pricing";

/** New catalog row. Facts gathered 2026-10-26 from tealhq.com only. */
export default {
  slug: "teal",
  lifecycle: "active",
  company: {
    value: "Teal Labs, Inc.",
    note: "Privacy policy (last updated August 12, 2026) names Teal Labs, Inc.; the site footer reads \"© 2026 Teal Labs, Inc\".",
    sourceUrl: "https://www.tealhq.com/privacy-policy",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Free Forever: unlimited resumes and job tracking, 10 resume templates, top 5 job-description keywords, basic resume analysis, 1 email template per job stage, and AI credits (5 resume bullets, 2 professional summaries, 2 cover letters).",
    },
    sourceUrl: TEAL_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free Forever", price: "$0", period: "", limits: "Limited templates, keyword matching and AI credits" },
      { name: "Teal+ 7-day", price: "$13", period: "7 days", limits: "Unlimited AI credits, templates and keyword matching" },
      { name: "Teal+ 30-day", price: "$29", period: "30 days", limits: "Unlimited AI credits, templates and keyword matching" },
      { name: "Teal+ 90-day", price: "$79", period: "90 days", limits: "Unlimited AI credits, templates and keyword matching" },
    ],
    note: "USD, as shown on the pricing page 2026-10-26. The page says \"No credit card required to start\" and that a cancelled Teal+ account reverts to the free plan at the end of the billing period.",
    sourceUrl: TEAL_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  platforms: {
    value: ["Web", "Chrome extension"],
    note: "The homepage describes a free Chrome extension for bookmarking jobs from job boards. No mobile-app store links were found on tealhq.com.",
    sourceUrl: "https://www.tealhq.com/",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "AI resume builder with multiple tailored resume versions.",
      "Job application tracker for bookmarking jobs, notes and application statuses.",
      "Job description keyword matching with a Match Score against your resume.",
      "AI cover letter, professional summary and resume bullet generators.",
      "Email templates for each stage of the job search.",
      "LinkedIn profile review and LinkedIn summary generator.",
    ],
    sourceUrl: TEAL_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "New listing: Teal free plan and Teal+ 7, 30 and 90-day prices from the official pricing page.",
    },
  ],
} satisfies ToolFacts;
