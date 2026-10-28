import type { TestingModule } from "@nestjs/testing";
import type { DataSource } from "typeorm";
import { EncryptionService } from "../src/infra/crypto/encryption.service.js";
import { registeredEncryptedFields } from "../src/infra/crypto/registered-encrypted-fields.js";
import {
  reencryptionBatchSize,
  SecretsReencryptionService,
} from "../src/infra/crypto/secrets-reencryption.service.js";
import { useTestDatabase } from "./support/test-database.js";
import {
  createReencryptionModule,
  createRegisteredFieldsModule,
  createTestSecretsTable,
  dropTestSecretsTable,
  insertSecret,
  insertVersion1Secrets,
  key1,
  key2,
  lockWaitCount,
  readSecret,
  readSecretRows,
  type SecretRow,
  tamperTag,
  testField,
  version1Encryption,
  version2Encryption,
} from "./support/test-secrets.js";

const heavyTestTimeout = 60_000;

function fieldReport(reencrypted: number) {
  return { fields: [{ ...testField, reencrypted }], undecryptable: [] };
}

function plaintextsById(rows: SecretRow[]): Map<string, string> {
  return new Map(rows.map((row) => [row.id, version1Encryption.decrypt(row.secret ?? "")]));
}

function expectReencryptedTo(rows: SecretRow[], plaintexts: Map<string, string>): void {
  for (const row of rows) {
    expect(row.secret?.startsWith("v2.")).toBe(true);
    expect(version2Encryption.decrypt(row.secret ?? "")).toBe(plaintexts.get(row.id));
  }
}

describe("перешифровка секретов", () => {
  const getDataSource = useTestDatabase();
  let dataSource: DataSource;
  let moduleRef: TestingModule;
  let reencryption: SecretsReencryptionService;
  let encryption: EncryptionService;

  beforeAll(async () => {
    dataSource = getDataSource();
    await createTestSecretsTable(dataSource);
    moduleRef = await createReencryptionModule([key1, key2]);
    reencryption = moduleRef.get(SecretsReencryptionService);
    encryption = moduleRef.get(EncryptionService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await moduleRef?.close();
    await dropTestSecretsTable(dataSource);
  });

  it("пачка — 500 строк, реестр полей пока пуст", () => {
    expect(reencryptionBatchSize).toBe(500);
    expect(registeredEncryptedFields).toEqual([]);
  });

  it(
    "1201 значение версии 1 перешифровываются в v2, повторный запуск ничего не меняет",
    async () => {
      await insertVersion1Secrets(dataSource, 1201);
      const plaintexts = plaintextsById(await readSecretRows(dataSource));

      await expect(reencryption.reencrypt({ actorKind: "cli" })).resolves.toEqual(
        fieldReport(1201),
      );

      const reencryptedRows = await readSecretRows(dataSource);
      expect(reencryptedRows).toHaveLength(1201);
      expectReencryptedTo(reencryptedRows, plaintexts);

      await expect(reencryption.reencrypt({ actorKind: "cli" })).resolves.toEqual(fieldReport(0));
      expect(await readSecretRows(dataSource)).toEqual(reencryptedRows);
    },
    heavyTestTimeout,
  );

  it.each([1, 499, 500, 501])(
    "%i значений на границе пачки перешифровываются все",
    async (count) => {
      await insertVersion1Secrets(dataSource, count);
      const plaintexts = plaintextsById(await readSecretRows(dataSource));

      await expect(reencryption.reencrypt({ actorKind: "cli" })).resolves.toEqual(
        fieldReport(count),
      );

      expectReencryptedTo(await readSecretRows(dataSource), plaintexts);
    },
    heavyTestTimeout,
  );

  it("пустая таблица — перешифровано 0", async () => {
    await expect(reencryption.reencrypt({ actorKind: "cli" })).resolves.toEqual(fieldReport(0));
  });

  it(
    "ошибка encrypt на 600-м вызове откатывает только текущую пачку, следующий запуск доделывает остальные 701",
    async () => {
      await insertVersion1Secrets(dataSource, 1201);
      const originalRows = await readSecretRows(dataSource);
      const plaintexts = plaintextsById(originalRows);
      const encrypt = encryption.encrypt.bind(encryption);
      let calls = 0;
      vi.spyOn(encryption, "encrypt").mockImplementation((plaintext) => {
        calls += 1;
        if (calls === 600) {
          throw new Error("encrypt failed");
        }
        return encrypt(plaintext);
      });

      await expect(reencryption.reencrypt({ actorKind: "cli" })).rejects.toThrow("encrypt failed");
      vi.restoreAllMocks();

      const rowsAfterFailure = await readSecretRows(dataSource);
      expectReencryptedTo(rowsAfterFailure.slice(0, 500), plaintexts);
      expect(rowsAfterFailure.slice(500)).toEqual(originalRows.slice(500));

      await expect(reencryption.reencrypt({ actorKind: "cli" })).resolves.toEqual(fieldReport(701));

      const finalRows = await readSecretRows(dataSource);
      expect(finalRows.slice(0, 500)).toEqual(rowsAfterFailure.slice(0, 500));
      expectReencryptedTo(finalRows, plaintexts);
    },
    heavyTestTimeout,
  );

  it("нерасшифровываемые значения не меняются и попадают в отчёт только как table, column, id; NULL пропускается", async () => {
    const garbage = "v1.мусор";
    const tampered = tamperTag(version1Encryption.encrypt("tampered-secret"));
    const firstId = await insertSecret(dataSource, version1Encryption.encrypt("first-secret"));
    const garbageId = await insertSecret(dataSource, garbage);
    const tamperedId = await insertSecret(dataSource, tampered);
    const nullId = await insertSecret(dataSource, null);
    const lastId = await insertSecret(dataSource, version1Encryption.encrypt("last-secret"));

    const report = await reencryption.reencrypt({ actorKind: "cli" });

    expect(report.fields).toEqual([{ ...testField, reencrypted: 2 }]);
    expect(report.undecryptable).toHaveLength(2);
    expect(report.undecryptable).toEqual(
      expect.arrayContaining([
        { ...testField, id: garbageId },
        { ...testField, id: tamperedId },
      ]),
    );
    const serializedReport = JSON.stringify(report);
    expect(serializedReport).not.toContain(garbage);
    expect(serializedReport).not.toContain(tampered);
    expect(serializedReport).not.toContain("tampered-secret");
    expect(serializedReport).not.toContain("first-secret");
    expect(await readSecret(dataSource, garbageId)).toBe(garbage);
    expect(await readSecret(dataSource, tamperedId)).toBe(tampered);
    expect(await readSecret(dataSource, nullId)).toBeNull();
    const firstValue = (await readSecret(dataSource, firstId)) ?? "";
    const lastValue = (await readSecret(dataSource, lastId)) ?? "";
    expect(version2Encryption.decrypt(firstValue)).toBe("first-secret");
    expect(version2Encryption.decrypt(lastValue)).toBe("last-secret");

    const repeated = await reencryption.reencrypt({ actorKind: "cli" });

    expect(repeated.fields).toEqual([{ ...testField, reencrypted: 0 }]);
    expect(repeated.undecryptable).toHaveLength(2);
  });

  it("значение, которое поменяли во время перешифровки, не перезаписывается и не считается", async () => {
    await insertSecret(dataSource, version1Encryption.encrypt("first-secret"));
    const changedId = await insertSecret(dataSource, version1Encryption.encrypt("old-secret"));
    await insertSecret(dataSource, version1Encryption.encrypt("last-secret"));
    const changedValue = version1Encryption.encrypt("changed-secret");
    const locker = dataSource.createQueryRunner();
    await locker.connect();

    try {
      await locker.startTransaction();
      await locker.query('SELECT "id" FROM "test_secrets" WHERE "id" = $1 FOR UPDATE', [changedId]);
      const running = reencryption.reencrypt({ actorKind: "cli" });
      running.catch(() => undefined);

      await vi.waitFor(
        async () => {
          expect(await lockWaitCount(dataSource)).toBeGreaterThan(0);
        },
        { timeout: 10_000, interval: 20 },
      );
      await locker.query('UPDATE "test_secrets" SET "secret" = $1 WHERE "id" = $2', [
        changedValue,
        changedId,
      ]);
      await locker.commitTransaction();

      await expect(running).resolves.toEqual(fieldReport(2));
    } finally {
      await locker.release();
    }

    expect(await readSecret(dataSource, changedId)).toBe(changedValue);
    await expect(reencryption.reencrypt({ actorKind: "cli" })).resolves.toEqual(fieldReport(1));
    const reencryptedValue = (await readSecret(dataSource, changedId)) ?? "";
    expect(version2Encryption.decrypt(reencryptedValue)).toBe("changed-secret");
  });

  it("countVersions до и после перешифровки и не меняет строки", async () => {
    await insertVersion1Secrets(dataSource, 3);
    await insertSecret(dataSource, null);
    const originalRows = await readSecretRows(dataSource);

    await expect(reencryption.countVersions()).resolves.toEqual([
      { ...testField, version: 1, count: 3 },
    ]);
    expect(await readSecretRows(dataSource)).toEqual(originalRows);

    await reencryption.reencrypt({ actorKind: "cli" });
    const reencryptedRows = await readSecretRows(dataSource);

    await expect(reencryption.countVersions()).resolves.toEqual([
      { ...testField, version: 2, count: 3 },
    ]);
    expect(await readSecretRows(dataSource)).toEqual(reencryptedRows);
  });

  it("countVersions считает каждую версию отдельно, значения не в формате — с версией null", async () => {
    await insertSecret(dataSource, version1Encryption.encrypt("first-secret"));
    await insertSecret(dataSource, version1Encryption.encrypt("second-secret"));
    await insertSecret(dataSource, "v1.мусор");
    await insertSecret(dataSource, encryption.encrypt("current-secret"));
    await insertSecret(dataSource, "not-encrypted");
    await insertSecret(dataSource, null);

    await expect(reencryption.countVersions()).resolves.toEqual([
      { ...testField, version: 1, count: 3 },
      { ...testField, version: 2, count: 1 },
      { ...testField, version: null, count: 1 },
    ]);
  });

  it("countVersions на пустой таблице — пустой список", async () => {
    await expect(reencryption.countVersions()).resolves.toEqual([]);
  });

  it("без ключей reencrypt отклоняется и ничего не меняет", async () => {
    await insertVersion1Secrets(dataSource, 3);
    const originalRows = await readSecretRows(dataSource);
    const withoutKeys = await createReencryptionModule([]);

    try {
      const service = withoutKeys.get(SecretsReencryptionService);
      await expect(service.reencrypt({ actorKind: "cli" })).rejects.toThrow(
        "SOWA_ENCRYPTION_KEYS is not set",
      );
    } finally {
      await withoutKeys.close();
    }

    expect(await readSecretRows(dataSource)).toEqual(originalRows);
  });

  it("модуль по умолчанию берёт поля из registeredEncryptedFields", async () => {
    await insertVersion1Secrets(dataSource, 3);
    const originalRows = await readSecretRows(dataSource);
    const withRegisteredFields = await createRegisteredFieldsModule([key1, key2]);

    try {
      const service = withRegisteredFields.get(SecretsReencryptionService);
      await expect(service.reencrypt({ actorKind: "cli" })).resolves.toEqual({
        fields: [],
        undecryptable: [],
      });
      await expect(service.countVersions()).resolves.toEqual([]);
    } finally {
      await withRegisteredFields.close();
    }

    expect(await readSecretRows(dataSource)).toEqual(originalRows);
  });
});
