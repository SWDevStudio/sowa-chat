import { Get } from "@nestjs/common";
import type { OperatorRole } from "@sowa-chat/protocol";
import request from "supertest";
import { OperatorController } from "../src/api/operator/operator-controller.decorator.js";
import { SupervisorOnly } from "../src/api/operator/supervisor-only.decorator.js";
import { OperatorsService } from "../src/domain/operators/operators.service.js";
import { issueTestOperator } from "./support/operator-guard-probe.js";
import { useTestDatabase } from "./support/test-database.js";
import { startZoneE2eApp } from "./support/zone-e2e-app.js";
import type { ZoneProbeApp } from "./support/zone-probe.js";

@OperatorController("roles-probe")
class RolesProbeController {
  @Get("any")
  any() {
    return { ok: true };
  }

  @Get("supervisor")
  @SupervisorOnly()
  supervisorOnly() {
    return { ok: true };
  }
}

describe("OperatorRoleGuard на /v1/operator", () => {
  const getDataSource = useTestDatabase();
  let probe: ZoneProbeApp;
  let operators: OperatorsService;

  beforeAll(async () => {
    probe = await startZoneE2eApp([RolesProbeController]);
    operators = probe.app.get(OperatorsService);
  });

  afterAll(async () => {
    await probe?.app.close();
    vi.unstubAllEnvs();
  });

  function get(path: string) {
    return request(`http://127.0.0.1:${probe.ports.operator}`).get(
      `/v1/operator/roles-probe/${path}`,
    );
  }

  async function getAs(role: OperatorRole, path: string) {
    const issued = await issueTestOperator(getDataSource(), operators, role);
    return get(path).set("Authorization", `Bearer ${issued.token}`);
  }

  describe("маршрут без SupervisorOnly", () => {
    it.each<OperatorRole>(["operator", "supervisor"])("роль %s — 200", async (role) => {
      const response = await getAs(role, "any");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ok: true });
    });

    it("без токена — 401 unauthorized", async () => {
      const response = await get("any");

      expect(response.status).toBe(401);
      expect(response.body.code).toBe("unauthorized");
    });
  });

  describe("маршрут с SupervisorOnly", () => {
    it("роль supervisor — 200", async () => {
      const response = await getAs("supervisor", "supervisor");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ok: true });
    });

    it("роль operator — 403 forbidden", async () => {
      const issued = await issueTestOperator(getDataSource(), operators, "operator");

      const response = await get("supervisor").set("Authorization", `Bearer ${issued.token}`);

      expect(response.status).toBe(403);
      expect(response.body).toMatchObject({
        statusCode: 403,
        code: "forbidden",
        message: "Supervisor role is required",
      });
      expect(response.text).not.toContain(issued.token);
    });

    it("без токена — 401 unauthorized, а не 403", async () => {
      const response = await get("supervisor");

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        statusCode: 401,
        code: "unauthorized",
        message: "Operator token is missing or invalid",
      });
    });

    it("с мусорным токеном — 401, а не 403", async () => {
      const response = await get("supervisor").set("Authorization", "Bearer not-a-jwt");

      expect(response.status).toBe(401);
      expect(response.body.code).toBe("unauthorized");
    });
  });
});
