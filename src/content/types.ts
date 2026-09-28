export type PublicationStatus = 'draft' | 'published';
export interface MediaAsset { src: string; alt: string; width: number; height: number; }
export interface VideoAsset { src: string; poster: string; caption: string; }
export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  year: number | null;
  role: string;
  technologies: string[];
  github: string;
  live: string | null;
  thumbnail: MediaAsset | null;
  screenshots: MediaAsset[];
  videos: VideoAsset[];
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
  lessons: string;
  team: { name: string; role: string }[];
  featured: boolean;
  status: PublicationStatus;
  evidence: { label: string; url: string }[];
  editorialNotes: string[];
}
export interface Achievement {
  id: string;
  title: string;
  category: 'Award' | 'Finalist' | 'Participation' | 'Leadership' | 'Membership';
  description: string;
  date: string | null;
  evidenceUrl: string | null;
}
export interface Experiment {
  slug: string;
  title: string;
  description: string;
  status: PublicationStatus;
  moduleId: string;
}
