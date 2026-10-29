import type { LogLevel, Type } from "@nestjs/common";
import { CommandFactory, CommandRunnerService } from "nest-commander";
import { Logger } from "nestjs-pino";
import { SecretsGenerateModule } from "./secrets/secrets-generate.module.js";

export const cliName = "sowa-chat";
export const secretsGenerateCommandName = "secrets:generate";

const startupLogLevels: LogLevel[] = ["fatal", "error", "warn", "log", "debug", "verbose"];
const quietLogLevels: LogLevel[] = ["error", "fatal"];

function commanderArgv(commandArguments: string[]): string[] {
  const programArguments = commandArguments.length === 0 ? ["--help"] : commandArguments;
  return [process.execPath, cliName, ...programArguments];
}

interface CliRunSetup {
  rootModule: Type;
  logger: LogLevel[];
  bufferLogs: boolean;
  useAppLogger: boolean;
}

async function runCliModule(commandArguments: string[], setup: CliRunSetup): Promise<number> {
  let exitCode = 0;
  const app = await CommandFactory.createWithoutRunning(setup.rootModule, {
    bufferLogs: setup.bufferLogs,
    logger: setup.logger,
    serviceErrorHandler: (error) => {
      process.stderr.write(`error: ${error.message}\n`);
      exitCode = 1;
    },
  });
  if (setup.useAppLogger) {
    app.useLogger(app.get(Logger));
  }
  try {
    await app.get(CommandRunnerService).run(commanderArgv(commandArguments));
  } finally {
    await app.close();
  }
  return exitCode;
}

export async function runCliCommand(commandArguments: string[]): Promise<number> {
  if (commandArguments[0] === secretsGenerateCommandName) {
    return runCliModule(commandArguments, {
      rootModule: SecretsGenerateModule,
      logger: quietLogLevels,
      bufferLogs: false,
      useAppLogger: false,
    });
  }
  const { CliModule } = await import("../cli.module.js");
  return runCliModule(commandArguments, {
    rootModule: CliModule,
    logger: startupLogLevels,
    bufferLogs: true,
    useAppLogger: true,
  });
}
