import type { ReactNode } from 'react';

export function Section({ id, index, title, place, children }: { id: string; index: string; title: string; place: string; children: ReactNode }) {
  return <section tabIndex={-1} id={id} className="content-section" aria-labelledby={`${id}-heading`}>
    <div className="section-heading"><span className="eyebrow">{index} / {place}</span><h2 id={`${id}-heading`}>{title}</h2></div>
    <div className="section-content">{children}</div>
  </section>;
}
