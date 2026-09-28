import { Layout } from '../components/Layout';
export function NotFoundPage() {
  return <Layout><main id="main" className="wrap not-found" tabIndex={-1}><p className="eyebrow">404 / A path ends here</p><h1>This page isn’t in the garden.</h1><p>The address may have changed.</p><a className="primary-link" href="/">Return to the entrance →</a></main></Layout>;
}
