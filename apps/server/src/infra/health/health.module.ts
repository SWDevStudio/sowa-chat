import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { RedisModule } from "../redis/redis.module.js";
import { DependencyChecks } from "./dependency-checks.js";
import { HealthController } from "./health.controller.js";
import { ReplicaReadiness } from "./replica-readiness.js";
import { StatusController } from "./status.controller.js";
import { StatusService } from "./status.service.js";

@Module({
  imports: [TerminusModule, RedisModule],
  controllers: [HealthController, StatusController],
  providers: [DependencyChecks, ReplicaReadiness, StatusService],
  exports: [ReplicaReadiness],
})
export class HealthModule {}
