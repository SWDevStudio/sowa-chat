export interface EncryptedField {
  table: string;
  column: string;
}

export const encryptedFields = Symbol("encryptedFields");
