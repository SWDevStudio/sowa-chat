import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { Test } from "@nestjs/testing";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { Cache } from "cache-manager";
import { createHash } from "node:crypto";
import type { Mock } from "vitest";
import type { ApiKey, ApiKeyKind } from "../../src/domain/keys/api-key.entity.js";
import { ApiKeysRepository } from "../../src/domain/keys/api-keys.repository.js";
import { ApiKeysService, keyTypeByKind } from "../../src/domain/keys/api-keys.service.js";
import { parseKey } from "../../src/domain/keys/key-format.js";
import { DomainEventBus } from "../../src/telemetry/events/domain-event-bus.js";

export interface Deferred {
  promise: Promise<void>;
  resolve: () => void;
}

export interface ApiKeysRepositoryStub {
  create: Mock;
  findByPrefix: Mock;
  touchLastUsedAt: Mock;
  revokeByPrefix: Mock;
}

export interface ApiKeysServiceProbe {
  service: ApiKeysService;
  repository: ApiKeysRepositoryStub;
  publish: Mock;
  cache: Cache;
}

export function deferred(): Deferred {
  let resolve: () => void = () => {};
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

export function sha256(text: string): Buffer {
  return createHash("sha256").update(text).digest();
}

export function lookupPrefixOf(key: string, kind: ApiKeyKind): string {
  const parsed = parseKey(key, keyTypeByKind[kind]);
  if (!parsed) {
    throw new Error("key does not parse");
  }
  return parsed.lookupPrefix;
}

export function storedRow(key: string, kind: ApiKeyKind, overrides: Partial<ApiKey> = {}): ApiKey {
  return {
    id: "api-key-1",
    projectId: "project-1",
    kind,
    prefix: lookupPrefixOf(key, kind),
    keyHash: sha256(key),
    botId: kind === "bot" ? "bot-1" : null,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    lastUsedAt: null,
    revokedAt: null,
    ...overrides,
  };
}

export function createdRow(input: Partial<ApiKey>): ApiKey {
  return {
    ...(input as ApiKey),
    id: "api-key-1",
    createdAt: new Date(),
    lastUsedAt: null,
    revokedAt: null,
  };
}

function runWithoutTransaction(): void {
  vi.spyOn(TransactionHost, "getInstance").mockReturnValue({
    withTransaction: (...args: unknown[]) => {
      const run = args.at(-1) as () => Promise<unknown>;
      return run();
    },
  } as unknown as TransactionHost);
}

export async function createApiKeysServiceProbe(): Promise<ApiKeysServiceProbe> {
  runWithoutTransaction();
  const repository: ApiKeysRepositoryStub = {
    create: vi.fn(async (input: Partial<ApiKey>) => createdRow(input)),
    findByPrefix: vi.fn().mockResolvedValue(null),
    touchLastUsedAt: vi.fn().mockResolvedValue(undefined),
    revokeByPrefix: vi.fn().mockResolvedValue(undefined),
  };
  const publish = vi.fn().mockResolvedValue(undefined);
  const moduleRef = await Test.createTestingModule({
    imports: [CacheModule.register()],
    providers: [
      ApiKeysService,
      { provide: ApiKeysRepository, useValue: repository },
      { provide: DomainEventBus, useValue: { publish } },
    ],
  }).compile();
  return {
    service: moduleRef.get(ApiKeysService),
    repository,
    publish,
    cache: moduleRef.get<Cache>(CACHE_MANAGER),
  };
}
