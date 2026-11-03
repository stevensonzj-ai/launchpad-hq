import { NextRequest, NextResponse } from "next/server";
import { methodsNotAllowed } from "@/lib/api-error";
import { decideForRequest } from "@/lib/attribution/eligibility";

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
export const dynamic = "force-dynamic";

/**
 * Tells the browser whether first-touch capture is allowed for this visitor
 * (country from x-vercel-ip-country, plus DNT / Sec-GPC). Called only when a
 * landing URL carries UTM tags, so ordinary pages stay statically cached.
 * The answer is per visitor and must never be cached or shared.
 */
export async function GET(request: NextRequest) {
  const { allowed } = decideForRequest(request.headers);
  return NextResponse.json({ allowed }, { headers: { "Cache-Control": "private, no-store" } });
}
