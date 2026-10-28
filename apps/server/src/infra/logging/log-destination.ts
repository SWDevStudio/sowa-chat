import { pino } from "pino";
import type { DestinationStream } from "pino";

const stdoutFileDescriptor = 1;
const maxBufferedBytes = 1024 * 1024;

export function createStdoutDestination(): DestinationStream {
  return pino.destination({
    fd: stdoutFileDescriptor,
    sync: false,
    maxLength: maxBufferedBytes,
  });
}
