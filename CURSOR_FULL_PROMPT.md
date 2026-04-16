# LaunchpadHQ - Cursor Full Implementation Prompt

## TARGET FOLDER
```
C:\Users\Zach\Projects\launchpadhq
```

## CRITICAL: RIGHT FOLDER ONLY
- DO NOT use ai-discovery folder - it does not exist
- DO use: `C:\Users\Zach\Projects\launchpadhq`

## FILES TO REFERENCE
1. `CURSOR_IMPLEMENTATION_PROMPT.md` - Phase-by-phase tasks
2. `FEATURE_SPEC.md` - Complete feature specification  
3. `.env.local` - Contains your Clerk keys (already configured)

## CURRENT STATUS
- Next.js dev server running at localhost:3000
- Clerk auth partially set up (keys in .env.local)
- Basic site loads but auth needs completion
- Middleware was removed (caused crashes)

## YOUR TASKS (Complete in Order)

### Phase 1: Fix Clerk Authentication
1. Update `src/app/layout.tsx` with ClerkProvider wrapper
2. Create proper `src/middleware.ts` for auth protection
3. Add sign-in/sign-out buttons to header
4. Test that sign-in flow works

### Phase 2: Mobile App Links
1. Import data from Obsidian `Mobile-Apps-Full-Research.md`
2. Add iOS/Android links to platform pages
3. Filter platforms by "has mobile app"

### Phase 3: Tutorial System
1. Create `src/data/tutorials/` folder
2. Add sample tutorials for top 5 platforms
3. Build tutorial listing page

### Phase 4: Workflow Templates
1. Design 3-tier system: Optimal / Hybrid / Budget
2. Create 5-10 starter workflows
3. Integrate into discover/home pages

### Phase 5: Prompt Library (Logged-in Users Only)
1. Add prompt model to Prisma schema
2. Create prompt submission UI
3. Build per-platform prompt pages

### Phase 6: Discussion Board (Logged-in Users Only)
1. Add discussion model to Prisma schema
2. Create thread/reply system
3. Add upvotes and report features

### Phase 7: Get Matched Quiz
1. Build 5-question quiz flow
2. Create "For You" personalized page
3. Store quiz answers in user profile

### Phase 8: Stripe Subscription
1. Set up Stripe integration
2. Add $9/month pricing with 1-week free trial
3. Handle failed payment logic

## DEBUGGING CHECKS (Run After Each Phase)

Run these commands to verify:
```bash
# Check for build errors
npm run build

# Check for TypeScript errors  
npx tsc --noEmit

# Test development server
npm run dev
# Visit http://localhost:3000 and test features
```

## DEPLOYMENT (When Complete)
When ready to deploy to production:
1. Run `npm run build` - verify no errors
2. Push to GitHub
3. Deploy via Vercel (recommended for Next.js)
4. Update environment variables in Vercel

## NOTES
- Single tier pricing: $9/month, 1 week free trial
- Browse-first flow (no forced sign-up)
- Logged-in features: prompts, discussions, quiz, for-you page
- Use Clerk for auth (already configured in .env.local)
