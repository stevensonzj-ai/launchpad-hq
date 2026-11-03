import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { apiError, methodsNotAllowed } from "@/lib/api-error";
import { persistFirstTouch } from "@/lib/attribution/persist";
import { decideForRequest } from "@/lib/attribution/eligibility";

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);

/**
 * Stores one first-touch attribution row after a signup. Requires a signed-in
 * session so anonymous traffic cannot fill the table, but the user id is NOT
 * stored: the row is five sanitized strings and a timestamp, nothing that
 * could be joined back to an account, IP or device.
 */
export async function POST(request: NextRequest) {
  // DNT / Sec-GPC, EU/EEA/UK/CH and unknown country: no write, no error.
  if (!decideForRequest(request.headers).allowed) {
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const { userId } = await auth();
  if (!userId) return apiError("unauthorized");

  const result = await persistFirstTouch(await request.text(), prisma.firstTouchAttribution);
  if (result === "too_large") return apiError("bad_request", { status: 413, message: "Request body is too large." });
  if (result === "invalid") return apiError("bad_request", { message: "Request body must be a JSON object." });
  return new NextResponse(null, { status: result === "stored" ? 201 : 204, headers: { "Cache-Control": "no-store" } });
}
