import { randomBytes, randomUUID } from "node:crypto";
import type { DataSource } from "typeorm";
import { createVisitor } from "./support/chat-rows.js";
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

interface SessionRow {
  visitor_id: string;
  family_id: string;
  refresh_hash: Buffer;
  used_at: Date | null;
  revoked_at: Date | null;
}

const expectedColumns: Record<string, { type: string; nullable: string }> = {
  id: { type: "uuid", nullable: "NO" },
  visitor_id: { type: "uuid", nullable: "NO" },
  family_id: { type: "uuid", nullable: "NO" },
  refresh_hash: { type: "bytea", nullable: "NO" },
  expires_at: { type: "timestamp with time zone", nullable: "NO" },
  used_at: { type: "timestamp with time zone", nullable: "YES" },
  revoked_at: { type: "timestamp with time zone", nullable: "YES" },
};

const insertSql = `INSERT INTO "visitor_sessions" ("visitor_id", "family_id", "refresh_hash", "expires_at") VALUES ($1, $2, $3, $4) RETURNING "id"`;
const selectSessionsSql = `SELECT "visitor_id", "family_id", "refresh_hash", "used_at", "revoked_at" FROM "visitor_sessions"`;

const nextWeek = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

describe("таблица visitor_sessions", () => {
  const getDataSource = useTestDatabase();

  async function createVisitorId(dataSource: DataSource): Promise<string> {
    const project = await createProject(dataSource);
    const visitor = await createVisitor(dataSource, project);
    return visitor.id;
  }

  async function insertSession(
    visitorId: string,
    refreshHash: Buffer = randomBytes(32),
    familyId: string = randomUUID(),
  ): Promise<string> {
    const rows: { id: string }[] = await getDataSource().query(insertSql, [
      visitorId,
      familyId,
      refreshHash,
      nextWeek(),
    ]);
    return rows[0]!.id;
  }

  it("содержит ровно колонки из задачи с типами и is_nullable", async () => {
    const rows: ColumnRow[] = await getDataSource().query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'visitor_sessions'",
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.column_name, { type: row.data_type, nullable: row.is_nullable }]),
    );
    expect(actual).toEqual(expectedColumns);
  });

  it("не содержит колонок created_at и updated_at", async () => {
    const rows: { column_name: string }[] = await getDataSource().query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'visitor_sessions' AND column_name IN ('created_at', 'updated_at')",
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
      WHERE c.contype IN ('p', 'f', 'u', 'c') AND n.nspname = 'public' AND cl.relname = 'visitor_sessions'`,
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.conname, { type: row.contype, deleteRule: row.delete_rule }]),
    );
    expect(actual).toEqual({
      PK_visitor_sessions: { type: "p", deleteRule: null },
      UQ_visitor_sessions_refresh_hash: { type: "u", deleteRule: null },
      FK_visitor_sessions_visitor_id: { type: "f", deleteRule: "CASCADE" },
    });
  });

  it("внешний ключ ссылается на visitors(id)", async () => {
    const rows: { referenced_table: string; referenced_column: string }[] =
      await getDataSource().query(
        `SELECT ref.relname AS referenced_table, a.attname AS referenced_column
        FROM pg_constraint c
        JOIN pg_class ref ON ref.oid = c.confrelid
        JOIN pg_attribute a ON a.attrelid = c.confrelid AND a.attnum = ANY (c.confkey)
        WHERE c.conname = 'FK_visitor_sessions_visitor_id'`,
      );

    expect(rows).toEqual([{ referenced_table: "visitors", referenced_column: "id" }]);
  });

  it("содержит оба индекса и не содержит лишних", async () => {
    const rows: { indexname: string; indexdef: string }[] = await getDataSource().query(
      "SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'visitor_sessions'",
    );

    expect(rows.map((row) => row.indexname).sort()).toEqual([
      "IDX_visitor_sessions_family_id",
      "IDX_visitor_sessions_visitor_id",
      "PK_visitor_sessions",
      "UQ_visitor_sessions_refresh_hash",
    ]);
    const definitions = Object.fromEntries(rows.map((row) => [row.indexname, row.indexdef]));
    expect(definitions.IDX_visitor_sessions_family_id).toContain("(family_id)");
    expect(definitions.IDX_visitor_sessions_family_id).not.toContain("UNIQUE");
    expect(definitions.IDX_visitor_sessions_visitor_id).toContain("(visitor_id)");
    expect(definitions.IDX_visitor_sessions_visitor_id).not.toContain("UNIQUE");
  });

  it("проставляет uuid v7 по умолчанию и оставляет used_at и revoked_at пустыми", async () => {
    const visitorId = await createVisitorId(getDataSource());

    const id = await insertSession(visitorId);

    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    const rows: SessionRow[] = await getDataSource().query(selectSessionsSql);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ visitor_id: visitorId, used_at: null, revoked_at: null });
  });

  it("хранит refresh_hash как байты без изменений", async () => {
    const visitorId = await createVisitorId(getDataSource());
    const hash = randomBytes(32);

    await insertSession(visitorId, hash);

    const rows: SessionRow[] = await getDataSource().query(selectSessionsSql);
    expect(Buffer.compare(rows[0]!.refresh_hash, hash)).toBe(0);
  });

  it("допускает несколько строк с одним family_id", async () => {
    const visitorId = await createVisitorId(getDataSource());
    const familyId = randomUUID();
    await insertSession(visitorId, randomBytes(32), familyId);

    await expect(insertSession(visitorId, randomBytes(32), familyId)).resolves.toBeDefined();
  });

  it("отклоняет вторую строку с тем же refresh_hash кодом 23505", async () => {
    const visitorId = await createVisitorId(getDataSource());
    const hash = randomBytes(32);
    await insertSession(visitorId, hash);

    await expect(insertSession(visitorId, hash)).rejects.toMatchObject({ code: "23505" });
  });

  it("отклоняет тот же refresh_hash у другого посетителя кодом 23505", async () => {
    const visitorId = await createVisitorId(getDataSource());
    const otherVisitorId = await createVisitorId(getDataSource());
    const hash = randomBytes(32);
    await insertSession(visitorId, hash);

    await expect(insertSession(otherVisitorId, hash)).rejects.toMatchObject({ code: "23505" });
  });

  it("отклоняет несуществующего посетителя кодом 23503", async () => {
    await expect(insertSession(randomUUID())).rejects.toMatchObject({ code: "23503" });
  });

  it("отклоняет пустые обязательные поля кодом 23502", async () => {
    const visitorId = await createVisitorId(getDataSource());
    const validValues = [visitorId, randomUUID(), randomBytes(32), nextWeek()];

    for (let index = 0; index < validValues.length; index += 1) {
      const values = validValues.map((value, position) => (position === index ? null : value));
      await expect(getDataSource().query(insertSql, values)).rejects.toMatchObject({
        code: "23502",
      });
    }
  });

  it("удаление посетителя удаляет его сессии и не трогает чужие", async () => {
    const visitorId = await createVisitorId(getDataSource());
    const otherVisitorId = await createVisitorId(getDataSource());
    await insertSession(visitorId);
    await insertSession(visitorId);
    await insertSession(otherVisitorId);

    await getDataSource().query(`DELETE FROM "visitors" WHERE "id" = $1`, [visitorId]);

    const rows: SessionRow[] = await getDataSource().query(selectSessionsSql);
    expect(rows.map((row) => row.visitor_id)).toEqual([otherVisitorId]);
  });

  it("удаление проекта удаляет сессии его посетителей через каскад", async () => {
    const project = await createProject(getDataSource());
    const visitor = await createVisitor(getDataSource(), project);
    await insertSession(visitor.id);

    await getDataSource().query(`DELETE FROM "projects" WHERE "id" = $1`, [project.id]);

    const rows: SessionRow[] = await getDataSource().query(selectSessionsSql);
    expect(rows).toEqual([]);
  });
});
