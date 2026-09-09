import type { PlatformTutorialData } from "./types";

export const unriddleTutorial: PlatformTutorialData = {
  slug: "unriddle-getting-started",
  platformSlug: "unriddle",
  title: "Getting Started with Unriddle (now Anara)",
  tagline:
    "Read a stack of research papers by asking them questions — and click straight to the passage each answer came from.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You upload your PDFs into a folder, then type a question in a panel beside them. The answer comes back with small numbered markers in it, each pointing at the source behind it. You go on asking, add more files, and write your own notes in the same window.",

  whatItIs: [
    "Unriddle is a research workspace for reading papers. The company renamed it **Anara** in 2025 — unriddle.ai now redirects to anara.com — so the name on the site will not match the name that brought you here.",
    "The real alternative is attaching a PDF to a general chatbot, and the difference is that this keeps a library. Your papers stay uploaded between sessions, and a question can be aimed at a whole folder rather than one file.",
    "Those citation numbers are the point of the tool. Anara's help centre says clicking one opens the source document and scrolls to the exact passage the answer used, so checking a claim is meant to take a click rather than a re-read.",
    "There is also a writing editor in the same window, so a draft and the sources it rests on sit side by side instead of in two applications.",
  ],

  beforeYouStart: [
    "The free plan needs no card, and its allowance refreshes **daily** rather than monthly — the help centre says free limits reset on a rolling daily basis. That makes the free tier genuinely usable for a reading week rather than a one-time trial.",
    "**One cap will decide whether this works for you: a single upload on the free plan is limited to 20MB or 120 pages.** A journal article fits with room to spare. A thesis, a textbook chapter set, or a scanned course reader often will not, and the limit is per file rather than per month, so it does not go away by waiting.",
    "Free connects to Zotero and Mendeley — the reference managers most students already keep their PDFs in — so an existing library can come across without re-uploading anything. The academic-database connectors start on the Plus plan, currently around $10 a month, and cloud-storage connectors on Pro, around $20. Most people reading this will not need either.",
    "When you run out, the tool stops rather than getting quietly worse: new questions, AI edits and file imports pause, while reading, annotating and every answer you have already received keep working. Buying extra credits (the platform's unit of spend) is a paid-plan option only, and the help centre says support cannot raise a free limit.",
  ],

  security: [
    {
      kind: "text",
      text: "Anara's security page is unusually specific for a product this size: encryption in transit and at rest, SOC 2 Type II certification (an audit of how a company handles customer data), and a flat statement that it never uses your documents or chats to train AI, in any form, on any account rather than as a setting you have to find.",
    },
    {
      kind: "text",
      text: "Where that promise is written down matters more than the promise. It appears on the security page. The binding privacy policy's own explicit no-training sentence is scoped to a narrower case, and the policy separately lists AI providers among the companies your text is passed to — Anara says those providers keep nothing after answering. So the strong version is a vendor statement rather than a clause you could point a supervisor at, which is the right way to weigh it if the answer matters institutionally.",
    },
    {
      kind: "list",
      label: "Where the stakes actually are",
      items: [
        "Unpublished work — a draft manuscript, a thesis chapter, a paper someone sent you before publication. Published papers are already public; those are not, and they are what a research tool ends up full of.",
        "If your work is funded, ethics-approved or otherwise regulated, check your institution's rules on cloud processing before the library gets large. Moving four hundred files later is a worse day than starting somewhere else.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Finding which of your forty PDFs actually contains the thing you half-remember reading",
      "Pulling the same detail out of many papers at once — sample sizes, dates, effect sizes — into one table you can scan",
      "Getting a plain-language read on a paper from outside your field",
      "Keeping a library that persists, so next week's question does not start with re-uploading everything",
    ],
    okayAt: [
      "Questions about the open web — it can search, but a general chatbot handles anything not in your library better",
      "Scanned pages and figures — text recognition and image understanding start on the Pro tier, so a photographed page can upload fine and then behave as though it is nearly blank",
      "Writing prose. The editor is real and it cites as it goes, but this is a reading tool before it is a writing tool",
    ],
    avoid: [
      "Patient-identifiable or clinical material on any plan below Enterprise. The security page says the company is compliant with US health-privacy law, but the additional agreement that actually covers patient records is offered to Enterprise customers only.",
      "Routinely uploading paywalled PDFs from a university library subscription. The terms make you warrant you have the right to provide anything you upload, and a site licence to read a journal is not obviously a right to hand it to a third-party service.",
      "Group work on the free plan. Folder collaborators are listed from Plus upward and the free tier's description does not mention them, so a shared folder is not something to build a group project on without checking first.",
    ],
  },

  starterActions: [
    {
      title: "Ask one paper what it cannot show",
      prompt:
        "Read this paper and tell me three things in plain language: the question it set out to answer, what it actually found, and what the authors themselves say the study cannot show. Cite the passage for each of the three.",
      whyHere:
        "Because Anara's help centre says a citation click lands you on the passage the answer used, the third part is checkable in a way a summary is not: a limitation you cannot land on in the source is a limitation to distrust.",
      tweak:
        "Add \"and quote the sentence where they say it\" to make the check faster still.",
    },
    {
      title: "Turn five papers into one table",
      prompt:
        "Across every paper in this folder, build a table with one row per paper and these columns: authors and year, sample size, population studied, main outcome measured, headline result, and one line on the study's biggest limitation. Leave a cell blank rather than guessing, and cite each row.",
      whyHere:
        "Anara can create and edit spreadsheets from data in your documents and run small calculations on what it pulls out — so the comparison ends as a file you can sort, not a paragraph you have to re-read.",
      tweak:
        "Ask it to add a column for study design, then sort by it — the odd one out is usually the interesting one.",
    },
    {
      title: "Bring in the library you already have",
      prompt:
        "Across my whole library, which papers disagree with each other about their main finding? For each disagreement, name the two papers, state each one's position in a sentence, and cite the passage where each says it.",
      whyHere:
        "Those connectors being on the free plan is what makes a first session useful with a hundred papers in it rather than one.",
      tweak:
        "Run it again in a month; the same question over a bigger library is a different answer.",
    },
    {
      title: "Draft a paragraph where the citations come with it",
      prompt:
        "Using only the papers in this folder, draft one paragraph of about 150 words summarising what this literature agrees on and where it is unsettled. Attach a citation to every claim, and do not make a claim you cannot cite.",
      whyHere:
        "Anara offers around a dozen citation formats, including the ones supervisors actually ask for. It also tells you, in its own help centre, to check that each citation represents what the source says — take that instruction literally.",
      tweak:
        "Set your citation style in preferences before you start rather than reformatting afterwards.",
    },
    {
      title: "Look for what you have not read yet",
      prompt:
        "Based on what is already in this folder, what important work am I missing on this topic? List up to eight papers I do not have, with one sentence each on why it matters and how it relates to what I already have. Say clearly which ones you could not verify.",
      whyHere:
        "Anara searches published literature from inside the same window as your own files, so a new paper lands in the library it will later be questioned in — the specialist database connectors, though, start on the paid tiers.",
      tweak:
        "Ask for the five most-cited and the three most recent separately; they are rarely the same papers.",
    },
  ],

  pitfalls: [
    "A summary can read as complete and still have skipped the limitations section. The retrieval decides the answer: a passage that was never fetched is simply not in it, and nothing marks the hole. A confident three-line summary of a paper's findings that never mentions the small sample, the single site, or the funding source is the most common way this tool misleads a careful person.",
    "A citation being real is not the same as the citation supporting the sentence it is attached to. The format will be correct and the paper will exist. Whether that passage says what the claim says is the part only you can check.",
    "The rename catches people out in a specific way: a great many tutorials, reviews and course guides still say Unriddle and describe an older interface. If a walkthrough you find never mentions Anara, treat its screenshots and its stated limits as out of date.",
    "Your department's rule is the one that binds you, and nothing in the product signals where the line is. Anara publishes no position on acceptable academic use — no honest-use policy, no statement about coursework — and its terms contain no academic-integrity clause at all, while assigning you the rights to whatever it produces. Reading and searching with it rarely raises an eyebrow anywhere. Text its editor drafted, and citations it chose for you, are precisely what disclosure policies are written about, and those policies are usually set per course rather than centrally. Check the rule for the specific module before, not after.",
  ],

  whereToNext: [
    { label: "More PDF and document tools", categorySlug: "document-pdf-processing" },
    { label: "Research and academic tools", categorySlug: "research-academic-tools" },
    { label: "General AI chatbots", categorySlug: "text-conversational-ai" },
  ],
};
