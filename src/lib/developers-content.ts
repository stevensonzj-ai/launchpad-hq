/**
 * /developers content, shared by the HTML page and its Markdown version.
 * Endpoints come from the feed's own builders so the docs can't drift
 * from what the feed serves.
 */
import { TOOL_SPECS } from "@/lib/mcp/server";
import { FEED_CHANGELOG } from "@/lib/public-data/changelog";
import { SCHEMA_VERSION } from "@/lib/public-data/schema";
import { FEED_ATTRIBUTION, FEED_LICENSE } from "@/lib/public-data/serialize";
import { absoluteUrl } from "@/lib/site";
import type { CopySection } from "@/lib/site-copy";

export type DeveloperEndpoint = { path: string; what: string };

const feed = (path: string) => absoluteUrl(`/data/v1${path}`);

export const FEED_ENDPOINTS: DeveloperEndpoint[] = [
  { path: feed("/index.json"), what: "Start here: counts, every link and URL template, cache policy and the changelog." },
  { path: feed("/catalog.json"), what: "Every listed tool's full record in one file." },
  { path: feed("/tools/{slug}.json"), what: "One tool: plans, prices, free tier, status, alternatives and dated sources." },
  { path: feed("/compare/index.json"), what: "Every comparison and free-alternatives page." },
  { path: feed("/compare/{slug}.json"), what: "One comparison page, with each tool's full record." },
  { path: feed("/guides/index.json"), what: "Every getting-started guide." },
  { path: feed("/guides/{slug}.json"), what: "One guide, by tool slug." },
  { path: feed("/workflows/index.json"), what: "Every workflow template." },
  { path: feed("/workflows/{slug}.json"), what: "One workflow, with current prices per tier." },
  { path: feed("/models/index.json"), what: "Every AI model family." },
  { path: feed("/models/{slug}.json"), what: "One model family and its versions." },
  { path: feed("/models/compare/claude-vs-gpt.json"), what: "Claude vs GPT models." },
  { path: feed("/quiz.json"), what: "Quiz questions, options and scoring map." },
  { path: feed("/openapi.json"), what: "OpenAPI 3.1 description of every route above." },
  { path: feed("/schema/tool.json"), what: `JSON Schema for one tool record (schema version ${SCHEMA_VERSION}).` },
];

export const MARKDOWN_PATHS = [
  "/",
  "/discover",
  "/platform/{slug}",
  "/platform/{slug}/guide",
  "/tutorials",
  "/compare",
  "/compare/{pair}",
  "/alternatives/{slug}",
  "/workflows",
  "/workflows/{slug}",
  "/models",
  "/models/{family}",
  "/models/compare/claude-vs-gpt",
  "/about",
  "/contact",
  "/developers",
];

export const MARKDOWN_EXAMPLE = `curl -H "Accept: text/markdown" ${absoluteUrl("/platform/chatgpt")}`;

export const ERROR_EXAMPLE = `{
  "error": {
    "code": "not_found",
    "message": "Nothing is published at this feed URL.",
    "resolution": "Check the slug against ${feed("/catalog.json")} ..."
  }
}`;

export function developerSections(): CopySection[] {
  return [
    {
      heading: "Overview",
      paragraphs: [
        "Launchpad HQ publishes its AI tool catalog, comparison pages, getting-started guides, workflow templates and model reference as free, read-only data. There is no API key, no sign-in and no SDK to install. Every channel reads the same records as the website, so a price in the feed is the price on the tool's page.",
        "Sponsorship never affects the data: the feed and the connector don't read sponsor data, and every record is marked sponsored: false.",
      ],
    },
    {
      heading: "JSON data feed",
      paragraphs: [
        "Plain HTTPS GET, JSON responses, CORS open to every origin. Slugs match the website: /platform/{slug} on the site is /data/v1/tools/{slug}.json in the feed. Retired slugs answer with a 301 to the current one.",
      ],
      bullets: FEED_ENDPOINTS.map((e) => `${e.path}: ${e.what}`),
    },
    {
      heading: "MCP connector for AI assistants",
      paragraphs: [
        `${absoluteUrl("/mcp")} is a read-only Model Context Protocol server over Streamable HTTP (stateless, POST only, no authentication). Tools: ${TOOL_SPECS.map((t) => t.name).join(", ")}. Results are dated and sourced, and each links to its Launchpad HQ page.`,
      ],
      links: [{ label: "Connector setup and how to read results", href: "/connector" }],
    },
    {
      heading: "Markdown pages",
      paragraphs: [
        "Send Accept: text/markdown and these pages answer in Markdown (Content-Type: text/markdown; charset=utf-8) instead of HTML, built from the same records as the feed. Browsers and any client that prefers text/html get the normal page. Unknown paths return a Markdown 404 with links to llms.txt and the sitemap.",
        `Example: ${MARKDOWN_EXAMPLE}`,
      ],
      bullets: MARKDOWN_PATHS,
    },
    {
      heading: "llms.txt",
      paragraphs: [
        "llms.txt is a short index of the site for language models, with a section on when to use Launchpad HQ. llms-full.txt is the whole catalog, comparisons, guides, workflows and models as one plain-text file.",
      ],
      links: [
        { label: "llms.txt", href: "/llms.txt" },
        { label: "llms-full.txt", href: "/llms-full.txt" },
        { label: "Sitemap", href: "/sitemap.xml" },
      ],
    },
    {
      heading: "Caching and limits",
      paragraphs: [
        "Feed responses are cached at the CDN for up to an hour (s-maxage=3600, stale-while-revalidate=86400); a 404 is cached for a minute and errors are not cached. Markdown pages are sent with Cache-Control: private, no-store and Vary: Accept so shared caches never mix them up with the HTML.",
        "There is no per-client rate limit in our code, so no rate-limit headers are sent. Please cache what you fetch, prefer catalog.json to many single-tool requests, and keep to a few requests per second.",
      ],
    },
    {
      heading: "Errors",
      paragraphs: [
        'The feed and the JSON /api routes return errors in one shape, with a stable code, a message and a resolution hint. Codes: bad_request (400), unauthorized (401), not_found (404), method_not_allowed (405), internal_error (500), unavailable (503). The feed is GET/HEAD only. /mcp keeps JSON-RPC errors as the protocol requires and puts the same code and resolution in error.data.',
        ERROR_EXAMPLE,
      ],
    },
    {
      heading: "Versioning and changelog",
      paragraphs: [
        `The feed lives under /data/v1 and each record carries schema_version (now ${SCHEMA_VERSION}). New fields can appear at any time; other changes are listed here, in the changelog array of /data/v1/index.json and in the OpenAPI description.`,
      ],
      bullets: FEED_CHANGELOG.map((c) => `${c.date}: ${c.summary}`),
    },
    {
      heading: "Attribution and licence",
      paragraphs: [FEED_ATTRIBUTION, FEED_LICENSE],
    },
  ];
}
