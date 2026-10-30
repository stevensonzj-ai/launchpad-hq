import type { ToolFacts } from "./types";

/**
 * Spellbook: first fact file, stale-facts batch 4 (catalog audit 20),
 * 2026-10-29. Read twice, blind, on spellbook.com. The site moved from
 * spellbook.legal (301 to spellbook.com). No prices are published: custom
 * pricing set by the number of team members on a license; book a demo. Lawyers
 * and legal teams can try it free for 7 days; there is no permanent free tier.
 * The row's "From $99/user/mo" has no source. Audit 11 owns the PAID cost tier.
 * One reader only: the company is Dialog Enterprises Inc. carrying on business
 * as Spellbook (privacy policy), academic institutions get free access, and
 * zero data retention agreements with OpenAI and Anthropic (security page).
 * Neither reader found a training statement for customer documents.
 */
export default {
  slug: "spellbook",
  lifecycle: "active",
  officialUrl: {
    value: "https://spellbook.com",
    note: "spellbook.legal/pricing returns a 301 redirect to spellbook.com/pricing.",
    sourceUrl: "https://spellbook.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  company: {
    value: "Dialog Enterprises Inc., carrying on business as Spellbook",
    note: "One reader. The pricing page footer reads only \"© 2026 Spellbook\".",
    sourceUrl: "https://spellbook.com/privacy-policy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified"
  },
  freeTier: {
    value: {
      available: false,
      summary: "No permanent free tier: lawyers and legal teams can try Spellbook free for 7 days."
    },
    sourceUrl: "https://spellbook.com/pricing",
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
        name: "Law firms",
        price: "Custom",
        period: "",
        limits: "Priced by the number of team members on a license; book a demo"
      },
      {
        name: "In-house teams",
        price: "Custom",
        period: "",
        limits: "Priced by the number of team members on a license; book a demo"
      }
    ],
    note: "No prices are published. The Spellbook Suite lists a Word Add-In and Associate.",
    sourceUrl: "https://spellbook.com/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified"
  },
  features: {
    value: [
      "Academic institutions get free access (privacy policy, one reader).",
      "Zero data retention agreements with OpenAI and Anthropic; data centres in Canada and the US (security page, one reader)."
    ],
    sourceUrl: "https://spellbook.com/security",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified"
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: site moved to spellbook.com; custom pricing by team size; 7-day trial; the row's \"From $99/user/mo\" has no source."
    }
  ],
} satisfies ToolFacts;
