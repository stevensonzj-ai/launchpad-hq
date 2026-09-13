import type { PlatformTutorialData } from "./types";

export const ai21LabsJambaTutorial: PlatformTutorialData = {
  slug: "ai21-labs-jamba-getting-started",
  platformSlug: "ai21-labs-jamba",
  title: "Getting Started with AI21 Jamba",
  tagline:
    "AI21's Jamba files are free to download and run yourself — which is just as well, because the company's own sign-up page no longer opens.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-13",
  changelogUrl: "https://docs.ai21.com/changelog",
  accessTier: "FREE",

  howItWorks:
    "You pick one of the published Jamba files by size, download it, and open it in an app on your computer that can load it. After that you type into that app's message box and read the reply there, and you swap in a different file to try a bigger or smaller one.",

  whatItIs: [
    "Jamba is a family of **open-weight** AI models from AI21 Labs — open-weight meaning the model file itself is published, so you can run it yourself. A **model** is the AI \"brain\" that does the actual thinking, and here you get the brain rather than a subscription to somebody else's copy of it.",
    "Its distinguishing design is that Jamba is a hybrid: it mixes the usual transformer machinery with a different technique called Mamba, and AI21 built it that way to keep very long inputs cheap to process.",
    "Where it sits for a beginner: this is the model you pick when you want a long-document reader running on your own hardware, under a licence you can read, rather than a chatbot you sign into.",
  ],

  beforeYouStart: [
    "**The front door is shut, and this is the first thing to know.** AI21's sign-up page, its playground and its key console all sit on `studio.ai21.com`, and every one of those addresses redirects to AI21's marketing homepage as of our last check — including the \"Start Now for FREE\" button on AI21's own pricing page. Whether people who already hold an AI21 account still reach a console some other way is not something we can see from outside; AI21's own service address does still answer requests, so it may well be running for existing customers, but with the sign-up page closed there is currently no visible way for a new reader to get a key. AI21's homepage now advertises two enterprise products, neither of them Jamba, and asks you to contact sales. The way in is not to sign up; it is to download the files from AI21's Hugging Face account, which needs no AI21 account at all.",
    "You will not be asked for money or a card, because you are downloading a file rather than buying access to a service. AI21's pricing page currently advertises $10 of credit for 7 days while its documentation says $10 for three months; since the sign-up button behind both leads to the homepage, treat neither as something you can act on. The only route where a bill starts is going through a cloud provider's own account, and that is a detour rather than the normal path.",
    "The machine you already have is the constraint here, rather than any plan or allowance.",
    "You will be doing this inside a general-purpose local-AI app, not an AI21 one, because AI21 does not ship a desktop app. If you have never loaded a model onto your own computer before, that skill is the actual prerequisite here — pick it up on a tool built for it first and come back; Ollama and the rest of the Local & Open-Source AI category exist for exactly that step.",
    "Which file you download decides your rights, and the two halves of the family differ. The newer Jamba2 files are Apache 2.0 — permissive, commercial use included. The older Jamba Mini and Large 1.7 files are under AI21's own Jamba Open Model License (last updated 25 August 2024), which is royalty-free and revocable, and which cuts off commercial use once you or your affiliates pass fifty million US dollars in annual revenue. Jamba Reasoning 3B is listed as Apache 2.0, though its model card also names AI21's own Jamba licence — worth reading the file's own licence text before you build anything commercial on it.",
  ],

  gettingSetUpSafely: {
    officialSource:
      "Download only from `huggingface.co/ai21labs` — that is AI21's own account, and it is the only source where the file you get is the one AI21 published. There are dozens of Jamba re-uploads on Hugging Face under other people's usernames; some are legitimate community work and some are modified, and from the outside they look alike.",
    body: [
      "Check the file size against the free space and spare memory on your computer before you start the download, not after. These are multi-gigabyte files and the sizes differ enormously between the small and large members of the family.",
      "Understand who made the small-file version you are about to use. AI21's own local-inference page states that it \"does not distribute or support GGUF builds and cannot verify the accuracy of third-party conversions\" — GGUF being the repackaged format most desktop apps need. The one exception is Jamba Reasoning 3B, where AI21 publishes that repackaged build itself; for the Jamba2 files, every such build on Hugging Face today comes from someone other than AI21.",
      "One reply back is your \"it worked\" checkpoint. If the app loads the file and answers a short question, the setup is fine and everything after that is a question of which file, not whether.",
    ],
    vendorDocsUrl: "https://docs.ai21.com/docs/local-inference",
  },

  security: [
    {
      kind: "text",
      text: "Nothing you type reaches AI21 when you run a Jamba file on your own machine, so the advice about never pasting anything sensitive into a chatbot simply does not apply to the normal way of using this. What replaces it is a supply-chain question: you are installing a multi-gigabyte file that someone built, and for most Jamba builds that someone is not AI21.",
    },
    {
      kind: "list",
      label: "If you do route anything through AI21's own service",
      items: [
        "AI21's privacy policy, last updated 2 August 2026, states that it does not use your inputs or outputs to train its foundational or generally available AI models — with carve-outs for anything separately agreed in writing, or needed to operate the service.",
        "AI21 Labs Ltd. names itself the data controller and gives its principal place of business as Tel Aviv, Israel. If where your data is handled matters to you, that is the answer.",
        "AI21's website terms of service still carry a \"Last Updated\" date of 19 November 2024 and say plainly that they do not cover the purchase or licensing of AI21's actual products. So the document that governs your use of a model is the licence attached to the specific file you downloaded, not the terms on the website.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Reading one enormous input in a single pass — AI21 quotes a 256K **context window** (how much text the model can hold in mind at once) on every published size, including the smallest",
      "Running on hardware you already own, without a subscription, a key or a monthly ceiling",
      "Nine languages AI21 names outright — English, Spanish, French, Portuguese, Italian, Dutch, German, Arabic and Hebrew",
    ],
    okayAt: [
      "General chat quality, which is a function of which size you can actually run",
      "Being served for you by somebody else — the managed options are thin and behind the current release",
    ],
    avoid: [
      "Amazon Bedrock as your route to \"current Jamba\" — Bedrock's AI21 listing is Jamba 1.5 Large and Jamba 1.5 Mini, and AI21's own deprecation table gives 2025-05-06 as the date it retired 1.5 from its platform. You would be building on a version its maker stopped running over a year ago.",
      "Betting a long-lived project on the line continuing to ship. Nothing on AI21's Hugging Face account has been updated since February 2026 — which is a reason to treat the line as a set of files you have already downloaded rather than a roadmap you are joining.",
      "Reaching for it as a general chatbot replacement. You would be comparing a small file on your own laptop against a frontier cloud model, and it will lose that comparison; what you came for is what it does with very long inputs on modest hardware.",
    ],
  },

  starterActions: [
    {
      title: "Start with the 3B file, not Mini",
      whatItDoes:
        "Downloads AI21-Jamba2-3B — the size AI21 describes as runnable \"right on their own devices, including iPhones, Androids, Macs, and PCs\" — and gets a first reply back on ordinary hardware before you commit to anything larger.",
      whyHere:
        "AI21 publishes Jamba2 at exactly two sizes, 3B and a 52B-total Mini, with nothing in between, so the choice is genuinely binary rather than a ladder you can climb one rung at a time. Qwen publishes a graded run of sizes from under a billion parameters upward.",
    },
    {
      title: "Give it one document that is far too long for anything else",
      whatItDoes:
        "Load a book-length file or a year of accumulated notes into a single conversation and ask a question that can only be answered by having read all of it.",
      whyHere:
        "The hybrid Mamba design exists to stop memory use ballooning as the input grows, which is why AI21 quotes the same 256K figure on the 3B file as on the 398B one — the long-context claim is not reserved for the size you cannot run. Meta's Llama 3.2 3B is a pure transformer whose long-context behaviour is not the stated goal of its architecture.",
    },
    {
      title: "Work in Hebrew or Arabic and compare",
      whatItDoes:
        "Ask the same question twice, once in English and once in Hebrew or Arabic, and see how far the quality actually diverges.",
      whyHere:
        "AI21's documentation names nine officially supported languages and Hebrew and Arabic are both on that list, which follows from AI21 Labs being a Tel Aviv company rather than being an afterthought bolted on for coverage. Mistral's small open models are marketed on a European language set that does not name Hebrew.",
    },
    {
      title: "Check who repackaged the file before you trust the app that opens it",
      whatItDoes:
        "On Hugging Face, look at the account name on the small-file build your desktop app is about to pull, and prefer `ai21labs` where it exists.",
      whyHere:
        "Which Jamba you can open in a desktop app depends on who repackaged it, and AI21 has said in writing that it will not vouch for most of them. Meta makes no such disclaimer about Llama conversions.",
    },
  ],

  pitfalls: [
    "Following AI21's own quick-start. It tells you to sign in to AI21 Studio, open Settings and create a key, at addresses that no longer open. AI21's documentation also says you can try Jamba in a playground in your browser, but the address it gives redirects to AI21's homepage too, so we could not confirm that any such page is reachable today.",
    "Assuming \"Jamba\" names one thing. Jamba 1.5, 1.6 and 1.7, Jamba Reasoning 3B and Jamba2 are separate releases with different licences and different retirement dates, and AI21's live pricing page still quotes rates for versions its own deprecation table has already retired. Match the version in any guide you read against what is actually published today.",
    "Downloading Jamba2 Mini because it sits next to Jamba2 3B in the same collection and sounds small. \"Mini\" is 52 billion total parameters — a download and a memory footprint sized for a server, next to a sibling built for a phone.",
    "Taking the first \"jamba\" hit in a local app's model browser. Ollama's library has no official AI21 entry; the Jamba results there are community uploads under individual usernames, with the download counts of a hobby project rather than an official release.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "AI APIs & Developer Services", categorySlug: "ai-apis-developer-services" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
  ],
};
