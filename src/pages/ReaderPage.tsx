import { GardenClearing } from '../world/GardenClearing';
import { profile, education } from '../content/profile';
import { skills } from '../content/skills';
import { achievements } from '../content/achievements';
import { visibleProjects, contentMode } from '../content/projects';
import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { Placeholder } from '../components/Placeholder';
import { ContactDetails } from '../components/ContactDetails';

export function ReaderPage() {
  return <Layout isHome entrance={<GardenClearing />}><main id="main" className="wrap" tabIndex={-1}>
    <Section id="about" index="01" title="The person behind the work." place="Story Orchard">
      {profile.bio.startsWith('PLACEHOLDER_') ? <Placeholder value={profile.bio} /> : <p className="body-large">{profile.bio}</p>}
      {profile.story.startsWith('PLACEHOLDER_') ? <Placeholder value={profile.story} /> : <p>{profile.story}</p>}
      <div className="education"><h3>Education</h3><p className="education-title">{education.institution}</p><p>{education.degree}</p><dl className="education-facts"><div><dt>Current year</dt><dd>{education.currentYear}</dd></div><div><dt>Expected graduation</dt><dd>{education.graduationYear}</dd></div><div><dt>CGPA</dt><dd>{education.cgpa}</dd></div></dl></div>
    </Section>
    <Section id="skills" index="02" title="Tools I work with." place="Skill Conservatory">
      <dl className="skills-list">{skills.map(group => <div key={group.category}><dt>{group.category}</dt><dd>{group.items.map(item => <span key={item}>{item}</span>)}</dd></div>)}</dl>
    </Section>
    <Section id="work" index="03" title="The project archive." place="Artifact Workshop">
      {contentMode === 'preview' && <p className="section-note">Case studies are drafts. Project descriptions and individual contributions are awaiting review.</p>}
      <ol className="project-list">{visibleProjects.map((project, index) => <li key={project.slug}><a href={`/projects/${project.slug}/`}><span className="project-number">{String(index + 1).padStart(2, '0')}</span><span className="project-name">{project.title}{project.status === 'draft' && <span className="draft-label">Case study draft</span>}</span><span className="project-arrow" aria-hidden="true">↗</span></a></li>)}</ol>
      {visibleProjects.length === 0 && <p>Project case studies will appear here when they are ready.</p>}
    </Section>
    <Section id="achievements" index="04" title="Along the way." place="Observatory">
      <ul className="achievement-list">{achievements.map(item => <li key={item.id}><span className="achievement-category">{item.category}</span><div><h3>{item.title}</h3><p>{item.description}</p></div>{item.date && <time dateTime={item.date}>{item.date}</time>}</li>)}</ul>
    </Section>
    <Section id="contact" index="05" title="Leave a note." place="Night Pond"><ContactDetails /></Section>
  </main></Layout>;
}
