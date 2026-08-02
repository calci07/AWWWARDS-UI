#!/usr/bin/env node

import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { isIP } from 'node:net';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[2] ?? join(scriptDir, '..'));
const errors = [];

function readRequired(path, label) {
  if (!existsSync(path)) {
    errors.push(`Missing ${label}: ${path}`);
    return null;
  }
  const text = readFileSync(path, 'utf8');
  if (!text.trim()) {
    errors.push(`Empty ${label}: ${path}`);
    return null;
  }
  return text;
}

function parseJson(path, label) {
  const source = readRequired(path, label);
  if (source === null) return null;
  try {
    return JSON.parse(source);
  } catch (error) {
    errors.push(`Invalid JSON in ${label}: ${error.message}`);
    return null;
  }
}

function parseJsonObject(path, label) {
  const source = readRequired(path, label);
  if (source === null) return null;
  try {
    const value = JSON.parse(source);
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`${label} must contain an object`);
      return null;
    }
    return value;
  } catch (error) {
    errors.push(`Invalid JSON in ${label}: ${error.message}`);
    return null;
  }
}

function normalizeTextUrl(value) {
  return new URL(String(value).trim()).href;
}

function exactUrl(value) {
  return new URL(value).href;
}

function extractHttpUrls(text) {
  const urls = new Set();
  for (const value of text.match(/https?:\/\/[^\s)<>'"]+/g) ?? []) {
    try {
      urls.add(exactUrl(value));
    } catch {
      // Invalid incidental text is irrelevant; manifest URLs are validated separately.
    }
  }
  return urls;
}

function canonicalDetailUrl(value) {
  const url = new URL(value);
  url.hash = '';
  url.search = '';
  url.pathname = url.pathname.replace(/\/$/, '').toLowerCase();
  return `${url.protocol}//${url.hostname.toLowerCase()}${url.pathname}`;
}

function isDateOnly(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function splitLines(value) {
  const lines = value.split(/\r?\n/);
  if (lines.at(-1) === '') lines.pop();
  return lines;
}

function requirePatterns(source, label, requirements) {
  if (source === null) return;
  for (const requirement of requirements) {
    if (!requirement.pattern.test(source)) {
      errors.push(`Missing ${requirement.label} in ${label}`);
    }
  }
}

function forbidPatterns(source, label, prohibitions) {
  if (source === null) return;
  for (const prohibition of prohibitions) {
    if (prohibition.pattern.test(source)) {
      errors.push(`Forbidden ${prohibition.label} in ${label}`);
    }
  }
}

function normalizeContractWindow(value) {
  return value
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/[`*_#>|[\](){}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMarkdownListItem(line) {
  return /^\s*(?:[-+*]|\d+[.)])\s+\S/.test(line);
}

function stripMarkdownListMarker(line) {
  return line.replace(/^\s*(?:[-+*]|\d+[.)])\s+/, '').trim();
}

function isContractWindowBoundary(line) {
  return /^\s*(?:#{1,6}\s|```|~~~)/.test(line);
}

const localInspectionActionSource = '(?:audits?|audited|auditing|checks?|checked|checking|completes?|completed|completing|covers?|covered|covering|inspects?|inspected|inspecting|perfects?|perfected|perfecting|performs?|performed|performing|reviews?|reviewed|reviewing|runs?|ran|running|tests?|tested|testing|validates?|validated|validating|verif(?:y|ies|ied|ying))';

function splitContractClauses(value) {
  const boundary = new RegExp(`(?<=[.!?])\\s+|;\\s*|,\\s+(?=(?:and|but|yet)\\s+${localInspectionActionSource}\\b)|\\s+(?=(?:but|yet)\\s+${localInspectionActionSource}\\b)`, 'i');
  return value
    .split(boundary)
    .map((clause) => clause.replace(/^(?:and|but|yet)\s+/i, ''))
    .map(normalizeContractWindow)
    .filter(Boolean);
}

function normalizedContractWindows(source) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const rawWindows = [];
  const windows = new Set();

  let block = [];
  const flushBlock = () => {
    if (block.length > 0) rawWindows.push(block.map(stripMarkdownListMarker).join(' '));
    block = [];
  };
  for (const line of lines) {
    if (!line.trim() || isContractWindowBoundary(line)) {
      flushBlock();
    } else {
      block.push(line);
    }
  }
  flushBlock();

  for (const [index, line] of lines.entries()) {
    if (!line.trim().endsWith(':') || isContractWindowBoundary(line)) continue;
    const listItems = [];
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const candidate = lines[cursor];
      if (!candidate.trim()) continue;
      if (isContractWindowBoundary(candidate) || !isMarkdownListItem(candidate)) break;
      listItems.push(stripMarkdownListMarker(candidate));
    }
    if (listItems.length > 0) {
      rawWindows.push(`${stripMarkdownListMarker(line)} ${listItems.join(' ')}`);
    }
  }

  for (const rawWindow of rawWindows) {
    for (const clause of splitContractClauses(rawWindow)) windows.add(clause);
  }
  return windows;
}

function hasLocalFullCoverageConflict(source) {
  const action = new RegExp(`\\b${localInspectionActionSource}\\b`);
  const localScope = /\b(?:(?:each|every|per)[ -]?(?:targeted[ -])?(?:asset|component|design batch|frame|section|unit)|(?:asset|frame|section|unit)-local|construction|design batch|structure pass)\b/;
  const coverageAlias = /\b(?:all six widths?|six[- ]widths?|all required (?:breakpoints?|devices?|device sizes?|sizes?|viewports?|widths?)|every required (?:breakpoint|device|device size|size|viewport|width)|all devices?|every devices?|all device sizes?|all-device(?: sizes?)?|every device size|all widths?|every width|full[- ]width (?:breakpoint|device|responsive)? ?(?:audit|check|coverage|inspection|qa|review|validation))\b/;
  const negatedAction = new RegExp(`\\b(?:avoid|cannot|can't|do not|don't|must not|never|should not)\\b(?:\\s+[\\w'-]+){0,10}\\s+\\b${localInspectionActionSource}\\b`);
  const negatedLocalScope = /\b(?:do not|must not|never|not|should not)\b.{0,220}\b(?:(?:each|every|per)[ -]?(?:asset|component|design batch|frame|section|unit)|(?:asset|frame|section|unit)-local)\b/;
  const milestoneOnly = /\b(?:only|solely|reserve|reserved)\b.{0,180}\b(?:page|device)? ?milestones?\b.{0,180}\b(?:final|handoff)\b/;

  for (const window of normalizedContractWindows(source)) {
    const explicitCoverage = ['320', '390', '768', '1024', '1440']
      .every((width) => new RegExp(`\\b${width}(?:\\s*px)?\\b`).test(window))
      && /\b(?:wide|1920(?:\s*px)?)\b/.test(window);
    if (!(explicitCoverage || coverageAlias.test(window))) continue;
    if (!action.test(window) || !localScope.test(window)) continue;
    if (negatedAction.test(window) || negatedLocalScope.test(window) || milestoneOnly.test(window)) continue;
    return true;
  }
  return false;
}

function forbidLocalFullCoverage(source, label) {
  if (source !== null && hasLocalFullCoverageConflict(source)) {
    errors.push(`Forbidden section/unit-local full-coverage release loop in ${label}`);
  }
}

function pathEscapes(base, candidate) {
  const fromBase = relative(base, candidate);
  return fromBase === '..' || fromBase.startsWith(`..${sep}`) || isAbsolute(fromBase);
}

function ipv4MappedAddress(host) {
  if (!host.startsWith('::ffff:')) return null;
  const suffix = host.slice('::ffff:'.length);
  if (isIP(suffix) === 4) return suffix;
  const match = suffix.match(/^([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (!match) return null;
  const high = Number.parseInt(match[1], 16);
  const low = Number.parseInt(match[2], 16);
  return [high >> 8, high & 255, low >> 8, low & 255].join('.');
}

function isPublicHostname(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.$/, '');
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) return false;
  const mappedIpv4 = ipv4MappedAddress(host);
  if (mappedIpv4 !== null) return isPublicHostname(mappedIpv4);
  const version = isIP(host);
  if (version === 0) return true;

  if (version === 4) {
    const [a, b] = host.split('.').map(Number);
    if ([0, 10, 127].includes(a) || a >= 224) return false;
    if (a === 100 && b >= 64 && b <= 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && [0, 168].includes(b)) return false;
    if (a === 198 && [18, 19, 51].includes(b)) return false;
    if (a === 203 && b === 0) return false;
    return true;
  }

  if (host === '::' || host === '::1') return false;
  if (/^(?:fc|fd|ff)/.test(host) || /^fe[89ab]/.test(host)) return false;
  return true;
}

function isSafePublicHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:'
      && !url.username
      && !url.password
      && isPublicHostname(url.hostname);
  } catch {
    return false;
  }
}

function canonicalLiveUrl(value) {
  const url = new URL(value);
  url.hash = '';
  return url.href;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && Boolean(value.trim());
}

function isStringArray(value, { allowEmpty = false } = {}) {
  return Array.isArray(value)
    && (allowEmpty || value.length > 0)
    && value.every((entry) => isNonEmptyString(entry));
}

function exactStudyHeadingSections(source, heading) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const target = `### ${heading}`;
  const sections = [];
  for (const [index, line] of lines.entries()) {
    if (line !== target) continue;
    let end = index + 1;
    while (end < lines.length && !/^#{1,3}\s/.test(lines[end])) end += 1;
    sections.push(lines.slice(index, end).join('\n'));
  }
  return sections;
}

const skillPath = join(root, 'SKILL.md');
const skill = readRequired(skillPath, 'SKILL.md');

if (skill !== null) {
  const lines = splitLines(skill);
  if (lines.length > 500) errors.push(`SKILL.md exceeds 500 lines (${lines.length})`);

  const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    errors.push('SKILL.md frontmatter must begin at byte zero and be closed with ---');
  } else {
    const name = frontmatter[1].match(/^name:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*["']?([^\r\n]+?)["']?\s*$/m)?.[1]?.trim();
    if (name !== 'awwwards-ui') errors.push('SKILL.md frontmatter must contain name: awwwards-ui');
    if (!description) errors.push('SKILL.md frontmatter must contain a non-empty description');
  }

  const v5Contract = [
    {
      label: 'code-first v5 approval gate',
      pattern: /Stage A[\s\S]{0,600}Recommend[\s\S]{0,500}explicit approval[\s\S]{0,250}\bSTOP\b/i,
    },
    {
      label: 'Stage B default Execute in Code contract',
      pattern: /Stage B[\s\S]{0,500}(?:default(?: mode)?(?: is|:)?\s*)[`"*]*Execute in Code/i,
    },
    {
      label: 'approved route, target, and exact code scope gate',
      pattern: /(?=[\s\S]*approved route)(?=[\s\S]*(?:exact repository|exact repo|authorized (?:new )?target))(?=[\s\S]*(?:exact|authorized)[\s\S]{0,180}pages?)(?=[\s\S]*(?:exact|authorized)[\s\S]{0,220}routes?)(?=[\s\S]*(?:exact|authorized)[\s\S]{0,260}components?)(?=[\s\S]*(?:exact|authorized)[\s\S]{0,300}files?)/i,
    },
    {
      label: 'authorized product surface with preflight-derived file inventory',
      pattern: /authorized product surface[\s\S]{0,700}(?:pages?|routes?|components?)[\s\S]{0,700}derive (?:the )?concrete file inventory[\s\S]{0,300}read-only (?:repository )?preflight/i,
    },
    {
      label: 'Figma URL is not a code prerequisite',
      pattern: /Figma (?:design )?URL (?:is|must be) not (?:a )?(?:prerequisite|required)[\s\S]{0,200}(?:Execute in Code|code execution|coding)/i,
    },
    {
      label: 'repository preflight contract',
      pattern: /(?:repository|repo) preflight(?=[\s\S]{0,1800}AGENTS\.md)(?=[\s\S]{0,1800}(?:package manager|lockfile))(?=[\s\S]{0,1800}framework)(?=[\s\S]{0,1800}design system)(?=[\s\S]{0,1800}dirty worktree)/i,
    },
    {
      label: 'user-change preservation and non-destructive contract',
      pattern: /preserve (?:the )?user.{0,2}s (?:existing )?changes[\s\S]{0,350}(?:do not|never)[\s\S]{0,150}(?:destructive commands|reset --hard|checkout --)/i,
    },
    {
      label: 'post-approval companion and generated-asset contract',
      pattern: /after (?:route )?approval(?=[\s\S]{0,2000}design-taste-frontend)(?=[\s\S]{0,2000}imagegen-frontend-web)(?=[\s\S]{0,2000}imagegen-frontend-mobile)(?=[\s\S]{0,2000}brandkit)/i,
    },
    {
      label: 'taste integration before routes and before implementation',
      pattern: /Taste integration\]\(references\/taste-integration\.md\)[\s\S]{0,250}before creating routes[\s\S]{0,250}again before Stage B/i,
    },
    {
      label: 'missing companion disclosure and bundled fallback contract',
      pattern: /(?:companion skill|imagegen-frontend-mobile|brandkit) is unavailable[\s\S]{0,250}disclose the gap[\s\S]{0,250}bundled fallback[\s\S]{0,250}(?:instead of|never) claim(?:ing)? it ran/i,
    },
    {
      label: 'GPT Image 2 or system image generation contract',
      pattern: /(?:GPT Image 2|system image generation|`imagegen`)[\s\S]{0,450}(?:product mockups?|background images?|visual elements?|icon family|illustration family)/i,
    },
    {
      label: 'mobile-first semantic/source-order and mobile-intent contract',
      pattern: /mobile[- ]first[\s\S]{0,500}(?:semantic|source order)[\s\S]{0,350}(?:priority|hierarchy)[\s\S]{0,350}(?:touch reachability|touch-safe|purpose-built mobile)/i,
    },
    {
      label: '390/1440 construction and Page-milestone six-width timing contract',
      pattern: /(?:Structure|construction)[\s\S]{0,500}\b390\b[\s\S]{0,120}\b1440\b[\s\S]{0,700}(?:Page milestones?|page milestones?)[\s\S]{0,250}(?:final delivery|final handoff)[\s\S]{0,300}\b320\b[\s\S]{0,100}\b390\b[\s\S]{0,100}\b768\b[\s\S]{0,100}\b1024\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bwide\b/i,
    },
    {
      label: 'rendered screenshot optical-balance loop',
      pattern: /(?=[\s\S]*(?:browser|Chrome))(?=[\s\S]*screenshot)(?=[\s\S]*optical balance)(?=[\s\S]*(?:iterate|iteration|repeat))(?=[\s\S]*(?:breakpoints?|viewports?))/i,
    },
    {
      label: 'semantic accessibility and input-equivalence implementation contract',
      pattern: /(?=[\s\S]*semantic HTML)(?=[\s\S]*accessibility)(?=[\s\S]*keyboard)(?=[\s\S]*touch)(?=[\s\S]*reduced[- ]motion)/i,
    },
    {
      label: 'performance and production command validation contract',
      pattern: /(?=[\s\S]*performance)(?=[\s\S]*\bbuild\b)(?=[\s\S]*typecheck)(?=[\s\S]*\blint\b)(?=[\s\S]*\btests?\b)/i,
    },
    {
      label: 'complete implementation without placeholders contract',
      pattern: /(?:no|never|do not leave)[\s\S]{0,120}(?:placeholders?|TODOs?)[\s\S]{0,250}(?:half[- ]finished|incomplete) (?:code|implementation)/i,
    },
    {
      label: 'complete first Stage B working-update contract',
      pattern: /First Stage B working update[\s\S]{0,600}approved thesis[\s\S]{0,600}companion availability[\s\S]{0,600}repository preflight[\s\S]{0,600}brand kit[\s\S]{0,600}GPT Image 2[\s\S]{0,600}mobile-first[\s\S]{0,600}semantic HTML[\s\S]{0,600}browser screenshot[\s\S]{0,600}build[\s\S]{0,600}completion/i,
    },
    {
      label: 'skill-root query-script execution contract',
      pattern: /Resolve the installed skill root[\s\S]{0,250}loaded `SKILL\.md`[\s\S]{0,250}(?:working directory|workdir)[\s\S]{0,250}skill root/i,
    },
    {
      label: 'Figma explicitly requested optional mode only',
      pattern: /Figma[\s\S]{0,180}optional[\s\S]{0,250}(?:only )?(?:when|if) (?:the user )?explicitly request/i,
    },
    {
      label: 'optional Figma official prerequisite contract',
      pattern: /Optional Figma Design[\s\S]{0,900}official `figma-use` prerequisite[\s\S]{0,350}before the corresponding tool call/i,
    },
    {
      label: 'Stage A response gate for exactly three named routes',
      pattern: /exactly three (?:expanded )?named routes/i,
    },
    {
      label: 'Stage A companion availability and fallback disclosure',
      pattern: /companion availability[\s\S]{0,250}(?:bundled )?fallback/i,
    },
    {
      label: 'Stage A mutation and implementation prohibition',
      pattern: /Stage A[\s\S]{0,1200}no image tool[\s\S]{0,300}(?:code|repository|filesystem) mutation[\s\S]{0,300}final brand invention[\s\S]{0,300}(?:implementation|application code)/i,
    },
    {
      label: 'Stage A explicit decision request and stop',
      pattern: /explicit (?:route )?decision request[\s\S]{0,100}\bSTOP\b/i,
    },
    {
      label: 'mandatory Stage A order',
      pattern: /Product truth[\s\S]{0,300}Roadmap[\s\S]{0,300}Companion availability[\s\S]{0,300}Three routes[\s\S]{0,300}Recommendation[\s\S]{0,300}Decision and STOP/i,
    },
    {
      label: 'per-route interaction completeness instead of table-only compression',
      pattern: /(?:comparison table|a table)[\s\S]{0,250}(?:cannot|never)[\s\S]{0,250}(?:replace|substitute)[\s\S]{0,300}(?:expanded route|route-specific)[\s\S]{0,600}Signature interaction[\s\S]{0,300}Touch[\s\S]{0,150}keyboard[\s\S]{0,150}reduced[- ]motion/i,
    },
    {
      label: 'standalone per-route input and reduced-motion field',
      pattern: /(?=[\s\S]*Touch, keyboard, and reduced-motion equivalents)(?=[\s\S]*(?:standalone (?:bold )?label|own labeled field))(?=[\s\S]*(?:not buried|do not bury))/i,
    },
    {
      label: 'visible inspiration board with linked evidence and non-blocking previews',
      pattern: /standalone \*\*Inspiration board\*\*[\s\S]{0,500}three to five[\s\S]{0,700}live website URL[\s\S]{0,500}(?:discovery-source|Awwwards|Mobbin|source) URL[\s\S]{0,700}principle borrowed[\s\S]{0,500}where it applies[\s\S]{0,500}non-copy boundary[\s\S]{0,1200}one to three[\s\S]{0,500}(?:without blocking|never blocks|must not block)[\s\S]{0,500}(?:unavailable|disclose)/i,
    },
    {
      label: 'balanced outer-frame geometry with numerical gutter tolerance',
      pattern: /balanced frame with an expressive interior[\s\S]{0,500}center[\s\S]{0,500}(?:left\/right|left and right) outer gutters[\s\S]{0,300}4px[\s\S]{0,150}1%[\s\S]{0,250}whichever is larger[\s\S]{0,500}(?:intentional|documented) full bleed/i,
    },
    {
      label: 'progressive validation passes, batching, and correction limits',
      pattern: /structure[\s\S]{0,150}design batch[\s\S]{0,150}page milestone[\s\S]{0,700}two to four[\s\S]{0,500}at most two[\s\S]{0,300}correction passes[\s\S]{0,500}third targeted pass/i,
    },
    {
      label: 'bounded Page-level post-cap recovery contract',
      pattern: /section-local[\s\S]{0,500}(?:two-pass|two pass|at most two)[\s\S]{0,600}(?:log|record)[\s\S]{0,250}(?:unresolved defect|unresolved issue)[\s\S]{0,400}Page-level[\s\S]{0,300}one targeted[\s\S]{0,300}correction cycle[\s\S]{0,300}(?:does not restart|never restarts)[\s\S]{0,500}hard-gate failure[\s\S]{0,300}(?:state the blocker|request a material user decision)/i,
    },
    {
      label: 'ordinary hero fast path with next-section validation and deferred full QA',
      pattern: /ordinary hero[\s\S]{0,500}\b390px\b[\s\S]{0,150}\b1440px\b[\s\S]{0,500}approved (?:hero )?asset[\s\S]{0,400}one interaction[\s\S]{0,400}next section[\s\S]{0,500}defer[\s\S]{0,300}full breakpoint[\s\S]{0,300}page milestone/i,
    },
    {
      label: 'ordinary-hero exact Section geometry audit output contract',
      pattern: /ordinary-hero plan[\s\S]{0,800}Section geometry audit[\s\S]{0,350}\|\s*Viewport\s*\|\s*Container\s*\|\s*Left gutter\s*\|\s*Right gutter\s*\|\s*Gutter delta\s*\|\s*Column ratio\s*\|\s*Primary anchor\s*\|\s*Counterweight\s*\|\s*Exception\s*\|[\s\S]{0,900}planned targets[\s\S]{0,500}\b390\b[\s\S]{0,150}\b1440\b[\s\S]{0,700}measured values[\s\S]{0,300}PASS\/FAIL/i,
    },
    {
      label: 'ordinary neighboring-section Focused Code actionable planning fast path',
      pattern: /Approved planning[\s\S]{0,160}ordinary neighboring-section batch[\s\S]{0,160}Focused Code[\s\S]{0,260}actionable plan[\s\S]{0,220}missing write gate[\s\S]{0,300}two-to-four-section Design batch[\s\S]{0,220}semantic source order[\s\S]{0,300}\b390\/1440\b[\s\S]{0,120}\bonly\b[\s\S]{0,300}centered shared frame[\s\S]{0,220}max\(4px,\s*viewport\s*(?:×|x)\s*0\.01\)[\s\S]{0,360}at most two section-local corrections[\s\S]{0,180}no third pass[\s\S]{0,420}log the defect[\s\S]{0,220}one bounded Page-level[\s\S]{0,300}does not restart the local loop[\s\S]{0,320}(?:hard gate|hard-gate)[\s\S]{0,220}(?:state the blocker|request a material user decision)[\s\S]{0,320}Complete six-width[\s\S]{0,300}Page milestone\/final/i,
    },
  ];
  for (const requirement of v5Contract) {
    if (!requirement.pattern.test(skill)) errors.push(`Missing ${requirement.label} in SKILL.md`);
  }

  const inlineCodeLinks = [...skill.matchAll(/`((?:references|data|scripts)\/[^`\s]+)`/g)]
    .map((match) => match[1]);
  const markdownLinks = [...skill.matchAll(/\]\(((?:references|data|scripts)\/[^)#\s]+)(?:#[^)]*)?\)/g)]
    .map((match) => match[1]);
  const linked = [...new Set([...inlineCodeLinks, ...markdownLinks])];

  for (const relativePath of linked) {
    if (relativePath.startsWith('references/') && relativePath.slice('references/'.length).includes('/')) {
      errors.push(`Reference links must remain one level deep: ${relativePath}`);
    }
    const resourcePath = resolve(root, ...relativePath.split('/'));
    if (pathEscapes(root, resourcePath)) {
      errors.push(`Linked resource path escapes the skill directory: ${relativePath}`);
      continue;
    }
    if (!existsSync(resourcePath) || !statSync(resourcePath).isFile()) {
      errors.push(`Linked resource is missing or not a file: ${relativePath}`);
      continue;
    }
    if (lstatSync(resourcePath).isSymbolicLink() || pathEscapes(realpathSync(root), realpathSync(resourcePath))) {
      errors.push(`Linked resource uses a symbolic path that escapes the skill directory: ${relativePath}`);
    }
  }
}

const referenceContracts = [
  {
    file: 'roadmap-and-approval.md',
    requirements: [
      {
        label: 'Observation ledger schema',
        pattern: /Observation ledger[\s\S]{0,500}website[\s\S]{0,120}live URL[\s\S]{0,160}(?:discovery\/source URL|discovery-source URL)[\s\S]{0,180}observation basis[\s\S]{0,240}(?:directly observed principle|observed principle)[\s\S]{0,160}limitation/i,
      },
      {
        label: 'Inspiration board Observed via ledger linkage',
        pattern: /Inspiration board[\s\S]{0,1200}`?Observed via`?[\s\S]{0,2000}Observation ledger/i,
      },
      {
        label: 'direct live or detailed dated-study observation basis',
        pattern: /Before writing each `Borrow`[\s\S]{0,180}quick[\s\S]{0,100}non-blocking observation[\s\S]{0,180}live URL[\s\S]{0,200}dated existing source study/i,
      },
      {
        label: 'verifiable observation basis',
        pattern: /Observation ledger[\s\S]{0,600}observation basis[\s\S]{0,260}`live opened`[\s\S]{0,260}exact source-study heading[\s\S]{0,200}`observed_at`/i,
      },
      {
        label: 'bare self-attestation rejection',
        pattern: /(?:bare|mere)[\s\S]{0,100}(?:I observed it|self-attestation)[\s\S]{0,140}not evidence/i,
      },
      {
        label: 'substitution or discovery-only fallback with no Borrow and no count',
        pattern: /observation cannot be established[\s\S]{0,220}substitute[\s\S]{0,300}discovery metadata[\s\S]{0,260}(?:honest )?limitation[\s\S]{0,220}omit[\s\S]{0,80}`Borrow`[\s\S]{0,260}(?:do not|does not)[\s\S]{0,120}count[\s\S]{0,180}three-to-five observed references/i,
      },
    ],
  },
  {
    file: 'taste-recommender.md',
    requirements: [
      {
        label: 'quick non-blocking live or dated-source-study observation before Borrow',
        pattern: /before writing each `Borrow`[\s\S]{0,220}quick[^.\n]{0,80}non-blocking observation[\s\S]{0,260}(?:live URL|live website)[\s\S]{0,220}(?:dated existing source study|dated source study)/i,
      },
      {
        label: 'Observation ledger fields',
        pattern: /Observation ledger[\s\S]{0,500}Website[\s\S]{0,120}Live URL[\s\S]{0,160}(?:Discovery\/source URL|discovery-source URL)[\s\S]{0,160}Observation basis[\s\S]{0,160}Directly observed principle[\s\S]{0,160}Limitation/i,
      },
      {
        label: 'verifiable observation basis and anti-self-attestation rule',
        pattern: /Observation basis[\s\S]{0,260}`live opened`[\s\S]{0,260}(?:exact source-study heading|source-study heading)[\s\S]{0,180}`observed_at`[\s\S]{0,300}(?:bare|mere)[\s\S]{0,80}(?:I observed it|self-attestation)[\s\S]{0,120}not evidence/i,
      },
      {
        label: 'substitution or honest limitation without unsupported Borrow',
        pattern: /(?:cannot|can not|cannot be) (?:be )?observed|observation cannot be established[\s\S]{0,300}substitut[\s\S]{0,420}(?:honest )?(?:observation )?limitation[\s\S]{0,300}omit[\s\S]{0,80}`Borrow`[\s\S]{0,300}(?:do not|does not)[\s\S]{0,160}three-to-five observed references/i,
      },
      {
        label: 'Inspiration board Observed via ledger linkage',
        pattern: /Inspiration board[\s\S]{0,500}`Observed via`[\s\S]{0,220}(?:ledger|Observation ledger)/i,
      },
      {
        label: 'counted reference live and discovery/source links',
        pattern: /(?:counted|observed) reference[\s\S]{0,300}live (?:website )?(?:URL|link)[\s\S]{0,300}(?:discovery\/source|discovery-source|source) (?:URL|link)/i,
      },
      {
        label: 'optional non-blocking screenshot-preview fallback',
        pattern: /screenshot previews?[\s\S]{0,160}optional[\s\S]{0,160}non-blocking[\s\S]{0,300}(?:fallback|complete clickable list|previews? (?:are )?unavailable)/i,
      },
    ],
  },
  {
    file: 'figma-execution.md',
    requirements: [
      {
        label: 'targeted per-unit metadata validation',
        pattern: /After each targeted unit[\s\S]{0,120}(?:use|inspect)[\s\S]{0,80}metadata[\s\S]{0,180}hierarchy[\s\S]{0,180}(?:bindings|component relationships)[\s\S]{0,180}sizing[\s\S]{0,180}expected nodes/i,
      },
      {
        label: 'screenshot review in two-to-four-unit batches',
        pattern: /Review screenshots[\s\S]{0,180}(?:two-to-four|two to four)[- ]related[- ]unit batches/i,
      },
      {
        label: 'screenshot review at 390 and 1440',
        pattern: /Review screenshots[\s\S]{0,300}\b390(?:\s*px)?\b[\s\S]{0,100}\b1440(?:\s*px)?\b/i,
      },
      {
        label: 'complete review reserved for milestones and handoff',
        pattern: /reserve[\s\S]{0,100}complete[\s\S]{0,420}(?:review|QA)[\s\S]{0,180}(?:page\/device )?milestones[\s\S]{0,140}handoff/i,
      },
      {
        label: 'no per-unit all-width perfection loop',
        pattern: /do not require[\s\S]{0,140}every unit[\s\S]{0,140}perfect[\s\S]{0,120}all widths[\s\S]{0,120}before continuing/i,
      },
    ],
  },
  {
    file: 'balance-system.md',
    requirements: [
      {
        label: 'exact nine-field geometry schema',
        pattern: /^\|\s*Viewport\s*\|\s*Container\s*\|\s*Left gutter\s*\|\s*Right gutter\s*\|\s*Gutter delta\s*\|\s*Column ratio\s*\|\s*Primary anchor\s*\|\s*Counterweight\s*\|\s*Exception\s*\|\s*$/m,
      },
      {
        label: 'numerical gutter tolerance formula',
        pattern: /max\(4px,\s*viewport\s*(?:×|x)\s*0\.01\)/i,
      },
      {
        label: '390/1440 construction and six-width milestone/final geometry timing',
        pattern: /(?:audit|review)[\s\S]{0,100}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,180}construction[\s\S]{0,300}(?:Page milestones?|page milestones?)[\s\S]{0,180}final delivery[\s\S]{0,220}\b320\b[\s\S]{0,100}\b390\b[\s\S]{0,100}\b768\b[\s\S]{0,100}\b1024\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bwide\b/i,
      },
    ],
  },
  {
    file: 'rendered-validation.md',
    requirements: [
      {
        label: 'Structure review at 390/1440 only',
        pattern: /Structure pass[\s\S]{0,220}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,100}\bonly\b/i,
      },
      {
        label: 'two-to-four-section Design batch review at 390/1440',
        pattern: /two-to-four-section Design batch[\s\S]{0,220}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bonly\b/i,
      },
      {
        label: 'complete six-width Page-milestone/final QA',
        pattern: /(?:Page milestones?|page milestones?)[\s\S]{0,180}final delivery[\s\S]{0,220}(?:complete|Complete)[\s\S]{0,100}\b320\b[\s\S]{0,100}\b390\b[\s\S]{0,100}\b768\b[\s\S]{0,100}\b1024\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bwide\b[\s\S]{0,400}accessibility[\s\S]{0,180}input[\s\S]{0,180}performance/i,
      },
      {
        label: 'section-local two-pass cap and targeted third-pass exception',
        pattern: /two-pass cap[\s\S]{0,180}section-local visual polishing[\s\S]{0,300}(?:asset-dependent|asset\/signature)[\s\S]{0,180}one third targeted section-local pass/i,
      },
      {
        label: 'unresolved defect logged for Page-level balance',
        pattern: /After the local cap[\s\S]{0,160}(?:log|record)[\s\S]{0,120}unresolved defect[\s\S]{0,180}Page-level balance/i,
      },
      {
        label: 'one bounded Page-level recovery cycle without local-loop restart',
        pattern: /Page-level pass[\s\S]{0,180}one targeted[\s\S]{0,180}(?:cross-section|breakpoint)[\s\S]{0,180}correction cycle[\s\S]{0,220}(?:does not restart|never restarts)[\s\S]{0,120}section-local loop/i,
      },
      {
        label: 'persistent hard-gate blocker or material-decision exit',
        pattern: /same hard-gate failure[\s\S]{0,220}after[\s\S]{0,160}Page-level correction[\s\S]{0,220}(?:state the blocker|request a material user decision)[\s\S]{0,180}(?:Never silently loop|never loop silently)/i,
      },
    ],
  },
  {
    file: 'workflow-integration.md',
    requirements: [
      {
        label: 'progressive three-pass sequence',
        pattern: /progressive three-pass sequence[\s\S]{0,180}Structure[\s\S]{0,120}Design batch[\s\S]{0,120}Page milestone/i,
      },
      {
        label: 'targeted interim 390/1440 checks',
        pattern: /targeted interim checks[\s\S]{0,180}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,240}Structure[\s\S]{0,220}Design batch/i,
      },
      {
        label: 'milestone/final complete checks without section-local six-width loop',
        pattern: /complete six-width[\s\S]{0,300}Page milestones[\s\S]{0,160}final delivery[\s\S]{0,220}(?:never|not)[\s\S]{0,160}section-local/i,
      },
    ],
  },
  {
    file: 'code-execution.md',
    requirements: [
      {
        label: 'progressive three-pass sequence',
        pattern: /progressive three-pass sequence[\s\S]{0,180}Structure[\s\S]{0,120}Design batch[\s\S]{0,120}Page milestone/i,
      },
      {
        label: 'targeted 390/1440 Structure and Design-batch construction checks',
        pattern: /Structure[\s\S]{0,220}Design-batch construction[\s\S]{0,220}targeted checks[\s\S]{0,160}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,100}\bonly\b/i,
      },
      {
        label: 'complete milestone/final six-width QA without section-local release loop',
        pattern: /Complete[\s\S]{0,100}\b320\b[\s\S]{0,100}\b390\b[\s\S]{0,100}\b768\b[\s\S]{0,100}\b1024\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bwide\b[\s\S]{0,400}Page milestones[\s\S]{0,180}final delivery[\s\S]{0,260}(?:never|not)[\s\S]{0,160}section-local/i,
      },
    ],
  },
  {
    file: 'quality-gates.md',
    requirements: [
      {
        label: 'hard centered-container gutter-delta gate',
        pattern: /centered-container hard gate[\s\S]{0,180}max\(4px,\s*viewport\s*(?:×|x)\s*0\.01\)[\s\S]{0,180}(?:gutter delta|left\/right)/i,
      },
      {
        label: 'complete milestone/final six-width QA',
        pattern: /Complete[\s\S]{0,300}\b320\b[\s\S]{0,100}\b390\b[\s\S]{0,100}\b768\b[\s\S]{0,100}\b1024\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bwide\b[\s\S]{0,240}Page milestones[\s\S]{0,160}final delivery/i,
      },
    ],
  },
  {
    file: 'visual-assets.md',
    requirements: [
      {
        label: 'single source/full-resolution master inspection',
        pattern: /asset master[\s\S]{0,160}(?:once|one time)[\s\S]{0,160}(?:source|full) resolution/i,
      },
      {
        label: '390/1440 current-batch construction crop checks',
        pattern: /construction[\s\S]{0,180}(?:current-batch|current batch)[\s\S]{0,180}crop[\s\S]{0,160}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,100}\bonly\b/i,
      },
      {
        label: 'six-width crop QA only at milestone/final',
        pattern: /six-width crop QA[\s\S]{0,220}Page milestones[\s\S]{0,180}final delivery[\s\S]{0,220}(?:not|never)[\s\S]{0,180}(?:per asset|per section)/i,
      },
    ],
  },
  {
    file: 'mobile-app-web.md',
    requirements: [
      {
        label: 'semantic/source-order mobile-first intent',
        pattern: /Mobile-first means[\s\S]{0,220}semantic source order[\s\S]{0,180}(?:action )?priority[\s\S]{0,180}app-like hierarchy[\s\S]{0,180}touch reachability[\s\S]{0,180}purpose-built mobile composition/i,
      },
      {
        label: '390/1440 Structure and current-batch construction timing',
        pattern: /Structure[\s\S]{0,180}(?:current-batch|current batch)[\s\S]{0,180}construction[\s\S]{0,160}\b390\b[\s\S]{0,100}\b1440\b[\s\S]{0,100}\bonly\b/i,
      },
      {
        label: '320 milestone/final stress-test timing',
        pattern: /\b320\b[\s\S]{0,160}stress-test viewport[\s\S]{0,180}Page milestones[\s\S]{0,160}final delivery[\s\S]{0,220}(?:not|never)[\s\S]{0,120}section-local construction/i,
      },
      {
        label: 'complete milestone/final six-width QA',
        pattern: /Complete[\s\S]{0,100}\b320\b[\s\S]{0,100}\b390\b[\s\S]{0,100}\b768\b[\s\S]{0,100}\b1024\b[\s\S]{0,100}\b1440\b[\s\S]{0,120}\bwide\b[\s\S]{0,320}Page milestones[\s\S]{0,160}final delivery/i,
      },
    ],
  },
];

for (const contract of referenceContracts) {
  const label = `references/${contract.file}`;
  const source = readRequired(join(root, 'references', contract.file), label);
  requirePatterns(source, label, contract.requirements);
  forbidLocalFullCoverage(source, label);
  if (contract.file === 'rendered-validation.md') {
    forbidPatterns(source, label, [{
      label: 'Page-level recovery limited by the consumed section-local cap',
      pattern: /Page-level[^\r\n]{0,220}(?:remaining|already-consumed|whatever remains)[^\r\n]{0,180}section-local[^\r\n]{0,120}(?:cap|budget)/i,
    }]);
  }
}

const v6ReferenceContracts = [
  {
    file: 'roadmap-and-approval.md',
    requirements: [
      {
        label: 'universal Design Read and three-to-five route invariants',
        pattern: /Every route[\s\S]{0,180}standalone Focused Code[\s\S]{0,220}Design Read[\s\S]{0,220}three to five[\s\S]{0,120}route invariants/i,
      },
      {
        label: 'Transformation Map schema',
        pattern: /For every redesign route[\s\S]{0,180}Transformation Map[\s\S]{0,300}Current pattern[\s\S]{0,120}Retire or preserve[\s\S]{0,120}Replacement[\s\S]{0,120}Reference evidence[\s\S]{0,120}Mobile translation[\s\S]{0,120}Acceptance signal/i,
      },
      {
        label: 'Overhaul transformation floor',
        pattern: /Overhaul[\s\S]{0,260}at least six[\s\S]{0,240}(?:page and section )?composition[\s\S]{0,200}mobile recomposition/i,
      },
    ],
  },
  {
    file: 'code-execution.md',
    requirements: [
      {
        label: 'universal Route Realization Ledger and verification',
        pattern: /(?=[\s\S]*Design Read[\s\S]{0,220}three to five route invariants)(?=[\s\S]*Route Realization Ledger)(?=[\s\S]*(?:Every approved route ledger|Every approved route and build)[\s\S]{0,260}standalone Focused Code[\s\S]{0,360}(?:approved route invariant|route invariants))(?=[\s\S]*(?:rendered verification|linked rendered acceptance evidence))/i,
      },
      {
        label: 'redesign-only conditional workflow',
        pattern: /(?:For an existing-site redesign|For redesigns only)[\s\S]{0,220}(?:redesign mode|Preserve\/Recompose\/Overhaul mode)[\s\S]{0,180}(?:current-pattern )?Transformation Map[\s\S]{0,180}seven-dimension tally[\s\S]{0,320}(?:non-redesign build|Non-redesign builds)[\s\S]{0,240}(?:inapplicable|must not invent|do not invent)/i,
      },
      {
        label: 'verified-only pass state',
        pattern: /(?:Only `verified` passes|`verified` is the only passing state)[\s\S]{0,260}`planned`[\s\S]{0,100}`implemented`[\s\S]{0,100}`blocked`[\s\S]{0,220}(?:keep|remain)[\s\S]{0,80}(?:completion )?open[\s\S]{0,260}`waived`[\s\S]{0,180}(?:genuinely )?inapplicable[\s\S]{0,260}(?:does not pass|does not count as passed)/i,
      },
      {
        label: 'Overhaul mandatory dimensions and six-verified floor',
        pattern: /Overhaul[\s\S]{0,220}(?:may never|never|cannot) waive[\s\S]{0,180}(?:page and section composition|composition)[\s\S]{0,160}mobile recomposition[\s\S]{0,220}(?:at least six|requires at least six)[\s\S]{0,120}`verified`/i,
      },
    ],
  },
  {
    file: 'taste-recommender.md',
    requirements: [
      {
        label: 'relevance-gated deep user-curated fallback',
        pattern: /relevant deep\/user-curated evidence exists[\s\S]{0,220}at least one[\s\S]{0,260}If none is relevant[\s\S]{0,300}substitute another observable relevant source[\s\S]{0,260}disclose[\s\S]{0,260}do not force an unrelated/i,
      },
      {
        label: 'relevance-gated Mobbin fallback',
        pattern: /(?:same relevance gate to Mobbin|mobile-heavy work[\s\S]{0,120}relevant Mobbin)[\s\S]{0,260}If none is relevant[\s\S]{0,300}substitute another observable relevant mobile source[\s\S]{0,260}disclose[\s\S]{0,280}(?:do not insert weak Mobbin evidence|do not force weak Mobbin evidence)/i,
      },
    ],
  },
];

for (const contract of v6ReferenceContracts) {
  const label = `references/${contract.file}`;
  const source = readRequired(join(root, 'references', contract.file), label);
  requirePatterns(source, label, contract.requirements);
}

const agentYaml = readRequired(join(root, 'agents', 'openai.yaml'), 'agents/openai.yaml');
if (agentYaml !== null) {
  if (!/^interface:\s*$/m.test(agentYaml)) errors.push('agents/openai.yaml must contain an interface mapping');
  if (!/^\s{2}display_name:\s*"[^"]+"\s*$/m.test(agentYaml)) {
    errors.push('agents/openai.yaml must contain a quoted interface.display_name');
  }
  const shortDescription = agentYaml.match(/^\s{2}short_description:\s*"([^"]+)"\s*$/m)?.[1];
  if (!shortDescription || shortDescription.length < 25 || shortDescription.length > 64) {
    errors.push('agents/openai.yaml must contain a quoted 25-64 character interface.short_description');
  }
  const defaultPrompt = agentYaml.match(/^\s{2}default_prompt:\s*"([^"]+)"\s*$/m)?.[1];
  if (!defaultPrompt || !defaultPrompt.includes('$awwwards-ui')) {
    errors.push('agents/openai.yaml must contain a quoted default_prompt that mentions $awwwards-ui');
  } else {
    if (!/approval/i.test(defaultPrompt)) errors.push('agents/openai.yaml default_prompt must preserve approval gating');
    if (!/(?:implement|build|code)/i.test(defaultPrompt)) {
      errors.push('agents/openai.yaml default_prompt must promise implementation in code');
    }
    if (!/codebase|repository/i.test(defaultPrompt)) {
      errors.push('agents/openai.yaml default_prompt must mention the codebase or repository');
    }
  }
}

const catalogPath = join(root, 'data', 'inspiration-index.jsonl');
const catalogText = readRequired(catalogPath, 'data/inspiration-index.jsonl');
const catalogRows = [];

if (catalogText !== null) {
  for (const [index, line] of catalogText.split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    const lineNumber = index + 1;
    try {
      const row = JSON.parse(line);
      catalogRows.push(row);
      if (!row || typeof row !== 'object' || Array.isArray(row)) {
        errors.push(`Catalog line ${lineNumber} must be an object`);
        continue;
      }

      for (const key of ['id', 'name', 'live_url', 'awwwards_url', 'source_url', 'depth', 'observed_at']) {
        if (typeof row[key] !== 'string' || !row[key].trim()) {
          errors.push(`Catalog line ${lineNumber} ${key} must be a non-empty string`);
        }
      }
      if (typeof row.id === 'string' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.id)) {
        errors.push(`Catalog line ${lineNumber} id must be a lowercase stable slug`);
      }
      if (row.award !== null && (typeof row.award !== 'string' || !row.award.trim())) {
        errors.push(`Catalog line ${lineNumber} award must be null or a non-empty string`);
      }
      if (!Array.isArray(row.tags) || row.tags.length === 0 || row.tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
        errors.push(`Catalog line ${lineNumber} tags must be a non-empty array of non-empty strings`);
      }
      if (!['index', 'deep'].includes(row.depth)) {
        errors.push(`Catalog line ${lineNumber} depth must be index or deep`);
      }
      if (typeof row.observed_at !== 'string' || !isDateOnly(row.observed_at)) {
        errors.push(`Catalog line ${lineNumber} observed_at must be a valid YYYY-MM-DD date`);
      }

      try {
        const detail = new URL(row.awwwards_url);
        if (detail.protocol !== 'https:' || detail.hostname !== 'www.awwwards.com' || !detail.pathname.startsWith('/sites/')) {
          errors.push(`Catalog line ${lineNumber} has a non-detail Awwwards URL: ${row.awwwards_url}`);
        }
        const source = new URL(row.source_url);
        if (source.protocol !== 'https:' || source.hostname !== 'www.awwwards.com' || !source.pathname.startsWith('/websites/')) {
          errors.push(`Catalog line ${lineNumber} has a non-Awwwards listing source URL: ${row.source_url}`);
        }
      } catch {
        errors.push(`Catalog line ${lineNumber} contains an invalid Awwwards URL`);
      }

      try {
        const live = new URL(row.live_url);
        const isAwwwards = live.hostname === 'awwwards.com' || live.hostname.endsWith('.awwwards.com');
        if (live.protocol !== 'https:' || isAwwwards || live.username || live.password || !isPublicHostname(live.hostname)) {
          errors.push(`Catalog line ${lineNumber} must have a safe public HTTPS external live_url: ${row.live_url}`);
        }
      } catch {
        errors.push(`Catalog line ${lineNumber} has an invalid live_url: ${row.live_url}`);
      }
    } catch (error) {
      errors.push(`Catalog line ${lineNumber} is invalid JSON: ${error.message}`);
    }
  }

  if (catalogRows.length < 100 || catalogRows.length > 1000) {
    errors.push(`Inspiration catalog must contain 100 to 1000 rows; found ${catalogRows.length}`);
  }
  if (catalogRows.length !== 341) {
    errors.push(`Pinned v6 inspiration catalog must contain exactly 341 rows; found ${catalogRows.length}`);
  }

  const seenIds = new Set();
  const seenDetails = new Set();
  for (const row of catalogRows) {
    if (typeof row?.id === 'string') {
      if (seenIds.has(row.id)) errors.push(`Duplicate catalog id: ${row.id}`);
      seenIds.add(row.id);
    }
    if (typeof row?.awwwards_url === 'string') {
      try {
        const key = canonicalDetailUrl(row.awwwards_url);
        if (seenDetails.has(key)) errors.push(`Duplicate Awwwards URL: ${row.awwwards_url}`);
        seenDetails.add(key);
      } catch {
        // Invalid URLs are reported in the row-level check.
      }
    }
  }
}

const curatedPath = join(root, 'data', 'curated-precedents.jsonl');
const curatedText = readRequired(curatedPath, 'data/curated-precedents.jsonl');
const curatedRows = [];
const curatedUrls = new Set();
const curatedSourceFamilies = new Set(['awwwards', 'mobbin', 'direct', 'video']);

if (curatedText !== null) {
  for (const [index, line] of curatedText.split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    const lineNumber = index + 1;
    const label = `data/curated-precedents.jsonl line ${lineNumber}`;
    let row;
    try {
      row = JSON.parse(line);
    } catch (error) {
      errors.push(`${label} is invalid JSON: ${error.message}`);
      continue;
    }
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      errors.push(`${label} must be an object`);
      continue;
    }
    curatedRows.push({ row, lineNumber });

    for (const field of ['id', 'name', 'discovery_url', 'source_family', 'source_type', 'depth', 'observed_at', 'study_heading']) {
      if (!isNonEmptyString(row[field])) {
        errors.push(`${label} ${field} must be a non-empty string`);
      }
    }
    if (isNonEmptyString(row.id) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.id)) {
      errors.push(`${label} id must be a lowercase stable slug`);
    }
    if (!curatedSourceFamilies.has(row.source_family)) {
      errors.push(`${label} source_family must be one of: awwwards, mobbin, direct, video`);
    }
    if (row.depth !== 'deep') {
      errors.push(`${label} depth must be deep`);
    }
    if (!isNonEmptyString(row.observed_at) || !isDateOnly(row.observed_at)) {
      errors.push(`${label} observed_at must be a valid YYYY-MM-DD date`);
    }

    if (!isStringArray(row.source_urls, { allowEmpty: true })) {
      errors.push(`${label} source_urls must be an array of non-empty strings`);
    }
    for (const field of ['categories', 'devices', 'patterns', 'principles', 'limitations']) {
      if (!isStringArray(row[field])) {
        errors.push(`${label} ${field} must be a non-empty array of non-empty strings`);
      }
    }

    const nullLiveAllowed = row.source_type === 'directory-study'
      || (row.source_family === 'video' && row.source_type === 'trend-synthesis');
    if (row.live_url === null) {
      if (!nullLiveAllowed) {
        errors.push(`${label} live_url may be null only for directory or video overview rows`);
      }
    } else if (!isNonEmptyString(row.live_url)) {
      errors.push(`${label} live_url must be a non-empty string or an allowed null`);
    }

    const urlFields = [
      ['live_url', row.live_url],
      ['discovery_url', row.discovery_url],
      ...(Array.isArray(row.source_urls)
        ? row.source_urls.map((url, sourceIndex) => [`source_urls[${sourceIndex}]`, url])
        : []),
    ];
    for (const [field, value] of urlFields) {
      if (value === null) continue;
      if (!isNonEmptyString(value) || !isSafePublicHttpsUrl(value)) {
        errors.push(`${label} ${field} must be a safe public HTTPS URL`);
        continue;
      }
      curatedUrls.add(exactUrl(value));
    }
  }

  const seenIds = new Set();
  const seenLiveUrls = new Set();
  for (const { row, lineNumber } of curatedRows) {
    if (isNonEmptyString(row.id)) {
      if (seenIds.has(row.id)) {
        errors.push(`Duplicate curated id at data/curated-precedents.jsonl line ${lineNumber}: ${row.id}`);
      }
      seenIds.add(row.id);
    }
    if (isNonEmptyString(row.live_url) && isSafePublicHttpsUrl(row.live_url)) {
      const key = canonicalLiveUrl(row.live_url);
      if (seenLiveUrls.has(key)) {
        errors.push(`Duplicate curated live_url at data/curated-precedents.jsonl line ${lineNumber}: ${row.live_url}`);
      }
      seenLiveUrls.add(key);
    }
  }
}

const tastePinPath = join(root, 'data', 'taste-pin.json');
const pin = parseJsonObject(tastePinPath, 'data/taste-pin.json');
if (pin !== null) {
    if (!isNonEmptyString(pin.repository) || !isSafePublicHttpsUrl(pin.repository)) {
      errors.push('data/taste-pin.json repository must be a safe public HTTPS URL');
    }
    if (!isNonEmptyString(pin.commit) || !/^[0-9a-f]{40}$/.test(pin.commit)) {
      errors.push('data/taste-pin.json commit must be a lowercase 40-character SHA');
    }
    if (!isNonEmptyString(pin.retrieved_at) || !isDateOnly(pin.retrieved_at)) {
      errors.push('data/taste-pin.json retrieved_at must be a valid YYYY-MM-DD date');
    }
    if (!isNonEmptyString(pin.license) || !isSafePublicHttpsUrl(pin.license)) {
      errors.push('data/taste-pin.json license must be a safe public HTTPS URL');
    }
    if (!Array.isArray(pin.skills) || pin.skills.length === 0) {
      errors.push('data/taste-pin.json skills must be a non-empty array');
    } else {
      for (const [skillIndex, pinnedSkill] of pin.skills.entries()) {
        const skillLabel = `data/taste-pin.json skills[${skillIndex}]`;
        if (!pinnedSkill || typeof pinnedSkill !== 'object' || Array.isArray(pinnedSkill)) {
          errors.push(`${skillLabel} must be an object`);
          continue;
        }
        for (const field of ['directory', 'name']) {
          if (!isNonEmptyString(pinnedSkill[field])) {
            errors.push(`${skillLabel}.${field} must be a non-empty string`);
          }
        }
        if (!Array.isArray(pinnedSkill.files) || pinnedSkill.files.length === 0) {
          errors.push(`${skillLabel}.files must be a non-empty array`);
          continue;
        }
        for (const [fileIndex, file] of pinnedSkill.files.entries()) {
          const fileLabel = `${skillLabel}.files[${fileIndex}]`;
          if (!file || typeof file !== 'object' || Array.isArray(file)) {
            errors.push(`${fileLabel} must be an object`);
            continue;
          }
          if (!isNonEmptyString(file.path)) {
            errors.push(`${fileLabel}.path must be a non-empty string`);
          }
          if (!isNonEmptyString(file.sha256) || !/^[0-9a-f]{64}$/.test(file.sha256)) {
            errors.push(`${fileLabel}.sha256 must be a lowercase 64-character SHA-256`);
          }
        }
      }
    }
}

const manifest = parseJson(join(root, 'data', 'required-sources.json'), 'data/required-sources.json');
const sourceStudies = readRequired(join(root, 'references', 'source-studies.md'), 'references/source-studies.md');
const sourceStudyUrls = extractHttpUrls(sourceStudies ?? '');
if (sourceStudies !== null) {
  for (const { row, lineNumber } of curatedRows) {
    if (!isNonEmptyString(row.study_heading)) continue;
    const label = `data/curated-precedents.jsonl line ${lineNumber} id ${isNonEmptyString(row.id) ? row.id : '<invalid-id>'} study_heading "${row.study_heading}"`;
    const sections = exactStudyHeadingSections(sourceStudies, row.study_heading);
    if (sections.length !== 1) {
      errors.push(`${label} must have the exact heading "### ${row.study_heading}" exactly once in references/source-studies.md; found ${sections.length}`);
      continue;
    }
    const associatedUrls = [
      row.live_url,
      row.discovery_url,
      ...(Array.isArray(row.source_urls) ? row.source_urls : []),
    ].filter((value) => isNonEmptyString(value) && isSafePublicHttpsUrl(value));
    const sectionUrls = extractHttpUrls(sections[0]);
    if (!associatedUrls.some((value) => sectionUrls.has(exactUrl(value)))) {
      errors.push(`${label} section must contain at least one associated URL from live_url, discovery_url, or source_urls`);
    }
  }
}
if (Array.isArray(manifest)) {
  if (manifest.length === 0) errors.push('data/required-sources.json must not be an empty array');
  const seenSources = new Set();
  for (const source of manifest) {
    if (!source || typeof source.label !== 'string' || !source.label.trim() || typeof source.url !== 'string' || !source.url.trim()) {
      errors.push('Every required source must contain non-empty string label and url values');
      continue;
    }
    let normalized;
    try {
      const url = new URL(source.url);
      if (url.protocol !== 'https:' || url.username || url.password || !isPublicHostname(url.hostname)) {
        errors.push(`Required source must have a safe public HTTPS URL: ${source.url}`);
      }
      normalized = normalizeTextUrl(source.url);
    } catch {
      errors.push(`Required source has an invalid URL: ${source.url}`);
      continue;
    }
    if (seenSources.has(normalized)) errors.push(`Duplicate required source URL: ${source.url}`);
    seenSources.add(normalized);
    if (sourceStudies !== null && !sourceStudyUrls.has(exactUrl(source.url))) {
      errors.push(`Source study is missing required URL: ${source.url}`);
    }
    if (curatedText !== null && !curatedUrls.has(exactUrl(source.url))) {
      errors.push(`Required source ${source.url} is absent from all curated URL fields`);
    }
  }
} else if (manifest !== null) {
  errors.push('data/required-sources.json must contain an array');
}

if (sourceStudies !== null) {
  for (const row of catalogRows.filter((entry) => entry?.depth === 'deep')) {
    if (typeof row.live_url === 'string' && !sourceStudyUrls.has(exactUrl(row.live_url))) {
      errors.push(`Deep catalog row is missing from source studies: ${row.id} (${row.live_url})`);
    }
  }
}

const referencesDir = join(root, 'references');
if (existsSync(referencesDir)) {
  for (const file of readdirSync(referencesDir).filter((name) => name.endsWith('.md'))) {
    const content = readFileSync(join(referencesDir, file), 'utf8');
    const lines = splitLines(content);
    if (lines.length > 100 && !/^## (?:Table of contents|Contents)\s*$/im.test(lines.slice(0, 60).join('\n'))) {
      errors.push(`Reference ${file} exceeds 100 lines but has no Contents section near the top`);
    }
  }
} else {
  errors.push('Missing references directory');
}

if (errors.length > 0) {
  process.stderr.write(`Skill validation failed with ${errors.length} issue(s):\n- ${errors.join('\n- ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Skill validation passed: ${catalogRows.length} inspirations, ${Array.isArray(manifest) ? manifest.length : 0} required sources.\n`);
}
