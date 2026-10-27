/**
 * Resolve a signed-in Clerk user to our `User` row, separated from Clerk,
 * Prisma and Sentry so it can be tested without a database or network.
 * `auth-db.ts` supplies the real dependencies.
 *
 * `users.clerkId` and `users.email` are both unique. A row can exist for an
 * email under an older Clerk id (a Clerk instance migration, or a deleted and
 * re-created Clerk account), in which case creating a new row collides on the
 * email. That row is relinked to the current Clerk id, but only when Clerk
 * says the current user's primary email is verified: otherwise anyone who
 * typed that address into an unverified sign-up could take over the row.
 */

export type ClerkEmailProfile = {
  primaryEmailAddress?: {
    emailAddress: string;
    verification?: { status?: string | null } | null;
  } | null;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  imageUrl?: string | null;
};

export type NewUserData = {
  clerkId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
};

export type AuthLinkEvent = "relinked" | "unresolved";

export type AuthLinkDeps<U extends { id: string; clerkId: string }> = {
  findByClerkId(clerkId: string): Promise<U | null>;
  findByEmail(email: string): Promise<U | null>;
  create(data: NewUserData): Promise<U>;
  /**
   * Point row `id` at `toClerkId`, only if it still carries `fromClerkId`.
   * Returns the updated row, or null when another request changed it first.
   */
  relink(id: string, fromClerkId: string, toClerkId: string): Promise<U | null>;
  /** Report a warning. `clerkIdPrefix` only: never the email or full id. */
  warn(event: AuthLinkEvent, details: { clerkIdPrefix: string; reason: string }): Promise<void>;
};

export function clerkIdPrefix(clerkId: string): string {
  return clerkId.slice(0, 9);
}

function isUniqueViolation(error: unknown): boolean {
  return (error as { code?: unknown } | null)?.code === "P2002";
}

function displayName(cu: ClerkEmailProfile): string | null {
  if (cu.firstName || cu.lastName) return [cu.firstName, cu.lastName].filter(Boolean).join(" ");
  return cu.username || null;
}

export async function resolveDbUser<U extends { id: string; clerkId: string }>(
  clerkId: string,
  loadClerkUser: () => Promise<ClerkEmailProfile | null>,
  deps: AuthLinkDeps<U>,
): Promise<U | null> {
  const existing = await deps.findByClerkId(clerkId);
  if (existing) return existing;

  const unresolved = async (reason: string) => {
    await deps.warn("unresolved", { clerkIdPrefix: clerkIdPrefix(clerkId), reason });
    return null;
  };

  const cu = await loadClerkUser();
  const primary = cu?.primaryEmailAddress;
  if (!cu || !primary?.emailAddress) return unresolved("no-primary-email");
  const email = primary.emailAddress;
  const verified = primary.verification?.status === "verified";

  try {
    return await deps.create({ clerkId, email, name: displayName(cu), avatarUrl: cu.imageUrl ?? null });
  } catch (error) {
    // Awaited inside its own try/catch: callers handle a null user, not a
    // throw, so "we could not establish a user" always arrives as null.
    try {
      // Two concurrent first-sight requests for the same user: the other one
      // created the row.
      const raced = await deps.findByClerkId(clerkId);
      if (raced) return raced;
      if (!isUniqueViolation(error)) return unresolved("create-failed");

      const byEmail = await deps.findByEmail(email);
      if (!byEmail) return unresolved("unique-violation-without-email-row");
      if (!verified) return unresolved("email-row-exists-unverified");

      const relinked = await deps.relink(byEmail.id, byEmail.clerkId, clerkId);
      if (relinked) {
        await deps.warn("relinked", { clerkIdPrefix: clerkIdPrefix(clerkId), reason: "verified-email-match" });
        return relinked;
      }
      // Lost a relink race: a concurrent request for this user may have won.
      return (await deps.findByClerkId(clerkId)) ?? (await unresolved("relink-lost-race"));
    } catch {
      return null;
    }
  }
}
