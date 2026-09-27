function sanitizeHtml(html) {
  if (typeof document === "undefined") return "";
  const template = document.createElement("template");
  template.innerHTML = html;
  const blocked = new Set([
    "SCRIPT",
    "STYLE",
    "IFRAME",
    "OBJECT",
    "EMBED",
    "LINK",
    "META",
  ]);

  const walk = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (blocked.has(node.tagName)) {
        node.remove();
        return;
      }
      [...node.attributes].forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        const value = attribute.value.trim().toLowerCase();
        if (
          name.startsWith("on") ||
          ((name === "href" || name === "src") &&
            /^(javascript:|data:)/.test(value))
        ) {
          node.removeAttribute(attribute.name);
        }
      });
    }
    [...node.childNodes].forEach(walk);
  };

  [...template.content.childNodes].forEach(walk);
  return template.innerHTML;
}

export function MotionTarget({ target, text, customHtml = "" }) {
  if (target === "custom") {
    const safe = sanitizeHtml(customHtml);
    return safe ? (
      <div dangerouslySetInnerHTML={{ __html: safe }} />
    ) : (
      <div className="rounded-xl border border-dashed border-border px-5 py-4 text-sm text-muted">
        Add HTML in the custom target field.
      </div>
    );
  }

  if (target === "button") {
    return (
      <button
        type="button"
        className="rounded-xl bg-text px-6 py-3 text-sm font-medium text-background"
      >
        {text || "Try it"}
      </button>
    );
  }

  if (target === "card") {
    return (
      <div className="w-64 rounded-2xl border border-border bg-background p-5 text-left shadow-sm">
        <div className="mb-6 h-2 w-16 rounded bg-text" />
        <p className="text-sm font-medium">Product motion</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Small movement, obvious intent.
        </p>
      </div>
    );
  }

  if (target === "heading") {
    return (
      <span className="max-w-xl text-center text-3xl font-heading font-light tracking-tight sm:text-5xl">
        {text || "Motion that feels intentional"}
      </span>
    );
  }

  if (target === "input") {
    return (
      <div className="w-72 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted">
        {text || "Type something..."}
      </div>
    );
  }

  if (target === "notice") {
    return (
      <div className="flex max-w-md items-start gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-text" />
        <div>
          <p className="text-sm font-medium">Animation ready</p>
          <p className="mt-0.5 text-xs text-muted">
            Copy the tuned motion directly into your UI.
          </p>
        </div>
      </div>
    );
  }

  if (target === "avatar") {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-2 text-lg font-medium">
        BM
      </div>
    );
  }

  return <div className="h-20 w-20 rounded-3xl bg-text" aria-hidden="true" />;
}
