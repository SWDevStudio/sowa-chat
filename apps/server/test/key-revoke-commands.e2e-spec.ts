import {
  auditRowsByAction,
  createdKey,
  insertBotKey,
  keyRowByPrefix,
  revokeKey,
  setupMainProject,
  useApiKeysService,
} from "./support/key-cli.js";
import { nonEmptyLines, outputOf } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;

describe("команда key:revoke", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const getKeys = useApiKeysService();

  describe("key:revoke", () => {
    it("печатает revoked: <prefix> и отзывает ключ: verify не проходит, второй ключ проходит", async () => {
      const main = await setupMainProject();
      const added = await createdKey("main");

      const result = await revokeKey(main.firstPrefix);

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([`revoked: ${main.firstPrefix}`]);
      expect(await getKeys().verify(main.firstKey, "server")).toBeUndefined();
      expect(await getKeys().verify(added.key, "server")).toMatchObject({
        projectId: main.projectId,
      });
      const row = await keyRowByPrefix(getDataSource(), main.firstPrefix);
      expect(row.revokedAt).toBeInstanceOf(Date);
    });

    it("пишет в audit_log apiKey.revoked от cli для отозванного ключа", async () => {
      const main = await setupMainProject();

      await revokeKey(main.firstPrefix);

      const row = await keyRowByPrefix(getDataSource(), main.firstPrefix);
      const revoked = await auditRowsByAction(getDataSource(), "apiKey.revoked");
      expect(revoked).toHaveLength(1);
      expect(revoked[0]).toMatchObject({
        projectId: main.projectId,
        actorKind: "cli",
        targetKind: "apiKey",
        targetId: row.id,
        data: { kind: "server", prefix: main.firstPrefix },
      });
    });

    it("повторный key:revoke: код 1, No active server key, второй записи аудита нет", async () => {
      const main = await setupMainProject();
      await revokeKey(main.firstPrefix);

      const result = await revokeKey(main.firstPrefix);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain(
        `error: No active server key with prefix "${main.firstPrefix}"`,
      );
      expect(result.stdout).not.toContain("revoked:");
      expect(await auditRowsByAction(getDataSource(), "apiKey.revoked")).toHaveLength(1);
    });

    it("неизвестный prefix с sk_: код 1 и No active server key", async () => {
      await setupMainProject();

      const result = await revokeKey("sk_unknownprefix");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: No active server key with prefix "sk_unknownprefix"');
    });

    it("prefix ровно sk_ проходит проверку формата и даёт No active server key", async () => {
      await setupMainProject();

      const result = await revokeKey("sk_");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: No active server key with prefix "sk_"');
    });

    it("prefix с bk_: код 1, Prefix must start with sk_, ключ бота остаётся активным", async () => {
      const main = await setupMainProject();
      const bot = await insertBotKey(getDataSource(), main.projectId);

      const result = await revokeKey(bot.prefix);

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain("error: Prefix must start with sk_");
      expect((await keyRowByPrefix(getDataSource(), bot.prefix)).revokedAt).toBeNull();
      expect(await getKeys().verify(bot.key, "bot")).toMatchObject({ projectId: main.projectId });
      expect(await auditRowsByAction(getDataSource(), "apiKey.revoked")).toEqual([]);
    });

    it("prefix без sk_: код 1, Prefix must start with sk_", async () => {
      await setupMainProject();

      const result = await revokeKey("garbage");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain("error: Prefix must start with sk_");
    });

    it("не пишет открытый ключ в вывод", async () => {
      const main = await setupMainProject();

      const result = await revokeKey(main.firstPrefix);

      expect(result.stdout).not.toContain(main.firstKey);
      expect(result.stderr).not.toContain(main.firstKey);
    });
  });
});
