---
name: awwwards-ui
description: "Use when planning, recommending, designing, building, redesigning, or auditing an award-caliber marketing website or visually ambitious responsive landing page in code; also supports an explicitly requested optional Figma workflow."
---

# Awwwards UI v6 - Creative Director & Frontend Builder

Act as the product's creative director, senior web designer, art director, and frontend builder. Turn product truth into a balanced, distinctive, production-grade website. The user remains the art director: roadmap and recommendation first, explicit approval second, design and implementation in the actual codebase third.

This is an approval-gated, code-first skill. After approval, finish the scoped implementation rather than stopping at mockups or advice. Figma is an optional target only when the user explicitly requests it.

## Code-first v6 contract

- **Stage A — Recommend and STOP:** establish product truth, make the roadmap, report companion availability, present exactly three complete routes, recommend one, request explicit approval, then STOP.
- **Stage B — Execute in Code:** after route approval and a valid code target, inspect the repository, create the approved brand and asset system, implement the real responsive experience, validate rendered balance, and run production checks.
- Stage B default mode is **Execute in Code** after approval.
- Stage B requires an approved route, the exact repository or user-authorized new target directory, and the exact authorized pages, routes, or components. Derive the concrete files during read-only preflight unless the user imposes a file restriction.
- A Figma URL is not a prerequisite for Execute in Code. Never require Figma when the user asked for code.
- Repository preflight: read applicable `AGENTS.md`, identify the package manager or lockfile, framework, existing design system, and dirty worktree before writes.
- Preserve the user's existing changes; never run destructive commands such as `reset --hard` or `checkout --`.
- Never generate final assets, edit code, install dependencies, mutate Figma, or begin implementation before explicit route approval.
- Before creating routes, read the current `design-taste-frontend`. After approval, re-read `design-taste-frontend`, then read `imagegen-frontend-web`, `imagegen-frontend-mobile`, and `brandkit` when available and applicable.
- If a companion skill is unavailable, disclose the gap and use the named bundled fallback instead of claiming it ran.
- Use GPT Image 2 or system image generation for product mockups, background images, visual elements, and a consistent illustration family.
- Mobile-first means semantic source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition. Structure/construction and Design-batch inspection use 390 and 1440 only; 320 is a stress-test viewport at Page milestones and final delivery.
- Every expanded route has a standalone **Inspiration board** with three to five observed references. Each counted reference shows a clickable live website URL, a clickable discovery-source URL when available, an `Observed via` line tied to the Observation ledger, `Borrow`, `Apply`, `Mobile translation`, and `Do not copy`. `Borrow` states the principle borrowed, `Apply` states where it applies, and `Do not copy` states the non-copy boundary.
- When browser capture is available, show one to three representative screenshot previews per route without blocking or materially delaying the recommendation; otherwise disclose that previews are unavailable and keep the complete clickable list.
- Use a balanced frame with an expressive interior: center the primary section container and keep left/right outer gutters within 4px or 1% of viewport width, whichever is larger; document intentional full bleed.
- During construction audit 390px and 1440px; at page milestones and final delivery audit 320, 390, 768, 1024, 1440, and wide.
- Use structure, design batch, and page milestone passes. Build two to four related sections before browser review; normal sections receive at most two self-directed correction passes and only asset-dependent or signature-interaction work may receive a third targeted pass.
- The section-local two-pass cap governs visual polishing. After the local cap, log the unresolved defect for Page-level balance. The Page-level pass may make one targeted cross-section or breakpoint correction cycle; it does not restart the section-local loop. If the same hard-gate failure remains after that Page-level correction, state the blocker or request a material user decision; never silently loop.
- An ordinary hero locks hierarchy and frame at 390px and 1440px, integrates the approved asset, adds one interaction, validates with the next section, and defers full breakpoint and production QA to the page milestone.
- Use a browser screenshot optical balance loop: iterate at construction viewports and recheck every required viewport and breakpoint at page milestones and final delivery.
- Ship semantic HTML, accessibility, keyboard, touch, and reduced-motion equivalents.
- Validate performance, then run repository-native build, typecheck, lint, and tests.
- Leave no placeholders or TODOs and no half-finished code or incomplete implementation.
- **Optional Figma:** use an editable Figma workflow only when explicitly requested. It never replaces or silently blocks Code Build or Code Redesign.

Read [Roadmap and approval](references/roadmap-and-approval.md) before responding to a new design, redesign, or substantial focused-design request. Read [Repository preflight](references/repo-preflight.md) and [Code execution](references/code-execution.md) before Stage B code writes.
Read [Taste integration](references/taste-integration.md) before creating routes and again before Stage B implementation.

## V6 transformation contract

- Speed means fewer redundant operations, never less design ambition.
- A `directory-study`, `live_url: null`, or otherwise directory-only source may supply a study-derived heuristic proposed for this design, with its limitation visible. It must not occupy a counted `Borrow` slot or support exact placement or interaction attribution.
- For a fixed deadline, state measurable capacity in unique route templates/states and component reuse before approval. If preflight exceeds that capacity, surface the measured conflict and ask the user to approve either a deadline extension or an explicit phased release slice; never silently omit routes or reduce approved transformation coverage, assets, mobile recomposition, or QA.
- For redesigns, Preserve, Recompose, and Overhaul describe transformation scope; they are independent of Focused Code versus full-page execution scope.
- Overhaul must visibly transform at least six of seven dimensions, including composition and mobile recomposition; its tally must mark at least six `verified`.
- Preserving truthful content, routes, behavior, and SEO does not mean preserving current layout or section silhouettes.
- A batch with an unrealized approved invariant is unfinished work, not an exhausted polishing pass.
- Every approved route, including standalone Focused Code, has a Design Read and three to five positive route invariants. Only redesigns select a redesign mode and map current patterns; non-redesign builds must not invent either.
- Only `verified` passes an applicable ledger or dimension row. `planned`, `implemented`, and `blocked` keep completion open; `waived` means genuinely inapplicable and does not pass.

## Route every request

Choose the narrowest execution surface that still completes the approved route and, for redesigns, its approved redesign mode.

- **Roadmap** — product truth, scope, information architecture, dependencies, risks, and checkpoints only.
- **Recommend** — roadmap plus exactly three routes and one recommendation; default for new sites and full redesigns.
- **Code Build** — build a new approved site, page, or experience in an authorized target.
- **Code Redesign** — audit an existing repository, recommend routes, then implement the approved direction.
- **Focused Code** — implement an approved page, section, component, interaction, or state within exact scope.
- **Audit** — read-only critique of brand, hierarchy, balance, mobile behavior, interaction, accessibility, performance, and code quality.
- **Optional Figma Design** — create an editable Figma design only when the user explicitly asks for Figma.
- **Figma-to-Code** — inspect a supplied Figma design and implement it in code when the user explicitly asks.

Routing rules:

- New site, full redesign, or "recommend first" without an approved route → **Stage A only**.
- A full redesign must not enter Focused Code before route approval. After approval, Focused Code may narrow the implementation surface, but it may not narrow the approved Preserve, Recompose, or Overhaul scope.
- Clear approval of a route presented earlier, or a pasted approval record → validate the **Stage B entry gate**.
- Audit or critique → read-only Audit mode.
- One unapproved page, section, component, or state → compact Stage A with exactly three scoped micro-routes.
- Approved ordinary hero planning or implementation → **Focused Code**. Explicitly use the §3a ordinary-hero fast path: construction and geometry audit only at 390/1440; name any unequal-column ratio, primary anchor, counterweight, and mobile order; batch hero plus next section with one approved asset and one motion treatment; cap normal corrections at two, with a third only for asset/signature work; defer the complete six-width accessibility, input, performance, and repository QA to Page milestone/final. This is the general progressive responsive timing; final QA remains mandatory. Every ordinary-hero plan must state the correction budget explicitly: "two normal passes; no third pass applies to this ordinary hero; one third targeted pass is reserved only for asset-dependent or signature-interaction work."
- Approved planning for an ordinary neighboring-section batch → **Focused Code**. Give an actionable plan before requesting any missing write gate: one two-to-four-section Design batch in semantic source order; Structure and batch review at 390/1440 only; a centered shared frame with `max(4px, viewport × 0.01)` gutter tolerance; at most two section-local corrections and no third pass for an ordinary batch. After the cap, log the defect for one bounded Page-level cross-section or breakpoint correction cycle that does not restart the local loop; if the same hard gate persists, state the blocker or request a material user decision. Complete six-width accessibility, input, performance, and repository QA only at Page milestone/final.
- An existing Figma link alone is context, not route approval and not permission to edit either Figma or code.

Every focused ordinary-hero plan must render a **Section geometry audit** with these exact nine headers:

| Viewport | Container | Left gutter | Right gutter | Gutter delta | Column ratio | Primary anchor | Counterweight | Exception |
|---|---|---:|---:|---:|---|---|---|---|

Before a render exists, label rows as planned targets and give concrete container maximum-width/alignment, left/right gutter formulas or values, computed delta with planned PASS/FAIL against tolerance, column ratio, primary anchor, counterweight, and exception for 390 and 1440. After rendering, replace targets with measured values and measured PASS/FAIL.

Words such as "build," "code," "implement," "execute," "React," "GSAP," or "start now" do not bypass Stage A.

## Stage A response gate

Mandatory Stage A order:

1. **Product truth**
2. **Roadmap**
3. **Companion availability**
4. **Three routes**
5. **Recommendation**
6. **Decision and STOP**

Before sending, verify:

1. Product truth and roadmap precede styling.
2. Current companion availability and planned fallbacks are explicit.
3. Exactly three named routes are expanded and meaningfully different.
4. Every route has every required standalone field.
5. One route is recommended from product evidence, but it is not executed.
6. Stage A permits no image tool, code or repository mutation, final brand invention, or application-code implementation.
7. The answer ends with an explicit route decision request and STOP.

A comparison table may summarize the routes, but it cannot replace expanded route sections. For every route, render each of these as its own bold label:

- **Thesis**
- **Design Read**
- **Product fit**
- **Dials**
- **Brand and visual language**
- **Layout and balance counterweights**
- **Mobile transformation**
- **Signature interaction**
- **Touch, keyboard, and reduced-motion equivalents**
- **Generated-asset families and sample prompt intent**
- **Inspiration board**
- **Route invariants**
- **Trade-offs, dependencies, and failure risk**

For a redesign route, also render **Redesign mode**, **Transformation Map**, and **Seven-dimension tally** as standalone labels. For a non-redesign route, omit those redesign-only artifacts; never invent a redesign baseline, current-pattern map, or Preserve/Recompose/Overhaul selection.

Render `Touch, keyboard, and reduced-motion equivalents` and `Inspiration board` as standalone bold labels for every route; do not bury either inside Signature interaction prose. If one field is missing from one route, Stage A is incomplete.

Every **Inspiration board** visibly renders three to five entries in this shape:

```markdown
**Inspiration board**

- [Website name](https://live.example/) · [Awwwards/Mobbin/source](https://source.example/)
  - Observed via: Observation ledger entry (`live opened` or exact source-study heading + `observed_at`).
  - Borrow: one directly observed principle.
  - Apply: the exact proposed section, system, or interaction.
  - Mobile translation: how the principle changes for the route's mobile form.
  - Do not copy: the identity, expression, or behavior that remains source-specific.
```

The discovery-source URL is required when available; a catalog name alone is not visible evidence. Before writing each counted `Borrow`, perform a quick, non-blocking observation by opening its live URL or using a dated existing source study that identifies the observable live site or state. Maintain a compact **Observation ledger** for selected references with website, live URL, discovery/source URL, observation basis (`live opened` or exact source-study heading plus `observed_at`), directly observed principle, and limitation. Each counted Inspiration board entry includes `Observed via` tied to that ledger; a bare "I observed it" statement is not evidence. If observation cannot be established promptly, substitute an observable reference; otherwise label it discovery metadata or supplemental study context, state the honest limitation, omit the unsupported `Borrow`, and do not count it toward the three-to-five observed references. Screenshot previews are optional and non-blocking: when capture is available and quick, add one to three representative previews per route; otherwise keep the complete clickable list and disclose that previews are unavailable. Separate directly observed facts from catalog metadata: do not claim unobserved interaction or scroll behavior. Never copy identity, page sequence, artwork, copy, or a signature interaction.

## Pinned image-companion adapter

- The approved route, asset ledger, performance budget, and conflict precedence govern whether `imagegen-frontend-web` is activated.
- Apply its one-horizontal-image-per-section rule only to explicitly approved section-reference-image deliverables passed to that companion. It never creates an image requirement for every section or page.
- Product mockups, element/icon/background families, paired hover/reveal states, and other production assets follow the approved brand/asset plan and use the suitable image tool; they do not trigger automatic section-composition generation.
- Activate `imagegen-frontend-mobile` only for approved mobile screen/flow comp deliverables. It does not automatically generate every breakpoint or route.
- Companion output counts may not expand approved scope or override accessibility, performance, or provenance constraints.

## Companion orchestration

Inspect the current skill catalog at the start of the relevant stage. Do not rely on remembered versions.

1. Read the current `design-taste-frontend` in full before route creation, then re-read it after approval before implementation.
2. After approval, read `brandkit` if installed.
3. After approval, read `imagegen-frontend-web` if installed.
4. After approval, read `imagegen-frontend-mobile` if installed.
5. After approval, read the system `imagegen` skill before generating or editing raster assets with GPT Image 2.
6. For a visually important screenshot-to-code task, read `image-to-code`.
7. For an existing project redesign, use `redesign-existing-projects` when available.
8. Route framework, performance, testing, motion, and Figma work to the relevant installed skills only when their triggers apply.

Apply the taste skill conditionally, including both design-facing and code-facing guidance. Its defaults are a vocabulary and quality floor, not commands. Product truth, user-approved direction, accessibility, optical balance, existing repository conventions, and content requirements take precedence. Do not blindly inherit fixed 8/6/4 dials, anti-center composition, Bento layouts, perpetual motion, a framework, or an animation library.

Fallbacks:

- Missing `brandkit` → use [Brand and assets](references/brand-and-assets.md).
- Missing `imagegen-frontend-web` → use [GPT Image 2 art direction](references/gpt-image-2-art-direction.md) and [Visual assets](references/visual-assets.md).
- Missing `imagegen-frontend-mobile` → use [Mobile app-web design](references/mobile-app-web.md).
- Missing image-generation access → create a prompt-and-placement ledger, use honest temporary media only when the user permits it, and report the blocked assets.
- Missing browser control → run available static and local checks, report the rendered-validation gap, and never claim screenshots were inspected.

In Stage A include:

> Available: [exact companions]. Unavailable: [exact companions]. Planned fallback after approval: [exact bundled references].

State a fallback once in the working update and once in the final handoff. Never say an unavailable skill or tool was used.

## Stage A — Recommend

Stage A is read-only except for local planning notes explicitly requested by the user. For a redesign, inspect a supplied live site, screenshots, analytics summary, or repository read-only when that evidence is available and useful. Do not call image generation, edit code, install packages, or mutate Figma.

### 1. Establish product truth

Infer what is safe and ask only about decisions that materially change the routes:

- product, audience, primary conversion, business model, and differentiator;
- must-keep content, claims, compliance, accessibility, localization, and SEO;
- existing identity, licensed fonts, photography, product UI, and usable assets;
- required pages, content readiness, launch constraints, target devices, and browser support;
- existing URL, repository, screenshots, analytics, or known defects for redesign work;
- cultural context, competitors, visual exclusions, and rights constraints.

Separate facts, assumptions, and open decisions. Never invent proof, testimonials, clients, awards, statistics, product capabilities, or regulated claims. Do not invent a final brand or product name; a naming territory may appear only as an explicitly hypothetical route cue.

### 2. Make the roadmap

Return the roadmap before art direction:

- objective and measurable success signals;
- audience and conversion journey;
- page, route, state, and content inventory;
- mobile-first information architecture;
- identity, asset, and rights inventory;
- research plan and precedent families;
- read-only current-state evidence for redesigns and the full repository write preflight planned after approval;
- accessibility, performance, legal, localization, content, and launch risks;
- approval checkpoints and final deliverables.

Use [Roadmap and approval](references/roadmap-and-approval.md).

### 3. Retrieve evidence

Use the bundled catalog before browsing hundreds of sites. Resolve the installed skill root from the loaded `SKILL.md`; set the shell working directory to that skill root before running its script:

```bash
node scripts/query-inspiration.mjs --query "editorial tactile mobile motion health" --limit 12
```

Replace the example terms with the product's category and creative tension. Read [Source studies](references/source-studies.md) for the user's named sites and [Taste recommender](references/taste-recommender.md) for retrieval logic. For every selected reference, perform the quick non-blocking observation required by the Inspiration board; broader current-source browsing is only required when requested or when freshness materially affects the decision.

References are evidence, not templates. Borrow principles—hierarchy, pacing, crop logic, density, mobile transformation, interaction roles, and conversion clarity—never another site's identity, copy, exact page sequence, proprietary artwork, or signature interaction wholesale.

### 4. Calibrate three design dials

- `DESIGN_VARIANCE` — 1 restrained to 10 experimental.
- `MOTION_INTENSITY` — 1 nearly static to 10 choreography-led.
- `VISUAL_DENSITY` — 1 gallery-like to 10 information-dense.

Calibrate each route from product truth rather than copying taste defaults. Read [Art direction](references/art-direction.md), [Typography](references/typography.md), and [Balance system](references/balance-system.md).

### 5. Present exactly three routes

Make them meaningfully different:

- **Evidence route** — trust, proof, utility, or product mechanics.
- **Culture route** — audience identity, editorial voice, or category culture.
- **Boundary route** — the most distinctive credible, usable, and accessible direction.

For each route, complete every field in the Stage A response gate, including the visible Inspiration board contract. Query the inspiration catalog once per recommendation unless the brief materially changes. Recommend one route using product, audience, conversion, content, accessibility, device, and feasibility evidence. Do not recommend an arbitrary hybrid.

Stage A stays technique-neutral. Discuss behavior and feasibility without choosing packages, frameworks, animation engines, CSS techniques, or file architecture. Sample prompt intent is allowed; generating the final images is not.

### 6. Ask for approval and STOP

End with:

> Approve **[recommended route]**, choose another route, or request one revision round. After approval, send the exact repository or authorized target directory plus the page/route/component scope, and I will design and implement it there.

Then STOP. Approval must name or unambiguously select a presented route. General enthusiasm, silence, a repository path alone, or permission given before the routes existed is not approval.

## Stage B entry gate

Execute in Code only when the conversation contains:

1. an approved route or pasted approval record;
2. the exact existing repository/work directory or a user-authorized new target directory;
3. the exact authorized product surface: pages, routes, components, or a named focused experience; and
4. create-new versus modify-existing intent.

If any are missing, ask for all missing gate items together in one concise question and do not mutate anything. Do not ask unrelated discovery questions at this gate. A valid code request never requires a Figma URL.

Derive the concrete file inventory during read-only repository preflight. If the user specified a file restriction, obey it. If a necessary shared-file change would expand the authorized product surface or collide with user work, pause with evidence.

Before writes, restate the route lock, dials, target path, scope, deliverables, create/modify policy, assumptions, and exclusions. If the earlier route details are not present in the current task, request the compact approval record rather than inventing them. A material change to thesis, audience, conversion, or scope returns to approval; implementation discoveries that preserve the lock may be resolved autonomously.

### First Stage B working update

When the entry gate is satisfied, the first working update must concisely state:

- the concrete approved thesis, dial values, signature interaction, asset families, target, product surface, and exclusions;
- the approved Design Read and three to five route invariants;
- for a redesign, the approved mode, Transformation Map, and seven-dimension tally; for a non-redesign build, including standalone Focused Code, that these redesign-only artifacts are inapplicable and were not invented;
- current companion availability and the exact fallback for every missing companion;
- read-only repository preflight, including user-change and file-inventory handling;
- brand kit, continuity bible, asset ledger, and conditional GPT Image 2/system image-generation work;
- mobile-first semantic/source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition, with 390/1440 construction inspection and 320 reserved as a Page-milestone/final stress test;
- semantic HTML, accessibility, keyboard, touch, reduced-motion, and performance responsibilities;
- progressive browser screenshot and optical-balance iteration: 390/1440 construction checks, then every required viewport at page milestones and final delivery;
- repository-native build, typecheck, lint, tests, console, route, asset, accessibility, and performance checks;
- that completion will be claimed only after evidence.

Then proceed with read-only preflight. Do not turn this update into a second design proposal.

## Stage B — Execute in Code

### 1. Inspect repository truth

Read [Repository preflight](references/repo-preflight.md). At minimum:

- resolve the exact target and applicable `AGENTS.md`;
- inspect `git status` or equivalent without discarding user changes;
- identify framework, package manager, route system, rendering model, browser support, and deployment constraints;
- map existing pages, components, tokens, fonts, styles, assets, content, tests, and commands;
- search for a design system before creating replacements;
- inspect `.openai/hosting.json`; when present, follow the required Sites workflow;
- identify safe files to modify and collisions with user-owned work.

Reuse suitable architecture and components. Do not overwrite unrelated edits. Ask only if a conflict materially changes scope, user data, public behavior, dependencies, or the approved direction.

### 2. Build the approved brand and asset system

Read [Brand and assets](references/brand-and-assets.md), [GPT Image 2 art direction](references/gpt-image-2-art-direction.md), and [Visual assets](references/visual-assets.md).

Create a continuity bible and asset ledger covering palette, typography, grid, spacing, radii, strokes, material language, art direction, crops, motion character, and usage rights. Then create only the approved families the product needs:

- product, packaging, device, or service mockups;
- editorial campaign images and environmental plates;
- background images, textures, light fields, and material surfaces;
- graphic elements, frames, masks, dividers, stamps, and motifs;
- a consistent illustration or expressive-icon family;
- registered plain/material, clean/distressed, day/night, or before/after pairs for reveal interactions.

Use one master per concept and derive coordinated crops and material states. Paired reveal images must preserve subject geometry, camera, crop, lens, and lighting. Avoid AI tells: pseudo-text, plastic texture, incoherent reflections, impossible joints, duplicated details, generic gradients, over-smoothed skin, and unrelated styles.

Functional navigation and control icons must remain legible, editable, accessible SVGs or a coherent code icon library—not generated raster art. Follow the repository's asset directories, formats, naming, responsive image pipeline, and licensing notes.

### 3. Design by implementing mobile first

Read [Code execution](references/code-execution.md), [Mobile app-web design](references/mobile-app-web.md), and [Typography](references/typography.md).

- Start with semantic reading order and the primary task. Use 390 and 1440 for Structure/construction inspection; reserve 320 for Page-milestone/final stress testing.
- Make mobile feel intentionally app-like through clear task hierarchy, compact chapters, explicit actions, touch-safe controls, and useful progressive disclosure—not through fake native chrome.
- Expand deliberately to 768, 1024, 1440, and wide screens. Do not merely stretch gutters or enlarge type.
- Implement real responsive components, content states, media crops, navigation, forms, and interactions.
- Reuse project tokens and primitives when fit; extend them coherently when the approved route needs it.
- Preserve semantic HTML, readable measures, visible focus, 44 px targets, keyboard flow, touch alternatives, and reduced-motion behavior.
- Optimize image dimensions, formats, loading, and layout stability. Protect the likely LCP asset and avoid CLS.
- Keep all controls real. If the scope includes a state, implement it; otherwise state the exclusion.

Complete every in-scope page and component. Do not leave TODOs, placeholder comments, "rest omitted," pseudo-code, blank sections, dead buttons, or knowingly broken responsive states.

### 3a. Build through progressive production passes

- **Structure pass:** establish semantic order, content hierarchy, real controls, section proportions, centered container, and gutters at 390 and 1440 only; do not add micro-motion or decorative polish.
- **Design batch pass:** build two to four related sections; apply approved type, imagery, tokens, crops, and interaction family; compare neighboring sections at 390 and 1440 only before browser review.
- **Page milestone pass:** complete 320, 390, 768, 1024, 1440, and wide optical, accessibility, interaction, performance, and production checks.

The section-local two-pass cap governs visual polishing. Asset-dependent or signature-interaction work may receive one third targeted section-local pass. After the local cap, log the unresolved defect for Page-level balance. The Page-level pass may make one targeted cross-section or breakpoint correction cycle; it does not restart the section-local loop. If the same hard-gate failure remains after that Page-level correction, state the blocker or request a material user decision; never silently loop.

For an ordinary hero:

1. lock content hierarchy and the balanced frame at 390 and 1440;
2. integrate the approved hero asset;
3. add one interaction or motion treatment;
4. validate the hero together with the next section;
5. defer complete breakpoint and production QA to the page milestone.

A hero leaves this fast path only for a genuinely complex generated asset family, 3D/canvas behavior, a registered image sequence, or choreography essential to product meaning.

Tool and validation economy: read each unchanged companion/reference once per stage and reuse decisions; query the inspiration catalog once per materially unchanged recommendation brief; generate each coherent asset family once from approved masters and derive crops or edits; batch independent read-only inspections; reuse the browser and dev server across minor styling changes; use targeted checks during work and run build, typecheck, lint, and full tests only at page milestones and final handoff; report concise progress once per meaningful pass. Speed must not weaken approval, content truth, accessibility/input parity, user-change safety, final breakpoint coverage, or honest skipped-check reporting. Speed also must not reduce the approved route or its invariants, asset system, page coverage, or mobile composition; for a redesign, it must not reduce the selected mode, transformation coverage, or mobile recomposition.

### 4. Implement coherent motion

Read [Interaction strategy](references/interaction-strategy.md) and [Effect recipes](references/effect-recipes.md).

Implement one signature interaction and one supporting transition family. Every hover or pointer effect needs a touch/keyboard equivalent or must remain decorative. Every choreography-led experience needs a reduced-motion state that preserves hierarchy and meaning.

Use native platform behavior for simple motion. Use an installed motion or GSAP skill only when the approved interaction genuinely needs it and the repository can support it. Do not add a library for a trivial effect.

For paired-image reveals, preload both registered images, keep identical geometry, animate compositor-friendly masks/transforms where possible, expose the state without hover, and prevent layout shift.

### 5. Validate the rendered experience

Read [Rendered validation](references/rendered-validation.md), [Balance system](references/balance-system.md), and [Quality gates](references/quality-gates.md).

At interim construction reviews, run the project and inspect the current two-to-four-section batch at 390 and 1440. At page milestones and final delivery, inspect real screenshots at 320, 390, 768, 1024, 1440, and wide. Iterate within the correction-pass limits until:

- primary and secondary anchors are clear;
- asymmetry has an explicit counterweight;
- optical mass, whitespace, density, and edge pressure feel intentional;
- headline wraps, body measure, media crops, and focal points hold;
- sections have deliberate pacing rather than repeated generic blocks;
- no overflow, clipping, occlusion, dead space, accidental symmetry, or unsupported hover remains;
- motion-off and reduced-motion states preserve the design.

Rendered validation is an iteration loop, not a final screenshot ritual. If browser control is unavailable, disclose that gap and never claim the page was visually inspected.

### 6. Run production checks

Use the repository's own commands. Run the relevant subset of:

- build and production compile;
- typecheck;
- lint and formatting check;
- unit, integration, and end-to-end tests;
- accessibility checks plus keyboard/focus inspection;
- console, network, route, link, and broken-asset inspection;
- responsive overflow and content-expansion checks;
- performance review for LCP, CLS, INP-sensitive work, asset weight, and animation cost.

Do not install or upgrade dependencies silently. Fix in-scope regressions and rerun the failing check. Report commands not run and why.

### 7. Handoff

Return:

- approved route and final dial values;
- approved Design Read, route invariants, and completed Route Realization Ledger;
- for a redesign only, approved mode, Transformation Map, and seven-dimension tally;
- exact files/pages/routes/components changed;
- brand-kit, continuity bible, and generated-asset ledger summary;
- responsive, interaction, accessibility, and reduced-motion coverage;
- screenshots or rendered-validation evidence;
- commands and checks run with results;
- reused versus new dependencies and components;
- unresolved content, licensing, legal, browser, deployment, or performance risks;
- unavailable companion skills and the fallback used.

Do not claim production-ready or complete until the relevant validations pass. Read [Workflow integration](references/workflow-integration.md) for the end-to-end sequence.

## Optional Figma workflows

Use [Optional Figma execution](references/figma-execution.md) only when the user explicitly asks for Figma-first design, editable Figma delivery, or Figma-to-Code.

- Optional Figma Design keeps Stage A approval and requires an editable target plus exact Figma scope before mutation.
- Figma-to-Code first reads the official Figma design-to-code instructions, inspects the supplied design, then uses the normal repository preflight and code validation path.
- On entering Optional Figma Design, explicitly confirm that the official `figma-use` prerequisite and every specialized Figma prerequisite will be loaded before the corresponding tool call.
- Never ask for Figma merely because the work is visually ambitious.
- Never substitute a flattened screenshot for editable Figma when Figma delivery was requested.
- Never substitute a Figma handoff for code when Execute in Code was approved.
