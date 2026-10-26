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

/**
 * Catalog status of the product itself. `acquired` and `renamed` products are
 * still usable (under a new owner or name); `discontinued` ones are not.
 * Pair any non-active value with a sourced `status` fact explaining it.
 */
export type ToolLifecycle = "active" | "beta" | "discontinued" | "acquired" | "renamed";

/**
 * Whether a platform page is offered to readers and search engines.
 * `hidden` pages stay reachable by URL but are noindexed and left out of the
 * sitemap, Discover, search and recommendations. Editorial call, not a fact.
 */
export type ToolVisibility = "listed" | "hidden";

/** A live alternative shown on a status notice. `slug` must be a real Platform row. */
export type ToolStatusAlternative = {
  slug: string;
  name: string;
};

/**
 * Reader-facing status notice: what happened, when, and what to do now.
 * Dates are written exactly as the source states them (no inferred days).
 */
export type ToolStatus = {
  /** One sentence. Shown as the notice's lead line. */
  headline: string;
  /** Short supporting paragraphs. */
  details?: string[];
  /** Name readers knew it by, for "formerly X" lines. */
  formerName?: string;
  /** What existing users should do (export, migrate, nothing). */
  whatToDo?: string;
  /** Up to three live alternatives with Launchpad pages. */
  alternatives?: ToolStatusAlternative[];
  /**
   * `secondary` when no primary source exists (the company is gone); the
   * notice then says so plainly. Defaults to `official`.
   */
  sourceKind?: "official" | "secondary";
  /** Extra source links beyond the Fact's own `sourceUrl`. */
  additionalSources?: string[];
};

export type ToolFacts = {
  slug: string;
  lifecycle: ToolLifecycle;
  /** Defaults to `listed`. */
  visibility?: ToolVisibility;
  /** What happened to the product (shutdown, acquisition, rename, pending sale). */
  status?: Fact<ToolStatus>;
  /** Overrides the Platform row's `website` (the official link). */
  officialUrl?: Fact<string>;
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
  /**
   * Notable features and dated product changes from one official page (for
   * example a new model on the API, or a changed default). One sentence per
   * entry; write forward-looking items as the vendor's stated plan with a date.
   */
  features?: Fact<string[]>;
  privacy?: Fact<ToolPrivacy>;
  usageLimits?: Fact<ToolUsageLimits>;
  pros?: string[];
  cons?: string[];
  changelog?: ToolChangelogEntry[];
};

export const FACT_VALUE_KEYS = [
  "status",
  "officialUrl",
  "verdict",
  "displayName",
  "company",
  "freeTier",
  "plans",
  "apiPricing",
  "platforms",
  "apps",
  "models",
  "features",
  "privacy",
  "usageLimits",
] as const;

export type FactValueKey = (typeof FACT_VALUE_KEYS)[number];

export const PRICE_FACT_KEYS = ["plans", "freeTier", "apiPricing"] as const satisfies readonly FactValueKey[];
