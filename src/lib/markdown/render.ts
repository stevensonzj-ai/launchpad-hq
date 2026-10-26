/**
 * Markdown versions of public pages, served for Accept: text/markdown (see
 * negotiate.ts). Pure: every renderer takes the records the /data/v1 routes
 * serve (built by the same serializer and content builders), plus the shared
 * site copy, so a fact here always equals the JSON feed and llms-full.txt.
 * Price wording reuses llms-full's helpers.
 */
import { developerSections } from "@/lib/developers-content";
import { priceLine, summaryLine } from "@/lib/public-data/llms-full";
import { redactEmails } from "@/lib/public-data/prose";
import type {
  PublicCatalogT,
  PublicCompareIndexT,
  PublicComparePageT,
  PublicGuideIndexT,
  PublicGuideT,
  PublicModelCompareT,
  PublicModelFamilyT,
  PublicModelsIndexT,
  PublicModelVersionT,
  PublicToolSummaryT,
  PublicToolT,
  PublicWorkflowIndexT,
  PublicWorkflowT,
} from "@/lib/public-data/schema";
import { FEED_ATTRIBUTION, toolDataUrl } from "@/lib/public-data/serialize";
import {
  ABOUT_DESCRIPTION,
  ABOUT_SECTIONS,
  ABOUT_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_SECTIONS,
  CONTACT_TITLE,
  DEVELOPERS_DESCRIPTION,
  DEVELOPERS_TITLE,
  HOME_ABOUT,
  HOME_DEVELOPERS,
  type CopySection,
} from "@/lib/site-copy";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const oneLine = (text: string) => text.replace(/\s*\n+\s*/g, " ").trim();
const bullets = (items: readonly string[]) => items.map((item) => `- ${oneLine(item)}`);
const link = (label: string, url: string) => `[${label.replace(/[[\]]/g, "")}](${url})`;
const abs = (href: string) => (href.startsWith("http") ? href : absoluteUrl(href));

/** A fenced block whose fence is longer than any backtick run inside it. */
function fence(text: string, lang = "text"): string[] {
  const longest = Math.max(2, ...[...text.matchAll(/`+/g)].map((m) => m[0].length));
  const ticks = "`".repeat(longest + 1);
  return [`${ticks}${lang}`, text, ticks];
}

function cell(text: string | null | undefined): string {
  return oneLine(text ?? "").replace(/\|/g, "\\|") || "-";
}

/** Join, collapse blank runs, end with one newline. Emails are redacted unless the page is meant to show one. */
function finish(lines: string[], options: { keepEmails?: boolean } = {}): string {
  const text = lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return `${options.keepEmails ? text : redactEmails(text)}\n`;
}

function header(title: string, canonical: string, summary?: string | null): string[] {
  return [`# ${title}`, "", ...(summary ? [`> ${oneLine(summary)}`, ""] : []), `Canonical: ${canonical}`, ""];
}

function footer(extra: string[] = []): string[] {
  return [
    "---",
    "",
    ...extra,
    FEED_ATTRIBUTION,
    "Sponsorship never changes this data. Prices change often: confirm on the vendor's site before you buy.",
    `More: ${link("llms.txt", absoluteUrl("/llms.txt"))} · ${link("Developer docs", absoluteUrl("/developers"))} · ${link("Sitemap", absoluteUrl("/sitemap.xml"))}`,
  ];
}

function copySection(section: CopySection, level = 2): string[] {
  const out = [`${"#".repeat(level)} ${section.heading}`, ""];
  for (const p of section.paragraphs) {
    // Multi-line paragraphs are examples (JSON, curl): keep them verbatim.
    out.push(...(p.includes("\n") ? fence(p, "json") : [p]), "");
  }
  if (section.bullets?.length) out.push(...bullets(section.bullets), "");
  if (section.links?.length) out.push(...bullets(section.links.map((l) => link(l.label, abs(l.href)))), "");
  return out;
}

const toolLink = (tool: { name: string; url: string }) => link(tool.name, tool.url);
// summaryLine starts with "Name (url): "; swap that prefix for a link.
const summaryItem = (tool: PublicToolSummaryT) =>
  `${toolLink(tool)}: ${summaryLine(tool).slice(`${tool.name} (${tool.url}): `.length)}`;

// ------------------------------------------------------------------ home

export type HomeMarkdownInput = {
  toolCount: number;
  categories: PublicCatalogT["categories"];
  guideCount: number;
  workflowCount: number;
  comparePageCount: number;
  featuredWorkflows: { title: string; url: string; description: string }[];
};

export function renderHomeMarkdown(input: HomeMarkdownInput): string {
  return finish([
    ...header("Launchpad HQ: find the right AI tool", SITE_URL, "A free, curated directory of AI tools for beginners and budget-conscious users, with honest pricing notes, a matching quiz, getting-started guides and comparisons."),
    `${input.toolCount} tools across ${input.categories.length} categories, ${input.guideCount} getting-started guides, ${input.comparePageCount} comparison pages and ${input.workflowCount} workflow templates. Free to explore, no account needed.`,
    "",
    ...HOME_ABOUT.flatMap((s) => copySection(s)),
    "## Start here",
    "",
    ...bullets([
      `${link("Discover", absoluteUrl("/discover"))}: browse and filter every tool`,
      `${link("Find my match", absoluteUrl("/quiz"))}: a four-question quiz that suggests a shortlist`,
      `${link("Getting-started guides", absoluteUrl("/tutorials"))}: setup, safety notes and first prompts per tool`,
      `${link("Comparisons", absoluteUrl("/compare"))}: head-to-head and free-alternative pages`,
      `${link("Workflows", absoluteUrl("/workflows"))}: multi-tool recipes with optimal, hybrid and budget tiers`,
      `${link("Models", absoluteUrl("/models"))}: versions of the major AI model families, from official docs`,
      `${link("About", absoluteUrl("/about"))} · ${link("Contact", absoluteUrl("/contact"))} · ${link("How we make money", absoluteUrl("/how-we-make-money"))}`,
    ]),
    "",
    "## Categories",
    "",
    ...bullets(input.categories.map((c) => `${link(c.name, absoluteUrl(`/discover?category=${c.slug}`))} (${c.count})`)),
    "",
    "## Featured workflows",
    "",
    ...bullets(input.featuredWorkflows.map((w) => `${link(w.title, w.url)}: ${w.description}`)),
    "",
    ...copySection(HOME_DEVELOPERS),
    ...footer(),
  ]);
}

// -------------------------------------------------------------- discover

export function renderDiscoverMarkdown(catalog: PublicCatalogT, categorySlug?: string | null): string {
  const category = categorySlug ? catalog.categories.find((c) => c.slug === categorySlug) : undefined;
  const tools = category ? catalog.tools.filter((t) => t.category?.slug === category.slug) : catalog.tools;
  const groups = new Map<string, { name: string; tools: PublicToolT[] }>();
  for (const tool of tools) {
    const key = tool.category?.slug ?? "uncategorised";
    const group = groups.get(key) ?? { name: tool.category?.name ?? "Uncategorised", tools: [] };
    group.tools.push(tool);
    groups.set(key, group);
  }
  const sorted = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
  const line = (tool: PublicToolT) => {
    const price = tool.lifecycle === "discontinued" ? "discontinued" : tool.starting_price ? `from ${tool.starting_price}` : "no listed price";
    const free = tool.free_tier.available ? "free tier" : "no free tier";
    const what = tool.primary_use ?? tool.description;
    return `${toolLink(tool)}: ${tool.cost_tier.toLowerCase()}, ${free}, ${price}${what ? `. ${oneLine(what)}` : ""}`;
  };
  const title = category ? `${category.name} AI tools` : "Discover AI tools";
  const canonical = absoluteUrl(category ? `/discover?category=${category.slug}` : "/discover");
  return finish([
    ...header(title, canonical),
    `${tools.length} tools${category ? "" : ` across ${catalog.categories.length} categories`}. Sorted by name within each category. JSON: ${absoluteUrl("/data/v1/catalog.json")}`,
    "",
    ...(categorySlug && !category ? [`No category "${categorySlug}"; showing every tool.`, ""] : []),
    "Search, cost, difficulty and app filters are only on the HTML page; this version filters by category alone.",
    "",
    ...sorted.flatMap((g) => [`## ${g.name}`, "", ...bullets(g.tools.map(line)), ""]),
    ...footer(),
  ]);
}

// ------------------------------------------------------------------ tool

function planTable(tool: PublicToolT): string[] {
  if (!tool.plans.length) return [];
  return [
    "| Plan | Price | Limits |",
    "| --- | --- | --- |",
    ...tool.plans.map((p) => `| ${cell(p.name)} | ${cell(p.price_text)} | ${cell(p.limits)} |`),
    "",
  ];
}

export function renderToolMarkdown(tool: PublicToolT): string {
  const facts = [
    tool.category ? `Category: ${link(tool.category.name, absoluteUrl(`/discover?category=${tool.category.slug}`))}` : null,
    tool.company ? `Company: ${tool.company}` : null,
    tool.website ? `Official site: ${tool.website}` : null,
    `Cost tier: ${tool.cost_tier}`,
    `Difficulty: ${tool.difficulty}`,
    `Privacy level: ${tool.technical.privacy_level}`,
    `Lifecycle: ${tool.lifecycle}`,
    tool.platforms.length ? `Platforms: ${tool.platforms.join(", ")}` : null,
    `Data as of: ${tool.data_as_of ?? "not dated"} (verification: ${tool.verification.status})`,
    `JSON: ${toolDataUrl(tool.slug)}`,
  ].filter((x): x is string => Boolean(x));
  const out = [...header(tool.name, tool.url, tool.description), ...bullets(facts), ""];
  if (tool.status) {
    out.push("## Status", "", tool.status.headline, "", ...bullets(tool.status.details));
    if (tool.status.what_to_do) out.push("", `What to do: ${tool.status.what_to_do}`);
    if (tool.status.alternatives.length) {
      out.push("", `Alternatives: ${tool.status.alternatives.map((a) => link(a.name, absoluteUrl(`/platform/${a.slug}`))).join(", ")}`);
    }
    out.push("", `Source (${tool.status.source_kind}, checked ${tool.status.checked_at}): ${tool.status.source_url}`, "");
  }
  out.push("## Pricing", "", ...bullets(priceLine(tool)), "", ...planTable(tool));
  if (tool.api_pricing) out.push(`API pricing: ${oneLine(tool.api_pricing)}`, "");
  const uses = [
    tool.primary_use ? `Primary use: ${tool.primary_use}` : null,
    tool.use_cases ? `Use cases: ${tool.use_cases}` : null,
    tool.best_for.length ? `Best for: ${tool.best_for.join(", ")}` : null,
    tool.works_with.length ? `Works with: ${tool.works_with.join(", ")}` : null,
    tool.outputs.length ? `Outputs: ${tool.outputs.join(", ")}` : null,
    tool.models?.length ? `Models: ${tool.models.join(", ")}` : null,
    tool.tasks?.length ? `Tasks: ${tool.tasks.join(", ")}` : null,
    tool.technical.languages ? `Languages: ${tool.technical.languages}` : null,
    tool.technical.integrations ? `Integrations: ${tool.technical.integrations}` : null,
    `Offline use: ${tool.technical.offline ? "yes" : "no"}; API: ${tool.technical.api_available ? "yes" : "no"}`,
  ].filter((x): x is string => Boolean(x));
  out.push("## What it is for", "", ...bullets(uses), "");
  if (tool.features?.length) out.push("## Features", "", ...bullets(tool.features), "");
  if (tool.guide_url) out.push(`Getting-started guide: ${tool.guide_url}`, "");
  if (tool.alternatives.length) {
    out.push("## Alternatives", "", ...bullets(tool.alternatives.map((a) => link(a.name, absoluteUrl(`/platform/${a.slug}`)))), "");
  }
  if (tool.works_well_with.length) {
    out.push("## Works well with", "", ...bullets(tool.works_well_with.map((a) => link(a.name, absoluteUrl(`/platform/${a.slug}`)))), "");
  }
  if (tool.notes.length) out.push("## Notes", "", ...bullets(tool.notes), "");
  if (tool.changelog.length) out.push("## Changelog", "", ...bullets(tool.changelog.map((c) => `${c.date} (${c.field}): ${c.summary}`)), "");
  const sources = tool.sources.length
    ? tool.sources.map((s) => `${s.label}: ${s.url}${s.checked_at ? ` (checked ${s.checked_at}, ${s.status})` : ` (${s.status})`}`)
    : [tool.website ?? tool.url];
  out.push("## Sources", "", ...bullets(sources), "", ...footer());
  return finish(out);
}

// --------------------------------------------------------------- compare

export function renderComparePageMarkdown(page: PublicComparePageT): string {
  const out = [...header(page.title, page.url, page.description), ...page.intro.flatMap((p) => [p, ""])];
  out.push(`As of: ${page.as_of ?? "not dated"} · JSON: ${page.data_url}`, "");
  for (const entry of page.tools) {
    const tool = entry.tool;
    out.push(`## ${tool.name} (${entry.role})`, "", `Page: ${tool.url}`, "");
    if (entry.pick) out.push(entry.pick, "");
    if (entry.free_option_label) out.push(entry.free_option_label, "");
    out.push(...bullets(priceLine(tool)), "", ...planTable(tool));
    if (entry.sources.length) {
      out.push(...bullets(entry.sources.map((s) => `Source (${s.field}): ${s.url ?? "none"}${s.as_of ? `, as of ${s.as_of}` : ""}`)), "");
    }
  }
  if (page.hit_first.length) out.push("## What you hit first", "", ...bullets(page.hit_first), "");
  if (page.faq.length) out.push("## FAQ", "", ...page.faq.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]));
  if (page.also_consider.length) out.push("## Also consider", "", ...bullets(page.also_consider.map(summaryItem)), "");
  if (page.related.length) out.push("## Related", "", ...bullets(page.related.map((l) => link(l.label, l.url))), "");
  if (page.undated_tools.length) out.push(`Undated: ${page.undated_tools.join(", ")}`, "");
  out.push(...footer());
  return finish(out);
}

export function renderCompareIndexMarkdown(index: PublicCompareIndexT): string {
  const kind = (k: "head-to-head" | "free-alternatives") => index.pages.filter((p) => p.kind === k);
  const entries = (pages: { title: string; url: string; description: string }[]) =>
    bullets(pages.map((p) => `${link(p.title, p.url)}: ${p.description}`));
  return finish([
    ...header("Compare AI tools", index.url, "Head-to-head comparisons and free alternatives, with each tool's prices from its own catalog record."),
    `JSON: ${absoluteUrl("/data/v1/compare/index.json")}`,
    "",
    "## Head to head",
    "",
    ...entries(kind("head-to-head")),
    "",
    "## Free alternatives",
    "",
    ...entries(kind("free-alternatives")),
    "",
    "## Models",
    "",
    ...entries(index.models),
    "",
    ...footer(),
  ]);
}

// ----------------------------------------------------------------- guide

export function renderGuideMarkdown(guide: PublicGuideT): string {
  const out = [...header(guide.title, guide.url, guide.tagline)];
  out.push(`Tool: ${summaryItem(guide.tool)}`, `Last reviewed: ${guide.last_reviewed_at} · JSON: ${guide.data_url}`, "");
  if (guide.how_it_works) out.push("## How it works", "", guide.how_it_works, "");
  const list = (title: string, items: string[]) => {
    if (items.length) out.push(`## ${title}`, "", ...bullets(items), "");
  };
  list("What it is", guide.what_it_is);
  list("Before you start", guide.before_you_start);
  if (guide.getting_set_up_safely) {
    const setup = guide.getting_set_up_safely;
    out.push("## Getting set up safely", "", `Official source: ${setup.official_source}`, "", ...setup.body.flatMap((p) => [p, ""]));
    if (setup.vendor_docs_url) out.push(`Vendor docs: ${setup.vendor_docs_url}`, "");
  }
  if (guide.security.length) {
    out.push("## Security and privacy", "");
    for (const block of guide.security) {
      if (block.kind === "text") out.push(block.text, "");
      else out.push(`${block.label}:`, "", ...bullets(block.items), "");
    }
  }
  list("Best at", guide.triad.best_at);
  list("Okay at", guide.triad.okay_at);
  list("Avoid", guide.triad.avoid);
  if (guide.starter_actions.length) {
    out.push("## Starter actions", "");
    for (const action of guide.starter_actions) {
      out.push(`### ${action.title}`, "");
      for (const text of [action.what_it_does, action.why_here, action.tweak]) if (text) out.push(text, "");
      if (action.prompt) out.push(...fence(action.prompt), "");
    }
  }
  list("Pitfalls", guide.pitfalls);
  if (guide.where_to_next.length) out.push("## Where to next", "", ...bullets(guide.where_to_next.map((l) => link(l.label, l.url))), "");
  out.push(guide.pricing_note, "", ...footer());
  return finish(out);
}

export function renderGuideIndexMarkdown(index: PublicGuideIndexT): string {
  const groups = new Map<string, { name: string; guides: PublicGuideIndexT["guides"] }>();
  for (const guide of index.guides) {
    const key = guide.category?.slug ?? "other";
    const group = groups.get(key) ?? { name: guide.category?.name ?? "Other", guides: [] };
    group.guides.push(guide);
    groups.set(key, group);
  }
  return finish([
    ...header("Getting-started guides", index.url, "One beginner's guide per tool: setup, safety notes, what it is good and bad at, and first prompts."),
    `${index.count} guides. JSON: ${absoluteUrl("/data/v1/guides/index.json")}`,
    "",
    ...[...groups.values()]
      .sort((a, b) => a.name.localeCompare(b.name))
      .flatMap((g) => [
        `## ${g.name}`,
        "",
        ...bullets(
          [...g.guides]
            .sort((a, b) => a.tool_name.localeCompare(b.tool_name))
            .map((x) => `${link(x.title, x.url)} (reviewed ${x.last_reviewed_at})`),
        ),
        "",
      ]),
    ...footer(),
  ]);
}

// ------------------------------------------------------------- workflows

export function renderWorkflowMarkdown(workflow: PublicWorkflowT): string {
  const out = [...header(workflow.title, workflow.url, workflow.description)];
  if (workflow.tags.length) out.push(`Tags: ${workflow.tags.join(", ")} · JSON: ${workflow.data_url}`, "");
  for (const tier of workflow.tiers) {
    out.push(`## ${tier.name}: ${tier.tagline}`, "");
    if (tier.time_estimate) out.push(`Time: ${tier.time_estimate}`, "");
    if (tier.result) out.push(`Result: ${tier.result}`, "");
    if (tier.tools.length) {
      out.push(
        "Tools:",
        "",
        ...bullets(tier.tools.map((t) => `${t.tool ? summaryItem(t.tool) : t.name}${t.rationale ? `. ${t.rationale}` : ""}`)),
        "",
      );
    }
    for (const step of tier.steps) {
      const tool = step.tool ? ` (${link(step.tool.name, step.tool.url)})` : step.name ? ` (${step.name})` : "";
      out.push(`${step.order}. ${step.label}${tool}${step.action ? `: ${oneLine(step.action)}` : ""}`);
      if (step.prompt) out.push("", ...fence(step.prompt), "");
    }
    out.push("");
  }
  out.push(workflow.pricing_note, "", ...footer());
  return finish(out);
}

export function renderWorkflowIndexMarkdown(index: PublicWorkflowIndexT): string {
  return finish([
    ...header("AI workflow templates", index.url, "Multi-tool recipes, each with an optimal, a hybrid and a budget version."),
    `${index.count} workflows. JSON: ${absoluteUrl("/data/v1/workflows/index.json")}`,
    "",
    ...bullets(index.workflows.map((w) => `${link(w.title, w.url)}: ${w.description}`)),
    "",
    ...footer(),
  ]);
}

// ---------------------------------------------------------------- models

function versionLines(v: PublicModelVersionT): string[] {
  const tokens = (t: PublicModelVersionT["context_window"]) => (t.tokens == null ? "unverified" : `${t.tokens} tokens`);
  const lines = [
    `### ${v.name}`,
    "",
    ...bullets(
      [
        `Status: ${v.status}, ${v.role}${v.api_id ? `; API id ${v.api_id}` : ""}`,
        v.release_date ? `Released: ${v.release_date}${v.release_date_verified ? "" : " (unverified)"}` : null,
        `Context window: ${tokens(v.context_window)}; max output: ${tokens(v.max_output)}`,
        `API price: input ${v.api_price_input.price_text}, output ${v.api_price_output.price_text}`,
        v.consumer_access.summary ? `In the apps: ${v.consumer_access.summary}` : null,
        v.best_for ? `Best for: ${v.best_for}` : null,
        v.strengths.length ? `Strengths: ${v.strengths.join("; ")}` : null,
        v.caveats.length ? `Caveats: ${v.caveats.join("; ")}` : null,
        ...v.sources.map((s) => `Source: ${s.label}: ${s.url}`),
      ].filter((x): x is string => Boolean(x)),
    ),
    "",
  ];
  return lines;
}

export function renderModelFamilyMarkdown(family: PublicModelFamilyT): string {
  return finish([
    ...header(`${family.name} models (${family.vendor})`, family.url),
    `Last verified: ${family.last_verified_at} · JSON: ${family.data_url}`,
    "",
    ...(family.which_to_use.length ? ["## Which to use", "", ...bullets(family.which_to_use), ""] : []),
    "## Versions",
    "",
    ...family.versions.flatMap(versionLines),
    ...(family.tools.length ? ["## Catalog tools built on it", "", ...bullets(family.tools.map(summaryItem)), ""] : []),
    ...(family.sources.length ? ["## Sources", "", ...bullets(family.sources.map((s) => `${s.label}: ${s.url}`)), ""] : []),
    family.pricing_note,
    "",
    ...footer(),
  ]);
}

export function renderModelsIndexMarkdown(index: PublicModelsIndexT): string {
  return finish([
    ...header("AI model families", index.url, "Current and prior versions of the major model families, from official vendor docs."),
    `JSON: ${absoluteUrl("/data/v1/models/index.json")}`,
    "",
    ...bullets(index.families.map((f) => `${link(`${f.name} (${f.vendor})`, f.url)}: last verified ${f.last_verified_at}`)),
    "",
    ...(index.compare.length ? ["## Comparisons", "", ...bullets(index.compare.map((c) => `${link(c.title, c.url)}: ${c.description}`)), ""] : []),
    ...footer(),
  ]);
}

export function renderModelCompareMarkdown(page: PublicModelCompareT): string {
  return finish([
    ...header(page.title, page.url, page.description),
    `Last verified: Claude ${page.last_verified_at.claude}, GPT ${page.last_verified_at.gpt} · JSON: ${page.data_url}`,
    "",
    ...page.rows.flatMap((row) => [`## ${row.label}`, "", ...versionLines(row.claude), ...versionLines(row.gpt)]),
    ...(page.tools.length ? ["## Catalog tools", "", ...bullets(page.tools.map(summaryItem)), ""] : []),
    page.pricing_note,
    "",
    ...footer(),
  ]);
}

// ---------------------------------------------------------- static pages

export function renderAboutMarkdown(): string {
  return finish(
    [...header(ABOUT_TITLE, absoluteUrl("/about"), ABOUT_DESCRIPTION), ...ABOUT_SECTIONS.flatMap((s) => copySection(s)), ...footer()],
    { keepEmails: true },
  );
}

export function renderContactMarkdown(): string {
  return finish(
    [...header(CONTACT_TITLE, absoluteUrl("/contact"), CONTACT_DESCRIPTION), ...CONTACT_SECTIONS.flatMap((s) => copySection(s)), ...footer()],
    { keepEmails: true },
  );
}

export function renderDevelopersMarkdown(): string {
  return finish([
    ...header(DEVELOPERS_TITLE, absoluteUrl("/developers"), DEVELOPERS_DESCRIPTION),
    ...developerSections().flatMap((s) => copySection(s)),
    ...footer(),
  ]);
}

export function renderNotFoundMarkdown(path: string): string {
  return finish([
    "# Page not found",
    "",
    `Nothing is published at ${oneLine(path) || "/"} on Launchpad HQ. The page may have moved, or the address may be mistyped.`,
    "",
    "Try one of these instead:",
    "",
    ...bullets([
      `${link("llms.txt", absoluteUrl("/llms.txt"))}: an index of the site for language models`,
      `${link("Sitemap", absoluteUrl("/sitemap.xml"))}: every public page`,
      `${link("Discover", absoluteUrl("/discover"))}: browse and search every AI tool (search with ${absoluteUrl("/discover?q=")}your-term)`,
      `${link("Developer docs", absoluteUrl("/developers"))}: the JSON feed, MCP connector and Markdown pages`,
      `${link("Home", SITE_URL)}`,
    ]),
  ]);
}

export function renderUnavailableMarkdown(): string {
  return finish([
    "# Temporarily unavailable",
    "",
    "This page could not load its data just now. Retry in a minute or two.",
    "",
    `The HTML page at the same address may still work. Static indexes: ${link("llms.txt", absoluteUrl("/llms.txt"))}, ${link("Sitemap", absoluteUrl("/sitemap.xml"))}.`,
  ]);
}
