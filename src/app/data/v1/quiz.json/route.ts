import { toPublicQuiz } from "@/lib/public-data/content";
import { feedJson } from "@/lib/public-data/http";
import { FEED_READ_ONLY } from "@/lib/public-data/read-only";

// Questions, options and the scoring map only: no answers, no users, no DB.
export const dynamic = "force-static";

export function GET() {
  return feedJson(toPublicQuiz());
}

export const HEAD = GET;
export const { POST, PUT, PATCH, DELETE } = FEED_READ_ONLY;
