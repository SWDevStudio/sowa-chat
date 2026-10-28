import { pino } from "pino";
import type { DestinationStream } from "pino";
import type { ServerMode } from "../../server-mode.js";

const stdoutFileDescriptor = 1;
const stderrFileDescriptor = 2;
const maxBufferedBytes = 1024 * 1024;

export function logFileDescriptor(mode: ServerMode): number {
  return mode === "cli" ? stderrFileDescriptor : stdoutFileDescriptor;
}

export function createLogDestination(mode: ServerMode): DestinationStream {
  return pino.destination({
    fd: logFileDescriptor(mode),
    sync: false,
    maxLength: maxBufferedBytes,
  });
}
