import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { Visitor } from "./visitor.entity.js";

@Injectable()
export class VisitorsRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async createAnonymous(projectId: string): Promise<Visitor> {
    const repository = this.txHost.tx.getRepository(Visitor);
    return repository.save(repository.create({ projectId }));
  }
}
