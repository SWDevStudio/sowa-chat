import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const LINTABLE = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"]);

const root = path.resolve(process.env.CLAUDE_PROJECT_DIR ?? process.cwd());

function isInsideRoot(target) {
  const relative = path.relative(root, target);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

function readStdin() {
  try {
    return JSON.parse(readFileSync(0, "utf8"));
  } catch {
    return {};
  }
}

function runRootBin(pkgName, args) {
  const require = createRequire(path.join(root, "package.json"));
  let pkgJsonPath;
  try {
    pkgJsonPath = require.resolve(`${pkgName}/package.json`);
  } catch {
    return;
  }
  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
  const bin = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.[pkgName];
  if (!bin) return;
  spawnSync(process.execPath, [path.resolve(path.dirname(pkgJsonPath), bin), ...args], {
    cwd: root,
    stdio: "ignore",
  });
}

async function formatWithPrettier(file) {
  const require = createRequire(path.join(root, "package.json"));
  const loaded = await import(pathToFileURL(require.resolve("prettier")).href);
  const prettier = loaded.default ?? loaded;
  const info = await prettier.getFileInfo(file, {
    ignorePath: [path.join(root, ".prettierignore"), path.join(root, ".gitignore")],
    resolveConfig: true,
  });
  if (info.ignored || !info.inferredParser) return;
  const source = readFileSync(file, "utf8");
  const config = (await prettier.resolveConfig(file)) ?? {};
  const formatted = await prettier.format(source, { ...config, filepath: file });
  if (formatted !== source) writeFileSync(file, formatted);
}

function normalizeLineEndings(file) {
  const source = readFileSync(file, "utf8");
  if (source.includes("\r\n")) writeFileSync(file, source.replaceAll("\r\n", "\n"));
}

async function formatFile(file) {
  if (LINTABLE.has(path.extname(file))) {
    runRootBin("oxlint", ["--fix", file]);
  }
  await formatWithPrettier(file);
  normalizeLineEndings(file);
}

try {
  const input = readStdin();
  const raw = input.tool_input?.file_path;
  if (raw) {
    const file = path.resolve(root, raw);
    if (file !== root && isInsideRoot(file) && existsSync(file)) {
      await formatFile(file);
    }
  }
} catch (error) {
  console.error(`format hook: ${error.message}`);
}
process.exit(0);
