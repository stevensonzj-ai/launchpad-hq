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
  ],
} satisfies ToolFacts;
