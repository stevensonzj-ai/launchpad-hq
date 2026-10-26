import { NextResponse } from "next/server";
import { getCategoriesWithCounts } from "@/lib/catalog-queries";
import { PUBLIC_HOURLY_CACHE } from "@/lib/public-data/http";
import { methodsNotAllowed, withApiErrors } from "@/lib/api-error";

/** Public and visitor-independent: shared catalog cache + hourly CDN cache. */
export function GET() {
  return withApiErrors("api/categories", async () => {
    const categories = await getCategoriesWithCounts();

    return NextResponse.json(categories, { headers: { "Cache-Control": PUBLIC_HOURLY_CACHE } });
  });
}

export const { POST, PUT, PATCH, DELETE } = methodsNotAllowed(["GET"]);
