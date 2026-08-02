import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const expected = [
  'https://www.youtube.com/watch?v=DQOCFw_23FI&list=LL&index=21&t=15s',
  'https://www.awwwards.com/websites/',
  'https://mobbin.com/discover/sites/popular',
  'https://mobbin.com/discover/apps/ios/latest',
  'https://mobbin.com/discover/apps/ios/popular',
  'https://mobbin.com/discover/apps/ios/top',
  'https://superpower.com/',
  'https://seed.com/',
  'https://www.biograph.com/',
  'https://www.tines.com/',
  'https://www.shopify.com/editions/winter2026',
  'https://www.shopify.com/editions/spring2026',
  'https://www.shopify.com/editions/summer2025',
  'https://www.shopify.com/editions/summer2024',
  'https://www.shopify.com/editions/winter2024',
  'https://www.shopify.com/editions/winter2023',
  'https://www.shopify.com/editions/summer2022#b2b',
  'https://heyparker.ai/',
  'https://contralabs.com/',
  'https://basement.studio/',
  'https://cofounder.co/',
  'https://follow.art/',
  'https://www.zipline.com/',
  'https://en.manayerbamate.com/',
  'https://www.floema.com/en',
  'https://www.houseofhoney.com/',
  'https://neuemontreal.com/',
  'https://buckssauce.com/',
  'https://drinkjoyrush.com/',
  'https://izanami-official.com/',
  'https://glitchandgrit.com/',
  'https://www.hirotos.com/',
];

const mobbinDirectoryUrls = new Set([
  'https://mobbin.com/discover/sites/popular',
  'https://mobbin.com/discover/apps/ios/latest',
  'https://mobbin.com/discover/apps/ios/popular',
  'https://mobbin.com/discover/apps/ios/top',
].map(normalize));

const handpickedLiveUrls = new Set([
  'https://superpower.com/',
  'https://seed.com/',
  'https://www.biograph.com/',
  'https://www.tines.com/',
  'https://www.shopify.com/editions/winter2026',
  'https://www.shopify.com/editions/spring2026',
  'https://www.shopify.com/editions/summer2025',
  'https://www.shopify.com/editions/summer2024',
  'https://www.shopify.com/editions/winter2024',
  'https://www.shopify.com/editions/winter2023',
  'https://www.shopify.com/editions/summer2022#b2b',
  'https://heyparker.ai/',
  'https://contralabs.com/',
  'https://basement.studio/',
  'https://cofounder.co/',
  'https://follow.art/',
  'https://www.zipline.com/',
  'https://en.manayerbamate.com/',
  'https://www.floema.com/en',
  'https://www.houseofhoney.com/',
  'https://neuemontreal.com/',
  'https://buckssauce.com/',
  'https://drinkjoyrush.com/',
  'https://izanami-official.com/',
  'https://glitchandgrit.com/',
  'https://www.hirotos.com/',
].map(normalize));

function normalize(url) {
  return new URL(url).href;
}

function extractUrls(markdown) {
  return new Set((markdown.match(/https?:\/\/[^\s)<>'"]+/g) ?? []).map(normalize));
}

function readJsonl(path) {
  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function rowUrls(row) {
  return [row.live_url, row.discovery_url, ...(row.source_urls ?? [])]
    .filter(Boolean)
    .map(normalize);
}

test('the source manifest contains every user-supplied website exactly once', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'data', 'required-sources.json'), 'utf8'));
  const actual = manifest.map((source) => normalize(source.url));
  const wanted = expected.map(normalize);

  assert.equal(actual.length, expected.length);
  assert.equal(new Set(actual).size, expected.length);
  assert.deepEqual([...actual].sort(), [...wanted].sort());
});

test('every required URL is cited in the deep source study', () => {
  const studyUrls = extractUrls(readFileSync(join(root, 'references', 'source-studies.md'), 'utf8'));
  for (const url of expected) {
    assert.ok(studyUrls.has(normalize(url)), `Missing source study URL: ${url}`);
  }
});

test('every manifest URL has curated precedent evidence', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'data', 'required-sources.json'), 'utf8'));
  const curated = readJsonl(join(root, 'data', 'curated-precedents.jsonl'));
  const evidenceUrls = new Set(curated.flatMap(rowUrls));

  for (const source of manifest) {
    assert.ok(evidenceUrls.has(normalize(source.url)), `Missing curated evidence URL: ${source.url}`);
  }
});

test('curated evidence includes every handpicked live site and required source family', () => {
  const curated = readJsonl(join(root, 'data', 'curated-precedents.jsonl'));
  const liveUrls = new Set(curated.map((row) => row.live_url).filter(Boolean).map(normalize));
  const discoveredUrls = new Set(curated.flatMap((row) => [
    row.discovery_url,
    ...(row.source_urls ?? []),
  ]).filter(Boolean).map(normalize));
  const families = new Set(curated.map((row) => row.source_family));

  for (const url of handpickedLiveUrls) {
    assert.ok(liveUrls.has(url), `Missing handpicked live URL: ${url}`);
  }
  for (const url of mobbinDirectoryUrls) {
    assert.ok(discoveredUrls.has(url), `Missing Mobbin discovery URL: ${url}`);
  }
  for (const family of ['awwwards', 'mobbin', 'video']) {
    assert.ok(families.has(family), `Missing curated source family: ${family}`);
  }
});
