import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { IsNull } from "typeorm";
import { VisitorSession } from "./visitor-session.entity.js";

export interface NewVisitorSession {
  visitorId: string;
  familyId: string;
  refreshHash: Buffer;
  expiresAt: Date;
}

@Injectable()
export class VisitorSessionsRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(session: NewVisitorSession): Promise<void> {
    await this.txHost.tx.getRepository(VisitorSession).insert(session);
  }

  async findByRefreshHashForUpdate(refreshHash: Buffer): Promise<VisitorSession | null> {
    return this.txHost.tx.getRepository(VisitorSession).findOne({
      where: { refreshHash },
      lock: { mode: "pessimistic_write" },
    });
  }

  async markUsed(sessionId: string): Promise<void> {
    await this.txHost.tx
      .getRepository(VisitorSession)
      .update({ id: sessionId }, { usedAt: () => "now()" });
  }

  async revokeFamily(familyId: string): Promise<void> {
    await this.txHost.tx
      .getRepository(VisitorSession)
      .update({ familyId, revokedAt: IsNull() }, { revokedAt: () => "now()" });
  }
}
