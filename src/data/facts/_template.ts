import type { ToolFacts } from "./types";

/**
 * Copy to `<slug>.ts`, replace the placeholder values, and register the
 * default export in `registry.ts`. Do not register this template.
 * Live catalog facts are added in a later run.
 */
const template = {
  slug: "replace-with-platform-slug",
  lifecycle: "active",
  verdict: {
    value: "One or two sentences. Replace before registering.",
    sourceUrl: "https://example.com/official-source",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
} satisfies ToolFacts;

export default template;
