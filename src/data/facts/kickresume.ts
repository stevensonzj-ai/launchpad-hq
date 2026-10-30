import type { ToolFacts } from "./types";

/** www.kickresume.com/en/pricing/ 302-redirected here on 2026-10-26 (a 20%-off sale page). */
const KICKRESUME_PRICING_URL = "https://www.kickresume.com/en/pricing/sale/";

/** New catalog row. Facts gathered 2026-10-26 from kickresume.com only. */
export default {
  slug: "kickresume",
  lifecycle: "active",
  company: {
    value: "Kickresume s.r.o.",
    note: "Terms of Use: the site \"is owned by Kickresume s.r.o.\".",
    sourceUrl: "https://www.kickresume.com/terms/",
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
        "Free while you use only free customization options: 4 free resume templates, unlimited downloads. Free for students verified through ISIC, ITIC or UNiDAYS.",
    },
    sourceUrl: KICKRESUME_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Yearly", price: "$8", period: "month, billed every 12 months", limits: "Includes vouchers for 5 friends" },
      { name: "Quarterly", price: "$18", period: "month, billed every 3 months", limits: "Includes vouchers for 3 friends" },
      { name: "Monthly", price: "$24", period: "month", limits: "" },
    ],
    note: "USD, as of 2026-10-30: Yearly $8/month (\"Pay $96 every 12 months\"), Quarterly \"Pay $54 every 3 months\", Monthly $24/month. The limited-time 20% discount shown on 2026-10-26 is no longer on the page. All paid plans list a 14-day money-back guarantee.",
    sourceUrl: KICKRESUME_PRICING_URL,
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  platforms: {
    value: ["Web", "iOS", "Android"],
    sourceUrl: KICKRESUME_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/app/resume-builder-by-kickresume/id1523618695/",
      android: "https://play.google.com/store/apps/details?id=com.kickresume",
    },
    note: "Store links as linked from kickresume.com.",
    sourceUrl: KICKRESUME_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "AI Writer that generates a resume from your job title and the job ad.",
      "AI cover letter writer and 40+ cover letter templates matching the resume templates.",
      "ATS Resume Checker that scores your resume for applicant tracking systems.",
      "Career Map that suggests career paths from your resume.",
      "LinkedIn and PDF import.",
      "Personal website builder with 7 templates on paid plans.",
    ],
    sourceUrl: KICKRESUME_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "plans",
      summary: "Re-read: the limited-time 20% discount has ended; regular prices Yearly $8/mo ($96/yr), Quarterly $54 per 3 months, Monthly $24.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "New listing: Kickresume free use and Yearly, Quarterly and Monthly regular prices from the official pricing page.",
    },
  ],
} satisfies ToolFacts;
