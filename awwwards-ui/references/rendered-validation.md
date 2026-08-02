# Rendered validation loop

Validate the actual running implementation, not only source code. Use targeted construction checks after each two-to-four-section design batch and complete checks at page milestones and final delivery.

## Progressive validation passes

Use the progressive three-pass sequence: Structure, Design batch, then Page milestone.

### Structure pass

At 390 and 1440 only, verify semantic order, content hierarchy, real controls, section proportions, centered container, and numerical outer-gutter tolerance. Do not spend this pass on micro-motion or decorative polish.

### Design batch pass

Each two-to-four-section Design batch uses targeted review at 390 and 1440 only. Apply approved type, imagery, tokens, crops, and interaction family; measure outer gutters and inspect the current batch with neighboring sections before browser review.

### Page milestone pass

At Page milestones and final delivery, complete 320, 390, 768, 1024, 1440, and one appropriate wide-screen size responsive, optical-balance, accessibility, input and state behavior, console/network, performance, and production QA. Also inspect navigation open/closed, forms and errors, loading/empty states, long and short content, hover/focus/pressed states, touch behavior, reduced motion, and signature interactions. Test real device constraints when a feature depends on viewport height, safe areas, pointer type, or browser chrome.

## Correction limits

The two-pass cap governs section-local visual polishing. Asset-dependent or signature-interaction work may receive one third targeted section-local pass. After the local cap, log the unresolved defect for Page-level balance.

The Page-level pass may make one targeted cross-section or breakpoint correction cycle; it does not restart the section-local loop. If the same hard-gate failure remains after that Page-level correction, state the blocker or request a material user decision. Never silently loop.

## Ordinary-hero fast path

1. Lock content hierarchy and the balanced frame at 390 and 1440.
2. Integrate the approved hero asset.
3. Add one interaction or motion treatment.
4. Validate the hero together with the next section.
5. Defer complete breakpoint and production QA to the page milestone.

Leave this path only for a genuinely complex generated asset family, 3D/canvas behavior, a registered image sequence, or choreography essential to product meaning.

## Optical-balance iteration

For each construction or milestone screenshot:

1. Check focal hierarchy: the intended first, second, and third reads must be obvious.
2. Compare visual mass across the canvas; account for dark color, large type, dense detail, motion, and high-contrast imagery, not just geometric area.
3. Check section rhythm, whitespace distribution, alignment, text measure, crop intent, edge tension, and repeated-shape monotony.
4. Verify asymmetric compositions have a deliberate counterweight and that centered compositions have enough contrast in scale, texture, or pacing.
5. Inspect individual sections at readable scale; a reduced full-page image can conceal overlap, clipping, and weak type.
6. Correct the smallest responsible token, constraint, crop, or hierarchy decision; then recapture only the affected construction views or required milestone views.

At page milestones and final delivery, use the one bounded Page-level recovery cycle when necessary. Do not compensate for weak hierarchy with extra decoration or restart a consumed section-local loop.

## Interaction and accessibility

Verify:

- all controls work with keyboard, visible focus, logical focus order, and correct semantics;
- touch targets and gestures have reliable tap alternatives;
- hover-only content remains available without hover;
- reduced-motion mode removes nonessential travel, parallax, scrubbing, and flashes while preserving comprehension;
- headings, landmarks, labels, names, descriptions, contrast, zoom, and screen-reader order are sensible;
- no interaction traps, unexpected scroll capture, or inaccessible canvas-only content.

## Runtime and production checks

Run the repository's relevant build, type check, lint, and full tests at page milestones and final delivery; use targeted checks during construction:

- build and production preview;
- type check;
- lint/format verification;
- unit, integration, and end-to-end tests.

In the browser, check:

- console errors and warnings;
- failed requests, missing fonts, and broken assets;
- route navigation, refresh, and deep links;
- image dimensions, responsive sources, crops, priority, and lazy loading;
- overflow, cumulative layout shift, hydration mismatch, and content jumps;
- LCP media, expensive animation, scroll performance, and avoidable JavaScript;
- behavior with slow loading and representative content lengths.

Fix failures in authorized scope. Report pre-existing or out-of-scope failures with evidence; do not hide them or rewrite unrelated systems.

## Handoff evidence

Record validated URLs/routes, viewports, states, screenshot locations, commands and results, remaining warnings, and any skipped checks with reasons. Production-ready claims require passing relevant checks, clean required console/network behavior, complete assets, and no placeholders.
