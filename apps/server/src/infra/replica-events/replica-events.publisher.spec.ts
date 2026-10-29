import { Logger } from "@nestjs/common";
import { EventEmitter2, EventEmitterModule } from "@nestjs/event-emitter";
import type { ClientProxy } from "@nestjs/microservices";
import { ClientRedis } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { EMPTY, NEVER, Observable, of, throwError } from "rxjs";
import type { Mock, MockInstance } from "vitest";
import { CacheBusModule } from "../../../test/support/cache-bus-module.js";
import { stubTestEnv } from "../../../test/support/unit-probe.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { ApiKeyEvent, ProjectOriginsEvent } from "../../telemetry/events/domain-events.js";
import { cacheKeys } from "../cache/cache-keys.js";
import { RedisModule } from "../redis/redis.module.js";
import {
  ReplicaEventsPublisherModule,
  replicaPublishConnectTimeoutMs,
} from "./replica-events-publisher.module.js";
import {
  ReplicaEventsPublisher,
  replicaEventsClient,
  replicaPublishTimeoutMs,
} from "./replica-events.publisher.js";

type Emit = (pattern: string, data: unknown) => Observable<unknown>;

const apiKeyEvent: ApiKeyEvent = {
  apiKeyId: "key-1",
  projectId: "project-1",
  kind: "server",
  prefix: "sk_AbCdEfGhIjKl",
  botId: null,
  actorKind: "cli",
};

function projectEvent(projectId: string): ProjectOriginsEvent {
  return { projectId, origins: ["https://example.com"], actorKind: "cli" };
}

function invalidate(keys: string[]): [string, { keys: string[] }] {
  return ["cache.invalidate", { keys }];
}

describe("ReplicaEventsPublisher", () => {
  let emit: Mock<Emit>;
  let warn: MockInstance<Logger["warn"]>;
  let bus: DomainEventBus;
  let publisher: ReplicaEventsPublisher;

  beforeEach(async () => {
    emit = vi.fn<Emit>(() => of(undefined));
    warn = vi.spyOn(Logger.prototype, "warn").mockImplementation(() => undefined);
    bus = new DomainEventBus(new EventEmitter2());
    publisher = new ReplicaEventsPublisher(bus, { emit } as unknown as ClientProxy);
    await publisher.onModuleInit();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("таймаут отправки — 3000 мс", () => {
    expect(replicaPublishTimeoutMs).toBe(3000);
  });

  it("доменное событие из таблицы ничего не отправляет до beforeApplicationShutdown", async () => {
    await bus.publish("apiKey.revoked", apiKeyEvent);
    await bus.publish("project.allowedOriginsChanged", projectEvent("p-1"));

    expect(emit).not.toHaveBeenCalled();
  });

  it("beforeApplicationShutdown отправляет сообщение правила", async () => {
    await bus.publish("apiKey.revoked", apiKeyEvent);

    await publisher.beforeApplicationShutdown();

    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith(...invalidate([cacheKeys.apiKey(apiKeyEvent.prefix)]));
    expect(warn).not.toHaveBeenCalled();
  });

  it("отправляет сообщения в порядке доменных событий", async () => {
    await bus.publish("project.operatorAllowedOriginsChanged", projectEvent("p-2"));
    await bus.publish("apiKey.revoked", apiKeyEvent);
    await bus.publish("project.allowedOriginsChanged", projectEvent("p-1"));

    await publisher.beforeApplicationShutdown();

    expect(emit.mock.calls).toEqual([
      invalidate([cacheKeys.project("p-2")]),
      invalidate([cacheKeys.apiKey(apiKeyEvent.prefix)]),
      invalidate([cacheKeys.project("p-1")]),
    ]);
  });

  it("с пустой очередью emit не вызывается", async () => {
    await expect(publisher.beforeApplicationShutdown()).resolves.toBeUndefined();

    expect(emit).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("события вне таблицы в очередь не попадают", async () => {
    await bus.publish("apiKey.issued", apiKeyEvent);
    await bus.publish("project.created", { projectId: "p-1", name: "main", actorKind: "cli" });

    await publisher.beforeApplicationShutdown();

    expect(emit).not.toHaveBeenCalled();
  });

  it("ждёт завершения отправки", async () => {
    let delivered = false;
    emit.mockImplementation(
      () =>
        new Observable((subscriber) => {
          setTimeout(() => {
            delivered = true;
            subscriber.complete();
          }, 20);
        }),
    );
    await bus.publish("apiKey.revoked", apiKeyEvent);

    await publisher.beforeApplicationShutdown();

    expect(delivered).toBe(true);
  });

  it("emit без значения не считается ошибкой", async () => {
    emit.mockReturnValue(EMPTY);
    await bus.publish("apiKey.revoked", apiKeyEvent);

    await expect(publisher.beforeApplicationShutdown()).resolves.toBeUndefined();

    expect(warn).not.toHaveBeenCalled();
  });

  it("ошибка emit — предупреждение Replica events not sent и без исключения", async () => {
    emit.mockReturnValue(throwError(() => new Error("connect ECONNREFUSED 127.0.0.1:6380")));
    await bus.publish("apiKey.revoked", apiKeyEvent);

    await expect(publisher.beforeApplicationShutdown()).resolves.toBeUndefined();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      "Replica events not sent: connect ECONNREFUSED 127.0.0.1:6380",
    );
  });

  it("emit, бросивший исключение сразу, тоже даёт предупреждение", async () => {
    emit.mockImplementation(() => {
      throw new Error("client is broken");
    });
    await bus.publish("apiKey.revoked", apiKeyEvent);

    await expect(publisher.beforeApplicationShutdown()).resolves.toBeUndefined();

    expect(warn).toHaveBeenCalledWith("Replica events not sent: client is broken");
  });

  it("emit без ответа обрывается через 3000 мс с предупреждением", async () => {
    vi.useFakeTimers();
    emit.mockReturnValue(NEVER);
    await bus.publish("apiKey.revoked", apiKeyEvent);
    let finished = false;

    const shutdown = publisher.beforeApplicationShutdown().then(() => {
      finished = true;
    });
    await vi.advanceTimersByTimeAsync(replicaPublishTimeoutMs - 1);

    expect(finished).toBe(false);
    expect(warn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    await shutdown;

    expect(finished).toBe(true);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/^Replica events not sent: \S/));
  });
});

describe("ReplicaEventsPublisherModule", () => {
  let moduleRef: TestingModule;
  let connect: MockInstance<ClientRedis["connect"]>;
  let close: MockInstance<ClientRedis["close"]>;

  beforeEach(async () => {
    stubTestEnv({ REDIS_URL: "redis://sowa:pa%40ss@redis.internal:6390/2" });
    connect = vi.spyOn(ClientRedis.prototype, "connect").mockResolvedValue(undefined);
    close = vi.spyOn(ClientRedis.prototype, "close").mockResolvedValue(undefined);
    const { AppConfigModule } = await import("../config/config.module.js");
    moduleRef = await Test.createTestingModule({
      imports: [
        AppConfigModule,
        EventEmitterModule.forRoot(),
        CacheBusModule,
        ReplicaEventsPublisherModule,
      ],
    }).compile();
    await moduleRef.init();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  function client(): ClientRedis {
    return moduleRef.get<ClientRedis>(replicaEventsClient);
  }

  it("таймаут подключения — 2000 мс", async () => {
    expect(replicaPublishConnectTimeoutMs).toBe(2000);
    await moduleRef.close();
  });

  it("клиент — Redis из REDIS_URL с connectTimeout и без retryAttempts", async () => {
    expect(client()).toBeInstanceOf(ClientRedis);
    expect(Reflect.get(client(), "options")).toEqual({
      host: "redis.internal",
      port: 6390,
      db: 2,
      username: "sowa",
      password: "pa@ss",
      connectTimeout: 2000,
    });
    await moduleRef.close();
  });

  it("без событий модуль закрывается и к Redis не подключается", async () => {
    await moduleRef.close();

    expect(connect).not.toHaveBeenCalled();
  });

  it("отправляет очередь до закрытия клиента", async () => {
    const emit = vi.spyOn(ClientRedis.prototype, "emit").mockReturnValue(of(undefined));
    await moduleRef.get(DomainEventBus).publish("apiKey.revoked", apiKeyEvent);

    expect(emit).not.toHaveBeenCalled();

    await moduleRef.close();

    expect(emit).toHaveBeenCalledWith(...invalidate([cacheKeys.apiKey(apiKeyEvent.prefix)]));
    expect(close).toHaveBeenCalled();
    expect(emit.mock.invocationCallOrder[0]).toBeLessThan(close.mock.invocationCallOrder[0] ?? 0);
  });
});

describe("CliModule и публикация событий реплик", () => {
  beforeAll(() => {
    stubTestEnv();
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("CliModule подключает ReplicaEventsPublisherModule без RedisModule", async () => {
    const { CliModule } = await import("../../cli.module.js");
    const imports: unknown[] = Reflect.getMetadata("imports", CliModule);

    expect(imports).toContain(ReplicaEventsPublisherModule);
    expect(imports).not.toContain(RedisModule);
  });

  it("ReplicaEventsPublisherModule объявляет ReplicaEventsPublisher", () => {
    const providers: unknown[] = Reflect.getMetadata("providers", ReplicaEventsPublisherModule);

    expect(providers).toContain(ReplicaEventsPublisher);
  });
});
