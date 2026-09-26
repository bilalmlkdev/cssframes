export function Pager({ prev, next }) {
  return (
    <nav aria-label="Pagination" className="mt-14 flex justify-between gap-4">
      {prev ? (
        <a
          href={prev.href}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 shadow-xs text-sm transition-colors hover:bg-surface-2"
        >
          &lt; {prev.label}
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a
          href={next.href}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 shadow-xs text-sm transition-colors hover:bg-surface-2"
        >
          {next.label} &gt;
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
