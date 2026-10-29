import { getMetadataArgsStorage, type QueryRunner } from "typeorm";
import { describe, expect, it, vi } from "vitest";

import { databaseEntities } from "../../database-entities.js";
import { databaseMigrations } from "../../infra/database/database-migrations.js";
import { AddProjectsOperatorAllowedOrigins1793300003000 } from "../../infra/database/migrations/1793300003000-AddProjectsOperatorAllowedOrigins.js";
import { CreateOperators1793300003000 } from "../../infra/database/migrations/1793300003000-CreateOperators.js";
import { CreateVisitorSessions1793300004000 } from "../../infra/database/migrations/1793300004000-CreateVisitorSessions.js";
import { Operator } from "../operators/operator.entity.js";
import { Visitor } from "./visitor.entity.js";
import { VisitorSession } from "./visitor-session.entity.js";

const expectedColumns = [
  { property: "id", name: "id", type: "uuid", nullable: false },
  { property: "visitorId", name: "visitor_id", type: "uuid", nullable: false },
  { property: "familyId", name: "family_id", type: "uuid", nullable: false },
  { property: "refreshHash", name: "refresh_hash", type: "bytea", nullable: false },
  { property: "expiresAt", name: "expires_at", type: "timestamptz", nullable: false },
  { property: "usedAt", name: "used_at", type: "timestamptz", nullable: true },
  { property: "revokedAt", name: "revoked_at", type: "timestamptz", nullable: true },
];

const columns = () => getMetadataArgsStorage().filterColumns(VisitorSession);
const relations = () => getMetadataArgsStorage().filterRelations(VisitorSession);
const indices = () => getMetadataArgsStorage().filterIndices(VisitorSession);
const uniques = () => getMetadataArgsStorage().filterUniques(VisitorSession);

const findColumn = (property: string) =>
  columns().find((column) => column.propertyName === property);
const findRelation = (property: string) =>
  relations().find((relation) => relation.propertyName === property);
const findJoinColumn = (property: string) =>
  getMetadataArgsStorage().filterJoinColumns(VisitorSession, property)[0];

const normalizeSql = (sql: string) => sql.replace(/\s+/g, " ").trim();

const runMigration = async (method: "up" | "down") => {
  const query = vi.fn().mockResolvedValue(undefined);
  await new CreateVisitorSessions1793300004000()[method]({ query } as unknown as QueryRunner);
  return query.mock.calls.map(([sql]) => normalizeSql(sql as string));
};

describe("VisitorSession entity", () => {
  it("maps to the visitor_sessions table", () => {
    const table = getMetadataArgsStorage().tables.find((entry) => entry.target === VisitorSession);

    expect(table?.name).toBe("visitor_sessions");
  });

  it("has exactly 7 columns", () => {
    expect(columns()).toHaveLength(7);
  });

  it("does not declare unexpected columns", () => {
    const properties = columns()
      .map((column) => column.propertyName)
      .sort();

    expect(properties).toEqual(expectedColumns.map((column) => column.property).sort());
  });

  it.each(expectedColumns)(
    "column $property is stored as $name with type $type",
    ({ property, name, type }) => {
      const column = findColumn(property);

      expect(column).toBeDefined();
      expect(column?.options.name ?? column?.propertyName).toBe(name);
      expect(column?.options.type).toBe(type);
    },
  );

  it.each(expectedColumns)("column $property has nullable=$nullable", ({ property, nullable }) => {
    expect(findColumn(property)?.options.nullable === true).toBe(nullable);
  });

  it("makes nullable exactly used_at and revoked_at", () => {
    const nullableNames = columns()
      .filter((column) => column.options.nullable === true)
      .map((column) => column.options.name ?? column.propertyName)
      .sort();

    expect(nullableNames).toEqual(["revoked_at", "used_at"]);
  });

  it("has no created_at and updated_at columns", () => {
    const names = columns().map((column) => column.options.name ?? column.propertyName);

    expect(names).not.toContain("created_at");
    expect(names).not.toContain("updated_at");
    expect(names).not.toContain("createdAt");
    expect(names).not.toContain("updatedAt");
  });

  it("uses id as the primary column with uuidv7 default and explicit constraint name", () => {
    const id = findColumn("id");

    expect(id?.options.primary).toBe(true);
    expect(id?.options.primaryKeyConstraintName).toBe("PK_visitor_sessions");
    const defaultValue = id?.options.default;
    expect(typeof defaultValue).toBe("function");
    expect((defaultValue as () => string)()).toBe("uuidv7()");
  });

  it("has only id as the primary column", () => {
    const primary = columns().filter((column) => column.options.primary === true);

    expect(primary.map((column) => column.propertyName)).toEqual(["id"]);
  });

  describe("relations", () => {
    it("declares exactly one relation", () => {
      expect(relations()).toHaveLength(1);
    });

    it("visitor is a required many-to-one to Visitor with CASCADE", () => {
      const relation = findRelation("visitor");

      expect(relation?.relationType).toBe("many-to-one");
      expect((relation?.type as (() => unknown) | undefined)?.()).toBe(Visitor);
      expect(relation?.options.onDelete).toBe("CASCADE");
      expect(relation?.options.nullable).toBe(false);
    });

    it("visitor uses visitor_id join column with explicit foreign key name", () => {
      const joinColumn = findJoinColumn("visitor");

      expect(joinColumn?.name).toBe("visitor_id");
      expect(joinColumn?.foreignKeyConstraintName).toBe("FK_visitor_sessions_visitor_id");
    });

    it("declares no inverse side on Visitor", () => {
      const inverse = getMetadataArgsStorage()
        .filterRelations(Visitor)
        .filter((relation) => relation.relationType === "one-to-many");

      expect(inverse).toHaveLength(0);
    });
  });

  describe("unique constraints and indices", () => {
    it("declares exactly one unique constraint on refreshHash with explicit name", () => {
      expect(uniques()).toHaveLength(1);
      expect(uniques()[0]?.name).toBe("UQ_visitor_sessions_refresh_hash");
      expect(uniques()[0]?.columns).toEqual(["refreshHash"]);
    });

    it("declares exactly two indices", () => {
      expect(indices()).toHaveLength(2);
    });

    it("has index IDX_visitor_sessions_family_id on familyId", () => {
      const index = indices().find((entry) => entry.name === "IDX_visitor_sessions_family_id");

      expect(index?.columns).toEqual(["familyId"]);
      expect(index?.unique).not.toBe(true);
    });

    it("has index IDX_visitor_sessions_visitor_id on visitorId", () => {
      const index = indices().find((entry) => entry.name === "IDX_visitor_sessions_visitor_id");

      expect(index?.columns).toEqual(["visitorId"]);
      expect(index?.unique).not.toBe(true);
    });
  });
});

describe("registration of visitor sessions", () => {
  it("lists VisitorSession in databaseEntities after Operator", () => {
    expect(databaseEntities).toContain(VisitorSession);
    expect(databaseEntities.indexOf(VisitorSession)).toBeGreaterThan(
      databaseEntities.indexOf(Operator),
    );
  });

  it("lists CreateVisitorSessions1793300004000 in databaseMigrations once", () => {
    const occurrences = databaseMigrations.filter(
      (migration) => migration === CreateVisitorSessions1793300004000,
    );

    expect(occurrences).toHaveLength(1);
  });

  it("orders the migration after both 1793300003000 migrations", () => {
    const position = databaseMigrations.indexOf(CreateVisitorSessions1793300004000);

    expect(position).toBeGreaterThan(
      databaseMigrations.indexOf(AddProjectsOperatorAllowedOrigins1793300003000),
    );
    expect(position).toBeGreaterThan(databaseMigrations.indexOf(CreateOperators1793300003000));
  });
});

describe("CreateVisitorSessions1793300004000", () => {
  it("has the explicit migration name", () => {
    expect(new CreateVisitorSessions1793300004000().name).toBe(
      "CreateVisitorSessions1793300004000",
    );
  });

  it("up creates the table, indices and foreign key in order", async () => {
    const queries = await runMigration("up");

    expect(queries).toEqual([
      normalizeSql(`CREATE TABLE "visitor_sessions" (
        "id" uuid NOT NULL DEFAULT uuidv7(),
        "visitor_id" uuid NOT NULL,
        "family_id" uuid NOT NULL,
        "refresh_hash" bytea NOT NULL,
        "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "used_at" TIMESTAMP WITH TIME ZONE,
        "revoked_at" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "UQ_visitor_sessions_refresh_hash" UNIQUE ("refresh_hash"),
        CONSTRAINT "PK_visitor_sessions" PRIMARY KEY ("id")
      )`),
      `CREATE INDEX "IDX_visitor_sessions_family_id" ON "visitor_sessions" ("family_id")`,
      `CREATE INDEX "IDX_visitor_sessions_visitor_id" ON "visitor_sessions" ("visitor_id")`,
      `ALTER TABLE "visitor_sessions" ADD CONSTRAINT "FK_visitor_sessions_visitor_id" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE`,
    ]);
  });

  it("down drops only the visitor_sessions table", async () => {
    const queries = await runMigration("down");

    expect(queries).toEqual([`DROP TABLE "visitor_sessions"`]);
  });
});
