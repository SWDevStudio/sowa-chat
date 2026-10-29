import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import type { JWK } from "jose";
import { IdentityKey } from "./identity-key.entity.js";
import type { IdentityKeyAlgorithm } from "./identity-key.entity.js";

export interface NewIdentityKey {
  projectId: string;
  kid: string;
  alg: IdentityKeyAlgorithm;
  publicKey: JWK;
}

@Injectable()
export class IdentityKeysRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(input: NewIdentityKey): Promise<IdentityKey> {
    const repository = this.txHost.tx.getRepository(IdentityKey);
    return repository.save(repository.create(input));
  }

  async findByKid(projectId: string, kid: string): Promise<IdentityKey | null> {
    return this.txHost.tx.getRepository(IdentityKey).findOneBy({ projectId, kid });
  }

  async findByProject(projectId: string): Promise<IdentityKey[]> {
    return this.txHost.tx
      .getRepository(IdentityKey)
      .find({ where: { projectId }, order: { createdAt: "ASC" } });
  }

  async revokeByKid(projectId: string, kid: string): Promise<IdentityKey | undefined> {
    const result = await this.txHost.tx
      .createQueryBuilder()
      .update(IdentityKey)
      .set({ revokedAt: () => "now()" })
      .where("project_id = :projectId", { projectId })
      .andWhere("kid = :kid", { kid })
      .andWhere("revoked_at IS NULL")
      .execute();
    if (!result.affected) {
      return undefined;
    }
    return (await this.findByKid(projectId, kid)) ?? undefined;
  }
}
