import { feedJson } from "@/lib/public-data/http";
import { openApiDocument } from "@/lib/public-data/schema";
import { FEED_READ_ONLY } from "@/lib/public-data/read-only";

export const dynamic = "force-static";

export function GET() {
  return feedJson(openApiDocument());
}

export const HEAD = GET;
export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
