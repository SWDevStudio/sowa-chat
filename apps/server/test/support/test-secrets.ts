import { Test } from "@nestjs/testing";
import type { TestingModule, TestingModuleBuilder } from "@nestjs/testing";
import type { DataSource } from "typeorm";
import type { EncryptionKey } from "../../src/infra/config/encryption-keys.schema.js";
import { encryptionConfig } from "../../src/infra/config/encryption.config.js";
import type { EncryptedField } from "../../src/infra/crypto/encrypted-field.js";
import { encryptedFields } from "../../src/infra/crypto/encrypted-field.js";
import { EncryptionService } from "../../src/infra/crypto/encryption.service.js";
import { SecretsReencryptionModule } from "../../src/infra/crypto/secrets-reencryption.module.js";
import { WorkerModule } from "../../src/worker.module.js";

export interface SecretRow {
  id: string;
  secret: string | null;
}

export const key1: EncryptionKey = { version: 1, key: Buffer.alloc(32, 0x11) };
export const key2: EncryptionKey = { version: 2, key: Buffer.alloc(32, 0x22) };
export const testField: EncryptedField = { table: "test_secrets", column: "secret" };
export const version1Encryption = new EncryptionService({ keys: [key1] });
export const version2Encryption = new EncryptionService({ keys: [key2] });

export function tamperTag(value: string): string {
  const parts = value.split(".");
  const tag = Buffer.from(parts[3] ?? "", "base64url");
  tag[0] ^= 0x01;
  parts[3] = tag.toString("base64url");
  return parts.join(".");
}

function reencryptionModuleBuilder(keys: EncryptionKey[]): TestingModuleBuilder {
  return Test.createTestingModule({ imports: [WorkerModule, SecretsReencryptionModule] })
    .overrideProvider(encryptionConfig.KEY)
    .useValue({ keys });
}

async function initModule(builder: TestingModuleBuilder): Promise<TestingModule> {
  const moduleRef = await builder.compile();
  await moduleRef.init();
  return moduleRef;
}

export async function createReencryptionModule(keys: EncryptionKey[]): Promise<TestingModule> {
  const builder = reencryptionModuleBuilder(keys)
    .overrideProvider(encryptedFields)
    .useValue([testField]);
  return initModule(builder);
}

export async function createRegisteredFieldsModule(keys: EncryptionKey[]): Promise<TestingModule> {
  return initModule(reencryptionModuleBuilder(keys));
}

export async function createTestSecretsTable(dataSource: DataSource): Promise<void> {
  await dropTestSecretsTable(dataSource);
  await dataSource.query(
    'CREATE TABLE "test_secrets" ("id" uuid PRIMARY KEY DEFAULT uuidv7(), "secret" text)',
  );
}

export async function dropTestSecretsTable(dataSource: DataSource): Promise<void> {
  await dataSource.query('DROP TABLE IF EXISTS "test_secrets"');
}

export async function insertSecret(dataSource: DataSource, value: string | null): Promise<string> {
  const rows: { id: string }[] = await dataSource.query(
    'INSERT INTO "test_secrets" ("secret") VALUES ($1) RETURNING "id"',
    [value],
  );
  return rows[0]?.id ?? "";
}

export async function insertVersion1Secrets(dataSource: DataSource, count: number): Promise<void> {
  const values = Array.from({ length: count }, (_, index) =>
    version1Encryption.encrypt(`secret-${index}`),
  );
  await dataSource.query('INSERT INTO "test_secrets" ("secret") SELECT unnest($1::text[])', [
    values,
  ]);
}

export async function readSecretRows(dataSource: DataSource): Promise<SecretRow[]> {
  return dataSource.query('SELECT "id", "secret" FROM "test_secrets" ORDER BY "id"');
}

export async function readSecret(dataSource: DataSource, id: string): Promise<string | null> {
  const rows: SecretRow[] = await dataSource.query(
    'SELECT "id", "secret" FROM "test_secrets" WHERE "id" = $1',
    [id],
  );
  return rows[0]?.secret ?? null;
}

export async function lockWaitCount(dataSource: DataSource): Promise<number> {
  const rows: { count: number }[] = await dataSource.query(
    "SELECT count(*)::int AS \"count\" FROM pg_stat_activity WHERE datname = current_database() AND wait_event_type = 'Lock'",
  );
  return rows[0]?.count ?? 0;
}
