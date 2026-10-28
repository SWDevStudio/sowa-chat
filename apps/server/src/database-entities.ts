import { AuditLogEntry } from "./domain/audit/audit-log-entry.entity.js";
import { ApiKey } from "./domain/keys/api-key.entity.js";
import { IdentityKey } from "./domain/keys/identity-key.entity.js";
import { Project } from "./domain/projects/project.entity.js";
import type { DatabaseEntity } from "./infra/database/database-options.js";

export const databaseEntities: DatabaseEntity[] = [Project, AuditLogEntry, ApiKey, IdentityKey];
