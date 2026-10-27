import type { Type } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { ApiModule } from "./api.module.js";
import { CliModule } from "./cli.module.js";
import { portsConfig } from "./infra/config/ports.config.js";
import { MigrateModule } from "./migrate.module.js";
import { parseServerMode, serverModes } from "./server-mode.js";
import type { ServerMode } from "./server-mode.js";
import { WorkerModule } from "./worker.module.js";

async function createContext(rootModule: Type) {
  const app = await NestFactory.createApplicationContext(rootModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  return app;
}

async function runApi() {
  const app = await NestFactory.create(ApiModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  const ports = app.get<ConfigType<typeof portsConfig>>(portsConfig.KEY);
  await app.listen(ports.public);
}

async function runWorker() {
  await createContext(WorkerModule);
}

async function runToCompletion(rootModule: Type) {
  const app = await createContext(rootModule);
  await app.close();
}

function runMigrate() {
  return runToCompletion(MigrateModule);
}

function runCli() {
  return runToCompletion(CliModule);
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
