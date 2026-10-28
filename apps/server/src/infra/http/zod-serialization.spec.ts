import { Controller, Get } from "@nestjs/common";
import type { INestApplication } from "@nestjs/common";
import { createZodDto, ZodResponse } from "nestjs-zod";
import { z } from "zod";
import { redirectLogsTo } from "../../../test/support/unit-probe.js";
import { startZoneProbeApp } from "../../../test/support/zone-probe.js";
import { Zone } from "../zones/zone.decorator.js";

class ProbeResponseDto extends createZodDto(z.object({ id: z.string() })) {}

interface ProbeResponse {
  id: string;
}

const leakedValue = "top-secret-response-value";
const errorLevel = 50;

@Zone("public")
@Controller("visitor/response-probe")
class ResponseProbeController {
  @Get("single")
  @ZodResponse({ type: ProbeResponseDto })
  single(): ProbeResponse {
    const entity = { id: "1", secret: "s" };
    return entity;
  }

  @Get("list")
  @ZodResponse({ type: [ProbeResponseDto] })
  list(): ProbeResponse[] {
    const entities = [
      { id: "1", secret: "s" },
      { id: "2", secret: "t" },
    ];
    return entities;
  }

  @Get("empty-list")
  @ZodResponse({ type: [ProbeResponseDto] })
  emptyList(): ProbeResponse[] {
    return [];
  }

  @Get("invalid")
  @ZodResponse({ type: ProbeResponseDto })
  invalid(): ProbeResponse {
    const entity = { secret: leakedValue };
    return entity as unknown as ProbeResponse;
  }

  @Get("invalid-in-list")
  @ZodResponse({ type: [ProbeResponseDto] })
  invalidInList(): ProbeResponse[] {
    const entities = [{ id: "1" }, { secret: leakedValue }];
    return entities as unknown as ProbeResponse[];
  }

  @Get("raw")
  raw(): ProbeResponse {
    const entity = { id: "1", secret: "s" };
    return entity;
  }
}

type LogEntry = Record<string, unknown> & { level?: unknown; requestId?: unknown };

interface Issue {
  path?: unknown;
}

describe("ответы через zod-схемы", { timeout: 20_000 }, () => {
  const lines: string[] = [];
  let app: INestApplication | undefined;
  let baseUrl: string;

  beforeAll(async () => {
    const probe = await startZoneProbeApp([ResponseProbeController]);
    redirectLogsTo((line) => lines.push(line));
    app = probe.app;
    baseUrl = `http://127.0.0.1:${probe.ports.public}/v1/visitor/response-probe`;
  });

  afterAll(async () => {
    await app?.close();
    app = undefined;
    vi.unstubAllEnvs();
  });

  function entries(): LogEntry[] {
    return lines.map((line) => JSON.parse(line) as LogEntry);
  }

  function errorEntriesOf(requestId: unknown): LogEntry[] {
    return entries().filter((entry) => entry.level === errorLevel && entry.requestId === requestId);
  }

  function issuePathsOf(entry: LogEntry): unknown[] {
    const issues = entry.responseIssues;
    if (!Array.isArray(issues)) {
      return [];
    }
    return issues.map((issue: Issue) => issue.path);
  }

  async function call(name: string) {
    const response = await fetch(`${baseUrl}/${name}`);
    const text = await response.text();
    return { status: response.status, text, body: JSON.parse(text) as unknown };
  }

  describe("лишние поля удаляются", () => {
    it("объект с лишним полем отдаётся только с id", async () => {
      const { status, text, body } = await call("single");

      expect(status).toBe(200);
      expect(body).toEqual({ id: "1" });
      expect(text).not.toContain("secret");
    });

    it("в массиве поле secret удалено у каждого элемента", async () => {
      const { status, text, body } = await call("list");

      expect(status).toBe(200);
      expect(body).toEqual([{ id: "1" }, { id: "2" }]);
      expect(text).not.toContain("secret");
    });

    it("пустой массив проходит схему массива", async () => {
      const { status, body } = await call("empty-list");

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });
  });

  describe("ответ не прошёл схему", () => {
    it("объект без id даёт 500 internalError без значений полей", async () => {
      const { status, text, body } = await call("invalid");

      expect(status).toBe(500);
      expect(body).toMatchObject({
        statusCode: 500,
        code: "internalError",
        message: "Internal server error",
      });
      expect(text).not.toContain(leakedValue);
      expect(text).not.toContain("secret");
    });

    it("в логе запись error с responseIssues, path равен ['id']", async () => {
      const { body } = await call("invalid");
      const requestId = (body as { requestId?: unknown }).requestId;

      await vi.waitFor(() => {
        const paths = errorEntriesOf(requestId).flatMap((entry) => issuePathsOf(entry));
        expect(paths, lines.join("\n")).toContainEqual(["id"]);
      });
    });

    it("значения полей ответа не попадают в лог", async () => {
      const { body } = await call("invalid");
      const requestId = (body as { requestId?: unknown }).requestId;

      await vi.waitFor(() => {
        expect(errorEntriesOf(requestId).length, lines.join("\n")).toBeGreaterThan(0);
      });
      expect(lines.join("\n")).not.toContain(leakedValue);
    });

    it("элемент массива без id даёт 500, путь в responseIssues указывает на элемент", async () => {
      const { status, text, body } = await call("invalid-in-list");
      const requestId = (body as { requestId?: unknown }).requestId;

      expect(status).toBe(500);
      expect(body).toMatchObject({ code: "internalError", message: "Internal server error" });
      expect(text).not.toContain(leakedValue);
      await vi.waitFor(() => {
        const paths = errorEntriesOf(requestId).flatMap((entry) => issuePathsOf(entry));
        expect(paths, lines.join("\n")).toContainEqual([1, "id"]);
      });
      expect(lines.join("\n")).not.toContain(leakedValue);
    });
  });

  describe("обработчик без @ZodResponse", () => {
    it("возвращает объект как есть, с лишними полями", async () => {
      const { status, body } = await call("raw");

      expect(status).toBe(200);
      expect(body).toEqual({ id: "1", secret: "s" });
    });
  });
});
