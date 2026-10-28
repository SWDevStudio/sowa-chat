import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

export const requestIdHeader = "X-Request-Id";

const validRequestId = /^[A-Za-z0-9._-]{1,128}$/;

export function resolveRequestId(request: IncomingMessage): string {
  const header = request.headers[requestIdHeader.toLowerCase()];
  if (typeof header === "string" && validRequestId.test(header)) {
    return header;
  }
  return randomUUID();
}

export function requestIdOfResponse(response: ServerResponse): string {
  const requestId = response.getHeader(requestIdHeader);
  return typeof requestId === "string" ? requestId : "";
}

export function echoRequestId(requestId: string, response: ServerResponse): void {
  response.setHeader(requestIdHeader, requestId);
}
