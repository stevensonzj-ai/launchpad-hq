/**
 * Export current Platform rows for review / gap-analysis.
 *
 * Usage: npx tsx scripts/export-platforms.ts
 *
 * Writes:
 *   tmp/platforms-export-YYYY-MM-DD.json
 *   tmp/platforms-export-YYYY-MM-DD.csv
 *
 * Prints a total count and per-category breakdown to stdout.
 */
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      const decoded = JSON.parse(Buffer.from(padded, "base64url").toString());
      return decoded.databaseUrl;
    } catch {
      // fall through
    }
  }
  return raw;
}

const FIELDS = [
  "id",
  "slug",
  "name",
  "company",
  "categoryName",
  "categorySlug",
  "website",
  "costTier",
  "difficultyLevel",
  "privacyLevel",
  "featured",
  "verified",
  "hasMobileApp",
  "createdAt",
  "updatedAt",
] as const;

type Row = Record<(typeof FIELDS)[number], string | number | boolean | null>;

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = value instanceof Date ? value.toISOString() : String(value);
  if (/[",\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toCsv(rows: Row[]): string {
  const header = FIELDS.join(",");
  const body = rows.map((r) => FIELDS.map((f) => csvEscape(r[f])).join(","));
  return [header, ...body].join("\r\n") + "\r\n";
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const adapter = new PrismaPg(getDirectUrl());
  const prisma = new PrismaClient({ adapter }) as any;

  try {
    const platforms = await prisma.platform.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        company: true,
        website: true,
        costTier: true,
        difficultyLevel: true,
        privacyLevel: true,
        featured: true,
        verified: true,
        hasMobileApp: true,
        createdAt: true,
        updatedAt: true,
        category: { select: { name: true, slug: true } },
      },
    });

    const rows: Row[] = platforms
      .map((p: any) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        company: p.company,
        categoryName: p.category?.name ?? null,
        categorySlug: p.category?.slug ?? null,
        website: p.website,
        costTier: p.costTier,
        difficultyLevel: p.difficultyLevel,
        privacyLevel: p.privacyLevel,
        featured: p.featured,
        verified: p.verified,
        hasMobileApp: p.hasMobileApp,
        createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
        updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
      }))
      .sort((a: Row, b: Row) => {
        const ca = String(a.categoryName ?? "");
        const cb = String(b.categoryName ?? "");
        if (ca !== cb) return ca.localeCompare(cb);
        return String(a.name).localeCompare(String(b.name));
      });

    const today = new Date().toISOString().slice(0, 10);
    const outDir = path.join(process.cwd(), "tmp");
    fs.mkdirSync(outDir, { recursive: true });
    const jsonPath = path.join(outDir, `platforms-export-${today}.json`);
    const csvPath = path.join(outDir, `platforms-export-${today}.csv`);

    fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2) + "\n", "utf8");
    fs.writeFileSync(csvPath, toCsv(rows), "utf8");

    const perCategory = new Map<string, number>();
    for (const r of rows) {
      const k = String(r.categoryName ?? "(no category)");
      perCategory.set(k, (perCategory.get(k) ?? 0) + 1);
    }
    const sortedCats = [...perCategory.entries()].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );

    console.log("");
    console.log(`Total platforms: ${rows.length}`);
    console.log("");
    console.log("Per-category breakdown:");
    const labelWidth = Math.max(...sortedCats.map(([k]) => k.length));
    for (const [cat, n] of sortedCats) {
      console.log(`  ${cat.padEnd(labelWidth)}  ${String(n).padStart(4)}`);
    }
    console.log("");
    console.log(`Wrote JSON: ${jsonPath}`);
    console.log(`Wrote CSV:  ${csvPath}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
