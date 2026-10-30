import type { ToolFacts } from "./types";

/**
 * Microsoft Power Automate: first fact file, stale-facts batch 2 (catalog
 * audit 18), 2026-10-29. Read twice on microsoft.com and Microsoft Learn. A
 * free licence for work or school accounts covers basic flows with standard
 * connectors; Premium is $15 per user a month, paid yearly. The trial length
 * differs between pages (30 days on the pricing page, 90 in Learn), so no
 * trial length is written.
 *
 * The Research Analyst's browser check the same day confirmed the 30-day
 * trial on the pricing page ("Start automating for free with a 30-day
 * trial"); the product page also says "free for 30 days". Catalog audit 19
 * adds it to the row. One Learn page (sign-up, 2026-09-16) still says 90
 * days.
 */
export default {
  slug: "microsoft-power-automate",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.microsoft.com/en-us/power-platform/products/power-automate",
    sourceUrl: "https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Microsoft",
    sourceUrl: "https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free licence for work or school accounts: cloud flows (no sharing), attended desktop flows on your own PC, and standard connectors only. Microsoft 365 licences include a limited set of Power Automate capabilities. Premium features have a 30-day free trial.",
    },
    note: "Trial length, browser check 2026-10-29: \"Start automating for free with a 30-day trial\" (pricing page). A Microsoft Learn sign-up page (2026-09-16) still says 90 days.",
    sourceUrl: "https://learn.microsoft.com/en-us/power-platform/admin/power-automate-licensing/types",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Premium",
        price: "$15",
        period: "user/month",
        limits: "Paid yearly; premium and custom connectors, attended RPA, 5,000 AI Builder credits a month, 40,000 actions a day",
      },
      {
        name: "Process",
        price: "$150",
        period: "bot/month",
        limits: "Paid yearly; one unattended bot, 5,000 AI Builder credits a month",
      },
      {
        name: "Hosted Process",
        price: "$215",
        period: "bot/month",
        limits: "Paid yearly; adds a Microsoft-hosted VM",
      },
      {
        name: "Process Mining add-on",
        price: "$5,000",
        period: "tenant/month",
        limits: "Paid yearly; 100 GB",
      },
    ],
    note: "USD (en-us page), as of 2026-10-29.",
    sourceUrl: "https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing",
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
      summary: "First fact file: free licence for work/school accounts; Premium $15/user/mo, Process $150/bot/mo, paid yearly.",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "Browser check: the premium trial is 30 days (pricing page).",
    },
  ],
} satisfies ToolFacts;
