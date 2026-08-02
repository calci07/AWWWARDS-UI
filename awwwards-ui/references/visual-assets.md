# Visual assets in the codebase

Choose assets by truth, authorship, and narrative role. More imagery does not make a site more art-directed.

## Source priority

1. Supplied, verified brand and product assets.
2. Commissioned or licensed photography, film, illustration, and type.
3. Authorized product renders and editable interface content.
4. Generated conceptual imagery, textures, backgrounds, elements, illustrations, and mockup scenes after approval.
5. Clearly labeled temporary assets only when a final source is blocked and the user accepts the limitation.

Never generate replacements for a real customer, facility, award, claim, product feature, or documentary event.

## Role and continuity

Assign every asset one primary role: evidence, explanation, product truth, emotional context, orientation, material atmosphere, interaction state, or decorative support. Remove assets with no role and mark meaningful versus decorative media.

Lock family palette/grade, light, lens/viewpoint or illustration perspective, material/texture vocabulary, retouch/imperfection, crop/negative-space grammar, edge/stroke/corner behavior, and anti-generic exclusions. Review the family as a contact sheet before integration.

## Shared family ledger

Use one shared family ledger for all real, generated, and derived assets. Family-level rules and per-asset consumers live in the same record so code, crops, interaction states, rights, accessibility, and performance cannot drift.

| Family/asset | Purpose and consumers | Provenance/master | Derived crops/variants | Registered hover/reveal pair | Rights | Alt/decorative state | Performance budget | Touch/reduced-motion equivalent |
|---|---|---|---|---|---|---|---|---|

- Record real, generated, or derived provenance, source or master prompt, owner, repository path, and rights status before integration.
- Use master-to-crop derivation: create one approved master per concept, then derive named desktop, tablet, and mobile crops or material states with traceable relationships.
- Register hover/reveal image pairs by family and state. Lock canvas, subject geometry, camera, crop, lighting, and focal point; preload both states and prevent layout shift.
- Give every asset explicit alt text or decorative state and verify that an interaction pair does not duplicate announcements.
- Set a performance budget covering intrinsic dimensions, format, encoded weight, loading priority, responsive sizes, and likely LCP/CLS impact.
- Register a touch equivalent and reduced-motion/static equivalent for every hover, reveal, sequence, crop transition, or material swap. The alternative must preserve meaning and access to both states.

An unregistered one-off, an independently generated crop, unresolved rights, missing accessibility state, or an asset without a performance budget cannot close its Route Realization Ledger row.

## Product mockups and imagery

The approved route, shared asset ledger, performance budget, and conflict precedence govern image-companion activation. Apply `imagegen-frontend-web`'s one-horizontal-image-per-section rule only to explicitly approved section-reference-image deliverables passed to it, never to every section or page. Product mockups, element/icon/background families, paired hover/reveal states, and other production assets follow the approved brand/asset plan and use the suitable image tool. Activate `imagegen-frontend-mobile` only for approved mobile screen/flow comp deliverables, not every breakpoint or route. Companion output counts may not expand approved scope or override accessibility, performance, or provenance constraints.

- Preserve verified geometry, labels, interfaces, colors, materials, and proportions.
- Keep product UI as real markup when possible.
- Generate environments around truth, never invented product details.
- Define hero, detail, contextual, mobile portrait, and thumbnail crops.
- Record source, prompt/provenance, master-to-crop relationship, rights, owner, and consumers in the shared family ledger.

## Icons and graphic elements

- Functional icons are coherent editable SVGs or code components from an authorized source.
- Expressive illustrations and illustrative icons may be generated, but must share one governed family.
- Define grid, stroke, fill, cap, corner, perspective, texture, metaphor, and accessible-label rules.
- Do not mix outline, filled, 3D, hand-drawn, and photographic icons without a concept.
- Test at actual rendered size, high contrast, keyboard focus where interactive, and multiple pixel densities.

## Backgrounds, textures, and time-based media

Protect readable contrast and focal hierarchy. Test seams, object position, responsive crops, compression, and alpha edges. Avoid random noise, haze, glow, and generic gradient wallpaper. Provide quiet fields for dense content and forms.

Film, frame sequences, or spatial scenes require an optimized poster, semantic description, explicit controls, reduced-motion/static path, device tiers, and conventional navigation/actions outside the scene.

## Repository integration

Inspect and follow existing asset folders, aliases, bundler/image component, naming, optimization, licensing, and content-management conventions. Do not create a competing directory structure.

- Use SVG for editable functional vectors.
- Use repository-native responsive image formats/components for raster media.
- Supply intrinsic dimensions/aspect ratio to prevent layout shift.
- Choose eager/high-priority loading only for actual LCP candidates.
- Lazy-load below-fold and expensive media.
- Provide `srcset`/sizes or framework equivalent, deliberate object position, and tested crops.
- Keep decorative media out of the accessibility tree; write specific alt text for meaningful media.
- Do not embed secrets, private source files, or unlicensed originals.

## Rendered validation

Inspect each asset master once at source or full resolution.

During construction, inspect current-batch crop behavior at 390 and 1440 only.

Complete six-width crop QA at Page milestones and final delivery, not per asset or per section during construction. Reject synthetic anatomy/text/reflections/contact/geometry, fake branding/data/interfaces/evidence, family drift, missing responsive crop, poor contrast, broken alpha/compression, layout shift, excessive weight, unresolved rights, or quality that works only behind blur or tiny display.

Figma asset placement is relevant only when the user explicitly requests Figma; production code follows repository conventions.
