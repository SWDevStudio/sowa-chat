import type { INestApplication } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import type { MockInstance } from "vitest";
import { redisConfig } from "../config/redis.config.js";
import {
  connectReplicaEvents,
  replicaEventsMicroservice,
  replicaEventsRetryDelayMs,
  replicaEventsTransport,
  unlimitedRetryAttempts,
} from "./replica-events-transport.js";

const redisUrl = "rediss://user:p%40ss@cache.local:6390/2";

describe("replicaEventsTransport", () => {
  it("константы повторного подключения", () => {
    expect(unlimitedRetryAttempts).toBe(Number.MAX_SAFE_INTEGER);
    expect(replicaEventsRetryDelayMs).toBe(1000);
  });

  it("собирает транспорт Redis из параметров URL", () => {
    expect(replicaEventsTransport(redisUrl)).toStrictEqual({
      transport: Transport.REDIS,
      options: {
        host: "cache.local",
        port: 6390,
        db: 2,
        username: "user",
        password: "p@ss",
        tls: {},
        connectionName: "sowa-chat-replica-events",
        retryAttempts: Number.MAX_SAFE_INTEGER,
        retryDelay: 1000,
      },
    });
  });

  it("не передаёт в транспорт сам URL", () => {
    const serialized = JSON.stringify(replicaEventsTransport(redisUrl));

    expect(serialized).not.toContain("rediss://");
    expect(serialized).not.toContain("%40");
  });
});

describe("replicaEventsMicroservice", () => {
  it("берёт конфиг Redis через inject", () => {
    expect(replicaEventsMicroservice.inject).toStrictEqual([redisConfig.KEY]);
  });

  it("фабрика строит транспорт по url из конфига", async () => {
    const options = await replicaEventsMicroservice.useFactory?.({ url: redisUrl });

    expect(options).toStrictEqual(replicaEventsTransport(redisUrl));
  });
});

describe("connectReplicaEvents", () => {
  let get: MockInstance<INestApplication["get"]>;
  let connectMicroservice: MockInstance<INestApplication["connectMicroservice"]>;
  let app: INestApplication;

  beforeEach(() => {
    get = vi.fn<INestApplication["get"]>().mockReturnValue({ url: redisUrl } as never);
    connectMicroservice = vi.fn<INestApplication["connectMicroservice"]>();
    app = { get, connectMicroservice } as unknown as INestApplication;
  });

  it("читает конфиг Redis по redisConfig.KEY", () => {
    connectReplicaEvents(app);

    expect(get).toHaveBeenCalledWith(redisConfig.KEY);
  });

  it("подключает транспорт ровно с одним аргументом: без inheritAppConfig", () => {
    connectReplicaEvents(app);

    expect(connectMicroservice).toHaveBeenCalledTimes(1);
    expect(connectMicroservice.mock.calls[0]).toStrictEqual([replicaEventsTransport(redisUrl)]);
  });
});
