export type WorkflowTierId = "optimal" | "hybrid" | "budget";

/** One stack option: best tools / balanced / free-first */
export type WorkflowTool = {
  name: string;
  slug?: string;
  /** Why this tool fits this tier in this workflow (1–2 beginner-friendly sentences). */
  rationale: string;
};

/** Numbered recipe step for a single tier. Optional so older workflows still render. */
export type WorkflowStep = {
  order: number;
  label: string;
  /** Catalog slug when known; omit when the tool is not in the known slug list. */
  toolSlug?: string;
  /** Display name when there is no slug, or to override the catalog name. */
  name?: string;
  action: string;
  prompt?: string;
};

export type WorkflowTier = {
  id: WorkflowTierId;
  name: string;
  tagline: string;
  tools: WorkflowTool[];
  note?: string;
  /** Numbered how-to. Omit on unconverted workflows. */
  steps?: WorkflowStep[];
  /**
   * Human-readable monthly cost for this tier, with an "as of" date,
   * or the word "unverified" when official prices could not be confirmed.
   */
  estMonthlyCost?: string;
  timeEstimate?: string;
  result?: string;
};

export type WorkflowTemplate = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  /** Short range for index cards, e.g. "$0–~$50/mo as of 2026-10-14". */
  costRange?: string;
  tiers: {
    optimal: WorkflowTier;
    hybrid: WorkflowTier;
    budget: WorkflowTier;
  };
};
