import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { render, staticRoutes, resolveRoute, parsePreferences, defaultPreferences, validateContent } from '../.build/server/entry-server.js';

const release = process.argv.includes('--release');
if (release) {
  const issues = validateContent(true);
  if (issues.length) { console.error(`Release blocked:\n${issues.map(issue => `- ${issue}`).join('\n')}`); process.exit(1); }
  console.log('Editorial release gate passed.');
  process.exit(0);
}
assert.deepEqual(validateContent(), []);
const html = await readFile('dist/index.html', 'utf8');
for (const fact of ['Anshul', 'Mehra', 'MITS Gwalior', 'Python', 'FastAPI', 'anshulmhr27@gmail.com']) assert.ok(html.includes(fact), `Missing prerendered fact: ${fact}`);
for (const target of ['home', 'about', 'skills', 'work', 'achievements', 'contact']) assert.ok(html.includes(`id="${target}"`), `Missing navigation destination: ${target}`);
assert.ok(html.includes('noindex, nofollow'), 'Private preview should remain unindexed');
assert.ok(!html.includes('<!--app-html-->'), 'Prerender placeholder was not replaced');
for (const route of staticRoutes.filter(route => route.startsWith('/projects/'))) {
  const file = await readFile(`dist${route}index.html`, 'utf8');
  const project = resolveRoute(route).project;
  assert.ok(file.includes(`<title>${project.title}`), `Wrong project metadata: ${route}`);
  assert.ok(file.includes(project.github), `Missing repository: ${route}`);
  assert.equal(render(route).status, 200);
}
assert.equal(render('/missing-path').status, 404);
assert.equal(resolveRoute('/projects/nonexistent/').type, 'not-found');
assert.equal(resolveRoute('/projects/medichain////').type, 'project');
assert.deepEqual(parsePreferences('not json'), defaultPreferences);
assert.deepEqual(parsePreferences('{"version":9,"sound":true}'), defaultPreferences);
assert.deepEqual(parsePreferences('{"version":1,"quality":"unknown","sound":"true"}'), defaultPreferences);
assert.equal(parsePreferences('{"version":1,"motion":"reduced","quality":"low"}').motion, 'reduced');
assert.ok(validateContent(true).length >= 3, 'Unfinished editorial content must block public release');
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(match => match[1]);
let compressed = gzipSync(html).length;
for (const path of new Set(assets)) {
  await stat(`dist${path}`);
  const data = await readFile(`dist${path}`);
  compressed += gzipSync(data).length;
}
console.log(JSON.stringify({ checkedRoutes: staticRoutes.length, noJavaScriptContent: 'passed', routeMetadata: 'passed', malformedPreferences: 'passed', draftReleaseGate: 'passed', initialHtmlAndReferencedAssetsGzipBytes: compressed }, null, 2));
