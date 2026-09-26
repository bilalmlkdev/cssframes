import { animations } from "../lib/animations";
import { GithubIcon } from "./GithubIcon";

export function Hero() {
  return (
    <section id="top" className="flex flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-24">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {animations.length} animations for beautiful,
        <br className="hidden sm:block" /> animated interfaces, faster.
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Pure CSS keyframes, no JavaScript. Easy copy-paste. Lightweight. Open
        source. Built for engineers and designers.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#library"
          className="flex items-center gap-2 rounded-lg bg-surface-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-border"
        >
          Browse animations
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href="https://github.com/bilalmlkdev/cssframes"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          <GithubIcon size={16} />
          Star on GitHub
        </a>
      </div>

      <p className="mt-12 text-sm text-muted">
        Free and open source, released under the MIT license.
      </p>
    </section>
  );
}
