import type { ToolFacts } from "./types";

/**
 * Production fact files live at `src/data/facts/<slug>.ts` and must be
 * registered here. This first pass ships the shape and gates only — no
 * live catalog hotfixes.
 */
export const REGISTERED_TOOL_FACTS: Record<string, ToolFacts> = {};

export function getToolFacts(slug: string): ToolFacts | undefined {
  return REGISTERED_TOOL_FACTS[slug];
}

export function listRegisteredToolFacts(): ToolFacts[] {
  return Object.values(REGISTERED_TOOL_FACTS);
}
