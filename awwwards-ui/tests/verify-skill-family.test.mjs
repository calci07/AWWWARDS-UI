import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const verifier = join(root, 'scripts', 'verify-skill-family.mjs');
const tasteCommit = 'e988add20dab0fa97d7a76781c48961c8184288e';
const tasteRepository = 'https://github.com/leonxlnx/taste-skill';
const tasteLicense = `https://github.com/leonxlnx/taste-skill/blob/${tasteCommit}/LICENSE`;

const expectedSkills = [
  ['brandkit', 'brandkit'],
  ['imagegen-frontend-mobile', 'imagegen-frontend-mobile'],
  ['imagegen-frontend-web', 'imagegen-frontend-web'],
  ['taste-skill', 'design-taste-frontend'],
];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function makeFamily(t) {
  const skillsRoot = mkdtempSync(join(tmpdir(), 'awwwards-family-test-'));
  t.after(() => rmSync(skillsRoot, { recursive: true, force: true }));

  for (const [directory, name] of expectedSkills) {
    const skillDir = join(skillsRoot, directory);
    mkdirSync(skillDir, { recursive: true });
    writeFileSync(join(skillDir, 'SKILL.md'), [
      '---',
      `name: ${name}`,
      `description: Fixture ${name} skill.`,
      '---',
      '',
    ].join('\n'));
  }
  const tasteDir = join(skillsRoot, 'taste-skill');
  mkdirSync(join(tasteDir, 'references'), { recursive: true });
  writeFileSync(join(tasteDir, 'references', 'guide.md'), '# Guide\n');

  const manifest = {
    repository: tasteRepository,
    commit: tasteCommit,
    retrieved_at: '2026-07-31',
    license: tasteLicense,
    skills: expectedSkills.map(([directory, name]) => ({
      directory,
      name,
      files: [
        { path: 'SKILL.md', sha256: sha256(join(skillsRoot, directory, 'SKILL.md')) },
        ...(directory === 'taste-skill'
          ? [{ path: 'references/guide.md', sha256: sha256(join(tasteDir, 'references', 'guide.md')) }]
          : []),
      ],
    })),
  };
  const manifestPath = join(skillsRoot, 'taste-pin.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  return { skillsRoot, manifestPath, manifest };
}

function run(family) {
  return spawnSync(process.execPath, [
    verifier,
    '--skills-root', family.skillsRoot,
    '--manifest', family.manifestPath,
  ], { cwd: root, encoding: 'utf8' });
}

test('verifies every pinned file hash and expected skill frontmatter name', (t) => {
  const result = run(makeFamily(t));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /verified 4 skills and 5 files/i);
  assert.match(result.stdout, new RegExp(tasteCommit));
});

test('rejects a missing staged skill directory', (t) => {
  const family = makeFamily(t);
  rmSync(join(family.skillsRoot, 'brandkit'), { recursive: true, force: true });
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /skill directory brandkit is missing/i);
});

test('rejects a missing file listed by the pin manifest', (t) => {
  const family = makeFamily(t);
  rmSync(join(family.skillsRoot, 'taste-skill', 'references', 'guide.md'));
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing pinned file taste-skill\/references\/guide\.md/i);
});

test('rejects an altered pinned file hash', (t) => {
  const family = makeFamily(t);
  writeFileSync(join(family.skillsRoot, 'taste-skill', 'references', 'guide.md'), '# Altered guide\n');
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /hash mismatch for taste-skill\/references\/guide\.md/i);
});

test('rejects the wrong staged SKILL frontmatter name', (t) => {
  const family = makeFamily(t);
  const path = join(family.skillsRoot, 'taste-skill', 'SKILL.md');
  writeFileSync(path, readFileSync(path, 'utf8').replace(
    'name: design-taste-frontend',
    'name: another-skill',
  ));
  family.manifest.skills.find((skill) => skill.directory === 'taste-skill').files[0].sha256 = sha256(path);
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));

  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-skill\/SKILL\.md name must be design-taste-frontend/i);
});

test('requires exact repository and license provenance', async (t) => {
  for (const [field, value] of [
    ['repository', 'https://github.com/example/taste-skill'],
    ['license', 'https://github.com/leonxlnx/taste-skill/blob/main/LICENSE'],
  ]) {
    await t.test(field, () => {
      const family = makeFamily(t);
      family.manifest[field] = value;
      writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));
      const result = run(family);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, new RegExp(`taste-pin\\.json ${field} must be`));
    });
  }
});

test('requires exactly the four pinned skill directory and name pairs', async (t) => {
  await t.test('omitted skill', () => {
    const family = makeFamily(t);
    family.manifest.skills = family.manifest.skills.filter((skill) => skill.directory !== 'brandkit');
    writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));
    const result = run(family);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /skills must contain exactly the four pinned skill directory and name pairs/i);
  });

  await t.test('extra skill', () => {
    const family = makeFamily(t);
    family.manifest.skills.push({ directory: 'other-skill', name: 'other-skill', files: [] });
    writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));
    const result = run(family);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /skills must contain exactly the four pinned skill directory and name pairs/i);
  });
});

test('rejects jointly altered manifest and frontmatter names', (t) => {
  const family = makeFamily(t);
  const path = join(family.skillsRoot, 'taste-skill', 'SKILL.md');
  writeFileSync(path, readFileSync(path, 'utf8').replace(
    'name: design-taste-frontend',
    'name: another-skill',
  ));
  const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
  taste.name = 'another-skill';
  taste.files[0].sha256 = sha256(path);
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));

  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-skill must declare expected name design-taste-frontend/i);
});

test('requires SKILL.md in every pinned file list', (t) => {
  const family = makeFamily(t);
  const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
  taste.files = taste.files.filter((file) => file.path !== 'SKILL.md');
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));

  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-skill\/SKILL\.md must be listed in data\/taste-pin\.json/i);
});

test('rejects an unlisted regular supporting file', (t) => {
  const family = makeFamily(t);
  writeFileSync(join(family.skillsRoot, 'brandkit', 'notes.md'), '# Unlisted\n');
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /unlisted regular file brandkit\/notes\.md/i);
});

test('requires canonical POSIX relative paths for every manifest file', async (t) => {
  for (const alias of [
    './SKILL.md',
    'references/sub/../guide.md',
    'references//guide.md',
    'references\\guide.md',
  ]) {
    await t.test(alias, () => {
      const family = makeFamily(t);
      const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
      const sourcePath = alias === './SKILL.md'
        ? join(family.skillsRoot, 'taste-skill', 'SKILL.md')
        : join(family.skillsRoot, 'taste-skill', 'references', 'guide.md');
      taste.files.push({
        path: alias,
        sha256: sha256(sourcePath),
      });
      writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));

      const result = run(family);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /skills\[3\]\.files\[2\]\.path must be a canonical POSIX relative path/i);
    });
  }
});

test('requires manifest path spelling to exactly match an enumerated disk file', (t) => {
  const family = makeFamily(t);
  const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
  taste.files[1].path = 'references/Guide.md';
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));

  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /skills\[3\]\.files\[1\]\.path[^\r\n]*must exactly match an enumerated regular file/i);
});

test('rejects case-fold aliases on Windows', { skip: process.platform !== 'win32' }, (t) => {
  const family = makeFamily(t);
  const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
  taste.files.push({
    path: 'REFERENCES/GUIDE.md',
    sha256: sha256(join(family.skillsRoot, 'taste-skill', 'references', 'guide.md')),
  });
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));

  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /skills\[3\]\.files\[2\]\.path is a case-fold alias of [^\r\n]*skills\[3\]\.files\[1\]\.path/i);
});

test('rejects a symbolic or junction path before following it outside the skills root', (t) => {
  const family = makeFamily(t);
  const outside = mkdtempSync(join(tmpdir(), 'awwwards-family-outside-'));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  const outsideFile = join(outside, 'secret.md');
  writeFileSync(outsideFile, '# Outside\n');
  const link = join(family.skillsRoot, 'taste-skill', 'references', 'escape');
  try {
    symlinkSync(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
  } catch (error) {
    if (['EPERM', 'EACCES', 'ENOTSUP', 'UNKNOWN'].includes(error.code)) {
      t.skip(`Symbolic links or junctions unavailable: ${error.code}`);
      return;
    }
    throw error;
  }

  const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
  taste.files.push({ path: 'references/escape/secret.md', sha256: sha256(outsideFile) });
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /symbolic or reparse path taste-skill\/references\/escape/i);
  assert.doesNotMatch(result.stderr, new RegExp(outside.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('preserves original manifest indices in sorted verification diagnostics', (t) => {
  const family = makeFamily(t);
  const taste = family.manifest.skills.find((skill) => skill.directory === 'taste-skill');
  const brand = family.manifest.skills.find((skill) => skill.directory === 'brandkit');
  const mobile = family.manifest.skills.find((skill) => skill.directory === 'imagegen-frontend-mobile');
  const web = family.manifest.skills.find((skill) => skill.directory === 'imagegen-frontend-web');
  family.manifest.skills = [taste, brand, mobile, web];
  brand.files[0].sha256 = 'not-a-hash';
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /skills\[1\]\.files\[0\]\.sha256/i);
});

test('rejects metadata from a different upstream commit', (t) => {
  const family = makeFamily(t);
  family.manifest.commit = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  writeFileSync(family.manifestPath, JSON.stringify(family.manifest, null, 2));
  const result = run(family);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /taste-pin\.json commit must be e988add20dab0fa97d7a76781c48961c8184288e/i);
});
