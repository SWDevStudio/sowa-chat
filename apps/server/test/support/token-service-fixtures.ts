import type { JWTPayload } from "jose";
import type { TokenSigningKey } from "../../src/infra/config/token-signing-keys.schema.js";
import { TokensService } from "../../src/infra/tokens/tokens.service.js";
import type { SignTokenInput } from "../../src/infra/tokens/tokens.service.js";
import { parseTestSigningKeys, test1SigningKey, test2SigningKey } from "./forged-tokens.js";

export const [key1, key2] = parseTestSigningKeys(`${test1SigningKey},${test2SigningKey}`);

export const startTime = new Date("2026-10-29T12:00:00.000Z");
export const startSeconds = startTime.getTime() / 1000;
export const ttlSeconds = 900;

export const operatorInput: SignTokenInput = {
  audience: "operator",
  subject: "operator-42",
  claims: { projectId: "project-7", role: "supervisor" },
  ttlSeconds,
};

export const expectedOperatorClaims = {
  projectId: "project-7",
  role: "supervisor",
  sub: "operator-42",
  aud: "operator",
  iat: startSeconds,
  exp: startSeconds + ttlSeconds,
};

export function createService(
  keys: TokenSigningKey[],
  currentKeyId: string | undefined,
): TokensService {
  return new TokensService({ keys, currentKeyId });
}

export function operatorPayload(): JWTPayload {
  return { ...expectedOperatorClaims };
}

export function payloadWithout(claim: string): JWTPayload {
  return Object.fromEntries(Object.entries(operatorPayload()).filter(([name]) => name !== claim));
}

export function moveClockTo(seconds: number): void {
  vi.setSystemTime(new Date(seconds * 1000));
}

export function useFrozenClock(): void {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(startTime);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
}
