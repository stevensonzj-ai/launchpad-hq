/**
 * Batch-update mobile app fields for all platforms (Launchpad HQ research data).
 *
 * Usage (from repo root, DATABASE_URL set):
 *   npx tsx scripts/update-platform-mobile-fields.ts
 *
 * Or: npm run db:update-mobile
 *
 * Steps:
 * 1. Reset every row to defaults (no app URLs, hasMobileApp=false, mobileWebFriendly=true).
 * 2. Mark likely CLI / terminal tools as not mobile-web-friendly.
 * 3. Apply curated Minimax research overrides (by slug + aliases).
 */
import "dotenv/config";

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../src/generated/prisma/client");

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      return JSON.parse(Buffer.from(padded, "base64url").toString()).databaseUrl;
    } catch {}
  }
  return raw;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const prisma = new PrismaClient({ adapter: new PrismaPg(getDirectUrl()) }) as any;

type MobilePayload = {
  hasMobileApp: boolean;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
  mobileWebFriendly: boolean;
};

/** Primary slug = slugify(Excel "Platform Name"); aliases cover common variants. */
const RESEARCH_UPDATES: { slugs: string[]; data: MobilePayload }[] = [
  {
    slugs: ["chatgpt"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/chatgpt/id6448311069",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.openai.chatgpt",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["claude"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/claude-by-anthropic/id6473753684",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.anthropic.claude",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["gemini", "google-gemini"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/google-gemini/id6477489729",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.google.android.apps.bard",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["perplexity-ai", "perplexity"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/perplexity-ask-anything/id1668000334",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.perplexity.app.android",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["microsoft-copilot"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/microsoft-copilot/id6472538445",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.microsoft.copilot",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["grok"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/grok/id6670324846",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.x.grok",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: [slugify("Mistral AI (Le Chat)"), "le-chat", "mistral-le-chat", "mistral-ai-le-chat"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/le-chat-by-mistral-ai/id6740410176",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.mistral.chat",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["notebooklm", "notebook-lm"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/google-notebooklm/id6737527615",
      androidAppUrl:
        "https://play.google.com/store/apps/details?id=com.google.android.apps.labs.language.tailwind",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["grammarly"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/grammarly-ai-keyboard-notes/id1158877342",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.grammarly.android.keyboard",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["midjourney"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["suno"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/suno-make-and-explore-music/id6480136315",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.suno.android",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: [slugify("Canva AI (Magic Studio)"), "canva-ai-magic-studio", "canva-ai"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/canva-design-photo-video/id897446215",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.canva.editor",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["adobe-firefly", "firefly"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/adobe-firefly-ai-generator/id6742595426",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.adobe.firefly",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["leonardo-ai", "leonardo"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/leonardo-ai-image-generator/id1662773014",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.leonardo.leonardo",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["ideogram"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/ideogram-ai-image-generator/id6476790495",
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["microsoft-designer"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/microsoft-designer/id6448308247",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.microsoft.designer",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["recraft"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/recraft-ai-image-generator/id6502416347",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.recraft",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["runway", "runway-ml", "runwayml"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/runwayml/id1665024375",
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["pika"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["heygen"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/heygen-ai-video-generator/id6711356409",
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["invideo-ai", "invideo"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/invideo-ai-video-generator/id6471394316",
      androidAppUrl: "https://play.google.com/store/apps/details?id=io.invideo.ai",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["luma-dream-machine", "luma-ai", "dream-machine"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/luma-dream-machine/id6478852867",
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["elevenlabs", "eleven-labs"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/elevenlabs-text-to-speech-ai/id6743162587",
      androidAppUrl: "https://play.google.com/store/apps/details?id=io.elevenlabs.coreapp",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["udio"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/udio-ai-music-maker-studio/id6511211165",
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["mubert"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/mubert-ai-music-streaming/id1154429580",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.jellyworkz.mubert",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["replit-agent", "replit"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/replit-code-anything/id1145200178",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.replit.app",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["lovable"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/lovable-ai-app-builder/id6760457409",
      androidAppUrl: "https://play.google.com/store/apps/details?id=dev.lovable.build",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["v0"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/v0/id6745097949",
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["cursor"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["claude-code"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: false,
    },
  },
  {
    slugs: ["github-copilot"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["notion-ai", "notion"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/notion-notes-tasks-ai/id1232780281",
      androidAppUrl: "https://play.google.com/store/apps/details?id=notion.id",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["zapier"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["make", "make-com", "integromat", "make-formerly-integromat"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/make-automation-workflows/id1177073656",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.integromat.android",
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["n8n"],
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  },
  {
    slugs: ["microsoft-power-automate", "power-automate"],
    data: {
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/us/app/power-automate/id1094928825",
      androidAppUrl: "https://play.google.com/store/apps/details?id=com.microsoft.flow",
      mobileWebFriendly: true,
    },
  },
];

async function main() {
  const total = await prisma.platform.count();
  if (total === 0) {
    console.warn("No platforms in database — nothing to update.");
    await prisma.$disconnect();
    return;
  }

  const reset = await prisma.platform.updateMany({
    data: {
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
      mobileWebFriendly: true,
    },
  });
  console.log(`Reset defaults on ${reset.count} platform(s).`);

  const cli = await prisma.platform.updateMany({
    where: {
      OR: [
        { installationType: { contains: "CLI", mode: "insensitive" } },
        { installationType: { contains: "command line", mode: "insensitive" } },
        { installationType: { contains: "command-line", mode: "insensitive" } },
        { installationType: { contains: "Terminal", mode: "insensitive" } },
        { slug: { endsWith: "-cli" } },
        { platformType: { hasSome: ["cli", "terminal"] } },
      ],
    },
    data: { mobileWebFriendly: false },
  });
  console.log(`Marked ${cli.count} likely CLI/terminal platform(s) as not mobile-web-friendly.`);

  let researchHits = 0;

  for (const { slugs, data } of RESEARCH_UPDATES) {
    const unique = [...new Set(slugs)];
    const res = await prisma.platform.updateMany({
      where: { slug: { in: unique } },
      data,
    });
    researchHits += res.count;
  }

  console.log(`Applied research overrides (${researchHits} row updates from slug matches).`);

  const withApp = await prisma.platform.count({ where: { hasMobileApp: true } });
  const notFriendly = await prisma.platform.count({ where: { mobileWebFriendly: false } });
  console.log(`Summary: ${total} platforms, ${withApp} with hasMobileApp=true, ${notFriendly} with mobileWebFriendly=false.`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
