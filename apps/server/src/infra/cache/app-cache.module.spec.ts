import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import { CacheBusModule } from "../../../test/support/cache-bus-module.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { AppCacheModule, cacheTtlMs } from "./app-cache.module.js";

describe("AppCacheModule", () => {
  let moduleRef: TestingModule;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot(), CacheBusModule, AppCacheModule],
    }).compile();
    await moduleRef.init();
    cache = moduleRef.get<Cache>(CACHE_MANAGER);
  });

  afterEach(async () => {
    vi.useRealTimers();
    await moduleRef.close();
  });

  it("sets the default lifetime to 60 seconds", () => {
    expect(cacheTtlMs).toBe(60_000);
  });

  it("reads an entry without its own lifetime after 59 seconds", async () => {
    vi.useFakeTimers();
    await cache.set("key", "value");

    vi.advanceTimersByTime(59_000);

    expect(await cache.get("key")).toBe("value");
  });

  it("does not read an entry without its own lifetime after 61 seconds", async () => {
    vi.useFakeTimers();
    await cache.set("key", "value");

    vi.advanceTimersByTime(61_000);

    expect(await cache.get("key")).toBeUndefined();
  });

  it("expires entries independently by their set time", async () => {
    vi.useFakeTimers();
    await cache.set("old", "1");
    vi.advanceTimersByTime(40_000);
    await cache.set("new", "2");

    vi.advanceTimersByTime(30_000);

    expect(await cache.get("old")).toBeUndefined();
    expect(await cache.get("new")).toBe("2");
  });

  it("returns nothing for a key that was never set", async () => {
    expect(await cache.get("missing")).toBeUndefined();
  });
});

describe("AppCacheModule wiring", () => {
  beforeAll(() => {
    stubTestEnv();
  });

  function importsOf(module: object): unknown[] {
    return Reflect.getMetadata("imports", module) as unknown[];
  }

  it("is imported by ApiModule right after TelemetryModule", async () => {
    const { ApiModule } = await import("../../api.module.js");
    const { TelemetryModule } = await import("../../telemetry/telemetry.module.js");
    const imports = importsOf(ApiModule);

    expect(imports[imports.indexOf(TelemetryModule) + 1]).toBe(AppCacheModule);
  });

  it("is imported by WorkerModule right after TelemetryModule", async () => {
    const { WorkerModule } = await import("../../worker.module.js");
    const { TelemetryModule } = await import("../../telemetry/telemetry.module.js");
    const imports = importsOf(WorkerModule);

    expect(imports[imports.indexOf(TelemetryModule) + 1]).toBe(AppCacheModule);
  });

  it("is imported by CliModule right after TelemetryModule", async () => {
    const { CliModule } = await import("../../cli.module.js");
    const { TelemetryModule } = await import("../../telemetry/telemetry.module.js");
    const imports = importsOf(CliModule);

    expect(imports[imports.indexOf(TelemetryModule) + 1]).toBe(AppCacheModule);
  });

  it("is not imported by MigrateModule", async () => {
    const { MigrateModule } = await import("../../migrate.module.js");

    expect(importsOf(MigrateModule)).not.toContain(AppCacheModule);
  });
});
