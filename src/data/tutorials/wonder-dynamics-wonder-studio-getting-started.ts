import type { PlatformTutorialData } from "./types";

export const wonderDynamicsWonderStudioTutorial: PlatformTutorialData = {
  slug: "wonder-dynamics-wonder-studio-getting-started",
  platformSlug: "wonder-dynamics-wonder-studio",
  title: "Getting Started with Autodesk Flow Studio (formerly Wonder Studio)",
  tagline:
    "Turn a video of a real person into a scene starring an animated character — no motion-capture suit, no 3D software on your own computer.",
  archetype: "pick-and-setup",
  lastReviewedAt: "2026-09-12",
  changelogUrl: "https://help.wonderdynamics.com/release-notes/",
  accessTier: "FREE",

  howItWorks:
    "You upload a video of someone moving, pick a 3D character — a digital figure built in 3D software — to stand in for them, and the site processes the clip. A while later the shot comes back with your character doing what the person did. Adjust the settings and run it again until it looks right.",

  whatItIs: [
    "Autodesk Flow Studio takes an ordinary video of a person and replaces them with a 3D character that copies their movement, their position in the frame and, to a point, their expression. It was called Wonder Studio until Autodesk — the company behind AutoCAD and Maya — bought its maker, Wonder Dynamics, and renamed it. The old name is still on the old website, the documentation site and nearly every tutorial video; it is the same product.",
    "It is built for someone who has footage and an idea but no motion-capture stage and no visual-effects artist. What comes back is not only a finished clip but the raw material a 3D program expects.",
    "That output shape is the real fork in the road. Runway's performance-transfer tools hand you a finished video and stop there. Flow Studio hands you parts — a gift if you are heading into Blender, Maya or Unreal afterwards, overkill if you only wanted something to post.",
  ],

  beforeYouStart: [
    "You can still sign up, and there is still a free tier — but not where the old links send you. Since 12 August 2025, all new sign-ups and purchases go through Autodesk: start at `autodesk.com/products/flow-studio/overview` and use the Compare page's \"Access now\". The original wonderdynamics.com site is still up, still has a \"Get Started\" button, and carries no notice that anything has changed. Subscriptions bought on Wonder Dynamics before that date do not renew automatically.",
    "**You bring two things: a video, and a character.** The video has to be an .mp4 or .mov, no more than two minutes long, and on the free tier under 100MB. The character is the harder half: Flow Studio expects a rigged 3D character file (.blend or .fbx) posed with the arms straight out in a T shape. Building one is a separate craft and this page does not teach it — if you do not have one, the built-in Templates are the way in.",
    "The free tier is real but small: around 300 **credits** (the platform's unit of spend — each thing you make costs some) a month, the finished video capped at 720p, a **watermark** (a mark on generated output identifying it as AI-made), one actor tracked per project, three custom characters and 1GB of storage. Autodesk's own Flow Studio terms price 12,000 credits at 600 seconds of full character replacement — roughly fifteen seconds of finished shot for a free month, or around seventy-five seconds if you take only the movement data and skip the render. Autodesk moved to \"more granular pricing controls per model and configuration\" in August 2026, and that rate is published for a paid entitlement rather than the free tier, so treat it as a ballpark and check your own credit cost before running a job. You would move to a paid plan — Lite was cut to around $10 a month when the free tier launched, and prices may well have moved since — the moment you want a second actor, a clean 1080p export, or more than a test's worth of footage.",
    "It runs in a browser, and only in Chrome or Safari — the documentation says it is \"not yet optimized for mobile browsers\". Your own computer's power is irrelevant; the work happens on Autodesk's servers.",
  ],

  security: [
    {
      kind: "text",
      text: "The upload here is video of real people, and that changes the question. Wonder Dynamics' terms of service say you keep ownership of what you upload and of what comes back: \"you shall retain all rights, title and interest in and to the User Content and Processed Content.\" The same terms grant the company a \"perpetual, irrevocable, nonexclusive, royalty-free and fully paid, worldwide license\" to use processed content \"for Wonder's internal development purposes, including, without limitation, improving and enhancing Wonder's AI models\" — limited to \"an anonymized and aggregated way.\" No opt-out switch is named in the public terms.",
    },
    {
      kind: "list",
      label: "Three things worth settling before your first upload",
      items: [
        "Get the person in the footage to agree first. Their face and the way they move are both in that file, and both go to a cloud service processed in the United States.",
        "Know which terms you accepted, because there are two sets. Signing up now runs through Autodesk, whose General Terms were last updated 30 March 2026 — but you also end up with a Wonder Dynamics account governed by its own, undated terms of service, and it is those that carry the AI-improvement clause above. Autodesk's Flow Studio special terms (dated 8 December 2025) say they \"take precedence over any terms You may be required to accept during Wonder Dynamics account creation\", but that sentence sits inside a section about a paid Media & Entertainment Collection entitlement, so it may not cover a free sign-up. If your footage is sensitive, read both before you upload.",
        "Assume uploaded footage stays. We could not find a retention period for uploaded video stated anywhere in the public terms or privacy policy, and nothing documents that deleting a project deletes the file.",
      ],
    },
  ],

  triad: {
    bestAt: [
      "Replacing a single actor in a single-camera shot with your own 3D character — no motion-capture suit, no stage, no markers on anyone's clothes.",
      "Pulling reusable movement out of ordinary footage — body and hand tracking exported as an FBX file, which Blender, Maya and Unreal all read.",
      "Producing the supporting pieces of a visual-effects shot automatically: the frame with the original actor erased, a record of how the camera moved, and the new character on its own layer.",
    ],
    okayAt: [
      "Faces. Transferring a facial performance needs a character built with the right facial controls, and the documentation says accessories and facial hair \"will degrade the accuracy of the expression.\"",
      "Anything long or complicated. On top of the two-minute cap there is a ceiling of 15 shots per upload, and a video cannot be trimmed once it is in Flow Studio — so you edit first, elsewhere, and upload a finished cut.",
      "Close-ups. The docs say \"extreme close-up shots, where very little of the actor's body is visible, might not process properly.\"",
    ],
    avoid: [
      "Shots where the actor touches anything. Autodesk states it plainly: \"character-object and character-character interactions are not supported\" — a handshake, a prop, a doorknob, two people embracing.",
      "Shots where something passes in front of the actor. Occlusion has only \"partial support\", and a foreground object is not put back in front of the new character, so your character walks through the table rather than behind it.",
      "Footage you have already cut with fades, wipes or spins. Only hard cuts are supported; the docs say anything else produces artifacts.",
      "Loose or dark costume. The documented advice is \"tight-fitting, bright and colorful clothing\" — a hoodie or a long coat is working against the tracker, not with it.",
    ],
  },

  starterActions: [
    {
      title: "Run a Template before you spend anything",
      whatItDoes:
        "Opens one of the built-in example projects: it already contains footage and one of Autodesk's own characters, and finishes far faster than a normal job.",
      whyHere:
        "Templates are pre-processed and run on the supplied characters, which the documentation says lets you \"generate results without using up render time\" — the only way to see what finished output looks like before the month's credits are gone.",
      tweak:
        "While you are in there, look at the list of export elements — knowing which are separate downloads changes what you would go out and shoot.",
    },
    {
      title: "Shoot ten seconds the way the documentation asks for",
      whatItDoes:
        "One person, full body in frame, against a background they do not overlap with, in even light and with as little motion blur as you can manage.",
      whyHere:
        "Flow Studio publishes a ranked list of which body parts its tracker most needs to see — head first, then legs, then hips and torso, then arms. Framing decided before you press record is worth more here than anything you can adjust afterwards.",
      tweak: "The docs' own words are \"shoot wider, then crop in.\"",
    },
    {
      title: "Take the movement only, and skip the character",
      whatItDoes:
        "Runs the clip through AI Motion Capture mode, which returns a file of body and hand movement instead of a finished video. You apply that movement to a character inside Blender, Maya or Unreal.",
      whyHere:
        "By the credit rate quoted above, movement-only processing costs roughly a fifth of what full character replacement costs on the same footage. It is also the one mode that does not require a Flow Studio-ready character at all.",
      tweak:
        "Choose USD rather than FBX if you want every bone: the docs say FBX delivers \"only retargeted bones\" while USD delivers all of them.",
    },
    {
      title: "Put your own character through the validator before you upload it",
      whatItDoes:
        "Installs Autodesk's free Blender or Maya add-on — from the Downloads page on the official help site, not a search result — and runs the same check the website runs, on your own machine and instantly.",
      whyHere:
        "Flow Studio will not take an arbitrary 3D file: it wants a rig whose name ends in the tag BODY, at least one bone representing the hips, a T-pose, and under 1,500,000 polygons. Failing that check after an upload costs you a round trip; failing it locally costs nothing.",
      tweak:
        "The Downloads page also has example characters for Blender, Maya and FBX — copy one's bone naming rather than guessing.",
    },
    {
      title: "Use the Canvas to fix a frame, not to make a film",
      whatItDoes:
        "Canvas is a separate workspace of connected boxes where you can send a rendered shot and then generate or edit still images and video with hosted generation tools.",
      whyHere:
        "It is the one part of Flow Studio where you type a description of what you want instead of uploading it, and it sits on the same canvas as your rendered shot, so a background fix never leaves the project.",
      tweak:
        "The documentation's own advice for writing those descriptions: describe one main object or character per request, use \"clear, literal descriptions instead of cinematic or narrative language,\" and for anything you intend to animate later, ask for a neutral pose with the limbs separated. We could not confirm from the public pages whether Canvas is included on the free tier or what each generation costs in credits — check the cost the interface shows you before you run one.",
    },
  ],

  pitfalls: [
    "Forgetting to tick an export before you process. The docs are blunt about it: enable everything you want \"before starting processing, as they will not be accessible afterward.\" Missing one means running the whole job — and paying the credits — a second time.",
    "Following a tutorial made under the old name. Almost every video tutorial you will find says \"Wonder Studio\", and most predate the dashboard redesign of August 2026 — the workflow is broadly the same, the screens are not.",
  ],

  whereToNext: [
    { label: "Video creation and editing", categorySlug: "video-creation-editing" },
    { label: "Gaming and creative AI", categorySlug: "gaming-creative-ai" },
    { label: "Image generation and editing", categorySlug: "image-generation-editing" },
  ],
};
