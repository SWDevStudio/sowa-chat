import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { INestApplication } from "@nestjs/common";
import type { Cache } from "cache-manager";
import type { Redis } from "ioredis";
import { findFreePort } from "./e2e-server.js";
import type { Env } from "./e2e-server.js";

const cacheInvalidateChannel = "cache.invalidate";

export function cacheOf(app: INestApplication): Cache {
  return app.get<Cache>(CACHE_MANAGER);
}

export async function cacheInvalidateSubscribers(redis: Redis): Promise<number> {
  const reply = (await redis.call("PUBSUB", "NUMSUB", cacheInvalidateChannel)) as [string, number];
  return Number(reply[1]);
}

export async function publishCacheInvalidate(redis: Redis, data: unknown): Promise<void> {
  const message = JSON.stringify({ pattern: cacheInvalidateChannel, data });
  await redis.publish(cacheInvalidateChannel, message);
}

export async function publishRawCacheInvalidate(redis: Redis, message: string): Promise<void> {
  await redis.publish(cacheInvalidateChannel, message);
}

export async function workerEnvironment(): Promise<Env> {
  return {
    ...process.env,
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
  };
}
