import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { access, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { promisify } from 'node:util';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...parts) => path.join(root, ...parts);
const runFile = promisify(execFile);

async function git(...args) {
  const { stdout } = await runFile('git', args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  return stdout;
}

const requiredPackagePaths = [
  'awwwards-ui/SKILL.md',
  'awwwards-ui/agents/openai.yaml',
  'awwwards-ui/data/inspiration-index.jsonl',
  'awwwards-ui/data/taste-pin.json',
  'awwwards-ui/references/roadmap-and-approval.md',
  'awwwards-ui/references/taste-integration.md',
  'awwwards-ui/scripts/query-inspiration.mjs',
  'awwwards-ui/scripts/validate-skill.mjs',
  'awwwards-ui/tests/validate-skill.test.mjs',
];

const requiredReadmeHeadings = [
  '## What Awwwards UI Is',
  '## Showcase',
  '## What It Can Do',
  '## How the Workflow Works',
  '## Execution Modes',
  '## Installation',
  '## Quick Start',
  '## Detailed Usage',
  '## Companion Skills and Fallbacks',
  '## Testing and Validation',
  '## Boundaries and Limitations',
  '## Credits',
  '## License',
];

const mediaFiles = [
  'media/readme-hero.png',
  'media/mockups/01-luxury-editorial.png',
  'media/mockups/02-biotech-futurism.png',
  'media/mockups/03-financial-brutalism.png',
  'media/mockups/04-playful-commerce.png',
  'media/mockups/05-cinematic-hospitality.png',
];

async function exists(relativePath) {
  await access(at(relativePath));
}

test('portable skill package is complete', async () => {
  await Promise.all(requiredPackagePaths.map(exists));
  const skill = await readFile(at('awwwards-ui/SKILL.md'), 'utf8');
  assert.match(skill, /^name: awwwards-ui$/m);
  assert.match(skill, /^description: "Use when /m);
});

test('documentation contract is complete', async () => {
  const readme = await readFile(at('README.md'), 'utf8');
  for (const heading of requiredReadmeHeadings) assert.ok(readme.includes(heading), heading);
  for (const image of mediaFiles) assert.ok(readme.includes(image), image);
  assert.match(readme, /Stage A/);
  assert.match(readme, /Stage B/);
  assert.match(readme, /npx skills add https:\/\/github\.com\/calci07\/AWWWARDS-UI/);
});

test('licensing and attribution are explicit', async () => {
  const license = await readFile(at('LICENSE'), 'utf8');
  const notices = await readFile(at('THIRD_PARTY_NOTICES.md'), 'utf8');
  const readme = await readFile(at('README.md'), 'utf8');
  assert.match(license, /MIT License/);
  assert.match(license, /Copyright \(c\) 2026 Gerald Bitago/);
  assert.match(notices, /leonxlnx\/taste-skill/i);
  assert.match(notices, /e988add20dab0fa97d7a76781c48961c8184288e/);
  assert.match(notices, /Copyright \(c\) 2026 Leonxlnx/);
  assert.match(readme, /Taste Skill/);
});

test('generated media and provenance are complete', async () => {
  for (const file of mediaFiles) assert.ok((await stat(at(file))).size > 32_768, file);
  const entries = JSON.parse(await readFile(at('media/image-provenance.json'), 'utf8'));
  assert.equal(entries.length, 6);
  assert.deepEqual(entries.map((entry) => entry.file), mediaFiles);
  for (const entry of entries) {
    assert.equal(entry.generator, 'GPT Image 2');
    assert.ok(entry.prompt.length >= 300, entry.file);
    assert.equal(entry.status, 'selected-final');
  }
});

test('public repository excludes internal, ignored, and personal-path artifacts', async () => {
  const tracked = (await git('ls-files', '-z')).split('\0').filter(Boolean);
  const internal = tracked.filter((file) =>
    file.startsWith('.superpowers/') || file.startsWith('docs/superpowers/'));
  const ignored = (await git('ls-files', '-ci', '--exclude-standard', '-z'))
    .split('\0')
    .filter(Boolean);

  const separator = String.raw`[\\/]`;
  const inlineCode = String.fromCharCode(96);
  const leadingBoundary = `(?:^|[\\s"'${inlineCode}(\\[{=])`;
  const userSegment = `(?!<)(?!\\{)(?!\\[)(?!\\$)[^\\\\/\\s"'${inlineCode}<>{}\\[\\]]+`;
  const windowsHome = [String.raw`[A-Za-z]:`, 'Users', userSegment].join(separator);
  const posixHome = `/(?:${['Users', 'home'].join('|')})/${userSegment}`;
  const personalAbsolutePath = new RegExp(
    `${leadingBoundary}(?:${windowsHome}|${posixHome})`,
    'i',
  );
  const syntheticPersonalPaths = [
    ['C:', 'Users', 'sample-user', 'project'].join('\\'),
    ['', 'Users', 'sample-user', 'project'].join('/'),
    ['', 'home', 'sample-user', 'project'].join('/'),
  ];
  const ordinaryPaths = [
    ['https://example.test', 'Users', 'sample-user', 'guide'].join('/'),
    ['https://example.test', 'home', 'sample-user', 'guide'].join('/'),
    ['docs', 'Users', 'sample-user', 'guide'].join('/'),
    ['', 'Users', '<name>', 'project'].join('/'),
    ['', 'home', '{user}', 'project'].join('/'),
    ['C:', 'Users', '<name>', 'project'].join('\\'),
    ['', 'usr', 'local', 'bin'].join('/'),
  ];

  for (const sample of syntheticPersonalPaths) {
    assert.match(sample, personalAbsolutePath);
  }
  for (const sample of ordinaryPaths) {
    assert.doesNotMatch(sample, personalAbsolutePath);
  }
  const personalPaths = [];

  for (const file of tracked) {
    const contents = await readFile(at(file));
    if (contents.includes(0)) continue;

    const lines = contents.toString('utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      if (personalAbsolutePath.test(line)) personalPaths.push(`${file}:${index + 1}`);
    });
  }

  assert.deepEqual(
    { internal, ignored, personalPaths },
    { internal: [], ignored: [], personalPaths: [] },
  );
});
