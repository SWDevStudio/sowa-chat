import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import { actorKinds } from "../src/domain/audit/actor-kind.js";
import { AuditLogEntry } from "../src/domain/audit/audit-log-entry.entity.js";
import { AuditLogRepository } from "../src/domain/audit/audit-log.repository.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

interface ColumnRow {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

const expectedColumns: Record<string, { type: string; nullable: string }> = {
  id: { type: "uuid", nullable: "NO" },
  project_id: { type: "uuid", nullable: "YES" },
  actor_kind: { type: "text", nullable: "NO" },
  actor_id: { type: "text", nullable: "YES" },
  action: { type: "text", nullable: "NO" },
  target_kind: { type: "text", nullable: "NO" },
  target_id: { type: "text", nullable: "YES" },
  data: { type: "jsonb", nullable: "NO" },
  created_at: { type: "timestamp with time zone", nullable: "NO" },
};

const insertSql = `INSERT INTO "audit_log" ("project_id", "actor_kind", "action", "target_kind") VALUES ($1, $2, 'test.action', 'test')`;

describe("таблица audit_log", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let repository: AuditLogRepository;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule],
      providers: [AuditLogRepository],
    }).compile();
    await moduleRef.init();
    repository = moduleRef.get(AuditLogRepository);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  it("содержит ровно колонки из задачи с типами и is_nullable", async () => {
    const rows: ColumnRow[] = await getDataSource().query(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'audit_log'",
    );

    const actual = Object.fromEntries(
      rows.map((row) => [row.column_name, { type: row.data_type, nullable: row.is_nullable }]),
    );
    expect(actual).toEqual(expectedColumns);
  });

  it("содержит индекс IDX_audit_log_project_id_created_at", async () => {
    const rows: { indexname: string }[] = await getDataSource().query(
      "SELECT indexname FROM pg_indexes WHERE tablename = 'audit_log'",
    );

    expect(rows.map((row) => row.indexname)).toContain("IDX_audit_log_project_id_created_at");
  });

  it("create без data и с projectId null сохраняет запись с data {} и uuid v7", async () => {
    const created = await repository.create({
      projectId: null,
      actorKind: "system",
      actorId: null,
      action: "installation.started",
      targetKind: "installation",
      targetId: null,
    });

    expect(created.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(created.data).toEqual({});
    expect(created.projectId).toBeNull();
    expect(created.createdAt).toBeInstanceOf(Date);
    const stored = await getDataSource().getRepository(AuditLogEntry).findOneByOrFail({
      id: created.id,
    });
    expect(stored.data).toEqual({});
    expect(stored.actorId).toBeNull();
    expect(stored.targetId).toBeNull();
  });

  it("create сохраняет переданные поля и data", async () => {
    const project = await createProject(getDataSource());

    const created = await repository.create({
      projectId: project.id,
      actorKind: "operator",
      actorId: "operator-1",
      action: "apiKey.created",
      targetKind: "apiKey",
      targetId: "key-1",
      data: { scope: "bot" },
    });

    const stored = await getDataSource().getRepository(AuditLogEntry).findOneByOrFail({
      id: created.id,
    });
    expect(stored).toMatchObject({
      projectId: project.id,
      actorKind: "operator",
      actorId: "operator-1",
      action: "apiKey.created",
      targetKind: "apiKey",
      targetId: "key-1",
      data: { scope: "bot" },
    });
  });

  it.each(actorKinds)("принимает actor_kind %s", async (kind) => {
    await expect(getDataSource().query(insertSql, [null, kind])).resolves.toBeDefined();
  });

  it("отклоняет actor_kind не из actorKinds кодом 23514", async () => {
    await expect(getDataSource().query(insertSql, [null, "admin"])).rejects.toMatchObject({
      code: "23514",
    });
  });

  it("отклоняет projectId несуществующего проекта кодом 23503", async () => {
    await expect(getDataSource().query(insertSql, [randomUUID(), "system"])).rejects.toMatchObject({
      code: "23503",
    });
  });

  it("удаление проекта удаляет его записи журнала и не трогает чужие", async () => {
    const project = await createProject(getDataSource());
    const other = await createProject(getDataSource());
    await getDataSource().query(insertSql, [project.id, "cli"]);
    await getDataSource().query(insertSql, [other.id, "cli"]);
    await getDataSource().query(insertSql, [null, "cli"]);

    await getDataSource().query(`DELETE FROM "projects" WHERE "id" = $1`, [project.id]);

    const rows: { project_id: string | null }[] = await getDataSource().query(
      `SELECT "project_id" FROM "audit_log"`,
    );
    expect(rows.map((row) => row.project_id).sort()).toEqual([null, other.id].sort());
  });
});
