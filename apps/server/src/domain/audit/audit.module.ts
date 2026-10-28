import { Module } from "@nestjs/common";
import { AuditLogListener } from "./audit-log.listener.js";
import { AuditLogRepository } from "./audit-log.repository.js";
import { auditRules } from "./audit-rule.js";
import { auditedEvents } from "./audited-events.js";

@Module({
  providers: [
    AuditLogRepository,
    AuditLogListener,
    { provide: auditRules, useValue: auditedEvents },
  ],
})
export class AuditModule {}
