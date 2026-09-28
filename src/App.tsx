import { PreferencesProvider } from './preferences/PreferencesProvider';
import { ReaderPage } from './pages/ReaderPage';
import { ProjectPage } from './pages/ProjectPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { resolveRoute } from './routes';

export function App({ pathname }: { pathname: string }) {
  const route = resolveRoute(pathname);
  return <PreferencesProvider>{route.type === 'home' ? <ReaderPage /> : route.type === 'project' ? <ProjectPage project={route.project} /> : <NotFoundPage />}</PreferencesProvider>;
}
