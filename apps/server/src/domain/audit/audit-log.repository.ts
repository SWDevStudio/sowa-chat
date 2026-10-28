import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import type { JsonObject } from "@sowa-chat/protocol";
import type { ActorKind } from "./actor-kind.js";
import { AuditLogEntry } from "./audit-log-entry.entity.js";

export interface NewAuditLogEntry {
  projectId: string | null;
  actorKind: ActorKind;
  actorId: string | null;
  action: string;
  targetKind: string;
  targetId: string | null;
  data?: JsonObject;
}

@Injectable()
export class AuditLogRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(entry: NewAuditLogEntry): Promise<AuditLogEntry> {
    const repository = this.txHost.tx.getRepository(AuditLogEntry);
    return repository.save(repository.create(entry));
  }
}
