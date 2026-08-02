# GPT Image 2 art direction for web assets

Use this reference in Stage B, after route approval, when a website needs generated campaign imagery, editorial photographs, material variants, textures, product environments, or aligned image pairs. Stage A may show prompt intent but must not generate. At the observed date, OpenAI documents `gpt-image-2` as supporting generation and high-quality image editing. Re-check official documentation when an API/model detail matters: https://developers.openai.com/api/docs/guides/image-generation

## Contents

- [Creative rule](#creative-rule)
- [Asset-set planning](#asset-set-planning)
- [Prompt anatomy](#prompt-anatomy)
- [Master and edit workflow](#master-and-edit-workflow)
- [Paired ceramic and metallic example](#paired-ceramic-and-metallic-example)
- [Magazine and museum quality](#magazine-and-museum-quality)
- [Anti-synthetic constraints](#anti-synthetic-constraints)
- [Responsive asset families](#responsive-asset-families)
- [Quality assurance](#quality-assurance)
- [Delivery contract](#delivery-contract)

## Creative rule

Write prompts like an art director commissioning a shoot or material study, not like a mood adjective generator.

Tie every image to:

- a section job;
- a composition and crop;
- a real subject/product/claim;
- the selected palette/material world;
- HTML copy safe zones;
- a codebase placement, rendered interaction, or static role;
- a phone/desktop asset plan.

Do not generate imagery before the art-direction route and content architecture are stable. Do not use generated imagery as fake evidence of customers, facilities, medical outcomes, harvests, testimonials, or a product feature that does not exist.

## Asset-set planning

Create an asset table before prompts:

| Field | Required decision |
|---|---|
| Asset id | stable descriptive name such as `hero-sculpture-master-wide` |
| Section/job | why the image exists and what it must communicate |
| Subject/source | real supplied asset, generated subject, or edited master |
| Composition | camera, framing, subject placement, negative space, focal safe zone |
| Treatment | photography/illustration/material/grade and production method |
| Aspect family | wide, portrait, square, detail, transparent layer |
| Dependency | independent master or edit derived from another asset |
| Rendered role | responsive image, overlay, clipped reveal, poster, sequence, background, texture |
| Accessibility | alt purpose or decorative status; nearby HTML explanation |
| QA | identity, alignment, material, text, anatomy, rights, crop checks |

Generate the smallest coherent asset family that covers the design. More images are useful only when they create real section variety or preserve responsive composition.

## Prompt anatomy

Use this order:

1. **Purpose and medium:** "museum-catalog product photograph," "documentary editorial portrait," "cut-paper botanical illustration."
2. **Subject identity:** exact object/person/environment and immutable attributes.
3. **Composition:** orientation, framing, subject position, negative space, horizon, crop exclusions.
4. **Camera/optics:** viewpoint, plausible lens range, depth of field, perspective character.
5. **Lighting:** source, direction, size/softness, fill, shadows, time/atmosphere.
6. **Material/surface:** physically plausible response, texture scale, wear/imperfection, restraint.
7. **Palette and grade:** named tonal relationships tied to the site system.
8. **Production character:** editorial restraint, believable retouch, print/process cues.
9. **Output role:** hero/background/detail/transparent layer and intended aspect ratio.
10. **Negative constraints:** specific likely failures, not a generic "no bad quality" list.

Keep visible typography and UI in HTML. Ask for no text/logos/labels unless text inside the image is genuinely required and will be manually verified.

## Master and edit workflow

Use editing, not separate generations, for dependent variants.

1. Generate one master at the final composition family.
2. Inspect camera, crop, silhouette, anatomy, background geometry, shadows, and negative space.
3. Approve or regenerate the master before variants.
4. Supply the approved master as the image input for every edit.
5. Start the edit prompt with locked invariants.
6. Change only the named material, color treatment, time state, surface condition, or localized element.
7. Compare master/edit as a rapid opacity flicker and a 50% overlay.
8. Reject drift; re-edit from the master instead of disguising it with manual alignment.

Locked-invariant edit preamble:

> Use the supplied image as a locked master. Preserve the canvas dimensions, camera position, lens and perspective, crop, subject identity, silhouette, pose, object placement, background geometry, lighting direction, shadow boundary, and negative space. Modify only [named property]. Do not add, remove, move, resize, or reinterpret any other element.

Do not recursively edit an edited variant when all variants must align. Branch every variant from the same approved master.

## Paired ceramic and metallic example

### Master prompt

> Museum-conservation catalogue photograph of one abstract hand-built ceramic sculpture: a tall gently asymmetrical vessel form with one oval opening and one shallow folded ridge. Matte unglazed ivory clay, fine mineral speckle, restrained hand-tool marks, no glaze. Isolated on a seamless warm off-white studio sweep. Strict front three-quarter view; sculpture centered exactly; full object visible with generous, even negative space. Camera at object mid-height, 85 mm product-photography lens, level horizon, minimal perspective distortion. Large soft north-window key from upper left, very soft frontal-right fill, understated grounded shadow falling lower right. Neutral color management, factual museum-catalog restraint, believable microtexture and minimal retouching. Landscape 3:2 hero master with copy-safe space around the object. No text, label, logo, plinth, hand, person, prop, smoke, glow, crop, or extra object.

### Metallic edit prompt

> Use the supplied ceramic master as a locked composition. Preserve the exact canvas, camera, lens, perspective, crop, silhouette, oval opening, folded ridge, placement, background, lighting direction, shadow shape, and negative space. Change only the sculpture material to refined cast metal with a muted brushed pewter finish: cool silver-grey, very fine directional brushing following the form, restrained soft specular response, natural dark occlusion inside the opening, and the original handmade-tool character translated into metal. Do not create mirror chrome, colored reflections, liquid metal, bloom, extra highlights, new shadows, text, labels, plinths, props, or geometry changes.

### Alignment rejection prompt

When drift is found, do not say "make it closer." Identify the invariant:

> Re-edit from the original ceramic master. The previous result changed [silhouette/shadow/crop/opening]. Restore that feature exactly to the master and change only the surface material to brushed pewter.

Create a separate portrait master and portrait metallic edit when the phone composition needs a different crop. Do not independently prompt a phone metallic image.

## Magazine and museum quality

Aim for authored restraint, material credibility, and a deliberate point of view.

- Specify the editorial role and the physical production conditions.
- Use plausible optics, lighting, gravity, wear, and texture scale.
- Allow controlled imperfections: fabric tension, print grain, small surface variation, natural shadow softness, optical falloff.
- Choose one strong lighting idea and one color grade.
- Direct negative space and crop as carefully as the subject.
- Use a consistent image family: lens character, grade, contrast, surface, and retouch level.
- Prefer subject-specific objects, locations, or processes over generic aspirational scenery.
- Describe qualities and production methods rather than imitating a living artist's identifiable style.
- Preserve supplied product/identity details with edit/reference workflows; generated approximation is not acceptable for product truth.

Useful language is concrete: "large indirect north-window source, uncoated paper warmth, slightly lifted blacks, restrained halation at bright metal edges." Empty language is not: "award-winning, stunning, 8K, trending, hyper-detailed masterpiece."

## Anti-synthetic constraints

Use only constraints relevant to the subject:

- no impossible anatomy, duplicated fingers/limbs, melted geometry, or inconsistent reflections;
- no arbitrary bloom, neon rim, purple-blue AI gradient, floating particles, smoke, or depth haze;
- no excessive pore/material micro-detail or plastic retouching;
- no generic luxury beige scene with unrelated sculptural furniture;
- no fake editorial masthead, typography, packaging copy, labels, UI, logos, or watermarks;
- no implausible material transitions, mirror behavior, shadow direction, or object contact;
- no extra props added to "make it interesting";
- no visual evidence of capabilities, customers, facilities, or outcomes that are not real;
- no randomized style change between section assets.

Do not make a single enormous negative list that competes with the brief. Name the five to ten highest-risk failures for the asset.

## Responsive asset families

Define focal/copy safe zones before generation.

- **Wide hero:** usually 16:9, 3:2, or 21:9; protect the primary copy side and avoid edge-critical details.
- **Phone hero:** usually 4:5 or 9:16; recompose the subject rather than blindly center-cropping.
- **Editorial landscape:** stable repeatable ratio such as 4:3 or 3:2.
- **Portrait:** 4:5 or 3:4 for people/products and phone interludes.
- **Detail:** macro/close view generated as a fresh asset, not cropped from a small board.
- **Transparent layer:** request a clean isolated subject only when alpha/compositing is supported and verify edge quality.

Define an art-directed source family and intended crop for each breakpoint. Keep paired variants matched within each aspect family. Record target display dimensions and later loading risk; do not place the full generation master in every viewport frame.

## Quality assurance

Inspect every output at full size and at final layout size.

1. **Identity:** supplied product/person/brand details remain correct.
2. **Geometry:** anatomy, perspective, object contacts, repeated structures, and text-bearing surfaces are coherent.
3. **Material:** highlights, roughness, translucency, reflections, and shadows fit the stated surface.
4. **Composition:** safe zones, crop, hierarchy, and focal point match the section.
5. **Family consistency:** palette, lens, light, grade, and retouch level match other assets.
6. **Alignment:** dependent variants pass flicker/overlay comparison at landmarks, silhouette, and shadow.
7. **Authenticity:** no generic AI tells, extra props, fake evidence, or implausible detail.
8. **Rendered behavior:** intended effect works at responsive sizes, includes touch/keyboard behavior where interactive, and has a reduced-motion or static alternative.
9. **Accessibility:** meaningful image has useful alt/nearby explanation; decorative image is treated accordingly.
10. **Rights/privacy:** sources and real identities are authorized; no deceptive representation.

Reject and regenerate when a core check fails. Do not conceal generation drift with blur, masks, tiny display, or alignment hacks.

## Delivery contract

Return:

1. selected art direction and image-family rules;
2. asset table with desktop/phone relationships;
3. one complete master prompt per independent asset;
4. one complete edit prompt per dependent variant;
5. relevant negative constraints;
6. QA checklist and rejection conditions;
7. repository path, rendered relationship, breakpoint usage, and loading-risk note;
8. alt/decorative treatment;
9. explicit assumptions or unverified product details.

When generation is available and authorized, generate, inspect, and iterate rather than only returning prompts. When the user asks only for prompts, do not mutate project assets.
