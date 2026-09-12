import type { PlatformTutorialData } from "./types";

export const healtheeTutorial: PlatformTutorialData = {
  slug: "healthee-getting-started",
  platformSlug: "healthee",
  title: "Getting Started with Healthee",
  tagline:
    "Ask plain questions about the health insurance you get through work — if your employer gives you the app.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-12",
  accessTier: "FREE",

  howItWorks:
    "You open its app or website and type a question about your health insurance — that typed message is your **prompt**. Zoe, its assistant, answers in plain language from your own plan's details, and a human specialist steps in when Zoe can't answer.",

  whatItIs: [
    "Healthee is a health-benefits assistant: it holds the details of the health insurance your employer gives you and answers questions in ordinary language. The assistant is called Zoe, and you will see that name far more than \"Healthee\" once you are inside.",
    "It is not a general-purpose AI; its only subject is your own coverage. A general chatbot has no idea what your plan covers, how much you have already spent on care this year, or which doctors near you your plan has a price deal with.",
  ],

  beforeYouStart: [
    "**You cannot buy this for yourself.** Healthee is sold to employers, insurance brokers and benefits administrators — never to individuals — at a quote-only price set by \"the size of the employer, the specific modules and capabilities deployed.\" Its App Store listing, published by developer Insurights Inc., puts it plainly: \"If your company offers Healthee, you can use our AI-powered app.\" So the first step is your workplace benefits portal, or your last enrollment email: look for \"Healthee\" or \"Zoe\" by name.",
    "If it does not, Healthee's employee page invites you to fill in a form and says \"We'll team up with HR to integrate with your current benefits program.\" That is a request routed to your HR team, not an account today. Meanwhile a general AI tool can read the plan PDF itself — and because a plan summary carries your name and coverage, use **Ollama**, which keeps it on your machine, or **ChatGPT** with the identifying details stripped.",
    "It costs you nothing personally: the app is free to download, and Healthee's terms of use say your employer \"is generally responsible for paying us for your access and use of the Platform.\" There is no upgrade to buy and no free-tier limit to hit.",
    "United States only, adults only: the terms say \"You must be located in the United States to be a Registrant\" and \"at least eighteen (18) years old.\" Healthee calls itself \"carrier-agnostic,\" so it is not tied to one insurer — but it still needs your employer's plan data loaded.",
  ],

  security: [
    {
      kind: "text",
      text: "The privacy question here is about what was loaded before you typed anything: your plan documents, what you are enrolled in, and how far into your deductible you are — the amount you pay yourself each year before insurance starts covering things.",
    },
    {
      kind: "list",
      label: "What Healthee says, and when it said it",
      items: [
        "Its privacy policy, last modified 27 March 2026, says it shares your information \"to your employer (our customers) in order to manage the services we provide to you,\" and that after you ask for deletion it may keep backups for up to 90 days.",
        "Its FAQ says: \"Healthee does not use protected health information (PHI) or personally identifiable employee data to train AI models.\"",
        "Its security page claims HIPAA compliance — the US law governing health information — plus **SOC 2** Type II (an audit of how a company handles customer data), ISO 27001, ISO 27017 and ISO 27018, with no audit dates published for any of them.",
      ],
    },
    {
      kind: "text",
      text: "Two Healthee pages disagree about what your employer can see. Its security page, headed \"We keep your info safe from outside parties–even your employer,\" says: \"As a processor of your information, we receive health plans from your employer. We do not transfer back any information to them.\" Its FAQ says HR teams \"can see how employees are using the platform, what questions they're asking, how they're making plan selections.\" Neither says whether that HR view is individual or pooled, and we could not establish which without an account. Until Healthee says plainly, ask Zoe what you would be comfortable asking if HR might later read the transcript.",
    },
  ],

  triad: {
    bestAt: [
      "Answering \"what will this cost me\" — the question a plan document technically answers and practically does not.",
      "Comparing the plans your employer offers at enrollment against how much care you actually expect to use.",
      "Healthee says the assistant runs around the clock and handles over 50 languages.",
    ],
    okayAt: [
      "Anything that is not your benefits. It is a specialist, not a general chatbot.",
      "The hardest problems. Healthee's FAQ says appeals, plan-change requests and \"nuanced coverage disputes\" are escalated to a human benefits specialist — the AI part stops where the painful problems start.",
    ],
    avoid: [
      "Treating its answer as the last word on your coverage. Healthee's terms of use — the binding document — say \"WE DO NOT PROVIDE ANY GUARANTEE, WHETHER EXPRESSED OR IMPLIED, REGARDING THE ACCURACY OR COMPLETENESS OF THE RESULTS\" and \"You should always verify all insurance information directly with their insurance provider,\" while its marketing page says Zoe answers \"instantly and accurately.\"",
      "Using it to decide whether you need care. Healthee's terms say the company \"is not a licensed medical professional,\" that no doctor–patient relationship is created, and that it is \"not a substitute for medical care.\"",
      "Counting on it to outlast the job. Healthee does not publish what happens to your account or history when you leave — assume it goes with the job.",
    ],
  },

  starterActions: [
    {
      title: "Find out what a scan or procedure will actually cost you",
      prompt: "How much will I pay for an MRI at [name the exact clinic or hospital]?",
      whyHere:
        "Healthee's FAQ lists this as a question Zoe is built to take, worked out against your own plan, your deductible position and live cost data rather than a list price. Ask ChatGPT the same sentence and the best it can honestly give is a national price range.",
    },
    {
      title: "Check a specific doctor before you book",
      prompt: "Is Dr. [full name] in my network, and what will a first visit cost me?",
      whyHere:
        "\"In network\" means your plan has a negotiated price with that doctor; out of network the same appointment can cost several times more. Healthee's FAQ names this as a Zoe question checked against your plan's provider list, and says the assistant can carry you into booking.",
    },
    {
      title: "Make the enrollment choice with your own numbers in it",
      prompt:
        "Should I enroll in the PPO or the high-deductible plan this year? I take [medication], see a specialist about [how many] times a year, and expect [no procedures / one procedure].",
      whyHere:
        "Healthee's FAQ lists this comparison as something Zoe answers, scored against the plans your employer actually loaded. The second half of the sentence does the work: the terms warn results can miss \"factors not captured in our questionnaire.\"",
      tweak:
        "Use the plan names on your own enrollment paperwork, and do this while your enrollment window is still open.",
    },
    {
      title: "Get the paperwork after a visit explained",
      prompt:
        "I got a statement from my insurer for a visit on [date]. Explain what each line means and what I actually owe.",
      whyHere:
        "Healthee's FAQ says employees can ask Zoe about the statement an insurer sends after an appointment. That document carries your name and a diagnosis — the exact thing this site's ChatGPT page tells you not to paste into a general chatbot. Here it is a question about data the system already holds.",
    },
    {
      title: "Tell it the things a plan document cannot know about you",
      whatItDoes:
        "Early on, give Zoe the facts in no document: your medications, the specialists you already see, any procedure planned this year, who else is on your coverage.",
      whyHere:
        "Healthee's terms refer to a questionnaire whose answers feed its recommendations, and warn your real needs \"may vary from what is described in the Results due to factors not captured in our questionnaire\" — the vendor naming its own blind spot.",
      tweak:
        "Go only as deep as you are comfortable: it lands in the same system covered by the employer-visibility question above.",
    },
  ],

  pitfalls: [
    "**Downloading the wrong app.** The free listing is \"Healthee - Smarter Benefits\", developer \"Insurights Inc.\" — Healthee's legal name, not a copycat. Anything under a different name is not it.",
    "**Assuming everyone's Healthee is the same Healthee.** Zoe is \"connected to each employer's specific plan data in real time,\" and pricing depends on \"the specific modules and capabilities deployed\" — so features a colleague raves about may not be in what your employer bought, and a thin answer means ask your benefits team, not that the tool is bad.",
    "**Using it as your record.** We could not find a published retention period for Zoe conversations; the privacy policy speaks to deletion requests and 90-day backups, not chat history. Keep the insurer's own paperwork for anything you might need to point at.",
  ],

  whereToNext: [
    { label: "Healthcare AI", categorySlug: "healthcare-ai" },
    { label: "Chat assistants you can sign up for today", categorySlug: "text-conversational-ai" },
    { label: "Tools that read a PDF for you", categorySlug: "document-pdf-processing" },
  ],
};
