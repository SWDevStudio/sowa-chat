import { findFreePort } from "./e2e-server.js";
import type { Env, RunningServer } from "./e2e-server.js";

const defaultTimeoutMs = 30_000;
const livePollMs = 250;
const outputPollMs = 100;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function respondsLive(env: Env): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:${env.SOWA_MANAGEMENT_PORT}/health/live`);
    return response.status === 200;
  } catch {
    return false;
  }
}

export async function zonePortsEnv(): Promise<Env> {
  return {
    SOWA_PUBLIC_PORT: String(await findFreePort()),
    SOWA_OPERATOR_PORT: String(await findFreePort()),
    SOWA_INTERNAL_PORT: String(await findFreePort()),
    SOWA_MANAGEMENT_PORT: String(await findFreePort()),
  };
}

export async function waitForOutput(
  server: RunningServer,
  pattern: RegExp,
  timeoutMs = defaultTimeoutMs,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (pattern.test(server.output())) {
      return true;
    }
    if (server.isStopped()) {
      return false;
    }
    await delay(outputPollMs);
  }
  return false;
}

export async function waitForExit(
  server: RunningServer,
  timeoutMs = defaultTimeoutMs,
): Promise<number | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !server.isStopped()) {
    await delay(outputPollMs);
  }
  await server.stop();
  return server.process.exitCode;
}

export async function waitForLive(
  server: RunningServer,
  env: Env,
  timeoutMs = defaultTimeoutMs,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (server.isStopped()) {
      return false;
    }
    if (await respondsLive(env)) {
      return true;
    }
    await delay(livePollMs);
  }
  return false;
}
