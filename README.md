<div align="center">

  <a href="https://cssframes.vercel.app/">
    <img src="./src/assets/favicon/favicon.svg" alt="cssframes logo" width="90" height="90">
  </a>

# cssframes

**45 pure CSS keyframe animations you can preview, copy, and paste.**
No JavaScript runs your motion. No package to install. Free and open source.

[![Live Demo](https://img.shields.io/badge/live_demo-visit_site-black?style=for-the-badge)](https://cssframes.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/cssframes?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/cssframes)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

## Why cssframes

- **Pure CSS.** Every animation is a `@keyframes` rule and a class. No JavaScript library, no runtime.
- **Copy and paste.** Preview any animation on the site, copy its CSS, and drop it into your project. There is no package to install.
- **Fully customizable.** Duration, delay, and iteration live in CSS variables, so you tune motion per element.
- **Reduced motion ready.** The stylesheet ships with a `prefers-reduced-motion` media query that turns the whole library off.
- **Framework friendly.** Works in React, Next.js, Vue, Svelte, or plain HTML. If it runs CSS, it runs cssframes.

## Installation

Download [`cssframes.css`](https://raw.githubusercontent.com/bilalmlkdev/cssframes/main/cssframes.css) from the repository, or copy any single animation's CSS from the docs.

Then link it:

```html
<link rel="stylesheet" href="cssframes.css" />
```

Or paste the contents into a stylesheet you already have.

## Usage

Add two classes: `cf-animated` turns the element on, and an animation class picks the motion.

```html
<div class="cf-animated cf-zoom-in">Hello</div>
```

Tune it with CSS variables:

```css
.cf-animated.cf-zoom-in {
  --cf-duration: 900ms;
  --cf-delay: 0.2s;
  --cf-iteration: 1;
}
```

## Animations

45 animations across 5 categories: Entrances, Exits, Attention, Loops, and Text. Browse them all at [cssframes.vercel.app](https://cssframes.vercel.app/#/animations).

## Local development

```bash
git clone https://github.com/bilalmlkdev/cssframes.git
cd cssframes
npm install
npm run dev
```

Available scripts:

- `npm run dev` starts the Vite dev server.
- `npm run build` generates `cssframes.css` and builds the static site.
- `npm run css` regenerates `cssframes.css` only.
- `npm run lint` runs ESLint.
- `npm test` runs the test suite with the Node test runner.

## Accessibility

Animations are disabled automatically for anyone whose system asks for reduced motion, both in the shipped stylesheet and across this site's own interface.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for the workflow and animation guidelines, then open an issue or pull request on [GitHub](https://github.com/bilalmlkdev/cssframes).

## Author

Built by **Bilal Malik** - [GitHub](https://github.com/bilalmlkdev) / [X](https://x.com/bilalmlkdev).

## License

[MIT](./LICENSE) - free for personal and commercial use.
