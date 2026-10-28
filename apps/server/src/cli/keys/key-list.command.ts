import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { ApiKeysService } from "../../domain/keys/api-keys.service.js";
import type { ApiKeySummary } from "../../domain/keys/api-keys.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { formatDate, writeTable } from "../cli-output.js";

interface KeyListOptions {
  project: string;
}

const header = ["prefix", "createdAt", "lastUsedAt", "status"];

function toRow(summary: ApiKeySummary): string[] {
  return [
    summary.prefix,
    formatDate(summary.createdAt),
    formatDate(summary.lastUsedAt),
    summary.revokedAt ? "revoked" : "active",
  ];
}

@Command({ name: "key:list", description: "List serverKeys of a project" })
export class KeyListCommand extends CommandRunner {
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

  async run(_passedParams: string[], options: KeyListOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const summaries = await this.apiKeys.list(project.id, "server");
    writeTable(header, summaries.map(toRow));
  }
}
