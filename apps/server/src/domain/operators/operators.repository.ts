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

interface OperatorIdRow {
  id: string;
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

  async findByExternalId(projectId: string, externalId: string): Promise<Operator | null> {
    return this.txHost.tx.getRepository(Operator).findOneBy({ projectId, externalId });
  }

  async markDisabled(projectId: string, externalId: string): Promise<string | undefined> {
    return this.updateOperatorId(
      `UPDATE "operators" SET "disabled_at" = now() WHERE "project_id" = $1 AND "external_id" = $2 AND "disabled_at" IS NULL RETURNING "id"`,
      [projectId, externalId],
    );
  }

  async markEnabled(projectId: string, externalId: string): Promise<string | undefined> {
    return this.updateOperatorId(
      `UPDATE "operators" SET "disabled_at" = NULL WHERE "project_id" = $1 AND "external_id" = $2 AND "disabled_at" IS NOT NULL RETURNING "id"`,
      [projectId, externalId],
    );
  }

  async findDisabledIds(): Promise<string[]> {
    const operators = await this.txHost.tx.getRepository(Operator).find({
      select: { id: true },
      where: { disabledAt: Not(IsNull()) },
    });
    return operators.map(({ id }) => id);
  }

  private async updateOperatorId(sql: string, parameters: string[]): Promise<string | undefined> {
    const [rows] = (await this.txHost.tx.query(sql, parameters)) as [OperatorIdRow[], number];
    return rows[0]?.id;
  }
}
