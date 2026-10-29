import { Inject } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import type { OperatorBlockChange } from "../../domain/operators/operators.service.js";
import { OperatorsService } from "../../domain/operators/operators.service.js";
import { ProjectsService } from "../../domain/projects/projects.service.js";
import { writeLine } from "../cli-output.js";

interface OperatorOptions {
  project: string;
  externalId: string;
}

function describeDisable(change: OperatorBlockChange, externalId: string): string {
  return change === "disabled" ? `disabled: ${externalId}` : `already disabled: ${externalId}`;
}

function describeEnable(change: OperatorBlockChange, externalId: string): string {
  return change === "enabled" ? `enabled: ${externalId}` : `already enabled: ${externalId}`;
}

@Command({
  name: "operator:disable",
  description: "Disable an operator: their tokens stop working at once",
})
export class OperatorDisableCommand extends CommandRunner {
  constructor(
    @Inject(ProjectsService) private readonly projects: ProjectsService,
    @Inject(OperatorsService) private readonly operators: OperatorsService,
  ) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--external-id <id>", description: "Operator external id", required: true })
  parseExternalId(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: OperatorOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const change = await this.operators.disable({
      projectId: project.id,
      externalId: options.externalId,
      actorKind: "cli",
    });
    writeLine(describeDisable(change, options.externalId));
  }
}

@Command({ name: "operator:enable", description: "Enable a disabled operator" })
export class OperatorEnableCommand extends CommandRunner {
  constructor(
    @Inject(ProjectsService) private readonly projects: ProjectsService,
    @Inject(OperatorsService) private readonly operators: OperatorsService,
  ) {
    super();
  }

  @Option({ flags: "--project <name>", description: "Project name", required: true })
  parseProject(value: string): string {
    return value;
  }

  @Option({ flags: "--external-id <id>", description: "Operator external id", required: true })
  parseExternalId(value: string): string {
    return value;
  }

  async run(_passedParams: string[], options: OperatorOptions): Promise<void> {
    const project = await this.projects.getByName(options.project);
    const change = await this.operators.enable({
      projectId: project.id,
      externalId: options.externalId,
      actorKind: "cli",
    });
    writeLine(describeEnable(change, options.externalId));
  }
}
