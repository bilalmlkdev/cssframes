import { useState } from "react";
import { copyText } from "../lib/copy";

// Clipboard copy with a transient "copied" key for the calling UI.
export function useCopy() {
  const [copiedKey, setCopiedKey] = useState(null);

  const doCopy = async (text, key) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    }
  };

  return { copiedKey, doCopy };
}
