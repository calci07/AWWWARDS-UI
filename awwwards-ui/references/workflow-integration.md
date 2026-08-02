# Code-first workflow integration

This is the canonical end-to-end sequence. Recommendation and approval precede any asset generation or code mutation.

Use the progressive three-pass sequence: Structure, Design batch, then Page milestone.

Run targeted interim checks at 390 and 1440 for Structure and each two-to-four-section Design batch.

Run complete six-width responsive, accessibility, input, performance, and repository checks only at Page milestones and final delivery, never as a section-local release loop.

Carry the approved Design Read and three to five route invariants through every approved route and build, including standalone Focused Code. For a redesign only, also carry the approved Preserve/Recompose/Overhaul mode, Transformation Map, and seven-dimension tally. A non-redesign build has no approved redesign baseline to map and must not invent a redesign mode, transformation rows, or dimension tally. Focused Code may narrow the current execution surface only after route approval; when it executes an approved redesign, it never narrows the approved transformation scope.

Before approval, a fixed deadline with an unknown route inventory requires a measurable capacity assumption: state the maximum unique route templates, material states, and expected component reuse that fit the schedule. Use numeric bounds, for example `<= N unique templates`, `<= M material states`, and named shared shell/components reused across `K routes` or `P% of the surface`. Days alone are not a capacity model.

## Contents

- [Phase 0 - Route the request](#phase-0---route-the-request)
- [Phase 1 - Establish product truth](#phase-1---establish-product-truth)
- [Phase 2 - Roadmap and recommendation](#phase-2---roadmap-and-recommendation)
- [Phase 3 - Lock execution scope](#phase-3---lock-execution-scope)
- [Phase 4 - Repository preflight](#phase-4---repository-preflight)
- [Phase 5 - Brand and asset production](#phase-5---brand-and-asset-production)
- [Phase 6 - Structure pass](#phase-6---structure-pass)
- [Phase 7 - Design batch pass](#phase-7---design-batch-pass)
- [Phase 8 - Page milestone pass](#phase-8---page-milestone-pass)
- [Phase 9 - Verify and hand off](#phase-9---verify-and-hand-off)

## Phase 0 - Route the request

1. Select Roadmap, Recommend, Code Build, Code Redesign, Focused Code, or Audit.
2. Treat a new-site or full-redesign request as Recommend unless the user already supplied an approved route.
3. State that implementation happens in the codebase only after explicit route approval.
4. Use Figma only when the user explicitly requests an optional Figma or Figma-to-code mode.
5. For each redesign route, select Preserve, Recompose, or Overhaul independently of the later execution surface.

## Phase 1 - Establish product truth

1. Identify audience, primary conversion, content, routes, states, device scope, constraints, and success measure.
2. For redesigns, audit the current experience and distinguish what must be preserved, improved, or retired.
3. Separate facts, assumptions, open decisions, and prohibited inventions.
4. Identify accessibility, claims, legal, privacy, licensing, performance, and platform risks.

## Phase 2 - Roadmap and recommendation

1. Query the local inspiration catalog once for a small relevant evidence set; reuse it unless the brief materially changes.
2. Read named source studies and the complete installed `design-taste-frontend` skill.
3. Extract principles, not layouts.
4. Calibrate variance, motion, and density.
5. Produce the roadmap and exactly three distinct routes.
6. Include balance, mobile transformation, brand cues, asset families, interaction parity, tradeoffs, risks, and a visible Inspiration board with three to five live/discovery links for each.
7. For every route, including a standalone Focused Code route, include its Design Read, three to five positive route invariants, and evidence fields `Borrow`, `Apply`, `Mobile translation`, and `Do not copy`.
8. For a redesign route only, include the selected transformation mode, complete current-pattern Transformation Map, and separate seven-dimension applicability/pass tally. Do not create them for non-redesign work.
9. When relevant, include a deep/user-curated precedent and applicable Mobbin evidence for mobile-heavy work. If either family has no relevant source, substitute another observable relevant source when possible; otherwise disclose the limitation and never force an unrelated source-family quota.
10. For a fixed deadline, publish the numeric route-template/state capacity and component-reuse assumption before recommending a route; do not promise unknown inventory.
11. Recommend one route.
12. Ask for explicit approval and stop.

No asset generation or code mutation is allowed in Phases 0-2.

## Phase 3 - Lock execution scope

1. Confirm the approved route, Design Read, route invariants, and any approved changes.
2. For a redesign, lock the approved transformation mode, Transformation Map, and seven-dimension tally. For a non-redesign build, record that these redesign-only artifacts are inapplicable without fabricating them.
3. Confirm the exact repository/worktree or authorized new target.
4. Confirm the authorized pages, routes, components, or focused experience plus any user-imposed file restrictions.
5. Reconfirm content, states, breakpoints, assets, exclusions, and completion criteria.
6. Return to recommendation when thesis or scope changes materially.

## Phase 4 - Repository preflight

1. Read repository instructions and inspect version-control status without overwriting user work.
2. Inspect framework, package manager, route structure, components, tokens, styling, assets, tests, and build scripts.
3. Reuse established design-system primitives and project conventions where suitable.
4. Derive and record the smallest safe file inventory, implementation boundary, and validation commands.
5. Verify existing dependencies before proposing additions.
6. Test every route invariant against repository truth. For a redesign, also test every Transformation Map row and report a material conflict instead of silently reducing the redesign.
7. Count unique route templates and material states, measure actual reuse against the approved component-reuse assumption, then compare the inventory with the approved deadline capacity. If preflight exceeds that capacity, surface the measured conflict and ask the user to approve either a deadline extension or an explicit phased release slice that names what ships now and what remains scheduled. Do not begin writes on an invented smaller scope.
8. Create the Route Realization Ledger before implementation: every route, including standalone Focused Code, gets invariant rows; redesigns also get applicable transformation rows and continue the seven-dimension tally; non-redesign builds get no transformation rows or dimension tally.

## Phase 5 - Brand and asset production

1. Re-read current taste, then resolve brand, web-image, mobile-image, and system image-generation capabilities; disclose fallbacks.
2. Create the continuity bible, semantic token plan, and shared family asset ledger with provenance, rights, master-to-crop derivation, registered interaction pairs, alt/decorative state, performance budget, and touch/reduced-motion equivalents.
3. Generate each coherent asset family once from approved masters, then derive registered variants, edits, and responsive crops.
4. Use editable SVG/code icons for function and generated imagery only for expressive assets.
5. Store optimized assets through repository conventions with provenance, rights, alt intent, and consumers recorded.

## Phase 6 - Structure pass

1. At 390 and 1440 only, establish semantic order, content hierarchy, real controls, section proportions, centered container, and numerical gutters.
2. Implement real content and important states; do not leave placeholder code or screenshot-only UI.
3. Keep micro-motion and decorative polish out of this pass.
4. Cache unchanged companion/reference decisions and batch independent read-only inspections.

## Phase 7 - Design batch pass

1. Build two to four related sections before browser review.
2. Apply approved type, imagery, tokens, crops, and interaction family; compare neighboring sections.
3. Provide pointer, touch, keyboard, interruption, and reduced-motion behavior.
4. Use the repository's existing technique or the lightest suitable native approach; add a library only when justified and approved.
5. Protect main-thread, paint, layout, and loading performance.
6. Reuse the browser and dev server across minor styling changes and run targeted interim checks.
7. The two-pass cap governs section-local visual polishing; allow one third targeted section-local pass only for asset-dependent or signature-interaction work. After the local cap, log the unresolved defect for Page-level balance.
8. Close a batch only when every applicable target ledger row is `verified` with linked rendered acceptance evidence, shared-frame/optical balance passes, no already overused layout family repeats, mobile is recomposed rather than stacked, and no placeholder or generic generated filler remains. `planned`, `implemented`, and `blocked` stay open; `waived` means genuinely inapplicable and does not pass.
9. The pass cap limits correction churn only. Missing first implementation is unfinished work, not an extra polishing pass.

## Phase 8 - Page milestone pass

1. Run the application and capture 320, 390, 768, 1024, 1440, and wide browser screenshots.
2. Complete optical, accessibility, interaction, state, console/network, performance, and production checks.
3. Compare the whole page against the route thesis, geometry audit, and optical scorecard.
4. Run repository-native build, typecheck, lint, and full tests at this milestone.
5. Report concise progress once for the completed meaningful pass.
6. When a logged post-cap defect remains, make one targeted cross-section or breakpoint correction cycle. This Page-level recovery does not restart the section-local loop. If the same hard-gate failure persists, state the blocker or request a material user decision; never silently loop.
7. For a redesign, update the seven-dimension tally from final ledger/evidence links. Overhaul requires at least six `verified` dimensions, including composition and mobile recomposition, with neither mandatory dimension waived.

## Phase 9 - Verify and hand off

Repeat complete milestone checks for final delivery. Return files/routes changed, approved Design Read and route invariants, assets and shared family ledger, final Route Realization Ledger, validation results, screenshots or locations, known risks, and run instructions. For a redesign, also return the approved mode, Transformation Map, and final seven-dimension tally; omit all three for non-redesign work. Never claim an unrun check passed. Speed and reuse never weaken approval, transformation coverage, route invariants, asset coverage, mobile recomposition, content truth, accessibility/input parity, user-change safety, final breakpoint coverage, or honest skipped-check reporting. Speed never silently drops routes, approved transformation coverage, assets, mobile recomposition, or QA.
