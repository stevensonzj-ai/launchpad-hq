export type WorkflowTierId = "optimal" | "hybrid" | "budget";

/** One stack option: best tools / balanced / free-first */
export type WorkflowTier = {
  id: WorkflowTierId;
  name: string;
  tagline: string;
  tools: { name: string; slug?: string }[];
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
