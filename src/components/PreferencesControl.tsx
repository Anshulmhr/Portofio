import { usePreferences } from '../preferences/PreferencesProvider';

export function PreferencesControl() {
  const { preferences, reducedMotion, update } = usePreferences();
  return <details className="preferences">
    <summary>Preferences <span aria-hidden="true">+</span></summary>
    <div className="preferences-panel">
      <label htmlFor="motion">Motion</label>
      <select id="motion" value={preferences.motion} onChange={event => update({ motion: event.target.value as 'system' | 'reduced' })}>
        <option value="system">Follow device setting</option><option value="reduced">Reduce motion</option>
      </select>
      <p>{reducedMotion ? 'Reduced motion is active.' : 'Your device’s motion preference is respected.'}</p>
      <label className="pause-preference" htmlFor="pause-effects"><input id="pause-effects" type="checkbox" checked={preferences.effectsPaused} onChange={event => update({ effectsPaused: event.target.checked })} /> Pause effects</label>
      <label htmlFor="quality">Visual quality</label>
      <select id="quality" value={preferences.quality} onChange={event => update({ quality: event.target.value as typeof preferences.quality })}>
        <option value="auto">Automatic</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
      </select>
    </div>
  </details>;
}
