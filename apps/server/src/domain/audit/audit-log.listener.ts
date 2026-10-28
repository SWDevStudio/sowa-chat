import { Inject, Injectable, Logger } from "@nestjs/common";
import type { OnModuleInit } from "@nestjs/common";
import { Propagation, TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { DomainEventName, DomainEvents } from "../../telemetry/events/domain-events.js";
import { AuditLogRepository } from "./audit-log.repository.js";
import { auditedEventNames, auditRules } from "./audit-rule.js";
import type { AuditRule, AuditRules } from "./audit-rule.js";

@Injectable()
export class AuditLogListener implements OnModuleInit {
  private readonly logger = new Logger(AuditLogListener.name);

  constructor(
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
    @Inject(auditRules) private readonly rules: AuditRules,
    @Inject(AuditLogRepository) private readonly auditLog: AuditLogRepository,
    @Inject(TransactionHost) private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  onModuleInit(): void {
    for (const name of auditedEventNames(this.rules)) {
      this.subscribeRule(name);
    }
  }

  private subscribeRule<Name extends DomainEventName>(name: Name): void {
    const rule = this.rules[name] as AuditRule<Name>;
    this.bus.subscribe(name, (event) => this.record(name, rule, event));
  }

  private async record<Name extends DomainEventName>(
    name: Name,
    rule: AuditRule<Name>,
    event: DomainEvents[Name],
  ): Promise<void> {
    try {
      const entry = { ...rule(event), action: name };
      await this.txHost.withTransaction(Propagation.Nested, () => this.auditLog.create(entry));
    } catch (error) {
      this.logger.error({ err: error, action: name }, "Audit log write failed");
    }
  }
}
