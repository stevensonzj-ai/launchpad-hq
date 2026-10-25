import { feedJson } from "@/lib/public-data/http";
import { openApiDocument } from "@/lib/public-data/schema";

export const dynamic = "force-static";

export function GET() {
  return feedJson(openApiDocument());
}

export const HEAD = GET;
