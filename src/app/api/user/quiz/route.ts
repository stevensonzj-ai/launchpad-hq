import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";

export async function GET() {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prefs = await prisma.userPreferences.findUnique({
    where: { userId: user.id },
  });

  return NextResponse.json({
    quizAnswers: prefs?.quizAnswers ?? null,
    quizCompletedAt: prefs?.quizCompletedAt?.toISOString() ?? null,
  });
}

export async function POST(request: NextRequest) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const answers = body.answers;
  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }

  await prisma.userPreferences.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      goals: [],
      industries: [],
      priorities: [],
      quizAnswers: answers,
      quizCompletedAt: new Date(),
    },
    update: {
      quizAnswers: answers,
      quizCompletedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
