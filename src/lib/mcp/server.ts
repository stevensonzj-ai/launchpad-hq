import type { Icon, Implementation, McpServer } from "@modelcontextprotocol/server";
import type { McpHandlerOptions } from "mcp-handler";
import type { z } from "zod";
import { getToolFacts } from "@/data/facts";
import { buildCallLog, logCall, type McpCallLog } from "./log";
import {
  compareInput,
  compareOutput,
  findFreeAlternativesInput,
  findFreeAlternativesOutput,
  getPricingFactsInput,
  getPricingFactsOutput,
  searchToolsInput,
  searchToolsOutput,
} from "./schemas";
import {
  compare,
  findFreeAlternatives,
  getPricingFacts,
  searchTools,
  ToolInputError,
  type CatalogRow,
  type FactsLookup,
} from "./tools";

export const MCP_SERVER_NAME = "launchpad-hq";
export const MCP_SERVER_VERSION = "0.1.2";

/** Brand mark shown by clients (e.g. Claude's custom connector), same PNG as server.json. */
export const MCP_SERVER_ICONS: Icon[] = [
  { src: "https://www.launchpadhq.io/brand/launchpad-hq-512.png", mimeType: "image/png", sizes: ["512x512"] },
];

/**
 * serverInfo returned by initialize. mcp-handler types this as {name, version}
 * but passes it unchanged to `new McpServer(...)`, whose Implementation accepts icons.
 */
export const MCP_SERVER_INFO: Implementation = {
  name: MCP_SERVER_NAME,
  version: MCP_SERVER_VERSION,
  icons: MCP_SERVER_ICONS,
};

/** At most 512 characters, describing the data (ChatGPT reads the first 512). */
export const MCP_SERVER_INSTRUCTIONS = [
  "Launchpad HQ is a curated directory of AI tools for beginners and budget-conscious users.",
  "These read-only tools search, compare and price tools in its catalog.",
  "Facts are dated and sourced: verified items carry as_of and source_url from the vendor's own pages;",
  "unverified catalog text is labeled catalog_only.",
  "Every result links to its Launchpad HQ page on launchpadhq.io. Sponsorship never affects results.",
  "Prices change often and should be confirmed on the vendor's site before buying.",
].join(" ");

/** Options for mcp-handler's createMcpHandler; the route and the tests share them. */
export const MCP_HANDLER_OPTIONS = {
  serverInfo: MCP_SERVER_INFO,
  instructions: MCP_SERVER_INSTRUCTIONS,
  // registerTool defaults tools.listChanged to true. A 2026-07-28 client then
  // opens subscriptions/listen for tool-list changes and the SDK holds that
  // SSE stream open indefinitely, which a 10 s serverless function cannot
  // serve. The tool list is fixed per deploy, so say so: the listen request
  // is then acknowledged and closed at once.
  capabilities: { tools: { listChanged: false } },
} satisfies McpHandlerOptions;

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

type ToolSpec<I extends z.ZodType, O extends z.ZodType> = {
  name: string;
  title: string;
  description: string;
  inputSchema: I;
  outputSchema: O;
  countOf: (output: z.infer<O>) => number;
  run: (input: z.infer<I>, rows: CatalogRow[], facts: FactsLookup) => z.infer<O>;
};

function spec<I extends z.ZodType, O extends z.ZodType>(s: ToolSpec<I, O>): ToolSpec<I, O> {
  return s;
}

export const TOOL_SPECS = [
  spec({
    name: "search_tools",
    title: "Search AI tools",
    description:
      "Use this when the user wants to find AI tools for a task, optionally within a budget, skill level or platform. Returns Launchpad HQ catalog matches with dated, sourced free-tier facts where available. Items with fallback: true are popular tools, not direct matches; stale: true means the facts are over 90 days old.",
    inputSchema: searchToolsInput,
    outputSchema: searchToolsOutput,
    countOf: (o) => o.results.length,
    run: searchTools,
  }),
  spec({
    name: "compare",
    title: "Compare AI tools",
    description:
      "Use this when the user wants to compare 2 to 4 specific AI tools side by side: plans, API pricing, usage limits and platforms, each with its own as_of date and source.",
    inputSchema: compareInput,
    outputSchema: compareOutput,
    countOf: (o) => o.items.length,
    run: compare,
  }),
  spec({
    name: "get_pricing_facts",
    title: "Get pricing facts",
    description:
      "Use this when the user asks what one AI tool costs or what its free tier includes. Returns verified pricing facts first; catalog text only when no verified price exists, labeled catalog_only.",
    inputSchema: getPricingFactsInput,
    outputSchema: getPricingFactsOutput,
    countOf: () => 1,
    run: getPricingFacts,
  }),
  spec({
    name: "find_free_alternatives",
    title: "Find free alternatives",
    description:
      "Use this when the user wants a free or freemium alternative to a specific AI tool. Verified free tiers rank first; catalog-only matches are labeled unverified.",
    inputSchema: findFreeAlternativesInput,
    outputSchema: findFreeAlternativesOutput,
    countOf: (o) => o.alternatives.length,
    run: findFreeAlternatives,
  }),
] as const;

export type ServerDeps = {
  loadCatalog: () => Promise<CatalogRow[]>;
  facts?: FactsLookup;
  log?: (entry: McpCallLog) => void;
  now?: () => number;
};

/** Runs one tool and shapes the MCP result. Exported for tests. */
export async function runTool(
  toolSpec: (typeof TOOL_SPECS)[number],
  args: unknown,
  deps: ServerDeps,
) {
  const now = deps.now ?? Date.now;
  const started = now();
  const facts = deps.facts ?? getToolFacts;
  const log = deps.log ?? logCall;
  try {
    const input = toolSpec.inputSchema.parse(args);
    const rows = await deps.loadCatalog();
    const output = (toolSpec.run as (i: unknown, r: CatalogRow[], f: FactsLookup) => unknown)(
      input,
      rows,
      facts,
    );
    const structured = toolSpec.outputSchema.parse(output) as Record<string, unknown>;
    log(
      buildCallLog({
        tool: toolSpec.name,
        resultCount: (toolSpec.countOf as (o: unknown) => number)(structured),
        latencyMs: now() - started,
        ok: true,
      }),
    );
    return {
      content: [{ type: "text" as const, text: JSON.stringify(structured) }],
      structuredContent: structured,
    };
  } catch (error) {
    log(
      buildCallLog({
        tool: toolSpec.name,
        resultCount: 0,
        latencyMs: now() - started,
        ok: false,
      }),
    );
    const message =
      error instanceof ToolInputError
        ? error.message
        : error instanceof Error && error.name === "ZodError"
          ? "Invalid input. Check the tool's input schema."
          : "Launchpad HQ could not complete this request. Try again shortly.";
    return {
      isError: true,
      content: [{ type: "text" as const, text: message }],
    };
  }
}

/** Registers exactly the four v0.1 tools on a server. */
export function registerLaunchpadTools(server: McpServer, deps: ServerDeps): void {
  for (const toolSpec of TOOL_SPECS) {
    server.registerTool(
      toolSpec.name,
      {
        title: toolSpec.title,
        description: toolSpec.description,
        inputSchema: toolSpec.inputSchema,
        outputSchema: toolSpec.outputSchema,
        annotations: { title: toolSpec.title, ...READ_ONLY },
      },
      // The SDK validates input against inputSchema before calling us; we
      // parse again in runTool so direct callers (tests) get the same caps.
      (async (args: unknown) => runTool(toolSpec, args, deps)) as never,
    );
  }
}

export const TOOL_ANNOTATIONS = READ_ONLY;
