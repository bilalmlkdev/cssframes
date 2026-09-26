import { GithubIcon } from "./GithubIcon";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row">
        <p className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-accent text-[10px] font-bold text-accent-fg">
            C
          </span>
          cssframes - MIT licensed - built by Bilal Malik
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/bilalmlkdev/cssframes"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-text"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href="https://cssframes.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-text"
          >
            Live site
          </a>
        </div>
      </div>
    </footer>
  );
}
