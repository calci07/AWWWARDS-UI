# Seamless generated-image integration

Use this reference after route approval whenever generated or edited raster media is placed in a website. The image and its consuming section form one composition. A technically valid file that reads as a pasted rectangle is unfinished.

## Choose the integration mode first

| Mode | Use when | Background owner | Required asset behavior |
|---|---|---|---|
| `transparent-object` | Standalone product, packaging, device, sculptural object, cutout person, or foreground element | CSS owns the section/container field | True alpha master; clean edge decontamination; subject/contact shadow finishes naturally before the canvas edge |
| `matched-field` | An opaque editorial plate must visually merge into a flat or gently textured section field | Asset and CSS share an exact recorded field | Generate/composite from the actual CSS token and color space; extend the field beyond the crop; verify the perimeter after encoding |
| `container-crop` | The image intentionally lives inside a card, mask, viewport, or shaped media frame | Wrapper owns radius and cutoff; asset owns its internal scene | Approved focal point, safe zones, bleed, intended cutoff edges, breakpoint crop/object position, and shadow behavior |
| `full-bleed` | Media intentionally reaches section or viewport edges | Asset owns the visible field | Enough overscan for all breakpoints; no accidental page overflow; readable overlay safe zones |

Do not leave the mode implicit. A product mockup is not automatically `container-crop`; if it should float on the section field, use `transparent-object`.

## Example: standalone mockup in a rounded hero field

For a stone product placed inside a 680 × 760 wrapper on `#F4F0E8`, choose `transparent-object`. Prompt for the complete product and its soft contact shadow on true alpha with an eight-percent transparent safe zone, no studio sweep/backdrop/card/frame, and edge pixels graded for the warm field. Preserve an RGBA PNG master and alpha-capable derivatives. Give the wrapper the actual section token and approved radius; use `object-fit: contain` unless the art direction explicitly calls for a crop. Fail the result if a white rectangle, halo, straight shadow cutoff, or radius collision appears at 390 or 1440.

## Prompt and ledger contract

Record before generation:

- consuming page, section, wrapper dimensions, and likely LCP role;
- actual CSS background token in sRGB/hex and whether CSS or the asset owns it;
- integration mode and alpha/opaque output;
- desktop and mobile aspect families, focal coordinates, copy-safe/subject-safe zones, and intended crop edges;
- overscan or transparent padding, edge treatment, contact-shadow extent, and whether any subject cutoff is allowed;
- light direction, material response, grade, texture scale, and nearby visual context;
- output master, production derivatives, repository path, loading policy, alt/decorative state, and rejection conditions.

For `transparent-object`, ask for a truly isolated foreground on transparent alpha: no studio sweep, wall, floor, background rectangle, white/gray backdrop, checkerboard pattern, vignette, card, frame, or baked canvas shadow. Keep meaningful pixels and the full contact shadow inside a recorded transparent safe zone. Ask for clean antialiased edges without white/dark matte, color spill, or halo.

For `matched-field`, provide the exact field token and surrounding light/texture context. A near-match name such as “cream” or “pale peach” is insufficient. Prefer CSS-owned flat color plus transparency when the photographic background has no narrative role.

For `container-crop`, compose for the actual frame. Generate enough scene continuation beyond every clipped edge. Protect the focal subject from the radius and planned crop; record the deliberate cutoff so validation can distinguish it from accidental clipping.

## Output and compositing

- Preserve an RGBA PNG master for true-alpha assets. Produce repository-supported alpha-preserving WebP/AVIF/PNG derivatives only after edge inspection. JPEG is never a transparent-object deliverable.
- Preserve opaque photographic masters in a suitable lossless or high-quality source format, then verify that production compression did not shift a matched perimeter or introduce ringing.
- Let the wrapper own its approved radius, aspect ratio, and `overflow: clip`/`hidden`. Let responsive sources, `object-fit`, and `object-position` realize the approved crop.
- Clipping and `object-fit: cover` may implement a good asset; they may not conceal an embedded matte, hard rectangular boundary, contaminated alpha, or wrong background.
- Use a mask only for an approved dissolve or shaped transition. Do not feather the subject to disguise poor extraction. Keep subject contours crisp; soften only the approved background transition.
- Do not add a generic rectangular box shadow to a transparent asset. Preserve a plausible alpha-aware contact shadow or use a deliberately shaped implementation that matches the light direction and performance budget.
- Ensure shadows and soft effects finish before clipped edges unless the cutoff is explicitly part of the art direction. A shadow that ends in a straight line fails.

## Smooth cutoff rules

1. Give each cropped edge enough overscan for the largest responsive shift; three to twelve percent is a useful starting range, not a universal requirement.
2. Keep faces, logos, product controls, and identity-bearing geometry inside subject-safe zones unless the approved composition deliberately crops them.
3. Use breakpoint-specific art direction when one source cannot preserve focus and negative space. Do not merely enlarge the desktop crop on mobile.
4. Keep page-level overflow closed while allowing only the approved local media bleed.
5. A hard container edge may be correct when the wrapper's shape is visible and deliberate. A seamless float requires alpha or a genuinely matched field. Do not mix those visual contracts accidentally.

## Hard rendered QA gate

Inspect the real section at 390 and 1440 during construction and all required viewports at Page milestones/final. Check both normal viewing scale and 200% edge inspection.

Pass only when:

- no image-canvas rectangle, field seam, white/dark fringe, jagged alpha, color spill, compression ring, or broken radius is visible;
- the subject, contact shadow, and background transition end naturally;
- intended cutoffs remain intentional at every breakpoint and no important subject detail is amputated;
- mobile and desktop crops preserve focal hierarchy, copy clearance, and the approved optical counterweight;
- the section background remains continuous behind transparent pixels and matched-field perimeters survive production encoding;
- intrinsic dimensions, responsive sources, loading priority, asset weight, LCP/CLS behavior, and alt/decorative treatment are correct.

Temporarily preview alpha assets over light, dark, and saturated diagnostic fields to expose contaminated edge pixels; remove the diagnostic treatment afterward. Fail the asset if quality works only when blurred, tiny, masked, or hidden behind container clipping. Regenerate or re-edit the source instead of declaring the section complete.

## Pressure rule

Deadline, sunk generation cost, an ordinary-hero fast path, or a consumed polishing pass never converts a visible matte, seam, halo, or accidental cutoff into an acceptable result. Use the permitted asset-dependent correction pass; if the hard gate still fails after the bounded Page-level correction, report the asset blocker rather than shipping concealment.
