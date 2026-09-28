import type { Project } from '../content/types';
import { Layout } from '../components/Layout';
import { Placeholder } from '../components/Placeholder';

export function ProjectPage({ project }: { project: Project }) {
  return <Layout><main id="main" className="wrap case-study" tabIndex={-1}>
    <a className="back-link" href="/#work">← Back to the project archive</a>
    <div className="case-heading"><p className="eyebrow">Artifact Workshop / {project.status === 'draft' ? 'Case study draft' : 'Project case study'}</p><h1>{project.title}</h1><div className="case-links"><a className="primary-link" href={project.github} target="_blank" rel="noopener noreferrer">View repository <span aria-hidden="true">↗</span></a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Open live project ↗</a>}</div></div>
    {project.description.startsWith('PLACEHOLDER_') ? <Placeholder value={project.description} /> : <p className="body-large">{project.description}</p>}
    <dl className="project-facts"><div><dt>Role</dt><dd>{project.role}</dd></div>{project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}{project.technologies.length > 0 && <div><dt>Technologies</dt><dd>{project.technologies.join(' · ')}</dd></div>}</dl>
    {(['longDescription', 'problem', 'solution', 'architecture', 'challenges', 'results', 'lessons'] as const).map(key => <section className="case-section" key={key} aria-labelledby={`case-${key}`}><h2 id={`case-${key}`}>{key === 'longDescription' ? 'Overview' : key.charAt(0).toUpperCase() + key.slice(1)}</h2>{project[key].startsWith('PLACEHOLDER_') ? <Placeholder value={project[key]} /> : <p>{project[key]}</p>}</section>)}
    {project.screenshots.map(asset => <figure key={asset.src}><img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading="lazy" /><figcaption>{asset.alt}</figcaption></figure>)}
    {project.videos.map(video => <figure key={video.src}><video src={video.src} poster={video.poster} controls preload="none" aria-label={video.caption} /><figcaption>{video.caption}</figcaption></figure>)}
  </main></Layout>;
}
