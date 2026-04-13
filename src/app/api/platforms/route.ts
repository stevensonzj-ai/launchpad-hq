import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const category = params.get("category");
  const costTier = params.get("costTier");
  const difficulty = params.get("difficulty");
  const privacy = params.get("privacy");
  const search = params.get("search");
  const featured = params.get("featured");
  const page = Math.max(1, parseInt(params.get("page") || "1"));
  const limit = Math.min(50, parseInt(params.get("limit") || "20"));

  const where: Prisma.PlatformWhereInput = {};

  if (category) {
    where.category = { slug: category };
  }
  if (costTier) {
    where.costTier = costTier as Prisma.EnumCostTierFilter["equals"];
  }
  if (difficulty) {
    where.difficultyLevel = difficulty as Prisma.EnumDifficultyFilter["equals"];
  }
  if (privacy) {
    where.privacyLevel = privacy as Prisma.EnumPrivacyLevelFilter["equals"];
  }
  if (featured === "true") {
    where.featured = true;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { primaryUse: { contains: search, mode: "insensitive" } },
      { primaryUseCases: { contains: search, mode: "insensitive" } },
    ];
  }

  const [platforms, total] = await Promise.all([
    prisma.platform.findMany({
      where,
      include: { category: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.platform.count({ where }),
  ]);

  return NextResponse.json({
    platforms,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
