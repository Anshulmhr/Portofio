import { profile } from './profile';
import { projects } from './projects';

export function validateContent(release = false): string[] {
  const issues: string[] = [];
  const slugs = new Set<string>();
  for (const project of projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) issues.push(`Invalid or duplicate slug: ${project.slug}`);
    slugs.add(project.slug);
    for (const url of [project.github, project.live].filter(Boolean)) {
      try { if (new URL(url!).protocol !== 'https:') issues.push(`Unsafe URL in ${project.slug}`); }
      catch { issues.push(`Invalid URL in ${project.slug}`); }
    }
    if (release && project.status === 'published') {
      for (const field of ['description', 'longDescription', 'role', 'problem', 'solution', 'architecture', 'challenges', 'results', 'lessons'] as const) {
        if (!project[field] || project[field].includes('PLACEHOLDER_')) issues.push(`${project.slug}: ${field} needs approved content`);
      }
    }
  }
  if (release) {
    if (profile.bio.includes('PLACEHOLDER_')) issues.push('Bio needs approved content');
    if (profile.story.includes('PLACEHOLDER_')) issues.push('Story needs approved content');
    if (!projects.some(project => project.status === 'published')) issues.push('At least one verified project is needed for release');
  }
  return issues;
}
