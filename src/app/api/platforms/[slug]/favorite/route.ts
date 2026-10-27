import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

// TODO: add rate limiting before public launch
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) {
    return apiError("not_found", { message: "Platform not found" });
  }

  // Idempotent: repeated POSTs are a no-op once the row exists.
  await prisma.userFavorite.upsert({
    where: {
      userId_platformId: { userId: user.id, platformId: platform.id },
    },
    create: { userId: user.id, platformId: platform.id },
    update: {},
  });

  return NextResponse.json({ favorited: true });
}

// TODO: add rate limiting before public launch
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
  }

  const { slug } = await params;
  const platform = await prisma.platform.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!platform) {
    return apiError("not_found", { message: "Platform not found" });
  }

  // Idempotent: deleteMany returns count=0 when no row exists instead of
  // throwing the way delete() would.
  await prisma.userFavorite.deleteMany({
    where: { userId: user.id, platformId: platform.id },
  });

  return NextResponse.json({ favorited: false });
}

export const { GET, PUT, PATCH } = methodsNotAllowed(["POST", "DELETE"]);
