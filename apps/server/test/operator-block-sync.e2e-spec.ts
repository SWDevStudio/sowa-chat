import { randomUUID } from "node:crypto";
import type { Response } from "supertest";
import { DisabledOperators } from "../src/domain/operators/disabled-operators.js";
import { OperatorsService } from "../src/domain/operators/operators.service.js";
import { findFreePort } from "./support/e2e-server.js";
import type { OperatorChannel } from "./support/operator-block-probe.js";
import {
  BlockSyncProbeController,
  channelSubscribers,
  operatorChannels,
  probeWithToken,
  projectNameOf,
  publishOperatorEvent,
  recordChannel,
} from "./support/operator-block-probe.js";
import type { OperatorAction } from "./support/operator-cli.js";
import { runOperatorCommand } from "./support/operator-cli.js";
import { issueTestOperator, waitMs } from "./support/operator-guard-probe.js";
import type { IssuedOperator } from "./support/operator-guard-probe.js";
import { outputOf } from "./support/project-cli.js";
import { useTestDatabase } from "./support/test-database.js";
import { useTestRedis } from "./support/test-redis.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const commandTimeout = 300_000;
const deliveryTimeout = 2000;
const subscribeTimeout = 10_000;
const quietPeriodMs = 500;
const externalId = "ext-operator";

interface BlockTarget {
  issued: IssuedOperator;
  project: string;
}

function redisUrl(): string {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error("REDIS_URL is not set");
  }
  return url;
}

function expectUnauthorized(response: Response, token: string): void {
  expect(response.status).toBe(401);
  expect(response.body).toMatchObject({ statusCode: 401, code: "unauthorized" });
  expect(response.text).not.toContain(token);
}

describe("блокировка оператора на всех репликах", { timeout: commandTimeout }, () => {
  const getDataSource = useTestDatabase();
  const getRedis = useTestRedis();
  let apps: ZoneProbeApp[] = [];
  let first: ZoneProbeApp;
  let operators: OperatorsService;

  function subscriberCounts(): Promise<number[]> {
    return Promise.all(operatorChannels.map((channel) => channelSubscribers(getRedis(), channel)));
  }

  beforeAll(async () => {
    const before = await subscriberCounts();
    first = await startZoneE2eApp([BlockSyncProbeController]);
    const second = await startZoneE2eApp([BlockSyncProbeController]);
    apps = [first, second];
    operators = first.app.get(OperatorsService);
    await vi.waitFor(
      async () => expect(await subscriberCounts()).toEqual(before.map((count) => count + 2)),
      { timeout: subscribeTimeout },
    );
  }, commandTimeout);

  afterAll(async () => {
    await Promise.all(apps.map((probe) => probe.app.close()));
    vi.unstubAllEnvs();
  });

  async function issueOperator(): Promise<BlockTarget> {
    const issued = await issueTestOperator(getDataSource(), operators, "operator");
    return { issued, project: await projectNameOf(getDataSource(), issued.projectId) };
  }

  async function runCommand(action: OperatorAction, target: BlockTarget): Promise<void> {
    const result = await runOperatorCommand(action, { project: target.project, externalId });
    expect(result.exitCode, outputOf(result)).toBe(0);
  }

  async function expectStatusOnAll(token: string, status: number): Promise<void> {
    for (const probe of apps) {
      expect((await probeWithToken(probe, token)).status).toBe(status);
    }
  }

  async function waitForStatusOnAll(token: string, status: number): Promise<void> {
    await Promise.all(
      apps.map((probe) =>
        vi.waitFor(async () => expect((await probeWithToken(probe, token)).status).toBe(status), {
          timeout: deliveryTimeout,
        }),
      ),
    );
  }

  function blockedOnAll(operatorId: string): boolean[] {
    return apps.map((probe) => probe.app.get(DisabledOperators).has(operatorId));
  }

  async function waitForBlockedOnAll(operatorId: string, blocked: boolean): Promise<void> {
    await vi.waitFor(() => expect(blockedOnAll(operatorId)).toEqual([blocked, blocked]), {
      timeout: deliveryTimeout,
    });
  }

  async function publishAll(channel: OperatorChannel, payloads: unknown[]): Promise<void> {
    for (const payload of payloads) {
      await publishOperatorEvent(getRedis(), channel, payload);
    }
  }

  describe("operator:disable через CLI", () => {
    it("оба экземпляра в течение 2 секунд отвечают 401 unauthorized", async () => {
      const target = await issueOperator();
      await expectStatusOnAll(target.issued.token, 200);

      await runCommand("disable", target);

      await waitForStatusOnAll(target.issued.token, 401);
      for (const probe of apps) {
        expectUnauthorized(await probeWithToken(probe, target.issued.token), target.issued.token);
      }
      expect(blockedOnAll(target.issued.operatorId)).toEqual([true, true]);
    });

    it("другой оператор того же проекта по-прежнему проходит на обоих", async () => {
      const target = await issueOperator();
      const other = await operators.issueToken({
        projectId: target.issued.projectId,
        externalId: "ext-other",
        name: "Bob",
        role: "operator",
      });

      await runCommand("disable", target);

      await waitForStatusOnAll(target.issued.token, 401);
      await expectStatusOnAll(other.token, 200);
    });

    it("в Redis уходит operator.disabled только с operatorId", async () => {
      const target = await issueOperator();
      const recorder = await recordChannel(redisUrl(), "operator.disabled");
      try {
        await runCommand("disable", target);

        await vi.waitFor(() => expect(recorder.received).toHaveLength(1), {
          timeout: deliveryTimeout,
        });
        expect(recorder.received[0]).toEqual({
          pattern: "operator.disabled",
          data: { operatorId: target.issued.operatorId },
        });
        expect(JSON.stringify(recorder.received)).not.toContain(externalId);
        expect(JSON.stringify(recorder.received)).not.toContain(target.issued.token);
      } finally {
        await recorder.close();
      }
    });

    it("без доставки через Redis экземпляры пропускают токен до перезапуска", async () => {
      const target = await issueOperator();
      const workingRedisUrl = redisUrl();
      vi.stubEnv("REDIS_URL", `redis://127.0.0.1:${await findFreePort()}`);
      try {
        await runCommand("disable", target);
      } finally {
        vi.stubEnv("REDIS_URL", workingRedisUrl);
      }

      await waitMs(quietPeriodMs);

      await expectStatusOnAll(target.issued.token, 200);
      expect(blockedOnAll(target.issued.operatorId)).toEqual([false, false]);
    });
  });

  describe("operator:enable через CLI", () => {
    it("тот же токен в течение 2 секунд снова проходит на обоих", async () => {
      const target = await issueOperator();
      await runCommand("disable", target);
      await waitForStatusOnAll(target.issued.token, 401);

      await runCommand("enable", target);

      await waitForStatusOnAll(target.issued.token, 200);
      expect(blockedOnAll(target.issued.operatorId)).toEqual([false, false]);
    });
  });

  describe("экземпляр, запущенный после команды", () => {
    let late: ZoneProbeApp | undefined;

    afterEach(async () => {
      await late?.app.close();
      late = undefined;
    });

    it("после operator:disable сразу отвечает 401", async () => {
      const target = await issueOperator();
      await runCommand("disable", target);

      late = await startZoneE2eApp([BlockSyncProbeController]);

      expectUnauthorized(await probeWithToken(late, target.issued.token), target.issued.token);
    });

    it("после operator:enable сразу пропускает токен", async () => {
      const target = await issueOperator();
      await runCommand("disable", target);
      await runCommand("enable", target);

      late = await startZoneE2eApp([BlockSyncProbeController]);

      expect((await probeWithToken(late, target.issued.token)).status).toBe(200);
    });
  });

  describe("неверные события реплик", () => {
    it("operator.disabled без UUID или без поля не меняет список и не роняет экземпляры", async () => {
      const target = await issueOperator();
      const marker = randomUUID();

      await publishAll("operator.disabled", [
        { operatorId: "not-a-uuid" },
        { operatorId: 42 },
        { id: target.issued.operatorId },
        {},
        null,
      ]);
      await publishOperatorEvent(getRedis(), "operator.disabled", { operatorId: marker });

      await waitForBlockedOnAll(marker, true);
      expect(blockedOnAll("not-a-uuid")).toEqual([false, false]);
      expect(blockedOnAll(target.issued.operatorId)).toEqual([false, false]);
      await expectStatusOnAll(target.issued.token, 200);
    });

    it("неверное operator.enabled не снимает блокировку", async () => {
      const target = await issueOperator();
      const marker = randomUUID();
      await publishOperatorEvent(getRedis(), "operator.disabled", {
        operatorId: target.issued.operatorId,
      });
      await publishOperatorEvent(getRedis(), "operator.disabled", { operatorId: marker });
      await waitForStatusOnAll(target.issued.token, 401);
      await waitForBlockedOnAll(marker, true);

      await publishAll("operator.enabled", [
        { operatorId: `${target.issued.operatorId}-x` },
        { id: target.issued.operatorId },
        {},
      ]);
      await publishOperatorEvent(getRedis(), "operator.enabled", { operatorId: marker });

      await waitForBlockedOnAll(marker, false);
      expect(blockedOnAll(target.issued.operatorId)).toEqual([true, true]);
      await expectStatusOnAll(target.issued.token, 401);
    });
  });

  describe("изменение в процессе экземпляра", () => {
    let own: ZoneProbeApp;

    beforeAll(async () => {
      own = await startZoneE2eApp([BlockSyncProbeController]);
    }, commandTimeout);

    afterAll(async () => {
      await own.app.close();
    });

    it("OperatorsService.disable сразу делает has истинным, enable — ложным", async () => {
      const ownOperators = own.app.get(OperatorsService);
      const issued = await issueTestOperator(getDataSource(), ownOperators, "operator");
      const input = { projectId: issued.projectId, externalId, actorKind: "cli" } as const;
      const disabledOperators = own.app.get(DisabledOperators);

      await ownOperators.disable(input);

      expect(disabledOperators.has(issued.operatorId)).toBe(true);
      expectUnauthorized(await probeWithToken(own, issued.token), issued.token);

      await ownOperators.enable(input);

      expect(disabledOperators.has(issued.operatorId)).toBe(false);
      expect((await probeWithToken(own, issued.token)).status).toBe(200);
    });
  });
});
