import { Inject, Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { DomainEventName } from "../../telemetry/events/domain-events.js";
import type { ActorKind } from "../audit/actor-kind.js";
import { ApiKeysService } from "../keys/api-keys.service.js";
import { generateKey } from "../keys/key-format.js";
import type { OriginList } from "./origin-list.js";
import { normalizeOrigin, normalizeOrigins } from "./origin.js";
import type { Project } from "./project.entity.js";
import { ProjectsRepository } from "./projects.repository.js";

const PROJECT_NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}$/;

export { originLists } from "./origin-list.js";
export type { OriginList } from "./origin-list.js";

export type OriginChange = "added" | "removed" | "unchanged";

export type ProjectActorKind = Extract<ActorKind, "cli" | "system">;

export interface CreateProjectInput {
  name: string;
  allowedOrigins: string[];
  operatorAllowedOrigins: string[];
  actorKind: ProjectActorKind;
  serverKey?: string;
}

export interface ChangeOriginInput {
  projectId: string;
  list: OriginList;
  origin: string;
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

interface NormalizedOrigins {
  allowedOrigins: string[];
  operatorAllowedOrigins: string[];
}

function prepareProject(input: CreateProjectInput): NormalizedOrigins {
  if (!PROJECT_NAME_PATTERN.test(input.name)) {
    throw new InvalidProjectNameError(input.name);
  }
  return {
    allowedOrigins: normalizeOrigins(input.allowedOrigins),
    operatorAllowedOrigins: normalizeOrigins(input.operatorAllowedOrigins),
  };
}

const ORIGINS_EVENTS = {
  allowedOrigins: "project.allowedOriginsChanged",
  operatorAllowedOrigins: "project.operatorAllowedOriginsChanged",
} as const satisfies Record<OriginList, DomainEventName>;

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(ProjectsRepository) private readonly repository: ProjectsRepository,
    @Inject(ApiKeysService) private readonly apiKeys: ApiKeysService,
    @Inject(DomainEventBus) private readonly bus: DomainEventBus,
  ) {}

  @Transactional()
  async create(input: CreateProjectInput): Promise<CreatedProject> {
    const origins = prepareProject(input);
    if (await this.repository.findByName(input.name)) {
      throw new ProjectAlreadyExistsError(input.name);
    }
    return this.insertProject(input, origins);
  }

  @Transactional()
  async createInitial(input: CreateProjectInput): Promise<CreatedProject | undefined> {
    const origins = prepareProject(input);
    await this.repository.lockInitialProject();
    if (await this.repository.findByName(input.name)) {
      return undefined;
    }
    return this.insertProject(input, origins);
  }

  @Transactional()
  async addOrigin(input: ChangeOriginInput): Promise<OriginChange> {
    const origin = normalizeOrigin(input.origin);
    const origins = await this.repository.appendOrigin(input.projectId, input.list, origin);
    return this.publishOriginsChange(input, origins, "added");
  }

  @Transactional()
  async removeOrigin(input: ChangeOriginInput): Promise<OriginChange> {
    const origin = normalizeOrigin(input.origin);
    const origins = await this.repository.removeOrigin(input.projectId, input.list, origin);
    return this.publishOriginsChange(input, origins, "removed");
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

  private async insertProject(
    input: CreateProjectInput,
    origins: NormalizedOrigins,
  ): Promise<CreatedProject> {
    const { name, actorKind } = input;
    const publicKey = generateKey("publicKey");
    const project = await this.repository.create({ name, publicKey, ...origins });
    await this.bus.publish("project.created", { projectId: project.id, name, actorKind });
    const issued = await this.apiKeys.issue({
      projectId: project.id,
      kind: "server",
      actorKind,
      key: input.serverKey,
    });
    return {
      projectId: project.id,
      name,
      publicKey,
      serverKey: issued.key,
      serverKeyPrefix: issued.prefix,
    };
  }

  private async publishOriginsChange(
    input: ChangeOriginInput,
    origins: string[] | undefined,
    change: OriginChange,
  ): Promise<OriginChange> {
    if (origins === undefined) {
      return "unchanged";
    }
    await this.bus.publish(ORIGINS_EVENTS[input.list], {
      projectId: input.projectId,
      origins,
      actorKind: input.actorKind,
    });
    return change;
  }
}
