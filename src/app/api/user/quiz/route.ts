import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { apiError, methodsNotAllowed } from "@/lib/api-error";
import { MAX_QUIZ_JSON_BYTES, jsonByteLength } from "@/lib/request-limits";

export async function GET() {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
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
    return noDbUserResponse();
  }

  const body = await request.json().catch(() => null);
  const answers = body && typeof body === "object" ? body.answers : null;
  if (!answers || typeof answers !== "object") {
    return apiError("bad_request", { message: "Invalid answers" });
  }
  if (jsonByteLength(answers) > MAX_QUIZ_JSON_BYTES) {
    return apiError("bad_request", { status: 413, message: `answers must be ${MAX_QUIZ_JSON_BYTES} bytes of JSON or fewer`, field: "answers" });
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
