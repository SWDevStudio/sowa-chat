import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import type { ZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "../zones/zone.decorator.js";

class ProbeBodyDto extends createZodDto(z.object({ name: z.string().min(1) })) {}

class ProbeQueryDto extends createZodDto(z.object({ count: z.coerce.number().int().min(1) })) {}

interface ProbeCall {
  kind: "body" | "query" | "param";
  value: unknown;
}

const calls: ProbeCall[] = [];

@Zone("public")
@Controller("visitor/validation-probe")
class ValidationProbeController {
  @Post()
  create(@Body() body: ProbeBodyDto): { name: string } {
    calls.push({ kind: "body", value: body });
    return { name: body.name };
  }

  @Get()
  list(@Query() query: ProbeQueryDto): { count: number } {
    calls.push({ kind: "query", value: query });
    return { count: query.count };
  }

  @Get("items/:id")
  item(@Param("id") id: string): { id: string } {
    calls.push({ kind: "param", value: id });
    return { id };
  }
}

describe("глобальная проверка запросов через zod-схемы", () => {
  let app: INestApplication | undefined;
  let baseUrl: string;

  beforeEach(async () => {
    calls.length = 0;
    const probe: ZoneProbeApp = await startZoneProbeApp([ValidationProbeController]);
    app = probe.app;
    baseUrl = `http://127.0.0.1:${probe.ports.public}/v1/visitor/validation-probe`;
  });

  afterEach(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  function postJson(body: unknown): Promise<Response> {
    return fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  describe("тело запроса", () => {
    it("пустой объект даёт 400 и не доходит до обработчика", async () => {
      const response = await postJson({});

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("поле неверного типа даёт 400", async () => {
      const response = await postJson({ name: 1 });

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("пустая строка нарушает min(1) и даёт 400", async () => {
      const response = await postJson({ name: "" });

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("запрос без тела даёт 400", async () => {
      const response = await fetch(baseUrl, { method: "POST" });

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("верное тело даёт 2xx, обработчик получает разобранный объект", async () => {
      const response = await postJson({ name: "sowa" });

      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(300);
      expect(await response.json()).toEqual({ name: "sowa" });
      expect(calls).toEqual([{ kind: "body", value: { name: "sowa" } }]);
    });

    it("минимально допустимая строка из одного символа проходит", async () => {
      const response = await postJson({ name: "a" });

      expect(response.status).toBeLessThan(300);
      expect(calls).toEqual([{ kind: "body", value: { name: "a" } }]);
    });
  });

  describe("query", () => {
    it("count=abc даёт 400", async () => {
      const response = await fetch(`${baseUrl}?count=abc`);

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("отсутствие count даёт 400", async () => {
      const response = await fetch(baseUrl);

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("count=0 нарушает min(1) и даёт 400", async () => {
      const response = await fetch(`${baseUrl}?count=0`);

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("count=1.5 нарушает int() и даёт 400", async () => {
      const response = await fetch(`${baseUrl}?count=1.5`);

      expect(response.status).toBe(400);
      expect(calls).toEqual([]);
    });

    it("count=5 даёт обработчику число 5, а не строку", async () => {
      const response = await fetch(`${baseUrl}?count=5`);

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ count: 5 });
      expect(calls).toEqual([{ kind: "query", value: { count: 5 } }]);
      expect(typeof (calls[0]?.value as { count: unknown }).count).toBe("number");
    });
  });

  describe("параметры пути", () => {
    it("параметр типа string без DTO приходит без изменений", async () => {
      const response = await fetch(`${baseUrl}/items/abc-123`);

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ id: "abc-123" });
      expect(calls).toEqual([{ kind: "param", value: "abc-123" }]);
    });

    it("числоподобный параметр типа string остаётся строкой", async () => {
      const response = await fetch(`${baseUrl}/items/007`);

      expect(response.status).toBe(200);
      expect(calls).toEqual([{ kind: "param", value: "007" }]);
    });
  });
});
