import { Prism } from "prism-react-renderer";

// prismjs component scripts expect a global Prism. This module must be
// imported before them so the assignment runs first (static imports
// evaluate in declaration order).
globalThis.Prism = Prism;
