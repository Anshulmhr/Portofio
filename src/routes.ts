import { visibleProjects } from './content/projects';
import type { Project } from './content/types';
export type Route = { type: 'home' } | { type: 'project'; project: Project } | { type: 'not-found' };
export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { type: 'home' };
  const project = visibleProjects.find(item => path === `/projects/${item.slug}`);
  return project ? { type: 'project', project } : { type: 'not-found' };
}
export const staticRoutes = ['/', ...visibleProjects.map(project => `/projects/${project.slug}/`), '/404/'];
