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
    return prisma.user.findUnique({ where: { clerkId: userId } });
  }
}

export async function requireDbUser() {
  const u = await getOrCreateDbUser();
  return u;
}
