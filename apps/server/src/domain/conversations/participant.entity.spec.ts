import { getMetadataArgsStorage } from "typeorm";
import { describe, expect, it } from "vitest";

import { Conversation } from "./conversation.entity.js";
import { Participant } from "./participant.entity.js";

const expectedColumns = [
  { property: "conversationId", name: "conversation_id", type: "uuid", nullable: false },
  { property: "kind", name: "kind", type: "text", nullable: false },
  { property: "participantId", name: "participant_id", type: "uuid", nullable: false },
  { property: "lastDeliveredSeq", name: "last_delivered_seq", type: "integer", nullable: false },
  { property: "lastReadSeq", name: "last_read_seq", type: "integer", nullable: false },
  { property: "joinedAt", name: "joined_at", type: "timestamptz", nullable: false },
  { property: "leftAt", name: "left_at", type: "timestamptz", nullable: true },
];

const columns = () => getMetadataArgsStorage().filterColumns(Participant);
const relations = () => getMetadataArgsStorage().filterRelations(Participant);
const indices = () => getMetadataArgsStorage().filterIndices(Participant);

const findColumn = (property: string) =>
  columns().find((column) => column.propertyName === property);
const findRelation = (property: string) =>
  relations().find((relation) => relation.propertyName === property);
const findJoinColumn = (property: string) =>
  getMetadataArgsStorage().filterJoinColumns(Participant, property)[0];
const relationTarget = (property: string) =>
  (findRelation(property)?.type as (() => unknown) | undefined)?.();
const columnName = (column: { propertyName: string; options: { name?: string } }) =>
  column.options.name ?? column.propertyName;

describe("Participant entity", () => {
  it("maps to the participants table", () => {
    const table = getMetadataArgsStorage().tables.find((entry) => entry.target === Participant);

    expect(table?.name).toBe("participants");
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

  it("makes nullable only left_at", () => {
    const nullableNames = columns()
      .filter((column) => column.options.nullable === true)
      .map(columnName);

    expect(nullableNames).toEqual(["left_at"]);
  });

  it("uses explicit snake_case names for multi-word columns", () => {
    const multiWord = expectedColumns.filter((column) => column.name.includes("_"));

    expect(multiWord).toHaveLength(6);
    for (const { property, name } of multiWord) {
      expect(findColumn(property)?.options.name).toBe(name);
    }
  });

  describe("primary key", () => {
    const primaryColumns = () =>
      columns().filter((column) => column.mode === "regular" && column.options.primary === true);

    it("is composite of conversation_id, kind, participant_id in declaration order", () => {
      expect(primaryColumns().map(columnName)).toEqual([
        "conversation_id",
        "kind",
        "participant_id",
      ]);
    });

    it("has exactly three primary columns", () => {
      expect(primaryColumns()).toHaveLength(3);
    });

    it.each(["lastDeliveredSeq", "lastReadSeq", "joinedAt", "leftAt"])(
      "column %s is not primary",
      (property) => {
        expect(findColumn(property)?.options.primary).not.toBe(true);
      },
    );

    it("has no separate id column and no generated columns", () => {
      expect(findColumn("id")).toBeUndefined();
      expect(columns().filter((column) => column.mode !== "regular")).toHaveLength(0);
      const generations = getMetadataArgsStorage().generations.filter(
        (generation) => generation.target === Participant,
      );

      expect(generations).toHaveLength(0);
    });
  });

  describe("defaults", () => {
    it("defaults last_delivered_seq to 0", () => {
      expect(findColumn("lastDeliveredSeq")?.options.default).toBe(0);
    });

    it("defaults last_read_seq to 0", () => {
      expect(findColumn("lastReadSeq")?.options.default).toBe(0);
    });

    it("defaults joined_at to now()", () => {
      const defaultValue = findColumn("joinedAt")?.options.default;

      expect(typeof defaultValue).toBe("function");
      expect((defaultValue as () => string)()).toBe("now()");
    });

    it.each(["conversationId", "kind", "participantId", "leftAt"])(
      "column %s has no default",
      (property) => {
        expect(findColumn(property)?.options.default).toBeUndefined();
      },
    );

    it("keeps kind a plain text column without enum restriction", () => {
      expect(findColumn("kind")?.options.enum).toBeUndefined();
    });
  });

  describe("relations", () => {
    it("declares exactly one relation", () => {
      expect(relations()).toHaveLength(1);
    });

    it("conversation is many-to-one to Conversation with CASCADE and conversation_id join column", () => {
      const relation = findRelation("conversation");

      expect(relation?.relationType).toBe("many-to-one");
      expect(relationTarget("conversation")).toBe(Conversation);
      expect(relation?.options.onDelete).toBe("CASCADE");
      expect(relation?.options.nullable).toBe(false);
      expect(findJoinColumn("conversation")?.name).toBe("conversation_id");
    });

    it("has no relation for participant_id", () => {
      expect(findRelation("participant")).toBeUndefined();
      expect(findRelation("participantId")).toBeUndefined();
    });

    it("declares no inverse side on Conversation", () => {
      const inverse = getMetadataArgsStorage()
        .filterRelations(Conversation)
        .filter((relation) => relation.relationType === "one-to-many");

      expect(inverse).toHaveLength(0);
    });
  });

  it("declares no indices", () => {
    expect(indices()).toHaveLength(0);
  });
});
