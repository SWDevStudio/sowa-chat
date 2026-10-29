import { describe, expect, it } from "vitest";
import { cacheKeys } from "./cache-keys.js";

describe("cacheKeys", () => {
  it("builds the api key entry from the lookup prefix", () => {
    expect(cacheKeys.apiKey("sk_AbCdEfGhIjKl")).toBe("apiKey:sk_AbCdEfGhIjKl");
  });

  it("builds the project entry from the project id", () => {
    expect(cacheKeys.project("p-1")).toBe("project:p-1");
  });

  it("builds the project id entry from the public key", () => {
    expect(cacheKeys.projectIdByPublicKey("pk_x")).toBe("projectIdByPublicKey:pk_x");
  });

  it("gives different keys for the same value in different namespaces", () => {
    const keys = [
      cacheKeys.apiKey("same"),
      cacheKeys.project("same"),
      cacheKeys.projectIdByPublicKey("same"),
    ];

    expect(new Set(keys).size).toBe(3);
  });

  it("gives different keys for different values", () => {
    expect(cacheKeys.apiKey("sk_a")).not.toBe(cacheKeys.apiKey("sk_b"));
    expect(cacheKeys.project("p-1")).not.toBe(cacheKeys.project("p-2"));
  });
});
