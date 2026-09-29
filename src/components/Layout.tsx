import { WizardCat } from '../character/WizardCat';
import type { ReactNode } from 'react';
import { GardenNavigation } from '../world/GardenNavigation';
import { socials } from '../content/profile';
import { PreferencesControl } from './PreferencesControl';

export function Layout({ children, isHome = false, entrance }: { children: ReactNode; isHome?: boolean; entrance?: ReactNode }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    {entrance}
    <header className="site-header wrap">
      <a className="wordmark" href="/" aria-label="Anshul Mehra, home"><span className="monogram" aria-hidden="true">am.</span><span>THE MYSTIC<br />GARDEN</span></a>
      <div className="header-right"><a className="reading-link" href="/?view=read">Reading mode</a><PreferencesControl /></div>
    </header>
    <GardenNavigation isHome={isHome} />
    {children}
    <WizardCat isHome={isHome} />
    <footer className="site-footer wrap">
      <p>Anshul Mehra <span aria-hidden="true">/</span> India</p>
      <div>{socials.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label} <span aria-hidden="true">↗</span></a>)}</div>
      <a href={isHome ? '#home' : '/'}>Back to the entrance <span aria-hidden="true">↑</span></a>
    </footer>
  </>;
}
