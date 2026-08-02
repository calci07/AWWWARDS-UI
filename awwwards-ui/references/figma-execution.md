# Optional Figma execution

Figma is never required for code mode. Use this reference only when the user explicitly requests a Figma deliverable or a Figma-first workflow. A supplied Figma link alone does not switch modes.

Route approval and Figma write permission are separate. Before writing, bind permission to the exact file, page/frame namespace, deliverable inventory, and create-alongside versus modify-existing policy.

## Official workflow prerequisites

1. Confirm an editable `figma.com/design/` target and connected-account edit capability.
2. Load the current official `figma-use` skill before every `use_figma` call.
3. Load `figma-generate-library` when variables, styles, components, or variants are in scope.
4. Load `figma-generate-design` only when its supported capture/source workflow applies.
5. Search the target design system and available libraries before creating new primitives.
6. Inspect pages, frames, variables, styles, grids, components, fonts, assets, naming, and locked/user-owned nodes before mutation.

Follow every official Figma tool prerequisite and schema. Do not guess file keys, node IDs, fonts, library assets, or permissions.

## Editable production order

Respect a compatible file structure. Otherwise create only approved pages needed for:

1. roadmap and decisions;
2. references and brand kit;
3. foundations and variables;
4. components and states;
5. mobile, tablet, desktop, and wide layouts;
6. prototypes/motion notes;
7. generated assets and handoff.

Preserve mobile-first semantic/source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition. Construct at 390 and 1440 for the current unit or batch; reserve complete 320, 390, 768, 1024, 1440, wide, accessibility, input, and production review for page/device milestones and handoff.

- Use Auto Layout for structural relationships and absolute positioning only for intentional overlays.
- Bind semantic variables, styles, constraints, resizing, and controlled text measures.
- Reuse compatible local or library components; create component properties only for meaningful states.
- Keep functional icons as editable SVG/components. Use raster fills only for photography, mockups, textures, and bitmap art.
- Keep reference captures separate from final design. Never deliver a flattened screenshot as the editable website design.
- Document touch, keyboard, and reduced-motion equivalents for motion and hover behavior.

## Assets and writes

Generated assets are not in Figma until an official upload/import tool transfers them. Verify resource/node creation, crop, resolution, responsive intent, and the asset ledger. If transfer is unavailable, create a labeled container and report the external file as unresolved; never claim placement succeeded.

Keep writes small, serial, and recoverable:

- target one useful component, section, or tightly scoped unit per call;
- re-establish the target page each call;
- preserve user-owned nodes;
- return and record actual created/mutated node IDs;
- validate logical keys before creating duplicates;
- load fonts before text mutation and await every write;
- after a failure, inspect state and retry only the corrected operation.

## Validation and handoff

After each targeted unit, use metadata to verify hierarchy, bindings, component relationships, sizing, and expected nodes. Review screenshots in two-to-four-related-unit batches at 390 and 1440 for clipping, overlap, typography, crops, and optical balance. Complete page/device review across all required sizes at milestones and handoff; do not require every unit to be perfect at all widths before continuing.

Return the Figma link, key page/frame node IDs, created deliverables, validation results, asset status, and unresolved decisions.

If the user then requests implementation, enter the separate code execution gate: reconfirm the approved route, exact repository, authorized code scope, and new-versus-existing policy. Do not assume the Figma approval authorizes repository writes.
