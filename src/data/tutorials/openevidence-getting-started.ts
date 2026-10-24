import type { PlatformTutorialData } from "./types";

export const openevidenceTutorial: PlatformTutorialData = {
  slug: "openevidence-getting-started",
  platformSlug: "openevidence",
  title: "Getting Started with OpenEvidence",
  tagline:
    "A free AI reference for verified US healthcare professionals: ask a clinical question and get an answer that cites the medical literature. Not built for patients.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-24",
  changelogUrl: "https://www.openevidence.com/announcements",
  accessTier: "FREE",

  howItWorks:
    "You ask a clinical question in plain language — on the web or in the app. OpenEvidence searches peer-reviewed medical literature and guidelines and writes an answer with citations you can open and check. You pick how deep it goes: a quick answer in seconds, or a longer structured report that can take five minutes or more.",

  whatItIs: [
    "OpenEvidence is an AI tool for clinicians. Its terms say it is for physicians and other healthcare professionals and is not intended for use by patients or other consumers. Its user guide describes evidence-based answers to clinical questions, grounded in peer-reviewed literature, where every answer cites its sources. Typical uses it lists include quick consults, differential diagnosis, treatment options, drug information and guideline summaries.",
    "It has content agreements with major publishers: OpenEvidence's about page names NEJM, JAMA, Nature, NCCN and Cochrane. Its user guide describes three answer models — **Osler**, the fast default; **Sackett**, more thorough and may ask clarifying questions; and **Snow**, a comprehensive structured report (this replaced the older DeepConsult feature). An **EvidenceGrade** on each answer rates the strength of the evidence behind it.",
    "There's more for clinicians who sign up, including **Visits**, which records patient encounters and drafts clinical notes, and Patient Take-Homes, plain-language handouts a clinician sends to a patient. OpenEvidence's user guide says patients who receive a take-home can read it but cannot ask their own questions. If you use Visits, its terms say you must tell others in the room you're recording where the law or your organisation requires it, and let them opt out.",
    "The model choice matters more than it first appears. OpenEvidence's guide describes Osler as giving direct answers in seconds, Sackett as taking seconds to a minute and sometimes asking you to clarify, and Snow as producing a full structured report that takes five minutes or more. Matching the model to the question saves you waiting for depth you don't need.",
  ],

  beforeYouStart: [
    "**It's free for clinicians — and ad-supported.** OpenEvidence's advertising policy says it is committed to providing the service free to healthcare professionals, paid for by a limited number of clearly marked ads, and that advertisers cannot influence answers. Its user guide says all three answer models are available to verified clinicians with unlimited usage at no cost.",
    "**You'll be asked to prove you're a professional.** Its terms say registration asks for your name, email, profession, specialty and NPI number (or another licensing number), which OpenEvidence may try to verify. Its privacy policy says the service isn't intended for anyone under 18.",
    "**Not available everywhere.** OpenEvidence's terms say the service is not available in the EU, UK or EEA.",
    "**If you're not a clinician, this isn't for you.** OpenEvidence says so in its terms. Patients looking for health information should talk to their own clinician; the general chat assistants on Launchpad HQ are not a substitute for medical advice either.",
  ],

  security: [
    {
      kind: "text",
      text: "**Do not enter patient information.** Leave out names, dates of birth, record numbers, addresses, photos and any detail that could identify a patient. OpenEvidence's security page says HIPAA covered entities may choose to send protected health information under its standard Business Associate Agreement, but its terms make you solely responsible for consents and for de-identifying anything you enter. Unless your organisation has approved OpenEvidence and confirmed that agreement covers you, ask about a de-identified case instead — \"a 67-year-old with…\" works just as well.",
    },
    {
      kind: "list",
      label: "What OpenEvidence says about your data:",
      items: [
        "Its privacy policy (updated September 17, 2026) says your raw queries are confidential, that it does not train AI models on protected health information, and that it secures protected health information in compliance with HIPAA.",
        "Its terms say it may use de-identified data for research and development, and its privacy policy describes ads using cookies and pixels — but not ads based on your queries, uploads, chats or health information.",
        "It states it is SOC 2 Type II certified and encrypts data at rest.",
      ],
    },
    {
      kind: "text",
      text: "OpenEvidence's terms say it is for educational and informational purposes, is not a diagnostic service, and does not replace the clinical judgment of a qualified professional. Its acceptable use policy requires a professional to review content before it's shared with a patient, and to follow your institution's AI policies.",
    },
  ],

  triad: {
    bestAt: [
      "Fast, cited answers to focused clinical questions, with sources you can open.",
      "Summarising guidelines and comparing treatment options in a structured format.",
      "Free access for verified US clinicians, with no usage cap on its answer models.",
    ],
    okayAt: [
      "Being right every time. Its terms provide the service as-is with no accuracy warranty — check the citations.",
      "Long, complex questions. Snow is thorough but can take five minutes or more.",
    ],
    avoid: [
      "Entering identifiable patient information outside an approved organisational agreement.",
      "Using it as a patient or consumer — it isn't designed for that.",
    ],
  },

  starterActions: [
    {
      title: "Be specific",
      prompt:
        "Management of new-onset type 1 diabetes in an adult with an HbA1c of 11% and no ketoacidosis: initial insulin regimen and first-week follow-up.",
      whyHere:
        "OpenEvidence's prompting guide contrasts a vague question like \"management of T1DM\" with one that includes the key labs. Detail gets a more useful answer — and notice there's no patient identifier in it.",
    },
    {
      title: "Ask for a format",
      prompt:
        "Differential diagnosis for macrocytic anemia in adults, as a table ordered from most to least common, with the first-line workup for each.",
      whyHere:
        "Its prompting guide recommends asking for an output format, such as a table. A clinical curbside on macrocytic anemia is one of its own examples.",
    },
    {
      title: "Compare options with constraints",
      prompt:
        "Alternative treatments for acute otitis media in a child with penicillin, cephalosporin and macrolide allergies.",
      whyHere:
        "This is close to an official example of stating the outcome you want. Constraints like allergies narrow the answer to what's actually usable.",
    },
    {
      title: "Check the evidence grade",
      prompt: "Risk of Lyme disease after a tick has been attached for 5 hours.",
      whyHere:
        "OpenEvidence uses this example to show EvidenceGrade. Look at the grade and open two citations — it's the habit that makes the tool safe to rely on.",
    },
  ],

  pitfalls: [
    "**Treating an answer as the final word.** Open the cited sources, especially before acting on a dose or a rare diagnosis.",
    "**Choosing the slowest model for quick questions.** Its guide says to start with Osler and move to Sackett or Snow only for harder questions.",
    "**Pasting notes straight from a chart.** Strip identifiers first, every time.",
    "**Using it outside the US without checking.** The terms exclude the EU, UK and EEA.",
    "**Skipping the ad labels.** The free service shows marked advertisements; OpenEvidence says advertisers can't influence answers, but treat sponsored content as sponsored.",
  ],

  whereToNext: [
    { label: "More healthcare AI", categorySlug: "healthcare-ai" },
    { label: "Research & academic tools", categorySlug: "research-academic-tools" },
    { label: "Meeting & note tools", categorySlug: "meetings-notes" },
  ],
};
