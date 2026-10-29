import { Module } from "@nestjs/common";
import { RedisModule } from "../redis/redis.module.js";
import { EnvironmentChecksService } from "./environment-checks.service.js";
import { environmentChecks, registeredEnvironmentChecks } from "./registered-environment-checks.js";

@Module({
  imports: [RedisModule],
  providers: [
    { provide: environmentChecks, useValue: registeredEnvironmentChecks },
    EnvironmentChecksService,
  ],
  exports: [EnvironmentChecksService],
})
export class EnvironmentChecksModule {}
