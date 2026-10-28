import { getMetadataArgsStorage } from "typeorm";
import { describe, expect, it } from "vitest";

import { Project } from "../projects/project.entity.js";
import { Visitor } from "./visitor.entity.js";

const expectedColumns = [
  { property: "id", name: "id", type: "uuid", nullable: false },
  { property: "projectId", name: "project_id", type: "uuid", nullable: false },
  { property: "displayCode", name: "display_code", type: "integer", nullable: true },
  { property: "externalId", name: "external_id", type: "text", nullable: true },
  { property: "name", name: "name", type: "text", nullable: true },
  { property: "email", name: "email", type: "text", nullable: true },
  { property: "phone", name: "phone", type: "text", nullable: true },
  { property: "data", name: "data", type: "jsonb", nullable: false },
  { property: "tech", name: "tech", type: "jsonb", nullable: false },
  { property: "mergedIntoId", name: "merged_into_id", type: "uuid", nullable: true },
  { property: "firstSeenAt", name: "first_seen_at", type: "timestamptz", nullable: false },
  { property: "lastSeenAt", name: "last_seen_at", type: "timestamptz", nullable: false },
];

const columns = () => getMetadataArgsStorage().filterColumns(Visitor);
const relations = () => getMetadataArgsStorage().filterRelations(Visitor);
const indices = () => getMetadataArgsStorage().filterIndices(Visitor);

const findColumn = (property: string) =>
  columns().find((column) => column.propertyName === property);
const findRelation = (property: string) =>
  relations().find((relation) => relation.propertyName === property);
const findJoinColumn = (property: string) =>
  getMetadataArgsStorage().filterJoinColumns(Visitor, property)[0];

describe("Visitor entity", () => {
  it("maps to the visitors table", () => {
    const table = getMetadataArgsStorage().tables.find((entry) => entry.target === Visitor);

    expect(table?.name).toBe("visitors");
  });

  it("has exactly 12 columns", () => {
    expect(columns()).toHaveLength(12);
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

  it("makes nullable exactly the six optional columns", () => {
    const nullableNames = columns()
      .filter((column) => column.options.nullable === true)
      .map((column) => column.options.name ?? column.propertyName)
      .sort();

    expect(nullableNames).toEqual([
      "display_code",
      "email",
      "external_id",
      "merged_into_id",
      "name",
      "phone",
    ]);
  });

  it("uses id as the only primary column with uuidv7 default", () => {
    const primaryColumns = columns().filter(
      (column) => column.mode === "regular" && column.propertyName === "id",
    );

    expect(primaryColumns).toHaveLength(1);
    const defaultValue = primaryColumns[0]?.options.default;
    expect(typeof defaultValue).toBe("function");
    expect((defaultValue as () => string)()).toBe("uuidv7()");
  });

  it.each(["data", "tech"])("column %s defaults to an empty json object", (property) => {
    const defaultValue = findColumn(property)?.options.default;

    expect(typeof defaultValue).toBe("function");
    expect((defaultValue as () => string)()).toBe("'{}'");
  });

  it.each(["firstSeenAt", "lastSeenAt"])("column %s defaults to now()", (property) => {
    const defaultValue = findColumn(property)?.options.default;

    expect(typeof defaultValue).toBe("function");
    expect((defaultValue as () => string)()).toBe("now()");
  });

  it("does not declare unexpected columns", () => {
    const properties = columns()
      .map((column) => column.propertyName)
      .sort();

    expect(properties).toEqual(expectedColumns.map((column) => column.property).sort());
  });

  describe("relations", () => {
    it("declares exactly two relations", () => {
      expect(relations()).toHaveLength(2);
    });

    it("project is many-to-one to Project with CASCADE and project_id join column", () => {
      const relation = findRelation("project");

      expect(relation?.relationType).toBe("many-to-one");
      expect((relation?.type as (() => unknown) | undefined)?.()).toBe(Project);
      expect(relation?.options.onDelete).toBe("CASCADE");
      expect(relation?.options.nullable).toBe(false);
      expect(findJoinColumn("project")?.name).toBe("project_id");
    });

    it("mergedInto is many-to-one to Visitor with SET NULL and merged_into_id join column", () => {
      const relation = findRelation("mergedInto");

      expect(relation?.relationType).toBe("many-to-one");
      expect((relation?.type as (() => unknown) | undefined)?.()).toBe(Visitor);
      expect(relation?.options.onDelete).toBe("SET NULL");
      expect(relation?.options.nullable).toBe(true);
      expect(findJoinColumn("mergedInto")?.name).toBe("merged_into_id");
    });

    it("declares no inverse side on Project", () => {
      const inverse = getMetadataArgsStorage()
        .filterRelations(Project)
        .filter((relation) => relation.relationType === "one-to-many");

      expect(inverse).toHaveLength(0);
    });
  });

  describe("indices", () => {
    it("declares exactly two indices", () => {
      expect(indices()).toHaveLength(2);
    });

    it("has a unique index on projectId and displayCode", () => {
      const index = indices().find(
        (entry) => JSON.stringify(entry.columns) === JSON.stringify(["projectId", "displayCode"]),
      );

      expect(index?.unique).toBe(true);
    });

    it("has a unique index on projectId and externalId", () => {
      const index = indices().find(
        (entry) => JSON.stringify(entry.columns) === JSON.stringify(["projectId", "externalId"]),
      );

      expect(index?.unique).toBe(true);
    });

    it("has no non-unique indices", () => {
      expect(indices().every((index) => index.unique === true)).toBe(true);
    });
  });
});
