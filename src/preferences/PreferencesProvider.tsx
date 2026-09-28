import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultPreferences, parsePreferences, preferenceKey } from './model';
import type { Preferences } from './model';

const PreferenceContext = createContext<{
  preferences: Preferences;
  reducedMotion: boolean;
  update: (patch: Partial<Omit<Preferences, 'version'>>) => void;
} | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [systemReduced, setSystemReduced] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setPreferences(parsePreferences(localStorage.getItem(preferenceKey))); } catch { /* Storage is optional. */ }
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setSystemReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    setReady(true);
    return () => query.removeEventListener('change', sync);
  }, []);
  const reducedMotion = systemReduced || preferences.motion === 'reduced';
  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full';
    document.documentElement.dataset.quality = preferences.quality;
    document.documentElement.dataset.effectsPaused = String(preferences.effectsPaused);
    if (ready) {
      try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)); } catch { /* The current session still works. */ }
    }
  }, [preferences, reducedMotion, ready]);
  return <PreferenceContext.Provider value={{ preferences, reducedMotion, update: patch => setPreferences(current => ({ ...current, ...patch })) }}>{children}</PreferenceContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferenceContext);
  if (!value) throw new Error('PreferencesProvider is required');
  return value;
}
