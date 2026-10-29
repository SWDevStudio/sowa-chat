import type { OperatorRole } from "@sowa-chat/protocol";
import request from "supertest";
import {
  OperatorsService,
  operatorTokenTtlSeconds,
} from "../src/domain/operators/operators.service.js";
import { TokensService } from "../src/infra/tokens/tokens.service.js";
import type { ApiZone } from "../src/infra/zones/zone.js";
import {
  forgeToken,
  forgeUnsecuredToken,
  publicKeyPemBytes,
  publicKeyRawBytes,
  replaceHeader,
} from "./support/forged-tokens.js";
import {
  issueTestOperator,
  OperatorGuardProbeController,
  operatorProbePath,
  waitMs,
} from "./support/operator-guard-probe.js";
import type { IssuedOperator } from "./support/operator-guard-probe.js";
import { useTestDatabase } from "./support/test-database.js";
import { key1, key2 } from "./support/token-service-fixtures.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const invalidTokenMessage = "Operator token is missing or invalid";

describe("OperatorAuthGuard на /v1/operator", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let operators: OperatorsService;
  let tokens: TokensService;

  beforeAll(async () => {
    probe = await startZoneE2eApp([OperatorGuardProbeController]);
    operators = probe.app.get(OperatorsService);
    tokens = probe.app.get(TokensService);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function getProbe(zone: ApiZone = "operator") {
    return request(`http://127.0.0.1:${probe.ports[zone]}`).get(operatorProbePath);
  }

  function withToken(token: string, zone: ApiZone = "operator") {
    return getProbe(zone).set("Authorization", `Bearer ${token}`);
  }

  function issueOperator(role: OperatorRole = "operator"): Promise<IssuedOperator> {
    return issueTestOperator(getDataSource(), operators, role);
  }

  async function signOperatorToken(claims: Record<string, string>): Promise<string> {
    const signed = await tokens.sign({
      audience: "operator",
      subject: "operator-from-claims",
      claims,
      ttlSeconds: operatorTokenTtlSeconds,
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

  describe("токен из issueToken", () => {
    it("без заголовка Authorization — 401 unauthorized", async () => {
      expectUnauthorized(await getProbe());
    });

    it("с мусорной строкой — 401 unauthorized", async () => {
      expectUnauthorized(await withToken("not-a-jwt"), "not-a-jwt");
    });

    it("с тремя мусорными частями через точку — 401", async () => {
      expectUnauthorized(await withToken("aaa.bbb.ccc"));
    });

    it("с верным токеном — 200, projectId, operator и authMs не меньше 0", async () => {
      const issued = await issueOperator();

      const response = await withToken(issued.token);

      expect(response.status).toBe(200);
      expect(response.body.projectId).toBe(issued.projectId);
      expect(response.body.operator).toEqual({ operatorId: issued.operatorId, role: "operator" });
      expect(typeof response.body.authMs).toBe("number");
      expect(response.body.authMs).toBeGreaterThanOrEqual(0);
    });

    it("роль supervisor из токена попадает в контекст", async () => {
      const issued = await issueOperator("supervisor");

      const response = await withToken(issued.token);

      expect(response.status).toBe(200);
      expect(response.body.operator).toEqual({ operatorId: issued.operatorId, role: "supervisor" });
    });

    it("схема bearer в нижнем регистре тоже принимается", async () => {
      const issued = await issueOperator();

      const response = await getProbe().set("Authorization", `bearer ${issued.token}`);

      expect(response.status).toBe(200);
    });

    it("токен без схемы Bearer — 401", async () => {
      const issued = await issueOperator();

      expectUnauthorized(await getProbe().set("Authorization", issued.token), issued.token);
    });

    it("токен в cookie вместо заголовка — 401", async () => {
      const issued = await issueOperator();

      const response = await getProbe().set(
        "Cookie",
        `authorization=Bearer%20${issued.token}; token=${issued.token}`,
      );

      expectUnauthorized(response, issued.token);
    });

    it("токен в query-параметре вместо заголовка — 401", async () => {
      const issued = await issueOperator();

      const response = await getProbe().query({ token: issued.token, authorization: issued.token });

      expectUnauthorized(response);
    });
  });

  describe("подпись, alg и kid", () => {
    it("тот же payload, подписанный test-1 с kid test-1, — 200", async () => {
      const issued = await issueOperator();
      const token = await forgeToken({
        header: { alg: "EdDSA", kid: "test-1", typ: "JWT" },
        payload: issued.payload,
        key: key1.privateKey,
      });

      expect((await withToken(token)).status).toBe(200);
    });

    it("alg none без подписи — 401", async () => {
      const issued = await issueOperator();
      const token = forgeUnsecuredToken(issued.payload);

      expectUnauthorized(await withToken(token), token);
    });

    it("alg none в заголовке верного токена — 401", async () => {
      const issued = await issueOperator();
      const token = replaceHeader(issued.token, { alg: "none", kid: "test-1", typ: "JWT" });

      expectUnauthorized(await withToken(token), token);
    });

    it.each([
      ["PEM", publicKeyPemBytes(key1)],
      ["сырым", publicKeyRawBytes(key1)],
    ])("HS256 с публичным ключом test-1 (%s) как секретом — 401", async (_format, secret) => {
      const issued = await issueOperator();
      const token = await forgeToken({
        header: { alg: "HS256", kid: "test-1", typ: "JWT" },
        payload: issued.payload,
        key: secret,
      });

      expectUnauthorized(await withToken(token), token);
    });

    it("подписан ключом test-2, которого нет в SOWA_TOKEN_SIGNING_KEYS, — 401", async () => {
      const issued = await issueOperator();
      const token = await forgeToken({
        header: { alg: "EdDSA", kid: "test-2", typ: "JWT" },
        payload: issued.payload,
        key: key2.privateKey,
      });

      expectUnauthorized(await withToken(token), token);
    });

    it("подписан ключом test-2 с kid test-1 — 401", async () => {
      const issued = await issueOperator();
      const token = await forgeToken({
        header: { alg: "EdDSA", kid: "test-1", typ: "JWT" },
        payload: issued.payload,
        key: key2.privateKey,
      });

      expectUnauthorized(await withToken(token), token);
    });
  });

  describe("aud и срок", () => {
    it("токен с aud visitor и верными claims оператора — 401", async () => {
      const issued = await issueOperator();
      const signed = await tokens.sign({
        audience: "visitor",
        subject: issued.operatorId,
        claims: { projectId: issued.projectId, role: "operator" },
        ttlSeconds: operatorTokenTtlSeconds,
      });

      expectUnauthorized(await withToken(signed.token), signed.token);
    });

    it("просроченный токен (ttlSeconds 1, запрос через 2 секунды) — 401", async () => {
      const issued = await issueOperator();
      const signed = await tokens.sign({
        audience: "operator",
        subject: issued.operatorId,
        claims: { projectId: issued.projectId, role: "operator" },
        ttlSeconds: 1,
      });

      await waitMs(2000);

      expectUnauthorized(await withToken(signed.token), signed.token);
    });
  });

  describe("claims", () => {
    it("aud operator с верными projectId и role — 200", async () => {
      const issued = await issueOperator();

      const token = await signOperatorToken({ projectId: issued.projectId, role: "supervisor" });
      const response = await withToken(token);

      expect(response.status).toBe(200);
      expect(response.body.projectId).toBe(issued.projectId);
      expect(response.body.operator).toEqual({
        operatorId: "operator-from-claims",
        role: "supervisor",
      });
    });

    it("без projectId — 401", async () => {
      const token = await signOperatorToken({ role: "operator" });

      expectUnauthorized(await withToken(token), token);
    });

    it("с пустым projectId — 401", async () => {
      const token = await signOperatorToken({ projectId: "", role: "operator" });

      expectUnauthorized(await withToken(token), token);
    });

    it('с role: "admin" — 401', async () => {
      const issued = await issueOperator();
      const token = await signOperatorToken({ projectId: issued.projectId, role: "admin" });

      expectUnauthorized(await withToken(token), token);
    });

    it("без role — 401", async () => {
      const issued = await issueOperator();
      const token = await signOperatorToken({ projectId: issued.projectId });

      expectUnauthorized(await withToken(token), token);
    });
  });

  describe("другие зоны", () => {
    it.each(["public", "internal"] as const)("порт %s с верным токеном — 404", async (zone) => {
      const issued = await issueOperator();

      const response = await withToken(issued.token, zone);

      expect(response.status).toBe(404);
      expect(response.text).not.toContain(issued.projectId);
    });
  });
});
