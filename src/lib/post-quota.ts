import { prisma } from "@/lib/db";
import { apiError } from "@/lib/api-error";
import { DAILY_POST_LIMIT, isOverDailyPostLimit } from "@/lib/request-limits";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Per-user cap on new community posts (security review G9): prompts,
 * discussions and replies together, over a rolling 24 hours. Returns a 429
 * response when the user is at the cap, otherwise null. Count-only reads.
 */
export async function checkDailyPostQuota(userId: string, now: Date = new Date()): Promise<Response | null> {
  const since = new Date(now.getTime() - DAY_MS);
  const where = { userId, createdAt: { gte: since } };
  const [prompts, discussions, replies] = await Promise.all([
    prisma.prompt.count({ where }),
    prisma.discussion.count({ where }),
    prisma.discussionReply.count({ where }),
  ]);
  if (!isOverDailyPostLimit(prompts + discussions + replies)) return null;
  return apiError("rate_limited", {
    message: `You can post up to ${DAILY_POST_LIMIT} prompts, discussions and replies a day.`,
    resolution: "Try again tomorrow.",
    headers: { "Retry-After": "3600" },
  });
}
