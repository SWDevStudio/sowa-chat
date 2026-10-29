import { Inject, Injectable, Logger } from "@nestjs/common";
import type { BeforeApplicationShutdown, OnModuleInit } from "@nestjs/common";
import type { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, timeout } from "rxjs";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { DomainEventName } from "../../telemetry/events/domain-events.js";
import { replicaEventNames, replicaEventRules } from "./replica-event-rules.js";
import type { ReplicaEventMessage, ReplicaEventRule } from "./replica-event-rules.js";

export const replicaEventsClient = Symbol("replicaEventsClient");
export const replicaPublishTimeoutMs = 3000;

@Injectable()
export class ReplicaEventsPublisher implements OnModuleInit, BeforeApplicationShutdown {
  private readonly logger = new Logger(ReplicaEventsPublisher.name);
  private readonly pending: ReplicaEventMessage[] = [];

  constructor(
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
    @Inject(replicaEventsClient) private readonly client: ClientProxy,
  ) {}

  onModuleInit(): void {
    for (const name of replicaEventNames(replicaEventRules)) {
      this.subscribeRule(name);
    }
  }

  async beforeApplicationShutdown(): Promise<void> {
    if (this.pending.length === 0) {
      return;
    }
    try {
      await this.sendPending();
    } catch (error) {
      this.logger.warn(`Replica events not sent: ${errorMessage(error)}`);
    }
  }

  private subscribeRule<Name extends DomainEventName>(name: Name): void {
    const rule = replicaEventRules[name] as ReplicaEventRule<Name>;
    this.bus.subscribe(name, (event) => {
      this.pending.push(rule(event));
    });
  }

  private async sendPending(): Promise<void> {
    for (const message of this.pending) {
      await lastValueFrom(
        this.client.emit(message.pattern, message.data).pipe(timeout(replicaPublishTimeoutMs)),
        { defaultValue: undefined },
      );
    }
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
