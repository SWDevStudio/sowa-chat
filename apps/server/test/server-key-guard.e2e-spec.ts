import { Get, Inject } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { crc32 } from "node:zlib";
import request from "supertest";
import { ServerController } from "../src/api/server/server-controller.decorator.js";
import { ApiKeysService } from "../src/domain/keys/api-keys.service.js";
import { base62Alphabet, encodeBase62 } from "../src/domain/keys/base62.js";
import { generateKey } from "../src/domain/keys/key-format.js";
import { RequestContext } from "../src/infra/request-context/request-context.js";
import type { ApiZone } from "../src/infra/zones/zone.js";
import { OperationSteps } from "../src/telemetry/operation-steps/operation-steps.js";
import { createProject } from "./support/fixtures.js";
import { useTestDatabase } from "./support/test-database.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const probePath = "/v1/server/guard-probe";
const invalidKeyMessage = "Server key is missing or invalid";

@ServerController("guard-probe")
class GuardProbeController {
  constructor(
    @Inject(RequestContext) private readonly requestContext: RequestContext,
    @Inject(OperationSteps) private readonly operationSteps: OperationSteps,
  ) {}

  @Get()
  probe() {
    return {
      projectId: this.requestContext.projectId(),
      authMs: this.operationSteps.current()?.steps.auth,
    };
  }
}

function replaceChar(text: string, index: number): string {
  const replacement = base62Alphabet.split("").find((char) => char !== text[index]) ?? "0";
  return text.slice(0, index) + replacement + text.slice(index + 1);
}

function changeBodyChar(key: string): string {
  const [prefix = "", body = "", checksum = ""] = key.split("_");
  return `${prefix}_${replaceChar(body, 5)}_${checksum}`;
}

function forgeWithValidChecksum(key: string): string {
  const [prefix = "", body = ""] = key.split("_");
  const forgedBody = replaceChar(body, 30);
  const checksum = encodeBase62(BigInt(crc32(`${prefix}_${forgedBody}`)), 6);
  return `${prefix}_${forgedBody}_${checksum}`;
}

describe("ServerKeyGuard на /v1/server", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let keys: ApiKeysService;

  beforeAll(async () => {
    probe = await startZoneE2eApp([GuardProbeController]);
    keys = probe.app.get(ApiKeysService);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function zoneAgent(zone: ApiZone) {
    return request(`http://127.0.0.1:${probe.ports[zone]}`);
  }

  function getProbe(zone: ApiZone = "internal") {
    return zoneAgent(zone).get(probePath);
  }

  function withKey(key: string, zone: ApiZone = "internal") {
    return getProbe(zone).set("Authorization", `Bearer ${key}`);
  }

  async function issueServerKey(projectId: string): Promise<string> {
    const issued = await keys.issue({ projectId, kind: "server", actorKind: "cli" });
    return issued.key;
  }

  function expectUnauthorized(response: request.Response, key?: string): void {
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      statusCode: 401,
      code: "unauthorized",
      message: invalidKeyMessage,
    });
    if (key) {
      expect(response.text).not.toContain(key);
    }
  }

  describe("внутренний порт", () => {
    it("без заголовка Authorization — 401 unauthorized", async () => {
      const response = await getProbe();

      expectUnauthorized(response);
    });

    it("с верным sk_ — 200, projectId проекта ключа и authMs не меньше 0", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await withKey(key);

      expect(response.status).toBe(200);
      expect(response.body.projectId).toBe(project.id);
      expect(typeof response.body.authMs).toBe("number");
      expect(response.body.authMs).toBeGreaterThanOrEqual(0);
    });

    it("схема bearer в нижнем регистре тоже принимается", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await getProbe().set("Authorization", `bearer ${key}`);

      expect(response.status).toBe(200);
      expect(response.body.projectId).toBe(project.id);
    });

    it("ключи разных проектов дают projectId своего проекта", async () => {
      const first = await createProject(getDataSource());
      const second = await createProject(getDataSource());
      const firstKey = await issueServerKey(first.id);
      const secondKey = await issueServerKey(second.id);

      const firstResponse = await withKey(firstKey);
      const secondResponse = await withKey(secondKey);

      expect(firstResponse.body.projectId).toBe(first.id);
      expect(secondResponse.body.projectId).toBe(second.id);
    });

    it("отозванный ключ — 401", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({ projectId: project.id, kind: "server", actorKind: "cli" });
      expect((await withKey(issued.key)).status).toBe(200);

      await keys.revoke({ prefix: issued.prefix, actorKind: "cli" });
      const response = await withKey(issued.key);

      expectUnauthorized(response, issued.key);
    });

    it("bk_ того же проекта — 401", async () => {
      const project = await createProject(getDataSource());
      const issued = await keys.issue({
        projectId: project.id,
        kind: "bot",
        botId: randomUUID(),
        actorKind: "cli",
      });

      const response = await withKey(issued.key);

      expectUnauthorized(response, issued.key);
    });

    it("ключ с изменённым символом — 401", async () => {
      const project = await createProject(getDataSource());
      const key = changeBodyChar(await issueServerKey(project.id));

      const response = await withKey(key);

      expectUnauthorized(response, key);
    });

    it("ключ с изменённым символом и верной контрольной суммой — 401", async () => {
      const project = await createProject(getDataSource());
      const key = forgeWithValidChecksum(await issueServerKey(project.id));

      const response = await withKey(key);

      expectUnauthorized(response, key);
    });

    it("несуществующий ключ верного формата — 401", async () => {
      const key = generateKey("serverKey");

      const response = await withKey(key);

      expectUnauthorized(response, key);
    });

    it("sk_ в cookie вместо заголовка — 401", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await getProbe().set(
        "Cookie",
        `authorization=Bearer%20${key}; serverKey=${key}; token=${key}`,
      );

      expectUnauthorized(response, key);
    });

    it("sk_ в query-параметре вместо заголовка — 401", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await getProbe().query({ serverKey: key, token: key, authorization: key });

      expectUnauthorized(response, key);
    });

    it("sk_ без схемы Bearer — 401", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await getProbe().set("Authorization", key);

      expectUnauthorized(response, key);
    });

    it("sk_ со схемой Basic — 401", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await getProbe().set("Authorization", `Basic ${key}`);

      expectUnauthorized(response, key);
    });

    it("текст 401 один для всех причин", async () => {
      const project = await createProject(getDataSource());
      const bot = await keys.issue({
        projectId: project.id,
        kind: "bot",
        botId: randomUUID(),
        actorKind: "cli",
      });

      const responses = [
        await getProbe(),
        await withKey("sk_unknown"),
        await withKey(bot.key),
        await withKey(changeBodyChar(await issueServerKey(project.id))),
      ];

      const bodies = responses.map((response) => ({
        status: response.status,
        code: response.body.code,
        message: response.body.message,
      }));
      for (const body of bodies) {
        expect(body).toEqual({ status: 401, code: "unauthorized", message: invalidKeyMessage });
      }
    });
  });

  describe("другие зоны", () => {
    it("публичный порт без ключа — 404", async () => {
      const response = await getProbe("public");

      expect(response.status).toBe(404);
    });

    it("публичный порт с верным sk_ — 404", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await withKey(key, "public");

      expect(response.status).toBe(404);
      expect(response.text).not.toContain(project.id);
    });

    it("операторский порт с верным sk_ — 404", async () => {
      const project = await createProject(getDataSource());
      const key = await issueServerKey(project.id);

      const response = await withKey(key, "operator");

      expect(response.status).toBe(404);
    });
  });
});
