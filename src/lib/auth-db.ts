import { auth, currentUser } from "@clerk/nextjs/server";
import * as Sentry from "@sentry/nextjs";
import type { User } from "@prisma/client";
import { prisma } from "@/lib/db";
import { apiError } from "@/lib/api-error";
import { resolveDbUser, type AuthLinkDeps } from "@/lib/auth-link";

const deps: AuthLinkDeps<User> = {
  findByClerkId: (clerkId) => prisma.user.findUnique({ where: { clerkId } }),
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  create: (data) => prisma.user.create({ data }),
  async relink(id, fromClerkId, toClerkId) {
    // Compare-and-swap on the old clerkId, so two concurrent relinks can't
    // both "win" against a row that has already moved.
    const { count } = await prisma.user.updateMany({
      where: { id, clerkId: fromClerkId },
      data: { clerkId: toClerkId },
    });
    return count === 1 ? prisma.user.findUnique({ where: { id } }) : null;
  },
  async warn(event, { clerkIdPrefix, reason }) {
    Sentry.captureMessage(`auth-db: ${event} Clerk user`, {
      level: "warning",
      tags: { "auth.link": event, "auth.reason": reason },
      extra: { clerkIdPrefix },
    });
    // Serverless functions can freeze as soon as the response returns (G8).
    await Sentry.flush(2000);
  },
};

/**
 * Resolve the signed-in Clerk user to our Prisma `User`, creating a row on
 * first sight and relinking an existing row by verified email. Null when
 * signed out or when no row could be established (see `auth-link.ts`).
 */
export async function getOrCreateDbUser() {
  const { userId } = await auth();
  if (!userId) return null;
  return resolveDbUser(userId, () => currentUser(), deps);
}

export async function requireDbUser() {
  const u = await getOrCreateDbUser();
  return u;
}

/**
 * The response for a route whose `getOrCreateDbUser()` came back null: 401
 * when signed out, 403 when signed in to Clerk but no row could be linked,
 * so the user isn't told to sign in again when they already are.
 */
export async function noDbUserResponse(): Promise<Response> {
  const { userId } = await auth();
  if (!userId) return apiError("unauthorized");
  return apiError("forbidden", { message: "Your account couldn't be linked. Please contact support." });
}
