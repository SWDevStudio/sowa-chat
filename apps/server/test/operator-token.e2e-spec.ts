import { randomUUID } from "node:crypto";
import request from "supertest";
import { Operator } from "../src/domain/operators/operator.entity.js";
import { ApiKeysService } from "../src/domain/keys/api-keys.service.js";
import { TokensService } from "../src/infra/tokens/tokens.service.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const tokenPath = "/v1/server/operator-token";

describe("POST /v1/server/operator-token", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let keys: ApiKeysService;
  let tokens: TokensService;

  beforeAll(async () => {
    probe = await startZoneE2eApp();
    keys = probe.app.get(ApiKeysService);
    tokens = probe.app.get(TokensService);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function internalAgent() {
    return request(`http://127.0.0.1:${probe.ports.internal}`);
  }

  function postToken(key: string, body: object) {
    return internalAgent().post(tokenPath).set("Authorization", `Bearer ${key}`).send(body);
  }

  async function createProjectWithKey() {
    const project = await createProject(getDataSource());
    const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
    return { project, key: issued.key };
  }

  function operatorBody(overrides: object = {}) {
    return { externalId: `op-${randomUUID()}`, name: "Anna", role: "supervisor", ...overrides };
  }

  function findOperators(projectId: string) {
    return getDataSource().getRepository(Operator).findBy({ projectId });
  }

  describe("успешная выдача", () => {
    it("200, в теле ровно token и expiresAt", async () => {
      const { key } = await createProjectWithKey();

      const response = await postToken(key, operatorBody());

      expect(response.status).toBe(200);
      expect(Object.keys(response.body).sort()).toEqual(["expiresAt", "token"]);
      expect(typeof response.body.token).toBe("string");
      expect(response.text).not.toContain(key);
    });

    it("токен проходит verify с aud operator, projectId проекта ключа и ролью supervisor", async () => {
      const { project, key } = await createProjectWithKey();
      const body = operatorBody({ role: "supervisor" });

      const response = await postToken(key, body);
      const verified = await tokens.verify(response.body.token, "operator");

      const [operator] = await findOperators(project.id);
      expect(verified?.subject).toBe(operator?.id);
      expect(verified?.claims.projectId).toBe(project.id);
      expect(verified?.claims.role).toBe("supervisor");
    });

    it("токен не проходит verify с aud visitor", async () => {
      const { key } = await createProjectWithKey();

      const response = await postToken(key, operatorBody());

      await expect(tokens.verify(response.body.token, "visitor")).resolves.toBeUndefined();
    });

    it("expiresAt через 890-900 секунд от момента запроса, строка ISO", async () => {
      const { key } = await createProjectWithKey();

      const before = Date.now();
      const response = await postToken(key, operatorBody());
      const after = Date.now();

      const expiresAt = new Date(response.body.expiresAt);
      expect(expiresAt.toISOString()).toBe(response.body.expiresAt);
      expect(expiresAt.getTime()).toBeGreaterThanOrEqual(before + 890_000);
      expect(expiresAt.getTime()).toBeLessThanOrEqual(after + 900_000);
    });

    it("повторный запрос с role operator — токен с ролью operator, одна строка в operators", async () => {
      const { project, key } = await createProjectWithKey();
      const body = operatorBody({ role: "supervisor" });
      await postToken(key, body);

      const response = await postToken(key, { ...body, role: "operator" });
      const verified = await tokens.verify(response.body.token, "operator");

      const rows = await findOperators(project.id);
      expect(response.status).toBe(200);
      expect(verified?.claims.role).toBe("operator");
      expect(rows).toHaveLength(1);
      expect(rows[0]?.role).toBe("operator");
      expect(verified?.subject).toBe(rows[0]?.id);
    });

    it("projectId в теле игнорируется: проект берётся из ключа", async () => {
      const { project, key } = await createProjectWithKey();
      const other = await createProject(getDataSource());

      const response = await postToken(key, operatorBody({ projectId: other.id }));
      const verified = await tokens.verify(response.body.token, "operator");

      expect(response.status).toBe(200);
      expect(verified?.claims.projectId).toBe(project.id);
      expect(await findOperators(other.id)).toHaveLength(0);
      expect(await findOperators(project.id)).toHaveLength(1);
    });

    it("одинаковый externalId в разных проектах — разные операторы", async () => {
      const first = await createProjectWithKey();
      const second = await createProjectWithKey();
      const body = operatorBody();

      await postToken(first.key, body);
      await postToken(second.key, body);

      expect(await findOperators(first.project.id)).toHaveLength(1);
      expect(await findOperators(second.project.id)).toHaveLength(1);
    });

    it("сохраняет имя и avatarUrl", async () => {
      const { project, key } = await createProjectWithKey();

      await postToken(key, operatorBody({ name: "Boris", avatarUrl: "https://example.com/a.png" }));

      const [operator] = await findOperators(project.id);
      expect(operator?.name).toBe("Boris");
      expect(operator?.avatarUrl).toBe("https://example.com/a.png");
    });
  });

  describe("заблокированный оператор", () => {
    it("с disabled_at в базе — 403 forbidden без токена", async () => {
      const { project, key } = await createProjectWithKey();
      const body = operatorBody();
      await postToken(key, body);
      await getDataSource()
        .getRepository(Operator)
        .update({ projectId: project.id }, { disabledAt: new Date() });

      const response = await postToken(key, body);

      expect(response.status).toBe(403);
      expect(response.body).toMatchObject({
        statusCode: 403,
        code: "forbidden",
        message: "Operator is disabled",
      });
      expect(response.body.token).toBeUndefined();
    });
  });

  describe("неверное тело", () => {
    it.each([
      ["role admin", { role: "admin" }],
      ["без externalId", { externalId: undefined }],
      ["пустой externalId", { externalId: "   " }],
      ["externalId длиннее 255", { externalId: "a".repeat(256) }],
      ["без name", { name: undefined }],
      ["без role", { role: undefined }],
      ["avatarUrl не http", { avatarUrl: "javascript:alert(1)" }],
    ])("%s — 400 validationFailed", async (_title, overrides) => {
      const { project, key } = await createProjectWithKey();

      const response = await postToken(key, operatorBody(overrides));

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({ statusCode: 400, code: "validationFailed" });
      expect(await findOperators(project.id)).toHaveLength(0);
    });

    it("пустое тело — 400 validationFailed", async () => {
      const { key } = await createProjectWithKey();

      const response = await postToken(key, {});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("validationFailed");
    });
  });

  describe("доступ", () => {
    it("без ключа — 401", async () => {
      const response = await internalAgent().post(tokenPath).send(operatorBody());

      expect(response.status).toBe(401);
      expect(response.body.code).toBe("unauthorized");
    });

    it("с bk_ — 401", async () => {
      const project = await createProject(getDataSource());
      const bot = await keys.issue({
        projectId: project.id,
        kind: "bot",
        botId: randomUUID(),
        actorKind: "cli",
      });

      const response = await postToken(bot.key, operatorBody());

      expect(response.status).toBe(401);
      expect(response.body.code).toBe("unauthorized");
      expect(response.text).not.toContain(bot.key);
      expect(await findOperators(project.id)).toHaveLength(0);
    });

    it("публичный порт — 404", async () => {
      const { key } = await createProjectWithKey();

      const response = await request(`http://127.0.0.1:${probe.ports.public}`)
        .post(tokenPath)
        .set("Authorization", `Bearer ${key}`)
        .send(operatorBody());

      expect(response.status).toBe(404);
    });
  });
});
