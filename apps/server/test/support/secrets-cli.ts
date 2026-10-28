import type { DataSource } from "typeorm";
import { registeredEncryptedFields } from "../../src/infra/crypto/registered-encrypted-fields.js";
import type { CliRunResult } from "./cli-run.js";
import { runCliInProcess } from "./cli-run.js";
import { auditRowsByAction } from "./identity-key-rows.js";
import { insertSecret, key1, key2, testField, version1Encryption } from "./test-secrets.js";

export const reencryptedAction = "secrets.reencrypted";
export const fieldName = `${testField.table}.${testField.column}`;
export const dryRunHeader = "field\tversion\tcount";
export const reencryptHeader = "field\treencrypted";
export const emptyRegistryLine = "no encrypted fields registered";
export const encryptionKeysEnv = `1:${key1.key.toString("base64")},2:${key2.key.toString("base64")}`;

export function registerTestField(): void {
  registeredEncryptedFields.push(testField);
}

export function clearRegisteredFields(): void {
  registeredEncryptedFields.splice(0);
}

export function runDryRun(): Promise<CliRunResult> {
  return runCliInProcess(["secrets:reencrypt", "--dry-run"]);
}

export function runReencrypt(): Promise<CliRunResult> {
  return runCliInProcess(["secrets:reencrypt"]);
}

export function reencryptedAuditRows(dataSource: DataSource) {
  return auditRowsByAction(dataSource, reencryptedAction);
}

export async function insertVersion1Values(
  dataSource: DataSource,
  plaintexts: string[],
): Promise<string[]> {
  const ids: string[] = [];
  for (const plaintext of plaintexts) {
    ids.push(await insertSecret(dataSource, version1Encryption.encrypt(plaintext)));
  }
  return ids;
}
