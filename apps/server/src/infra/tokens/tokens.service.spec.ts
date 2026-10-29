import { Global, Inject, Injectable, Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { decodeJwt, decodeProtectedHeader } from "jose";
import { forgeToken } from "../../../test/support/forged-tokens.js";
import {
  createService,
  expectedOperatorClaims,
  key1,
  key2,
  moveClockTo,
  operatorInput,
  operatorPayload,
  startSeconds,
  startTime,
  ttlSeconds,
  useFrozenClock,
} from "../../../test/support/token-service-fixtures.js";
import { tokenSigningConfig } from "../config/token-signing.config.js";
import { TokensModule } from "./tokens.module.js";
import { TokensService, tokenAudiences } from "./tokens.service.js";

useFrozenClock();

describe("tokenAudiences", () => {
  it("lists operator and visitor", () => {
    expect(tokenAudiences).toEqual(["operator", "visitor"]);
  });
});

describe("TokensService.sign", () => {
  it("puts alg EdDSA, kid of the current key and typ JWT into the header", async () => {
    const { token } = await createService([key1], "test-1").sign(operatorInput);

    expect(decodeProtectedHeader(token)).toEqual({ alg: "EdDSA", kid: "test-1", typ: "JWT" });
  });

  it("puts subject, audience, claims, iat and exp into the payload", async () => {
    const { token } = await createService([key1], "test-1").sign(operatorInput);

    expect(decodeJwt(token)).toEqual(expectedOperatorClaims);
  });

  it("returns expiresAt equal to iat + ttlSeconds", async () => {
    const { token, expiresAt } = await createService([key1], "test-1").sign(operatorInput);
    const payload = decodeJwt(token);

    expect(expiresAt).toBeInstanceOf(Date);
    expect(expiresAt.getTime()).toBe(((payload.iat ?? 0) + ttlSeconds) * 1000);
    expect(expiresAt.getTime()).toBe((payload.exp ?? 0) * 1000);
  });

  it("rounds iat down to whole seconds", async () => {
    vi.setSystemTime(new Date(startTime.getTime() + 999));

    const { token, expiresAt } = await createService([key1], "test-1").sign(operatorInput);

    expect(decodeJwt(token).iat).toBe(startSeconds);
    expect(expiresAt).toEqual(new Date((startSeconds + ttlSeconds) * 1000));
  });

  it("lets standard fields override claims with the same names", async () => {
    const claims = {
      ...operatorInput.claims,
      sub: "intruder",
      aud: "visitor",
      iat: "1",
      exp: "99999999999",
      role: "operator",
    };

    const { token } = await createService([key1], "test-1").sign({ ...operatorInput, claims });

    expect(decodeJwt(token)).toEqual({ ...expectedOperatorClaims, role: "operator" });
  });

  it("signs with the current key when several keys are configured", async () => {
    const { token } = await createService([key1, key2], "test-2").sign(operatorInput);

    expect(decodeProtectedHeader(token).kid).toBe("test-2");
  });

  it("throws when there are no keys", async () => {
    const service = createService([], undefined);

    await expect(service.sign(operatorInput)).rejects.toThrow("SOWA_TOKEN_SIGNING_KEYS is not set");
  });
});

describe("TokensService.verify", () => {
  it("accepts its own operator token and returns subject and claims", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);

    await expect(service.verify(token, "operator")).resolves.toEqual({
      subject: "operator-42",
      claims: expectedOperatorClaims,
    });
  });

  it("accepts a visitor token for the visitor audience", async () => {
    const service = createService([key1], "test-1");
    const visitorInput = { ...operatorInput, audience: "visitor" as const, subject: "visitor-1" };
    const { token } = await service.sign(visitorInput);

    const verified = await service.verify(token, "visitor");

    expect(verified?.subject).toBe("visitor-1");
    expect(verified?.claims.aud).toBe("visitor");
  });

  it("accepts an EdDSA token built outside the service with a known kid", async () => {
    const service = createService([key1], "test-1");
    const header = { alg: "EdDSA", kid: "test-1", typ: "JWT" };
    const token = await forgeToken({ header, payload: operatorPayload(), key: key1.privateKey });

    await expect(service.verify(token, "operator")).resolves.toMatchObject({
      subject: "operator-42",
    });
  });

  it("rejects an operator token checked as visitor", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);

    await expect(service.verify(token, "visitor")).resolves.toBeUndefined();
  });

  it("rejects a visitor token checked as operator", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign({ ...operatorInput, audience: "visitor" });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("accepts a token one second before expiry", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);

    moveClockTo(startSeconds + ttlSeconds - 1);

    await expect(service.verify(token, "operator")).resolves.toMatchObject({
      subject: "operator-42",
    });
  });
});

describe("TokensService key rotation", () => {
  it("accepts a test-1 token in a service with [test-1, test-2] and current test-2", async () => {
    const oldService = createService([key1], "test-1");
    const newService = createService([key1, key2], "test-2");
    const { token } = await oldService.sign(operatorInput);

    await expect(newService.verify(token, "operator")).resolves.toEqual({
      subject: "operator-42",
      claims: expectedOperatorClaims,
    });
  });

  it("signs new tokens with test-2 after rotation", async () => {
    const newService = createService([key1, key2], "test-2");

    const { token } = await newService.sign(operatorInput);

    expect(decodeProtectedHeader(token).kid).toBe("test-2");
    await expect(newService.verify(token, "operator")).resolves.toMatchObject({
      subject: "operator-42",
    });
  });

  it("rejects a test-2 token in a service that knows only test-1", async () => {
    const oldService = createService([key1], "test-1");
    const newService = createService([key1, key2], "test-2");
    const { token } = await newService.sign(operatorInput);

    await expect(oldService.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects a test-1 token after test-1 is removed from the keys", async () => {
    const oldService = createService([key1], "test-1");
    const rotatedService = createService([key2], "test-2");
    const { token } = await oldService.sign(operatorInput);

    await expect(rotatedService.verify(token, "operator")).resolves.toBeUndefined();
  });
});

@Global()
@Module({
  providers: [
    { provide: tokenSigningConfig.KEY, useValue: { keys: [key1], currentKeyId: "test-1" } },
  ],
  exports: [tokenSigningConfig.KEY],
})
class TestTokenSigningConfigModule {}

describe("TokensModule", () => {
  it("provides TokensService built from tokenSigningConfig", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TestTokenSigningConfigModule, TokensModule],
    }).compile();
    const service = moduleRef.get(TokensService);

    const { token } = await service.sign(operatorInput);

    expect(decodeProtectedHeader(token).kid).toBe("test-1");
    await expect(service.verify(token, "operator")).resolves.toMatchObject({
      subject: "operator-42",
    });
  });

  it("exports TokensService to modules that import it", async () => {
    @Injectable()
    class TokenConsumer {
      constructor(@Inject(TokensService) readonly tokens: TokensService) {}
    }

    @Module({ imports: [TokensModule], providers: [TokenConsumer] })
    class ConsumerModule {}

    const moduleRef = await Test.createTestingModule({
      imports: [TestTokenSigningConfigModule, ConsumerModule],
    }).compile();

    expect(moduleRef.get(TokenConsumer).tokens).toBeInstanceOf(TokensService);
  });
});
