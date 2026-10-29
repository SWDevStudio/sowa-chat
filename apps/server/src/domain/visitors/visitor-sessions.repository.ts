import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
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
}
