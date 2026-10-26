/**
 * /llms-full.txt: a plain-text rendering of the /data/v1 records. It reads
 * only the objects the JSON routes serve, so every tool price in it is the
 * serializer's and every section links its canonical page.
 */
import { listModelFamilies } from "@/data/models";
import { WORKFLOWS } from "@/data/workflows";
import type { WorkflowTemplate } from "@/data/workflows/types";
import { SITE_URL } from "@/lib/site";
import { feedComparePages, toPublicComparePage } from "./compare";
import { feedGuides, toPublicClaudeVsGpt, toPublicGuide, toPublicModelFamily, toPublicWorkflow } from "./content";
import { redactEmails } from "./prose";
import type {
  PublicCatalogT,
  PublicComparePageT,
  PublicGuideT,
  PublicModelCompareT,
  PublicModelFamilyT,
  PublicModelVersionT,
  PublicToolSummaryT,
  PublicToolT,
  PublicWorkflowT,
} from "./schema";
import { FEED_ATTRIBUTION, FEED_LICENSE, toPublicCatalog, toolDataUrl, type FeedTools } from "./serialize";

export type LlmsFullInput = {
  generatedAt: string;
  catalog: PublicCatalogT;
  compare: PublicComparePageT[];
  guides: PublicGuideT[];
  workflows: PublicWorkflowT[];
  models: PublicModelFamilyT[];
  modelCompare: PublicModelCompareT | null;
};

const bullets = (items: readonly string[]) => items.map((item) => `- ${item.replace(/\n+/g, " ")}`);

function section(title: string, canonical: string, body: string[]): string[] {
  return [`## ${title}`, "", `Canonical: ${canonical}`, "", ...body, ""];
}

export function priceLine(tool: Pick<PublicToolT, "free_tier" | "starting_price" | "lowest_paid" | "lifecycle">): string[] {
  if (tool.lifecycle === "discontinued") return ["Status: discontinued (no current pricing)"];
  const out = [`Free tier: ${tool.free_tier.available ? "yes" : "no"}${tool.free_tier.summary ? ` (${tool.free_tier.summary})` : ""}`];
  if (tool.starting_price) out.push(`Starting price: ${tool.starting_price}`);
  if (tool.lowest_paid) out.push(`Lowest paid plan: ${tool.lowest_paid.name}, ${tool.lowest_paid.price_text}`);
  return out;
}

function toolBlock(tool: PublicToolT): string[] {
  const lines = [`### ${tool.name}`, "", `Canonical: ${tool.url}`, `Data: ${toolDataUrl(tool.slug)}`];
  if (tool.category) lines.push(`Category: ${tool.category.name}`);
  if (tool.company) lines.push(`Company: ${tool.company}`);
  if (tool.website) lines.push(`Website: ${tool.website}`);
  lines.push(`Cost tier: ${tool.cost_tier}`, `Difficulty: ${tool.difficulty}`, `Lifecycle: ${tool.lifecycle}`);
  if (tool.status) lines.push(`Status: ${tool.status.headline}`);
  if (tool.description) lines.push(`Description: ${tool.description}`);
  if (tool.primary_use) lines.push(`Primary use: ${tool.primary_use}`);
  if (tool.tasks?.length) lines.push(`Tasks: ${tool.tasks.join(", ")}`);
  lines.push(...priceLine(tool));
  if (tool.plans.length) {
    lines.push("Plans:");
    for (const plan of tool.plans) {
      lines.push(`- ${plan.name}: ${plan.price_text}${plan.limits ? ` (${plan.limits})` : ""}`);
    }
  }
  if (tool.api_pricing) lines.push(`API pricing: ${tool.api_pricing}`);
  if (tool.features?.length) lines.push("Features:", ...bullets(tool.features));
  if (tool.alternatives.length) lines.push(`Alternatives: ${tool.alternatives.map((a) => a.name).join(", ")}`);
  if (tool.guide_url) lines.push(`Guide: ${tool.guide_url}`);
  lines.push(`Data as of: ${tool.data_as_of ?? "not dated"}`);
  // A source per tool: its dated sources, else the official site.
  const sources = tool.sources.length
    ? tool.sources.map((s) => `${s.url}${s.checked_at ? ` (checked ${s.checked_at})` : ""}`)
    : [tool.website ?? tool.url];
  lines.push("Sources:", ...bullets(sources), "");
  return lines;
}

export const summaryLine = (tool: PublicToolSummaryT) =>
  `${tool.name} (${tool.url}): ${tool.starting_price ? `starting price ${tool.starting_price}` : "no listed price"}; free tier ${tool.free_tier.available ? "yes" : "no"}; data as of ${tool.data_as_of ?? "not dated"}`;

function compareBlock(page: PublicComparePageT): string[] {
  const lines = [`### ${page.title}`, "", `Canonical: ${page.url}`, `Data: ${page.data_url}`, `As of: ${page.as_of ?? "not dated"}`, "", page.description, "", ...page.intro, ""];
  for (const entry of page.tools) {
    const tool = entry.tool;
    lines.push(`#### ${tool.name} (${entry.role})`, `Page: ${tool.url}`);
    if (entry.pick) lines.push(entry.pick);
    if (entry.free_option_label) lines.push(entry.free_option_label);
    lines.push(...priceLine(tool));
    for (const s of entry.sources) lines.push(`Source (${s.field}): ${s.url ?? "none"}${s.as_of ? `, as of ${s.as_of}` : ""}`);
    lines.push("");
  }
  if (page.hit_first.length) lines.push("What you hit first:", ...bullets(page.hit_first), "");
  for (const item of page.faq) lines.push(`Q: ${item.question}`, `A: ${item.answer}`, "");
  if (page.also_consider.length) lines.push("Also consider:", ...bullets(page.also_consider.map(summaryLine)), "");
  return lines;
}

function guideBlock(guide: PublicGuideT): string[] {
  const lines = [`### ${guide.title}`, "", `Canonical: ${guide.url}`, `Data: ${guide.data_url}`, `Last reviewed: ${guide.last_reviewed_at}`, `Tool: ${summaryLine(guide.tool)}`, "", guide.tagline];
  if (guide.how_it_works) lines.push("", guide.how_it_works);
  const list = (title: string, items: string[]) => {
    if (items.length) lines.push("", `${title}:`, ...bullets(items));
  };
  list("What it is", guide.what_it_is);
  list("Before you start", guide.before_you_start);
  if (guide.getting_set_up_safely) list(`Getting set up safely (${guide.getting_set_up_safely.official_source})`, guide.getting_set_up_safely.body);
  for (const block of guide.security) {
    if (block.kind === "text") list("Security", [block.text]);
    else list(`Security: ${block.label}`, block.items);
  }
  list("Best at", guide.triad.best_at);
  list("Okay at", guide.triad.okay_at);
  list("Avoid", guide.triad.avoid);
  for (const action of guide.starter_actions) {
    lines.push("", `Starter: ${action.title}`);
    for (const text of [action.what_it_does, action.why_here, action.tweak]) if (text) lines.push(text);
    if (action.prompt) lines.push("Prompt:", action.prompt);
  }
  list("Pitfalls", guide.pitfalls);
  list("Where to next", guide.where_to_next.map((l) => `${l.label}: ${l.url}`));
  lines.push("");
  return lines;
}

function workflowBlock(workflow: PublicWorkflowT): string[] {
  const lines = [`### ${workflow.title}`, "", `Canonical: ${workflow.url}`, `Data: ${workflow.data_url}`, "", workflow.description, ""];
  for (const tier of workflow.tiers) {
    lines.push(`#### ${tier.name}: ${tier.tagline}`);
    if (tier.time_estimate) lines.push(`Time: ${tier.time_estimate}`);
    if (tier.result) lines.push(`Result: ${tier.result}`);
    for (const tool of tier.tools) {
      lines.push(`- ${tool.tool ? summaryLine(tool.tool) : tool.name}${tool.rationale ? `. ${tool.rationale}` : ""}`);
    }
    for (const step of tier.steps) {
      lines.push(`${step.order}. ${step.label}${step.tool ? ` (${step.tool.name})` : step.name ? ` (${step.name})` : ""}${step.action ? `: ${step.action}` : ""}`);
      if (step.prompt) lines.push(`   Prompt: ${step.prompt.replace(/\n+/g, " ")}`);
    }
    lines.push("");
  }
  return lines;
}

function versionLines(version: PublicModelVersionT): string[] {
  const tokens = (t: PublicModelVersionT["context_window"]) => (t.tokens == null ? "unverified" : `${t.tokens} tokens`);
  const lines = [
    `- ${version.name}${version.api_id ? ` (API id ${version.api_id})` : ""}: ${version.status}, ${version.role}`,
    `  Context: ${tokens(version.context_window)}; max output: ${tokens(version.max_output)}`,
    `  API price (from the model registry): input ${version.api_price_input.price_text}, output ${version.api_price_output.price_text}`,
  ];
  if (version.best_for) lines.push(`  Best for: ${version.best_for}`);
  if (version.sources[0]) lines.push(`  Source: ${version.sources[0].url}`);
  return lines;
}

function modelBlock(family: PublicModelFamilyT): string[] {
  return [
    `### ${family.name} (${family.vendor})`,
    "",
    `Canonical: ${family.url}`,
    `Data: ${family.data_url}`,
    `Last verified: ${family.last_verified_at}`,
    ...bullets(family.which_to_use),
    ...family.versions.flatMap(versionLines),
    ...(family.tools.length ? ["Catalog tools:", ...bullets(family.tools.map(summaryLine))] : []),
    "",
  ];
}

export function renderLlmsFull(input: LlmsFullInput): string {
  const asOf = input.generatedAt.slice(0, 10);
  const lines = [
    "# Launchpad HQ: full data export",
    "",
    `> Plain-text export of the Launchpad HQ catalog, comparison pages, getting-started guides, workflow templates and model families. As of ${asOf}.`,
    "",
    `Canonical: ${SITE_URL}/llms-full.txt`,
    `Index: ${SITE_URL}/llms.txt`,
    `JSON: ${SITE_URL}/data/v1/index.json`,
    `Generated: ${input.generatedAt}`,
    "",
    "Every tool price comes from the tool's own record (the same data as its page and /data/v1/tools/{slug}.json). Prices in guides and workflows are filled in from the same catalog data; none are typed by hand. Model API prices come from the model registry behind /models. Sponsorship never changes inclusion or order.",
    "",
    `Attribution: ${FEED_ATTRIBUTION}`,
    `License: ${FEED_LICENSE}`,
    "",
    ...section(`Catalog (${input.catalog.count} tools)`, `${SITE_URL}/discover`, input.catalog.tools.flatMap(toolBlock)),
    ...section("Comparisons", `${SITE_URL}/compare`, input.compare.flatMap(compareBlock)),
    ...section("Guides", `${SITE_URL}/tutorials`, input.guides.flatMap(guideBlock)),
    ...section("Workflows", `${SITE_URL}/workflows`, input.workflows.flatMap(workflowBlock)),
    ...section("Models", `${SITE_URL}/models`, [
      ...input.models.flatMap(modelBlock),
      ...(input.modelCompare
        ? [
            `### ${input.modelCompare.title}`,
            "",
            `Canonical: ${input.modelCompare.url}`,
            `Data: ${input.modelCompare.data_url}`,
            "",
            ...input.modelCompare.rows.flatMap((row) => [`${row.label}:`, ...versionLines(row.claude), ...versionLines(row.gpt)]),
            "",
          ]
        : []),
    ]),
  ];
  // Backstop: catalog text is the feed's verbatim, but this file carries no emails.
  return `${redactEmails(lines.join("\n")).replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

/** Everything the export needs, from the same builders as the JSON routes. */
export function llmsFullInput(feed: FeedTools, workflows: WorkflowTemplate[] = WORKFLOWS): LlmsFullInput {
  return {
    generatedAt: feed.ctx.generatedAt,
    catalog: toPublicCatalog(feed.rows, feed.facts, feed.ctx),
    compare: feedComparePages(feed).flatMap((page) => toPublicComparePage(page, feed) ?? []),
    guides: feedGuides(feed).flatMap((t) => toPublicGuide(t, feed) ?? []),
    workflows: workflows.map((w) => toPublicWorkflow(w, feed)),
    models: listModelFamilies().map((family) => toPublicModelFamily(family, feed)),
    modelCompare: toPublicClaudeVsGpt(feed),
  };
}
