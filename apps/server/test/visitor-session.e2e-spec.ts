import { visitorSessionResponseSchema } from "@sowa-chat/protocol";
import request from "supertest";
import type { MockInstance } from "vitest";
import { ApiKeysService } from "../src/domain/keys/api-keys.service.js";
import { generateKey } from "../src/domain/keys/key-format.js";
import { ProjectsRepository } from "../src/domain/projects/projects.repository.js";
import { VisitorSession } from "../src/domain/visitors/visitor-session.entity.js";
import { Visitor } from "../src/domain/visitors/visitor.entity.js";
import { TokensService } from "../src/infra/tokens/tokens.service.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";
import { replaceLastChar, rowsContainText, sha256 } from "./support/visitor-session-values.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const sessionPath = "/v1/visitor/session";
const refreshTtlMs = 30 * 86_400_000;
const toleranceMs = 60_000;

describe("POST /v1/visitor/session", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let tokens: TokensService;

  beforeAll(async () => {
    probe = await startZoneE2eApp();
    tokens = probe.app.get(TokensService);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function postSession(port: number, body: object) {
    return request(`http://127.0.0.1:${port}`).post(sessionPath).send(body);
  }

  function postPublic(body: object) {
    return postSession(probe.ports.public, body);
  }

  async function createProjectWithPublicKey() {
    const publicKey = generateKey("publicKey");
    const project = await createProject(getDataSource(), { publicKey });
    return { project, publicKey };
  }

  function findVisitors(projectId: string) {
    return getDataSource().getRepository(Visitor).findBy({ projectId });
  }

  function findSessions(visitorId: string) {
    return getDataSource().getRepository(VisitorSession).findBy({ visitorId });
  }

  function rawRows(sql: string): Promise<Record<string, unknown>[]> {
    return getDataSource().query(sql);
  }

  async function countRows() {
    const dataSource = getDataSource();
    return {
      visitors: await dataSource.getRepository(Visitor).count(),
      sessions: await dataSource.getRepository(VisitorSession).count(),
    };
  }

  describe("верный publicKey", () => {
    it("201, тело проходит visitorSessionResponseSchema и содержит ровно три поля", async () => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });

      expect(response.status).toBe(201);
      expect(visitorSessionResponseSchema.safeParse(response.body).success).toBe(true);
      expect(Object.keys(response.body).sort()).toEqual([
        "accessToken",
        "accessTokenExpiresAt",
        "refreshToken",
      ]);
    });

    it("access-токен: subject — новый посетитель проекта без display_code, claim projectId", async () => {
      const { project, publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });
      const verified = await tokens.verify(response.body.accessToken, "visitor");

      const visitors = await findVisitors(project.id);
      expect(visitors).toHaveLength(1);
      expect(verified?.subject).toBe(visitors[0]?.id);
      expect(visitors[0]?.displayCode).toBeNull();
      expect(visitors[0]?.externalId).toBeNull();
      expect(verified?.claims.projectId).toBe(project.id);
    });

    it("exp - iat = 3600, accessTokenExpiresAt совпадает с exp", async () => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });
      const verified = await tokens.verify(response.body.accessToken, "visitor");

      const exp = Number(verified?.claims.exp);
      const iat = Number(verified?.claims.iat);
      expect(exp - iat).toBe(3600);
      expect(response.body.accessTokenExpiresAt).toBe(new Date(exp * 1000).toISOString());
    });

    it("access-токен не проходит verify с aud operator", async () => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });

      expect(response.status).toBe(201);
      await expect(tokens.verify(response.body.accessToken, "operator")).resolves.toBeUndefined();
    });

    it("claim projectId — проект ключа, а не другой проект", async () => {
      const first = await createProjectWithPublicKey();
      const second = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey: second.publicKey });
      const verified = await tokens.verify(response.body.accessToken, "visitor");

      expect(verified?.claims.projectId).toBe(second.project.id);
      expect(await findVisitors(first.project.id)).toHaveLength(0);
      expect(await findVisitors(second.project.id)).toHaveLength(1);
    });

    it("refreshToken — 43 символа base64url", async () => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });

      expect(response.body.refreshToken).toMatch(/^[A-Za-z0-9_-]{43}$/);
    });
  });

  describe("строка visitor_sessions", () => {
    it("одна строка посетителя: refresh_hash — SHA-256 токена, used_at и revoked_at NULL", async () => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });
      const verified = await tokens.verify(response.body.accessToken, "visitor");

      const sessions = await findSessions(verified?.subject ?? "");
      expect(sessions).toHaveLength(1);
      expect(sessions[0]?.refreshHash.equals(sha256(response.body.refreshToken))).toBe(true);
      expect(sessions[0]?.usedAt).toBeNull();
      expect(sessions[0]?.revokedAt).toBeNull();
    });

    it("expires_at через 30 дней от запроса, допуск минута", async () => {
      const { publicKey } = await createProjectWithPublicKey();

      const before = Date.now();
      const response = await postPublic({ publicKey });
      const after = Date.now();
      const verified = await tokens.verify(response.body.accessToken, "visitor");

      const [session] = await findSessions(verified?.subject ?? "");
      const expiresAt = session?.expiresAt.getTime() ?? 0;
      expect(expiresAt).toBeGreaterThanOrEqual(before + refreshTtlMs - toleranceMs);
      expect(expiresAt).toBeLessThanOrEqual(after + refreshTtlMs + toleranceMs);
    });

    it("ни одна колонка visitor_sessions и visitors не содержит открытый refreshToken", async () => {
      const { project, publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey });
      const refreshToken: string = response.body.refreshToken;

      const sessions = await rawRows("SELECT * FROM visitor_sessions");
      const visitors = await rawRows("SELECT * FROM visitors");
      expect(sessions).toHaveLength(1);
      expect(visitors).toHaveLength(1);
      expect(visitors[0]?.project_id).toBe(project.id);
      expect(rowsContainText([...sessions, ...visitors], refreshToken)).toBe(false);
    });

    it("повторный запрос — новый посетитель и новая цепочка", async () => {
      const { project, publicKey } = await createProjectWithPublicKey();

      const first = await postPublic({ publicKey });
      const second = await postPublic({ publicKey });

      const rows = await getDataSource().getRepository(VisitorSession).find();
      expect(await findVisitors(project.id)).toHaveLength(2);
      expect(rows).toHaveLength(2);
      expect(new Set(rows.map((row) => row.visitorId)).size).toBe(2);
      expect(rows[0]?.familyId).not.toBe(rows[1]?.familyId);
      expect(first.body.refreshToken).not.toBe(second.body.refreshToken);
    });
  });

  describe("неверный publicKey", () => {
    it.each([
      ["неверный формат", () => "not-a-key"],
      ["контрольная сумма не сходится", (publicKey: string) => replaceLastChar(publicKey)],
      ["пробел в начале", (publicKey: string) => ` ${publicKey}`],
      ["неизвестный pk_", () => generateKey("publicKey")],
    ])("%s — 401 Public key is invalid без новых строк", async (_title, makeKey) => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postPublic({ publicKey: makeKey(publicKey) });

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        statusCode: 401,
        code: "unauthorized",
        message: "Public key is invalid",
      });
      expect(response.body.accessToken).toBeUndefined();
      expect(await countRows()).toEqual({ visitors: 0, sessions: 0 });
    });

    it("ключ sk_ проекта — 401 Public key is invalid без новых строк", async () => {
      const { project } = await createProjectWithPublicKey();
      const issued = await probe.app
        .get(ApiKeysService)
        .issue({ projectId: project.id, kind: "server", actorKind: "cli" });

      const response = await postPublic({ publicKey: issued.key });

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        code: "unauthorized",
        message: "Public key is invalid",
      });
      expect(response.text).not.toContain(issued.key);
      expect(await countRows()).toEqual({ visitors: 0, sessions: 0 });
    });

    describe("до запроса к БД", () => {
      let findByPublicKey: MockInstance<ProjectsRepository["findByPublicKey"]>;

      beforeEach(() => {
        findByPublicKey = vi.spyOn(probe.app.get(ProjectsRepository), "findByPublicKey");
      });

      afterEach(() => {
        vi.restoreAllMocks();
      });

      it.each([
        ["неверный формат", () => "pk_short"],
        ["контрольная сумма не сходится", () => replaceLastChar(generateKey("publicKey"))],
        ["ключ sk_", () => generateKey("serverKey")],
      ])("%s — проект не ищется", async (_title, makeKey) => {
        const response = await postPublic({ publicKey: makeKey() });

        expect(response.status).toBe(401);
        expect(findByPublicKey).not.toHaveBeenCalled();
      });
    });
  });

  describe("неверное тело", () => {
    it.each([
      ["пустое тело", {}],
      ["пустая строка", { publicKey: "" }],
      ["длиннее 128 символов", { publicKey: "a".repeat(129) }],
      ["не строка", { publicKey: 42 }],
    ])("%s — 400 validationFailed без новых строк", async (_title, body) => {
      await createProjectWithPublicKey();

      const response = await postPublic(body);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({ statusCode: 400, code: "validationFailed" });
      expect(await countRows()).toEqual({ visitors: 0, sessions: 0 });
    });
  });

  describe("зоны", () => {
    it.each(["operator", "internal"] as const)("порт %s — 404", async (zone) => {
      const { publicKey } = await createProjectWithPublicKey();

      const response = await postSession(probe.ports[zone], { publicKey });

      expect(response.status).toBe(404);
      expect(await countRows()).toEqual({ visitors: 0, sessions: 0 });
    });
  });
});
