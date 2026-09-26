import { GithubIcon } from "./GithubIcon";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-muted sm:flex-row sm:px-8">
      <p className="font-serif text-base text-text">cssframes</p>
      <nav className="flex items-center gap-6">
        <a
          href="#library"
          className="text-xs uppercase tracking-wide transition-colors hover:text-text"
        >
          Animations
        </a>
        <a
          href="#usage"
          className="text-xs uppercase tracking-wide transition-colors hover:text-text"
        >
          How to use
        </a>
        <a
          href="https://github.com/bilalmlkdev/cssframes"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs uppercase tracking-wide transition-colors hover:text-text"
        >
          <GithubIcon size={13} />
          GitHub
        </a>
      </nav>
      <p className="text-xs">
        MIT licensed - built by Bilal Malik
      </p>
    </footer>
  );
}
