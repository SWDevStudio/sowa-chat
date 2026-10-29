import type { INestApplication } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { Transport } from "@nestjs/microservices";
import type {
  AsyncMicroserviceOptions,
  MicroserviceOptions,
  RedisOptions,
} from "@nestjs/microservices";
import { redisConfig } from "../config/redis.config.js";
import { redisTransportOptions } from "./redis-transport-options.js";

export const unlimitedRetryAttempts = Number.MAX_SAFE_INTEGER;
export const replicaEventsRetryDelayMs = 1000;

export function replicaEventsTransport(redisUrl: string): RedisOptions {
  return {
    transport: Transport.REDIS,
    options: {
      ...redisTransportOptions(redisUrl),
      connectionName: "sowa-chat-replica-events",
      retryAttempts: unlimitedRetryAttempts,
      retryDelay: replicaEventsRetryDelayMs,
    },
  };
}

export const replicaEventsMicroservice: AsyncMicroserviceOptions = {
  inject: [redisConfig.KEY],
  useFactory: (redis: ConfigType<typeof redisConfig>) => replicaEventsTransport(redis.url),
};

export function connectReplicaEvents(app: INestApplication): void {
  const redis = app.get<ConfigType<typeof redisConfig>>(redisConfig.KEY);
  app.connectMicroservice<MicroserviceOptions>(replicaEventsTransport(redis.url));
}
