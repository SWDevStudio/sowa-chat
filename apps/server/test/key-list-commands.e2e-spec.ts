import { ApiKey } from "../src/domain/keys/api-key.entity.js";
import { createProject } from "./support/fixtures.js";
import {
  createKey,
  createdKey,
  insertBotKey,
  keyListHeader,
  keyRowByPrefix,
  listKeys,
  revokeKey,
  setupMainProject,
  tableRows,
  useApiKeysService,
} from "./support/key-cli.js";
import { nonEmptyLines, outputOf } from "./support/project-cli.js";
import { allRowsAsText } from "./support/project-rows.js";
import { useTestDatabase } from "./support/test-database.js";

const commandTimeout = 600_000;

describe("команда key:list и ApiKeysService.list", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const getKeys = useApiKeysService();

  describe("key:list", () => {
    it("печатает заголовок и по строке на каждый ключ в порядке создания, оба active", async () => {
      const main = await setupMainProject();
      const added = await createdKey("main");

      const result = await listKeys("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      const rows = tableRows(result.stdout);
      expect(rows[0]).toEqual(keyListHeader);
      expect(rows.slice(1)).toEqual(
        [main.firstPrefix, added.prefix].map((prefix) => [
          prefix,
          expect.stringMatching(/^\d{4}-\d{2}-\d{2}T[\d:.]+Z$/),
          "-",
          "active",
        ]),
      );
    });

    it("createdAt в строке — ISO-дата из api_keys", async () => {
      const main = await setupMainProject();

      const result = await listKeys("main");

      const row = await keyRowByPrefix(getDataSource(), main.firstPrefix);
      expect(tableRows(result.stdout)[1]?.[1]).toBe(row.createdAt.toISOString());
    });

    it("не выводит открытые ключи, хеши и id ключей", async () => {
      const main = await setupMainProject();
      const added = await createdKey("main");

      const result = await listKeys("main");

      const rows = await getDataSource().getRepository(ApiKey).find();
      expect(result.stdout).not.toContain(main.firstKey);
      expect(result.stdout).not.toContain(added.key);
      expect(result.stderr).not.toContain(main.firstKey);
      for (const row of rows) {
        expect(result.stdout).not.toContain(row.id);
        expect(result.stdout).not.toContain(row.keyHash.toString("hex"));
        expect(result.stdout).not.toContain(row.keyHash.toString("base64"));
      }
    });

    it("после verify показывает lastUsedAt датой", async () => {
      const main = await setupMainProject();
      await getKeys().verify(main.firstKey, "server");

      const result = await listKeys("main");

      const row = await keyRowByPrefix(getDataSource(), main.firstPrefix);
      expect(row.lastUsedAt).not.toBeNull();
      const [firstRow] = tableRows(result.stdout).slice(1);
      expect(firstRow?.[2]).toBe(row.lastUsedAt?.toISOString());
    });

    it("показывает отозванный ключ как revoked, второй остаётся active", async () => {
      const main = await setupMainProject();
      const added = await createdKey("main");
      await revokeKey(main.firstPrefix);

      const result = await listKeys("main");

      const statuses = Object.fromEntries(
        tableRows(result.stdout)
          .slice(1)
          .map((row) => [row[0], row[3]]),
      );
      expect(statuses).toEqual({ [main.firstPrefix]: "revoked", [added.prefix]: "active" });
    });

    it("показывает только server-ключи: ключ бота не попадает в список", async () => {
      const main = await setupMainProject();
      const bot = await insertBotKey(getDataSource(), main.projectId);

      const result = await listKeys("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(result.stdout).not.toContain(bot.prefix);
      expect(
        tableRows(result.stdout)
          .slice(1)
          .map((row) => row[0]),
      ).toEqual([main.firstPrefix]);
    });

    it("проект без ключей — только заголовок", async () => {
      await setupMainProject();
      await createProject(getDataSource(), { name: "bare" });

      const result = await listKeys("bare");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(nonEmptyLines(result.stdout)).toEqual([keyListHeader.join("\t")]);
    });

    it("неизвестный проект: код 1 и ошибка Project not found", async () => {
      const result = await listKeys("unknown");

      expect(result.exitCode, outputOf(result)).toBe(1);
      expect(result.stderr).toContain('error: Project "unknown" not found');
    });

    it("не меняет БД", async () => {
      await setupMainProject();
      await createKey("main");
      const before = await allRowsAsText(getDataSource());

      const result = await listKeys("main");

      expect(result.exitCode, outputOf(result)).toBe(0);
      expect(await allRowsAsText(getDataSource())).toBe(before);
    });
  });

  describe("ApiKeysService.list", () => {
    it("возвращает server-ключи проекта по createdAt ASC только с полями prefix, createdAt, lastUsedAt, revokedAt", async () => {
      const main = await setupMainProject();
      const added = await createdKey("main");
      await revokeKey(added.prefix);
      await insertBotKey(getDataSource(), main.projectId);

      const summaries = await getKeys().list(main.projectId, "server");

      expect(summaries.map((summary) => summary.prefix)).toEqual([main.firstPrefix, added.prefix]);
      for (const summary of summaries) {
        expect(Object.keys(summary).sort()).toEqual([
          "createdAt",
          "lastUsedAt",
          "prefix",
          "revokedAt",
        ]);
      }
      expect(summaries[0]?.revokedAt).toBeNull();
      expect(summaries[1]?.revokedAt).toBeInstanceOf(Date);
    });

    it("для kind bot возвращает только ключи ботов", async () => {
      const main = await setupMainProject();
      const bot = await insertBotKey(getDataSource(), main.projectId);

      const summaries = await getKeys().list(main.projectId, "bot");

      expect(summaries.map((summary) => summary.prefix)).toEqual([bot.prefix]);
    });
  });
});
