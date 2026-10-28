import { randomUUID } from "node:crypto";
import { databaseEntities } from "../src/database-entities.js";
import { Channel } from "../src/domain/channels/channel.entity.js";
import { ConversationEvent } from "../src/domain/conversations/conversation-event.entity.js";
import { Conversation } from "../src/domain/conversations/conversation.entity.js";
import { Message } from "../src/domain/conversations/message.entity.js";
import { Participant } from "../src/domain/conversations/participant.entity.js";
import { Project } from "../src/domain/projects/project.entity.js";
import { Visitor } from "../src/domain/visitors/visitor.entity.js";
import {
  countRows,
  createConversation,
  createMessage,
  createVisitor,
  errorCodeOf,
} from "./support/chat-rows.js";
import {
  expectedColumnCounts,
  expectedForeignKeys,
  expectedTables,
  expectedUniqueIndexes,
} from "./support/chat-schema.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

interface ColumnRow {
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: string;
}

interface ForeignKeyRow {
  table_name: string;
  column_name: string;
  delete_rule: string;
}

interface IndexRow {
  indexname: string;
  indexdef: string;
}

const uniqueViolationCode = "23505";
const foreignKeyViolationCode = "23503";
const tableNames = Object.keys(expectedTables);

describe("таблицы чата", () => {
  const getDataSource = useTestDatabase();

  describe("регистрация сущностей", () => {
    it("databaseEntities содержит сущности чата в нужном порядке", () => {
      const chatEntities = [
        Project,
        Visitor,
        Channel,
        Conversation,
        Participant,
        Message,
        ConversationEvent,
      ];
      const registeredChatEntities = databaseEntities.filter((entity) =>
        chatEntities.includes(entity as (typeof chatEntities)[number]),
      );

      expect(registeredChatEntities).toEqual(chatEntities);
    });
  });

  describe("колонки", () => {
    let rows: ColumnRow[];

    beforeAll(async () => {
      rows = await getDataSource().query(
        "SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema = 'public' AND table_name = ANY($1)",
        [tableNames],
      );
    });

    it("в базе есть ровно шесть таблиц чата", async () => {
      const found: { tablename: string }[] = await getDataSource().query(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = ANY($1)",
        [tableNames],
      );

      expect(found.map((row) => row.tablename).sort()).toEqual([...tableNames].sort());
    });

    it.each(Object.entries(expectedColumnCounts))(
      "в таблице %s ровно %i колонок",
      (table, count) => {
        expect(rows.filter((row) => row.table_name === table)).toHaveLength(count);
      },
    );

    it.each(Object.entries(expectedTables))(
      "таблица %s: имена колонок, data_type и is_nullable совпадают с задачами",
      (table, columns) => {
        const actual = Object.fromEntries(
          rows
            .filter((row) => row.table_name === table)
            .map((row) => [row.column_name, [row.data_type, row.is_nullable === "YES"]]),
        );

        expect(actual).toEqual(columns);
      },
    );

    it("в именах колонок нет camelCase", () => {
      const camelCase = rows.filter((row) => /[A-Z]/.test(row.column_name));

      expect(rows).not.toHaveLength(0);
      expect(camelCase).toEqual([]);
    });
  });

  describe("внешние ключи", () => {
    it("правила удаления совпадают с задачей и других внешних ключей между таблицами чата нет", async () => {
      const rows: ForeignKeyRow[] = await getDataSource().query(
        `SELECT cl.relname AS table_name, a.attname AS column_name,
          CASE c.confdeltype
            WHEN 'c' THEN 'CASCADE'
            WHEN 'n' THEN 'SET NULL'
            WHEN 'a' THEN 'NO ACTION'
            WHEN 'r' THEN 'RESTRICT'
            WHEN 'd' THEN 'SET DEFAULT'
          END AS delete_rule
        FROM pg_constraint c
        JOIN pg_class cl ON cl.oid = c.conrelid
        JOIN pg_namespace n ON n.oid = cl.relnamespace
        JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY (c.conkey)
        WHERE c.contype = 'f' AND n.nspname = 'public' AND cl.relname = ANY($1)`,
        [tableNames],
      );

      const actual = Object.fromEntries(
        rows.map((row) => [`${row.table_name}.${row.column_name}`, row.delete_rule]),
      );
      expect(actual).toEqual(expectedForeignKeys);
    });

    it("канал с диалогами не удаляется: код 23503", async () => {
      const project = await createProject(getDataSource());
      const conversation = await createConversation(getDataSource(), project);

      const code = await errorCodeOf(
        getDataSource().getRepository(Channel).delete({ id: conversation.channelId }),
      );

      expect(code).toBe(foreignKeyViolationCode);
    });
  });

  describe("уникальные индексы", () => {
    it.each(expectedUniqueIndexes)(
      "есть уникальный индекс $table ($columns)",
      async ({ table, columns }) => {
        const rows: IndexRow[] = await getDataSource().query(
          "SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename = $1",
          [table],
        );

        const definitions = rows.map((row) => row.indexdef);
        expect(
          definitions.some(
            (definition) =>
              definition.includes("CREATE UNIQUE INDEX") &&
              definition.includes(`btree (${columns})`),
          ),
        ).toBe(true);
      },
    );

    it("тот же seq в одном диалоге: код 23505", async () => {
      const project = await createProject(getDataSource());
      const conversation = await createConversation(getDataSource(), project);
      await createMessage(getDataSource(), { conversationId: conversation.id, seq: 1 });

      const code = await errorCodeOf(
        createMessage(getDataSource(), { conversationId: conversation.id, seq: 1 }),
      );

      expect(code).toBe(uniqueViolationCode);
    });

    it("тот же clientMsgId в одном диалоге: код 23505", async () => {
      const project = await createProject(getDataSource());
      const conversation = await createConversation(getDataSource(), project);
      const clientMsgId = randomUUID();
      await createMessage(getDataSource(), {
        conversationId: conversation.id,
        seq: 1,
        clientMsgId,
      });

      const code = await errorCodeOf(
        createMessage(getDataSource(), { conversationId: conversation.id, seq: 2, clientMsgId }),
      );

      expect(code).toBe(uniqueViolationCode);
    });

    it("два сообщения диалога с clientMsgId null сохраняются", async () => {
      const project = await createProject(getDataSource());
      const conversation = await createConversation(getDataSource(), project);

      await createMessage(getDataSource(), {
        conversationId: conversation.id,
        seq: 1,
        clientMsgId: null,
      });
      await createMessage(getDataSource(), {
        conversationId: conversation.id,
        seq: 2,
        clientMsgId: null,
      });

      expect(await countRows(getDataSource(), Message, { conversationId: conversation.id })).toBe(
        2,
      );
    });

    it("одинаковые seq и clientMsgId в разных диалогах сохраняются", async () => {
      const project = await createProject(getDataSource());
      const first = await createConversation(getDataSource(), project);
      const second = await createConversation(getDataSource(), project);
      const clientMsgId = randomUUID();

      await createMessage(getDataSource(), { conversationId: first.id, seq: 1, clientMsgId });
      await createMessage(getDataSource(), { conversationId: second.id, seq: 1, clientMsgId });

      expect(await countRows(getDataSource(), Message, { seq: 1 })).toBe(2);
    });

    it("тот же displayCode в одном проекте: код 23505", async () => {
      const project = await createProject(getDataSource());
      await createVisitor(getDataSource(), project, { displayCode: 7 });

      const code = await errorCodeOf(createVisitor(getDataSource(), project, { displayCode: 7 }));

      expect(code).toBe(uniqueViolationCode);
    });

    it("тот же externalId в одном проекте: код 23505", async () => {
      const project = await createProject(getDataSource());
      await createVisitor(getDataSource(), project, { externalId: "user-1" });

      const code = await errorCodeOf(
        createVisitor(getDataSource(), project, { externalId: "user-1" }),
      );

      expect(code).toBe(uniqueViolationCode);
    });

    it("два посетителя проекта с externalId null и displayCode null сохраняются", async () => {
      const project = await createProject(getDataSource());

      await createVisitor(getDataSource(), project, { externalId: null, displayCode: null });
      await createVisitor(getDataSource(), project, { externalId: null, displayCode: null });

      expect(await countRows(getDataSource(), Visitor, { projectId: project.id })).toBe(2);
    });

    it("тот же displayCode и externalId в разных проектах сохраняются", async () => {
      const first = await createProject(getDataSource());
      const second = await createProject(getDataSource());

      await createVisitor(getDataSource(), first, { displayCode: 7, externalId: "user-1" });
      await createVisitor(getDataSource(), second, { displayCode: 7, externalId: "user-1" });

      expect(await getDataSource().getRepository(Visitor).count()).toBe(2);
    });
  });

  describe("каскадное удаление", () => {
    it("удаление диалога удаляет его сообщения, участников и события", async () => {
      const dataSource = getDataSource();
      const project = await createProject(dataSource);
      const conversation = await createConversation(getDataSource(), project);
      await createMessage(getDataSource(), { conversationId: conversation.id, seq: 1 });
      await createMessage(getDataSource(), { conversationId: conversation.id, seq: 2 });
      const participants = dataSource.getRepository(Participant);
      await participants.save(
        participants.create({
          conversationId: conversation.id,
          kind: "visitor",
          participantId: randomUUID(),
        }),
      );
      const events = dataSource.getRepository(ConversationEvent);
      await events.save(
        events.create({
          conversationId: conversation.id,
          type: "created",
          actorKind: "system",
        }),
      );
      const other = await createConversation(getDataSource(), project);
      await createMessage(getDataSource(), { conversationId: other.id, seq: 1 });

      await dataSource.getRepository(Conversation).delete({ id: conversation.id });

      const where = { conversationId: conversation.id };
      expect(await countRows(dataSource, Message, where)).toBe(0);
      expect(await countRows(dataSource, Participant, where)).toBe(0);
      expect(await countRows(dataSource, ConversationEvent, where)).toBe(0);
      expect(await countRows(dataSource, Message, { conversationId: other.id })).toBe(1);
    });

    it("удаление проекта удаляет его посетителей, каналы и диалоги, но не чужие", async () => {
      const dataSource = getDataSource();
      const project = await createProject(dataSource);
      const conversation = await createConversation(getDataSource(), project);
      await createMessage(getDataSource(), { conversationId: conversation.id, seq: 1 });
      const otherProject = await createProject(dataSource);
      await createConversation(getDataSource(), otherProject);

      await dataSource.getRepository(Project).delete({ id: project.id });

      const where = { projectId: project.id };
      expect(await countRows(dataSource, Visitor, where)).toBe(0);
      expect(await countRows(dataSource, Channel, where)).toBe(0);
      expect(await countRows(dataSource, Conversation, where)).toBe(0);
      expect(await countRows(dataSource, Message, { conversationId: conversation.id })).toBe(0);
      const otherWhere = { projectId: otherProject.id };
      expect(await countRows(dataSource, Visitor, otherWhere)).toBe(1);
      expect(await countRows(dataSource, Channel, otherWhere)).toBe(1);
      expect(await countRows(dataSource, Conversation, otherWhere)).toBe(1);
    });

    it("удаление посетителя удаляет его диалоги", async () => {
      const dataSource = getDataSource();
      const project = await createProject(dataSource);
      const conversation = await createConversation(getDataSource(), project);

      await dataSource.getRepository(Visitor).delete({ id: conversation.visitorId });

      expect(await countRows(dataSource, Conversation, { id: conversation.id })).toBe(0);
    });

    it("удаление посетителя B ставит mergedIntoId null у посетителя A, склеенного с B", async () => {
      const dataSource = getDataSource();
      const project = await createProject(dataSource);
      const visitorB = await createVisitor(getDataSource(), project);
      const visitorA = await createVisitor(getDataSource(), project, { mergedIntoId: visitorB.id });
      const repository = dataSource.getRepository(Visitor);
      expect((await repository.findOneByOrFail({ id: visitorA.id })).mergedIntoId).toBe(
        visitorB.id,
      );

      await repository.delete({ id: visitorB.id });

      const found = await repository.findOneByOrFail({ id: visitorA.id });
      expect(found.mergedIntoId).toBeNull();
      expect(await repository.count()).toBe(1);
    });
  });
});
