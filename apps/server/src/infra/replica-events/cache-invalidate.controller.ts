import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Controller, Inject, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import type { Cache } from "cache-manager";
import { cacheInvalidateEventSchema, replicaEventPatterns } from "./replica-events.js";

@Controller()
export class CacheInvalidateController {
  private readonly logger = new Logger(CacheInvalidateController.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  @EventPattern(replicaEventPatterns.cacheInvalidate)
  async invalidate(@Payload() payload: unknown): Promise<void> {
    const event = cacheInvalidateEventSchema.safeParse(payload);
    if (!event.success) {
      this.logger.warn("Ignored malformed cache.invalidate event");
      return;
    }
    await this.cache.mdel(event.data.keys);
  }
}
