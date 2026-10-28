import type { MockInstance } from "vitest";
import { EncryptionService } from "../src/infra/crypto/encryption.service.js";
import { DomainEventBus } from "../src/telemetry/events/domain-event-bus.js";
import { nonEmptyLines, outputOf } from "./support/project-cli.js";
import {
  clearRegisteredFields,
  dryRunHeader,
  emptyRegistryLine,
  encryptionKeysEnv,
  fieldName,
  insertVersion1Values,
  registerTestField,
  reencryptedAuditRows,
  reencryptedAction,
  reencryptHeader,
  runDryRun,
  runReencrypt,
} from "./support/secrets-cli.js";
import { auditRows } from "./support/identity-key-rows.js";
import { useTestDatabase } from "./support/test-database.js";
import {
  createTestSecretsTable,
  dropTestSecretsTable,
  insertSecret,
  readSecret,
  readSecretRows,
  tamperTag,
  version1Encryption,
  version2Encryption,
} from "./support/test-secrets.js";

const commandTimeout = 600_000;
const garbage = "v1.мусор";

describe("команда secrets:reencrypt", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  let publish: MockInstance<DomainEventBus["publish"]>;

  function secretsEvents() {
    return publish.mock.calls.filter(([name]) => name === reencryptedAction);
  }

  beforeAll(async () => {
    vi.stubEnv("SOWA_ENCRYPTION_KEYS", encryptionKeysEnv);
    await createTestSecretsTable(getDataSource());
  });

  beforeEach(() => {
    registerTestField();
    publish = vi.spyOn(DomainEventBus.prototype, "publish");
  });

  afterEach(() => {
    clearRegisteredFields();
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    vi.unstubAllEnvs();
    await dropTestSecretsTable(getDataSource());
  });

  describe("--dry-run", () => {
    it("значения версии 1 при ключах 1 и 2: строка v1 с числом, БД, журнал и события не меняются", async () => {
      await insertVersion1Values(getDataSource(), ["first", "second", "third"]);
      const rowsBefore = await readSecretRows(getDataSource());

      const result = await runDryRun();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([dryRunHeader, `${fieldName}\tv1\t3`]);
      expect(await readSecretRows(getDataSource())).toEqual(rowsBefore);
      expect(await auditRows(getDataSource())).toEqual([]);
      expect(secretsEvents()).toEqual([]);
    });

    it("каждая версия отдельной строкой по возрастанию, значения не в формате — unknown в конце, NULL не считается", async () => {
      await insertVersion1Values(getDataSource(), ["first", "second"]);
      await insertSecret(getDataSource(), version2Encryption.encrypt("current"));
      await insertSecret(getDataSource(), "not-encrypted");
      await insertSecret(getDataSource(), null);

      const result = await runDryRun();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([
        dryRunHeader,
        `${fieldName}\tv1\t2`,
        `${fieldName}\tv2\t1`,
        `${fieldName}\tunknown\t1`,
      ]);
    });

    it("реестр пуст: одна строка no encrypted fields registered, код 0, журнал пуст", async () => {
      clearRegisteredFields();

      const result = await runDryRun();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([emptyRegistryLine]);
      expect(await auditRows(getDataSource())).toEqual([]);
    });
  });

  describe("перешифровка", () => {
    it("код 0, строка с числом, все значения v2 с прежним содержимым, одна запись журнала от cli, затем dry-run показывает только v2", async () => {
      const plaintexts = ["first", "second", "third"];
      await insertVersion1Values(getDataSource(), plaintexts);

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([reencryptHeader, `${fieldName}\t3`]);
      const rows = await readSecretRows(getDataSource());
      expect(rows.map((row) => row.secret?.startsWith("v2."))).toEqual([true, true, true]);
      expect(rows.map((row) => version2Encryption.decrypt(row.secret ?? ""))).toEqual(plaintexts);
      const audit = await reencryptedAuditRows(getDataSource());
      expect(audit).toHaveLength(1);
      expect(audit[0]).toMatchObject({
        projectId: null,
        actorKind: "cli",
        actorId: null,
        targetKind: "encryptedSecrets",
        targetId: null,
        data: { reencrypted: 3, undecryptable: 0 },
      });
      expect(await auditRows(getDataSource())).toHaveLength(1);
      expect(secretsEvents()).toEqual([
        [reencryptedAction, { reencrypted: 3, undecryptable: 0, actorKind: "cli" }],
      ]);

      const dryRun = await runDryRun();

      expect(nonEmptyLines(dryRun.stdout)).toEqual([dryRunHeader, `${fieldName}\tv2\t3`]);
    });

    it("в журнале и выводе нет открытых значений и шифртекста", async () => {
      await insertVersion1Values(getDataSource(), ["super-secret-value"]);
      const before = (await readSecretRows(getDataSource()))[0]?.secret ?? "";

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(0);
      const after = (await readSecretRows(getDataSource()))[0]?.secret ?? "";
      const visible = JSON.stringify([
        result.stdout,
        result.stderr,
        await auditRows(getDataSource()),
      ]);
      expect(visible).not.toContain("super-secret-value");
      expect(visible).not.toContain(before);
      expect(visible).not.toContain(after);
    });

    it("повторный запуск: перешифровано 0, значения не меняются, запись журнала с нулями", async () => {
      await insertVersion1Values(getDataSource(), ["first", "second"]);
      await runReencrypt();
      const rowsAfterFirst = await readSecretRows(getDataSource());

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([reencryptHeader, `${fieldName}\t0`]);
      expect(await readSecretRows(getDataSource())).toEqual(rowsAfterFirst);
      const audit = await reencryptedAuditRows(getDataSource());
      expect(audit.map((row) => row.data)).toEqual([
        { reencrypted: 2, undecryptable: 0 },
        { reencrypted: 0, undecryptable: 0 },
      ]);
    });

    it("пустая таблица: код 0, перешифровано 0, запись журнала с нулями", async () => {
      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([reencryptHeader, `${fieldName}\t0`]);
      const audit = await reencryptedAuditRows(getDataSource());
      expect(audit.map((row) => row.data)).toEqual([{ reencrypted: 0, undecryptable: 0 }]);
    });

    it("реестр пуст: одна строка no encrypted fields registered, код 0, журнал пишется с нулями", async () => {
      clearRegisteredFields();

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([emptyRegistryLine]);
      const audit = await reencryptedAuditRows(getDataSource());
      expect(audit).toHaveLength(1);
      expect(audit[0]).toMatchObject({
        projectId: null,
        actorKind: "cli",
        targetKind: "encryptedSecrets",
        data: { reencrypted: 0, undecryptable: 0 },
      });
    });
  });

  describe("нерасшифровываемые значения", () => {
    it("код 1, строка undecryptable с id, значение не изменилось, в журнале undecryptable 1, открытых значений нигде нет", async () => {
      const [goodId] = await insertVersion1Values(getDataSource(), ["good-secret"]);
      const tampered = tamperTag(version1Encryption.encrypt("tampered-secret"));
      const badId = await insertSecret(getDataSource(), tampered);

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(nonEmptyLines(result.stdout)).toEqual([
        reencryptHeader,
        `${fieldName}\t1`,
        `undecryptable: ${fieldName} ${badId}`,
      ]);
      expect(result.stderr).toContain("error: 1 values cannot be decrypted");
      expect(await readSecret(getDataSource(), badId)).toBe(tampered);
      const goodValue = (await readSecret(getDataSource(), goodId ?? "")) ?? "";
      expect(version2Encryption.decrypt(goodValue)).toBe("good-secret");
      const audit = await reencryptedAuditRows(getDataSource());
      expect(audit).toHaveLength(1);
      expect(audit[0]?.data).toEqual({ reencrypted: 1, undecryptable: 1 });
      const visible = JSON.stringify([
        result.stdout,
        result.stderr,
        await auditRows(getDataSource()),
      ]);
      for (const leaked of ["good-secret", "tampered-secret", tampered, goodValue]) {
        expect(visible).not.toContain(leaked);
      }
      expect(JSON.stringify(audit[0])).not.toContain(badId);
    });

    it("два значения: по строке на каждое, ошибка с числом 2, мусор и NULL остаются как были", async () => {
      const garbageId = await insertSecret(getDataSource(), garbage);
      const nullId = await insertSecret(getDataSource(), null);
      const tampered = tamperTag(version1Encryption.encrypt("tampered-secret"));
      const tamperedId = await insertSecret(getDataSource(), tampered);

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(1);
      const lines = nonEmptyLines(result.stdout);
      expect(lines.slice(0, 2)).toEqual([reencryptHeader, `${fieldName}\t0`]);
      expect(lines.slice(2).sort()).toEqual(
        [
          `undecryptable: ${fieldName} ${garbageId}`,
          `undecryptable: ${fieldName} ${tamperedId}`,
        ].sort(),
      );
      expect(result.stderr).toContain("error: 2 values cannot be decrypted");
      expect(await readSecret(getDataSource(), garbageId)).toBe(garbage);
      expect(await readSecret(getDataSource(), tamperedId)).toBe(tampered);
      expect(await readSecret(getDataSource(), nullId)).toBeNull();
      const audit = await reencryptedAuditRows(getDataSource());
      expect(audit.map((row) => row.data)).toEqual([{ reencrypted: 0, undecryptable: 2 }]);
    });

    it("--dry-run при нерасшифровываемых значениях: код 0, журнал пуст", async () => {
      await insertSecret(getDataSource(), garbage);

      const result = await runDryRun();

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([dryRunHeader, `${fieldName}\tv1\t1`]);
      expect(await auditRows(getDataSource())).toEqual([]);
    });
  });

  describe("ошибка во время перешифровки", () => {
    it("код 1, error в stderr, событие и запись журнала не создаются, значение не меняется", async () => {
      await insertVersion1Values(getDataSource(), ["first"]);
      const rowsBefore = await readSecretRows(getDataSource());
      vi.spyOn(EncryptionService.prototype, "encrypt").mockImplementation(() => {
        throw new Error("encrypt failed");
      });

      const result = await runReencrypt();

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain("error: encrypt failed");
      expect(secretsEvents()).toEqual([]);
      expect(await auditRows(getDataSource())).toEqual([]);
      expect(await readSecretRows(getDataSource())).toEqual(rowsBefore);
    });
  });
});
