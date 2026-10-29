import type { JsonObject } from "@sowa-chat/protocol";
import { randomUUID } from "node:crypto";
import type { DataSource } from "typeorm";
import { Project } from "../../src/domain/projects/project.entity.js";

export interface ProjectFixture {
  name?: string;
  allowedOrigins?: string[];
  settings?: JsonObject;
  publicKey?: string;
}

export function createProject(
  dataSource: DataSource,
  fixture: ProjectFixture = {},
): Promise<Project> {
  const repository = dataSource.getRepository(Project);
  return repository.save(
    repository.create({
      name: fixture.name ?? `project-${randomUUID()}`,
      allowedOrigins: fixture.allowedOrigins,
      settings: fixture.settings,
      publicKey: fixture.publicKey,
    }),
  );
}
