import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { render, staticRoutes, validateContent } from '../.build/server/entry-server.js';

const errors = validateContent(process.env.VITE_CONTENT_MODE === 'published');
if (errors.length) throw new Error(errors.join('\n'));
const template = await readFile('dist/index.html', 'utf8');
for (const route of staticRoutes) {
  const result = render(route);
  const html = template.replace('<!--app-head-->', result.head).replace('<!--app-html-->', result.html);
  const path = route === '/' ? 'dist/index.html' : route === '/404/' ? 'dist/404.html' : join('dist', route.slice(1), 'index.html');
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html);
}
if (process.env.VITE_CONTENT_MODE === 'published') {
  const origin = process.env.VITE_SITE_ORIGIN;
  if (!origin || new URL(origin).protocol !== 'https:') throw new Error('A trusted HTTPS production origin is required for release');
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  const entries = staticRoutes.filter(route => route !== '/404/').map(route => `<url><loc>${escape(new URL(route, origin).href)}</loc></url>`).join('');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`);
}
console.log(`Prerendered ${staticRoutes.length} routes; content is available without JavaScript.`);
