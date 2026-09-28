export const scenes = [
  { id: 'home', label: 'Home', place: 'Garden Gate' },
  { id: 'about', label: 'About', place: 'Story Orchard' },
  { id: 'skills', label: 'Skills', place: 'Skill Conservatory' },
  { id: 'work', label: 'Work', place: 'Artifact Workshop' },
  { id: 'achievements', label: 'Achievements', place: 'Observatory' },
  { id: 'contact', label: 'Contact', place: 'Night Pond' },
] as const;
export type SceneId = typeof scenes[number]['id'];
export const sceneAssets: Partial<Record<SceneId, string[]>> = {};
