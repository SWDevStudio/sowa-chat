import { randomUUID } from "node:crypto";
import { ApiKey, apiKeyKinds } from "../src/domain/keys/api-key.entity.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

interface ColumnRow {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

const expectedColumns: Record<string, { type: string; nullable: string }> = {
  id: { type: "uuid", nullable: "NO" },
  project_id: { type: "uuid", nullable: "NO" },
  kind: { type: "text", nullable: "NO" },
  prefix: { type: "text", nullable: "NO" },
  key_hash: { type: "bytea", nullable: "NO" },
  bot_id: { type: "uuid", nullable: "YES" },
  created_at: { type: "timestamp with time zone", nullable: "NO" },
  last_used_at: { type: "timestamp with time zone", nullable: "YES" },
  revoked_at: { type: "timestamp with time zone", nullable: "YES" },
};

const insertSql = `INSERT INTO "api_keys" ("project_id", "kind", "prefix", "key_hash", "bot_id") VALUES ($1, $2, $3, $4, $5)`;

function hash(): Buffer {
  return Buffer.alloc(32, 1);
}

describe("таблица api_keys", () => {
  const getDataSource = useTestDatabase();

  it("содержит ровно колонки из задачи с типами и is_nullable", async () => {
    const rows: ColumnRow[] = await getDataSource().query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'api_keys'",
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.column_name, { type: row.data_type, nullable: row.is_nullable }]),
    );
    expect(actual).toEqual(expectedColumns);
  });

  it("содержит индекс IDX_api_keys_project_id", async () => {
    const rows: { indexname: string }[] = await getDataSource().query(
      "SELECT indexname FROM pg_indexes WHERE tablename = 'api_keys'",
    );

    expect(rows.map((row) => row.indexname)).toContain("IDX_api_keys_project_id");
  });

  it("apiKeyKinds содержит server и bot", () => {
    expect([...apiKeyKinds]).toEqual(["server", "bot"]);
  });

  it("сущность ApiKey сохраняет ключ с uuid v7, createdAt и пустыми датами", async () => {
    const project = await createProject(getDataSource());
    const repository = getDataSource().getRepository(ApiKey);

    const saved = await repository.save(
      repository.create({
        projectId: project.id,
        kind: "server",
        prefix: `sk_${randomUUID()}`,
        keyHash: hash(),
        botId: null,
      }),
    );

    const stored = await repository.findOneByOrFail({ id: saved.id });
    expect(stored.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(stored.createdAt).toBeInstanceOf(Date);
    expect(stored.lastUsedAt).toBeNull();
    expect(stored.revokedAt).toBeNull();
    expect(stored.botId).toBeNull();
    expect(stored.keyHash).toEqual(hash());
  });

  it("принимает ключ bot с botId и ключ server без botId", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [
        project.id,
        "bot",
        `p_${randomUUID()}`,
        hash(),
        randomUUID(),
      ]),
    ).resolves.toBeDefined();
    await expect(
      getDataSource().query(insertSql, [project.id, "server", `p_${randomUUID()}`, hash(), null]),
    ).resolves.toBeDefined();
  });

  it("отклоняет второй ключ с тем же prefix кодом 23505", async () => {
    const project = await createProject(getDataSource());
    const prefix = `p_${randomUUID()}`;
    await getDataSource().query(insertSql, [project.id, "server", prefix, hash(), null]);

    await expect(
      getDataSource().query(insertSql, [project.id, "server", prefix, hash(), null]),
    ).rejects.toMatchObject({ code: "23505" });
  });

  it("отклоняет kind вне server и bot кодом 23514", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [project.id, "admin", `p_${randomUUID()}`, hash(), null]),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("отклоняет ключ bot без botId кодом 23514", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [project.id, "bot", `p_${randomUUID()}`, hash(), null]),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("отклоняет ключ server с botId кодом 23514", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [
        project.id,
        "server",
        `p_${randomUUID()}`,
        hash(),
        randomUUID(),
      ]),
    ).rejects.toMatchObject({ code: "23514" });
  });

  it("отклоняет projectId несуществующего проекта кодом 23503", async () => {
    await expect(
      getDataSource().query(insertSql, [randomUUID(), "server", `p_${randomUUID()}`, hash(), null]),
    ).rejects.toMatchObject({ code: "23503" });
  });

  it("удаление проекта удаляет его ключи и не трогает чужие", async () => {
    const project = await createProject(getDataSource());
    const other = await createProject(getDataSource());
    const ownPrefix = `p_${randomUUID()}`;
    const otherPrefix = `p_${randomUUID()}`;
    await getDataSource().query(insertSql, [project.id, "server", ownPrefix, hash(), null]);
    await getDataSource().query(insertSql, [other.id, "server", otherPrefix, hash(), null]);

    await getDataSource().query(`DELETE FROM "projects" WHERE "id" = $1`, [project.id]);

    const rows: { prefix: string }[] = await getDataSource().query(
      `SELECT "prefix" FROM "api_keys" WHERE "prefix" IN ($1, $2)`,
      [ownPrefix, otherPrefix],
    );
    expect(rows.map((row) => row.prefix)).toEqual([otherPrefix]);
  });
});
