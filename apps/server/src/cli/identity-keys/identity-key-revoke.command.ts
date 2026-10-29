import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { IdentityKeysService } from "../../domain/keys/identity-keys.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { writeLine } from "../cli-output.js";

interface IdentityKeyRevokeOptions {
  project: string;
  kid: string;
}

@Command({ name: "identity-key:revoke", description: "Revoke an identity key" })
export class IdentityKeyRevokeCommand extends CommandRunner {
  constructor(
    @Inject(ProjectsService) private readonly projects: ProjectsService,
    @Inject(IdentityKeysService) private readonly identityKeys: IdentityKeysService,
  ) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--kid <kid>", description: "Key identifier", required: true })
  parseKid(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: IdentityKeyRevokeOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const revoked = await this.identityKeys.revoke({
      projectId: project.id,
      kid: options.kid,
      actorKind: "cli",
    });
    if (!revoked) {
      throw new Error(`No active identity key "${options.kid}" in project "${options.project}"`);
    }
    writeLine(`revoked: ${options.kid}`);
  }
}
