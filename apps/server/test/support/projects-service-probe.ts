import { CacheModule } from "@nestjs/cache-manager";
import { Test } from "@nestjs/testing";
import { TransactionHost } from "@nestjs-cls/transactional";
import type { Mock } from "vitest";
import type { IssuedApiKey } from "../../src/domain/keys/api-keys.service.js";
import { ApiKeysService } from "../../src/domain/keys/api-keys.service.js";
import type { Project } from "../../src/domain/projects/project.entity.js";
import { ProjectsRepository } from "../../src/domain/projects/projects.repository.js";
import { ProjectsService } from "../../src/domain/projects/projects.service.js";
import { DomainEventBus } from "../../src/telemetry/events/domain-event-bus.js";

export interface ProjectsServiceProbe {
  service: ProjectsService;
  findByName: Mock;
  create: Mock;
  findAll: Mock;
  issue: Mock;
  publish: Mock;
}

export const issuedServerKey: IssuedApiKey = {
  apiKeyId: "api-key-1",
  prefix: "sk_AAAAAAAAAAAA",
  key: "sk_issued_key",
};

export function projectRow(overrides: Partial<Project> = {}): Project {
  return {
    id: "project-1",
    name: "main",
    allowedOrigins: [],
    operatorAllowedOrigins: [],
    publicKey: null,
    settings: {},
    createdAt: new Date("2026-01-01T00:00:00Z"),
    ...overrides,
  };
}

function runWithoutTransaction(): void {
  vi.spyOn(TransactionHost, "getInstance").mockReturnValue({
    withTransaction: (...args: unknown[]) => {
      const run = args.at(-1) as () => Promise<unknown>;
      return run();
    },
  } as unknown as TransactionHost);
}

export async function createProjectsServiceProbe(): Promise<ProjectsServiceProbe> {
  runWithoutTransaction();
  const findByName = vi.fn().mockResolvedValue(null);
  const create = vi.fn(async (input: Partial<Project>) => projectRow(input));
  const findAll = vi.fn().mockResolvedValue([]);
  const issue = vi.fn().mockResolvedValue(issuedServerKey);
  const publish = vi.fn().mockResolvedValue(undefined);
  const moduleRef = await Test.createTestingModule({
    imports: [CacheModule.register()],
    providers: [
      ProjectsService,
      { provide: ProjectsRepository, useValue: { findByName, create, findAll } },
      { provide: ApiKeysService, useValue: { issue } },
      { provide: DomainEventBus, useValue: { publish } },
    ],
  }).compile();
  return { service: moduleRef.get(ProjectsService), findByName, create, findAll, issue, publish };
}
