import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import type { OriginList } from "./origin-list.js";
import { Project } from "./project.entity.js";

const ORIGIN_COLUMNS: Record<OriginList, string> = {
  allowedOrigins: "allowed_origins",
  operatorAllowedOrigins: "operator_allowed_origins",
};

interface OriginsRow {
  origins: string[];
}

export interface NewProject {
  name: string;
  publicKey?: string;
  allowedOrigins?: string[];
  operatorAllowedOrigins?: string[];
}

@Injectable()
export class ProjectsRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(input: NewProject): Promise<Project> {
    const repository = this.txHost.tx.getRepository(Project);
    return repository.save(repository.create(input));
  }

  async findById(id: string): Promise<Project | null> {
    return this.txHost.tx.getRepository(Project).findOneBy({ id });
  }

  async findByName(name: string): Promise<Project | null> {
    return this.txHost.tx.getRepository(Project).findOneBy({ name });
  }

  async findByPublicKey(publicKey: string): Promise<Project | null> {
    return this.txHost.tx.getRepository(Project).findOneBy({ publicKey });
  }

  async findAll(): Promise<Project[]> {
    return this.txHost.tx.getRepository(Project).find({ order: { name: "ASC" } });
  }

  async appendOrigin(
    projectId: string,
    list: OriginList,
    origin: string,
  ): Promise<string[] | undefined> {
    const column = ORIGIN_COLUMNS[list];
    return this.updateOrigins(
      `UPDATE "projects" SET "${column}" = array_append("${column}", $1) WHERE "id" = $2 AND NOT ($1 = ANY("${column}")) RETURNING "${column}" AS "origins"`,
      [origin, projectId],
    );
  }

  async removeOrigin(
    projectId: string,
    list: OriginList,
    origin: string,
  ): Promise<string[] | undefined> {
    const column = ORIGIN_COLUMNS[list];
    return this.updateOrigins(
      `UPDATE "projects" SET "${column}" = array_remove("${column}", $1) WHERE "id" = $2 AND $1 = ANY("${column}") RETURNING "${column}" AS "origins"`,
      [origin, projectId],
    );
  }

  private async updateOrigins(sql: string, parameters: string[]): Promise<string[] | undefined> {
    const [rows] = (await this.txHost.tx.query(sql, parameters)) as [OriginsRow[], number];
    return rows[0]?.origins;
  }
}
