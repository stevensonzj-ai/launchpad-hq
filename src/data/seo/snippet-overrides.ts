/**
 * Hand-written titles and meta descriptions for pages whose generated
 * snippet does not match the query. Empty until a page is rewritten.
 * `revisedAt` is the day the snippet was written, and the sitemap uses it
 * as one content date. It is not a build timestamp.
 */
export type SnippetOverride = {
  title: string;
  description: string;
  /** YYYY-MM-DD. The day this snippet was written. */
  revisedAt: string;
};

export const SNIPPET_OVERRIDES: Readonly<Record<string, SnippetOverride>> = {};

export function snippetOverride(path: string): SnippetOverride | undefined {
  return SNIPPET_OVERRIDES[path];
}

export function snippetRevisionDate(path: string): string | undefined {
  return snippetOverride(path)?.revisedAt;
}
