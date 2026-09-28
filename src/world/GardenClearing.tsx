import { GateCat } from '../character/WizardCat';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../content/profile';
import { usePreferences } from '../preferences/PreferencesProvider';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function GardenClearing() {
  const { preferences, reducedMotion } = usePreferences();
  const journey = useRef<HTMLElement>(null);
  const [reading, setReading] = useState(false);
  const [artFailed, setArtFailed] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  useEffect(() => { setReading(new URLSearchParams(location.search).get('view') === 'read'); }, []);
  const still = reducedMotion || preferences.effectsPaused || preferences.quality === 'low';

  useEffect(() => {
    const element = journey.current;
    if (!element || reading || still || artFailed) return;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const progress = clamp(-element.getBoundingClientRect().top / Math.max(1, element.offsetHeight - window.innerHeight));
      const opening = clamp((progress - .06) / .43);
      const travel = clamp((progress - .36) / .34);
      const reveal = clamp((progress - .65) / .19);
      element.style.setProperty('--gate-angle', `${opening * 84}deg`);
      element.style.setProperty('--gate-scale', `${1 + travel * .55}`);
      element.style.setProperty('--gate-fade', `${1 - clamp((progress - .5) / .2)}`);
      element.style.setProperty('--scene-scale', `${1 + travel * .15}`);
      element.style.setProperty('--leaves-scale', `${1 + travel * .3}`);
      element.style.setProperty('--reveal', `${reveal}`);
      element.style.setProperty('--copy-lift', `${(1 - reveal) * 32}px`);
      element.style.setProperty('--shade', `${reveal * .86}`);
      element.style.setProperty('--hint', `${1 - clamp(progress / .12)}`);
      element.dataset.revealed = String(progress >= .66);
      setGateVisible(progress < .7);
    };
    const schedule = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(draw); };
    draw();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [reading, still, artFailed]);

  return <section ref={journey} id="home" className={`garden-journey ${still ? 'journey-still' : ''} ${reading ? 'journey-reader' : ''} ${artFailed ? 'journey-fallback' : ''}`} aria-labelledby="name">
    <noscript><style>{`.garden-journey{height:auto!important}.journey-surface{height:auto!important;position:relative!important}.journey-scenery{position:relative!important;height:100svh}.journey-identity{position:relative!important;top:auto!important;left:auto!important;right:auto!important;width:min(1160px,calc(100% - 48px));margin:auto;opacity:1!important;visibility:visible!important;transform:none!important;padding-block:80px!important}.journey-cue{display:none}`}</style></noscript>
    <div className="journey-surface">
      <div className="journey-scenery" aria-hidden="true">
        <img className="journey-landscape" src="/art/clearing.webp" width="768" height="512" fetchPriority="high" alt="" onError={() => setArtFailed(true)} />
        <div className="scroll-gate">
          <GateCat active={gateVisible} />
          <img className="scroll-post scroll-post-left" src="/art/gate.webp" width="420" height="280" alt="" onError={() => setArtFailed(true)} />
          <img className="scroll-post scroll-post-right" src="/art/gate.webp" width="420" height="280" alt="" />
          <div className="scroll-leaf scroll-leaf-left"><img src="/art/gate.webp" width="420" height="280" alt="" /></div>
          <div className="scroll-leaf scroll-leaf-right"><img src="/art/gate.webp" width="420" height="280" alt="" /></div>
        </div>
        <img className="journey-leaves" src="/art/foreground.webp" width="512" height="342" alt="" />
        <div className="journey-shade" />
      </div>
      <p className="journey-cue">Scroll to enter <span aria-hidden="true">↓</span></p>
      <div className="journey-identity">
        <p className="clearing-kicker">Welcome to my garden.</p>
        <h1 id="name">Anshul<br /><span>Mehra.</span></h1>
        <p className="clearing-motto">creativity built<br />with <em>passion.</em></p>
        <p className="clearing-description">{profile.positioning}</p>
        <div className="clearing-actions"><a className="garden-primary" href="#work">Explore the work <span aria-hidden="true">↓</span></a><a href="#contact">Get in touch</a></div>
        <p className="journey-education">MITS Gwalior <span>·</span> AI & Data Science</p>
      </div>
    </div>
  </section>;
}
