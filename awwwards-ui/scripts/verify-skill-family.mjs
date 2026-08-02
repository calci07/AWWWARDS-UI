#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const expectedCommit = 'e988add20dab0fa97d7a76781c48961c8184288e';
const expectedRepository = 'https://github.com/leonxlnx/taste-skill';
const expectedLicense = `https://github.com/leonxlnx/taste-skill/blob/${expectedCommit}/LICENSE`;
const expectedSkills = new Map([
  ['brandkit', 'brandkit'],
  ['imagegen-frontend-mobile', 'imagegen-frontend-mobile'],
  ['imagegen-frontend-web', 'imagegen-frontend-web'],
  ['taste-skill', 'design-taste-frontend'],
]);
const scriptDir = dirname(fileURLToPath(import.meta.url));

function fail(message) {
  process.stderr.write(`Skill family verification failed: ${message}\n`);
  process.exitCode = 1;
}

function isNonEmptyString(value) {
  return typeof value === 'string' && Boolean(value.trim());
}

function isCanonicalPosixRelativePath(value) {
  if (value.includes('\\')) return false;
  return value.split('/').every((segment) => (
    segment.length > 0 && segment !== '.' && segment !== '..'
  ));
}

function pathEscapes(base, candidate) {
  const fromBase = relative(base, candidate);
  return fromBase === '..' || fromBase.startsWith(`..${sep}`) || isAbsolute(fromBase);
}

function slashPath(...parts) {
  return parts.join('/').replaceAll('\\', '/');
}

function readManifest(path) {
  let source;
  try {
    source = readFileSync(path, 'utf8');
  } catch {
    throw new Error('unable to read data/taste-pin.json');
  }
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`data/taste-pin.json is invalid JSON: ${error.message}`);
  }
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function frontmatterName(source) {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return frontmatter?.[1].match(/^name:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1]?.trim() ?? null;
}

function sortedIndexed(values, selector) {
  return values.map((value, index) => ({ value, index })).sort((left, right) => {
    const leftKey = selector(left.value);
    const rightKey = selector(right.value);
    if (leftKey === rightKey) return 0;
    return leftKey < rightKey ? -1 : 1;
  });
}

function sortedStrings(values) {
  return [...values].sort((left, right) => {
    if (left === right) return 0;
    return left < right ? -1 : 1;
  });
}

function lstatOrNull(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

function inspectContainedPath(lexicalBase, realBase, candidate, displayPath) {
  if (pathEscapes(lexicalBase, candidate)) {
    return { issue: `${displayPath} escapes its pinned directory` };
  }
  const fromBase = relative(lexicalBase, candidate);
  const parts = fromBase ? fromBase.split(sep) : [];
  const displayParts = slashPath(displayPath).split('/');
  const displayBaseLength = displayParts.length - parts.length;
  let cursor = lexicalBase;
  let info = lstatOrNull(cursor);
  if (info === null) return { missing: true };

  for (const [partIndex, part] of parts.entries()) {
    cursor = join(cursor, part);
    info = lstatOrNull(cursor);
    if (info === null) return { missing: true };
    if (info.isSymbolicLink()) {
      return { issue: `symbolic or reparse path ${displayParts.slice(0, displayBaseLength + partIndex + 1).join('/')}` };
    }
    const realCursor = realpathSync(cursor);
    if (pathEscapes(realBase, realCursor)) {
      return { issue: `real path escapes pinned directory at ${displayPath}` };
    }
  }
  return { info, realPath: realpathSync(cursor) };
}

function enumerateRegularFiles(skillDir, realSkillDir, skillDirectory) {
  const files = [];
  const issues = [];
  let unsafe = false;

  function walk(directoryPath, relativeDirectory = '') {
    const entries = readdirSync(directoryPath, { withFileTypes: true })
      .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
    for (const entry of entries) {
      const relativePath = relativeDirectory ? `${relativeDirectory}/${entry.name}` : entry.name;
      const displayPath = slashPath(skillDirectory, relativePath);
      const candidate = join(directoryPath, entry.name);
      const inspected = inspectContainedPath(skillDir, realSkillDir, candidate, displayPath);
      if (inspected.issue) {
        issues.push(inspected.issue);
        unsafe = true;
        continue;
      }
      if (inspected.missing) {
        issues.push(`path disappeared during verification: ${displayPath}`);
        unsafe = true;
        continue;
      }
      if (inspected.info.isDirectory()) {
        walk(candidate, relativePath);
      } else if (inspected.info.isFile()) {
        files.push(relativePath);
      } else {
        issues.push(`unsupported non-regular path ${displayPath}`);
        unsafe = true;
      }
    }
  }

  walk(skillDir);
  return { files: sortedStrings(files), issues, unsafe };
}

function verifyManifestShape(manifest) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('data/taste-pin.json must contain an object');
  }
  if (manifest.repository !== expectedRepository) {
    throw new Error(`data/taste-pin.json repository must be ${expectedRepository}`);
  }
  if (manifest.commit !== expectedCommit) {
    throw new Error(`data/taste-pin.json commit must be ${expectedCommit}`);
  }
  if (!isNonEmptyString(manifest.retrieved_at)) {
    throw new Error('data/taste-pin.json retrieved_at must be a non-empty string');
  }
  if (manifest.license !== expectedLicense) {
    throw new Error(`data/taste-pin.json license must be ${expectedLicense}`);
  }
  if (!Array.isArray(manifest.skills)) {
    throw new Error('data/taste-pin.json skills must contain exactly the four pinned skill directory and name pairs');
  }
  const directoriesAreExact = manifest.skills.length === expectedSkills.size
    && manifest.skills.every((skill) => (
      skill
      && typeof skill === 'object'
      && !Array.isArray(skill)
      && expectedSkills.has(skill.directory)
    ))
    && new Set(manifest.skills.map((skill) => skill.directory)).size === expectedSkills.size;
  if (!directoriesAreExact) {
    throw new Error('data/taste-pin.json skills must contain exactly the four pinned skill directory and name pairs');
  }
  for (const skill of manifest.skills) {
    const expectedName = expectedSkills.get(skill.directory);
    if (skill.name !== expectedName) {
      throw new Error(`${skill.directory} must declare expected name ${expectedName} in data/taste-pin.json`);
    }
  }
}

function verifyFamily(skillsRoot, realSkillsRoot, manifest) {
  const issues = [];
  let fileCount = 0;

  for (const { value: skill, index: skillIndex } of sortedIndexed(
    manifest.skills,
    (entry) => String(entry?.directory ?? ''),
  )) {
    const manifestLabel = `data/taste-pin.json skills[${skillIndex}]`;
    if (isAbsolute(skill.directory)) {
      issues.push(`${manifestLabel}.directory must be a relative directory`);
      continue;
    }
    const expectedName = expectedSkills.get(skill.directory);

    const skillDir = resolve(skillsRoot, skill.directory);
    if (pathEscapes(skillsRoot, skillDir)) {
      issues.push(`${manifestLabel}.directory escapes the skills root`);
      continue;
    }
    const inspectedSkillDir = inspectContainedPath(
      skillsRoot,
      realSkillsRoot,
      skillDir,
      slashPath(skill.directory),
    );
    if (inspectedSkillDir.issue) {
      issues.push(inspectedSkillDir.issue);
      continue;
    }
    if (inspectedSkillDir.missing || !inspectedSkillDir.info.isDirectory()) {
      issues.push(`skill directory ${slashPath(skill.directory)} is missing`);
      continue;
    }
    const realSkillDir = inspectedSkillDir.realPath;

    if (!Array.isArray(skill.files) || skill.files.length === 0) {
      issues.push(`${manifestLabel}.files must be a non-empty array`);
    }

    const seenFiles = new Set();
    const validFiles = [];
    for (const { value: file, index: fileIndex } of sortedIndexed(
      Array.isArray(skill.files) ? skill.files : [],
      (entry) => String(entry?.path ?? ''),
    )) {
      const fileLabel = `${manifestLabel}.files[${fileIndex}]`;
      if (!file || typeof file !== 'object' || Array.isArray(file)) {
        issues.push(`${fileLabel} must be an object`);
        continue;
      }
      if (!isNonEmptyString(file.path) || isAbsolute(file.path)) {
        issues.push(`${fileLabel}.path must be a relative file path`);
        continue;
      }
      if (!isCanonicalPosixRelativePath(file.path)) {
        issues.push(`${fileLabel}.path must be a canonical POSIX relative path with no empty, ".", or ".." segments or backslashes`);
        continue;
      }
      const relativePath = file.path;
      if (seenFiles.has(relativePath)) {
        issues.push(`${fileLabel}.path duplicates ${slashPath(skill.directory, relativePath)}`);
        continue;
      }
      seenFiles.add(relativePath);
      if (!isNonEmptyString(file.sha256) || !/^[0-9a-f]{64}$/.test(file.sha256)) {
        issues.push(`${fileLabel}.sha256 must be a lowercase 64-character SHA-256`);
      }
      validFiles.push({ file, fileLabel, relativePath });
    }

    if (!seenFiles.has('SKILL.md')) {
      issues.push(`${slashPath(skill.directory, 'SKILL.md')} must be listed in data/taste-pin.json`);
    }

    const enumerated = enumerateRegularFiles(skillDir, realSkillDir, skill.directory);
    issues.push(...enumerated.issues);
    const diskFiles = new Set(enumerated.files);
    const diskFilesByCaseFold = new Map();
    if (process.platform === 'win32') {
      for (const diskFile of enumerated.files) {
        const foldedPath = diskFile.toLowerCase();
        const priorPath = diskFilesByCaseFold.get(foldedPath);
        if (priorPath !== undefined && priorPath !== diskFile) {
          issues.push(`case-fold collision between enumerated regular files ${slashPath(skill.directory, priorPath)} and ${slashPath(skill.directory, diskFile)}`);
        } else {
          diskFilesByCaseFold.set(foldedPath, diskFile);
        }
      }
    }
    const manifestFilesByPath = new Map(validFiles.map((entry) => [entry.relativePath, entry]));
    for (const diskFile of enumerated.files) {
      if (!seenFiles.has(diskFile)) {
        issues.push(`unlisted regular file ${slashPath(skill.directory, diskFile)}`);
      }
    }
    if (enumerated.unsafe) continue;

    const skillPath = join(skillDir, 'SKILL.md');
    if (!diskFiles.has('SKILL.md')) {
      issues.push(`missing staged SKILL.md for ${slashPath(skill.directory)}`);
    } else {
      const actualName = frontmatterName(readFileSync(skillPath, 'utf8'));
      if (actualName !== expectedName) {
        issues.push(`${slashPath(skill.directory, 'SKILL.md')} name must be ${expectedName}; found ${actualName ?? 'none'}`);
      }
    }

    for (const { file, fileLabel, relativePath } of validFiles) {
      const filePath = resolve(skillDir, ...relativePath.split('/'));
      const displayPath = slashPath(skill.directory, relativePath);
      if (!diskFiles.has(relativePath)) {
        const caseFoldMatch = process.platform === 'win32'
          ? diskFilesByCaseFold.get(relativePath.toLowerCase())
          : undefined;
        if (caseFoldMatch !== undefined) {
          const exactEntry = manifestFilesByPath.get(caseFoldMatch);
          const exactTarget = exactEntry
            ? `${exactEntry.fileLabel}.path`
            : `enumerated regular file ${slashPath(skill.directory, caseFoldMatch)}`;
          issues.push(`${fileLabel}.path is a case-fold alias of ${exactTarget} and must exactly match an enumerated regular file`);
        } else {
          issues.push(`${fileLabel}.path must exactly match an enumerated regular file; missing pinned file ${displayPath}`);
        }
        continue;
      }
      if (pathEscapes(skillDir, filePath)) {
        issues.push(`${fileLabel}.path escapes skill directory ${slashPath(skill.directory)}`);
        continue;
      }
      const inspectedFile = inspectContainedPath(skillDir, realSkillDir, filePath, displayPath);
      if (inspectedFile.issue) {
        issues.push(inspectedFile.issue);
        continue;
      }
      if (inspectedFile.missing || !inspectedFile.info.isFile()) {
        issues.push(`missing pinned file ${displayPath}`);
        continue;
      }
      if (!/^[0-9a-f]{64}$/.test(file.sha256)) continue;
      fileCount += 1;
      const actualHash = sha256(filePath);
      if (actualHash !== file.sha256) {
        issues.push(`hash mismatch for ${displayPath}`);
      }
    }
  }

  return { issues, fileCount };
}

try {
  const { values } = parseArgs({
    options: {
      'skills-root': { type: 'string' },
      manifest: { type: 'string' },
    },
    strict: true,
  });
  if (!values['skills-root']) {
    throw new Error('--skills-root is required');
  }

  const skillsRoot = resolve(values['skills-root']);
  const skillsRootInfo = lstatOrNull(skillsRoot);
  if (skillsRootInfo === null || !skillsRootInfo.isDirectory()) {
    throw new Error('--skills-root must be an existing directory');
  }
  if (skillsRootInfo.isSymbolicLink()) {
    throw new Error('--skills-root must not be a symbolic or reparse path');
  }
  const realSkillsRoot = realpathSync(skillsRoot);
  const manifestPath = resolve(values.manifest ?? join(scriptDir, '..', 'data', 'taste-pin.json'));
  const manifest = readManifest(manifestPath);
  verifyManifestShape(manifest);
  const { issues, fileCount } = verifyFamily(skillsRoot, realSkillsRoot, manifest);
  if (issues.length > 0) {
    throw new Error(`${issues.length} issue(s):\n- ${issues.join('\n- ')}`);
  }
  process.stdout.write(`Skill family verified ${manifest.skills.length} skills and ${fileCount} files at commit ${manifest.commit}.\n`);
} catch (error) {
  fail(error.message);
}
