// Sets document.title and the meta description for the current route.
import { useEffect } from "react";

export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const el = document.querySelector('meta[name="description"]');
      if (el) el.setAttribute("content", description);
    }
  }, [title, description]);
}
