import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "visitor/index": "src/visitor/index.ts",
    "operator/index": "src/operator/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  fixedExtension: false,
  clean: true,
});
