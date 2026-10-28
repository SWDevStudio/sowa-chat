import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { databaseMigrations } from "./database-migrations.js";

const migrationsDirectory = join(dirname(fileURLToPath(import.meta.url)), "migrations");

const migrationFiles = readdirSync(migrationsDirectory).filter(
  (file) => file.endsWith(".ts") && !file.endsWith(".spec.ts"),
);

describe("databaseMigrations", () => {
  it("is an array", () => {
    expect(Array.isArray(databaseMigrations)).toBe(true);
  });

  it("has no duplicate classes", () => {
    expect(new Set(databaseMigrations).size).toBe(databaseMigrations.length);
  });

  it("keeps the migrations folder in git through .gitkeep", () => {
    expect(readdirSync(migrationsDirectory)).toContain(".gitkeep");
  });

  it.each(migrationFiles)("lists every class exported from %s", async (file) => {
    const module: Record<string, unknown> = await import(`./migrations/${file}`);
    const classes = Object.values(module).filter((value) => typeof value === "function");

    expect(classes.length).toBeGreaterThan(0);
    for (const migrationClass of classes) {
      expect(databaseMigrations).toContain(migrationClass);
    }
  });
});
