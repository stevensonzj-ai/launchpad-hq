import { markdownForPath } from "@/lib/markdown/pages";
import { renderUnavailableMarkdown } from "@/lib/markdown/render";

/**
 * Markdown versions of public pages. src/proxy.ts rewrites GET/HEAD requests
 * that prefer text/markdown here (e.g. "/platform/chatgpt" -> "/md/platform/chatgpt").
 *
 * Caching: `private, no-store`, so neither the CDN nor any shared cache
 * keeps a Markdown copy that could be served for the HTML URL, and
 * `Vary: Accept` for any cache that ignores that. Agent traffic is small, so
 * rendering per request is cheap. Not in the sitemap; noindex.
 */
export const dynamic = "force-dynamic";

const BASE_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "private, no-store",
  Vary: "Accept",
  "X-Robots-Tag": "noindex",
} as const;

export async function GET(request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  try {
    const result = await markdownForPath(path, new URL(request.url).searchParams);
    if (result.status === 301) {
      return new Response(null, { status: 301, headers: { ...BASE_HEADERS, Location: result.location } });
    }
    const headers: Record<string, string> = { ...BASE_HEADERS };
    if (result.status === 200) headers.Link = `<${result.canonical}>; rel="canonical"`;
    return new Response(result.body, { status: result.status, headers });
  } catch (error) {
    // Message only: driver errors can carry connection details in other fields.
    console.error("[md] render failed:", error instanceof Error ? error.message : "unknown error");
    return new Response(renderUnavailableMarkdown(), { status: 503, headers: BASE_HEADERS });
  }
}

export const HEAD = GET;
