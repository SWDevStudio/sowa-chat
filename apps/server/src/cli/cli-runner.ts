import type { LogLevel } from "@nestjs/common";
import { CommandFactory, CommandRunnerService } from "nest-commander";
import { Logger } from "nestjs-pino";
import { CliModule } from "../cli.module.js";

export const cliName = "sowa-chat";

const startupLogLevels: LogLevel[] = ["fatal", "error", "warn", "log", "debug", "verbose"];

function commanderArgv(commandArguments: string[]): string[] {
  const programArguments = commandArguments.length === 0 ? ["--help"] : commandArguments;
  return [process.execPath, cliName, ...programArguments];
}

export async function runCliCommand(commandArguments: string[]): Promise<number> {
  let exitCode = 0;
  const app = await CommandFactory.createWithoutRunning(CliModule, {
    bufferLogs: true,
    logger: startupLogLevels,
    serviceErrorHandler: (error) => {
      process.stderr.write(`error: ${error.message}\n`);
      exitCode = 1;
    },
  });
  app.useLogger(app.get(Logger));
  try {
    await app.get(CommandRunnerService).run(commanderArgv(commandArguments));
  } finally {
    await app.close();
  }
  return exitCode;
}
