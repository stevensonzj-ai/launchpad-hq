import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaRead: PrismaClient | undefined;
};

function getDirectUrl(raw: string = process.env.DATABASE_URL || ""): string {
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      const decoded = JSON.parse(
        Buffer.from(padded, "base64url").toString(),
      );
      return decoded.databaseUrl;
    } catch {
      // Fall through
    }
  }
  return raw;
}

function createPrisma(url: string = getDirectUrl()): PrismaClient {
  const adapter = new PrismaPg(url);
  return new PrismaClient({ adapter });
}

/** Read-write client (community posts, votes, ratings, moderation, Stripe). */
export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrisma();

/**
 * Read-only client for the public catalog reads (pages, /api/platforms,
 * /api/search, /data/v1 and /mcp). G10: when DATABASE_URL_READONLY is set it
 * connects as a SELECT-only Postgres role, so a bug or injection on a public
 * read path cannot write. Unset, it is the same client as `prisma`.
 */
export const prismaRead: PrismaClient =
  globalForPrisma.prismaRead ??
  (process.env.DATABASE_URL_READONLY
    ? createPrisma(getDirectUrl(process.env.DATABASE_URL_READONLY))
    : prisma);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaRead = prismaRead;
}
