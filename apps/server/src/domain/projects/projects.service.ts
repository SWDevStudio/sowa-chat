import { Inject, Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { ActorKind } from "../audit/actor-kind.js";
import { ApiKeysService } from "../keys/api-keys.service.js";
import { generateKey } from "../keys/key-format.js";
import { normalizeOrigins } from "./origin.js";
import type { Project } from "./project.entity.js";
import { ProjectsRepository } from "./projects.repository.js";

const PROJECT_NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}$/;

export type ProjectActorKind = Extract<ActorKind, "cli" | "system">;

export interface CreateProjectInput {
  name: string;
  allowedOrigins: string[];
  operatorAllowedOrigins: string[];
  actorKind: ProjectActorKind;
}

export interface CreatedProject {
  projectId: string;
  name: string;
  publicKey: string;
  serverKey: string;
  serverKeyPrefix: string;
}

export class InvalidProjectNameError extends Error {
  constructor(name: string) {
    super(
      `Invalid project name "${name}": use 1-63 lowercase letters, digits and "-", starting with a letter or digit`,
    );
  }
}

export class ProjectAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Project "${name}" already exists`);
  }
}

export class ProjectNotFoundError extends Error {
  constructor(name: string) {
    super(`Project "${name}" not found`);
  }
}

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(ProjectsRepository) private readonly repository: ProjectsRepository,
    @Inject(ApiKeysService) private readonly apiKeys: ApiKeysService,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  @Transactional()
  async create(input: CreateProjectInput): Promise<CreatedProject> {
    const { name, actorKind } = input;
    if (!PROJECT_NAME_PATTERN.test(name)) {
      throw new InvalidProjectNameError(name);
    }
    const allowedOrigins = normalizeOrigins(input.allowedOrigins);
    const operatorAllowedOrigins = normalizeOrigins(input.operatorAllowedOrigins);
    if (await this.repository.findByName(name)) {
      throw new ProjectAlreadyExistsError(name);
    }
    const publicKey = generateKey("publicKey");
    const project = await this.repository.create({
      name,
      publicKey,
      allowedOrigins,
      operatorAllowedOrigins,
    });
    await this.bus.publish("project.created", { projectId: project.id, name, actorKind });
    const issued = await this.apiKeys.issue({ projectId: project.id, kind: "server", actorKind });
    return {
      projectId: project.id,
      name,
      publicKey,
      serverKey: issued.key,
      serverKeyPrefix: issued.prefix,
    };
  }

  async getByName(name: string): Promise<Project> {
    const project = await this.repository.findByName(name);
    if (!project) {
      throw new ProjectNotFoundError(name);
    }
    return project;
  }

  async list(): Promise<Project[]> {
    return this.repository.findAll();
  }
}
