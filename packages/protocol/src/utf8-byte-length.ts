const MAX_ONE_BYTE_CODE_UNIT = 0x7f;
const MAX_TWO_BYTE_CODE_UNIT = 0x7ff;
const FIRST_HIGH_SURROGATE = 0xd800;
const LAST_HIGH_SURROGATE = 0xdbff;
const FIRST_LOW_SURROGATE = 0xdc00;
const LAST_LOW_SURROGATE = 0xdfff;

function isHighSurrogate(codeUnit: number): boolean {
  return codeUnit >= FIRST_HIGH_SURROGATE && codeUnit <= LAST_HIGH_SURROGATE;
}

function isLowSurrogate(codeUnit: number): boolean {
  return codeUnit >= FIRST_LOW_SURROGATE && codeUnit <= LAST_LOW_SURROGATE;
}

export function utf8ByteLength(text: string): number {
  let bytes = 0;
  for (let index = 0; index < text.length; index += 1) {
    const codeUnit = text.charCodeAt(index);
    if (codeUnit <= MAX_ONE_BYTE_CODE_UNIT) {
      bytes += 1;
    } else if (codeUnit <= MAX_TWO_BYTE_CODE_UNIT) {
      bytes += 2;
    } else if (isHighSurrogate(codeUnit) && isLowSurrogate(text.charCodeAt(index + 1))) {
      bytes += 4;
      index += 1;
    } else {
      bytes += 3;
    }
  }
  return bytes;
}
