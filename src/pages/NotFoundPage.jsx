export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-text">
      <p className="mono-label">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        This page does not exist. The link may be old, or the animation slug
        is wrong.
      </p>
      <a
        href="#/"
        className="mt-8 rounded-lg bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        Back home
      </a>
    </div>
  );
}
