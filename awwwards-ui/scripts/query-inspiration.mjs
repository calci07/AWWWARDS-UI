#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceFamilies = new Set(['awwwards', 'mobbin', 'direct', 'video']);
const supportedDevices = new Set(['mobile', 'tablet', 'desktop', 'wide', 'ios', 'android']);

function usage() {
  return [
    'Usage: node scripts/query-inspiration.mjs [options]',
    '',
    'Options:',
    '  --query <text>              Rank natural-language matches across names and metadata',
    '  --tags <a,b>                Require every comma-separated tag or known alias',
    '  --source <a,b>              Include source families: awwwards, mobbin, direct, video',
    '  --device <a,b>              Include devices: mobile, tablet, desktop, wide, ios, android',
    '  --limit <1-100>             Maximum results (default: 12)',
    '  --catalog <path>            Alternate broad Awwwards JSONL catalog',
    '  --curated-catalog <path>    Alternate curated precedent JSONL catalog',
    '  --json                      Emit a JSON array',
    '  --help                      Show this help',
  ].join('\n');
}

function commaSeparated(value) {
  return value.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
}

function validateChoices(option, values, allowed) {
  const invalid = values.find((value) => !allowed.has(value));
  if (invalid) {
    throw new Error(`${option} must be one of: ${[...allowed].join(', ')} (received ${invalid})`);
  }
}

function parseArgs(argv) {
  const options = {
    query: '',
    tags: [],
    sourceFamilies: [],
    devices: [],
    limit: 12,
    catalog: resolve(scriptDir, '..', 'data', 'inspiration-index.jsonl'),
    curatedCatalog: resolve(scriptDir, '..', 'data', 'curated-precedents.jsonl'),
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--json') {
      options.json = true;
    } else if (argument === '--help') {
      options.help = true;
    } else if (['--query', '--tags', '--source', '--device', '--limit', '--catalog', '--curated-catalog'].includes(argument)) {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(`${argument} requires a value`);
      }
      index += 1;
      if (argument === '--query') options.query = value.trim().toLowerCase();
      if (argument === '--tags') options.tags = commaSeparated(value);
      if (argument === '--source') {
        options.sourceFamilies = commaSeparated(value);
        validateChoices('--source', options.sourceFamilies, sourceFamilies);
      }
      if (argument === '--device') {
        options.devices = commaSeparated(value);
        validateChoices('--device', options.devices, supportedDevices);
      }
      if (argument === '--catalog') {
        options.catalog = resolve(value);
      }
      if (argument === '--curated-catalog') {
        options.curatedCatalog = resolve(value);
      }
      if (argument === '--limit') {
        const limit = Number(value);
        if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
          throw new Error('--limit must be an integer from 1 to 100');
        }
        options.limit = limit;
      }
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  return options;
}

function readCatalog(path, label = 'catalog') {
  let content;
  try {
    content = readFileSync(path, 'utf8');
  } catch (error) {
    throw new Error(`Unable to read ${label} ${path}: ${error.message}`);
  }

  return content
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
    .filter(({ line }) => Boolean(line))
    .map(({ line, lineNumber }) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`Invalid JSON on ${label} line ${lineNumber}: ${error.message}`);
      }
    });
}

function normalizeBroadRow(row) {
  return {
    ...row,
    discovery_url: row.source_url ?? row.awwwards_url,
    source_family: 'awwwards',
    source_type: 'directory-listing',
    categories: row.tags ?? [],
    devices: (row.tags ?? []).some((tag) => /mobile|app/i.test(tag)) ? ['mobile', 'desktop'] : ['desktop'],
    patterns: row.tags ?? [],
    principles: [],
    limitations: ['Directory metadata only; inspect before claiming behavior.'],
  };
}

function normalizeCuratedRow(row) {
  const tags = [
    ...(row.categories ?? []),
    ...(row.devices ?? []),
    ...(row.patterns ?? []),
    ...(row.principles ?? []),
    row.source_family,
  ].map((value) => String(value).trim()).filter(Boolean);

  return { ...row, tags: [...new Set(tags)] };
}

function searchableText(row) {
  return [
    row.name,
    row.award,
    row.awwwards_url,
    row.live_url,
    row.source_family,
    row.source_type,
    row.depth,
    ...(Array.isArray(row.tags) ? row.tags : []),
  ].filter(Boolean).join(' ').toLowerCase();
}

const queryAliases = new Map(Object.entries({
  '3d': ['3d', '360', 'blender', 'three.js', 'webgl'],
  animation: ['animation', 'motion', 'transitions', 'microinteractions'],
  app: ['app', 'mobile', 'mobile & apps', 'app style', 'ui design', 'interaction design'],
  commerce: ['commerce', 'e-commerce', 'ecommerce', 'shopping'],
  ecommerce: ['ecommerce', 'e-commerce', 'shopping'],
  editorial: ['editorial', 'typography', 'photographic', 'photography'],
  immersive: ['immersive', 'fullscreen', 'sound-audio', 'webgl'],
  magazine: ['magazine', 'magazine / newspaper / blog', 'editorial', 'typography', 'photographic', 'photography'],
  motion: ['motion', 'animation', 'transitions', 'microinteractions', 'scrolling'],
  product: ['product', 'e-commerce', 'ecommerce', 'promotional'],
  scroll: ['scroll', 'scrolling', 'infinite scroll'],
  shop: ['shop', 'shopping', 'e-commerce', 'ecommerce'],
  story: ['story', 'storytelling', 'narrative'],
  type: ['type', 'typography', 'copy design'],
  wellness: ['wellness', 'health', 'sports'],
}));

const tagAliases = new Map(Object.entries({
  app: ['app', 'mobile & apps', 'app style'],
  commerce: ['commerce', 'e-commerce', 'ecommerce', 'shopping'],
  ecommerce: ['ecommerce', 'e-commerce'],
  magazine: ['magazine', 'magazine / newspaper / blog'],
  shop: ['shop', 'shopping', 'e-commerce', 'ecommerce'],
}));

const stopWords = new Set([
  'a', 'an', 'and', 'for', 'from', 'in', 'of', 'on', 'site', 'the', 'to', 'website', 'with',
]);

function tokenize(query) {
  return (query.match(/[a-z0-9][a-z0-9&.+-]*/g) ?? [])
    .filter((token) => !stopWords.has(token));
}

function expandedQueryTerms(term) {
  return queryAliases.get(term) ?? [term];
}

function expandedTagTerms(term) {
  return tagAliases.get(term) ?? [term];
}

function hasTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, 'i').test(text);
}

function scoreQuery(row, query, requestedDevices) {
  if (!query) return 0;
  const text = searchableText(row);
  const tokens = tokenize(query);
  let score = hasTerm(text, query) ? 4 : 0;

  for (const token of tokens) {
    if (expandedQueryTerms(token).some((candidate) => hasTerm(text, candidate))) {
      score += 1;
    }
  }

  if (score > 0) {
    if (row.depth === 'deep') score += 2;
    if (row.source_type === 'handpicked-site') score += 1;
    if (row.source_family === 'mobbin' && requestedDevices.has('mobile')) score += 1;
  }
  return score;
}

function canonicalLiveKey(row) {
  if (!row.live_url) return null;
  try {
    return new URL(row.live_url).href;
  } catch {
    return row.live_url.trim().toLowerCase();
  }
}

function normalizedNameKey(row) {
  if (typeof row.name !== 'string') return null;
  const key = row.name
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return key || null;
}

function depthRank(row) {
  return row.depth === 'deep' ? 1 : 0;
}

function evidenceQuality(row) {
  return [
    row.source_type && row.source_type !== 'directory-listing' ? 1 : 0,
    Array.isArray(row.principles) && row.principles.some((value) => String(value).trim()) ? 1 : 0,
    String(row.study_heading ?? '').trim() && String(row.observed_at ?? '').trim() ? 1 : 0,
    Array.isArray(row.limitations) && row.limitations.some((value) => String(value).trim()) ? 1 : 0,
  ].map(Number);
}

function compareEvidence(left, right) {
  const depthDifference = depthRank(left.row) - depthRank(right.row);
  if (depthDifference !== 0) return depthDifference;
  const leftQuality = evidenceQuality(left.row);
  const rightQuality = evidenceQuality(right.row);
  for (let index = 0; index < leftQuality.length; index += 1) {
    const difference = leftQuality[index] - rightQuality[index];
    if (difference !== 0) return difference;
  }
  return 0;
}

function preferredEntry(left, right) {
  const comparison = compareEvidence(left, right);
  if (comparison !== 0) return comparison > 0 ? left : right;
  return left.index <= right.index ? left : right;
}

function deduplicateMatches(matches) {
  const groups = [];
  const liveGroups = new Map();
  const nameGroups = new Map();

  for (const entry of matches) {
    const liveKey = canonicalLiveKey(entry.row);
    const nameKey = normalizedNameKey(entry.row);
    const candidates = [...new Set([
      liveKey ? liveGroups.get(liveKey) : null,
      nameKey ? nameGroups.get(nameKey) : null,
    ].filter(Boolean))];

    let group;
    if (candidates.length === 0) {
      group = {
        index: entry.index,
        winner: entry,
        liveKeys: new Set(),
        nameKeys: new Set(),
        merged: false,
      };
      groups.push(group);
    } else {
      group = candidates.reduce((earliest, candidate) => (
        candidate.index < earliest.index ? candidate : earliest
      ));
      for (const candidate of candidates) {
        if (candidate === group) continue;
        group.index = Math.min(group.index, candidate.index);
        group.winner = preferredEntry(group.winner, candidate.winner);
        for (const key of candidate.liveKeys) {
          group.liveKeys.add(key);
          liveGroups.set(key, group);
        }
        for (const key of candidate.nameKeys) {
          group.nameKeys.add(key);
          nameGroups.set(key, group);
        }
        candidate.merged = true;
      }
      group.index = Math.min(group.index, entry.index);
      group.winner = preferredEntry(group.winner, entry);
    }

    if (liveKey) {
      group.liveKeys.add(liveKey);
      liveGroups.set(liveKey, group);
    }
    if (nameKey) {
      group.nameKeys.add(nameKey);
      nameGroups.set(nameKey, group);
    }
  }

  return groups
    .filter((group) => !group.merged)
    .map((group) => ({ ...group.winner, index: group.index }));
}

function selectRows(rows, options) {
  const requestedDevices = new Set(options.devices ?? []);
  const requestedSources = new Set(options.sourceFamilies ?? []);
  const matches = rows.map((row, index) => {
    const rowTags = new Set((row.tags ?? []).map((tag) => String(tag).toLowerCase()));
    const rowDevices = new Set((row.devices ?? []).map((device) => String(device).toLowerCase()));
    const score = scoreQuery(row, options.query, requestedDevices);
    const queryMatches = !options.query || score > 0;
    const tagsMatch = (options.tags ?? []).every((tag) => (
      expandedTagTerms(tag).some((candidate) => rowTags.has(candidate))
    ));
    const sourceMatches = requestedSources.size === 0 || requestedSources.has(row.source_family);
    const deviceMatches = requestedDevices.size === 0 || [...requestedDevices].some((device) => rowDevices.has(device));
    return { row, index, score, matches: queryMatches && tagsMatch && sourceMatches && deviceMatches };
  }).filter((entry) => entry.matches);

  const uniqueMatches = deduplicateMatches(matches);
  if (options.query) {
    uniqueMatches.sort((left, right) => right.score - left.score || left.index - right.index);
  } else {
    uniqueMatches.sort((left, right) => left.index - right.index);
  }

  return uniqueMatches.slice(0, options.limit).map((entry) => entry.row);
}

function formatRows(rows) {
  if (rows.length === 0) return 'No matching inspirations.\n';
  return rows.map((row, index) => {
    const detail = [row.award, ...(row.categories ?? [])].filter(Boolean).join(', ');
    const observationBasis = row.study_heading && row.observed_at
      ? `${row.study_heading} (${row.observed_at})`
      : row.study_heading
        ? `${row.study_heading} (observation date unavailable)`
        : row.observed_at
          ? `directory metadata (${row.observed_at})`
          : 'directory metadata (observation date unavailable)';
    const principle = row.principles?.[0]
      ? row.source_type === 'directory-study'
        ? `Principle: Study-derived heuristic - ${row.principles[0]}`
        : `Principle: ${row.principles[0]}`
      : null;
    const evidence = [
      row.live_url ? `Live: ${row.live_url}` : null,
      row.discovery_url ? `Discovery: ${row.discovery_url}` : null,
      row.awwwards_url ? `Detail: ${row.awwwards_url}` : null,
      row.source_family ? `Source family: ${row.source_family}` : null,
      row.source_type ? `Source type: ${row.source_type}` : null,
      `Observation basis: ${observationBasis}`,
      row.observed_at ? `Observed: ${row.observed_at}` : null,
      principle,
      row.limitations?.[0] ? `Limitation: ${row.limitations[0]}` : null,
    ].filter(Boolean).map((value) => `   ${value}`).join('\n');
    return `${index + 1}. ${row.name}${detail ? ` - ${detail}` : ''}\n${evidence}`;
  }).join('\n') + '\n';
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`${usage()}\n`);
  } else {
    const broadRows = readCatalog(options.catalog, 'catalog').map(normalizeBroadRow);
    const curatedRows = readCatalog(options.curatedCatalog, 'curated catalog').map(normalizeCuratedRow);
    const results = selectRows([...broadRows, ...curatedRows], options);
    process.stdout.write(options.json ? `${JSON.stringify(results, null, 2)}\n` : formatRows(results));
  }
} catch (error) {
  process.stderr.write(`Error: ${error.message}\n\n${usage()}\n`);
  process.exitCode = 1;
}
