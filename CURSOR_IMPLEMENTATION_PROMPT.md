# LaunchpadHQ - Cursor Implementation Prompt

## Project Location
C:\\Users\\Zach\\Projects\\launchpadhq

## Current State
- Next.js 16 + Prisma + PostgreSQL scaffold built
- Platform discovery + search working
- 168 AI platforms in database
- Mission control theme
- Domain: LaunchpadHQ.io (secured)

---

## Objective
Implement the complete LaunchpadHQ feature specification to prepare for launch.

---

# IMPLEMENTATION TASKS

## PHASE 1: User Authentication

### Task 1.1: Install Clerk
`ash
cd C:\\Users\\Zach\\Projects\\launchpadhq
npm install @clerk/nextjs
`

### Task 1.2: Environment Variables
Add to .env.local:
`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/account/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/account/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
`

### Task 1.3: Create Auth Files
1. Wrap app with ClerkProvider in src/app/layout.tsx
2. Create src/middleware.ts for route protection
3. Create sign-in page: src/app/(app)/account/sign-in/page.tsx
4. Create sign-up page: src/app/(app)/account/sign-up/page.tsx
5. Add sign-in/sign-out buttons to header component

### Task 1.4: Enable Email Verification
- In Clerk dashboard, enable email verification
- Configure signup to require email confirmation

### Task 1.5: User Data Schema
Update Prisma schema to add user tracking fields (if needed beyond Clerk):
- onboarded (boolean)
- createdAt, updatedAt (timestamps)

---

## PHASE 2: Mobile App Links

### Task 2.1: Find Mobile App Data
- Check Obsidian: ObsidianVault/02-Projects/Launchpad-HQ/Research/Mobile-Apps-Full-Research.md
- Check Downloads folder for xlsx files
- Import data to database

### Task 2.2: Update Platform Schema (if needed)
Add fields to Platform model:
- hasMobileApp (boolean)
- iosAppUrl (string, optional)
- androidAppUrl (string, optional)

### Task 2.3: Update Platform Detail Page
Display mobile app links on platform detail page:
- Show iOS App Store link if available
- Show Android Google Play link if available
- Show mobile web indicator if PWA available

---

## PHASE 3: Tutorial System

### Task 3.1: Tutorial Data Structure
Look at existing tutorial: src/data/tutorials/chatgpt-getting-started.ts
Create template for other platforms.

### Task 3.2: Create Tutorial Page
- src/app/(app)/tutorials/page.tsx - list all tutorials
- Filter by platform, difficulty
- Progress tracking for logged-in users

### Task 3.3: Add More Tutorials
Create tutorials for these platforms:
- Claude, Midjourney, DALL-E 3, CapCut, ElevenLabs
- Murf, Photoroom, Canva AI, Runway, Pika
- Suno, Udio, GitHub Copilot, Cursor, Replit
- Perplexity, Gamma, Descript, Lovo, Pictory

---

## PHASE 4: Workflow Templates

### Task 4.1: Create Workflow Data
Create src/data/workflows/ with JSON files for each workflow:

**Workflow structure:**
`json
{
  \
id\: \blog-post-generator\,
  \title\: \Blog
Post
Generator\,
  \description\: \Create
a
complete
blog
post
with
AI\,
  \tiers\: {
    \optimal\: {
      \name\: \Best
Experience\,
      \tools\: [\ChatGPT
Plus\, \Grammarly\, \Midjourney\]
    },
    \hybrid\: {
      \name\: \Free
Works
Too\,
      \tools\: [\ChatGPT
Free\, \QuillBot\, \Stable
Diffusion\]
    },
    \budget\: {
      \name\: \All
Free\,
      \tools\: [\Ollama\, \LanguageTool\, \Stable
Diffusion
Local\]
    }
  }
}
`

### Task 4.2: Create Workflows (5-10)
1. Blog Post Generator
2. Image Generation
3. Voice Clone
4. Video Editing
5. Code Writing
6. Audio Transcription
7. Content Research
8. Social Media Posts

### Task 4.3: Add Workflows to UI
- Add \Workflows\ tab to navigation or explore page
- Display as cards with three-tier comparison

---

## PHASE 5: Prompt Library

### Task 5.1: Add Prompt Model to Schema
Update Prisma:
`prisma
model Prompt {
  id          String   @id @default(cuid())
  platformId  String
  userId      String?  // null if anonymous
  title       String
  prompt      String
  outputUrl   String?  // screenshot/video/link
  author      String?
  rating      Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
`

### Task 5.2: Create Prompt UI
- src/app/(app)/platform/[slug]/prompts/page.tsx
- Form to submit new prompts (logged-in only)
- Display all prompts with sort options
- Rating system (1-5 stars)

### Task 5.3: Add Disclaimer
- Add warning at top of prompt page about inappropriate content

---

## PHASE 6: Discussion Board

### Task 6.1: Add Discussion Model to Schema
Update Prisma:
`prisma
model Discussion {
  id          String   @id @default(cuid())
  platformId  String
  userId      String?
  title      String
  body       String
  solution   String?  // marked as answer
  upvotes    Int      @default(0)
  createdAt   DateTime @default(now())
}

model DiscussionReply {
  id            String   @id @default(cuid())
  discussionId  String
  userId        String?
  body         String
  upvotes      Int      @default(0)
  createdAt     DateTime @default(now())
}
`

### Task 6.2: Create Discussion UI
- src/app/(app)/platform/[slug]/discussions/page.tsx
- Create new discussion (logged-in only)
- Reply to discussions
- Upvote functionality
- Report button

### Task 6.3: Add Disclaimer
- Add warning at top about inappropriate content

---

## PHASE 7: \Get
Matched\ Quiz

### Task 7.1: Create Quiz Page
- src/app/(app)/quiz/page.tsx
- Multi-step form with 5 questions:
  1. What do you want to accomplish?
  2. What's your experience level?
  3. What's your monthly budget?
  4. Where should AI tools run? (with explanation)
  5. What tasks do you need?

### Task 7.2: Quiz Logic
- Save answers to user preferences in database
- Generate recommendations based on answers
- Allow retake with clear option

### Task 7.3: Results Page
- Display recommended platforms
- Explain WHY each platform matches (optional)
- Add to \For
You\ page

### Task 7.4: For You Page
- src/app/(app)/for-you/page.tsx
- Show personalized platforms based on quiz + favorites
- \Favorite\ button on platforms
- Newsletter preferences based on favorites

---

## PHASE 8: Subscription (Future)

### Task 8.1: Stripe Integration
- Set up Stripe account
- Implement /month pricing
- 1-week free trial logic
- Auto-charge after trial
- Failed payment handling

### Task 8.2: Affiliate Links
- Add fields for affiliate links per platform
- Track when users sign up via affiliate

---

# QUICK START

## Install Dependencies
`ash
cd C:\\Users\\Zach\\Projects\\launchpadhq
npm install @clerk/nextjs
`

## Run Development
`ash
npm run dev
`

## Database
`ash
npx prisma studio  # View data
npx prisma db push # Apply changes
`

---

# NOTES
- Mobile app research data is in Obsidian
- Single tutorial exists in src/data/tutorials/
- Start with auth before other logged-in features
- Keep workflow templates in src/data/workflows/

