import type { ToolFacts } from "./types";

/**
 * Nano Banana, which replaced Google's Imagen image models. Google's
 * developer docs say "Imagen models are shut down. Use Nano Banana for image
 * generation." Slug moved from google-imagen-3 (301 in
 * src/lib/catalog-redirects.ts; DB row renamed by
 * scripts/update-catalog-audit-15.ts). Guide PR D, 2026-10-29.
 */
export default {
  slug: "nano-banana",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Google has shut down its Imagen image models and tells developers to use Nano Banana for image generation instead.",
      formerName: "Google Imagen",
      whatToDo: "Make images in the Gemini app, where Nano Banana is the image model. Old Imagen pages here redirect to this one.",
      additionalSources: ["https://gemini.google/overview/image-generation/"],
    },
    sourceUrl: "https://ai.google.dev/gemini-api/docs/imagen",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  displayName: {
    value: "Nano Banana",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/image-generation",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  officialUrl: {
    value: "https://gemini.google/overview/image-generation/",
    sourceUrl: "https://gemini.google/overview/image-generation/",
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
      summary: "Imagen replaced by Nano Banana. Slug moved from google-imagen-3 to nano-banana.",
    },
  ],
} satisfies ToolFacts;
