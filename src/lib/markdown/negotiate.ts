/**
 * Markdown content negotiation (Accept: text/markdown). Pure and
 * dependency-free: src/proxy.ts imports it, and proxy code should stay small.
 *
 * Flow: the proxy asks markdownRewriteTarget() whether a request wants
 * Markdown for a page that has a Markdown version (or for a path that is
 * certainly a 404). If so it rewrites to the internal /md/... route handler
 * (src/app/md/[[...path]]/route.ts) before Clerk runs. Everything else,
 * including every browser request, gets the normal HTML.
 */

type AcceptRange = { type: string; subtype: string; q: number };

const MARKDOWN_TYPES = new Set(["text/markdown", "text/x-markdown"]);

export function parseAccept(header: string): AcceptRange[] {
  return header
    .split(",")
    .map((part) => {
      const [range, ...params] = part.trim().split(";");
      const [type = "", subtype = ""] = range.trim().toLowerCase().split("/");
      let q = 1;
      for (const param of params) {
        const [key, value] = param.trim().split("=");
        if (key?.trim().toLowerCase() === "q") {
          const parsed = Number(value);
          q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
        }
      }
      return { type, subtype, q };
    })
    .filter((r) => r.type && r.subtype);
}

/** q for text/html, from the most specific matching range (exact > text/* > *\/*), and that specificity. */
function htmlPreference(ranges: AcceptRange[]): { q: number; specificity: number } {
  const exact = ranges.filter((r) => r.type === "text" && r.subtype === "html");
  if (exact.length) return { q: Math.max(...exact.map((r) => r.q)), specificity: 2 };
  const text = ranges.filter((r) => r.type === "text" && r.subtype === "*");
  if (text.length) return { q: Math.max(...text.map((r) => r.q)), specificity: 1 };
  const any = ranges.filter((r) => r.type === "*" && r.subtype === "*");
  if (any.length) return { q: Math.max(...any.map((r) => r.q)), specificity: 0 };
  return { q: 0, specificity: -1 };
}

/**
 * True only when the client names text/markdown explicitly and prefers it to
 * text/html. A higher q wins. On equal q, an explicit text/html wins (so a
 * browser-like "text/html, text/markdown" still gets HTML), but HTML matched
 * only by a wildcard does not ("text/markdown, *\/*" gets Markdown).
 * Missing header, "*\/*" and every mainstream browser Accept: false.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const ranges = parseAccept(accept);
  const md = ranges.filter((r) => MARKDOWN_TYPES.has(`${r.type}/${r.subtype}`));
  if (!md.length) return false;
  const mdQ = Math.max(...md.map((r) => r.q));
  if (mdQ <= 0) return false;
  const html = htmlPreference(ranges);
  if (mdQ > html.q) return true;
  return mdQ === html.q && html.specificity < 2;
}

/**
 * Top-level path segments that exist as HTML pages, route handlers or public
 * files. A Markdown request under one of these without a Markdown version
 * passes through untouched (HTML, JSON, the file). Anything not listed is a
 * certain 404, so it gets the Markdown 404. negotiate.test.ts checks this
 * list against src/app and public/.
 */
export const KNOWN_TOP_LEVEL = new Set([
  // src/app and src/app/(app)
  "about",
  "account",
  "advertise",
  "ai-of-the-week",
  "alternatives",
  "api",
  "compare",
  "connector",
  "contact",
  "data",
  "developers",
  "discover",
  "for-you",
  "how-we-make-money",
  "mcp",
  "md",
  "models",
  "onboarding",
  "platform",
  "pricing",
  "privacy",
  "quiz",
  "sign-in",
  "sign-up",
  "sponsor-guidelines",
  "support",
  "terms",
  "tutorials",
  "workflows",
  // metadata routes and root files
  "favicon.ico",
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "sitemap.xml",
  // public/
  "brand",
  "images",
  "sponsors",
]);

export type MarkdownPathKind = "markdown" | "not_found" | "passthrough";

/** Does this path have a Markdown version, is it a certain 404, or neither? */
export function classifyMarkdownPath(pathname: string): MarkdownPathKind {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "markdown";
  const [top, ...rest] = segments;
  const md = (yes: boolean): MarkdownPathKind => (yes ? "markdown" : "passthrough");
  switch (top) {
    case "discover":
    case "tutorials":
    case "about":
    case "contact":
    case "developers":
      return md(rest.length === 0);
    case "platform":
      // Overview and guide; prompts and discussions stay HTML-only.
      return md(rest.length === 1 || (rest.length === 2 && rest[1] === "guide"));
    case "workflows":
    case "compare":
      return md(rest.length <= 1);
    case "alternatives":
      return md(rest.length === 1);
    case "models":
      return md(rest.length <= 1 || (rest.length === 2 && rest[0] === "compare"));
    default:
      return KNOWN_TOP_LEVEL.has(top) ? "passthrough" : "not_found";
  }
}

/** Internal route that renders Markdown; never linked, noindex, robots-disallowed. */
export const MARKDOWN_ROUTE_PREFIX = "/md";

export type NegotiationRequest = {
  method: string;
  pathname: string;
  accept: string | null;
  /** Any of the RSC / router-prefetch headers is present. */
  isRscRequest: boolean;
};

/** Headers Next's client router sends on RSC and prefetch fetches. */
export const RSC_REQUEST_HEADERS = ["rsc", "next-router-prefetch", "next-router-state-tree", "next-router-segment-prefetch"];

/** The /md path to rewrite to, or null to leave the request alone. */
export function markdownRewriteTarget(req: NegotiationRequest): string | null {
  if (req.method !== "GET" && req.method !== "HEAD") return null;
  if (req.isRscRequest) return null;
  if (!prefersMarkdown(req.accept)) return null;
  const pathname = req.pathname.length > 1 ? req.pathname.replace(/\/+$/, "") : req.pathname;
  // Direct /md requests are already the Markdown route.
  if (pathname === MARKDOWN_ROUTE_PREFIX || pathname.startsWith(`${MARKDOWN_ROUTE_PREFIX}/`)) return null;
  if (classifyMarkdownPath(pathname) === "passthrough") return null;
  return pathname === "/" ? MARKDOWN_ROUTE_PREFIX : `${MARKDOWN_ROUTE_PREFIX}${pathname}`;
}

/**
 * Next's own app-page Vary (base-server setVaryHeader) plus Accept. Next's
 * page render sets Vary itself; repeating its list means neither order of
 * precedence can drop the RSC entries.
 */
export const HTML_VARY_WITH_ACCEPT = [...RSC_REQUEST_HEADERS, "Accept"].join(", ");

/**
 * Paths whose HTML responses get `Vary: Accept` (next.config.ts headers), so
 * a shared cache keeps the HTML and Markdown variants apart. path-to-regexp
 * syntax.
 */
export const MARKDOWN_VARY_SOURCES = [
  "/",
  "/discover",
  "/tutorials",
  "/about",
  "/contact",
  "/developers",
  "/platform/:slug",
  "/platform/:slug/guide",
  "/workflows",
  "/workflows/:slug",
  "/compare",
  "/compare/:pair",
  "/alternatives/:slug",
  "/models",
  "/models/:family",
  "/models/compare/:pair",
];
