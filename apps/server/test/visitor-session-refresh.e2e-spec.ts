import { type VisitorSessionResponse, visitorSessionResponseSchema } from "@sowa-chat/protocol";
import { randomBytes } from "node:crypto";
import type { Response } from "supertest";
import { TokensService } from "../src/infra/tokens/tokens.service.js";
import { useTestDatabase } from "./support/test-database.js";
import { rowsContainText, sha256 } from "./support/visitor-session-values.js";
import {
  createProjectWithPublicKey,
  findAllSessions,
  findFamilySessions,
  findSessionByRefreshToken,
  postVisitorSessionRefresh,
  startVisitorSession,
} from "./support/visitor-session-requests.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const refreshTtlMs = 30 * 86_400_000;
const toleranceMs = 60_000;

describe("POST /v1/visitor/session/refresh", () => {
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

  function refresh(body: object) {
    return postVisitorSessionRefresh(probe.ports.public, body);
  }

  async function refreshOk(refreshToken: string): Promise<VisitorSessionResponse> {
    const response = await refresh({ refreshToken });
    expect(response.status).toBe(200);
    return response.body;
  }

  async function startChain() {
    const { project, publicKey } = await createProjectWithPublicKey(getDataSource());
    const first = await startVisitorSession(probe.ports.public, publicKey);
    return { project, publicKey, first };
  }

  function updateSession(refreshToken: string, assignment: string): Promise<unknown> {
    return getDataSource().query(
      `UPDATE visitor_sessions SET ${assignment} WHERE refresh_hash = $1`,
      [sha256(refreshToken)],
    );
  }

  async function familyOf(refreshToken: string) {
    const session = await findSessionByRefreshToken(getDataSource(), refreshToken);
    return findFamilySessions(getDataSource(), session.familyId);
  }

  function expectRejected(response: Response, refreshToken: string): void {
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      statusCode: 401,
      code: "unauthorized",
      message: "Refresh token is invalid",
    });
    expect(response.body.accessToken).toBeUndefined();
    expect(response.text).not.toContain(refreshToken);
  }

  describe("обмен", () => {
    it("200, тело проходит visitorSessionResponseSchema, новый refreshToken отличается от старого", async () => {
      const { first } = await startChain();

      const response = await refresh({ refreshToken: first.refreshToken });

      expect(response.status).toBe(200);
      expect(visitorSessionResponseSchema.safeParse(response.body).success).toBe(true);
      expect(response.body.refreshToken).not.toBe(first.refreshToken);
    });

    it("новый access-токен проверяется с тем же sub и projectId", async () => {
      const { project, first } = await startChain();

      const next = await refreshOk(first.refreshToken);
      const before = await tokens.verify(first.accessToken, "visitor");
      const after = await tokens.verify(next.accessToken, "visitor");

      expect(after).toBeDefined();
      expect(after?.subject).toBe(before?.subject);
      expect(after?.claims.projectId).toBe(project.id);
    });

    it("у старой строки used_at не NULL, новая строка той же цепочки с хешем нового refresh", async () => {
      const { first } = await startChain();

      const next = await refreshOk(first.refreshToken);

      const old = await findSessionByRefreshToken(getDataSource(), first.refreshToken);
      const issued = await findSessionByRefreshToken(getDataSource(), next.refreshToken);
      expect(old.usedAt).not.toBeNull();
      expect(old.revokedAt).toBeNull();
      expect(issued.id).not.toBe(old.id);
      expect(issued.familyId).toBe(old.familyId);
      expect(issued.visitorId).toBe(old.visitorId);
      expect(issued.usedAt).toBeNull();
      expect(issued.revokedAt).toBeNull();
      expect(await findFamilySessions(getDataSource(), old.familyId)).toHaveLength(2);
    });

    it("новый refresh снова обменивается", async () => {
      const { first } = await startChain();

      const second = await refreshOk(first.refreshToken);
      const third = await refreshOk(second.refreshToken);

      expect(third.refreshToken).not.toBe(second.refreshToken);
      expect(await familyOf(third.refreshToken)).toHaveLength(3);
    });

    it("новая строка получает полные 30 дней от обмена, а не остаток старой", async () => {
      const { first } = await startChain();
      await updateSession(first.refreshToken, "expires_at = now() + interval '1 day'");

      const before = Date.now();
      const next = await refreshOk(first.refreshToken);
      const after = Date.now();

      const issued = await findSessionByRefreshToken(getDataSource(), next.refreshToken);
      const expiresAt = issued.expiresAt.getTime();
      expect(expiresAt).toBeGreaterThanOrEqual(before + refreshTtlMs - toleranceMs);
      expect(expiresAt).toBeLessThanOrEqual(after + refreshTtlMs + toleranceMs);
    });

    it("срок истекает через минуту — 200", async () => {
      const { first } = await startChain();
      await updateSession(first.refreshToken, "expires_at = now() + interval '1 minute'");

      const response = await refresh({ refreshToken: first.refreshToken });

      expect(response.status).toBe(200);
    });

    it("ни одна колонка visitor_sessions не содержит открытый refresh-токен", async () => {
      const { first } = await startChain();

      const next = await refreshOk(first.refreshToken);

      const rows: Record<string, unknown>[] = await getDataSource().query(
        "SELECT * FROM visitor_sessions",
      );
      expect(rows).toHaveLength(2);
      expect(rowsContainText(rows, first.refreshToken)).toBe(false);
      expect(rowsContainText(rows, next.refreshToken)).toBe(false);
    });
  });

  describe("повтор использованного refresh", () => {
    it("повтор — 401 Refresh token is invalid, последний выданный refresh цепочки тоже 401", async () => {
      const { first } = await startChain();
      const second = await refreshOk(first.refreshToken);
      const third = await refreshOk(second.refreshToken);

      const replay = await refresh({ refreshToken: first.refreshToken });
      const latest = await refresh({ refreshToken: third.refreshToken });

      expectRejected(replay, first.refreshToken);
      expectRejected(latest, third.refreshToken);
    });

    it("у всех строк цепочки revoked_at не NULL", async () => {
      const { first } = await startChain();
      const second = await refreshOk(first.refreshToken);
      const third = await refreshOk(second.refreshToken);

      await refresh({ refreshToken: second.refreshToken });

      const family = await familyOf(third.refreshToken);
      expect(family).toHaveLength(3);
      expect(family.every((session) => session.revokedAt !== null)).toBe(true);
    });

    it("строки другой цепочки того же проекта не тронуты и обмениваются", async () => {
      const { publicKey, first } = await startChain();
      const other = await startVisitorSession(probe.ports.public, publicKey);
      const otherBefore = await familyOf(other.refreshToken);
      await refreshOk(first.refreshToken);

      expectRejected(await refresh({ refreshToken: first.refreshToken }), first.refreshToken);

      expect(await familyOf(other.refreshToken)).toEqual(otherBefore);
      expect(otherBefore[0]?.revokedAt).toBeNull();
      await refreshOk(other.refreshToken);
    });

    it("использованный и истёкший refresh тоже отзывает цепочку", async () => {
      const { first } = await startChain();
      const next = await refreshOk(first.refreshToken);
      await updateSession(first.refreshToken, "expires_at = now() - interval '1 minute'");

      expectRejected(await refresh({ refreshToken: first.refreshToken }), first.refreshToken);

      const family = await familyOf(next.refreshToken);
      expect(family.every((session) => session.revokedAt !== null)).toBe(true);
      expectRejected(await refresh({ refreshToken: next.refreshToken }), next.refreshToken);
    });
  });

  describe("отказ без изменений в visitor_sessions", () => {
    const unknownToken = () => randomBytes(32).toString("base64url");

    it.each([
      ["неизвестный refresh", async () => unknownToken()],
      ["неизвестный refresh длиной 128 символов", async () => "a".repeat(128)],
      [
        "отозванный refresh",
        async (refreshToken: string) => {
          await updateSession(refreshToken, "revoked_at = now()");
          return refreshToken;
        },
      ],
      [
        "истёкший refresh",
        async (refreshToken: string) => {
          await updateSession(refreshToken, "expires_at = now() - interval '1 minute'");
          return refreshToken;
        },
      ],
    ])("%s — 401", async (_title, prepare) => {
      const { first } = await startChain();
      const presented = await prepare(first.refreshToken);
      const before = await findAllSessions(getDataSource());

      const response = await refresh({ refreshToken: presented });

      expectRejected(response, presented);
      expect(await findAllSessions(getDataSource())).toEqual(before);
    });

    it("отозванный использованный refresh не отзывает цепочку повторно", async () => {
      const { first } = await startChain();
      const next = await refreshOk(first.refreshToken);
      await updateSession(first.refreshToken, "revoked_at = now()");
      const before = await findAllSessions(getDataSource());

      expectRejected(await refresh({ refreshToken: first.refreshToken }), first.refreshToken);

      expect(await findAllSessions(getDataSource())).toEqual(before);
      await refreshOk(next.refreshToken);
    });
  });

  describe("неверное тело", () => {
    it.each([
      ["тело без refreshToken", {}],
      ["пустая строка", { refreshToken: "" }],
      ["длиннее 128 символов", { refreshToken: "a".repeat(129) }],
      ["не строка", { refreshToken: 42 }],
    ])("%s — 400 validationFailed без изменений", async (_title, body) => {
      await startChain();
      const before = await findAllSessions(getDataSource());

      const response = await refresh(body);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({ statusCode: 400, code: "validationFailed" });
      expect(await findAllSessions(getDataSource())).toEqual(before);
    });
  });

  describe("зоны", () => {
    it.each(["operator", "internal"] as const)("порт %s — 404", async (zone) => {
      const { first } = await startChain();

      const response = await postVisitorSessionRefresh(probe.ports[zone], {
        refreshToken: first.refreshToken,
      });

      expect(response.status).toBe(404);
      expect(await findSessionByRefreshToken(getDataSource(), first.refreshToken)).toMatchObject({
        usedAt: null,
      });
    });
  });
});
