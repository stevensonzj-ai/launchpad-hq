/**
 * Catalog audit #25: source verification for rows with prices but no source,
 * 2026-10-30. UPDATE-only, keyed by slug. Each field is written only while the row
 * still holds the exact old value recorded here (a hand edit is left alone),
 * so a re-run reports 0 changes. Every new value was read that day on the
 * vendor's own pricing page (`source`) by a bulk reader and spot-checked
 * against the page HTML; the price facts behind it live in src/data/facts
 * (AUDIT_25_FACT_SLUGS). No "official" wording (audit 10 rule).
 *
 * Rows that could not be checked on a vendor page are left unchanged
 * (catalog_only). Kept free of Prisma and dotenv so it typechecks with the
 * app and can be unit-tested (audit-25.test.ts). Never creates or deletes rows.
 */

export const CHECKED_AT = "2026-10-30";

/** Rows that got verified price facts in this audit (exempt from audit 10's no-fact rule). */
export const AUDIT_25_FACT_SLUGS = ["activepieces", "bolt-new", "claude-code", "pinecone", "replit-agent", "together-ai", "windsurf", "copy-ai", "flux", "grok-bot", "kiro", "luma-dream-machine-ray3", "runway", "stability-ai", "tactiq", "cursor", "heygen", "pictory-ai", "surfer-seo", "textgen", "unriddle", "assemblyai", "descript", "gemini-notebook", "manus", "pika", "synthesia", "tl-dv", "v0", "zapier"] as const;

export type Audit25Field = "currentPricing" | "freeTierFeatures";

export type Audit25Patch = {
  slug: string;
  finding: string;
  source: string;
  fields: Partial<Record<Audit25Field, { from: string; to: string }>>;
};

export const AUDIT_25_PATCHES: Audit25Patch[] = [
  {
    slug: "activepieces",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://www.activepieces.com/pricing",
    fields: {
      currentPricing: {
        from: "Free $0 (1,000 credits a month, refreshing daily); Plus $20/mo flat (10,000 credits/mo, then $0.007/credit); Team $200/mo flat (50,000 credits/mo, 25 users); Ultimate custom; Embed from $36k/year (as of 2026-10-29)",
        to: "Free $0 (1,000 credits a month, refreshing daily); Plus $20/mo flat (10,000 credits/mo, then $0.007/credit); Team $200/mo flat (50,000 credits/mo); Ultimate custom; Embed from $36k/year (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free forever, no card: 1,000 credits a month, refreshing daily (per the pricing table), unlimited flows, up to 5 users (as of 2026-10-29)",
        to: "Free forever, no card: 1,000 credits a month, refreshing daily, unlimited flows, up to 5 users (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "bolt-new",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://bolt.new/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Pro $25/mo billed monthly ($18/mo billed annually); Teams $30/member/mo billed monthly ($27 billed annually); Enterprise custom (as of 2026-10-25)",
        to: "Free $0; Pro $25/mo billed monthly; Teams $30/member/mo billed monthly; Enterprise custom; yearly billing saves up to 28% (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free: 1M tokens/month with a 300K daily limit, Bolt branding, 10MB upload limit (official, as of 2026-10-25)",
        to: "Free forever, no card: 1M tokens/month with a 300K daily limit, Bolt branding, 10MB upload limit (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "claude-code",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://claude.com/pricing",
    fields: {
      currentPricing: {
        from: "Claude Code is included on paid Claude plans: Pro $17/mo with annual ($20 billed monthly); Max from $100/mo; also Team and Enterprise. Not included on Free (per the compare table, as of 2026-10-14).",
        to: "Claude Code is included on paid Claude plans: Pro $17/mo billed annually ($200 up front) or $20 billed monthly; Max $100/mo; Ultra $200/mo; Team standard seat $20/mo annual ($25 monthly), premium seat $100/mo annual ($125 monthly); not included on Free (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "No Claude Code on the Free plan. Available from Pro ($17–20/mo) and Max (from $100/mo) (official, as of 2026-10-14)",
        to: "No Claude Code on the Free plan; available from Pro ($17/mo annual, $20 monthly) (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "pinecone",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://www.pinecone.io/pricing/",
    fields: {
      currentPricing: {
        from: "Starter Free; Builder $20/mo flat; Standard $50/mo minimum then pay-as-you-go; Enterprise $500/mo minimum (as of 2026-10-14)",
        to: "Starter Free; Builder $20/month flat; Standard $50/month minimum then pay-as-you-go; Enterprise $500/month minimum then pay-as-you-go (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Starter Free: on-demand database, inference, assistant; usage caps (e.g. ~2 GB storage) (official, as of 2026-10-14)",
        to: "Starter Free: up to 2 GB storage, 5 indexes, 2M write units and 1M read units per month, 1 project, 2 users; Assistant 1 GB; community support (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "replit-agent",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://replit.com/pricing",
    fields: {
      currentPricing: {
        from: "Core $20/mo ($18/mo billed annually) including $20 toward more powerful models; higher individual tier $100/mo ($90 annual) with $100 of model credits; Enterprise custom (as of 2026-10-14)",
        to: "Core $20/mo ($18/mo billed annually); Pro $100/mo ($90/mo billed annually), with higher usage tiers up to $2,000/mo; Enterprise custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "together-ai",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://www.together.ai/pricing",
    fields: {
      currentPricing: {
        from: "Serverless chat from $0.04/M input tokens (Tev1 4B Experimental); some listed models at $0.00; prepaid credit, $5 minimum historically (per the table, as of 2026-10-14)",
        to: "Serverless pay-per-token, e.g. Tev1 4B Experimental $0.04/M input (output free), gpt-oss-120B $0.15/M input and $0.60/M output, Llama 3 8B Instruct Lite $0.14/M; dedicated GPUs e.g. HGX H100 $5.49/GPU-hr (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "windsurf",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://devin.ai/pricing",
    fields: {
      currentPricing: {
        from: "Free; Pro $15-20/mo; Max $200/mo",
        to: "Free $0; Pro $20/mo; Max $200/mo; Teams $80/mo team plan + $40/mo per full seat; Enterprise custom (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free tier with AI completions; limited premium chat credits; tab completions",
        to: "Free $0: light quota to code with agents, limited model availability, unlimited inline edits and Tab completions (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "copy-ai",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://copy.ai/prices",
    fields: {
      currentPricing: {
        from: "Chat $29/mo billed monthly ($24/mo billed $288/yr); Growth $1,000/mo ($12,000/yr); Expansion $2,000/mo; Scale $3,000/mo; Enterprise custom (as of 2026-10-14)",
        to: "Chat $29/mo billed monthly ($24/mo billed $288/yr); Growth $1,000/mo ($12,000/yr); Expansion $2,000/mo ($24,000/yr); Scale $3,000/mo ($36,000/yr); Enterprise custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "flux",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://bfl.ai/pricing",
    fields: {
      currentPricing: {
        from: "Pay as you go, no subscriptions. API calculator default ~$0.048/image (768×768, 1 image) as of 2026-10-14. Open-weights licensing (Builder/Platform) is separate and custom.",
        to: "Pay as you go, no subscriptions. API calculator shows $0.048/image (768x768, 1 image). Open-weights licensing (Builder/Platform) is separate; Professional/Enterprise via sales (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "grok-bot",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://docs.x.ai/x-subscription/pricing",
    fields: {
      currentPricing: {
        from: "No standalone price. The X Subscription (docs.x.ai/x-subscription/pricing, as of 2026-10-14): included on Premium $30/mo ($300/yr), Super $100/mo ($1,000/yr), Ultra $200/mo ($2,000/yr) and matching team seats. Not on Free or Plus. Existing SuperGrok and Cursor Pro/Pro+/Ultra/Teams keep access, per x.ai at time of writing. Weekly pool size and Additional Usage unit rate unverified.",
        to: "No standalone price. Included in X Subscription: Premium $30/mo ($300/yr), Super $100/mo ($1,000/yr), Ultra $200/mo ($2,000/yr), plus matching team seats at $30/$100/$200 per seat. Not included on Plus ($8/mo) (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "kiro",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://kiro.dev/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Pro $20/user/mo; Pro+ $40; Pro Max $100; Power $200 per user/mo; Enterprise via AWS (as of 2026-10-14)",
        to: "Free $0; Pro $20/user/mo (1,000 credits); Pro+ $40 (2,000); Pro Max $100 (5,000); Power $200 (10,000); Enterprise via AWS; extra credits $0.04 each (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Perpetual Free tier: 50 credits/mo (do not roll over); rate-limited models (official, as of 2026-10-14). Not “free during preview.”",
        to: "Perpetual Free tier: 50 credits per month (usage resets each billing month) (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "luma-dream-machine-ray3",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://lumalabs.ai/pricing",
    fields: {
      currentPricing: {
        from: "Plus $30/mo ($25/mo billed yearly, $300/yr); Pro $90/mo ($75/mo yearly, $900/yr); Ultra $300/mo ($250/mo yearly, $3,000/yr); Team and Enterprise contact sales (as of 2026-10-14)",
        to: "Plus $30/mo ($25/mo billed yearly, $300/yr); Pro $90/mo ($75/mo yearly, $900/yr); Ultra $300/mo ($250/mo yearly, $3,000/yr); Team and Enterprise contact sales (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "runway",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://runway.com/pricing",
    fields: {
      currentPricing: {
        from: "Standard $15/mo monthly or $12/mo billed annually; Pro $35/$28; Max $95/$76 (as of 2026-10-14). The old “Pro $76” figure is Max billed annually.",
        to: "Standard $15/mo monthly or $12/mo billed annually; Pro $35/$28; Max $95/$76 (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free plan: one-time 125 credits that do not expire (official FAQ, as of 2026-10-14)",
        to: "Free plan: one-time 125 credits that do not expire (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "stability-ai",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://docs.stability.ai/pricing",
    fields: {
      currentPricing: {
        from: "Open models (Community License): $0 for individuals and organizations under US$1M annual revenue, commercial users must register; Developer Platform API: US$0.01 per credit, pay as you go; Enterprise License (over US$1M annual revenue): custom; Stable Audio web app: separate plans at stableaudio.com/pricing (as of 2026-10-25)",
        to: "Open models (Community License): free for individuals and organizations under US$1M annual revenue; Developer Platform API: US$0.01 per credit, pay as you go; Enterprise License (over US$1M annual revenue): custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "tactiq",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://tactiq.io/pricing",
    fields: {
      currentPricing: {
        from: "Free forever $0; Pro $8/user/mo billed annually; Team $16.67/user/mo billed annually; Business $29.17/user/mo billed annually; Enterprise custom. Monthly (non-annual) prices unverified (official, as of 2026-10-14)",
        to: "Free forever $0; Pro $8/user/mo billed annually; Team $16.67/user/mo billed annually; Business $29.17/user/mo billed annually; Enterprise custom. Monthly (non-annual) prices not shown (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free forever, no card: 10 transcripts/mo and 5 AI credits/mo (official, as of 2026-10-25)",
        to: "Free forever, no card: 10 transcripts/mo and 5 AI credits/mo (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "cursor",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://cursor.com/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Plus $8/mo (Grok models only); Premium $30/mo (4x Plus usage); Super $100/mo (15x Plus); Ultra $200/mo (50x Plus); Teams from $30/user/mo; Enterprise custom. Third-party models are billed separately by usage. Sold only through X Subscription Corp (as of 2026-10-25)",
        to: "Free $0; Plus $8/mo (Grok models only); Premium $30/mo (4x Plus usage); Super $100/mo (15x Plus); Ultra $200/mo (50x Plus); Teams from $30/user/mo; Enterprise custom; third-party models billed separately by usage (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free $0: limited AI usage in Cursor (official, as of 2026-10-25)",
        to: "Free $0: limited AI usage; limited agent and chat requests (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "heygen",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://www.heygen.com/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Creator $29/mo (or $24/mo billed annually); Pro from $49/mo; Business $149/mo + $20/seat; Enterprise contact sales (as of 2026-10-25)",
        to: "Free $0; Creator $29/mo (or $24/mo billed annually); Pro from $49/mo; Business $149/mo + $20/seat; Enterprise contact sales (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free $0: 3 videos/mo up to 1 min, watermarked, Avatar IV access, 500+ stock avatars, 1 custom video avatar (official, as of 2026-10-25)",
        to: "Free $0: 3 videos/mo up to 1 min each, watermarked, 1 custom video avatar (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "pictory-ai",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://pictory.ai/pricing",
    fields: {
      currentPricing: {
        from: "Starter $29/mo ($25 billed annually); Professional $59/mo ($35 annual); Team $199/mo ($119 annual); Enterprise custom (as of 2026-10-14)",
        to: "Starter $29/mo ($25/mo billed annually); Professional $59/mo ($35/mo billed annually); Teams $199/mo ($119/mo billed annually); Enterprise custom (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "No free plan; 14-day trial (3 video projects) on the pricing page as of 2026-10-14",
        to: "No free plan; 14-day free trial with 300 credits (up to 10 minutes), 3 videos, 720p, watermarked (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "surfer-seo",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://surfer.ai/pricing",
    fields: {
      currentPricing: {
        from: "Discovery $49/mo billed yearly; AI Search Analytics $82/mo billed yearly; Standard $99/mo billed yearly; next tier $182/mo billed yearly; Peace of Mind $299/mo billed yearly; Enterprise custom (as of 2026-10-14). Monthly sticker prices were not the figures shown on the fetched cards.",
        to: "Discovery $49/mo billed yearly; AI Search Analytics $82/mo billed yearly; Standard $99/mo billed yearly; Pro $182/mo billed yearly; Peace of Mind $299/mo billed yearly; Enterprise custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "textgen",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://github.com/oobabooga/textgen",
    fields: {
      currentPricing: {
        from: "Free",
        to: "Free (open source, AGPL-3.0) (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Completely free and open-source (AGPL-3.0)",
        to: "Completely free and open-source (AGPL-3.0); runs locally (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "unriddle",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://anara.com/pricing",
    fields: {
      currentPricing: {
        from: "Free tier; Pro $16/mo",
        to: "Free $0; Plus $10/mo ($8/mo yearly); Pro $20/mo ($16/mo yearly); Max 5x $100/mo ($80/mo yearly); Max 20x $200/mo ($160/mo yearly); credits can be bought to add usage (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free: 5 documents; basic AI Q&A; note-taking; limited features",
        to: "Free $0: no credit card required; limited AI usage and uploads (refreshes daily); 20MB or 120 pages per upload; Zotero and Mendeley connectors (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "assemblyai",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://www.assemblyai.com/pricing",
    fields: {
      currentPricing: {
        from: "Pay-as-you-go pre-recorded: Universal-2 $0.15/hr; Universal-3.5 Pro $0.21/hr; $50 free credits on signup (as of 2026-10-14)",
        to: "Pay-as-you-go pre-recorded: Universal-2 $0.15/hr; Universal-3.5 Pro $0.21/hr; $50 free credits on signup, no card required (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free: limited hours; basic transcription and AI features",
        to: "$50 free credits on signup, no credit card required; free-tier streaming limited to 5 new streams/min (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "descript",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://www.descript.com/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Hobbyist $24/person/mo monthly or $16 annual; Creator $35/$24; Business $65/$50 per person; Enterprise custom (as of 2026-10-14)",
        to: "Free $0; Hobbyist $24/person/mo monthly or $16 annual; Creator $35 monthly or $24 annual; Business $65 monthly or $50 annual (per person); Enterprise custom (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "gemini-notebook",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://support.google.com/notebooklm/answer/16213268",
    fields: {
      currentPricing: {
        from: "Free",
        to: "Free Standard plan (sign up with a Google account); higher limits via Google AI Plus, AI Pro (from $19.99/mo), AI Ultra, or qualifying Workspace plans (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "manus",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://help.manus.im/en/articles/11711111-what-is-the-current-membership-pricing-for-manus",
    fields: {
      currentPricing: {
        from: "Free 300 credits/day (max 1,500/mo); Pro from $20/mo; Pro 8,000 credits from $40/mo; Team from $20/seat; annual −17%",
        to: "Free $0 with 300 credits/day; Pro from $20/mo (4,000 credits/mo); Pro from $40/mo (8,000 credits/mo, 7-day free trial); Team from $20/seat/mo; 17% off with annual billing (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "300 credits/day, max 1,500/mo, Manus 2.0 Lite only (official help center, as of 2026-10-13)",
        to: "300 credits refresh daily; 1 concurrent task; 2 scheduled automations (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "pika",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://pika.art/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits); Fancy $95–$880/mo ($76–$704 annual) (per the compare table, as of 2026-10-14)",
        to: "Free $0 (0 monthly credits, credit packs only); Starter $10/mo ($8 annual, 900 credits/mo); Creator $35/mo ($28 annual, 3,150 credits/mo); Fancy $95-$880/mo ($76-$704 annual, 8,550+ credits) (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free $0 with 0 monthly credits (credit packs only) as of 2026-10-14; no-watermark listed on Free in the compare table",
        to: "Free $0: 0 monthly credits (credit packs only: $25 for 1,500 credits); 2 parallel video and 2 parallel image/audio generations; no commercial license (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "synthesia",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://www.synthesia.io/pricing",
    fields: {
      currentPricing: {
        from: "Basic $0/mo; Starter $29/mo billed monthly; Pro $89/mo billed monthly ($64/mo billed yearly); Enterprise custom. Starter's yearly price is shown inconsistently on the page, so it is not quoted (as of 2026-10-25)",
        to: "Basic $0/mo; Starter $19/mo billed monthly ($14/mo billed yearly, $168/yr); Pro $89/mo billed monthly ($59/mo billed yearly, $708/yr); Enterprise custom (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Basic $0: 10 min of video, 3 survey responses and 500 credits every month (official, as of 2026-10-25)",
        to: "Basic $0: 10 min of video, 3 survey responses and 500 credits every month (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "tl-dv",
    finding: "Row prices corrected on the vendor pricing page; price facts added with source and date",
    source: "https://tldv.io/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Pro $18/seat/mo billed annually; Business $29/seat/mo billed annually; monthly USD prices not confirmed (official, as of 2026-10-25)",
        to: "Free €0; Pro €18/seat/mo billed annually (€29 monthly); Business €29/seat/mo billed annually (€39 monthly); prices shown in EUR (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "v0",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://v0.app/pricing",
    fields: {
      currentPricing: {
        from: "Free $0; Plus $30/user/mo; Business $100/user/mo (as of 2026-10-14). The old “Premium $20” name is gone.",
        to: "Free $0; Plus $30/user/mo; Business $100/user/mo; Enterprise custom; USD, excluding taxes (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free $0: 7 messages/day limit (official, as of 2026-10-14)",
        to: "Free $0: 7 messages/day limit (as of 2026-10-30)",
      },
    },
  },
  {
    slug: "zapier",
    finding: "Row prices confirmed on the vendor pricing page; price facts added with source and date",
    source: "https://zapier.com/pricing",
    fields: {
      currentPricing: {
        from: "Free $0 (100 tasks/mo); Professional from $19.99/mo billed annually ($29.99 monthly, 750 tasks); Team from $69/mo billed annually ($103.50 monthly, 2,000 tasks, 25 users); Enterprise custom (as of 2026-10-25)",
        to: "Free $0 (100 tasks/mo); Professional $19.99/mo billed annually (750 tasks); Team $69/mo billed annually (2,000 tasks, 25 users); Enterprise custom (as of 2026-10-30)",
      },
      freeTierFeatures: {
        from: "Free: 100 tasks/mo, unlimited two-step Zaps, 15-minute update time (official, as of 2026-10-25)",
        to: "Free: 100 tasks/mo, 1 seat, two-step Zaps, 15-minute update time (as of 2026-10-30)",
      },
    },
  },
];

export type Audit25Row = Partial<Record<Audit25Field, string | null>>;
export type Audit25Plan = { field: Audit25Field; action: "update" | "already" | "differs"; to: string };

/** Per-field plan for one row: write only from the exact old value. */
export function planAudit25(row: Audit25Row, patch: Audit25Patch): Audit25Plan[] {
  return (Object.entries(patch.fields) as [Audit25Field, { from: string; to: string }][]).map(([field, { from, to }]) => {
    const current = row[field] ?? null;
    if (current === to) return { field, action: "already", to };
    if (current === from) return { field, action: "update", to };
    return { field, action: "differs", to };
  });
}

/** Prisma `data` for the fields to write; empty when nothing changes. */
export function audit25UpdateData(plans: readonly Audit25Plan[]): Partial<Record<Audit25Field, string>> {
  return Object.fromEntries(plans.filter((p) => p.action === "update").map((p) => [p.field, p.to]));
}
