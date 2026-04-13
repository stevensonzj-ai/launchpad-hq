/**
 * Import AI platforms from Excel file into PostgreSQL via Prisma.
 *
 * Usage: npx tsx scripts/import-platforms.ts
 *
 * Reads ai_platforms_enhanced_metadata.xlsx, maps each sheet to a category,
 * and creates Platform records with all 28 metadata fields.
 */
import * as XLSX from "xlsx";
import * as path from "path";
import "dotenv/config";

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../src/generated/prisma/client");

type CostTier = "FREE" | "FREEMIUM" | "PAID" | "ENTERPRISE";
type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
type PrivacyLevel = "LOW" | "MEDIUM" | "HIGH" | "MAXIMUM";

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      const decoded = JSON.parse(Buffer.from(padded, "base64url").toString());
      return decoded.databaseUrl;
    } catch {}
  }
  return raw;
}

const adapter = new PrismaPg(getDirectUrl());
const prisma = new PrismaClient({ adapter }) as any;

const EXCEL_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || "",
  "Downloads",
  "ai_platforms_enhanced_metadata.xlsx",
);

// Category metadata for each sheet
const CATEGORY_META: Record<string, { icon: string; description: string; order: number }> = {
  "Text & Conversational AI": { icon: "MessageSquare", description: "Chat assistants, writing tools, and conversational AI", order: 1 },
  "Image Generation & Editing": { icon: "Image", description: "AI image creation, editing, and design tools", order: 2 },
  "Video Creation & Editing": { icon: "Video", description: "AI video generation, editing, and animation", order: 3 },
  "Audio, Music & Voice AI": { icon: "Music", description: "Music generation, voice synthesis, and audio tools", order: 4 },
  "AI Coding & Development": { icon: "Code", description: "Code assistants, IDE plugins, and dev tools", order: 5 },
  "Workflow & Automation": { icon: "Zap", description: "No-code automation, workflow builders, and integrations", order: 6 },
  "Research & Academic Tools": { icon: "BookOpen", description: "Research assistants, citation tools, and academic AI", order: 7 },
  "Document & PDF Processing": { icon: "FileText", description: "Document analysis, PDF tools, and data extraction", order: 8 },
  "Industry-Specific AI": { icon: "Building", description: "Specialized AI for healthcare, legal, finance, etc.", order: 9 },
  "International & Regional AI": { icon: "Globe", description: "AI platforms focused on non-English markets", order: 10 },
  "Local & Open-Source AI": { icon: "Server", description: "Self-hosted, open-source, and privacy-first AI", order: 11 },
  "AI Plugins for Business Softwar": { icon: "Plug", description: "AI add-ons for Notion, Slack, Salesforce, etc.", order: 12 },
  "Browser Extensions & Productivi": { icon: "Chrome", description: "Browser-based AI productivity tools", order: 13 },
  "Gaming & Creative AI": { icon: "Gamepad", description: "AI for game development, 3D, and creative tools", order: 14 },
  "AI APIs & Developer Services": { icon: "Terminal", description: "APIs, SDKs, and developer-focused AI services", order: 15 },
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function mapCostTier(value: string | null): CostTier {
  if (!value) return "FREEMIUM";
  const v = value.toLowerCase().trim();
  if (v === "free") return "FREE";
  if (v === "freemium") return "FREEMIUM";
  if (v === "paid") return "PAID";
  if (v === "enterprise") return "ENTERPRISE";
  return "FREEMIUM";
}

function mapDifficulty(value: string | null): Difficulty {
  if (!value) return "BEGINNER";
  const v = value.toLowerCase().trim();
  if (v === "beginner") return "BEGINNER";
  if (v === "intermediate") return "INTERMEDIATE";
  if (v === "advanced") return "ADVANCED";
  if (v === "expert") return "EXPERT";
  return "BEGINNER";
}

function mapPrivacy(value: string | null): PrivacyLevel {
  if (!value) return "MEDIUM";
  const v = value.toLowerCase().trim();
  if (v === "low") return "LOW";
  if (v === "medium") return "MEDIUM";
  if (v === "high") return "HIGH";
  if (v === "maximum" || v === "max") return "MAXIMUM";
  return "MEDIUM";
}

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parsePlatformType(value: string | null): string[] {
  if (!value) return ["web"];
  return value
    .toLowerCase()
    .split(/[,+&]/)
    .map((s) => s.trim().replace(/\s+/g, "_"))
    .filter(Boolean);
}

async function main() {
  console.log("Reading Excel file:", EXCEL_PATH);
  const workbook = XLSX.readFile(EXCEL_PATH);
  let totalImported = 0;

  for (const sheetName of workbook.SheetNames) {
    const meta = CATEGORY_META[sheetName];
    if (!meta) {
      console.log(`  Skipping unknown sheet: ${sheetName}`);
      continue;
    }

    console.log(`\nProcessing: ${sheetName}`);
    const sheet = workbook.Sheets[sheetName];
    const rows: (string | null)[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: null,
    });

    // Row 0 = category headers (merged), Row 1 = column names, Row 2+ = data
    if (rows.length < 3) {
      console.log("  No data rows, skipping");
      continue;
    }

    const headers = rows[1].map((h) => (h || "").toString().trim());
    const colIdx = (name: string) => headers.indexOf(name);

    // Create or update category
    const categorySlug = slugify(sheetName);
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { name: sheetName, icon: meta.icon, description: meta.description, sortOrder: meta.order },
      create: { name: sheetName, slug: categorySlug, icon: meta.icon, description: meta.description, sortOrder: meta.order },
    });

    let count = 0;
    for (let r = 2; r < rows.length; r++) {
      const row = rows[r];
      const name = row[colIdx("Platform Name")]?.toString().trim();
      if (!name) continue;

      const slug = slugify(name);

      await prisma.platform.upsert({
        where: { slug },
        update: {
          name,
          company: row[colIdx("Company")]?.toString() || null,
          website: row[colIdx("Website")]?.toString() || null,
          primaryUse: row[colIdx("Primary Use")]?.toString() || null,
          currentPricing: row[colIdx("Current Pricing")]?.toString() || null,
          costTier: mapCostTier(row[colIdx("Cost Tier")]?.toString()),
          difficultyLevel: mapDifficulty(row[colIdx("Difficulty Level")]?.toString()),
          platformType: parsePlatformType(row[colIdx("Platform Type")]?.toString()),
          freeTierFeatures: row[colIdx("Free Tier Features")]?.toString() || null,
          usageLimits: row[colIdx("Usage Limits")]?.toString() || null,
          qualityRestrictions: row[colIdx("Quality Restrictions")]?.toString() || null,
          upgradeTriggers: row[colIdx("Upgrade Triggers")]?.toString() || null,
          installationType: row[colIdx("Installation Type")]?.toString() || null,
          offlineCapable: (row[colIdx("Offline Capable")]?.toString() || "").toLowerCase() === "yes",
          apiAvailable: (row[colIdx("API Available")]?.toString() || "").toLowerCase().startsWith("yes"),
          keyIntegrations: row[colIdx("Key Integrations")]?.toString() || null,
          privacyLevel: mapPrivacy(row[colIdx("Privacy Level")]?.toString()),
          idealUserTypes: parseList(row[colIdx("Ideal User Types")]?.toString()),
          primaryUseCases: row[colIdx("Primary Use Cases")]?.toString() || null,
          timeToProductivity: row[colIdx("Time to Productivity")]?.toString() || null,
          learningCurve: row[colIdx("Learning Curve")]?.toString() || null,
          directAlternatives: parseList(row[colIdx("Direct Alternatives")]?.toString()),
          complementaryTools: parseList(row[colIdx("Complementary Tools")]?.toString()),
          budgetAlternativeTo: parseList(row[colIdx("Budget Alternative To")]?.toString()),
          privacyAlternativeTo: parseList(row[colIdx("Privacy Alternative To")]?.toString()),
          contentTypes: parseList(row[colIdx("Content Types Supported")]?.toString()),
          outputFormats: parseList(row[colIdx("Output Formats")]?.toString()),
          languageSupport: row[colIdx("Language Support")]?.toString() || null,
          categoryId: category.id,
        },
        create: {
          slug,
          name,
          company: row[colIdx("Company")]?.toString() || null,
          website: row[colIdx("Website")]?.toString() || null,
          primaryUse: row[colIdx("Primary Use")]?.toString() || null,
          currentPricing: row[colIdx("Current Pricing")]?.toString() || null,
          costTier: mapCostTier(row[colIdx("Cost Tier")]?.toString()),
          difficultyLevel: mapDifficulty(row[colIdx("Difficulty Level")]?.toString()),
          platformType: parsePlatformType(row[colIdx("Platform Type")]?.toString()),
          freeTierFeatures: row[colIdx("Free Tier Features")]?.toString() || null,
          usageLimits: row[colIdx("Usage Limits")]?.toString() || null,
          qualityRestrictions: row[colIdx("Quality Restrictions")]?.toString() || null,
          upgradeTriggers: row[colIdx("Upgrade Triggers")]?.toString() || null,
          installationType: row[colIdx("Installation Type")]?.toString() || null,
          offlineCapable: (row[colIdx("Offline Capable")]?.toString() || "").toLowerCase() === "yes",
          apiAvailable: (row[colIdx("API Available")]?.toString() || "").toLowerCase().startsWith("yes"),
          keyIntegrations: row[colIdx("Key Integrations")]?.toString() || null,
          privacyLevel: mapPrivacy(row[colIdx("Privacy Level")]?.toString()),
          idealUserTypes: parseList(row[colIdx("Ideal User Types")]?.toString()),
          primaryUseCases: row[colIdx("Primary Use Cases")]?.toString() || null,
          timeToProductivity: row[colIdx("Time to Productivity")]?.toString() || null,
          learningCurve: row[colIdx("Learning Curve")]?.toString() || null,
          directAlternatives: parseList(row[colIdx("Direct Alternatives")]?.toString()),
          complementaryTools: parseList(row[colIdx("Complementary Tools")]?.toString()),
          budgetAlternativeTo: parseList(row[colIdx("Budget Alternative To")]?.toString()),
          privacyAlternativeTo: parseList(row[colIdx("Privacy Alternative To")]?.toString()),
          contentTypes: parseList(row[colIdx("Content Types Supported")]?.toString()),
          outputFormats: parseList(row[colIdx("Output Formats")]?.toString()),
          languageSupport: row[colIdx("Language Support")]?.toString() || null,
          categoryId: category.id,
        },
      });
      count++;
    }

    console.log(`  Imported ${count} platforms into "${sheetName}"`);
    totalImported += count;
  }

  console.log(`\nDone! Total: ${totalImported} platforms across ${workbook.SheetNames.length} categories`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
