export interface Preferences {
  version: 1;
  motion: 'system' | 'reduced';
  quality: 'auto' | 'high' | 'medium' | 'low';
  sound: boolean;
  effectsPaused: boolean;
}
export const preferenceKey = 'mystic-garden.preferences.v1';
export const defaultPreferences: Preferences = { version: 1, motion: 'system', quality: 'auto', sound: false, effectsPaused: false };

export function parsePreferences(raw: string | null): Preferences {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1) return { ...defaultPreferences };
    const data = value as Partial<Preferences>;
    return {
      version: 1,
      motion: data.motion === 'reduced' ? 'reduced' : 'system',
      quality: ['auto', 'high', 'medium', 'low'].includes(data.quality ?? '') ? data.quality! : 'auto',
      sound: data.sound === true,
      effectsPaused: data.effectsPaused === true,
    };
  } catch { return { ...defaultPreferences }; }
}
