# Rocket flight polish — 2026-10-19

Base: origin/main c88df1b6. Branch: codex/rocket-flight-polish.

The owner approved a smoother nose-first flight, animated exhaust, landing smoke, tail-first descent, and a below-header landing followed by a shrink/blend into the logo. Flight duration is now 9.5s, followed by 1.8s for restoration and smoke dissipation.

## Implementation

- Replaced clamped ellipse/Hermite geometry and independent heading smoothing with bounded cubic Bézier curves. The analytic path tangent controls the painted nose (31.9° sprite compensation retained). A curvature-weighted lookup slows tight turns; the nose never lags the flight path.
- Approach ends moving upward, decelerates to a stationary upright hover, then descends vertically. Header return uses a visible pad below the logo, then shrinks/crossfades into the icon. Sponsor targets remain on the card; offscreen targets fall back to home.
- Existing plume artwork flickers on two frequencies, scales along its painted engine axis, changes throttle by phase, and cuts off at touchdown. Twelve lightweight smoke puffs spread and dissipate at the landing point.
- No per-frame React updates or new dependencies. Reduced motion skips flight. Resize, scroll, backgrounding, and motion-preference changes cancel and restore the logo. Initial scheduling is deferred to avoid consuming a preview during Strict Mode's effect probe.
- Hourly timing, Chicago storage key, preview bypass, asset paths, and Clerk matcher are unchanged.

## Validation

- 98 tests pass. Motion tests sample six desktop/phone/short-screen configurations at 5ms intervals, including right-edge sponsors: full-craft bounds, <3° painted-nose/travel error across the entire approach (no skipped windows), continuity, vertical descent, hover and engine cutoff.
- Typecheck, changed-file ESLint, and production build pass. No database scripts or migrations were run; existing app/build reads used the configured environment without reading/editing secrets.
- Local signed-out Discover loaded successfully. Browser screenshots inspected takeoff, in-flight pose, and sponsor descent/smoke at the default panel size; phone 390×844 takeoff and desktop 1280×800 touchdown were inspected. This was sampled visual inspection, not a recorded frame-by-frame review. Reduced-motion and cancellation behavior are implemented but still need interactive owner verification.
- Review /discover?rocket=1 and /discover?rocket=demo on the PR preview; reload to replay. The owner should judge pacing, exhaust strength, smoke, and header blend before merging.

## Workspace / limits

Pre-existing untracked .claude/, Claude outputs/, docs/planning/, and eight platform icons were preserved. No production deployment or merge performed. No environment changes required. The older 7.5s duration and below-logo hover/upward landing descriptions are intentionally superseded by this owner-approved motion design. Main's historical documents were not expanded into unrelated corrections.

## Follow-up: header detachment and stronger effects

Latest main 3395fee4 (PRs #75 and #76) was merged cleanly into this draft branch before these edits. Sponsor click tracking and SEO changes are retained. Main was not modified.

- The actual header SVG is copied at its exact center, then drops for 1.4 seconds while transitioning into the flight artwork. Ignition ramps up near the end of the drop. The visible body now anchors the sprite transform rather than the exhaust canvas center.
- Exhaust is longer, flickers more strongly, and has a second soft glow layer. Landing has 24 larger smoke puffs spreading from the nozzle, with 2.4 seconds after touchdown for restoration and dissipation.
- The demo sponsor uses the complete existing Discover rocket illustration. Sponsor images preserve their full content with object-contain and a stable aspect ratio.
- 119 tests pass, including exact detachment origin, no early ignition, and continuity into the nose-first flight. Typecheck, changed-file ESLint, production build, and git diff whitespace checks pass.
- Sampled local browser screenshots verify mobile detachment, larger in-flight exhaust, sponsor landing smoke, and the complete demo illustration. This is sampled inspection, not a full frame-by-frame recording. Owner visual approval remains pending.

## Follow-up: powered approach attitude

Owner relayed Grok's requested 0.4-0.6 second pitch transition and a 10-20 degree speed-dependent landing lean. Implemented a 500ms quintic blend from cruise tangent into a lean capped at 20 degrees, scaled continuously by horizontal speed and viewport width. Lean falls toward zero as lateral motion stops, before hover and vertical descent. This intentionally supersedes the earlier nose-first-through-entire-approach requirement; cruise remains nose-first.

The return curve now enters the final approach diagonally instead of reaching upright at the left boundary and banking again. Tests retain cruise alignment and bounds, and replace the approach alignment assertion with bounded pitch increments, lean direction, maximum lean and no frozen-upright lateral travel. All 119 tests, typecheck, changed-file ESLint and build pass. Sampled desktop hover and mobile transition/lean screenshots inspected locally; owner should replay the full transition on the draft preview before merge. Main remains unchanged at 3395fee4.

## Follow-up: mobile viewport and rendering safeguards

Small viewport changes (up to 100px from the launch dimensions on each axis) preserve flight, covering collapsing mobile browser chrome. Larger changes and scroll fade the overlay over 200ms before cleanup; visibility and reduced-motion cancellation remain immediate. Smoke puffs retain their soft radial gradients but no blur filters, and only receive will-change while active. The exhaust glow declares will-change: transform.

Heading changes are now capped at 2 degrees per 5ms sample on every powered leg, with a separate detachment cap. Centered horizontal velocity samples require the heading to lean into travel above 2px/s; centered sampling avoids classifying a frame straddling a direction reversal using the prior direction. All 19 focused rocket tests pass; typecheck and changed-file lint pass. Browser verified that a 64px mobile viewport resize retains the rocket and that scroll removes it and restores the logo. Physical iPhone Safari testing remains for the owner.
