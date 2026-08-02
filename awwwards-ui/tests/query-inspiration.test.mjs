import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test, { after } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const script = join(root, 'scripts', 'query-inspiration.mjs');
const catalog = join(here, 'catalog-fixture.jsonl');
const curatedCatalog = join(here, 'curated-fixture.jsonl');
const emptyCuratedDir = mkdtempSync(join(tmpdir(), 'awwwards-empty-curated-'));
const emptyCuratedCatalog = join(emptyCuratedDir, 'empty.jsonl');
writeFileSync(emptyCuratedCatalog, '');
after(() => rmSync(emptyCuratedDir, { recursive: true, force: true }));

function run(args) {
  return spawnSync(process.execPath, [
    script,
    '--catalog', catalog,
    '--curated-catalog', emptyCuratedCatalog,
    ...args,
  ], {
    cwd: root,
    encoding: 'utf8',
  });
}

function runFederated(args, options = {}) {
  return spawnSync(process.execPath, [
    script,
    '--catalog', catalog,
    '--curated-catalog', options.curatedCatalog ?? curatedCatalog,
    ...args,
  ], {
    cwd: root,
    encoding: 'utf8',
  });
}

function runProduction(args) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: 'utf8',
  });
}

test('matches query text case-insensitively across names and tags', () => {
  const result = run(['--query', 'ARCHIVE', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.deepEqual(rows.map((row) => row.id), ['alpha']);
});

test('handles natural-language multi-term searches instead of requiring an exact phrase', () => {
  const result = run(['--query', 'editorial magazine', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.deepEqual(rows.map((row) => row.id), ['alpha', 'delta', 'epsilon', 'theta']);
});

test('ranks stronger multi-term and deep-study matches first', () => {
  const result = run(['--query', 'portfolio studio editorial', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.equal(rows[0].id, 'gamma');
  assert.ok(rows.some((row) => row.id === 'alpha'));
});

test('does not match a short query inside an unrelated longer word', () => {
  const result = run(['--query', 'art', '--json']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), []);
});

test('maps app and magazine aliases to canonical Awwwards category tags', () => {
  const apps = run(['--tags', 'app', '--json']);
  assert.equal(apps.status, 0, apps.stderr);
  assert.deepEqual(JSON.parse(apps.stdout).map((row) => row.id), ['eta']);

  const magazines = run(['--tags', 'magazine', '--json']);
  assert.equal(magazines.status, 0, magazines.stderr);
  assert.deepEqual(JSON.parse(magazines.stdout).map((row) => row.id), ['theta']);
});

test('requires every requested tag and preserves catalog order', () => {
  const result = run(['--tags', 'editorial,typography', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.deepEqual(rows.map((row) => row.id), ['alpha', 'delta']);
});

test('applies a bounded result limit', () => {
  const result = run(['--query', 'editorial', '--limit', '1', '--json']);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).length, 1);

  const invalid = run(['--limit', '0']);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /limit/i);
});

test('prints compact readable results by default', () => {
  const result = run(['--query', 'ecommerce']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Beta Objects/);
  assert.match(result.stdout, /https:\/\/beta\.example\//);
  assert.match(result.stdout, /https:\/\/www\.awwwards\.com\/sites\/beta-objects/);
  assert.match(result.stdout, /Source type:\s*directory-listing/i);
  assert.match(result.stdout, /Observation basis:\s*directory metadata/i);
  assert.match(result.stdout, /Limitation:\s*Directory metadata only/i);
});

test('searches the normalized depth field', () => {
  const result = run(['--query', 'deep', '--json']);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).map((row) => row.id), ['gamma']);
});

test('returns a successful empty result', () => {
  const json = run(['--query', 'nonexistent', '--json']);
  assert.equal(json.status, 0, json.stderr);
  assert.deepEqual(JSON.parse(json.stdout), []);

  const text = run(['--query', 'nonexistent']);
  assert.equal(text.status, 0, text.stderr);
  assert.match(text.stdout, /no matching inspirations/i);
});

test('reports the physical JSONL line number after blank lines', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-query-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = join(dir, 'catalog.jsonl');
  writeFileSync(path, '\n\nnot-json\n');

  const result = spawnSync(process.execPath, [script, '--catalog', path, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /catalog line 3/i);
});

test('federates curated precedents with normalized source provenance', () => {
  const result = runFederated(['--query', 'health mobile conversion', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.equal(rows[0].id, 'mobbin-health');
  assert.equal(rows[0].source_family, 'mobbin');
});

test('prints discovery provenance instead of an Awwwards-only label for curated results', () => {
  const textResult = runFederated(['--query', 'health mobile conversion']);
  assert.equal(textResult.status, 0, textResult.stderr);
  assert.match(textResult.stdout, /Discovery:/);
  assert.doesNotMatch(textResult.stdout, /^\s*Awwwards:/m);
});

test('filters federated results by source family', () => {
  const result = runFederated(['--source', 'mobbin', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.ok(rows.length > 0);
  assert.ok(rows.every((row) => row.source_family === 'mobbin'));
});

test('filters federated results by device while preserving stable federated order', () => {
  const result = runFederated(['--device', 'mobile', '--json']);
  assert.equal(result.status, 0, result.stderr);
  const mobileRows = JSON.parse(result.stdout);
  assert.deepEqual(mobileRows.map((row) => row.id), [
    'eta',
    'mobbin-health',
    'curated-studio',
    'duplicate-alpha',
  ]);
});

test('deduplicates matching catalog and curated rows by live URL', () => {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-federated-test-'));
  const duplicateCatalog = join(dir, 'catalog.jsonl');
  writeFileSync(duplicateCatalog, `${JSON.stringify({
    id: 'catalog-alpha',
    name: 'Alpha Archive',
    live_url: 'https://alpha.example/',
    tags: ['editorial'],
  })}\n`);

  const result = spawnSync(process.execPath, [
    script,
    '--catalog', duplicateCatalog,
    '--curated-catalog', curatedCatalog,
    '--query', 'alpha',
    '--json',
  ], { cwd: root, encoding: 'utf8' });
  rmSync(dir, { recursive: true, force: true });

  assert.equal(result.status, 0, result.stderr);
  const rows = JSON.parse(result.stdout);
  assert.equal(rows.filter((row) => row.live_url === 'https://alpha.example/').length, 1);
});

test('replaces a duplicate catalog winner with the higher-depth curated row', () => {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-depth-winner-test-'));
  const duplicateCatalog = join(dir, 'catalog.jsonl');
  writeFileSync(duplicateCatalog, `${JSON.stringify({
    id: 'catalog-alpha',
    name: 'Alpha Archive',
    live_url: 'https://alpha.example/',
    tags: ['editorial'],
    depth: 'index',
  })}\n`);

  const result = spawnSync(process.execPath, [
    script,
    '--catalog', duplicateCatalog,
    '--curated-catalog', curatedCatalog,
    '--query', 'alpha',
    '--json',
  ], { cwd: root, encoding: 'utf8' });
  rmSync(dir, { recursive: true, force: true });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).map((row) => row.id), ['duplicate-alpha']);
});

test('keeps the first duplicate when depth and evidence quality are equal', () => {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-stable-tie-test-'));
  const emptyCatalog = join(dir, 'catalog.jsonl');
  const duplicateCurated = join(dir, 'curated.jsonl');
  writeFileSync(emptyCatalog, '');
  const first = {
    id: 'first-alpha',
    name: 'Alpha Archive',
    live_url: 'https://alpha.example/',
    discovery_url: 'https://source.example/first',
    source_urls: [],
    source_family: 'direct',
    source_type: 'handpicked-site',
    depth: 'deep',
    observed_at: '2026-07-19',
    categories: ['editorial'],
    devices: ['desktop'],
    patterns: ['archive'],
    principles: ['First principle.'],
    limitations: ['First limitation.'],
    study_heading: 'First Alpha',
  };
  const second = {
    ...first,
    id: 'second-alpha',
    discovery_url: 'https://source.example/second',
    principles: ['Second principle.'],
    limitations: ['Second limitation.'],
    study_heading: 'Second Alpha',
  };
  writeFileSync(duplicateCurated, `${JSON.stringify(first)}\n${JSON.stringify(second)}\n`);

  const result = spawnSync(process.execPath, [
    script,
    '--catalog', emptyCatalog,
    '--curated-catalog', duplicateCurated,
    '--query', 'alpha',
    '--json',
  ], { cwd: root, encoding: 'utf8' });
  rmSync(dir, { recursive: true, force: true });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).map((row) => row.id), ['first-alpha']);
});

test('uses normalized names as a second identity channel and preserves the group position', () => {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-name-identity-test-'));
  const broad = join(dir, 'catalog.jsonl');
  const curated = join(dir, 'curated.jsonl');
  writeFileSync(broad, [
    JSON.stringify({
      id: 'broad-cafe',
      name: 'Caf\u00e9 - Studio!',
      live_url: 'https://old.example/',
      tags: ['editorial'],
      depth: 'deep',
    }),
    JSON.stringify({
      id: 'between',
      name: 'Between',
      live_url: 'https://between.example/',
      tags: ['editorial'],
      depth: 'deep',
    }),
  ].join('\n') + '\n');
  writeFileSync(curated, `${JSON.stringify({
    id: 'curated-cafe',
    name: 'CAFE studio',
    live_url: 'https://new.example/',
    discovery_url: 'https://source.example/cafe',
    source_urls: [],
    source_family: 'direct',
    source_type: 'handpicked-site',
    depth: 'deep',
    observed_at: '2026-07-19',
    categories: ['editorial'],
    devices: ['desktop'],
    patterns: ['archive'],
    principles: ['Use a clear archive.'],
    limitations: ['Fixture only.'],
    study_heading: 'CAFE studio',
  })}\n`);

  const result = spawnSync(process.execPath, [
    script,
    '--catalog', broad,
    '--curated-catalog', curated,
    '--limit', '2',
    '--json',
  ], { cwd: root, encoding: 'utf8' });
  rmSync(dir, { recursive: true, force: true });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout).map((row) => row.id), ['curated-cafe', 'between']);
});

test('prefers evidence-rich handpicked rows for all seven production collisions', async (t) => {
  const cases = [
    ['floema', 'floema'],
    ['house honey', 'house-of-honey'],
    ['neue montreal', 'pp-neue-montreal'],
    ['bucks sauce', 'bucks-sauce'],
    ['izanami', 'izanami'],
    ['glitch grit', 'glitch-and-grit'],
    ['hiroto sato', 'hiroto-sato'],
  ];

  for (const [query, expectedId] of cases) {
    await t.test(expectedId, () => {
      const result = runProduction(['--query', query, '--limit', '5', '--json']);
      assert.equal(result.status, 0, result.stderr);
      const row = JSON.parse(result.stdout).find((entry) => entry.id === expectedId);
      assert.ok(row, `${expectedId} was not returned`);
      assert.equal(row.source_type, 'handpicked-site');
      assert.ok(Array.isArray(row.principles) && row.principles.length > 0);
    });
  }
});

test('prints the evidence ceiling and study-derived heuristic for Mobbin directory studies', () => {
  const result = runProduction([
    '--query', 'focused task',
    '--source', 'mobbin',
    '--device', 'mobile',
    '--limit', '1',
  ]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Source type:\s*directory-study/i);
  assert.match(result.stdout, /Observation basis:\s*Mobbin iOS latest\s*\(2026-07-19\)/i);
  assert.match(result.stdout, /Principle:\s*Study-derived heuristic/i);
  assert.match(result.stdout, /Limitation:\s*The study records visible taxonomy/i);
  assert.doesNotMatch(result.stdout, /^\s*Awwwards:/m);
});

test('rejects invalid federated source values with actionable guidance', () => {
  const result = runFederated(['--source', 'not-a-source']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--source must be one of/i);
});

test('rejects invalid device values with actionable guidance', () => {
  const result = runFederated(['--device', 'watch']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--device must be one of/i);
  assert.match(result.stderr, /received watch/i);
});

test('reports an unreadable curated JSONL catalog with curated-catalog context', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'awwwards-missing-curated-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const missingCatalog = join(dir, 'missing.jsonl');
  const result = runFederated(['--json'], { curatedCatalog: missingCatalog });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /curated catalog/i);
});

test('continues to reject zero as a result limit before federated retrieval', () => {
  const result = run(['--limit', '0']);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--limit must be an integer from 1 to 100/i);
});
