import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

test('encodes the v7 design-direction and seamless-image integration contracts', () => {
  const skill = read('SKILL.md');

  assert.match(skill, /Awwwards UI v7/i);
  assert.match(skill, /design-direction-principles\.md/i);
  assert.match(skill, /seamless-image-integration\.md/i);
  assert.match(skill, /transparent-object[\s\S]{0,160}matched-field[\s\S]{0,160}container-crop[\s\S]{0,160}full-bleed/i);
  assert.match(skill, /standalone[\s\S]{0,180}transparent alpha[\s\S]{0,180}CSS owns/i);
  assert.match(skill, /object-fit[\s\S]{0,180}(?:never repair|may not conceal)/i);

  const direction = read('references/design-direction-principles.md');
  assert.match(direction, /youtube\.com\/watch\?v=pbhLsV-Dyho/i);
  assert.match(direction, /headline anchor/i);
  assert.match(direction, /narrative star/i);
  assert.match(direction, /visual rhyming/i);
  assert.match(direction, /quiet depth/i);
  assert.match(direction, /emphasis hierarchy/i);
  assert.match(direction, /divergent exploration/i);

  const integration = read('references/seamless-image-integration.md');
  assert.match(integration, /RGBA PNG master/i);
  assert.match(integration, /JPEG is never a transparent-object deliverable/i);
  assert.match(integration, /light, dark, and saturated diagnostic fields/i);
  assert.match(integration, /normal viewing scale and 200% edge inspection/i);
  assert.match(integration, /Deadline[\s\S]{0,220}never converts[\s\S]{0,220}(?:matte|seam|halo|cutoff)/i);
});
