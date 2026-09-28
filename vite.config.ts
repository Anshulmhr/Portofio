import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  appType: 'custom',
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-html',
    configureServer(server) {
      return () => server.middlewares.use(async (req, res, next) => {
        if (!req.headers.accept?.includes('text/html')) return next();
        try {
          const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
          const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
          const result = render(pathname);
          const template = await server.transformIndexHtml(req.url ?? '/', await readFile('index.html', 'utf8'));
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(template.replace('<!--app-head-->', result.head).replace('<!--app-html-->', result.html));
        } catch (error) { next(error); }
      });
    }
  }],
  server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
  build: { outDir: 'dist', emptyOutDir: true }
});
