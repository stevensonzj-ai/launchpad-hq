export type WorkflowTierId = "optimal" | "hybrid" | "budget";

/** One stack option: best tools / balanced / free-first */
export type WorkflowTool = {
  name: string;
  slug?: string;
  /** Why this tool fits this tier in this workflow (1–2 beginner-friendly sentences). */
  rationale: string;
};

export type WorkflowTier = {
  id: WorkflowTierId;
  name: string;
  tagline: string;
  tools: WorkflowTool[];
  note?: string;
};

export type WorkflowTemplate = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  tiers: {
    optimal: WorkflowTier;
    hybrid: WorkflowTier;
    budget: WorkflowTier;
  };
};
