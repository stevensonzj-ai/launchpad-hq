import { z } from "zod";

/**
 * Input and output schemas for the Launchpad HQ MCP tools (v0.1).
 * Shared by the server (registration) and the tests (contract checks).
 *
 * Input caps: strings <= 200 chars, limit <= 10 (default 5), compare 2-4.
 */

export const MAX_INPUT_CHARS = 200;
export const DEFAULT_LIMIT = 5;
export const MAX_LIMIT = 10;

const shortText = z.string().trim().min(1).max(MAX_INPUT_CHARS);
const limit = z.number().int().min(1).max(MAX_LIMIT).optional();

// ---------- inputs ----------

export const searchToolsInput = z.object({
  task: shortText.describe("What the user wants to do, e.g. 'transcribe meetings' or 'make slides'."),
  budget: z
    .enum(["free", "low", "medium", "high", "any"])
    .optional()
    .describe("Budget band. 'free' keeps only free or freemium tools."),
  skill_level: z
    .enum(["beginner", "intermediate", "advanced"])
    .optional()
    .describe("User's skill level. Tools above it rank lower."),
  platform_type: z.enum(["web", "mobile", "desktop"]).optional(),
  limit: limit.describe(`Max results (1-${MAX_LIMIT}, default ${DEFAULT_LIMIT}).`),
});

export const compareInput = z.object({
  platforms: z
    .array(shortText)
    .min(2)
    .max(4)
    .describe("2-4 Launchpad HQ platform slugs or names."),
});

export const getPricingFactsInput = z.object({
  platform: shortText.describe("A Launchpad HQ platform slug or name."),
});

export const findFreeAlternativesInput = z.object({
  platform: shortText.describe("A Launchpad HQ platform slug or name."),
  limit: limit.describe(`Max alternatives (1-${MAX_LIMIT}, default ${DEFAULT_LIMIT}).`),
});

export type SearchToolsInput = z.infer<typeof searchToolsInput>;
export type CompareInput = z.infer<typeof compareInput>;
export type GetPricingFactsInput = z.infer<typeof getPricingFactsInput>;
export type FindFreeAlternativesInput = z.infer<typeof findFreeAlternativesInput>;

// ---------- outputs ----------

export const verification = z.enum(["verified", "unverified", "catalog_only"]);

export const platformRef = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string().nullable(),
  launchpad_url: z.string(),
  website: z.string().nullable(),
  cost_tier: z.string(),
  difficulty: z.string(),
  free_tier: z.object({
    available: z.boolean().nullable(),
    summary: z.string().nullable(),
  }),
  verification,
  as_of: z.string().nullable(),
  source_url: z.string().nullable(),
  sponsored: z.literal(false),
  // v0.1.1, additive: same values as the /data/v1 JSON feed.
  company: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  starting_price: z.string().nullable().optional(),
  // Additive (feed schema 1.2): the feed's curated task tags, from publicToolCore.
  tasks: z.array(z.string()).nullable().optional(),
});

const sourcedFact = <T extends z.ZodType>(value: T) =>
  z
    .object({
      value,
      as_of: z.string(),
      source_url: z.string(),
      status: z.enum(["verified", "unverified", "disputed"]),
    })
    .nullable();

export const toolPlan = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string(),
  limits: z.string(),
});

const common = {
  data_as_of: z.string().nullable(),
  attribution: z.string(),
};

export const searchToolsOutput = z.object({
  query: z.string(),
  results: z.array(platformRef.extend({ match_reasons: z.array(z.string()) })),
  total_matches: z.number().int(),
  note: z.string().nullable(),
  ...common,
});

export const compareItem = platformRef.extend({
  plans: sourcedFact(z.array(toolPlan)),
  api_pricing: sourcedFact(z.string()),
  usage_limits: sourcedFact(z.record(z.string(), z.unknown())),
  platforms_supported: z.array(z.string()),
  api_available: z.boolean(),
  lifecycle: z.string(),
});

export const compareOutput = z.object({
  items: z.array(compareItem),
  not_found: z.array(z.string()),
  ...common,
});

export const getPricingFactsOutput = z.object({
  platform: platformRef,
  plans: sourcedFact(z.array(toolPlan)),
  free_tier: sourcedFact(z.object({ available: z.boolean(), summary: z.string() })),
  api_pricing: sourcedFact(z.string()),
  usage_limits: sourcedFact(z.record(z.string(), z.unknown())),
  catalog_pricing_text: z.string().nullable(),
  verification,
  lifecycle: z.string(),
  ...common,
});

export const findFreeAlternativesOutput = z.object({
  for: platformRef.nullable(),
  alternatives: z.array(
    platformRef.extend({ why: z.string(), tradeoff: z.string().nullable() }),
  ),
  ...common,
});

export type PlatformRef = z.infer<typeof platformRef>;
export type SearchToolsOutput = z.infer<typeof searchToolsOutput>;
export type CompareItem = z.infer<typeof compareItem>;
export type CompareOutput = z.infer<typeof compareOutput>;
export type GetPricingFactsOutput = z.infer<typeof getPricingFactsOutput>;
export type FindFreeAlternativesOutput = z.infer<typeof findFreeAlternativesOutput>;
