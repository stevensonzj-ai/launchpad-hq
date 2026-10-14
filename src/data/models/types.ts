export type ModelStatus = "current" | "legacy";

export type ModelRole = "flagship" | "balanced" | "budget" | "prior";

export type TokenFact = {
  tokens: number | null;
  verified: boolean;
  note?: string;
};

export type PriceFact = {
  usdPerMillion: number | null;
  verified: boolean;
  note?: string;
};

export type FieldGroupVerified = {
  specs: boolean;
  apiPricing: boolean;
  consumerAccess: boolean;
};

export type SourceLink = {
  label: string;
  url: string;
};

export type ModelVersion = {
  id: string;
  name: string;
  apiId?: string;
  releaseDate: string | null;
  releaseDateVerified: boolean;
  status: ModelStatus;
  role: ModelRole;
  contextWindow: TokenFact;
  maxOutput: TokenFact;
  apiPriceInput: PriceFact;
  apiPriceOutput: PriceFact;
  consumerAccess: {
    summary: string;
    verified: boolean;
  };
  strengths: string[];
  bestFor: string;
  caveats: string[];
  sourceUrls: SourceLink[];
  verified: FieldGroupVerified;
};

export type PlatformModelFamily = {
  familySlug: string;
  displayName: string;
  vendor: string;
  /** Must match Platform.slug in the catalog / seed scripts. Empty = no catalog page yet. */
  platformSlugs: string[];
  lastVerifiedAt: string;
  whichToUse: string[];
  versions: ModelVersion[];
  sources: SourceLink[];
};
