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
 * row's privacy follows the CLI row. Audit 20 first rated both LOW because
 * the FAQ opt-out did not name training. The analyst's second browser pass
 * (catalog audit 21) found the Enable Telemetry setting, which the terms tie
 * to the improvement and human-review use for individual accounts, and Zach
 * confirmed MEDIUM: CLAUDE.md's rubric puts "inputs used for training by
 * default" at LOW and "improvement with an opt-out" at MEDIUM. This row was
 * HIGH before audit 20. See antigravity-cli.ts for the quoted terms.
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
    {
      date: "2026-10-29",
      field: "privacy",
      summary: "Privacy MEDIUM (Zach, audit 21): the Enable Telemetry setting is the opt-out from the improvement and human-review use for individual accounts; business accounts have it always off; service, safety and feedback uses continue with it off.",
    },
  ],
} satisfies ToolFacts;
