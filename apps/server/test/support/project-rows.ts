import { createHash } from "node:crypto";
import type { DataSource } from "typeorm";
import type { CreateProjectInput } from "../../src/domain/projects/projects.service.js";

export interface ProjectRow {
  id: string;
  name: string;
  public_key: string | null;
  allowed_origins: string;
  operator_allowed_origins: string;
}

export function sha256(text: string): Buffer {
  return createHash("sha256").update(text).digest();
}

export function mainProjectInput(overrides: Partial<CreateProjectInput> = {}): CreateProjectInput {
  return {
    name: "main",
    allowedOrigins: ["https://Shop.Example.com/"],
    operatorAllowedOrigins: [],
    actorKind: "cli",
    ...overrides,
  };
}

export function projectRows(dataSource: DataSource): Promise<ProjectRow[]> {
  return dataSource.query(
    `SELECT "id", "name", "public_key", "allowed_origins"::text AS "allowed_origins",
            "operator_allowed_origins"::text AS "operator_allowed_origins"
       FROM "projects"
      ORDER BY "name"`,
  );
}

export async function allRowsAsText(dataSource: DataSource): Promise<string> {
  const tables: { tablename: string }[] = await dataSource.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
  );
  const texts: string[] = [];
  for (const { tablename } of tables) {
    const rows: { row: string }[] = await dataSource.query(
      `SELECT row_to_json(t)::text AS "row" FROM "${tablename}" t`,
    );
    texts.push(...rows.map((entry) => entry.row));
  }
  return texts.join("\n");
}
