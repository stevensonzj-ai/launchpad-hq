/**
 * Upsert platforms requested for LaunchpadHQ workflows (Jasper AI, Descript, Murf, PlayHT, Claude).
 *
 * Usage: npx tsx scripts/seed-missing-platforms.ts
 * Requires: DATABASE_URL in .env
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { WORKFLOWS } from "../src/data/workflows/workflows";

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
      /* fall through */
    }
  }
  return raw;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const CATEGORY_NAMES = {
  text: "Text & Conversational AI",
  audio: "Audio, Music & Voice AI",
} as const;

async function main() {
  const adapter = new PrismaPg(getDirectUrl());
  const prisma = new PrismaClient({ adapter } as any);

  const textCat = await prisma.category.findFirst({
    where: { slug: slugify(CATEGORY_NAMES.text) },
  });
  const audioCat = await prisma.category.findFirst({
    where: { slug: slugify(CATEGORY_NAMES.audio) },
  });

  if (!textCat) throw new Error(`Category not found: ${CATEGORY_NAMES.text}`);
  if (!audioCat) throw new Error(`Category not found: ${CATEGORY_NAMES.audio}`);

  const base = {
    platformType: ["web"],
    verified: true,
    directAlternatives: [] as string[],
    complementaryTools: [] as string[],
    budgetAlternativeTo: [] as string[],
    privacyAlternativeTo: [] as string[],
    contentTypes: [] as string[],
    outputFormats: [] as string[],
    idealUserTypes: [] as string[],
  };

  const rows: Array<{
    slug: string;
    name: string;
    categoryId: string;
    primaryUse: string;
    currentPricing: string;
    freeTierFeatures?: string | null;
    difficultyLevel: "BEGINNER" | "INTERMEDIATE";
    description?: string;
  }> = [
    {
      slug: "jasper-ai",
      name: "Jasper",
      categoryId: textCat.id,
      primaryUse: "Marketing copy, content writing",
      currentPricing: "Free trial; $49/mo starter",
      freeTierFeatures: "Trial available; paid plans for full features",
      difficultyLevel: "BEGINNER",
      description:
        "AI writing assistant focused on marketing copy, blog posts, and brand-voice content at scale.",
    },
    {
      slug: "descript",
      name: "Descript",
      categoryId: audioCat.id,
      primaryUse: "Audio/video editing with AI transcription",
      currentPricing: "Free; $12/mo creator",
      freeTierFeatures: "Free tier with limited transcription and editing",
      difficultyLevel: "INTERMEDIATE",
      description:
        "Edit audio and video by editing text transcripts; overdub, studio sound, and collaborative timelines.",
    },
    {
      slug: "murf-ai",
      name: "Murf AI",
      categoryId: audioCat.id,
      primaryUse: "Text-to-speech, voice overs",
      currentPricing: "Free tier; $29/mo",
      freeTierFeatures: "Limited free voice generation minutes",
      difficultyLevel: "BEGINNER",
      description: "AI voice generator for voiceovers, e-learning, and ads with multiple voices and languages.",
    },
    {
      slug: "play-ht",
      name: "PlayHT",
      categoryId: audioCat.id,
      primaryUse: "AI voice generation, TTS",
      currentPricing: "Free tier; $29/mo",
      freeTierFeatures: "Free tier with limited characters per month",
      difficultyLevel: "BEGINNER",
      description: "Text-to-speech and AI voices for content, podcasts, and product experiences.",
    },
  ];

  for (const r of rows) {
    await prisma.platform.upsert({
      where: { slug: r.slug },
      create: {
        ...base,
        slug: r.slug,
        name: r.name,
        categoryId: r.categoryId,
        primaryUse: r.primaryUse,
        currentPricing: r.currentPricing,
        freeTierFeatures: r.freeTierFeatures ?? null,
        difficultyLevel: r.difficultyLevel,
        description: r.description ?? null,
        costTier: "FREEMIUM",
        privacyLevel: "MEDIUM",
      },
      update: {
        name: r.name,
        primaryUse: r.primaryUse,
        currentPricing: r.currentPricing,
        freeTierFeatures: r.freeTierFeatures ?? null,
        difficultyLevel: r.difficultyLevel,
        description: r.description ?? null,
        categoryId: r.categoryId,
        verified: true,
      },
    });
    console.log("Upserted:", r.slug);
  }

  // Claude: prefer updating existing `claude` row; do not create duplicate Anthropic entries
  const existingClaude = await prisma.platform.findFirst({
    where: { OR: [{ slug: "claude" }, { slug: "claude-ai" }] },
  });

  const claudePayload = {
    name: "Claude",
    categoryId: textCat.id,
    primaryUse: "Coding, analysis, writing assistant",
    currentPricing: "Free tier; $20/mo Pro",
    freeTierFeatures: "Free tier with usage limits; Pro for higher limits",
    difficultyLevel: "INTERMEDIATE" as const,
    description:
      "Anthropic’s assistant for long-context writing, coding, analysis, and reasoning across web and API.",
    ...base,
    verified: true,
  };

  if (existingClaude) {
    await prisma.platform.update({
      where: { id: existingClaude.id },
      data: {
        primaryUse: claudePayload.primaryUse,
        currentPricing: claudePayload.currentPricing,
        freeTierFeatures: claudePayload.freeTierFeatures,
        difficultyLevel: claudePayload.difficultyLevel,
        description: claudePayload.description,
        verified: true,
        categoryId: textCat.id,
      },
    });
    console.log("Updated existing Claude:", existingClaude.slug);
  } else {
    await prisma.platform.create({
      data: {
        slug: "claude",
        ...claudePayload,
        costTier: "FREEMIUM",
        privacyLevel: "MEDIUM",
      },
    });
    console.log("Created platform: claude");
  }

  const slugRows = await prisma.platform.findMany({ select: { slug: true } });
  const inDb = new Set(slugRows.map((r) => r.slug));
  const missing = new Set<string>();
  for (const w of WORKFLOWS) {
    for (const key of ["optimal", "hybrid", "budget"] as const) {
      for (const t of w.tiers[key].tools) {
        if (t.slug && !inDb.has(t.slug)) missing.add(t.slug);
      }
    }
  }
  if (missing.size > 0) {
    console.warn("Workflow tools reference slugs not in DB:", [...missing].sort().join(", "));
  } else {
    console.log("All workflow tool slugs exist in the database.");
  }

  await prisma.$disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
