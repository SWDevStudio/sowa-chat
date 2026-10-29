import { Get } from "@nestjs/common";
import request from "supertest";
import { OperatorController } from "../src/api/operator/operator-controller.decorator.js";
import { DisabledOperators } from "../src/domain/operators/disabled-operators.js";
import { OperatorsService } from "../src/domain/operators/operators.service.js";
import { issueTestOperator } from "./support/operator-guard-probe.js";
import type { IssuedOperator } from "./support/operator-guard-probe.js";
import { useTestDatabase } from "./support/test-database.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

const disabledProbePath = "/v1/operator/disabled-probe";
const invalidTokenMessage = "Operator token is missing or invalid";

@OperatorController("disabled-probe")
class DisabledProbeController {
  @Get()
  probe() {
    return { ok: true };
  }
}

describe("DisabledOperators в OperatorAuthGuard", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let operators: OperatorsService;
  let disabledOperators: DisabledOperators;

  beforeAll(async () => {
    probe = await startZoneE2eApp([DisabledProbeController]);
    operators = probe.app.get(OperatorsService);
    disabledOperators = probe.app.get(DisabledOperators);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function getWithToken(token: string, app: ZoneProbeApp = probe) {
    return request(`http://127.0.0.1:${app.ports.operator}`)
      .get(disabledProbePath)
      .set("Authorization", `Bearer ${token}`);
  }

  function issueOperator(): Promise<IssuedOperator> {
    return issueTestOperator(getDataSource(), operators, "operator");
  }

  async function disableInDatabase(operatorId: string): Promise<void> {
    await getDataSource().query("UPDATE operators SET disabled_at = now() WHERE id = $1", [
      operatorId,
    ]);
  }

  function expectUnauthorized(response: request.Response, token: string): void {
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      statusCode: 401,
      code: "unauthorized",
      message: invalidTokenMessage,
    });
    expect(response.text).not.toContain(token);
  }

  it("оператор не в списке блокировок — 200", async () => {
    const issued = await issueOperator();

    const response = await getWithToken(issued.token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  describe("заблокирован в базе до старта приложения", () => {
    let secondApp: ZoneProbeApp | undefined;

    afterEach(async () => {
      await secondApp?.app.close();
      secondApp = undefined;
    });

    it("свой ещё действующий токен — 401", async () => {
      const issued = await issueOperator();
      await disableInDatabase(issued.operatorId);

      secondApp = await startZoneE2eApp([DisabledProbeController]);

      expectUnauthorized(await getWithToken(issued.token, secondApp), issued.token);
    });

    it("другой оператор того же проекта на новой реплике — 200", async () => {
      const blocked = await issueOperator();
      const other = await operators.issueToken({
        projectId: blocked.projectId,
        externalId: "ext-other",
        name: "Bob",
        role: "operator",
      });
      await disableInDatabase(blocked.operatorId);

      secondApp = await startZoneE2eApp([DisabledProbeController]);

      expect((await getWithToken(other.token, secondApp)).status).toBe(200);
      expect((await getWithToken(blocked.token, secondApp)).status).toBe(401);
    });

    it("список новой реплики содержит заблокированного", async () => {
      const issued = await issueOperator();
      await disableInDatabase(issued.operatorId);

      secondApp = await startZoneE2eApp([DisabledProbeController]);

      expect(secondApp.app.get(DisabledOperators).has(issued.operatorId)).toBe(true);
    });
  });

  describe("блокировка после выдачи токена", () => {
    it("disabled_at в базе без add — guard не ходит в БД, запрос проходит", async () => {
      const issued = await issueOperator();
      await disableInDatabase(issued.operatorId);

      const response = await getWithToken(issued.token);

      expect(response.status).toBe(200);
    });

    it("после add — 401, после remove — снова 200", async () => {
      const issued = await issueOperator();
      expect((await getWithToken(issued.token)).status).toBe(200);
      await disableInDatabase(issued.operatorId);

      disabledOperators.add(issued.operatorId);
      expectUnauthorized(await getWithToken(issued.token), issued.token);

      disabledOperators.remove(issued.operatorId);
      expect((await getWithToken(issued.token)).status).toBe(200);
    });

    it("add одного оператора не затрагивает другого", async () => {
      const blocked = await issueOperator();
      const other = await operators.issueToken({
        projectId: blocked.projectId,
        externalId: "ext-other",
        name: "Bob",
        role: "operator",
      });

      disabledOperators.add(blocked.operatorId);

      expect((await getWithToken(blocked.token)).status).toBe(401);
      expect((await getWithToken(other.token)).status).toBe(200);
      disabledOperators.remove(blocked.operatorId);
    });

    it("заблокированный оператор не получает ответ с данными пробного маршрута", async () => {
      const issued = await issueOperator();
      disabledOperators.add(issued.operatorId);

      const response = await getWithToken(issued.token);

      expect(response.body).not.toHaveProperty("ok");
      disabledOperators.remove(issued.operatorId);
    });
  });
});
