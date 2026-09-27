import { Component } from "react";
import { Check, Copy } from "lucide-react";
import { Logo } from "../ui/Logo";

// Catches render/runtime errors anywhere in the tree and shows a calm,
// designed fallback instead of a blank page.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, copied: false };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch() {
    document.title = "Something broke - cssframes";
  }

  copyError = async () => {
    const { error } = this.state;
    try {
      await navigator.clipboard.writeText(String(error?.message || error));
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  render() {
    const { error, copied } = this.state;
    if (!error) return this.props.children;

    const message = String(error?.message || error);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center text-text">
        <Logo className="h-10 w-auto text-muted" />

        <p className="mono-label mt-10">Error</p>
        <h1 className="mt-4 text-5xl font-medium tracking-[-2px] sm:text-6xl">
          Something broke
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
          The page hit an unexpected error. Reload it, head back home, or copy
          the details if you want to report the bug.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background shadow-xs transition-opacity hover:opacity-80"
          >
            Reload page
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ error: null });
              window.location.hash = "#/";
            }}
            className="rounded-lg bg-border px-4 py-2.5 text-sm font-medium text-text shadow-xs transition-colors hover:bg-surface-2"
          >
            Back home
          </button>
        </div>

        <div className="mt-10 w-full max-w-md">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-code-bg px-4 py-3 text-left">
            <code className="truncate font-mono text-xs text-code-text">
              {message}
            </code>
            <button
              type="button"
              onClick={this.copyError}
              aria-label={
                copied ? "Copied error message" : "Copy error message"
              }
              className="flex shrink-0 items-center gap-1 rounded-md border border-code-text/15 bg-code-text/10 px-2 py-1 text-[11px] text-code-text/80 transition-colors hover:text-code-text"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Report it on{" "}
            <a
              href="https://github.com/bilalmlkdev/cssframes/issues"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              GitHub
            </a>{" "}
            if it keeps happening.
          </p>
        </div>
      </div>
    );
  }
}
