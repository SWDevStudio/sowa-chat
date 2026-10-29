import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import type { OriginList } from "../../domain/projects/origin-list.js";
import { normalizeOrigin } from "../../domain/projects/origin.js";
import type { OriginChange } from "../../domain/projects/projects.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { writeLine } from "../cli-output.js";

interface ProjectOptions {
  project: string;
}

interface OriginOptions extends ProjectOptions {
  origin: string;
}

function describeAdd(change: OriginChange, origin: string): string {
  return change === "added" ? `added: ${origin}` : `already allowed: ${origin}`;
}

function describeRemove(change: OriginChange, origin: string): string {
  return change === "removed" ? `removed: ${origin}` : `not in list: ${origin}`;
}

async function addOriginTo(
  projects: ProjectsService,
  list: OriginList,
  options: OriginOptions,
): Promise<void> {
  const origin = normalizeOrigin(options.origin);
  const project = await projects.getByName(options.project);
  const change = await projects.addOrigin({
    projectId: project.id,
    list,
    origin,
    actorKind: "cli",
  });
  writeLine(describeAdd(change, origin));
}

async function removeOriginFrom(
  projects: ProjectsService,
  list: OriginList,
  options: OriginOptions,
): Promise<void> {
  const origin = normalizeOrigin(options.origin);
  const project = await projects.getByName(options.project);
  const change = await projects.removeOrigin({
    projectId: project.id,
    list,
    origin,
    actorKind: "cli",
  });
  writeLine(describeRemove(change, origin));
}

async function listOriginsOf(
  projects: ProjectsService,
  list: OriginList,
  options: ProjectOptions,
): Promise<void> {
  const project = await projects.getByName(options.project);
  for (const origin of project[list]) {
    writeLine(origin);
  }
}

@Command({
  name: "origin:add",
  description: "Allow a site origin for the public zone",
})
export class OriginAddCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--origin <origin>", description: "Origin", required: true })
  parseOrigin(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: OriginOptions): Promise<void> {
    await addOriginTo(this.projects, "allowedOrigins", options);
  }
}

@Command({ name: "origin:remove", description: "Remove a site origin" })
export class OriginRemoveCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--origin <origin>", description: "Origin", required: true })
  parseOrigin(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: OriginOptions): Promise<void> {
    await removeOriginFrom(this.projects, "allowedOrigins", options);
  }
}

@Command({ name: "origin:list", description: "List site origins" })
export class OriginListCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: ProjectOptions): Promise<void> {
    await listOriginsOf(this.projects, "allowedOrigins", options);
  }
}

@Command({
  name: "operator-origin:add",
  description: "Allow an admin panel origin for the operator zone",
})
export class OperatorOriginAddCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--origin <origin>", description: "Origin", required: true })
  parseOrigin(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: OriginOptions): Promise<void> {
    await addOriginTo(this.projects, "operatorAllowedOrigins", options);
  }
}

@Command({
  name: "operator-origin:remove",
  description: "Remove an admin panel origin",
})
export class OperatorOriginRemoveCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--origin <origin>", description: "Origin", required: true })
  parseOrigin(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: OriginOptions): Promise<void> {
    await removeOriginFrom(this.projects, "operatorAllowedOrigins", options);
  }
}

@Command({ name: "operator-origin:list", description: "List admin panel origins" })
export class OperatorOriginListCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: ProjectOptions): Promise<void> {
    await listOriginsOf(this.projects, "operatorAllowedOrigins", options);
  }
}
