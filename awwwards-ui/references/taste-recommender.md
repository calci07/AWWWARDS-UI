# Art-direction recommender

Use this reference when the user asks what style, theme, art direction, visual genre, or interaction language suits a website, or before a visually ambitious build whose direction is not already locked.

## Contents

- [Principle](#principle)
- [Evidence to collect](#evidence-to-collect)
- [Generate three routes](#generate-three-routes)
- [Route families](#route-families)
- [Score and recommend](#score-and-recommend)
- [Output contract](#output-contract)
- [Use the inspiration catalog](#use-the-inspiration-catalog)
- [Visible inspiration boards](#visible-inspiration-boards)
- [Asset-fit decisions](#asset-fit-decisions)
- [Common recommendation failures](#common-recommendation-failures)

## Principle

Recommend a visual system from the subject's truth and the audience's desired response. Do not ask the user to choose from fashionable labels before explaining what each direction communicates.

A recommendation is useful only when it can reject attractive but off-brand ideas.

## Evidence to collect

Establish or infer these inputs. Ask only when a missing answer would materially change the outcome.

| Evidence | Why it changes direction |
|---|---|
| Product or organization truth | Supplies the central metaphor and prevents logo-swap concepts |
| Audience and context of use | Determines trust, energy, reading density, and interaction tolerance |
| Primary action | Determines hierarchy and how much spectacle can precede action |
| Buying/decision stage | Changes the balance between atmosphere, education, proof, and price |
| Real proof and claims | Sets what may be visualized without fabrication |
| Available identity/media | Separates viable direction from asset fantasy |
| Content volume and IA | Determines whether the site behaves like a story, catalog, archive, or tool |
| Stack, schedule, maintenance | Constrains motion and spatial techniques |
| Device mix and accessibility | Tests whether the idea survives touch and motion-off states |
| Reference likes/dislikes and reasons | Reveals the principle the user values without copying a source |

Write the brand tension as two useful forces, for example: clinical but humane; playful but credible; archival but alive; industrial but intimate.

## Generate three routes

Produce three genuinely different strategies, not palette variations.

1. **Evidence-led route:** the clearest expression of product truth, proof, and conversion.
2. **Culture-led route:** the strongest ownable editorial, symbolic, or narrative world.
3. **Boundary route:** the most ambitious viable direction that tests the brand's edge without sacrificing meaning.

The labels describe roles, not fixed aesthetics. A culture-led route can be minimal; an evidence-led route can be cinematic.

For each route define:

- one-line Design Read;
- for a redesign only, selected Preserve/Recompose/Overhaul mode;
- concept sentence;
- three character adjectives and three anti-adjectives;
- composition grammar;
- type voice and hierarchy;
- palette/material logic;
- image/media direction;
- section rhythm and conversion path;
- one signature behavior plus two supporting motion verbs;
- phone recomposition;
- required assets and missing proof;
- production complexity, input equivalents, and reduced-motion/static fallback;
- three to five references, each attached to a specific principle;
- three to five positive route invariants;
- for a redesign only, a complete current-pattern Transformation Map;
- for a redesign only, a separate seven-dimension applicability/pass tally;
- primary risk.

Keep these fields compact for all three routes. After recommending one, expand only that selected direction into the full page, asset, effect, and prompt contracts. Do not produce a route whose success depends on assets the project cannot obtain. Present that as a conditional route if it is still strategically valuable.

## Route families

Use these as vocabulary, never as templates.

| Family | Fits when | Typical grammar | Common failure |
|---|---|---|---|
| Editorial cultural institution | Ideas, scholarship, art, or authorship are central | strong type, captions, open grids, archival/media rhythm | decorative magazine styling with weak navigation |
| Cinematic human outcome | The felt result is more persuasive than feature detail | full-bleed human media, simple proposition, staged proof | expensive media and generic emotional montage |
| Clinical naturalism | Science must feel trustworthy and inhabitable | botanical/material palette, calm facts, product evidence | greenwashing or unsupported wellness language |
| Product museum | Many features/objects need one spatial relationship | plinths, specimens, galleries, indexed scenes | slow entry and inaccessible spatial navigation |
| Illustrated world | A broad or intimidating system benefits from approachability | coherent environment, embedded product signals, narrative landmarks | cute world detached from actual product evidence |
| Typographic specimen/archive | Language, publishing, identity, or history is itself the subject | type as object, fine rules, variable states, documents | illegible display excess and long loaders |
| Tactile product folklore | Packaging, ingredients, craft, ritual, or subculture is distinctive | mascots, cutouts, material type, product theater | decorative chaos and overloaded canvases |
| Precision instrument | The product promises control, rigor, or professional craft | calibrated grids, procedural detail, exact state change | generic cyber/terminal styling |
| Poster-led culture | Membership, event, arts, music, or collective identity needs immediacy | cropped type, color field, symbol, concise statements | rasterized text and weak long-form hierarchy |
| Quiet material luxury | Trust, rarity, space, and material quality matter | restraint, large images, refined type, slow transitions | beige-serif sameness and empty claims |
| Brutalist or anti-design | Cultural position genuinely benefits from friction | raw hierarchy, hard grids, direct interaction | hostility, poor legibility, trend cosplay |
| Spatial/WebGL focal scene | The central idea depends on material or spatial behavior | one interactive object/scene plus conventional content | spectacle as navigation, loader failure, device exclusion |

Combine at most two families when the tension is meaningful. Name the relationship, such as "clinical naturalism framed as a product museum." Do not create an unprincipled mixture of trends.

## Score and recommend

Score every route from 0 to 5 on:

- **Relevance:** makes a true subject-specific idea visible.
- **Ownability:** remains recognizable without the logo.
- **Usefulness:** improves comprehension, orientation, trust, emotion, or action.
- **Asset fit:** can be executed with real or realistically obtainable material.
- **Mobile resilience:** retains its idea without hover, wide framing, or continuous rendering.
- **Feasibility:** fits stack, schedule, team, and maintenance.
- **Accessibility:** meaning survives keyboard, touch, zoom, and motion reduction.
- **Performance:** fits a declared media/JavaScript/rendering budget.
- **Transformation magnitude:** for a redesign, visibly meets the selected mode across the applicable seven design dimensions; for a non-redesign route, including standalone Focused Code, realizes the approved route invariants without inventing a redesign baseline.
- **Route distance:** differs from the other two routes in composition system, image behavior, section rhythm, and signature interaction.

Weight relevance and usefulness twice when totals are close, but include transformation magnitude and route distance in that judgment rather than rewarding a merely attractive cosmetic variation. Reject a redesign route regardless of total when it misses the selected transformation floor. Reject any route when it is not meaningfully distant from another route or depends on fabricated proof, inaccessible interaction, unlicensed identity, or a blocking experience.

Recommend one route explicitly. Explain:

1. what it makes the audience understand or feel;
2. why it is more specific than the alternatives;
3. why it fits the available assets and mobile context;
4. what must be proven or acquired before code execution;
5. which appealing alternative was rejected and why.

## Output contract

Use the Stage A order from `SKILL.md`:

1. **Product truth.**
2. **Roadmap.**
3. **Companion availability.**
4. **Three-route table plus three complete route expansions.**
5. **Recommendation:** selected direction, rationale, biggest risk, and control.
6. **Decision request and STOP.**

Each expansion includes concept, character and anti-goals, composition, typography, palette/materials, imagery, balance counterweights, phone transformation, interaction plus input/reduced-motion equivalents, asset needs, a standalone **Inspiration board**, and risk. Always stop for explicit selection before final media generation, code writes, dependency changes, or Figma mutation. Broad permission given before the routes existed does not replace route approval.

## Use the inspiration catalog

Query rather than loading the entire catalog. Query once per materially unchanged recommendation brief and reuse the result. Resolve the installed skill root from the loaded `SKILL.md`, set the command working directory to that root, and only then run:

```bash
node scripts/query-inspiration.mjs --query "editorial health" --limit 12
node scripts/query-inspiration.mjs --tags "typography,editorial" --limit 8 --json
```

Use three to five references per route for different principles:

- one for composition or hierarchy;
- one for image/material treatment;
- one for interaction or motion;
- one for phone recomposition.

When relevant deep/user-curated evidence exists, count at least one such precedent for the route. If none is relevant, substitute another observable relevant source when possible; otherwise disclose the honest limitation and do not force an unrelated deep/user-curated quota.

Apply the same relevance gate to Mobbin for mobile-heavy work: include applicable Mobbin site or app-pattern evidence when it is relevant. If none is relevant, substitute another observable relevant mobile source when possible; otherwise disclose the limitation and do not insert weak Mobbin evidence merely to satisfy a source-family count.

Read `references/source-studies.md` when a deep user-supplied reference is relevant. A catalog row is discovery metadata, not evidence of behavior that was not observed. Before writing each `Borrow`, perform a quick, non-blocking observation by opening the live URL or using a dated existing source study that identifies the observable live site or state and inspecting only what is directly available. Every `Borrow` is counted evidence. This observation is required even when screenshot previews are skipped; it does not require a wider research session. Separate directly observed facts from catalog metadata and never claim an unobserved interaction, transition, or scroll behavior.

Apply this evidence ceiling to directory-only studies:

- A record with `source_type: directory-study`, `live_url: null`, or an otherwise directory-only basis is a synthesis/evidence ceiling, not direct interaction observation.
- Present a reusable principle only as a **study-derived heuristic** and a **proposed translation** for this design, with a visible limitation. Keep the source-study heading, date, and access basis beside it.
- It must not occupy a counted `Borrow` slot or support exact placement, interaction attribution, or a claim that a named app used the proposed behavior.
- It may provide supplemental Mobbin context and satisfy the relevant Mobbin-family disclosure, but it does not replace a counted observable live reference. If no observable Mobbin live reference is available, disclose that limitation and use another observable mobile source for the counted evidence.

Maintain a compact **Observation ledger** for selected references with these fields:

| Website | Live URL | Discovery/source URL | Observation basis | Directly observed principle | Limitation |
|---|---|---|---|---|---|

Observation basis for a counted reference is `live opened` or an exact source-study heading plus `observed_at` that identifies the observable live site or state. A bare "I observed it" statement is not evidence. If observation cannot be established promptly, substitute another observable reference. Otherwise retain the link only as discovery metadata or supplemental study context, state an honest observation limitation, omit the unsupported `Borrow`, and do not count it toward the route's three-to-five observed references.

Never say "combine Site A and Site B." State the transformed principles: for example, "use an indexed archive structure, but derive the visual artifact from the client's manufacturing process."

## Visible inspiration boards

Every route renders a standalone board containing three to five references:

```markdown
**Inspiration board**

- [Website name](https://live.example/) · [Awwwards/Mobbin/source](https://source.example/)
  - Observed via: Observation ledger row (`live opened` or exact source-study heading + `observed_at`).
  - Borrow: one directly observed principle.
  - Apply: the exact proposed section, system, or interaction.
  - Mobile translation: how the principle changes for the route's mobile form.
  - Do not copy: the identity, expression, or behavior that remains source-specific.
```

Each counted reference keeps a visible clickable live website URL and a discovery/source URL when available. A catalog name is not visible evidence. Each Inspiration board entry includes an `Observed via` line tied to the Observation ledger and all four operational fields: `Borrow`, `Apply`, `Mobile translation`, and `Do not copy`.

Screenshot previews are optional and non-blocking, separate from the required quick observation. When browser capture is available and quick, add a compact strip or contact sheet with one to three representative previews per route. When capture is unavailable or slow, use the complete clickable list as the fallback and explicitly disclose that previews are unavailable. Never copy identity, copy, artwork, exact page sequence, or a signature interaction.

## Asset-fit decisions

| Available assets | Viable move |
|---|---|
| Real campaign photography/video | cinematic or editorial media can lead |
| Product CAD/3D only | art-direct render views; use diagrams and material studies; do not fake real-world proof |
| UI screenshots | treat authentic UI as evidence; crop with consistent frames; avoid invented dashboards |
| Logo only | begin with typography, layout, color, and commissioned asset plan; do not invent a mature identity history |
| Archive documents | use as indexed evidence with rights and legibility checks |
| No usable imagery | build a typographic/system direction or generate clearly art-directed campaign assets |

When generating approved assets, read `references/gpt-image-2-art-direction.md`. When visual section references will materially reduce implementation ambiguity, read `references/workflow-integration.md` and validate the result in the rendered page.

## Common recommendation failures

- **Theme label without reasoning:** "luxury minimal" is not a direction. State what truth it expresses and through which grammar.
- **Three cosmetic variations:** different colors on the same layout are not three routes.
- **Technology before concept:** do not recommend WebGL, GSAP, or a custom cursor to signal ambition.
- **Reference copying:** a source's distinctive object, copy, scene, or navigation is not a reusable component.
- **Ignoring proof:** a conversion site cannot survive on atmosphere when key claims, pricing, logistics, or trust are missing.
- **Desktop-only selection:** reject a concept that becomes generic when hover and wide framing disappear.
- **AI asset fantasy:** never assume dozens of consistent campaign images can be generated without art direction, edit continuity, QA, and production time.
- **No anti-goals:** if a route cannot reject attractive wrong ideas, it is too vague.
