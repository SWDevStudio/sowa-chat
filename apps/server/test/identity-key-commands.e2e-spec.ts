import { IdentityKey } from "../src/domain/keys/identity-key.entity.js";
import { createProject } from "./support/fixtures.js";
import {
  addEd25519Key,
  addIdentityKey,
  addP256Key,
  generateRsaPublicPem,
  identityKeyListHeader,
  listIdentityKeys,
  revokeIdentityKey,
  setupMainProject,
  usePemDirectory,
} from "./support/identity-key-cli.js";
import { auditRowsByAction, identityKeyRows } from "./support/identity-key-rows.js";
import { generateEd25519Pems, generateP256Pems } from "./support/identity-pems.js";
import { nonEmptyLines, outputOf, valueOf } from "./support/project-cli.js";
import { allRowsAsText } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

describe("команды identity-key:add, identity-key:list и identity-key:revoke", () => {
  const getDataSource = useTestDatabase();
  const writePem = usePemDirectory();

  async function expectNoKeyRows(): Promise<void> {
    expect(await identityKeyRows(getDataSource())).toEqual([]);
    expect(await auditRowsByAction(getDataSource(), "identityKey.added")).toEqual([]);
  }

  describe("identity-key:add", { timeout: commandTimeout }, () => {
    it("Ed25519: код 0, stdout kid и alg EdDSA, строка в identity_keys и identityKey.added", async () => {
      await setupMainProject();
      const file = writePem("ed.pem", generateEd25519Pems().publicPem);

      const result = await addIdentityKey("main", "main-1", file);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual(["kid: main-1", "alg: EdDSA"]);
      const [row, ...others] = await identityKeyRows(getDataSource());
      expect(others).toEqual([]);
      expect(row).toMatchObject({ kid: "main-1", alg: "EdDSA", revokedAt: null });
      const added = await auditRowsByAction(getDataSource(), "identityKey.added");
      expect(added).toHaveLength(1);
      expect(added[0]).toMatchObject({
        projectId: row?.projectId,
        actorKind: "cli",
        targetKind: "identityKey",
        targetId: row?.id,
        data: { kid: "main-1", alg: "EdDSA" },
      });
    });

    it("P-256 после Ed25519: stdout alg ES256, в identity_keys две строки, два identityKey.added", async () => {
      await setupMainProject();
      const first = await addEd25519Key(writePem, "main", "main-1");

      const second = await addP256Key(writePem, "main", "main-2");

      expect(valueOf(nonEmptyLines(first.stdout), "alg")).toBe("EdDSA");
      expect(nonEmptyLines(second.stdout)).toEqual(["kid: main-2", "alg: ES256"]);
      const rows = await identityKeyRows(getDataSource());
      expect(rows.map((row) => row.alg)).toEqual(["EdDSA", "ES256"]);
      expect(await auditRowsByAction(getDataSource(), "identityKey.added")).toHaveLength(2);
    });

    it("текста PEM нет ни в stdout, ни в stderr, ни в БД; в JWK нет d", async () => {
      await setupMainProject();
      const { publicPem } = generateP256Pems();
      const pemBody = publicPem.split("\n")[1] ?? "";

      const result = await addIdentityKey("main", "main-1", writePem("ec.pem", publicPem));

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(pemBody).not.toBe("");
      expect(result.stdout).not.toContain(pemBody);
      expect(result.stderr).not.toContain(pemBody);
      expect(await allRowsAsText(getDataSource())).not.toContain(pemBody);
      const [row] = await identityKeyRows(getDataSource());
      expect(row?.publicKey).not.toHaveProperty("d");
    });

    it.each([
      { name: "RSA-ключ", file: "rsa.pem", pem: () => generateRsaPublicPem() },
      {
        name: "приватный Ed25519",
        file: "private.pem",
        pem: () => generateEd25519Pems().privatePem,
      },
      { name: "не PEM", file: "garbage.pem", pem: () => "not a pem at all" },
    ])("$name: код 1, сообщение в stderr, новых строк нет", async (scenario) => {
      await setupMainProject();
      const file = writePem(scenario.file, scenario.pem());

      const result = await addIdentityKey("main", "bad-1", file);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain("error: ");
      expect(result.stdout).not.toContain("alg:");
      await expectNoKeyRows();
    });

    it("несуществующий файл: код 1, Cannot read file с путём, новых строк нет", async () => {
      await setupMainProject();
      const missing = `${writePem("present.pem", "x")}.missing`;

      const result = await addIdentityKey("main", "main-1", missing);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain(`error: Cannot read file "${missing}"`);
      await expectNoKeyRows();
    });

    it("повторный kid: код 1, остаётся одна строка и один identityKey.added", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");
      const otherFile = writePem("other.pem", generateP256Pems().publicPem);

      const result = await addIdentityKey("main", "main-1", otherFile);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Identity key "main-1" already exists');
      expect(await identityKeyRows(getDataSource())).toHaveLength(1);
      expect(await auditRowsByAction(getDataSource(), "identityKey.added")).toHaveLength(1);
    });

    it("недопустимый kid: код 1, новых строк нет", async () => {
      await setupMainProject();
      const file = writePem("ed.pem", generateEd25519Pems().publicPem);

      const result = await addIdentityKey("main", "bad kid!", file);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain("error: ");
      await expectNoKeyRows();
    });

    it("неизвестный проект: код 1, Project not found, новых строк нет", async () => {
      await setupMainProject();
      const file = writePem("ed.pem", generateEd25519Pems().publicPem);

      const result = await addIdentityKey("unknown", "main-1", file);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
      await expectNoKeyRows();
    });
  });

  describe("identity-key:list", { timeout: commandTimeout }, () => {
    it("показывает kid, alg, дату ISO и active; JWK не выводится", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");
      await addP256Key(writePem, "main", "main-2");

      const result = await listIdentityKeys("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      const lines = nonEmptyLines(result.stdout).map((line) => line.split("\t"));
      expect(lines[0]).toEqual(identityKeyListHeader);
      const rows = lines.slice(1);
      expect(rows.map((row) => row.slice(0, 2))).toEqual([
        ["main-1", "EdDSA"],
        ["main-2", "ES256"],
      ]);
      for (const row of rows) {
        expect(row[2]).toMatch(isoDatePattern);
        expect(row[3]).toBe("active");
      }
      for (const key of await getDataSource().getRepository(IdentityKey).find()) {
        for (const value of Object.values(key.publicKey)) {
          if (typeof value === "string") {
            expect(result.stdout).not.toContain(value);
          }
        }
      }
    });

    it("после identity-key:revoke статус revoked, у другого ключа active", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");
      await addP256Key(writePem, "main", "main-2");
      await revokeIdentityKey("main", "main-1");

      const result = await listIdentityKeys("main");

      const rows = nonEmptyLines(result.stdout).map((line) => line.split("\t"));
      expect(rows.slice(1).map((row) => [row[0], row[3]])).toEqual([
        ["main-1", "revoked"],
        ["main-2", "active"],
      ]);
    });

    it("проект без ключей и ключи другого проекта: только заголовок", async () => {
      await setupMainProject();
      await createProject(getDataSource(), { name: "other" });
      await addEd25519Key(writePem, "other", "o-1");

      const result = await listIdentityKeys("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([identityKeyListHeader.join("\t")]);
    });

    it("неизвестный проект: код 1, Project not found", async () => {
      const result = await listIdentityKeys("unknown");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
    });
  });

  describe("identity-key:revoke", { timeout: commandTimeout }, () => {
    it("печатает revoked: <kid>, ставит revokedAt и пишет identityKey.revoked от cli", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");

      const result = await revokeIdentityKey("main", "main-1");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual(["revoked: main-1"]);
      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeInstanceOf(Date);
      const revoked = await auditRowsByAction(getDataSource(), "identityKey.revoked");
      expect(revoked).toHaveLength(1);
      expect(revoked[0]).toMatchObject({
        projectId: row?.projectId,
        actorKind: "cli",
        targetKind: "identityKey",
        targetId: row?.id,
        data: { kid: "main-1", alg: "EdDSA" },
      });
    });

    it("повторный revoke: код 1, No active identity key, второй записи аудита нет", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");
      await revokeIdentityKey("main", "main-1");

      const result = await revokeIdentityKey("main", "main-1");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: No active identity key "main-1" in project "main"');
      expect(await auditRowsByAction(getDataSource(), "identityKey.revoked")).toHaveLength(1);
    });

    it("неизвестный kid: код 1, ключ не тронут", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");

      const result = await revokeIdentityKey("main", "nope");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: No active identity key "nope" in project "main"');
      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeNull();
    });

    it("kid другого проекта: код 1, чужой ключ не отозван", async () => {
      await setupMainProject();
      await createProject(getDataSource(), { name: "other" });
      await addEd25519Key(writePem, "other", "o-1");

      const result = await revokeIdentityKey("main", "o-1");

      expect(result.exitCode, outputOf(result)).toBe(1);
      const [row] = await identityKeyRows(getDataSource());
      expect(row?.revokedAt).toBeNull();
    });

    it("неизвестный проект: код 1, Project not found", async () => {
      const result = await revokeIdentityKey("unknown", "main-1");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
    });

    it("kid отозванного ключа повторно добавить нельзя", async () => {
      await setupMainProject();
      await addEd25519Key(writePem, "main", "main-1");
      await revokeIdentityKey("main", "main-1");

      const result = await addIdentityKey(
        "main",
        "main-1",
        writePem("again.pem", generateEd25519Pems().publicPem),
      );

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(await identityKeyRows(getDataSource())).toHaveLength(1);
    });
  });
});
