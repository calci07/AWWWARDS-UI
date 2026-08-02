import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const validator = join(root, 'scripts', 'validate-skill.mjs');
const temporarySkillDirs = [];

test.after(() => {
  for (const dir of temporarySkillDirs) rmSync(dir, { recursive: true, force: true });
});

const requiredSources = [
  { label: 'Alpha', url: 'https://alpha.example/' },
  { label: 'Beta', url: 'https://beta.example/path' },
];

const tasteCommit = 'e988add20dab0fa97d7a76781c48961c8184288e';
const placeholderSha256 = '0'.repeat(64);

function curatedRows() {
  return [
    {
      id: 'alpha-study',
      name: 'Alpha study',
      live_url: 'https://alpha.example/',
      discovery_url: 'https://alpha.example/',
      source_urls: ['https://alpha.example/'],
      source_family: 'direct',
      source_type: 'handpicked-site',
      depth: 'deep',
      observed_at: '2026-07-19',
      categories: ['editorial'],
      devices: ['mobile', 'desktop'],
      patterns: ['indexed-archive'],
      principles: ['Use an indexed archive to clarify a broad body of work.'],
      limitations: ['Fixture evidence only.'],
      study_heading: 'Alpha study',
    },
    {
      id: 'beta-study',
      name: 'Beta study',
      live_url: 'https://beta.example/path',
      discovery_url: 'https://beta.example/path',
      source_urls: ['https://beta.example/path'],
      source_family: 'direct',
      source_type: 'handpicked-site',
      depth: 'deep',
      observed_at: '2026-07-19',
      categories: ['commerce'],
      devices: ['desktop'],
      patterns: ['product-proof'],
      principles: ['Sequence product proof before the conversion action.'],
      limitations: ['Fixture evidence only.'],
      study_heading: 'Beta study',
    },
  ];
}

function tastePin() {
  return {
    repository: 'https://github.com/leonxlnx/taste-skill',
    commit: tasteCommit,
    retrieved_at: '2026-07-31',
    license: 'https://github.com/leonxlnx/taste-skill/blob/e988add20dab0fa97d7a76781c48961c8184288e/LICENSE',
    skills: [{
      directory: 'taste-skill',
      name: 'design-taste-frontend',
      files: [{ path: 'SKILL.md', sha256: placeholderSha256 }],
    }],
  };
}

const referenceFixtures = {
  'roadmap-and-approval.md': [
    '# Roadmap and approval',
    '',
    'Use the approval gate before code execution.',
    'Every Inspiration board entry includes an `Observed via` line tied to the Observation ledger.',
    'Before writing each `Borrow`, perform a quick, non-blocking observation of the live URL or use a dated existing source study.',
    'Maintain a compact **Observation ledger** with website, live URL, discovery/source URL, observation basis (`live opened` or exact source-study heading plus `observed_at`), directly observed principle, and limitation.',
    'A bare "I observed it" statement is not evidence.',
    'If observation cannot be established promptly, substitute the reference. Otherwise label it discovery metadata, state an honest limitation, omit `Borrow`, and do not count it toward the three-to-five observed references.',
    'Every route, including standalone Focused Code, begins with a Design Read and three to five positive route invariants. Only an existing-site redesign selects Preserve, Recompose, or Overhaul and maps current patterns; a non-redesign build must not invent a redesign mode or current-pattern map.',
    'For every redesign route, render a Transformation Map with Current pattern, Retire or preserve, Replacement, Reference evidence, Mobile translation, and Acceptance signal.',
    'Overhaul changes at least six of seven dimensions, including page and section composition and mobile recomposition.',
  ],
  'code-execution.md': [
    '# Code execution contract',
    '',
    'Use the progressive three-pass sequence: Structure, Design batch, then Page milestone.',
    'Structure and Design-batch construction use targeted checks at 390 and 1440 only.',
    'Build two to four related sections in each Design batch.',
    'Complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and repository QA only at Page milestones and final delivery; never make that six-width release loop section-local.',
    'Every approved route and build, including standalone Focused Code, carries its Design Read and three to five route invariants into Route Realization Ledger rows and rendered verification.',
    'For redesigns only, include the redesign mode, current-pattern Transformation Map, and seven-dimension tally. Non-redesign builds must not invent those redesign-only artifacts.',
    'Only `verified` passes an applicable ledger or dimension row. `planned`, `implemented`, and `blocked` keep completion open. `waived` is allowed only when genuinely inapplicable and does not pass.',
    'Overhaul may never waive page and section composition or mobile recomposition, and it requires at least six `verified` dimension rows.',
  ],
  'balance-system.md': [
    '# Rendered-page optical balance',
    '',
    'Center the primary container and enforce `tolerance = max(4px, viewport × 0.01)` for the left/right gutter delta.',
    '',
    '## Geometry audit',
    '',
    '| Viewport | Container | Left gutter | Right gutter | Gutter delta | Column ratio | Primary anchor | Counterweight | Exception |',
    '|---|---|---:|---:|---:|---|---|---|---|',
    '',
    'Audit 390 and 1440 during construction. At Page milestones and final delivery, audit 320, 390, 768, 1024, 1440, and wide.',
  ],
  'brand-and-assets.md': [
    '# Brand and assets',
    '',
    'Keep an asset ledger.',
  ],
  'taste-integration.md': [
    '# Taste integration',
    '',
    'Use current taste guidance conditionally.',
  ],
  'figma-execution.md': [
    '# Optional Figma execution',
    '',
    'After each targeted unit, use metadata to verify hierarchy, bindings, component relationships, sizing, and expected nodes.',
    'Review screenshots in two-to-four-related-unit batches at 390 and 1440 for clipping, overlap, typography, crops, and optical balance.',
    'Reserve complete all-device review for page/device milestones and handoff.',
    'Complete page/device review across all required sizes at milestones and handoff; do not require every unit to be perfect at all widths before continuing.',
  ],
  'taste-recommender.md': [
    '# Art-direction recommender',
    '',
    'Before writing each `Borrow`, perform a quick non-blocking observation by opening the live URL or using a dated existing source study.',
    'Maintain a compact **Observation ledger** with Website, Live URL, Discovery/source URL, Observation basis, Directly observed principle, and Limitation.',
    'Observation basis is `live opened` or an exact source-study heading plus `observed_at`; a bare “I observed it” statement is not evidence.',
    'Each Inspiration board entry includes an `Observed via` line tied to the ledger.',
    'If observation cannot be established promptly, substitute the reference; otherwise label it discovery metadata, state an honest limitation, omit `Borrow`, and do not count it toward the three-to-five observed references.',
    'Every counted reference keeps a live website link and a discovery/source link when available.',
    'Screenshot previews are optional, non-blocking, and may fall back to the complete clickable list.',
    'When relevant deep/user-curated evidence exists, count at least one such precedent. If none is relevant, substitute another observable relevant source when possible; otherwise disclose the limitation and do not force an unrelated quota.',
    'For mobile-heavy work, include relevant Mobbin evidence when available. If none is relevant, substitute another observable relevant mobile source when possible; otherwise disclose the limitation and do not force weak Mobbin evidence.',
  ],
  'rendered-validation.md': [
    '# Rendered validation loop',
    '',
    'Use the progressive three-pass sequence: Structure, Design batch, then Page milestone.',
    'The Structure pass and each two-to-four-section Design batch use targeted review at 390 and 1440 only.',
    'At Page milestones and final delivery, complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and production QA.',
    'The two-pass cap governs section-local visual polishing; asset-dependent or signature-interaction work may receive one third targeted section-local pass.',
    'After the local cap, log the unresolved defect for Page-level balance.',
    'The Page-level pass may make one targeted cross-section or breakpoint correction cycle; it does not restart the section-local loop.',
    'If the same hard-gate failure remains after that Page-level correction, state the blocker or request a material user decision. Never silently loop.',
  ],
  'workflow-integration.md': [
    '# Code-first workflow integration',
    '',
    'Use the progressive three-pass sequence: Structure, Design batch, then Page milestone.',
    'Run targeted interim checks at 390 and 1440 for Structure and each two-to-four-section Design batch.',
    'Run complete six-width responsive, accessibility, input, performance, and repository checks only at Page milestones and final delivery, never as a section-local release loop.',
  ],
  'quality-gates.md': [
    '# Production quality gates',
    '',
    'The centered-container hard gate is `tolerance = max(4px, viewport × 0.01)` for left/right gutter delta; only documented intentional full bleed is excepted.',
    'Complete responsive, accessibility, input, performance, and repository QA at 320, 390, 768, 1024, 1440, and wide at Page milestones and final delivery.',
  ],
  'visual-assets.md': [
    '# Visual assets in the codebase',
    '',
    'Inspect each asset master once at source or full resolution.',
    'During construction, inspect current-batch crop behavior at 390 and 1440 only.',
    'Complete six-width crop QA at Page milestones and final delivery, not per asset or per section during construction.',
  ],
  'mobile-app-web.md': [
    '# Mobile app-like web design',
    '',
    'Mobile-first means semantic source order, action priority, app-like hierarchy, touch reachability, and a purpose-built mobile composition.',
    'Structure and current-batch construction review use 390 and 1440 only.',
    'Treat 320 as a stress-test viewport at Page milestones and final delivery, not a mandatory section-local construction pass.',
    'Complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and production QA at Page milestones and final delivery.',
  ],
};

function catalogRows(count = 341) {
  return Array.from({ length: count }, (_, index) => JSON.stringify({
    id: `site-${index}`,
    name: `Site ${index}`,
    live_url: `https://site-${index}.example/`,
    awwwards_url: `https://www.awwwards.com/sites/site-${index}`,
    source_url: 'https://www.awwwards.com/websites/',
    award: null,
    tags: ['editorial'],
    depth: 'index',
    observed_at: '2026-07-19',
  })).join('\n') + '\n';
}

function makeSkill(mutator) {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-skill-test-'));
  temporarySkillDirs.push(dir);
  mkdirSync(join(dir, 'agents'));
  mkdirSync(join(dir, 'data'));
  mkdirSync(join(dir, 'references'));
  mkdirSync(join(dir, 'scripts'));

  writeFileSync(join(dir, 'SKILL.md'), [
    '---',
    'name: awwwards-ui',
    'description: Use when planning, directing, designing, and implementing visually ambitious production websites in code.',
    '---',
    '',
    '# Awwwards UI',
    '',
    '## Code-first v5 contract',
    '',
    '- Stage A — Recommend: produce a roadmap and exactly three expanded named routes, recommend one, make an explicit decision request, ask for explicit approval, then STOP.',
    '- Mandatory Stage A order: Product truth → Roadmap → Companion availability → Three routes → Recommendation → Decision and STOP.',
    '- Stage A self-check: current companion availability and bundled fallback; no image tool, code or repository mutation, final brand invention, or application code implementation before approval.',
    '- Expand all three routes. A comparison table cannot replace each expanded route’s standalone Signature interaction and Touch, keyboard, and reduced-motion equivalents fields.',
    '- Every route renders Touch, keyboard, and reduced-motion equivalents as its own labeled field, not buried in interaction prose.',
    '- Stage B default mode is **Execute in Code** after approval.',
    '- The Stage B gate requires the approved route, exact repository or authorized new target, and the exact authorized product surface: pages, routes, and components; derive the concrete file inventory during read-only repository preflight.',
    '- A Figma URL is not a prerequisite for Execute in Code. Figma is an optional mode only when the user explicitly requests it.',
    '- Repository preflight: read AGENTS.md, identify package manager or lockfile, framework, existing design system, and dirty worktree before writes.',
    '- Preserve the user’s existing changes; never run destructive commands such as reset --hard or checkout --.',
    '- After route approval, read current design-taste-frontend, imagegen-frontend-web, imagegen-frontend-mobile, and brandkit before asset and implementation work.',
    '- If a companion skill is unavailable, disclose the gap and use the bundled fallback instead of claiming it ran.',
    '- Use GPT Image 2 or system image generation for product mockups, background images, visual elements, and a consistent illustration family.',
    '- Mobile-first means semantic source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition.',
    '- Structure/construction and Design-batch inspection use 390 and 1440 only. At Page milestones and final delivery, complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and production QA.',
    '- Use a browser screenshot loop to score optical balance, iterate, and recheck every required viewport and breakpoint.',
    '- Ship semantic HTML, accessibility, keyboard, touch, and reduced-motion equivalents.',
    '- Validate performance, then run build, typecheck, lint, and tests using repository-native commands.',
    '- Leave no placeholders or TODOs and no half-finished code or incomplete implementation.',
    '- First Stage B working update: restate the approved thesis, companion availability, repository preflight, brand kit and GPT Image 2 plan, mobile-first execution, semantic HTML, browser screenshot loop, build checks, and completion evidence.',
    '- Optional Figma Design loads the official `figma-use` prerequisite before the corresponding tool call.',
    '- Every expanded route has a standalone **Inspiration board** with three to five references. Each reference shows a clickable live website URL, a clickable discovery-source URL when available, the specific principle borrowed, where it applies, and a short non-copy boundary.',
    '- When browser capture is available, show one to three representative screenshot previews per route without blocking or materially delaying the recommendation; otherwise disclose that previews are unavailable and keep the complete clickable list.',
    '- Use a balanced frame with an expressive interior: center the primary section container and keep left/right outer gutters within 4px or 1% of viewport width, whichever is larger; document intentional full bleed.',
    '- During construction audit 390px and 1440px; at page milestones and final delivery audit 320, 390, 768, 1024, 1440, and wide.',
    '- Use structure, design batch, and page milestone passes. Build two to four related sections before browser review; normal sections receive at most two self-directed correction passes and only asset-dependent or signature-interaction work may receive a third targeted pass.',
    '- The section-local two-pass cap governs visual polishing. After the cap, log the unresolved defect for Page-level balance. The Page-level pass gets one targeted cross-section or breakpoint correction cycle and does not restart the section-local loop. If the same hard-gate failure remains, state the blocker or request a material user decision.',
    '- An ordinary hero locks hierarchy and frame at 390px and 1440px, integrates the approved asset, adds one interaction, validates with the next section, and defers full breakpoint and production QA to the page milestone.',
    '- Every ordinary-hero plan renders a **Section geometry audit** with the exact table below.',
    '| Viewport | Container | Left gutter | Right gutter | Gutter delta | Column ratio | Primary anchor | Counterweight | Exception |',
    '|---|---|---:|---:|---:|---|---|---|---|',
    'Before rendering, label rows as planned targets with concrete formulas/values for 390 and 1440; after rendering, replace targets with measured values and PASS/FAIL.',
    '- Approved planning for an ordinary neighboring-section batch uses Focused Code and gives an actionable plan before requesting any missing write gate: one two-to-four-section Design batch in semantic source order; Structure and batch review at 390/1440 only; a centered shared frame with `max(4px, viewport × 0.01)` gutter tolerance; at most two section-local corrections and no third pass; after the cap, log the defect for one bounded Page-level correction cycle that does not restart the local loop; if the same hard gate persists, state the blocker or request a material user decision; complete six-width accessibility, input, performance, and repository QA only at Page milestone/final.',
    '',
    'Read `references/source-studies.md` and use `data/inspiration-index.jsonl`.',
    'Read `references/roadmap-and-approval.md`, `references/code-execution.md`, `references/balance-system.md`, `references/brand-and-assets.md`, and `references/taste-integration.md`.',
    'Read [Taste integration](references/taste-integration.md) before creating routes and again before Stage B implementation.',
    'Resolve the installed skill root from the loaded `SKILL.md` and set the working directory to that skill root before running `scripts/query-inspiration.mjs`.',
    '',
  ].join('\n'));
  writeFileSync(join(dir, 'agents', 'openai.yaml'), [
    'interface:',
    '  display_name: "Awwwards UI - Creative Director & Builder"',
    '  short_description: "Plan, design, and build award-caliber websites"',
    '  default_prompt: "Use $awwwards-ui to plan three routes, wait for approval, then implement the approved mobile-first design in my codebase."',
    '',
  ].join('\n'));
  writeFileSync(join(dir, 'data', 'inspiration-index.jsonl'), catalogRows());
  writeFileSync(join(dir, 'data', 'curated-precedents.jsonl'), `${curatedRows().map((row) => JSON.stringify(row)).join('\n')}\n`);
  writeFileSync(join(dir, 'data', 'required-sources.json'), JSON.stringify(requiredSources, null, 2));
  writeFileSync(join(dir, 'data', 'taste-pin.json'), JSON.stringify(tastePin(), null, 2));
  writeFileSync(join(dir, 'references', 'source-studies.md'), [
    '# Source studies',
    '',
    '## Contents',
    '',
    '- [Sources](#sources)',
    '',
    '## Sources',
    '',
    '### Alpha study',
    '',
    `Source: [Alpha](${requiredSources[0].url})`,
    '',
    '### Beta study',
    '',
    `Source: [Beta](${requiredSources[1].url})`,
    '',
  ].join('\n'));
  for (const [file, lines] of Object.entries(referenceFixtures)) {
    writeFileSync(join(dir, 'references', file), `${lines.join('\n')}\n`);
  }
  writeFileSync(join(dir, 'scripts', 'query-inspiration.mjs'), 'export {};\n');

  mutator?.(dir);
  return dir;
}

function validate(dir) {
  return spawnSync(process.execPath, [validator, dir], { encoding: 'utf8' });
}

function mutateCurated(skillDir, mutator) {
  const path = join(skillDir, 'data', 'curated-precedents.jsonl');
  const rows = readFileSync(path, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
  mutator(rows);
  writeFileSync(path, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
}

test('accepts a structurally complete pinned release with exactly 341 unique catalog rows', () => {
  const result = validate(makeSkill());
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /validation passed/i);
});

test('the staged skill itself satisfies the v5 code-first contract', () => {
  const result = validate(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /validation passed/i);
});

test('rejects an unsupported curated source family', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    rows[0].source_family = 'social-media';
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /curated-precedents\.jsonl line 1 source_family/i);
});

test('rejects missing or empty curated principles', async (t) => {
  for (const [name, mutate] of [
    ['missing principles', (row) => { delete row.principles; }],
    ['empty principles', (row) => { row.principles = []; }],
  ]) {
    await t.test(name, () => {
      const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => mutate(rows[0])));
      const result = validate(dir);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /curated-precedents\.jsonl line 1 principles/i);
    });
  }
});

test('rejects a curated row without a study_heading', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    delete rows[0].study_heading;
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /curated-precedents\.jsonl line 1 study_heading/i);
});

test('requires each curated study heading to exist exactly once', async (t) => {
  await t.test('rejects a missing exact heading with line, id, and heading diagnostics', () => {
    const dir = makeSkill((skillDir) => {
      const path = join(skillDir, 'references', 'source-studies.md');
      writeFileSync(path, readFileSync(path, 'utf8').replace('### Alpha study', '### Alpha Study'));
    });
    const result = validate(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /curated-precedents\.jsonl line 1/i);
    assert.match(result.stderr, /alpha-study/i);
    assert.match(result.stderr, /Alpha study/);
    assert.match(result.stderr, /exact heading/i);
  });

  await t.test('rejects a duplicate exact heading', () => {
    const dir = makeSkill((skillDir) => {
      const path = join(skillDir, 'references', 'source-studies.md');
      writeFileSync(path, `${readFileSync(path, 'utf8')}\n### Alpha study\n\n${requiredSources[0].url}\n`);
    });
    const result = validate(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /curated-precedents\.jsonl line 1.*alpha-study.*Alpha study.*exact heading.*found 2/is);
  });
});

test('requires each exact study-heading section to cite an associated curated URL', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'source-studies.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      `Source: [Alpha](${requiredSources[0].url})`,
      'Source metadata unavailable.',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /curated-precedents\.jsonl line 1.*alpha-study.*Alpha study.*section.*associated URL/is);
});

test('rejects malformed curated field types, depth, and observation dates', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    rows[0].name = 42;
    rows[0].source_urls = 'https://alpha.example/';
    rows[0].categories = ['editorial', 42];
    rows[0].devices = null;
    rows[0].patterns = [];
    rows[0].limitations = [{}];
    rows[0].depth = 'index';
    rows[0].observed_at = 'July 19';
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  for (const field of ['name', 'source_urls', 'categories', 'devices', 'patterns', 'limitations', 'depth', 'observed_at']) {
    assert.match(result.stderr, new RegExp(`curated-precedents\\.jsonl line 1 ${field}`, 'i'));
  }
});

test('allows null live_url only for directory or video overview rows', async (t) => {
  await t.test('rejects null for a handpicked site', () => {
    const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
      rows[0].live_url = null;
    }));
    const result = validate(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /curated-precedents\.jsonl line 1 live_url/i);
  });

  await t.test('accepts null for a directory overview', () => {
    const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
      rows[0].live_url = null;
      rows[0].source_family = 'awwwards';
      rows[0].source_type = 'directory-study';
    }));
    const result = validate(dir);
    assert.equal(result.status, 0, result.stderr);
  });
});

test('rejects unsafe or non-HTTPS URLs in every curated URL field', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    rows[0].live_url = 'http://alpha.example/';
    rows[0].discovery_url = 'https://localhost/discovery';
    rows[0].source_urls = ['https://169.254.169.254/latest/meta-data/'];
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  for (const field of ['live_url', 'discovery_url', 'source_urls[0]']) {
    assert.match(result.stderr, new RegExp(`curated-precedents\\.jsonl line 1 ${field.replace('[', '\\[').replace(']', '\\]')}`, 'i'));
  }
});

test('rejects trailing-dot local hosts and IPv4-mapped private IPv6 in curated URLs', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    rows[0].live_url = 'https://localhost./';
    rows[0].discovery_url = 'https://service.local./discovery';
    rows[0].source_urls = [
      'https://[::ffff:127.0.0.1]/private',
      'https://[::ffff:10.0.0.1]/private',
    ];
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  for (const field of ['live_url', 'discovery_url', 'source_urls[0]', 'source_urls[1]']) {
    assert.match(result.stderr, new RegExp(`curated-precedents\\.jsonl line 1 ${field.replace('[', '\\[').replace(']', '\\]')}`, 'i'));
  }
});

test('rejects duplicate curated IDs and canonical live URLs', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    rows[1].id = rows[0].id;
    rows[1].live_url = 'https://ALPHA.example';
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicate curated id.*alpha-study/i);
  assert.match(result.stderr, /duplicate curated live_url.*alpha\.example/i);
});

test('requires every source manifest URL in a curated URL field', () => {
  const dir = makeSkill((skillDir) => mutateCurated(skillDir, (rows) => {
    rows[1].live_url = 'https://other.example/';
    rows[1].discovery_url = 'https://other.example/discovery';
    rows[1].source_urls = ['https://other.example/source'];
  }));
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /required source.*https:\/\/beta\.example\/path.*curated/i);
});

test('rejects missing Taste repository, commit, or file hash metadata', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'taste-pin.json');
    const pin = JSON.parse(readFileSync(path, 'utf8'));
    delete pin.repository;
    delete pin.commit;
    delete pin.skills[0].files[0].sha256;
    writeFileSync(path, JSON.stringify(pin));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-pin\.json repository/i);
  assert.match(result.stderr, /taste-pin\.json commit/i);
  assert.match(result.stderr, /taste-pin\.json skills\[0\]\.files\[0\]\.sha256/i);
});

test('rejects trailing-dot local and IPv4-mapped private IPv6 Taste pin URLs', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'taste-pin.json');
    const pin = JSON.parse(readFileSync(path, 'utf8'));
    pin.repository = 'https://localhost./taste-skill';
    pin.license = 'https://[::ffff:10.0.0.1]/LICENSE';
    writeFileSync(path, JSON.stringify(pin));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-pin\.json repository/i);
  assert.match(result.stderr, /taste-pin\.json license/i);
});

test('rejects a present Taste pin whose JSON value is null', () => {
  const dir = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'data', 'taste-pin.json'), 'null\n');
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-pin\.json must contain an object/i);
});

test('rejects a missing Taste pin in the final v6 package', () => {
  const dir = makeSkill((skillDir) => {
    unlinkSync(join(skillDir, 'data', 'taste-pin.json'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing data\/taste-pin\.json/i);
});

test('rejects missing v6 Overhaul, Transformation Map, and Route Realization Ledger contracts', () => {
  const dir = makeSkill((skillDir) => {
    const roadmapPath = join(skillDir, 'references', 'roadmap-and-approval.md');
    const roadmap = readFileSync(roadmapPath, 'utf8')
      .replace('For every redesign route, render a Transformation Map with Current pattern, Retire or preserve, Replacement, Reference evidence, Mobile translation, and Acceptance signal.\n', '')
      .replace('Overhaul changes at least six of seven dimensions, including page and section composition and mobile recomposition.\n', '');
    writeFileSync(roadmapPath, roadmap);

    const codePath = join(skillDir, 'references', 'code-execution.md');
    const code = readFileSync(codePath, 'utf8').replace(
      'Every approved route and build, including standalone Focused Code, carries its Design Read and three to five route invariants into Route Realization Ledger rows and rendered verification.\n',
      '',
    );
    writeFileSync(codePath, code);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Overhaul transformation floor/i);
  assert.match(result.stderr, /Transformation Map schema/i);
  assert.match(result.stderr, /universal Route Realization Ledger/i);
});

test('rejects missing v6 conditional, pass-state, or relevance-gated semantics', () => {
  const dir = makeSkill((skillDir) => {
    const codePath = join(skillDir, 'references', 'code-execution.md');
    const code = readFileSync(codePath, 'utf8')
      .replace('For redesigns only, include the redesign mode, current-pattern Transformation Map, and seven-dimension tally. Non-redesign builds must not invent those redesign-only artifacts.\n', '')
      .replace('Only `verified` passes an applicable ledger or dimension row. `planned`, `implemented`, and `blocked` keep completion open. `waived` is allowed only when genuinely inapplicable and does not pass.\n', '')
      .replace('Overhaul may never waive page and section composition or mobile recomposition, and it requires at least six `verified` dimension rows.\n', '');
    writeFileSync(codePath, code);

    const recommenderPath = join(skillDir, 'references', 'taste-recommender.md');
    const recommender = readFileSync(recommenderPath, 'utf8')
      .replace('When relevant deep/user-curated evidence exists, count at least one such precedent. If none is relevant, substitute another observable relevant source when possible; otherwise disclose the limitation and do not force an unrelated quota.\n', '')
      .replace('For mobile-heavy work, include relevant Mobbin evidence when available. If none is relevant, substitute another observable relevant mobile source when possible; otherwise disclose the limitation and do not force weak Mobbin evidence.\n', '');
    writeFileSync(recommenderPath, recommender);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /redesign-only conditional workflow/i);
  assert.match(result.stderr, /verified-only pass state/i);
  assert.match(result.stderr, /Overhaul mandatory dimensions and six-verified floor/i);
  assert.match(result.stderr, /relevance-gated deep.*curated fallback/i);
  assert.match(result.stderr, /relevance-gated Mobbin fallback/i);
});

test('rejects inspiration guidance without linked evidence and non-blocking previews', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source
      .replace('- Every expanded route has a standalone **Inspiration board** with three to five references. Each reference shows a clickable live website URL, a clickable discovery-source URL when available, the specific principle borrowed, where it applies, and a short non-copy boundary.', '- Add inspiration as helpful.')
      .replace('- When browser capture is available, show one to three representative screenshot previews per route without blocking or materially delaying the recommendation; otherwise disclose that previews are unavailable and keep the complete clickable list.', '- Show previews when practical.');
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /inspiration|live website URL|preview/i);
});

test('rejects a balanced frame without numerical gutter tolerance', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace('- Use a balanced frame with an expressive interior: center the primary section container and keep left/right outer gutters within 4px or 1% of viewport width, whichever is larger; document intentional full bleed.', 'Make the frame feel balanced.');
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /balanced|gutter|4px|1%/i);
});

test('rejects progressive passes without batching and correction limits', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace('- Use structure, design batch, and page milestone passes. Build two to four related sections before browser review; normal sections receive at most two self-directed correction passes and only asset-dependent or signature-interaction work may receive a third targeted pass.', 'Fully release every section before continuing.');
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /batch|milestone|correction|two/i);
});

test('rejects an ordinary hero without next-section validation and deferred QA', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace('- An ordinary hero locks hierarchy and frame at 390px and 1440px, integrates the approved asset, adds one interaction, validates with the next section, and defers full breakpoint and production QA to the page milestone.', 'Perfect the hero at every breakpoint before continuing.');
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ordinary hero|next section|page milestone/i);
});

test('rejects a per-section construction loop across all six widths', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'mobile-app-web.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'Structure and current-batch construction review use 390 and 1440 only.',
      'Every section-local construction review must cover 320, 390, 768, 1024, 1440, and wide.',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /mobile-app-web|section-local|construction|six-width/i);
});

test('rejects a roadmap without the Observation ledger schema', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'roadmap-and-approval.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'directly observed principle, and limitation.',
      'general notes.',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing Observation ledger schema in references\/roadmap-and-approval\.md/);
});

test('rejects a roadmap without Inspiration board Observed via linkage', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'roadmap-and-approval.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'Every Inspiration board entry includes an `Observed via` line tied to the Observation ledger.\n',
      '',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing Inspiration board Observed via ledger linkage in references\/roadmap-and-approval\.md/);
});

test('rejects a roadmap without direct live or detailed dated-study observation before Borrow', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'roadmap-and-approval.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'Before writing each `Borrow`, perform a quick, non-blocking observation of the live URL or use a dated existing source study.\n',
      'Before writing each `Borrow`, choose a reference from memory.\n',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing direct live or detailed dated-study observation basis in references\/roadmap-and-approval\.md/);
});

test('rejects a roadmap without a verifiable live or dated-study observation basis', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'roadmap-and-approval.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'observation basis (`live opened` or exact source-study heading plus `observed_at`)',
      'observation basis (documented manually)',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing verifiable observation basis in references\/roadmap-and-approval\.md/);
});

test('rejects a roadmap that accepts bare observation self-attestation', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'roadmap-and-approval.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'A bare "I observed it" statement is not evidence.',
      'A bare "I observed it" statement is sufficient evidence.',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing bare self-attestation rejection in references\/roadmap-and-approval\.md/);
});

test('rejects a roadmap without the substitution and discovery-only fallback', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'roadmap-and-approval.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'If observation cannot be established promptly, substitute the reference. Otherwise label it discovery metadata, state an honest limitation, omit `Borrow`, and do not count it toward the three-to-five observed references.\n',
      'If observation cannot be established promptly, keep the reference anyway.\n',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing substitution or discovery-only fallback with no Borrow and no count in references\/roadmap-and-approval\.md/);
});

test('rejects Figma guidance without targeted metadata validation per unit', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'figma-execution.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'After each targeted unit, use metadata to verify hierarchy, bindings, component relationships, sizing, and expected nodes.\n',
      'Inspect metadata when convenient.\n',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing targeted per-unit metadata validation in references\/figma-execution\.md/);
});

test('rejects Figma guidance without two-to-four-unit screenshot batches', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'figma-execution.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'two-to-four-related-unit batches',
      'single-unit batches',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing screenshot review in two-to-four-unit batches in references\/figma-execution\.md/);
});

test('rejects Figma guidance without both required screenshot widths', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'figma-execution.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'at 390 and 1440',
      'at 390 only',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing screenshot review at 390 and 1440 in references\/figma-execution\.md/);
});

test('rejects Figma guidance without complete review reserved for milestones and handoff', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'figma-execution.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'Reserve complete all-device review for page/device milestones and handoff.',
      'Plan complete all-device review.',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing complete review reserved for milestones and handoff in references\/figma-execution\.md/);
});

test('rejects Figma guidance without the no-per-unit all-width perfection rule', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'figma-execution.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      'Complete page/device review across all required sizes at milestones and handoff; do not require every unit to be perfect at all widths before continuing.',
      'Complete page/device review across all required sizes at milestones and handoff.',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing no per-unit all-width perfection loop in references\/figma-execution\.md/);
});

test('rejects normalized local full-coverage contradictions', async (t) => {
  const cases = [
    {
      name: 'one-line explicit six-width section instruction',
      file: 'code-execution.md',
      text: 'Inspect each section at 320, 390, 768, 1024, 1440, and wide during construction.',
    },
    {
      name: 'multiline explicit six-width construction instruction',
      file: 'code-execution.md',
      text: [
        'During each section-local construction review, inspect:',
        '- 320',
        '- 390',
        '- 768',
        '- 1024',
        '- 1440',
        '- wide',
      ].join('\n'),
    },
    {
      name: 'standard Markdown list after a blank line',
      file: 'code-execution.md',
      text: [
        'During each section-local construction review, inspect:',
        '',
        '- 320',
        '- 390',
        '- 768',
        '- 1024',
        '- 1440',
        '- wide',
      ].join('\n'),
    },
    {
      name: 'loose Markdown list with blank lines between items',
      file: 'code-execution.md',
      text: [
        'During each section-local construction review, inspect:',
        '',
        '- 320',
        '',
        '- 390',
        '',
        '- 768',
        '',
        '- 1024',
        '',
        '- 1440',
        '',
        '- wide',
      ].join('\n'),
    },
    {
      name: 'explicit px width list through 1920px',
      file: 'code-execution.md',
      text: 'Inspect each section at 320 px, 390px, 768 px, 1024px, 1440 px, and 1920px during construction.',
    },
    {
      name: 'all required widths per section alias',
      file: 'code-execution.md',
      text: 'Run all required widths per section during construction.',
    },
    {
      name: 'every required viewport per unit alias',
      file: 'figma-execution.md',
      text: 'Review every required viewport for each unit before continuing.',
    },
    {
      name: 'all-device per-frame review',
      file: 'figma-execution.md',
      text: 'Complete an all-device review for every frame before continuing.',
    },
    {
      name: 'natural all devices per-frame review',
      file: 'figma-execution.md',
      text: 'Review all devices for every frame before continuing.',
    },
    {
      name: 'natural every device per-unit inspection',
      file: 'figma-execution.md',
      text: 'Inspect every device for each unit before continuing.',
    },
    {
      name: 'full-width per-unit review',
      file: 'figma-execution.md',
      text: 'Run a full-width device review for each unit before the next unit.',
    },
    {
      name: 'per-frame perfection at all widths',
      file: 'figma-execution.md',
      text: 'Perfect each frame at all widths before continuing.',
    },
    {
      name: 'unrelated semicolon negation before local inspection',
      file: 'code-execution.md',
      text: 'Do not postpone QA; inspect each section at all six widths.',
    },
    {
      name: 'unrelated coordinated negation before frame inspection',
      file: 'figma-execution.md',
      text: 'Never skip QA, and inspect every frame at all device sizes before continuing.',
    },
  ];

  for (const entry of cases) {
    await t.test(entry.name, () => {
      const dir = makeSkill((skillDir) => {
        const path = join(skillDir, 'references', entry.file);
        const source = readFileSync(path, 'utf8');
        const mutated = `${source.trimEnd()}\n\n${entry.text}\n`;
        assert.notEqual(mutated, source);
        writeFileSync(path, mutated);
      });
      const result = validate(dir);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /Forbidden .*local full-coverage.*references\//i);
    });
  }
});

test('allows explicit negations and milestone/final-only full-coverage guidance', async (t) => {
  const cases = [
    {
      name: 'do-not section negation',
      file: 'code-execution.md',
      text: 'Do not inspect each section at all six widths.',
    },
    {
      name: 'never-run per-section negation',
      file: 'code-execution.md',
      text: 'Never run all required widths per section.',
    },
    {
      name: 'milestone and final only',
      file: 'code-execution.md',
      text: 'Inspect all required widths only at Page milestones and final delivery, never per section.',
    },
    {
      name: 'Figma no-per-frame-perfection negation',
      file: 'figma-execution.md',
      text: 'Do not perfect every frame at all device sizes before continuing.',
    },
    {
      name: 'non-inspection component scaling',
      file: 'code-execution.md',
      text: 'Each component scales fluidly across all required widths.',
    },
    {
      name: 'natural device coverage without a local inspection action',
      file: 'figma-execution.md',
      text: 'Each component scales fluidly across all devices.',
    },
    {
      name: 'unrelated prose blocks a later width list',
      file: 'code-execution.md',
      text: [
        'Inspect each section during construction:',
        '',
        'This paragraph discusses unrelated typography.',
        '',
        '- 320',
        '- 390',
        '- 768',
        '- 1024',
        '- 1440',
        '- wide',
      ].join('\n'),
    },
    {
      name: 'heading blocks a later width list',
      file: 'code-execution.md',
      text: [
        'Inspect each section during construction:',
        '',
        '## Separate milestone notes',
        '',
        '- 320',
        '- 390',
        '- 768',
        '- 1024',
        '- 1440',
        '- wide',
      ].join('\n'),
    },
    {
      name: 'fence blocks a width-list example',
      file: 'code-execution.md',
      text: [
        'Inspect each section during construction:',
        '',
        '```text',
        '- 320',
        '- 390',
        '- 768',
        '- 1024',
        '- 1440',
        '- wide',
        '```',
      ].join('\n'),
    },
  ];

  for (const entry of cases) {
    await t.test(entry.name, () => {
      const dir = makeSkill((skillDir) => {
        const path = join(skillDir, 'references', entry.file);
        const source = readFileSync(path, 'utf8');
        const mutated = `${source.trimEnd()}\n\n${entry.text}\n`;
        assert.notEqual(mutated, source);
        writeFileSync(path, mutated);
      });
      const result = validate(dir);
      assert.equal(result.status, 0, result.stderr);
    });
  }
});

test('rejects recommendation evidence without observation basis and substitution or limitation rules', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'taste-recommender.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source
      .replace('Observation basis is `live opened` or an exact source-study heading plus `observed_at`; a bare “I observed it” statement is not evidence.\n', '')
      .replace('If observation cannot be established promptly, substitute the reference; otherwise label it discovery metadata, state an honest limitation, omit `Borrow`, and do not count it toward the three-to-five observed references.\n', '');
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-recommender|observation basis|substitut|limitation/i);
});

test('rejects a geometry audit missing Gutter delta or Exception', () => {
  for (const column of ['Gutter delta', 'Exception']) {
    const dir = makeSkill((skillDir) => {
      const path = join(skillDir, 'references', 'balance-system.md');
      const source = readFileSync(path, 'utf8');
      const mutated = source.replace(` | ${column}`, '');
      assert.notEqual(mutated, source);
      writeFileSync(path, mutated);
    });
    const result = validate(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /balance-system|geometry|Gutter delta|Exception/i);
  }
});

test('rejects moving six-width QA from Page milestones into Structure construction', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'rendered-validation.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source
      .replace(
        'The Structure pass and each two-to-four-section Design batch use targeted review at 390 and 1440 only.',
        'The Structure pass uses 320, 390, 768, 1024, 1440, and wide.',
      )
      .replace(
        'At Page milestones and final delivery, complete 320, 390, 768, 1024, 1440, and wide responsive, accessibility, input, performance, and production QA.',
        'At Page milestones and final delivery, review only 390 and 1440.',
      );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /rendered-validation|Structure|Page milestone|six-width/i);
});

test('rejects conflated section-local and Page-level correction budgets', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'references', 'rendered-validation.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source
      .replace('After the local cap, log the unresolved defect for Page-level balance.\n', '')
      .replace(
        'The Page-level pass may make one targeted cross-section or breakpoint correction cycle; it does not restart the section-local loop.',
        'The Page-level pass may only use whatever remains of the section-local two-pass cap.',
      )
      .replace('If the same hard-gate failure remains after that Page-level correction, state the blocker or request a material user decision. Never silently loop.\n', '');
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /rendered-validation|Page-level|section-local|recovery|hard-gate/i);
});

test('rejects a missing ordinary neighboring-section Focused Code planning fast path', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const source = readFileSync(path, 'utf8');
    const mutated = source.replace(
      '- Approved planning for an ordinary neighboring-section batch uses Focused Code and gives an actionable plan before requesting any missing write gate: one two-to-four-section Design batch in semantic source order; Structure and batch review at 390/1440 only; a centered shared frame with `max(4px, viewport × 0.01)` gutter tolerance; at most two section-local corrections and no third pass; after the cap, log the defect for one bounded Page-level correction cycle that does not restart the local loop; if the same hard gate persists, state the blocker or request a material user decision; complete six-width accessibility, input, performance, and repository QA only at Page milestone/final.\n',
      '',
    );
    assert.notEqual(mutated, source);
    writeFileSync(path, mutated);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ordinary neighboring-section|Focused Code|actionable plan/i);
});

test('rejects a skill without the code-first v5 approval contract', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8')
      .replace('then STOP.', 'and continue immediately.')
      .replace('Stage B default mode is **Execute in Code**', 'Stage B defaults to a static concept')
      .replace('A Figma URL is not a prerequisite for Execute in Code.', 'A Figma URL is required.')
      .replace('If a companion skill is unavailable, disclose the gap and use the bundled fallback instead of claiming it ran.', 'Use all companion skills.'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /code-first v5|approval|Execute in Code|Figma URL|companion/i);
});

test('rejects unsafe code scope, missing repo preflight, destructive behavior, and placeholders', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8')
      .replace('The Stage B gate requires the approved route, exact repository or authorized new target, and the exact authorized product surface: pages, routes, and components; derive the concrete file inventory during read-only repository preflight.', 'Edit wherever useful.')
      .replace('Repository preflight: read AGENTS.md, identify package manager or lockfile, framework, existing design system, and dirty worktree before writes.', 'Start writing immediately.')
      .replace('Preserve the user’s existing changes; never run destructive commands such as reset --hard or checkout --.', 'Reset the repository first.')
      .replace('Leave no placeholders or TODOs and no half-finished code or incomplete implementation.', 'Placeholders are acceptable.'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /scope|preflight|destructive|placeholder/i);
});

test('rejects incomplete post-approval asset and companion orchestration', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8')
      .replace('After route approval, read current design-taste-frontend, imagegen-frontend-web, imagegen-frontend-mobile, and brandkit before asset and implementation work.', 'Use whichever style tools are nearby.')
      .replace('If a companion skill is unavailable, disclose the gap and use the bundled fallback instead of claiming it ran.', 'Assume every companion ran.')
      .replace('Use GPT Image 2 or system image generation for product mockups, background images, visual elements, and a consistent illustration family.', 'Use generic stock images.'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /companion|fallback|GPT Image 2|image generation/i);
});

test('rejects missing responsive, rendered, accessible, and production validation loops', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8')
      .replace('Mobile-first means semantic source order, action priority, app-like hierarchy, touch reachability, and purpose-built mobile composition.', 'Make it responsive.')
      .replace('Use a browser screenshot loop to score optical balance, iterate, and recheck every required viewport and breakpoint.', 'Review it once.')
      .replace('Ship semantic HTML, accessibility, keyboard, touch, and reduced-motion equivalents.', 'Ship markup.')
      .replace('Validate performance, then run build, typecheck, lint, and tests using repository-native commands.', 'Run a build.'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /mobile-first|screenshot|semantic|accessibility|performance|typecheck/i);
});

test('rejects Figma as a prerequisite for the default code workflow', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8')
      .replace('A Figma URL is not a prerequisite for Execute in Code. Figma is an optional mode only when the user explicitly requests it.', 'A Figma URL is required before Execute in Code.'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Figma URL|optional/i);
});

test('rejects circular file scope, stale taste timing, partial Stage B updates, unsafe script paths, and missing Figma prerequisites', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8')
      .replace('The Stage B gate requires the approved route, exact repository or authorized new target, and the exact authorized product surface: pages, routes, and components; derive the concrete file inventory during read-only repository preflight.', 'The user must guess every source file before inspection.')
      .replace('Read [Taste integration](references/taste-integration.md) before creating routes and again before Stage B implementation.', 'Read taste guidance eventually.')
      .replace('First Stage B working update: restate the approved thesis, companion availability, repository preflight, brand kit and GPT Image 2 plan, mobile-first execution, semantic HTML, browser screenshot loop, build checks, and completion evidence.', 'Start with repository preflight.')
      .replace('Resolve the installed skill root from the loaded `SKILL.md` and set the working directory to that skill root before running `scripts/query-inspiration.mjs`.', 'Run `scripts/query-inspiration.mjs` from anywhere.')
      .replace('Optional Figma Design loads the official `figma-use` prerequisite before the corresponding tool call.', 'Use Figma directly.'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /product surface|taste integration|Stage B working|skill-root|Figma official/i);
});

test('rejects a Stage A contract that can collapse to one route or leak implementation', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8').replace(
      '- Stage A self-check: current companion availability and bundled fallback; no image tool, code or repository mutation, final brand invention, or application code implementation before approval.',
      '- Stage A may choose one route and continue into implementation.',
    ));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Stage A response gate|three named routes|implementation/i);
});

test('rejects Stage A without the mandatory order and per-route interaction fields', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, readFileSync(path, 'utf8').replace(
      '- Mandatory Stage A order: Product truth → Roadmap → Companion availability → Three routes → Recommendation → Decision and STOP.',
      '- Put the recommendation first and summarize routes in a table.',
    ));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /mandatory Stage A order|per-route interaction/i);
});

test('rejects duplicate Awwwards URLs', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'inspiration-index.jsonl');
    const first = readFileSync(path, 'utf8').split(/\r?\n/)[0];
    writeFileSync(path, readFileSync(path, 'utf8') + first + '\n');
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicate/i);
});

test('keeps the generic 100 to 1000 bound and requires exactly 341 rows for this pin', () => {
  for (const count of [99, 1001]) {
    const dir = makeSkill((skillDir) => {
      writeFileSync(join(skillDir, 'data', 'inspiration-index.jsonl'), catalogRows(count));
    });
    const result = validate(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /100.*1000/i);
  }

  for (const count of [340, 600]) {
    const dir = makeSkill((skillDir) => {
      writeFileSync(join(skillDir, 'data', 'inspiration-index.jsonl'), catalogRows(count));
    });
    const result = validate(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /exactly 341.*found (?:340|600)/i);
  }
});

test('requires a valid external live URL for every inspiration', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'inspiration-index.jsonl');
    const rows = readFileSync(path, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
    rows[0].live_url = null;
    rows[1].live_url = 'https://www.awwwards.com/sites/not-live';
    writeFileSync(path, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /live_url/i);
});

test('requires HTTPS for every live inspiration URL', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'inspiration-index.jsonl');
    const rows = readFileSync(path, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
    rows[0].live_url = 'http://site-0.example/';
    writeFileSync(path, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /live_url/i);
});

test('rejects private, loopback, and local live or source hosts', () => {
  const dir = makeSkill((skillDir) => {
    const catalogPath = join(skillDir, 'data', 'inspiration-index.jsonl');
    const rows = readFileSync(catalogPath, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
    rows[0].live_url = 'https://169.254.169.254/latest/meta-data/';
    writeFileSync(catalogPath, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);

    const manifestPath = join(skillDir, 'data', 'required-sources.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    manifest[0].url = 'https://localhost/private';
    writeFileSync(manifestPath, JSON.stringify(manifest));
    const studyPath = join(skillDir, 'references', 'source-studies.md');
    writeFileSync(studyPath, readFileSync(studyPath, 'utf8').replace(requiredSources[0].url, manifest[0].url));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /public.*(?:live_url|source)|(?:live_url|source).*public/i);
});

test('rejects empty required files instead of reporting a zero-row pass', () => {
  const dir = makeSkill((skillDir) => {
    for (const path of [
      join(skillDir, 'SKILL.md'),
      join(skillDir, 'agents', 'openai.yaml'),
      join(skillDir, 'data', 'inspiration-index.jsonl'),
      join(skillDir, 'data', 'curated-precedents.jsonl'),
      join(skillDir, 'data', 'required-sources.json'),
      join(skillDir, 'references', 'source-studies.md'),
    ]) writeFileSync(path, '');
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /empty/i);
});

test('requires complete quoted agent interface metadata', () => {
  const dir = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'agents', 'openai.yaml'), 'interface:\n  display_name: "Awwwards UI"\n');
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /short_description/i);
  assert.match(result.stderr, /default_prompt/i);
});

test('requires code-first agent metadata that retains approval gating', () => {
  const dir = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'agents', 'openai.yaml'), [
      'interface:',
      '  display_name: "Awwwards UI - Creative Director"',
      '  short_description: "Plan award-caliber website directions in Figma"',
      '  default_prompt: "Use $awwwards-ui to create a Figma concept immediately."',
      '',
    ].join('\n'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /approval|implementation in code|codebase|repository/i);
});

test('frontmatter must start at byte zero and accepts YAML key order', () => {
  const misplaced = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'SKILL.md'), [
      '# Not frontmatter',
      '',
      '---',
      'name: awwwards-ui',
      'description: Use when designing ambitious sites.',
      '---',
    ].join('\n'));
  });
  const rejected = validate(misplaced);
  assert.notEqual(rejected.status, 0);
  assert.match(rejected.stderr, /frontmatter/i);

  const reordered = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const source = readFileSync(path, 'utf8');
    writeFileSync(path, source.replace(
      'name: awwwards-ui\ndescription: Use when directing visually ambitious websites in editable Figma before any implementation.',
      'description: Use when directing visually ambitious websites in editable Figma before any implementation.\nname: awwwards-ui',
    ));
  });
  assert.equal(validate(reordered).status, 0);
});

test('enforces catalog value types, enums, dates, and unique IDs', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'inspiration-index.jsonl');
    const rows = readFileSync(path, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
    rows[1].id = rows[0].id;
    rows[2].depth = 'typo';
    rows[3].observed_at = 'July 19';
    rows[4].tags = [42];
    rows[5].name = 7;
    rows[6].award = {};
    writeFileSync(path, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicate.*id/i);
  assert.match(result.stderr, /depth/i);
  assert.match(result.stderr, /observed_at/i);
  assert.match(result.stderr, /tags/i);
  assert.match(result.stderr, /name/i);
  assert.match(result.stderr, /award/i);
});

test('rejects missing deep-source coverage', () => {
  const dir = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'references', 'source-studies.md'), '# Source studies\n\n## Contents\n\n## Sources\n\nhttps://alpha.example/\n');
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /beta\.example/i);
});

test('requires every deep catalog row to be cited in source studies', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'data', 'inspiration-index.jsonl');
    const rows = readFileSync(path, 'utf8').trim().split(/\r?\n/).map(JSON.parse);
    rows[0].depth = 'deep';
    writeFileSync(path, `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /deep.*source stud|source stud.*deep/i);
});

test('does not accept a longer URL that merely starts with a required source URL', () => {
  const dir = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'references', 'source-studies.md'), [
      '# Source studies',
      '',
      '## Contents',
      '',
      '## Sources',
      '',
      'https://alpha.example/',
      'https://beta.example/path-extra',
    ].join('\n'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /beta\.example\/path/i);
});

test('preserves case-sensitive path and query values in source citations', () => {
  const dir = makeSkill((skillDir) => {
    writeFileSync(join(skillDir, 'references', 'source-studies.md'), [
      '# Source studies',
      '',
      '## Contents',
      '',
      '## Sources',
      '',
      'https://alpha.example/',
      'https://beta.example/Path',
    ].join('\n'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /beta\.example\/path/i);
});

test('rejects missing linked resources and overlong SKILL files', () => {
  const dir = makeSkill((skillDir) => {
    const lines = Array.from({ length: 501 }, (_, index) => `line ${index}`);
    lines[0] = '---';
    lines[1] = 'name: awwwards-ui';
    lines[2] = 'description: Use when creating websites.';
    lines[3] = '---';
    lines[10] = 'Read `references/missing.md`.';
    writeFileSync(join(skillDir, 'SKILL.md'), lines.join('\n'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /500 lines/i);
  assert.match(result.stderr, /missing\.md/i);
});

test('accepts a newline-terminated SKILL file at the 500-line limit', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const lines = readFileSync(path, 'utf8').split(/\r?\n/);
    if (lines.at(-1) === '') lines.pop();
    while (lines.length < 500) lines.push(`filler line ${lines.length}`);
    writeFileSync(path, `${lines.join('\n')}\n`);
  });

  const result = validate(dir);
  assert.equal(result.status, 0, result.stderr);
});

test('validates markdown resource links as well as inline-code paths', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const skill = readFileSync(path, 'utf8');
    writeFileSync(path, `${skill}\nRead [Missing reference](references/missing-markdown.md).\n`);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing-markdown\.md/i);
});

test('rejects linked resource paths that escape the skill directory', () => {
  const dir = makeSkill((skillDir) => {
    const path = join(skillDir, 'SKILL.md');
    const skill = readFileSync(path, 'utf8');
    writeFileSync(path, `${skill}\nRead [escaped resource](data/../../).\n`);
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /escape/i);
});

test('rejects linked resources that escape through a symbolic link', (t) => {
  const outsideDir = mkdtempSync(join(tmpdir(), 'awwwards-outside-test-'));
  temporarySkillDirs.push(outsideDir);
  const outsideFile = join(outsideDir, 'outside.md');
  writeFileSync(outsideFile, '# Outside\n');
  let symlinkAvailable = true;
  const dir = makeSkill((skillDir) => {
    const link = join(skillDir, 'references', 'linked.md');
    try {
      symlinkSync(outsideFile, link, 'file');
    } catch (error) {
      if (['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) {
        symlinkAvailable = false;
        t.skip(`Symbolic links unavailable: ${error.code}`);
        return;
      }
      throw error;
    }
    const path = join(skillDir, 'SKILL.md');
    writeFileSync(path, `${readFileSync(path, 'utf8')}\nRead [linked](references/linked.md).\n`);
  });
  if (!symlinkAvailable) return;
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /symbolic|escape/i);
});

test('requires a contents section in references longer than 100 lines', () => {
  const dir = makeSkill((skillDir) => {
    const body = ['# Source studies', ...Array.from({ length: 105 }, (_, index) => `Line ${index}`), ...requiredSources.map((source) => source.url)];
    writeFileSync(join(skillDir, 'references', 'source-studies.md'), body.join('\n'));
  });
  const result = validate(dir);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /contents/i);
});

test('accepts a newline-terminated reference at the 100-line limit without contents', () => {
  const dir = makeSkill((skillDir) => {
    const lines = Array.from({ length: 100 }, (_, index) => `Line ${index}`);
    lines[0] = '# Source studies';
    lines[1] = '### Alpha study';
    lines[2] = requiredSources[0].url;
    lines[3] = '### Beta study';
    lines[4] = requiredSources[1].url;
    writeFileSync(join(skillDir, 'references', 'source-studies.md'), `${lines.join('\n')}\n`);
  });

  const result = validate(dir);
  assert.equal(result.status, 0, result.stderr);
});
