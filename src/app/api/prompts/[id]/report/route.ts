import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const reason = String(body.reason || "").trim().slice(0, 500);
  if (!reason) {
    return NextResponse.json({ error: "Reason required" }, { status: 400 });
  }

  const prompt = await prisma.prompt.findUnique({ where: { id } });
  if (!prompt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.promptReport.create({
    data: { promptId: id, userId: user.id, reason },
  });

  return NextResponse.json({ ok: true });
}
