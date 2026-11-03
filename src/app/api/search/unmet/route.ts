import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { methodsNotAllowed } from "@/lib/api-error";
import {
  MAX_UNMET_BODY_BYTES,
  UNMET_UPSERT_SQL,
  readBodyCapped,
  recordUnmetSearch,
  type UnmetSearchStore,
} from "@/lib/search/unmet-record";

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
export const dynamic = "force-dynamic";

const store: UnmetSearchStore = {
  async record({ normalizedQuery, noClick, resultCount }) {
    await prisma.$executeRawUnsafe(UNMET_UPSERT_SQL, normalizedQuery, noClick ? 1 : 0, resultCount);
  },
};

/**
 * Aggregate log of unmet website searches (see docs/unmet-searches.md). Takes a
 * tiny beacon {q, resultCount, clicked} and upserts one counter row. Always
 * 204, whatever happened, so the response reveals nothing. No IP, user agent,
 * account or session is stored; DNT / Sec-GPC / EU-EEA-UK-CH / unknown country
 * and bot user agents are skipped before anything is read.
 */
export async function POST(request: NextRequest) {
  const declared = Number(request.headers.get("content-length"));
  const body = declared > MAX_UNMET_BODY_BYTES ? null : await readBodyCapped(request.body);
  await recordUnmetSearch({ headers: request.headers, body, store });
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "private, no-store" } });
}
