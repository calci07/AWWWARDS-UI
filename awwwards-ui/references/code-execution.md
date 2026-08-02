# Code execution contract

Use this contract only after the user approves one route or clearly approves the recommendation. Approval authorizes that route, not arbitrary repository changes.

## Contents

- [Entry gate](#entry-gate)
- [Execution sequence](#execution-sequence)
- [Route Realization Ledger](#route-realization-ledger)
- [Seven-dimension applicability/pass tally](#seven-dimension-applicabilitypass-tally)
- [Mobile-first production](#mobile-first-production)
- [Asset integrity](#asset-integrity)
- [Code discipline](#code-discipline)
- [Completion report](#completion-report)

## Entry gate

Before writing code, confirm:

1. The approved route, Design Read, dials, balance counterweights, mobile transformation, motion family, asset families, and three to five route invariants.
2. For an existing-site redesign, the approved Preserve/Recompose/Overhaul mode, Transformation Map, and seven-dimension tally. For a non-redesign build, including standalone Focused Code that is not executing an approved redesign, confirm that all three are inapplicable and do not invent a redesign baseline or current-pattern map.
3. The exact repository or authorized new-project directory.
4. The exact authorized product surface: page, route, component, or focused experience.
5. Whether this is a new build, an existing-site redesign, or a focused intervention.
6. Any user-imposed file restrictions and known protected behavior, content, analytics, integrations, or user-owned files.

If the route is not approved, return to recommendation mode and stop. If the target or scope is ambiguous, perform safe read-only inspection and ask for the missing boundary before mutation. Figma is never a prerequisite for code mode.

Derive the concrete file inventory during read-only preflight. The user does not need to guess source files before the repository is inspected. If a necessary shared-file edit would expand the authorized product surface or conflict with user work, surface that evidence before mutation.

## Execution sequence

Use the progressive three-pass sequence: Structure, Design batch, then Page milestone.

1. Complete [repo-preflight.md](repo-preflight.md).
2. Translate the approved direction into the Route Realization Ledger below, plus routes, sections, states, tokens, dependencies, and validation commands.
3. Produce the approved brand and asset families. Use installed brand/image skills when available; disclose and use the bundled fallback when they are absent.
4. Integrate real assets into the repository's existing asset pipeline and naming conventions. Do not leave prompt text, fake URLs, temporary screenshots, or generic placeholders in the deliverable.
5. Structure and Design-batch construction use targeted checks at 390 and 1440 only. Build two to four related sections in each Design batch, compare neighboring sections, and reuse the running browser/dev server.
6. Complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and repository QA at Page milestones and final delivery; never make that six-width release loop section-local.
7. Hand off only after the requested scope is complete or a genuine blocker is documented.

## Route Realization Ledger

Create this ledger after repository preflight and before implementation. Every approved route ledger, including standalone Focused Code, includes one row for every approved route invariant. A redesign ledger also includes every applicable Transformation Map row. A non-redesign ledger contains its universal invariant rows and no transformation rows; never invent a redesign baseline or current patterns to fill it. Applicable rows gate each Design batch and final handoff.

| Invariant or transformation row | Target sections/components | Code/assets | 390 evidence | 1440 evidence | Mobile recomposition | State/waiver |
|---|---|---|---|---|---|---|

`Code/assets` names concrete owners or paths. Evidence links a rendered observation to the acceptance signal, not merely a source-file claim. State is `planned`, `implemented`, `verified`, `blocked`, or `waived`. `verified` is the only passing state for an applicable invariant or transformation row and requires linked rendered acceptance evidence at 390 and 1440. `planned`, `implemented`, and `blocked` keep batch and final completion open. `waived` is allowed only for a genuinely inapplicable row, states why it is inapplicable, cites the governing conflict-precedence rule, records its acceptance impact, and does not count as passed.

### Seven-dimension applicability/pass tally

For a redesign, continue the separate seven-row tally approved in Stage A without changing the ledger table above:

| Dimension | Applicable | Transformation Map rows | Route Realization Ledger rows | Rendered acceptance evidence | State/waiver |
|---|---|---|---|---|---|

Link each applicable dimension to its Transformation Map rows, Route Realization Ledger rows, and rendered acceptance evidence. A dimension becomes `verified` only when every applicable linked row is `verified` and its acceptance signal is visibly proven. `planned`, `implemented`, and `blocked` remain open. `waived` is allowed only for a genuinely inapplicable dimension and does not count as passed.

An Overhaul may never waive page and section composition or mobile recomposition. Both must be `verified`, and at least six of the seven dimension rows must be `verified` before final completion. A non-redesign build has no redesign mode, Transformation Map, transformation rows, or seven-dimension tally.

A Design batch is complete only when all six conditions pass:

- applicable route invariants are visibly present and their target ledger rows are `verified`;
- for a redesign, applicable Transformation Map rows are implemented and their target ledger rows are `verified`; a non-redesign batch has no transformation rows;
- shared frame and optical balance pass;
- the batch does not repeat an already overused layout family;
- mobile is recomposed rather than simply stacked;
- placeholders and generic generated filler are absent.

The two-pass cap limits correction churn only; missing first implementation of an invariant is unfinished work, not a third polishing pass. If an invariant is infeasible after preflight, keep the batch open, record the material conflict, and request a decision instead of quietly falling back to the current layout.

## Mobile-first production

- Mobile-first means semantic source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition. It does not mean a 320-first construction loop.
- Establish construction at 390 and 1440 only.
- Use 320 as a narrow stress test only at Page milestones and final delivery; at those complete checks, verify deliberate behavior at 320, 390, 768, 1024, 1440, and wide rather than merely scaling values.
- Preserve readable measures, safe touch targets, clear focus order, stable controls, and no accidental horizontal overflow.
- Supply touch, keyboard, and reduced-motion equivalents for every hover, pointer, drag, parallax, or scroll-dependent experience.
- Use semantic HTML, visible focus, descriptive alternatives, correct heading order, form labels, and appropriate landmarks.
- Prefer transforms and opacity for motion. Protect LCP media, prevent layout shifts, size assets correctly, and avoid unnecessary client-side work.

## Asset integrity

- Generate or art-direct product mockups, campaign imagery, backgrounds, textures, and decorative elements as coherent families, not isolated one-offs.
- Maintain an asset ledger with purpose, source or prompt, crop, aspect ratio, export size, rights/provenance, repository path, and responsive usage.
- Use editable SVG or the repository's icon system for functional icons. Do not use generated raster images for navigation, status, or controls.
- For paired hover/reveal images, register framing and subject position so both layers align, and provide a non-hover presentation on touch devices.
- Verify actual imports, optimized output, crop behavior, loading priority, and missing-file behavior in the rendered site.

## Code discipline

- Reuse compatible tokens, components, utilities, and design-system primitives before adding equivalents.
- Follow the repository's framework, package manager, conventions, and current taste/design guidance. Add dependencies only when the approved design genuinely needs them.
- Preserve unrelated and user-owned changes. Never use destructive reset, checkout, delete, or broad rewrite commands to obtain a clean state.
- Deliver complete code. No `TODO`, “rest omitted,” placeholder component, fake data masquerading as final content, or commented-out substitute is acceptable.
- Keep experimental effects isolated, accessible, and removable. One signature interaction plus a supporting motion family is preferable to constant spectacle.
- Read unchanged companion/reference guidance once per stage, batch independent read-only inspection, and reuse decisions. Generate coherent asset families once from approved masters and derive crops/edits. Use targeted checks during construction and complete checks only at page milestones and final handoff.
- The section-local two-pass cap governs correction churn for an already implemented design; only asset-dependent or signature-interaction work may receive one third targeted section-local pass. Unimplemented ledger rows remain unfinished work and are not polishing passes. After the local cap, log the unresolved defect for Page-level balance. The Page-level pass may make one targeted cross-section or breakpoint correction cycle and does not restart the section-local loop. If the same hard-gate failure remains after that correction, state the blocker or request a material user decision; never silently loop.

## Completion report

Return:

- approved route and implemented scope;
- approved Design Read, route invariants, and final Route Realization Ledger state;
- for a redesign only, approved mode, Transformation Map, and seven-dimension tally with at least the required verified total;
- files and assets created or changed;
- responsive and interaction behavior delivered;
- commands run and their results;
- browser/viewports validated;
- accessibility, performance, console, and asset findings;
- remaining content, rights, technical, or product decisions.

Do not claim production readiness when a required check was skipped or failed.
