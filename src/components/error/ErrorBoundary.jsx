import { Component } from "react";

// Catches render/runtime errors anywhere in the tree and shows a tight,
// calm fallback instead of a blank page.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-text">
        <div className="w-full max-w-sm rounded-2xl bg-surface p-8 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-6px_rgba(0,0,0,0.08)]">
          <p className="mono-label">Error</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">
            Something broke
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The page hit an unexpected error. Reload it, or head back home.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-text px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Reload
            </button>
            <button
              type="button"
              onClick={() => {
                this.setState({ error: null });
                window.location.hash = "#/";
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              Go home
            </button>
          </div>
          <p className="mt-6 break-all font-mono text-[11px] text-muted">
            {String(error.message || error)}
          </p>
        </div>
      </div>
    );
  }
}
