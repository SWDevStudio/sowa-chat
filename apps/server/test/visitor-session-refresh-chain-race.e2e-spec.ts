import type { Response } from "supertest";
import type { DataSource, QueryRunner } from "typeorm";
import { useTestDatabase } from "./support/test-database.js";
import { lockWaitCount } from "./support/test-secrets.js";
import {
  createProjectWithPublicKey,
  findFamilySessions,
  findSessionByRefreshToken,
  postVisitorSessionRefresh,
  startVisitorSession,
} from "./support/visitor-session-requests.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

interface Chain {
  usedToken: string;
  lastToken: string;
  visitorId: string;
  familyId: string;
}

const repeats = [1, 2, 3, 4, 5, 6];

describe("POST /v1/visitor/session/refresh: повтор старого токена во время обмена последнего", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;

  beforeAll(async () => {
    probe = await startZoneE2eApp();
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function refresh(refreshToken: string): Promise<Response> {
    return Promise.resolve(postVisitorSessionRefresh(probe.ports.public, { refreshToken }));
  }

  async function startChain(): Promise<Chain> {
    const { publicKey } = await createProjectWithPublicKey(getDataSource());
    const started = await startVisitorSession(probe.ports.public, publicKey);
    const exchanged = await refresh(started.refreshToken);
    expect(exchanged.status).toBe(200);
    const session = await findSessionByRefreshToken(getDataSource(), started.refreshToken);
    return {
      usedToken: started.refreshToken,
      lastToken: exchanged.body.refreshToken,
      visitorId: session.visitorId,
      familyId: session.familyId,
    };
  }

  async function waitForLockWaiters(dataSource: DataSource, count: number): Promise<void> {
    await vi.waitFor(
      async () => {
        expect(await lockWaitCount(dataSource)).toBeGreaterThanOrEqual(count);
      },
      { timeout: 10_000, interval: 20 },
    );
  }

  async function lockVisitor(locker: QueryRunner, visitorId: string): Promise<void> {
    await locker.startTransaction();
    await locker.query('SELECT "id" FROM "visitors" WHERE "id" = $1 FOR UPDATE', [visitorId]);
  }

  async function raceWithExchangeHeldOpen(chain: Chain): Promise<Response[]> {
    const dataSource = getDataSource();
    const locker = dataSource.createQueryRunner();
    await locker.connect();
    try {
      await lockVisitor(locker, chain.visitorId);
      const exchange = refresh(chain.lastToken);
      exchange.catch(() => undefined);
      await waitForLockWaiters(dataSource, 1);
      const replay = refresh(chain.usedToken);
      replay.catch(() => undefined);
      await waitForLockWaiters(dataSource, 2);
      await locker.commitTransaction();
      return await Promise.all([exchange, replay]);
    } finally {
      if (locker.isTransactionActive) {
        await locker.rollbackTransaction();
      }
      await locker.release();
    }
  }

  function raceInParallel(chain: Chain): Promise<Response[]> {
    return Promise.all([refresh(chain.lastToken), refresh(chain.usedToken)]);
  }

  function issuedTokens(responses: Response[]): string[] {
    return responses
      .filter((response) => response.status === 200)
      .map((response) => response.body.refreshToken);
  }

  function expectRaceStatuses(responses: Response[]): void {
    for (const response of responses) {
      expect([200, 401]).toContain(response.status);
    }
    const replay = responses[1];
    expect(replay?.status).toBe(401);
    expect(replay?.body).toMatchObject({
      code: "unauthorized",
      message: "Refresh token is invalid",
    });
  }

  async function expectChainClosed(chain: Chain, responses: Response[]): Promise<void> {
    for (const token of issuedTokens(responses)) {
      const exchanged = await refresh(token);
      expect(exchanged.status).toBe(401);
      expect(exchanged.body).not.toHaveProperty("refreshToken");
    }
    for (const token of [chain.lastToken, chain.usedToken]) {
      expect((await refresh(token)).status).toBe(401);
    }
  }

  async function expectChainUntouched(chain: Chain): Promise<void> {
    const family = await findFamilySessions(getDataSource(), chain.familyId);
    expect(family.every((session) => session.revokedAt === null)).toBe(true);
    const exchanged = await refresh(chain.lastToken);
    expect(exchanged.status).toBe(200);
    expect(typeof exchanged.body.refreshToken).toBe("string");
  }

  it.each(repeats)(
    "повтор %i: обмен последнего токена удержан в транзакции, повтор старого ждёт его — новый refresh не обменивается",
    async () => {
      const chain = await startChain();
      const otherChain = await startChain();

      const responses = await raceWithExchangeHeldOpen(chain);

      expectRaceStatuses(responses);
      await expectChainClosed(chain, responses);
      await expectChainUntouched(otherChain);
    },
  );

  it.each(repeats)(
    "повтор %i: обмен последнего и повтор старого параллельно — ни один refresh цепочки не обменивается",
    async () => {
      const chain = await startChain();
      const otherChain = await startChain();

      const responses = await raceInParallel(chain);

      expectRaceStatuses(responses);
      await expectChainClosed(chain, responses);
      await expectChainUntouched(otherChain);
    },
  );

  it("после гонки строки цепочки, выданные до неё, отозваны", async () => {
    const chain = await startChain();

    await raceWithExchangeHeldOpen(chain);

    const family = await findFamilySessions(getDataSource(), chain.familyId);
    const usedSession = await findSessionByRefreshToken(getDataSource(), chain.usedToken);
    const lastSession = await findSessionByRefreshToken(getDataSource(), chain.lastToken);
    const earlierIds = [usedSession.id, lastSession.id];
    const earlier = family.filter((session) => earlierIds.includes(session.id));
    expect(earlier).toHaveLength(2);
    expect(earlier.every((session) => session.revokedAt !== null)).toBe(true);
  });
});
