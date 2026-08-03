# Production quality gates

A dramatic screenshot is not a finished website. Pass every applicable gate before handoff.

## Approval and repository integrity

- Roadmap and exactly three routes preceded execution.
- The user explicitly approved the implemented route and scope.
- No asset generation or code mutation occurred before approval.
- Repository instructions, status, framework, package manager, routes, components, tokens, assets, and commands were inspected first.
- User changes and unrelated files were preserved; no destructive reset or broad rewrite was used.

## Product truth and art direction

- Audience, conversion, and product truth drive hierarchy.
- Claims, metrics, testimonials, clients, and awards are verified or marked as content needs.
- One thesis governs type, color, image, layout, material, and motion.
- References informed principles rather than copied composition.
- Generated assets share a continuity bible, ledger, rights record, and anti-synthetic review.
- Every generated raster declares an integration mode and passes the seamless-image gate: no visible canvas rectangle, field mismatch, alpha halo, compression fringe, broken radius, abruptly clipped shadow, accidental subject cutoff, or lost breakpoint focal point.
- No lorem ipsum, fake interface evidence, generic AI luxury, arbitrary cards, gradients, blobs, or empty spectacle are presented as final.

## Transformation and anti-generic gate

- Every approved route and build, including standalone Focused Code, has an approved Design Read, three to five route invariants, and applicable Route Realization Ledger rows.
- Every applicable invariant or transformation ledger row is `verified` with linked rendered acceptance evidence. `planned`, `implemented`, and `blocked` keep completion open. `waived` is allowed only for a genuinely inapplicable row and does not count as passed.
- An existing-site redesign also has a selected Preserve/Recompose/Overhaul mode, complete Transformation Map, and separate seven-dimension applicability/pass tally linked to its map, ledger rows, and rendered evidence. A non-redesign build, including standalone Focused Code that is not executing an approved redesign, has none of those redesign-only artifacts and must not invent a redesign baseline, current-pattern map, or redesign mode.
- Recompose visibly changes and verifies at least four applicable design dimensions. Overhaul has at least six `verified` dimension rows, including page/section composition and mobile recomposition; neither mandatory Overhaul dimension may be waived, and no waiver may reduce the verified total below six.
- An Overhaul with unchanged section silhouettes plus color, type, radius, shadow, or spacing-only changes is rejected as a cosmetic restyle.
- An eight-section page normally uses at least four layout families. Every exception names the approved product-system reason; repeated equal-card grids, identical split sections, endless centered headings, and repeated eyebrow-heading-body blocks fail the anti-generic gate.
- Every major section documents its optical primary anchor and counterweight, shared-frame gutters, any intentional bleed, text measure/density, and mobile source order.
- Equal left and right shared-frame gutters are required except for a documented full-bleed transition; media bleed never shifts the content frame.

## Rendered balance and responsiveness

- The centered-container hard gate is `tolerance = max(4px, viewport × 0.01)` for the left/right gutter delta.
- Only a documented intentional full-bleed transition may be excepted, and media bleed must not shift the content container.
- Geometry-audit evidence records viewport, container, both gutters, gutter delta, column ratio, primary anchor, counterweight, and exception.
- Complete responsive, accessibility, input, performance, and repository QA at 320, 390, 768, 1024, 1440, and wide at Page milestones and final delivery.
- Mobile-first semantic/source order, hierarchy, touch reachability, and purpose-built composition were established in construction at 390/1440; 320 was used as a milestone/final stress test.
- Primary/secondary anchors, scan path, type measure, image/text proportion, and dense/quiet cadence remain clear.
- Desktop adds useful simultaneity; wide screens do not stretch copy or create arbitrary emptiness.
- Crops, overflow, safe areas, sticky elements, navigation, and text expansion are resolved.
- Core content and actions never depend on hover or motion.

## Interaction and accessibility

- Semantic HTML, landmarks, headings, labels, names, states, and reading order are valid.
- Keyboard flow, visible focus, skip behavior, and touch targets are usable.
- Text and controls meet the project's contrast target.
- Reduced-motion behavior is implemented and the static hierarchy remains complete.
- Images have meaningful alt text or correct decorative treatment.
- Loading, empty, error, success, disabled, and consent states exist where relevant.
- Forms preserve labels, errors, recovery, input intent, and informed consent.
- The result remains usable with zoom, text enlargement, reflow, and coarse pointer.

## Code and asset integrity

- Implementation follows repository architecture and reuses suitable components/tokens.
- Pages, components, interactions, and states are complete; no placeholders, TODO stand-ins, fake buttons, or screenshot-only UI remain.
- Functional icons are coherent editable SVG/code icons; raster generation is reserved for expressive imagery.
- Assets follow repository conventions and include responsive dimensions, format, crop, loading priority, and provenance.
- Effects clean up listeners/timers, avoid layout thrashing, and degrade gracefully.
- No needless package, framework, or styling-system migration was introduced.

## Required validation

Run the repository's applicable commands and report exact results:

- production build;
- typecheck;
- lint;
- unit/integration/end-to-end tests;
- browser interaction checks and screenshot review;
- accessibility audit or equivalent semantic/keyboard checks;
- performance review focused on LCP media, CLS, font loading, image weight, main-thread work, and motion;
- console, network, broken-route, and broken-asset checks.

Do not invent commands the repository does not support. If a gate cannot run, explain why, perform the safest available substitute, and label the gap.

## Handoff condition

Handoff only when the approved route is recognizable, key paths work, all required screenshots pass optical review, applicable commands pass, and remaining risks are explicit. Report:

- files and routes changed;
- approved Design Read, route invariants, and final Route Realization Ledger state;
- for a redesign only, approved mode, Transformation Map, and final seven-dimension tally;
- assets created, sources, rights, and ledger location;
- responsive and interaction behavior;
- commands and audits run with results;
- performance/accessibility decisions;
- unresolved content, rights, environment, or tool gaps;
- how to run and verify the work.

If Figma was explicitly requested, include its links as supplemental deliverables. Figma is never required for code completion.
