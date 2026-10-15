import type { PlatformTutorialData } from "./types";

export const deepseekTutorial: PlatformTutorialData = {
  slug: "deepseek-getting-started",
  platformSlug: "deepseek",
  title: "Getting Started with DeepSeek",
  tagline: "A capable chatbot from a Chinese AI lab — easy to start, with one decision to make first: where your words are stored.",
  archetype: "prompts",
  lastReviewedAt: "2026-10-15",
  changelogUrl: "https://api-docs.deepseek.com/updates",
  accessTier: "FREE",

  howItWorks:
    "You type a prompt (the message you type) into the chat box on DeepSeek's website or app, and it writes back in plain language. On harder questions it shows its working first, folded away. Reply to steer it, correct it, or ask again.",

  whatItIs: [
    "DeepSeek is a general-purpose AI chatbot made by Hangzhou DeepSeek Artificial Intelligence Co., Ltd., a research company based in China. You can use it in a web browser, on your phone, or through a desktop app, and it handles the everyday jobs you would expect: answering questions, writing and rewriting, working through problems step by step, and reading photos and files you upload.",
    "What sets it apart is less what it can do than who makes it and what they publish. DeepSeek releases its model (the AI \"brain\" that does the actual thinking) for anyone to download, under a permissive licence — so DeepSeek's AI can also be run on someone's own hardware, entirely outside DeepSeek's servers. That is unusual for a chatbot this capable, and it is why DeepSeek gets talked about far beyond its own app.",
    "The desktop option, Harness Desktop, is a different kind of tool: an open-source assistant, currently in public preview, that DeepSeek describes as working with documents, spreadsheets and code and running recurring tasks for you. You do not need it to start; the chat is the beginner's entry point.",
    "Developers can also connect their own software to DeepSeek through its API (a way for programs to talk to each other without a person clicking), paid for by use. That is a separate product at platform.deepseek.com, with its own documentation, and nothing on this page requires it. Current API prices are in the Quick facts panel beside this tutorial.",
  ],

  beforeYouStart: [
    "**Decide what you are willing to send to China before your first message.** DeepSeek stores your data there, under Chinese law. That does not make casual use dangerous, but it should shape what you type — the security section below covers it.",
    "Getting in is quick: go to chat.deepseek.com in a browser, or install the DeepSeek app, and register with an email address or a third-party sign-in, which is what DeepSeek's terms describe. The terms say the service is mainly intended for adults, and anyone under 18 should use it only with a parent or guardian's consent.",
    "Check the Quick facts panel beside this page for current pricing before you rely on DeepSeek for anything regular. The only prices this site has verified are for the developer API, which charges per use — chat-app users do not need to touch it.",
    "Expect the occasional \"server busy\" moment. DeepSeek runs a public status page at status.deepseek.com; if replies stall or error out, check there before assuming the problem is your connection or your account.",
  ],

  security: [
    { kind: 'text', text: "DeepSeek's privacy policy (last updated 10 February 2026) states that it directly collects, processes and stores your personal data in the People's Republic of China, and its terms of use (last updated 27 March 2026) are governed by the laws of mainland China, with disputes heard by a court near the company's registered office in Hangzhou. The policy also says DeepSeek may share data to comply with legal process or government requests. You do not need to be alarmed to take that seriously: it simply means your chats sit under a different legal system from the one you probably live in, with fewer practical ways for you to challenge how they are used." },
    { kind: 'list', label: "What the same policy says about your chats:", items: [
      "DeepSeek's privacy policy says it uses your data to train and improve its models, and lists opting out of that as one of your rights. It describes no switch for this in the app, and it does not spell out how to make that request, so read the current policy before assuming you can opt out.",
      "The policy says DeepSeek keeps your personal data for as long as you have an account, and longer where it needs to for legal or contractual reasons.",
    ] },
    { kind: 'list', label: "Before you type anything:", items: [
      "Keep work material out of it unless your employer has said yes. Some organisations restrict it outright — Texas, for example, banned DeepSeek on state government devices in January 2025.",
      "Leave out anything that identifies you or other people: full names with addresses, ID or account numbers, health details, photos of documents.",
      "Deleting your account is permanent. DeepSeek's policy says a deleted account cannot be reactivated and its content cannot be retrieved — so export or copy anything you want to keep first.",
    ] },
    { kind: 'text', text: "If you like DeepSeek but not where the chats are stored, its published models are the way round it: they can be run on hardware you control, where nothing leaves your machine. That is a heavier lift than signing in — the local and open-source AI tools on this site are the place to start." },
  ],

  triad: {
    bestAt: [
      "Working through a problem step by step — maths, logic, planning — with its reasoning available for you to open and check rather than hidden.",
      "Everyday writing, rewriting and explaining, at a level that holds up beside the best-known chatbots.",
      "Moving between Chinese and English.",
    ],
    okayAt: [
      "Reading photos and files — DeepSeek's app notes say it has handled images since mid-2026 and that uploads were improved in July, but this is newer than its text work.",
      "Being available when you want it — its own status page records outages of the chat and API, including one on the day this page was researched.",
    ],
    avoid: [
      "Anything sensitive that you would not want held on servers in China under Chinese law — see the security section above for what that covers.",
      "Questions on politically sensitive topics involving China. A September 2025 US government evaluation (NIST's CAISI) found earlier DeepSeek models repeated inaccurate or misleading Chinese Communist Party narratives about four times as often as US reference models. That study predates the current model, so treat it as a reason to cross-check rather than a settled verdict.",
      "Posting its writing without saying where it came from — DeepSeek's own terms require you to label published output as AI-generated (more on that in the starter prompts).",
    ],
  },

  starterActions: [
    {
      title:
        "The worked problem (open the thinking)",
      prompt:
        "A recipe serves 4 and needs 300 g of flour, 2 eggs and 250 ml of milk. I want to make it for 7 people, but I only have 3 eggs. Work out the new amounts, tell me whether my eggs are enough, and suggest a fix if they aren't. Show the steps.",
      whyHere:
        "DeepSeek shows its working before the answer and, since its September 2026 app update, folds that working away automatically. Open it. When an answer is wrong, the mistake is usually visible in that section — and you can quote the exact step back ('your step 3 rounds too early') instead of just saying 'that's wrong.'",
      tweak:
        "Swap in any everyday calculation — a budget split, a travel time, a dosage chart you then double-check against the label.",
    },
    {
      title:
        "The post you are allowed to publish",
      prompt:
        "Draft a short, friendly post (under 120 words) announcing that our neighbourhood book swap is moving to the library on Saturdays from 10am. Give me two versions — one casual, one more formal — and end each with a one-line note that it was drafted with AI help.",
      whyHere:
        "DeepSeek's terms (section 3.1) require anyone who publishes its output to label it as AI-generated, and say the app adds its own AI labels that you may not remove. ChatGPT's terms carry no general labelling requirement, so this is a DeepSeek-specific habit worth building from your first post.",
      tweak:
        "If the post includes names, dates or claims, check them yourself — the same terms make you responsible for the accuracy of what you publish.",
    },
    {
      title:
        "The two-language check",
      prompt:
        "Translate this into natural, polite Simplified Chinese, then translate your Chinese back into English so I can check nothing changed: '[paste a short message — for example, a note to a neighbour or a question for a shop]'. Point out any phrase that doesn't translate cleanly.",
      whyHere:
        "DeepSeek is built in Hangzhou, and its own Chinese App Store listing names translation as one of five headline uses alongside search, writing, reading and problem-solving. The round trip back into English is the part that protects you: it shows you what the other person will actually read.",
      tweak:
        "Try any language pair. Keep the pasted text free of personal details — see the security section.",
    },
  ],

  pitfalls: [
    "**Only download from DeepSeek's own pages.** Search results include look-alike sites on other domains (for example deepseek.it.com) hosting copies of DeepSeek's documents. The real addresses are deepseek.com and chat.deepseek.com, and the official app is published by Hangzhou DeepSeek Artificial Intelligence Co., Ltd. If in doubt, search your phone's app store for that publisher name.",
    "**The thinking section is not the answer.** It is the model working things out, and it can wander, contradict itself or abandon ideas before the final reply. Read the final answer as the answer; open the thinking only when you want to check how it got there.",
  ],

  whereToNext: [
    { label: "Run AI models on your own computer", categorySlug: "local-open-source-ai" },
    { label: "Other chatbots to compare", categorySlug: "text-conversational-ai" },
    { label: "AI from around the world", categorySlug: "international-regional-ai" },
    { label: "AI APIs for developers", categorySlug: "ai-apis-developer-services" },
  ],
};
