import { randomUUID } from "node:crypto";
import { decodeJwt } from "jose";
import request from "supertest";
import { VisitorAuthModule } from "../src/api/visitor/visitor-auth.module.js";
import { generateKey } from "../src/domain/keys/key-format.js";
import { VisitorSession } from "../src/domain/visitors/visitor-session.entity.js";
import { Visitor } from "../src/domain/visitors/visitor.entity.js";
import { TokensService } from "../src/infra/tokens/tokens.service.js";
import type { ApiZone } from "../src/infra/zones/zone.js";
import { createProject } from "./support/fixtures.js";
import { forgeToken, forgeUnsecuredToken, replaceHeader } from "./support/forged-tokens.js";
import { waitMs } from "./support/operator-guard-probe.js";
import { useTestDatabase } from "./support/test-database.js";
import { key1, key2 } from "./support/token-service-fixtures.js";
import { VisitorGuardProbeController, visitorProbePath } from "./support/visitor-guard-probe.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const invalidTokenMessage = "Visitor token is missing or invalid";
const accessTtlSeconds = 3600;

interface IssuedVisitor {
  projectId: string;
  visitorId: string;
  token: string;
}

describe("VisitorAuthGuard на /v1/visitor", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let tokens: TokensService;

  beforeAll(async () => {
    probe = await startZoneE2eApp([VisitorGuardProbeController], [VisitorAuthModule]);
    tokens = probe.app.get(TokensService);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function getProbe(zone: ApiZone = "public") {
    return request(`http://127.0.0.1:${probe.ports[zone]}`).get(visitorProbePath);
  }

  function withToken(token: string, zone: ApiZone = "public") {
    return getProbe(zone).set("Authorization", `Bearer ${token}`);
  }

  async function issueVisitor(): Promise<IssuedVisitor> {
    const publicKey = generateKey("publicKey");
    const project = await createProject(getDataSource(), { publicKey });
    const response = await request(`http://127.0.0.1:${probe.ports.public}`)
      .post("/v1/visitor/session")
      .send({ publicKey });
    expect(response.status).toBe(201);
    const visitors = await getDataSource().getRepository(Visitor).findBy({ projectId: project.id });
    expect(visitors).toHaveLength(1);
    return {
      projectId: project.id,
      visitorId: visitors[0].id,
      token: response.body.accessToken,
    };
  }

  async function signVisitorToken(claims: Record<string, string>): Promise<string> {
    const signed = await tokens.sign({
      audience: "visitor",
      subject: "visitor-from-claims",
      claims,
      ttlSeconds: accessTtlSeconds,
    });
    return signed.token;
  }

  function expectUnauthorized(response: request.Response, token?: string): void {
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      statusCode: 401,
      code: "unauthorized",
      message: invalidTokenMessage,
    });
    if (token) {
      expect(response.text).not.toContain(token);
    }
  }

  describe("токен из POST /v1/visitor/session", () => {
    it("200, projectId проекта, visitorId созданного посетителя, authMs не меньше 0", async () => {
      const issued = await issueVisitor();

      const response = await withToken(issued.token);

      expect(response.status).toBe(200);
      expect(response.body.projectId).toBe(issued.projectId);
      expect(response.body.visitor).toEqual({ visitorId: issued.visitorId });
      expect(typeof response.body.authMs).toBe("number");
      expect(response.body.authMs).toBeGreaterThanOrEqual(0);
    });

    it("схема bearer в нижнем регистре тоже принимается", async () => {
      const issued = await issueVisitor();

      const response = await getProbe().set("Authorization", `bearer ${issued.token}`);

      expect(response.status).toBe(200);
    });

    it("отозванная в БД сессия не мешает access-токену: guard не читает базу", async () => {
      const issued = await issueVisitor();
      await getDataSource()
        .getRepository(VisitorSession)
        .update({ visitorId: issued.visitorId }, { revokedAt: new Date() });

      const response = await withToken(issued.token);

      expect(response.status).toBe(200);
      expect(response.body.visitor).toEqual({ visitorId: issued.visitorId });
    });
  });

  describe("нет токена или он не в заголовке", () => {
    it("без заголовка Authorization — 401 unauthorized", async () => {
      expectUnauthorized(await getProbe());
    });

    it("с мусорной строкой — 401 unauthorized", async () => {
      expectUnauthorized(await withToken("not-a-jwt"), "not-a-jwt");
    });

    it("с тремя мусорными частями через точку — 401", async () => {
      expectUnauthorized(await withToken("aaa.bbb.ccc"), "aaa.bbb.ccc");
    });

    it("пустой Bearer — 401", async () => {
      expectUnauthorized(await getProbe().set("Authorization", "Bearer "));
    });

    it("токен без схемы Bearer — 401", async () => {
      const issued = await issueVisitor();

      expectUnauthorized(await getProbe().set("Authorization", issued.token), issued.token);
    });

    it("токен со схемой Basic — 401", async () => {
      const issued = await issueVisitor();

      const response = await getProbe().set("Authorization", `Basic ${issued.token}`);

      expectUnauthorized(response, issued.token);
    });

    it("токен в cookie вместо заголовка — 401", async () => {
      const issued = await issueVisitor();

      const response = await getProbe().set(
        "Cookie",
        `authorization=Bearer%20${issued.token}; token=${issued.token}`,
      );

      expectUnauthorized(response, issued.token);
    });

    it("токен в query-параметре вместо заголовка — 401", async () => {
      const issued = await issueVisitor();

      const response = await getProbe().query({ token: issued.token, authorization: issued.token });

      expectUnauthorized(response, issued.token);
    });
  });

  describe("подпись, alg, aud и срок", () => {
    it("тот же payload, подписанный test-1 с kid test-1, — 200", async () => {
      const issued = await issueVisitor();
      const token = await forgeToken({
        header: { alg: "EdDSA", kid: "test-1", typ: "JWT" },
        payload: decodeJwt(issued.token),
        key: key1.privateKey,
      });

      expect((await withToken(token)).status).toBe(200);
    });

    it("токен оператора с aud operator и claim projectId — 401", async () => {
      const issued = await issueVisitor();
      const signed = await tokens.sign({
        audience: "operator",
        subject: issued.visitorId,
        claims: { projectId: issued.projectId, role: "operator" },
        ttlSeconds: accessTtlSeconds,
      });

      expectUnauthorized(await withToken(signed.token), signed.token);
    });

    it("просроченный токен (ttlSeconds 1, запрос через 2 секунды) — 401", async () => {
      const issued = await issueVisitor();
      const signed = await tokens.sign({
        audience: "visitor",
        subject: issued.visitorId,
        claims: { projectId: issued.projectId },
        ttlSeconds: 1,
      });

      await waitMs(2000);

      expectUnauthorized(await withToken(signed.token), signed.token);
    });

    it("alg none без подписи — 401", async () => {
      const issued = await issueVisitor();
      const token = forgeUnsecuredToken(decodeJwt(issued.token));

      expectUnauthorized(await withToken(token), token);
    });

    it("alg none в заголовке верного токена — 401", async () => {
      const issued = await issueVisitor();
      const token = replaceHeader(issued.token, { alg: "none", kid: "test-1", typ: "JWT" });

      expectUnauthorized(await withToken(token), token);
    });

    it("подписан ключом test-2, которого нет в SOWA_TOKEN_SIGNING_KEYS, — 401", async () => {
      const issued = await issueVisitor();
      const token = await forgeToken({
        header: { alg: "EdDSA", kid: "test-2", typ: "JWT" },
        payload: decodeJwt(issued.token),
        key: key2.privateKey,
      });

      expectUnauthorized(await withToken(token), token);
    });

    it("подписан ключом test-2 с kid test-1 — 401", async () => {
      const issued = await issueVisitor();
      const token = await forgeToken({
        header: { alg: "EdDSA", kid: "test-1", typ: "JWT" },
        payload: decodeJwt(issued.token),
        key: key2.privateKey,
      });

      expectUnauthorized(await withToken(token), token);
    });
  });

  describe("claims", () => {
    it("aud visitor с projectId — 200, ID посетителя и проекта только из токена", async () => {
      const projectId = randomUUID();
      const token = await signVisitorToken({ projectId });

      const response = await withToken(token);

      expect(response.status).toBe(200);
      expect(response.body.projectId).toBe(projectId);
      expect(response.body.visitor).toEqual({ visitorId: "visitor-from-claims" });
    });

    it("без projectId — 401", async () => {
      const token = await signVisitorToken({});

      expectUnauthorized(await withToken(token), token);
    });

    it("с пустым projectId — 401", async () => {
      const token = await signVisitorToken({ projectId: "" });

      expectUnauthorized(await withToken(token), token);
    });
  });

  describe("другие зоны", () => {
    it("порт operator с верным токеном — 404", async () => {
      const issued = await issueVisitor();

      const response = await withToken(issued.token, "operator");

      expect(response.status).toBe(404);
      expect(response.text).not.toContain(issued.projectId);
      expect(response.text).not.toContain(issued.token);
    });
  });
});
