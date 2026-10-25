import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

export async function GET() {
  const user = await getOrCreateDbUser();
  if (!user) {
    return apiError("unauthorized");
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
    return apiError("unauthorized");
  }

  const body = await request.json();
  const answers = body.answers;
  if (!answers || typeof answers !== "object") {
    return apiError("bad_request", { message: "Invalid answers" });
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

export const { PUT, PATCH, DELETE } = methodsNotAllowed(["GET", "POST"]);
