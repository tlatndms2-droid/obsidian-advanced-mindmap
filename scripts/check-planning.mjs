import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const original = process.argv.includes('--original');
const root = new URL(original ? '../planning/current/' : '../planning/revised/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('diagram-manifest.json', root), 'utf8'));
const diagrams = (await readdir(new URL('diagrams/', root))).filter(name => name.endsWith('.svg'));
assert.equal(manifest.requirements.length, 128);
assert.equal(manifest.tests.length, original ? 42 : 43);
assert.equal(diagrams.length, original ? 214 : 215);
assert.equal(new Set(manifest.requirements.map(r => r.id)).size, 128);
assert.equal(new Set(manifest.tests.map(t => t.id)).size, manifest.tests.length);
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
if (!original) {
  const html = await readFile(new URL('interactive-preview.html', root), 'utf8');
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const inline = [...html.matchAll(/<svg\b[\s\S]*?<\/svg>/g)].map(match => normalize(match[0]));
  for (const name of diagrams) {
    const svg = await readFile(new URL(`diagrams/${name}`, root), 'utf8');
    assert.equal(inline.filter(value => value === normalize(svg)).length, 1, `Inline SVG mismatch: ${name}`);
  }
  for (const test of manifest.tests) {
    assert(test.requirements.length, `Unmapped test: ${test.id}`);
    const svg = await readFile(new URL(test.diagram, root), 'utf8');
    assert.deepEqual([...new Set(svg.match(/CM-\d{3}/g) ?? [])].sort(), [...test.requirements].sort(), `Test SVG mapping: ${test.id}`);
  }
  for (const requirement of manifest.requirements) {
    const linked = manifest.tests.filter(test => test.requirements.includes(requirement.id)).map(test => test.id);
    assert.deepEqual(requirement.referenced_by, linked);
    assert.equal(requirement.test, linked.join(','));
  }
}
console.log(`Planning material verified: 128 requirements, ${manifest.tests.length} tests, ${diagrams.length} SVGs. This is not an Obsidian runtime test.`);
