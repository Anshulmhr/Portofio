import { useState } from 'react';
import { profile, socials } from '../content/profile';

export function ContactDetails() {
  const [message, setMessage] = useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setMessage('Email address copied.'); }
    catch { setMessage('Copy is unavailable. You can select the email address or open the email link.'); }
  }
  return <>
    <p className="contact-intro">A conversation starts here.</p>
    <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
    <div className="contact-actions"><button className="text-button" onClick={copyEmail}>Copy email</button>{socials.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label} <span aria-hidden="true">↗</span></a>)}</div>
    <p className="copy-status" role="status" aria-live="polite">{message}</p>
  </>;
}
