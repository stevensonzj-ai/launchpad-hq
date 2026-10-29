import { createHash, timingSafeEqual } from "crypto";
import { apiError } from "@/lib/api-error";
import { CATALOG_TAG, platformTag } from "@/lib/catalog-cache";
import { communityTag } from "@/lib/community-lists";

/**
 * POST /api/revalidate: expire the shared catalog cache after the database
 * changes (a catalog-audit --apply, a Prisma Studio edit, a moderation
 * approval). Kept free of Next imports so the auth and parsing are unit
 * tested; the route passes in revalidateTag and the secret.
 *
 * Auth: `Authorization: Bearer <REVALIDATE_SECRET>`. With the env var unset
 * the route answers 503 and does nothing, so it is harmless until the
 * operator configures it. The comparison is constant-time over SHA-256
 * digests, so neither the secret's content nor its length leaks via timing.
 */

export type RevalidateAuth = "ok" | "unconfigured" | "unauthorized";

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function checkRevalidateAuth(authorization: string | null, secret: string | undefined): RevalidateAuth {
  if (!secret) return "unconfigured";
  const match = /^Bearer\s+(.+)$/i.exec(authorization?.trim() ?? "");
  if (!match) return "unauthorized";
  return timingSafeEqual(digest(match[1]), digest(secret)) ? "ok" : "unauthorized";
}

const SLUG = /^[a-z0-9][a-z0-9-]{0,99}$/;
export const MAX_REVALIDATE_SLUGS = 200;

/**
 * Body `{}` (or none): expire everything tagged `catalog`. Body
 * `{ "slugs": ["chatgpt"] }`: expire only those platforms' tags, i.e. the
 * per-platform page row, /api/platforms/<slug>, and its approved prompt and
 * discussion lists (after a Prisma Studio approval). Lists (Discover, the
 * feed, /mcp, sitemap) carry `catalog` only, so a field edit wants the
 * default.
 */
export function revalidateTags(body: unknown): { tags: string[] } | { error: string } {
  if (body === null || body === undefined) return { tags: [CATALOG_TAG] };
  if (typeof body !== "object" || Array.isArray(body)) return { error: "Send a JSON object body, or none." };
  const slugs = (body as { slugs?: unknown }).slugs;
  if (slugs === undefined) return { tags: [CATALOG_TAG] };
  if (!Array.isArray(slugs) || slugs.length === 0 || slugs.length > MAX_REVALIDATE_SLUGS) {
    return { error: `"slugs" must be a non-empty array of at most ${MAX_REVALIDATE_SLUGS} platform slugs.` };
  }
  if (!slugs.every((slug) => typeof slug === "string" && SLUG.test(slug))) {
    return { error: '"slugs" may only contain lowercase platform slugs (a-z, 0-9, -).' };
  }
  return {
    tags: [
      ...new Set(slugs.flatMap((slug) => [platformTag(slug), communityTag("prompts", slug), communityTag("discussions", slug)])),
    ],
  };
}

export type RevalidateDeps = {
  secret: string | undefined;
  revalidate: (tag: string) => void;
};

export async function handleRevalidate(request: Request, deps: RevalidateDeps): Promise<Response> {
  const auth = checkRevalidateAuth(request.headers.get("authorization"), deps.secret);
  if (auth === "unconfigured") {
    return apiError("unavailable", {
      message: "On-demand revalidation is not configured on this deployment.",
      resolution: "The cache refreshes on its own within an hour.",
    });
  }
  if (auth === "unauthorized") {
    return apiError("unauthorized", {
      message: "Missing or wrong revalidation token.",
      resolution: "Send Authorization: Bearer <token>.",
    });
  }

  const text = await request.text();
  let body: unknown = null;
  if (text.trim()) {
    try {
      body = JSON.parse(text);
    } catch {
      return apiError("bad_request", { message: "The body is not valid JSON." });
    }
  }
  const result = revalidateTags(body);
  if ("error" in result) return apiError("bad_request", { message: result.error, field: "slugs" });

  for (const tag of result.tags) deps.revalidate(tag);
  return new Response(JSON.stringify({ revalidated: true, tags: result.tags }), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
