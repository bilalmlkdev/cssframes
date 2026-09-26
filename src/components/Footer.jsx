import favicon from "../assets/favicon/favicon.svg";
import { GithubIcon } from "./GithubIcon";

function XIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  );
}

const REPO = "https://github.com/bilalmlkdev/cssframes";

export function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center px-4 pt-16 leading-[0.80]">
        <h1 className="text-[13vw] font-medium tracking-tight sm:text-[110px] lg:text-[139px]">
          Make it move.
        </h1>
        <div className="flex items-center">
          <span className="relative top-1 text-[13vw] font-medium tracking-tight sm:text-[110px] lg:text-[139px]">
            pure
          </span>
          <div className="mx-4 flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-[26px] bg-accent shadow-xs sm:mx-7 sm:h-[120px] sm:w-[120px] sm:rounded-[32px] lg:h-[156px] lg:w-[156px] lg:rounded-[40px]">
            <img
              src={favicon}
              alt=""
              className="h-[50px] w-[50px] dark:invert sm:h-[66px] sm:w-[66px] lg:h-[86px] lg:w-[86px]"
            />
          </div>
          <span className="text-[13vw] font-medium sm:text-[110px] lg:text-[139px]">
            CSS.
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <p className="text-2xl text-muted">Product</p>
          <ul className="mt-3 space-y-2.5">
            {[
              { to: "#/animations", label: "Animations", dot: "bg-text" },
              { to: REPO, label: "GitHub", dot: "bg-cyan-400" },
              {
                to: `${REPO}/blob/main/LICENSE`,
                label: "License",
                dot: "bg-amber-400",
              },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.to}
                  className="flex items-center gap-2.5 text-[15px] font-bold hover:opacity-60"
                >
                  <span className={`h-4 w-4 rounded-full ${l.dot}`} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-2xl text-muted">Resources</p>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-bold hover:opacity-60"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={`${REPO}/issues`}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-bold hover:opacity-60"
              >
                Issues
              </a>
            </li>
            <li>
              <a
                href={`${REPO}/releases`}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] font-bold hover:opacity-60"
              >
                Releases
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-2xl text-muted">Follow us</p>
          <div className="mt-3 flex gap-2">
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-surface-2"
              title="GitHub"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href="https://x.com/bilalmlkdev"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-surface-2"
              title="X / Twitter"
            >
              <XIcon size={15} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xl leading-tight text-muted">
            cssframes is an open-source collection of pure CSS keyframe
            animations - preview every one live, copy the CSS, and paste it
            straight into your project.
          </p>
          <p className="mt-4 flex items-center gap-2 text-base">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent">
              <img
                src={favicon}
                alt=""
                className="h-[13px] w-[13px] dark:invert"
              />
            </span>
            By Bilal Malik
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="select-none overflow-hidden px-4 pt-10">
        <div className="-mb-[0.18em] text-center text-[18vw] font-bold leading-[0.75] tracking-[-0.05em] text-text">
          cssframes
        </div>
      </div>
    </footer>
  );
}
