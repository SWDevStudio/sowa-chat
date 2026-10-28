import { Body, Controller, Post } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "../zones/zone.decorator.js";

@Zone("public")
@Controller("visitor/body-probe")
class BodyProbeController {
  @Post()
  handle(@Body() _body: unknown): { received: boolean } {
    return { received: true };
  }
}

const kilobyte = 1024;

function jsonOfSize(bytes: number): string {
  const prefix = '{"data":"';
  const suffix = '"}';
  return prefix + "a".repeat(bytes - prefix.length - suffix.length) + suffix;
}

function brokenJsonOfSize(bytes: number): string {
  return "{" + "a".repeat(bytes - 1);
}

function formOfSize(bytes: number): string {
  return "data=" + "a".repeat(bytes - 5);
}

describe("лимит тела запроса", { timeout: 20_000 }, () => {
  let app: INestApplication | undefined;
  let probe: ZoneProbeApp;

  beforeEach(async () => {
    probe = await startZoneProbeApp([BodyProbeController]);
    app = probe.app;
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  function post(body: string, contentType: string): Promise<Response> {
    return fetch(`http://127.0.0.1:${probe.ports.public}/v1/visitor/body-probe`, {
      method: "POST",
      headers: { "content-type": contentType },
      body,
    });
  }

  it("JSON 63 КБ доходит до обработчика", async () => {
    const response = await post(jsonOfSize(63 * kilobyte), "application/json");

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ received: true });
  });

  it("JSON 65 КБ даёт 413 payloadTooLarge", async () => {
    const response = await post(jsonOfSize(65 * kilobyte), "application/json");

    expect(response.status).toBe(413);
    expect(await response.json()).toMatchObject({ code: "payloadTooLarge" });
  });

  it("битый JSON 65 КБ даёт 413, а не 400", async () => {
    const response = await post(brokenJsonOfSize(65 * kilobyte), "application/json");

    expect(response.status).toBe(413);
    expect(await response.json()).toMatchObject({ code: "payloadTooLarge" });
  });

  it("битый JSON малого размера остаётся 400", async () => {
    const response = await post("{broken", "application/json");

    expect(response.status).toBe(400);
  });

  it("urlencoded 65 КБ даёт 413 payloadTooLarge", async () => {
    const response = await post(formOfSize(65 * kilobyte), "application/x-www-form-urlencoded");

    expect(response.status).toBe(413);
    expect(await response.json()).toMatchObject({ code: "payloadTooLarge" });
  });

  it("urlencoded 63 КБ доходит до обработчика", async () => {
    const response = await post(formOfSize(63 * kilobyte), "application/x-www-form-urlencoded");

    expect(response.status).toBe(201);
  });
});
