import { describe, expect, it } from "vitest";
import { createJsonObjectSchema, jsonObjectSchema } from "./index.js";
import type { JsonObject, JsonObjectLimits, JsonValue } from "./index.js";

const defaultLimits: JsonObjectLimits = {
  maxBytes: 16 * 1024,
  maxDepth: 5,
  maxKeys: 100,
  maxKeyLength: 64,
  maxStringBytes: 2 * 1024,
  maxArrayLength: 100,
};

interface Schema {
  safeParse(value: unknown): { success: boolean };
}

function jsonLength(value: JsonValue): number {
  return JSON.stringify(value).length;
}

function isAccepted(value: unknown, schema: Schema = jsonObjectSchema): boolean {
  return schema.safeParse(value).success;
}

function objectOfJsonBytes(targetBytes: number): JsonObject {
  const object: Record<string, string> = {};
  let index = 0;
  while (jsonLength(object) < targetBytes) {
    const key = `k${index}`;
    object[key] = "";
    const missingBytes = targetBytes - jsonLength(object);
    object[key] = "a".repeat(Math.min(missingBytes, 2000));
    index += 1;
  }
  return object;
}

function nestedObject(levels: number): JsonObject {
  let object: JsonObject = { leaf: 1 };
  for (let level = 1; level < levels; level += 1) {
    object = { child: object };
  }
  return object;
}

function objectWithNestedArrays(levels: number): JsonObject {
  let array: JsonValue[] = [1];
  for (let level = 2; level < levels; level += 1) {
    array = [array];
  }
  return { list: array };
}

function objectWithKeys(count: number): JsonObject {
  const object: JsonObject = {};
  for (let index = 0; index < count; index += 1) {
    object[`k${index}`] = index;
  }
  return object;
}

function schemaWith(overrides: Partial<JsonObjectLimits>) {
  return createJsonObjectSchema({ ...defaultLimits, ...overrides });
}

describe("jsonObjectSchema: размер объекта в JSON", () => {
  it("принимает объект ровно в 16 КБ", () => {
    const object = objectOfJsonBytes(16 * 1024);

    expect(jsonLength(object)).toBe(16 * 1024);
    expect(isAccepted(object)).toBe(true);
  });

  it("отклоняет объект на байт больше 16 КБ", () => {
    const object = objectOfJsonBytes(16 * 1024 + 1);

    expect(jsonLength(object)).toBe(16 * 1024 + 1);
    expect(isAccepted(object)).toBe(false);
  });

  it("считает размер в байтах UTF-8, а не в символах", () => {
    const object: JsonObject = {};
    for (let index = 0; index < 9; index += 1) {
      object[`k${index}`] = "я".repeat(1000);
    }

    expect(jsonLength(object)).toBeLessThan(16 * 1024);
    expect(isAccepted(object)).toBe(false);
  });
});

describe("jsonObjectSchema: глубина вложенности", () => {
  it("принимает 5 уровней объектов, верхний объект — уровень 1", () => {
    expect(isAccepted(nestedObject(5))).toBe(true);
  });

  it("отклоняет 6 уровней объектов", () => {
    expect(isAccepted(nestedObject(6))).toBe(false);
  });

  it("считает массивы уровнями вложенности", () => {
    expect(isAccepted(objectWithNestedArrays(5))).toBe(true);
    expect(isAccepted(objectWithNestedArrays(6))).toBe(false);
  });
});

describe("jsonObjectSchema: число ключей на всех уровнях", () => {
  it("принимает 100 ключей", () => {
    expect(isAccepted(objectWithKeys(100))).toBe(true);
  });

  it("отклоняет 101 ключ", () => {
    expect(isAccepted(objectWithKeys(101))).toBe(false);
  });

  it("считает ключи вложенных объектов", () => {
    expect(isAccepted({ inner: objectWithKeys(99) })).toBe(true);
    expect(isAccepted({ inner: objectWithKeys(100) })).toBe(false);
  });

  it("считает ключи объектов внутри массивов", () => {
    expect(isAccepted({ list: [objectWithKeys(49), objectWithKeys(50)] })).toBe(true);
    expect(isAccepted({ list: [objectWithKeys(50), objectWithKeys(50)] })).toBe(false);
  });
});

describe("jsonObjectSchema: строковое значение", () => {
  it("принимает строку в 2 КБ", () => {
    expect(isAccepted({ text: "a".repeat(2048) })).toBe(true);
  });

  it("отклоняет строку на байт больше 2 КБ", () => {
    expect(isAccepted({ text: "a".repeat(2049) })).toBe(false);
  });

  it("считает длину строки в байтах UTF-8", () => {
    expect(isAccepted({ text: "я".repeat(1024) })).toBe(true);
    expect(isAccepted({ text: "я".repeat(1025) })).toBe(false);
  });

  it("проверяет строки внутри массивов", () => {
    expect(isAccepted({ list: ["a".repeat(2049)] })).toBe(false);
  });
});

describe("jsonObjectSchema: длина массива", () => {
  it("принимает массив из 100 элементов", () => {
    expect(isAccepted({ list: Array.from({ length: 100 }, () => 0) })).toBe(true);
  });

  it("отклоняет массив из 101 элемента", () => {
    expect(isAccepted({ list: Array.from({ length: 101 }, () => 0) })).toBe(false);
  });
});

describe("createJsonObjectSchema: свои лимиты", () => {
  it("применяет свой размер объекта", () => {
    const schema = schemaWith({ maxBytes: 50 });

    expect(isAccepted(objectOfJsonBytes(50), schema)).toBe(true);
    expect(isAccepted(objectOfJsonBytes(51), schema)).toBe(false);
  });

  it("применяет свою глубину", () => {
    const schema = schemaWith({ maxDepth: 2 });

    expect(isAccepted(nestedObject(2), schema)).toBe(true);
    expect(isAccepted(nestedObject(3), schema)).toBe(false);
  });

  it("применяет своё число ключей", () => {
    const schema = schemaWith({ maxKeys: 3 });

    expect(isAccepted(objectWithKeys(3), schema)).toBe(true);
    expect(isAccepted(objectWithKeys(4), schema)).toBe(false);
  });

  it("применяет свою длину ключа", () => {
    const schema = schemaWith({ maxKeyLength: 4 });

    expect(isAccepted({ abcd: 1 }, schema)).toBe(true);
    expect(isAccepted({ abcde: 1 }, schema)).toBe(false);
  });

  it("применяет свой размер строки", () => {
    const schema = schemaWith({ maxStringBytes: 5 });

    expect(isAccepted({ text: "a".repeat(5) }, schema)).toBe(true);
    expect(isAccepted({ text: "a".repeat(6) }, schema)).toBe(false);
  });

  it("применяет свою длину массива", () => {
    const schema = schemaWith({ maxArrayLength: 2 });

    expect(isAccepted({ list: [0, 0] }, schema)).toBe(true);
    expect(isAccepted({ list: [0, 0, 0] }, schema)).toBe(false);
  });

  it("пропускает то, что больше лимитов по умолчанию, если лимиты шире", () => {
    const schema = schemaWith({ maxDepth: 7, maxArrayLength: 150 });

    expect(isAccepted(nestedObject(7), schema)).toBe(true);
    expect(isAccepted({ list: Array.from({ length: 150 }, () => 0) }, schema)).toBe(true);
  });

  it("не меняет схему с лимитами по умолчанию", () => {
    schemaWith({ maxDepth: 7 });

    expect(isAccepted(nestedObject(6))).toBe(false);
  });
});
