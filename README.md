# Anshul Mehra — The Mystic Garden

The complete approved Phase 4 portfolio source. React 19, TypeScript, Vite 8 and Tailwind CSS 4, with server rendering at build time to static HTML. The opening garden, initially locked gate, scroll-driven opening and name reveal, sections, wizard cat guide, preferences and responsive behavior are preserved from the current website.

## Run locally

Use Node.js 24 and npm.

```sh
npm install
npm run dev
```

Open http://localhost:4173. For a reproducible installation use `npm ci` instead of `npm install`.

```sh
npm run build
npm test
```

The build type-checks the project, builds the browser and server-rendering bundles, then prerenders the pages into `dist/`. `npm test` checks the built output and content foundation. `npm run check` runs TypeScript separately.

## Deploy

Install dependencies with `npm ci`, run `npm run build`, and publish `dist/` with a static host supporting directory indexes and `404.html`. No server process, database, API key or paid service is required. For Vercel or Netlify, use build command `npm run build` and output directory `dist`. Assets and icons are local; typography uses system fonts. Do not replace the prerendered project routes with a blanket home-page rewrite.

## Environment and editorial status

No environment variables are required to reproduce the current website. `.env.example` documents the optional Vite settings. The default `VITE_CONTENT_MODE=preview` preserves draft labels, noindex metadata and disallow-all robots behavior. This is editorial preview mode, not access control.

A later editorial release requires approved content, `VITE_CONTENT_MODE=published`, and `VITE_SITE_ORIGIN` set to the final HTTPS origin. Supply these as build-process environment variables. `npm run check:release` intentionally rejects incomplete editorial content. Migration does not change that existing release gate.

## Source structure

- `src/world/`: garden scene and shared section destinations.
- `src/character/`: wizard cat artwork states and guide interactions.
- `src/pages/`, `src/components/`: semantic pages, navigation and shared components.
- `src/content/`: typed portfolio content and validation.
- `src/preferences/`: local preferences and reduced-motion behavior.
- `src/styles.css`: all responsive styling and animation.
- `src/entry-client.tsx`, `src/entry-server.tsx`: hydration and prerendering.
- `public/`: original runtime artwork, icons and public files.
- `scripts/`: build verification, prerendering and optional artwork tooling.
- `docs/`: phase notes, art prompts, review captures and original cat artwork master.

The optional `scripts/export-cat-art.py` artwork authoring tool uses Python and Pillow; neither is needed to install, run or build the website.

## Source of truth

https://github.com/Anshulmhr/Portofio, branch `main`, is canonical. Start future work from its latest version, make and test requested changes, verify the production build, commit clearly and push completed work here. Hosting previews are deployment targets, not a separate source of truth.

The initial migration preserves application code, runtime assets and dependency configuration byte for byte. Only documentation, repository hygiene and workflow instructions were added or updated. The environment-specific `.openai/hosting.json` from the previous hosting workspace is excluded; it is not needed to run or deploy the project independently.
