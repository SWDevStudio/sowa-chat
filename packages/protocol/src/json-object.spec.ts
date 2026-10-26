import { describe, expect, expectTypeOf, it } from "vitest";
import { jsonObjectSchema } from "./index.js";
import type { JsonObject, JsonValue } from "./index.js";

function isAccepted(value: unknown): boolean {
  return jsonObjectSchema.safeParse(value).success;
}

function issuePaths(value: unknown): string[] {
  const result = jsonObjectSchema.safeParse(value);
  if (result.success) {
    return [];
  }
  return result.error.issues.map((issue) => issue.path.join("."));
}

function deeplyNestedObject(levels: number): JsonObject {
  let object: JsonObject = {};
  for (let level = 1; level < levels; level += 1) {
    object = { child: object };
  }
  return object;
}

function objectWithDeeplyNestedArrays(levels: number): JsonObject {
  let array: JsonValue[] = [];
  for (let level = 2; level < levels; level += 1) {
    array = [array];
  }
  return { list: array };
}

describe("jsonObjectSchema: форма", () => {
  it("принимает объект со всеми видами JSON-значений", () => {
    const object = {
      text: "hello",
      count: 42,
      ratio: -0.5,
      enabled: true,
      missing: null,
      tags: ["a", 1, false, null],
      nested: { plan: "pro", items: [{ id: 1 }] },
    };

    expect(jsonObjectSchema.parse(object)).toEqual(object);
  });

  it("принимает пустой объект", () => {
    expect(isAccepted({})).toBe(true);
  });

  it("принимает объект из JSON.parse", () => {
    expect(isAccepted(JSON.parse('{"userId": "42", "plan": {"name": "pro"}}'))).toBe(true);
  });

  it.each([
    ["массив", []],
    ["строка", "text"],
    ["null", null],
    ["число", 42],
    ["логическое значение", true],
    ["undefined", undefined],
  ])("отклоняет на верхнем уровне: %s", (_title, value) => {
    expect(isAccepted(value)).toBe(false);
  });

  it.each([
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["-Infinity", Number.NEGATIVE_INFINITY],
    ["undefined", undefined],
    ["функция", () => 1],
    ["bigint", BigInt(1)],
  ])("отклоняет значение, которого нет в JSON: %s", (_title, value) => {
    expect(isAccepted({ value })).toBe(false);
    expect(isAccepted({ list: [value] })).toBe(false);
  });
});

describe("jsonObjectSchema: ключи", () => {
  it("принимает ключ из латиницы, цифр, _ и -", () => {
    expect(isAccepted({ "user_Id-2": 1 })).toBe(true);
  });

  it("принимает ключ в 64 символа", () => {
    expect(isAccepted({ ["a".repeat(64)]: 1 })).toBe(true);
  });

  it("отклоняет ключ в 65 символов", () => {
    expect(isAccepted({ ["a".repeat(65)]: 1 })).toBe(false);
  });

  it.each(["a.b", "a b", "ключ", "a$", "a/b"])(
    "отклоняет ключ с недопустимыми символами: %s",
    (key) => {
      expect(isAccepted({ [key]: 1 })).toBe(false);
      expect(isAccepted({ nested: { [key]: 1 } })).toBe(false);
    },
  );

  it("отклоняет __proto__ из JSON.parse", () => {
    const object = JSON.parse('{"__proto__": {"x": 1}}');

    expect(Object.keys(object)).toEqual(["__proto__"]);
    expect(isAccepted(object)).toBe(false);
  });

  it("отклоняет __proto__ во вложенном объекте", () => {
    expect(isAccepted(JSON.parse('{"nested": {"__proto__": {"x": 1}}}'))).toBe(false);
    expect(isAccepted(JSON.parse('{"list": [{"__proto__": 1}]}'))).toBe(false);
  });

  it.each(["constructor", "prototype"])("отклоняет ключ %s", (key) => {
    expect(isAccepted(JSON.parse(`{"${key}": 1}`))).toBe(false);
    expect(isAccepted(JSON.parse(`{"nested": {"${key}": 1}}`))).toBe(false);
  });
});

describe("jsonObjectSchema: очень глубокий объект", () => {
  it("отклоняет объект глубиной 10 000 без падения", () => {
    const object = deeplyNestedObject(10_000);

    expect(() => jsonObjectSchema.safeParse(object)).not.toThrow();
    expect(isAccepted(object)).toBe(false);
  });

  it("отклоняет массивы глубиной 10 000 без падения", () => {
    const object = objectWithDeeplyNestedArrays(10_000);

    expect(() => jsonObjectSchema.safeParse(object)).not.toThrow();
    expect(isAccepted(object)).toBe(false);
  });
});

describe("jsonObjectSchema: ошибка", () => {
  it("указывает путь к слишком длинной строке", () => {
    expect(issuePaths({ profile: { bio: "a".repeat(2049) } })).toContain("profile.bio");
  });

  it("указывает путь к недопустимому ключу", () => {
    expect(issuePaths({ profile: { bad$key: 1 } })).toContain("profile.bad$key");
  });
});

describe("JsonValue и JsonObject", () => {
  it("JsonObject — объект со значениями JsonValue", () => {
    expectTypeOf<JsonObject>().toEqualTypeOf<{ [key: string]: JsonValue }>();
  });

  it("результат схемы можно использовать как JsonObject", () => {
    expectTypeOf(jsonObjectSchema.parse({})).toExtend<JsonObject>();
  });
});
