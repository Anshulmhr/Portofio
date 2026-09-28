import type { Project } from './types';

// Repository existence is verified. Authorship, architecture and results remain editorial tasks.
function draftProject(title: string, slug: string, repository: string, editorialNotes: string[] = []): Project {
  return {
    title, slug, github: `https://github.com/Anshulmhr/${repository}`,
    description: 'PLACEHOLDER_PROJECT_DESCRIPTION',
    longDescription: 'PLACEHOLDER_PROJECT_LONG_DESCRIPTION',
    year: null, role: 'PLACEHOLDER_PROJECT_ROLE', technologies: [], live: null,
    thumbnail: null, screenshots: [], videos: [],
    problem: 'PLACEHOLDER_PROJECT_PROBLEM', solution: 'PLACEHOLDER_PROJECT_SOLUTION',
    architecture: 'PLACEHOLDER_PROJECT_ARCHITECTURE', challenges: 'PLACEHOLDER_PROJECT_CHALLENGES',
    results: 'PLACEHOLDER_PROJECT_RESULTS', lessons: 'PLACEHOLDER_PROJECT_LESSONS',
    team: [], featured: false, status: 'draft',
    evidence: [{ label: 'Repository', url: `https://github.com/Anshulmhr/${repository}` }],
    editorialNotes,
  };
}

export const projects: Project[] = [
  draftProject('Placement Tracking System', 'placement-tracking-system', 'Placement-Tracking-system', ['README contains only its title. Review code and confirm contribution.']),
  draftProject('Contract Farming', 'contract-farming', 'contract-farming', ['README contains only its title. Review code and confirm contribution.']),
  draftProject('MediChain', 'medichain', 'medichain', ['README describes both Solidity/zkSync and a custom Python blockchain, and references another repository. Confirm implementation and team contribution.']),
  draftProject('Joblink', 'joblink', 'Joblink'),
  draftProject('FastAPI', 'fastapi', 'FastAPI'),
  draftProject('Simple Face Recognition System', 'simple-face-recognition-system', 'Simple-Face-Recognition-system'),
];

export const contentMode = import.meta.env.VITE_CONTENT_MODE === 'published' ? 'published' : 'preview';
export const visibleProjects = projects.filter(project => contentMode === 'preview' || project.status === 'published');
