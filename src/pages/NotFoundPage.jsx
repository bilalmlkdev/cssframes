import { Logo } from "../components/ui/Logo";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function NotFoundPage() {
  useDocumentMeta(
    "Page not found - cssframes",
    "This page does not exist. The link may be old, or the animation slug is wrong.",
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center text-text">
      <Logo className="h-10 w-auto text-muted" />

      <p className="mono-label mt-10">Error 404</p>
      <h1 className="mt-4 text-5xl font-medium tracking-[-2px] sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        This page does not exist. The link may be old, or the animation slug is
        wrong.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#/"
          className="rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background shadow-xs transition-opacity hover:opacity-80"
        >
          Back home
        </a>
        <a
          href="#/animations"
          className="rounded-lg bg-border px-4 py-2.5 text-sm font-medium text-text shadow-xs transition-colors hover:bg-surface-2"
        >
          Browse animations
        </a>
      </div>

      <p className="mt-12 max-w-sm text-sm leading-relaxed text-muted">
        Looking for a specific animation? Press{" "}
        <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px]">
          ⌘ K
        </kbd>{" "}
        to search from anywhere.
      </p>
    </div>
  );
}
