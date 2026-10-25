import { toPublicModelsIndex } from "@/lib/public-data/content";
import { feedJson } from "@/lib/public-data/http";

// Static data, no DB; dynamic only so generated_at is the request time.
export const dynamic = "force-dynamic";

export function GET() {
  return feedJson(toPublicModelsIndex(new Date().toISOString()));
}

export const HEAD = GET;
