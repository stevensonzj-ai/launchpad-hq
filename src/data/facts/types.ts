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
  freeTier?: Fact<{ available: boolean; summary: string }>;
  plans?: Fact<ToolPlan[]>;
  platforms?: Fact<string[]>;
  apps?: Fact<ToolApps>;
  models?: Fact<string[]>;
  privacy?: Fact<ToolPrivacy>;
  pros?: string[];
  cons?: string[];
  changelog?: ToolChangelogEntry[];
};

export const FACT_VALUE_KEYS = [
  "verdict",
  "freeTier",
  "plans",
  "platforms",
  "apps",
  "models",
  "privacy",
] as const;

export type FactValueKey = (typeof FACT_VALUE_KEYS)[number];

export const PRICE_FACT_KEYS = ["plans", "freeTier"] as const satisfies readonly FactValueKey[];
