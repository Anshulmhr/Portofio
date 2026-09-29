import { navigateGarden } from '../world/GardenNavigation';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { usePreferences } from '../preferences/PreferencesProvider';
import { portfolioGuide } from './guide';

type CatState = 'idle' | 'blink' | 'left' | 'right' | 'sleep' | 'alert';
const frames: Record<CatState, [number, number]> = { idle: [0, 0], blink: [1, 0], left: [2, 0], right: [0, 1], sleep: [1, 1], alert: [2, 1] };
const sequence: { pose: CatState; duration: number }[] = [
  { pose: 'idle', duration: 5200 }, { pose: 'blink', duration: 180 },
  { pose: 'idle', duration: 4000 }, { pose: 'left', duration: 1600 },
  { pose: 'idle', duration: 4600 }, { pose: 'right', duration: 1600 },
  { pose: 'idle', duration: 4000 }, { pose: 'sleep', duration: 12000 },
];

function useCatPose(active: boolean, reaction: CatState | null = null) {
  const { preferences, reducedMotion } = usePreferences();
  const [idle, setIdle] = useState<CatState>('idle');
  const [tabVisible, setTabVisible] = useState(true);
  const still = reducedMotion || preferences.effectsPaused || preferences.quality === 'low';
  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden);
    sync(); document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    if (!active || still || !tabVisible || reaction) return;
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      const entry = sequence[step++ % sequence.length];
      setIdle(entry.pose); timer = setTimeout(next, entry.duration);
    };
    next();
    return () => clearTimeout(timer);
  }, [active, still, tabVisible, reaction]);
  return still ? 'idle' : reaction ?? (active && tabVisible ? idle : 'idle');
}

function CatSprite({ pose, onFailure }: { pose: CatState; onFailure?: () => void }) {
  const [column, row] = frames[pose];
  return <span className="cat-sprite" data-pose={pose} aria-hidden="true"><img src="/art/cat-sprites.webp" width="384" height="256" alt="" draggable={false} style={{ '--cat-x': `${column * -100}%`, '--cat-y': `${row * -100}%` } as CSSProperties} onError={onFailure} /></span>;
}

export function GateCat({ active = true }: { active?: boolean }) {
  const perch = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const pose = useCatPose(visible && active);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    if (perch.current) observer.observe(perch.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={perch} className="cat-perch" aria-hidden="true">{!failed && <CatSprite pose={pose} onFailure={() => setFailed(true)} />}</div>;
}

export function WizardCat({ isHome }: { isHome: boolean }) {
  const [visible, setVisible] = useState(false);
  const [reaction, setReaction] = useState<CatState | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pose = useCatPose(visible, open ? 'alert' : reaction);
  useEffect(() => {
    let pending = 0;
    const sync = () => {
      pending = 0;
      const home = document.getElementById('home');
      if (!isHome || !home) { setVisible(true); return; }
      const simple = home.matches('.journey-reader, .journey-fallback');
      const still = home.classList.contains('journey-still');
      const revealAt = still ? window.innerHeight : (home.offsetHeight - window.innerHeight) * .84;
      setVisible(simple || -home.getBoundingClientRect().top >= revealAt);
    };
    const schedule = () => { if (!pending) pending = requestAnimationFrame(sync); };
    const observer = new MutationObserver(schedule);
    const home = document.getElementById('home');
    if (home) observer.observe(home, { attributes: true, attributeFilter: ['class'] });
    sync(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    return () => { observer.disconnect(); cancelAnimationFrame(pending); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [isHome]);
  useEffect(() => { if (!visible && dialog.current?.open) dialog.current.close(); }, [visible]);
  const show = () => { setOpen(true); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); };
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    close();
    navigateGarden(event, id, isHome);
  };
  return <div className={`wizard-companion ${visible ? 'companion-visible' : ''}`}>
    <button ref={trigger} type="button" className="cat-trigger" aria-label="Open garden guide" aria-haspopup="dialog" aria-expanded={open} onClick={show} onPointerEnter={event => setReaction(event.clientX < event.currentTarget.getBoundingClientRect().left + event.currentTarget.offsetWidth / 2 ? 'left' : 'right')} onPointerLeave={() => setReaction(null)} onFocus={() => setReaction('alert')} onBlur={() => setReaction(null)}>
      {!failed && <CatSprite pose={pose} onFailure={() => setFailed(true)} />}<span className="cat-label">Garden guide</span>
    </button>
    <dialog ref={dialog} className="cat-shortcuts" aria-labelledby="cat-guide-title" onClose={() => { setOpen(false); setReaction(null); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="cat-menu-heading"><h2 id="cat-guide-title">Where shall we wander?</h2><button type="button" onClick={close} aria-label="Close garden guide">×</button></div>
      <nav aria-label="Garden guide">{portfolioGuide.destinations().map(destination => <a key={destination.id} href={`${isHome ? '' : '/'}#${destination.id}`} onClick={event => navigate(event, destination.id)}><span>{destination.label}</span><span>{destination.place}</span></a>)}</nav>
    </dialog>
  </div>;
}
