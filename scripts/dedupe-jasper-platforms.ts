/**
 * One-time Jasper platform dedup — idempotent.
 *
 * "Jasper" and "Jasper AI" exist as separate Platform rows (the legacy
 * import created one; scripts/seed-missing-platforms.ts upserted slug
 * "jasper-ai" and created the other). The duplicate set can't be confirmed
 * from repo files alone — the legacy import's source data isn't in the
 * repo — so this script discovers the duplicates itself at runtime.
 *
 * What it does:
 *   1. Finds all Platform rows whose slug is jasper/jasper-ai or whose
 *      name is "Jasper"/"Jasper AI" (case-insensitive).
 *   2. If 0 or 1 rows match, exits cleanly — nothing to do (idempotent).
 *   3. Picks the canonical row by metadata completeness (explicit field
 *      scoring, logged per row). Tiebreakers: slug "jasper-ai" (that slug
 *      is hard-referenced by src/data/workflows/workflows.ts), then oldest
 *      createdAt.
 *   4. Logs the full JSON of every duplicate row before touching it, so
 *      nothing is lost even after deletion.
 *   5. In one transaction: repoints every FK reference (user_favorites,
 *      user_progress, tutorials, reviews, prompts, discussions) to the
 *      canonical row — handling unique-constraint collisions by dropping
 *      the duplicate-side row (the canonical-side row already represents
 *      that user's favorite/review/progress) — rewrites name-based
 *      references in other platforms' directAlternatives /
 *      complementaryTools / budgetAlternativeTo / privacyAlternativeTo
 *      arrays, deletes the duplicates, and finally renames the canonical
 *      slug to "jasper-ai" if a deleted duplicate held it (preserving the
 *      workflow link).
 *   6. Verifies exactly one Jasper row remains and logs final FK counts.
 *
 * Usage:
 *   npx tsx scripts/dedupe-jasper-platforms.ts --dry-run   (report only, NO writes)
 *   npx tsx scripts/dedupe-jasper-platforms.ts             (with 5s confirmation countdown)
 *   npx tsx scripts/dedupe-jasper-platforms.ts --yes       (skip countdown)
 *
 * Run against a Neon branch first via DATABASE_URL override:
 *   $env:DATABASE_URL='<branch-url>'; npx tsx scripts/dedupe-jasper-platforms.ts --dry-run
 *
 * Idempotency: safe to re-run. After a successful run (or if the catalog
 * never had duplicates) the discovery step finds a single row and exits 0.
 */
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

function maskedHost(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname}${u.pathname || ""}`;
  } catch {
    return "<unparseable URL>";
  }
}

const JASPER_SLUGS = ["jasper", "jasper-ai"];
const JASPER_NAMES = ["jasper", "jasper ai"]; // compared lowercased

/** Slug hard-referenced by src/data/workflows/workflows.ts. */
const WORKFLOW_SLUG = "jasper-ai";

// Scalar fields that count toward metadata completeness (non-null,
// non-empty string = 1 point each).
const SCALAR_FIELDS = [
  "company",
  "website",
  "logoUrl",
  "description",
  "primaryUse",
  "currentPricing",
  "freeTierFeatures",
  "usageLimits",
  "qualityRestrictions",
  "upgradeTriggers",
  "installationType",
  "keyIntegrations",
  "primaryUseCases",
  "timeToProductivity",
  "learningCurve",
  "languageSupport",
  "iosAppUrl",
  "androidAppUrl",
] as const;

// Array fields: non-empty array = 1 point each.
const ARRAY_FIELDS = [
  "platformType",
  "idealUserTypes",
  "directAlternatives",
  "complementaryTools",
  "budgetAlternativeTo",
  "privacyAlternativeTo",
  "contentTypes",
  "outputFormats",
] as const;

// The four name-based reference arrays on OTHER platforms that may point at
// a duplicate's name and need rewriting to the canonical name.
const NAME_REF_ARRAYS = [
  "directAlternatives",
  "complementaryTools",
  "budgetAlternativeTo",
  "privacyAlternativeTo",
] as const;

type PlatformRow = Record<string, unknown> & {
  id: string;
  slug: string;
  name: string;
  createdAt: Date;
};

function completenessScore(row: PlatformRow): {
  score: number;
  filled: string[];
} {
  const filled: string[] = [];
  for (const f of SCALAR_FIELDS) {
    const v = row[f];
    if (typeof v === "string" && v.trim().length > 0) filled.push(f);
  }
  for (const f of ARRAY_FIELDS) {
    const v = row[f];
    if (Array.isArray(v) && v.length > 0) filled.push(f);
  }
  return { score: filled.length, filled };
}

function pickCanonical(rows: PlatformRow[]): PlatformRow {
  const scored = rows.map((row) => ({ row, ...completenessScore(row) }));
  for (const s of scored) {
    console.log(
      `  candidate ${s.row.slug} (id=${s.row.id}, name="${s.row.name}", createdAt=${s.row.createdAt.toISOString()}): completeness ${s.score}`,
    );
    console.log(`    filled fields: ${s.filled.join(", ") || "(none)"}`);
  }
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score; // most complete first
    const aWf = a.row.slug === WORKFLOW_SLUG ? 1 : 0; // prefer workflow slug
    const bWf = b.row.slug === WORKFLOW_SLUG ? 1 : 0;
    if (bWf !== aWf) return bWf - aWf;
    return a.row.createdAt.getTime() - b.row.createdAt.getTime(); // oldest
  });
  return scored[0].row;
}

async function countdown(seconds: number) {
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(`  starting in ${i}s (Ctrl+C to abort)\r`);
    await new Promise((r) => setTimeout(r, 1000));
  }
  process.stdout.write("\n");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const skipCountdown = process.argv.includes("--yes");

  const directUrl = getDirectUrl();
  console.log(`Target database: ${maskedHost(directUrl)}`);
  console.log(dryRun ? "Mode: DRY RUN (no writes)" : "Mode: LIVE");

  const adapter = new PrismaPg(directUrl);
  const prisma = new PrismaClient({ adapter } as any);

  // 1. Discover duplicates at runtime.
  const candidates: PlatformRow[] = await prisma.platform.findMany({
    where: {
      OR: [
        { slug: { in: JASPER_SLUGS } },
        { name: { in: ["Jasper", "Jasper AI", "jasper", "jasper ai", "JASPER", "Jasper Ai"], mode: "insensitive" } },
      ],
    },
  });
  // Belt and braces for exotic casings the `in` list above might miss.
  const jasperRows = candidates.filter(
    (r) =>
      JASPER_SLUGS.includes(r.slug) ||
      JASPER_NAMES.includes(r.name.toLowerCase()),
  );

  console.log(`Found ${jasperRows.length} Jasper-matching platform row(s).`);

  if (jasperRows.length <= 1) {
    console.log(
      jasperRows.length === 1
        ? `Single row (slug=${jasperRows[0].slug}) — no duplicates, nothing to do.`
        : "No Jasper rows found — nothing to do.",
    );
    await prisma.$disconnect();
    return;
  }

  // 2. Pick canonical.
  console.log("Scoring candidates by metadata completeness:");
  const canonical = pickCanonical(jasperRows);
  const duplicates = jasperRows.filter((r) => r.id !== canonical.id);
  console.log(
    `Canonical: ${canonical.slug} (id=${canonical.id}). Duplicates to remove: ${duplicates
      .map((d) => `${d.slug} (id=${d.id})`)
      .join(", ")}`,
  );

  // 3. Preserve duplicate contents in the log before any destructive step.
  for (const d of duplicates) {
    console.log(`Full duplicate row ${d.id} (for recovery if ever needed):`);
    console.log(JSON.stringify(d, null, 2));
  }

  const dupIds = duplicates.map((d) => d.id);
  const dupNames = duplicates
    .map((d) => d.name)
    .filter((n) => n.toLowerCase() !== canonical.name.toLowerCase());

  if (dryRun) {
    const [favs, progress, tutorials, reviews, prompts, discussions] =
      await Promise.all([
        prisma.userFavorite.count({ where: { platformId: { in: dupIds } } }),
        prisma.userProgress.count({ where: { platformId: { in: dupIds } } }),
        prisma.tutorial.count({ where: { platformId: { in: dupIds } } }),
        prisma.review.count({ where: { platformId: { in: dupIds } } }),
        prisma.prompt.count({ where: { platformId: { in: dupIds } } }),
        prisma.discussion.count({ where: { platformId: { in: dupIds } } }),
      ]);
    console.log("DRY RUN — would migrate FK rows:");
    console.log(
      `  user_favorites=${favs} user_progress=${progress} tutorials=${tutorials} reviews=${reviews} prompts=${prompts} discussions=${discussions}`,
    );
    if (dupNames.length) {
      console.log(
        `  and rewrite name references [${dupNames.join(", ")}] -> "${canonical.name}" in other platforms' alternative/complementary arrays`,
      );
    }
    if (canonical.slug !== WORKFLOW_SLUG && duplicates.some((d) => d.slug === WORKFLOW_SLUG)) {
      console.log(`  and rename canonical slug ${canonical.slug} -> ${WORKFLOW_SLUG}`);
    }
    console.log("DRY RUN complete — no writes performed.");
    await prisma.$disconnect();
    return;
  }

  if (!skipCountdown) await countdown(5);

  // 4. Migrate references and delete duplicates atomically.
  await prisma.$transaction(async (tx: any) => {
    // -- Unique-constrained joins: drop duplicate-side rows that would
    //    collide with an existing canonical-side row, then repoint the rest.

    // user_favorites: @@unique([userId, platformId])
    const favCanonical = await tx.userFavorite.findMany({
      where: { platformId: canonical.id },
      select: { userId: true },
    });
    const favUserIds = new Set(favCanonical.map((f: any) => f.userId));
    const favCollisions = await tx.userFavorite.deleteMany({
      where: {
        platformId: { in: dupIds },
        userId: { in: [...favUserIds] as string[] },
      },
    });
    const favMoved = await tx.userFavorite.updateMany({
      where: { platformId: { in: dupIds } },
      data: { platformId: canonical.id },
    });
    console.log(
      `user_favorites: moved ${favMoved.count}, dropped ${favCollisions.count} collision(s)`,
    );

    // reviews: @@unique([userId, platformId])
    const revCanonical = await tx.review.findMany({
      where: { platformId: canonical.id },
      select: { userId: true },
    });
    const revUserIds = new Set(revCanonical.map((r: any) => r.userId));
    const revCollisions = await tx.review.deleteMany({
      where: {
        platformId: { in: dupIds },
        userId: { in: [...revUserIds] as string[] },
      },
    });
    const revMoved = await tx.review.updateMany({
      where: { platformId: { in: dupIds } },
      data: { platformId: canonical.id },
    });
    console.log(
      `reviews: moved ${revMoved.count}, dropped ${revCollisions.count} collision(s)`,
    );

    // user_progress: @@unique([userId, platformId, tutorialId]). Tutorials
    // are platform-scoped, so a duplicate-side (user, platform, tutorial)
    // triple can only collide when tutorialId is NULL on both sides — but
    // check generically anyway.
    const progCanonical = await tx.userProgress.findMany({
      where: { platformId: canonical.id },
      select: { userId: true, tutorialId: true },
    });
    const progKeys = new Set(
      progCanonical.map((p: any) => `${p.userId}|${p.tutorialId ?? ""}`),
    );
    const progDupRows = await tx.userProgress.findMany({
      where: { platformId: { in: dupIds } },
      select: { id: true, userId: true, tutorialId: true },
    });
    const progCollisionIds = progDupRows
      .filter((p: any) => progKeys.has(`${p.userId}|${p.tutorialId ?? ""}`))
      .map((p: any) => p.id);
    if (progCollisionIds.length) {
      await tx.userProgress.deleteMany({
        where: { id: { in: progCollisionIds } },
      });
    }
    const progMoved = await tx.userProgress.updateMany({
      where: { platformId: { in: dupIds } },
      data: { platformId: canonical.id },
    });
    console.log(
      `user_progress: moved ${progMoved.count}, dropped ${progCollisionIds.length} collision(s)`,
    );

    // -- Unconstrained FKs: straight repoint.
    for (const [label, model] of [
      ["tutorials", tx.tutorial],
      ["prompts", tx.prompt],
      ["discussions", tx.discussion],
    ] as const) {
      const moved = await model.updateMany({
        where: { platformId: { in: dupIds } },
        data: { platformId: canonical.id },
      });
      console.log(`${label}: moved ${moved.count}`);
    }

    // -- Name-based references in other platforms' arrays.
    if (dupNames.length) {
      const dupNamesLower = dupNames.map((n) => n.toLowerCase());
      const allPlatforms = await tx.platform.findMany({
        where: { id: { notIn: [...dupIds, canonical.id] } },
        select: {
          id: true,
          slug: true,
          directAlternatives: true,
          complementaryTools: true,
          budgetAlternativeTo: true,
          privacyAlternativeTo: true,
        },
      });
      let rewritten = 0;
      for (const p of allPlatforms) {
        const data: Record<string, string[]> = {};
        for (const field of NAME_REF_ARRAYS) {
          const arr: string[] = p[field];
          if (!arr?.some((n) => dupNamesLower.includes(n.toLowerCase()))) {
            continue;
          }
          const replaced = arr.map((n) =>
            dupNamesLower.includes(n.toLowerCase()) ? canonical.name : n,
          );
          // de-dupe in case the array already named the canonical too
          data[field] = [...new Set(replaced)];
        }
        if (Object.keys(data).length) {
          await tx.platform.update({ where: { id: p.id }, data });
          rewritten++;
          console.log(
            `  rewrote name reference(s) on platform ${p.slug}: ${Object.keys(data).join(", ")}`,
          );
        }
      }
      console.log(`platform name-reference arrays: ${rewritten} row(s) rewritten`);
    }

    // -- Delete duplicates.
    const deleted = await tx.platform.deleteMany({
      where: { id: { in: dupIds } },
    });
    console.log(`platforms: deleted ${deleted.count} duplicate(s)`);

    // -- Keep the workflow-referenced slug alive: workflows.ts links to
    //    /platform/jasper-ai, so if that slug just got deleted, the
    //    canonical row takes it over.
    if (
      canonical.slug !== WORKFLOW_SLUG &&
      duplicates.some((d) => d.slug === WORKFLOW_SLUG)
    ) {
      await tx.platform.update({
        where: { id: canonical.id },
        data: { slug: WORKFLOW_SLUG },
      });
      console.log(
        `canonical slug renamed ${canonical.slug} -> ${WORKFLOW_SLUG} (workflow link preserved)`,
      );
    }
  });

  // 5. Verify.
  const remaining = await prisma.platform.findMany({
    where: {
      OR: [
        { slug: { in: JASPER_SLUGS } },
        { name: { in: ["Jasper", "Jasper AI"], mode: "insensitive" } },
      ],
    },
    select: { id: true, slug: true, name: true },
  });
  console.log(
    `Verification: ${remaining.length} Jasper row(s) remain:`,
    remaining,
  );
  if (remaining.length !== 1) {
    console.error("Expected exactly 1 remaining Jasper row — inspect before re-running.");
    process.exitCode = 1;
  } else {
    const finalId = remaining[0].id;
    const [favs, prompts, discussions] = await Promise.all([
      prisma.userFavorite.count({ where: { platformId: finalId } }),
      prisma.prompt.count({ where: { platformId: finalId } }),
      prisma.discussion.count({ where: { platformId: finalId } }),
    ]);
    console.log(
      `Final FK counts on canonical: favorites=${favs} prompts=${prompts} discussions=${discussions}`,
    );
    console.log("Done.");
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
