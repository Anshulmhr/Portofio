import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { scenes, type SceneId } from './scenes';

// Native links remain usable without hydration and preserve modified clicks.
export function navigateGarden(event: MouseEvent<HTMLAnchorElement>, id: string, isHome: boolean) {
  if (!isHome || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
}

export function GardenNavigation({ isHome }: { isHome: boolean }) {
  const [active, setActive] = useState<SceneId | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setReady(true);
    if (!isHome) return;
    let frame = 0;
    const sync = () => {
      frame = 0;
      let current: SceneId = 'home';
      for (const scene of scenes) {
        const target = document.getElementById(scene.id);
        if (target && target.getBoundingClientRect().top <= Math.min(180, innerHeight * .3)) current = scene.id;
      }
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    sync();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [isHome]);
  const close = () => dialog.current?.close();
  const jump = (event: MouseEvent<HTMLAnchorElement>, id: SceneId) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    close();
    navigateGarden(event, id, isHome);
  };
  return <div className="garden-navigation">
    <nav className="section-nav wrap" aria-label="Portfolio">
      <div className="section-links">{scenes.map(scene => <a key={scene.id} href={`${isHome ? '' : '/'}#${scene.id}`} aria-current={active === scene.id ? 'location' : undefined} onClick={event => navigateGarden(event, scene.id, isHome)}>{scene.label}</a>)}</div>
      {ready && <button className="map-trigger" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true); }}>Garden map</button>}
    </nav>
    <dialog ref={dialog} className="garden-map" aria-labelledby="garden-map-title" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="map-heading"><div><p className="map-eyebrow">THE MYSTIC GARDEN</p><h2 id="garden-map-title">Choose a path.</h2></div><button autoFocus type="button" aria-label="Close garden map" onClick={close}>×</button></div>
      <p className="map-intro">Follow the garden in order, or step straight into a clearing.</p>
      <nav aria-label="Garden map"><ol className="map-path">{scenes.map((scene, index) => <li key={scene.id}><a href={`${isHome ? '' : '/'}#${scene.id}`} aria-current={active === scene.id ? 'location' : undefined} onClick={event => jump(event, scene.id)}><span className="map-marker" aria-hidden="true">{String(index).padStart(2, '0')}</span><span className="map-destination"><strong>{scene.place}</strong><span>{scene.label}</span></span>{active === scene.id && <span className="map-location">You are here</span>}</a></li>)}</ol></nav>
      <a className="map-reader" href={`/?view=read${active ? `#${active}` : ''}`}>Read the portfolio</a>
    </dialog>
  </div>;
}
