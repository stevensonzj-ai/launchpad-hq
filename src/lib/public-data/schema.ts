import { z } from "zod";
import { absoluteUrl } from "@/lib/site";
import { FEED_CHANGELOG } from "./changelog";

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
    compare: z.string(),
    compare_page: z.string().describe("URL template; replace {slug}."),
    guides: z.string(),
    guide: z.string().describe("URL template; replace {slug} with the tool slug."),
    workflows: z.string(),
    workflow: z.string().describe("URL template; replace {slug}."),
    models: z.string(),
    model_family: z.string().describe("URL template; replace {slug} with the family slug."),
    models_compare: z.string(),
    quiz: z.string(),
    llms_full: z.string().describe("Plain-text export of the catalog, comparisons, guides, workflows and models."),
    developers: z.string().describe("Human-readable docs for the feed, MCP connector and Markdown pages."),
  }),
  cache: z.string(),
  changelog: z
    .array(z.object({ date, summary: z.string() }))
    .describe("Public changes to the feed, newest first."),
  attribution: z.string(),
  license: z.string(),
});

/** The shared error envelope (src/lib/api-error.ts). */
export const PublicError = z.object({
  error: z.object({
    code: z.enum(["bad_request", "unauthorized", "not_found", "method_not_allowed", "unavailable", "internal_error"]),
    message: z.string(),
    resolution: z.string().describe("What to do next."),
    field: z.string().optional(),
  }),
});

/**
 * A subset of PublicTool, picked from the serializer's output for the same
 * slug, so its prices always equal /data/v1/tools/{slug}.json.
 */
export const PublicToolSummary = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string(),
  data_url: z.string().describe("The full record: /data/v1/tools/{slug}.json."),
  category: ref.nullable(),
  cost_tier: z.string(),
  lifecycle: PublicTool.shape.lifecycle,
  free_tier: PublicTool.shape.free_tier,
  starting_price: z.string().nullable(),
  lowest_paid: PublicPlan.nullable(),
  data_as_of: date.nullable(),
});

const contentFooter = {
  generated_at: z.string(),
  sponsored: z.literal(false),
  attribution: z.string(),
};

const pricedProse = {
  prices_removed: z.number().int().describe("Sentences dropped because they typed a price by hand (expected 0; prices in the text come from the catalog)."),
  pricing_note: z.string(),
};

const link = z.object({ label: z.string(), url: z.string() });

export const PublicComparePage = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  kind: z.enum(["head-to-head", "free-alternatives"]),
  slug: z.string(),
  url: z.string().describe("Canonical page URL."),
  data_url: z.string(),
  title: z.string(),
  description: z.string(),
  intro: z.array(z.string()),
  hit_first: z.array(z.string()),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  related: z.array(link),
  tools: z.array(
    z.object({
      role: z.enum(["baseline", "alternative", "contender"]),
      pick: z.string().nullable(),
      free_option_label: z.string().nullable(),
      sources: z.array(
        z.object({
          field: z.enum(["Pricing", "Free plan", "Usage limits"]),
          url: z.string().nullable(),
          as_of: date.nullable(),
          origin: z.enum(["fact-file", "catalog-audit", "catalog"]),
        }),
      ),
      as_of: date.nullable(),
      tool: PublicTool.describe("Identical to /data/v1/tools/{slug}.json."),
    }),
  ),
  also_consider: z.array(PublicToolSummary),
  as_of: date.nullable().describe("Oldest per-tool date shown on the page."),
  undated_tools: z.array(z.string()),
  ...contentFooter,
});

const pageEntry = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  data_url: z.string(),
});

export const PublicCompareIndex = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  generated_at: z.string(),
  url: z.string(),
  pages: z.array(pageEntry.extend({ kind: z.enum(["head-to-head", "free-alternatives"]) })),
  models: z.array(pageEntry),
  attribution: z.string(),
  license: z.string(),
});

const securityBlock = z.union([
  z.object({ kind: z.literal("text"), text: z.string() }),
  z.object({ kind: z.literal("list"), label: z.string(), items: z.array(z.string()) }),
]);

export const PublicGuide = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  slug: z.string().describe("The tool's slug."),
  url: z.string(),
  data_url: z.string(),
  title: z.string(),
  tagline: z.string(),
  archetype: z.enum(["prompts", "recipes", "pick-and-setup"]),
  last_reviewed_at: date,
  changelog_url: z.string().nullable(),
  how_it_works: z.string().nullable(),
  what_it_is: z.array(z.string()),
  before_you_start: z.array(z.string()),
  getting_set_up_safely: z
    .object({ official_source: z.string(), body: z.array(z.string()), vendor_docs_url: z.string().nullable() })
    .nullable(),
  security: z.array(securityBlock),
  triad: z.object({ best_at: z.array(z.string()), okay_at: z.array(z.string()), avoid: z.array(z.string()) }),
  starter_actions: z.array(
    z.object({
      title: z.string(),
      what_it_does: z.string().nullable(),
      why_here: z.string().nullable(),
      tweak: z.string().nullable(),
      prompt: z.string().nullable(),
    }),
  ),
  pitfalls: z.array(z.string()),
  where_to_next: z.array(link),
  tool: PublicToolSummary,
  ...pricedProse,
  ...contentFooter,
});

export const PublicGuideIndex = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  generated_at: z.string(),
  url: z.string(),
  count: z.number().int(),
  guides: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      tool_name: z.string(),
      category: ref.nullable(),
      last_reviewed_at: date,
      url: z.string(),
      data_url: z.string(),
    }),
  ),
  attribution: z.string(),
  license: z.string(),
});

const workflowTool = z.object({
  name: z.string(),
  rationale: z.string().nullable(),
  tool: PublicToolSummary.nullable().describe("null when the tool has no catalog page."),
});

export const PublicWorkflow = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  slug: z.string(),
  url: z.string(),
  data_url: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  tiers: z.array(
    z.object({
      id: z.enum(["optimal", "hybrid", "budget"]),
      name: z.string(),
      tagline: z.string(),
      time_estimate: z.string().nullable(),
      result: z.string().nullable(),
      tools: z.array(workflowTool),
      steps: z.array(
        z.object({
          order: z.number().int(),
          label: z.string(),
          name: z.string().nullable(),
          action: z.string().nullable(),
          prompt: z.string().nullable(),
          tool: PublicToolSummary.nullable(),
        }),
      ),
    }),
  ),
  ...pricedProse,
  ...contentFooter,
});

export const PublicWorkflowIndex = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  generated_at: z.string(),
  url: z.string(),
  count: z.number().int(),
  workflows: z.array(pageEntry.extend({ tags: z.array(z.string()) })),
  attribution: z.string(),
  license: z.string(),
});

const tokenFact = z.object({ tokens: z.number().nullable(), verified: z.boolean(), note: z.string().nullable() });
const priceFact = z.object({
  usd_per_million: z.number().nullable().describe("null unless verified."),
  price_text: z.string().describe("Exactly what the models page shows."),
  verified: z.boolean(),
  note: z.string().nullable(),
});

export const PublicModelVersion = z.object({
  id: z.string(),
  name: z.string(),
  api_id: z.string().nullable(),
  release_date: date.nullable(),
  release_date_verified: z.boolean(),
  status: z.enum(["current", "legacy"]),
  role: z.enum(["flagship", "balanced", "budget", "prior"]),
  context_window: tokenFact,
  max_output: tokenFact,
  api_price_input: priceFact,
  api_price_output: priceFact,
  consumer_access: z.object({ summary: z.string().nullable(), verified: z.boolean() }),
  strengths: z.array(z.string()),
  best_for: z.string().nullable(),
  caveats: z.array(z.string()),
  sources: z.array(link),
});

export const PublicModelFamily = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  slug: z.string(),
  url: z.string(),
  data_url: z.string(),
  name: z.string(),
  vendor: z.string(),
  last_verified_at: date,
  which_to_use: z.array(z.string()),
  versions: z.array(PublicModelVersion),
  sources: z.array(link),
  tools: z.array(PublicToolSummary).describe("Catalog tools built on this family."),
  ...pricedProse,
  ...contentFooter,
});

export const PublicModelsIndex = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  generated_at: z.string(),
  url: z.string(),
  families: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      vendor: z.string(),
      last_verified_at: date,
      url: z.string(),
      data_url: z.string(),
    }),
  ),
  compare: z.array(pageEntry),
  attribution: z.string(),
  license: z.string(),
});

export const PublicModelCompare = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  slug: z.string(),
  url: z.string(),
  data_url: z.string(),
  title: z.string(),
  description: z.string(),
  last_verified_at: z.object({ claude: date, gpt: date }),
  rows: z.array(z.object({ label: z.string(), claude: PublicModelVersion, gpt: PublicModelVersion })),
  families: z.array(z.object({ slug: z.string(), name: z.string(), url: z.string(), data_url: z.string() })),
  tools: z.array(PublicToolSummary),
  ...pricedProse,
  ...contentFooter,
});

export const PublicQuiz = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  url: z.string(),
  data_url: z.string(),
  results_url: z.string(),
  question_count: z.number().int(),
  max_goals: z.number().int(),
  questions: z.array(
    z.object({
      id: z.enum(["goals", "experience", "budget", "runtime"]),
      prompt: z.string(),
      hint: z.string().nullable(),
      multiple: z.boolean(),
      options: z.array(z.object({ id: z.string(), label: z.string() })),
    }),
  ),
  mapping: z.object({
    note: z.string(),
    goals: z.record(z.string(), z.object({ keywords: z.array(z.string()) })),
    experience: z.record(z.string(), z.object({ priorities: z.array(z.string()) })),
    budget: z.record(z.string(), z.object({ cost_tiers: z.array(z.string()), priorities: z.array(z.string()) })),
    runtime: z.record(z.string(), z.object({ priorities: z.array(z.string()) })),
  }),
  sponsored: z.literal(false),
  attribution: z.string(),
});

export type PublicToolT = z.infer<typeof PublicTool>;
export type PublicCatalogT = z.infer<typeof PublicCatalog>;
export type PublicIndexT = z.infer<typeof PublicIndex>;
export type PublicToolSummaryT = z.infer<typeof PublicToolSummary>;
export type PublicComparePageT = z.infer<typeof PublicComparePage>;
export type PublicCompareIndexT = z.infer<typeof PublicCompareIndex>;
export type PublicGuideT = z.infer<typeof PublicGuide>;
export type PublicGuideIndexT = z.infer<typeof PublicGuideIndex>;
export type PublicWorkflowT = z.infer<typeof PublicWorkflow>;
export type PublicWorkflowIndexT = z.infer<typeof PublicWorkflowIndex>;
export type PublicModelVersionT = z.infer<typeof PublicModelVersion>;
export type PublicModelFamilyT = z.infer<typeof PublicModelFamily>;
export type PublicModelsIndexT = z.infer<typeof PublicModelsIndex>;
export type PublicModelCompareT = z.infer<typeof PublicModelCompare>;
export type PublicQuizT = z.infer<typeof PublicQuiz>;

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

type OpenApiOp = { operationId: string; summary: string; description: string; schema: string };

/** OpenAPI 3.1 for the feed routes. Every operation has a unique operationId and a description. */
export function openApiDocument(): Record<string, unknown> {
  const json = (schema: string) => ({
    "application/json": { schema: { $ref: `#/components/schemas/${schema}` } },
  });
  const ok = (description: string, schema: string) => ({ description, content: json(schema) });
  const anyJson = (description: string) => ({
    description,
    content: { "application/json": { schema: { type: "object" } } },
  });
  const slugParam = (description: string) => ({
    name: "slug",
    in: "path",
    required: true,
    description,
    schema: { type: "string" },
  });
  const list = (op: OpenApiOp) => ({
    get: {
      operationId: op.operationId,
      summary: op.summary,
      description: op.description,
      responses: { "200": ok(op.summary, op.schema) },
    },
  });
  const one = (op: OpenApiOp & { slug: string; missing: string; moved?: string }) => ({
    get: {
      operationId: op.operationId,
      summary: op.summary,
      description: op.description,
      parameters: [slugParam(op.slug)],
      responses: {
        "200": ok(op.summary, op.schema),
        ...(op.moved ? { "301": { description: op.moved } } : {}),
        "404": { description: op.missing, content: json("Error") },
      },
    },
  });
  const changes = FEED_CHANGELOG.map((c) => `- ${c.date}: ${c.summary}`).join("\n");
  return {
    openapi: "3.1.0",
    info: {
      title: "Launchpad HQ data feed",
      version: SCHEMA_VERSION,
      description: [
        "Free, read-only JSON for the Launchpad HQ AI tool catalog, comparison pages, guides, workflows, models and quiz. The same dated, sourced facts as the website and the MCP connector. Every tool price comes from the tool's own record. No API key or sign-in. Cached at the CDN for up to an hour. Please credit Launchpad HQ and link to the tool's page.",
        `Every route is GET/HEAD only; other methods return 405. Errors share one JSON shape: { "error": { "code", "message", "resolution" } }. Docs: ${absoluteUrl("/developers")}.`,
        `Changes:\n${changes}`,
      ].join("\n\n"),
    },
    servers: [{ url: absoluteUrl(DATA_BASE) }],
    paths: {
      "/index.json": list({
        operationId: "getFeedIndex",
        summary: "Feed index",
        description: "Counts, links to every collection and URL template, the cache policy, attribution and the feed changelog. Start here.",
        schema: "PublicIndex",
      }),
      "/catalog.json": list({
        operationId: "getCatalog",
        summary: "Every listed tool",
        description: "Every listed tool's full record in one file, with category counts and retired-slug aliases. Hidden and duplicate rows are left out.",
        schema: "PublicCatalog",
      }),
      "/tools/{slug}.json": one({
        operationId: "getTool",
        summary: "One listed tool",
        description: "One tool's full record: plans and prices, free tier, lifecycle and status, alternatives, guide link, dated sources and changelog. Identical to the tool's entry in catalog.json.",
        schema: "PublicTool",
        slug: "The tool's slug, as in https://www.launchpadhq.io/platform/{slug}.",
        moved: "Retired slug; Location points at the current one",
        missing: "Unknown or unlisted tool",
      }),
      "/schema/tool.json": {
        get: {
          operationId: "getToolJsonSchema",
          summary: "JSON Schema for one tool",
          description: "JSON Schema (draft 2020-12) for the record that getTool returns.",
          responses: { "200": anyJson("JSON Schema") },
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApi",
          summary: "This document",
          description: "This OpenAPI 3.1 description of the feed.",
          responses: { "200": anyJson("OpenAPI 3.1") },
        },
      },
      "/compare/index.json": list({
        operationId: "listComparePages",
        summary: "Every listed comparison page",
        description: "Every listed head-to-head and free-alternatives page, plus the model comparison pages, with page and data URLs.",
        schema: "PublicCompareIndex",
      }),
      "/compare/{slug}.json": one({
        operationId: "getComparePage",
        summary: "One comparison or free-alternatives page",
        description: "One comparison page: its copy and FAQ, and each tool's full record with per-field sources and dates.",
        schema: "PublicComparePage",
        slug: "The page slug, such as heygen-vs-synthesia.",
        missing: "Unknown or unlisted page",
        moved: "Reverse-order head-to-head slug; Location points at the canonical one",
      }),
      "/guides/index.json": list({
        operationId: "listGuides",
        summary: "Every listed getting-started guide",
        description: "Every listed getting-started guide with its tool, category and last-reviewed date.",
        schema: "PublicGuideIndex",
      }),
      "/guides/{slug}.json": one({
        operationId: "getGuide",
        summary: "One getting-started guide, by tool slug",
        description: "One guide: setup and safety notes, what the tool is best and worst at, starter prompts and pitfalls. Prices in the text are filled in from the catalog.",
        schema: "PublicGuide",
        slug: "The tool's slug.",
        missing: "No listed guide for this tool",
      }),
      "/workflows/index.json": list({
        operationId: "listWorkflows",
        summary: "Every workflow template",
        description: "Every multi-tool workflow template, with tags and links.",
        schema: "PublicWorkflowIndex",
      }),
      "/workflows/{slug}.json": one({
        operationId: "getWorkflow",
        summary: "One workflow template",
        description: "One workflow: its optimal, hybrid and budget tiers, each with its tools, current prices and steps.",
        schema: "PublicWorkflow",
        slug: "The workflow slug, such as blog-post-generator.",
        missing: "Unknown workflow",
      }),
      "/models/index.json": list({
        operationId: "listModelFamilies",
        summary: "Every model family",
        description: "Every AI model family on /models, with its vendor and last-verified date.",
        schema: "PublicModelsIndex",
      }),
      "/models/{slug}.json": one({
        operationId: "getModelFamily",
        summary: "One model family",
        description: "One model family: which version to use, each version's context window, output limit and API prices (null unless verified), and the catalog tools built on it.",
        schema: "PublicModelFamily",
        slug: "The model family slug, such as claude.",
        missing: "Unknown model family",
      }),
      "/models/compare/claude-vs-gpt.json": list({
        operationId: "getClaudeVsGpt",
        summary: "Claude vs GPT models",
        description: "Flagship and budget Claude and GPT versions side by side, from official vendor docs.",
        schema: "PublicModelCompare",
      }),
      "/quiz.json": list({
        operationId: "getQuiz",
        summary: "Quiz questions, options and scoring map (no answers)",
        description: "The matching quiz's questions and options, and how each answer maps to recommendation inputs. Contains no user answers.",
        schema: "PublicQuiz",
      }),
    },
    components: {
      schemas: {
        PublicTool: jsonSchema(PublicTool),
        PublicCatalog: jsonSchema(PublicCatalog),
        PublicIndex: jsonSchema(PublicIndex),
        PublicToolSummary: jsonSchema(PublicToolSummary),
        PublicComparePage: jsonSchema(PublicComparePage),
        PublicCompareIndex: jsonSchema(PublicCompareIndex),
        PublicGuide: jsonSchema(PublicGuide),
        PublicGuideIndex: jsonSchema(PublicGuideIndex),
        PublicWorkflow: jsonSchema(PublicWorkflow),
        PublicWorkflowIndex: jsonSchema(PublicWorkflowIndex),
        PublicModelFamily: jsonSchema(PublicModelFamily),
        PublicModelsIndex: jsonSchema(PublicModelsIndex),
        PublicModelCompare: jsonSchema(PublicModelCompare),
        PublicQuiz: jsonSchema(PublicQuiz),
        Error: jsonSchema(PublicError),
      },
    },
  };
}
