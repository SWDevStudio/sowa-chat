import type { DataSource } from "typeorm";
import type { OriginList } from "../../src/domain/projects/origin-list.js";
import { Project } from "../../src/domain/projects/project.entity.js";
import type { CliRunResult } from "./cli-run.js";
import { runCliInProcess } from "./cli-run.js";
import { createMain, outputOf } from "./project-cli.js";

export type OriginAction = "add" | "remove" | "list";

export interface OriginGroup {
  prefix: "origin" | "operator-origin";
  list: OriginList;
  other: OriginList;
  eventName: string;
}

export interface OriginCommandOptions {
  project: string;
  origin?: string;
}

export const originGroups: OriginGroup[] = [
  {
    prefix: "origin",
    list: "allowedOrigins",
    other: "operatorAllowedOrigins",
    eventName: "project.allowedOriginsChanged",
  },
  {
    prefix: "operator-origin",
    list: "operatorAllowedOrigins",
    other: "allowedOrigins",
    eventName: "project.operatorAllowedOriginsChanged",
  },
];

export function otherGroupOf(group: OriginGroup): OriginGroup {
  const found = originGroups.find((candidate) => candidate.list === group.other);
  if (!found) {
    throw new Error(`No origin group for list ${group.other}`);
  }
  return found;
}

export function runOriginCommand(
  group: OriginGroup,
  action: OriginAction,
  options: OriginCommandOptions,
): Promise<CliRunResult> {
  const originArguments = options.origin === undefined ? [] : ["--origin", options.origin];
  return runCliInProcess([
    `${group.prefix}:${action}`,
    "--project",
    options.project,
    ...originArguments,
  ]);
}

export async function addOrigins(
  group: OriginGroup,
  project: string,
  origins: string[],
): Promise<void> {
  for (const origin of origins) {
    const result = await runOriginCommand(group, "add", { project, origin });
    expect(result.exitCode, outputOf(result)).toBe(0);
  }
}

export async function setupMainProject(): Promise<void> {
  const created = await createMain();
  expect(created.exitCode, outputOf(created)).toBe(0);
}

export async function originsOf(
  dataSource: DataSource,
  name: string,
): Promise<Record<OriginList, string[]>> {
  const project = await dataSource.getRepository(Project).findOneByOrFail({ name });
  return {
    allowedOrigins: project.allowedOrigins,
    operatorAllowedOrigins: project.operatorAllowedOrigins,
  };
}
