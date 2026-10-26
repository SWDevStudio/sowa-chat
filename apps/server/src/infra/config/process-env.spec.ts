import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

const sourceDirectory = resolve(import.meta.dirname, "../..");
const configDirectory = join("infra", "config") + sep;

function sourceFiles(): string[] {
  return readdirSync(sourceDirectory, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".ts"))
    .map((file) => join(sourceDirectory, file));
}

function filesReadingProcessEnv(): string[] {
  return sourceFiles()
    .filter((file) => readFileSync(file, "utf8").includes("process.env"))
    .map((file) => relative(sourceDirectory, file));
}

describe("доступ к process.env", () => {
  it("есть только в модуле конфигурации", () => {
    const outsideConfig = filesReadingProcessEnv().filter(
      (file) => !file.startsWith(configDirectory),
    );

    expect(outsideConfig).toEqual([]);
  });
});
