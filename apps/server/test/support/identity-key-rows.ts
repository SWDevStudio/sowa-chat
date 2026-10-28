import type { DataSource } from "typeorm";
import { AuditLogEntry } from "../../src/domain/audit/audit-log-entry.entity.js";
import { IdentityKey } from "../../src/domain/keys/identity-key.entity.js";

export function identityKeyRows(dataSource: DataSource): Promise<IdentityKey[]> {
  return dataSource.getRepository(IdentityKey).find({ order: { createdAt: "ASC" } });
}

export function auditRows(dataSource: DataSource): Promise<AuditLogEntry[]> {
  return dataSource.getRepository(AuditLogEntry).find({ order: { createdAt: "ASC" } });
}

export function auditRowsByAction(
  dataSource: DataSource,
  action: string,
): Promise<AuditLogEntry[]> {
  return dataSource.getRepository(AuditLogEntry).find({ where: { action } });
}
