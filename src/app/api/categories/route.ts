import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { methodsNotAllowed, withApiErrors } from "@/lib/api-error";

export function GET() {
  return withApiErrors("api/categories", async () => {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { platforms: true } },
      },
    });

    return NextResponse.json(categories);
  });
}

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
