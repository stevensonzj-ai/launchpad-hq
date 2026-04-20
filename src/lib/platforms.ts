import { cache } from "react";
import { prisma } from "@/lib/db";

export const getPlatformCount = cache(async (): Promise<number> => {
  return prisma.platform.count();
});

/** Round down to the nearest 10 so displayed counts never overstate reality as rows change. */
export function roundDownToTen(n: number): number {
  return Math.max(0, Math.floor(n / 10) * 10);
}
