import type { DataSource } from "typeorm";
import { databaseMigrations } from "../src/infra/database/database-migrations.js";
import { createConversation } from "./support/chat-rows.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

interface IndexRow {
  indexname: string;
  indexdef: string;
}

interface PlanRow {
  "QUERY PLAN": string;
}

const contextIndexName = "IDX_conversations_context";
const listIndexName = "IDX_conversations_project_status_last_message_at";
const conversationIndexesSql =
  "SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename = 'conversations'";
const secondaryIndexesSql = `${conversationIndexesSql} AND indexname NOT IN (SELECT conname FROM pg_constraint WHERE conrelid = 'conversations'::regclass)`;

async function explain(
  dataSource: DataSource,
  query: string,
  parameters: unknown[] = [],
): Promise<string> {
  return dataSource.transaction(async (manager) => {
    await manager.query("SET LOCAL enable_seqscan = off");
    const rows: PlanRow[] = await manager.query(`EXPLAIN ${query}`, parameters);
    return rows.map((row) => row["QUERY PLAN"]).join("\n");
  });
}

function indexDefinitionOf(rows: IndexRow[], name: string): string | undefined {
  return rows.find((row) => row.indexname === name)?.indexdef;
}

describe("индексы диалогов", () => {
  const getDataSource = useTestDatabase();

  describe("регистрация миграции", () => {
    it("AddConversationIndexes стоит в databaseMigrations после CreateChatTables", () => {
      const names = databaseMigrations.map((migration) => migration.name);
      const chatTablesPosition = names.findIndex((name) => /^CreateChatTables\d+$/.test(name));
      const indexesPosition = names.findIndex((name) => /^AddConversationIndexes\d+$/.test(name));

      expect(chatTablesPosition).toBeGreaterThanOrEqual(0);
      expect(indexesPosition).toBeGreaterThan(chatTablesPosition);
    });

    it("метка времени AddConversationIndexes больше метки CreateChatTables", () => {
      const timestampOf = (pattern: RegExp): number => {
        const migration = databaseMigrations.find((item) => pattern.test(item.name));
        return Number(migration?.name.match(/\d+$/)?.[0]);
      };

      expect(timestampOf(/^AddConversationIndexes\d+$/)).toBeGreaterThan(
        timestampOf(/^CreateChatTables\d+$/),
      );
    });

    it("применённая миграция записана в таблицу migrations", async () => {
      const rows: { name: string }[] = await getDataSource().query("SELECT name FROM migrations");

      expect(rows.some((row) => /^AddConversationIndexes\d+$/.test(row.name))).toBe(true);
    });
  });

  describe("определения индексов", () => {
    let rows: IndexRow[];

    beforeAll(async () => {
      rows = await getDataSource().query(conversationIndexesSql);
    });

    it("IDX_conversations_context — GIN с jsonb_path_ops по context", () => {
      const definition = indexDefinitionOf(rows, contextIndexName);

      expect(definition).toContain("USING gin (context jsonb_path_ops)");
    });

    it("IDX_conversations_context не уникальный", () => {
      const definition = indexDefinitionOf(rows, contextIndexName);

      expect(definition).not.toContain("UNIQUE");
    });

    it("список диалогов — индекс по (project_id, status, last_message_at DESC)", () => {
      const definition = indexDefinitionOf(rows, listIndexName);

      expect(definition).toContain("(project_id, status, last_message_at DESC)");
    });

    it("индекс списка диалогов — btree", () => {
      const definition = indexDefinitionOf(rows, listIndexName);

      expect(definition).toContain("USING btree");
    });

    it("индекс списка диалогов не уникальный", () => {
      const definition = indexDefinitionOf(rows, listIndexName);

      expect(definition).not.toContain("UNIQUE");
    });

    it("индексы объявлены на таблице conversations в схеме public", () => {
      expect(indexDefinitionOf(rows, contextIndexName)).toContain("ON public.conversations");
      expect(indexDefinitionOf(rows, listIndexName)).toContain("ON public.conversations");
    });

    it("кроме ограничений таблицы у conversations ровно два индекса", async () => {
      const secondaryRows: IndexRow[] = await getDataSource().query(secondaryIndexesSql);

      expect(secondaryRows.map((row) => row.indexname).sort()).toEqual(
        [contextIndexName, listIndexName].sort(),
      );
    });

    it("индексы валидны и готовы к использованию", async () => {
      const states: { indexrelid: string; indisvalid: boolean; indisready: boolean }[] =
        await getDataSource().query(
          "SELECT c.relname AS indexrelid, i.indisvalid, i.indisready FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid WHERE c.relname = ANY($1)",
          [[contextIndexName, listIndexName]],
        );

      expect(states).toHaveLength(2);
      expect(states.every((state) => state.indisvalid && state.indisready)).toBe(true);
    });
  });

  describe("план запроса по context", () => {
    it("фильтр context @> использует IDX_conversations_context", async () => {
      const plan = await explain(
        getDataSource(),
        `SELECT id FROM conversations WHERE context @> '{"orderId":"A-123"}'`,
      );

      expect(plan).toContain(contextIndexName);
    });

    it("фильтр context @> с параметром использует IDX_conversations_context", async () => {
      const plan = await explain(
        getDataSource(),
        "SELECT id FROM conversations WHERE context @> $1::jsonb",
        [JSON.stringify({ orderId: "A-123" })],
      );

      expect(plan).toContain(contextIndexName);
    });

    it("проверка наличия ключа ? индекс jsonb_path_ops не использует", async () => {
      const plan = await explain(
        getDataSource(),
        "SELECT id FROM conversations WHERE context ? 'orderId'",
      );

      expect(plan).not.toContain(contextIndexName);
    });

    it("с индексом фильтр context @> возвращает только подходящий диалог", async () => {
      const project = await createProject(getDataSource());
      const matching = await createConversation(getDataSource(), project);
      const other = await createConversation(getDataSource(), project);
      const setContextSql = "UPDATE conversations SET context = $1::jsonb WHERE id = $2";
      await getDataSource().query(setContextSql, [
        JSON.stringify({ orderId: "A-123", extra: 1 }),
        matching.id,
      ]);
      await getDataSource().query(setContextSql, [JSON.stringify({ orderId: "B-456" }), other.id]);

      const rows: { id: string }[] = await getDataSource().transaction(async (manager) => {
        await manager.query("SET LOCAL enable_seqscan = off");
        return manager.query(`SELECT id FROM conversations WHERE context @> '{"orderId":"A-123"}'`);
      });

      expect(rows).toEqual([{ id: matching.id }]);
    });
  });

  describe("план запроса списка диалогов", () => {
    it("выборка очереди использует IDX_conversations_project_status_last_message_at", async () => {
      const project = await createProject(getDataSource());

      const plan = await explain(
        getDataSource(),
        "SELECT id FROM conversations WHERE project_id = $1 AND status = 'queued' ORDER BY last_message_at DESC LIMIT 20",
        [project.id],
      );

      expect(plan).toContain(listIndexName);
    });

    it("выборка очереди обходится без отдельной сортировки", async () => {
      const project = await createProject(getDataSource());

      const plan = await explain(
        getDataSource(),
        "SELECT id FROM conversations WHERE project_id = $1 AND status = 'queued' ORDER BY last_message_at DESC LIMIT 20",
        [project.id],
      );

      expect(plan).not.toContain("Sort");
    });

    it("выборка очереди не использует GIN-индекс context", async () => {
      const project = await createProject(getDataSource());

      const plan = await explain(
        getDataSource(),
        "SELECT id FROM conversations WHERE project_id = $1 AND status = 'queued' ORDER BY last_message_at DESC LIMIT 20",
        [project.id],
      );

      expect(plan).not.toContain(contextIndexName);
    });
  });

  describe("откат миграции", () => {
    async function indexNamesAfterDown(): Promise<string[]> {
      const migration = databaseMigrations.find((item) =>
        /^AddConversationIndexes\d+$/.test(item.name),
      );
      if (!migration) {
        throw new Error("AddConversationIndexes не зарегистрирована");
      }
      const queryRunner = getDataSource().createQueryRunner();
      await queryRunner.startTransaction();
      try {
        await new migration().down(queryRunner);
        const rows: IndexRow[] = await queryRunner.query(secondaryIndexesSql);
        return rows.map((row) => row.indexname);
      } finally {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
      }
    }

    it("down удаляет оба индекса", async () => {
      expect(await indexNamesAfterDown()).toEqual([]);
    });

    it("после отката транзакции с down оба индекса на месте", async () => {
      await indexNamesAfterDown();

      const rows: IndexRow[] = await getDataSource().query(secondaryIndexesSql);

      expect(rows.map((row) => row.indexname).sort()).toEqual(
        [contextIndexName, listIndexName].sort(),
      );
    });
  });
});
