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
  changelog: [
    {
      date: "2026-10-29",
      field: "displayName",
      summary: "text-generation-webui renamed TextGen. Slug moved from text-generation-webui-oobabooga to textgen.",
    },
  ],
} satisfies ToolFacts;
