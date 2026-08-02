import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { inspect } from 'node:util';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const planRelativePath = 'docs/superpowers/plans/2026-07-31-awwwards-ui-v6-implementation.md';
const taskNineBriefRelativePath = '.superpowers/sdd/2026-07-31-awwwards-ui-v6-implementation/task-9-brief.md';

function locateWorkspace() {
  const candidates = [];
  if (process.env.AWWWARDS_UI_V6_WORKSPACE) {
    candidates.push(resolve(process.env.AWWWARDS_UI_V6_WORKSPACE));
  }
  let candidate = resolve(root);
  while (true) {
    candidates.push(candidate);
    const parent = dirname(candidate);
    if (parent === candidate) break;
    candidate = parent;
  }
  const workspace = candidates.find((path) => (
    existsSync(join(path, planRelativePath))
      && existsSync(join(path, taskNineBriefRelativePath))
  ));
  return workspace ?? null;
}

const workspace = locateWorkspace();

inspect.defaultOptions.maxStringLength = null;

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

function readWorkspace(relativePath) {
  return readFileSync(join(workspace, relativePath), 'utf8');
}

test('documents the Preserve, Recompose, and Overhaul redesign modes and their floor', () => {
  const skill = read('SKILL.md');
  assert.match(skill, /Preserve[\s\S]{0,120}Recompose[\s\S]{0,120}Overhaul/i);
  assert.match(skill, /Overhaul[\s\S]{0,260}at least six[\s\S]{0,160}composition[\s\S]{0,160}mobile recomposition/i);
});

test('requires a transformation map and route invariants for redesign approval', () => {
  const roadmap = read('references/roadmap-and-approval.md');
  assert.match(roadmap, /Transformation Map/i);
  assert.match(roadmap, /Current pattern[\s\S]{0,100}Retire or preserve[\s\S]{0,100}Replacement[\s\S]{0,100}Reference evidence[\s\S]{0,100}Mobile translation[\s\S]{0,100}Acceptance signal/i);
  assert.match(roadmap, /three to five[\s\S]{0,120}route invariants/i);
});

test('blocks Focused Code for a full redesign until route approval', () => {
  const skill = read('SKILL.md');
  assert.match(skill, /full redesign[\s\S]{0,220}(?:must not|cannot|never)[\s\S]{0,120}Focused Code[\s\S]{0,220}(?:before|until)[\s\S]{0,120}route approval/i);
});

test('keeps preserving content distinct from preserving an existing layout', () => {
  const integration = read('references/taste-integration.md');
  assert.match(integration, /preserve content[\s\S]{0,180}(?:not|distinct from)[\s\S]{0,120}preserv(?:e|ing)[\s\S]{0,120}layout/i);
});

test('requires a route realization ledger and disallows a third polishing pass for unfinished work', () => {
  const codeExecution = read('references/code-execution.md');
  assert.match(codeExecution, /Route Realization Ledger/i);
  assert.match(codeExecution, /unfinished work[\s\S]{0,160}not[\s\S]{0,100}(?:third|polishing) pass/i);
});

test('sets transformation coverage and pinned-evidence quality floors', () => {
  const quality = read('references/quality-gates.md');
  const taste = read('references/taste-integration.md');
  const recommender = read('references/taste-recommender.md');
  assert.match(quality, /eight-section[\s\S]{0,120}four layout families/i);
  assert.match(taste, /pinned[\s\S]{0,160}commit/i);
  assert.match(taste, /may not reduce[\s\S]{0,160}Overhaul[\s\S]{0,160}cosmetic/i);
  assert.match(recommender, /deep[\s\S]{0,160}user-curated/i);
});

test('does not allow speed to weaken transformation or design ambition', () => {
  const skill = read('SKILL.md');
  assert.match(skill, /Speed[\s\S]{0,220}(?:must not|never)[\s\S]{0,180}(?:transformation|creative coverage|design ambition)/i);
});

test('requires universal route artifacts and verification for standalone Focused Code', () => {
  const roadmap = read('references/roadmap-and-approval.md');
  const codeExecution = read('references/code-execution.md');
  const quality = read('references/quality-gates.md');
  assert.match(roadmap, /Every route[\s\S]{0,120}standalone Focused Code[\s\S]{0,180}Design Read[\s\S]{0,180}three to five[\s\S]{0,120}route invariants/i);
  assert.match(codeExecution, /Every approved route ledger[\s\S]{0,160}standalone Focused Code[\s\S]{0,180}one row[\s\S]{0,160}approved route invariant/i);
  assert.match(quality, /Every approved route and build[\s\S]{0,180}standalone Focused Code[\s\S]{0,180}Design Read[\s\S]{0,160}three to five route invariants[\s\S]{0,180}Route Realization Ledger/i);
});

test('keeps redesign mode, current-pattern map, and dimension tally redesign-only', () => {
  const skill = read('SKILL.md');
  const roadmap = read('references/roadmap-and-approval.md');
  const codeExecution = read('references/code-execution.md');
  assert.match(skill, /For a redesign route[\s\S]{0,180}Redesign mode[\s\S]{0,120}Transformation Map[\s\S]{0,120}Seven-dimension tally[\s\S]{0,220}non-redesign route[\s\S]{0,180}omit/i);
  assert.match(roadmap, /Only an existing-site redesign[\s\S]{0,180}maps current patterns[\s\S]{0,220}non-redesign build[\s\S]{0,220}must not invent/i);
  assert.match(codeExecution, /For an existing-site redesign[\s\S]{0,180}Transformation Map[\s\S]{0,140}seven-dimension tally[\s\S]{0,260}non-redesign build[\s\S]{0,180}inapplicable[\s\S]{0,180}do not invent/i);
});

test('enforces verified-only pass states and the Overhaul tally floor', () => {
  const codeExecution = read('references/code-execution.md');
  const quality = read('references/quality-gates.md');
  assert.match(codeExecution, /`verified` is the only passing state[\s\S]{0,220}`planned`[\s\S]{0,80}`implemented`[\s\S]{0,80}`blocked`[\s\S]{0,180}completion open/i);
  assert.match(codeExecution, /`waived` is allowed only[\s\S]{0,160}genuinely inapplicable[\s\S]{0,220}does not count as passed/i);
  assert.match(quality, /Overhaul[\s\S]{0,180}at least six `verified`[\s\S]{0,220}page\/section composition[\s\S]{0,160}mobile recomposition[\s\S]{0,180}may be waived[\s\S]{0,180}below six/i);
});

test('relevance-gates deep user-curated and Mobbin evidence with honest fallbacks', () => {
  const recommender = read('references/taste-recommender.md');
  assert.match(recommender, /When relevant deep\/user-curated evidence exists[\s\S]{0,220}at least one[\s\S]{0,260}If none is relevant[\s\S]{0,260}substitute another observable relevant source[\s\S]{0,220}disclose[\s\S]{0,220}do not force an unrelated/i);
  assert.match(recommender, /same relevance gate to Mobbin[\s\S]{0,220}mobile-heavy work[\s\S]{0,220}If none is relevant[\s\S]{0,260}substitute another observable relevant mobile source[\s\S]{0,220}disclose[\s\S]{0,220}do not insert weak Mobbin evidence/i);
});

test('keeps directory-only studies below the direct-observation evidence ceiling', () => {
  const skill = read('SKILL.md');
  const recommender = read('references/taste-recommender.md');
  const roadmap = read('references/roadmap-and-approval.md');
  assert.match(skill, /directory-study[\s\S]{0,180}study-derived heuristic[\s\S]{0,220}(?:must not|never)[\s\S]{0,180}counted[^\n]{0,80}Borrow/i);
  assert.match(recommender, /source_type[^\n]{0,40}directory-study[\s\S]{0,120}live_url[^\n]{0,40}null[\s\S]{0,180}(?:synthesis|evidence) ceiling/i);
  assert.match(recommender, /study-derived heuristic[\s\S]{0,120}proposed translation[\s\S]{0,180}(?:visible|state)[^\n]{0,80}limitation/i);
  assert.match(recommender, /(?:must not|never)[\s\S]{0,120}counted[^\n]{0,80}Borrow[\s\S]{0,180}(?:exact placement|interaction attribution|direct interaction)/i);
  assert.match(roadmap, /directory-only stud(?:y|ies)[\s\S]{0,180}supplemental Mobbin context[\s\S]{0,220}(?:does not|cannot)[\s\S]{0,140}counted observable live reference/i);
  assert.match(roadmap, /no observable Mobbin live reference[\s\S]{0,180}disclose[\s\S]{0,220}another observable mobile source/i);
});

test('makes fixed-deadline capacity measurable before approval', () => {
  const skill = read('SKILL.md');
  const workflow = read('references/workflow-integration.md');
  assert.match(skill, /fixed deadline[\s\S]{0,180}(?:unique )?route templates?\/?states?[\s\S]{0,160}component reuse/i);
  assert.match(workflow, /before approval[\s\S]{0,240}fixed deadline[\s\S]{0,240}capacity[\s\S]{0,180}(?:unique )?route templates?[\s\S]{0,160}states?[\s\S]{0,180}component reuse/i);
});

test('turns an over-capacity preflight into an explicit user choice without scope loss', () => {
  const skill = read('SKILL.md');
  const workflow = read('references/workflow-integration.md');
  assert.match(skill, /exceeds[^\n]{0,100}capacity[\s\S]{0,220}deadline extension[\s\S]{0,160}phased release slice/i);
  assert.match(workflow, /preflight[\s\S]{0,220}exceeds[^\n]{0,100}capacity[\s\S]{0,220}measured conflict[\s\S]{0,220}(?:ask|request)[\s\S]{0,120}(?:user|approval)[\s\S]{0,220}deadline extension[\s\S]{0,180}explicit phased release slice/i);
  assert.match(workflow, /Speed[\s\S]{0,260}(?:never|must not)[\s\S]{0,180}(?:silently )?(?:drop|omit|reduce)[\s\S]{0,260}routes[\s\S]{0,180}transformation coverage[\s\S]{0,180}assets[\s\S]{0,180}mobile recomposition[\s\S]{0,180}QA/i);
});

test('adapts pinned image companions without expanding the approved asset scope', () => {
  const skill = read('SKILL.md');
  const taste = read('references/taste-integration.md');
  const assets = read('references/visual-assets.md');

  assert.match(skill, /approved route[\s\S]{0,180}asset ledger[\s\S]{0,180}performance budget[\s\S]{0,180}conflict precedence[\s\S]{0,220}imagegen-frontend-web/i);
  assert.match(skill, /one-horizontal-image-per-section[\s\S]{0,220}only[\s\S]{0,160}approved section-reference-image deliverables[\s\S]{0,260}(?:never|not)[\s\S]{0,180}every section|every section[\s\S]{0,180}(?:never|not)[\s\S]{0,260}one-horizontal-image-per-section/i);
  assert.match(taste, /imagegen-frontend-mobile[\s\S]{0,220}only[\s\S]{0,180}approved mobile screen\/flow comp deliverables[\s\S]{0,260}(?:not|never)[\s\S]{0,180}every breakpoint[\s\S]{0,120}(?:or|and)[\s\S]{0,100}route/i);
  assert.match(assets, /Product mockups[\s\S]{0,220}element\/icon\/background families[\s\S]{0,220}paired hover\/reveal states[\s\S]{0,260}approved brand\/asset plan[\s\S]{0,180}suitable image tool/i);
  for (const source of [skill, taste, assets]) {
    assert.match(source, /companion output counts[\s\S]{0,220}(?:may not|must not|cannot)[\s\S]{0,180}(?:expand|override)[\s\S]{0,220}(?:accessibility|performance|provenance)/i);
  }
});

test('makes Task 9 one transactional five-skill install with whole-family rollback', {
  skip: workspace ? false : 'Set AWWWARDS_UI_V6_WORKSPACE to run the historical Task 9 governance test.',
}, () => {
  const plan = readWorkspace(planRelativePath).split('### Task 9:')[1];
  const brief = readWorkspace(taskNineBriefRelativePath);

  for (const source of [plan, brief]) {
    assert.match(source, /one[\s\S]{0,80}five-target transaction/i);
    assert.match(source, /record[\s\S]{0,180}(?:existed|prior state)[\s\S]{0,180}(?:pre-install|prior)[\s\S]{0,120}hash/i);
    assert.match(source, /backup[\s\S]{0,180}all existing targets/i);
    assert.match(source, /any copy failure[\s\S]{0,180}any[\s\S]{0,120}(?:verification|test|hash) failure/i);
    assert.match(source, /quarantine[\s\S]{0,180}every newly copied[\s\S]{0,120}target[\s\S]{0,120}\.failed-/i);
    assert.match(source, /restore[\s\S]{0,160}every prior backup/i);
    assert.match(source, /previously absent[\s\S]{0,180}(?:remain|kept)[\s\S]{0,80}absent/i);
    assert.match(source, /rerun[\s\S]{0,180}pre-install hash\/absence checks[\s\S]{0,180}(?:whole|entire)[\s\S]{0,100}five-skill family/i);
    assert.match(source, /success[\s\S]{0,220}all five cop(?:y|ies|ied)[\s\S]{0,220}(?:installed-path|installed)[\s\S]{0,120}gates pass/i);
    assert.match(source, /PowerShell `?try\/catch`?[\s\S]{0,160}transaction/i);
  }
});
