import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const platforms = await prisma.platform.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { company: { contains: q, mode: "insensitive" } },
        { primaryUse: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      slug: true,
      name: true,
      company: true,
      costTier: true,
      category: { select: { name: true, slug: true } },
    },
    take: 8,
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ results: platforms });
}
