import type { PlatformTutorialData } from "./types";

export const naverHyperclovaXCueTutorial: PlatformTutorialData = {
  slug: "naver-hyperclova-x-cue-getting-started",
  platformSlug: "naver-hyperclova-x-cue",
  title: "Getting Started with Naver HyperCLOVA X",
  tagline:
    "Korea's home-grown AI — now built into Naver Search instead of living in a chatbot of its own.",
  archetype: "prompts",
  lastReviewedAt: "2026-09-13",
  accessTier: "FREE",

  howItWorks:
    "You go to Naver's search page and type a question into the same box you would use for a normal search — in Korean. Instead of only a list of links, a written answer comes back, and you can reply to it in the box to narrow things down, the way you would in a conversation.",

  whatItIs: [
    "HyperCLOVA X is Naver's own family of AI **models** (the AI \"brain\" that does the actual thinking), built in South Korea by the company that runs the search engine and portal most Koreans use instead of Google.",
    "Until spring 2026 Naver ran it as two separate products — a chatbot called CLOVA X and an AI search tool called Cue: — and closed both on 9 April 2026, folding the technology into ordinary Naver Search instead.",
    "What it does that nothing else does as well is answer questions about Korean life — shops, neighbourhoods, places, reservations — from Korean-language blog and café posts that other search engines index thinly or not at all.",
    "Naver also publishes smaller versions of the same model family, called HyperCLOVA X SEED, as free downloads anyone can run on their own computer.",
  ],

  beforeYouStart: [
    "**This is a Korean-language service, and that is the real entry barrier — not the price.** The answers are written in Korean and built from Korean web content. You can type English and get something back, but you are using it against the grain. Naver's search page is currently reachable from outside Korea, though the experience is built for people searching in Korean about Korea. If what you actually want is a general-purpose assistant in English, start with a Text & Conversational AI tool from this site and come back to Naver when the question is specifically about Korea.",
    "Almost every guide you will find describes something that no longer exists. CLOVA X, the standalone chatbot at its own web address, and Cue:, the standalone AI search page, were both switched off on 9 April 2026 (Cue: had already stopped taking new sign-ups on 2 March). If a tutorial tells you to visit a separate site to chat, it predates that date and the site is gone.",
    "There is nothing to buy. Naver Search is free, and the conversational AI answers went from a members-only beta to all users on 26 June 2026, so you will not need to pay to try any of this. The paid product carrying the HyperCLOVA X name is CLOVA Studio on Naver Cloud Platform — a developer and business tool that bills in Korean won by how much text it reads and writes, sold to companies rather than to people learning AI.",
    "Reading an answer is one thing; acting on it is another. The feature is built to carry you through to a booking or a purchase, and that part runs on a signed-in Naver account. Whether the AI answers themselves need you to be logged in is something you may need to check once you are on the page.",
    "If you would rather not deal with Naver at all, the downloadable SEED models are the way in — but they are model files, not an app, so you need a program that runs them and a computer with enough memory. The smallest is around half a billion **parameters** (a rough measure of a model's size — more is smarter but heavier) and runs on an ordinary laptop; the 32-billion one does not.",
  ],

  security: [
    {
      kind: "text",
      text: "Naver is a South Korean company and this is South Korean infrastructure — your questions are handled under Korean law and Korea's privacy regulator, not your own country's. Naver's own model licence makes the point in writing: it is governed by the laws of the Republic of Korea and disputes go to arbitration in Seoul. Nothing sinister in that; it just means the usual escalation route you have with a US or EU service is not the route here.",
    },
    {
      kind: "list",
      label: "What changes once you sign in",
      items: [
        "Naver's launch material describes the AI answers reaching into shopping, Places, maps and real-time reservations",
        "The payment side sits behind Korean identity verification, which is a much heavier disclosure than an email-and-password sign-up",
        "Treat a Naver account like the portal account it is — mail, payments, maps and search history under one login, not a throwaway for one AI feature",
      ],
    },
    {
      kind: "text",
      text: "Download the SEED models instead and the picture inverts completely: the files run on your computer and nothing you type leaves it. The risk moves to where the file came from. The official source is the naver-hyperclovax organisation on Hugging Face; the ready-made builds circulating under individual usernames in local-model catalogues are convenient re-uploads by other people, not Naver.",
    },
  ],

  triad: {
    bestAt: [
      "Questions about Korean places, shops and reservations",
      "Reading and writing Korean naturally, including the difference between formal and casual register",
      "Getting a written answer at the top of an ordinary search instead of working through a page of links",
    ],
    okayAt: [
      "English. Answers come back, but you are using it against the grain",
      "General world knowledge that has nothing to do with Korea — you are paying a language tax for no benefit",
      "The smallest SEED downloads — genuinely usable and genuinely simple; expect help, not brilliance",
    ],
    avoid: [
      "Building anything on the free SEED downloads without reading the licence first. It is published openly but it is not open-source in the ordinary sense: Naver's own licence requires you to display \"Powered by HyperCLOVA X\" in your interface, to prefix any model you derive from it with \"HyperCLOVA X\", and to pass its Prohibited Use Policy down to anyone you share it with. It also reserves the right to withhold a licence entirely — at Naver's sole discretion — if your service passes 10 million monthly active users or \"directly competes with any product and service provided by NAVER.\"",
      "Anything you built or bookmarked against CLOVA X or Cue:. There is no drop-in replacement for either.",
      "Reading Korean legal, medical or contractual material through this and then through a browser translator. You get a Korean answer summarising Korean sources, and a non-Korean reader is then two lossy steps away from the original wording.",
    ],
  },

  starterActions: [
    {
      title: "Ask it something only Korean sources know",
      prompt:
        "서울 성수동에서 노트북 들고 오래 앉아 있기 좋은 카페 세 곳 추천해줘. 각각 이유도 한 줄씩 써줘.",
      whyHere:
        "Naver's June 2026 launch wired the answer box straight into its own Places, blog and café data, so the recommendations are assembled from reviews Koreans wrote inside Naver. Perplexity, searching the open web, cannot reach most of that material because it was never indexed outside Naver in the first place.",
      tweak:
        "In English, that asks: Recommend three cafés in Seongsu-dong, Seoul where I can sit for a long time with a laptop. One line on why for each. Swap the neighbourhood and the activity — 헬스장 (gym), 미용실 (hair salon), 병원 (clinic) all sit on the same data.",
    },
    {
      title: "Make it do the Korean, not you",
      prompt:
        "아래 영어 메시지를 한국어로 바꿔줘. 집주인에게 보내는 정중한 존댓말로, 네 문장 이내로: \"[paste your message]\"",
      whyHere:
        "Naver publishes this model's scores against Korean-specific benchmarks — KMMLU, HAERAE, CLIcK — rather than the English suites most vendors quote, and politeness register is precisely the axis those measure. ChatGPT will also produce Korean, but nobody publishes its 존댓말 accuracy as a headline number.",
      tweak:
        "In English, that asks: Rewrite the English message below in Korean — polite formal register, for a landlord, four sentences or fewer. Change the recipient — 상사에게 (to a boss), 친구에게 (to a friend) — and watch the register move.",
    },
    {
      title: "Narrow it in the box, because there is nothing to click",
      prompt:
        "방금 답변을 세 가지 조건으로 다시 좁혀줘: 예약 가능, 주차 가능, 2025년 이후 후기만.",
      whyHere:
        "Naver retired its \"related search terms\" strip on 30 April 2026, three weeks after closing CLOVA X — the sideways nudge that used to sit under every result is gone, so refining a Naver search is now something you type rather than something you click. Google still hands you related searches under the page; here the box is the only lever you have.",
      tweak:
        "In English, that asks: Narrow that last answer by three conditions — takes reservations, has parking, reviews from 2025 or later. Ask it to show what it dropped and why — that is where you find out how thin the underlying set was.",
    },
    {
      title: "Take the model home instead",
      whatItDoes:
        "The SEED versions are free **open-weight** downloads — the model file itself is published, so you can run it yourself.",
      whyHere:
        "This is the only route to HyperCLOVA X that needs no Naver account, no Korean phone number and no Korean-language interface, and it exists because Naver ships the weights with prepared builds listed for llama.cpp, Ollama and LM Studio on the model's own page. Google's Korean-capable Gemini models cannot be downloaded at all, at any size.",
      tweak:
        "Start at the 1.5-billion size. If your machine handles it comfortably, step up; see this site's Local & Open-Source AI page for how to run model files at all.",
    },
  ],

  pitfalls: [
    "Downloading the wrong app. \"네이버 클로바 / NAVER CLOVA\" in the app stores is the old smart-speaker companion app, not this. The AI answers live in the regular Naver app and on naver.com.",
    "Reading the generated summary and skipping what sits under it. Those sources are Naver blog and café posts — user-written, and a well-known share of the restaurant and product ones are sponsored. The summary does not separate a paid post from an unpaid one.",
    "Assuming the download is the same model as the search box. Naver describes the search AI as running on a model built on HyperCLOVA X and then tuned on its own service data; the SEED downloads are the small open siblings. A local SEED model feeling weaker than the search answers is expected, not a bad install.",
  ],

  whereToNext: [
    { label: "Local & Open-Source AI", categorySlug: "local-open-source-ai" },
    { label: "Text & Conversational AI", categorySlug: "text-conversational-ai" },
    { label: "Research tools", categorySlug: "research-academic-tools" },
  ],
};
