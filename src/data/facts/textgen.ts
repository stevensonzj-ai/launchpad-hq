import type { ToolFacts } from "./types";

/**
 * TextGen, formerly oobabooga's text-generation-webui. The repository is now
 * github.com/oobabooga/textgen, and the old address redirects there. Slug
 * moved from text-generation-webui-oobabooga (301 in
 * src/lib/catalog-redirects.ts; DB row renamed by
 * scripts/update-catalog-audit-15.ts). Guide PR D, 2026-10-29.
 */
export default {
  slug: "textgen",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "The project long known as oobabooga's text-generation-webui is now called TextGen, and its GitHub repository moved to oobabooga/textgen.",
      formerName: "text-generation-webui",
      whatToDo: "Nothing to do. Links to the old repository redirect to the new one.",
    },
    sourceUrl: "https://github.com/oobabooga/textgen",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  displayName: {
    value: "TextGen",
    sourceUrl: "https://github.com/oobabooga/textgen",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  officialUrl: {
    value: "https://github.com/oobabooga/textgen",
    sourceUrl: "https://github.com/oobabooga/textgen",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Open source", price: "$0", period: "", limits: "AGPL-3.0; runs locally" },
    ],
    note: "Free and open source. As of 2026-10-30.",
    sourceUrl: "https://github.com/oobabooga/textgen",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://github.com/oobabooga/textgen and price facts added with source and date." },
    {
      date: "2026-10-29",
      field: "displayName",
      summary: "text-generation-webui renamed TextGen. Slug moved from text-generation-webui-oobabooga to textgen.",
    },
  ],
} satisfies ToolFacts;
