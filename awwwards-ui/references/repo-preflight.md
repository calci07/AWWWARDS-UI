# Repository preflight

Run this read-only preflight after route approval and before the first write. Repository truth overrides assumed stack conventions.

## Scope and ownership

1. Resolve the exact repository root or authorized new-project directory.
2. Record the approved pages, routes, components, focused experience, and any user-imposed file restrictions.
3. Classify the task as:
   - **new project** — create only inside the authorized empty/new target;
   - **existing redesign** — preserve behavior and unrelated work while replacing the approved experience;
   - **focused change** — touch only the named surface and necessary shared primitives.
4. Read every applicable `AGENTS.md` and repository instruction file from the root to the target.
5. Inspect version-control status. Treat all pre-existing modified, staged, and untracked files as user-owned unless proven otherwise.

Never clean, reset, checkout, delete, move, or overwrite user work to simplify implementation. If an approved file already contains overlapping edits, inspect the diff and work around it or surface the conflict.

## Repository truth

Inspect and record:

- framework, language, rendering model, package manager, lockfile, and supported runtime;
- application entry points, router, route ownership, layouts, data boundaries, and deployment configuration;
- existing component library, local design system, tokens, themes, fonts, icons, styles, utilities, and accessibility primitives;
- asset directories, loaders, image optimization, CDN rules, public-path conventions, and licensing/provenance notes;
- current pages at representative mobile and desktop sizes;
- tests, linting, type checking, formatting, build, preview, and visual-testing commands;
- installed animation libraries and any reduced-motion or performance conventions;
- environment variables and external services required to render the target safely;
- `.openai/hosting.json` or other project-specific hosting instructions when present.

Use the repository's existing solution when it can express the approved route. Do not introduce a second token system, router, icon family, animation stack, or styling approach without a documented need.

After inspection, derive the smallest concrete file and asset inventory that can deliver the authorized product surface. Record it before writes. A necessary shared-file change that expands the product surface, violates a file restriction, or overlaps user edits needs evidence and an explicit decision.

## New-project decisions

For a new project, lock before scaffolding:

- target directory and supported runtime;
- framework and package manager;
- route inventory and content/data source;
- styling, tokens, component, icon, image, font, and testing strategy;
- deployment constraints and required browser support.

Do not scaffold outside the authorized directory or silently choose a stack that changes the user's operating model.

## Implementation ledger

Before mutation, write a concise working ledger containing:

- approved route, visual dials, and non-negotiable product behavior;
- authorized change inventory;
- reusable repository primitives;
- required new primitives and dependencies;
- mobile-first section/component order;
- asset family and repository-path plan;
- interaction states and accessibility equivalents;
- validation commands and target viewports;
- known dirty-worktree overlaps, risks, and blockers.

The ledger guides execution; it does not expand permission. Any materially broader route, dependency, integration, or file scope requires user approval.
