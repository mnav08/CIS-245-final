import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "../..");

export function loadBrowserScript(relativePath) {
  const filePath = resolve(projectRoot, relativePath);
  const source = readFileSync(filePath, "utf8");
  const rewrittenSource = source.replace(
    /^const\s+([A-Za-z0-9_$]+)\s*=/m,
    "window.$1 ="
  );

  window.eval(rewrittenSource);
}
