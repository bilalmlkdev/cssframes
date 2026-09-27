export function MotionTimeline({ settings }) {
  const duration = Math.max(100, settings.duration);
  const delay = Math.max(0, settings.delay);
  const total = duration + delay;
  const delayWidth = Math.min(70, (delay / total) * 100);
  const durationWidth = Math.max(10, (duration / total) * 100);
  return (
    <div className="mt-3 rounded-lg border border-border bg-surface px-4 py-3">
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-muted">
        <span>Timeline</span>
        <span>{settings.duration}ms duration · {settings.delay}ms delay</span>
      </div>
      <div className="relative h-7 overflow-hidden rounded-md bg-surface-2">
        <div className="absolute inset-y-1 rounded border border-dashed border-border" style={{ left: `${delayWidth}%`, width: `${durationWidth}%` }} />
        <div className="absolute inset-y-1 rounded bg-text/10" style={{ left: `${delayWidth}%`, width: `${durationWidth}%` }} />
        <div className="absolute inset-y-0 flex items-center text-[10px] text-muted" style={{ left: `${Math.min(92, delayWidth + durationWidth / 2)}%` }}>
          {settings.iteration === "infinite" ? "∞ loop" : `${settings.iteration}×`}
        </div>
      </div>
      <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
        <span>0ms</span>
        <span>{delay}ms delay</span>
        <span>{total}ms</span>
      </div>
    </div>
  );
}
