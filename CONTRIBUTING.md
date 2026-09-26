# Contributing to cssframes

Thanks for wanting to improve cssframes. This document covers the workflow and the rules that keep the library consistent.

## Getting started

```bash
git clone https://github.com/bilalmlkdev/cssframes.git
cd cssframes
npm install
npm run dev
```

Run the full check before you push:

```bash
npm run lint
npm test
npm run build
```

All three must pass. CI runs the same commands on every pull request.

## Project layout

- `src/data/animations.js` - the library itself: every animation's metadata and `@keyframes` source live here. One source of truth.
- `src/lib/css.js` - `animCss()` and `buildCss()` turn that data into the shipped stylesheet.
- `scripts/build-css.mjs` - writes `cssframes.css` at the repo root. Runs automatically before `npm run build`.
- `src/components/` - `ui/` shared pieces, `layout/` shells, `home/` landing sections, `error/` fallbacks.
- `src/pages/` - route views.
- `test/` - Node test runner suites for the data, the CSS builders, and formatters.

## Adding an animation

1. Open `src/data/animations.js` and append an object to `animations`.
2. Use a lowercase kebab-case `slug`. The class becomes `cf-<slug>` and the keyframes must be named `cf-<slug>`.
3. Fill in every field: `slug`, `name`, `desc` (one sentence shown on the page), `category` (one of the five ids), `duration` in milliseconds, and the raw `keyframes` source.
4. Optional fields: `timing` (defaults to `ease-out`), `iteration` (only for loops), `classCss` (extra declarations such as `transform-origin`).
5. Run `npm test`. The data suite checks shape, uniqueness, category ids, and that the keyframes name matches the slug.
6. Run `npm run css` to regenerate `cssframes.css`.

## Editing the site

- Keep the visual language: pure black and white themes, Inter, no decorative colors.
- Commit messages follow the usual conventional style (`feat:`, `fix:`, `style:`, `docs:`, `test:`).
- Do not commit build output (`dist/`) or editor files.

## Pull requests

- Open an issue first for large changes (new categories, structure changes).
- One concern per pull request.
- Describe what changed and how you verified it (lint, test, build, and a manual check in the browser when the UI changes).

## Reporting bugs

Use the bug report template and include the animation slug (if relevant), your browser, and the steps to reproduce.

## License

By contributing you agree that your contributions are licensed under the MIT license, the same as the project.
