import { z } from "zod";

/**
 * Input and output schemas for the Launchpad HQ MCP tools (v0.1).
 * Shared by the server (registration) and the tests (contract checks).
 *
 * Input caps: strings <= 200 chars, limit <= 10 (default 5), compare 2-4.
 * search_tools accepts a `task` up to 1,000 chars and searches its first 200
 * (chat prompts run long; rejecting them helped nobody).
 */

export const MAX_INPUT_CHARS = 200;
export const MAX_TASK_INPUT_CHARS = 1000;
export const DEFAULT_LIMIT = 5;
export const MAX_LIMIT = 10;

const shortText = z.string().trim().min(1).max(MAX_INPUT_CHARS);
const limit = z.number().int().min(1).max(MAX_LIMIT).optional();

// ---------- inputs ----------

export const searchToolsInput = z.object({
  task: z
    .string()
    .trim()
    .min(1)
    .max(MAX_TASK_INPUT_CHARS)
    .describe(`What the user wants to do, e.g. 'transcribe meetings' or 'make slides'. Only the first ${MAX_INPUT_CHARS} characters are searched.`),
  budget: z
    .enum(["free", "low", "medium", "high", "any"])
    .optional()
    .describe(
      "Budget band. 'free' keeps only free or freemium tools; 'low' keeps free/freemium tools or a lowest paid plan up to $20/month, 'medium' up to $50/month (unknown prices rank lower).",
    ),
  skill_level: z
    .enum(["beginner", "intermediate", "advanced"])
    .optional()
    .describe("User's skill level. Tools above it rank lower."),
  platform_type: z.enum(["web", "mobile", "desktop"]).optional().describe("Tools available there rank first."),
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
  // Additive (v0.1.3): as_of older than 90 days, with a plain-language note.
  stale: z.boolean().optional(),
  freshness_note: z.string().nullable().optional(),
  // Additive (v0.1.3): set only when the name was matched tolerantly, echoing
  // the input and how it matched (never a silent swap).
  resolved_from: z.string().nullable().optional(),
  resolution: z.enum(["compact", "alias", "spelling"]).nullable().optional(),
});

export const nameSuggestion = z.object({ slug: z.string(), name: z.string() });

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
  results: z.array(
    platformRef.extend({
      match_reasons: z.array(z.string()),
      // Additive (v0.1.3): true on a fallback item, which is not a direct match.
      fallback: z.boolean().optional(),
    }),
  ),
  /** Direct matches only; fallback items are not counted. */
  total_matches: z.number().int(),
  note: z.string().nullable(),
  // Additive (v0.1.3): why fallback items were added, if any.
  fallback: z.enum(["starter", "top_up"]).nullable().optional(),
  // Additive (v0.1.3): the searched text after spelling fixes, when any applied.
  corrected_query: z.string().nullable().optional(),
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
  // Additive (v0.1.3): suggestions for each not_found input that has any.
  did_you_mean: z.array(z.object({ input: z.string(), suggestions: z.array(nameSuggestion) })).optional(),
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
