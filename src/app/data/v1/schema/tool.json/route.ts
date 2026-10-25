import { feedJson } from "@/lib/public-data/http";
import { toolJsonSchema } from "@/lib/public-data/schema";

export const dynamic = "force-static";

export function GET() {
  return feedJson(toolJsonSchema());
}

export const HEAD = GET;
