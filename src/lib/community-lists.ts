import { apiError } from "@/lib/api-error";
import { CATALOG_TAG, platformTag } from "@/lib/catalog-cache";
import { PUBLIC_HOURLY_CACHE } from "@/lib/public-data/http";

/**
 * The approved prompt and discussion lists behind
 * GET /api/platforms/[slug]/{prompts,discussions}, and the tags that expire
 * them. Free of Next and Prisma imports so it is unit tested; the routes pass
 * in the cache (src/lib/community-cache.ts) and the Prisma reads
 * (src/lib/community-queries.ts).
 *
 * Why cached: every list read woke the production Neon endpoint. The lists
 * are APPROVED rows only and never depend on the visitor (the GETs read no
 * auth, cookies or user), so one copy per slug + page serves everyone.
 * Pending, rejected and per-user data never go through here.
 */

export type CommunityKind = "prompts" | "discussions";

export const COMMUNITY_REVALIDATE_SECONDS = 3600;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
// Bounds the number of cache entries one slug can create.
export const MAX_PAGE = 1000;

/** Sent on every response that belongs to one user (POST results, auth errors). */
export const PRIVATE_NO_STORE = "private, no-store";

export function communityTag(kind: CommunityKind, slug: string): string {
  return kind === "prompts" ? `platform-prompts:${slug}` : `platform-discussions:${slug}`;
}

/** Tags on one cached list entry. `catalog` lets POST /api/revalidate's default flush them too. */
export function communityListTags(kind: CommunityKind, slug: string): string[] {
  return [communityTag(kind, slug), CATALOG_TAG];
}

export type ListParams = { page: number; pageSize: number };

function parsePositiveInt(raw: string | null, fallback: number): number {
  const n = parseInt(raw || "", 10);
  return Number.isFinite(n) && n >= 1 ? n : fallback;
}

/** page >= 1 (capped at MAX_PAGE), pageSize 1..100 defaulting to 20. Garbage falls back to defaults. */
export function normalizeListParams(searchParams: URLSearchParams): ListParams {
  return {
    page: Math.min(MAX_PAGE, parsePositiveInt(searchParams.get("page"), 1)),
    pageSize: Math.min(MAX_PAGE_SIZE, parsePositiveInt(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE)),
  };
}

/** Cache key parts after the deployment generation. Only normalized values, never the raw query. */
export function communityKeyParts(kind: CommunityKind, slug: string, params: ListParams): string[] {
  return ["community", kind, slug, `page=${params.page}`, `pageSize=${params.pageSize}`];
}

/** One line per cache miss. No IP, no cookies, no query string; UA trimmed and stripped of control characters. */
export function dbWakeLine(method: string, path: string, userAgent: string | null): string {
  const ua = (userAgent ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, 80);
  return `[db-wake] ${method} ${path} ua=${ua}`;
}

export type ListPage<Item> = { items: Item[]; totalCount: number };

export type CommunityListDeps<Item> = {
  /** Shared data cache. `read` runs only on a miss; the key and tags fully identify the entry. */
  cache: <R>(keyParts: string[], tags: string[], read: () => Promise<R>) => Promise<R>;
  /** Approved rows only. null when the platform does not exist. */
  read: (slug: string, params: ListParams) => Promise<ListPage<Item> | null>;
  log: (line: string) => void;
};

/**
 * GET handler body. Every success is the same for every visitor, so it gets
 * the hourly CDN header; a missing platform is no-store (apiError default),
 * though the null itself is cached so repeat 404s don't wake the database.
 */
export async function handleCommunityList<Item>(
  request: Request,
  kind: CommunityKind,
  slug: string,
  deps: CommunityListDeps<Item>,
): Promise<Response> {
  const params = normalizeListParams(new URL(request.url).searchParams);
  const line = dbWakeLine("GET", `/api/platforms/${slug}/${kind}`, request.headers.get("user-agent"));
  // The user agent is closed over, not passed as an argument, so it is never part of the key.
  const result = await deps.cache(communityKeyParts(kind, slug, params), communityListTags(kind, slug), async () => {
    deps.log(line);
    return deps.read(slug, params);
  });
  if (!result) {
    return apiError("not_found", { message: "Platform not found" });
  }
  return new Response(JSON.stringify({ ...result, page: params.page, pageSize: params.pageSize }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": PUBLIC_HOURLY_CACHE },
  });
}

/** Mark a user-specific response private, no-store. Returns the same Response. */
export function privateNoStore(response: Response): Response {
  response.headers.set("Cache-Control", PRIVATE_NO_STORE);
  return response;
}

export type ModeratedKind = "prompt" | "discussion" | "reply";

/**
 * What a moderation decision on one item makes stale: its list, plus the
 * platform page row (tab counts) for prompts and discussions. Replies are not
 * counted on the page row.
 */
export function moderationTags(kind: ModeratedKind, slug: string): string[] {
  if (kind === "prompt") return [communityTag("prompts", slug), platformTag(slug)];
  if (kind === "discussion") return [communityTag("discussions", slug), platformTag(slug)];
  return [communityTag("discussions", slug)];
}

export type ExpireResult = { tags: string[]; error: unknown | null };

/**
 * Expire the tags for an item whose public visibility may have changed.
 * A failure to expire is returned, never thrown: the database write already
 * happened and the cache refreshes on its own within the hour. Callers
 * report `error` to Sentry (and flush, G8).
 */
export function expireModerated(
  kind: ModeratedKind,
  slug: string | null | undefined,
  expire: (tag: string) => void,
): ExpireResult {
  if (!slug) return { tags: [], error: null };
  const tags = moderationTags(kind, slug);
  try {
    for (const tag of tags) expire(tag);
  } catch (error) {
    return { tags, error };
  }
  return { tags, error: null };
}

/**
 * Submissions are created PENDING (schema default), which changes nothing
 * public, so nothing is expired. If a row ever lands APPROVED on creation,
 * its list is expired straight away.
 */
export function expireIfCreatedApproved(
  kind: ModeratedKind,
  status: string,
  slug: string,
  expire: (tag: string) => void,
): ExpireResult {
  return status === "APPROVED" ? expireModerated(kind, slug, expire) : { tags: [], error: null };
}
