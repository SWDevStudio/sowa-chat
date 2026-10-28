import fs from "node:fs";
import path from "node:path";

export function packageDirOf(workspaceRoot, file) {
  let dir = path.dirname(path.join(workspaceRoot, file));
  while (dir.startsWith(workspaceRoot) && dir !== workspaceRoot) {
    if (fs.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return null;
}

export function groupByPackage(workspaceRoot, files) {
  const groups = new Map();
  for (const file of files) {
    const packageDir = packageDirOf(workspaceRoot, file);
    if (packageDir) {
      const relativeFile = path.relative(packageDir, path.join(workspaceRoot, file));
      groups.set(packageDir, [...(groups.get(packageDir) ?? []), relativeFile]);
    }
  }
  return groups;
}

export function hasScript(packageDir, scriptName) {
  const manifest = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf8"));
  return Boolean(manifest.scripts?.[scriptName]);
}
