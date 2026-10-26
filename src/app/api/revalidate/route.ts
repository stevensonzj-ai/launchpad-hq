import { revalidateTag } from "next/cache";
import { methodsNotAllowed } from "@/lib/api-error";
import { handleRevalidate } from "@/lib/revalidate";

/**
 * Operator-only cache expiry for the shared catalog cache. Auth, body rules
 * and responses: src/lib/revalidate.ts. Needs REVALIDATE_SECRET in Vercel;
 * without it every call is a 503 no-op. Usage: docs/caching.md.
 */
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleRevalidate(request, {
    secret: process.env.REVALIDATE_SECRET,
    // expire: 0 = the next read refetches, rather than serving stale once.
    revalidate: (tag) => revalidateTag(tag, { expire: 0 }),
  });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
