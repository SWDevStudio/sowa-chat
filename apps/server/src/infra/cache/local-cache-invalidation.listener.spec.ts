import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { Cache } from "cache-manager";
import { CacheBusModule } from "../../../test/support/cache-bus-module.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { ApiKeyEvent, ProjectOriginsEvent } from "../../telemetry/events/domain-events.js";
import { AppCacheModule } from "./app-cache.module.js";
import { cacheKeys } from "./cache-keys.js";

const apiKeyEvent: ApiKeyEvent = {
  apiKeyId: "key-1",
  projectId: "project-1",
  kind: "server",
  prefix: "sk_AbCdEfGhIjKl",
  botId: null,
  actorKind: "cli",
};

const projectEvent: ProjectOriginsEvent = {
  projectId: "p-1",
  origins: ["https://example.com"],
  actorKind: "cli",
};

describe("LocalCacheInvalidation", () => {
  let moduleRef: TestingModule;
  let bus: DomainEventBus;
  let cache: Cache;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot(), CacheBusModule, AppCacheModule],
    }).compile();
    await moduleRef.init();
    bus = moduleRef.get(DomainEventBus);
    cache = moduleRef.get<Cache>(CACHE_MANAGER);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it("removes the api key entry after apiKey.revoked and keeps other keys", async () => {
    await cache.set(cacheKeys.apiKey(apiKeyEvent.prefix), { apiKeyId: "key-1" });
    await cache.set(cacheKeys.apiKey("sk_OtherPrefix1"), { apiKeyId: "key-2" });

    await bus.publish("apiKey.revoked", apiKeyEvent);

    expect(await cache.get(cacheKeys.apiKey(apiKeyEvent.prefix))).toBeUndefined();
    expect(await cache.get(cacheKeys.apiKey("sk_OtherPrefix1"))).toEqual({ apiKeyId: "key-2" });
  });

  it("removes the project entry after project.allowedOriginsChanged", async () => {
    await cache.set(cacheKeys.project("p-1"), { id: "p-1" });
    await cache.set(cacheKeys.project("p-2"), { id: "p-2" });

    await bus.publish("project.allowedOriginsChanged", projectEvent);

    expect(await cache.get(cacheKeys.project("p-1"))).toBeUndefined();
    expect(await cache.get(cacheKeys.project("p-2"))).toEqual({ id: "p-2" });
  });

  it("removes the project entry after project.operatorAllowedOriginsChanged", async () => {
    await cache.set(cacheKeys.project("p-1"), { id: "p-1" });

    await bus.publish("project.operatorAllowedOriginsChanged", projectEvent);

    expect(await cache.get(cacheKeys.project("p-1"))).toBeUndefined();
  });

  it("keeps the project id by public key entry after project origin events", async () => {
    await cache.set(cacheKeys.projectIdByPublicKey("pk_x"), "p-1");

    await bus.publish("project.allowedOriginsChanged", projectEvent);

    expect(await cache.get(cacheKeys.projectIdByPublicKey("pk_x"))).toBe("p-1");
  });

  it("keeps the api key entry on apiKey.issued", async () => {
    await cache.set(cacheKeys.apiKey(apiKeyEvent.prefix), { apiKeyId: "key-1" });

    await bus.publish("apiKey.issued", apiKeyEvent);

    expect(await cache.get(cacheKeys.apiKey(apiKeyEvent.prefix))).toEqual({ apiKeyId: "key-1" });
  });

  it("does not fail when the entry is missing", async () => {
    await expect(bus.publish("apiKey.revoked", apiKeyEvent)).resolves.toBeUndefined();
  });
});
