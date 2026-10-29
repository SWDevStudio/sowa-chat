import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import type { OperatorRole } from "@sowa-chat/protocol";
import { IsNull, Not } from "typeorm";
import { Operator } from "./operator.entity.js";

export interface OperatorProfile {
  projectId: string;
  externalId: string;
  name: string;
  avatarUrl: string | null;
  role: OperatorRole;
}

@Injectable()
export class OperatorsRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async upsert(profile: OperatorProfile): Promise<Operator> {
    const repository = this.txHost.tx.getRepository(Operator);
    await repository.upsert(profile, { conflictPaths: ["projectId", "externalId"] });
    return repository.findOneByOrFail({
      projectId: profile.projectId,
      externalId: profile.externalId,
    });
  }

  async findDisabledIds(): Promise<string[]> {
    const operators = await this.txHost.tx.getRepository(Operator).find({
      select: { id: true },
      where: { disabledAt: Not(IsNull()) },
    });
    return operators.map(({ id }) => id);
  }
}
