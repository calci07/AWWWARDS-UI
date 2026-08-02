# Roadmap and approval

Use this reference for every new site, full redesign, or substantial focused design. It defines the read-only recommendation stage and the approval record that unlocks scoped code work.

## Contents

- [Route artifacts and redesign transformation floor](#route-artifacts-and-redesign-transformation-floor)
- [Stage A output](#stage-a-output)
- [Approval rules](#approval-rules)
- [Approval record](#approval-record)
- [New-task continuation](#new-task-continuation)

## Route artifacts and redesign transformation floor

Every route, including a standalone Focused Code route, begins with a one-line Design Read inferred from the brief and defines three to five positive route invariants. Only an existing-site redesign selects one transformation mode and maps current patterns. A non-redesign build has no approved redesign baseline to map, so it must not invent a Preserve/Recompose/Overhaul selection or a Transformation Map.

For redesigns, transformation scope is independent of whether execution later uses Focused Code or a full-page surface.

| Mode | Intent | Minimum visible change |
|---|---|---|
| Preserve | Repair quality while keeping the established visual system | Targeted fixes; no transformation floor |
| Recompose | Keep recognizable brand DNA but rebuild hierarchy and page rhythm | At least four applicable design dimensions |
| Overhaul | Full Awwwards-caliber redesign while retaining truthful content and functionality | At least six applicable design dimensions, including composition and mobile recomposition |

The seven design dimensions are:

1. page and section composition;
2. typography and hierarchy;
3. palette, texture, and materiality;
4. imagery, product media, icons, and generated asset system;
5. section rhythm and layout-family diversity;
6. motion and signature interaction;
7. mobile order, crop, navigation, interaction, and density.

For every redesign route, render a **Transformation Map** that covers every major current page pattern and distinguishes truthful content or behavior that remains from visual composition that changes. Use this exact six-column header:

| Current pattern | Retire or preserve | Replacement | Reference evidence | Mobile translation | Acceptance signal |
|---|---|---|---|---|---|

Every redesign route also creates a separate **Seven-dimension applicability/pass tally**. It does not replace or alter the Transformation Map. Use exactly seven rows, one for each named design dimension:

| Dimension | Applicable | Transformation Map rows | Route Realization Ledger rows | Rendered acceptance evidence | State/waiver |
|---|---|---|---|---|---|

During Stage A, decide applicability, link the planned Transformation Map rows, leave the Stage B ledger/evidence links pending, and use `planned` or a documented inapplicable `waived` state. During Stage B, complete the ledger and rendered-evidence links. `verified` is the only passing state for an applicable dimension. `planned`, `implemented`, and `blocked` remain open; `waived` is allowed only when the dimension is genuinely inapplicable and never counts as passed.

For Overhaul, page and section composition plus mobile recomposition are always applicable and may never be waived. At least six dimensions must finish `verified`; no waiver may reduce that verified total.

Each route, including a standalone Focused Code route, defines three to five positive, visible **route invariants**. Generic adjectives such as "premium," "bold," and "clean" do not count. Use this structure:

| Invariant | Location | Source principle | Mobile form | Acceptance signal | Inapplicable/waiver conditions |
|---|---|---|---|---|---|

Every invariant names where it appears, the selected reference principle that supports it, its deliberate mobile form, and the rendered signal that proves it. State `none` when no inapplicable or waiver condition exists. A route is not approval-ready if its Design Read or invariant set is missing, generic, or unverifiable. A redesign route is also incomplete without its mode, Transformation Map, and seven-dimension tally; those three artifacts are omitted for a non-redesign route.

## Stage A output

Return the following in this exact order.

### 1. Product truth

- **Known:** product, audience, conversion, required content, brand assets, compliance, repository context, and device scope.
- **Assumed:** reasonable inferences that do not alter the product, claims, or implementation authority.
- **Open:** only decisions whose answers could materially change a route.
- **Excluded:** invented proof, fake capabilities, placeholder claims presented as facts, copied identity, and unlicensed assets.

### 2. Roadmap

Include:

- objective and measurable success signals;
- audience journey and primary action;
- page, route, section, and state inventory;
- mobile-first content order;
- brand, content, asset, and rights inventory;
- research and precedent plan;
- read-only current-state evidence for redesigns and the full repository write preflight planned after approval;
- accessibility, localization, SEO, content, legal, browser, performance, and launch risks;
- approval, implementation, rendered-review, and production-validation checkpoints.

For a redesign, add a read-only current-state audit: what to preserve, repair, remove, and newly create.

### 3. Companion availability

State the exact active companions, unavailable companions, and named bundled fallback for each missing capability.

### 4. Three-route decision table and expansions

Present exactly three distinct routes: Evidence, Culture, and Boundary. Each row states thesis, dials, image world, type, color, layout, balance plan, mobile behavior, signature interaction, brand/asset needs, precedents, trade-offs, and failure risk.

Then expand every route using standalone bold labels for thesis, product fit, dials, brand/visual language, layout/balance, mobile, signature interaction, touch/keyboard/reduced motion, generated assets/prompt intent, **Inspiration board**, and trade-offs/risk. Never merge the touch/keyboard/reduced-motion field or Inspiration board into other prose. A table never substitutes for the expansions. A palette swap is not a different route.

Each route expansion, including standalone Focused Code, includes its Design Read and three to five route invariants. A redesign expansion additionally includes its selected Preserve/Recompose/Overhaul mode, complete Transformation Map, and separate seven-dimension tally. A non-redesign expansion omits all three redesign-only artifacts and does not fabricate a redesign baseline. Routes must differ in composition system, image behavior, section rhythm, and signature interaction, not merely palette or typography.

Every Inspiration board contains three to five visible references in this exact shape:

```markdown
**Inspiration board**

- [Website name](https://live.example/) · [Awwwards/Mobbin/source](https://source.example/)
  - Observed via: Observation ledger row (`live opened` or exact source-study heading + `observed_at`).
  - Borrow: one directly observed principle.
  - Apply: the exact proposed section, system, or interaction.
  - Mobile translation: how the principle changes for the route's mobile form.
  - Do not copy: the identity, expression, or behavior that remains source-specific.
```

Before writing each `Borrow`, perform a quick, non-blocking observation of the live URL or use a dated existing source study that identifies the observable live site or state. Every `Borrow` is counted evidence. Maintain a compact **Observation ledger** with website, live URL, discovery/source URL, observation basis (`live opened` or exact source-study heading plus `observed_at`), directly observed principle, and limitation. Each `Observed via` line must identify that ledger evidence; a bare "I observed it" statement is not evidence.

Directory-only studies are supplemental Mobbin context, not counted observation entries. A `directory-study`, `live_url: null`, or other directory-only study may show a **Study-derived heuristic**, **Proposed translation**, and visible **Limitation** below the board; it does not replace a counted observable live reference and may not receive a counted `Borrow` line or support exact screen placement or interaction attribution. If there is no observable Mobbin live reference, disclose that limitation and use another observable mobile source in the counted three-to-five references.

If observation cannot be established promptly, substitute the reference. Otherwise label it discovery metadata, state an honest limitation, omit `Borrow`, and do not count it toward the three-to-five observed references. The live website link is required for every counted reference, and the discovery/source link is required when available. Screenshot previews are optional and non-blocking. When quick browser capture is available, append one to three representative previews for that route; when capture is unavailable or slow, retain the complete clickable list and disclose that previews are unavailable.

### 5. Recommendation

Recommend one route using product fit, audience trust, conversion clarity, content feasibility, distinctiveness, mobile integrity, accessibility, and likely production cost. Name the biggest risk and its control.

### 6. Decision request and STOP

Use:

> Approve **[route]**, choose another route, or request one revision round. After approval, send the exact repository or authorized target directory plus the page/route/component scope, and I will design and implement it there.

Stop after the decision request. Do not generate final images, write code, install packages, or mutate Figma.

## Approval rules

Approval is valid when the user:

- names a route;
- says "approve the recommended route" when only one is explicitly recommended;
- supplies a prior approval record and confirms it remains current.

Approval is not valid when the user:

- says only "looks good" in a multi-route context;
- provides a repository or Figma link but no route selection;
- asks to "go ahead" before routes were presented;
- approves an undefined hybrid.

Return to Stage A if the requested change alters the thesis, audience, conversion, page inventory, brand character, asset system, or material scope. Small content, spacing, crop, component, and engineering refinements that preserve the lock remain Stage B.

## Approval record

Before Execute in Code, write:

```text
APPROVED ROUTE
Name:
Thesis:
Design variance:
Motion intensity:
Visual density:
Design Read:
Route invariants:
Redesign mode (redesign only; omit for non-redesign):
Transformation Map (redesign only; omit for non-redesign):
Seven-dimension tally (redesign only; omit for non-redesign):
Primary conversion:
Required pages/routes/states:
Brand cues:
Asset families:
Signature interaction:
Known constraints:
Approved by user:
Target repository or authorized directory:
Authorized product surface (pages/routes/components):
User-imposed file restrictions:
Write policy (new target / modify named targets):
Locked deliverable inventory:
Derived file inventory after read-only preflight:
```

Keep the record in the conversation and, when useful, a project decision document. It controls scope; it does not grant authority outside the named target.

For Optional Figma Design, append the exact editable file and page/frame namespace. Figma approval and code-write approval are separate.

## New-task continuation

Accept a pasted approval record or an unambiguous summary of the chosen route. Verify that the product truth still matches, then resolve the exact target, authorized product surface, any file restrictions, and new-versus-existing policy. Derive concrete files during read-only preflight. Do not force a new three-route exercise when the earlier decision remains adequately documented.
