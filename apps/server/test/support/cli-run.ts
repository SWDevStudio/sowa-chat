import { runCliCommand } from "../../src/cli/cli-runner.js";

export interface CliRunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export async function runCliInProcess(commandArguments: string[]): Promise<CliRunResult> {
  let stdout = "";
  let stderr = "";
  const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
    stdout += String(chunk);
    return true;
  });
  const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
    stderr += String(chunk);
    return true;
  });
  try {
    const exitCode = await runCliCommand(commandArguments);
    return { exitCode, stdout, stderr };
  } finally {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  }
}
