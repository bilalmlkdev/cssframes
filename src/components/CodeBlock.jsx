import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useDarkMode } from "../lib/useDarkMode";

export function HighlightedPre({ code, lang = "jsx", maxH }) {
  const dark = useDarkMode();

  return (
    <Highlight
      code={code.replace(/\n$/, "")}
      language={lang}
      theme={dark ? themes.vsDark : themes.vsLight}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, background: "transparent" }}
          className={`overflow-auto rounded-lg border border-border bg-code-bg p-5 font-mono text-sm leading-relaxed ${maxH || ""}`}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export function CodeBlock({ code, lang, copied, onCopy, maxH }) {
  return (
    <div className="relative">
      <HighlightedPre code={code} lang={lang} maxH={maxH} />
      <span className="absolute right-2 top-2">
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center text-[11px] text-code-text/80 "
        >
          {copied ? (
            <>
              <Check size={14} />
            </>
          ) : (
            <>
              <Copy size={14} />
            </>
          )}
        </button>
      </span>
    </div>
  );
}
