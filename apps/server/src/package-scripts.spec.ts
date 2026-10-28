import { readFileSync } from "node:fs";

const packageJson: { scripts: Record<string, string> } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

describe("package.json migration scripts", () => {
  it("builds and generates from dist/data-source.js with the env file", () => {
    const script = packageJson.scripts["migration:generate"];

    expect(script).toContain("nest build");
    expect(script).toContain("--env-file-if-exists=.env");
    expect(script).toContain("migration:generate");
    expect(script).toContain("-d dist/data-source.js");
  });

  it("creates migrations through the TypeORM CLI", () => {
    expect(packageJson.scripts["migration:create"]).toContain("typeorm/cli.js migration:create");
  });

  it("does not run the CLI on ts sources", () => {
    expect(packageJson.scripts["migration:generate"]).not.toContain("ts-node");
    expect(packageJson.scripts["migration:create"]).not.toContain("ts-node");
  });
});
