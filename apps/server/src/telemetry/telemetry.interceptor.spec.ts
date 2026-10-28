import { BadRequestException, Controller, Get } from "@nestjs/common";
import type { CallHandler, INestApplication } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/internal";
import { of } from "rxjs";
import { startZoneProbeApp } from "../../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../../test/support/zone-probe.js";
import { Zone } from "../infra/zones/zone.decorator.js";
import type { ApiZone } from "../infra/zones/zone.js";
import { HttpMetrics } from "./http-metrics/http-metrics.js";
import { TelemetryInterceptor } from "./telemetry.interceptor.js";

@Zone("public")
@Controller("telemetry-probe")
class TelemetryProbeController {
  @Get(":id")
  read(): string {
    return "ok";
  }

  @Get(":id/fail")
  fail(): never {
    throw new BadRequestException("bad");
  }
}

const routeTemplate = "/v1/telemetry-probe/:id";
const failRouteTemplate = "/v1/telemetry-probe/:id/fail";

function zoneUrl(probe: ZoneProbeApp, zone: ApiZone, path: string): string {
  return `http://127.0.0.1:${probe.ports[zone]}${path}`;
}

async function readMetricLines(probe: ZoneProbeApp, metricName: string): Promise<string[]> {
  const response = await fetch(zoneUrl(probe, "management", "/metrics"));
  const text = await response.text();
  return text.split("\n").filter((line) => line.startsWith(`${metricName}{`));
}

function hasLabels(line: string, labels: Record<string, string>): boolean {
  return Object.entries(labels).every(([name, value]) => line.includes(`${name}="${value}"`));
}

function lineValue(line: string): number {
  return Number(line.slice(line.lastIndexOf(" ") + 1));
}

describe("TelemetryInterceptor", () => {
  let app: INestApplication | undefined;
  let probe: ZoneProbeApp;

  beforeEach(async () => {
    probe = await startZoneProbeApp([TelemetryProbeController]);
    app = probe.app;
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  it("два запроса с разными id дают один ряд http_requests_total по шаблону маршрута", async () => {
    await fetch(zoneUrl(probe, "public", "/v1/telemetry-probe/1"));
    await fetch(zoneUrl(probe, "public", "/v1/telemetry-probe/2"));

    const lines = await readMetricLines(probe, "http_requests_total");
    const probeLines = lines.filter((line) => line.includes("telemetry-probe"));

    expect(probeLines).toHaveLength(1);
    expect(
      hasLabels(probeLines[0], {
        route: routeTemplate,
        zone: "public",
        method: "GET",
        status: "200",
      }),
    ).toBe(true);
    expect(lineValue(probeLines[0])).toBe(2);
    expect(lines.some((line) => line.includes("/v1/telemetry-probe/1"))).toBe(false);
    expect(lines.some((line) => line.includes("/v1/telemetry-probe/2"))).toBe(false);
  });

  it("запрос с ошибкой 400 учтён в счётчике и гистограмме со status=400", async () => {
    const response = await fetch(zoneUrl(probe, "public", "/v1/telemetry-probe/7/fail"));
    expect(response.status).toBe(400);

    const labels = { route: failRouteTemplate, zone: "public", method: "GET", status: "400" };
    const counterLines = await readMetricLines(probe, "http_requests_total");
    const histogramLines = await readMetricLines(probe, "http_request_duration_seconds_count");

    const counter = counterLines.find((line) => hasLabels(line, labels));
    const histogram = histogramLines.find((line) => hasLabels(line, labels));
    expect(counter).toBeDefined();
    expect(lineValue(counter ?? "")).toBe(1);
    expect(histogram).toBeDefined();
    expect(lineValue(histogram ?? "")).toBe(1);
  });

  it("успешный и неуспешный запросы к одному шаблону дают разные ряды по status", async () => {
    await fetch(zoneUrl(probe, "public", "/v1/telemetry-probe/1"));
    await fetch(zoneUrl(probe, "public", "/v1/telemetry-probe/1/fail"));

    const lines = await readMetricLines(probe, "http_requests_total");

    expect(lines.some((line) => hasLabels(line, { route: routeTemplate, status: "200" }))).toBe(
      true,
    );
    expect(lines.some((line) => hasLabels(line, { route: failRouteTemplate, status: "400" }))).toBe(
      true,
    );
  });

  it("запрос к пробному маршруту на служебном порту даёт 404 и не создаёт ряд", async () => {
    const response = await fetch(zoneUrl(probe, "management", "/v1/telemetry-probe/1"));
    expect(response.status).toBe(404);

    const counterLines = await readMetricLines(probe, "http_requests_total");
    const histogramLines = await readMetricLines(probe, "http_request_duration_seconds_count");

    const forbidden = { route: routeTemplate, zone: "management" };
    expect(counterLines.some((line) => hasLabels(line, forbidden))).toBe(false);
    expect(histogramLines.some((line) => hasLabels(line, forbidden))).toBe(false);
  });
});

describe("TelemetryInterceptor для не http контекста", () => {
  it("не записывает метрики и возвращает next.handle() без изменений", () => {
    const record = vi.fn();
    const interceptor = new TelemetryInterceptor(
      { record } as unknown as HttpMetrics,
      {
        public: 1,
        operator: 2,
        internal: 3,
        management: 4,
      } as never,
    );
    const context = new ExecutionContextHost(
      [{}, {}, () => undefined],
      TelemetryProbeController,
      TelemetryProbeController.prototype.read,
    );
    context.setType("ws");
    const stream = of("value");
    const next: CallHandler = { handle: () => stream };

    expect(interceptor.intercept(context, next)).toBe(stream);
    expect(record).not.toHaveBeenCalled();
  });
});
