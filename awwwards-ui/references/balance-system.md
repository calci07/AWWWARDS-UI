# Rendered-page optical balance

Balance is controlled hierarchy, not automatic symmetry. Default to a balanced frame with an expressive interior. Judge the rendered website, not only source measurements. Every composition needs a dominant anchor, a supporting anchor, and enough repetition to make deliberate variation legible.

## Contents

- [Outer-frame contract](#outer-frame-contract)
- [Transformation and layout-family plan](#transformation-and-layout-family-plan)
- [Visual-mass map](#visual-mass-map)
- [Rendered-page scorecard](#rendered-page-scorecard)
- [Geometry audit](#geometry-audit)
- [Required breakpoint gate](#required-breakpoint-gate)
- [Cadence rules](#cadence-rules)
- [Failure triggers](#failure-triggers)
- [Browser review loop](#browser-review-loop)

## Outer-frame contract

- Center the primary section container.
- Keep left and right outer gutters within `tolerance = max(4px, viewport × 0.01)`.
- Equal left and right shared-frame gutters are required except for a documented full-bleed transition. Optical correction may move interior mass, but it must not silently move the shared frame.
- Align neighboring sections to shared container edges unless an approved full-bleed transition is documented.
- Make intentional media bleed explicit without shifting the content container.
- Cap wide-screen content width.

The interior may use 50/50, 55/45, 60/40, or a controlled offset. Every unequal interior names its ratio or grid relationship, dominant anchor, visible counterweight, coherent top/bottom alignment, and meaning-preserving mobile order.

## Transformation and layout-family plan

For every major section, document the optical primary anchor and counterweight, shared-frame gutters, intentional bleed, text measure/density, and mobile source order. The documentation must match the rendered geometry audit.

An eight-section page normally uses at least four layout families. Treat a family as a structural grammar, such as editorial index, media field, asymmetric split, evidence grid, stepped narrative, or focused conversion, not as a surface styling variant. Repeated equal-card grids, identical split sections, endless centered headings, and repeated eyebrow-heading-body blocks count as one overused family unless the approved product system genuinely requires repetition.

For Overhaul, unchanged section silhouettes with color, typography, radius, shadow, or spacing-only changes are a hard balance failure. The route must visibly replace the composition and mobile recomposition while retaining only the truthful content and behavior that the approved map preserves.

## Visual-mass map

Estimate every major element as low, medium, or high optical mass. Mass rises with area, contrast, saturation, darkness, detail, type weight, isolation, depth, glow, blur, or motion.

Map high and medium mass across left/center/right, top/middle/bottom, and foreground/midground/background. Do not equalize every zone. Give strong off-axis mass a credible counterweight: restrained copy, a secondary image, a stable edge, repeated modules, directional whitespace, or reduced contrast elsewhere.

Before coding a high-variance route, record:

1. primary and secondary anchors;
2. scan and conversion order;
3. grid, margins, alignment edges, text measure, and image/text proportion;
4. intended asymmetry and its counterweight;
5. maximum simultaneous focal layers;
6. construction behavior at 390 and 1440, then Page-milestone/final rebalancing behavior at 320, 390, 768, 1024, 1440, and wide screens;
7. the most likely failure and its prevention rule.

## Rendered-page scorecard

Score each breakpoint screenshot `0 = fails`, `1 = fragile`, or `2 = passes`:

- primary anchor is immediate;
- secondary anchor supports rather than competes;
- left/right and top/bottom mass feel intentional;
- major edges and baselines resolve to a stable grid;
- type scale, weight, spacing, and measure create hierarchy;
- negative space creates rhythm, not accidental voids;
- dense and quiet regions alternate deliberately;
- image/text proportion matches the section's job;
- repetition establishes recognition before variation;
- asymmetry has a visible counterweight;
- depth and motion do not create competing focal planes;
- source order preserves meaning and action priority;
- wide layouts add useful relationships without unbounded emptiness.

A page passes at 22/26 or higher with no zero. Primary anchor, hierarchy, and mobile order must each score 2. Scoring never excuses a visible defect.

## Geometry audit

| Viewport | Container | Left gutter | Right gutter | Gutter delta | Column ratio | Primary anchor | Counterweight | Exception |
|---|---|---:|---:|---:|---|---|---|---|

Audit 390 and 1440 during construction. At page milestones and final delivery, audit 320, 390, 768, 1024, 1440, and wide. Optical scoring evaluates the interior composition; it never overrides the hard outer-frame tolerance.

## Required breakpoint gate

Capture and review representative pages at:

- 320 px: narrow stress test;
- 390 px: primary mobile composition;
- 768 px: tablet transition;
- 1024 px: compact desktop or landscape tablet;
- 1440 px: primary desktop;
- one wide viewport, normally 1920 px.

Use realistic content and full-page plus critical-section screenshots. At 320 and 390, check touch targets, safe areas, sticky clearance, intentional crops, and a single dominant task. At 1440 and wide, cap reading measure and use grids, media, or secondary context instead of stretching text or leaving arbitrary voids.

## Cadence rules

- Repeat two or three alignment edges and a controlled spacing, radius, crop, and caption system before exceptions.
- Change one dominant variable at a time: scale, color, depth, or motion.
- Follow a loud section with a quieter recovery section.
- Keep one primary motion event per viewport; supporting motion stays subordinate.
- Give every decorative layer a compositional job.
- Apply optical correction when mathematical centering looks wrong, and document the exception.

## Failure triggers

Revise when the headline, image, CTA, and motion all demand first attention; dense imagery has no counterweight; blank space lacks narrative direction; components use unrelated visual rules; mobile source order becomes incoherent; wide screens amplify emptiness; or generated imagery changes palette, light, viewpoint, material, or crop grammar.

## Browser review loop

During construction, review each current two-to-four-section design batch at 390 and 1440:

1. run the application in its real rendering environment;
2. measure outer gutters and record the geometry-audit row;
3. inspect scan path, type, crop, spacing, overflow, local alignment, anchors, and counterweight;
4. compare the two construction views side by side;
5. record score and corrections in the project handoff notes;
6. within the section-local two-pass cap, fix each zero and threshold failure; asset/signature work may receive one third targeted section-local pass. If the cap is reached first, stop the local loop and log the unresolved defect for Page-level balance.

At page milestones and final delivery, repeat the full scorecard and geometry audit across all six required breakpoint classes. The Page-level pass may make one targeted cross-section or breakpoint correction cycle and does not restart the section-local loop. If the same hard-gate failure persists after that correction, state the blocker or request a material user decision; never silently loop.

Distinctiveness never outranks comprehension, accessibility, content priority, or responsive behavior. Figma screenshots may supplement this loop only in an explicitly requested Figma mode; they do not replace rendered-page review.
