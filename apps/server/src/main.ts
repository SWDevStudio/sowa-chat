import type { INestApplicationContext, Type } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { AsyncMicroserviceOptions } from "@nestjs/microservices";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "nestjs-pino";
import { configureApiApp } from "./api-app.js";
import { ApiModule } from "./api.module.js";
import { runCliCommand } from "./cli/cli-runner.js";
import { PreparationRunner } from "./infra/preparation/preparation-runner.js";
import {
  connectReplicaEvents,
  replicaEventsMicroservice,
} from "./infra/replica-events/replica-events-transport.js";
import { ZoneServers } from "./infra/zones/zone-servers.js";
import { MigrateModule } from "./migrate.module.js";
import { parseServerMode, serverModes } from "./server-mode.js";
import type { ServerMode } from "./server-mode.js";
import { WorkerModule } from "./worker.module.js";

function useAppLogger(app: INestApplicationContext): void {
  app.useLogger(app.get(Logger));
}

async function createContext(rootModule: Type) {
  const app = await NestFactory.createApplicationContext(rootModule, { bufferLogs: true });
  useAppLogger(app);
  return app;
}

async function runApi() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, { bufferLogs: true });
  configureApiApp(app);
  connectReplicaEvents(app);
  await app.init();
  await app.startAllMicroservices();
  await app.get(ZoneServers).listen(app);
}

async function runWorker() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(WorkerModule, {
    bufferLogs: true,
    ...replicaEventsMicroservice,
  });
  useAppLogger(app);
  await app.listen();
}

async function runMigrate() {
  const app = await createContext(MigrateModule);
  try {
    await app.get(PreparationRunner).run();
  } finally {
    await app.close();
  }
}

async function runCli() {
  process.exitCode = await runCliCommand(process.argv.slice(3));
}

const runners: Record<ServerMode, () => Promise<void>> = {
  api: runApi,
  worker: runWorker,
  migrate: runMigrate,
  cli: runCli,
};

function exitWithUsage() {
  console.error(`Usage: node dist/main.js <mode>\nModes: ${serverModes.join(", ")}`);
  process.exit(1);
}

const mode = parseServerMode(process.argv[2]);
if (mode === undefined) {
  exitWithUsage();
} else {
  await runners[mode]();
}
