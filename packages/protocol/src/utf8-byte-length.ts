/**
 * @description Подсчет длины строки в байтах UTF-8. Нужен для лимитов размера в json-object-schema.ts.
 */
declare const TextEncoder: new () => { encode(input: string): Uint8Array };

const encoder = new TextEncoder();

export function utf8ByteLength(text: string): number {
  return encoder.encode(text).length;
}
