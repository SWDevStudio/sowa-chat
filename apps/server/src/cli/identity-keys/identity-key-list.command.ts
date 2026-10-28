import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import type { IdentityKey } from "../../domain/keys/identity-key.entity.js";
import { IdentityKeysService } from "../../domain/keys/identity-keys.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { formatDate, writeTable } from "../cli-output.js";

interface IdentityKeyListOptions {
  project: string;
}

const header = ["kid", "alg", "createdAt", "status"];

function toRow(key: IdentityKey): string[] {
  return [key.kid, key.alg, formatDate(key.createdAt), key.revokedAt ? "revoked" : "active"];
}

@Command({ name: "identity-key:list", description: "List identity keys of a project" })
export class IdentityKeyListCommand extends CommandRunner {
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

  async run(_passedParams: string[], options: IdentityKeyListOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const keys = await this.identityKeys.list(project.id);
    writeTable(header, keys.map(toRow));
  }
}
