export type FactStatus = "verified" | "unverified" | "disputed";

export type Fact<T> = {
  value: T;
  sourceUrl: string;
  checkedAt: string;
  gatheredBy: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status: FactStatus;
  /** Display heading for this field (for example "GPT-6 family"). */
  label?: string;
  /** Source or scope note shown with the fact. */
  note?: string;
};

export type ToolPlan = {
  name: string;
  price: string;
  period: string;
  limits: string;
};

export type ToolApps = {
  ios?: string;
  android?: string;
  macos?: string;
  windows?: string;
  linux?: string;
};

export type ToolPrivacy = {
  trainsOnData?: boolean;
  retention?: string;
  policyUrl?: string;
};

/**
 * What a paid/free user can keep or use after generation — not plan prices
 * (those stay on `plans[].limits`).
 *
 * One `Fact<ToolUsageLimits>` wraps the object, same as `plans` / `privacy` /
 * `models`: a single official `sourceUrl` + `checkedAt` + gatherer/verifier
 * provenance. Nested keys are optional strings (or `other: string[]`); an
 * absent key is unpublished and must not be inferred. Per-entry provenance is
 * therefore the parent Fact — do not attach a parallel Fact shape per key.
 */
export type ToolUsageLimits = {
  creditsExpire?: string;
  watermark?: string;
  commercialUse?: string;
  rollover?: string;
  other?: string[];
};

export type ToolChangelogEntry = {
  date: string;
  field: string;
  summary: string;
};

export type ToolLifecycle = "active" | "beta" | "discontinued";

export type ToolFacts = {
  slug: string;
  lifecycle: ToolLifecycle;
  verdict?: Fact<string>;
  /** Overrides the catalog display name. Slug stays the Platform row slug. */
  displayName?: Fact<string>;
  company?: Fact<string>;
  freeTier?: Fact<{ available: boolean; summary: string }>;
  plans?: Fact<ToolPlan[]>;
  /** Consumer-app plans stay in `plans`. Token/API list prices live here. */
  apiPricing?: Fact<string>;
  platforms?: Fact<string[]>;
  apps?: Fact<ToolApps>;
  models?: Fact<string[]>;
  privacy?: Fact<ToolPrivacy>;
  usageLimits?: Fact<ToolUsageLimits>;
  pros?: string[];
  cons?: string[];
  changelog?: ToolChangelogEntry[];
};

export const FACT_VALUE_KEYS = [
  "verdict",
  "displayName",
  "company",
  "freeTier",
  "plans",
  "apiPricing",
  "platforms",
  "apps",
  "models",
  "privacy",
  "usageLimits",
] as const;

export type FactValueKey = (typeof FACT_VALUE_KEYS)[number];

export const PRICE_FACT_KEYS = ["plans", "freeTier", "apiPricing"] as const satisfies readonly FactValueKey[];
