import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

/**
 * Resolve the signed-in Clerk user to our Prisma `User`, creating a row on first sight.
 */
export async function getOrCreateDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (existing) return existing;

  const cu = await currentUser();
  const email = cu?.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;

  const name =
    cu?.firstName || cu?.lastName
      ? [cu.firstName, cu.lastName].filter(Boolean).join(" ")
      : cu?.username || null;

  try {
    return await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        name,
        avatarUrl: cu?.imageUrl ?? null,
      },
    });
  } catch {
    // The create can fail legitimately: `users.email` is unique, so a second
    // Clerk account reusing an address already on file will collide, as will
    // two concurrent first-sight requests for the same user. Re-query rather
    // than assume the user does not exist.
    //
    // Awaited inside its own try/catch on purpose. Returning the promise bare
    // meant a rejection here — an unreachable database, say — escaped this
    // catch and rejected out of the function, which callers do not expect:
    // they are written to handle a null user, not a throw. Resolve to null so
    // "we could not establish a user" always arrives the same way.
    try {
      return await prisma.user.findUnique({ where: { clerkId: userId } });
    } catch {
      return null;
    }
  }
}

export async function requireDbUser() {
  const u = await getOrCreateDbUser();
  return u;
}
