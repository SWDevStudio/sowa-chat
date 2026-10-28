import { Logger } from "@nestjs/common";
import { Redis } from "ioredis";

export const redisStartupTimeoutMs = 5000;

export function createRedisClient(url: string): Redis {
  const client = new Redis(url, {
    connectionName: "sowa-chat-server",
    connectTimeout: 5000,
    maxRetriesPerRequest: 3,
  });
  const logger = new Logger("Redis");
  client.on("error", (error: Error) => {
    logger.warn(`Redis connection error: ${error.message}`);
  });
  return client;
}

export function waitForRedis(client: Redis, timeoutMs: number): Promise<void> {
  if (client.status === "ready") {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    let lastError: Error | undefined;

    const onReady = () => {
      cleanup();
      resolve();
    };
    const onError = (error: Error) => {
      lastError = error;
    };
    const timer = setTimeout(() => {
      cleanup();
      client.disconnect();
      const reason = lastError?.message ?? `no response in ${timeoutMs} ms`;
      reject(new Error(`Redis is unavailable: ${reason}`));
    }, timeoutMs);
    const cleanup = () => {
      clearTimeout(timer);
      client.off("ready", onReady);
      client.off("error", onError);
    };

    client.on("ready", onReady);
    client.on("error", onError);
  });
}

export async function closeRedis(client: Redis): Promise<void> {
  if (client.status === "ready") {
    await client.quit();
    return;
  }
  client.disconnect();
}
