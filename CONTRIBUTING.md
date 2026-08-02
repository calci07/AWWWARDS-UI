# Contributing to Awwwards UI

Thank you for improving Awwwards UI. Contributions should make the portable skill clearer, safer, more evidence-based, or more reliable without weakening its approval-gated workflow.

## Before You Start

Search existing issues and pull requests before beginning substantial work. For a large behavior change, open an issue that explains the user problem, affected contract, expected output, and validation strategy before investing in an implementation.

Keep each pull request focused. Changes to the portable skill, datasets, public documentation, generated media, and release infrastructure have different review concerns; separate unrelated work so each contract can be evaluated directly.

## Fork and Branch Workflow

1. Fork `calci07/AWWWARDS-UI` on GitHub.
2. Clone your fork and add the upstream repository.
3. Create a short-lived branch from the current upstream default branch.
4. Make focused commits with clear, imperative messages.
5. Rebase or merge the latest upstream changes according to your normal Git workflow, rerun validation, and push the branch to your fork.
6. Open a pull request that explains the problem, solution, evidence, and any compatibility or attribution impact.

```powershell
git clone https://github.com/YOUR-USERNAME/AWWWARDS-UI.git
Set-Location .\AWWWARDS-UI
git remote add upstream https://github.com/calci07/AWWWARDS-UI.git
git fetch upstream
git switch -c docs/clear-installation upstream/main
```

Use a descriptive branch prefix such as `docs/`, `fix/`, `test/`, `data/`, or `feature/`. Replace the example branch name with one that matches your change.

Do not use destructive Git commands against another contributor’s work. Preserve unrelated changes and keep generated caches, local environment files, credentials, and editor state out of commits.

## Acceptable Contributions

Good contribution areas include:

- Corrections or clearer onboarding in public documentation.
- More precise routing, approval, accessibility, responsive, performance, or rendered-validation guidance.
- Reproducible bug fixes to validators, query scripts, or package behavior.
- Deterministic tests for existing or proposed contracts.
- Well-sourced improvements to inspiration or required-source datasets.
- Portability fixes for supported agent-skill runtimes.
- Honest fallback behavior when a companion or tool is unavailable.

Changes should remain within the project’s purpose: an approval-gated creative-director and frontend-builder skill for responsive marketing experiences. Generic component libraries, unrelated application features, opaque telemetry, fabricated showcase claims, copied identities, or unlicensed assets are out of scope.

## Contracts That Must Be Preserved

Every behavior change must preserve these invariants unless maintainers have approved a documented contract revision:

- Stage A establishes product truth, produces the roadmap, reports companion availability, presents exactly three complete routes, recommends one, requests explicit approval, and stops.
- Stage A remains read-only. It does not generate final assets, edit application code, install dependencies, or mutate Figma.
- Words such as “build,” “code,” “implement,” “execute,” “React,” “GSAP,” or “start now” do not bypass route approval.
- Stage B requires an approved route, an exact repository or authorized directory, and an exact product surface before writes.
- Audit mode remains read-only.
- Missing skills and tools use named fallbacks and are reported honestly; a fallback must never be represented as the unavailable capability.
- Truthful content, accessibility, responsive integrity, repository safety, scoped write authority, and validation evidence remain hard gates.

Do not remove or obscure upstream attribution. Awwwards UI integrates [Taste Skill](https://github.com/leonxlnx/taste-skill) by Leonxlnx at pinned commit `e988add20dab0fa97d7a76781c48961c8184288e`. Any redistribution must retain [Third-Party Notices](THIRD_PARTY_NOTICES.md) and the relevant license terms.

## Editing the Portable Skill

The installable artifact is the complete [`awwwards-ui/`](awwwards-ui/) directory. Keep `SKILL.md`, agent metadata, linked references, data, scripts, and tests internally consistent.

When changing behavior:

1. Identify the production rule that would make a new test fail.
2. Add or update the smallest deterministic contract test and observe the expected failure.
3. Make the minimal behavior change.
4. Run the targeted test, the full packaged suite, the package validator, and the root release contract.
5. Update public documentation when installation, invocation, modes, output, limitations, or validation changes.

Do not replace evidence-backed instructions with aesthetic slogans. New requirements need a clear trigger, output contract, fallback, and verification method. Avoid redundant always-loaded content when a focused reference can be loaded conditionally.

## Datasets, Generated Images, and Prompts

### Datasets

Keep JSON and JSONL syntactically valid and deterministic. Preserve required fields, stable identifiers, exact source URLs, observation dates or bases, and the distinction between directly observed evidence and directory-only study metadata.

Do not invent source behavior, fill unknown fields with plausible claims, or turn discovery metadata into observation evidence. A counted inspiration reference needs a live website URL and a discovery-source URL when available. Update fixtures and tests whenever a schema or required record changes.

### Generated images

Generated documentation images must be original, fictional, unbranded concept artwork. They may not imply client work, a functioning product, a real customer, a scientific or financial claim, an award, or an endorsement.

Reject copied identities, watermarks, unreadable interface text, impossible geometry, obvious generation artifacts, and work that differs from an existing concept only by palette. Keep the six approved media filenames stable unless a release change intentionally updates the public contract.

Every added or replaced image must have a matching entry in `media/image-provenance.json` with its exact file path, final prompt, generator, intended use, and selection status. Update the README caption and meaningful alt text when visual content changes.

### Prompts and skill instructions

Prompt changes are behavior changes. Preserve the approval gate, scoped write authority, truthful-claim boundary, accessibility and input parity, companion honesty, and production validation responsibilities.

Do not include secrets, private customer data, local absolute paths, living-artist imitation requests, copied brand language, or placeholders presented as finished examples. Keep copy-ready examples explicit about whether they request Stage A, read-only Audit, or approved Stage B continuation.

## Validation

Run all commands from the repository root.

### Root release contract

```powershell
node --test .\tests\release-contract.test.mjs
```

### Packaged skill tests

```powershell
$skillTests = Get-ChildItem .\awwwards-ui\tests\*.test.mjs | ForEach-Object FullName
node --test $skillTests
```

### Package validator

```powershell
node .\awwwards-ui\scripts\validate-skill.mjs .\awwwards-ui
```

### Diff hygiene

```powershell
git diff --check origin/main...HEAD
git diff --check
```

Use the three-dot command for the committed branch review against `origin/main`. The plain command checks only unstaged working-tree changes.

Run additional repository-native checks relevant to the files you changed. A pull request that changes browser behavior should include rendered evidence and relevant viewports; a dataset change should include query and schema coverage; a documentation change should include a manual hierarchy and link review.

If a check cannot run in your environment, state the exact command, failure, and constraint in the pull request. Do not replace a skipped check with an unsupported success claim.

## Documentation Style

Use one H1 per document, ordered H2 sections, and H3 headings only within the relevant parent section. Prefer short paragraphs, consistent CommonMark lists, descriptive link labels, meaningful image alt text, and copy-ready commands.

Avoid centered HTML blocks, emoji-heavy headings, raw local absolute paths, fake usage metrics, invented endorsements, and ambiguous installation destinations. Keep blank lines around lists, tables, code fences, headings, and images so Markdown renders consistently.

## Pull-Request Checklist

- [ ] The change has one clear purpose and stays within the project’s scope.
- [ ] Stage A approval gates, Stage B entry requirements, Audit read-only behavior, and scoped write authority are preserved.
- [ ] Taste Skill attribution and all applicable license notices remain intact.
- [ ] New or changed behavior has deterministic test coverage with the intended failing case observed first.
- [ ] The root release contract passes.
- [ ] The complete packaged skill test suite passes.
- [ ] The package validator passes.
- [ ] `git diff --check origin/main...HEAD` reports no whitespace errors in committed branch changes, and `git diff --check` reports none in unstaged work.
- [ ] Dataset edits preserve source evidence and include updated fixtures or tests.
- [ ] Generated-image edits include provenance, prompt, caption, and alt-text updates.
- [ ] Public documentation reflects any user-facing installation, mode, output, limitation, or validation change.
- [ ] The diff contains no secrets, private data, local absolute paths, generated caches, or unrelated files.
- [ ] The pull request contains no unresolved placeholders, TODO markers, dummy URLs, or unfinished examples.
- [ ] The pull-request description records exact commands and results, skipped checks with reasons, and any remaining concern.
