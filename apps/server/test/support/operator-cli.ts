import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import type { DataSource } from "typeorm";
import { AuditLogEntry } from "../../src/domain/audit/audit-log-entry.entity.js";
import { Operator } from "../../src/domain/operators/operator.entity.js";
import { OperatorsModule } from "../../src/domain/operators/operators.module.js";
import { OperatorsService } from "../../src/domain/operators/operators.service.js";
import { WorkerModule } from "../../src/worker.module.js";
import type { CliRunResult } from "./cli-run.js";
import { runCliInProcess } from "./cli-run.js";

export type OperatorAction = "disable" | "enable";

export interface OperatorCommandOptions {
  project?: string;
  externalId?: string;
}

export const operatorActions: OperatorAction[] = ["disable", "enable"];

export function operatorCommandArguments(
  action: OperatorAction,
  options: OperatorCommandOptions,
): string[] {
  const projectArguments = options.project === undefined ? [] : ["--project", options.project];
  const externalIdArguments =
    options.externalId === undefined ? [] : ["--external-id", options.externalId];
  return [`operator:${action}`, ...projectArguments, ...externalIdArguments];
}

export function runOperatorCommand(
  action: OperatorAction,
  options: OperatorCommandOptions,
): Promise<CliRunResult> {
  return runCliInProcess(operatorCommandArguments(action, options));
}

export function operatorRow(
  dataSource: DataSource,
  projectId: string,
  externalId: string,
): Promise<Operator> {
  return dataSource.getRepository(Operator).findOneByOrFail({ projectId, externalId });
}

export async function operatorBlockAuditRows(dataSource: DataSource): Promise<AuditLogEntry[]> {
  const rows = await dataSource.getRepository(AuditLogEntry).find({ order: { createdAt: "ASC" } });
  return rows.filter((row) => row.action.startsWith("operator."));
}

export function useOperatorsService(): () => OperatorsService {
  let moduleRef: TestingModule;
  let operators: OperatorsService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [WorkerModule, OperatorsModule],
    }).compile();
    await moduleRef.init();
    operators = moduleRef.get(OperatorsService);
  });

  afterAll(async () => {
    await moduleRef?.close();
  });

  return () => operators;
}
