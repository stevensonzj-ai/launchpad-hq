import type { PlatformTutorialData } from "./types";

export const elicitTutorial: PlatformTutorialData = {
  slug: "elicit-getting-started",
  platformSlug: "elicit",
  title: "Getting Started with Elicit",
  tagline: `Searches and extracts from academic literature at speed — with a published accuracy gap you need to know about.`,
  archetype: "prompts",
  lastReviewedAt: "2026-07-27",
  changelogUrl: "https://support.elicit.com/en/",
  accessTier: "FREE",

  howItWorks: `Elicit searches across a very large index of academic papers using plain-language research questions rather than keyword strings, then pulls structured information out of the results into a table you define. Instead of reading forty abstracts to find sample sizes and methods, you ask for those columns and it fills them in, linking each cell back to the passage it came from. That citation trail is the feature that makes it checkable, and checking is not optional.`,

  whatItIs: [
    `A research assistant for academic literature, searching well over a hundred million papers.`,
    `Built for finding relevant work and extracting comparable data across many papers at once.`,
    `Deliberately narrow — it works on published academic literature and cannot help with current events, industry topics, or anything whose evidence base is not academic.`,
    `Transparent by design: every extracted claim links back to its source passage.`,
  ],

  beforeYouStart: [
    `There is a genuinely usable free tier that needs no card. Its exact limits are described inconsistently across third-party sources — **check the current allowances in the product** rather than trusting a comparison article, including this one.`,
    `Paid tiers start around $10 to $12 a month for individuals, with a substantially more expensive tier adding large-scale screening and systematic-review workflows.`,
    `It searches published literature. If your question is about the last six months of anything, this is the wrong tool.`,
    `**It is an accelerator, not a replacement for a proper search.** See the security section — this is the single most important thing on this page.`,
  ],

  security: [
    {
      kind: "text",
      text: `The risk on this page is not privacy — it is **trusting the output too much**. The vendor's own benchmark reports very high screening sensitivity, tested against a large set of established systematic reviews. An independent study published in 2025 found that sensitivity dropped dramatically, to under 40 percent, when queries followed the search strategies real systematic reviews actually use.`,
    },
    {
      kind: "text",
      text: `Both numbers can be true. Benchmarks measure controlled conditions; the independent test measured field conditions. The gap between them is the thing to internalise: **this tool performs far better on tidy questions than on the messy ones you will actually bring it.** A search that feels comprehensive may have missed most of the relevant literature without telling you.`,
    },
    {
      kind: "list",
      label: "How to use it responsibly",
      items: [
        `Treat it as one search among several, never the only one. Run your database searches too.`,
        `Verify extracted data against the source passage before you cite it. The link is provided precisely so you will.`,
        `Be especially careful with anything approaching clinical, safety, or policy conclusions, where a missed paper has consequences.`,
        `Record what you searched and how, so the gap in your method is documented rather than invisible.`,
      ],
    },
  ],

  triad: {
    bestAt: [
      `Finding relevant papers on a niche topic where keyword search fails`,
      `Pulling comparable data out of many papers into one table`,
      `Getting oriented in an unfamiliar literature quickly`,
      `Monitoring for new publications on a defined topic`,
    ],
    okayAt: [
      `Comprehensive recall, which is exactly where the independent testing found it weakest`,
      `Very recent publications, where indexing lags`,
      `Interdisciplinary questions spanning academic and non-academic evidence`,
    ],
    avoid: [
      `Being your only literature search for anything that must be complete`,
      `Clinical or policy conclusions without full expert review`,
      `Questions whose evidence base is news, industry reporting, or anything unpublished`,
    ],
  },

  starterActions: [
    {
      title: "Ask a real research question in plain language",
      prompt: `What does the evidence say about [your specific question]? I want the strongest findings on both sides, not a consensus summary.`,
      whyHere: `The semantic search is the genuine advantage over keyword databases, and it only shows up when you stop writing keyword strings.`,
      tweak: `Compare the results against the same question in a keyword database. The overlap, and the gap, are both instructive.`,
    },
    {
      title: "Build one extraction table",
      whatItDoes: `Pulls specified fields out of every paper in your result set into columns.`,
      whyHere: `This is the time saving that justifies the tool, and it is the feature people discover last.`,
      tweak: `Start with three columns you would have written down by hand anyway. Ambitious tables are harder to verify.`,
    },
    {
      title: "Verify five cells against their sources",
      whyHere: `The single most important habit to build with this tool, and the reason the citation links exist.`,
      tweak: `Pick the five that matter most to your argument, not five at random.`,
    },
    {
      title: "Run the same question in a database search and compare",
      whyHere: `Directly exposes the recall gap the independent research identified, on your own topic.`,
      tweak: `Count what the other search found that this one missed. That number is your calibration.`,
    },
  ],

  pitfalls: [
    `**Vendor benchmarks and field performance diverge sharply.** Independent 2025 testing found screening sensitivity far below the vendor's reported figure when using realistic systematic review search strategies. Do not treat a search here as comprehensive.`,
    `**It is a supplement, never a substitute.** Run your proper database searches alongside it. Using this alone for anything that must be complete is a methodological error, not a shortcut.`,
    `**Extraction is fast and still needs checking.** Every cell links to its source passage because that link is meant to be followed. Cite what you verified, not what appeared in the table.`,
    `**It only knows published academic literature.** Current events, industry trends, and unpublished work are outside its scope entirely. It will not tell you that your question was a bad fit.`,
    `**Free-tier limits are described inconsistently online.** Sources disagree about what the free plan includes. Check inside the product before planning work around a number you read elsewhere.`,
  ],

  whereToNext: [
    { label: "Other research tools", categorySlug: "research-academic-tools" },
    { label: "Working with documents and PDFs", categorySlug: "document-pdf-processing" },
  ],
};
