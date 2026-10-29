import { randomUUID } from "node:crypto";
import { Operator } from "../src/domain/operators/operator.entity.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

interface ColumnRow {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

interface ConstraintRow {
  conname: string;
  contype: string;
  delete_rule: string | null;
}

const expectedColumns: Record<string, { type: string; nullable: string }> = {
  id: { type: "uuid", nullable: "NO" },
  project_id: { type: "uuid", nullable: "NO" },
  external_id: { type: "text", nullable: "NO" },
  name: { type: "text", nullable: "NO" },
  avatar_url: { type: "text", nullable: "YES" },
  role: { type: "text", nullable: "NO" },
  max_chats: { type: "integer", nullable: "YES" },
  disabled_at: { type: "timestamp with time zone", nullable: "YES" },
};

const insertSql = `INSERT INTO "operators" ("project_id", "external_id", "name", "role") VALUES ($1, $2, $3, $4)`;

describe("таблица operators", () => {
  const getDataSource = useTestDatabase();

  it("содержит ровно колонки из задачи с типами и is_nullable", async () => {
    const rows: ColumnRow[] = await getDataSource().query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'operators'",
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.column_name, { type: row.data_type, nullable: row.is_nullable }]),
    );
    expect(actual).toEqual(expectedColumns);
  });

  it("не содержит колонок created_at и updated_at", async () => {
    const rows: { column_name: string }[] = await getDataSource().query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'operators' AND column_name IN ('created_at', 'updated_at')",
    );

    expect(rows).toEqual([]);
  });

  it("содержит ограничения с явными именами и каскадом у внешнего ключа", async () => {
    const rows: ConstraintRow[] = await getDataSource().query(
      `SELECT
        c.conname,
        c.contype,
        CASE c.confdeltype WHEN 'c' THEN 'CASCADE' END AS delete_rule
      FROM pg_constraint c
      JOIN pg_class cl ON cl.oid = c.conrelid
      JOIN pg_namespace n ON n.oid = cl.relnamespace
      WHERE c.contype IN ('p', 'f', 'u', 'c') AND n.nspname = 'public' AND cl.relname = 'operators'`,
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.conname, { type: row.contype, deleteRule: row.delete_rule }]),
    );
    expect(actual).toEqual({
      PK_operators: { type: "p", deleteRule: null },
      FK_operators_project_id: { type: "f", deleteRule: "CASCADE" },
      UQ_operators_project_id_external_id: { type: "u", deleteRule: null },
      CHK_operators_role: { type: "c", deleteRule: null },
    });
  });

  it("не содержит индексов кроме первичного ключа и уникального ограничения", async () => {
    const rows: { indexname: string }[] = await getDataSource().query(
      "SELECT indexname FROM pg_indexes WHERE tablename = 'operators'",
    );

    expect(rows.map((row) => row.indexname).sort()).toEqual([
      "PK_operators",
      "UQ_operators_project_id_external_id",
    ]);
  });

  it("сущность Operator сохраняет оператора с uuid v7 и пустыми необязательными полями", async () => {
    const project = await createProject(getDataSource());
    const repository = getDataSource().getRepository(Operator);

    const saved = await repository.save(
      repository.create({
        projectId: project.id,
        externalId: "ext-1",
        name: "Анна",
        avatarUrl: null,
        role: "operator",
        maxChats: null,
        disabledAt: null,
      }),
    );

    const stored = await repository.findOneByOrFail({ id: saved.id });
    expect(stored.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(stored).toMatchObject({
      projectId: project.id,
      externalId: "ext-1",
      name: "Анна",
      avatarUrl: null,
      role: "operator",
      maxChats: null,
      disabledAt: null,
    });
  });

  it("сущность Operator сохраняет заполненные avatarUrl, maxChats и disabledAt", async () => {
    const project = await createProject(getDataSource());
    const repository = getDataSource().getRepository(Operator);
    const disabledAt = new Date("2026-01-02T03:04:05.000Z");

    const saved = await repository.save(
      repository.create({
        projectId: project.id,
        externalId: "ext-2",
        name: "Борис",
        avatarUrl: "https://example.com/avatar.png",
        role: "supervisor",
        maxChats: 5,
        disabledAt,
      }),
    );

    const stored = await repository.findOneByOrFail({ id: saved.id });
    expect(stored.avatarUrl).toBe("https://example.com/avatar.png");
    expect(stored.role).toBe("supervisor");
    expect(stored.maxChats).toBe(5);
    expect(stored.disabledAt).toEqual(disabledAt);
  });

  it("принимает обе роли: operator и supervisor", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [project.id, "a", "A", "operator"]),
    ).resolves.toBeDefined();
    await expect(
      getDataSource().query(insertSql, [project.id, "b", "B", "supervisor"]),
    ).resolves.toBeDefined();
  });

  it("отклоняет вторую строку с теми же projectId и externalId кодом 23505", async () => {
    const project = await createProject(getDataSource());
    await getDataSource().query(insertSql, [project.id, "same", "First", "operator"]);

    await expect(
      getDataSource().query(insertSql, [project.id, "same", "Second", "supervisor"]),
    ).rejects.toMatchObject({ code: "23505" });
  });

  it("сохраняет тот же externalId в другом проекте", async () => {
    const project = await createProject(getDataSource());
    const other = await createProject(getDataSource());
    await getDataSource().query(insertSql, [project.id, "same", "First", "operator"]);

    await expect(
      getDataSource().query(insertSql, [other.id, "same", "Second", "operator"]),
    ).resolves.toBeDefined();
  });

  it("считает externalId чувствительным к регистру", async () => {
    const project = await createProject(getDataSource());
    await getDataSource().query(insertSql, [project.id, "Ext", "First", "operator"]);

    await expect(
      getDataSource().query(insertSql, [project.id, "ext", "Second", "operator"]),
    ).resolves.toBeDefined();
  });

  it.each(["admin", "Operator", "SUPERVISOR", ""])(
    "отклоняет role %j кодом 23514",
    async (role) => {
      const project = await createProject(getDataSource());

      await expect(
        getDataSource().query(insertSql, [project.id, "ext", "Name", role]),
      ).rejects.toMatchObject({ code: "23514" });
    },
  );

  it("отклоняет пустые обязательные поля кодом 23502", async () => {
    const project = await createProject(getDataSource());

    await expect(
      getDataSource().query(insertSql, [project.id, null, "Name", "operator"]),
    ).rejects.toMatchObject({ code: "23502" });
    await expect(
      getDataSource().query(insertSql, [project.id, "ext", null, "operator"]),
    ).rejects.toMatchObject({ code: "23502" });
    await expect(
      getDataSource().query(insertSql, [project.id, "ext", "Name", null]),
    ).rejects.toMatchObject({ code: "23502" });
    await expect(
      getDataSource().query(insertSql, [null, "ext", "Name", "operator"]),
    ).rejects.toMatchObject({ code: "23502" });
  });

  it("отклоняет projectId несуществующего проекта кодом 23503", async () => {
    await expect(
      getDataSource().query(insertSql, [randomUUID(), "ext", "Name", "operator"]),
    ).rejects.toMatchObject({ code: "23503" });
  });

  it("удаление проекта удаляет его операторов и не трогает чужих", async () => {
    const project = await createProject(getDataSource());
    const other = await createProject(getDataSource());
    await getDataSource().query(insertSql, [project.id, "own-1", "Own 1", "operator"]);
    await getDataSource().query(insertSql, [project.id, "own-2", "Own 2", "supervisor"]);
    await getDataSource().query(insertSql, [other.id, "other", "Other", "operator"]);

    await getDataSource().query(`DELETE FROM "projects" WHERE "id" = $1`, [project.id]);

    const rows: { project_id: string; external_id: string }[] = await getDataSource().query(
      `SELECT "project_id", "external_id" FROM "operators"`,
    );
    expect(rows).toEqual([{ project_id: other.id, external_id: "other" }]);
  });
});
