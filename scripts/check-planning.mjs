import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = new URL('../planning/current/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('diagram-manifest.json', root), 'utf8'));
const diagrams = (await readdir(new URL('diagrams/', root))).filter(name => name.endsWith('.svg'));
assert.equal(manifest.requirements.length, 128);
assert.equal(manifest.tests.length, 42);
assert.equal(diagrams.length, 214);
assert.equal(new Set(manifest.requirements.map(r => r.id)).size, 128);
assert.equal(new Set(manifest.tests.map(t => t.id)).size, 42);
const ids = new Set(manifest.requirements.map(r => r.id));
const testIds = new Set(manifest.tests.map(t => t.id));
for (const item of [...manifest.requirements, ...manifest.tests]) {
  await readFile(new URL(item.diagram, root));
  for (const id of item.requirements ?? []) assert(ids.has(id), `Unknown requirement ${id}`);
}
for (const requirement of manifest.requirements) {
  for (const test of (requirement.test || '').split(',').filter(Boolean)) {
    assert(testIds.has(test.trim()), `Unknown test ${test}`);
  }
}
console.log('Planning baseline verified: 128 requirements, 42 tests, 214 SVGs. This is not an Obsidian runtime test.');
