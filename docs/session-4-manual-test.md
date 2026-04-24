# Session 4 — Manual test checklist

Covers the prompts/discussions submission flow after the Step 6a–6e commits on `feature/prompts-discussions-api`.

Run through the whole list before merging to `main`. Items are grouped by surface; within each group, run top-to-bottom.

## Setup

- [ ] Start the dev server: `npm run dev`
- [ ] Open Prisma Studio in a second terminal: `npx prisma studio` — you'll need it to flip `status` and to spot-check row creation
- [ ] Sign in as a test user in the browser; keep a second browser (or incognito) signed-out for the unauth checks
- [ ] Pick a platform slug to work with (e.g. `chatgpt`) and stay on it for the whole session

## Prompts

### Submission + moderation gating
- [ ] On `/platform/<slug>/prompts`, submit a prompt (title + body, optional link)
- [ ] Verify the green "Thanks! Your submission is awaiting review…" panel appears near the submit button
- [ ] Verify the form inputs are cleared
- [ ] Verify the new row is NOT appended to the list below (no optimistic insert)
- [ ] In Prisma Studio, confirm a new `Prompt` row with `status = PENDING`
- [ ] Refresh the page and confirm the PENDING row still does NOT appear in the public list
- [ ] Flip the row to `status = APPROVED` in Prisma Studio
- [ ] Refresh — row now appears, with your display name (or "Anonymous" if `User.name` is null) and the correct body text

### Rate action
- [ ] Click a star on an APPROVED prompt → HTTP 200, rating updates
- [ ] Submit a second prompt and leave it PENDING. Grab its ID from Prisma Studio
- [ ] Via DevTools → fetch, call `POST /api/prompts/<pending-id>/rate` with `{ stars: 4 }` → expect 404 `{ error: "Not found" }`
- [ ] Do the same against a random bogus ID → expect the same 404 (responses should be indistinguishable)

### Report action (policy: PENDING-allowed)
- [ ] Call `POST /api/prompts/<pending-id>/report` with `{ reason: "test" }` → expect 200 `{ ok: true }` (reports on PENDING are permitted)
- [ ] In Prisma Studio, confirm the `PromptReport` row landed

### Unauth rejection
- [ ] In the signed-out browser, `POST /api/platforms/<slug>/prompts` with a valid body → expect 401
- [ ] Same for `/rate` and `/report` → expect 401 before any body validation

## Discussions

### Submission + moderation gating
- [ ] On `/platform/<slug>/discussions`, submit a new thread
- [ ] Verify the green success panel appears just below the guidelines box (near the top, not inside the form)
- [ ] Verify the form clears and the new thread does NOT appear in the list
- [ ] Prisma Studio: new `Discussion` row, `status = PENDING`
- [ ] Flip to `APPROVED`, refresh, confirm thread renders with author + body + 0 replies

### Replies
- [ ] On an APPROVED thread, click Reply → post a reply
- [ ] Verify the same green panel appears near the top (not inline)
- [ ] Reply textarea collapses, reply does NOT appear in the thread yet
- [ ] Prisma Studio: new `DiscussionReply` row, `status = PENDING`
- [ ] Flip the reply to `APPROVED`, refresh — reply renders under the parent thread with author + upvote count
- [ ] Try posting a reply > 2000 chars → expect 400 with `{ error: "body must be 2000 characters or fewer", field: "body" }`
- [ ] Grab a PENDING discussion's ID. Call `POST /api/discussions/<pending-id>/replies` → expect 404 (can't reply to an unapproved thread)

### Vote actions
- [ ] Upvote an APPROVED thread → count increments; click again → decrements (toggle)
- [ ] `POST /api/discussions/<pending-id>/vote` → expect 404
- [ ] Upvote an APPROVED reply → count increments; toggle back
- [ ] `POST /api/discussion-replies/<pending-reply-id>/vote` → expect 404

### Report action (policy: PENDING-allowed)
- [ ] `POST /api/discussions/<pending-id>/report` with `{ reason: "test" }` → expect 200 (reports on PENDING are permitted)

### Unauth rejection
- [ ] Signed-out: `POST /api/platforms/<slug>/discussions`, `/replies`, `/vote`, `/report` → all 401

## Response shape smoke tests

- [ ] `GET /api/platforms/<slug>/prompts` → response is `{ items: [...], totalCount, page, pageSize }`. Each item has `id, title, prompt, outputUrl, author, ratingAvg, ratingCount, createdAt`. `ratingAvg` is `null` (not `0`) when `ratingCount === 0`
- [ ] `GET /api/platforms/<slug>/discussions` → same envelope. Each item has `author` and a `replies` array. Each reply has `{ id, body, upvotes, author, createdAt }`
- [ ] Confirm PENDING replies do NOT leak into the `replies` array of an APPROVED thread

## Regression spot-checks

- [ ] Re-run the previously approved prompt list — still renders, still rateable
- [ ] Author display: if `User.name` is null, author shows as "Anonymous" (not empty string, not "undefined")
- [ ] Success panel auto-dismisses after ~6 seconds
- [ ] Submitting a second prompt while the success panel is visible — panel resets to the new message
