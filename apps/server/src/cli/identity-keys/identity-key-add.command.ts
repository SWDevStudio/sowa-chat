import { readFile } from "node:fs/promises";
import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { IdentityKeysService } from "../../domain/keys/identity-keys.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { writeLine } from "../cli-output.js";

interface IdentityKeyAddOptions {
  project: string;
  kid: string;
  file: string;
}

async function readPem(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8");
  } catch {
    throw new Error(`Cannot read file "${path}"`);
  }
}

@Command({
  name: "identity-key:add",
  description: "Register a public identity key of the site backend",
})
export class IdentityKeyAddCommand extends CommandRunner {
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

  @Option({
    flags: "--file <path>",
    description: "Path to the public key PEM file",
    required: true,
  })
  parseFile(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: IdentityKeyAddOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const pem = await readPem(options.file);
    const added = await this.identityKeys.add({
      projectId: project.id,
      kid: options.kid,
      pem,
      actorKind: "cli",
    });
    writeLine(`kid: ${added.kid}`);
    writeLine(`alg: ${added.alg}`);
  }
}
