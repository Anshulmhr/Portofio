import { scenes } from '../world/scenes';
import type { SceneId } from '../world/scenes';

// The character only consumes named navigation actions. A future assistant
// can supply these same allowlisted destinations without owning the renderer.
export interface GardenGuide {
  destinations(): ReadonlyArray<{ id: SceneId; label: string; place: string }>;
}
export const portfolioGuide: GardenGuide = { destinations: () => scenes };
