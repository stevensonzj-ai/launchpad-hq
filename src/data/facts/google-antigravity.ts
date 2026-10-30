import type { ToolFacts } from "./types";
import antigravityCliFacts from "./antigravity-cli";

/**
 * Google Antigravity: the catalog row pointed at idx.google.com, which now redirects to Firebase Studio.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 *
 * Plans and free tier added in catalog audit 20 (stale facts batch 4), 2026-10-29,
 * replacing the row's "Free (preview)" wording. Google's Antigravity pricing and
 * plans pages cover the desktop app and the CLI alike, so they reuse the
 * two-reader facts in antigravity-cli.ts (individuals $0 with weekly rate limits;
 * Google AI Pro and Ultra; Gemini Enterprise for organisations).
 *
 * Privacy added in the same audit after the Research Analyst's browser check
 * of 2026-10-29. The IDE and the CLI run under the same Antigravity terms
 * (the IDE guide says free and paid use fall under the same terms), so the
 * row's privacy follows the CLI row: LOW. CLAUDE.md's rubric puts "inputs used
 * for training by default" at LOW and "improvement with opt-out" at MEDIUM;
 * the FAQ's opt-out ("You can opt out of data collection at any point from
 * the Settings panel") is not tied to a plan and does not mention training,
 * so it does not establish a training opt-out. This row was HIGH before.
 */
export default {
  slug: "google-antigravity",
  lifecycle: "active",
  officialUrl: {
    value: "https://antigravity.google/",
    sourceUrl: "https://antigravity.google/",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  freeTier: {
    ...antigravityCliFacts.freeTier,
    note: `${antigravityCliFacts.freeTier.note} The same pricing page covers the desktop app and the CLI.`,
  },
  plans: {
    ...antigravityCliFacts.plans,
    note: `${antigravityCliFacts.plans.note} The same plans cover the desktop app and the CLI.`,
  },
  privacy: {
    ...antigravityCliFacts.privacy,
    note: `${antigravityCliFacts.privacy.note} The IDE guide says the IDE and the CLI fall under the same terms.`,
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "officialUrl",
      summary: "Official link fixed to antigravity.google (was idx.google.com, which redirects to Firebase Studio).",
    },
    {
      date: "2026-10-29",
      field: "plans",
      summary: "Free tier and plans added from Google's Antigravity pricing page: $0 for individuals with weekly rate limits; Google AI Pro and Ultra; Gemini Enterprise. Replaces \"Free (preview)\".",
    },
    {
      date: "2026-10-29",
      field: "privacy",
      summary: "Privacy added (same terms as the CLI): interactions are used to improve Google's products and machine learning, and reviewers may see them; the FAQ opt-out covers data collection, not training. HIGH -> LOW to match the CLI row.",
    },
  ],
} satisfies ToolFacts;
