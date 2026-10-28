import type { OnApplicationShutdown } from "@nestjs/common";
import { Inject, Module } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { Redis } from "ioredis";
import { redisConfig } from "../config/redis.config.js";
import {
  closeRedis,
  createRedisClient,
  redisStartupTimeoutMs,
  waitForRedis,
} from "./redis-client.js";

@Module({
  providers: [
    {
      provide: Redis,
      inject: [redisConfig.KEY],
      useFactory: async (redis: ConfigType<typeof redisConfig>) => {
        const client = createRedisClient(redis.url);
        await waitForRedis(client, redisStartupTimeoutMs);
        return client;
      },
    },
  ],
  exports: [Redis],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(@Inject(Redis) private readonly client: Redis) {}

  async onApplicationShutdown(): Promise<void> {
    await closeRedis(this.client);
  }
}
