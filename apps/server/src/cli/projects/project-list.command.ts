import { Inject } from "@nestjs/common";
import { Command, CommandRunner } from "nest-commander";
import type { Project } from "../../domain/projects/project.entity.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { emptyCell, writeTable } from "../cli-output.js";

const header = ["name", "id", "publicKey", "allowedOrigins", "operatorAllowedOrigins"];

function formatOrigins(origins: string[]): string {
  if (origins.length === 0) {
    return emptyCell;
  }
  return origins.join(",");
}

function toRow(project: Project): string[] {
  return [
    project.name,
    project.id,
    project.publicKey ?? emptyCell,
    formatOrigins(project.allowedOrigins),
    formatOrigins(project.operatorAllowedOrigins),
  ];
}

@Command({ name: "project:list", description: "List projects" })
export class ProjectListCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  async run(): Promise<void> {
    const projects = await this.projects.list();
    writeTable(header, projects.map(toRow));
  }
}
