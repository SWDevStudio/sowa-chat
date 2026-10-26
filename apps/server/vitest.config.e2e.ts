import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";
import { defineConfig } from "vitest/config";

const testEnv = parseEnv(readFileSync(join(import.meta.dirname, ".env.test"), "utf8"));

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: "./",
    include: ["**/*.e2e-spec.ts"],
    fileParallelism: false,
    env: testEnv,
  },
});
