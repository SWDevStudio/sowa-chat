import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import type { DataSource } from "typeorm";
import { AuditLogEntry } from "../../src/domain/audit/audit-log-entry.entity.js";
import { ApiKey } from "../../src/domain/keys/api-key.entity.js";
import { ApiKeysService } from "../../src/domain/keys/api-keys.service.js";
import { generateKey, toLookupPrefix } from "../../src/domain/keys/key-format.js";
import { hashKey } from "../../src/domain/keys/key-hash.js";
import { KeysModule } from "../../src/domain/keys/keys.module.js";
import { WorkerModule } from "../../src/worker.module.js";
import type { CliRunResult } from "./cli-run.js";
import { runCliInProcess } from "./cli-run.js";
import { createMain, nonEmptyLines, outputOf, valueOf } from "./project-cli.js";

export const keyListHeader = ["prefix", "createdAt", "lastUsedAt", "status"];

export interface MainProject {
  projectId: string;
  firstKey: string;
  firstPrefix: string;
}

export function createKey(project: string): Promise<CliRunResult> {
  return runCliInProcess(["key:create", "--project", project]);
}

export function listKeys(project: string): Promise<CliRunResult> {
  return runCliInProcess(["key:list", "--project", project]);
}

export function revokeKey(prefix: string): Promise<CliRunResult> {
  return runCliInProcess(["key:revoke", "--prefix", prefix]);
}

export async function setupMainProject(): Promise<MainProject> {
  const created = await createMain();
  expect(created.exitCode, outputOf(created)).toBe(0);
  const lines = nonEmptyLines(created.stdout);
  const firstKey = valueOf(lines, "serverKey");
  return {
    projectId: valueOf(lines, "projectId"),
    firstKey,
    firstPrefix: toLookupPrefix(firstKey),
  };
}

export async function createdKey(project: string): Promise<{ key: string; prefix: string }> {
  const result = await createKey(project);
  expect(result.exitCode, outputOf(result)).toBe(0);
  const lines = nonEmptyLines(result.stdout);
  return { key: valueOf(lines, "serverKey"), prefix: valueOf(lines, "prefix") };
}

export function tableRows(stdout: string): string[][] {
  return nonEmptyLines(stdout).map((line) => line.split("\t"));
}

export function keyRowByPrefix(dataSource: DataSource, prefix: string): Promise<ApiKey> {
  return dataSource.getRepository(ApiKey).findOneByOrFail({ prefix });
}

export function auditRowsByAction(
  dataSource: DataSource,
  action: string,
): Promise<AuditLogEntry[]> {
  return dataSource.getRepository(AuditLogEntry).find({ where: { action } });
}

export async function insertBotKey(
  dataSource: DataSource,
  projectId: string,
): Promise<{ key: string; prefix: string }> {
  const key = generateKey("botKey");
  const prefix = toLookupPrefix(key);
  const repository = dataSource.getRepository(ApiKey);
  await repository.save(
    repository.create({
      projectId,
      kind: "bot",
      prefix,
      keyHash: hashKey(key),
      botId: randomUUID(),
    }),
  );
  return { key, prefix };
}

export function useApiKeysService(): () => ApiKeysService {
  let moduleRef: TestingModule;
  let keys: ApiKeysService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, KeysModule],
    }).compile();
    await moduleRef.init();
    keys = moduleRef.get(ApiKeysService);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  return () => keys;
}
