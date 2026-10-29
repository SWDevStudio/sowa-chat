import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { Logger } from "@nestjs/common";
import { PatternHandler } from "@nestjs/microservices/enums/pattern-handler.enum.js";
import { Test } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import type { MockInstance } from "vitest";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { AppCacheModule } from "../cache/app-cache.module.js";
import { CacheInvalidateController } from "./cache-invalidate.controller.js";
import { cacheInvalidateEventSchema, replicaEventPatterns } from "./replica-events.js";
import { ReplicaEventsModule } from "./replica-events.module.js";

const warningText = "Ignored malformed cache.invalidate event";

function repeatKeys(count: number): string[] {
  return Array.from({ length: count }, (_, index) => `key-${index}`);
}

describe("CacheInvalidateController", () => {
  let mdel: MockInstance<Cache["mdel"]>;
  let warn: MockInstance<Logger["warn"]>;
  let controller: CacheInvalidateController;

  beforeEach(() => {
    mdel = vi.fn<Cache["mdel"]>().mockResolvedValue(true);
    warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    controller = new CacheInvalidateController({ mdel } as unknown as Cache);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("имя события — cache.invalidate", () => {
    expect(replicaEventPatterns.cacheInvalidate).toBe("cache.invalidate");
  });

  it("обработчик помечен как EventPattern с этим именем", () => {
    const handler = CacheInvalidateController.prototype.invalidate;

    expect(Reflect.getMetadata("microservices:pattern", handler)).toStrictEqual([
      "cache.invalidate",
    ]);
    expect(Reflect.getMetadata("microservices:handler_type", handler)).toBe(PatternHandler.EVENT);
  });

  it("верное событие — mdel вызван один раз с перечисленными ключами", async () => {
    await controller.invalidate({ keys: ["a", "b"] });

    expect(mdel).toHaveBeenCalledTimes(1);
    expect(mdel).toHaveBeenCalledWith(["a", "b"]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("ожидает завершения mdel", async () => {
    let finished = false;
    mdel.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
      finished = true;
      return true;
    });

    await controller.invalidate({ keys: ["a"] });

    expect(finished).toBe(true);
  });

  it("лишние поля события не влияют на удаление", async () => {
    await controller.invalidate({ keys: ["a"], extra: "x" });

    expect(mdel).toHaveBeenCalledWith(["a"]);
  });

  it.each([
    ["keys строка", { keys: "a" }],
    ["пустой массив", { keys: [] }],
    ["нет keys", {}],
    ["keys не массив строк", { keys: [1, 2] }],
    ["пустая строка среди ключей", { keys: ["a", ""] }],
    ["ключ из 257 символов", { keys: ["x".repeat(257)] }],
    ["101 ключ", { keys: repeatKeys(101) }],
    ["строка вместо объекта", "keys"],
    ["массив вместо объекта", ["a"]],
    ["null", null],
    ["undefined", undefined],
    ["число", 42],
  ])("неверное событие (%s) — mdel не вызван, одно предупреждение", async (_name, payload) => {
    await expect(controller.invalidate(payload)).resolves.toBeUndefined();

    expect(mdel).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(warningText);
  });

  it("предупреждение не содержит данных события", async () => {
    const marker = "secret-marker-7f3a";

    await controller.invalidate({ keys: marker, token: marker });

    expect(JSON.stringify(warn.mock.calls)).not.toContain(marker);
  });

  it("граничные значения: 1 и 100 ключей, ключ из 256 символов — принимаются", async () => {
    await controller.invalidate({ keys: ["a"] });
    await controller.invalidate({ keys: repeatKeys(100) });
    await controller.invalidate({ keys: ["x".repeat(256)] });

    expect(mdel).toHaveBeenCalledTimes(3);
    expect(warn).not.toHaveBeenCalled();
  });

  it("после неверного события следующее верное обрабатывается", async () => {
    await controller.invalidate({ keys: "a" });
    await controller.invalidate({ keys: ["a"] });

    expect(mdel).toHaveBeenCalledTimes(1);
    expect(mdel).toHaveBeenCalledWith(["a"]);
  });
});

describe("cacheInvalidateEventSchema", () => {
  it("принимает от 1 до 100 ключей длиной 1–256", () => {
    expect(cacheInvalidateEventSchema.safeParse({ keys: ["a"] }).success).toBe(true);
    expect(cacheInvalidateEventSchema.safeParse({ keys: repeatKeys(100) }).success).toBe(true);
    expect(cacheInvalidateEventSchema.safeParse({ keys: ["x".repeat(256)] }).success).toBe(true);
  });

  it("отклоняет 0 и 101 ключ, пустой и слишком длинный ключ", () => {
    expect(cacheInvalidateEventSchema.safeParse({ keys: [] }).success).toBe(false);
    expect(cacheInvalidateEventSchema.safeParse({ keys: repeatKeys(101) }).success).toBe(false);
    expect(cacheInvalidateEventSchema.safeParse({ keys: [""] }).success).toBe(false);
    expect(cacheInvalidateEventSchema.safeParse({ keys: ["x".repeat(257)] }).success).toBe(false);
  });
});

describe("CacheInvalidateController с настоящим кэшем", () => {
  it("удаляет только перечисленные ключи", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register({ isGlobal: true })],
      controllers: [CacheInvalidateController],
    }).compile();
    const cache = moduleRef.get<Cache>(CACHE_MANAGER);
    await cache.set("a", "1");
    await cache.set("b", "2");
    await cache.set("c", "3");

    await moduleRef.get(CacheInvalidateController).invalidate({ keys: ["a", "c", "missing"] });

    expect(await cache.get("a")).toBeUndefined();
    expect(await cache.get("c")).toBeUndefined();
    expect(await cache.get("b")).toBe("2");
    await moduleRef.close();
  });
});

describe("ReplicaEventsModule", () => {
  beforeAll(() => {
    stubTestEnv();
  });

  function metadataOf(module: object, key: string): unknown[] {
    return Reflect.getMetadata(key, module) as unknown[];
  }

  it("содержит CacheInvalidateController", () => {
    expect(metadataOf(ReplicaEventsModule, "controllers")).toStrictEqual([
      CacheInvalidateController,
    ]);
  });

  it("ApiModule подключает его сразу после AppCacheModule", async () => {
    const { ApiModule } = await import("../../api.module.js");
    const imports = metadataOf(ApiModule, "imports");

    expect(imports[imports.indexOf(AppCacheModule) + 1]).toBe(ReplicaEventsModule);
  });

  it("WorkerModule подключает его сразу после AppCacheModule", async () => {
    const { WorkerModule } = await import("../../worker.module.js");
    const imports = metadataOf(WorkerModule, "imports");

    expect(imports[imports.indexOf(AppCacheModule) + 1]).toBe(ReplicaEventsModule);
  });

  it("CliModule и MigrateModule его не подключают", async () => {
    const { CliModule } = await import("../../cli.module.js");
    const { MigrateModule } = await import("../../migrate.module.js");

    expect(metadataOf(CliModule, "imports")).not.toContain(ReplicaEventsModule);
    expect(metadataOf(MigrateModule, "imports")).not.toContain(ReplicaEventsModule);
  });
});
