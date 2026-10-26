import type { ToolFacts } from "./types";

const IDEOGRAM_VECTOR_URL = "https://ideogram.ai/models/vector/";

export default {
  slug: "ideogram",
  lifecycle: "active",
  apiPricing: {
    value:
      "Ideogram Vector API (ideogram-vector-1), USD per SVG. Text to vector: Low $0.13; Medium $0.16; High $0.20 from a prompt alone, $0.32 with reference images (Low and Medium cost the same with references). Image to vector (vectorize an image): $0.10 per image. Other Ideogram API models are priced on the API tab of ideogram.ai/pricing.",
    note: "Vector prices only, from the Ideogram Vector model page.",
    sourceUrl: IDEOGRAM_VECTOR_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "Ideogram Vector makes scalable, editable SVG files, either from a text prompt or by converting an existing image (as of 2026-10-26).",
    ],
    sourceUrl: IDEOGRAM_VECTOR_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added Ideogram Vector (editable SVG output) and its API prices from the Vector model page.",
    },
  ],
} satisfies ToolFacts;
