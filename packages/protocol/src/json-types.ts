/**
 * @description Типы JSON-значений и JSON-объекта для данных, которые передает интегратор (context, visitorData, payload), и лимиты, которыми эти данные проверяются.
 */
export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type JsonObject = { [key: string]: JsonValue };

export interface JsonObjectLimits {
  maxBytes: number;
  maxDepth: number;
  maxKeys: number;
  maxKeyLength: number;
  maxStringBytes: number;
  maxArrayLength: number;
}
