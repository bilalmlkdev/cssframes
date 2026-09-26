// Writes the shipped stylesheet to cssframes.css at the repo root.
// Same source of truth as the site: src/lib/css.js buildCss().
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildCss } from "../src/lib/css.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "cssframes.css");

writeFileSync(out, buildCss(), "utf8");
console.log(`wrote ${out}`);
