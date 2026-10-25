import { toPublicQuiz } from "@/lib/public-data/content";
import { feedJson } from "@/lib/public-data/http";

// Questions, options and the scoring map only: no answers, no users, no DB.
export const dynamic = "force-static";

export function GET() {
  return feedJson(toPublicQuiz());
}

export const HEAD = GET;
