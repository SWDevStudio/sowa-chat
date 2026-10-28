import { Controller, Get, NotFoundException, Post } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExecutionContextHost } from "@nestjs/core/internal";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "./zone.decorator.js";
import { ZoneGuard } from "./zone.guard.js";
import { apiZones } from "./zone.js";
import type { ApiZone, ZonePorts } from "./zone.js";

@Zone("operator")
@Controller("zone-guard/operator")
class OperatorZoneController {
  @Get()
  read(): string {
    return "operator";
  }

  @Post()
  create(): string {
    return "operator";
  }
}

@Controller("zone-guard/unzoned")
class UnzonedController {
  @Get()
  read(): string {
    return "unzoned";
  }
}

@Zone("operator")
@Controller("zone-guard/mixed")
class MixedZoneController {
  @Zone("management")
  @Get("management")
  management(): string {
    return "management";
  }

  @Get("inherited")
  inherited(): string {
    return "inherited";
  }
}

const operatorPath = "/v1/zone-guard/operator";
const unzonedPath = "/v1/zone-guard/unzoned";
const mixedManagementPath = "/v1/zone-guard/mixed/management";
const mixedInheritedPath = "/v1/zone-guard/mixed/inherited";

const guardedControllers = [OperatorZoneController, UnzonedController, MixedZoneController];

const unitPorts: ZonePorts = {
  public: 18080,
  operator: 18081,
  internal: 18082,
  management: 19090,
};

function zoneUrl(ports: ZonePorts, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${ports[zone]}${path}`;
}

function zonesExcept(zone: ApiZone): ApiZone[] {
  return apiZones.filter((candidate) => candidate !== zone);
}

interface CapturedResponse {
  status: number;
  body: unknown;
}

const sharedRequestId = "zone-guard-spec-request";

async function capture(url: string, method = "GET"): Promise<CapturedResponse> {
  const response = await fetch(url, { method, headers: { "X-Request-Id": sharedRequestId } });
  return { status: response.status, body: await response.json() };
}

interface FakeRequest {
  method: string;
  originalUrl: string;
  socket: { localPort: number | undefined };
}

function httpContext(handler: () => unknown, request: FakeRequest): ExecutionContextHost {
  return new ExecutionContextHost([request, {}, () => undefined], MixedZoneController, handler);
}

function requestOnPort(localPort: number | undefined, originalUrl = "/v1/probe"): FakeRequest {
  return { method: "GET", originalUrl, socket: { localPort } };
}

describe("ZoneGuard через порты зон", () => {
  const apps: INestApplication[] = [];

  async function startApp(controllers = guardedControllers) {
    const probe = await startZoneProbeApp(controllers);
    apps.push(probe.app);
    return probe;
  }

  afterEach(async () => {
    for (const app of apps.splice(0)) {
      await app.close();
    }
    vi.unstubAllEnvs();
  });

  it("маршрут @Zone('operator') отвечает 200 на операторском порту", async () => {
    const { ports } = await startApp();

    const response = await fetch(zoneUrl(ports, "operator", operatorPath));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("operator");
  });

  it.each(zonesExcept("operator"))(
    "маршрут @Zone('operator') отвечает 404 на порту зоны %s",
    async (zone) => {
      const { ports } = await startApp();

      const response = await fetch(zoneUrl(ports, zone, operatorPath));

      expect(response.status).toBe(404);
    },
  );

  it.each(zonesExcept("operator"))(
    "ответ маршрута чужой зоны на порту %s совпадает с ответом несуществующего маршрута",
    async (zone) => {
      const guarded = await startApp();
      const empty = await startApp([]);

      const foreign = await capture(zoneUrl(guarded.ports, zone, operatorPath));
      const missing = await capture(zoneUrl(empty.ports, zone, operatorPath));

      expect(foreign).toEqual(missing);
      expect(foreign.status).toBe(404);
    },
  );

  it("ответ чужой зоны совпадает с несуществующим маршрутом для POST и query-строки", async () => {
    const guarded = await startApp();
    const empty = await startApp([]);
    const pathWithQuery = `${operatorPath}?draft=1&page=2`;

    const foreign = await capture(zoneUrl(guarded.ports, "public", pathWithQuery), "POST");
    const missing = await capture(zoneUrl(empty.ports, "public", pathWithQuery), "POST");

    expect(foreign).toEqual(missing);
    expect(foreign.body).toMatchObject({ message: `Cannot POST ${pathWithQuery}` });
  });

  it.each(apiZones)("маршрут без @Zone отвечает 404 на порту зоны %s", async (zone) => {
    const guarded = await startApp();
    const empty = await startApp([]);

    const unzoned = await capture(zoneUrl(guarded.ports, zone, unzonedPath));
    const missing = await capture(zoneUrl(empty.ports, zone, unzonedPath));

    expect(unzoned.status).toBe(404);
    expect(unzoned).toEqual(missing);
  });

  it("метод с @Zone('management') в контроллере @Zone('operator') отвечает 200 на служебном порту", async () => {
    const { ports } = await startApp();

    const response = await fetch(zoneUrl(ports, "management", mixedManagementPath));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("management");
  });

  it.each(zonesExcept("management"))(
    "метод с @Zone('management') в контроллере @Zone('operator') отвечает 404 на порту зоны %s",
    async (zone) => {
      const { ports } = await startApp();

      const response = await fetch(zoneUrl(ports, zone, mixedManagementPath));

      expect(response.status).toBe(404);
    },
  );

  it("метод без своей зоны берёт зону класса: 200 на операторском порту, 404 на служебном", async () => {
    const { ports } = await startApp();

    const onOperator = await fetch(zoneUrl(ports, "operator", mixedInheritedPath));
    const onManagement = await fetch(zoneUrl(ports, "management", mixedInheritedPath));

    expect(onOperator.status).toBe(200);
    expect(onManagement.status).toBe(404);
  });
});

describe("ZoneGuard.canActivate", () => {
  const guard = new ZoneGuard(new Reflector(), unitPorts);

  it.each(["ws", "rpc"])("для контекста с типом %s возвращает false", (type) => {
    const context = httpContext(
      MixedZoneController.prototype.management,
      requestOnPort(unitPorts.management),
    );
    context.setType(type);

    expect(guard.canActivate(context)).toBe(false);
  });

  it("для контекста не http не бросает исключение даже без зоны маршрута", () => {
    const context = new ExecutionContextHost(
      [{}, {}, () => undefined],
      UnzonedController,
      UnzonedController.prototype.read,
    );
    context.setType("ws");

    expect(() => guard.canActivate(context)).not.toThrow();
    expect(guard.canActivate(context)).toBe(false);
  });

  it("возвращает true, когда зона метода совпадает с зоной порта", () => {
    const context = httpContext(
      MixedZoneController.prototype.management,
      requestOnPort(unitPorts.management),
    );

    expect(guard.canActivate(context)).toBe(true);
  });

  it("зона метода важнее зоны класса", () => {
    const context = httpContext(
      MixedZoneController.prototype.management,
      requestOnPort(unitPorts.operator),
    );

    expect(() => guard.canActivate(context)).toThrow(NotFoundException);
  });

  it("бросает NotFoundException с текстом неизвестного маршрута на чужом порту", () => {
    const request = { ...requestOnPort(unitPorts.public, "/v1/probe?x=1"), method: "DELETE" };
    const context = httpContext(MixedZoneController.prototype.inherited, request);

    expect(() => guard.canActivate(context)).toThrow(NotFoundException);
    expect(() => guard.canActivate(context)).toThrow("Cannot DELETE /v1/probe?x=1");
  });

  it("бросает NotFoundException для маршрута без зоны даже на порту любой зоны", () => {
    const context = new ExecutionContextHost(
      [requestOnPort(unitPorts.operator), {}, () => undefined],
      UnzonedController,
      UnzonedController.prototype.read,
    );

    expect(() => guard.canActivate(context)).toThrow(NotFoundException);
  });

  it.each([undefined, 1, 65535])(
    "бросает NotFoundException, если порт %s не принадлежит ни одной зоне",
    (localPort) => {
      const context = httpContext(
        MixedZoneController.prototype.inherited,
        requestOnPort(localPort),
      );

      expect(() => guard.canActivate(context)).toThrow(NotFoundException);
    },
  );
});
