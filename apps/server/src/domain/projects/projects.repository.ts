import { Inject, Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { TransactionalAdapterTypeOrm } from "@nestjs-cls/transactional-adapter-typeorm";
import { Project } from "./project.entity.js";

@Injectable()
export class ProjectsRepository {
  constructor(
    @Inject(TransactionHost)
    private readonly txHost: TransactionHost<TransactionalAdapterTypeOrm>,
  ) {}

  async create(input: { name: string }): Promise<Project> {
    const repository = this.txHost.tx.getRepository(Project);
    return repository.save(repository.create(input));
  }

  async findByName(name: string): Promise<Project | null> {
    return this.txHost.tx.getRepository(Project).findOneBy({ name });
  }
}
