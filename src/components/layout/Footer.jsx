import { REPO_URL, X_URL } from "../../data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Ruler ticks along the top edge */}
      <div
        aria-hidden="true"
        className="h-2.5 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 96px)",
        }}
      />

      <div className="flex flex-col gap-8 px-5 pb-14 pt-6 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <p className="text-5xl font-medium leading-none tracking-tight">
          cssframes
        </p>

        <div className="max-w-xl">
          <p className="text-sm leading-relaxed text-muted">
            cssframes is an open-source project by{" "}
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="text-text underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Bilal Malik
            </a>
            , built with{" "}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
              className="text-text underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              React
            </a>{" "}
            and{" "}
            <a
              href="https://vite.dev"
              target="_blank"
              rel="noreferrer"
              className="text-text underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Vite
            </a>
            , styled with{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className="text-text underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Tailwind CSS
            </a>
            , and hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="text-text underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Vercel
            </a>
            . Every animation is pure CSS, generated from a single data file,
            so the page and the copied code never drift. The font used is{" "}
            <a
              href="https://rsms.me/inter/"
              target="_blank"
              rel="noreferrer"
              className="text-text underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Inter
            </a>
            .
          </p>

          <p className="mt-5 flex flex-wrap gap-5 text-sm">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              GitHub
            </a>
            <a
              href={`${REPO_URL}/issues`}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Contribute
            </a>
            <a
              href={`${REPO_URL}/releases`}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Changelog
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
