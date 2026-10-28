import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { Operator } from "../src/domain/operators/operator.entity.js";
import { OperatorsModule } from "../src/domain/operators/operators.module.js";
import { OperatorsRepository } from "../src/domain/operators/operators.repository.js";
import {
  OperatorDisabledError,
  OperatorsService,
} from "../src/domain/operators/operators.service.js";
import { TokensService } from "../src/infra/tokens/tokens.service.js";
import { WorkerModule } from "../src/worker.module.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";

describe("операторы: создание или обновление и токен", () => {
  const getDataSource = useTestDatabase();
  let moduleRef: TestingModule;
  let operators: OperatorsService;
  let repository: OperatorsRepository;
  let tokens: TokensService;

  async function operatorRows(): Promise<Operator[]> {
    return getDataSource()
      .getRepository(Operator)
      .find({ order: { externalId: "ASC" } });
  }

  async function disable(id: string): Promise<void> {
    await getDataSource().query(`UPDATE "operators" SET "disabled_at" = now() WHERE "id" = $1`, [
      id,
    ]);
  }

  async function createProjectRequest(): Promise<{
    projectId: string;
    externalId: string;
    name: string;
    role: "operator";
  }> {
    const project = await createProject(getDataSource());
    return { projectId: project.id, externalId: "ext-1", name: "Alice", role: "operator" };
  }

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, OperatorsModule],
    }).compile();
    await moduleRef.init();
    operators = moduleRef.get(OperatorsService);
    repository = moduleRef.get(OperatorsRepository);
    tokens = moduleRef.get(TokensService);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  describe("создание и обновление", () => {
    it("первый issueToken создаёт строку operators по профилю", async () => {
      const request = await createProjectRequest();

      await operators.issueToken({ ...request, avatarUrl: "https://example.com/alice.png" });

      const rows = await operatorRows();
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({
        projectId: request.projectId,
        externalId: "ext-1",
        name: "Alice",
        avatarUrl: "https://example.com/alice.png",
        role: "operator",
        maxChats: null,
        disabledAt: null,
      });
    });

    it("повторный issueToken обновляет ту же строку: имя, роль, аватар стирается", async () => {
      const request = await createProjectRequest();
      await operators.issueToken({ ...request, avatarUrl: "https://example.com/alice.png" });
      const [before] = await operatorRows();

      await operators.issueToken({ ...request, name: "Alice B.", role: "supervisor" });

      const rows = await operatorRows();
      expect(rows).toHaveLength(1);
      expect(rows[0]?.id).toBe(before?.id);
      expect(rows[0]).toMatchObject({ name: "Alice B.", role: "supervisor", avatarUrl: null });
      const raw: { avatar_url: string | null }[] = await getDataSource().query(
        `SELECT "avatar_url" FROM "operators"`,
      );
      expect(raw[0]?.avatar_url).toBeNull();
    });

    it("обновление профиля не меняет maxChats и disabled_at", async () => {
      const request = await createProjectRequest();
      const profile = { ...request, avatarUrl: null };
      const operator = await repository.upsert(profile);
      await getDataSource().query(`UPDATE "operators" SET "max_chats" = 7 WHERE "id" = $1`, [
        operator.id,
      ]);
      await disable(operator.id);

      const updated = await repository.upsert({ ...profile, name: "Alice B.", role: "supervisor" });

      expect(updated.id).toBe(operator.id);
      expect(updated.name).toBe("Alice B.");
      expect(updated.maxChats).toBe(7);
      expect(updated.disabledAt).not.toBeNull();
    });
  });

  describe("токен", () => {
    it("выданный токен проходит verify с aud operator, sub, projectId и новой ролью", async () => {
      const request = await createProjectRequest();
      await operators.issueToken(request);

      const issued = await operators.issueToken({ ...request, role: "supervisor" });

      const [row] = await operatorRows();
      const verified = await tokens.verify(issued.token, "operator");
      expect(verified?.subject).toBe(row?.id);
      expect(verified?.claims).toMatchObject({
        projectId: request.projectId,
        role: "supervisor",
      });
    });

    it("токен не проходит verify с aud visitor", async () => {
      const request = await createProjectRequest();

      const issued = await operators.issueToken(request);

      await expect(tokens.verify(issued.token, "visitor")).resolves.toBeUndefined();
    });

    it("expiresAt через 15 минут и совпадает с exp токена", async () => {
      const request = await createProjectRequest();
      const before = Date.now();

      const issued = await operators.issueToken(request);

      const after = Date.now();
      expect(issued.expiresAt.getTime()).toBeGreaterThanOrEqual(before + 900_000 - 1000);
      expect(issued.expiresAt.getTime()).toBeLessThanOrEqual(after + 900_000);
      const verified = await tokens.verify(issued.token, "operator");
      expect(verified?.claims.exp).toBe(issued.expiresAt.getTime() / 1000);
    });
  });

  describe("одновременность и проекты", () => {
    it("два одновременных issueToken одного externalId оба успешны и оставляют одну строку", async () => {
      const request = await createProjectRequest();

      const [first, second] = await Promise.all([
        operators.issueToken(request),
        operators.issueToken(request),
      ]);

      expect(first.token).toEqual(expect.any(String));
      expect(second.token).toEqual(expect.any(String));
      expect(await operatorRows()).toHaveLength(1);
    });

    it("тот же externalId в другом проекте — отдельная строка", async () => {
      const first = await createProjectRequest();
      const second = await createProjectRequest();

      await operators.issueToken(first);
      await operators.issueToken(second);

      const rows = await operatorRows();
      expect(rows).toHaveLength(2);
      expect(new Set(rows.map((row) => row.projectId))).toEqual(
        new Set([first.projectId, second.projectId]),
      );
      expect(rows[0]?.id).not.toBe(rows[1]?.id);
    });
  });

  describe("блокировка", () => {
    it("оператор с disabled_at получает OperatorDisabledError", async () => {
      const request = await createProjectRequest();
      await operators.issueToken(request);
      const [row] = await operatorRows();
      await disable(row?.id ?? "");

      await expect(operators.issueToken(request)).rejects.toBeInstanceOf(OperatorDisabledError);
    });

    it("отказ не снимает блокировку", async () => {
      const request = await createProjectRequest();
      await operators.issueToken(request);
      const [row] = await operatorRows();
      await disable(row?.id ?? "");

      await expect(operators.issueToken({ ...request, name: "Renamed" })).rejects.toBeInstanceOf(
        OperatorDisabledError,
      );

      const [after] = await operatorRows();
      expect(after?.disabledAt).not.toBeNull();
    });

    it("findDisabledIds возвращает ровно ID заблокированных операторов всех проектов", async () => {
      const first = await createProjectRequest();
      const second = await createProjectRequest();
      const profile = { avatarUrl: null };
      const active = await repository.upsert({ ...first, ...profile, externalId: "a" });
      const disabledFirst = await repository.upsert({ ...first, ...profile, externalId: "b" });
      const disabledSecond = await repository.upsert({ ...second, ...profile, externalId: "c" });
      await disable(disabledFirst.id);
      await disable(disabledSecond.id);

      const ids = await repository.findDisabledIds();

      expect([...ids].sort()).toEqual([disabledFirst.id, disabledSecond.id].sort());
      expect(ids).not.toContain(active.id);
    });

    it("findDisabledIds без заблокированных возвращает пустой массив", async () => {
      const request = await createProjectRequest();
      await operators.issueToken(request);

      await expect(repository.findDisabledIds()).resolves.toEqual([]);
    });
  });
});
