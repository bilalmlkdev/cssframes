import { ArrowUpRight } from "lucide-react";
import { REPO_URL, X_URL } from "../../data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mono-label">Open source, by design</p>
            <h2 className="mt-5 max-w-[12ch] font-heading text-[clamp(3.2rem,6vw,6rem)] font-light leading-[0.9] tracking-[-0.05em]">
              Bring motion back to CSS.
            </h2>
          </div>

          <div className="lg:max-w-[380px]">
            <p className="text-[14px] leading-[1.75] text-muted">
              cssframes is an open-source project by{" "}
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                Bilal Malik
              </a>
              . Built with React, Vite, and Tailwind CSS. The animation source is
              kept in one data file so the docs, previews, and generated
              stylesheet stay in sync.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px]">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5"
              >
                GitHub
                <ArrowUpRight
                  size={12}
                  className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                Contribute
              </a>
              <a
                href={`${REPO_URL}/releases`}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                Changelog
              </a>
            </div>
          </div>
        </div>

        <div className="mt-18 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          <span>cssframes</span>
          <span>Pure CSS / MIT / 2026</span>
        </div>
      </div>
    </footer>
  );
}
