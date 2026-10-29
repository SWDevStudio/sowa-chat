import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { serverKeyOnceWarning, writeLine, writeWarning } from "../cli-output.js";

interface ProjectCreateOptions {
  name: string;
  origin?: string[];
  operatorOrigin?: string[];
}

@Command({
  name: "project:create",
  description: "Create a project and print its publicKey and serverKey",
})
export class ProjectCreateCommand extends CommandRunner {
  constructor(@Inject(ProjectsService) private readonly projects: ProjectsService) {
    super();
  }

  @Option({ flags: "--name <name>", description: "Project name", required: true })
  parseName(value: string): string {
    return value;
  }

  @Option({ flags: "--origin <origin>", description: "Allowed origin of the site (repeatable)" })
  parseOrigin(value: string, previous?: string[]): string[] {
    return [...(previous ?? []), value];
  }

  @Option({
    flags: "--operator-origin <origin>",
    description: "Allowed origin of the operator panel (repeatable)",
  })
  parseOperatorOrigin(value: string, previous?: string[]): string[] {
    return [...(previous ?? []), value];
  }

  async run(_passedParams: string[], options: ProjectCreateOptions): Promise<void> {
    const project = await this.projects.create({
      name: options.name,
      allowedOrigins: options.origin ?? [],
      operatorAllowedOrigins: options.operatorOrigin ?? [],
      actorKind: "cli",
    });
    writeLine(`projectId: ${project.projectId}`);
    writeLine(`name: ${project.name}`);
    writeLine(`publicKey: ${project.publicKey}`);
    writeLine(`serverKey: ${project.serverKey}`);
    writeWarning(serverKeyOnceWarning);
  }
}
