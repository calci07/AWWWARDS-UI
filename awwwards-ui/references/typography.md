# Typography

Typography carries most of the site’s identity and hierarchy. Choose roles from the approved route, available font licenses, language coverage, and real content—not from trend alone.

## Role system

Define only the roles the product needs:

- display or campaign voice;
- page and section titles;
- body and long-form reading;
- product/UI labels and controls;
- data, code-like, caption, or utility text;
- optional expressive accent used sparingly.

One family may cover several roles. A pairing is justified only when the contrast reinforces the thesis and remains coherent.

## Codebase setup

- Confirm licenses, file formats, language coverage, loading method, and repository conventions before adding a font.
- Reuse existing font tokens and loading infrastructure when suitable.
- Define semantic role tokens for size tier, weight, line height, tracking, and fallback stack.
- Use real variable-font axes only when the shipped files and target browsers support them.
- Keep casing, punctuation, numerals, and optical-alignment rules in the brand kit.
- Test representative long, short, localized, empty, validation, and error-state copy before locking components.
- Keep meaningful text as selectable HTML. Never rasterize a headline to obtain a visual effect.

## Responsive scale

Design type at 390 px first. Set:

- body size and line height for comfortable reading;
- headline line length and deliberate break behavior;
- label and control sizes that remain legible;
- maximum readable measure on desktop;
- tablet and wide-screen steps only where hierarchy needs them.

Do not scale every style by the same ratio. Display type can change dramatically while body and UI roles remain stable.

## Optical balance

- Treat type blocks as mass, not just text.
- Counterweight very large headlines with image, rule, caption, or controlled negative space.
- Align related baselines and stable edges.
- Avoid accidental rivers, widows, one-word lines, or rag shapes that destabilize a composition.
- Use centered type for a real ceremonial or focal reason, not as a default.
- Test punctuation, mixed case, numerals, and multiple paragraphs at final width.

## Accessibility and content resilience

- Use semantic heading order that matches the document, not visual size alone.
- Keep body contrast and measure appropriate for the content.
- Check 200% text scaling and 400% reflow in the rendered page.
- Allow buttons, tabs, cards, and navigation to survive longer labels.
- Verify diacritics, required scripts, currency, dates, and numerals.
- Do not split meaningful words into decorative layers without a readable intact equivalent.
- Reduced motion shows the final readable text state immediately.

## Expressive type motion

Use only when meaningfully tied to the route. Define start/end styles, supported axes, stable line boxes, input behavior, interruption, and a rendered reduced-motion state. Motion may emphasize voice or state; it may not make reading conditional.

## Rejection tests

Reject a type system when:

- the display face substitutes personality for product truth;
- the pairing is fashionable but tonally incoherent;
- body reading or UI controls suffer;
- only the hero looks considered;
- mobile breaks depend on manual line splitting that cannot survive content change;
- unavailable or unlicensed fonts are treated as final.
