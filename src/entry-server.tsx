import { renderToString } from 'react-dom/server';
import { App } from './App';
import { profile } from './content/profile';
import { contentMode } from './content/projects';
import { resolveRoute } from './routes';
export { staticRoutes, resolveRoute } from './routes';
export { validateContent } from './content/validation';
export { parsePreferences, defaultPreferences } from './preferences/model';

const escape = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
export function render(pathname: string) {
  const route = resolveRoute(pathname);
  const title = route.type === 'project' ? `${route.project.title} — ${profile.name}` : route.type === 'home' ? `${profile.name} — The Mystic Garden` : `Page not found — ${profile.name}`;
  const description = route.type === 'project' && route.project.status === 'published' ? route.project.description : profile.positioning;
  const origin = import.meta.env.VITE_SITE_ORIGIN;
  const canonical = origin && contentMode === 'published' && route.type !== 'not-found' ? `<link rel="canonical" href="${escape(new URL(pathname, origin).href)}">` : '';
  return {
    status: route.type === 'not-found' ? 404 : 200,
    head: `<title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${contentMode === 'preview' || route.type === 'not-found' ? 'noindex, nofollow' : 'index, follow'}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website">${canonical}`,
    html: renderToString(<App pathname={pathname} />),
  };
}
