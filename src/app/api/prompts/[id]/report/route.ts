import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return apiError("unauthorized");
  }

  const { id } = await params;
  const body = await request.json();
  const reason = String(body.reason || "").trim().slice(0, 500);
  if (!reason) {
    return apiError("bad_request", { message: "Reason required" });
  }

  const prompt = await prisma.prompt.findUnique({ where: { id } });
  if (!prompt) {
    return apiError("not_found", { message: "Not found" });
  }

  await prisma.promptReport.create({
    data: { promptId: id, userId: user.id, reason },
  });

  return NextResponse.json({ ok: true });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
