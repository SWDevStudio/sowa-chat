import { Module } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { redisConfig } from "../config/redis.config.js";
import { redisTransportOptions } from "./redis-transport-options.js";
import { ReplicaEventsPublisher, replicaEventsClient } from "./replica-events.publisher.js";

export const replicaPublishConnectTimeoutMs = 2000;

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: replicaEventsClient,
        inject: [redisConfig.KEY],
        useFactory: (redis: ConfigType<typeof redisConfig>) => ({
          transport: Transport.REDIS,
          options: {
            ...redisTransportOptions(redis.url),
            connectTimeout: replicaPublishConnectTimeoutMs,
          },
        }),
      },
    ]),
  ],
  providers: [ReplicaEventsPublisher],
})
export class ReplicaEventsPublisherModule {}
