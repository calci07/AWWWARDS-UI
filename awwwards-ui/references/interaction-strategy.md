# Interaction strategy

Motion is hierarchy, not decoration. Build and verify the complete static reading order first, then use movement to explain state, sequence, material, or spatial relationships.

## Motion hierarchy

Limit the approved system to:

1. **Signature behavior:** one interaction tied to the route thesis.
2. **Transition family:** one reusable rule for section, media, or state changes.
3. **Micro feedback:** focus, press, selection, loading, success, and error.

If every section reveals differently, the site has no interaction language.

## Intent verbs

Choose two or three product-derived verbs such as reveal, fold, trace, settle, expose, assemble, or focus. Define where each is allowed; distance/scale bounds; timing/easing character; stable content; interruption; and pointer, touch, keyboard, reduced-motion, and static behavior.

## Implementation contract

For every behavior record:

- semantic start and end states;
- owning component, layer/z-order, and lifecycle;
- trigger, interruption, and focus behavior;
- responsive and coarse-pointer transformation;
- reduced-motion and no-JavaScript/static result;
- asset and registration needs;
- expected cost to loading, layout, paint, memory, and main thread;
- browser validation steps.

Follow repository conventions. Use CSS/Web Animations, framework primitives, or an already-installed motion library when sufficient. Add a dependency only when the approved behavior cannot be delivered cleanly otherwise. Verify APIs and cleanup patterns for the actual stack.

## Input parity

Hover may enrich, never unlock. Give every hover behavior explicit touch and keyboard paths. Keep content available without precise pointing. Scroll-linked work needs a non-scrub reading path; dragging needs direct controls; pointer-following needs a bounded resting state; auto-advance needs pause or user control.

Respect `prefers-reduced-motion`, focus visibility, semantic controls, and appropriate ARIA state. Do not move focus merely to follow animation.

## Performance guardrails

- Prefer transform and opacity; avoid animating layout when possible.
- Reserve dimensions and prevent cumulative layout shift.
- Do not run perpetual requestAnimationFrame loops for invisible or decorative work.
- Use observers/passive events appropriately and clean them up.
- Avoid repeated geometry reads mixed with writes.
- Load sequences, video, WebGL, and high-resolution imagery by intent and device capability.
- Keep a lightweight poster/static path.

## Balance during motion

Movement changes optical mass. Capture representative transition/end states and check that the primary anchor remains stable, entering mass has a counterweight, copy stays readable, empty gaps do not emerge, and mobile retains one dominant task. Never use motion to rescue a weak layout.

## Removal tests

Remove or simplify behavior that delays the primary action, obscures reading order, relies on hover/orientation/high-end hardware, causes focus loss, requires fake or flattened content, creates competing focal motion, harms performance, or communicates less clearly than its static alternative.

Figma prototypes may document behavior only in an explicitly requested Figma mode; browser implementation and testing remain authoritative for code work.
