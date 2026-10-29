import { useTestDatabase } from "./support/test-database.js";
import {
  createProjectWithPublicKey,
  findFamilySessions,
  findSessionByRefreshToken,
  postVisitorSessionRefresh,
  startVisitorSession,
} from "./support/visitor-session-requests.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

describe("POST /v1/visitor/session/refresh: параллельные обмены", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;

  beforeAll(async () => {
    probe = await startZoneE2eApp();
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function refresh(refreshToken: string) {
    return postVisitorSessionRefresh(probe.ports.public, { refreshToken });
  }

  async function startSession() {
    const { publicKey } = await createProjectWithPublicKey(getDataSource());
    return startVisitorSession(probe.ports.public, publicKey);
  }

  it.each([1, 2, 3, 4, 5])(
    "повтор %i: один 200 и один 401, цепочка отозвана, refresh из 200 — 401",
    async () => {
      const { refreshToken } = await startSession();
      const original = await findSessionByRefreshToken(getDataSource(), refreshToken);

      const responses = await Promise.all([refresh(refreshToken), refresh(refreshToken)]);

      const statuses = responses.map((response) => response.status).sort((a, b) => a - b);
      expect(statuses).toEqual([200, 401]);
      const accepted = responses.find((response) => response.status === 200);
      const rejected = responses.find((response) => response.status === 401);
      expect(rejected?.body).toMatchObject({
        code: "unauthorized",
        message: "Refresh token is invalid",
      });

      const family = await findFamilySessions(getDataSource(), original.familyId);
      expect(family).toHaveLength(2);
      expect(family.every((session) => session.revokedAt !== null)).toBe(true);

      const issued = await refresh(accepted?.body.refreshToken);
      expect(issued.status).toBe(401);
    },
  );

  it("параллельные обмены разных цепочек — оба 200, отзыва нет", async () => {
    const first = await startSession();
    const second = await startSession();

    const responses = await Promise.all([
      refresh(first.refreshToken),
      refresh(second.refreshToken),
    ]);

    expect(responses.map((response) => response.status)).toEqual([200, 200]);
    const firstSession = await findSessionByRefreshToken(getDataSource(), first.refreshToken);
    const family = await findFamilySessions(getDataSource(), firstSession.familyId);
    expect(family.every((session) => session.revokedAt === null)).toBe(true);
  });
});
