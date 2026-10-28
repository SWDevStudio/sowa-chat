import { decodeJwt } from "jose";
import {
  flipSignatureBit,
  forgeToken,
  forgeUnsecuredToken,
  publicKeyPemBytes,
  publicKeyRawBytes,
  replaceHeader,
  replacePayload,
  spyOnLogs,
} from "../../../test/support/forged-tokens.js";
import {
  createService,
  key1,
  key2,
  moveClockTo,
  operatorInput,
  operatorPayload,
  payloadWithout,
  startSeconds,
  ttlSeconds,
  useFrozenClock,
} from "../../../test/support/token-service-fixtures.js";

useFrozenClock();

describe("TokensService.verify forged and expired tokens", () => {
  it("rejects a token after ttlSeconds + 1 second", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);

    moveClockTo(startSeconds + ttlSeconds + 1);

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects a token with alg none", async () => {
    const service = createService([key1], "test-1");
    const token = forgeUnsecuredToken(operatorPayload());
    const tokenWithKid = replaceHeader(token, { alg: "none", kid: "test-1", typ: "JWT" });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
    await expect(service.verify(tokenWithKid, "operator")).resolves.toBeUndefined();
  });

  it("rejects an HS256 token signed with the public key PEM", async () => {
    const service = createService([key1], "test-1");
    const header = { alg: "HS256", kid: "test-1", typ: "JWT" };
    const token = await forgeToken({
      header,
      payload: operatorPayload(),
      key: publicKeyPemBytes(key1),
    });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects an HS256 token signed with the raw public key bytes", async () => {
    const service = createService([key1], "test-1");
    const header = { alg: "HS256", kid: "test-1", typ: "JWT" };
    const token = await forgeToken({
      header,
      payload: operatorPayload(),
      key: publicKeyRawBytes(key1),
    });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects a token with alg Ed25519 signed by the right key", async () => {
    const service = createService([key1], "test-1");
    const header = { alg: "Ed25519", kid: "test-1", typ: "JWT" };
    const token = await forgeToken({ header, payload: operatorPayload(), key: key1.privateKey });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects a token with a changed payload", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);
    const changed = replacePayload(token, { ...decodeJwt(token), sub: "operator-43" });

    await expect(service.verify(changed, "operator")).resolves.toBeUndefined();
  });

  it("rejects a token with a changed signature", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);

    await expect(service.verify(flipSignatureBit(token), "operator")).resolves.toBeUndefined();
  });

  it("rejects an EdDSA token without kid", async () => {
    const service = createService([key1], "test-1");
    const header = { alg: "EdDSA", typ: "JWT" };
    const token = await forgeToken({ header, payload: operatorPayload(), key: key1.privateKey });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects a token with an unknown kid", async () => {
    const service = createService([key1], "test-1");
    const header = { alg: "EdDSA", kid: "test-3", typ: "JWT" };
    const token = await forgeToken({ header, payload: operatorPayload(), key: key1.privateKey });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("rejects a token whose kid names another known key", async () => {
    const service = createService([key1, key2], "test-1");
    const header = { alg: "EdDSA", kid: "test-2", typ: "JWT" };
    const token = await forgeToken({ header, payload: operatorPayload(), key: key1.privateKey });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it.each(["sub", "exp", "iat", "aud"])("rejects a token without %s", async (claim) => {
    const service = createService([key1], "test-1");
    const header = { alg: "EdDSA", kid: "test-1", typ: "JWT" };
    const token = await forgeToken({
      header,
      payload: payloadWithout(claim),
      key: key1.privateKey,
    });

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it.each(["", "not-a-token", "a.b.c", "eyJhbGciOiJFZERTQSJ9..", "x".repeat(10_000)])(
    "rejects malformed token %#",
    async (token) => {
      const service = createService([key1], "test-1");

      await expect(service.verify(token, "operator")).resolves.toBeUndefined();
    },
  );

  it("returns undefined when there are no keys", async () => {
    const { token } = await createService([key1], "test-1").sign(operatorInput);
    const service = createService([], undefined);

    await expect(service.verify(token, "operator")).resolves.toBeUndefined();
  });

  it("does not log the token when verification fails", async () => {
    const service = createService([key1], "test-1");
    const { token } = await service.sign(operatorInput);
    const logSpies = spyOnLogs();

    await service.verify(token, "visitor");
    await service.verify(flipSignatureBit(token), "operator");
    moveClockTo(startSeconds + ttlSeconds + 1);
    await service.verify(token, "operator");

    const logged = JSON.stringify(logSpies.map((spy) => spy.mock.calls));
    expect(logged).not.toContain(token.split(".")[2]);
    expect(logged).not.toContain(flipSignatureBit(token).split(".")[2]);
  });
});
