import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import type { OnModuleInit } from "@nestjs/common";
import type { Cache } from "cache-manager";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { DomainEventName, DomainEvents } from "../../telemetry/events/domain-events.js";
import { cacheInvalidatedEventNames, cacheInvalidationRules } from "./cache-invalidation-rules.js";
import type { CacheInvalidationRule } from "./cache-invalidation-rules.js";

@Injectable()
export class LocalCacheInvalidation implements OnModuleInit {
  constructor(
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  onModuleInit(): void {
    for (const name of cacheInvalidatedEventNames(cacheInvalidationRules)) {
      this.subscribeRule(name);
    }
  }

  private subscribeRule<Name extends DomainEventName>(name: Name): void {
    const rule = cacheInvalidationRules[name] as CacheInvalidationRule<Name>;
    this.bus.subscribe(name, (event) => this.invalidate(rule, event));
  }

  private async invalidate<Name extends DomainEventName>(
    rule: CacheInvalidationRule<Name>,
    event: DomainEvents[Name],
  ): Promise<void> {
    await this.cache.mdel(rule(event));
  }
}
