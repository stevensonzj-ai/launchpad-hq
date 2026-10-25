/**
 * Copy shared by the HTML pages and their Markdown versions (src/lib/markdown),
 * so the two never drift. Plain text only: renderers add the markup. Facts here
 * describe how the site works; keep them in step with the code they describe.
 *
 * No postal address anywhere. The contact email appears only on /contact,
 * /about and the homepage JSON-LD (see seo-jsonld.ts), never in the feed,
 * the MCP connector or llms*.txt.
 */

export type CopyLink = { label: string; href: string };
export type CopySection = { heading: string; paragraphs: string[]; bullets?: string[]; links?: CopyLink[] };

export const CONTACT_EMAIL = "launchpadhq.admin@gmail.com";

/** The two workflows featured on the homepage (HTML and Markdown). */
export const HOME_FEATURED_WORKFLOWS: readonly string[] = ["blog-post-generator", "image-generation"];

/** Homepage "about" block: short, factual, linked to the full pages. */
export const HOME_ABOUT: CopySection[] = [
  {
    heading: "What Launchpad HQ is",
    paragraphs: [
      "Launchpad HQ is a free, independent directory of AI tools for beginners and anyone on a budget. It covers writing, images, video, audio, code, research, meetings and automation, and it points out free plans and open-source options you can run yourself. Browsing, guides and the matching quiz need no account.",
    ],
  },
  {
    heading: "How tools are checked",
    paragraphs: [
      "We check prices, free tiers and plan limits against each vendor's own pages. Checked facts carry the date they were checked and a link to the source; anything not yet confirmed is labelled instead of guessed. Sponsors buy a labelled placement only: never rankings, quiz results or data.",
    ],
  },
  {
    heading: "How to use it",
    paragraphs: [
      "Browse by category in Discover, take the four-question quiz for a shortlist, compare tools side by side, or open a getting-started guide for setup steps, safety notes and first prompts.",
    ],
  },
];

export const HOME_DEVELOPERS: CopySection = {
  heading: "For developers and AI assistants",
  paragraphs: [
    "The same dated, sourced facts are published as a free, read-only JSON data feed with an OpenAPI description, a read-only MCP connector for AI assistants, and llms.txt. No API key or sign-in.",
  ],
  links: [
    { label: "Developer docs", href: "/developers" },
    { label: "Data feed (JSON)", href: "/data/v1/index.json" },
    { label: "API reference (OpenAPI)", href: "/data/v1/openapi.json" },
    { label: "AI connector (MCP)", href: "/connector" },
    { label: "llms.txt", href: "/llms.txt" },
  ],
};

export const ABOUT_TITLE = "About Launchpad HQ";
export const ABOUT_DESCRIPTION =
  "What Launchpad HQ is, how tools are chosen and checked, how sponsorship is kept out of the data, and how corrections work.";

export const ABOUT_SECTIONS: CopySection[] = [
  {
    heading: "What Launchpad HQ is",
    paragraphs: [
      "Launchpad HQ is a free, independent directory of AI tools for beginners and budget-conscious people. Its aim is to show that there is far more to AI than ChatGPT and Claude: tools for writing, images, video, audio, code, research, meetings and automation, many with generous free plans or open-source versions you can run on your own computer.",
      "Alongside the directory there are getting-started guides, side-by-side comparisons, free-alternative pages, multi-tool workflow templates, a model reference for the major AI model families, and a four-question quiz that suggests a shortlist. Browsing all of it is free and needs no account.",
    ],
  },
  {
    heading: "How tools are chosen",
    paragraphs: [
      "A tool is included when a non-technical person could plausibly get value from it, when people are likely to hear about it and come looking for it, or when it fills a real gap in a category, such as a free or open-source alternative to a paid tool. Being popular alone is not enough.",
      "Tools with privacy or data-handling questions are usually included with a plain, dated note rather than left out, so you can decide for yourself. Each tool shows a privacy level (high, medium or low) that summarises how it handles your data. Low is a factual signal, not a verdict.",
    ],
  },
  {
    heading: "How facts are checked",
    paragraphs: [
      "We check prices, free tiers and plan limits against each vendor's own pages. A checked fact carries the date it was checked and a link to its source. Facts we have not confirmed are labelled unverified or catalog-only, and no source is invented for them.",
      "Prices in guides and workflows are filled in from the tool's catalog record rather than typed by hand, so they match the tool's page. Each guide shows the date its facts were last reviewed. When a well-known product shuts down, its page stays up, marked as discontinued, with what happened and what to use instead.",
    ],
  },
  {
    heading: "Editorial independence and sponsorship",
    paragraphs: [
      "Launchpad HQ earns money from clearly labelled sponsored placements. Sponsorship buys a labelled spot and nothing else: it never changes rankings, ratings, quiz results, workflow picks, guide verdicts or any fact in the catalog.",
      "The JSON data feed and the AI connector do not read sponsor data at all, and every record they return is marked sponsored: false.",
    ],
    links: [
      { label: "How we make money", href: "/how-we-make-money" },
      { label: "Sponsor guidelines", href: "/advertise" },
    ],
  },
  {
    heading: "Corrections",
    paragraphs: [
      "If something is wrong or out of date, tell us which page and, if you can, link the vendor's official page that shows the right answer. We check corrections against official sources before changing anything. When a correction is confirmed, the record is fixed and its checked date updated; the page, the data feed and the connector all read that same record, so they change together. Changes to a tool's facts are listed in its changelog.",
    ],
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    heading: "Data for developers and AI assistants",
    paragraphs: [
      "The catalog, comparisons, guides, workflows and model reference are also published as a free, read-only JSON feed, a read-only MCP connector for AI assistants, llms.txt and Markdown versions of the main pages. Please credit Launchpad HQ and link to the tool's page when you use the data.",
    ],
    links: [
      { label: "Developer docs", href: "/developers" },
      { label: "AI connector", href: "/connector" },
    ],
  },
];

export const CONTACT_TITLE = "Contact Launchpad HQ";
export const CONTACT_DESCRIPTION =
  "How to reach Launchpad HQ by email: corrections, missing or discontinued tools, data feed and connector questions, and sponsorship.";

export const CONTACT_SECTIONS: CopySection[] = [
  {
    heading: "Email",
    paragraphs: [
      `Email ${CONTACT_EMAIL}. Email is the only way to reach us; there is no phone line, chat or postal address.`,
    ],
  },
  {
    heading: "What to write to us about",
    paragraphs: ["Useful reasons to get in touch:"],
    bullets: [
      "A wrong or outdated fact, such as a price, free tier or plan limit. Include the Launchpad HQ page and a link to the vendor's official page.",
      "A tool we should add, or one that has shut down or been renamed.",
      "A problem with the site, the JSON data feed, the Markdown pages or the AI connector. For the feed, include the URL you requested and the error code you got back.",
      "Sponsorship and advertising. The rate card and rules are on the Advertise page.",
      "Privacy questions about the site or the connector. The privacy policy covers what is logged.",
    ],
    links: [
      { label: "Advertise", href: "/advertise" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Developer docs", href: "/developers" },
    ],
  },
  {
    heading: "What to expect",
    paragraphs: [
      "Every message is read. Launchpad HQ is a small operation, so replies can take a few days, and we can't promise to answer every message individually. Corrections are checked against the vendor's official pages before anything changes, and sponsors get no say in corrections.",
    ],
    links: [{ label: "How corrections work", href: "/about" }],
  },
];

export const DEVELOPERS_TITLE = "Launchpad HQ for developers: data feed, API reference and MCP";
export const DEVELOPERS_DESCRIPTION =
  "Free, read-only access to the Launchpad HQ AI tool catalog: JSON data feed, OpenAPI and JSON Schema, an MCP connector, Markdown pages and llms.txt. No API key.";
