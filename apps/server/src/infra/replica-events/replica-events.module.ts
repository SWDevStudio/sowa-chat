import { Module } from "@nestjs/common";
import { CacheInvalidateController } from "./cache-invalidate.controller.js";

@Module({
  controllers: [CacheInvalidateController],
})
export class ReplicaEventsModule {}
