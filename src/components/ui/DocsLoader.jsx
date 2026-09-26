import { Logo } from "./Logo";

export function DocsLoader() {
  return (
    <div
      role="status"
      aria-label="Loading documentation"
      className="docs-loader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-background text-text"
    >
      <Logo className="h-11 w-auto" />
      <div className="h-[2px] w-28 overflow-hidden rounded-full bg-border">
        <div className="h-full w-2/5 rounded-full bg-text animate-[loader-slide_0.9s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
