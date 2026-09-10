import type { PlatformTutorialData } from "./types";

export const docsumoTutorial: PlatformTutorialData = {
  slug: "docsumo-getting-started",
  platformSlug: "docsumo",
  title: "Getting Started with Docsumo",
  tagline:
    "Pull the numbers out of stacks of business paperwork — and see exactly where each one came from.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-09",
  accessTier: "FREE",

  howItWorks:
    "You sign in, pick the kind of document you are handling, and upload a file. Docsumo reads it and shows you the values it found next to the page it found them on. You click through each one, fix anything wrong, approve it, and the finished data goes out to a spreadsheet or another system.",

  whatItIs: [
    "Docsumo is a business tool for pulling structured data out of large numbers of documents — invoices, bank statements, utility bills, pay slips, ACORD insurance forms, W-9s, bills of lading — and pushing that data into whatever system needs it next.",
    "It is aimed at teams handling the same document type over and over; lending and banking, insurance, healthcare, logistics and accounts payable are the sectors Docsumo names on its own solution pages.",
    "What separates it from a chat-with-your-PDF reader is what it hands back: not an answer in a conversation, but a table of fields, each one carrying a confidence score (how sure the software is that it read that field correctly) and a link to the exact spot on the page it was read from.",
    "That review-and-approve step is the actual product — the reading is the easy half.",
  ],

  beforeYouStart: [
    "You can start without talking to anyone. Signing up at `app.docsumo.com` currently gets you a trial of about 1,000 pages inside a 14-day window, with ten user seats. The pricing page does not say whether a card is required at signup, so expect to find that out at the form.",
    "After the trial, there is no published price. Both paid plans — Business and Enterprise — say \"Talk to us\", so continuing means a sales conversation and a quote based on your volume and document types. If you are one person with a stack of PDFs rather than a team with a repeating process, **Acrobat AI Assistant** on this site is the gentler starting point and ends in a price you can see.",
    "Bring the documents you actually receive, not a tidy sample: a clean demo invoice tells you nothing about your scans, your layouts and your suppliers' formatting.",
    "Extraction currently stops after the first 20 pages of a file on the documented upload routes — browser, email and programmatic. Longer files still upload and process; only the first 20 pages get read. Files are capped at around 25 MB. Docsumo's lending pages advertise 200-page financial documents, so higher limits may exist on paid plans — worth asking before you assume either number.",
    "It expects a repeated shape. Around 50 common document types come pre-trained; for anything else you teach it yourself from a sample set, which Docsumo puts at about 20 examples.",
  ],

  security: [
    {
      kind: "text",
      text: "The documents you put into Docsumo are usually not yours. They are your borrowers', your patients', your policyholders', your suppliers' — which changes the question from \"am I comfortable with this\" to \"am I allowed to do this.\"",
    },
    {
      kind: "list",
      label: "What Docsumo says it holds",
      items: [
        "SOC 2 (an audit of how a company handles customer data) — Docsumo says it certified to Type I in September 2021 and to Type II roughly six months later.",
        "GDPR (European privacy law governing what companies may do with your data) — its privacy policy says data is stored in accordance with it, and its published list of outside companies it relies on shows hosting regions in the US, EU, UK, Australia and India.",
      ],
    },
    {
      kind: "text",
      text: "The passage worth reading yourself is in the privacy policy, last updated January 2024: uploaded documents are \"retained and used for further research, development and training of the artificial intelligence.\" A 2025 company blog post about the SOC 2 audit says the opposite — that collected data \"is not used by the platform in any way.\" A blog post does not override a privacy policy. If your files carry other people's financial details, get that contradiction resolved in writing before you upload anything real.",
    },
    {
      kind: "text",
      text: "The same public list of outside providers names Anthropic and OpenAI alongside AWS, Google Cloud, MongoDB and Cloudflare, so document content can leave Docsumo's own systems and reach third-party AI services. Deletion is by written request to `privacy@docsumo.com`, which the policy says is actioned within 30 days, with account data removed at the latest two months after an account closes.",
    },
  ],

  triad: {
    bestAt: [
      "High-volume, repetitive paperwork where the same handful of fields matter every single time.",
      "Producing data another system can swallow. Docsumo names business systems it syncs into — NetSuite, SAP, Encompass, Epic, Guidewire — and offers spreadsheet downloads and automatic hand-off to other software.",
      "Work where a person has to be accountable for the numbers — the click-to-source check turns verifying a value into a glance instead of a re-read.",
      "Document types it already knows, so common paperwork works on day one.",
    ],
    okayAt: [
      "Document types Docsumo has never seen, until you have taught it one from your own samples.",
      "Poor scans. It straightens page orientation for you and says higher-resolution images extract more accurately, which is a polite way of saying a phone photo of a creased receipt is the hard case.",
      "Spreadsheets and other already-digital files: `.xlsx` and `.xls` upload alongside PDFs, JPGs, PNGs and TIFFs, though the platform's centre of gravity is clearly scanned paperwork.",
    ],
    avoid: [
      "Treating a high confidence score as a signature. It is the software's own estimate of its own reading — a prompt to look, never a substitute for looking.",
      "One-off documents you only need to understand once. The output is a table of fields you defined in advance, not an answer to a question, so a document whose shape you will never meet again has nowhere to land.",
      "Assuming a pre-trained document type fits your issuer. \"Bank statement\" covers a great many banks; Docsumo's own setup flow expects you to test it, correct it and retrain against your actual forms — the pre-trained version is where the work starts, not where it ends.",
    ],
  },

  starterActions: [
    {
      title: "Run your worst document first",
      whatItDoes:
        "You upload the worst-quality document you genuinely receive rather than a clean sample, then check every extracted field against the page before approving anything.",
      whyHere:
        "The trial's pages are capped, so what you spend them on decides what you learn — and because extraction quality tracks scan quality here, a clean sample answers a question you never had.",
      tweak:
        "Then run the same document type at its best quality and note the gap. That gap is your review workload, forever.",
    },
    {
      title: "Click a field and watch the page light up",
      whatItDoes:
        "Opening a processed document and clicking each extracted field in turn highlights the region of the page it was read from, so you can confirm that region really holds the number you wanted.",
      whyHere:
        "Docsumo's product pages are where the click-to-highlight behaviour is documented, and verification being one click rather than a hunt through the original is the specific thing a trial exists to test.",
      tweak:
        "Deliberately choose a document with two similar numbers on it — a subtotal and a total, a due date and an invoice date — and see which one it grabbed.",
    },
    {
      title: "Teach it one document type it does not know",
      whatItDoes:
        "You pick one form Docsumo has no pre-trained type for, gather twenty real examples of it, and train a custom type on them before deciding whether the tool fits.",
      whyHere:
        "Twenty examples is the cheapest test of whether your non-standard paperwork is reachable at all — and if you cannot find twenty, you have learned something about whether it is worth automating.",
      tweak:
        "Do this in week one. If it needs correcting, you want the correcting to happen while pages are still free.",
    },
    {
      title: "Send the output somewhere real",
      whatItDoes:
        "You process ten documents and approve them, then export the results in the format your team would really use and check that the columns line up with what the receiving system expects.",
      whyHere:
        "Extraction accuracy is the half everyone tests; the export shape is the half that breaks integrations later, and both export routes are on the trial plan, so this is checkable before any sales conversation happens.",
      tweak:
        "Try the email route too — Docsumo accepts documents as email attachments, with a total email size limit of around 25 MB.",
    },
    {
      title: "Get the quote inside the trial window",
      whatItDoes:
        "In the first few days you send Docsumo your monthly page volume and document types, asking for a written quote alongside written answers on document retention and training.",
      whyHere:
        "Because the price only exists as a quote (see Before you start), the 14-day window is also your negotiating window — and asking in week two means deciding with the trial already expiring.",
    },
  ],

  pitfalls: [
    "The accuracy headline is a vendor claim, and Docsumo's own pages do not agree with each other about it — its custom-model feature page says 90%+, its product and lending pages say 95%+. Treat either as marketing. The missing percent is not spread evenly, either: it clusters on your worst scans and your oddest layouts.",
    "Unreviewed output is the expensive failure mode. The design routes low-confidence items to a person and lets the rest flow, which means a value the software was confident about and wrong about goes straight through — into a spreadsheet, an underwriting file, a payment run — with nobody having looked at it.",
    "Setup is front-loaded and easy to under-budget in a 14-day window. You define a document type, choose or auto-detect its fields, run a test, correct the results, save, and only then process at volume. Teams routinely spend the whole trial building and never reach the accuracy question they started for.",
    "The privacy policy is dated January 2024 while the product has visibly moved on — it is now described in terms of AI agents, and the model APIs on its provider list did not exist in that form when the policy was written. A document that old may not describe what happens to your files today; ask rather than assume.",
    "The trial's ten seats invite you to hand accounts around. Docsumo describes the software adapting to reviewer corrections, so the people you invite are also the people shaping how it reads your documents. Decide who is allowed to approve before you invite anyone.",
  ],

  whereToNext: [
    { label: "Other document and PDF tools", categorySlug: "document-pdf-processing" },
    { label: "AI inside business software", categorySlug: "ai-plugins-business-software" },
    { label: "Workflow automation", categorySlug: "workflow-automation" },
  ],
};
