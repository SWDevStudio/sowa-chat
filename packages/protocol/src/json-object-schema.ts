/**
 * @description Zod-схема JsonObject с проверкой лимитов и запрещенных ключей.
 * Используется для проверки context, visitorData и payload.
 */
import { z } from "zod";
import type { JsonObject, JsonObjectLimits } from "./json-types.js";
import { utf8ByteLength } from "./utf8-byte-length.js";

type IssuePath = (string | number)[];

interface Violation {
  message: string;
  path: IssuePath;
}

const defaultLimits: JsonObjectLimits = {
  maxBytes: 16 * 1024,
  maxDepth: 5,
  maxKeys: 100,
  maxKeyLength: 64,
  maxStringBytes: 2 * 1024,
  maxArrayLength: 100,
};

const allowedKeyPattern = /^[A-Za-z0-9_-]+$/;
const forbiddenKeys = new Set(["__proto__", "constructor", "prototype"]);
const jsonObjectBaseSchema = z.unknown().meta({ type: "object" }) as z.ZodType<JsonObject>;

class JsonObjectValidator {
  private readonly violations: Violation[] = [];
  private keyCount = 0;
  private keyLimitExceeded = false;

  constructor(private readonly limits: JsonObjectLimits) {}

  validate(root: unknown): Violation[] {
    if (!this.isPlainObject(root)) {
      this.report([], "Must be a JSON object");
      return this.violations;
    }
    this.validateObject(root, [], 1);
    if (this.violations.length === 0) {
      this.validateTotalSize(root);
    }
    return this.violations;
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  private validateValue(value: unknown, path: IssuePath, depth: number): void {
    if (typeof value === "boolean" || value === null) {
      return;
    }
    if (typeof value === "string") {
      this.validateString(value, path);
      return;
    }
    if (typeof value === "number") {
      this.validateNumber(value, path);
      return;
    }
    if (Array.isArray(value)) {
      this.validateArray(value, path, depth);
      return;
    }
    if (this.isPlainObject(value)) {
      this.validateObject(value, path, depth);
      return;
    }
    this.report(path, "Must be a JSON value");
  }

  private validateString(value: string, path: IssuePath): void {
    if (utf8ByteLength(value) > this.limits.maxStringBytes) {
      this.report(path, `String must be at most ${this.limits.maxStringBytes} bytes`);
    }
  }

  private validateNumber(value: number, path: IssuePath): void {
    if (!Number.isFinite(value)) {
      this.report(path, "Number must be finite");
    }
  }

  private validateArray(value: unknown[], path: IssuePath, depth: number): void {
    if (depth > this.limits.maxDepth) {
      this.report(path, `Nesting must be at most ${this.limits.maxDepth} levels deep`);
      return;
    }
    if (value.length > this.limits.maxArrayLength) {
      this.report(path, `Array must have at most ${this.limits.maxArrayLength} items`);
      return;
    }
    for (let index = 0; index < value.length; index += 1) {
      this.validateValue(value[index], [...path, index], depth + 1);
    }
  }

  private validateObject(value: Record<string, unknown>, path: IssuePath, depth: number): void {
    if (depth > this.limits.maxDepth) {
      this.report(path, `Nesting must be at most ${this.limits.maxDepth} levels deep`);
      return;
    }
    if (this.keyLimitExceeded) {
      return;
    }
    const keys = Object.keys(value);
    this.keyCount += keys.length;
    if (this.keyCount > this.limits.maxKeys) {
      this.keyLimitExceeded = true;
      this.report(path, `Object must have at most ${this.limits.maxKeys} keys in total`);
      return;
    }
    for (const key of keys) {
      const keyPath = [...path, key];
      this.validateKey(key, keyPath);
      this.validateValue(value[key], keyPath, depth + 1);
    }
  }

  private validateKey(key: string, path: IssuePath): void {
    if (forbiddenKeys.has(key)) {
      this.report(path, `Key "${key}" is not allowed`);
    } else if (key.length > this.limits.maxKeyLength) {
      this.report(path, `Key must be at most ${this.limits.maxKeyLength} characters`);
    } else if (!allowedKeyPattern.test(key)) {
      this.report(path, "Key must contain only Latin letters, digits, _ and -");
    }
  }

  private validateTotalSize(root: Record<string, unknown>): void {
    if (utf8ByteLength(JSON.stringify(root)) > this.limits.maxBytes) {
      this.report([], `Object must be at most ${this.limits.maxBytes} bytes of JSON`);
    }
  }

  private report(path: IssuePath, message: string): void {
    this.violations.push({ path, message });
  }
}

/**
 * @description Создает схему JsonObject с заданными лимитами. Проверка
 * выполняется при каждом разборе: значение должно быть простым объектом, не
 * превышать лимиты глубины, ключей, размера и длины строк или массивов, а ключи
 * не могут быть `__proto__`, `constructor` и `prototype`. Ошибки содержат путь
 * до проблемного значения.
 */
export function createJsonObjectSchema(limits: JsonObjectLimits) {
  return jsonObjectBaseSchema.check((context) => {
    const violations = new JsonObjectValidator(limits).validate(context.value);
    for (const violation of violations) {
      context.issues.push({
        code: "custom",
        message: violation.message,
        path: violation.path,
        input: context.value,
      });
    }
  });
}

export const jsonObjectSchema = createJsonObjectSchema(defaultLimits);
