import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Transactional } from "@nestjs-cls/transactional";
import type { Cache } from "cache-manager";
import { cacheKeys } from "../../infra/cache/cache-keys.js";
import { DomainEventBus } from "../../telemetry/events/domain-event-bus.js";
import type { DomainEventName } from "../../telemetry/events/domain-events.js";
import type { ActorKind } from "../audit/actor-kind.js";
import { ApiKeysService } from "../keys/api-keys.service.js";
import { generateKey } from "../keys/key-format.js";
import type { OriginList } from "./origin-list.js";
import { normalizeOrigin, normalizeOrigins } from "./origin.js";
import type { Project } from "./project.entity.js";
import { toProjectSnapshot } from "./project-snapshot.js";
import type { ProjectSnapshot } from "./project-snapshot.js";
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
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
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

  async findSnapshotById(projectId: string): Promise<ProjectSnapshot | undefined> {
    const cached = await this.cache.get<ProjectSnapshot>(cacheKeys.project(projectId));
    if (cached) {
      return cached;
    }
    const project = await this.repository.findById(projectId);
    if (!project) {
      return undefined;
    }
    return this.cacheSnapshot(project);
  }

  async findSnapshotByPublicKey(publicKey: string): Promise<ProjectSnapshot | undefined> {
    const projectId = await this.cache.get<string>(cacheKeys.projectIdByPublicKey(publicKey));
    if (projectId) {
      return this.findSnapshotById(projectId);
    }
    const project = await this.repository.findByPublicKey(publicKey);
    if (!project) {
      return undefined;
    }
    await this.cache.set(cacheKeys.projectIdByPublicKey(publicKey), project.id);
    return this.cacheSnapshot(project);
  }

  private async cacheSnapshot(project: Project): Promise<ProjectSnapshot> {
    const snapshot = toProjectSnapshot(project);
    await this.cache.set(cacheKeys.project(snapshot.id), snapshot);
    return snapshot;
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
