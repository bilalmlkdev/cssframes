import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, copied, onCopy, maxH }) {
  return (
    <div className="relative">
      <pre
        className={`overflow-auto rounded-lg bg-code-bg px-4 py-3 font-mono text-xs leading-relaxed text-code-text ${maxH || ""}`}
      >
        {code}
      </pre>
      <span className="absolute right-2 top-2">
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/70 transition-colors hover:text-white"
        >
          {copied ? (
            <>
              <Check size={11} /> Copied
            </>
          ) : (
            <>
              <Copy size={11} /> Copy
            </>
          )}
        </button>
      </span>
    </div>
  );
}
