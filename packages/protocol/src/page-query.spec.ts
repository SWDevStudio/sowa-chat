import { describe, expect, expectTypeOf, it } from "vitest";
import type { z } from "zod";
import { pageQuerySchema } from "./index.js";
import type { PageQuery } from "./index.js";

describe("pageQuerySchema", () => {
  it("fills default limit 50 for empty query", () => {
    expect(pageQuerySchema.parse({})).toEqual({ limit: 50 });
  });

  it("coerces string limit to number", () => {
    expect(pageQuerySchema.parse({ limit: "20" })).toEqual({ limit: 20 });
  });

  it("accepts numeric limit", () => {
    expect(pageQuerySchema.parse({ limit: 20 })).toEqual({ limit: 20 });
  });

  it.each(["1", "100"])("accepts boundary limit %s", (limit) => {
    expect(pageQuerySchema.parse({ limit }).limit).toBe(Number(limit));
  });

  it.each(["0", "101", "-1", "abc", "1.5", "1000000"])("rejects limit %s", (limit) => {
    expect(pageQuerySchema.safeParse({ limit }).success).toBe(false);
  });

  it.each([0, 101, 1.5])("rejects numeric limit %s", (limit) => {
    expect(pageQuerySchema.safeParse({ limit }).success).toBe(false);
  });

  it("types", () => {
    expectTypeOf<PageQuery["limit"]>().toEqualTypeOf<number>();
    expectTypeOf<z.input<typeof pageQuerySchema>["limit"]>().toEqualTypeOf<number | undefined>();
  });
});
