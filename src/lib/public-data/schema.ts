import { z } from "zod";
import { absoluteUrl } from "@/lib/site";

/**
 * Public JSON feed contract (/data/v1). Bump SCHEMA_VERSION whenever the
 * shape changes; schema.test.ts compares against a committed snapshot.
 */
export const SCHEMA_VERSION = "1.0";

const date = z.string().describe("YYYY-MM-DD");
const ref = z.object({ slug: z.string(), name: z.string() });
const factStatus = z.enum(["verified", "unverified", "disputed"]);

export const PublicPlan = z.object({
  name: z.string(),
  price_text: z.string().describe("Exactly what the page's pricing table shows."),
  amount: z.number().nullable(),
  currency: z.enum(["USD", "EUR", "GBP"]).nullable(),
  period: z.enum(["month", "year", "one_time", "usage", "seat_month"]).nullable(),
  limits: z.string().nullable(),
  is_free: z.boolean(),
});

export const PublicTool = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  slug: z.string(),
  url: z.string(),
  name: z.string(),
  former_names: z.array(z.string()),
  company: z.string().nullable(),
  website: z.string().nullable(),
  category: ref.nullable(),
  description: z.string().nullable(),
  primary_use: z.string().nullable(),
  use_cases: z.string().nullable(),
  best_for: z.array(z.string()),
  works_with: z.array(z.string()),
  outputs: z.array(z.string()),
  platforms: z.array(z.string()),
  apps: z.object({
    ios: z.string().nullable(),
    android: z.string().nullable(),
    macos: z.string().nullable(),
    windows: z.string().nullable(),
    linux: z.string().nullable(),
  }),
  cost_tier: z.string(),
  difficulty: z.string(),
  technical: z.object({
    privacy_level: z.string(),
    time_to_productivity: z.string().nullable(),
    learning_curve: z.string().nullable(),
    offline: z.boolean(),
    api_available: z.boolean(),
    languages: z.string().nullable().describe("null when the catalog does not list languages."),
    integrations: z.string().nullable(),
    upgrade_triggers: z.string().nullable(),
  }),
  lifecycle: z.enum(["active", "beta", "discontinued", "acquired", "renamed"]),
  status: z
    .object({
      headline: z.string(),
      details: z.array(z.string()),
      what_to_do: z.string().nullable(),
      alternatives: z.array(ref),
      source_kind: z.enum(["official", "secondary"]),
      source_url: z.string(),
      checked_at: date,
    })
    .nullable(),
  free_tier: z.object({ available: z.boolean(), summary: z.string().nullable() }),
  plans: z.array(PublicPlan),
  starting_price: z.string().nullable(),
  lowest_paid: PublicPlan.nullable(),
  api_pricing: z.string().nullable(),
  usage_limits: z.record(z.string(), z.unknown()).nullable(),
  models: z.array(z.string()).nullable(),
  alternatives: z.array(ref),
  works_well_with: z.array(ref),
  guide_url: z.string().nullable(),
  changelog: z.array(z.object({ date: z.string(), field: z.string(), summary: z.string() })),
  sources: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
      checked_at: date.nullable(),
      status: z.union([factStatus, z.literal("catalog_only")]),
    }),
  ),
  notes: z.array(z.string()),
  verification: z.object({
    status: z.enum(["verified", "unverified", "catalog_only"]),
    checked_at: date.nullable(),
  }),
  data_as_of: date.nullable().describe("Newest date a shown fact was checked; not a DB timestamp."),
  record_updated_at: date.nullable().describe("Last database edit of the catalog row."),
  generated_at: z.string(),
  sponsored: z.literal(false),
  attribution: z.string(),
});

export const PublicCatalog = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  generated_at: z.string(),
  count: z.number().int(),
  tools: z.array(PublicTool),
  categories: z.array(z.object({ slug: z.string(), name: z.string(), count: z.number().int() })),
  aliases: z.record(z.string(), z.string()).describe("Retired slug -> current slug."),
  attribution: z.string(),
  license: z.string(),
});

export const PublicIndex = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  generated_at: z.string(),
  counts: z.object({ tools: z.number().int(), categories: z.number().int() }),
  links: z.object({
    catalog: z.string(),
    tool: z.string().describe("URL template; replace {slug}."),
    openapi: z.string(),
    schema: z.string(),
  }),
  cache: z.string(),
  attribution: z.string(),
  license: z.string(),
});

export const PublicError = z.object({ error: z.string() });

export type PublicToolT = z.infer<typeof PublicTool>;
export type PublicCatalogT = z.infer<typeof PublicCatalog>;
export type PublicIndexT = z.infer<typeof PublicIndex>;

export const DATA_BASE = "/data/v1";
export const TOOL_SCHEMA_ID = absoluteUrl(`${DATA_BASE}/schema/tool.json`);

function jsonSchema(schema: z.ZodType): Record<string, unknown> {
  const out = z.toJSONSchema(schema) as Record<string, unknown>;
  delete out.$schema;
  return out;
}

/** JSON Schema (draft 2020-12) for one tool, served at /data/v1/schema/tool.json. */
export function toolJsonSchema(): Record<string, unknown> {
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: TOOL_SCHEMA_ID,
    title: "Launchpad HQ tool",
    ...jsonSchema(PublicTool),
  };
}

/** OpenAPI 3.1 for the feed routes. */
export function openApiDocument(): Record<string, unknown> {
  const json = (schema: string) => ({
    "application/json": { schema: { $ref: `#/components/schemas/${schema}` } },
  });
  const ok = (description: string, schema: string) => ({ description, content: json(schema) });
  const notFound = { description: "Unknown or unlisted tool", content: json("Error") };
  return {
    openapi: "3.1.0",
    info: {
      title: "Launchpad HQ data feed",
      version: SCHEMA_VERSION,
      description:
        "Free, read-only JSON for the Launchpad HQ AI tool catalog. The same dated, sourced facts as the website and the MCP connector. Cached hourly. Please credit Launchpad HQ and link to the tool's page.",
    },
    servers: [{ url: absoluteUrl(DATA_BASE) }],
    paths: {
      "/index.json": { get: { summary: "Feed index", responses: { "200": ok("Index", "PublicIndex") } } },
      "/catalog.json": { get: { summary: "Every listed tool", responses: { "200": ok("Catalog", "PublicCatalog") } } },
      "/tools/{slug}.json": {
        get: {
          summary: "One listed tool",
          parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": ok("Tool", "PublicTool"),
            "301": { description: "Retired slug; Location points at the current one" },
            "404": notFound,
          },
        },
      },
      "/schema/tool.json": { get: { summary: "JSON Schema for one tool", responses: { "200": { description: "JSON Schema" } } } },
      "/openapi.json": { get: { summary: "This document", responses: { "200": { description: "OpenAPI 3.1" } } } },
    },
    components: {
      schemas: {
        PublicTool: jsonSchema(PublicTool),
        PublicCatalog: jsonSchema(PublicCatalog),
        PublicIndex: jsonSchema(PublicIndex),
        Error: jsonSchema(PublicError),
      },
    },
  };
}
