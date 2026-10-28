import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { ApiKeysService } from "../../domain/keys/api-keys.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { writeLine } from "../cli-output.js";

interface KeyCreateOptions {
  project: string;
}

const onceWarning = "serverKey is shown only once: store it in your secret storage now\n";

@Command({ name: "key:create", description: "Issue a new serverKey for a project" })
export class KeyCreateCommand extends CommandRunner {
  constructor(
    @Inject(ProjectsService) private readonly projects: ProjectsService,
    @Inject(ApiKeysService) private readonly apiKeys: ApiKeysService,
  ) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: KeyCreateOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const issued = await this.apiKeys.issue({
      projectId: project.id,
      kind: "server",
      actorKind: "cli",
    });
    writeLine(`prefix: ${issued.prefix}`);
    writeLine(`serverKey: ${issued.key}`);
    process.stderr.write(onceWarning);
  }
}
