import type { Request } from "express";

const bearerPattern = /^Bearer +(\S+)$/i;

export function bearerToken(request: Request): string | undefined {
  const header = request.headers.authorization;
  if (!header) {
    return undefined;
  }
  return bearerPattern.exec(header)?.[1];
}
