# Mobile app-like web design

Mobile-first means semantic source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition. "App-like" means focused, reachable, state-aware, and touch-native; the result remains a website with links, history, scrolling, selection, sharing, semantics, and legal navigation.

Structure and current-batch construction review use 390 and 1440 only.

Treat 320 as a stress-test viewport at Page milestones and final delivery, not a mandatory section-local construction pass.

Complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and production QA at Page milestones and final delivery.

Use the Mobbin studies in `source-studies.md` as pattern evidence. Do not copy a proprietary screen, brand, icon family, navigation model, or flow.

## Mobile recomposition contract

For each Recompose or Overhaul route, define deliberate mobile changes to order, crop, navigation, interaction, and density when applicable. Record the implemented change and its rendered acceptance signal in the Transformation Map and Route Realization Ledger; when a field is genuinely inapplicable, record the reason instead of omitting it.

- **Order:** prioritize the mobile task and reading sequence rather than inheriting desktop placement.
- **Crop:** use a purpose-built focal crop or phone master when the desktop crop loses product truth or hierarchy.
- **Navigation:** select a reachable model for the mobile route and preserve links, history, back behavior, focus, and legal access.
- **Interaction:** translate hover, pointer, drag, parallax, and scroll choreography into explicit touch/keyboard behavior with a reduced-motion/static equivalent.
- **Density:** regroup, disclose, or shorten simultaneous content so touch targets and recovery space remain usable without erasing required proof.

Simply stacking the desktop regions in source order does not satisfy mobile recomposition. Overhaul cannot pass without a visible mobile delta across the applicable fields.

## Core mobile implementation

Include only the paths the product needs:

- entry/landing and navigation open;
- primary conversion or task;
- representative content/detail;
- form, selection, checkout, or onboarding states;
- loading, empty, error, success, disabled, and consent where relevant;
- reduced-motion/static equivalent for the signature behavior.

Use realistic content lengths and semantic source order. Respect viewport and device safe-area insets where sticky controls require them.

## App-like hierarchy

- One dominant task per viewport.
- Persistent orientation through a clear title, progress, tabs, or navigation, not all at once.
- Reachable primary actions and at least 44 x 44 CSS-pixel touch targets.
- Progressive disclosure for secondary detail.
- Short, scannable chapters with deliberate continuation cues.
- Stable placement for repeated actions and status.
- Immediate feedback for press, focus, selection, loading, success, and error.
- Direct manipulation only with explicit controls and an accessible alternative.

Do not hide essential navigation, browser behavior, content, or legal information to imitate native chrome.

## Navigation selection

| Model | Use when | Avoid when |
|---|---|---|
| Compact top bar + menu | Narrative marketing with few destinations | Frequent section switching is the core task |
| Bottom action bar | One persistent conversion or 2-4 frequent tasks | It obscures content or duplicates page actions |
| Tabs/segment | 2-5 peer views in one context | Labels are long or hierarchy is deep |
| Stepper | Finite onboarding, configuration, or checkout | Users need non-linear exploration |
| Search-first | Large known-item catalog or knowledge set | Browsing/storytelling is primary |
| Sheet/drawer | Short contextual action or detail | Long reading, nesting, or critical consent |

Keep links recognizable, routes shareable, back behavior correct, focus managed, and scrolling/text selection conventional.

## Responsive transformation

- **390:** primary mobile composition; one dominant column, explicit controls, purpose-built crops.
- **320:** stress test for wrap, overflow, target collision, sticky clearance, and content survival.
- **768:** introduce paired content and wider controls only when useful.
- **1024:** add persistent context or simultaneous regions without changing semantic order.
- **1440:** support editorial tension, previews, and richer relationships.
- **Wide:** cap readable measures and use gained space intentionally; never stretch the grid without purpose.

Use CSS/layout primitives that preserve source order. Do not build a desktop composition and hide/reorder it into a separate inaccessible mobile tree unless the product genuinely requires distinct semantics.

## Media and effects

- Create a phone master when a desktop crop cannot preserve product truth or the focal point.
- Keep text and functional UI as real markup, not baked into images.
- Record meaningful/decorative status, alt intent, source, and responsive crops.
- Give heavy/spatial media a lightweight poster and complete conventional content path.
- Derive registered plain/metal or before/after phone pairs from one phone master.

| Desktop behavior | Mobile implementation |
|---|---|
| Hover reveal | Labeled toggle, tap cycle, or before/after control |
| Pointer lens | Marked hotspot or detail sheet |
| Pinned chapters | Short vertical chapters or explicit stepper |
| Cursor preview | Inline thumbnail or selected-row preview |
| Layered collage | Ordered stack or short snap deck |
| Fine drag/scrub | Bounded slider plus buttons |
| Spatial exploration | Poster, explicit enter control, conventional detail path |

Never require shaking, rotation, multi-finger gestures, or orientation changes for core content.

## Forms and balance audit

Keep label, value, help, error, and status in a stable relationship. Use appropriate input types/autocomplete, account for the software keyboard, keep recovery/actions visible, show progress/exit for multistep flows, and separate required consent from marketing preference.

During construction at 390 and 1440, verify one primary anchor and next action, intentional alignment, readable line breaks and rhythm, correct crop focus, and dense/quiet cadence for the current batch. At Page milestones and final delivery, extend that review across all six widths and include safe-area/sticky clearance, focus order, target size, content survival at 320, and complete hierarchy with motion removed. If it feels like a poster, strengthen task and state behavior. If it feels generic, restore the approved brand thesis through type, imagery, material, and pacing.
