import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
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

function createPrisma(): PrismaClient {
  const adapter = new PrismaPg(getDirectUrl());
  return new PrismaClient({ adapter } as any);
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
