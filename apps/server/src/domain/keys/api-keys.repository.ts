import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { ApiKey } from "./api-key.entity.js";
import type { ApiKeyKind } from "./api-key.entity.js";

export interface NewApiKey {
  projectId: string;
  kind: ApiKeyKind;
  prefix: string;
  keyHash: Buffer;
  botId: string | null;
}

@Injectable()
export class ApiKeysRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(input: NewApiKey): Promise<ApiKey> {
    const repository = this.txHost.tx.getRepository(ApiKey);
    return repository.save(repository.create(input));
  }

  async findByPrefix(prefix: string): Promise<ApiKey | null> {
    return this.txHost.tx.getRepository(ApiKey).findOneBy({ prefix });
  }

  async findByProject(projectId: string, kind: ApiKeyKind): Promise<ApiKey[]> {
    return this.txHost.tx
      .getRepository(ApiKey)
      .find({ where: { projectId, kind }, order: { createdAt: "ASC" } });
  }

  async touchLastUsedAt(id: string): Promise<void> {
    await this.txHost.tx
      .createQueryBuilder()
      .update(ApiKey)
      .set({ lastUsedAt: () => "now()" })
      .where("id = :id", { id })
      .andWhere("(last_used_at IS NULL OR last_used_at < now() - interval '1 minute')")
      .execute();
  }

  async revokeByPrefix(prefix: string): Promise<ApiKey | undefined> {
    const result = await this.txHost.tx
      .createQueryBuilder()
      .update(ApiKey)
      .set({ revokedAt: () => "now()" })
      .where("prefix = :prefix", { prefix })
      .andWhere("revoked_at IS NULL")
      .execute();
    if (!result.affected) {
      return undefined;
    }
    return (await this.findByPrefix(prefix)) ?? undefined;
  }
}
